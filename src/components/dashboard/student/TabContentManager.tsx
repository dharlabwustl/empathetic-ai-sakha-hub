
import React from 'react';
import DashboardOverview from './DashboardOverview';
import { SharedPageLayout } from './SharedPageLayout';
import { Button } from '@/components/ui/button';
import { UserProfileBase } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { QuickAccess } from './QuickAccess';
import RedesignedDashboardOverview from './RedesignedDashboardOverview';

interface GenerateTabContentsProps {
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
  removeQuickAccess?: boolean;
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
  suggestedNextAction,
  removeQuickAccess = false
}: GenerateTabContentsProps): Record<string, React.ReactNode> => {
  const tabContents: Record<string, React.ReactNode> = {
    overview: (
      <>
        {/* Don't show quick access buttons if removeQuickAccess is true */}
        {!removeQuickAccess && <QuickAccess />}
        
        <RedesignedDashboardOverview 
          userProfile={userProfile} 
          kpis={kpis} 
        />
      </>
    ),
    practice: (
      <SharedPageLayout
        title="Practice & Review"
        subtitle="Refine your knowledge through targeted practice"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="min-h-[300px] bg-white dark:bg-slate-800 rounded-md shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Recent Practice</h3>
            <p className="text-muted-foreground text-sm">
              No recent practice sessions found.
            </p>
            <Button className="mt-4" variant="outline">
              Start New Practice
            </Button>
          </div>
          <div className="min-h-[300px] bg-white dark:bg-slate-800 rounded-md shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Available Topics</h3>
            <p className="text-muted-foreground text-sm">
              Select a topic to practice.
            </p>
            <div className="mt-4 space-y-2">
              {/* Sample topics - replace with dynamic content */}
              <Button variant="outline" className="w-full justify-start">
                {userProfile?.goals?.[0]?.title || 'IIT JEE'} Practice Set
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Mock Test #1
              </Button>
            </div>
          </div>
        </div>
      </SharedPageLayout>
    ),
    analytics: (
      <SharedPageLayout
        title="Analytics & Insights"
        subtitle="Visualize your progress and identify growth areas"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.id}
              className="bg-white dark:bg-slate-800 rounded-md shadow-sm p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{kpi.value}</h3>
                    {kpi.unit && (
                      <span className="text-muted-foreground ml-1 text-sm">
                        {kpi.unit}
                      </span>
                    )}
                  </div>
                  {kpi.change && (
                    <p
                      className={
                        kpi.changeType === "positive"
                          ? "text-green-600 dark:text-green-400 text-xs"
                          : "text-red-600 dark:text-red-400 text-xs"
                      }
                    >
                      {kpi.changeType === "positive" ? "+" : ""}
                      {kpi.change}% from last week
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-md shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">Learning Insights</h3>
          <p className="text-muted-foreground text-sm">
            Your detailed analytics will appear here as you use the platform.
          </p>
        </div>
      </SharedPageLayout>
    ),
    settings: (
      <SharedPageLayout
        title="Settings"
        subtitle="Customize your learning experience"
      >
        <div className="bg-white dark:bg-slate-800 rounded-md shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <p className="text-muted-foreground text-sm">
            Settings options are coming soon.
          </p>
        </div>
      </SharedPageLayout>
    ),
  };

  return tabContents;
};
