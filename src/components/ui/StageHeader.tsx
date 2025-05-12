
import React from 'react';
import { PlusCircle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StageHeaderProps {
  name: string;
  count: number;
  onAddClick: () => void;
  onEditStage?: () => void;
}

const StageHeader: React.FC<StageHeaderProps> = ({ name, count, onAddClick, onEditStage }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">{count} lead{count !== 1 ? 's' : ''}</p>
        </div>
        {onEditStage && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
            onClick={onEditStage}
          >
            <Edit2 size={12} />
          </Button>
        )}
      </div>
      <Button variant="ghost" size="icon" onClick={onAddClick} className="h-7 w-7">
        <PlusCircle size={16} />
      </Button>
    </div>
  );
};

export default StageHeader;
