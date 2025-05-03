
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight, 
  CheckCircle, 
  Lightbulb, 
  Calendar, 
  GraduationCap, 
  Brain, 
  BookOpen, 
  UserRound, 
  Sparkles,
  BarChart3
} from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to PREPZR</DialogTitle>
          <DialogDescription className="text-base">
            {isFirstTimeUser
              ? "Let's help you get started with your learning journey!"
              : "Welcome back! Here's a quick refresher on using your dashboard."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="welcome" className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="navigation">Getting Started</TabsTrigger>
          </TabsList>
          
          {/* Welcome Tab */}
          <TabsContent value="welcome" className="max-h-[50vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <Avatar className="h-32 w-32 border-2 border-primary">
                  <AvatarImage src="/images/founder.jpg" alt="Founder" />
                  <AvatarFallback className="bg-primary/20 text-lg">RA</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mt-2">Rahul Agarwal</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <blockquote className="space-y-2">
                    <p className="text-base italic">
                      "Welcome to PREPZR! Our mission is to make learning personalized, effective, and 
                      enjoyable. We've built this platform to adapt to your needs and help you achieve 
                      your academic goals with less stress and better results."
                    </p>
                    <p className="text-base italic">
                      "Our AI-powered platform will guide you through every step of your learning journey, 
                      from creating personalized study plans to tracking your progress and identifying areas 
                      for improvement. We're excited to be part of your success story!"
                    </p>
                  </blockquote>
                </div>
                
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Our Promise to You
                  </h4>
                  <ul className="text-sm space-y-1.5 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Personalized learning experiences tailored to your needs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Constantly evolving AI tools to enhance your study efficiency</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Data-driven insights to help you optimize your study time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Supportive community of learners and educators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features" className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-5 my-2">
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium">Personalized Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Your dashboard adapts to your learning style and goals, showing the most relevant 
                    information and activities based on your progress.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">Today's Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Your daily tasks are organized here based on your study plan. We intelligently schedule 
                    reviews, new content, and practice sessions to optimize your learning.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium">Academic Advisor</h4>
                  <p className="text-sm text-muted-foreground">
                    Create and manage personalized study plans based on your exam goals, strengths, and weaknesses.
                    Track your progress across different subjects and adjust your plan as needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium">Learning Resources</h4>
                  <p className="text-sm text-muted-foreground">
                    Access flashcards, concept cards, and practice exams that adapt to your knowledge gaps
                    and learning style, helping you focus on what matters most.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium">AI Tutor</h4>
                  <p className="text-sm text-muted-foreground">
                    Get personalized help with difficult concepts, step-by-step problem solving,
                    and detailed explanations whenever you're stuck.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/30">
                  <UserRound className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h4 className="font-medium">Wellness & Mood Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    We care about your wellbeing! Track your mood, get personalized wellness tips,
                    and access resources to help you maintain a healthy study-life balance.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Navigation Tab */}
          <TabsContent value="navigation" className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                  Getting Started
                </h4>
                <div className="ml-7 space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="font-medium text-sm">1. Visit Today's Plan</h5>
                    <p className="text-sm text-muted-foreground">
                      Start with your Today's Plan to see what's scheduled for today. Complete the
                      tasks to stay on track with your study goals.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => {
                        onCompleteTour();
                        window.location.href = '/dashboard/student/today';
                      }}
                    >
                      Go to Today's Plan
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h5 className="font-medium text-sm">2. Review Your Study Plan</h5>
                    <p className="text-sm text-muted-foreground">
                      Check your study plan in the Academic Advisor section. You can view your
                      progress, make adjustments, or create a new plan if needed.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => {
                        onCompleteTour();
                        window.location.href = '/dashboard/student/academic';
                      }}
                    >
                      Go to Academic Advisor
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h5 className="font-medium text-sm">3. Practice with Learning Resources</h5>
                    <p className="text-sm text-muted-foreground">
                      Use our flashcards, concept cards, and practice exams to test your knowledge
                      and improve your understanding of key concepts.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          onCompleteTour();
                          window.location.href = '/dashboard/student/flashcards';
                        }}
                      >
                        Flashcards
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          onCompleteTour();
                          window.location.href = '/dashboard/student/practice-exam';
                        }}
                      >
                        Practice Exams
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 pt-0.5">•</div>
                    <p>Complete at least one flashcard session daily to strengthen your memory</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 pt-0.5">•</div>
                    <p>Use the AI Tutor whenever you get stuck on a difficult concept</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 pt-0.5">•</div>
                    <p>Track your mood daily for personalized wellness tips</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 pt-0.5">•</div>
                    <p>Take practice tests regularly to identify knowledge gaps</p>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between pt-4">
          <Button variant="outline" onClick={onSkipTour}>
            Skip Tour
          </Button>
          <Button onClick={onCompleteTour} className="flex items-center gap-2">
            Let's Begin <ChevronRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
