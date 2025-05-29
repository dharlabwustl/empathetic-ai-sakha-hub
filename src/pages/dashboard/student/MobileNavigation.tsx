
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, FileText, FileSearch, Smile, GraduationCap, Headphones, ClipboardList, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Get active tab from URL if not specified
  const currentTab = activeTab || location.pathname.split('/').pop() || 'overview';
  
  const navItems = [
    { icon: <Home size={14} />, title: "Home", tab: "overview", tooltip: "Go to dashboard", route: "/dashboard/student" },
    { icon: <Calendar size={14} />, title: "Today", tab: "today", tooltip: "View your study plan for today", route: "/dashboard/student/today" },
    { icon: <BookOpen size={14} />, title: "Concepts", tab: "concepts", tooltip: "Browse concept cards", route: "/dashboard/student/concepts" },
    { icon: <Brain size={14} />, title: "Flashcards", tab: "flashcards", tooltip: "Practice with flashcards", route: "/dashboard/student/flashcards" },
    { icon: <ClipboardList size={14} />, title: "Practice", tab: "practice-exam", tooltip: "Take practice exams", route: "/dashboard/student/practice-exam" },
    { icon: <GraduationCap size={14} />, title: "Academic", tab: "academic", tooltip: "Get academic guidance", route: "/dashboard/student/academic" },
    { icon: <Bell size={14} />, title: "Alerts", tab: "notifications", tooltip: "Updates and alerts", route: "/dashboard/student/notifications" }
  ];

  const handleTabChange = (tab: string, route: string) => {
    onTabChange(tab);
    navigate(route);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-t shadow-lg pb-safe">
        <ScrollArea className="w-full">
          <div className="flex gap-1 px-2 py-2 overflow-x-auto">
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentTab === item.tab ? "default" : "ghost"}
                    className={`flex-shrink-0 min-w-[60px] h-12 px-2 py-1 ${
                      currentTab === item.tab 
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                    size="sm"
                    onClick={() => handleTabChange(item.tab, item.route)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {item.icon}
                      <span className="text-[10px] font-medium leading-none">{item.title}</span>
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};

export default MobileNavigation;
