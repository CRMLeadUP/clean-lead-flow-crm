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
  onEditStage?: () => void;
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
  onEditStage,
  count,
  isLoading = false
}) => {
  // Make the columns smaller and more compact
  const columnWidth = "180px"; // Reduced from 220px

  // Functions for styling (keep existing code)
  const getBorderColor = () => {
    switch(stageColor) {
      case 'blue': return 'border-t-blue-500';
      case 'green': return 'border-t-green-500';
      case 'amber': return 'border-t-amber-500';
      case 'orange': return 'border-t-orange-500'; 
      case 'purple': return 'border-t-purple-500';
      case 'rose': return 'border-t-rose-500';
      default: return 'border-t-blue-500';
    }
  };

  const getBackgroundColor = () => {
    switch(stageColor) {
      case 'blue': return 'bg-blue-50';
      case 'green': return 'bg-green-50';
      case 'amber': return 'bg-amber-50';
      case 'orange': return 'bg-orange-50';
      case 'purple': return 'bg-purple-50';
      case 'rose': return 'bg-rose-50';
      default: return 'bg-blue-50';
    }
  };

  // Drag and drop functions
  const getDropTargetClass = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('ring-2', 'ring-primary', 'ring-opacity-50', 'bg-primary/5');
  };

  const removeDropTargetClass = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50', 'bg-primary/5');
  };

  return (
    <div 
      className={`pipeline-column ${getBackgroundColor()} rounded-lg p-2 min-w-[${columnWidth}] w-full max-w-[${columnWidth}] transition-colors duration-200 border-t-4 ${getBorderColor()} shadow-sm relative`}
      style={{ minWidth: columnWidth, maxWidth: columnWidth }}
      onDragOver={(e) => {
        onDragOver(e);
        getDropTargetClass(e);
      }}
      onDragLeave={(e) => {
        onDragLeave(e);
        removeDropTargetClass(e);
      }}
      onDrop={(e) => {
        onDrop(e, stageId);
        removeDropTargetClass(e);
      }}
      data-stage-id={stageId}
    >
      <StageHeader 
        name={stageName} 
        count={count} 
        onAddClick={() => onAddLeadClick(stageId)}
        onEditStage={onEditStage}
      />
      
      <div className="mt-2 space-y-2">
        {isLoading ? (
          <div className="animate-pulse flex flex-col space-y-2">
            <div className="h-20 bg-white/50 rounded-lg"></div>
            <div className="h-20 bg-white/50 rounded-lg"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-20 border border-dashed border-gray-300 rounded-lg bg-white/70">
            <p className="text-xs text-gray-500 mb-1">Sem leads</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-primary h-6 text-xs"
              onClick={() => onAddLeadClick(stageId)}
            >
              <PlusCircle size={12} className="mr-1" />
              Adicionar
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
