
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Brain, Calendar, ChartBar, Sparkles, Target, BookOpen, LucideIcon } from "lucide-react";
import { DashboardTabsProps } from "@/pages/dashboard/student/DashboardContent";

const DashboardTabs = ({ activeTab, onTabChange, tabContents }: DashboardTabsProps) => {
  const tabs: { id: string; label: string; icon: LucideIcon }[] = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "today", label: "Today's Plan", icon: Calendar },
    { id: "academic", label: "Academic Advisor", icon: BookOpen },
    { id: "concepts", label: "Concepts", icon: Brain },
    { id: "progress", label: "Progress", icon: ChartBar },
    // Removed "feel-good" and "surrounding influences" tabs as requested
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors relative",
                isActive 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <span className="flex items-center space-x-2">
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"
                  style={{ bottom: "-2px" }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardTabs;
