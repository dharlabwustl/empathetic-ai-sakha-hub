
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CalendarDays, 
  GraduationCap, 
  BookOpen,
  Brain, 
  FileText, 
  Settings, 
  LogOut,
  MessageSquare,
  Smile
} from 'lucide-react';
import PrepzrLogo from "@/components/common/PrepzrLogo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  tooltip?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, active = false, tooltip }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={path} className="block">
            <motion.div
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <div className="w-5 h-5 flex-shrink-0">{icon}</div>
              <span className="text-sm font-medium">{label}</span>
            </motion.div>
          </Link>
        </TooltipTrigger>
        {tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarNavProps {
  hidden?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ hidden = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === '/dashboard/student') {
      return currentPath === '/dashboard/student' || currentPath === '/';
    }
    return currentPath.includes(path);
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ 
        x: hidden ? -300 : 0,
        opacity: hidden ? 0 : 1,
        width: hidden ? 0 : 256
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-screen fixed top-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all",
        hidden ? "w-0" : "w-64"
      )}
    >
      <div className="flex items-center justify-center gap-2 h-16 p-3 border-b border-gray-200 dark:border-gray-800">
        <PrepzrLogo width={150} height="auto" />
      </div>
      
      <div className="flex flex-col h-full overflow-y-auto p-3">
        <nav className="space-y-1">
          <NavItem 
            icon={<LayoutDashboard className="w-full h-full" />} 
            label="Dashboard" 
            path="/dashboard/student" 
            active={isActive('/dashboard/student')} 
            tooltip="Main Dashboard"
          />
          
          <NavItem 
            icon={<CalendarDays className="w-full h-full" />} 
            label="Today's Plan" 
            path="/dashboard/student/today" 
            active={isActive('/dashboard/student/today')} 
            tooltip="Your daily study plan"
          />
          
          <NavItem 
            icon={<MessageSquare className="w-full h-full" />} 
            label="AI Tutor" 
            path="/dashboard/student/tutor" 
            active={isActive('/dashboard/student/tutor')}
            tooltip="24/7 AI learning assistant" 
          />
          
          <NavItem 
            icon={<GraduationCap className="w-full h-full" />} 
            label="Academic Advisor" 
            path="/dashboard/student/academic" 
            active={isActive('/dashboard/student/academic')}
            tooltip="Personalized learning guidance" 
          />
          
          <NavItem 
            icon={<BookOpen className="w-full h-full" />} 
            label="Concepts" 
            path="/dashboard/student/concepts" 
            active={isActive('/dashboard/student/concepts')}
            tooltip="Master key learning concepts" 
          />
          
          <NavItem 
            icon={<Brain className="w-full h-full" />} 
            label="Flashcards" 
            path="/dashboard/student/flashcards" 
            active={isActive('/dashboard/student/flashcards')}
            tooltip="Smart revision tool" 
          />
          
          <NavItem 
            icon={<FileText className="w-full h-full" />} 
            label="Practice Exams" 
            path="/dashboard/student/practice-exam" 
            active={isActive('/dashboard/student/practice-exam')}
            tooltip="Test your knowledge" 
          />
          
          <NavItem 
            icon={<Smile className="w-full h-full" />} 
            label="Feel Good Corner" 
            path="/dashboard/student/feel-good-corner" 
            active={isActive('/dashboard/student/feel-good-corner')}
            tooltip="Take a break and recharge" 
          />
        </nav>
        
        <div className="mt-auto space-y-1">
          <NavItem 
            icon={<Settings className="w-full h-full" />} 
            label="Profile & Settings" 
            path="/dashboard/student/profile" 
            active={isActive('/dashboard/student/profile')}
            tooltip="Manage your profile and settings"
          />
          
          <NavItem 
            icon={<LogOut className="w-full h-full" />} 
            label="Log Out" 
            path="/logout" 
            tooltip="Sign out of your account"
          />
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarNav;
