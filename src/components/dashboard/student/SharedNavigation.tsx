
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell, FileSearch, ClipboardList
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SharedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname;
  
  const navigationTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard/student", tooltip: "Dashboard overview" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, path: "/dashboard/student/today", tooltip: "View your study plan for today" },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, path: "/dashboard/student/academic", tooltip: "Get personalized academic guidance" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, path: "/dashboard/student/concepts", tooltip: "Browse concept cards for your subjects" },
    { id: "flashcards", label: "Flashcards", icon: Brain, path: "/dashboard/student/flashcards", tooltip: "Practice with flashcards" },
    { id: "practice-exam", label: "Practice Exams", icon: ClipboardList, path: "/dashboard/student/practice-exam", tooltip: "Take practice exams" },
    { id: "syllabus", label: "Exam Syllabus", icon: FileText, path: "/dashboard/student/syllabus", tooltip: "View your exam syllabus" },
    { id: "previous-year-analysis", label: "Previous Years", icon: FileSearch, path: "/dashboard/student/previous-year-analysis", tooltip: "Study previous year papers" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/dashboard/student/notifications", tooltip: "Check your notifications" }
  ];
  
  // Helper function to check if a tab is active
  const isActive = (path: string) => {
    if (currentPath === '/dashboard/student' && path === '/dashboard/student') {
      return true;
    }
    
    return currentPath.startsWith(path) && path !== '/dashboard/student';
  };

  return (
    <TooltipProvider>
      <div className="p-3 bg-white/90 dark:bg-blue-950/90 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100 dark:border-blue-800/30 sticky top-0 z-10 mb-6">
        <div className="flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1 md:space-x-2">
            {navigationTabs.map((tab) => (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isActive(tab.path) ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center gap-1 whitespace-nowrap text-xs md:text-sm ${isActive(tab.path) ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'text-blue-700 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400'}`}
                      onClick={() => navigate(tab.path)}
                    >
                      <tab.icon className="h-4 w-4 mr-1" />
                      <span className="hidden md:inline">{tab.label}</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tab.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SharedNavigation;
