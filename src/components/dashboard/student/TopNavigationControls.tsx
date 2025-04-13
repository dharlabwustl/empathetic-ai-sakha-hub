
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, PanelLeft } from "lucide-react";
import { motion } from "framer-motion";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime
}) => {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      {/* Toggle sidebar button - improved position */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2"
      >
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-1 bg-white shadow-sm hover:bg-purple-50 border-purple-200 text-purple-700"
          onClick={onToggleSidebar}
        >
          {hideSidebar ? 
            <><ChevronRight width={15} height={15} /> Show Sidebar</> : 
            <><PanelLeft width={15} height={15} /> Hide Sidebar</>
          }
        </Button>
      </motion.div>
      
      {/* Date/time display */}
      <div className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
        <span>{formattedDate}</span>
        <span className="mx-2">•</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default TopNavigationControls;
