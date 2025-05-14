
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
  Sun
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
    { icon: <Settings size={20} />, label: 'Perfil', path: '/profile' },
  ];
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const showWarning = plan === 'free' && usagePercentage >= 80;
  
  return (
    <div className="flex h-screen">
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
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-background border-r border-border lg:translate-x-0 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-28 border-b border-border">
            <Link to="/dashboard" className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/dac53d45-87fa-4976-8c80-2ef55ca2b99b.png" 
                alt="LeadUP" 
                className={`h-24 w-auto ${isDarkMode ? 'brightness-150' : ''}`}
              />
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
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-muted'
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
                  <span>Uso de Leads</span>
                  <span className="font-medium">{leadsCount}/{leadsLimit}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
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
              variant="outline"
              onClick={handleSignOut}
              className="w-full justify-start"
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
        <header className="px-6 py-3 border-b border-border flex justify-between items-center">
          <h1 className="text-lg font-semibold">LeadUP CRM</h1>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isDarkMode ? "outline" : "default"}
              onClick={toggleDarkMode}
              className="flex items-center gap-1"
            >
              {isDarkMode ? (
                <>
                  <Sun size={16} className="text-amber-400" />
                  <span className="hidden sm:inline">Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon size={16} />
                  <span className="hidden sm:inline">Tema Escuro</span>
                </>
              )}
            </Button>
            <Link to="/leads">
              <Button size="sm">
                Adicionar Lead
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
