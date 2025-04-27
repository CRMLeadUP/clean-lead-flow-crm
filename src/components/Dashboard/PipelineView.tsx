
import React, { useState } from 'react';
import { toast } from 'sonner';
import { leadsMock, pipelineStages } from '../../data/MockData';
import PipelineColumn from '@/components/ui/PipelineColumn';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from './LeadForm';

const PipelineView = () => {
  const [leads, setLeads] = useState(leadsMock);
  const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null);
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);

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

  const handleAddLead = (leadData: any) => {
    const newLead = {
      id: leads.length + 1,
      ...leadData,
      stage: currentStageId || 'new_leads',
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString()
    };
    
    setLeads([...leads, newLead]);
    setShowAddLeadDialog(false);
    toast.success('Lead adicionado com sucesso!');
  };

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
