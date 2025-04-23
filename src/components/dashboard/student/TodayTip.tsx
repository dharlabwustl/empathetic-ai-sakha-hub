
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfileType } from '@/types/user/base';
import { Lightbulb } from 'lucide-react';

interface TodayTipProps {
  userProfile: UserProfileType;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const TodayTip: React.FC<TodayTipProps> = ({
  userProfile,
  lastActivity,
  suggestedNextAction
}) => {
  const name = userProfile?.name?.split(' ')[0] || 'Student';
  
  const tips = [
    "Try to complete at least 3 concepts today to stay on track with your study plan.",
    "Don't forget to take breaks between study sessions for better retention.",
    "Practice tests help reinforce your learning and identify knowledge gaps.",
    "Create short summaries of what you've learned today to improve retention.",
    "Your brain processes information while you sleep - study before bedtime!"
  ];
  
  // Get a deterministic but seemingly random tip based on the day
  const date = new Date();
  // Calculate day of year properly using numeric values
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const tipIndex = dayOfYear % tips.length;
  const todaysTip = tips[tipIndex];

  return (
    <Card className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900">
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg">
              {lastActivity 
                ? `Welcome back, ${name}!`
                : `Hello, ${name}!`}
            </h3>
            
            {lastActivity && (
              <p className="text-sm text-muted-foreground">
                {lastActivity.description}
              </p>
            )}
            
            {suggestedNextAction && (
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Suggested next step: {suggestedNextAction}
              </p>
            )}
            
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-muted-foreground flex items-center">
                <span className="font-medium text-primary mr-1">Today's Tip:</span> {todaysTip}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayTip;
