
import React from 'react';
import { UserProfileType } from "@/types/user";
import { FeatureData } from "@/components/dashboard/types/sidebar";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";

interface TabContentViewsProps {
  activeTab: string;
  userProfile: UserProfileType;
  features?: FeatureData[];
}

const TabContentViews: React.FC<TabContentViewsProps> = ({ activeTab, userProfile, features }) => {
  // Return content based on active tab
  switch (activeTab) {
    case "overview":
      return <DashboardOverview userProfile={userProfile} />;
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
