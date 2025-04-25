
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReturnUserWelcomeProps {
  userName: string;
  lastActivity?: {
    type: string;
    description: string;
    url?: string;
  } | null;
}

const ReturnUserWelcome: React.FC<ReturnUserWelcomeProps> = ({
  userName,
  lastActivity
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Show dialog after a short delay
  useEffect(() => {
    // Don't show if no last activity
    if (!lastActivity) return;
    
    // Check if this dialog has been shown in this session
    const hasShownWelcomeBack = sessionStorage.getItem('hasShownWelcomeBack');
    if (hasShownWelcomeBack) return;
    
    const timer = setTimeout(() => {
      setOpen(true);
      // Mark that we've shown this dialog in this session
      sessionStorage.setItem('hasShownWelcomeBack', 'true');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [lastActivity]);

  const handleContinue = () => {
    if (lastActivity?.url) {
      navigate(lastActivity.url);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                Welcome back, {userName}!
              </DialogTitle>
              <DialogDescription>
                Would you like to continue where you left off?
              </DialogDescription>
            </DialogHeader>
            
            {lastActivity && (
              <div className="p-4 border rounded-lg bg-muted/50 my-2">
                <h3 className="font-medium mb-1">Your last activity:</h3>
                <div className="flex items-start gap-3">
                  {lastActivity.type === 'concept' && <BookOpen className="h-5 w-5 text-indigo-500 mt-0.5" />}
                  <p>{lastActivity.description}</p>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                type="button" 
                variant="outline"
                onClick={handleClose}
                className="sm:mr-auto order-2 sm:order-1"
              >
                <X className="h-4 w-4 mr-1.5" />
                Not now
              </Button>
              
              <Button 
                onClick={handleContinue}
                disabled={!lastActivity?.url}
                className="bg-gradient-to-r from-indigo-500 to-violet-600 order-1 sm:order-2"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReturnUserWelcome;
