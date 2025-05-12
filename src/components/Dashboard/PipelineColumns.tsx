
import React from 'react';
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
  isLoading: boolean;
}

const PipelineColumns: React.FC<PipelineColumnsProps> = ({
  leads,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddLeadClick,
  isLoading
}) => {
  return (
    <div className="flex space-x-2 p-1 min-w-max">
      {pipelineStages.map((stage) => {
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
            count={stageLeads.length}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default PipelineColumns;
