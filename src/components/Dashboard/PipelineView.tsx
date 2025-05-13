
import React, { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLeadDragDrop } from '@/hooks/useLeadDragDrop';
import { useLeadManagement } from '@/hooks/useLeadManagement';
import { useFilterLeads } from '@/hooks/useFilterLeads';
import PipelineColumns from './PipelineColumns';
import AddLeadDialog from './AddLeadDialog';
import EditStageDialog from './EditStageDialog';
import PipelineActions from './PipelineActions';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/Dashboard/TaskForm';

const PipelineView = () => {
  // Starting with empty leads array
  const [leads, setLeads] = useState([]);
  const { refreshSubscriptionData, leadsCount, leadsLimit, plan } = useSubscription();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showEditStageDialog, setShowEditStageDialog] = useState(false);
  const { activeFilters, handleFilterChange, filterLeads } = useFilterLeads();

  const { 
    showAddLeadDialog, 
    setShowAddLeadDialog, 
    handleAddLeadClick, 
    handleAddLead,
    handleCreateTaskClick,
    handleCreateTask,
    showTaskDialog,
    setShowTaskDialog,
    getTaskDialogComponent
  } = useLeadManagement(
    leads, 
    setLeads, 
    user, 
    refreshSubscriptionData, 
    plan, 
    leadsCount, 
    leadsLimit
  );

  const taskDialogProps = getTaskDialogComponent();

  const { 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDragLeave, 
    handleDrop 
  } = useLeadDragDrop(leads, setLeads, user, setIsLoading);

  // Apply filters to leads
  const filteredLeads = filterLeads(leads);

  return (
    <div className="w-full overflow-auto">
      <PipelineActions
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onEditStage={() => setShowEditStageDialog(true)}
      />

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
      
      {/* Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskDialog(false)}
            leadName={taskDialogProps.currentLead?.name}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PipelineView;
