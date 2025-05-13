
import React from 'react';
import { Button } from '@/components/ui/button';
import PipelineFilter from './PipelineFilter';
import { ActiveFilters } from '@/hooks/useFilterLeads';

interface PipelineActionsProps {
  activeFilters: ActiveFilters;
  onFilterChange: (key: keyof ActiveFilters) => void;
  onEditStage: () => void;
}

const PipelineActions: React.FC<PipelineActionsProps> = ({
  activeFilters,
  onFilterChange,
  onEditStage
}) => {
  return (
    <div className="flex justify-end mb-2">
      <PipelineFilter 
        activeFilters={activeFilters} 
        onFilterChange={onFilterChange} 
      />
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-2"
        onClick={onEditStage}
      >
        Editar Etapas
      </Button>
    </div>
  );
};

export default PipelineActions;
