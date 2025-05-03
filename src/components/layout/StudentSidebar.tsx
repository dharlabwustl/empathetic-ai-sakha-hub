
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Flame,
  Home,
  Layout,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Settings,
  Smile,
  UserRound,
  Users,
  User,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserProfileType } from '@/types/user';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentSidebarProps {
  userProfile: UserProfileType;
  collapsed: boolean;
  onLogout: () => void;
  onToggle: () => void;
}

export function StudentSidebar({
  userProfile,
  collapsed,
  onLogout,
  onToggle,
}: StudentSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Overview",
      icon: Home,
      path: "/dashboard/student",
    },
    {
      name: "Today's Plan",
      icon: Layout,
      path: "/dashboard/student/today",
    },
    {
      name: "AI Tutor",
      icon: MessageSquare,
      path: "/dashboard/student/tutor",
    },
    {
      name: "Concepts",
      icon: BookOpen,
      path: "/dashboard/student/concepts/landing",
    },
    {
      name: "Flashcards",
      icon: FileText,
      path: "/dashboard/student/flashcards/landing",
    },
    {
      name: "Practice Tests",
      icon: FileText,
      path: "/dashboard/student/practice-exam",
    },
    {
      name: "Study Groups",
      icon: Users,
      path: "/dashboard/student/study-groups",
      isPremium: true,
    },
    {
      name: "Feel Good Corner",
      icon: Smile,
      path: "/dashboard/student/feel-good-corner",
    },
    {
      name: "Academic Advisor",
      icon: LifeBuoy,
      path: "/dashboard/student/academic",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/dashboard/student/notifications",
    },
  ];

  const secondaryNavItems = [
    {
      name: "Profile",
      icon: UserRound,
      path: "/dashboard/student/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/student/settings",
    },
  ];

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isActive = (path: string) => {
    // Exact match for dashboard overview
    if (path === '/dashboard/student' && currentPath === '/dashboard/student') {
      return true;
    }
    
    // For other paths, check if current path starts with the nav path
    // This handles nested routes like /dashboard/student/concepts/123
    return path !== '/dashboard/student' && currentPath.startsWith(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center h-[60px] px-4 border-b">
        {!collapsed ? (
          <PrepzrLogo width={120} height="auto" />
        ) : (
          <PrepzrLogo width={40} height="auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto")}
          onClick={onToggle}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed ? "" : "rotate-180"
            )}
          />
        </Button>
      </div>
      
      {/* Profile Menu */}
      <div className={cn("p-4 border-b", collapsed ? "flex justify-center" : "")}>
        {collapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col p-2">
                <p className="text-sm font-medium">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
                <UserRound className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/student/settings')}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">{userProfile.email}</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
                  <UserRound className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/student/settings')}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1 py-2">
        <div className={cn("flex flex-col gap-1 px-2", collapsed ? "items-center" : "")}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: active }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "flex-col py-3 px-0 text-[10px]"
                )
              }
            >
              <item.icon className={cn("h-5 w-5", item.isPremium && "text-amber-500")} />
              {(!collapsed || item.isPremium) && (
                <span className={cn(item.isPremium && "text-amber-500", "text-sm")}>
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className={cn("mt-4 px-4", collapsed && "px-0")}>
          {!collapsed && <div className="mb-2 px-2 text-xs font-medium">Settings</div>}
          <div className={cn("flex flex-col gap-1", collapsed ? "items-center px-0" : "px-2")}>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    collapsed && "flex-col py-3 px-0 text-[10px]"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </NavLink>
            ))}
            
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn(
                "justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "flex-col py-3 h-auto"
              )}
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3 text-sm">Logout</span>}
              {collapsed && <span className="mt-1 text-[10px]">Logout</span>}
            </Button>
          </div>
        </div>
      </ScrollArea>

      {!collapsed && userProfile.subscription?.type === "premium" && (
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">Premium Plan</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Valid until {new Date(userProfile.subscription?.expiryDate || Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}
