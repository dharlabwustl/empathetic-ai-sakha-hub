
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  BookMarked, 
  MessageSquare, 
  Brain, 
  BookOpen, 
  Bell, 
  Smile, 
  User,
  FileText
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface SidebarNavProps {
  userType: string;
  userName?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hideSettings?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  userType, 
  userName,
  activeTab, 
  onTabChange,
  hideSettings
}) => {
  const navigate = useNavigate();

  // Main navigation items
  const mainNavItems = [
    { icon: <LayoutDashboard size={20} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic" },
  ];
  
  // Learning tools category - updated with new items
  const learningTools = [
    { icon: <BookOpen size={20} />, title: "Concept Cards", tab: "concepts" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards" },
    { icon: <FileText size={20} />, title: "Practice Exams", tab: "practice-exam" },
    { icon: <BookOpen size={20} />, title: "Exam Syllabus", tab: "syllabus" },
    { icon: <FileText size={20} />, title: "Previous Year Papers", tab: "previous-year" },
  ];

  // AI assistance category
  const aiAssistanceItems = [
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner" },
  ];

  // Personal settings items
  const personalItems = [
    { icon: <User size={20} />, title: "Profile", tab: "profile" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications" }
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  return (
    <div className="hidden lg:block fixed h-screen w-64 left-0 top-0 border-r bg-white dark:bg-gray-800 shadow-sm z-30">
      <div className="flex flex-col h-full">
        {/* Logo at top left */}
        <div className="p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
          <PrepzrLogo width={120} height={40} />
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {/* Main navigation items */}
          {mainNavItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab)}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                activeTab === item.tab
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
          
          {/* Learning Tools Category */}
          <div className="mt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Learning Tools
            </h3>
            {learningTools.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleTabChange(item.tab)}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                  activeTab === item.tab
                    ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
          
          {/* AI Assistance Category */}
          <div className="mt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              AI Assistance
            </h3>
            {aiAssistanceItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleTabChange(item.tab)}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                  activeTab === item.tab
                    ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
          
          <Separator className="my-3" />
          
          {/* Personal settings */}
          {personalItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab)}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                activeTab === item.tab
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
        
        {/* Logout button */}
        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
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

export default SidebarNav;
