
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, BookOpen, BarChart3, Calendar, GraduationCap, MessageSquare, Mic, Volume } from 'lucide-react';
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
  loginCount = 1,
}) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSkip = () => {
    onSkipTour();
    onOpenChange(false);
  };

  const handleComplete = () => {
    onCompleteTour();
    onOpenChange(false);
  };

  // Determine appropriate greeting based on login count
  const getGreeting = () => {
    if (isFirstTimeUser || loginCount <= 1) {
      return "Welcome to PREPZR!";
    } else if (loginCount < 5) {
      return "Welcome back to PREPZR!";
    } else {
      return "Welcome back again!";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">{getGreeting()}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Let's take a quick tour of your personalized learning dashboard
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start px-6 border-b rounded-none">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">Overview</TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-primary/10">Key Features</TabsTrigger>
            <TabsTrigger value="navigation" className="data-[state=active]:bg-primary/10">Navigation</TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-primary/10">Voice Assistant</TabsTrigger>
          </TabsList>

          <div className="p-6 h-[400px] overflow-y-auto">
            <TabsContent value="overview" className="mt-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="space-y-6"
              >
                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Personalized Learning Experience</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your dashboard adapts to your learning style, goals, and progress to provide
                      a completely personalized experience.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Track Your Progress</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monitor your study sessions, quiz scores, and overall progress toward your academic goals.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Smart Scheduling</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your study plan is optimized based on your preferences, subject proficiency, and exam timeline.
                    </p>
                  </div>
                </motion.div>

                {lastActivity && (
                  <motion.div variants={fadeIn} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Your Last Activity</h4>
                    <p className="text-sm">{lastActivity.description}</p>
                  </motion.div>
                )}

                {suggestedNextAction && (
                  <motion.div variants={fadeIn} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Suggested Next Step</h4>
                    <p className="text-sm">{suggestedNextAction}</p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <motion.div variants={fadeIn} className="border rounded-lg p-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium mb-1">Academic Advisor</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get personalized study plans and subject recommendations based on your strengths and weaknesses.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="border rounded-lg p-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-medium mb-1">Smart Content</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Access adaptive learning materials that adjust to your progress and learning style.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="border rounded-lg p-4">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <BarChart3 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-medium mb-1">Progress Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detailed insights into your study patterns, strengths, and areas needing improvement.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="border rounded-lg p-4">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    <MessageSquare className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="font-medium mb-1">AI Tutor</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ask questions and get immediate help from our AI tutor at any time of day.
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="navigation" className="mt-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="space-y-6"
              >
                <motion.div variants={fadeIn} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium mb-1">Dashboard Overview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    The main landing page that shows your personalized study recommendations, 
                    progress metrics, and today's study plan.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs">
                    <strong>Tip:</strong> Check your dashboard daily for updated recommendations.
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium mb-1">Sidebar Navigation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    The sidebar contains links to all major sections including Academic Advisor, Practice Tests, 
                    Study Materials, and Settings.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-xs">
                    <strong>Tip:</strong> You can collapse the sidebar for more screen space.
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium mb-1">Quick Actions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Access frequently used features like creating a study plan, starting a practice test, 
                    or chatting with the AI tutor.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
                    <strong>Tip:</strong> The floating chat button gives you instant access to the AI assistant.
                  </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <img 
                    src="/assets/dashboard-navigation-guide.svg" 
                    alt="Dashboard Navigation Guide" 
                    className="rounded-lg border shadow-sm w-full object-cover h-48"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="voice" className="mt-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="space-y-6"
              >
                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                    <Volume className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Multilingual Voice Assistant</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our voice assistant supports both English and Hindi, making learning accessible in your preferred language.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                    <Mic className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Voice Commands</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Navigate through the platform, search for content, and get information using simple voice commands.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-medium mb-3">Common Voice Commands</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">"Open Study Plan"</span>
                      <span className="text-sm">Navigate to your study plan</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">"Start Practice Test"</span>
                      <span className="text-sm">Begin a practice test</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">"Explain [topic]"</span>
                      <span className="text-sm">Get topic explanation</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">"Hindi mode"</span>
                      <span className="text-sm">Switch to Hindi language</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">First Time Experience</h4>
                  <p className="text-sm">
                    When you first access your dashboard, the voice assistant will welcome you and guide you through the key features of the platform.
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>
          </div>

          <div className="flex justify-between p-6 pt-4 border-t">
            <Button variant="outline" onClick={handleSkip}>
              Skip Tour
            </Button>
            <Button onClick={handleComplete} className="flex items-center gap-2">
              Get Started <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
