
import React from "react";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardOverview from "./DashboardOverview";
import { BookOpen, Brain, MessageSquare, Users, BookMarked, ChartLine, Settings } from "lucide-react";

interface TabContentGeneratorProps {
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

export function generateTabContents({
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
}: TabContentGeneratorProps): Record<string, React.ReactNode> {
  const dashboardFeatures = [
    {
      title: "24/7 AI Tutor",
      description: "Get instant help on any topic from your AI learning assistant.",
      icon: <MessageSquare className="h-4 w-4" />,
      path: "/dashboard/student/tutor",
      isPremium: false,
    },
    {
      title: "Subject Explorer",
      description: "Dive deep into your subjects with interactive learning materials.",
      icon: <BookOpen className="h-4 w-4" />,
      path: "/dashboard/student/subjects",
      isPremium: false,
    },
    {
      title: "Community",
      description: "Connect with peers, ask questions, and share knowledge.",
      icon: <Users className="h-4 w-4" />,
      path: "/dashboard/student/community",
      isPremium: false,
    },
    {
      title: "Academic Advisor",
      description: "Get personalized guidance on your academic journey.",
      icon: <Brain className="h-4 w-4" />,
      path: "/dashboard/student/advisor",
      isPremium: true,
    },
  ];

  // Create and return the tab content map
  return {
    overview: (
      <DashboardOverview
        userProfile={userProfile}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={dashboardFeatures}
        currentMood={currentMood}
      />
    ),
    subjects: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Subjects</h2>
        <p className="text-gray-600">View and explore your subjects here.</p>
      </div>
    ),
    quizzes: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Quizzes & Tests</h2>
        <p className="text-gray-600">Take quizzes and tests to assess your understanding.</p>
      </div>
    ),
    resources: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Learning Resources</h2>
        <p className="text-gray-600">Access learning materials curated for your goals.</p>
      </div>
    ),
    community: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Student Community</h2>
        <p className="text-gray-600">Connect with peers and collaborate on projects.</p>
      </div>
    ),
    progress: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Study Progress</h2>
        <p className="text-gray-600">Track your learning journey and achievements.</p>
      </div>
    ),
    settings: (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
        <p className="text-gray-600">Manage your profile and preferences.</p>
      </div>
    ),
  };
}
