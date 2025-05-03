
import React, { useState, useEffect } from "react";
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
  BarChart3,
  PenTool,
  Clock,
  BookMarked
} from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount,
  open,
  onOpenChange
}) => {
  const [userData, setUserData] = useState<any>({});
  const [studyStats, setStudyStats] = useState({
    conceptCards: 135,
    flashCards: 240,
    examCards: 42,
    hoursAllocated: 180,
    subjectCount: 5,
    learningStyle: 'Visual-Kinesthetic',
    examGoal: 'NEET'
  });
  
  useEffect(() => {
    // Fetch user data from localStorage if available
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Customize study stats based on user data if available
      if (parsedData.goals && parsedData.goals.length > 0) {
        setStudyStats(prev => ({
          ...prev,
          examGoal: parsedData.goals[0].title || 'NEET'
        }));
      }
      
      if (parsedData.preferences && parsedData.preferences.learningStyle) {
        setStudyStats(prev => ({
          ...prev,
          learningStyle: parsedData.preferences.learningStyle
        }));
      }
    }
  }, []);
  
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
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xl text-white">AS</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mt-2">Amit Singh</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              
              <div className="md:w-2/3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                >
                  <blockquote className="space-y-2">
                    <p className="text-base italic">
                      "Welcome to PREPZR! Your personalized learning journey starts here."
                    </p>
                    <p className="text-base italic">
                      "At PREPZR, our mission is to make learning personalized, effective, and enjoyable. 
                      We've designed this platform to adapt to your unique needs, helping you reach your 
                      exam goals with less stress and greater confidence."
                    </p>
                    <p className="text-base italic">
                      "Our AI-powered platform supports you every step of the way—from creating smart 
                      study plans to tracking your progress and highlighting areas for improvement."
                    </p>
                    <p className="text-base italic">
                      "We're thrilled to be part of your success story. Let's crack it together! 💪"
                    </p>
                    <p className="text-right font-medium text-sm">
                      - Amit Singh, Founder & CEO, PREPZR
                    </p>
                  </blockquote>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-4 space-y-2"
                >
                  <h4 className="font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Your Personalized Study Resources
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                    >
                      <BookMarked className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{studyStats.flashCards}</p>
                        <p className="text-xs text-muted-foreground">Flashcards</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg"
                    >
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{studyStats.conceptCards}</p>
                        <p className="text-xs text-muted-foreground">Concept Cards</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg"
                    >
                      <PenTool className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">{studyStats.examCards}</p>
                        <p className="text-xs text-muted-foreground">Exam Cards</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                    >
                      <Clock className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">{studyStats.hoursAllocated}h</p>
                        <p className="text-xs text-muted-foreground">Study Hours</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Exam Goal:</span>
                      <span className="text-sm">{studyStats.examGoal}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium">Learning Style:</span>
                      <span className="text-sm">{studyStats.learningStyle}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          {/* Features Tab */}
          <TabsContent value="features" className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-5 my-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
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
              </motion.div>
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
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="space-y-1.5"
                  >
                    <h5 className="font-medium text-sm">1. Visit Today's Plan</h5>
                    <p className="text-sm text-muted-foreground">
                      Start with your Today's Plan to see what's scheduled for today. Complete the
                      tasks to stay on track with your study goals.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      onClick={() => {
                        onCompleteTour();
                        window.location.href = '/dashboard/student/today';
                      }}
                    >
                      Go to Today's Plan
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="space-y-1.5"
                  >
                    <h5 className="font-medium text-sm">2. Review Your Study Plan</h5>
                    <p className="text-sm text-muted-foreground">
                      Check your study plan in the Academic Advisor section. You can view your
                      progress, make adjustments, or create a new plan if needed.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      onClick={() => {
                        onCompleteTour();
                        window.location.href = '/dashboard/student/academic';
                      }}
                    >
                      Go to Academic Advisor
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="space-y-1.5"
                  >
                    <h5 className="font-medium text-sm">3. Practice with Learning Resources</h5>
                    <p className="text-sm text-muted-foreground">
                      Use our flashcards, concept cards, and practice exams to test your knowledge
                      and improve your understanding of key concepts.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
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
                        className="hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                        onClick={() => {
                          onCompleteTour();
                          window.location.href = '/dashboard/student/practice-exam';
                        }}
                      >
                        Practice Exams
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
              >
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
              </motion.div>
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
