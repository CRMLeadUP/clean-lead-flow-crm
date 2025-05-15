
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import RecommendedActions from '@/components/Dashboard/RecommendedActions';
import PendingTasksList from '@/components/Dashboard/PendingTasksList';
import ReportSection from '@/components/Dashboard/ReportSection';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  metrics: {
    totalLeads: number;
    newLeadsThisWeek: number;
    totalRevenue: number;
    conversionRate: number;
  };
  tasks: any[];
  onOpenTaskDialog: () => void;
  onCompleteTask: (id: number) => void;
}

const DashboardTabs = ({ 
  activeTab, 
  onTabChange, 
  metrics, 
  tasks,
  onOpenTaskDialog,
  onCompleteTask
}: DashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="reports">Relatórios</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pipeline" className="space-y-6">
        {/* Performance Chart */}
        <PerformanceChart />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecommendedActions onOpenTaskDialog={onOpenTaskDialog} />
          </div>
          
          <div>
            <PendingTasksList 
              tasks={tasks} 
              onOpenTaskDialog={onOpenTaskDialog}
              onCompleteTask={onCompleteTask}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="reports">
        <ReportSection
          totalLeads={metrics.totalLeads}
          newLeadsThisWeek={metrics.newLeadsThisWeek}
          totalRevenue={metrics.totalRevenue}
          conversionRate={metrics.conversionRate}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
