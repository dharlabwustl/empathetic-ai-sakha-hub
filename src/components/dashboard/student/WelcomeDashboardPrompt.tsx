
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import VoiceGreeting from './voice/VoiceGreeting';

interface WelcomeDashboardPromptProps {
  userName: string;
  onComplete: () => void;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({
  userName,
  onComplete,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const [open, setOpen] = useState(true);
  
  const handleClose = () => {
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    setOpen(false);
    onComplete();
  };
  
  return (
    <>
      {/* Voice Greeting Component */}
      <VoiceGreeting 
        isFirstTimeUser={!isReturningUser}
        userName={userName}
        isReturningUser={isReturningUser}
        lastActivity={lastActivity}
        pendingTasks={pendingTasks}
        language="en-US"
      />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 backdrop-blur-sm">
          {/* 3D Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl font-semibold text-center">
              {isReturningUser ? `Welcome Back, ${userName}!` : `Welcome to Your Personalized Dashboard, ${userName}!`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 relative z-10">
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
                {isReturningUser 
                  ? `Great to see you again, ${userName}!` 
                  : `Your learning journey continues, ${userName}!`}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isReturningUser 
                  ? "Your AI-powered dashboard has been updated with your latest progress." 
                  : "Your AI-powered personalized dashboard is ready."}
              </p>
              
              {isReturningUser && lastActivity && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  Last time you were {lastActivity}
                </p>
              )}
              
              {isReturningUser && pendingTasks && pendingTasks.length > 0 && (
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  You have {pendingTasks.length} pending activities waiting for you.
                </p>
              )}
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">
                    {isReturningUser ? "Progress Tracking" : "Personalized Learning Path"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isReturningUser 
                      ? "Your dashboard shows updated progress and personalized recommendations based on your recent activities."
                      : "Your dashboard is customized based on your learning style, goals, and preferences."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">
                    {isReturningUser ? "Smart Recommendations" : "Mood-Adaptive Experience"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isReturningUser 
                      ? "Get AI-powered suggestions for your study plan, daily activities, and pending tasks."
                      : "Your emotional state is considered to provide the most effective study resources."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Real-Time Progress Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isReturningUser 
                      ? "Continue tracking your exam readiness score and see how much you've improved."
                      : "Watch your exam readiness score improve as you complete daily tasks."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center relative z-10">
            <Button 
              onClick={handleClose}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
            >
              {isReturningUser ? "Continue Learning" : "Get Started"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WelcomeDashboardPrompt;
