
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StageHeaderProps {
  name: string;
  count: number;
  onAddClick: () => void;
}

const StageHeader: React.FC<StageHeaderProps> = ({ name, count, onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-500">{count} lead{count !== 1 ? 's' : ''}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onAddClick} className="h-8 w-8">
        <PlusCircle size={18} />
      </Button>
    </div>
  );
};

export default StageHeader;
