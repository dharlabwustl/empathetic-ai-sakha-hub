import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, PieChart, Calendar, BookMarked, GraduationCap, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  open,
  onOpenChange,
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount
}) => {
  const featureList = [
    {
      title: "Smart Study Plan",
      description: "AI-generated study plans personalized to your learning style and pace",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Concept Cards",
      description: "Interactive visual learning for complex topics",
      icon: <BookMarked className="h-5 w-5" />,
    },
    {
      title: "Revision Loops",
      description: "Smart spaced repetition for maximum retention",
      icon: <RotateCw className="h-5 w-5" />,
    },
    {
      title: "Exam Readiness",
      description: "Track your exam preparation progress with analytics",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "AI Tutor",
      description: "24/7 support for all your academic queries",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const welcomeMessage = (
    <div className="space-y-2 mb-4">
      <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Welcome to PREPZR</h3>
      <p>
        We understand your mindset, not just the exam. PREPZR is designed to help you transform your 
        study experience into exam success with personalized learning.
      </p>
    </div>
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFirstTimeUser ? "Welcome to PREPZR!" : "Welcome Back!"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {welcomeMessage}
            <h4 className="text-lg font-semibold mb-2">Key Features to Explore:</h4>
            <ul className="space-y-3">
              {featureList.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="rounded-full bg-orange-100 p-2 text-orange-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="font-medium">{feature.title}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            {lastActivity && loginCount && loginCount > 1 && (
              <div className="mt-4 border rounded-md p-3 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last login: <span className="font-medium">{lastActivity.description}</span>
                </p>
                {suggestedNextAction && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Suggested next action: <span className="font-medium">{suggestedNextAction}</span>
                  </p>
                )}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onSkipTour}>
            Skip Tour
          </AlertDialogCancel>
          <AlertDialogAction onClick={onCompleteTour}>
            Okay, let's go!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WelcomeTour;
