
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import {
  Book,
  Zap,
} from 'lucide-react';
import { StudyMetricsGrid } from './StudyMetricsGrid';
import { SubjectBreakdown } from './SubjectBreakdown';
import { StudyPlanOverview } from './StudyPlanOverview';
import { DailyFocus } from './DailyFocus';
import { ProgressTracker } from './ProgressTracker';
import { RevisionInsights } from './RevisionInsights';

interface LearningCommandCenterProps {
  userProfile: UserProfileType;
}

const LearningCommandCenter: React.FC<LearningCommandCenterProps> = ({ userProfile }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Learning Command Center
        </h2>
      </div>

      {/* Main Study Plan Overview */}
      <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Book className="h-5 w-5 text-violet-500" />
              Your Study Plan at a Glance
            </h3>
            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="font-medium">Exam Goal:</span> 
                <span className="text-violet-600 dark:text-violet-400">
                  {userProfile.examPreparation || 'Not Set'}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Book className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">Subjects Enrolled:</span> 
                <span className="text-violet-600 dark:text-violet-400">
                  {userProfile.subjects?.length || 0} subjects
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Study Metrics */}
      <StudyMetricsGrid userProfile={userProfile} />

      {/* Subject Breakdown */}
      <SubjectBreakdown userProfile={userProfile} />

      {/* Study Plan Overview */}
      <StudyPlanOverview userProfile={userProfile} />

      {/* Daily Focus */}
      <DailyFocus userProfile={userProfile} />

      {/* Progress Tracker */}
      <ProgressTracker userProfile={userProfile} />

      {/* Revision Insights */}
      <RevisionInsights userProfile={userProfile} />
    </div>
  );
};

export default LearningCommandCenter;
