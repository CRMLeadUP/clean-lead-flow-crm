
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SubscriptionCard = () => {
  const { 
    plan, 
    leadsCount, 
    leadsLimit, 
    usagePercentage, 
    isProUser,
    upgradeSubscription
  } = useSubscription();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getUserLimit = () => {
    switch(plan) {
      case 'free': return 1;
      case 'pro': return 5;
      case 'advanced': return 10;
      default: return 1;
    }
  };

  const handleUpgradeClick = () => {
    upgradeSubscription('pro');
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium">Seu Plano: <span className="font-bold text-primary">{plan === 'free' ? 'Gratuito' : plan === 'pro' ? 'PRO' : 'Avançado'}</span></h3>
            <p className="text-sm text-gray-500">
              {isProUser 
                ? 'Aproveite todos os benefícios do seu plano!' 
                : 'Faça upgrade para obter mais recursos.'}
            </p>
          </div>
          {isProUser ? (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Ativo
            </div>
          ) : (
            <Link to="/subscription">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                Ver Planos
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Uso de leads</span>
              <span className="text-sm text-gray-500">{leadsCount} de {leadsLimit}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            
            {!isProUser && leadsCount >= leadsLimit * 0.8 && (
              <div className="flex items-center gap-1 mt-1 text-amber-600 text-xs">
                <AlertCircle size={14} />
                <span>Você está se aproximando do limite. Considere fazer upgrade.</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Users size={16} className="mr-1 text-gray-500" />
              <span>Usuários permitidos:</span>
            </div>
            <span className="font-medium">{getUserLimit()}</span>
          </div>

          {!isProUser && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <h4 className="font-medium">Faça upgrade para o Plano PRO</h4>
              
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Até 300 leads</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Até 5 usuários</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Integração com WhatsApp</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Relatórios avançados</span>
                </li>
              </ul>
              
              <div className="pt-2">
                <div className="text-xl font-bold">{formatCurrency(19.90)}<span className="text-sm font-normal">/mês</span></div>
                <Link to="/subscription">
                  <Button className="w-full mt-2">
                    Fazer Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
