
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PipelineView from '@/components/Dashboard/PipelineView';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, AlertTriangle, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from '@/components/Dashboard/LeadForm';
import { toast } from 'sonner';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Leads = () => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const { leadsCount, leadsLimit, plan, isLoading } = useSubscription();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    highValue: false,
    recent: false,
    noActivity: false
  });
  
  const isAtLimit = plan === 'free' && leadsCount >= leadsLimit;
  
  const handleAddLead = (data: any) => {
    // In a real app, we would add the lead to the database
    setShowAddLeadDialog(false);
    toast.success('Lead adicionado com sucesso!');
  };
  
  const handleFilterChange = (key: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <MainLayout>
      <div className="mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h1 className="text-xl font-bold">Funil de Vendas</h1>
            <p className="text-sm text-gray-500">Gerencie seus leads através das etapas de venda</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
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
            <Button onClick={() => setShowAddLeadDialog(true)} disabled={isAtLimit} size="sm">
              <PlusCircle className="mr-1 h-4 w-4" />
              Adicionar Lead
            </Button>
          </div>
        </div>
        
        {isAtLimit && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-3 flex items-start text-sm">
            <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-medium text-sm">Limite de leads atingido</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Você atingiu o limite de {leadsLimit} leads do seu plano atual. Faça upgrade para adicionar mais leads.
              </p>
              <Link to="/subscription" className="inline-block">
                <Button size="sm" variant="outline" className="mt-1 border-amber-500 text-amber-700 hover:bg-amber-100 text-xs h-7 px-2 py-0">
                  Fazer Upgrade para o Plano PRO
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        <div className="relative max-w-xs">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Buscar leads" 
            className="pl-8 h-8 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <PipelineView />
      </div>
      
      <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Lead</DialogTitle>
          </DialogHeader>
          <LeadForm onSubmit={handleAddLead} onCancel={() => setShowAddLeadDialog(false)} />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Leads;
