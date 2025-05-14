
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RecommendedActionsProps {
  onOpenTaskDialog: () => void;
}

const RecommendedActions = ({ onOpenTaskDialog }: RecommendedActionsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ações Recomendadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-medium">Adicione seus primeiros leads</h4>
            <p className="text-sm text-muted-foreground mt-1">Configure seu funil de vendas</p>
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
            <p className="text-sm text-muted-foreground mt-1">Complete suas informações para começar</p>
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
            <p className="text-sm text-muted-foreground mt-1">Crie tarefas para acompanhar seus leads</p>
            <Button variant="link" className="mt-2 p-0 h-auto text-green-600" onClick={onOpenTaskDialog}>
              Criar tarefa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendedActions;
