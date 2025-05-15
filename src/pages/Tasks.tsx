
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PendingTasksList from '@/components/Dashboard/PendingTasksList';
import TaskDialog from '@/components/Dashboard/TaskDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useDashboardTasks } from '@/hooks/useDashboardTasks';

const Tasks = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const { tasks, completeTask, deleteTask, handleAddTask } = useDashboardTasks();

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Tarefas</h1>
            <p className="text-muted-foreground">Gerencie suas tarefas e atividades pendentes</p>
          </div>
          <Button onClick={() => setShowTaskDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
            <CardDescription>Organize suas atividades por prioridade</CardDescription>
          </CardHeader>
          <CardContent>
            <PendingTasksList 
              tasks={tasks} 
              onOpenTaskDialog={() => setShowTaskDialog(true)}
              onCompleteTask={completeTask}
            />
          </CardContent>
        </Card>
      </div>

      {/* Task Dialog */}
      <TaskDialog 
        open={showTaskDialog} 
        onOpenChange={setShowTaskDialog}
        onSubmit={handleAddTask}
        onCancel={() => setShowTaskDialog(false)}
      />
    </MainLayout>
  );
};

export default Tasks;
