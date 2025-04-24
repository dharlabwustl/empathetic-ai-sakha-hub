
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Users, 
  LineChart, 
  Settings,
  Calendar,
  List,
  ListTodo
} from "lucide-react";
import { DashboardTabsProps } from "@/pages/dashboard/student/DashboardContent";

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
  tabContents
}) => {
  const availableTabs = tabContents ? Object.keys(tabContents) : [];
  
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />
    },
    {
      id: "weekly-plan",
      label: "Weekly Plan",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: "todays-plan",
      label: "Today's Plan",
      icon: <ListTodo className="h-4 w-4" />
    },
    {
      id: "subjects",
      label: "Subjects",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      id: "concepts",
      label: "Concept Cards",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: <List className="h-4 w-4" />
    },
    {
      id: "quizzes",
      label: "Quizzes",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      id: "community",
      label: "Community",
      icon: <Users className="h-4 w-4" />
    },
    {
      id: "progress",
      label: "Progress",
      icon: <LineChart className="h-4 w-4" />
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />
    }
  ];

  // Filter tabs based on available content
  const visibleTabs = availableTabs.length > 0
    ? tabs.filter(tab => availableTabs.includes(tab.id))
    : tabs;

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full overflow-auto">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-gray-100/70 dark:bg-gray-800/70 h-12 w-full overflow-x-auto grid grid-flow-col auto-cols-max gap-2 pb-px overflow-y-hidden justify-start">
          {visibleTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 h-9 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
