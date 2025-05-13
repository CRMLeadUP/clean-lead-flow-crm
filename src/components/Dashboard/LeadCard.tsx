
import React from 'react';
import LeadCardMenu from './LeadCardMenu';
import LeadCardInfo from './LeadCardInfo';
import LeadCardActions from './LeadCardActions';
import { getAvatarColor } from '@/utils/leadUtils';

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
  const avatarColor = getAvatarColor(lead.name);

  // WhatsApp integration
  const handleWhatsAppClick = () => {
    // Format phone number (remove non-digits)
    const formattedPhone = lead.phone?.replace(/\D/g, '');
    
    // Check if phone number is valid
    if (!formattedPhone || formattedPhone.length < 8) {
      return;
    }
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, '_blank');
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
            <LeadCardInfo 
              name={lead.name}
              company={lead.company}
              expectedRevenue={lead.expectedRevenue}
              lastContact={lead.lastContact}
            />
            
            <LeadCardMenu 
              lead={lead}
              onCreateTask={() => onCreateTask(lead)}
            />
          </div>
          
          <LeadCardActions 
            email={lead.email}
            phone={lead.phone}
            onCreateTask={() => onCreateTask(lead)}
            onWhatsAppClick={handleWhatsAppClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
