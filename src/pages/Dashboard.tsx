
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import PerformanceChart from '@/components/Dashboard/PerformanceChart';
import { performanceMetrics } from '../data/MockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { totalLeads, newLeadsThisWeek, negotiationStage, closedDeals, totalRevenue } = performanceMetrics;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const MetricCard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
    <Card className={`bg-${color}/5 border-${color}/30`}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo ao seu painel de controle, {performanceMetrics ? 'Jane' : 'Carregando...'}</p>
        </div>
        <Button asChild>
          <Link to="/leads">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Lead
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total de Leads"
          value={totalLeads}
          color="blue"
        />
        <MetricCard
          title="Novos Leads (Semana)"
          value={newLeadsThisWeek}
          color="green"
        />
        <MetricCard
          title="Em Negociação"
          value={negotiationStage}
          color="orange"
        />
        <MetricCard
          title="Vendas Fechadas"
          value={closedDeals}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Receita Total</h3>
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
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Taxa de Conversão</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">32.5%</p>
                <p className="text-sm text-red-600 mt-1">-4% vs. mês passado</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">
                Atenção
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <PerformanceChart />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Ações Recomendadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-medium">Acompanhe Leads em Negociação</h4>
              <p className="text-sm text-gray-600 mt-1">8 leads precisam de follow-up esta semana</p>
              <Button variant="link" className="mt-2 p-0 h-auto text-blue-600">
                Ver leads
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardContent className="p-4">
              <h4 className="font-medium">Leads Inativos</h4>
              <p className="text-sm text-gray-600 mt-1">3 leads sem interação há mais de 14 dias</p>
              <Button variant="link" className="mt-2 p-0 h-auto text-amber-600">
                Reativar leads
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <h4 className="font-medium">Oportunidades de Upsell</h4>
              <p className="text-sm text-gray-600 mt-1">5 clientes com potencial para novos produtos</p>
              <Button variant="link" className="mt-2 p-0 h-auto text-green-600">
                Analisar oportunidades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
