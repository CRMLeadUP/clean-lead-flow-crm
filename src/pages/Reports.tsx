
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReportSection from '@/components/Dashboard/ReportSection';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

const Reports = () => {
  const { metrics } = useDashboardMetrics();

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Relatórios</h1>
          <p className="text-muted-foreground">Acompanhe seus resultados e métricas em tempo real</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Métricas principais do seu negócio</CardDescription>
          </CardHeader>
          <CardContent>
            <ReportSection
              totalLeads={metrics.totalLeads}
              newLeadsThisWeek={metrics.newLeadsThisWeek}
              totalRevenue={metrics.totalRevenue}
              conversionRate={metrics.conversionRate}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Reports;
