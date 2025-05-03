
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell, ArrowLeft
} from 'lucide-react';

interface SharedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showBackButton?: boolean;
  backPath?: string;
  pageTitle?: string;
}

const SharedNavigation: React.FC<SharedNavigationProps> = ({
  activeTab,
  onTabChange,
  showBackButton = false,
  backPath = '/dashboard/student',
  pageTitle
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname;
  
  const navigationTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard/student/overview" },
    { id: "today", label: "Today's Plan", icon: CalendarDays, path: "/dashboard/student/today" },
    { id: "academic", label: "Academic Advisor", icon: GraduationCap, path: "/dashboard/student/academic" },
    { id: "concepts", label: "Concept Cards", icon: BookOpen, path: "/dashboard/student/concepts" },
    { id: "flashcards", label: "Flashcards", icon: Brain, path: "/dashboard/student/flashcards" },
    { id: "practice-exam", label: "Practice Exams", icon: FileText, path: "/dashboard/student/practice-exam" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/dashboard/student/notifications" }
  ];
  
  // Helper function to check if a tab is active
  const isActive = (path: string) => {
    if (currentPath === '/dashboard/student') {
      return path === '/dashboard/student/overview';
    }
    
    return currentPath.startsWith(path);
  };

  const handleNavClick = (path: string, tabId: string) => {
    // Update active tab through prop
    onTabChange(tabId);
    
    // Use React Router's navigate without page reload
    navigate(path, { replace: true });
  };

  const handleBackClick = () => {
    navigate(backPath);
  };

  return (
    <div className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-0 z-10 mb-6">
      <div className="flex items-center justify-between overflow-x-auto">
        {showBackButton ? (
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            {pageTitle && <h2 className="text-lg font-medium">{pageTitle}</h2>}
          </div>
        ) : (
          <div className="flex space-x-1 md:space-x-2">
            {navigationTabs.map((tab) => (
              <motion.div
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isActive(tab.path) ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1 whitespace-nowrap text-sm md:text-base"
                  onClick={() => handleNavClick(tab.path, tab.id)}
                >
                  <tab.icon className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{tab.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedNavigation;
