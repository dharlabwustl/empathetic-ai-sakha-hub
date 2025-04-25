
import React, { ReactNode } from 'react';
import DashboardOverview from '@/components/dashboard/student/DashboardOverview';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import AIChatTutor from '@/pages/dashboard/student/AIChatTutor';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TodayPlanView, FlashcardsView, PracticeExamsView } from '@/pages/dashboard/student/TabContentViews';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';

interface TabContentManagerProps {
  userProfile: UserProfileType;
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
}: TabContentManagerProps): Record<string, ReactNode> => {
  const isFirstTimeUser = (userProfile?.loginCount ?? 0) < 3 || !(userProfile?.completedOnboarding ?? false);
  const loginCount = userProfile?.loginCount ?? 0;

  console.log('generateTabContents - Active User Profile:', {
    loginCount,
    isFirstTimeUser,
    completedOnboarding: userProfile?.completedOnboarding
  });

  return {
    overview: (
      <>
        {showWelcomeTour && (
          <WelcomeTour 
            onSkipTour={handleSkipTour} 
            onCompleteTour={handleCompleteTour}
            isFirstTimeUser={isFirstTimeUser}
            lastActivity={lastActivity}
            suggestedNextAction={suggestedNextAction}
            loginCount={loginCount}
          />
        )}
        <DashboardOverview
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
        />
      </>
    ),
    today: <TodayPlanView />,
    academic: <AcademicAdvisor userProfile={userProfile} />,
    concepts: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Concept Cards</h2>
            <p className="text-gray-600">
              Browse through your learning concepts and master the fundamentals.
            </p>
          </div>
          <Link to="/dashboard/student/concepts/all">
            <Button variant="outline" className="flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <ConceptCardView 
          title="Today's Concepts" 
          limit={6}
          showViewAll={true}
        />
      </div>
    ),
    flashcards: <FlashcardsView />,
    'practice-exam': <PracticeExamsView />,
    'feel-good': <FeelGoodCorner />,
    notifications: (
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="text-gray-600 mb-4">Your latest updates and notifications.</p>
        <div className="p-8 text-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">You have no new notifications.</p>
        </div>
      </div>
    ),
    tutor: <AIChatTutor userProfile={userProfile} />
  };
};
