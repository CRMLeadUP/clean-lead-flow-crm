
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define types for the context
type Plan = 'free' | 'pro' | 'advanced';

interface SubscriptionContextType {
  plan: Plan;
  leadsCount: number;
  leadsLimit: number;
  usagePercentage: number;
  isLoading: boolean;
  isProUser: boolean;
  refreshSubscriptionData: () => Promise<void>;
  upgradeSubscription: (newPlan: Plan) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  plan: 'free',
  leadsCount: 0,
  leadsLimit: 10,
  usagePercentage: 0,
  isLoading: true,
  isProUser: false,
  refreshSubscriptionData: async () => {},
  upgradeSubscription: async () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan>('free');
  const [leadsCount, setLeadsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Define lead limits based on plan
  const getPlanLimit = (plan: Plan): number => {
    switch (plan) {
      case 'pro':
        return 300;
      case 'advanced':
        return 1000;
      default:
        return 10;
    }
  };
  
  const leadsLimit = getPlanLimit(plan);
  const usagePercentage = Math.min(Math.round((leadsCount / leadsLimit) * 100), 100);
  const isProUser = plan !== 'free';

  // Load the subscription data
  const loadSubscriptionData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be fetched from a database
      // For now, let's get it from localStorage
      const savedPlan = localStorage.getItem('subscriptionPlan');
      if (savedPlan) {
        setPlan(savedPlan as Plan);
      }
      
      // Count leads from localStorage
      const savedLeads = localStorage.getItem('leads');
      if (savedLeads) {
        const leads = JSON.parse(savedLeads);
        setLeadsCount(leads.length);
      } else {
        setLeadsCount(0);
      }
      
    } catch (error) {
      console.error('Error loading subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Refresh the subscription data
  const refreshSubscriptionData = async () => {
    await loadSubscriptionData();
  };
  
  // Upgrade the subscription
  const upgradeSubscription = async (newPlan: Plan) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be a call to a payment processor
      // For now, just update the local state
      setPlan(newPlan);
      localStorage.setItem('subscriptionPlan', newPlan);
      
      // Refresh the data
      await refreshSubscriptionData();
      
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load the subscription data when the user changes
  useEffect(() => {
    if (user) {
      loadSubscriptionData();
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        leadsCount,
        leadsLimit,
        usagePercentage,
        isLoading,
        isProUser,
        refreshSubscriptionData,
        upgradeSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
