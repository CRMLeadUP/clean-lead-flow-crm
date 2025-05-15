
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useDashboardTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  
  // Load tasks when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Add a new task
  const handleAddTask = (taskData: any) => {
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
    
    setTasks(updatedTasks);
    setShowTaskDialog(false);
    toast.success('Tarefa criada com sucesso!');
  };
  
  // Complete a task
  const completeTask = (id: number) => {
    const updatedTasks = tasks.map(n => 
      n.id === id ? {...n, completed: true} : n
    );
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success('Tarefa marcada como concluída!');
  };
  
  // Delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(n => n.id !== id);
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success('Tarefa removida com sucesso!');
  };
  
  // Get pending notifications count
  const pendingCount = tasks.filter(n => !n.completed).length;

  return {
    tasks,
    pendingCount,
    showTaskDialog,
    setShowTaskDialog,
    handleAddTask,
    completeTask,
    deleteTask
  };
};
