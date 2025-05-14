
import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  isLast: boolean;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem = ({ notification, isLast, onComplete, onDelete }: NotificationItemProps) => {
  return (
    <>
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
                  onClick={() => onComplete(notification.id)}
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Concluir
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 p-0 text-xs text-red-600 hover:text-red-700 hover:bg-transparent"
                onClick={() => onDelete(notification.id)}
              >
                Remover
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!isLast && <hr className="w-full" />}
    </>
  );
};

export default NotificationItem;
