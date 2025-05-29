
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile, Kpi } from '@/types/user';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

// Dashboard sections
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import NEETStrategyCard from './NEETStrategyCard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: Kpi[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {userProfile.name || userProfile.firstName}! 
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's continue your NEET preparation journey
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Priority & Plan */}
          <div className="lg:col-span-2 space-y-6">
            <TodaysTopPrioritySection />
            <TodaysPlanSection currentMood={currentMood} />
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            <ExamGoalCard 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
            <MoodBasedSuggestions 
              currentMood={currentMood}
              onMoodSelect={handleMoodChange}
            />
            <NEETStrategyCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
