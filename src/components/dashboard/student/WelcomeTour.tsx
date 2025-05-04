
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Check, GraduationCap, Info, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour?: () => void;
  onCompleteTour?: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  initialTab?: string;
}

const WelcomeTour = ({ 
  open, 
  onOpenChange, 
  onSkipTour, 
  onCompleteTour, 
  isFirstTimeUser = false, 
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  initialTab = 'welcome'
}: WelcomeTourProps) => {
  // Start on founder tab if initialTab is set to founder
  const [activeTab, setActiveTab] = useState(initialTab);

  // List of tour steps
  const tourSteps = [
    "Welcome", 
    "Dashboard", 
    "Academic", 
    "Analytics", 
    "Founder"
  ];
  
  // Check which step is active based on tab
  const currentStepIndex = tourSteps.findIndex(step => step.toLowerCase() === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNextTab = () => {
    const currentIndex = tourSteps.findIndex(step => step.toLowerCase() === activeTab);
    if (currentIndex < tourSteps.length - 1) {
      setActiveTab(tourSteps[currentIndex + 1].toLowerCase());
    } else {
      // If we're on the last tab
      if (onCompleteTour) onCompleteTour();
    }
  };

  const handleSkip = () => {
    if (onSkipTour) onSkipTour();
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => handleTabChange('welcome')}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Welcome tour overview</p>
                  </TooltipContent>
                </Tooltip>
                <h2 className="text-lg font-semibold">PREPZR Tour</h2>
              </div>
              <div className="flex items-center space-x-1">
                {tourSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={cn("h-1 rounded-full w-6", 
                      index <= currentStepIndex ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                    )}
                  />
                ))}
              </div>
            </div>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="px-6">
              <TabsList className="w-full justify-start overflow-x-auto pb-1 mb-6">
                <TabsTrigger value="welcome" className="rounded-md">
                  <User className="w-4 h-4 mr-2" />
                  Welcome
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="rounded-md">
                  <BarChart className="w-4 h-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="academic" className="rounded-md">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-md">
                  <BarChart className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="founder" className="rounded-md">
                  <User className="w-4 h-4 mr-2" />
                  Founder
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="welcome" className="mt-0 px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Welcome to PREPZR!</h3>
                    <p className="text-muted-foreground">
                      Your AI-powered study companion is ready to help you excel 
                      in your academic journey. This short tour will show you how 
                      to get the most out of PREPZR.
                    </p>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Personalized Study Plans</h4>
                          <p className="text-sm text-muted-foreground">
                            Create custom study plans based on your goals and learning style.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Academic Progress Tracking</h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor your improvement with detailed analytics and insights.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">AI-Powered Assistance</h4>
                          <p className="text-sm text-muted-foreground">
                            Get help from your AI tutor whenever you need it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-md p-4 shadow-sm">
                      <h4 className="font-medium mb-2">
                        {isFirstTimeUser ? "Welcome, new user!" : "Welcome back!"}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {isFirstTimeUser 
                          ? "Let's get you started with a quick tour of your dashboard." 
                          : `This is login #${loginCount || 1}. Let's continue where you left off.`
                        }
                      </p>
                      
                      {lastActivity && !isFirstTimeUser && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium">Last activity:</h5>
                          <p className="text-sm text-muted-foreground">
                            {lastActivity.description}
                          </p>
                        </div>
                      )}
                      
                      {suggestedNextAction && (
                        <div>
                          <h5 className="text-sm font-medium">Suggested next:</h5>
                          <p className="text-sm text-primary">
                            {suggestedNextAction}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-0 px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Your Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Your dashboard gives you a complete overview of your academic progress
                      and upcoming tasks. Here's what you can do:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="font-medium">Today's Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          View your scheduled study sessions and tasks for today.
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="font-medium">Progress Overview</h4>
                        <p className="text-sm text-muted-foreground">
                          Track your progress across subjects and exam goals.
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
                        <h4 className="font-medium">Quick Actions</h4>
                        <p className="text-sm text-muted-foreground">
                          Access common tasks like creating study plans or practice tests.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-sm">
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-md mb-3" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6" />
                        <div className="flex justify-between mt-4">
                          <div className="h-8 bg-primary/20 w-24 rounded" />
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-24 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="academic" className="mt-0 px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Academic Advisor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      The Academic Advisor helps you create and manage personalized study plans:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Custom Study Plans</h4>
                          <p className="text-sm text-muted-foreground">
                            Create plans tailored to your exam goals and learning pace.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Subject Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Organize your subjects by proficiency and priority.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Progress Tracking</h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor your progress toward exam readiness.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <img 
                      src="https://placehold.co/400x300/e2e8f0/475569?text=Academic+Advisor+Preview" 
                      alt="Academic Advisor" 
                      className="rounded-lg shadow-md max-w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0 px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Analytics & Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      PREPZR provides detailed analytics to help you understand your strengths and areas for improvement:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <BarChart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Performance Metrics</h4>
                          <p className="text-sm text-muted-foreground">
                            Track your performance across subjects and topics.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <BarChart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Study Time Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            See how you're allocating your study time across subjects.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <BarChart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Progress Reports</h4>
                          <p className="text-sm text-muted-foreground">
                            Download detailed reports to track your academic growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Subject Performance</h4>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Physics</span>
                            <span>75%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Chemistry</span>
                            <span>60%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Biology</span>
                            <span>85%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="founder" className="mt-0 px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3">Message from the Founder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Welcome to PREPZR! I'm thrilled you've joined our learning community.
                    </p>
                    
                    <div className="space-y-4">
                      <p className="text-sm">
                        At PREPZR, we believe that every student deserves personalized guidance to reach their full potential. Our AI-powered platform is designed to adapt to your unique learning style and help you achieve your academic goals.
                      </p>
                      
                      <p className="text-sm">
                        We've built PREPZR with a focus on these core principles:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-1" />
                          <p className="text-sm">Personalization that adapts to your needs</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-1" />
                          <p className="text-sm">Evidence-based learning techniques</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-1" />
                          <p className="text-sm">Continuous improvement through AI</p>
                        </div>
                      </div>
                      
                      <p className="text-sm">
                        I hope PREPZR empowers your learning journey. We're excited to be a part of your success story!
                      </p>
                      
                      <p className="text-sm font-medium">
                        - The PREPZR Team
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
                    <h4 className="font-medium">Founder & CEO</h4>
                    <p className="text-sm text-muted-foreground">PREPZR Learning Technologies</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="p-6 pt-2 border-t">
            <div className="flex justify-between w-full">
              <Button variant="ghost" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button onClick={handleNextTab}>
                {activeTab === tourSteps[tourSteps.length - 1].toLowerCase() ? "Complete Tour" : "Next"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default WelcomeTour;
