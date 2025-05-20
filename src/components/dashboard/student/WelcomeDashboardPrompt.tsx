
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

interface WelcomeDashboardPromptProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({ userName, onComplete }) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      title: "Welcome to Your Dashboard",
      description: "This is your personalized learning space. We've customized it based on your preferences.",
      icon: "👋"
    },
    {
      title: "Track Your Progress",
      description: "Monitor your study habits, track exam readiness, and see how your mood affects performance.",
      icon: "📊"
    },
    {
      title: "Ready to Begin?",
      description: "Let's start your learning journey with PREP-zer!",
      icon: "🚀"
    }
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setOpen(false);
    // Mark as seen in localStorage
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    // Call the onComplete callback
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div 
                className="text-5xl mb-4 flex justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                {welcomeSteps[currentStep].icon}
              </motion.div>
              <DialogTitle className="text-xl font-bold">
                {welcomeSteps[currentStep].title}
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {welcomeSteps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </DialogHeader>

        <motion.div 
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2">
            {welcomeSteps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'bg-blue-600 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <DialogFooter className="mt-6 flex justify-center sm:justify-center">
          {currentStep === welcomeSteps.length - 1 ? (
            <Button 
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="mr-2 h-4 w-4" /> Get Started
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDashboardPrompt;
