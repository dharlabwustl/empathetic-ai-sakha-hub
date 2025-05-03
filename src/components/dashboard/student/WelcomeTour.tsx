
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
import { ChevronRight, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = true,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  open,
  onOpenChange
}: WelcomeTourProps) => {
  const [step, setStep] = React.useState(0);

  // Tour steps content
  const steps = [
    {
      title: "Welcome to PREPZR!",
      description: isFirstTimeUser 
        ? "Let's take a quick tour of your personalized dashboard to help you get started."
        : `Welcome back for your ${loginCount}${loginCount === 2 ? 'nd' : loginCount === 3 ? 'rd' : 'th'} visit! Here's a reminder of how to use PREPZR effectively.`,
      image: "/assets/images/dashboard-welcome.png"
    },
    {
      title: "Your Dashboard",
      description: "This is your central hub for all learning activities. You'll find your progress, today's tasks, and quick access to all features.",
      image: "/assets/images/dashboard-overview.png"
    },
    {
      title: "Academic Advisor",
      description: "Your personalized study plan is ready! Visit the Academic Advisor to see your customized learning path.",
      image: "/assets/images/academic-advisor.png"
    },
    {
      title: "Smart Flashcards",
      description: "Practice with AI-powered flashcards that adapt to your learning needs and help strengthen your memory.",
      image: "/assets/images/flashcards.png"
    },
    {
      title: "You're All Set!",
      description: suggestedNextAction 
        ? `We suggest you start with: ${suggestedNextAction}`
        : "We recommend starting with Today's Plan to begin your learning journey.",
      image: "/assets/images/get-started.png"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onCompleteTour();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    onSkipTour();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{steps[step].title}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogTitle>
          <DialogDescription>
            {steps[step].description}
          </DialogDescription>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="my-4"
          >
            <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
              <img 
                src={steps[step].image || "/assets/images/placeholder.png"} 
                alt={steps[step].title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/placeholder.png";
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center my-2">
          {steps.map((_, index) => (
            <span 
              key={index} 
              className={`block w-2 h-2 mx-1 rounded-full ${index === step ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
            ></span>
          ))}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            {step > 0 && (
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <Button 
              variant="ghost" 
              onClick={onSkipTour}
            >
              Skip Tour
            </Button>
          </div>
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            {step < steps.length - 1 ? (
              <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
            ) : (
              <>Get Started <CheckCircle className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
