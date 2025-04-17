
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  LineChart, 
  User, 
  Settings, 
  BookOpen,
  Brain,
  Heart,
  Target,
  Video,
  Users,
  Bell
} from "lucide-react";
import { NavigationRoute, UserRouteMap } from "./types/sidebar";

interface SidebarNavRoutesProps {
  userType: string;
  collapsed: boolean;
  onMobileClose?: () => void;
}

export const SidebarNavRoutes = ({ 
  userType, 
  collapsed, 
  onMobileClose 
}: SidebarNavRoutesProps) => {
  const location = useLocation();
  
  const userTypeRoutes: UserRouteMap = {
    student: [
      { name: "Dashboard", path: "/dashboard/student", icon: <LayoutDashboard size={20} /> },
      { name: "24/7 Tutor", path: "/dashboard/student/tutor", icon: <MessageSquare size={20} /> },
      { name: "Academic Advisor", path: "/dashboard/student/academic", icon: <Calendar size={20} /> },
      { name: "Progress", path: "/dashboard/student/progress", icon: <LineChart size={20} /> },
      { name: "Flashcards", path: "/dashboard/student/flashcards", icon: <Brain size={20} /> },
      { name: "Materials Vault", path: "/dashboard/student/materials", icon: <BookOpen size={20} /> },
      { name: "Live Tutors", path: "/dashboard/student/live-tutors", icon: <Video size={20} /> },
      { name: "Forum", path: "/dashboard/student/forum", icon: <Users size={20} /> },
      { name: "Video Library", path: "/dashboard/student/videos", icon: <Video size={20} /> },
      { name: "Notifications", path: "/dashboard/student/notifications", icon: <Bell size={20} /> },
      { name: "Wellness", path: "/dashboard/student/wellness", icon: <Heart size={20} /> }
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
  
  const routes = userTypeRoutes[userType] || userTypeRoutes.student;
  
  const commonRoutes: NavigationRoute[] = [
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> }
  ];

  return (
    <div className="space-y-6">
      <nav className="space-y-1 px-2">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === route.path
                ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg"
                : "hover:bg-accent",
              collapsed && "justify-center"
            )}
            onClick={onMobileClose}
          >
            <span>{route.icon}</span>
            {!collapsed && <span>{route.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="px-2 pt-4 border-t border-sidebar-border">
        <nav className="space-y-1">
          {commonRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path === "/dashboard/profile" ? "/dashboard/student/profile" : route.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                (location.pathname === route.path || 
                 (route.path === "/dashboard/profile" && location.pathname === "/dashboard/student/profile"))
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                  : "hover:bg-accent",
                collapsed && "justify-center"
              )}
              onClick={onMobileClose}
            >
              <span>{route.icon}</span>
              {!collapsed && <span>{route.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
