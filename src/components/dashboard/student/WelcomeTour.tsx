
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Award, Calendar, User, X } from 'lucide-react';

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount,
  open: controlledOpen,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setUncontrolledOpen] = useState(true);
  
  // Handle controlled vs uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : open;
  const setIsOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setUncontrolledOpen(value);
    }
  };
  
  const steps = [
    {
      title: "Welcome to Sakha AI",
      description: isFirstTimeUser 
        ? "Let's take a quick tour to help you get started with your personalized learning journey."
        : `Welcome back! You've logged in ${loginCount} times. Let's see what's new.`,
      icon: <User className="h-12 w-12 text-indigo-500" />
    },
    {
      title: "Your Study Dashboard",
      description: "This is your personal dashboard where you can track your progress, view assignments, and access study resources.",
      icon: <Award className="h-12 w-12 text-indigo-500" />
    },
    {
      title: "Concept Cards",
      description: "Master key concepts with our interactive concept cards, designed to help you understand and retain information better.",
      icon: <BookOpen className="h-12 w-12 text-indigo-500" />
    },
    {
      title: "Your Study Plan",
      description: "We've created a personalized study plan to help you achieve your goals efficiently.",
      icon: <Calendar className="h-12 w-12 text-indigo-500" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete tour
      setIsOpen(false);
      onCompleteTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    onSkipTour();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div 
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4">
              {steps[currentStep].icon}
            </div>
            <DialogTitle className="text-center text-xl">
              {steps[currentStep].title}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {steps[currentStep].description}
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        
        {currentStep === steps.length - 1 && suggestedNextAction && (
          <div className="p-4 bg-indigo-50 rounded-md">
            <h4 className="font-medium text-indigo-900 mb-1">Recommended Next Step:</h4>
            <p className="text-sm text-indigo-700">{suggestedNextAction}</p>
          </div>
        )}
        
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full ${idx === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="text-gray-600"
            >
              <X className="h-4 w-4 mr-1.5" />
              Skip
            </Button>
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
              >
                Back
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
