
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Star, 
  TrendingUp, 
  Calendar,
  Brain,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Smile,
  Coffee,
  Moon,
  Sun,
  Sunset
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import SubscriptionBanner from '../student/SubscriptionBanner';
import NEETStrategyCard from '../student/NEETStrategyCard';
import SubjectBreakdownSection from '../student/SubjectBreakdownSection';
import { QuickAccess } from '../student/QuickAccess';
import TodaysPlanSection from '../student/dashboard-sections/TodaysPlanSection';
import { SmartSuggestionBox } from '../student/shared/SmartSuggestionBox';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for dynamic suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM)
      return [
        "Start with difficult concepts when your mind is fresh",
        "Review yesterday's topics for better retention",
        "Focus on Physics problem-solving in the morning"
      ];
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM)
      return [
        "Perfect time for Chemistry numerical problems",
        "Take practice tests to assess your progress",
        "Review flashcards during your lunch break"
      ];
    } else if (hour >= 17 && hour < 21) {
      // Evening (5 PM - 9 PM)
      return [
        "Biology memorization works best in evening",
        "Solve previous year questions for exam prep",
        "Create summary notes for quick revision"
      ];
    } else {
      // Night (9 PM - 5 AM)
      return [
        "Light revision of concepts before sleep",
        "Review important formulas and equations",
        "Plan tomorrow's study schedule"
      ];
    }
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return <Sun className="h-4 w-4 text-yellow-500" />;
    } else if (hour >= 12 && hour < 17) {
      return <Sun className="h-4 w-4 text-orange-500" />;
    } else if (hour >= 17 && hour < 21) {
      return <Sunset className="h-4 w-4 text-purple-500" />;
    } else {
      return <Moon className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTimeLabel = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Morning Focus";
    } else if (hour >= 12 && hour < 17) {
      return "Afternoon Power";
    } else if (hour >= 17 && hour < 21) {
      return "Evening Study";
    } else {
      return "Night Review";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto p-4 lg:p-6 space-y-6">
        {/* Subscription Banner */}
        <SubscriptionBanner subscription={userProfile.subscription} />
        
        {/* Quick Access */}
        <QuickAccess />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Top Priority - WITH ANIMATIONS */}
            <motion.div
              className="relative"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0)",
                  "0 0 0 4px rgba(139, 92, 246, 0.3)",
                  "0 0 0 0 rgba(139, 92, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Animated Arrow Pointer */}
              <motion.div
                className="absolute -top-8 left-4 z-10"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Target className="h-4 w-4" />
                  START HERE!
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    Today's Top Priority
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className="bg-red-500 text-white animate-pulse">URGENT</Badge>
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-l-red-500">
                      <h3 className="font-semibold text-lg mb-2">Clear Physics Backlog</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Complete pending Newton's Laws concepts and solve 10 numerical problems
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>2 hours estimated</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => navigate('/dashboard/student/concepts')}
                        >
                          Start Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's NEET Study Plan - WITH ANIMATIONS */}
            <motion.div
              className="relative"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                  "0 0 0 4px rgba(34, 197, 94, 0.3)",
                  "0 0 0 0 rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Animated Arrow Pointer */}
              <motion.div
                className="absolute -top-8 right-4 z-10"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  FOLLOW THIS!
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>

              <TodaysPlanSection studyPlan={null} currentMood={currentMood} />
            </motion.div>

            {/* Dynamic Smart Suggestions */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  {getTimeIcon()}
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    {getTimeLabel()} - Smart Suggestions
                  </h3>
                  <Badge variant="outline" className="text-xs bg-white dark:bg-gray-800">
                    Auto-updates every minute
                  </Badge>
                </div>
                <div className="space-y-2">
                  {getTimeBasedSuggestions().map((suggestion, index) => (
                    <Badge key={index} variant="outline" className="text-blue-800 dark:text-blue-200 border-blue-300">
                      {suggestion}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {currentTime.toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>

            {/* Subject Breakdown Section */}
            <SubjectBreakdownSection />
          </div>

          {/* Right Column - Side Content */}
          <div className="space-y-6">
            {/* NEET Strategy Card */}
            <NEETStrategyCard />

            {/* AI Coach Card */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  24/7 AI Coach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Get instant help with concepts, problem-solving, and study planning
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate('/dashboard/student/tutor')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI Tutor
                </Button>
              </CardContent>
            </Card>

            {/* Feel Good Corner */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smile className="h-5 w-5 text-green-600" />
                  Feel Good Corner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Boost your motivation with inspiring content and success stories
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/dashboard/student/feel-good-corner')}
                >
                  <Smile className="h-4 w-4 mr-2" />
                  Get Motivated
                </Button>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-600" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Study Streak</span>
                      <span className="font-medium">12 days 🔥</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Exam Readiness</span>
                      <span className="font-medium">74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/dashboard/student/analytics')}
                >
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
