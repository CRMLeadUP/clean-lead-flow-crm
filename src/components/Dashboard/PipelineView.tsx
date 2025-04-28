
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
  const { refreshSubscriptionData } = useSubscription();
  const { user } = useAuth();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: number) => {
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageId: string) => {
    e.preventDefault();
    
    if (draggedLeadId !== null) {
      // Update the lead stage
      const updatedLeads = leads.map(lead => 
        lead.id === draggedLeadId ? { ...lead, stage: stageId } : lead
      );
      
      setLeads(updatedLeads);
      setDraggedLeadId(null);
      
      // Get the lead and stage names for the toast
      const lead = leads.find(l => l.id === draggedLeadId);
      const stage = pipelineStages.find(s => s.id === stageId);
      
      if (lead && stage) {
        toast.success(`${lead.name} movido para ${stage.name}`);
      }
    }
  };

  const handleAddLeadClick = (stageId: string) => {
    setCurrentStageId(stageId);
    setShowAddLeadDialog(true);
  };

  const handleAddLead = async (leadData: any) => {
    try {
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
      if (error.message.includes('cannot create more than')) {
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
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onAddLeadClick={handleAddLeadClick}
              count={stageLeads.length}
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
