
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReturnUserWelcomeProps {
  userName: string;
  lastActivity?: { type: string; description: string; id?: string } | null;
}

const ReturnUserWelcome: React.FC<ReturnUserWelcomeProps> = ({
  userName,
  lastActivity
}) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  
  const handleContinue = () => {
    setOpen(false);
    
    // If there's a last activity with an ID, navigate to it
    if (lastActivity?.type === 'concept_card' && lastActivity.id) {
      navigate(`/study/concept-card/${lastActivity.id}`);
    } else if (lastActivity?.type === 'flashcard' && lastActivity.id) {
      navigate(`/study/flashcard/${lastActivity.id}`);
    } else if (lastActivity?.type === 'quiz' && lastActivity.id) {
      navigate(`/study/quiz/${lastActivity.id}`);
    } else {
      // If no specific activity ID, go to today's plan
      navigate('/dashboard/student/todays-plan');
    }
  };
  
  const handleStart = () => {
    setOpen(false);
    // Navigate to today's plan
    navigate('/dashboard/student/todays-plan');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back, {userName}!</DialogTitle>
          <DialogDescription>
            We've kept track of your progress. Would you like to continue where you left off?
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 my-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {lastActivity ? (
            <div>
              <p className="font-medium">Last Activity:</p>
              <p className="text-muted-foreground">{lastActivity.description}</p>
            </div>
          ) : (
            <p>No recent activity found. Start fresh with today's study plan.</p>
          )}
        </div>
        
        <DialogFooter>
          <div className="flex flex-col xs:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={handleStart}
              className="flex-1"
            >
              Start Fresh
            </Button>
            
            {lastActivity && (
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={handleContinue}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnUserWelcome;
