
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, Brain, Zap, BookOpen, Trophy, TrendingUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dashboard Components
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import NEETStrategyCard from './NEETStrategyCard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis?: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis = []
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  // Sample data for demonstration
  const examReadinessScore = 75;
  const weeklyStudyStreak = 5;
  const averageStudyTime = 4.5;
  const completedTopics = 145;
  const totalTopics = 200;
  const upcomingTests = 3;

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // Save mood to localStorage or context
    localStorage.setItem('currentMood', mood);
  };

  // Load mood from localStorage on component mount
  React.useEffect(() => {
    const savedMood = localStorage.getItem('currentMood') as MoodType;
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {userProfile.name}! 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to conquer your exam goals today?
        </p>
      </motion.div>

      {/* Top Priority Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TodaysTopPrioritySection />
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Primary Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness and Study Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <EnhancedExamReadinessScore 
                score={examReadinessScore}
                previousScore={68}
                trend="up"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StudyStatsSection 
                weeklyStreak={weeklyStudyStreak}
                averageStudyTime={averageStudyTime}
                completedTopics={completedTopics}
                totalTopics={totalTopics}
              />
            </motion.div>
          </div>

          {/* Today's Plan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TodaysPlanSection />
          </motion.div>

          {/* Subject Breakdown and Progress Tracker Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SubjectBreakdownSection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ProgressTrackerSection />
            </motion.div>
          </div>

          {/* Revision Loop Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <RevisionLoopSection />
          </motion.div>
        </div>

        {/* Right Column - Secondary Content */}
        <div className="space-y-6">
          {/* Exam Goal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExamGoalCard 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
          </motion.div>

          {/* Mood-Based Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MoodBasedSuggestions 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
          </motion.div>

          {/* NEET Strategy Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NEETStrategyCard />
          </motion.div>

          {/* Upcoming Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <UpcomingMilestonesSection />
          </motion.div>

          {/* Smart Suggestions Center */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SmartSuggestionsCenter />
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="text-center">
          <CardContent className="pt-4">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{weeklyStudyStreak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-4">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{averageStudyTime}h</p>
            <p className="text-sm text-gray-600">Daily Avg</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-4">
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedTopics}</p>
            <p className="text-sm text-gray-600">Topics Done</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-4">
            <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{upcomingTests}</p>
            <p className="text-sm text-gray-600">Tests Due</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
