
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Updated main navigation tabs with more focused menu items and consistent URLs
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, description: "Your personalized dashboard summary", path: "/dashboard/student/overview" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, description: "Daily tasks and schedule", path: "/dashboard/student/today" },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, description: "Personalized academic guidance", path: "/dashboard/student/academic" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, description: "Key learning concepts and explanations", path: "/dashboard/student/concepts" },
    { id: "flashcards", label: "Flashcards", icon: Brain, description: "Smart revision and memorization", path: "/dashboard/student/flashcards" },
    { id: "practice-exam", label: "Practice Exams", icon: FileText, description: "Mock tests and exam preparation", path: "/dashboard/student/practice-exam" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Important updates and alerts", path: "/dashboard/student/notifications" }
  ];

  // Handle tab change with proper navigation
  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      // Preserve any query parameters that should be maintained between tab changes
      const currentParams = new URLSearchParams(window.location.search);
      const persistParams = ['returning']; // Parameters to maintain between tabs
      
      const params = new URLSearchParams();
      persistParams.forEach(param => {
        if (currentParams.has(param)) {
          params.set(param, currentParams.get(param)!);
        }
      });
      
      const queryString = params.toString();
      const path = queryString ? `${tab.path}?${queryString}` : tab.path;
      
      navigate(path);
      onTabChange(tabId);
    }
  };

  return (
    <TooltipProvider delayDuration={50}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
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
                      className="rounded-lg flex items-center gap-2 py-2.5 px-4 transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <tab.icon size={16} />
                      <span className={isMobile ? "hidden sm:inline text-xs" : ""}>{tab.label}</span>
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
      </Tabs>
    </TooltipProvider>
  );
}
