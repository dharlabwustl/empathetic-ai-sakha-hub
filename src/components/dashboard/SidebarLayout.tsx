
import React, { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';

interface SidebarLayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

// This wrapper component ensures consistent sidebar layout across all pages
const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, hideSidebar = false }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Universal Sidebar - Always shown unless on mobile or explicitly hidden */}
      {!isMobile && !hideSidebar && <UniversalSidebar />}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
