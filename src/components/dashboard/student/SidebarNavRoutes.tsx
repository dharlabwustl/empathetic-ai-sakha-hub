
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
  Video, 
  Users, 
  Bell, 
  Heart, 
  Target, 
  User,
  LogOut,
  FileText,
  FileSearch,
  ClipboardList,
  Headphones,
  Smile,
  GraduationCap
} from "lucide-react";

interface NavigationRoute {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface UserRouteMap {
  [key: string]: NavigationRoute[];
}

interface SidebarNavRoutesProps {
  userType: string;
  collapsed: boolean;
  onMobileClose?: () => void;
}

const tooltipDescriptions: Record<string, string> = {
  Dashboard: "Overview of your study progress and daily tasks",
  "24/7 Tutor": "Get instant help from our AI tutor anytime",
  "Academic Advisor": "Plan and track your academic journey",
  Progress: "View detailed analytics of your performance",
  Flashcards: "Practice with smart flashcards",
  "Materials Vault": "Access your study materials and resources",
  "Live Tutors": "Connect with expert tutors in real-time",
  Forum: "Discuss and learn with your peers",
  "Video Library": "Watch educational content and lectures",
  Notifications: "Stay updated with important alerts",
  Wellness: "Track and maintain your study-life balance",
  Profile: "Manage your account settings and preferences",
  "Exam Syllabus": "View your complete exam syllabus",
  "Previous Year Analysis": "Study and analyze previous year papers",
  "Practice Exams": "Take practice tests to prepare for exams",
  "Concept Cards": "Learn key concepts with interactive cards"
};

export const SidebarNavRoutes = ({ 
  userType, 
  collapsed, 
  onMobileClose 
}: SidebarNavRoutesProps) => {
  const location = useLocation();
  
  const userTypeRoutes: UserRouteMap = {
    student: [
      { name: "Dashboard", path: "/dashboard/student", icon: <LayoutDashboard size={20} /> },
      { name: "Today's Plan", path: "/dashboard/student/today", icon: <Calendar size={20} /> },
      { name: "Academic Advisor", path: "/dashboard/student/academic", icon: <GraduationCap size={20} /> },
      { name: "Concept Cards", path: "/dashboard/student/concepts", icon: <BookOpen size={20} /> },
      { name: "Flashcards", path: "/dashboard/student/flashcards", icon: <Brain size={20} /> },
      { name: "Practice Exams", path: "/dashboard/student/practice-exam", icon: <ClipboardList size={20} /> },
      { name: "Exam Syllabus", path: "/dashboard/student/syllabus", icon: <FileText size={20} /> },
      { name: "Previous Year Analysis", path: "/dashboard/student/previous-year-analysis", icon: <FileSearch size={20} /> },
      { name: "Feel Good Corner", path: "/dashboard/student/feel-good-corner", icon: <Smile size={20} /> },
      { name: "24/7 AI Tutor", path: "/dashboard/student/tutor", icon: <Headphones size={20} /> },
      { name: "Notifications", path: "/dashboard/student/notifications", icon: <Bell size={20} /> }
    ],
    employee: [
      { name: "Dashboard", path: "/dashboard/employee", icon: <LayoutDashboard size={20} /> },
      { name: "Job Advisor", path: "/dashboard/employee/advisor", icon: <MessageSquare size={20} /> },
      { name: "Productivity", path: "/dashboard/employee/productivity", icon: <LineChart size={20} /> },
      { name: "Training", path: "/dashboard/employee/training", icon: <Calendar size={20} /> },
      { name: "Career Guide", path: "/dashboard/employee/career", icon: <Target size={20} /> },
      { name: "Motivation", path: "/dashboard/employee/motivation", icon: <Heart size={20} /> }
    ],
    doctor: [
      { name: "Dashboard", path: "/dashboard/doctor", icon: <LayoutDashboard size={20} /> },
      { name: "Research Hub", path: "/dashboard/doctor/research", icon: <MessageSquare size={20} /> },
      { name: "Thesis Planner", path: "/dashboard/doctor/thesis", icon: <Calendar size={20} /> },
      { name: "Publications", path: "/dashboard/doctor/publications", icon: <LineChart size={20} /> }
    ],
    founder: [
      { name: "Dashboard", path: "/dashboard/founder", icon: <LayoutDashboard size={20} /> },
      { name: "Startup Advisor", path: "/dashboard/founder/advisor", icon: <MessageSquare size={20} /> },
      { name: "MVP Builder", path: "/dashboard/founder/mvp", icon: <Calendar size={20} /> },
      { name: "Metrics", path: "/dashboard/founder/metrics", icon: <LineChart size={20} /> }
    ]
  };
  
  const routes = userTypeRoutes[userType as keyof UserRouteMap] || userTypeRoutes.student;
  
  const commonRoutes: NavigationRoute[] = [
    { name: "Profile", path: "/dashboard/student/profile", icon: <User size={20} /> }
  ];

  return (
    <TooltipProvider delayDuration={50}>
      <div className="space-y-6">
        <nav className="space-y-1 px-2">
          {routes.map((route) => (
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
