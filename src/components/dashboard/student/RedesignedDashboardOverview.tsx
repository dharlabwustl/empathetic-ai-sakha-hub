
import React, { useState, useEffect } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { motion } from 'framer-motion';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import QuickAccessButtons from './QuickAccessButtons';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressOverview from './dashboard-sections/ProgressOverview';
import UpcomingTasks from './UpcomingTasks';
import EnhancedMoodLogButton from './enhanced/EnhancedMoodLogButton';
import { getCurrentMoodFromLocalStorage, getMoodThemeClasses } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());
  const [dashboardTheme, setDashboardTheme] = useState<string>('');

  useEffect(() => {
    // Apply mood-based theme classes
    if (currentMood) {
      const themeClass = getMoodThemeClasses(currentMood);
      setDashboardTheme(themeClass);
      
      // Apply to document body for global theming
      document.body.className = document.body.className.replace(/mood-\w+/g, '');
      if (themeClass) {
        document.body.classList.add(themeClass);
      }
    }
  }, [currentMood]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // The EnhancedMoodLogButton will handle localStorage and theme updates
  };

  const handleThemeChange = (theme: string) => {
    setDashboardTheme(theme);
  };

  // Mock data for upcoming tasks with mood-adjusted priorities
  const upcomingTasks = [
    {
      id: '1',
      title: 'Complete Physics Concepts',
      subject: 'Physics',
      type: 'concept' as const,
      timeEstimate: 45,
      dueDate: 'Today',
      priority: 'high' as const
    },
    {
      id: '2', 
      title: 'Biology Flashcards Review',
      subject: 'Biology',
      type: 'flashcard' as const,
      timeEstimate: 20,
      dueDate: 'Today',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Chemistry Practice Test',
      subject: 'Chemistry', 
      type: 'exam' as const,
      timeEstimate: 60,
      dueDate: 'Tomorrow',
      priority: 'high' as const
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${dashboardTheme}`}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header with Mood Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userProfile.name || userProfile.firstName || 'Student'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Ready to continue your learning journey today?
            </p>
          </div>
          
          <EnhancedMoodLogButton
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
            onThemeChange={handleThemeChange}
            size="default"
            showLabel={true}
            className="shadow-lg"
          />
        </motion.div>

        {/* Quick Access Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <QuickAccessButtons />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Goal Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ExamGoalCard 
                currentMood={currentMood}
                onMoodChange={handleMoodChange}
              />
            </motion.div>

            {/* Today's Plan Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TodaysPlanSection currentMood={currentMood} />
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ProgressOverview />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Mood-Based Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MoodBasedSuggestions 
                currentMood={currentMood}
                onMoodSelect={handleMoodChange}
              />
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <UpcomingTasks tasks={upcomingTasks} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
