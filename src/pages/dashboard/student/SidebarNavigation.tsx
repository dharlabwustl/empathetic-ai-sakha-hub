
import React from 'react';
import UnifiedSidebar from '@/components/dashboard/UnifiedSidebar';

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  return <UnifiedSidebar activeTab={activeTab} onTabChange={onTabChange} />;
};

export default SidebarNavigation;
