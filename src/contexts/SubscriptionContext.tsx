
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
  upgradeSubscription: (planType: SubscriptionPlan) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const planLimits = {
  free: 10,
  pro: 300,
  advanced: 1000,
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
      
      // Fetch user's subscription plan from user_plans table
      const { data: userPlanData, error: userPlanError } = await supabase
        .from('user_plans')
        .select('plan_type')
        .eq('user_id', user.id)
        .single();

      if (userPlanError && userPlanError.code !== 'PGRST116') {
        // PGRST116 is "No rows returned" which just means the user doesn't have a plan yet
        console.error('Error fetching user plan:', userPlanError);
        
        // If no plan exists, create a default 'free' plan for the user
        if (userPlanError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('user_plans')
            .insert({ user_id: user.id, plan_type: 'free' });
            
          if (insertError) throw insertError;
          setPlan('free');
        } else {
          throw userPlanError;
        }
      } else if (userPlanData) {
        // Set the user's plan based on plan_type from user_plans
        setPlan(userPlanData.plan_type as SubscriptionPlan);
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

  // Modificamos para permitir upgrade para qualquer plano
  const upgradeSubscription = async (planType: SubscriptionPlan = 'pro') => {
    if (!user) return;
    
    try {
      toast.info(`Iniciando processo de upgrade para o plano ${planType.toUpperCase()}...`);
      
      // Update the user's plan in the user_plans table
      const { error } = await supabase
        .from('user_plans')
        .update({ plan_type: planType })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      await refreshSubscriptionData();
      toast.success(`Parabéns! Você agora é um usuário ${planType.toUpperCase()}!`);
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
