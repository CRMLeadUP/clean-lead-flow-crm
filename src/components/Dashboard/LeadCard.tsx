
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
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  // Function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
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
      className="lead-card bg-white rounded-lg shadow-sm border border-gray-200 cursor-move transition-all duration-200 hover:shadow-md hover:border-primary/20"
      draggable={true}
      onDragStart={(e) => onDragStart(e, lead.id)}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Avatar circle with initials */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-medium text-sm`}>
          {getInitials(lead.name)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{lead.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Building size={14} className="mr-1" />
                <span>{lead.company}</span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Enviar email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Ligar</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Editar lead</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center text-sm">
              <DollarSign size={14} className="text-green-600 mr-1" />
              <span className="font-medium">{formattedRevenue}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={14} className="text-blue-600 mr-1" />
              <span>{formatDate(lead.lastContact)}</span>
            </div>
          </div>
          
          {lead.notes && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700 border-l-2 border-gray-300">
              {lead.notes}
            </div>
          )}
          
          <div className="flex gap-2 mt-3 border-t pt-3 border-gray-100">
            <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
              <Mail className="h-3 w-3 mr-1" /> Email
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
              <Phone className="h-3 w-3 mr-1" /> Ligar
            </Button>
            <div className="ml-auto">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Novo contato
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
