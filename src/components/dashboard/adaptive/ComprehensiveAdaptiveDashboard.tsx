
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Star,
  Zap,
  ArrowRight,
  ChevronRight,
  Brain,
  Award,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Coffee,
  Moon,
  Sun,
  Sunrise,
  Sunset
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import NEETStrategyCard from '../student/NEETStrategyCard';
import SmartSuggestionsCenter from '../student/dashboard-sections/SmartSuggestionsCenter';

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

  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        period: "Morning",
        icon: <Sunrise className="h-5 w-5 text-orange-500" />,
        suggestions: [
          "Start with difficult concepts - your brain is fresh! 🧠",
          "Review yesterday's flashcards for retention",
          "Set 3 clear goals for today's study session"
        ],
        color: "from-orange-50 to-yellow-50",
        borderColor: "border-orange-200"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        period: "Afternoon",
        icon: <Sun className="h-5 w-5 text-yellow-500" />,
        suggestions: [
          "Perfect time for practice tests and problem solving",
          "Take short breaks every 45 minutes",
          "Focus on weak areas identified this morning"
        ],
        color: "from-yellow-50 to-amber-50",
        borderColor: "border-yellow-200"
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        period: "Evening",
        icon: <Sunset className="h-5 w-5 text-purple-500" />,
        suggestions: [
          "Review today's learning with flashcards",
          "Plan tomorrow's study schedule",
          "Light revision of easy topics"
        ],
        color: "from-purple-50 to-pink-50",
        borderColor: "border-purple-200"
      };
    } else {
      return {
        period: "Night",
        icon: <Moon className="h-5 w-5 text-blue-500" />,
        suggestions: [
          "Light reading or concept revision only",
          "Prepare materials for tomorrow",
          "Consider getting good rest for better retention"
        ],
        color: "from-blue-50 to-indigo-50",
        borderColor: "border-blue-200"
      };
    }
  };

  const timeBasedData = getTimeBasedSuggestions();

  // Mock performance data
  const performance = {
    accuracy: 78,
    quizScores: 85,
    conceptProgress: 72,
    streak: 7
  };

  // Subject breakdown data
  const subjectData = [
    { subject: "Physics", completed: 15, total: 25, color: "bg-blue-500", percentage: 60 },
    { subject: "Chemistry", completed: 18, total: 22, color: "bg-purple-500", percentage: 82 },
    { subject: "Biology", completed: 12, total: 20, color: "bg-green-500", percentage: 60 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {userProfile.name}! 🌟
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
            Let's make today count towards your NEET 2026 goal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
            Day {performance.streak} streak 🔥
          </Badge>
        </div>
      </div>

      {/* Top Priority Section with Premium Animation */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 rounded-lg border-2 border-gradient-to-r from-violet-500 via-purple-500 to-pink-500 animate-pulse opacity-60"></div>
          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-violet-400 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2s' }}></div>
        </div>
        
        {/* Blinking Arrow */}
        <motion.div
          className="absolute -left-8 top-1/2 transform -translate-y-1/2"
          animate={{ 
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="h-6 w-6 text-violet-500" />
        </motion.div>

        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 relative z-10">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-violet-100 rounded-full"
              >
                <Target className="h-6 w-6 text-violet-600" />
              </motion.div>
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold">
                Today's Top Priority
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Badge className="bg-red-500 text-white animate-pulse">URGENT</Badge>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 p-4 rounded-lg border border-violet-200">
                <h3 className="font-semibold text-violet-800 mb-2">Focus Area</h3>
                <p className="text-sm text-gray-700">Organic Chemistry - Reaction Mechanisms</p>
                <div className="mt-2">
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">65% complete</p>
                </div>
              </div>
              <div className="bg-white/80 p-4 rounded-lg border border-violet-200">
                <h3 className="font-semibold text-violet-800 mb-2">Practice Target</h3>
                <p className="text-sm text-gray-700">50 MCQs + 2 Mock Tests</p>
                <div className="mt-2">
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">15/50 MCQs done</p>
                </div>
              </div>
              <div className="bg-white/80 p-4 rounded-lg border border-violet-200">
                <h3 className="font-semibold text-violet-800 mb-2">Time Goal</h3>
                <p className="text-sm text-gray-700">4 hours focused study</p>
                <div className="mt-2">
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">1.8/4 hours completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* NEET Study Plan Section with Premium Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-lg">
              <div className="absolute inset-0 rounded-lg border-2 border-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse opacity-60"></div>
              <div className="absolute inset-0 rounded-lg border-2 border-dotted border-orange-400" style={{ animationDelay: '1s', animation: 'pulse 2s infinite' }}></div>
            </div>
            
            {/* Blinking Arrow */}
            <motion.div
              className="absolute -left-8 top-1/2 transform -translate-y-1/2"
              animate={{ 
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <ChevronRight className="h-6 w-6 text-orange-500" />
            </motion.div>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 relative z-10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="p-2 bg-orange-100 rounded-full"
                  >
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-bold">
                    Today's NEET Study Plan
                  </span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Badge className="bg-green-500 text-white">ON TRACK</Badge>
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {subjectData.map((subject, index) => (
                    <motion.div
                      key={subject.subject}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 p-4 rounded-lg border border-orange-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                        <Badge variant="outline" className="text-xs">
                          {subject.percentage}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={subject.percentage} className="h-2" />
                        <p className="text-xs text-gray-600">
                          {subject.completed}/{subject.total} concepts completed
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-white/80 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">Today's Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>9:00-10:30 AM: Physics - Mechanics ✓</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>11:00-12:30 PM: Chemistry - Organic (Current)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>2:00-3:30 PM: Biology - Genetics</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>4:00-5:00 PM: Mock Test Practice</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>6:00-7:00 PM: Revision & Flashcards</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>8:00-9:00 PM: Doubt Clearing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Study Concepts</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Target className="h-5 w-5" />
                  <span className="text-xs">Practice Test</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Star className="h-5 w-5" />
                  <span className="text-xs">Flashcards</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{performance.accuracy}%</div>
                  <div className="text-sm text-blue-600">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{performance.quizScores}</div>
                  <div className="text-sm text-green-600">Avg Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{performance.conceptProgress}%</div>
                  <div className="text-sm text-purple-600">Concepts</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{performance.streak}</div>
                  <div className="text-sm text-orange-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* NEET Strategy Card */}
          <NEETStrategyCard />

          {/* Dynamic Smart Suggestions */}
          <motion.div
            key={timeBasedData.period}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`bg-gradient-to-br ${timeBasedData.color} ${timeBasedData.borderColor} border-2`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {timeBasedData.icon}
                  {timeBasedData.period} Suggestions
                  <Badge variant="outline" className="ml-auto text-xs">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {timeBasedData.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white/80 rounded-lg border border-white/50 text-sm"
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Smart Suggestions Center */}
          <SmartSuggestionsCenter performance={performance} />

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-sm">Mock Test</div>
                <div className="text-xs text-gray-600">Tomorrow, 2:00 PM</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-sm">Chemistry Revision</div>
                <div className="text-xs text-gray-600">Friday, 4:00 PM</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
