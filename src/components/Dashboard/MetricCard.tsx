
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  color: string;
  icon?: React.ElementType;
  change?: string;
}

const MetricCard = ({ title, value, color, icon: Icon, change }: MetricCardProps) => (
  <Card className={`border-${color}-100`}>
    <CardContent className="p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {change} vs. mês passado
            </p>
          )}
        </div>
        {Icon && (
          <div className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default MetricCard;
