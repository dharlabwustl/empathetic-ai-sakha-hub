
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface WelcomeDashboardPromptProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({
  userName,
  onComplete
}) => {
  const [open, setOpen] = useState(true);
  
  const handleClose = () => {
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    setOpen(false);
    onComplete();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Welcome to Your Personalized Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-center mb-4">
            <motion.div 
              className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </motion.div>
            
            <h3 className="text-lg font-semibold mt-4">
              Hi {userName}, your learning journey begins now!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your AI-powered personalized dashboard is ready.
            </p>
          </div>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Personalized Learning Path</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your dashboard is customized based on your learning style, goals, and preferences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Mood-Adaptive Experience</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your emotional state is considered to provide the most effective study resources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Real-Time Progress Tracking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Watch your exam readiness score improve as you complete daily tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleClose}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDashboardPrompt;
