
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, CreditCard, Users, BarChart3 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const features = [
    {
      title: 'Gestão de Leads',
      description: 'Acompanhe e gerencie seus leads em todas as fases do funil de vendas.',
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      title: 'Dashboard Intuitivo',
      description: 'Visualize suas métricas e performance de vendas em tempo real.',
      icon: <BarChart3 className="w-10 h-10 text-primary" />
    },
    {
      title: 'Notificações e Tarefas',
      description: 'Mantenha-se organizado com lembretes e tarefas integradas.',
      icon: <CheckCircle className="w-10 h-10 text-primary" />
    },
    {
      title: 'Planos Flexíveis',
      description: 'Escolha o plano ideal para o tamanho e necessidades do seu negócio.',
      icon: <CreditCard className="w-10 h-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 px-6 md:px-10 border-b bg-background">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/2b08e099-de56-4441-81b8-8aef38388b0e.png" 
                alt="LeadUP Logo" 
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" onClick={toggleDarkMode} size="sm" className="mr-2">
              {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
            </Button>
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="container max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Transforme leads em <span className="text-primary">clientes satisfeitos</span> mais rápido</h2>
              <p className="text-lg mb-8">
                Plataforma completa para gerenciar seu funil de vendas, acompanhar leads e aumentar suas conversões com facilidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Grátis
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Faça Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-card p-4 rounded-lg shadow-lg border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Equipe trabalhando no CRM" 
                  className="rounded-md shadow-sm w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para aumentar suas vendas
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Recursos poderosos que ajudam a organizar, automatizar e otimizar seu processo comercial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos para equipes de todos os tamanhos
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Do profissional autônomo à grande equipe de vendas, temos o plano ideal para você.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Básico</CardTitle>
                <div className="mt-1">
                  <span className="text-3xl font-bold">Grátis</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ideal para começar a gerenciar leads</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Até 10 leads</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Visualização básica de pipeline</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios simples (1 relatório mensal)</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  <Link to="/signup" className="w-full">Começar Grátis</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary border-2 shadow-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                Mais Popular
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pro</CardTitle>
                <div className="mt-1">
                  <span className="text-3xl font-bold">R$29,90</span>
                  <span className="ml-1">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ideal para autônomos e pequenas equipes</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Até 300 leads</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Gerenciamento completo do pipeline</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios avançados (3 mensais)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Integração com WhatsApp</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">
                  <Link to="/signup" className="w-full">Iniciar Agora</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avançado</CardTitle>
                <div className="mt-1">
                  <span className="text-3xl font-bold">R$59,90</span>
                  <span className="ml-1">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ideal para profissionais exigentes</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Até 1000 leads</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Relatórios avançados ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Integração com ferramentas externas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Integração com WhatsApp</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priorização no suporte</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  <Link to="/signup" className="w-full">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/2b08e099-de56-4441-81b8-8aef38388b0e.png" 
                alt="LeadUP Logo" 
                className="h-14 w-auto mr-2 brightness-200"
              />
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 LeadUP. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
