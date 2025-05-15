
import React, { useState } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useFilterLeads } from '@/hooks/useFilterLeads';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import MetricsSection from '@/components/Dashboard/MetricsSection';
import SubscriptionCard from '@/components/Dashboard/SubscriptionCard';
import TaskDialog from '@/components/Dashboard/TaskDialog';
import DashboardContainer from '@/components/Dashboard/DashboardContainer';
import DashboardTabs from '@/components/Dashboard/DashboardTabs';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useDashboardTasks } from '@/hooks/useDashboardTasks';

const Dashboard = () => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');
  const { refreshSubscriptionData } = useSubscription();
  const { activeFilters, handleFilterChange } = useFilterLeads();
  const { metrics, leadsCount, leadsLimit } = useDashboardMetrics();
  const { 
    tasks, 
    pendingCount, 
    showTaskDialog, 
    setShowTaskDialog, 
    handleAddTask, 
    completeTask, 
    deleteTask 
  } = useDashboardTasks();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardContainer>
      <DashboardHeader
        pendingNotifications={pendingCount}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onTaskDialogOpen={() => setShowTaskDialog(true)}
        onNotificationComplete={completeTask}
        onNotificationDelete={deleteTask}
        notifications={tasks}
      />

      {/* Lead Usage Card */}
      <div className="mb-8">
        <SubscriptionCard />
      </div>
      
      {/* Metrics Cards */}
      <MetricsSection 
        metrics={metrics} 
        leadsCount={leadsCount} 
        leadsLimit={leadsLimit} 
      />
      
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        metrics={metrics}
        tasks={tasks}
        onOpenTaskDialog={() => setShowTaskDialog(true)}
        onCompleteTask={completeTask}
      />
      
      {/* Task Dialog */}
      <TaskDialog 
        open={showTaskDialog} 
        onOpenChange={setShowTaskDialog}
        onSubmit={handleAddTask}
        onCancel={() => setShowTaskDialog(false)}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
