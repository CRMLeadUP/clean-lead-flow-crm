
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useLeadManagement = (
  leads: any[], 
  setLeads: React.Dispatch<React.SetStateAction<any[]>>, 
  user: any,
  refreshSubscriptionData: () => Promise<void>,
  plan: string,
  leadsCount: number,
  leadsLimit: number
) => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      
      // Add the lead to the leads array
      const updatedLeads = [...leads, newLead];
      setLeads(updatedLeads);
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

  const handleCreateTask = (leadId: number, taskDetails: any) => {
    toast.success('Tarefa criada com sucesso!');
    // In a real app, this would save the task to a database
    // and potentially set up notifications
  };

  return {
    showAddLeadDialog,
    setShowAddLeadDialog,
    currentStageId,
    handleAddLeadClick,
    handleAddLead,
    handleCreateTask,
    isLoading,
    setIsLoading
  };
};
