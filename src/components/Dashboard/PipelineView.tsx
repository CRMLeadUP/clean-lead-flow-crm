
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { leadsMock, pipelineStages } from '../../data/MockData';
import PipelineColumn from '@/components/ui/PipelineColumn';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from './LeadForm';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PipelineView = () => {
  const [leads, setLeads] = useState(leadsMock);
  const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const { refreshSubscriptionData, leadsCount, leadsLimit, plan } = useSubscription();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: number) => {
    setDraggedLeadId(leadId);
    // Add visual effect to the dragged element
    e.currentTarget.classList.add('opacity-50', 'scale-105');
    // Set the data to be transferred
    e.dataTransfer.effectAllowed = 'move';
    // You can set a custom drag image if needed
    // const dragImg = document.createElement('div');
    // dragImg.textContent = 'Dragging Lead';
    // document.body.appendChild(dragImg);
    // e.dataTransfer.setDragImage(dragImg, 0, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-105');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // Add visual feedback when dragging over a valid drop target
    e.currentTarget.classList.add('bg-primary/5');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-primary/5');
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, stageId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-primary/5');
    
    if (draggedLeadId !== null) {
      try {
        // Find the lead being moved
        const leadToUpdate = leads.find(lead => lead.id === draggedLeadId);
        if (!leadToUpdate) return;
        
        // Don't update if the lead is already in this stage
        if (leadToUpdate.stage === stageId) {
          setDraggedLeadId(null);
          return;
        }
        
        // Update the lead stage in local state
        const updatedLeads = leads.map(lead => 
          lead.id === draggedLeadId ? { ...lead, stage: stageId } : lead
        );
        
        setLeads(updatedLeads);
        setDraggedLeadId(null);
        
        // Get the lead and stage names for the toast
        const lead = leads.find(l => l.id === draggedLeadId);
        const stage = pipelineStages.find(s => s.id === stageId);
        
        if (lead && stage) {
          // In a production app, this would update the database
          /* 
          if (user) {
            setIsLoading(true);
            const { error } = await supabase
              .from('leads')
              .update({ status: stageId })
              .eq('id', leadToUpdate.id)
              .eq('user_id', user.id);
              
            if (error) throw error;
          }
          */
          
          toast.success(`${lead.name} movido para ${stage.name}`);
        }
      } catch (error: any) {
        console.error('Error updating lead stage:', error);
        toast.error('Erro ao atualizar status do lead.');
        
        // Revert the change in the UI if the update fails
        setLeads(prevLeads => [...prevLeads]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddLeadClick = (stageId: string) => {
    // Check if user has reached their lead limit
    if (plan === 'free' && leadsCount >= leadsLimit) {
      toast.error('Você atingiu seu limite de leads no plano gratuito. Faça upgrade para o plano PRO.');
      return;
    }
    
    setCurrentStageId(stageId);
    setShowAddLeadDialog(true);
  };

  const handleAddLead = async (leadData: any) => {
    try {
      // Check subscription limits before adding
      if (plan === 'free' && leadsCount >= leadsLimit) {
        toast.error('Você atingiu seu limite de leads no plano gratuito. Faça upgrade para o plano PRO.');
        return;
      }
      
      // This would be a real database insert in a production app
      const newLead = {
        id: leads.length + 1,
        ...leadData,
        stage: currentStageId || 'new_leads',
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString()
      };
      
      setLeads([...leads, newLead]);
      setShowAddLeadDialog(false);
      
      // In a real app, this would be:
      /*
      if (user) {
        const { error } = await supabase
          .from('leads')
          .insert({
            name: leadData.name,
            company: leadData.company,
            email: leadData.email,
            phone: leadData.phone,
            value: leadData.expectedRevenue,
            notes: leadData.notes,
            status: currentStageId || 'new_leads',
            user_id: user.id
          });
          
        if (error) throw error;
      }
      */
      
      // Refresh subscription data to update lead count
      await refreshSubscriptionData();
      toast.success('Lead adicionado com sucesso!');
    } catch (error: any) {
      if (error.message && error.message.includes('cannot create more than')) {
        toast.error('Você atingiu seu limite de leads. Faça upgrade para o plano PRO.');
      } else {
        toast.error('Erro ao adicionar lead. Tente novamente.');
      }
      console.error('Error adding lead:', error);
    }
  };

  // In a real app, we would fetch leads from Supabase here
  useEffect(() => {
    /*
    const fetchLeads = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('user_id', user.id);
            
          if (error) {
            toast.error('Erro ao carregar leads');
            console.error('Error fetching leads:', error);
            return;
          }
          
          if (data) {
            setLeads(data);
          }
        } catch (error) {
          console.error('Error fetching leads:', error);
          toast.error('Erro ao carregar leads');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchLeads();
    */
  }, [user]);

  return (
    <div className="w-full overflow-auto">
      <div className="flex space-x-4 p-1 min-w-max">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter(lead => lead.stage === stage.id);
          
          return (
            <PipelineColumn
              key={stage.id}
              stageId={stage.id}
              stageName={stage.name}
              stageColor={stage.color}
              leads={stageLeads}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onAddLeadClick={handleAddLeadClick}
              count={stageLeads.length}
              isLoading={isLoading}
            />
          );
        })}
      </div>
      
      <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Lead</DialogTitle>
          </DialogHeader>
          <LeadForm onSubmit={handleAddLead} onCancel={() => setShowAddLeadDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PipelineView;
