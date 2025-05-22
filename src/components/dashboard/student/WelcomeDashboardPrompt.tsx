
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Confetti } from '@/components/ui/confetti';
import { Sparkles, BookOpen, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WelcomeDashboardPromptProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({ 
  userName, 
  onComplete 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  // Show confetti when the dialog opens
  useEffect(() => {
    if (isOpen) {
      // Add a small delay for better effect
      const timer = setTimeout(() => {
        setShowConfetti(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Handle dialog close
  const handleClose = () => {
    setIsOpen(false);
    onComplete();
    
    // Show toast when user starts journey
    toast({
      title: "Your journey begins!",
      description: "Explore your personalized dashboard to get started.",
      duration: 5000,
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border border-orange-200 dark:border-orange-700/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-amber-600 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Welcome to your dashboard!
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 space-y-4">
            <h3 className="text-lg font-medium text-center">
              Hello {userName}, your success journey starts here!
            </h3>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Your personalized dashboard is ready. Here's what you can do now:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full mr-2 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Explore your personalized study plan
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full mr-2 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Check your exam readiness score
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full mr-2 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Review today's revision tasks
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-medium text-amber-700 dark:text-amber-400">Pro Tip</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Start with the "Today's Plan" section for a structured approach to your daily studying.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              Start My Journey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {showConfetti && <Confetti />}
    </>
  );
};

export default WelcomeDashboardPrompt;
