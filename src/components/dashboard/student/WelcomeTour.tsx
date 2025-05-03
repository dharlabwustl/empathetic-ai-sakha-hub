
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  BookMarked,
  Medal,
  Target,
  TrendingUp,
  Shield,
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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
    examGoal: 'NEET',
    completionRate: 87
  });
  const [activeTab, setActiveTab] = useState("founder");
  const [visitedTabs, setVisitedTabs] = useState<Record<string, boolean>>({
    founder: true, // Mark the first tab as visited by default
    resources: false,
    features: false,
    navigation: false
  });
  const [allTabsVisited, setAllTabsVisited] = useState(false);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const { toast } = useToast();
  
  // Tab order for navigation
  const tabOrder = ["founder", "resources", "features", "navigation"];
  
  // Check if all tabs have been visited
  useEffect(() => {
    const allVisited = Object.values(visitedTabs).every(visited => visited);
    setAllTabsVisited(allVisited);
    
    if (allVisited && !allTabsVisited) {
      toast({
        title: "All sections viewed!",
        description: "You can now complete the tour.",
        variant: "default"
      });
    }
  }, [visitedTabs]);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setVisitedTabs(prev => ({
      ...prev,
      [value]: true
    }));
    setShowSkipWarning(false);
  };

  // Navigate to the next tab
  const handleNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      const nextTab = tabOrder[currentIndex + 1];
      handleTabChange(nextTab);
    }
  };
  
  // Handle tour skip with warning if not all tabs visited
  const handleSkipAttempt = () => {
    if (!allTabsVisited) {
      setShowSkipWarning(true);
    } else {
      onSkipTour();
    }
  };
  
  // Confirm skipping despite warning
  const handleConfirmSkip = () => {
    onSkipTour();
  };
  
  useEffect(() => {
    // Fetch user data from localStorage if available
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Customize study stats based on user data if available
      if (parsedData.goal) {
        setStudyStats(prev => ({
          ...prev,
          examGoal: parsedData.goal
        }));
      }
      
      if (parsedData.personalityType) {
        setStudyStats(prev => ({
          ...prev,
          learningStyle: parsedData.personalityType
        }));
      }
    }
  }, []);

  // Get remaining tabs to visit
  const getRemainingTabs = () => {
    return Object.entries(visitedTabs)
      .filter(([_, visited]) => !visited)
      .map(([tabName, _]) => tabName);
  };

  // Is current tab the last tab?
  const isLastTab = activeTab === tabOrder[tabOrder.length - 1];
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent dialog from closing if trying to close with unvisited tabs
      if (!newOpen && !allTabsVisited) {
        setShowSkipWarning(true);
        return;
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>Welcome to PREPZR</span>
            <div className="flex items-center text-sm font-normal">
              {Object.entries(visitedTabs).map(([tab, visited]) => (
                <Badge 
                  key={tab} 
                  variant={visited ? "default" : "outline"}
                  className={`mx-1 ${visited ? "bg-green-600" : "text-gray-400"}`}
                >
                  {visited && <CheckCircle className="h-3 w-3 mr-1" />}
                  {tab === "founder" ? "1" : 
                   tab === "resources" ? "2" : 
                   tab === "features" ? "3" : "4"}
                </Badge>
              ))}
            </div>
          </DialogTitle>
          <DialogDescription className="text-base">
            {isFirstTimeUser
              ? "Let's help you get started with your learning journey!"
              : "Welcome back! Here's a quick refresher on using your dashboard."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="founder" className="mt-2" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="founder" className="relative">
              Welcome
              {visitedTabs.founder && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="resources" className="relative">
              Resources
              {visitedTabs.resources && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="features" className="relative">
              Features
              {visitedTabs.features && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="navigation" className="relative">
              Getting Started
              {visitedTabs.navigation && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
              )}
            </TabsTrigger>
          </TabsList>
          
          {/* Founder Message Tab */}
          <TabsContent value="founder" className="max-h-[50vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <Avatar className="h-32 w-32 border-2 border-primary">
                  <AvatarImage src="/lovable-uploads/9296075b-86c2-49b6-84c1-2679c2d4ed94.png" alt="Founder" />
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
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleNextTab} className="flex items-center">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          {/* Study Resources Tab */}
          <TabsContent value="resources" className="max-h-[50vh] overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-lg flex items-center gap-1">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Your Personalized Study Resources
                </h4>
                <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full">
                  Premium
                </span>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-blue-900/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
                      <BookMarked className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-blue-700 dark:text-blue-300">{studyStats.flashCards}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Flashcards</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-purple-900/40 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
                  >
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                      <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-purple-700 dark:text-purple-300">{studyStats.conceptCards}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Concept Cards</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-amber-900/40 p-4 rounded-lg border border-amber-200 dark:border-amber-800"
                  >
                    <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800">
                      <PenTool className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-amber-700 dark:text-amber-300">{studyStats.examCards}</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">Exam Cards</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    className="flex items-center gap-3 bg-white/80 dark:bg-green-900/40 p-4 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
                      <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-green-700 dark:text-green-300">{studyStats.hoursAllocated}h</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Study Hours</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-800/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Exam Goal</span>
                      </div>
                      <span className="text-sm bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-300 font-medium">
                        {studyStats.examGoal}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Learning Style</span>
                      </div>
                      <span className="text-sm bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-300 font-medium">
                        {studyStats.learningStyle}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 p-3 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-800/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Completion</span>
                      </div>
                      <span className="text-sm bg-green-500/10 px-2 py-0.5 rounded-full text-green-700 dark:text-green-300 font-medium">
                        {studyStats.completionRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Medal className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Subjects</span>
                      </div>
                      <span className="text-sm bg-amber-500/10 px-2 py-0.5 rounded-full text-amber-700 dark:text-amber-300 font-medium">
                        {studyStats.subjectCount} core
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleNextTab} className="flex items-center">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
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
                    Get instant help with concepts, problem-solving, and study strategies from our AI tutor that
                    understands your learning style and academic goals.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleNextTab} className="flex items-center">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          {/* Navigation Tab */}
          <TabsContent value="navigation" className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-6 py-2">
              <h3 className="text-lg font-medium">Getting Started with PREPZR</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
                    <span className="font-semibold text-blue-600 dark:text-blue-300">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Complete Your Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your learning preferences, goals, and exam details are up to date 
                      for the most personalized experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-300">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Review Your Study Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your personalized study plan in the Academic Advisor section and make 
                      adjustments if needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
                    <span className="font-semibold text-purple-600 dark:text-purple-300">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Start with Today's Tasks</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin your learning journey with the scheduled tasks in Today's Plan for 
                      optimal progress.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-800">
                    <span className="font-semibold text-rose-600 dark:text-rose-300">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Track Your Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor your learning progress on the dashboard and adjust your pace based 
                      on your performance metrics.
                    </p>
                  </div>
                </div>
              </div>

              {suggestedNextAction && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-100 dark:border-blue-800"
                >
                  <h4 className="font-medium mb-1 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                    Suggested Next Step
                  </h4>
                  <p className="text-sm">{suggestedNextAction}</p>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {showSkipWarning && (
          <Alert variant="warning" className="mt-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              You haven't viewed all sections yet. Please visit the remaining tabs to get the complete understanding.
              {getRemainingTabs().length > 0 && (
                <p className="mt-1 text-sm">
                  <span className="font-semibold">Remaining sections:</span>{" "}
                  {getRemainingTabs().map(tab => 
                    tab === "founder" ? "Welcome" : 
                    tab === "resources" ? "Resources" : 
                    tab === "features" ? "Features" : "Getting Started"
                  ).join(", ")}
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2 mt-4">
          {!showSkipWarning ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleSkipAttempt}
              >
                {allTabsVisited ? "Skip Tour" : "Skip for Now"}
              </Button>
              <Button 
                onClick={onCompleteTour} 
                disabled={!allTabsVisited}
                className={!allTabsVisited ? "opacity-50 cursor-not-allowed" : ""}
              >
                {allTabsVisited ? "Complete Tour" : "View All Sections to Complete"}
                {allTabsVisited && <CheckCircle className="ml-2 h-4 w-4" />}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowSkipWarning(false)}
              >
                Continue Tour
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirmSkip}
              >
                Skip Anyway
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
