
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  hideTabsNav,
  lastActivity,
  suggestedNextAction
}) => {
  // Generate the tab contents
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour,
    lastActivity,
    suggestedNextAction
  });
  
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange} className="w-full">
      {/* Show tabs nav unless hidden */}
      {!hideTabsNav && (
        <TabsList className="flex overflow-x-auto max-w-full p-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
          <TabsTrigger value="overview" className="px-4">Overview</TabsTrigger>
          <TabsTrigger value="today" className="px-4">Today</TabsTrigger>
          <TabsTrigger value="flashcards" className="px-4">Flashcards</TabsTrigger>
          <TabsTrigger value="practice-exam" className="px-4">Practice Exams</TabsTrigger>
          <TabsTrigger value="influence-meter" className="px-4">Influence Meter</TabsTrigger>
          <TabsTrigger value="feel-good" className="px-4">Feel Good Corner</TabsTrigger>
        </TabsList>
      )}
      
      {/* Tab content */}
      {Object.entries(tabContents).map(([tab, content]) => (
        <TabsContent key={tab} value={tab}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardContent;
