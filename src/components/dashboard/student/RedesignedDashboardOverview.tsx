
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { motion } from 'framer-motion';
import TodayStudyPlan from './TodayStudyPlan';
import UpcomingTasks from './UpcomingTasks';
import WeeklyProgress from './WeeklyProgress';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodTracking from './MoodTracking';
import QuickAccessButtons from './QuickAccessButtons';
import MoodBasedPlanAdjuster from './mood-tracking/MoodBasedPlanAdjuster';
import { useMoodIntegration } from '@/hooks/useMoodIntegration';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const { currentMood, handleMoodChange, getMoodThemeClasses } = useMoodIntegration();
  const themeClasses = getMoodThemeClasses();

  // Mock data for today's tasks
  const todayTasks = [
    {
      id: "1",
      title: "Physics - Newton's Laws",
      time: "9:00 AM",
      type: "concept" as const,
      completed: false,
      route: "/dashboard/student/concepts/1"
    },
    {
      id: "2", 
      title: "Chemistry Practice Test",
      time: "11:00 AM",
      type: "exam" as const,
      completed: false,
      route: "/dashboard/student/practice-exam/2/start"
    },
    {
      id: "3",
      title: "Biology Flashcards",
      time: "2:00 PM", 
      type: "task" as const,
      completed: true,
      route: "/dashboard/student/flashcards/1/interactive"
    }
  ];

  const upcomingTasks = [
    {
      id: "1",
      title: "Complete Organic Chemistry",
      deadline: "Tomorrow",
      priority: "high" as const,
      route: "/dashboard/student/concepts/organic-chemistry"
    },
    {
      id: "2",
      title: "Physics Mock Test",
      deadline: "2 days",
      priority: "medium" as const,
      route: "/dashboard/student/practice-exam/1/start"
    },
    {
      id: "3",
      title: "Biology Revision",
      deadline: "3 days", 
      priority: "low" as const,
      route: "/dashboard/student/concepts/biology-basics"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userProfile.name || userProfile.firstName}! 👋
            </h1>
            <p className={`text-lg ${themeClasses.accent} mt-1`}>
              Ready to continue your learning journey?
            </p>
          </div>
          <QuickAccessButtons />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Study Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TodayStudyPlan tasks={todayTasks} />
            </motion.div>

            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WeeklyProgress />
            </motion.div>

            {/* Mood-Based Plan Adjuster */}
            {currentMood && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MoodBasedPlanAdjuster currentMood={currentMood} />
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Exam Goal Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ExamGoalCard 
                currentMood={currentMood}
                onMoodChange={handleMoodChange}
              />
            </motion.div>

            {/* Mood Tracking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MoodTracking />
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
