
// This component is no longer needed as we're using UniversalSidebar everywhere.
// This is a placeholder file to prevent import errors.
// All navigation should use UniversalSidebar instead.

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  
  // Note: This component is deprecated.
  // Please use UniversalSidebar component instead.
  console.warn('SidebarNavigation is deprecated. Please use UniversalSidebar instead.');
  
  return (
    <div className="hidden">
      {/* This component is deprecated */}
    </div>
  );
};

export default SidebarNavigation;
