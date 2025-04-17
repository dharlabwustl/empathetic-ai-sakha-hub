
import React from 'react';
import { UserProfileType } from "@/types/user";
import { FeatureData } from "@/components/dashboard/types/sidebar";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface TabContentViewsProps {
  activeTab: string;
  userProfile: UserProfileType;
  features?: FeatureData[];
  kpis?: KpiData[];
  nudges?: NudgeData[];
  markNudgeAsRead?: (id: string) => void;
}

// Component for MicroConcept view
export const MicroConceptView: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Micro Concepts</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Break down complex topics into bite-sized concepts for easier understanding.
      </p>
    </div>
  );
};

// Component for Flashcards view
export const FlashcardsView: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Flashcards</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Review key concepts with interactive flashcards.
      </p>
    </div>
  );
};

// Component for Practice Exams view
export const PracticeExamsView: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Practice Exams</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Test your knowledge with practice exams designed to simulate the real thing.
      </p>
    </div>
  );
};

const TabContentViews: React.FC<TabContentViewsProps> = ({ 
  activeTab, 
  userProfile, 
  features,
  kpis = [],
  nudges = [],
  markNudgeAsRead = () => {} 
}) => {
  // Return content based on active tab
  switch (activeTab) {
    case "overview":
      return <DashboardOverview 
        userProfile={userProfile} 
        kpis={kpis} 
        nudges={nudges} 
        markNudgeAsRead={markNudgeAsRead}
        features={features || []} 
      />;
    case "concepts":
      return <MicroConceptView />;
    case "flashcards":
      return <FlashcardsView />;
    case "practice-exam":
      return <PracticeExamsView />;
    // Add other tab cases here
    default:
      return (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This tab is not yet available. Check back later.
          </p>
        </div>
      );
  }
};

export default TabContentViews;
