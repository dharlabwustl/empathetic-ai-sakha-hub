
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { useNavigate } from 'react-router-dom';

import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import WelcomeTourReminderBanner from './WelcomeTourReminderBanner';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import TabAIAssistant from './ai-assistant/TabAIAssistant';
import TabProgressMeter from './progress/TabProgressMeter';
import { useTabProgress } from '@/hooks/useTabProgress';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  const { getTabProgress } = useTabProgress();
  const progressData = getTabProgress('today');

  return (
    <div className="space-y-6">
      {/* Single Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Today's Plan for {userProfile.name}</h2>
          <TabProgressMeter 
            tabName="Today's Plan" 
            progressData={progressData}
            showDetailed={false}
          />
        </div>
        <p className="text-muted-foreground">Your personalized study schedule is ready!</p>
      </div>

      {/* Smart Suggestions for Task Completion */}
      <div className="mb-6">
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 75,
            quizScores: 85,
            conceptProgress: 65,
            streak: 5
          }}
        />
      </div>

      {/* AI Assistant - Minimized */}
      <div className="fixed bottom-4 right-4 z-50">
        <TabAIAssistant tabName="Today's Plan" isMinimized />
      </div>
    </div>
  );
};

interface TabContentGeneratorProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

export const generateTabContents = ({
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
}: TabContentGeneratorProps) => {
  const navigate = useNavigate();
  const { getTabProgress } = useTabProgress();

  // Enhanced tab content wrapper with progress and AI
  const createTabContent = (tabName: string, content: React.ReactNode) => {
    const progressData = getTabProgress(tabName.toLowerCase());
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {content}
          </div>
          <div className="space-y-4">
            <TabProgressMeter 
              tabName={tabName} 
              progressData={progressData}
            />
            <TabAIAssistant 
              tabName={tabName}
              context={`User is currently in the ${tabName} section`}
            />
          </div>
        </div>
      </div>
    );
  };

  return {
    "overview": createTabContent("Overview", (
      <>
        {showWelcomeTour && (
          <WelcomeTourReminderBanner 
            onSkipTour={handleSkipTour} 
            onStartTour={handleCompleteTour} 
          />
        )}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p>Welcome back, {userProfile.name}!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.filter(kpi => 
              !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
            ).map(kpi => (
              <div key={kpi.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-medium">{kpi.title}</h3>
                <p className="text-2xl">{kpi.value} {kpi.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )),
    
    "today": <RedesignedTodaysPlan userProfile={userProfile} />,
    
    "academic": createTabContent("Academic", <AcademicAdvisorView />),
    
    "concepts": createTabContent("Concepts", <ConceptsLandingPage />),
    
    "flashcards": createTabContent("Flashcards", <FlashcardsLandingPage />),
    
    "practice-exam": createTabContent("Practice Exams", <PracticeExamLandingPage />),
    
    "notifications": createTabContent("Notifications", <NotificationsPage />)
  };
};
