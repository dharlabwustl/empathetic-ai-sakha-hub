
import React from 'react';
import { UserProfileType, MoodType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";

interface OverviewTabProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  userProfile, 
  kpis, 
  lastActivity,
  suggestedNextAction,
  currentMood
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold leading-tight tracking-tight">Welcome Back{userProfile?.name ? `, ${userProfile.name}` : ''}!</h3>
            
            {currentMood && (
              <div className="mt-2 text-sm text-muted-foreground">
                Current mood: <span className="font-medium">{currentMood}</span>
              </div>
            )}
            
            {lastActivity && (
              <div className="mt-4">
                <h4 className="font-medium">Last Activity</h4>
                <p className="text-sm text-muted-foreground">{lastActivity.description}</p>
              </div>
            )}
            
            {suggestedNextAction && (
              <div className="mt-4">
                <h4 className="font-medium">Suggested Next Action</h4>
                <p className="text-sm text-primary">{suggestedNextAction}</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Quick Stats</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Study Streak</span>
                <span className="font-medium">3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weekly Progress</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quiz Accuracy</span>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
