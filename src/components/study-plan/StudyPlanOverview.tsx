
import React from 'react';
import { Target, Brain, Calendar, Clock, BadgeCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { UserProfileType } from '@/types/user';

interface StudyPlanOverviewProps {
  userProfile: UserProfileType;
  formattedCompletionDate: string;
  extendedStreak: {
    current: number;
    longest: number;
    lastUpdated: Date;
  };
  personalityType: string;
  focusDuration: string;
  studyPreference: string;
}

const StudyPlanOverview = ({ 
  userProfile, 
  formattedCompletionDate, 
  extendedStreak,
  personalityType,
  focusDuration,
  studyPreference
}: StudyPlanOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-sky-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-violet-500" size={24} />
            <h3 className="text-xl font-semibold">Goal</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold">{userProfile.goals?.[0]?.title || "IIT-JEE"}</h4>
            <p className="text-sm text-muted-foreground mt-1">Targeted for May 2025 Examination</p>
            <Progress value={userProfile.goals?.[0]?.progress || 65} className="mt-3 h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{userProfile.goals?.[0]?.progress || 65}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-sky-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="text-sky-500" size={24} />
            <h3 className="text-xl font-semibold">Learning Style</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Personality Type</h4>
                <p className="font-medium">{personalityType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Focus Duration</h4>
                <p className="font-medium">{focusDuration}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Study Preference</h4>
                <p className="font-medium">{studyPreference}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-violet-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
          <Calendar className="text-violet-500 mb-2" size={28} />
          <h3 className="text-lg font-semibold">Estimated Completion</h3>
          <p className="text-2xl font-bold mt-1">{formattedCompletionDate}</p>
          <p className="text-sm text-muted-foreground mt-1">On-track with your schedule</p>
        </div>
        
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-sky-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
          <Clock className="text-sky-500 mb-2" size={28} />
          <h3 className="text-lg font-semibold">Weekly Study Time</h3>
          <p className="text-2xl font-bold mt-1">28 hours</p>
          <p className="text-sm text-muted-foreground mt-1">4 hours daily on average</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border border-emerald-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
          <BadgeCheck className="text-emerald-500 mb-2" size={28} />
          <h3 className="text-lg font-semibold">Study Streak</h3>
          <p className="text-2xl font-bold mt-1">{extendedStreak.current} days</p>
          <p className="text-sm text-muted-foreground mt-1">Longest: {extendedStreak.longest} days</p>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanOverview;
