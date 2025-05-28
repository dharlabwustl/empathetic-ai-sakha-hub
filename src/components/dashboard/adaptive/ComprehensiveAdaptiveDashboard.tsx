import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  Zap,
  Award,
  Trophy,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Coffee,
  Sun,
  Moon,
  Sunset
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for dynamic suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Get time-based suggestions
  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      // Morning (5 AM - 12 PM)
      return {
        period: 'Morning',
        icon: <Sun className="h-4 w-4 text-orange-500" />,
        suggestions: [
          'Start with high-priority Physics concepts',
          'Review yesterday\'s Chemistry formulas',
          'Take a 15-min energy boost break'
        ]
      };
    } else if (hour >= 12 && hour < 17) {
      // Afternoon (12 PM - 5 PM)
      return {
        period: 'Afternoon',
        icon: <Sunset className="h-4 w-4 text-amber-500" />,
        suggestions: [
          'Practice Biology MCQs for better retention',
          'Focus on numerical problems in Physics',
          'Quick revision of weak areas'
        ]
      };
    } else if (hour >= 17 && hour < 21) {
      // Evening (5 PM - 9 PM)
      return {
        period: 'Evening',
        icon: <Coffee className="h-4 w-4 text-purple-500" />,
        suggestions: [
          'Solve previous year question papers',
          'Group study session for difficult topics',
          'Flashcard review for quick recall'
        ]
      };
    } else {
      // Night (9 PM - 5 AM)
      return {
        period: 'Night',
        icon: <Moon className="h-4 w-4 text-blue-500" />,
        suggestions: [
          'Light revision of completed topics',
          'Plan tomorrow\'s study schedule',
          'Relaxation and early sleep preparation'
        ]
      };
    }
  };

  const timeBasedContent = getTimeBasedSuggestions();

  // Mock data for NEET preparation
  const neetStrategyData = {
    currentStreak: 12,
    weeklyTarget: 35,
    weeklyProgress: 28,
    examCountdown: 180,
    todaysPriority: [
      { subject: 'Physics', topic: 'Thermodynamics', urgency: 'high', timeRequired: '45 min' },
      { subject: 'Chemistry', topic: 'Chemical Bonding', urgency: 'medium', timeRequired: '30 min' },
      { subject: 'Biology', topic: 'Cell Division', urgency: 'high', timeRequired: '40 min' }
    ]
  };

  const subjectBreakdown = [
    {
      subject: 'Physics',
      progress: 72,
      totalChapters: 30,
      completedChapters: 22,
      weakAreas: ['Thermodynamics', 'Optics'],
      strongAreas: ['Mechanics', 'Waves'],
      color: 'from-blue-500 to-blue-600',
      icon: <Target className="h-5 w-5" />
    },
    {
      subject: 'Chemistry',
      progress: 68,
      totalChapters: 28,
      completedChapters: 19,
      weakAreas: ['Organic Chemistry', 'Coordination'],
      strongAreas: ['Physical Chemistry', 'Inorganic'],
      color: 'from-green-500 to-green-600',
      icon: <Brain className="h-5 w-5" />
    },
    {
      subject: 'Biology',
      progress: 85,
      totalChapters: 25,
      completedChapters: 21,
      weakAreas: ['Ecology', 'Evolution'],
      strongAreas: ['Human Physiology', 'Plant Biology'],
      color: 'from-purple-500 to-purple-600',
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  const mockSubscription = {
    planType: "Premium",
    isActive: true,
    startDate: "2024-01-01",
    expiryDate: "2024-12-31",
    features: ["AI Tutor", "Practice Tests", "Study Plans"]
  };

  // Animation variants for pulsing borders
  const pulseVariants = {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.4)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  // Arrow blinking animation
  const arrowBlinkVariants = {
    animate: {
      opacity: [1, 0.3, 1],
      x: [0, 5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {userProfile.name || userProfile.firstName}! 🚀
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ready to conquer NEET 2026? Let's make today count!
          </p>
        </div>
        <Badge variant="outline" className="text-sm font-medium">
          {neetStrategyData.examCountdown} days to NEET 2026
        </Badge>
      </div>

      {/* Today's Top Priority Section with Premium Animations */}
      <motion.div 
        variants={pulseVariants}
        animate="animate"
        className="relative"
      >
        <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 relative overflow-hidden">
          {/* Animated Arrow Indicator */}
          <motion.div 
            variants={arrowBlinkVariants}
            animate="animate"
            className="absolute top-4 right-4 z-10"
          >
            <div className="flex items-center gap-1 text-blue-600">
              <span className="text-xs font-bold">PRIORITY</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
          
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full"
              >
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </motion.div>
              Today's Top Priority
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Badge className="bg-red-500 text-white animate-pulse">HIGH</Badge>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {neetStrategyData.todaysPriority.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={item.urgency === 'high' ? 'destructive' : 'secondary'}
                      className="w-2 h-2 rounded-full p-0"
                    />
                    <div>
                      <span className="font-medium">{item.subject}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">- {item.topic}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{item.timeRequired}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's NEET Study Plan with Premium Animations */}
      <motion.div 
        variants={pulseVariants}
        animate="animate"
        className="relative"
      >
        <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 relative overflow-hidden">
          {/* Animated Arrow Indicator */}
          <motion.div 
            variants={arrowBlinkVariants}
            animate="animate"
            className="absolute top-4 right-4 z-10"
          >
            <div className="flex items-center gap-1 text-purple-600">
              <span className="text-xs font-bold">STUDY PLAN</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
          
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full"
              >
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
              Today's NEET Study Plan
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">ACTIVE</Badge>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TodaysPlanSection currentMood={currentMood} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Dynamic Smart Suggestions based on Time */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {timeBasedContent.icon}
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg">
                {timeBasedContent.period} Smart Suggestions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Updated at {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="h-5 w-5 text-yellow-600" />
            </motion.div>
          </div>
          <SmartSuggestionBox 
            suggestions={timeBasedContent.suggestions}
            title={`${timeBasedContent.period} Focus Areas`}
          />
        </CardContent>
      </Card>

      {/* NEET 2026 Strategy Card */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Trophy className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            NEET 2026 Strategy Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{neetStrategyData.currentStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Study Streak</div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{neetStrategyData.weeklyProgress}/{neetStrategyData.weeklyTarget}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Hours</div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round((neetStrategyData.weeklyProgress / neetStrategyData.weeklyTarget) * 100)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Week Progress</div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{neetStrategyData.examCountdown}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days to NEET</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Weekly Target Progress</span>
              <span>{Math.round((neetStrategyData.weeklyProgress / neetStrategyData.weeklyTarget) * 100)}%</span>
            </div>
            <Progress 
              value={(neetStrategyData.weeklyProgress / neetStrategyData.weeklyTarget) * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjectBreakdown.map((subject, index) => (
          <Card key={subject.subject} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-r ${subject.color} rounded-full text-white`}>
                  {subject.icon}
                </div>
                {subject.subject}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{subject.completedChapters}</span> of {subject.totalChapters} chapters completed
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Weak Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {subject.weakAreas.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-red-200 text-red-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Strong Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {subject.strongAreas.map((area, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
