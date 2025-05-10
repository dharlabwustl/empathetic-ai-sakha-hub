
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, BookMarked, MessageSquare, 
  Brain, BookOpen, LineChart, Activity, Heart, Folder, 
  Video, Users, Bell, LogOut, ChevronRight, Smile,
  FileText, Calculator, Flame
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, title: "Dashboard", tab: "overview", tooltip: "Overview of your study progress" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", tooltip: "View your daily study plan" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", tooltip: "Get personalized academic guidance" },
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor", tooltip: "Chat with your AI tutor anytime" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", tooltip: "Practice with smart flashcards" },
    { icon: <BookOpen size={20} />, title: "Exam Syllabus", tab: "syllabus", tooltip: "Review your complete exam syllabus" },
    { icon: <FileText size={20} />, title: "Previous Years", tab: "previous-year-analysis", tooltip: "Analyze previous year papers" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", tooltip: "Test your knowledge with practice exams" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", tooltip: "Track your study progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", tooltip: "Get motivated to study better" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", tooltip: "Take care of your mental health" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner", tooltip: "Take a break and feel good" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", tooltip: "Access study materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", tooltip: "Watch educational videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", tooltip: "Join study groups" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications", tooltip: "View your notifications" },
    { icon: <Calculator size={20} />, title: "Formula Lab", tab: "formula-practice-lab", tooltip: "Practice formulas interactively" },
    { icon: <Flame size={20} />, title: "Concepts", tab: "concepts", tooltip: "Explore core concepts" },
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
      default:
        navigate(`/dashboard/student/${tab}`);
        break;
    }
  };
  
  return (
    <TooltipProvider delayDuration={300}>
      <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden fixed w-64 h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-sm">Navigation</h3>
          </div>
          
          <div className="p-2 space-y-1">
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all"
                  onClick={() => navigate('/login')}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
