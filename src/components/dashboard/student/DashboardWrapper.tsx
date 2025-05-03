
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";
import SidebarNav from "./SidebarNav";
import TopNavigationControls from "./TopNavigationControls";

const DashboardWrapper: React.FC = () => {
  const [hideSidebar, setHideSidebar] = useLocalStorage<boolean>(
    "dashboard-hide-sidebar",
    false
  );

  const [formattedTime, setFormattedTime] = useState(format(new Date(), 'h:mm a'));
  const [formattedDate, setFormattedDate] = useState(format(new Date(), 'EEE, MMM d'));
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setFormattedTime(format(now, 'h:mm a'));
      setFormattedDate(format(now, 'EEE, MMM d'));
    };
    
    // Update now
    updateTime();
    
    // Set interval for updating time
    const intervalId = setInterval(updateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Mock function for tour - in a real implementation, this would open a tour guide
  const handleOpenTour = () => {
    console.log("Opening tour guide");
    // Implementation would go here in a real app
  };

  return (
    <div className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-950`}>
      <SidebarNav hidden={hideSidebar} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 overflow-hidden transition-all ${
          hideSidebar ? "md:pl-0" : "md:pl-64"
        }`}
      >
        <div className="container px-4 py-6">
          <TopNavigationControls
            hideSidebar={hideSidebar}
            onToggleSidebar={toggleSidebar}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
            onOpenTour={handleOpenTour}
          />

          <div className="py-2">
            <Outlet />
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardWrapper;
