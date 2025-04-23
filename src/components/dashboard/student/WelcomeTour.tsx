
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
import { X, ChevronLeft, ChevronRight, CheckCircle, BookOpen, Layout, Calendar, Brain, BarChart3, ClipboardCheck, Search } from "lucide-react";
import { motion } from 'framer-motion';

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
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Sakha AI",
      description: "Your personal learning companion designed to help you succeed in your studies.",
      icon: <Brain size={48} className="text-primary mx-auto mb-4" />
    },
    {
      title: "Dashboard Overview",
      description: "Your dashboard gives you a complete view of your learning progress, insights, and recommendations.",
      icon: <Layout size={48} className="text-primary mx-auto mb-4" />
    },
    {
      title: "Study Plan",
      description: "We've created a personalized study plan based on your goals, preferences, and learning style.",
      icon: <Calendar size={48} className="text-primary mx-auto mb-4" />
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvement over time with detailed analytics and insights.",
      icon: <BarChart3 size={48} className="text-primary mx-auto mb-4" />
    },
    {
      title: "Get Started Today",
      description: "Head to the Overview tab to see your daily tasks, then check out Today's Plan to start studying right away.",
      icon: <ClipboardCheck size={48} className="text-primary mx-auto mb-4" />
    }
  ];

  const navigateStep = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onCompleteTour();
      }
    } else {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{steps[currentStep].title}</DialogTitle>
          <DialogDescription className="text-center">
            Step {currentStep + 1} of {steps.length}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].icon}
            <p className="text-center mb-6">{steps[currentStep].description}</p>
            
            {currentStep === 4 && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-4">
                <div className="flex items-start gap-3">
                  <Search className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Next steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
                      <li>Go to <span className="font-medium">Overview</span> tab to see your personalized dashboard</li>
                      <li>Check <span className="font-medium">Today's Plan</span> for your study sessions</li>
                      <li>Complete tasks to track your progress</li>
                      <li>Use <span className="font-medium">AI Tutor</span> if you need help with a topic</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex justify-center mt-2">
          {Array.from({ length: steps.length }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <DialogFooter className="flex justify-between items-center sm:justify-between">
          <div>
            {currentStep > 0 ? (
              <Button variant="outline" onClick={() => navigateStep('prev')}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={onSkipTour}>
                <X className="mr-1 h-4 w-4" />
                Skip Tour
              </Button>
            )}
          </div>
          <Button onClick={() => navigateStep('next')}>
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Get Started
                <CheckCircle className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
