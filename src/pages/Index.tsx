
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-16 w-auto" // Increased logo size
            />
          </div>
          
          {/* Hide dark theme toggle on landing page */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Converta mais leads com nosso CRM inteligente
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Gerencie seus leads, organize seu pipeline de vendas e aumente suas conversões com nossa plataforma fácil de usar.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Dashboard Preview"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Pipeline de Vendas</h3>
              <p className="text-gray-600">
                Organize seus leads em um pipeline visual e personalizável para acompanhar cada etapa do processo de vendas.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Gestão de Tarefas</h3>
              <p className="text-gray-600">
                Crie e acompanhe tarefas relacionadas a cada lead para garantir que nenhuma oportunidade seja perdida.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Relatórios Detalhados</h3>
              <p className="text-gray-600">
                Analise seu desempenho com relatórios detalhados sobre conversões, receita gerada e atividades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2023 LeadUP CRM. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
