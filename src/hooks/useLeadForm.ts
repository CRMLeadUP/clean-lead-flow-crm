
import { useState } from 'react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  expectedRevenue: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useLeadForm = (initialData?: any, isAtLimit?: boolean) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    expectedRevenue: initialData?.expectedRevenue || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    const newErrors: FormErrors = {};
    
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

  const getSubmitData = () => {
    return {
      ...formData,
      expectedRevenue: Number(formData.expectedRevenue),
    };
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    getSubmitData
  };
};
