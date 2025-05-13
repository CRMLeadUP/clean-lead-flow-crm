
import { useState } from 'react';

export interface ActiveFilters {
  highValue: boolean;
  recent: boolean;
  noActivity: boolean;
}

export const useFilterLeads = () => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    highValue: false,
    recent: false,
    noActivity: false
  });

  const handleFilterChange = (key: keyof ActiveFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Apply filters to leads
  const filterLeads = (leads: any[]) => {
    // If no filters are active, show all leads
    if (!activeFilters.highValue && !activeFilters.recent && !activeFilters.noActivity) {
      return leads;
    }

    return leads.filter(lead => {
      let matchesFilter = false;
      
      if (activeFilters.highValue && lead.expectedRevenue > 5000) {
        matchesFilter = true;
      }
      
      if (activeFilters.recent) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const leadDate = new Date(lead.createdAt);
        if (leadDate > oneWeekAgo) {
          matchesFilter = true;
        }
      }
      
      if (activeFilters.noActivity) {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const lastContact = new Date(lead.lastContact);
        if (lastContact < twoWeeksAgo) {
          matchesFilter = true;
        }
      }
      
      return matchesFilter;
    });
  };

  return {
    activeFilters,
    handleFilterChange,
    filterLeads
  };
};
