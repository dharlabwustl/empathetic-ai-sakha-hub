
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { LayoutDashboard, CalendarDays, BookText, BookOpen, PenTool, Heart, Zap, Trophy, Users, Mic } from 'lucide-react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount = 1,
  open = true,
  onOpenChange
}) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showTabsNav, setShowTabsNav] = useState(true);
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handlePrevTab = () => {
    const tabs = ['dashboard', 'today', 'learning', 'challenges', 'study-groups', 'feel-good', 'voice-assistant'];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };
  
  const handleNextTab = () => {
    const tabs = ['dashboard', 'today', 'learning', 'challenges', 'study-groups', 'feel-good', 'voice-assistant'];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };
  
  const isFirstTab = currentTab === 'dashboard';
  const isLastTab = currentTab === 'voice-assistant';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 max-h-[85vh] overflow-auto">
        {showTabsNav && (
          <>
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-2xl font-bold">Welcome to PREPZR!</DialogTitle>
              <DialogDescription>
                {isFirstTimeUser 
                  ? "Let's get you familiar with the key features to help you ace your exams."
                  : "Here's a quick refresher on how to make the most of PREPZR."
                }
              </DialogDescription>
            </DialogHeader>
            
            <Tabs 
              value={currentTab} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-7 w-auto mb-4">
                  <TabsTrigger value="dashboard" className="px-3 py-1">
                    <LayoutDashboard className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="today" className="px-3 py-1">
                    <CalendarDays className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="px-3 py-1">
                    <BookText className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="px-3 py-1">
                    <Trophy className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="study-groups" className="px-3 py-1">
                    <Users className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="feel-good" className="px-3 py-1">
                    <Heart className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="voice-assistant" className="px-3 py-1">
                    <Mic className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="dashboard" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <LayoutDashboard className="h-5 w-5 text-primary" />
                          Dashboard
                        </CardTitle>
                        <CardDescription>Your personalized study command center</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/dashboard.png" 
                              alt="Dashboard overview" 
                              className="rounded-md border shadow-sm w-full"
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/e6f1fe/0a83f6?text=Dashboard+View';
                              }} 
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Key Features:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Your daily study progress</li>
                                <li>Next due tasks</li>
                                <li>Quick access to features</li>
                                <li>Personalized recommendations</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          The dashboard gives you a bird's eye view of your preparation. Check your progress, 
                          see important reminders, and easily access all features from here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="today" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-primary" />
                          Today's Plan
                        </CardTitle>
                        <CardDescription>Your daily study schedule and tasks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/today.png" 
                              alt="Today's plan view" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/e7f5e7/66bb6a?text=Today+Plan+View';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">What you'll find:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Daily tasks & schedules</li>
                                <li>Study session timers</li>
                                <li>Track completed activities</li>
                                <li>Focus mode</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Today's Plan helps you stay organized with a clear schedule of what to study, when to study, 
                          and how long to study for maximum productivity.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="learning" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <BookText className="h-5 w-5 text-primary" />
                          Learning Resources
                        </CardTitle>
                        <CardDescription>Concepts, flashcards and practice exams</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/learning.png" 
                              alt="Learning resources" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/e8eaf6/3f51b5?text=Learning+Resources';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-1">
                              <h4 className="font-semibold">Available tools:</h4>
                              <div className="text-sm space-y-1 text-muted-foreground ml-5">
                                <div className="flex items-center gap-1.5">
                                  <BookText className="h-3.5 w-3.5" />
                                  <span>Concept explanations</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  <span>Interactive flashcards</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <PenTool className="h-3.5 w-3.5" />
                                  <span>Practice exams</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Access a wealth of study resources to strengthen your understanding of key concepts, 
                          memorize important information through flashcards, and test your knowledge with practice exams.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="challenges" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          Daily Challenges
                        </CardTitle>
                        <CardDescription>Complete challenges, earn rewards, track achievements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/challenges.png" 
                              alt="Daily challenges" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/fff8e1/ffa000?text=Daily+Challenges';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Challenge yourself:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Daily, weekly, and special challenges</li>
                                <li>Track your streak</li>
                                <li>Earn badges and rewards</li>
                                <li>Compete with friends</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Make your study routine fun and engaging with challenges that keep you motivated.
                          Complete daily tasks, maintain study streaks, and earn achievements to track your progress.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="study-groups" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          Study Groups
                        </CardTitle>
                        <CardDescription>Collaborate and learn together</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/study-groups.png" 
                              alt="Study groups" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/e3f2fd/2196f3?text=Study+Groups';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Group features:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Join subject-specific groups</li>
                                <li>Share notes and resources</li>
                                <li>Group discussions</li>
                                <li>Peer review system</li>
                                <li>Group challenges</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Learn better together by joining study groups focused on specific subjects.
                          Collaborate with peers, share study materials, discuss concepts, and solve problems together.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="feel-good" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-pink-500" />
                          Feel Good Corner
                        </CardTitle>
                        <CardDescription>Take care of your mental wellbeing</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/feel-good.png" 
                              alt="Feel good corner" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/fce4ec/ec407a?text=Feel+Good+Corner';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Wellbeing tools:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Relaxation techniques</li>
                                <li>Study break activities</li>
                                <li>Exam stress management</li>
                                <li>Motivation boosters</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Studying hard is important, but so is your wellbeing. The Feel Good Corner helps you manage stress, 
                          take mindful breaks, and maintain balance during your exam preparation.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="voice-assistant" className="m-0 p-6 pt-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <Mic className="h-5 w-5 text-violet-500" />
                          Voice Intelligent Assistant
                        </CardTitle>
                        <CardDescription>Your personal AI voice study assistant</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-5 sm:col-span-3">
                            <img 
                              src="/images/tour/voice-assistant.png" 
                              alt="Voice assistant" 
                              className="rounded-md border shadow-sm w-full" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/800x500/ede7f6/7c4dff?text=Voice+Assistant';
                              }}
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-2">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Voice features:</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground ml-5 list-disc">
                                <li>Voice guidance and announcements</li>
                                <li>Multilingual support (including Hindi)</li>
                                <li>Study plan summaries</li>
                                <li>Quick answers to questions</li>
                                <li>Hands-free interaction</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Our Voice Intelligent Assistant helps you navigate the platform, provides audio guidance, 
                          and can answer your questions about your study plan and academic content. It supports 
                          multiple languages including Hindi to make your learning experience smoother.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </>
        )}

        <DialogFooter className="px-6 py-4 flex flex-row items-center justify-between border-t">
          <div>
            {!isFirstTab && (
              <Button variant="ghost" onClick={handlePrevTab}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onSkipTour}>
              {isLastTab ? "Skip Tour" : "Close"}
            </Button>
            
            {!isLastTab ? (
              <Button onClick={handleNextTab}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={onCompleteTour}>Complete Tour</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
