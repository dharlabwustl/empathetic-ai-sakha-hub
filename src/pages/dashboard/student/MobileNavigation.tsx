
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const isMobile = useIsMobile();
  
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
    <TooltipProvider>
      <ScrollArea className="md:hidden mb-4 w-full">
        <div className="flex gap-1 px-1 pb-2 overflow-x-auto snap-x snap-mandatory">
          {navItems.map((item) => (
            <Tooltip key={item.tab}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === item.tab ? "default" : "outline"}
                  className={`flex-shrink-0 shadow-sm px-2 snap-center min-w-[80px] ${
                    activeTab === item.tab 
                      ? "bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                  size="sm"
                  onClick={() => handleTabChange(item.tab)}
                >
                  {item.icon}
                  <span className="ml-1 text-xs whitespace-nowrap">{item.title}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
};

export default MobileNavigation;
