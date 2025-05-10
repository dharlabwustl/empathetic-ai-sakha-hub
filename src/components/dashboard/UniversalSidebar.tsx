
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  BookOpen, 
  Calendar, 
  FileSearch, 
  FileText, 
  Brain, 
  ClipboardList, 
  GraduationCap, 
  Headphones, 
  LayoutDashboard, 
  LogOut, 
  Bell, 
  User, 
  Smile,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PrepzrLogo from '../common/PrepzrLogo';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

interface UniversalSidebarProps {
  collapsed?: boolean;
  onClose?: () => void;
}

const UniversalSidebar: React.FC<UniversalSidebarProps> = ({ collapsed = false, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose && isMobile) {
      onClose();
    }
  };
  
  // Navigation items grouped by categories
  const navItems = [
    {
      category: "Your Learning Journey",
      items: [
        { path: "/dashboard/student", icon: <LayoutDashboard size={20} />, label: "Dashboard", tooltip: "Overview of your study progress" },
        { path: "/dashboard/student/academic", icon: <GraduationCap size={20} />, label: "Academic Advisor", tooltip: "Get personalized academic guidance" },
        { path: "/dashboard/student/today", icon: <Calendar size={20} />, label: "Today's Plan", tooltip: "View your daily study plan" },
      ]
    },
    {
      category: "Learning Tools",
      items: [
        { path: "/dashboard/student/syllabus", icon: <FileText size={20} />, label: "Exam Syllabus", tooltip: "Complete exam syllabus" },
        { path: "/dashboard/student/previous-year-analysis", icon: <FileSearch size={20} />, label: "Previous Year Papers", tooltip: "Analyze previous year questions" },
        { path: "/dashboard/student/concepts", icon: <BookOpen size={20} />, label: "Concept Cards", tooltip: "Learn key concepts" },
        { path: "/dashboard/student/flashcards", icon: <Brain size={20} />, label: "Flashcards", tooltip: "Practice with flashcards" },
        { path: "/dashboard/student/practice-exam", icon: <ClipboardList size={20} />, label: "Practice Exams", tooltip: "Take practice tests" },
      ]
    },
    {
      category: "AI Assistance",
      items: [
        { path: "/dashboard/student/feel-good-corner", icon: <Smile size={20} />, label: "Feel Good Corner", tooltip: "Boost your mood and motivation" },
        { path: "/dashboard/student/tutor", icon: <Headphones size={20} />, label: "24/7 AI Tutor", tooltip: "Get help anytime, anywhere" },
      ]
    },
    {
      category: "Personal",
      items: [
        { path: "/dashboard/student/profile", icon: <User size={20} />, label: "Profile", tooltip: "View and edit your profile" },
        { path: "/dashboard/student/notifications", icon: <Bell size={20} />, label: "Notifications", tooltip: "Check your notifications" },
      ]
    }
  ];

  return (
    <aside className={cn(
      "border-r border-border bg-background flex flex-col h-screen z-40",
      collapsed ? "w-[70px]" : isMobile ? "w-[280px]" : "w-[230px]"
    )}>
      {/* Logo Section with Close button for mobile */}
      <div className="border-b border-border p-3 flex justify-between items-center">
        <Link to="/" className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <PrepzrLogo width={collapsed ? 40 : 120} height={40} />
        </Link>
        
        {isMobile && onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="ms-auto">
            <X size={18} />
          </Button>
        )}
      </div>
      
      {/* Navigation Section */}
      <ScrollArea className="flex-grow">
        <div className="px-3 py-2">
          <TooltipProvider>
            {navItems.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {!collapsed && (
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    {group.category}
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item, itemIndex) => (
                    <Tooltip key={itemIndex}>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          onClick={() => handleNavigation(item.path)}
                          className={cn(
                            "flex items-center rounded-md w-full px-3 py-2 text-sm transition-colors",
                            isActive(item.path) 
                              ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white" 
                              : "hover:bg-muted",
                            collapsed ? "justify-center" : "justify-start gap-3",
                            !collapsed && "justify-start text-left"
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </ScrollArea>
      
      {/* Logout Button */}
      <div className="border-t border-border p-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full text-destructive hover:text-destructive hover:bg-destructive/10",
                  collapsed ? "justify-center p-2" : "justify-start"
                )}
                onClick={handleLogout}
              >
                <LogOut size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-2">Logout</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout from your account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default UniversalSidebar;
