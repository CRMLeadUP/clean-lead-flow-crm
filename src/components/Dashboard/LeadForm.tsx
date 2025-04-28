
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface LeadFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    expectedRevenue: initialData?.expectedRevenue || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { leadsCount, leadsLimit, plan } = useSubscription();
  const isAtLimit = plan === 'free' && leadsCount >= leadsLimit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }
    
    if (!formData.expectedRevenue) {
      newErrors.expectedRevenue = 'Receita esperada é obrigatória';
    } else if (isNaN(Number(formData.expectedRevenue)) || Number(formData.expectedRevenue) <= 0) {
      newErrors.expectedRevenue = 'Valor inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check subscription limits
    if (isAtLimit) {
      toast.error(`Você atingiu o limite de ${leadsLimit} leads do plano ${plan === 'free' ? 'Gratuito' : 'PRO'}.`);
      return;
    }
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        expectedRevenue: Number(formData.expectedRevenue),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isAtLimit && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4">
          <p className="text-amber-800 text-sm font-medium">Limite de leads atingido</p>
          <p className="text-amber-700 text-xs mt-1">
            Você atingiu o limite de {leadsLimit} leads do seu plano atual.
          </p>
          <Link to="/subscription" className="text-primary text-xs font-medium block mt-2">
            Faça upgrade para o plano PRO
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome completo"
            className={errors.name ? 'border-red-500' : ''}
            disabled={isAtLimit}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Empresa *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nome da empresa"
            className={errors.company ? 'border-red-500' : ''}
            disabled={isAtLimit}
          />
          {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            className={errors.email ? 'border-red-500' : ''}
            disabled={isAtLimit}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className={errors.phone ? 'border-red-500' : ''}
            disabled={isAtLimit}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expectedRevenue">Receita Esperada (R$) *</Label>
          <Input
            id="expectedRevenue"
            name="expectedRevenue"
            type="number"
            value={formData.expectedRevenue}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={errors.expectedRevenue ? 'border-red-500' : ''}
            disabled={isAtLimit}
          />
          {errors.expectedRevenue && <p className="text-red-500 text-xs">{errors.expectedRevenue}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Adicione notas ou observações sobre este lead"
          rows={3}
          disabled={isAtLimit}
        />
      </div>
      
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
