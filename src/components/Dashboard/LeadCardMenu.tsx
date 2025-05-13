
import React from 'react';
import { MoreHorizontal, Mail, Phone, Calendar, Edit, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface LeadCardMenuProps {
  lead: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  onCreateTask: () => void;
}

const LeadCardMenu: React.FC<LeadCardMenuProps> = ({ lead, onCreateTask }) => {
  // Email integration
  const handleEmailClick = () => {
    if (!lead.email) {
      toast.error("Email não disponível");
      return;
    }
    
    window.location.href = `mailto:${lead.email}?subject=Contato - ${lead.company}`;
    toast.success("Email aberto");
  };
  
  // Phone integration
  const handlePhoneClick = () => {
    if (!lead.phone) {
      toast.error("Telefone não disponível");
      return;
    }
    
    window.location.href = `tel:${lead.phone}`;
    toast.success("Chamada iniciada");
  };

  // WhatsApp integration
  const handleWhatsAppClick = () => {
    // Format phone number (remove non-digits)
    const formattedPhone = lead.phone?.replace(/\D/g, '');
    
    // Check if phone number is valid
    if (!formattedPhone || formattedPhone.length < 8) {
      toast.error("Número de telefone inválido");
      return;
    }
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, '_blank');
    toast.success("WhatsApp aberto");
  };

  // Edit lead
  const handleEditLeadClick = () => {
    toast.info("Funcionalidade de edição em desenvolvimento");
  };

  // Delete lead
  const handleDeleteLeadClick = () => {
    toast.info("Funcionalidade de exclusão em desenvolvimento");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 -mt-1 -mr-1">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs">Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs" onClick={handleEmailClick}>
          <Mail className="mr-1 h-3 w-3" />
          <span>Enviar email</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs" onClick={handlePhoneClick}>
          <Phone className="mr-1 h-3 w-3" />
          <span>Ligar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs" onClick={handleWhatsAppClick}>
          <MessageSquare className="mr-1 h-3 w-3" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs" onClick={handleEditLeadClick}>
          <Edit className="mr-1 h-3 w-3" />
          <span>Editar lead</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs" onClick={onCreateTask}>
          <Calendar className="mr-1 h-3 w-3" />
          <span>Criar tarefa</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs text-red-600" onClick={handleDeleteLeadClick}>
          <Trash2 className="mr-1 h-3 w-3" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeadCardMenu;
