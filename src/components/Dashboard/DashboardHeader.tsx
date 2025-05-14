
import React from 'react';
import HeaderActions from './HeaderActions';

interface DashboardHeaderProps {
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

const DashboardHeader = ({
  pendingNotifications,
  activeFilters,
  onFilterChange,
  onTaskDialogOpen,
  onNotificationComplete,
  onNotificationDelete,
  notifications
}: DashboardHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
      </div>
      <HeaderActions 
        pendingNotifications={pendingNotifications}
        activeFilters={activeFilters}
        onFilterChange={onFilterChange}
        onTaskDialogOpen={onTaskDialogOpen}
        onNotificationComplete={onNotificationComplete}
        onNotificationDelete={onNotificationDelete}
        notifications={notifications}
      />
    </div>
  );
};

export default DashboardHeader;
