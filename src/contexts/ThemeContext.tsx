
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const defaultValue: ThemeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const location = useLocation();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Use saved preference, or system preference if nothing saved
    return savedTheme ? savedTheme === 'dark' : prefersDarkMode;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update document class for global styling with smooth transition
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Add a small transition delay for smoother theme change
    html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    return () => {
      html.style.transition = '';
    };
  }, [isDarkMode]);

  // Reset to light mode on the landing page
  useEffect(() => {
    if (location.pathname === '/') {
      setIsDarkMode(false);
    }
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
