
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeTourProps {
  onSkip?: () => void;
  onComplete?: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ onSkip, onComplete }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard!</h2>
              <p className="text-muted-foreground">Let's take a quick tour to help you get started.</p>
            </div>
            
            <div className="space-y-4 my-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Overview Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Get a quick glance at your progress and important updates</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Subject Management</h3>
                  <p className="text-sm text-muted-foreground">Track your subjects and view detailed progress</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Practice Quizzes</h3>
                  <p className="text-sm text-muted-foreground">Test your knowledge with adaptive quizzes</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {onSkip && (
                <Button variant="outline" onClick={onSkip} className="flex-1">
                  Skip Tour
                </Button>
              )}
              {onComplete && (
                <Button onClick={onComplete} className="flex-1">
                  Let's Start
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeTour;
