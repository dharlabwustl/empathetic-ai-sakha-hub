
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  Crown, 
  GraduationCap, 
  MessageSquare,
  Star
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount,
  open,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      title: "Welcome to Sakha AI",
      description: isFirstTimeUser
        ? "Your personalized AI learning companion is here to help you succeed."
        : `Welcome back! You've logged in ${loginCount} times. Let's continue your learning journey.`,
      icon: <GraduationCap className="h-12 w-12 text-indigo-500" />,
      content: (
        <div className="grid gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Your AI Study Companion
            </h3>
            <p className="text-sm text-muted-foreground">
              Sakha AI adapts to your learning style and helps you prepare for exams effectively.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              Premium Features
            </h3>
            <p className="text-sm text-muted-foreground">
              Unlock advanced personalization, mock tests, and study plans with premium plans.
            </p>
          </div>

          {lastActivity && !isFirstTimeUser && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                Pick Up Where You Left Off
              </h3>
              <p className="text-sm text-muted-foreground">
                {lastActivity.description}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Key Features",
      description: "Everything you need to excel in your exams",
      icon: <Star className="h-12 w-12 text-amber-500" />,
      content: (
        <div className="space-y-4">
          <Tabs defaultValue="learn">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="connect">Connect</TabsTrigger>
            </TabsList>
            <TabsContent value="learn" className="space-y-4 pt-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium">Interactive Lessons</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn concepts with visual aids and interactive examples
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium">Personalized Path</h4>
                  <p className="text-sm text-muted-foreground">
                    AI adapts to your learning style and pace
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-4 pt-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium">Mock Tests</h4>
                  <p className="text-sm text-muted-foreground">
                    Practice with exam-like conditions and detailed analysis
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium">Daily Challenges</h4>
                  <p className="text-sm text-muted-foreground">
                    Improve with daily problems and review material
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="connect" className="space-y-4 pt-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">24/7 AI Tutor</h4>
                  <p className="text-sm text-muted-foreground">
                    Get help anytime with your AI learning assistant
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium">Study Groups</h4>
                  <p className="text-sm text-muted-foreground">
                    Join groups with peers preparing for the same exams
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
    {
      title: "Your Study Plan",
      description: "We've created a personalized study plan based on your goals",
      icon: <Calendar className="h-12 w-12 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Your Study Plan is Ready!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We've created a personalized study plan based on your target exam and learning style.
            </p>
            <div className="space-y-2">
              <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded">
                <h4 className="text-sm font-medium">Physics: Mechanics (Priority High)</h4>
                <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded">
                <h4 className="text-sm font-medium">Chemistry: Periodic Table (Priority Medium)</h4>
                <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded">
                <h4 className="text-sm font-medium">Mathematics: Calculus (Priority High)</h4>
                <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ready to Begin?",
      description: "Let's start your personalized learning journey",
      icon: <Brain className="h-12 w-12 text-violet-500" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Take an overview of your study plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your personalized study plan is based on your target exam: <strong>IIT-JEE</strong>
            </p>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
              <Calendar className="mr-2 h-4 w-4" />
              View Today's Study Plan
            </Button>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Need help anytime?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your AI tutor is available 24/7 to help with any questions.
            </p>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with AI Tutor
            </Button>
          </div>

          {suggestedNextAction && (
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Suggested Next Step</h3>
              <p className="text-sm text-muted-foreground">
                {suggestedNextAction}
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30">
            {currentStepData.icon}
          </div>
          <DialogTitle className="text-center pt-4">{currentStepData.title}</DialogTitle>
          <DialogDescription className="text-center">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-1">{currentStepData.content}</div>
        
        <div className="mt-4 h-1 w-full bg-gray-100 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="ghost"
              onClick={onSkipTour}
              className="text-muted-foreground"
            >
              Skip Tour
            </Button>
            <div className="space-x-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button
                type="button"
                onClick={handleNext}
              >
                {currentStep < totalSteps - 1 ? "Next" : "Get Started"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
