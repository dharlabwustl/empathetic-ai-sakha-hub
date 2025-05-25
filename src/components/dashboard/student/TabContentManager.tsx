
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
import EnhancedTodaysPlan from './today-plan/EnhancedTodaysPlan';

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
    
    "today": <EnhancedTodaysPlan />,
    
    "academic": createTabContent("Academic", <AcademicAdvisorView />),
    
    "concepts": createTabContent("Concepts", <ConceptsLandingPage />),
    
    "flashcards": createTabContent("Flashcards", <FlashcardsLandingPage />),
    
    "practice-exam": createTabContent("Practice Exams", <PracticeExamLandingPage />),
    
    "notifications": createTabContent("Notifications", <NotificationsPage />)
  };
};
