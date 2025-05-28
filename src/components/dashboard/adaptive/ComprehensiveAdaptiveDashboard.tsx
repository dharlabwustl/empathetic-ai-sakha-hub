
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';

// Enhanced components
import ExamReadinessSection from '@/components/dashboard/student/ExamReadinessSection';
import MoodBasedLearningOptimizer from '@/components/dashboard/student/mood-tracking/MoodBasedLearningOptimizer';
import NEETSpecificAITutor from '@/components/dashboard/student/ai-tutor/NEETSpecificAITutor';
import AdvancedConceptMastery from '@/components/dashboard/student/learning/AdvancedConceptMastery';
import DailySmartSuggestionsPanel from '@/components/dashboard/student/suggestions/DailySmartSuggestionsPanel';
import TodaysTopPriority from '@/components/dashboard/student/priority/TodaysTopPriority';
import TodaysNEETStudyPlan from '@/components/dashboard/student/study-plan/TodaysNEETStudyPlan';
import WeakStrongAreasSection from '@/components/dashboard/student/analytics/WeakStrongAreasSection';
import NEETStrategyCard from '@/components/dashboard/student/NEETStrategyCard';
import SubjectBreakdownSection from '@/components/dashboard/student/SubjectBreakdownSection';
import SurroundingInfluencesSection from '@/components/dashboard/student/SurroundingInfluencesSection';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Crown, Calendar, BookOpen, Target, Zap, User, Sparkles, TrendingUp } from 'lucide-react';

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
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  
  // Mock exam data - in real app this would come from user profile
  const examData = {
    exam: 'NEET 2026',
    daysToGo: 185,
    studyPace: 'moderate' as 'slow' | 'moderate' | 'fast',
    learnerStyle: 'Visual',
    mood: currentMood || MoodType.MOTIVATED
  };

  const weeklyTrendsData = [
    { week: '1', score: 30 },
    { week: '2', score: 35 },
    { week: '3', score: 40 },
    { week: '4', score: 38 },
    { week: '5', score: 45 },
    { week: '6', score: 52 },
    { week: '7', score: 58 }
  ];

  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Vectors'];
  const strongAreas = ['Algebra', 'Mechanics', 'Biology'];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20">
      {/* Top Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
        <Card className="relative bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{examData.exam}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Goal Exam</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{examData.daysToGo}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days to Go</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-green-600 dark:text-green-400 capitalize">{examData.studyPace}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Study Pace</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{examData.learnerStyle}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Learner Style</div>
              </div>
              <div className="space-y-1">
                <Badge className="text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 capitalize">
                  {examData.mood}
                </Badge>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Mood</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/dashboard/student/academic', '_blank')}
                className="mr-2"
              >
                Switch Exam or New Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse"></div>
        <Card className="relative bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-blue-500">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {userProfile.name}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Ready to ace your NEET preparation?</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Premium Plan</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expires: Dec 31, 2024</p>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank')}
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ExamReadinessSection 
              score={65}
              previousScore={58}
              weeklyTrends={weeklyTrendsData}
              weakAreas={weakAreas}
              strongAreas={strongAreas}
              predictedScore={78}
              recallMastery={82}
              averageExamScore={75}
            />
          </motion.div>

          {/* Today's Top Priority */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TodaysTopPriority />
          </motion.div>

          {/* Today's NEET Study Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TodaysNEETStudyPlan />
          </motion.div>

          {/* Mood-Based Learning */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MoodBasedLearningOptimizer 
              currentMood={currentMood}
              onMoodChange={onMoodChange}
            />
          </motion.div>

          {/* Advanced Concept Mastery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AdvancedConceptMastery />
          </motion.div>

          {/* Weak & Strong Areas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <WeakStrongAreasSection />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* NEET Strategy Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NEETStrategyCard 
              examProximity={examData.daysToGo}
              studyPace={examData.studyPace}
            />
          </motion.div>

          {/* AI Coach Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DailySmartSuggestionsPanel />
          </motion.div>

          {/* NEET AI Tutor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NEETSpecificAITutor />
          </motion.div>
        </div>
      </div>

      {/* Bottom Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <SubjectBreakdownSection />
      </motion.div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
