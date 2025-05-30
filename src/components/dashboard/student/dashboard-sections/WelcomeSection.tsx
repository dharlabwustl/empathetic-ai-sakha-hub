
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileBase } from '@/types/user/base';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

interface WelcomeSectionProps {
  userProfile: UserProfileBase;
  className?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userProfile, className }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: <Sunrise className="h-5 w-5" /> };
    if (hour < 17) return { text: "Good Afternoon", icon: <Sun className="h-5 w-5" /> };
    if (hour < 21) return { text: "Good Evening", icon: <Sunset className="h-5 w-5" /> };
    return { text: "Good Night", icon: <Moon className="h-5 w-5" /> };
  };

  const greeting = getGreeting();
  const userName = userProfile.name || userProfile.firstName || 'Student';

  return (
    <Card className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {greeting.icon}
              <h2 className="text-xl font-bold">{greeting.text}, {userName}!</h2>
            </div>
            <p className="text-blue-100 mb-4">
              Ready to achieve your goals today? Let's make progress together.
            </p>
            <Button variant="secondary" size="sm">
              Start Learning
            </Button>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Study Streak</p>
            <p className="text-2xl font-bold">7 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
