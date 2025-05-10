
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalSidebar from '@/components/dashboard/UniversalSidebar';

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  
  // This component is now a wrapper for UniversalSidebar
  // to prevent breaking changes in existing components
  console.warn('SidebarNavigation is deprecated. Please use UniversalSidebar directly.');
  
  return (
    <div className="hidden">
      {/* Use Universal Sidebar across the app */}
    </div>
  );
};

export default SidebarNavigation;
