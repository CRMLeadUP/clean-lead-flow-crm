
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import SubscriptionCard from '@/components/Dashboard/SubscriptionCard';
import { performanceMetrics } from '../data/MockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, CheckCircle2 } from 'lucide-react';
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

const Dashboard = () => {
  const { totalLeads, newLeadsThisWeek, negotiationStage, closedDeals, totalRevenue } = performanceMetrics;
  const { leadsCount, leadsLimit, isProUser } = useSubscription();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Reunião com Cliente', description: 'Preparar apresentação para Techno Solutions', date: '2023-09-15', completed: false },
    { id: 2, title: 'Follow-up comercial', description: 'Entrar em contato com João da Construções JS', date: '2023-09-14', completed: false },
    { id: 3, title: 'Enviar proposta', description: 'Finalizar proposta para Design Inovador', date: '2023-09-13', completed: true },
  ]);
  
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
  
  const completeTask = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, completed: true} : n
    ));
    toast.success('Tarefa marcada como concluída!');
  };
  
  const pendingNotifications = notifications.filter(n => !n.completed).length;
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo ao seu painel de controle, {performanceMetrics ? 'Jane' : 'Carregando...'}</p>
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
              <DropdownMenuLabel>Suas Tarefas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="py-4 text-center text-sm text-gray-500">
                  Nenhuma tarefa para exibir
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-0">
                    <div className="flex w-full items-start p-3 hover:bg-transparent">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className={`font-medium ${notification.completed ? 'text-gray-400 line-through' : ''}`}>
                            {notification.title}
                          </span>
                          {notification.completed && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                              Concluída
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-400">Para: {notification.date}</span>
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
                        </div>
                      </div>
                    </div>
                    {notification.id !== notifications[notifications.length - 1].id && <hr className="w-full" />}
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-center text-primary"
                asChild
              >
                <Link to="/tasks">Ver Todas</Link>
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
          value={newLeadsThisWeek}
          color="green"
          icon={PlusCircle}
          change="+8%"
        />
        <MetricCard
          title="Em Negociação"
          value={negotiationStage}
          color="orange"
          icon={PlusCircle}
          change="+12%"
        />
        <MetricCard
          title="Vendas Fechadas"
          value={closedDeals}
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
                <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
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
                <p className="text-3xl font-bold">32.5%</p>
                <p className="text-sm text-red-600 mt-1">-4% vs. mês passado</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">
                Atenção
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
                <h4 className="font-medium">Acompanhe Leads em Negociação</h4>
                <p className="text-sm text-gray-600 mt-1">8 leads precisam de follow-up esta semana</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-blue-600">
                  Ver leads
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50">
              <CardContent className="p-4">
                <h4 className="font-medium">Leads Inativos</h4>
                <p className="text-sm text-gray-600 mt-1">3 leads sem interação há mais de 14 dias</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-amber-600">
                  Reativar leads
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-medium">Oportunidades de Upsell</h4>
                <p className="text-sm text-gray-600 mt-1">5 clientes com potencial para novos produtos</p>
                <Button variant="link" className="mt-2 p-0 h-auto text-green-600">
                  Analisar oportunidades
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Tarefas Pendentes</h2>
          <Card>
            <CardContent className="p-4 divide-y">
              {notifications.filter(n => !n.completed).map((task) => (
                <div key={task.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{task.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Para: {task.date}</p>
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
              ))}
              {notifications.filter(n => !n.completed).length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  <p>Nenhuma tarefa pendente</p>
                  <Button variant="outline" className="mt-2">
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Nova Tarefa
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
