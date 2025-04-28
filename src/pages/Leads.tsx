
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PipelineView from '@/components/Dashboard/PipelineView';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from '@/components/Dashboard/LeadForm';
import { toast } from 'sonner';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Link } from 'react-router-dom';

const Leads = () => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const { leadsCount, leadsLimit, plan, isLoading } = useSubscription();
  
  const isAtLimit = plan === 'free' && leadsCount >= leadsLimit;
  
  const handleAddLead = (data: any) => {
    // In a real app, we would add the lead to the database
    setShowAddLeadDialog(false);
    toast.success('Lead adicionado com sucesso!');
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Funil de Vendas</h1>
            <p className="text-gray-500">Gerencie seus leads através das etapas de venda</p>
          </div>
          <Button onClick={() => setShowAddLeadDialog(true)} disabled={isAtLimit}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Lead
          </Button>
        </div>
        
        {isAtLimit && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-4 flex items-start">
            <AlertTriangle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-medium">Limite de leads atingido</p>
              <p className="text-amber-700 text-sm mt-1">
                Você atingiu o limite de {leadsLimit} leads do seu plano atual. Faça upgrade para adicionar mais leads.
              </p>
              <Link to="/subscription" className="inline-block">
                <Button size="sm" variant="outline" className="mt-2 border-amber-500 text-amber-700 hover:bg-amber-100">
                  Fazer Upgrade para o Plano PRO
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Buscar leads por nome, empresa ou email" 
            className="pl-10 max-w-lg"
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
