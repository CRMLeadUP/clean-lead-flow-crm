
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

interface ReportSectionProps {
  totalLeads: number;
  newLeadsThisWeek: number;
  totalRevenue: number;
  conversionRate: number;
}

const ReportSection = ({ totalLeads, newLeadsThisWeek, totalRevenue, conversionRate }: ReportSectionProps) => {
  const [activeReport, setActiveReport] = useState('overview');
  const { metrics } = useDashboardMetrics();
  
  // Generate monthly data based on actual leads
  const generateMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    
    // Get leads from localStorage
    const savedLeads = localStorage.getItem('leads');
    const allLeads = savedLeads ? JSON.parse(savedLeads) : [];
    
    return months.map((month, index) => {
      // Metrics for completed months use actual data
      // Future months have no data
      if (index > currentMonth) {
        return {
          name: month,
          leads: 0, 
          revenue: 0, 
          conversion: 0
        };
      }
      
      // Filter leads for this month
      const monthLeads = allLeads.filter((lead: any) => {
        const leadDate = new Date(lead.createdAt);
        return leadDate.getMonth() === index;
      });
      
      // Calculate metrics for this month
      const monthRevenue = monthLeads
        .filter((lead: any) => lead.stage === 'closed_won')
        .reduce((sum: number, lead: any) => sum + (lead.expectedRevenue || 0), 0);
        
      const closedDeals = monthLeads.filter((lead: any) => lead.stage === 'closed_won').length;
      const conversionRate = monthLeads.length > 0 
        ? Math.round((closedDeals / monthLeads.length) * 100) 
        : 0;
      
      return {
        name: month,
        leads: monthLeads.length,
        revenue: monthRevenue,
        conversion: conversionRate
      };
    });
  };
  
  // Generate weekly data based on actual leads
  const generateWeeklyData = () => {
    const weekNames = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get leads from localStorage
    const savedLeads = localStorage.getItem('leads');
    const allLeads = savedLeads ? JSON.parse(savedLeads) : [];
    
    return weekNames.map((weekName, index) => {
      // Calculate start and end dates for this week
      const startDate = new Date(currentYear, currentMonth, 1 + (index * 7));
      const endDate = new Date(currentYear, currentMonth, 7 + (index * 7));
      
      // Filter leads for this week
      const weekLeads = allLeads.filter((lead: any) => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= startDate && leadDate <= endDate;
      });
      
      // Calculate metrics for this week
      const weekRevenue = weekLeads
        .filter((lead: any) => lead.stage === 'closed_won')
        .reduce((sum: number, lead: any) => sum + (lead.expectedRevenue || 0), 0);
        
      const closedDeals = weekLeads.filter((lead: any) => lead.stage === 'closed_won').length;
      const conversionRate = weekLeads.length > 0 
        ? Math.round((closedDeals / weekLeads.length) * 100) 
        : 0;
      
      return {
        name: weekName,
        leads: weekLeads.length,
        revenue: weekRevenue,
        conversion: conversionRate
      };
    });
  };

  const monthlyData = generateMonthlyData();
  const weeklyData = generateWeeklyData();
  
  const handleExportReport = () => {
    // Generate report data
    const data = activeReport === 'weekly' ? weeklyData : monthlyData;
    
    // Convert data to CSV format
    let csv = 'Período,Leads,Receita,Conversão\n';
    data.forEach(item => {
      csv += `${item.name},${item.leads},${item.revenue},${item.conversion}%\n`;
    });
    
    // Create a downloadable link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `relatorio-${activeReport === 'weekly' ? 'semanal' : 'mensal'}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Relatório exportado com sucesso!');
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
