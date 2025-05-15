
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import SubscriptionCard from '@/components/Dashboard/SubscriptionCard';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/Dashboard/TaskForm';
import { useFilterLeads } from '@/hooks/useFilterLeads';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import MetricsSection from '@/components/Dashboard/MetricsSection';
import RevenueCards from '@/components/Dashboard/RevenueCards';
import PendingTasksList from '@/components/Dashboard/PendingTasksList';
import RecommendedActions from '@/components/Dashboard/RecommendedActions';
import ReportSection from '@/components/Dashboard/ReportSection';
import { AlertTriangle, Calendar, CheckCircle2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');
  const { leadsCount, leadsLimit, isProUser, plan, refreshSubscriptionData } = useSubscription();
  const [leads, setLeads] = useState<any[]>([]);
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  
  const { activeFilters, handleFilterChange } = useFilterLeads();
  
  // Load leads and calculate metrics
  useEffect(() => {
    const loadLeads = () => {
      const savedLeads = localStorage.getItem('leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    };
    
    loadLeads();
  }, []);

  // Calculate metrics based on actual lead data
  const getMetricsBasedOnData = () => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Filter leads by date and stage
    const newLeadsThisWeek = leads.filter(lead => {
      const createdAt = new Date(lead.createdAt);
      return createdAt >= oneWeekAgo;
    }).length;
    
    const negotiationLeads = leads.filter(lead => 
      lead.stage === 'meeting_scheduled' || lead.stage === 'proposal_sent'
    ).length;
    
    const closedDeals = leads.filter(lead => lead.stage === 'closed_won').length;
    
    // Calculate total revenue from won deals
    const totalRevenue = leads
      .filter(lead => lead.stage === 'closed_won')
      .reduce((sum, lead) => sum + (lead.expectedRevenue || 0), 0);
    
    // Calculate conversion rate
    const conversionRate = leads.length > 0 
      ? Math.round((closedDeals / leads.length) * 100) 
      : 0;
    
    return {
      totalLeads: leads.length,
      newLeadsThisWeek,
      negotiationStage: negotiationLeads,
      closedDeals,
      totalRevenue,
      conversionRate
    };
  };

  const metrics = getMetricsBasedOnData();
  
  // Add a new task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      date: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      priority: taskData.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      leadId: taskData.leadId || null,
      leadName: taskData.leadName || null
    };
    
    // Save task to local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = [newTask, ...existingTasks];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    setNotificationsData(updatedTasks);
    setShowTaskDialog(false);
    toast.success('Tarefa criada com sucesso!');
  };
  
  // Load tasks when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setNotificationsData(JSON.parse(savedTasks));
    }
  }, []);
  
  // Complete a task
  const completeTask = (id: number) => {
    const updatedTasks = notificationsData.map(n => 
      n.id === id ? {...n, completed: true} : n
    );
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNotificationsData(updatedTasks);
    toast.success('Tarefa marcada como concluída!');
  };
  
  // Delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = notificationsData.filter(n => n.id !== id);
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNotificationsData(updatedTasks);
    toast.success('Tarefa removida com sucesso!');
  };
  
  // Get pending notifications count
  const pendingNotifications = notificationsData.filter(n => !n.completed).length;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Bem-vindo ao LeadUP CRM!</h1>
          <p className="text-muted-foreground">Pronto para alavancar seus resultados?</p>
        </div>

        <DashboardHeader
          pendingNotifications={pendingNotifications}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onTaskDialogOpen={() => setShowTaskDialog(true)}
          onNotificationComplete={completeTask}
          onNotificationDelete={deleteTask}
          notifications={notificationsData}
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="space-y-6">
            {/* Performance Chart */}
            <PerformanceChart />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecommendedActions onOpenTaskDialog={() => setShowTaskDialog(true)} />
              </div>
              
              <div>
                <PendingTasksList 
                  tasks={notificationsData} 
                  onOpenTaskDialog={() => setShowTaskDialog(true)}
                  onCompleteTask={completeTask}
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
      </div>
      
      {/* Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowTaskDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Dashboard;
