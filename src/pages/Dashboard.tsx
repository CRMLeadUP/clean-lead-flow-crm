
import React, { useState } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useFilterLeads } from '@/hooks/useFilterLeads';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import MetricsSection from '@/components/Dashboard/MetricsSection';
import SubscriptionCard from '@/components/Dashboard/SubscriptionCard';
import TaskDialog from '@/components/Dashboard/TaskDialog';
import DashboardContainer from '@/components/Dashboard/DashboardContainer';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useDashboardTasks } from '@/hooks/useDashboardTasks';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import RecommendedActions from '@/components/Dashboard/RecommendedActions';
import PendingTasksList from '@/components/Dashboard/PendingTasksList';

const Dashboard = () => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
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
      
      {/* Performance Chart */}
      <div className="mt-8">
        <PerformanceChart />
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecommendedActions onOpenTaskDialog={() => setShowTaskDialog(true)} />
        </div>
        
        <div>
          <PendingTasksList 
            tasks={tasks} 
            onOpenTaskDialog={() => setShowTaskDialog(true)}
            onCompleteTask={completeTask}
          />
        </div>
      </div>
      
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
