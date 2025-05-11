
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { toast } from 'sonner';
import LeadFormAlert from './LeadFormAlert';
import LeadFormFields from './LeadFormFields';
import { useLeadForm } from '@/hooks/useLeadForm';

interface LeadFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { leadsCount, leadsLimit, plan } = useSubscription();
  const isAtLimit = plan === 'free' && leadsCount >= leadsLimit;
  
  const { formData, errors, handleChange, validateForm, getSubmitData } = useLeadForm(initialData, isAtLimit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check subscription limits
    if (isAtLimit) {
      toast.error(`Você atingiu o limite de ${leadsLimit} leads do plano ${plan === 'free' ? 'Gratuito' : 'PRO'}.`);
      return;
    }
    
    if (validateForm()) {
      onSubmit(getSubmitData());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LeadFormAlert 
        isAtLimit={isAtLimit} 
        leadsLimit={leadsLimit} 
        plan={plan} 
      />

      <LeadFormFields
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        isAtLimit={isAtLimit}
      />
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isAtLimit}>
          Salvar Lead
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
