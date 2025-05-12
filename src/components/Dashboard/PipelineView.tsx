
import React, { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLeadDragDrop } from '@/hooks/useLeadDragDrop';
import { useLeadManagement } from '@/hooks/useLeadManagement';
import PipelineColumns from './PipelineColumns';
import AddLeadDialog from './AddLeadDialog';
import EditStageDialog from './EditStageDialog';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const PipelineView = () => {
  // Starting with empty leads array
  const [leads, setLeads] = useState([]);
  const { refreshSubscriptionData, leadsCount, leadsLimit, plan } = useSubscription();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showEditStageDialog, setShowEditStageDialog] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    highValue: false,
    recent: false,
    noActivity: false
  });

  const { 
    showAddLeadDialog, 
    setShowAddLeadDialog, 
    handleAddLeadClick, 
    handleAddLead,
    handleCreateTaskClick,
    handleCreateTask,
    TaskDialog 
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

  // Filter functionality
  const handleFilterChange = (key) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Apply filters to leads
  const filteredLeads = leads.filter(lead => {
    // If no filters are active, show all leads
    if (!activeFilters.highValue && !activeFilters.recent && !activeFilters.noActivity) {
      return true;
    }

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

  return (
    <div className="w-full overflow-auto">
      <div className="flex justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={14} />
              <span>Filtrar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={activeFilters.highValue}
              onCheckedChange={() => handleFilterChange('highValue')}
            >
              Alto valor ({'>'}R$5.000)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.recent}
              onCheckedChange={() => handleFilterChange('recent')}
            >
              Adicionados recentemente (7 dias)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.noActivity}
              onCheckedChange={() => handleFilterChange('noActivity')}
            >
              Sem atividade ({'>'}14 dias)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2"
          onClick={() => setShowEditStageDialog(true)}
        >
          Editar Etapas
        </Button>
      </div>

      <PipelineColumns
        leads={filteredLeads}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onAddLeadClick={handleAddLeadClick}
        onCreateTask={handleCreateTaskClick}
        isLoading={isLoading}
        onEditStage={() => setShowEditStageDialog(true)}
      />
      
      <AddLeadDialog
        open={showAddLeadDialog}
        onOpenChange={setShowAddLeadDialog}
        onSubmit={handleAddLead}
        onCancel={() => setShowAddLeadDialog(false)}
      />

      <EditStageDialog
        open={showEditStageDialog}
        onOpenChange={setShowEditStageDialog}
      />
      
      <TaskDialog />
    </div>
  );
};

export default PipelineView;
