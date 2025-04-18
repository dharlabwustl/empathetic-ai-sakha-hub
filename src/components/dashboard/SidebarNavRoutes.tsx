import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { UserRole } from '@/types/user/base';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart2, 
  Calendar, 
  Settings, 
  MessageSquare, 
  Brain, 
  User,
  Book,
  BookMarked,
  FileText,
  Users,
  Bell,
  Shield,
  LucideIcon
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: (path: string) => boolean;
}

interface NavigationRoutesByRole {
  student: NavigationItem[];
  employee: NavigationItem[];
  doctor: NavigationItem[];
  founder: NavigationItem[];
  admin: NavigationItem[];
}

const createIcon = (Icon: LucideIcon) => <Icon className="h-5 w-5" />;

export const navigationRoutes: NavigationRoutesByRole = {
  student: [
    {
      title: 'Dashboard',
      href: '/dashboard/student',
      icon: createIcon(LayoutDashboard),
      isActive: (path) => path === '/dashboard/student' || path === '/dashboard/student/overview',
    },
    {
      title: 'AI Tutor',
      href: '/dashboard/student/tutor',
      icon: createIcon(MessageSquare),
    },
    {
      title: 'Academic Advisor',
      href: '/dashboard/student/academic',
      icon: createIcon(Brain),
    },
    {
      title: 'Study Materials',
      href: '/dashboard/student/materials',
      icon: createIcon(BookOpen),
    },
    {
      title: 'Progress',
      href: '/dashboard/student/progress',
      icon: createIcon(BarChart2),
    },
    {
      title: 'Flashcards',
      href: '/dashboard/student/flashcards',
      icon: createIcon(BookMarked),
    },
    {
      title: 'Exams',
      href: '/dashboard/student/exams',
      icon: createIcon(FileText),
    },
    {
      title: 'Schedule',
      href: '/dashboard/student/schedule',
      icon: createIcon(Calendar),
    },
    {
      title: 'Profile',
      href: '/dashboard/student/profile',
      icon: createIcon(User),
    },
    {
      title: 'Settings',
      href: '/dashboard/student/settings',
      icon: createIcon(Settings),
    },
  ],
  employee: [
    {
      title: 'Dashboard',
      href: '/dashboard/employee',
      icon: createIcon(LayoutDashboard),
      isActive: (path) => path === '/dashboard/employee' || path === '/dashboard/employee/overview',
    },
    {
      title: 'Tasks',
      href: '/dashboard/employee/tasks',
      icon: createIcon(BookOpen),
    },
    {
      title: 'Analytics',
      href: '/dashboard/employee/analytics',
      icon: createIcon(BarChart2),
    },
    {
      title: 'Schedule',
      href: '/dashboard/employee/schedule',
      icon: createIcon(Calendar),
    },
    {
      title: 'Profile',
      href: '/dashboard/employee/profile',
      icon: createIcon(User),
    },
    {
      title: 'Settings',
      href: '/dashboard/employee/settings',
      icon: createIcon(Settings),
    },
  ],
  doctor: [
    {
      title: 'Dashboard',
      href: '/dashboard/doctor',
      icon: createIcon(LayoutDashboard),
      isActive: (path) => path === '/dashboard/doctor' || path === '/dashboard/doctor/overview',
    },
    {
      title: 'Patients',
      href: '/dashboard/doctor/patients',
      icon: createIcon(Users),
    },
    {
      title: 'Appointments',
      href: '/dashboard/doctor/appointments',
      icon: createIcon(Calendar),
    },
    {
      title: 'Notifications',
      href: '/dashboard/doctor/notifications',
      icon: createIcon(Bell),
    },
    {
      title: 'Profile',
      href: '/dashboard/doctor/profile',
      icon: createIcon(User),
    },
    {
      title: 'Settings',
      href: '/dashboard/doctor/settings',
      icon: createIcon(Settings),
    },
  ],
  founder: [
    {
      title: 'Dashboard',
      href: '/dashboard/founder',
      icon: createIcon(LayoutDashboard),
      isActive: (path) => path === '/dashboard/founder' || path === '/dashboard/founder/overview',
    },
    {
      title: 'Analytics',
      href: '/dashboard/founder/analytics',
      icon: createIcon(BarChart2),
    },
    {
      title: 'Team',
      href: '/dashboard/founder/team',
      icon: createIcon(Users),
    },
    {
      title: 'Security',
      href: '/dashboard/founder/security',
      icon: createIcon(Shield),
    },
    {
      title: 'Profile',
      href: '/dashboard/founder/profile',
      icon: createIcon(User),
    },
    {
      title: 'Settings',
      href: '/dashboard/founder/settings',
      icon: createIcon(Settings),
    },
  ],
  admin: [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: createIcon(LayoutDashboard),
    },
    {
      title: 'Students',
      href: '/admin/students',
      icon: createIcon(Users),
    },
    {
      title: 'AI',
      href: '/admin/ai',
      icon: createIcon(Brain),
    },
    {
      title: 'Content',
      href: '/admin/content',
      icon: createIcon(Book),
    },
    {
      title: 'Engagement',
      href: '/admin/engagement',
      icon: createIcon(BarChart2),
    },
    {
      title: 'Subscriptions',
      href: '/admin/subscriptions',
      icon: createIcon(BookMarked),
    },
    {
      title: 'System',
      href: '/admin/system',
      icon: createIcon(Settings),
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: createIcon(BarChart2),
    },
    {
      title: 'Issues',
      href: '/admin/issues',
      icon: createIcon(FileText),
    },
    {
      title: 'Notifications',
      href: '/admin/notifications',
      icon: createIcon(Bell),
    },
    {
      title: 'Documentation',
      href: '/admin/documentation',
      icon: createIcon(FileText),
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: createIcon(Settings),
    },
  ],
};

export const getNavigationRoutes = (role: UserRole): NavigationItem[] => {
  switch (role) {
    case UserRole.Student:
      return navigationRoutes.student;
    case UserRole.Employee:
      return navigationRoutes.employee;
    case UserRole.Doctor:
      return navigationRoutes.doctor;
    case UserRole.Founder:
      return navigationRoutes.founder;
    case UserRole.Admin:
      return navigationRoutes.admin;
    default:
      return [];
  }
};

interface SidebarNavRoutesProps {
  userType: string;
  collapsed: boolean;
  onMobileClose?: () => void;
}

export const SidebarNavRoutes = ({ userType, collapsed, onMobileClose }: SidebarNavRoutesProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Convert string userType to UserRole enum
  const userRole = userType as UserRole;
  
  // Get navigation routes based on user type
  const routes = getNavigationRoutes(userRole);
  
  return (
    <div className="flex-grow overflow-y-auto py-2">
      <nav>
        <ul className="space-y-1 px-2">
          {routes.map((route) => {
            const isActive = route.isActive 
              ? route.isActive(currentPath)
              : currentPath === route.href || currentPath.startsWith(`${route.href}/`);
            
            return (
              <li key={route.href}>
                <NavLink
                  to={route.href}
                  onClick={onMobileClose}
                  className={({ isActive: linkActive }) => cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    linkActive || isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <span className="flex-shrink-0">{route.icon}</span>
                  {!collapsed && <span>{route.title}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// We need to fix the import issue in SidebarNav.tsx so we're now explicitly exporting the component as default
export default SidebarNavRoutes;
