
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

interface TodayTipProps {
  userProfile?: UserProfileType;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const TodayTip: React.FC<TodayTipProps> = ({
  userProfile,
  lastActivity,
  suggestedNextAction
}) => {
  // Generate a tip based on the time of day or random motivation
  const getRandomTip = () => {
    const tips = [
      "Taking short breaks between study sessions can improve retention.",
      "Try the Pomodoro technique: 25 minutes of focused study, then a 5-minute break.",
      "Reviewing material before sleep can help your brain process information better.",
      "Stay hydrated! Drinking water improves cognitive performance.",
      "Teaching concepts to others is one of the best ways to solidify your understanding.",
      "Changing your study environment occasionally can boost memory and focus.",
      "Exercise before studying can increase alertness and concentration.",
      "Group similar topics together when studying to understand connections better.",
      "Create mind maps to visualize relationships between concepts.",
      "Test yourself regularly to identify knowledge gaps."
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const generateWelcomeMessage = () => {
    const currentHour = new Date().getHours();
    const name = userProfile?.name?.split(' ')[0] || 'there';
    
    if (currentHour < 12) return `Good morning, ${name}!`;
    if (currentHour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            {generateWelcomeMessage()}
          </CardTitle>
        </div>
        <CardDescription>
          {lastActivity ? (
            <span>{lastActivity.description}</span>
          ) : (
            "Here's a tip to help with your studies today"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {suggestedNextAction || getRandomTip()}
        </p>
      </CardContent>
    </Card>
  );
};

export default TodayTip;
