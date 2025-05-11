
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

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
  <Card className={`relative overflow-hidden ${current ? 'border-primary border-2' : ''} ${popular ? 'shadow-lg' : 'shadow-sm'}`}>
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
      <Button 
        variant={buttonVariant} 
        className="w-full" 
        onClick={onButtonClick}
        disabled={current || disabled}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const Subscription = () => {
  const { plan, upgradeSubscription } = useSubscription();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PricingCard
          title="Grátis"
          price="Grátis"
          description="Para começar a gerenciar leads"
          features={[
            "Até 10 leads",
            "Gerenciamento de funil básico",
            "1 usuário",
            "Dashboard básico",
            "Suporte por email"
          ]}
          buttonText={isFree ? "Plano Atual" : "Fazer Downgrade"}
          buttonVariant={isFree ? "outline" : "default"}
          current={isFree}
          onButtonClick={() => upgradeSubscription('free')}
          disabled={isFree}
        />
        
        <PricingCard
          title="PRO"
          price={formatCurrency(19.90)}
          description="Para profissionais e pequenas equipes"
          features={[
            "Até 300 leads",
            "Gerenciamento de funil avançado",
            "5 usuários",
            "Etapas de funil personalizáveis",
            "Integração com WhatsApp",
            "Relatórios avançados",
            "Suporte prioritário"
          ]}
          buttonText={isPro ? "Plano Atual" : "Fazer Upgrade"}
          current={isPro}
          popular={true}
          onButtonClick={() => upgradeSubscription('pro')}
          disabled={isPro}
        />
        
        <PricingCard
          title="Avançado"
          price={formatCurrency(49.90)}
          description="Para equipes maiores e empresas"
          features={[
            "Leads ilimitados",
            "Gerenciamento de funil completo",
            "Usuários ilimitados",
            "Integrações com APIs externas",
            "Relatórios personalizados",
            "API de acesso",
            "Importação/exportação de dados",
            "Suporte dedicado"
          ]}
          buttonText={isAdvanced ? "Plano Atual" : "Fazer Upgrade"}
          buttonVariant={isAdvanced ? "outline" : "default"}
          current={isAdvanced}
          onButtonClick={() => upgradeSubscription('advanced')}
          disabled={isAdvanced}
        />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">O que acontece quando eu atingir meu limite de leads?</h3>
            <p className="text-gray-600">Você será notificado quando estiver se aproximando do limite. Uma vez atingido, você não poderá adicionar novos leads até fazer um upgrade ou remover alguns leads existentes.</p>
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
