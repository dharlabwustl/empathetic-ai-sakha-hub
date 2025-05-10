
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: <Home size={16} />, title: "Dashboard", tab: "overview", tooltip: "Go to dashboard" },
    { icon: <Calendar size={16} />, title: "Today's Plan", tab: "today", tooltip: "View your study plan for today" },
    { icon: <BookMarked size={16} />, title: "Academic", tab: "academic", tooltip: "Get academic guidance" },
    { icon: <MessageSquare size={16} />, title: "Tutor", tab: "tutor", tooltip: "Chat with your AI tutor" },
    { icon: <Brain size={16} />, title: "Flashcards", tab: "flashcards", tooltip: "Practice with flashcards" },
    { icon: <BookOpen size={16} />, title: "Exams", tab: "exams", tooltip: "Take practice exams" },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="md:hidden mb-6 overflow-x-auto tab-scrollbar pb-3">
        <div className="flex gap-3 px-1">
          {navItems.map((item) => (
            <Tooltip key={item.tab}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === item.tab ? "default" : "outline"}
                  className={`flex-shrink-0 shadow-sm ${
                    activeTab === item.tab 
                      ? "bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                  size="sm"
                  onClick={() => handleTabChange(item.tab)}
                >
                  {item.icon}
                  <span className="ml-2 whitespace-nowrap">{item.title}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MobileNavigation;
