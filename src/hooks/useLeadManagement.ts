
import { useState, useEffect } from 'react';
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
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);
  
  // Load leads when component mounts
  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user]);
  
  // Function to load leads from local storage
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      
      // In real app, we would fetch from Supabase
      const savedLeads = localStorage.getItem('leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to save leads to local storage and update global state
  const saveLeads = (updatedLeads: any[]) => {
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setLeads(updatedLeads);
    
    // Dispatch a custom event to notify other components about lead updates
    window.dispatchEvent(new CustomEvent('leads-updated'));
  };

  const handleAddLeadClick = (stageId: string) => {
    // Check if user has reached their lead limit
    if (plan === 'free' && leadsCount >= leadsLimit) {
      toast.error(`Você atingiu o limite de ${leadsLimit} leads do plano ${plan === 'free' ? 'Gratuito' : 'PRO'}.`);
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
      
      // Create new lead object with a more reliable ID
      const newLead = {
        id: Date.now() + Math.floor(Math.random() * 1000), // More unique ID to prevent collisions
        ...leadData,
        stage: currentStageId || 'new_leads',
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString(),
        expectedRevenue: leadData.expectedRevenue ? Number(leadData.expectedRevenue) : 0
      };
      
      // Add the lead to the leads array and persist it
      const updatedLeads = [...leads, newLead];
      saveLeads(updatedLeads);
      setShowAddLeadDialog(false);
      
      // Refresh subscription data to update lead count
      await refreshSubscriptionData();
      
      // Immediate feedback to user
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
  
  const handleUpdateLead = (updatedLead: any) => {
    const updatedLeads = leads.map(lead => 
      lead.id === updatedLead.id ? {...updatedLead, stage: lead.stage} : lead
    );
    saveLeads(updatedLeads);
    toast.success('Lead atualizado com sucesso!');
  };
  
  const handleDeleteLead = (leadId: number) => {
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    saveLeads(updatedLeads);
    toast.success('Lead removido com sucesso!');
    refreshSubscriptionData();
  };

  const handleMoveLeadStage = (leadId: number, newStage: string) => {
    const updatedLeads = leads.map(lead =>
      lead.id === leadId ? { ...lead, stage: newStage } : lead
    );
    saveLeads(updatedLeads);
    toast.success('Lead movido com sucesso!');
  };

  const handleCreateTaskClick = (lead: any) => {
    setCurrentLead(lead);
    setShowTaskDialog(true);
  };

  const handleCreateTask = (taskDetails: any) => {
    const newTask = {
      ...taskDetails,
      leadId: currentLead?.id,
      leadName: currentLead?.name,
      createdAt: new Date().toISOString(),
      completed: false,
      id: Date.now() // Use timestamp for unique ID
    };
    
    // Save the task to localStorage
    const savedTasks = localStorage.getItem('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    const updatedTasks = [newTask, ...tasks];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    // Dispatch event to notify task components
    window.dispatchEvent(new CustomEvent('tasks-updated'));
    
    toast.success('Tarefa criada com sucesso!');
    setShowTaskDialog(false);
    
    return newTask;
  };

  // Instead of directly returning JSX, return a function that renders the component
  const getTaskDialogComponent = () => {
    return { showTaskDialog, setShowTaskDialog, currentLead };
  };

  return {
    showAddLeadDialog,
    setShowAddLeadDialog,
    currentStageId,
    handleAddLeadClick,
    handleAddLead,
    handleUpdateLead,
    handleDeleteLead,
    handleMoveLeadStage,
    handleCreateTaskClick,
    handleCreateTask,
    isLoading,
    setIsLoading,
    showTaskDialog,
    setShowTaskDialog,
    getTaskDialogComponent,
    loadLeads
  };
};
