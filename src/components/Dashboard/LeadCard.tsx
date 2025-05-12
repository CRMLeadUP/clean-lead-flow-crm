
import React from 'react';
import { MoreHorizontal, Mail, Phone, Calendar, DollarSign, Building } from 'lucide-react';
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
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onDragStart, onDragEnd }) => {
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
              <h3 className="font-medium text-sm text-gray-900">{lead.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Building size={12} className="mr-1" />
                <span className="truncate max-w-[120px]">{lead.company}</span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 -mt-1 -mr-1">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel className="text-xs">Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  <Mail className="mr-1 h-3 w-3" />
                  <span>Enviar email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  <Phone className="mr-1 h-3 w-3" />
                  <span>Ligar</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">Editar lead</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs text-red-600">Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs">
            <div className="flex items-center">
              <DollarSign size={12} className="text-green-600 mr-1" />
              <span className="font-medium">{formattedRevenue}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={12} className="text-blue-600 mr-1" />
              <span>{formatDate(lead.lastContact)}</span>
            </div>
          </div>
          
          <div className="flex gap-1 mt-2">
            <Button size="sm" variant="outline" className="text-[10px] h-6 px-1 py-0 rounded">
              <Mail className="h-3 w-3 mr-1" /> Email
            </Button>
            <Button size="sm" variant="outline" className="text-[10px] h-6 px-1 py-0 rounded">
              <Phone className="h-3 w-3 mr-1" /> Ligar
            </Button>
            <div className="ml-auto">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 h-5 text-[10px]">
                Novo
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
