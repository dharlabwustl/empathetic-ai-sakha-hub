
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InfoCircle } from "lucide-react";

interface WelcomeTourReminderBannerProps {
  onSkipTour: () => void;
  onStartTour: () => void;
}

const WelcomeTourReminderBanner: React.FC<WelcomeTourReminderBannerProps> = ({
  onSkipTour,
  onStartTour,
}) => {
  return (
    <Card className="mb-4 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800">
            <InfoCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-blue-800 dark:text-blue-300">
              Welcome to PREPZR!
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              Would you like to take a quick tour of the dashboard to get familiar with all the features?
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onSkipTour}>
                Skip for now
              </Button>
              <Button size="sm" onClick={onStartTour}>
                Start Tour
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeTourReminderBanner;
