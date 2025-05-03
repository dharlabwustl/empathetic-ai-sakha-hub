
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Lightbulb, Calendar, GraduationCap, Brain, BookOpen } from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Your Dashboard</DialogTitle>
          <DialogDescription className="text-base">
            {isFirstTimeUser
              ? "Let's help you get started with your learning journey!"
              : "Welcome back! Here's a quick refresher on using your dashboard."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 my-4">
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Today's Plan</h4>
              <p className="text-sm text-muted-foreground">
                Your daily tasks are organized here based on your study plan. Complete them to stay on track.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Academic Advisor</h4>
              <p className="text-sm text-muted-foreground">
                View and manage your study plans. Track your progress across different subjects.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Learning Resources</h4>
              <p className="text-sm text-muted-foreground">
                Access flashcards, concept cards, and practice exams tailored to your study plan.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">AI Tutor</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized help with difficult concepts and detailed explanations.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-full bg-primary/10">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Smart Features</h4>
              <p className="text-sm text-muted-foreground">
                Log your mood, track your progress, and get personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {suggestedNextAction && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Where to Start?
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              We recommend starting with <strong>Today's Plan</strong> to see your scheduled activities, 
              or visiting <strong>Academic Advisor</strong> to view and customize your study plan.
            </p>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" onClick={onSkipTour}>
            Skip Tour
          </Button>
          <Button onClick={onCompleteTour} className="flex items-center gap-2">
            Let's Begin <ChevronRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
