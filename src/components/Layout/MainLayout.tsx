
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  CreditCard,
  AlertTriangle,
  Moon,
  Sun,
  FileBarChart,
  ListChecks
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const { leadsCount, leadsLimit, usagePercentage, plan } = useSubscription();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Leads', path: '/leads' },
    { icon: <CreditCard size={20} />, label: 'Assinatura', path: '/subscription' },
    { icon: <FileBarChart size={20} />, label: 'Relatórios', path: '/reports' },
    { icon: <ListChecks size={20} />, label: 'Tarefas', path: '/tasks' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/profile' },
  ];
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const showWarning = plan === 'free' && usagePercentage >= 80;
  
  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full bg-background shadow-sm"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      {/* Sidebar - Changed background to white/background color */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-background dark:bg-background text-foreground lg:translate-x-0 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-border`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 border-b border-border">
            <Link to="/dashboard" className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/2b08e099-de56-4441-81b8-8aef38388b0e.png" 
                alt="LeadUP" 
                className="h-10 w-auto"
              />
              {/* Removed text "LeadUP" */}
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white font-medium'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                  
                  {item.label === 'Assinatura' && showWarning && (
                    <AlertTriangle size={16} className="ml-2 text-amber-500" />
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Lead usage for free users */}
            {plan === 'free' && (
              <div className="mt-6 mx-4 p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-foreground">Uso de Leads</span>
                  <span className="text-foreground font-medium">{leadsCount}/{leadsLimit}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      usagePercentage >= 90 ? 'bg-red-500' : 
                      usagePercentage >= 70 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  ></div>
                </div>
                {usagePercentage >= 80 && (
                  <Link
                    to="/subscription"
                    className="text-xs flex items-center text-primary mt-2"
                  >
                    <span>Faça upgrade para o plano PRO</span>
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-foreground hover:text-foreground hover:bg-muted"
            >
              <LogOut size={18} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="bg-white dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <input 
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleDarkMode}
              className="flex items-center gap-1"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} />
              )}
            </Button>
            {/* Removed "Novo Lead" button */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
