
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Home, 
  Calendar, 
  BookMarked, 
  MessageSquare, 
  Brain, 
  BookOpen, 
  LineChart, 
  Activity, 
  Heart, 
  Folder, 
  Video, 
  Users, 
  Bell, 
  Smile, 
  User 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface SidebarNavProps {
  userType: string;
  userName?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  userType, 
  userName,
  activeTab, 
  onTabChange 
}) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications" },
  ];

  // Special category for AI assistance
  const aiAssistanceItems = [
    { icon: <MessageSquare size={20} />, title: "24/7 AI Tutor", tab: "tutor" },
    { icon: <Smile size={20} />, title: "Feel Good Corner", tab: "feel-good-corner" },
  ];

  // Personal settings items
  const personalItems = [
    { icon: <User size={20} />, title: "Profile", tab: "profile" }
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden h-full">
        {/* Logo at top left */}
        <div className="p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
          <PrepzrLogo width={120} height={40} />
        </div>
        
        <div className="p-2">
          {/* Main navigation items */}
          {navItems.map((item) => (
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
          
          {/* Logout button */}
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
