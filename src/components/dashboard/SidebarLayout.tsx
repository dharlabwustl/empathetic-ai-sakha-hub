
import React, { ReactNode, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLayoutProps {
  children: ReactNode;
}

// This wrapper component ensures consistent sidebar layout across all pages
const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Close sidebar when switching between mobile and desktop
  useEffect(() => {
    if (!isMobile) {
      setShowMobileSidebar(false);
    }
  }, [isMobile]);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && showMobileSidebar) {
        const sidebarElement = document.getElementById('universal-sidebar');
        const toggleButton = document.getElementById('mobile-sidebar-toggle');
        if (sidebarElement && !sidebarElement.contains(event.target as Node) && 
            toggleButton && !toggleButton.contains(event.target as Node)) {
          setShowMobileSidebar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, showMobileSidebar]);
  
  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileSidebar(!showMobileSidebar);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Backdrop for mobile sidebar */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setShowMobileSidebar(false)} 
        />
      )}
      
      {/* Universal Sidebar */}
      <div 
        id="universal-sidebar" 
        className={`${
          isMobile 
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
              }`
            : `relative transition-all duration-300 ${
                sidebarCollapsed ? 'w-[70px]' : 'w-[280px]'
              }`
        } shadow-lg`}
      >
        <UniversalSidebar collapsed={!isMobile && sidebarCollapsed} />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile sidebar toggle button */}
        {isMobile && (
          <Button
            id="mobile-sidebar-toggle"
            variant="outline"
            size="sm"
            className="fixed left-4 top-4 z-30 bg-white/90 backdrop-blur-sm"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        {/* Desktop sidebar toggle button */}
        {!isMobile && (
          <Button
            variant="outline"
            size="sm"
            className="fixed left-4 top-4 z-30 bg-white/90 backdrop-blur-sm"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        )}
        
        <div className="pt-16 pb-4 px-4 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
