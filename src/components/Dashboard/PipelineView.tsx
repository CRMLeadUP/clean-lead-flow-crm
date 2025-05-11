
import React, { useState, useEffect } from 'react';
import { leadsMock } from '../../data/MockData';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLeadDragDrop } from '@/hooks/useLeadDragDrop';
import { useLeadManagement } from '@/hooks/useLeadManagement';
import PipelineColumns from './PipelineColumns';
import AddLeadDialog from './AddLeadDialog';

const PipelineView = () => {
  const [leads, setLeads] = useState(leadsMock);
  const { refreshSubscriptionData, leadsCount, leadsLimit, plan } = useSubscription();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    showAddLeadDialog, 
    setShowAddLeadDialog, 
    handleAddLeadClick, 
    handleAddLead 
  } = useLeadManagement(
    leads, 
    setLeads, 
    user, 
    refreshSubscriptionData, 
    plan, 
    leadsCount, 
    leadsLimit
  );

  const { 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDragLeave, 
    handleDrop 
  } = useLeadDragDrop(leads, setLeads, user, setIsLoading);

  // In a real app, we would fetch leads from Supabase here
  useEffect(() => {
    /*
    const fetchLeads = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('user_id', user.id);
            
          if (error) {
            toast.error('Erro ao carregar leads');
            console.error('Error fetching leads:', error);
            return;
          }
          
          if (data) {
            setLeads(data);
          }
        } catch (error) {
          console.error('Error fetching leads:', error);
          toast.error('Erro ao carregar leads');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchLeads();
    */
  }, [user]);

  return (
    <div className="w-full overflow-auto">
      <PipelineColumns
        leads={leads}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onAddLeadClick={handleAddLeadClick}
        isLoading={isLoading}
      />
      
      <AddLeadDialog
        open={showAddLeadDialog}
        onOpenChange={setShowAddLeadDialog}
        onSubmit={handleAddLead}
        onCancel={() => setShowAddLeadDialog(false)}
      />
    </div>
  );
};

export default PipelineView;
