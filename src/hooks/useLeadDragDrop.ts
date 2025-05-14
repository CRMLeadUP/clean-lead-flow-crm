
import { useState } from 'react';
import { toast } from 'sonner';

export const useLeadDragDrop = (
  leads: any[],
  setLeads: React.Dispatch<React.SetStateAction<any[]>>,
  user: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleMoveLeadStage?: (leadId: number, newStage: string) => void
) => {
  const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);

  // Handle start of drag
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: number) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.setData('text/plain', leadId.toString());
    e.currentTarget.classList.add('opacity-50');
  };

  // Handle end of drag
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedLeadId(null);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const stageCols = document.querySelectorAll('.stage-column');
    stageCols.forEach(col => {
      if (e.currentTarget === col) {
        col.classList.add('bg-primary/5');
      }
    });
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-primary/5');
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-primary/5');

    const leadId = Number(e.dataTransfer.getData('text/plain'));
    
    setIsLoading(true);
    
    try {
      // Update the lead's stage in our local state
      const updatedLeads = leads.map(lead => {
        if (lead.id === leadId) {
          return { ...lead, stage: stageId };
        }
        return lead;
      });

      // Save to local storage
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      
      // Update state with the new data
      setLeads(updatedLeads);

      // If we have the move stage handler, call it
      if (handleMoveLeadStage) {
        handleMoveLeadStage(leadId, stageId);
      }
      
      // Show success message
      toast.success('Lead movido com sucesso!');
    } catch (error) {
      console.error('Error updating lead stage:', error);
      toast.error('Erro ao mover lead. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
