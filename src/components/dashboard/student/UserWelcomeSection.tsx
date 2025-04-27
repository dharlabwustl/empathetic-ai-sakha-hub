
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserWelcomeSectionProps {
  userName: string;
  onSkip: () => void;
  onComplete: () => void;
}

const UserWelcomeSection: React.FC<UserWelcomeSectionProps> = ({
  userName,
  onSkip,
  onComplete
}) => {
  return (
    <Card className="mb-6 border-2 border-primary/20 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Welcome back, {userName}! 👋</CardTitle>
        <CardDescription className="text-base">Ready to continue your learning journey?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base">
          We've prepared your personalized study plan for today. Let's make progress toward your goals!
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onSkip}>Skip Tour</Button>
        <Button onClick={onComplete}>Get Started</Button>
      </CardFooter>
    </Card>
  );
};

export default UserWelcomeSection;
