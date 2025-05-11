
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  CreditCard,
  AlertTriangle
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const { leadsCount, leadsLimit, usagePercentage, plan } = useSubscription();
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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full bg-white shadow-sm"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-100 lg:translate-x-0 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-24 border-b border-gray-100">
            <Link to="/dashboard" className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/dac53d45-87fa-4976-8c80-2ef55ca2b99b.png" 
                alt="LeadUP" 
                className="h-16" 
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
                      : 'text-gray-700 hover:bg-gray-100'
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
              <div className="mt-6 mx-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Uso de Leads</span>
                  <span className="font-medium">{leadsCount}/{leadsLimit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
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
          
          <div className="p-4 border-t border-gray-100">
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
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
