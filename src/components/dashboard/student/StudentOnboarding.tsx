
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileType } from '@/types/user';

interface StudentOnboardingProps {
  onComplete: () => void;
  userProfile: UserProfileType;
}

const StudentOnboarding: React.FC<StudentOnboardingProps> = ({
  onComplete,
  userProfile
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-50 to-blue-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Welcome to Sakha AI, {userProfile.name}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p>We're excited to have you here! Let's set up your personalized learning experience.</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Setup</h3>
            <p className="text-sm text-gray-500">
              We've prepared a personalized dashboard based on your profile. You can customize it further later.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={onComplete} size="lg" className="px-8">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentOnboarding;
