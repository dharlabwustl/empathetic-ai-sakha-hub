
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

export interface WelcomeTourProps {
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  // Adding aliases for compatibility
  onSkipTour?: () => void;
  onCompleteTour?: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ 
  handleSkipTour, 
  handleCompleteTour,
  onSkipTour, // Alias support
  onCompleteTour, // Alias support
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount
}) => {
  // Use the handler or its alias
  const skipHandler = handleSkipTour || onSkipTour || (() => {});
  const completeHandler = handleCompleteTour || onCompleteTour || (() => {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Welcome to Sakha AI!</h2>
          <Button variant="ghost" size="icon" onClick={skipHandler}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <ChevronRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Your personalized dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Everything you need to ace your exams is now in one place. Study plans, subjects,
                  practice tests, and tutoring - all tailored to your goals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <ChevronRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Track your progress</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See how you're doing with visual analytics. Know exactly what to focus on next to improve.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <ChevronRight className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">AI-powered learning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI tutor analyzes your strengths and weaknesses to provide personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/30 flex justify-between">
          <Button variant="outline" onClick={skipHandler}>Skip tour</Button>
          <Button onClick={completeHandler}>Get started</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeTour;
