
import React from 'react';
import { UserProfileType } from "@/types/user";
import { FeatureData } from "@/components/dashboard/types/sidebar";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface TabContentViewsProps {
  activeTab: string;
  userProfile: UserProfileType;
  features?: (FeatureData | {
    icon: React.ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  })[];
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

// Format features to ensure compatibility
const formatFeatures = (features: (FeatureData | {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  isPremium: boolean;
})[] | undefined) => {
  if (!features) return [];
  
  return features.map(feature => {
    // If it's already in the right format with path and isPremium
    if ('path' in feature && 'isPremium' in feature) {
      return feature;
    }
    
    // If it's a FeatureData object without path and isPremium
    return {
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      path: ('url' in feature) ? feature.url : '',
      isPremium: false
    };
  });
};

const TabContentViews: React.FC<TabContentViewsProps> = ({ 
  activeTab, 
  userProfile, 
  features = [],
  kpis = [],
  nudges = [],
  markNudgeAsRead = () => {} 
}) => {
  // Format features for compatibility
  const formattedFeatures = formatFeatures(features);
  
  // Return content based on active tab
  switch (activeTab) {
    case "overview":
      return <DashboardOverview 
        userProfile={userProfile} 
        kpis={kpis} 
        nudges={nudges} 
        markNudgeAsRead={markNudgeAsRead}
        features={formattedFeatures} 
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
