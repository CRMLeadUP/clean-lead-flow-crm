
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { pipelineStages } from '@/data/MockData';
import { CirclePlus, Trash2, MoveVertical, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EditStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditStageDialog: React.FC<EditStageDialogProps> = ({ open, onOpenChange }) => {
  const [stages, setStages] = useState([...pipelineStages]);
  
  const handleNameChange = (index: number, newName: string) => {
    const updatedStages = [...stages];
    updatedStages[index] = { ...updatedStages[index], name: newName };
    setStages(updatedStages);
  };
  
  const addNewStage = () => {
    const newStageId = `stage_${stages.length + 1}`;
    setStages([
      ...stages, 
      { 
        id: newStageId, 
        name: 'Nova Etapa', 
        color: ['blue', 'green', 'amber', 'orange', 'purple', 'rose'][stages.length % 6] 
      }
    ]);
  };
  
  const removeStage = (index: number) => {
    if (stages.length <= 1) {
      toast.error("Você precisa ter pelo menos uma etapa no funil");
      return;
    }
    
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    setStages(updatedStages);
  };
  
  const moveStageUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedStages = [...stages];
    const temp = updatedStages[index];
    updatedStages[index] = updatedStages[index - 1];
    updatedStages[index - 1] = temp;
    setStages(updatedStages);
  };
  
  const moveStageDown = (index: number) => {
    if (index >= stages.length - 1) return;
    
    const updatedStages = [...stages];
    const temp = updatedStages[index];
    updatedStages[index] = updatedStages[index + 1];
    updatedStages[index + 1] = temp;
    setStages(updatedStages);
  };
  
  const handleSave = () => {
    // In a real app, this would save to the database
    toast.success("Etapas do funil atualizadas");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Etapas do Funil</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: getColorValue(stage.color) }}
              ></div>
              <Input 
                value={stage.name} 
                onChange={(e) => handleNameChange(index, e.target.value)} 
                className="flex-grow"
              />
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => moveStageUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8"
                >
                  <MoveVertical className="h-4 w-4 rotate-180" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => moveStageDown(index)}
                  disabled={index === stages.length - 1}
                  className="h-8 w-8"
                >
                  <MoveVertical className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeStage(index)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={addNewStage}
          >
            <CirclePlus className="h-4 w-4 mr-2" />
            Adicionar Nova Etapa
          </Button>
          
          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to convert Tailwind color names to CSS values
const getColorValue = (colorName: string): string => {
  const colorMap = {
    'blue': '#3b82f6',
    'green': '#10b981',
    'amber': '#f59e0b',
    'orange': '#f97316',
    'purple': '#8b5cf6',
    'rose': '#f43f5e'
  };
  
  return colorMap[colorName] || '#3b82f6';
};

export default EditStageDialog;
