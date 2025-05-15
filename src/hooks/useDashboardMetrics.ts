
import { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';

export const useDashboardMetrics = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const { leadsCount, leadsLimit } = useSubscription();
  
  // Load leads and calculate metrics
  useEffect(() => {
    const loadLeads = () => {
      const savedLeads = localStorage.getItem('leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    };
    
    loadLeads();
  }, []);

  // Calculate metrics based on actual lead data
  const getMetricsBasedOnData = () => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Filter leads by date and stage
    const newLeadsThisWeek = leads.filter(lead => {
      const createdAt = new Date(lead.createdAt);
      return createdAt >= oneWeekAgo;
    }).length;
    
    const negotiationLeads = leads.filter(lead => 
      lead.stage === 'meeting_scheduled' || lead.stage === 'proposal_sent'
    ).length;
    
    const closedDeals = leads.filter(lead => lead.stage === 'closed_won').length;
    
    // Calculate total revenue from won deals
    const totalRevenue = leads
      .filter(lead => lead.stage === 'closed_won')
      .reduce((sum, lead) => sum + (lead.expectedRevenue || 0), 0);
    
    // Calculate conversion rate
    const conversionRate = leads.length > 0 
      ? Math.round((closedDeals / leads.length) * 100) 
      : 0;
    
    return {
      totalLeads: leads.length,
      newLeadsThisWeek,
      negotiationStage: negotiationLeads,
      closedDeals,
      totalRevenue,
      conversionRate
    };
  };

  return {
    metrics: getMetricsBasedOnData(),
    leads,
    leadsCount,
    leadsLimit
  };
};
