
import React from 'react';
import { Link } from 'react-router-dom';

interface LeadFormAlertProps {
  isAtLimit: boolean;
  leadsLimit: number;
  plan: string;
}

const LeadFormAlert: React.FC<LeadFormAlertProps> = ({ isAtLimit, leadsLimit, plan }) => {
  if (!isAtLimit) return null;
  
  return (
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4">
      <p className="text-amber-800 text-sm font-medium">Limite de leads atingido</p>
      <p className="text-amber-700 text-xs mt-1">
        Você atingiu o limite de {leadsLimit} leads do seu plano atual.
      </p>
      <Link to="/subscription" className="text-primary text-xs font-medium block mt-2">
        Faça upgrade para o plano PRO
      </Link>
    </div>
  );
};

export default LeadFormAlert;
