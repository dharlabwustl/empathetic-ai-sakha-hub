
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, LineChart, 
  Activity, Heart, Folder, Video, Users, Bell, LogOut, ChevronRight, Smile, FileText, 
  Calculator, FunctionSquare } from "lucide-react";

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview", tooltip: "Overview of your study progress" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today", tooltip: "Your study plan for today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic", tooltip: "Get personalized academic advice" },
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor", tooltip: "Chat with your AI tutor anytime" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards", tooltip: "Practice with smart flashcards" },
    { icon: <Calculator size={20} />, title: "Formula Practice Lab", tab: "formula-practice-lab", tooltip: "Practice formulas and numerical problems" },
    { icon: <FunctionSquare size={20} />, title: "Formula Mastery", tab: "formula-mastery", tooltip: "Master formulas with step-by-step guidance" },
    { icon: <BookOpen size={20} />, title: "Exam Syllabus", tab: "syllabus", tooltip: "View your exam syllabus and track progress" },
    { icon: <FileText size={20} />, title: "Previous Years", tab: "previous-year-analysis", tooltip: "Analyze previous year exam papers" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams", tooltip: "Take practice exams and assessments" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress", tooltip: "Track your learning progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation", tooltip: "Get motivated to study better" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness", tooltip: "Resources for your mental wellbeing" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner", tooltip: "Take a break and lift your mood" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials", tooltip: "Access your study materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos", tooltip: "Watch educational videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum", tooltip: "Connect with fellow students" },
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
      case 'formula-mastery':
        navigate('/dashboard/student/formula-mastery');
        break;
      default:
        navigate(`/dashboard/student/${tab}`);
        break;
    }
  };
  
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-sm">Navigation</h3>
        </div>
        
        <div className="p-2">
          <TooltipProvider delayDuration={300}>
            {navItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleTabChange(item.tab)}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                      activeTab === item.tab || location.pathname.includes(`/${item.tab}`)
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {(activeTab === item.tab || location.pathname.includes(`/${item.tab}`)) && (
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
                <p>Sign out from your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
