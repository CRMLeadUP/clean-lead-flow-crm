
import React, { useState, useEffect } from 'react';
import { pipelineStages } from '@/data/MockData';
import PipelineColumn from '@/components/ui/PipelineColumn';

interface PipelineColumnsProps {
  leads: any[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, stageId: string) => void;
  onAddLeadClick: (stageId: string) => void;
  onCreateTask: (lead: any) => void;
  onEditLead: (lead: any) => void;
  onDeleteLead: (leadId: number) => void;
  isLoading: boolean;
  onEditStage?: () => void;
}

const PipelineColumns: React.FC<PipelineColumnsProps> = ({
  leads,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddLeadClick,
  onCreateTask,
  onEditLead,
  onDeleteLead,
  isLoading,
  onEditStage
}) => {
  const [stages, setStages] = useState(pipelineStages);
  
  const loadStages = () => {
    // Load custom stages from localStorage if available
    const savedStages = localStorage.getItem('pipelineStages');
    if (savedStages) {
      setStages(JSON.parse(savedStages));
    } else {
      setStages(pipelineStages);
    }
  };
  
  useEffect(() => {
    loadStages();
    
    // Listen for stages-updated event
    const handleStagesUpdated = () => {
      loadStages();
    };
    
    window.addEventListener('stages-updated', handleStagesUpdated);
    
    return () => {
      window.removeEventListener('stages-updated', handleStagesUpdated);
    };
  }, []);
  
  return (
    <div className="flex space-x-2 p-1 min-w-max">
      {stages.map((stage) => {
        const stageLeads = leads.filter(lead => lead.stage === stage.id);
        
        return (
          <PipelineColumn
            key={stage.id}
            stageId={stage.id}
            stageName={stage.name}
            stageColor={stage.color}
            leads={stageLeads}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onAddLeadClick={onAddLeadClick}
            onCreateTask={onCreateTask}
            onEditLead={onEditLead}
            onDeleteLead={onDeleteLead}
            onEditStage={onEditStage}
            count={stageLeads.length}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default PipelineColumns;
