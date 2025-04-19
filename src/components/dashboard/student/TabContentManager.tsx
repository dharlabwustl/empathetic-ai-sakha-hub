
import React, { ReactNode } from 'react';
import TutorCard from '@/components/dashboard/student/TutorCard';
import StudyPlannerCard from '@/components/dashboard/student/StudyPlannerCard';
import AcademicAdvisorCard from '@/components/dashboard/student/AcademicAdvisorCard';
import MotivationCard from '@/components/dashboard/student/MotivationCard';
import ProgressCard from '@/components/dashboard/student/ProgressCard';
import ProjectsCard from '@/components/dashboard/student/ProjectsCard';
import { LiveTutorSection } from '@/components/dashboard/student/LiveTutorSection';
import { CollaborativeForumSection } from '@/components/dashboard/student/CollaborativeForumSection';
import { VideoLibrarySection } from '@/components/dashboard/student/VideoLibrarySection';
import { SmartNotificationSection } from '@/components/dashboard/student/SmartNotificationSection';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import DashboardOverview from '@/components/dashboard/student/DashboardOverview';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import AIChatTutor from '@/pages/dashboard/student/AIChatTutor';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import { UserProfileType } from '@/types/user';
import { MoodType } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { MicroConceptView, FlashcardsView, PracticeExamsView } from '@/pages/dashboard/student/TabContentViews';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import PracticeExamFeature from '@/components/dashboard/student/PracticeExamFeature';
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';

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
  currentMood?: MoodType;
}

// Helper function to adapt content difficulty based on mood
const getAdaptiveContent = (mood?: MoodType, contentType: string = 'default') => {
  if (!mood) return 'default';
  
  // Group moods by energy/focus levels
  const highEnergyMoods: MoodType[] = ['motivated', 'focused', 'happy'];
  const mediumEnergyMoods: MoodType[] = ['curious', 'okay', 'neutral'];
  const lowEnergyMoods: MoodType[] = ['tired', 'stressed', 'overwhelmed', 'sad'];
  
  if (highEnergyMoods.includes(mood)) {
    return 'challenging';
  } else if (mediumEnergyMoods.includes(mood)) {
    return 'normal';
  } else if (lowEnergyMoods.includes(mood)) {
    return 'supportive';
  }
  
  return 'default';
};

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
  suggestedNextAction,
  currentMood
}: TabContentManagerProps): Record<string, ReactNode> => {
  // Check if user is a first time user based on profile data
  // Using optional chaining to safely access potentially undefined properties
  const isFirstTimeUser = (userProfile?.loginCount ?? 0) < 3 || !(userProfile?.completedOnboarding ?? false);
  const loginCount = userProfile?.loginCount ?? 0;
  
  // Determine content adaptation level based on mood
  const adaptiveLevel = getAdaptiveContent(currentMood);
  
  // Check if we should show mood-based progress dashboard elements
  const showMoodProgress = currentMood && lastActivity;
  
  // Check if mood has been low multiple days
  const needsEncouragement = userProfile?.moodHistory?.filter(
    entry => ['sad', 'tired', 'stressed', 'overwhelmed'].includes(entry.mood)
  ).length >= 3;

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
          currentMood={currentMood}
          adaptiveLevel={adaptiveLevel}
          showMoodProgress={showMoodProgress}
          needsEncouragement={needsEncouragement}
        />
      </>
    ),
    today: (
      <div className="space-y-8">
        <TodayStudyPlan 
          adaptiveLevel={adaptiveLevel}
          currentMood={currentMood}
        />
        <MicroConceptView 
          difficulty={adaptiveLevel === 'challenging' ? 'advanced' : 
                      adaptiveLevel === 'supportive' ? 'beginner' : 'intermediate'}
          currentMood={currentMood}
        />
      </div>
    ),
    academic: <AcademicAdvisor 
                userProfile={userProfile} 
                currentMood={currentMood}
                adaptiveLevel={adaptiveLevel}
              />,
    concepts: <MicroConceptView 
                difficulty={adaptiveLevel === 'challenging' ? 'advanced' : 
                            adaptiveLevel === 'supportive' ? 'beginner' : 'intermediate'}
                currentMood={currentMood}
              />,
    flashcards: <FlashcardsFeature 
                  adaptiveLevel={adaptiveLevel}
                  sessionLength={adaptiveLevel === 'challenging' ? 20 : 
                                adaptiveLevel === 'supportive' ? 5 : 10}
                  currentMood={currentMood}
                />,
    'practice-exam': <PracticeExamFeature 
                      difficulty={adaptiveLevel === 'challenging' ? 'hard' : 
                                adaptiveLevel === 'supportive' ? 'easy' : 'medium'}
                      timeLimit={adaptiveLevel === 'challenging' ? 60 : 
                                adaptiveLevel === 'supportive' ? 30 : 45}
                      currentMood={currentMood}
                    />,
    'feel-good': <FeelGoodCorner currentMood={currentMood} />,
    notifications: <SmartNotificationSection currentMood={currentMood} />,
    tutor: <AIChatTutor 
            userProfile={userProfile}
            currentMood={currentMood}
          />
  };
};
