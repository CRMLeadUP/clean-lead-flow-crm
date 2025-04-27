
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BarChart4, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { userMock } from '../../data/MockData';
import { Button } from '../ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Leads', path: '/leads', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart4 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-100 py-3 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button className="md:hidden mr-2" onClick={toggleMobileMenu}>
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <NavLink to="/dashboard" className="text-xl font-semibold text-primary">
            Clean CRM
          </NavLink>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4 text-right hidden sm:block">
            <div className="font-medium">{userMock.name}</div>
            <div className="text-xs text-gray-500">{userMock.role}</div>
          </div>
          <NavLink to="/profile" className="block">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src={userMock.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </NavLink>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Side Navigation */}
        <nav className={`${
          showMobileMenu ? 'translate-x-0' : '-translate-x-full'
        } fixed md:static md:translate-x-0 z-30 bg-white border-r border-gray-100 w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out`}>
          <div className="py-6 px-4 flex flex-col h-full">
            <div className="flex-1">
              <ul>
                {navItems.map((item) => (
                  <li key={item.name} className="mb-2">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`
                      }
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto">
              <Button variant="outline" className="w-full justify-start" asChild>
                <NavLink to="/login" className="flex items-center">
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </NavLink>
              </Button>
            </div>
          </div>
        </nav>
        
        {/* Overlay for mobile menu */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 bg-black/20 z-20 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
