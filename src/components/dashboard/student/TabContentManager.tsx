
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
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  const { getTabProgress } = useTabProgress();
  const progressData = getTabProgress('today');

  return (
    <div className="space-y-6">
      {/* Progress meter at the top */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <TabProgressMeter 
          tabName="Today's Plan" 
          progressData={progressData}
          showDetailed={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-4">Today's Plan for {userProfile.name}</h2>
          <p className="text-muted-foreground mb-6">Your personalized study schedule is ready!</p>
          
          {/* Enhanced Task Breakdown will be rendered here */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-l-blue-500">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                📚 Core Concepts
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">3 pending</span>
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Newton's Laws of Motion</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Medium</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">15 min estimated</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-l-purple-500">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🧠 Flashcard Review
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">5 sets</span>
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Physics Formulas</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Due</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">10 min review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <TabAIAssistant tabName="Today's Plan" isMinimized />
          <TodaysPlanVoiceAssistant 
            planData={{
              userName: userProfile.name,
              totalTasks: 8,
              completedTasks: 3,
              concepts: [
                { id: '1', title: "Newton's Laws", status: 'pending', difficulty: 'medium' }
              ],
              flashcards: [
                { id: '1', title: "Physics Formulas", status: 'pending', difficulty: 'easy' }
              ],
              practiceExams: [
                { id: '1', title: "Mock Test 1", status: 'pending', difficulty: 'hard' }
              ],
              streak: 5,
              timeAllocation: { total: 120 },
              backlogTasks: []
            }}
            userName={userProfile.name}
            isEnabled={true}
          />
        </div>
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
