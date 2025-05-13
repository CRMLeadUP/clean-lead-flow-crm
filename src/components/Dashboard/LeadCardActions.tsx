
import React from 'react';
import { Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LeadCardActionsProps {
  email: string;
  phone: string;
  onCreateTask: () => void;
  onWhatsAppClick: () => void;
  planType?: string;
}

const LeadCardActions: React.FC<LeadCardActionsProps> = ({ 
  email, 
  phone,
  onCreateTask,
  onWhatsAppClick,
  planType = 'free'
}) => {
  // Email action
  const handleEmailClick = () => {
    if (!email) {
      toast.error("Email não disponível");
      return;
    }
    
    window.location.href = `mailto:${email}`;
    toast.success("Email aberto");
  };
  
  // Phone action
  const handlePhoneClick = () => {
    if (!phone) {
      toast.error("Telefone não disponível");
      return;
    }
    
    window.location.href = `tel:${phone}`;
    toast.success("Chamada iniciada");
  };
  
  // WhatsApp action with plan check
  const handleWhatsAppClick = () => {
    if (planType === 'free') {
      toast.error('Integração com WhatsApp disponível apenas nos planos PRO e Avançado');
      return;
    }
    onWhatsAppClick();
  };

  return (
    <div className="flex gap-1 mt-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full h-6 w-6 p-0"
        onClick={handleEmailClick}
        title="Enviar email"
      >
        <Mail size={12} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full h-6 w-6 p-0"
        onClick={handlePhoneClick}
        title="Ligar"
      >
        <Phone size={12} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full h-6 w-6 p-0"
        onClick={handleWhatsAppClick}
        title="WhatsApp"
      >
        <MessageSquare size={12} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full h-6 w-6 p-0"
        onClick={onCreateTask}
        title="Criar tarefa"
      >
        <Calendar size={12} />
      </Button>
    </div>
  );
};

export default LeadCardActions;
