import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpen, 
  GraduationCap,
  MessageCircle,
  Settings,
  User,
  UserPlus,
  Bell,
  Home
} from 'lucide-react';
import { ReactNode } from 'react';

// Fix the type issues by properly typing the routes
interface RouteItem {
  title: string;
  href: string;
  icon: ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
  description?: string;
  isNew?: boolean;
  color?: string;
  disabled?: boolean;
}

const generateAdminRoutes = (): RouteItem[] => {
  return [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      description: 'Overview of the admin panel'
    },
    // ... other admin routes
  ];
};

const generateUserRoutes = (
  role: 'student' | 'teacher', 
  onTabChange?: (tab: string) => void
): RouteItem[] => {
  const studentRoutes: RouteItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard/student',
      icon: <LayoutDashboard className="h-5 w-5" />,
      description: "Overview of your academic progress",
      onClick: () => onTabChange && onTabChange('overview')
    },
    {
      title: 'Today\'s Plan',
      href: '/dashboard/student/today',
      icon: <CalendarDays className="h-5 w-5" />,
      description: "Your personalized daily study schedule"
    },
    {
      title: 'Concept Cards',
      href: '/dashboard/student/concepts',
      icon: <BookOpen className="h-5 w-5" />,
      description: "Learn key concepts interactively"
    },
    {
      title: 'Practice Exams',
      href: '/dashboard/student/practice-exam',
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Test your knowledge with practice exams"
    },
    {
      title: 'Academic Advisor',
      href: '/dashboard/student/academic',
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Get personalized academic guidance",
      isNew: true,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: 'AI Tutor',
      href: '/dashboard/student/tutor',
      icon: <MessageCircle className="h-5 w-5" />,
      description: "Get help from your AI tutor"
    },
    // ... other student routes
  ];

  const teacherRoutes: RouteItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard/teacher',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    // ... teacher routes
  ];

  const routes = role === 'student' ? studentRoutes : teacherRoutes;
  return routes;
};

// Utility Routes - routes that appear across different user types
const generateUtilityRoutes = (userType: 'admin' | 'student' | 'teacher'): RouteItem[] => {
  const baseRoutes: RouteItem[] = [
    {
      title: 'Settings',
      href: `/${userType}/settings`,
      icon: <Settings className="h-5 w-5" />,
      description: "Manage your account settings"
    }
  ];

  // Add user-specific utility routes
  if (userType === 'student' || userType === 'teacher') {
    baseRoutes.unshift({
      title: 'Profile',
      href: `/dashboard/${userType}/profile`,
      icon: <User className="h-5 w-5" />,
      description: "View and edit your profile"
    });
    
    baseRoutes.unshift({
      title: 'Notifications',
      href: `/dashboard/${userType}/notifications`,
      icon: <Bell className="h-5 w-5" />,
      description: "View your notifications"
    });
  } 
  
  if (userType === 'admin') {
    baseRoutes.unshift({
      title: 'Go to Website',
      href: '/',
      icon: <Home className="h-5 w-5" />,
      isExternal: true,
      description: "View the public website"
    });
  }
  
  return baseRoutes;
};

export {
  generateAdminRoutes,
  generateUserRoutes,
  generateUtilityRoutes
};
