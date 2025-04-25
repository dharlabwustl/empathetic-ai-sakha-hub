
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Calendar, Activity, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = true,
  lastActivity,
  suggestedNextAction,
  loginCount = 1,
  open,
  onOpenChange
}) => {
  const [currentTab, setCurrentTab] = useState("welcome");
  const isReturningUser = !isFirstTimeUser;

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  const handleComplete = () => {
    onCompleteTour();
    onOpenChange(false);
  };
  
  const handleSkip = () => {
    onSkipTour();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isFirstTimeUser ? "Welcome to Sakha AI!" : "Welcome Back!"}
          </DialogTitle>
          <DialogDescription>
            {isFirstTimeUser 
              ? "Let's take a quick tour to help you get started."
              : `Great to see you again. ${suggestedNextAction ? "Here's what we recommend:" : "Let us help you navigate through the platform."}`
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="welcome" className="flex flex-col items-center text-xs p-2">
              <UserCheck className="h-4 w-4" />
              <span className="mt-1">Welcome</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex flex-col items-center text-xs p-2">
              <Activity className="h-4 w-4" />
              <span className="mt-1">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex flex-col items-center text-xs p-2">
              <BookOpen className="h-4 w-4" />
              <span className="mt-1">Study</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex flex-col items-center text-xs p-2">
              <Calendar className="h-4 w-4" />
              <span className="mt-1">Plan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="welcome" className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {isFirstTimeUser ? "Let's get you started!" : "Welcome back to Sakha AI!"}
                </h3>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  {isFirstTimeUser ? (
                    <p>
                      Sakha AI is your personalized AI tutor, designed to help you achieve your academic goals.
                      We'll guide you through our platform so you can make the most of your learning journey.
                    </p>
                  ) : (
                    <>
                      {lastActivity ? (
                        <div>
                          <p className="mb-2">Last time you were studying:</p>
                          <div className="bg-muted p-3 rounded-md border mb-2">
                            {lastActivity.description}
                          </div>
                        </div>
                      ) : (
                        <p>It's been a while! Let's help you pick up where you left off.</p>
                      )}
                      
                      {suggestedNextAction && (
                        <div className="mt-3">
                          <p className="font-medium">We recommend:</p>
                          <div className="flex items-start gap-2 mt-1 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/30">
                            <ArrowRight className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <p>{suggestedNextAction}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip Tour
                  </Button>
                  <Button onClick={() => setCurrentTab("dashboard")}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="dashboard" className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Your Dashboard</h3>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Overview Tab</span>
                        <p className="text-muted-foreground text-sm">See your progress metrics, recommendations, and recent activity</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Today's Plan Tab</span>
                        <p className="text-muted-foreground text-sm">Check your daily study schedule and tasks</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Quick Actions</span>
                        <p className="text-muted-foreground text-sm">Use the buttons at the top to access AI tutoring and other features</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setCurrentTab("welcome")}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentTab("study")}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="study" className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Study Resources</h3>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Concept Cards</span>
                        <p className="text-muted-foreground text-sm">Digestible chunks of knowledge tailored to your learning style</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Flashcards</span>
                        <p className="text-muted-foreground text-sm">Quick review cards for effective memorization</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Practice Exams</span>
                        <p className="text-muted-foreground text-sm">Test your knowledge with realistic exam simulations</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setCurrentTab("dashboard")}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentTab("plan")}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="plan" className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Your Study Plan</h3>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Personalized Schedule</span>
                        <p className="text-muted-foreground text-sm">We've created a study plan tailored to your goals and learning pace</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Daily Tasks</span>
                        <p className="text-muted-foreground text-sm">View your daily study items in the Today's Plan tab</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Progress Tracking</span>
                        <p className="text-muted-foreground text-sm">Mark items as completed to track your progress</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setCurrentTab("study")}>
                    Back
                  </Button>
                  <Button onClick={handleComplete}>
                    {isFirstTimeUser ? "Get Started!" : "Continue Learning"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between mt-2">
          <div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
          </div>
          <div className="flex items-center gap-1">
            {["welcome", "dashboard", "study", "plan"].map((tab, index) => (
              <motion.div
                key={tab}
                className={`h-1.5 w-1.5 rounded-full ${
                  currentTab === tab ? "bg-primary" : "bg-muted"
                }`}
                animate={{ scale: currentTab === tab ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCurrentTab(tab)}
              />
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
