
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

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
  const getTipBasedOnProfile = () => {
    const tips = [
      "Spacing out your study sessions is more effective than cramming.",
      "Take short breaks every 25 minutes to maintain focus.",
      "Review your notes within 24 hours after learning to improve retention.",
      "Teaching concepts to others helps solidify your own understanding.",
      "Connect new information to what you already know to improve recall.",
      "Practice active recall by testing yourself instead of just reviewing notes."
    ];
    
    // Use user's mood to customize the tip
    if (userProfile.mood === 'stressed' || userProfile.currentMood === 'stressed') {
      return "Remember to take breaks and practice deep breathing when feeling overwhelmed.";
    }
    
    if (userProfile.mood === 'tired' || userProfile.currentMood === 'tired') {
      return "Consider a 20-minute power nap or light exercise to boost energy before studying.";
    }
    
    // Return a random tip if no specific condition is met
    return tips[Math.floor(Math.random() * tips.length)];
  };
  
  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
            <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Today's Tip</h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              {getTipBasedOnProfile()}
            </p>
            
            {suggestedNextAction && (
              <p className="mt-2 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Suggested next: {suggestedNextAction}
              </p>
            )}
            
            {lastActivity && (
              <div className="mt-2 text-xs text-indigo-500 dark:text-indigo-500">
                {lastActivity.description}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayTip;
