
import React from 'react';
import { UserProfile, Kpi } from '@/types/user';
import { motion } from 'framer-motion';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import NEETStrategyCard from './NEETStrategyCard';
import { MoodType } from '@/types/user/base';
import { useState } from 'react';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: Kpi[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Priority Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TodaysTopPrioritySection />
          </motion.div>

          {/* Today's Plan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TodaysPlanSection currentMood={currentMood} />
          </motion.div>
        </div>

        {/* Right Column - Sidebar Cards */}
        <div className="space-y-6">
          {/* Exam Goal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExamGoalCard currentMood={currentMood} onMoodChange={handleMoodChange} />
          </motion.div>

          {/* Mood-Based Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MoodBasedSuggestions currentMood={currentMood} onMoodSelect={handleMoodChange} />
          </motion.div>

          {/* NEET Strategy Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NEETStrategyCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
