
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Settings, 
  LogOut, 
  Menu, 
  Moon, 
  Sun, 
  Bell, 
  ArrowRight
} from 'lucide-react';
import { NavigationItems } from '@/data/MockData';
import { Badge } from '@/components/ui/badge';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { plan, leadsCount, leadsLimit } = useSubscription();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  // Calculate lead usage percentage
  const usagePercentage = leadsLimit > 0 ? (leadsCount / leadsLimit) * 100 : 0;
  
  // Badge color based on percentage
  const getBadgeColor = () => {
    if (usagePercentage >= 90) return "bg-red-500";
    if (usagePercentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 p-4 bg-background border-b flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
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
                className="h-14 w-auto" // Increased logo size
              />
              {/* Removed text "LeadUP" */}
            </Link>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            <nav className="px-2 py-4">
              {NavigationItems.map((item, index) => (
                <div key={index} className="mb-1">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-white font-medium'
                        : 'text-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    
                    {item.path === "/leads" && leadsCount > 0 && (
                      <Badge variant="outline" className="ml-auto">
                        {leadsCount}
                      </Badge>
                    )}
                  </Link>
                </div>
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
                    style={{ width: `${Math.min(100, usagePercentage)}%` }}
                  ></div>
                </div>
                
                {usagePercentage >= 70 && (
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => navigate('/subscription')}
                    >
                      Upgrade para PRO
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
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
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/profile')}
            >
              <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <Sun size={18} />
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
