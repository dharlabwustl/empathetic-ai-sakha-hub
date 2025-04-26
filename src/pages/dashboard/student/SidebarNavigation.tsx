
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, LineChart, 
  Activity, Heart, Folder, Video, Users, Bell, LogOut, ChevronRight } from "lucide-react";

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview", path: "/dashboard/student/overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", path: "/dashboard/student/today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", path: "/dashboard/student/academic" },
    { icon: <BookOpen size={20} />, title: "Concept Cards", tab: "concepts", path: "/dashboard/student/concepts/all" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", path: "/dashboard/student/flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", path: "/dashboard/student/exams" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", path: "/dashboard/student/progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", path: "/dashboard/student/motivation" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", path: "/dashboard/student/wellness" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", path: "/dashboard/student/materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", path: "/dashboard/student/videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", path: "/dashboard/student/forum" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications", path: "/dashboard/student/notifications" },
  ];

  const handleTabChange = (tab: string, path: string) => {
    // Preserve any query parameters that should be maintained between navigation
    const currentParams = new URLSearchParams(location.search);
    const persistParams = ['returning']; // Parameters to maintain between tabs
    
    const params = new URLSearchParams();
    persistParams.forEach(param => {
      if (currentParams.has(param)) {
        params.set(param, currentParams.get(param)!);
      }
    });
    
    const queryString = params.toString();
    const navigatePath = queryString ? `${path}?${queryString}` : path;
    
    onTabChange(tab);
    navigate(navigatePath);
  };
  
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-sm">Navigation</h3>
        </div>
        
        <div className="p-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab, item.path)}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                activeTab === item.tab || (location.pathname === item.path || location.pathname.startsWith(item.path + '/'))
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
              {(activeTab === item.tab || (location.pathname === item.path || location.pathname.startsWith(item.path + '/'))) && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
          ))}
          
          <Separator className="my-3" />
          
          <button 
            className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all"
            onClick={() => navigate('/login')}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
