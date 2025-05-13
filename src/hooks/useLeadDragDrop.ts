
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useLeadDragDrop = (leads: any[], setLeads: React.Dispatch<React.SetStateAction<any[]>>, user: any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: number) => {
    setDraggedLeadId(leadId);
    // Add visual effect to the dragged element
    e.currentTarget.classList.add('opacity-50', 'scale-105');
    // Set the data to be transferred
    e.dataTransfer.effectAllowed = 'move';
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
        
        // Update local state
        setLeads(updatedLeads);
        setDraggedLeadId(null);
        
        // Save to localStorage to persist across page changes
        localStorage.setItem('leads', JSON.stringify(updatedLeads));
        
        // Get the lead and stage names for the toast
        const lead = leads.find(l => l.id === draggedLeadId);
        const stageName = stageId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        if (lead && stageName) {
          toast.success(`${lead.name} movido para ${stageName}`);
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

  return {
    draggedLeadId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
