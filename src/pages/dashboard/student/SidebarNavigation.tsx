
import React from 'react';
import UnifiedSidebar from '@/components/dashboard/UnifiedSidebar';
import WithTooltip from '@/components/dashboard/student/utils/TooltipUtils';

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  return <UnifiedSidebar activeTab={activeTab} onTabChange={onTabChange} />;
};

export default SidebarNavigation;
