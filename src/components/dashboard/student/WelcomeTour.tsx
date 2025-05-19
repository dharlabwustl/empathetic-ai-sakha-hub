
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
import { Brain, CalendarDays, FileText, BookOpen, ExternalLink } from 'lucide-react';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {isFirstTimeUser ? 'Welcome to Your Learning Dashboard!' : 'Welcome Back!'}
          </DialogTitle>
          <DialogDescription>
            {isFirstTimeUser 
              ? "Your personalized learning space is ready for you."
              : `It's good to see you again. Let's continue your learning journey.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-500" />
              Your Learning Dashboard
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This is your command center for exam preparation. Track progress, 
              access study materials, and get personalized recommendations.
            </p>
          </div>
          
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
                Follow your personalized study schedule optimized for your goals.
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
          
          {suggestedNextAction && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-sm font-medium mb-1">Suggested Next Action:</h3>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{suggestedNextAction}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-sm font-medium mb-2">UN Sustainability Goals</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Prep-zer supports UN Sustainability goals with inclusive and equitable quality education. 
              We're committed to providing equal access to personalized learning for all students.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
          <Button onClick={onCompleteTour} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
