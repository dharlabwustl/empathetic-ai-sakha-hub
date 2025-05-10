
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Universal Sidebar - Always shown unless on mobile */}
      {!isMobile && <UniversalSidebar collapsed={false} />}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
