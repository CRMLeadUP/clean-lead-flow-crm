
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from './LeadForm';

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddLeadDialog: React.FC<AddLeadDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
        </DialogHeader>
        <LeadForm onSubmit={onSubmit} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadDialog;
