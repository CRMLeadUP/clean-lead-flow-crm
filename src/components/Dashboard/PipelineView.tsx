
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
  // Starting with mock data for leads
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Maria Silva",
      company: "Techno Solutions",
      email: "maria@techno.com",
      phone: "11987654321",
      expectedRevenue: 5500,
      notes: "Interessada em nosso pacote premium",
      stage: "new_leads",
      createdAt: "2023-09-10T15:30:00Z",
      lastContact: "2023-09-10T15:30:00Z"
    },
    {
      id: 2,
      name: "João Santos",
      company: "Construções JS",
      email: "joao@construcoes.com",
      phone: "11912345678",
      expectedRevenue: 3200,
      notes: "Solicitou orçamento detalhado",
      stage: "contacted",
      createdAt: "2023-09-05T10:15:00Z",
      lastContact: "2023-09-08T13:45:00Z"
    },
    {
      id: 3,
      name: "Ana Carolina",
      company: "Design Inovador",
      email: "ana@design.com",
      phone: "11998765432",
      expectedRevenue: 7800,
      notes: "Reunião agendada para próxima semana",
      stage: "negotiation",
      createdAt: "2023-08-28T09:20:00Z",
      lastContact: "2023-09-07T11:30:00Z"
    }
  ]);
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
    </div>
  );
};

export default PipelineView;
