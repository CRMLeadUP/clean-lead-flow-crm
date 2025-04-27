
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PipelineView from '@/components/Dashboard/PipelineView';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from '@/components/Dashboard/LeadForm';
import { toast } from 'sonner';

const Leads = () => {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  
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
          <Button onClick={() => setShowAddLeadDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Lead
          </Button>
        </div>
        
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
