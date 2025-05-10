
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, LineChart, 
  Activity, Heart, Folder, Video, Users, Bell, LogOut, ChevronRight, Smile, FileText, Calculator } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview", tooltip: "Dashboard overview with your daily progress" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", tooltip: "View your tasks and schedule for today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", tooltip: "Get personalized academic guidance" },
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor", tooltip: "Access your AI tutor anytime" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", tooltip: "Study with interactive flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", tooltip: "Test your knowledge with practice exams" },
    { icon: <Calculator size={20} />, title: "Formula Practice Lab", tab: "formula-practice-lab", tooltip: "Practice with formulas and calculations" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", tooltip: "Track your learning progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", tooltip: "Stay motivated with achievement tracking" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", tooltip: "Tools for mental well-being" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner", tooltip: "Take a break and boost your mood" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", tooltip: "Access your study materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", tooltip: "Watch educational videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", tooltip: "Connect with study groups" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications", tooltip: "View your notifications" },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    switch (tab) {
      case 'syllabus':
        navigate('/dashboard/student/syllabus');
        break;
      case 'previous-year-analysis':
        navigate('/dashboard/student/previous-year-analysis');
        break;
      case 'formula-practice-lab':
        navigate('/dashboard/student/formula-practice-lab');
        break;
      default:
        navigate(`/dashboard/student/${tab}`);
        break;
    }
  };
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-sm">Navigation</h3>
          </div>
          
          <div className="p-2">
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleTabChange(item.tab)}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                      activeTab === item.tab
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {activeTab === item.tab && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            <Separator className="my-3" />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all"
                  onClick={() => navigate('/login')}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SidebarNavigation;
