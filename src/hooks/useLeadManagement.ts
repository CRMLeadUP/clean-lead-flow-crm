
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
  
  // Function to load leads from local storage or mock data
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
  
  // Function to save leads to local storage
  const saveLeads = (updatedLeads: any[]) => {
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setLeads(updatedLeads);
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
      
      // Create new lead object
      const newLead = {
        id: Date.now(), // Use timestamp for unique ID to prevent collisions
        ...leadData,
        stage: currentStageId || 'new_leads',
        createdAt: new Date().toISOString(),
        lastContact: new Date().toISOString()
      };
      
      // Add the lead to the leads array and persist it
      const updatedLeads = [...leads, newLead];
      saveLeads(updatedLeads);
      setShowAddLeadDialog(false);
      
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
  
  const handleUpdateLead = (updatedLead: any) => {
    const updatedLeads = leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
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
