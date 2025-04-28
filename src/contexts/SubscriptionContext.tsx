
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type SubscriptionPlan = 'free' | 'pro' | 'advanced';

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  leadsCount: number;
  leadsLimit: number;
  isLoading: boolean;
  isProUser: boolean;
  usagePercentage: number;
  refreshSubscriptionData: () => Promise<void>;
  upgradeSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const planLimits = {
  free: 10,
  pro: 300,
  advanced: 1000, // Placeholder for future implementation
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<SubscriptionPlan>('free');
  const [leadsCount, setLeadsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const leadsLimit = planLimits[plan];
  const isProUser = plan !== 'free';
  const usagePercentage = Math.min(Math.round((leadsCount / leadsLimit) * 100), 100);

  const fetchSubscriptionData = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Fetch user's subscription plan
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      if (subscriptionError) throw subscriptionError;
      
      // Set the user's plan
      if (subscriptionData) {
        setPlan(subscriptionData.plan as SubscriptionPlan);
      }

      // Count user's leads
      const { count, error: countError } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (countError) throw countError;
      setLeadsCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching subscription data:', error.message);
      toast.error('Erro ao carregar dados da assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSubscriptionData = async () => {
    await fetchSubscriptionData();
  };

  // This would integrate with a payment gateway in a real implementation
  const upgradeSubscription = async () => {
    if (!user) return;
    
    try {
      toast.info('Iniciando processo de upgrade para o plano PRO...');
      
      // For demo purposes, we'll just update the subscription in the database
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan: 'pro' })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      await refreshSubscriptionData();
      toast.success('Parabéns! Você agora é um usuário PRO!');
    } catch (error: any) {
      console.error('Error upgrading subscription:', error.message);
      toast.error('Erro ao realizar upgrade. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        leadsCount,
        leadsLimit,
        isLoading,
        isProUser,
        usagePercentage,
        refreshSubscriptionData,
        upgradeSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
