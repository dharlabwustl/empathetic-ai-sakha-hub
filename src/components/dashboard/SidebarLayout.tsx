
import React, { ReactNode, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

interface SidebarLayoutProps {
  children: ReactNode;
}

// This wrapper component ensures consistent sidebar layout across all pages
const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-40">
          <Button 
            variant="outline" 
            size="icon"
            className="bg-white shadow-md"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            <Menu size={18} />
          </Button>
        </div>
      )}
      
      {/* Universal Sidebar - Shown based on device and state */}
      {(!isMobile || (isMobile && showMobileSidebar)) && (
        <div className={`${isMobile ? 'fixed z-30 h-full' : ''}`}>
          <UniversalSidebar 
            collapsed={false} 
            onClose={isMobile ? () => setShowMobileSidebar(false) : undefined}
          />
          
          {/* Overlay for mobile */}
          {isMobile && showMobileSidebar && (
            <div 
              className="fixed inset-0 bg-black/40 z-20" 
              onClick={() => setShowMobileSidebar(false)}
            />
          )}
        </div>
      )}
      
      <div className={`flex-1 ${isMobile ? 'w-full' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
