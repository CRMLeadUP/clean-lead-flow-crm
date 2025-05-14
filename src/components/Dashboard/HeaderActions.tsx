
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FilterDropdown from './FilterDropdown';
import NotificationsDropdown from './NotificationsDropdown';

interface HeaderActionsProps {
  pendingNotifications: number;
  activeFilters: {
    highValue: boolean;
    recent: boolean;
    noActivity: boolean;
  };
  onFilterChange: (filterName: string) => void;
  onTaskDialogOpen: () => void;
  onNotificationComplete: (id: number) => void;
  onNotificationDelete: (id: number) => void;
  notifications: any[];
}

const HeaderActions = ({
  pendingNotifications,
  activeFilters,
  onFilterChange,
  onTaskDialogOpen,
  onNotificationComplete,
  onNotificationDelete,
  notifications
}: HeaderActionsProps) => {
  const navigate = useNavigate();

  const handleAddLeadClick = () => {
    navigate('/leads');
  };

  return (
    <div className="flex gap-2">
      <FilterDropdown 
        activeFilters={activeFilters}
        onFilterChange={onFilterChange}
      />
      
      <NotificationsDropdown 
        pendingNotifications={pendingNotifications}
        notifications={notifications}
        onTaskDialogOpen={onTaskDialogOpen}
        onNotificationComplete={onNotificationComplete}
        onNotificationDelete={onNotificationDelete}
      />
      
      <Button onClick={handleAddLeadClick}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Lead
      </Button>
    </div>
  );
};

export default HeaderActions;
