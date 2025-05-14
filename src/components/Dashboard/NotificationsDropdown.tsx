
import React from 'react';
import { Bell, AlertTriangle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import NotificationItem from './NotificationItem';
import { toast } from 'sonner';

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface NotificationsDropdownProps {
  pendingNotifications: number;
  notifications: Notification[];
  onTaskDialogOpen: () => void;
  onNotificationComplete: (id: number) => void;
  onNotificationDelete: (id: number) => void;
}

const NotificationsDropdown = ({
  pendingNotifications,
  notifications,
  onTaskDialogOpen,
  onNotificationComplete,
  onNotificationDelete
}: NotificationsDropdownProps) => {
  
  const handleCompleteTask = (id: number) => {
    onNotificationComplete(id);
    toast.success('Tarefa marcada como concluída!');
  };

  const handleDeleteTask = (id: number) => {
    onNotificationDelete(id);
    toast.success('Tarefa removida com sucesso!');
  };

  return (
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
          notifications.map((notification, index) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-0">
              <NotificationItem 
                notification={notification} 
                isLast={index === notifications.length - 1}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
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
  );
};

export default NotificationsDropdown;
