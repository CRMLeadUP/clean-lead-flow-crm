
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Bem-vindo ao LeadUP CRM!</h1>
          <p className="text-muted-foreground">Pronto para alavancar seus resultados?</p>
        </div>
        {children}
      </div>
    </MainLayout>
  );
};

export default DashboardContainer;
