
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell
} from 'lucide-react';

interface SharedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SharedNavigation = ({ activeTab, onTabChange }: SharedNavigationProps) => {
  const location = useLocation();
  
  const navigationTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "overview" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, path: "today" },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, path: "academic" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, path: "concepts" },
    { id: "flashcards", label: "Flashcards", icon: Brain, path: "flashcards" },
    { id: "practice-exam", label: "Practice Exams", icon: FileText, path: "practice-exam" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "notifications" }
  ];
  
  // Helper function to check if a tab is active
  const isActive = (tabId: string) => {
    return activeTab === tabId;
  };

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-0 z-10 mb-6">
      <div className="flex items-center justify-between overflow-x-auto">
        <div className="flex space-x-1 md:space-x-2">
          {navigationTabs.map((tab) => (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive(tab.id) ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-1 whitespace-nowrap text-xs md:text-sm"
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">{tab.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedNavigation;
