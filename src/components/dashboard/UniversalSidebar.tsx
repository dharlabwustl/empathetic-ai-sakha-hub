
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  LayoutDashboard, 
  CalendarDays, 
  GraduationCap, 
  BookOpen, 
  Brain, 
  FileText, 
  Bell, 
  Smile, 
  Headphones,
  ClipboardList,
  FileSearch,
  User,
  LogOut
} from "lucide-react";
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface UniversalSidebarProps {
  collapsed?: boolean;
}

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactElement;
  tooltip: string;
}

interface NavigationCategory {
  title: string;
  items: NavigationItem[];
}

export const UniversalSidebar: React.FC<UniversalSidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  
  const navigationCategories: NavigationCategory[] = [
    {
      title: "Your Learning Journey",
      items: [
        { 
          name: "Dashboard", 
          path: "/dashboard/student", 
          icon: <LayoutDashboard size={20} />, 
          tooltip: "Go to your dashboard overview" 
        },
        { 
          name: "Today's Plan", 
          path: "/dashboard/student/today", 
          icon: <CalendarDays size={20} />, 
          tooltip: "View your study plan for today" 
        },
        { 
          name: "Academic Advisor", 
          path: "/dashboard/student/academic", 
          icon: <GraduationCap size={20} />, 
          tooltip: "Get personalized academic guidance" 
        },
      ]
    },
    {
      title: "Learning Tools",
      items: [
        { 
          name: "Concept Cards", 
          path: "/dashboard/student/concepts", 
          icon: <BookOpen size={20} />, 
          tooltip: "Browse concept cards for your subjects" 
        },
        { 
          name: "Flashcards", 
          path: "/dashboard/student/flashcards", 
          icon: <Brain size={20} />, 
          tooltip: "Practice with flashcards" 
        },
        { 
          name: "Practice Exams", 
          path: "/dashboard/student/practice-exam", 
          icon: <ClipboardList size={20} />, 
          tooltip: "Take practice exams" 
        },
        { 
          name: "Exam Syllabus", 
          path: "/dashboard/student/syllabus", 
          icon: <FileText size={20} />, 
          tooltip: "View your exam syllabus" 
        },
        { 
          name: "Previous Years", 
          path: "/dashboard/student/previous-year-analysis", 
          icon: <FileSearch size={20} />, 
          tooltip: "Analyze previous year question papers" 
        },
      ]
    },
    {
      title: "AI Assistance",
      items: [
        { 
          name: "Feel Good Corner", 
          path: "/dashboard/student/feel-good-corner", 
          icon: <Smile size={20} />, 
          tooltip: "Take a mental wellness break" 
        },
        { 
          name: "24/7 AI Tutor", 
          path: "/dashboard/student/tutor", 
          icon: <Headphones size={20} />, 
          tooltip: "Chat with your AI tutor anytime" 
        },
      ]
    },
    {
      title: "Personal",
      items: [
        { 
          name: "Profile", 
          path: "/dashboard/student/profile", 
          icon: <User size={20} />, 
          tooltip: "Manage your profile" 
        },
        { 
          name: "Notifications", 
          path: "/dashboard/student/notifications", 
          icon: <Bell size={20} />, 
          tooltip: "Check your notifications" 
        },
      ]
    }
  ];

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    // Exact match for main dashboard
    if (path === '/dashboard/student' && location.pathname === '/dashboard/student') {
      return true;
    }
    
    // Special handling for nested routes
    const currentPath = location.pathname;
    if (path !== '/dashboard/student') {
      return currentPath.startsWith(path);
    }
    
    return false;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className={cn(
        "hidden lg:flex h-screen flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}>
        {/* PREPZR Logo */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-center items-center">
          <Link to="/" className="flex justify-center items-center">
            {!collapsed ? (
              <PrepzrLogo width={120} height={40} />
            ) : (
              <PrepzrLogo width={40} height={40} />
            )}
          </Link>
        </div>
        
        {/* Navigation Categories */}
        <div className="flex flex-col flex-grow p-2 overflow-y-auto">
          {navigationCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              {/* Category Title - Only show when not collapsed */}
              {!collapsed && (
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category.title}
                </h3>
              )}
              
              {/* Category Items */}
              {category.items.map((item) => (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 mb-1",
                          isActive(item.path)
                            ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
                          collapsed && "justify-center"
                        )}
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          {item.icon}
                        </span>
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <p className="text-sm">{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
          
          {/* Logout Button */}
          <div className="mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/login"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 mb-1",
                      "hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 dark:text-red-400",
                      collapsed && "justify-center"
                    )}
                  >
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                  </Link>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <p className="text-sm">Logout from your account</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UniversalSidebar;
