
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  iconBackground?: string;
}

const MetricCard = ({ title, value, change, icon, iconBackground }: MetricCardProps) => (
  <div className="bg-card border rounded-lg shadow-sm p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {change && (
          <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {change} vs. mês anterior
          </p>
        )}
      </div>
      {icon && (
        <div className={`h-12 w-12 rounded-full ${iconBackground || 'bg-blue-100 dark:bg-blue-900/30'} flex items-center justify-center`}>
          {icon}
        </div>
      )}
    </div>
  </div>
);

export default MetricCard;
