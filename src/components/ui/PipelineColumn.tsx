
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
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, stageId: string) => void;
  onAddLeadClick: (stageId: string) => void;
  count: number;
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({
  stageId,
  stageName,
  stageColor,
  leads,
  onDragStart,
  onDragOver,
  onDrop,
  onAddLeadClick,
  count
}) => {
  return (
    <div 
      className={`pipeline-column bg-${stageColor} rounded-lg p-3 min-w-[280px] w-full`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, stageId)}
    >
      <StageHeader 
        name={stageName} 
        count={count} 
        onAddClick={() => onAddLeadClick(stageId)} 
      />
      
      <div className="mt-3 space-y-3">
        {leads.length === 0 ? (
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineColumn;
