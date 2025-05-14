
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CheckCircle2, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
  completed: boolean;
}

interface PendingTasksListProps {
  tasks: Task[];
  onOpenTaskDialog: () => void;
  onCompleteTask: (id: number) => void;
}

const PendingTasksList = ({ tasks, onOpenTaskDialog, onCompleteTask }: PendingTasksListProps) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tarefas Pendentes</h2>
      <Card>
        <CardContent className="p-4 divide-y">
          {pendingTasks.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              <p>Nenhuma tarefa pendente</p>
              <Button variant="outline" className="mt-2" onClick={onOpenTaskDialog}>
                <PlusCircle className="mr-1 h-4 w-4" />
                Nova Tarefa
              </Button>
            </div>
          ) : (
            pendingTasks.map((task) => (
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
                    <p className="text-sm text-muted-foreground mt-0.5">{task.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.date}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="p-1 h-auto text-green-600 hover:text-green-700"
                    onClick={() => onCompleteTask(task.id)}
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
  );
};

export default PendingTasksList;
