
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
  Smile,
  CloudSun,
  Bell
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents: Record<string, ReactNode>;
  hideTabsNav?: boolean;
}

export default function DashboardTabs({
  activeTab,
  onTabChange,
  tabContents,
  hideTabsNav = false
}: DashboardTabsProps) {
  const isMobile = useIsMobile();
  
  // Updated main navigation tabs with more focused menu items
  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "today", label: "Today's Plan", icon: <CalendarDays size={16} /> },
    { id: "academic", label: "Academic Advisor", icon: <GraduationCap size={16} /> },
    { id: "concepts", label: "Concept Cards", icon: <BookOpen size={16} /> },
    { id: "flashcards", label: "Flashcards", icon: <Brain size={16} /> },
    { id: "practice-exam", label: "Practice Exams", icon: <FileText size={16} /> },
    { id: "feel-good", label: "Feel Good Corner", icon: <Smile size={16} /> },
    { id: "influence-meter", label: "Surrounding Influences", icon: <CloudSun size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4 sm:space-y-6">
      {!hideTabsNav && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-2"
        >
          <TabsList className="p-1.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-indigo-100/50 dark:border-indigo-800/30 flex items-center justify-between overflow-x-auto max-w-full shadow-sm">
            {tabs.map(tab => (
              <motion.div key={tab.id} variants={itemVariants} className="flex-shrink-0">
                <TabsTrigger 
                  value={tab.id} 
                  className="rounded-lg flex items-center gap-2 py-2.5 px-4 transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                >
                  {tab.icon}
                  <span className={isMobile ? "hidden sm:inline text-xs" : ""}>{tab.label}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>
      )}
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
          {tabContents[activeTab] || (
            <div className="text-center p-8 sm:p-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-base sm:text-lg text-gray-500">Coming soon...</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">This feature is under development</p>
              </motion.div>
            </div>
          )}
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}
