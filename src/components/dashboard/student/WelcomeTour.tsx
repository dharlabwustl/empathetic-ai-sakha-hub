
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, BookOpen, Award, UserPlus, Calendar, Lightbulb, LibrarySquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VoiceAnnouncer from './voice/VoiceAnnouncer';
import VoiceGreeting from './VoiceGreeting';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';

interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: {
    type: string;
    description: string;
  } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  showFounderTabFirst?: boolean;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  open,
  onOpenChange,
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = false,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  showFounderTabFirst = false
}) => {
  const [activeTab, setActiveTab] = useState(showFounderTabFirst ? "founder" : "overview");
  const [showVoiceGreeting, setShowVoiceGreeting] = useState(false);
  
  // For first time users, prepare the voice greeting to be shown after tour
  useEffect(() => {
    if (isFirstTimeUser && activeTab === "complete") {
      setShowVoiceGreeting(true);
    } else {
      setShowVoiceGreeting(false);
    }
  }, [isFirstTimeUser, activeTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    Welcome to PREPZR
                    {!isFirstTimeUser && loginCount > 1 && (
                      <span className="ml-2 text-lg text-gray-500 font-normal">
                        (Visit #{loginCount})
                      </span>
                    )}
                  </h2>
                  
                  <p className="text-gray-500 mt-1">
                    {isFirstTimeUser 
                      ? "Let's get you started with a quick tour of the platform" 
                      : "Here's a refresher on our key features"}
                  </p>
                </div>

                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full mb-4">
                    {showFounderTabFirst && (
                      <EnhancedTooltip content="Message from our founder">
                        <TabsTrigger value="founder" className="flex-1">Founder's Note</TabsTrigger>
                      </EnhancedTooltip>
                    )}
                    <EnhancedTooltip content="Platform overview">
                      <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                    </EnhancedTooltip>
                    <EnhancedTooltip content="Study features">
                      <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                    </EnhancedTooltip>
                    <EnhancedTooltip content="Advanced tools">
                      <TabsTrigger value="tools" className="flex-1">Tools</TabsTrigger>
                    </EnhancedTooltip>
                    <EnhancedTooltip content="Complete tour">
                      <TabsTrigger value="complete" className="flex-1">Complete</TabsTrigger>
                    </EnhancedTooltip>
                  </TabsList>
                  
                  {showFounderTabFirst && (
                    <TabsContent value="founder" className="space-y-4">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-blue-100 dark:bg-blue-800/30 p-3">
                            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">From Our Founder</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              "We built PREPZR with a simple mission - to make high-quality education accessible to every student. 
                              Our AI-powered platform adapts to your unique learning style and needs, helping you achieve your academic goals efficiently.
                              We're committed to continuously improving your experience and would love your feedback as you explore the platform."
                            </p>
                            <p className="mt-4 font-medium">- Team PREPZR</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
                        <Button onClick={() => setActiveTab("overview")}>Next: Platform Overview</Button>
                      </div>
                    </TabsContent>
                  )}
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-blue-200 dark:bg-blue-800 p-2">
                            <BookOpen className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Personalized Learning</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              AI-driven study plans that adapt to your progress and understanding.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-purple-200 dark:bg-purple-800 p-2">
                            <Award className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Exam-Focused Approach</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Content specifically designed for your target exams.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-green-200 dark:bg-green-800 p-2">
                            <UserPlus className="h-5 w-5 text-green-700 dark:text-green-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Community Support</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Connect with peers and educators for collaborative learning.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-amber-200 dark:bg-amber-800 p-2">
                            <Calendar className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Structured Preparation</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Daily plans and schedules to ensure consistent progress.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
                      <Button onClick={() => setActiveTab("features")}>Next: Key Features</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-4">
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold">AI Tutor</h3>
                          <Badge className="ml-auto" variant="outline">24/7 Access</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                          Get instant help with concepts and practice questions, with detailed explanations anytime you need.
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                            <LibrarySquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-semibold">Study Planner</h3>
                          <Badge className="ml-auto" variant="outline">Personalized</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                          Create and manage custom study plans optimized for your learning style and exam timeline.
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <CheckCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="font-semibold">Practice Tests</h3>
                          <Badge className="ml-auto" variant="outline">Real-time Feedback</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                          Take simulated exams with detailed performance analysis to identify improvement areas.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
                      <Button onClick={() => setActiveTab("tools")}>Next: Tools & Resources</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tools" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium mb-2">Voice Assistant</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Navigate the platform and get information using natural voice commands.
                        </p>
                        <div className="flex justify-center">
                          <EnhancedTooltip content="Voice commands available throughout the platform">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                              <Mic className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                          </EnhancedTooltip>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium mb-2">Dashboard</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Your central hub for tracking progress, upcoming tasks, and recommendations.
                        </p>
                        <div className="flex justify-center">
                          <EnhancedTooltip content="Access your personalized dashboard">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                              <BarChart2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                          </EnhancedTooltip>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
                      <Button onClick={() => setActiveTab("complete")}>Complete Tour</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="complete" className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800/30 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-green-100 dark:bg-green-800/50 p-4 rounded-full">
                          <CheckCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">
                        You're All Set!
                      </h3>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md mx-auto">
                        {isFirstTimeUser 
                          ? "Thank you for joining PREPZR! Your account is now ready, and we're excited to help you excel in your exams."
                          : "Welcome back to PREPZR! We've refreshed your memory of our key features. Let's continue your learning journey."}
                      </p>
                      
                      <Button 
                        size="lg" 
                        onClick={onCompleteTour} 
                        className="px-8"
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
      
      {/* Voice Greeting - activated when tour is completed for first-time users */}
      {showVoiceGreeting && isFirstTimeUser && (
        <VoiceAnnouncer userName={""} isFirstTimeUser={true} />
      )}
    </Dialog>
  );
};

// For importing lucide icon
const Mic = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

export default WelcomeTour;
