
import React from 'react';
import { PlusCircle } from 'lucide-react';
import MetricCard from './MetricCard';

interface MetricsSectionProps {
  metrics: {
    totalLeads: number;
    newLeadsThisWeek: number;
    negotiationStage: number;
    closedDeals: number;
  };
  leadsCount: number;
  leadsLimit: number;
}

const MetricsSection = ({ metrics, leadsCount, leadsLimit }: MetricsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total de Leads"
        value={`${leadsCount}/${leadsLimit}`}
        color="blue"
        icon={PlusCircle}
        change="+15%"
      />
      <MetricCard
        title="Novos Leads (Semana)"
        value={metrics.newLeadsThisWeek}
        color="green"
        icon={PlusCircle}
        change="+8%"
      />
      <MetricCard
        title="Em Negociação"
        value={metrics.negotiationStage}
        color="orange"
        icon={PlusCircle}
        change="+12%"
      />
      <MetricCard
        title="Vendas Fechadas"
        value={metrics.closedDeals}
        color="purple"
        icon={PlusCircle}
        change="+5%"
      />
    </div>
  );
};

export default MetricsSection;
