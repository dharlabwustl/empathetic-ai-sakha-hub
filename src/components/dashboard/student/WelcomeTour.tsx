
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Brain, CalendarDays, FileText, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = false,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  open = false,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const steps = [
    {
      title: "Welcome to Your Learning Dashboard",
      content: (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-500" />
              Your Command Center
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This is your personalized space for exam preparation. Track progress, 
              access study materials, and get tailored recommendations.
            </p>
            
            {/* Interactive element - Simple question */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium mb-2">Quick Check: What would you like to focus on first?</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setHasInteracted(true)}
                >
                  Study Planning
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setHasInteracted(true)}
                >
                  Practice Tests
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Learning Tools",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-indigo-500" />
                Concept Cards
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Master key concepts with detailed explanations and visual aids.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <FileText className="mr-2 h-4 w-4 text-emerald-500" />
                Practice Exams
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Test your knowledge with exam-like questions and analytics.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-purple-500" />
                Smart Study Plans
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Follow your personalized schedule optimized for your goals.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <ExternalLink className="mr-2 h-4 w-4 text-amber-500" />
                AI Tutor
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Get instant help with difficult concepts and study strategies.
              </p>
            </div>
          </div>
          
          {/* Interactive sample question */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
            <h4 className="font-medium text-sm mb-2">Sample Question:</h4>
            <p className="text-sm mb-3">Which of the following is Newton's First Law?</p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setHasInteracted(true)}
              >
                A. Force equals mass times acceleration
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setHasInteracted(true)}
              >
                B. An object in motion stays in motion unless acted upon by an external force
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setHasInteracted(true)}
              >
                C. Every action has an equal and opposite reaction
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're Ready to Go!",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-center font-medium text-green-700 dark:text-green-300 mb-2">
              {hasInteracted ? "Great job interacting!" : "Your dashboard is ready!"}
            </h3>
            <p className="text-center text-sm">
              You're all set to begin your successful exam preparation journey with PREPZR.
            </p>
          </div>
          
          {suggestedNextAction && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-sm font-medium mb-1">Suggested Next Action:</h3>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{suggestedNextAction}</p>
            </div>
          )}
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            {isFirstTimeUser 
              ? "Your personalized learning space is ready for you."
              : `It's good to see you again. Let's continue your learning journey.`
            }
          </DialogDescription>
        </DialogHeader>
        
        {/* Step content */}
        <div className="my-4">
          {steps[currentStep].content}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center space-x-1 my-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full ${currentStep === index ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={onSkipTour} 
              size="sm"
              className="text-xs sm:text-sm"
            >
              Skip Tour
            </Button>
            
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                size="sm"
                className="text-xs sm:text-sm flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext} 
            className={`bg-gradient-to-r ${currentStep === steps.length - 1 ? 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' : 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-xs sm:text-sm flex items-center`}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'} 
            {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
