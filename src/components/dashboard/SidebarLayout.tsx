
import React, { ReactNode, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import UniversalSidebar from './UniversalSidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarLayoutProps {
  children: ReactNode;
}

// This wrapper component ensures consistent sidebar layout across all pages
const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Close sidebar when route changes or screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowMobileSidebar(false);
    }
  }, [isMobile]);

  // Handle outside click to close mobile sidebar
  useEffect(() => {
    if (!isMobile) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebarElement = document.getElementById('mobile-sidebar');
      if (showMobileSidebar && sidebarElement && !sidebarElement.contains(e.target as Node)) {
        setShowMobileSidebar(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showMobileSidebar, isMobile]);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showMobileSidebar]);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Desktop sidebar - always shown on desktop */}
      {!isMobile && (
        <div className="relative">
          <UniversalSidebar collapsed={false} />
        </div>
      )}
      
      {/* Mobile sidebar with animation */}
      <AnimatePresence>
        {isMobile && showMobileSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowMobileSidebar(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              id="mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed z-50 h-full"
            >
              <UniversalSidebar collapsed={false} />
              
              {/* Close button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-4 right-2 z-10"
                onClick={() => setShowMobileSidebar(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-30 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg"
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
