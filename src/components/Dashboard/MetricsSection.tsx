
import React from 'react';
import { Users, BarChart2, CircleDollarSign, CheckSquare } from 'lucide-react';
import MetricCard from './MetricCard';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface MetricsSectionProps {
  metrics: {
    totalLeads: number;
    newLeadsThisWeek: number;
    negotiationStage: number;
    closedDeals: number;
    totalRevenue: number;
    conversionRate: number;
    pendingTasks: number;
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
        change={metrics.newLeadsThisWeek > 0 ? `+${metrics.newLeadsThisWeek}` : "0"}
        icon={<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        iconBackground="bg-blue-100 dark:bg-blue-900/30"
      />
      <MetricCard
        title="Taxa de Conversão"
        value={formatPercentage(metrics.conversionRate)}
        change={metrics.conversionRate > 0 ? "+3.2%" : "0%"}
        icon={<BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />}
        iconBackground="bg-green-100 dark:bg-green-900/30"
      />
      <MetricCard
        title="Tarefas Pendentes"
        value={metrics.pendingTasks}
        change="+12%"
        icon={<CheckSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />}
        iconBackground="bg-orange-100 dark:bg-orange-900/30"
      />
      <MetricCard
        title="Receita Gerada"
        value={formatCurrency(metrics.totalRevenue)}
        change={metrics.totalRevenue > 0 ? "+8.5%" : "0%"}
        icon={<CircleDollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        iconBackground="bg-purple-100 dark:bg-purple-900/30"
      />
    </div>
  );
};

export default MetricsSection;
