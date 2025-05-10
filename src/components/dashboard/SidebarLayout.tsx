import React from 'react';
import UniversalSidebar from './UniversalSidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  // You could add state here to control sidebar collapse, but we'll keep it simple for now
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <UniversalSidebar collapsed={collapsed} />
      <div className="flex-1 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
