
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
  // Função para calcular a cor da borda superior baseada no stageColor
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

  // Função para calcular a cor de fundo baseada no stageColor
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

  return (
    <div 
      className={`pipeline-column ${getBackgroundColor()} rounded-lg p-4 min-w-[280px] w-full transition-colors duration-200 border-t-4 ${getBorderColor()} shadow-sm`}
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
      
      <div className="mt-4 space-y-4">
        {isLoading ? (
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-32 bg-white/50 rounded-lg"></div>
            <div className="h-32 bg-white/50 rounded-lg"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-300 rounded-lg bg-white/70">
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
