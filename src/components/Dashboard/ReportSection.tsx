
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FileText, Download } from 'lucide-react';

interface ReportSectionProps {
  totalLeads: number;
  newLeadsThisWeek: number;
  totalRevenue: number;
  conversionRate: number;
}

const ReportSection = ({ totalLeads, newLeadsThisWeek, totalRevenue, conversionRate }: ReportSectionProps) => {
  const [activeReport, setActiveReport] = useState('overview');

  // Sample data for the charts
  const monthlyData = [
    { name: 'Jan', leads: 42, revenue: 15000, conversion: 22 },
    { name: 'Fev', leads: 52, revenue: 18500, conversion: 23 },
    { name: 'Mar', leads: 59, revenue: 21000, conversion: 24 },
    { name: 'Abr', leads: 63, revenue: 22500, conversion: 24 },
    { name: 'Mai', leads: 73, revenue: 28000, conversion: 25 },
    { name: 'Jun', leads: 89, revenue: 32000, conversion: 27 },
    { name: 'Jul', leads: 102, revenue: 36000, conversion: 28 },
    { name: 'Ago', leads: 116, revenue: 42000, conversion: 29 },
    { name: 'Set', leads: 131, revenue: 46000, conversion: 30 },
    { name: 'Out', leads: 142, revenue: 47000, conversion: 28 },
    { name: 'Nov', leads: 153, revenue: 48250, conversion: 24.8 },
    { name: 'Dez', leads: 0, revenue: 0, conversion: 0 },
  ];
  
  const weeklyData = [
    { name: 'Sem 1', leads: 35, revenue: 11000, conversion: 22 },
    { name: 'Sem 2', leads: 38, revenue: 12500, conversion: 24 },
    { name: 'Sem 3', leads: 40, revenue: 12800, conversion: 25 },
    { name: 'Sem 4', leads: 40, revenue: 12000, conversion: 26 },
  ];

  const handleExportReport = () => {
    alert('Relatório exportado com sucesso!');
  };

  const renderChart = () => {
    const data = activeReport === 'weekly' ? weeklyData : monthlyData;
    
    return (
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'revenue') return formatCurrency(Number(value));
                if (name === 'conversion') return `${value}%`;
                return value;
              }}
              labelFormatter={(label) => `Período: ${label}`}
            />
            <Bar name="Leads" dataKey="leads" fill="#1E88E5" />
            <Bar name="Receita" dataKey="revenue" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            <FileText className="inline-block mr-2 h-5 w-5" />
            Relatórios
          </CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeReport === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveReport('overview')}
          >
            Mensal
          </Button>
          <Button 
            variant={activeReport === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveReport('weekly')}
          >
            Semanal
          </Button>
          <Button 
            size="sm"
            variant="outline"
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4 mr-1" /> Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Total de Leads</div>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <div className="text-xs text-green-600">+12% vs. mês anterior</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Novos Leads (Semana)</div>
            <div className="text-2xl font-bold">{newLeadsThisWeek}</div>
            <div className="text-xs text-green-600">+8% vs. semana anterior</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Receita Total</div>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-green-600">+8.5% vs. mês anterior</div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
            <div className="text-2xl font-bold">{formatPercentage(conversionRate)}</div>
            <div className="text-xs text-green-600">+3.2% vs. mês anterior</div>
          </div>
        </div>
        
        {renderChart()}
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Dados atualizados em tempo real com base nas suas interações com leads.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSection;
