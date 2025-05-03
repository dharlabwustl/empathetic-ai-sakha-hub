
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Bell,
  Settings,
  Home,
  BookMarked
} from 'lucide-react';

interface SidebarNavProps {
  userType: 'student' | 'admin';
  className?: string;
  onTabChange?: (id: string) => void;
  activeTab?: string;
  userName?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  userType,
  className,
  onTabChange,
  activeTab = 'overview',
  userName
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentPath = pathSegments.at(-1) || '';

  const studentNavItems = [
    {
      id: 'overview',
      title: 'Dashboard',
      href: '/dashboard/student/overview',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: 'today',
      title: 'Today\'s Plan',
      href: '/dashboard/student/today',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 'academic',
      title: 'Academic Advisor',
      href: '/dashboard/student/academic',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 'concepts',
      title: 'Concept Cards',
      href: '/dashboard/student/concepts',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      href: '/dashboard/student/flashcards',
      icon: <BookMarked className="h-5 w-5" />
    },
    {
      id: 'practice-exam',
      title: 'Practice Exams',
      href: '/dashboard/student/practice-exam',
      icon: <ClipboardCheck className="h-5 w-5" />
    },
    {
      id: 'notifications',
      title: 'Notifications',
      href: '/dashboard/student/notifications',
      icon: <Bell className="h-5 w-5" />
    }
  ];

  const adminNavItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      href: '/dashboard/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: 'students',
      title: 'Students',
      href: '/dashboard/admin/students',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 'settings',
      title: 'Settings',
      href: '/dashboard/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const navItems = userType === 'student' ? studentNavItems : adminNavItems;

  const handleNavClick = (id: string) => {
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const isActive = (id: string) => {
    // Special case for home/dashboard root
    if (id === 'overview' && (currentPath === 'student' || currentPath === '')) {
      return true;
    }
    return activeTab === id || currentPath === id;
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-border z-20 transition-all duration-300 transform md:translate-x-0 -translate-x-full",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="font-semibold">PREPZR</span>
          </Link>
        </div>

        {/* User Info */}
        {userName && (
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userType === 'student' ? 'Student' : 'Administrator'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={isActive(item.id) ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start",
                isActive(item.id) && "bg-secondary/80"
              )}
              asChild
            >
              <Link to={item.href} onClick={() => handleNavClick(item.id)}>
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t mt-auto">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
