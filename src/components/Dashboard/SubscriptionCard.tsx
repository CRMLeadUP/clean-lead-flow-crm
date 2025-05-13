
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function SubscriptionCard() {
  const { plan, leadsCount, leadsLimit, usagePercentage, isProUser } = useSubscription();
  
  if (!isProUser && leadsCount >= leadsLimit * 0.8) {
    return (
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-amber-500 h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800">Limite de leads próximo</h3>
                <p className="text-sm text-amber-700 mb-2">Você está utilizando {leadsCount} de {leadsLimit} leads disponíveis no seu plano.</p>
                <div className="mb-2">
                  <Progress value={usagePercentage} className="bg-amber-200 h-2">
                    <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${usagePercentage > 50 ? 'text-white' : 'text-amber-800'}`}>
                      {usagePercentage}%
                    </span>
                  </Progress>
                </div>
                <Button size="sm" asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link to="/subscription">Fazer Upgrade</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium mb-1 text-right text-amber-700">Plano atual: {plan.toUpperCase()}</p>
              <p className="text-xs text-amber-600">Upgrade para continuar crescendo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="font-medium text-blue-800">Bem-vindo ao LeadUP CRM! Pronto para alavancar seus resultados?</h3>
            <p className="text-sm text-blue-700 mt-1">Você está utilizando {leadsCount} de {plan === 'free' ? leadsLimit : '∞'} leads disponíveis no seu plano {plan.toUpperCase()}.</p>
            
            {plan === 'free' && (
              <div className="mt-2 mb-3">
                <Progress value={usagePercentage} className="bg-blue-200 h-2">
                  <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${usagePercentage > 50 ? 'text-white' : 'text-blue-800'}`}>
                    {usagePercentage}%
                  </span>
                </Progress>
              </div>
            )}
          </div>
          
          <div className="mt-3 sm:mt-0">
            {!isProUser && (
              <Button size="sm" asChild>
                <Link to="/subscription">Fazer Upgrade</Link>
              </Button>
            )}
            {isProUser && (
              <Button size="sm" variant="outline" asChild>
                <Link to="/subscription">Gerenciar Plano</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
