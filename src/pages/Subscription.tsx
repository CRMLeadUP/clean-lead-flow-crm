
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "default", 
  current = false,
  popular = false,
  onButtonClick,
  disabled = false
}: { 
  title: string, 
  price: string, 
  description: string, 
  features: string[], 
  buttonText: string, 
  buttonVariant?: "default" | "outline", 
  current?: boolean,
  popular?: boolean,
  onButtonClick: () => void,
  disabled?: boolean
}) => (
  <Card className={`relative overflow-hidden shadow hover:shadow-md transition-shadow ${current ? 'border-primary border-2' : ''} ${popular ? 'shadow-lg' : 'shadow-sm'}`}>
    {popular && (
      <div className="bg-primary text-primary-foreground text-xs font-medium py-1 absolute top-0 left-0 right-0 text-center">
        MAIS POPULAR
      </div>
    )}
    {current && (
      <div className="bg-primary text-primary-foreground text-xs py-1 px-3 absolute -right-8 top-6 rotate-45 w-32 text-center">
        Atual
      </div>
    )}
    <CardHeader className={`${popular ? 'pt-8' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{price}</div>
          {price !== 'Grátis' && <div className="text-xs text-gray-500">por mês</div>}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check size={18} className="text-green-600 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        variant={buttonVariant} 
        className="w-full" 
        onClick={onButtonClick}
        disabled={current || disabled}
      >
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const PaymentHistoryItem = ({ date, amount, status }: { date: string, amount: string, status: 'success' | 'processing' | 'failed' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-medium">{date}</p>
        <p className="text-sm text-gray-500">Assinatura mensal</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{amount}</p>
        <Badge variant="outline" className={`${getStatusStyles()} border-0`}>
          {status === 'success' && 'Pago'}
          {status === 'processing' && 'Processando'}
          {status === 'failed' && 'Falhou'}
        </Badge>
      </div>
    </div>
  );
};

const Subscription = () => {
  const { plan, upgradeSubscription, leadsCount, leadsLimit, usagePercentage } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleUpgrade = async (newPlan: 'free' | 'pro' | 'advanced') => {
    setIsProcessing(true);
    try {
      // Simulate payment process
      toast.info(`Iniciando processamento do plano ${newPlan.toUpperCase()}...`);
      
      // Wait for 1.5 seconds to simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Upgrade the subscription
      await upgradeSubscription(newPlan);
      
      toast.success(`Parabéns! Você agora é um usuário ${newPlan.toUpperCase()}!`);
    } catch (error) {
      toast.error('Ocorreu um erro ao processar o pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFree = plan === 'free';
  const isPro = plan === 'pro';
  const isAdvanced = plan === 'advanced';

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Assinatura</h1>
        <p className="text-gray-500">Escolha o plano que melhor atende às suas necessidades</p>
      </div>
      
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">Seu plano atual: <span className="font-bold">{plan.toUpperCase()}</span></h2>
                <p className="text-sm mt-1">
                  {isFree 
                    ? 'Você está usando o plano gratuito. Faça upgrade para acessar mais recursos.' 
                    : isPro 
                      ? 'Você está usando o plano PRO. Aproveite todos os recursos disponíveis!' 
                      : 'Você está usando o plano AVANÇADO. Aproveite todos os recursos premium!'}
                </p>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uso de leads</span>
                    <span>{leadsCount} de {leadsLimit}</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
              </div>
              
              {!isFree && (
                <Button variant="outline" className="shrink-0">
                  Gerenciar método de pagamento
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PricingCard
          title="Básico"
          price="Grátis"
          description="Para começar a gerenciar leads"
          features={[
            "Até 10 leads",
            "Visualização básica de pipeline",
            "Relatórios simples (1 relatório mensal)",
            "1 usuário único"
          ]}
          buttonText={isFree ? "Plano Atual" : "Fazer Downgrade"}
          buttonVariant={isFree ? "outline" : "default"}
          current={isFree}
          onButtonClick={() => handleUpgrade('free')}
          disabled={isFree || isProcessing}
        />
        
        <PricingCard
          title="PRO"
          price={formatCurrency(29.90)}
          description="Para profissionais e pequenas equipes"
          features={[
            "Até 300 leads",
            "Gerenciamento completo do pipeline",
            "Relatórios avançados (3 mensais)",
            "Acompanhamento de atividades",
            "Integração com WhatsApp",
            "1 usuário único"
          ]}
          buttonText={isPro ? "Plano Atual" : "Fazer Upgrade"}
          current={isPro}
          popular={true}
          onButtonClick={() => handleUpgrade('pro')}
          disabled={isPro || isProcessing}
        />
        
        <PricingCard
          title="Avançado"
          price={formatCurrency(59.90)}
          description="Para profissionais exigentes"
          features={[
            "Até 1000 leads",
            "Relatórios avançados ilimitados",
            "Integração com ferramentas externas",
            "Integração com WhatsApp",
            "Priorização no suporte",
            "1 usuário único",
            "API de acesso"
          ]}
          buttonText={isAdvanced ? "Plano Atual" : "Fazer Upgrade"}
          buttonVariant={isAdvanced ? "outline" : "default"}
          current={isAdvanced}
          onButtonClick={() => handleUpgrade('advanced')}
          disabled={isAdvanced || isProcessing}
        />
      </div>
      
      {!isFree && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Histórico de Pagamentos</h2>
          <Card>
            <CardContent className="p-6">
              <PaymentHistoryItem 
                date="12 de Maio, 2023" 
                amount={formatCurrency(isPro ? 29.90 : 59.90)} 
                status="success" 
              />
              <PaymentHistoryItem 
                date="12 de Abril, 2023" 
                amount={formatCurrency(isPro ? 29.90 : 59.90)} 
                status="success" 
              />
              <PaymentHistoryItem 
                date="12 de Março, 2023" 
                amount={formatCurrency(isPro ? 29.90 : 59.90)} 
                status="success" 
              />
              
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  Ver histórico completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">O que acontece quando eu atingir meu limite de leads?</h3>
            <p className="text-gray-600">Você será notificado quando estiver se aproximando do limite. Uma vez atingido, você não poderá adicionar novos leads até fazer um upgrade ou remover alguns leads existentes.</p>
          </div>
          
          <div>
            <h3 className="font-medium">Quantos usuários estão incluídos em cada plano?</h3>
            <p className="text-gray-600">Todos os planos incluem 1 usuário único.</p>
          </div>
          
          <div>
            <h3 className="font-medium">Como faço para mudar meu plano?</h3>
            <p className="text-gray-600">Você pode fazer upgrade a qualquer momento nesta página. Para fazer downgrade, escolha um plano com menor capacidade.</p>
          </div>
          
          <div>
            <h3 className="font-medium">Posso experimentar recursos premium antes de pagar?</h3>
            <p className="text-gray-600">Estamos trabalhando em um período de teste para novos usuários. Em breve esta funcionalidade estará disponível.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscription;
