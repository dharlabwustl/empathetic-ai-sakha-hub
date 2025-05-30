
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileBase } from '@/types/user/base';
import { Sparkles, Target } from 'lucide-react';

interface WelcomeSectionProps {
  userProfile: UserProfileBase;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userProfile }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-6 w-6" />
          {getGreeting()}, {userProfile.name || userProfile.firstName}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Target className="h-4 w-4" />
          <span>Ready to achieve your NEET 2026 goals today?</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
