
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen">
      {/* Universal Sidebar - Always shown unless on mobile */}
      {!isMobile && <UniversalSidebar collapsed={false} />}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
