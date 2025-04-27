
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import TodaysPlanView from "@/components/dashboard/student/todays-plan/TodaysPlanView";
import { AcademicAdvisorView } from "@/components/dashboard/student/academic-advisor/AcademicAdvisorView";
import UserWelcomeSection from "@/components/dashboard/student/UserWelcomeSection";
import ConceptsOverviewSection from "@/components/dashboard/student/concepts/ConceptsOverviewSection";
import FlashcardsOverviewSection from "@/components/dashboard/student/flashcards/FlashcardsOverviewSection";
import ExamsOverviewSection from "@/components/dashboard/student/exams/ExamsOverviewSection";

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
  return {
    // Overview tab shows dashboard overview
    "overview": (
      <>
        {showWelcomeTour && (
          <UserWelcomeSection
            userName={userProfile.name || "Student"}
            onSkip={handleSkipTour}
            onComplete={handleCompleteTour}
          />
        )}
        <RedesignedDashboardOverview userProfile={userProfile} kpis={kpis} />
      </>
    ),
    
    // Today's plan tab shows study plan for today
    "today": (
      <TodaysPlanView userProfile={userProfile} />
    ),
    
    // Academic advisor tab
    "academic": (
      <AcademicAdvisorView userProfile={userProfile} />
    ),
    
    // Concepts tab
    "concepts": (
      <ConceptsOverviewSection />
    ),
    
    // Flashcards tab
    "flashcards": (
      <FlashcardsOverviewSection />
    ),
    
    // Practice Exam tab
    "practice-exam": (
      <ExamsOverviewSection />
    ),

    // More tabs can be added here as needed
  };
};
