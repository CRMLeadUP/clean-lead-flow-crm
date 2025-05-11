
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  expectedRevenue: string;
  notes: string;
}

interface LeadFormFieldsProps {
  formData: FormData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isAtLimit: boolean;
}

const LeadFormFields: React.FC<LeadFormFieldsProps> = ({
  formData,
  errors,
  handleChange,
  isAtLimit
}) => {
  return (
    <>
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
    </>
  );
};

export default LeadFormFields;
