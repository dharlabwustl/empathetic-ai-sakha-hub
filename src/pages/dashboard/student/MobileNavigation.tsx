
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, FileText, FileSearch, Smile, GraduationCap, Headphones, ClipboardList } from "lucide-react";
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
    { icon: <Home size={16} />, title: "Home", tab: "overview", tooltip: "Go to dashboard" },
    { icon: <Calendar size={16} />, title: "Today", tab: "today", tooltip: "View your study plan for today" },
    { icon: <GraduationCap size={16} />, title: "Academic", tab: "academic", tooltip: "Get academic guidance" },
    { icon: <Headphones size={16} />, title: "Tutor", tab: "tutor", tooltip: "Chat with your AI tutor" },
    { icon: <BookOpen size={16} />, title: "Concepts", tab: "concepts", tooltip: "Browse concept cards" },
    { icon: <Brain size={16} />, title: "Flashcards", tab: "flashcards", tooltip: "Practice with flashcards" },
    { icon: <ClipboardList size={16} />, title: "Exams", tab: "practice-exam", tooltip: "Take practice exams" },
    { icon: <FileText size={16} />, title: "Syllabus", tab: "syllabus", tooltip: "View exam syllabus" },
    { icon: <FileSearch size={16} />, title: "Past Papers", tab: "previous-year-analysis", tooltip: "Analyze previous year papers" },
    { icon: <Smile size={16} />, title: "Feel Good", tab: "feel-good-corner", tooltip: "Take a wellness break" }
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab === 'overview' ? '' : tab}`);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-950 border-t shadow-lg pb-safe">
        <ScrollArea className="md:hidden w-full">
          <div className="flex gap-1 px-2 py-3 overflow-x-auto snap-x snap-mandatory">
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentTab === item.tab ? "default" : "outline"}
                    className={`flex-shrink-0 shadow-sm px-2 snap-center min-w-[70px] h-auto py-1 ${
                      currentTab === item.tab 
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                    size="sm"
                    onClick={() => handleTabChange(item.tab)}
                  >
                    <div className="flex flex-col items-center">
                      {item.icon}
                      <span className="mt-1 text-[10px] whitespace-nowrap">{item.title}</span>
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Add padding at the bottom to account for fixed navigation */}
      <div className="h-16"></div>
    </TooltipProvider>
  );
};

export default MobileNavigation;
