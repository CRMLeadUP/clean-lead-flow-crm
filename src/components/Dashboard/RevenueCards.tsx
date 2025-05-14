
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface RevenueCardsProps {
  totalRevenue: number;
  conversionRate: number;
}

const RevenueCards = ({ totalRevenue, conversionRate }: RevenueCardsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Receita Total</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-green-600 mt-1">+12% vs. mês passado</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
              Crescendo
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Taxa de Conversão</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold">{conversionRate}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                {conversionRate > 0 
                  ? 'Baseado nos leads fechados' 
                  : 'Sem dados suficientes'}
              </p>
            </div>
            <div className={`${
              conversionRate > 15 ? 'bg-green-100 text-green-800' :
              conversionRate > 0 ? 'bg-amber-100 text-amber-800' :
              'bg-gray-100 text-muted-foreground'
            } px-3 py-1 rounded text-sm`}>
              {conversionRate > 15 ? 'Excelente' : 
               conversionRate > 0 ? 'Regular' : 'Sem dados'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueCards;
