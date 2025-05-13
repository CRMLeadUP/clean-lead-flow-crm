
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ActiveFilters } from '@/hooks/useFilterLeads';

interface PipelineFilterProps {
  activeFilters: ActiveFilters;
  onFilterChange: (key: keyof ActiveFilters) => void;
}

const PipelineFilter: React.FC<PipelineFilterProps> = ({
  activeFilters,
  onFilterChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter size={14} />
          <span>Filtrar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={activeFilters.highValue}
          onCheckedChange={() => onFilterChange('highValue')}
        >
          Alto valor ({'>'}R$5.000)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.recent}
          onCheckedChange={() => onFilterChange('recent')}
        >
          Adicionados recentemente (7 dias)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.noActivity}
          onCheckedChange={() => onFilterChange('noActivity')}
        >
          Sem atividade ({'>'}14 dias)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PipelineFilter;
