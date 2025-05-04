
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Home,
  BookOpen,
  BookText,
  BarChart3,
  Heart,
  CalendarDays,
  MessagesSquare,
  UserCircle2,
  LayoutDashboard,
  Bell,
  GraduationCap,
  Settings,
  HardDrive,
  Book,
  HandCoins,
  FlaskConical,
  PenTool,
  Dumbbell,
  TrendingUp,
  Zap,
  Users,
  Trophy,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type StudentRoute = {
  title: string;
  path: string;
  icon: React.ReactElement | React.FC<any>;
  badge?: string;
  parentTab?: string;
};

type StudentRoutesProps = {
  collapsed: boolean;
  showLabels?: boolean;
  activeTab?: string;
};

export const SidebarNavRoutes: React.FC<StudentRoutesProps> = ({
  collapsed,
  showLabels = true,
  activeTab,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mainRoutes: StudentRoute[] = [
    {
      title: 'Dashboard',
      path: '/dashboard/student',
      icon: <LayoutDashboard className="h-5 w-5" />,
      parentTab: 'overview',
    },
    {
      title: "Today's Plan",
      path: '/dashboard/student/today',
      icon: <CalendarDays className="h-5 w-5" />,
      parentTab: 'today',
    },
    {
      title: 'Daily Challenges',
      path: '/dashboard/student/daily-challenges',
      icon: <Trophy className="h-5 w-5" />,
      badge: 'New',
      parentTab: 'daily-challenges',
    },
    {
      title: 'Study Groups',
      path: '/dashboard/student/study-groups',
      icon: <Users className="h-5 w-5" />,
      parentTab: 'study-groups',
    },
    {
      title: 'Academic Advisor',
      path: '/dashboard/student/academic',
      icon: <GraduationCap className="h-5 w-5" />,
      parentTab: 'academic',
    },
    {
      title: 'AI Tutor',
      path: '/dashboard/student/tutor',
      icon: <Zap className="h-5 w-5" />,
      parentTab: 'tutor',
    },
    {
      title: 'Feel Good Corner',
      path: '/dashboard/student/feel-good-corner',
      icon: <Heart className="h-5 w-5" />,
      parentTab: 'feel-good',
    },
  ];

  const learningRoutes: StudentRoute[] = [
    {
      title: 'Concepts',
      path: '/dashboard/student/concepts',
      icon: <BookText className="h-5 w-5" />,
      parentTab: 'concepts',
    },
    {
      title: 'Flashcards',
      path: '/dashboard/student/flashcards',
      icon: <BookOpen className="h-5 w-5" />,
      parentTab: 'flashcards',
    },
    {
      title: 'Practice Exams',
      path: '/dashboard/student/practice-exam',
      icon: <PenTool className="h-5 w-5" />,
      parentTab: 'practice-exam',
    },
  ];

  const accountRoutes: StudentRoute[] = [
    {
      title: 'Profile',
      path: '/dashboard/student/profile',
      icon: <UserCircle2 className="h-5 w-5" />,
      parentTab: 'profile',
    },
    {
      title: 'Notifications',
      path: '/dashboard/student/notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: '3',
      parentTab: 'notifications',
    },
    {
      title: 'Subscription',
      path: '/dashboard/student/subscription',
      icon: <HandCoins className="h-5 w-5" />,
      parentTab: 'subscription',
    },
  ];

  // Function to determine if a route is active
  const isRouteActive = (route: StudentRoute) => {
    if (route.path === '/dashboard/student' && currentPath === '/dashboard/student') {
      return true;
    }
    return currentPath.startsWith(route.path) && route.path !== '/dashboard/student';
  };

  // Function to match the active tab
  const isRouteActiveByTab = (route: StudentRoute) => {
    if (!activeTab) return isRouteActive(route);
    return route.parentTab === activeTab;
  };

  const renderNavItems = (routes: StudentRoute[]) => {
    return routes.map((route) => {
      const isActive = isRouteActiveByTab(route);
      
      return (
        <TooltipProvider key={route.path} delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={route.path}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-10 justify-start w-full',
                  isActive ? 'bg-accent text-accent-foreground' : ''
                )}
              >
                <div className="flex items-center">
                  {React.cloneElement(route.icon)}
                  
                  {(!collapsed || !showLabels) && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={collapsed ? 'collapsed' : 'expanded'}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        <span className={cn('ml-2 truncate', !showLabels && 'sr-only')}>
                          {route.title}
                        </span>
                        
                        {route.badge && (
                          <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                            {route.badge}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(!collapsed && 'hidden')}>
              <p>{route.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main Navigation */}
      <div className="flex flex-col gap-1">
        {renderNavItems(mainRoutes)}
      </div>

      {/* Learning Section */}
      <div className="space-y-1">
        <div className={cn('px-2 text-xs text-muted-foreground', collapsed && 'sr-only')}>
          Learning Resources
        </div>
        {renderNavItems(learningRoutes)}
      </div>

      {/* Account Section */}
      <div className="space-y-1">
        <div className={cn('px-2 text-xs text-muted-foreground', collapsed && 'sr-only')}>
          Account
        </div>
        {renderNavItems(accountRoutes)}
      </div>
    </div>
  );
};

export default SidebarNavRoutes;
