
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface WelcomeTourReminderBannerProps {
  onSkipTour: () => void;
  onStartTour: () => void;
}

const WelcomeTourReminderBanner: React.FC<WelcomeTourReminderBannerProps> = ({
  onSkipTour,
  onStartTour,
}) => {
  return (
    <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/70">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">New to PREPZR?</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Take a quick tour to learn about all the features
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="ghost" size="sm" onClick={onSkipTour}>
            Skip
          </Button>
          <Button variant="default" size="sm" onClick={onStartTour}>
            Start Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeTourReminderBanner;
