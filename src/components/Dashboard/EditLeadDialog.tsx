
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LeadForm from './LeadForm';

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  lead: any;
}

const EditLeadDialog: React.FC<EditLeadDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  lead
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>
        <LeadForm onSubmit={onSubmit} onCancel={onCancel} initialData={lead} />
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;
