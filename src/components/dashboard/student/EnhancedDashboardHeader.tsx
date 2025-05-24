
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, MoodType } from '@/types/user/base';

const moodColors: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'bg-yellow-100 text-yellow-800',
  [MoodType.MOTIVATED]: 'bg-green-100 text-green-800',
  [MoodType.FOCUSED]: 'bg-blue-100 text-blue-800',
  [MoodType.CALM]: 'bg-teal-100 text-teal-800',
  [MoodType.TIRED]: 'bg-gray-100 text-gray-800',
  [MoodType.CONFUSED]: 'bg-amber-100 text-amber-800',
  [MoodType.ANXIOUS]: 'bg-red-100 text-red-800',
  [MoodType.STRESSED]: 'bg-orange-100 text-orange-800',
  [MoodType.OVERWHELMED]: 'bg-red-200 text-red-900',
  [MoodType.NEUTRAL]: 'bg-slate-100 text-slate-800',
  [MoodType.OKAY]: 'bg-cyan-100 text-cyan-800',
  [MoodType.SAD]: 'bg-indigo-100 text-indigo-800',
  [MoodType.CURIOUS]: 'bg-emerald-100 text-emerald-800',
  [MoodType.CONFIDENT]: 'bg-purple-100 text-purple-800',
  [MoodType.EXCITED]: 'bg-pink-100 text-pink-800'
};

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({ userProfile }) => {
  const currentMood = userProfile.currentMood || userProfile.mood || MoodType.NEUTRAL;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {userProfile.firstName || userProfile.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={moodColors[currentMood]}>
            Current mood: {currentMood.charAt(0).toUpperCase() + currentMood.slice(1).toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
