
import React from 'react';
import { PlusCircle } from 'lucide-react';
import LeadCard from '../Dashboard/LeadCard';
import { Button } from '@/components/ui/button';
import StageHeader from './StageHeader';

interface PipelineColumnProps {
  stageId: string;
  stageName: string;
  stageColor: string;
  leads: any[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, stageId: string) => void;
  onAddLeadClick: (stageId: string) => void;
  count: number;
  isLoading?: boolean;
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({
  stageId,
  stageName,
  stageColor,
  leads,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddLeadClick,
  count,
  isLoading = false
}) => {
  return (
    <div 
      className={`pipeline-column bg-${stageColor} rounded-lg p-3 min-w-[280px] w-full transition-colors duration-200`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, stageId)}
      data-stage-id={stageId}
    >
      <StageHeader 
        name={stageName} 
        count={count} 
        onAddClick={() => onAddLeadClick(stageId)} 
      />
      
      <div className="mt-3 space-y-3">
        {isLoading ? (
          <div className="animate-pulse flex flex-col space-y-3">
            <div className="h-32 bg-white/50 rounded-lg"></div>
            <div className="h-32 bg-white/50 rounded-lg"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-300 rounded-lg bg-white/50">
            <p className="text-sm text-gray-500 mb-2">Nenhum lead neste estágio</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-primary"
              onClick={() => onAddLeadClick(stageId)}
            >
              <PlusCircle size={16} className="mr-1" />
              Adicionar Lead
            </Button>
          </div>
        ) : (
          leads.map(lead => (
            <LeadCard 
              key={lead.id} 
              lead={lead}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineColumn;
