
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smile } from 'lucide-react'; 
import { MoodType } from '@/types/user';

interface HeroPanelProps {
  userName: string;
  primaryGoal: string;
  streak: number;
  onLogMood?: () => void;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
  lastActivity?: string;
  suggestedAction?: string;
  latestUpdate?: {
    title: string;
    description: string;
  };
}

const HeroPanel: React.FC<HeroPanelProps> = ({
  userName,
  primaryGoal,
  streak,
  onLogMood,
  onViewStudyPlan,
  currentMood,
  onMoodSelect,
  lastActivity,
  suggestedAction,
  latestUpdate
}) => {
  return (
    <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-r from-purple-100 to-blue-50 dark:from-purple-900/40 dark:to-blue-900/30">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Hi {userName}!</h1>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Target: {primaryGoal}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-200">
                  {streak} Day Streak
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onLogMood} variant="outline" className="bg-white gap-2 dark:bg-gray-800">
                <Smile size={18} />
                Log Mood Today
              </Button>
              <Button onClick={onViewStudyPlan} className="gap-2">
                View Study Plan
              </Button>
            </div>
            {lastActivity && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Last activity: {lastActivity}
              </p>
            )}
            {suggestedAction && (
              <p className="mt-2 text-sm font-medium text-purple-700 dark:text-purple-400">
                Suggested: {suggestedAction}
              </p>
            )}
          </div>
          
          {latestUpdate && (
            <div className="rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-800/50">
              <h3 className="mb-1 text-sm font-medium text-purple-700 dark:text-purple-400">
                Latest Update
              </h3>
              <h4 className="mb-1 font-semibold">{latestUpdate.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{latestUpdate.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroPanel;
