
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
import { AlertTriangle, Calendar, CheckCircle2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Use dynamic/empty data instead of mock data
  const [notificationsData, setNotificationsData] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
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
      createdAt: new Date().toISOString()
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

  // Render dropdown menu notifications content
  const renderNotificationsContent = () => {
    if (notificationsData.length === 0) {
      return (
        <div className="py-4 text-center text-sm text-gray-500">
          <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-gray-400" />
          <p>Nenhuma tarefa para exibir</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTaskDialog(true)}
            className="mt-2"
          >
            <PlusCircle className="h-3 w-3 mr-1" />
            Criar Tarefa
          </Button>
        </div>
      );
    }

    return notificationsData.map((notification) => (
      <div key={notification.id} className="flex flex-col items-start p-0">
        <div className="flex w-full items-start p-3 hover:bg-transparent">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${notification.completed ? 'text-gray-400 line-through' : ''}`}>
                {notification.title}
              </span>
              {notification.priority === 'high' && (
                <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                  Alta
                </Badge>
              )}
              {notification.priority === 'medium' && (
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                  Média
                </Badge>
              )}
              {notification.completed && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Concluída
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {notification.date}
              </span>
              <div className="flex gap-1">
                {!notification.completed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-xs text-green-600 hover:text-green-700 hover:bg-transparent"
                    onClick={() => completeTask(notification.id)}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Concluir
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 p-0 text-xs text-red-600 hover:text-red-700 hover:bg-transparent"
                  onClick={() => deleteTask(notification.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
        {notification.id !== notificationsData[notificationsData.length - 1].id && <hr className="w-full" />}
      </div>
    ));
  };

  return (
    <MainLayout>
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
      
      {/* Revenue and Conversion Cards */}
      <RevenueCards 
        totalRevenue={metrics.totalRevenue} 
        conversionRate={metrics.conversionRate} 
      />
      
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
