
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Brain, Calendar, FileText, ChevronRight, ChevronLeft, BookOpen, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const WelcomeTour = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = false,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  open = false,
  onOpenChange
}: WelcomeTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(open);
  
  useEffect(() => {
    // Check if this is a user coming from signup flow
    const urlParams = new URLSearchParams(window.location.search);
    const isNewUser = urlParams.get('new') === 'true';
    const completedOnboarding = urlParams.get('completedOnboarding') === 'true';
    
    if (isNewUser && completedOnboarding) {
      // Open the tour automatically for new users who completed onboarding
      setShowTour(true);
      // Store that the user has seen the tour
      localStorage.setItem("hasSeenTour", "true");
      
      // Clear URL parameters without refreshing the page
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      setShowTour(open);
    }
  }, [open]);
  
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(showTour);
    }
  }, [showTour, onOpenChange]);

  const steps = [
    {
      title: "Welcome to Your Dashboard",
      description: "Your command center for exam excellence",
      content: (
        <div className="space-y-4">
          <p>
            This is your personalized dashboard designed to help you achieve your exam goals. 
            Let me show you around so you can make the most of your learning journey!
          </p>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm">Your daily study plan and progress tracking are all in one place.</p>
          </div>
        </div>
      ),
      icon: <Calendar className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Smart Learning Tools",
      description: "AI-powered tools to accelerate your learning",
      content: (
        <div className="space-y-4">
          <p>
            PREPZR offers several powerful learning tools designed to help you master concepts faster:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800 flex flex-col items-center text-center">
              <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h4 className="font-medium">Flashcards</h4>
              <p className="text-xs">Spaced repetition learning</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex flex-col items-center text-center">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <h4 className="font-medium">Concept Cards</h4>
              <p className="text-xs">Visual concept mastery</p>
            </div>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 dark:border-cyan-800 flex flex-col items-center text-center">
              <FileText className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mb-2" />
              <h4 className="font-medium">Practice Tests</h4>
              <p className="text-xs">Real exam simulation</p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800 flex flex-col items-center text-center">
              <MessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400 mb-2" />
              <h4 className="font-medium">AI Tutor</h4>
              <p className="text-xs">On-demand help</p>
            </div>
          </div>
        </div>
      ),
      icon: <Brain className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Daily Study Plan",
      description: "Stay on track with your personalized schedule",
      content: (
        <div className="space-y-4">
          <p>
            Your Today's Plan is automatically generated based on your study goals, preferences, and learning pace.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800 p-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                <span>Study sessions are balanced across subjects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                <span>Focus more on areas where you need improvement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100 rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                <span>Adjusts based on your progress and upcoming exam dates</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      icon: <Calendar className="h-8 w-8 text-indigo-600" />
    }
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTour(false);
      onCompleteTour();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    setShowTour(false);
    onSkipTour();
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Dialog open={showTour} onOpenChange={(open) => {
      setShowTour(open);
      if (!open) onSkipTour();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {steps[currentStep].icon}
            </motion.div>
          </div>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>
        
        <motion.div
          key={`tour-step-${currentStep}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="py-4"
        >
          {steps[currentStep].content}
        </motion.div>
        
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 border-t pt-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" onClick={handleSkip} className="w-full sm:w-auto">
              Skip Tour
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePreviousStep} 
              disabled={currentStep === 0}
              className={cn("w-full sm:w-auto", currentStep === 0 && "opacity-0 pointer-events-none")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </div>
          
          <Button onClick={handleNextStep} className="w-full sm:w-auto mb-2 sm:mb-0">
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Get Started'
            )}
          </Button>
        </DialogFooter>
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full transition-all ${currentStep === index ? 'bg-primary w-6' : 'bg-gray-200 dark:bg-gray-700 w-3'}`} 
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
