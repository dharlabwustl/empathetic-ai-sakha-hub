
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Fixed import
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import OverviewTab from "@/components/dashboard/student/tab-contents/OverviewTab";
import SubjectsTab from "@/components/dashboard/student/tab-contents/SubjectsTab";
import QuizzesTab from "@/components/dashboard/student/tab-contents/QuizzesTab";
import ResourcesTab from "@/components/dashboard/student/tab-contents/ResourcesTab";
import CommunityTab from "@/components/dashboard/student/tab-contents/CommunityTab";
import ProgressTab from "@/components/dashboard/student/tab-contents/ProgressTab";
import SettingsTab from "@/components/dashboard/student/tab-contents/SettingsTab";
import NoMatchContent from "@/components/dashboard/student/tab-contents/NoMatchContent";
import TodayTip from "@/components/dashboard/student/TodayTip";
import NudgesSection from "@/components/dashboard/student/NudgesSection";
import RecommendedActionButtons from "@/components/dashboard/student/RecommendedActionButtons";
import { UserProfileType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any; // Replace with proper type
  showWelcomeTour?: boolean;
  handleSkipTour?: () => void;
  handleCompleteTour?: () => void;
  hideTabsNav?: boolean;
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
  hideTabsNav,
  lastActivity,
  suggestedNextAction,
}) => {
  return (
    <div className="pb-20 lg:pb-0">
      {nudges && nudges.length > 0 && (
        <NudgesSection nudges={nudges} onMarkAsRead={markNudgeAsRead} />
      )}
      
      <div className="my-4">
        <TodayTip 
          userProfile={userProfile} 
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Recommended Actions
        </h3>
        <RecommendedActionButtons userProfile={userProfile} />
      </div>
      
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        {!hideTabsNav && (
          <TabsList className="mb-4 bg-white dark:bg-gray-800 overflow-x-auto flex flex-nowrap w-full justify-start h-auto p-1 rounded-md">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="subjects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Subjects
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Practice Tests
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Resources
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Community
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Progress
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md">
              Settings
            </TabsTrigger>
          </TabsList>
        )}
        
        {!features[activeTab] ? (
          <Alert className="mb-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The {activeTab} feature is not available in your current plan. Please upgrade to access this feature.
            </AlertDescription>
          </Alert>
        ) : null}
        
        <TabsContent value="overview">
          <OverviewTab userProfile={userProfile} kpis={kpis} />
        </TabsContent>
        
        <TabsContent value="subjects">
          <SubjectsTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="quizzes">
          <QuizzesTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="community">
          <CommunityTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="progress">
          <ProgressTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab userProfile={userProfile} />
        </TabsContent>
        
        {!["overview", "subjects", "quizzes", "resources", "community", "progress", "settings"].includes(activeTab) && (
          <NoMatchContent activeTab={activeTab} />
        )}
      </Tabs>
    </div>
  );
};

export default DashboardContent;
