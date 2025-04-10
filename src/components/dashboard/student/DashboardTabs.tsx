
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  tabContents: Record<string, ReactNode>;
  hideTabsNav?: boolean;
}

export default function DashboardTabs({
  activeTab,
  onTabChange,
  tabContents,
  hideTabsNav = false
}: DashboardTabsProps) {
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
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      {!hideTabsNav && (
        <TabsList className="tab-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              className="flex items-center gap-2"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      
      <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
        {tabContents[activeTab] || <div>Coming soon...</div>}
      </TabsContent>
    </Tabs>
  );
}
