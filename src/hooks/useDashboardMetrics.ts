
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
    
    // Set up a listener to reload leads when they change
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'leads') {
        loadLeads();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes every 5 seconds to ensure data is fresh
    const interval = setInterval(loadLeads, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
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
      
    // Daily performance for the dashboard chart
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });
    
    const weeklyPerformance = lastSevenDays.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][date.getDay()];
      
      const leadsForDay = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt).toISOString().split('T')[0];
        return leadDate === dateString;
      }).length;
      
      return {
        name: dayName,
        value: leadsForDay,
        date: dateString
      };
    });
    
    return {
      totalLeads: leads.length,
      newLeadsThisWeek,
      negotiationStage: negotiationLeads,
      closedDeals,
      totalRevenue,
      conversionRate,
      weeklyPerformance
    };
  };

  // Get pending tasks 
  const getPendingTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) return 0;
    
    const tasks = JSON.parse(savedTasks);
    return tasks.filter((task: any) => !task.completed).length;
  };

  const metrics = getMetricsBasedOnData();
  
  return {
    metrics: {
      ...metrics,
      pendingTasks: getPendingTasks()
    },
    leads,
    leadsCount,
    leadsLimit
  };
};
