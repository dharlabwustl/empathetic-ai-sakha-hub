
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import TodaysPlanView from "@/components/dashboard/student/todays-plan/TodaysPlanView";
import AcademicAdvisorSection from "@/components/dashboard/student/academic-advisor/AcademicAdvisorSection";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card } from "@/components/ui/card";

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
          <div className="mb-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome to Sakha Learning</h2>
              <p className="mb-4">Hi {userProfile.name || "Student"}, we're excited to help you achieve your learning goals!</p>
              <div className="flex gap-4">
                <button onClick={handleSkipTour} className="text-sm text-muted-foreground hover:text-primary">
                  Skip tour
                </button>
                <button onClick={handleCompleteTour} className="text-sm text-primary font-medium hover:underline">
                  Start your journey
                </button>
              </div>
            </Card>
          </div>
        )}
        <RedesignedDashboardOverview userProfile={userProfile} kpis={kpis} />
      </>
    ),
    
    // Today's plan tab shows study plan for today
    "today": (
      <TodaysPlanView />
    ),
    
    // Academic advisor tab
    "academic": (
      <AcademicAdvisorSection />
    ),
    
    // Concepts tab
    "concepts": (
      <SharedPageLayout
        title="Concept Cards"
        subtitle="Master key concepts through interactive learning"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Concept Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6">
              <p>Your concept cards will appear here.</p>
            </Card>
          </div>
        </div>
      </SharedPageLayout>
    ),
    
    // Flashcards tab
    "flashcards": (
      <SharedPageLayout
        title="Flashcards"
        subtitle="Review and reinforce your knowledge"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Flashcards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <p>Your flashcards will appear here.</p>
            </Card>
          </div>
        </div>
      </SharedPageLayout>
    ),
    
    // Practice Exam tab
    "practice-exam": (
      <SharedPageLayout
        title="Practice Exams"
        subtitle="Test your knowledge and track progress"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice Exams</h2>
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-6">
              <p>Your practice exams will appear here.</p>
            </Card>
          </div>
        </div>
      </SharedPageLayout>
    ),

    // More tabs can be added here as needed
  };
};
