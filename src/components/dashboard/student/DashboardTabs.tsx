
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarDays, 
  GraduationCap, 
  BookOpen, 
  Brain, 
  FileText,
  Bell
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { QuickAccess } from './QuickAccess';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, ReactNode>;
  hideTabsNav?: boolean;
}

export default function DashboardTabs({
  activeTab,
  onTabChange,
  tabContents = {},
  hideTabsNav = false
}: DashboardTabsProps) {
  const isMobile = useIsMobile();
  
  // Updated main navigation tabs with more focused menu items
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, description: "Your personalized dashboard summary" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, description: "Daily tasks and schedule" },
    { id: "academic", label: "Academic", icon: GraduationCap, description: "Personalized academic guidance" },
    { id: "concepts", label: "Concepts", icon: BookOpen, description: "Key learning concepts" },
    { id: "flashcards", label: "Flashcards", icon: Brain, description: "Smart revision" },
    { id: "practice-exam", label: "Practice", icon: FileText, description: "Exam preparation" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Updates and alerts" }
  ];

  return (
    <TooltipProvider delayDuration={50}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4 sm:space-y-6">
        {!hideTabsNav && (
          <TabsList className="p-1.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-indigo-100/50 dark:border-indigo-800/30 flex items-center justify-between overflow-x-auto max-w-full shadow-sm">
            {tabs.map(tab => (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger 
                      value={tab.id} 
                      className={`rounded-lg flex items-center gap-2 py-2.5 ${isMobile ? 'px-3' : 'px-4'} transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm`}
                    >
                      <tab.icon className={`${isMobile ? 'h-4 w-4' : 'h-[16px] w-[16px]'}`} />
                      <span className={isMobile ? "sr-only text-xs sm:not-sr-only sm:inline" : ""}>
                        {isMobile ? tab.label.split(' ')[0] : tab.label}
                      </span>
                    </TabsTrigger>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  <p className="text-sm">{tab.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TabsList>
        )}
        
        {/* Display selected tab content */}
        {Object.entries(tabContents).map(([tabId, content]) => (
          <TabsContent key={tabId} value={tabId} className="mt-6">
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </TooltipProvider>
  );
};
