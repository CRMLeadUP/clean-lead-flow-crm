
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  leadName?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, leadName }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
  });

  const [errors, setErrors] = useState({
    title: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      setErrors({ ...errors, title: 'O título é obrigatório' });
      return;
    }

    onSubmit(formData);
    toast.success('Tarefa criada com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {leadName && (
        <div className="pb-2">
          <p className="text-sm text-muted-foreground">
            Criando tarefa para: <span className="font-medium text-foreground">{leadName}</span>
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Título da tarefa"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva os detalhes da tarefa"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Data de vencimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.dueDate}
              onSelect={(date) => handleChange('dueDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority">Prioridade</Label>
        <Select 
          value={formData.priority} 
          onValueChange={(value) => handleChange('priority', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baixa</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Criar Tarefa
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
