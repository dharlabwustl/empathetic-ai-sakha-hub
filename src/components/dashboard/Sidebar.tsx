
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FlaskConical, 
  Lightbulb, 
  TestTube,
  Settings, 
  Heart,
  UserRound,
  MessageSquare,
  LogOut
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import PrepzrLogo from '../common/PrepzrLogo';

interface SidebarProps {
  className?: string;
  expanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ className, expanded = true }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const mainRoutes = [
    { name: 'Overview', path: '/dashboard/student', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Today's Plan", path: '/dashboard/student/today', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Study Plan', path: '/dashboard/student/study-plan', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Concepts', path: '/dashboard/student/concepts', icon: <FlaskConical className="h-5 w-5" /> },
    { name: 'Flashcards', path: '/dashboard/student/flashcards', icon: <Lightbulb className="h-5 w-5" /> },
    { name: 'Practice Exams', path: '/dashboard/student/practice-exam', icon: <TestTube className="h-5 w-5" /> },
  ];

  const secondaryRoutes = [
    { name: 'Feel Good Corner', path: '/dashboard/student/feel-good-corner', icon: <Heart className="h-5 w-5" /> },
    { name: 'Academic Advisor', path: '/dashboard/student/academic', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Profile', path: '/dashboard/student/profile', icon: <UserRound className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard/student' && currentPath === '/dashboard/student') {
      return true;
    }
    return currentPath.startsWith(path) && path !== '/dashboard/student';
  };

  const NavItem = ({ path, name, icon }: { path: string; name: string; icon: React.ReactNode }) => (
    <Link to={path} className="block">
      <Button
        variant={isActive(path) ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          isActive(path) 
            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300" 
            : ""
        )}
      >
        {icon}
        <span className="ml-2">{name}</span>
      </Button>
    </Link>
  );

  return (
    <aside className={cn(
      "flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-screen transition-all duration-300",
      expanded ? "w-64" : "w-16",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center justify-center">
            <PrepzrLogo width={expanded ? 150 : 32} height="auto" />
          </Link>
        </div>
        
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-1">
            {mainRoutes.map((route) => (
              <NavItem key={route.path} {...route} />
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            {secondaryRoutes.map((route) => (
              <NavItem key={route.path} {...route} />
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={async () => await logout()}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
