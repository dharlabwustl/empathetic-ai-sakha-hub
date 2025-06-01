
import React, { useState, useEffect } from 'react';
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
  Calculator 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PrepzrLogo from '../common/PrepzrLogo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import BrainTeaserPromo from './student/BrainTeaserPromo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UniversalSidebarProps {
  collapsed?: boolean;
}

const UniversalSidebar: React.FC<UniversalSidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showFormulaTab, setShowFormulaTab] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  // Check if user has a formula-heavy exam goal
  useEffect(() => {
    const checkExamGoal = () => {
      // In a real app, this would check the user's profile
      // For now, simulate the check with localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          
          // List of formula-heavy exam goals
          const formulaHeavyExams = ['JEE', 'NEET', 'CAT', 'GMAT', 'GRE', 'Physics', 'Chemistry', 'Mathematics'];
          
          // Check if user's exam goal is in the list
          if (parsedData.examGoal && formulaHeavyExams.includes(parsedData.examGoal)) {
            setShowFormulaTab(true);
            return;
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
      
      // Default: show for demo purposes
      setShowFormulaTab(true);
    };
    
    checkExamGoal();
  }, []);
  
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
        ...(showFormulaTab ? [{ path: "/dashboard/student/formula-practice", icon: <Calculator size={20} />, label: "Formula Practice", tooltip: "Interactive formula practice lab" }] : []),
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
      "border-r border-border bg-background transition-all duration-300 flex flex-col h-screen",
      collapsed ? "w-[70px]" : "w-[230px]"
    )}>
      {/* Logo Section */}
      <div className="border-b border-border p-3 flex justify-center">
        <Link to="/" className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <PrepzrLogo width={collapsed ? 40 : 120} height={40} />
        </Link>
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
                        <Link 
                          to={item.path}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                            isActive(item.path) 
                              ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white" 
                              : "hover:bg-muted",
                            collapsed ? "justify-center" : "gap-3"
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
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
      
      {/* Bottom Section with Theme Toggle, Logout, and Brain Teaser Promo */}
      <div className="border-t border-border p-3 space-y-3">
        {/* Brain Teaser Promotional Section */}
        {!collapsed && <BrainTeaserPromo />}
        
        <div className={cn("flex", collapsed ? "justify-center" : "justify-between items-center")}>
          {!collapsed && <span className="text-xs text-muted-foreground">Appearance</span>}
          <ThemeToggle />
        </div>
        
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
