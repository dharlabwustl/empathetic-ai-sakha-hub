
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

interface WelcomeTourReminderBannerProps {
  onSkipTour: () => void;
  onStartTour: () => void;
}

const WelcomeTourReminderBanner: React.FC<WelcomeTourReminderBannerProps> = ({
  onSkipTour,
  onStartTour
}) => {
  return (
    <Card className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-200">Welcome to PREPZR Dashboard!</h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              Take a quick tour to get familiar with all the features.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSkipTour}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-300"
          >
            <X className="h-4 w-4 mr-1" />
            Skip
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onStartTour}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeTourReminderBanner;
