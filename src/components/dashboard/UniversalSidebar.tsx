
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SidebarAvatar from './SidebarAvatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import {
  Home,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Calendar,
  FileText,
  BookOpen,
  Brain,
  Smile,
  MessageSquare,
  GraduationCap,
  Users,
  Calculator,
  HelpCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Sidebar link type definition
interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
  isActive: boolean;
  tooltip?: string;
  isNew?: boolean;
  onClick?: () => void;
}

// Helper component for sidebar links
const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  text,
  collapsed,
  isActive,
  tooltip,
  isNew = false,
  onClick,
}) => {
  const content = (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'w-full justify-start gap-2 text-left',
        isActive
          ? 'bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white'
          : '',
        'relative'
      )}
      asChild
      onClick={onClick}
    >
      <Link to={to}>
        {icon}
        {!collapsed && <span>{text}</span>}
        {isNew && !collapsed && (
          <span className="ml-2 px-1 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded">NEW</span>
        )}
        {isNew && collapsed && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </Link>
    </Button>
  );

  if (collapsed && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip}</p>
            {isNew && <p className="text-red-500 font-bold text-xs mt-1">NEW</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

interface UniversalSidebarProps {
  collapsed?: boolean;
}

const UniversalSidebar: React.FC<UniversalSidebarProps> = ({ collapsed: propCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(propCollapsed);
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [examGoal, setExamGoal] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  useEffect(() => {
    // Get the user type from localStorage or other source
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === 'teacher' || storedUserType === 'admin') {
      setUserType(storedUserType);
    } else {
      setUserType('student');
    }
    
    // Get the exam goal from localStorage or other source
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.examGoal) {
          setExamGoal(parsed.examGoal);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Define paths based on user type
  const getDashboardPath = () => {
    switch (userType) {
      case 'teacher':
        return '/dashboard/teacher';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard/student';
    }
  };

  const dashboardPath = getDashboardPath();

  // Check if the given exam goal should show formula practice link
  const hasFormulaPractice = (goal: string | null) => {
    if (!goal) return false;
    // These exam goals are formula-heavy
    const formulaBasedExams = ['JEE', 'NEET', 'GATE', 'CAT', 'GRE'];
    return formulaBasedExams.includes(goal);
  };

  return (
    <div
      className={cn(
        'h-screen flex flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300',
        collapsed ? 'w-[80px]' : 'w-[260px]'
      )}
    >
      <div className="p-4">
        <SidebarAvatar collapsed={collapsed} />
      </div>

      <Separator className="mb-4" />

      <div className="flex-1 overflow-auto px-3 pt-2">
        <nav className="space-y-1">
          {/* Common links for all users */}
          <SidebarLink
            to={dashboardPath}
            icon={<Home size={20} />}
            text="Dashboard"
            collapsed={collapsed}
            isActive={location.pathname === dashboardPath}
            tooltip="Dashboard"
          />

          {/* Student-specific links */}
          {userType === 'student' && (
            <>
              <SidebarLink
                to="/dashboard/student/today"
                icon={<Calendar size={20} />}
                text="Today's Plan"
                collapsed={collapsed}
                isActive={isActive('/today')}
                tooltip="View your study plan for today"
              />
              
              <SidebarLink
                to="/dashboard/student/academic"
                icon={<GraduationCap size={20} />}
                text="Academic Advisor"
                collapsed={collapsed}
                isActive={isActive('/academic')}
                tooltip="Get personalized academic guidance"
              />
              
              <SidebarLink
                to="/dashboard/student/tutor"
                icon={<MessageSquare size={20} />}
                text="AI Tutor"
                collapsed={collapsed}
                isActive={isActive('/tutor')}
                tooltip="Chat with your AI tutor"
                isNew={true}
              />
              
              <SidebarLink
                to="/dashboard/student/concepts"
                icon={<BookOpen size={20} />}
                text="Concepts"
                collapsed={collapsed}
                isActive={isActive('/concepts')}
                tooltip="Browse concept cards"
              />
              
              {/* Conditionally show Formula Practice link based on exam goal */}
              {hasFormulaPractice(examGoal) && (
                <SidebarLink
                  to={`/dashboard/student/formula-practice/${examGoal}`}
                  icon={<Calculator size={20} />}
                  text="Formula Practice"
                  collapsed={collapsed}
                  isActive={isActive('/formula-practice')}
                  tooltip="Practice formula-based problems"
                  isNew={true}
                />
              )}
              
              <SidebarLink
                to="/dashboard/student/flashcards"
                icon={<Brain size={20} />}
                text="Flashcards"
                collapsed={collapsed}
                isActive={isActive('/flashcards')}
                tooltip="Practice with flashcards"
              />
              
              <SidebarLink
                to="/dashboard/student/practice-exam"
                icon={<FileText size={20} />}
                text="Practice Exams"
                collapsed={collapsed}
                isActive={isActive('/practice-exam')}
                tooltip="Take practice exams"
              />
              
              <SidebarLink
                to="/dashboard/student/feel-good-corner"
                icon={<Smile size={20} />}
                text="Feel Good Corner"
                collapsed={collapsed}
                isActive={isActive('/feel-good-corner')}
                tooltip="Take a wellness break"
              />
              
              <SidebarLink
                to="/dashboard/student/notifications"
                icon={<Bell size={20} />}
                text="Notifications"
                collapsed={collapsed}
                isActive={isActive('/notifications')}
                tooltip="View your notifications"
              />
            </>
          )}

          {/* Common user management links */}
          <SidebarLink
            to={`${dashboardPath}/profile`}
            icon={<User size={20} />}
            text="Profile"
            collapsed={collapsed}
            isActive={isActive('/profile')}
            tooltip="View your profile"
          />
          
          <SidebarLink
            to={`${dashboardPath}/settings`}
            icon={<Settings size={20} />}
            text="Settings"
            collapsed={collapsed}
            isActive={isActive('/settings')}
            tooltip="Manage your settings"
          />

          <SidebarLink
            to="/help"
            icon={<HelpCircle size={20} />}
            text="Help & Support"
            collapsed={collapsed}
            isActive={isActive('/help')}
            tooltip="Get help and support"
          />
        </nav>
      </div>

      <div className="p-3 mt-auto">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut size={20} className="mr-2" />
          {!collapsed && <span>Log out</span>}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-full h-8 mt-4"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={18} className="mx-auto" />
          ) : (
            <ChevronLeft size={18} className="mx-auto" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default UniversalSidebar;
