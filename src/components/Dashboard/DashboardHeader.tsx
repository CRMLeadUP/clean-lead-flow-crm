
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, Filter, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

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
  const navigate = useNavigate();

  const handleAddLeadClick = () => {
    navigate('/leads');
  };

  const handleCompleteTask = (id: number) => {
    onNotificationComplete(id);
    toast.success('Tarefa marcada como concluída!');
  };

  const handleDeleteTask = (id: number) => {
    onNotificationDelete(id);
    toast.success('Tarefa removida com sucesso!');
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={14} />
              <span>Filtrar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={activeFilters.highValue}
              onCheckedChange={() => onFilterChange('highValue')}
            >
              Alto valor ({'>'}R$5.000)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.recent}
              onCheckedChange={() => onFilterChange('recent')}
            >
              Adicionados recentemente (7 dias)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.noActivity}
              onCheckedChange={() => onFilterChange('noActivity')}
            >
              Sem atividade ({'>'}14 dias)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
                onClick={onTaskDialogOpen}
                className="h-7 px-2 text-xs text-primary"
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Nova Tarefa
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500">
                <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                <p>Nenhuma tarefa para exibir</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onTaskDialogOpen}
                  className="mt-2"
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Criar Tarefa
                </Button>
              </div>
            ) : (
              notifications.map((notification) => (
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
                              onClick={() => handleCompleteTask(notification.id)}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Concluir
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 p-0 text-xs text-red-600 hover:text-red-700 hover:bg-transparent"
                            onClick={() => handleDeleteTask(notification.id)}
                          >
                            Remover
                          </Button>
                        </div>
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
              onClick={onTaskDialogOpen}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Tarefa
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={handleAddLeadClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Lead
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
