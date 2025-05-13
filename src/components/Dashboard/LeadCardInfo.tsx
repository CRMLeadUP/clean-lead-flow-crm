
import React from 'react';
import { Building, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/leadUtils';

interface LeadCardInfoProps {
  name: string;
  company: string;
  expectedRevenue: number;
  lastContact: string;
}

const LeadCardInfo: React.FC<LeadCardInfoProps> = ({ 
  name, 
  company, 
  expectedRevenue, 
  lastContact 
}) => {
  return (
    <>
      <div>
        <h3 className="font-medium text-xs text-gray-900">{name}</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Building size={10} className="mr-1" />
          <span className="truncate max-w-[100px] text-[10px]">{company}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-1 text-xs">
        <div className="flex items-center">
          <DollarSign size={10} className="text-green-600 mr-1" />
          <span className="font-medium text-[10px]">{formatCurrency(expectedRevenue)}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={10} className="text-blue-600 mr-1" />
          <span className="text-[10px]">{formatDate(lastContact)}</span>
        </div>
      </div>
    </>
  );
};

export default LeadCardInfo;
