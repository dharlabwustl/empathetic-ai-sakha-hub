
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lightbulb, CalendarRange, BookOpen, Brain } from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string, description: string } | null;
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
  
  const steps = [
    {
      title: "Welcome to Sakha AI",
      description: "Your personalized learning assistant that adapts to your needs and goals."
    },
    {
      title: "Your Dashboard",
      description: "This is your personalized dashboard that shows your progress and study plans."
    },
    {
      title: "AI Tutor",
      description: "Get 24/7 help from your AI tutor. Ask questions about any topic or concept you're struggling with."
    },
    {
      title: "Mood Tracking",
      description: "Log your mood to get personalized recommendations based on how you're feeling."
    },
    {
      title: "Your Exam Preparation",
      description: "Let's take an overview of your study plan based on your exam preparation."
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {currentStep === 0 && (
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/20 dark:to-blue-900/20 p-6 rounded-full">
                <Lightbulb className="h-12 w-12 text-violet-500" />
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="grid gap-3">
              <p className="text-sm">Your dashboard provides:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Overview of your progress</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Daily study plan based on your goals</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Quick access to subjects and concepts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Personalized learning recommendations</span>
                </li>
              </ul>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="grid gap-4">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-full">
                  <CalendarRange className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              
              <p className="text-sm">
                We've prepared a personalized study plan to help you excel in your exam preparation.
                Your study plan includes:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Daily study goals and targets</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Important concepts and topics to cover</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Practice tests and quizzes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Revision schedule as you approach your exam</span>
                </li>
              </ul>
              
              <div className="mt-2 flex gap-3 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={() => {
                    onCompleteTour();
                    // Navigate to first concept - this will happen in onCompleteTour handler
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={() => {
                    onCompleteTour();
                    // Navigate to AI tutor - this will happen in onCompleteTour handler
                  }}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center py-2">
          <Tabs defaultValue={`step-${currentStep}`} className="w-full">
            <TabsList className="grid grid-cols-5 h-1 p-0 bg-gray-200">
              {steps.map((_, index) => (
                <TabsTrigger
                  key={`step-${index}`}
                  value={`step-${index}`}
                  className={`h-1 p-0 data-[state=active]:bg-primary data-[state=active]:shadow-none data-[state=active]:h-1 rounded-none`}
                  disabled
                />
              ))}
            </TabsList>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex gap-2 order-2 sm:order-1">
            <Button variant="outline" onClick={onSkipTour}>
              Skip Tour
            </Button>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext} 
            className="order-1 sm:order-2"
          >
            {currentStep === steps.length - 1 ? (
              "View Study Plan"
            ) : (
              "Next"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
