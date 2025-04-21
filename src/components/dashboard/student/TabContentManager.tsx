
import React from "react";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import OverviewTab from "@/components/dashboard/student/tab-contents/OverviewTab";
import SubjectsTab from "@/components/dashboard/student/tab-contents/SubjectsTab";
import QuizzesTab from "@/components/dashboard/student/tab-contents/QuizzesTab";
import ResourcesTab from "@/components/dashboard/student/tab-contents/ResourcesTab";
import CommunityTab from "@/components/dashboard/student/tab-contents/CommunityTab";
import ProgressTab from "@/components/dashboard/student/tab-contents/ProgressTab";
import SettingsTab from "@/components/dashboard/student/tab-contents/SettingsTab";

interface GenerateTabContentProps {
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
}: GenerateTabContentProps) => {
  return {
    overview: <OverviewTab userProfile={userProfile} />,
    subjects: <SubjectsTab userProfile={userProfile} />,
    quizzes: <QuizzesTab userProfile={userProfile} />,
    resources: <ResourcesTab userProfile={userProfile} />,
    community: <CommunityTab userProfile={userProfile} />,
    progress: <ProgressTab userProfile={userProfile} />,
    settings: <SettingsTab userProfile={userProfile} />
  };
};
