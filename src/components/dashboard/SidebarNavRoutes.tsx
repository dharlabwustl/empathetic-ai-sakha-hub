
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, BookOpen, MessageSquare, Brain, LineChart, 
  Activity, Heart, Folder, Video, Users, Bell, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarNavRoute {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
  active?: boolean;
  children?: SidebarNavRoute[];
}

interface SidebarNavRoutesProps {
  userType: string;
  collapsed: boolean;
  onMobileClose: () => void;
}

const SidebarNavRoutes = ({ userType, collapsed, onMobileClose }: SidebarNavRoutesProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const studentRoutes: SidebarNavRoute[] = [
    { name: "Dashboard", path: "/dashboard/student", icon: Home },
    { name: "Profile", path: "/dashboard/student/profile", icon: User },
    { name: "Academic Advisor", path: "/dashboard/student/academic", icon: BookOpen },
    { name: "AI Tutor", path: "/dashboard/student/tutor", icon: MessageSquare },
    { name: "Flashcards", path: "/dashboard/student/flashcards", icon: Brain },
    { name: "Progress", path: "/dashboard/student/progress", icon: LineChart },
    { name: "Study Plan", path: "/dashboard/student/study-plan", icon: Activity },
    { name: "Mental Health", path: "/dashboard/student/mental-health", icon: Heart },
    { name: "Materials", path: "/dashboard/student/materials", icon: Folder },
    { name: "Videos", path: "/dashboard/student/videos", icon: Video },
    { name: "Study Groups", path: "/dashboard/student/groups", icon: Users },
    { name: "Notifications", path: "/dashboard/student/notifications", icon: Bell },
    { name: "Settings", path: "/dashboard/student/settings", icon: Settings },
  ];

  const routes = userType === 'student' ? studentRoutes : [];

  return (
    <div className="mt-2 px-3 space-y-1">
      {routes.map((route) => {
        const isActive = currentPath === route.path;
        return (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-colors",
              isActive 
                ? "bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800",
              collapsed && "justify-center"
            )}
            onClick={onMobileClose}
          >
            <route.icon size={20} />
            {!collapsed && <span>{route.name}</span>}
            {isActive && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarNavRoutes;
