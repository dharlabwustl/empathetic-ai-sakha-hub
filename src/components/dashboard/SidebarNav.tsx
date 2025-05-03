
import React, { useState } from 'react';
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
  BookMarked,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
  userName = 'Student'
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentPath = pathSegments.at(-1) || '';
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'S';

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-border z-20 transition-all duration-300 transform md:translate-x-0 -translate-x-full",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Logo */}
        <div className="p-4 border-b flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <PrepzrLogo width={120} height="auto" className="mx-auto" />
          </Link>
        </div>

        {/* User Profile Menu */}
        <div className="p-4 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-primary">{userInitial}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {userType}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/student/profile" className="flex cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/student/settings" className="flex cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex cursor-pointer text-red-500 hover:text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={isActive(item.id) ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start text-base", // Increased font size for readability
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
