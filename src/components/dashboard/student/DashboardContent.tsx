
import React from 'react';
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
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { ReactNode } from 'react';
import { MicroConceptView, FlashcardsView, PracticeExamsView } from '@/pages/dashboard/student/views';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
}

const DashboardContent = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour
}: DashboardContentProps) => {
  
  const tabContents: Record<string, React.ReactNode> = {
    overview: (
      <>
        {showWelcomeTour && (
          <WelcomeTour 
            onSkipTour={handleSkipTour} 
            onCompleteTour={handleCompleteTour}
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
    today: (
      <div className="space-y-8">
        <TodayStudyPlan />
        <MicroConceptView />
        <FlashcardsView />
        <PracticeExamsView />
      </div>
    ),
    tutor: <TutorCard />,
    planner: <StudyPlannerCard />,
    academic: <AcademicAdvisorCard />,
    motivation: <MotivationCard />,
    progress: <ProgressCard />,
    projects: <ProjectsCard />,
    "live-tutors": <LiveTutorSection />,
    forum: <CollaborativeForumSection />,
    videos: <VideoLibrarySection />,
    notifications: <SmartNotificationSection />,
    "feel-good": <FeelGoodCorner />
  };

  return (
    <div className="col-span-12">
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0 mt-0">
          {tabContents[activeTab] || <div>Coming soon...</div>}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;
