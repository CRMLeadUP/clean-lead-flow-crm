
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';

interface FilterDropdownProps {
  activeFilters: {
    highValue: boolean;
    recent: boolean;
    noActivity: boolean;
  };
  onFilterChange: (filterName: string) => void;
}

const FilterDropdown = ({ activeFilters, onFilterChange }: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
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

export default FilterDropdown;
