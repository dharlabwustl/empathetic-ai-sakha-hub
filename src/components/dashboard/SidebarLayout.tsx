
import React from 'react';
import Sidebar from './Sidebar';
import { UserProfileType } from '@/types/user/base';

interface SidebarLayoutProps {
  children: React.ReactNode;
  userProfile?: UserProfileType;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
