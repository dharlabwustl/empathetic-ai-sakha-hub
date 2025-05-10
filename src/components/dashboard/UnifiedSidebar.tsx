
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, 
  LineChart, Activity, Heart, Folder, Video, Users, Bell, 
  LogOut, ChevronRight, Smile, FileText, Calculator
} from "lucide-react";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface UnifiedSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview", description: "Your personalized learning dashboard" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", description: "Your daily study schedule" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", description: "Get guidance for your academic journey" },
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor", description: "Get help with any subject, any time" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", description: "Practice with smart flashcards" },
    { icon: <BookOpen size={20} />, title: "Exam Syllabus", tab: "syllabus", description: "Browse complete exam curriculum" },
    { icon: <FileText size={20} />, title: "Previous Years", tab: "previous-year-analysis", description: "Analyze previous exam papers" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", description: "Test your knowledge with practice exams" },
    { icon: <Calculator size={20} />, title: "Formula Lab", tab: "formula-practice-lab", description: "Master formulas through practice" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", description: "Track your study progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", description: "Stay motivated with personalized insights" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", description: "Resources for your mental well-being" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner", description: "Take a break and relax" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", description: "Access your study materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", description: "Watch educational videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", description: "Connect with fellow students" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications", description: "Stay updated with important alerts" },
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
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 shadow-sm flex flex-col z-30">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
          <PrepzrLogo width={120} height={40} />
        </div>
        
        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <TooltipProvider delayDuration={300}>
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => handleTabChange(item.tab)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all",
                      activeTab === item.tab
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onMouseEnter={() => setHoveredItem(item.tab)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {activeTab === item.tab && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-lg">
                  <p className="text-sm">{item.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        
        <Separator className="my-2" />
        
        {/* Logout button */}
        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all"
                  onClick={() => navigate('/login')}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-sm">Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSidebar;
