
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, LineChart, Activity, Heart, Folder, Video, Users, Bell } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: <Home size={16} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={16} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={16} />, title: "Academic", tab: "academic" },
    { icon: <MessageSquare size={16} />, title: "Tutor", tab: "tutor" },
    { icon: <Brain size={16} />, title: "Flashcards", tab: "flashcards" },
    { icon: <BookOpen size={16} />, title: "Exams", tab: "exams" },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };

  return (
    <div className="md:hidden mb-6 overflow-x-auto tab-scrollbar pb-2">
      <div className="flex gap-3">
        {navItems.map((item) => (
          <Button
            key={item.tab}
            variant={activeTab === item.tab ? "default" : "outline"}
            className={`flex-shrink-0 ${activeTab === item.tab ? "bg-gradient-to-r from-sky-500 to-violet-500" : ""}`}
            size="sm"
            onClick={() => handleTabChange(item.tab)}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
