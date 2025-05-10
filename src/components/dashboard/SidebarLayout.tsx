
import React from 'react';
import UniversalSidebar from './UniversalSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {!isMobile && <UniversalSidebar collapsed={collapsed} />}
      <div className="flex-1 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
