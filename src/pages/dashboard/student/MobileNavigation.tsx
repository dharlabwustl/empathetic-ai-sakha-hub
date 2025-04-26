
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  BookMarked, 
  BookOpen, 
  Brain, 
  FileText, 
  Activity, 
  Heart, 
  Folder, 
  Video, 
  Users, 
  Bell 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Define consistent routes for mobile navigation - ensuring alignment with other navigation components
  const navItems = [
    { icon: <Home size={16} />, title: "Dashboard", tab: "overview", path: "/dashboard/student/overview" },
    { icon: <Calendar size={16} />, title: "Today's Plan", tab: "today", path: "/dashboard/student/today" },
    { icon: <BookMarked size={16} />, title: "Academic", tab: "academic", path: "/dashboard/student/academic" },
    { icon: <BookOpen size={16} />, title: "Concepts", tab: "concepts", path: "/dashboard/student/concepts/all" },
    { icon: <Brain size={16} />, title: "Flashcards", tab: "flashcards", path: "/dashboard/student/flashcards" },
    { icon: <FileText size={16} />, title: "Exams", tab: "exams", path: "/dashboard/student/exams" },
    { icon: <Activity size={16} />, title: "Progress", tab: "progress", path: "/dashboard/student/progress" },
    { icon: <Heart size={16} />, title: "Wellness", tab: "wellness", path: "/dashboard/student/wellness" },
    { icon: <Folder size={16} />, title: "Materials", tab: "materials", path: "/dashboard/student/materials" },
    { icon: <Video size={16} />, title: "Videos", tab: "videos", path: "/dashboard/student/videos" },
    { icon: <Users size={16} />, title: "Forum", tab: "forum", path: "/dashboard/student/forum" },
    { icon: <Bell size={16} />, title: "Alerts", tab: "notifications", path: "/dashboard/student/notifications" },
  ];

  const handleTabChange = (tab: string, path: string) => {
    onTabChange(tab);
    navigate(path);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="md:hidden mb-6 overflow-x-auto tab-scrollbar pb-3">
      <div className="flex gap-3 px-1">
        {navItems.map((item) => (
          <Button
            key={item.tab}
            variant={activeTab === item.tab || location.pathname.includes(item.path) ? "default" : "outline"}
            className={`flex-shrink-0 shadow-sm ${
              activeTab === item.tab || location.pathname.includes(item.path)
                ? "bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
            size="sm"
            onClick={() => handleTabChange(item.tab, item.path)}
          >
            {item.icon}
            <span className="ml-2 whitespace-nowrap">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
