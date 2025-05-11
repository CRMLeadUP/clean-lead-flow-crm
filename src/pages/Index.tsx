
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/dac53d45-87fa-4976-8c80-2ef55ca2b99b.png" 
              alt="LeadUP" 
              className="h-8"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-sm text-gray-600 hover:text-primary">Login</Link>
            <Button asChild>
              <Link to="/signup">Criar conta</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex-1 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Gerencie seus leads com simplicidade e eficiência</h1>
          <p className="text-lg mb-8 text-gray-600">
            Um CRM clean e intuitivo que ajuda você a acompanhar seu funil de vendas e converter mais leads em clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Começar agora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Já tenho uma conta</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="CRM Dashboard" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>
      
      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades principais</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Funil de Vendas</h3>
              <p className="text-gray-600">Visualize e gerencie seu pipeline de vendas em um único lugar com arrastar e soltar.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Acompanhamento em tempo real</h3>
              <p className="text-gray-600">Monitore o progresso dos seus leads e o desempenho da sua equipe em tempo real.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Relatórios e Análises</h3>
              <p className="text-gray-600">Obtenha insights valiosos sobre seu processo de vendas com relatórios detalhados.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2025 Clean CRM. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
