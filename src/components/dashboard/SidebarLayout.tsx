
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
        if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
          setShowMobileSidebar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, showMobileSidebar]);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Universal Sidebar - Always shown on desktop, conditionally on mobile */}
      {(!isMobile || showMobileSidebar) && (
        <div 
          id="universal-sidebar" 
          className={`${isMobile ? 'fixed z-50 h-full shadow-lg' : 'relative'}`}
          style={{
            width: isMobile ? '230px' : 'auto', // Fixed width on mobile
            maxWidth: '80vw' // Prevent from being too wide on small screens
          }}
        >
          <UniversalSidebar collapsed={false} />
          
          {/* Close button only shown on mobile */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute top-4 right-2 p-1"
              onClick={() => setShowMobileSidebar(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      {/* Mobile sidebar toggle button */}
      {isMobile && !showMobileSidebar && (
        <Button
          variant="outline"
          size="sm"
          className="fixed left-4 top-4 z-40 md:hidden p-1"
          onClick={() => setShowMobileSidebar(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex-1 pb-16 md:pb-0 pt-10 md:pt-0">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
