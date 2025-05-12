
import React from 'react';
import { MoreHorizontal, Mail, Phone, Calendar, DollarSign, Building, MessageSquare, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface LeadCardProps {
  lead: {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    expectedRevenue: number;
    notes: string;
    lastContact: string;
  };
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onCreateTask: (lead: any) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onDragStart, onDragEnd, onCreateTask }) => {
  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(lead.expectedRevenue);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
  };

  // Generate a consistent color based on the lead name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-amber-500',
      'bg-purple-500', 'bg-rose-500', 'bg-indigo-500',
      'bg-teal-500', 'bg-cyan-500', 'bg-pink-500'
    ];
    
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  };

  const avatarColor = getAvatarColor(lead.name);

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

  // Task creation
  const handleCreateTaskClick = () => {
    onCreateTask(lead);
    toast.success("Tarefa criada para " + lead.name);
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
    <div
      className="lead-card bg-white rounded-md shadow-sm border border-gray-200 cursor-move transition-all duration-200 hover:shadow-md hover:border-primary/20 p-2"
      draggable={true}
      onDragStart={(e) => onDragStart(e, lead.id)}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-2">
        {/* Color indicator */}
        <div className={`flex-shrink-0 w-1 h-full rounded-full ${avatarColor}`}></div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-xs text-gray-900">{lead.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Building size={10} className="mr-1" />
                <span className="truncate max-w-[100px] text-[10px]">{lead.company}</span>
              </div>
            </div>
            
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
                <DropdownMenuItem className="text-xs" onClick={handleCreateTaskClick}>
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>Criar tarefa</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-red-600" onClick={handleDeleteLeadClick}>
                  <Trash2 className="mr-1 h-3 w-3" />
                  <span>Excluir</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex justify-between items-center mt-1 text-xs">
            <div className="flex items-center">
              <DollarSign size={10} className="text-green-600 mr-1" />
              <span className="font-medium text-[10px]">{formattedRevenue}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={10} className="text-blue-600 mr-1" />
              <span className="text-[10px]">{formatDate(lead.lastContact)}</span>
            </div>
          </div>
          
          <div className="flex gap-1 mt-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-[10px] h-5 px-1 py-0 rounded" 
              onClick={handleEmailClick}
            >
              <Mail className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-[10px] h-5 px-1 py-0 rounded" 
              onClick={handlePhoneClick}
            >
              <Phone className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-[10px] h-5 px-1 py-0 rounded bg-green-50 text-green-600 hover:bg-green-100" 
              onClick={handleWhatsAppClick}
            >
              {/* WhatsApp logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-3 w-3 fill-current">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-[10px] h-5 px-1 py-0 rounded ml-auto bg-blue-50 text-blue-600 hover:bg-blue-100" 
              onClick={handleCreateTaskClick}
            >
              <Calendar className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
