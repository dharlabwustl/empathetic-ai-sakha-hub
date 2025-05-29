
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import NEETStrategyCard from './NEETStrategyCard';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  // Load mood from localStorage on mount
  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
    
    // Trigger custom event for other components to react to mood changes
    const moodChangeEvent = new CustomEvent('mood-changed', { 
      detail: { 
        mood, 
        timestamp: new Date().toISOString()
      } 
    });
    document.dispatchEvent(moodChangeEvent);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Hero Section with enhanced gradient background */}
      <motion.div 
        className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome back, {userProfile.name || userProfile.firstName}! 🚀
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-sm md:text-base"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's make today count towards your NEET success
          </motion.p>
        </div>
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Primary Actions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Priority Section */}
          <TodaysTopPrioritySection />
          
          {/* Today's Plan Section */}
          <TodaysPlanSection currentMood={currentMood} />
        </div>

        {/* Right Column - Secondary Information */}
        <div className="lg:col-span-4 space-y-6">
          {/* Exam Goal Card */}
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          
          {/* Mood Based Suggestions */}
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodSelect={handleMoodChange}
          />
          
          {/* NEET Strategy Card */}
          <NEETStrategyCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
