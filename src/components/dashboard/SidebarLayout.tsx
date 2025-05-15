
import React, { ReactNode, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLayoutProps {
  children: ReactNode;
}

// This wrapper component ensures consistent sidebar layout across all pages
const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Universal Sidebar - Always shown on desktop, conditionally on mobile */}
      {(!isMobile || showMobileSidebar) && (
        <div className={`${isMobile ? 'fixed z-50 h-full' : 'relative'}`}>
          <UniversalSidebar collapsed={false} />
          
          {/* Close button only shown on mobile */}
          {isMobile && (
            <Button 
              variant="ghost" 
              className="absolute top-4 right-2"
              onClick={() => setShowMobileSidebar(false)}
            >
              ✕
            </Button>
          )}
        </div>
      )}
      
      {/* Mobile sidebar toggle button */}
      {isMobile && !showMobileSidebar && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden"
          onClick={() => setShowMobileSidebar(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
