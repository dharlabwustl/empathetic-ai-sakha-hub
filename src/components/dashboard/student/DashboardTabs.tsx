
import { ReactNode } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  MessageSquare, 
  Calendar, 
  Activity, 
  LineChart, 
  Brain, 
  BookOpen, 
  Heart,
  Target,
  ListTodo,
  Video,
  Users,
  Bell
} from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardTabs = ({
  activeTab,
  onTabChange
}: DashboardTabsProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Lightbulb size={16} /> },
    { id: "today", label: "Today's Focus", icon: <ListTodo size={16} /> },
    { id: "tutor", label: "24/7 Tutor", icon: <MessageSquare size={16} /> },
    { id: "academic", label: "Academic Advisor", icon: <Calendar size={16} /> },
    { id: "motivation", label: "Motivation", icon: <Activity size={16} /> },
    { id: "progress", label: "Progress", icon: <LineChart size={16} /> },
    { id: "flashcards", label: "Flashcards", icon: <Brain size={16} /> },
    { id: "materials", label: "Materials", icon: <BookOpen size={16} /> },
    { id: "goals", label: "Goals", icon: <Target size={16} /> },
    { id: "wellness", label: "Wellness", icon: <Heart size={16} /> },
    { id: "live-tutors", label: "Live Tutors", icon: <Video size={16} /> },
    { id: "forum", label: "Forum", icon: <Users size={16} /> },
    { id: "videos", label: "Videos", icon: <Video size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> }
  ];

  return (
    <div className="mb-6 overflow-x-auto px-1 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <TabsList className="inline-flex h-10 w-auto min-w-full gap-2 bg-transparent p-0">
        {tabs.map(tab => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id} 
            onClick={() => onTabChange(tab.id)}
            className={`flex h-9 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg" 
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
