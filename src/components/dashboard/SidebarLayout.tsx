
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(false);
  
  const handleToggleSidebar = () => {
    setCollapsed(prev => !prev);
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Universal Sidebar - Always shown unless on mobile */}
      {!isMobile && <UniversalSidebar collapsed={collapsed} />}
      
      <div className="flex-1">
        <div className="p-4">
          {/* Sidebar toggle button */}
          {!isMobile && (
            <button 
              className="mb-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleToggleSidebar}
            >
              {collapsed ? '→' : '←'} {!collapsed && 'Collapse Sidebar'}
            </button>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
