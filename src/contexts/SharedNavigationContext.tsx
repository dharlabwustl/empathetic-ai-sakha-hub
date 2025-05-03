
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface SharedNavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigateTo: (path: string, tabId: string) => void;
}

const SharedNavigationContext = createContext<SharedNavigationContextType | undefined>(undefined);

interface SharedNavigationProviderProps {
  children: ReactNode;
}

export const SharedNavigationProvider = ({ children }: SharedNavigationProviderProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const navigateTo = (path: string, tabId: string) => {
    setActiveTab(tabId);
    navigate(path);
  };

  return (
    <SharedNavigationContext.Provider value={{ activeTab, setActiveTab, navigateTo }}>
      {children}
    </SharedNavigationContext.Provider>
  );
};

export const useSharedNavigation = () => {
  const context = useContext(SharedNavigationContext);
  if (context === undefined) {
    throw new Error('useSharedNavigation must be used within a SharedNavigationProvider');
  }
  return context;
};
