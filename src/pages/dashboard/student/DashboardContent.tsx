import React from 'react';
import { UserProfileType, MoodType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import OverviewTab from './tabs/OverviewTab';
import SubjectsTab from './tabs/SubjectsTab';
import QuizzesTab from './tabs/QuizzesTab';
import ResourcesTab from './tabs/ResourcesTab';
import CommunityTab from './tabs/CommunityTab';
import ProgressTab from './tabs/ProgressTab';
import SettingsTab from './tabs/SettingsTab';
import WelcomeTour from "@/components/WelcomeTour";
import NudgeList from "@/components/dashboard/NudgeList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour?: () => void;
  handleCompleteTour?: () => void;
  hideTabsNav: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
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
  suggestedNextAction,
  currentMood
}) => {
  return (
    <div>
      {showWelcomeTour && (
        <WelcomeTour 
          onSkip={handleSkipTour} 
          onComplete={handleCompleteTour} 
        />
      )}
      
      <Tabs defaultValue={activeTab} className="space-y-4">
        {!hideTabsNav && (
          <TabsList>
            {features.overview && (
              <TabsTrigger value="overview" onClick={() => onTabChange("overview")}>
                Overview
              </TabsTrigger>
            )}
            {features.subjects && (
              <TabsTrigger value="subjects" onClick={() => onTabChange("subjects")}>
                Subjects
              </TabsTrigger>
            )}
            {features.quizzes && (
              <TabsTrigger value="quizzes" onClick={() => onTabChange("quizzes")}>
                Quizzes
              </TabsTrigger>
            )}
            {features.resources && (
              <TabsTrigger value="resources" onClick={() => onTabChange("resources")}>
                Resources
              </TabsTrigger>
            )}
            {features.community && (
              <TabsTrigger value="community" onClick={() => onTabChange("community")}>
                Community
              </TabsTrigger>
            )}
            {features.progress && (
              <TabsTrigger value="progress" onClick={() => onTabChange("progress")}>
                Progress
              </TabsTrigger>
            )}
            {features.settings && (
              <TabsTrigger value="settings" onClick={() => onTabChange("settings")}>
                Settings
              </TabsTrigger>
            )}
          </TabsList>
        )}
        
        <TabsContent value="overview">
          <OverviewTab 
            userProfile={userProfile} 
            kpis={kpis} 
            lastActivity={lastActivity}
            suggestedNextAction={suggestedNextAction}
            currentMood={currentMood}
          />
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
      </Tabs>
      
      <NudgeList nudges={nudges} markNudgeAsRead={markNudgeAsRead} />
    </div>
  );
};

export default DashboardContent;
