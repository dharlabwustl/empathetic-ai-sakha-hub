
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  loginCount?: number;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  loginCount = 1,
  lastActivity,
  suggestedNextAction,
  open,
  onOpenChange
}) => {
  const welcomeFeatures = [
    "AI-powered personalized study plans",
    "Interactive visualizations for complex topics",
    "Adaptive quizzes that learn with you",
    "Daily progress tracking and motivation",
    "UN Sustainability Goals support - Quality education for all"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-900 dark:to-indigo-950/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {isFirstTimeUser
              ? "Welcome to PREPZR - Your Exam Success Journey Starts Here!"
              : `Welcome Back to PREPZR!`}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Welcome message based on user status */}
          <p className="text-center text-gray-700 dark:text-gray-300">
            {isFirstTimeUser
              ? "We're excited to help you achieve your academic goals with our AI-powered study platform."
              : loginCount > 5
                ? "Great to see you again! Your consistent dedication is impressive."
                : "Good to see you again! Ready to continue your learning journey?"}
          </p>

          {/* Feature highlights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              PREPZR Features Designed For You
            </h3>
            <ul className="space-y-2">
              {welcomeFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* For returning users */}
          {!isFirstTimeUser && lastActivity && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">
                Continue where you left off
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Last activity: {lastActivity.description}
              </p>
              {suggestedNextAction && (
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                  Recommended next step: {suggestedNextAction}
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={onSkipTour}
          >
            Skip Tour
          </Button>
          <Button
            onClick={onCompleteTour}
            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700"
          >
            Let's Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
