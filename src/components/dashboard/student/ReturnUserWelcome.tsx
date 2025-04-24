
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatRelativeTime } from "@/utils/dateUtils";

interface ReturnUserWelcomeProps {
  userName: string;
  lastActivity?: {
    type: string;
    description: string;
    id?: string;
    timestamp?: string;
  } | null;
}

const ReturnUserWelcome: React.FC<ReturnUserWelcomeProps> = ({ 
  userName,
  lastActivity 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we should show the welcome back dialog
    const sessionWelcomeShown = sessionStorage.getItem('welcome_shown');
    
    if (!sessionWelcomeShown && lastActivity) {
      // Only show if we have a last activity and haven't shown it yet this session
      setIsOpen(true);
      sessionStorage.setItem('welcome_shown', 'true');
    }
  }, [lastActivity]);
  
  const handleContinue = () => {
    setIsOpen(false);
    
    // Navigate to the last activity if we have one
    if (lastActivity?.type === 'concept_card' && lastActivity.id) {
      navigate(`/study/concept-card/${lastActivity.id}`);
    } else if (lastActivity?.type === 'flashcard' && lastActivity.id) {
      navigate(`/study/flashcards/${lastActivity.id}`);
    } else if (lastActivity?.type === 'quiz' && lastActivity.id) {
      navigate(`/study/quiz/${lastActivity.id}`);
    } else {
      // Default to today's plan
      navigate('/dashboard/student');
    }
  };
  
  if (!lastActivity) {
    return null;
  }
  
  // Format the last activity message
  let activityIcon;
  let activityMessage;
  let continueText;
  let activityTime = lastActivity.timestamp ? formatRelativeTime(new Date(lastActivity.timestamp)) : "recently";
  
  switch (lastActivity.type) {
    case 'concept_card':
      activityIcon = <BookOpen className="h-10 w-10 text-blue-500" />;
      activityMessage = `You were studying a concept card ${activityTime}`;
      continueText = "Continue studying";
      break;
    case 'flashcard':
      activityIcon = <BookOpen className="h-10 w-10 text-green-500" />;
      activityMessage = `You were practicing flashcards ${activityTime}`;
      continueText = "Continue practice";
      break;
    case 'quiz':
      activityIcon = <BookOpen className="h-10 w-10 text-purple-500" />;
      activityMessage = `You were taking a quiz ${activityTime}`;
      continueText = "Continue quiz";
      break;
    case 'login':
    default:
      activityIcon = <Clock className="h-10 w-10 text-indigo-500" />;
      activityMessage = `You were last active ${activityTime}`;
      continueText = "See today's plan";
      break;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome back, {userName}!</DialogTitle>
          <DialogDescription>
            Would you like to continue where you left off?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="bg-white dark:bg-gray-700 p-3 rounded-full">
            {activityIcon}
          </div>
          <div>
            <p className="font-medium">{activityMessage}</p>
            <p className="text-sm text-muted-foreground">{lastActivity.description}</p>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            View Dashboard
          </Button>
          <Button 
            className="gap-1" 
            onClick={handleContinue}
          >
            {continueText} <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnUserWelcome;
