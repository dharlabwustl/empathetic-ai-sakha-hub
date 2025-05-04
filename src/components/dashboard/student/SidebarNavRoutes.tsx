import { Link, useLocation } from "react-router-dom";
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
  MessageSquare, 
  Calendar, 
  LineChart, 
  Brain, 
  BookOpen, 
  Bell, 
  User,
  Smile,
  Users,
  BookMarked
} from "lucide-react";
import { NavigationRoute, UserRouteMap } from "./types/sidebar";

interface SidebarNavRoutesProps {
  userType: string;
  collapsed: boolean;
  onMobileClose?: () => void;
}

const tooltipDescriptions: Record<string, string> = {
  Dashboard: "Overview of your study progress and daily tasks",
  "24/7 AI Tutor": "Get instant help from our AI tutor anytime",
  "Academic Advisor": "Plan and track your academic journey",
  Progress: "View detailed analytics of your performance",
  Flashcards: "Practice with smart flashcards",
  "Study Groups": "Discuss and learn with your peers",
  Notifications: "Stay updated with important alerts",
  "Feel Good Corner": "Take a break and boost your mood",
  Profile: "Manage your account settings and preferences",
  "Today's Plan": "View your daily study schedule",
  "Practice Exams": "Take mock tests to prepare for exams"
};

export const SidebarNavRoutes = ({ 
  userType, 
  collapsed, 
  onMobileClose 
}: SidebarNavRoutesProps) => {
  const location = useLocation();
  
  // Main navigation items
  const mainNavItems = [
    { name: "Dashboard", path: "/dashboard/student", icon: <LayoutDashboard size={20} /> },
    { name: "Today's Plan", path: "/dashboard/student/today", icon: <Calendar size={20} /> },
    { name: "Academic Advisor", path: "/dashboard/student/academic", icon: <BookMarked size={20} /> },
  ];
  
  // Learning tools category
  const learningTools = [
    { name: "Flashcards", path: "/dashboard/student/flashcards", icon: <Brain size={20} /> },
    { name: "Practice Exams", path: "/dashboard/student/exams", icon: <BookOpen size={20} /> },
    { name: "Progress", path: "/dashboard/student/progress", icon: <LineChart size={20} /> },
    { name: "Study Groups", path: "/dashboard/student/forum", icon: <Users size={20} /> },
  ];

  // AI assistance category
  const aiAssistanceItems = [
    { name: "24/7 AI Tutor", path: "/dashboard/student/tutor", icon: <MessageSquare size={20} /> },
    { name: "Feel Good Corner", path: "/dashboard/student/feel-good-corner", icon: <Smile size={20} /> },
  ];
  
  const userTypeRoutes: UserRouteMap = {
    employee: [
      { name: "Dashboard", path: "/dashboard/employee", icon: <LayoutDashboard size={20} /> },
      { name: "Job Advisor", path: "/dashboard/employee/advisor", icon: <MessageSquare size={20} /> },
      { name: "Productivity", path: "/dashboard/employee/productivity", icon: <LineChart size={20} /> },
      { name: "Training", path: "/dashboard/employee/training", icon: <Calendar size={20} /> },
    ],
    doctor: [
      { name: "Dashboard", path: "/dashboard/doctor", icon: <LayoutDashboard size={20} /> },
      { name: "Research Hub", path: "/dashboard/doctor/research", icon: <MessageSquare size={20} /> },
      { name: "Thesis Planner", path: "/dashboard/doctor/thesis", icon: <Calendar size={20} /> },
    ],
    founder: [
      { name: "Dashboard", path: "/dashboard/founder", icon: <LayoutDashboard size={20} /> },
      { name: "Startup Advisor", path: "/dashboard/founder/advisor", icon: <MessageSquare size={20} /> },
      { name: "MVP Builder", path: "/dashboard/founder/mvp", icon: <Calendar size={20} /> },
    ]
  };
  
  const commonRoutes: NavigationRoute[] = [
    { name: "Profile", path: "/dashboard/student/profile", icon: <User size={20} /> },
    { name: "Notifications", path: "/dashboard/student/notifications", icon: <Bell size={20} /> }
  ];

  return (
    <TooltipProvider delayDuration={50}>
      <div className="space-y-6">
        {userType === 'student' ? (
          <>
            {/* Main Navigation */}
            <div className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Main
                </h3>
              )}
              <nav className="space-y-1 px-2">
                {mainNavItems.map((route) => (
                  <Tooltip key={route.path}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={route.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                            location.pathname === route.path
                              ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                              : "hover:bg-accent hover:shadow-md",
                            collapsed && "justify-center"
                          )}
                          onClick={onMobileClose}
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110">
                            {route.icon}
                          </span>
                          {!collapsed && <span>{route.name}</span>}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                      <p className="text-sm">{tooltipDescriptions[route.name] || route.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </div>

            {/* Learning Tools */}
            <div className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Learning Tools
                </h3>
              )}
              <nav className="space-y-1 px-2">
                {learningTools.map((route) => (
                  <Tooltip key={route.path}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={route.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                            location.pathname === route.path
                              ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                              : "hover:bg-accent hover:shadow-md",
                            collapsed && "justify-center"
                          )}
                          onClick={onMobileClose}
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110">
                            {route.icon}
                          </span>
                          {!collapsed && <span>{route.name}</span>}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                      <p className="text-sm">{tooltipDescriptions[route.name] || route.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </div>

            {/* AI Assistance */}
            <div className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  AI Assistance
                </h3>
              )}
              <nav className="space-y-1 px-2">
                {aiAssistanceItems.map((route) => (
                  <Tooltip key={route.path}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={route.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                            location.pathname === route.path
                              ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                              : "hover:bg-accent hover:shadow-md",
                            collapsed && "justify-center"
                          )}
                          onClick={onMobileClose}
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110">
                            {route.icon}
                          </span>
                          {!collapsed && <span>{route.name}</span>}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                      <p className="text-sm">{tooltipDescriptions[route.name] || route.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </div>
          </>
        ) : (
          <nav className="space-y-1 px-2">
            {(userTypeRoutes[userType] || []).map((route) => (
              <Tooltip key={route.path}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={route.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                        location.pathname === route.path
                          ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                          : "hover:bg-accent hover:shadow-md",
                        collapsed && "justify-center"
                      )}
                      onClick={onMobileClose}
                    >
                      <span className="transition-transform duration-200 group-hover:scale-110">
                        {route.icon}
                      </span>
                      {!collapsed && <span>{route.name}</span>}
                    </Link>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  <p className="text-sm">{tooltipDescriptions[route.name] || route.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        )}
        
        <div className="px-2 pt-4 border-t border-sidebar-border">
          <nav className="space-y-1">
            {commonRoutes.map((route) => (
              <Tooltip key={route.path}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={route.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                        (location.pathname === route.path || 
                         (route.path === "/dashboard/student/profile" && location.pathname === "/dashboard/student/profile"))
                          ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                          : "hover:bg-accent hover:shadow-md",
                        collapsed && "justify-center"
                      )}
                      onClick={onMobileClose}
                    >
                      <span className="transition-transform duration-200 group-hover:scale-110">
                        {route.icon}
                      </span>
                      {!collapsed && <span>{route.name}</span>}
                    </Link>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  <p className="text-sm">{tooltipDescriptions[route.name] || route.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
};
