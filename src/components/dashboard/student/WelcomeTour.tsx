
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronRight, GraduationCap, CalendarDays, BookOpen, Headphones, Users, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  showVoiceAssistantTab?: boolean;
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
  showVoiceAssistantTab = false
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [completedTabs, setCompletedTabs] = useState<Record<string, boolean>>({});

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCompletedTabs(prev => ({ ...prev, [value]: true }));
  };

  const allTabs = ["dashboard", "academic", "practice", showVoiceAssistantTab ? "voice" : null, "community", "notifications"].filter(Boolean) as string[];
  const allTabsCompleted = allTabs.every(tab => completedTabs[tab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <span className="bg-primary text-primary-foreground size-8 rounded-full inline-flex items-center justify-center mr-2">
              <GraduationCap className="size-5" />
            </span>
            Welcome to PREPZR
          </DialogTitle>
          <DialogDescription>
            Let's take a quick tour to help you get familiar with your personalized learning platform.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mb-4 w-full justify-start overflow-x-auto">
              <TabsTrigger value="dashboard" className="flex gap-2 items-center">
                {completedTabs["dashboard"] ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <span className="size-4 rounded-full bg-muted flex items-center justify-center text-xs">1</span>
                )}
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex gap-2 items-center">
                {completedTabs["academic"] ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <span className="size-4 rounded-full bg-muted flex items-center justify-center text-xs">2</span>
                )}
                Academic
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex gap-2 items-center">
                {completedTabs["practice"] ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <span className="size-4 rounded-full bg-muted flex items-center justify-center text-xs">3</span>
                )}
                Practice
              </TabsTrigger>
              {showVoiceAssistantTab && (
                <TabsTrigger value="voice" className="flex gap-2 items-center">
                  {completedTabs["voice"] ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <span className="size-4 rounded-full bg-muted flex items-center justify-center text-xs">4</span>
                  )}
                  Voice Assistant
                </TabsTrigger>
              )}
              <TabsTrigger value="community" className="flex gap-2 items-center">
                {completedTabs["community"] ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <span className={`size-4 rounded-full bg-muted flex items-center justify-center text-xs`}>
                    {showVoiceAssistantTab ? "5" : "4"}
                  </span>
                )}
                Community
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2 items-center">
                {completedTabs["notifications"] ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <span className={`size-4 rounded-full bg-muted flex items-center justify-center text-xs`}>
                    {showVoiceAssistantTab ? "6" : "5"}
                  </span>
                )}
                Notifications
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="dashboard" className="mt-0 h-full">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CalendarDays className="size-5 text-primary" />
                    Your Personalized Dashboard
                  </h2>
                  <p>Your dashboard provides a complete overview of your study progress, upcoming tasks, and personalized recommendations.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Today's Plan</h3>
                      <p className="text-sm text-muted-foreground mb-2">View your personalized study plan for today with subject-wise breakdown.</p>
                      <div className="text-xs text-primary flex items-center">
                        Check daily progress <ChevronRight className="size-3 ml-1" />
                      </div>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Progress Tracking</h3>
                      <p className="text-sm text-muted-foreground mb-2">Track your improvement in weak areas and get personalized insights.</p>
                      <div className="text-xs text-primary flex items-center">
                        View detailed analytics <ChevronRight className="size-3 ml-1" />
                      </div>
                    </Card>
                  </div>

                  {(lastActivity || suggestedNextAction) && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Your Activity</h3>
                      {lastActivity && (
                        <p className="text-sm mb-2">
                          <span className="font-medium">Last activity:</span> {lastActivity.description}
                        </p>
                      )}
                      {suggestedNextAction && (
                        <p className="text-sm">
                          <span className="font-medium">Suggested next:</span> {suggestedNextAction}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="academic" className="mt-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <GraduationCap className="size-5 text-primary" />
                    Academic Advisor
                  </h2>
                  <p>Plan your study journey with personalized study plans based on your goal, strengths, and weaknesses.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Create Study Plans</h3>
                      <p className="text-sm text-muted-foreground mb-2">Design custom study plans for your exam with subject-wise breakdown and scheduling.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Track Progress</h3>
                      <p className="text-sm text-muted-foreground mb-2">Monitor your preparation with detailed analytics and progress indicators.</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="practice" className="mt-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="size-5 text-primary" />
                    Study & Practice
                  </h2>
                  <p>Access comprehensive learning resources and practice tools to excel in your exams.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Concepts</h3>
                      <p className="text-sm text-muted-foreground mb-2">Study key concepts with detailed explanations and visual aids.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Flashcards</h3>
                      <p className="text-sm text-muted-foreground mb-2">Practice with interactive flashcards for quick revision and retention.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Practice Tests</h3>
                      <p className="text-sm text-muted-foreground mb-2">Take timed tests to evaluate your exam readiness and identify weak areas.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Daily Challenges</h3>
                      <p className="text-sm text-muted-foreground mb-2">Complete daily challenges to improve consistency and track your streaks.</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {showVoiceAssistantTab && (
                <TabsContent value="voice" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Headphones className="size-5 text-primary" />
                      Voice Intelligent Assistant
                    </h2>
                    <p>Your personal AI-powered voice assistant is here to help with all your study needs.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className={cn("p-4")}>
                        <h3 className="font-medium mb-2">Voice Commands</h3>
                        <p className="text-sm text-muted-foreground mb-2">Ask questions, get explanations, and navigate the platform using voice commands.</p>
                      </Card>

                      <Card className={cn("p-4")}>
                        <h3 className="font-medium mb-2">Study Support</h3>
                        <p className="text-sm text-muted-foreground mb-2">Get instant help with concepts, formulas, and problem-solving techniques.</p>
                      </Card>

                      <Card className={cn("p-4", "md:col-span-2")}>
                        <h3 className="font-medium mb-2">24/7 Assistance</h3>
                        <p className="text-sm text-muted-foreground mb-2">Your voice assistant is available anytime to answer queries about your exam preparation.</p>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="community" className="mt-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="size-5 text-primary" />
                    Community Features
                  </h2>
                  <p>Connect with fellow students, join study groups, and learn collaboratively.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Study Groups</h3>
                      <p className="text-sm text-muted-foreground mb-2">Join or create study groups for collaborative learning and peer support.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Discussion Forums</h3>
                      <p className="text-sm text-muted-foreground mb-2">Participate in topic-specific discussions to clarify doubts and share knowledge.</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bell className="size-5 text-primary" />
                    Notifications & Reminders
                  </h2>
                  <p>Stay updated with personalized notifications about your study schedule, upcoming exams, and new features.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Study Reminders</h3>
                      <p className="text-sm text-muted-foreground mb-2">Get timely reminders for your scheduled study sessions and tasks.</p>
                    </Card>

                    <Card className={cn("p-4")}>
                      <h3 className="font-medium mb-2">Progress Updates</h3>
                      <p className="text-sm text-muted-foreground mb-2">Receive regular updates about your progress and achievements.</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="pt-4">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onSkipTour}>
              Skip Tour
            </Button>
            <div className="flex gap-2">
              {!allTabsCompleted ? (
                <Button onClick={() => {
                  // Find the next tab to navigate to
                  const currentIndex = allTabs.indexOf(activeTab);
                  if (currentIndex < allTabs.length - 1) {
                    handleTabChange(allTabs[currentIndex + 1]);
                  }
                }}>
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={onCompleteTour} className="bg-green-600 hover:bg-green-700">
                  Complete Tour <Check className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
