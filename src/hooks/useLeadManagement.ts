
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/Dashboard/TaskForm';

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
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);

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
      setIsLoading(true);
      
      // Check subscription limits before adding
      if (plan === 'free' && leadsCount >= leadsLimit) {
        toast.error('Você atingiu seu limite de leads no plano gratuito. Faça upgrade para o plano PRO.');
        return;
      }
      
      // This would be a real database insert in a production app
      const newLead = {
        id: Date.now(), // Use timestamp for unique ID to prevent collisions
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTaskClick = (lead: any) => {
    setCurrentLead(lead);
    setShowTaskDialog(true);
  };

  const handleCreateTask = (taskDetails: any) => {
    toast.success('Tarefa criada com sucesso!');
    
    // Close the dialog
    setShowTaskDialog(false);
    
    // Return task details with lead information
    return {
      ...taskDetails,
      leadId: currentLead?.id,
      leadName: currentLead?.name,
      createdAt: new Date().toISOString(),
      completed: false,
      id: Date.now() // Use timestamp for unique ID
    };
  };

  const TaskDialog = () => {
    if (!showTaskDialog) return null;
    
    return (
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskDialog(false)}
            leadName={currentLead?.name}
          />
        </DialogContent>
      </Dialog>
    );
  };

  return {
    showAddLeadDialog,
    setShowAddLeadDialog,
    currentStageId,
    handleAddLeadClick,
    handleAddLead,
    handleCreateTaskClick,
    handleCreateTask,
    isLoading,
    setIsLoading,
    showTaskDialog,
    setShowTaskDialog,
    TaskDialog
  };
};
