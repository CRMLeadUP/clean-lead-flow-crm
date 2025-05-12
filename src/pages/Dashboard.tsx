
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import SubscriptionCard from '@/components/Dashboard/SubscriptionCard';
import { performanceMetrics } from '../data/MockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, CheckCircle2, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/Dashboard/TaskForm';

const Dashboard = () => {
  // Use dynamic/empty data instead of mock data
  const [notificationsData, setNotificationsData] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const { leadsCount, leadsLimit, isProUser } = useSubscription();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const MetricCard = ({ title, value, color, icon: Icon, change }: { title: string, value: string | number, color: string, icon?: React.ElementType, change?: string }) => (
    <Card className={`border-${color}-100`}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>{change} vs. mês passado</p>}
          </div>
          {Icon && (
            <div className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
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
    
    setNotificationsData(prev => [newTask, ...prev]);
    setShowTaskDialog(false);
    toast.success('Tarefa criada com sucesso!');
  };
  
  // Complete a task
  const completeTask = (id: number) => {
    setNotificationsData(notifications => notifications.map(n => 
      n.id === id ? {...n, completed: true} : n
    ));
    toast.success('Tarefa marcada como concluída!');
  };
  
  // Delete a task
  const deleteTask = (id: number) => {
    setNotificationsData(notifications => notifications.filter(n => n.id !== id));
    toast.success('Tarefa removida com sucesso!');
  };
  
  // Get pending notifications count
  const pendingNotifications = notificationsData.filter(n => !n.completed).length;

  // Get metrics based on lead data
  const getBasedOnUserData = () => {
    return {
      totalLeads: leadsCount,
      newLeadsThisWeek: 0,
      negotiationStage: 0, 
      closedDeals: 0,
      totalRevenue: 0
    };
  };

  const userMetrics = getBasedOnUserData();
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo ao seu painel de controle</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4 mr-1" />
                Notificações
                {pendingNotifications > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {pendingNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Suas Tarefas</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTaskDialog(true)}
                  className="h-7 px-2 text-xs text-primary"
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Nova Tarefa
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationsData.length === 0 ? (
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
              ) : (
                notificationsData.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-0">
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
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-center text-primary"
                onClick={() => setShowTaskDialog(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Tarefa
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild>
            <Link to="/leads">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Lead
            </Link>
          </Button>
        </div>
      </div>

      {/* Lead Usage Card */}
      <div className="mb-8">
        <SubscriptionCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total de Leads"
          value={`${leadsCount}/${leadsLimit}`}
          color="blue"
          icon={PlusCircle}
          change="+15%"
        />
        <MetricCard
          title="Novos Leads (Semana)"
          value={userMetrics.newLeadsThisWeek}
          color="green"
          icon={PlusCircle}
          change="+8%"
        />
        <MetricCard
          title="Em Negociação"
          value={userMetrics.negotiationStage}
          color="orange"
          icon={PlusCircle}
          change="+12%"
        />
        <MetricCard
          title="Vendas Fechadas"
          value={userMetrics.closedDeals}
          color="purple"
          icon={PlusCircle}
          change="+5%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">{formatCurrency(userMetrics.totalRevenue)}</p>
                <p className="text-sm text-green-600 mt-1">+12% vs. mês passado</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                Crescendo
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">0%</p>
                <p className="text-sm text-gray-600 mt-1">Sem dados ainda</p>
              </div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                Sem dados
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PerformanceChart />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Ações Recomendadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-medium">Adicione seus primeiros leads</h4>
                <p className="text-sm text-gray-600 mt-1">Configure seu funil de vendas</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-blue-600" asChild>
                  <Link to="/leads">
                    Ver funil de vendas
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50">
              <CardContent className="p-4">
                <h4 className="font-medium">Configure seu perfil</h4>
                <p className="text-sm text-gray-600 mt-1">Complete suas informações para começar</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-amber-600" asChild>
                  <Link to="/profile">
                    Editar perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-medium">Organize suas tarefas</h4>
                <p className="text-sm text-gray-600 mt-1">Crie tarefas para acompanhar seus leads</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-green-600" onClick={() => setShowTaskDialog(true)}>
                  Criar tarefa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Tarefas Pendentes</h2>
          <Card>
            <CardContent className="p-4 divide-y">
              {notificationsData.filter(n => !n.completed).length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                  <p>Nenhuma tarefa pendente</p>
                  <Button variant="outline" className="mt-2" onClick={() => setShowTaskDialog(true)}>
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Nova Tarefa
                  </Button>
                </div>
              ) : (
                notificationsData.filter(n => !n.completed).map((task) => (
                  <div key={task.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{task.title}</h3>
                          {task.priority === 'high' && (
                            <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200 text-xs">
                              Alta
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">{task.description}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.date}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="p-1 h-auto text-green-600 hover:text-green-700"
                        onClick={() => completeTask(task.id)}
                      >
                        <CheckCircle2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
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
