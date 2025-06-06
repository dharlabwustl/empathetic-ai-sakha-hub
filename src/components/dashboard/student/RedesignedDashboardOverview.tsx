
import React, { useState } from 'react';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import NameSectionCard from './dashboard-sections/NameSectionCard';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import ExamReadinessScoreCard from './dashboard-sections/ExamReadinessScoreCard';
import NEETStrategyCard from './NEETStrategyCard';
import DailySmartSuggestions from './dashboard-sections/DailySmartSuggestions';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import KpiCard from './dashboard-sections/KpiCard';
import WeakAreasCard from './dashboard-sections/WeakAreasCard';
import StrongAreasCard from './dashboard-sections/StrongAreasCard';
import AICoachCard from './dashboard-sections/AICoachCard';
import { motion } from 'framer-motion';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    localStorage.setItem('userMood', mood);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Row 1: Name Header, Exam Goal, Exam Readiness (2/3) + NEET Strategy (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Name Section Card */}
          <NameSectionCard userProfile={userProfile} />

          {/* 2. Exam Goal Card */}
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />

          {/* 3. Exam Readiness Score Card */}
          <ExamReadinessScoreCard />
        </div>

        {/* Right side - 1/3 width */}
        <div className="lg:col-span-1">
          <NEETStrategyCard />
        </div>
      </div>

      {/* Row 2: Today's Priority and Live Plan Cards - 50:50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysTopPrioritySection />
        <TodaysPlanSection currentMood={currentMood} />
      </div>

      {/* Row 3: Daily Smart Suggestions - Full width */}
      <DailySmartSuggestions />

      {/* Row 4: Mood and AI Coach Cards - 50:50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodBasedSuggestions 
          currentMood={currentMood} 
          onMoodSelect={handleMoodChange}
        />
        <AICoachCard />
      </div>

      {/* Row 5: Weak and Strong Areas - 50:50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakAreasCard />
        <StrongAreasCard />
      </div>

      {/* Row 6: Enhanced KPI Cards Grid */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Study Streak"
            value="12"
            unit=" days"
            trend="up"
            change={8}
            icon={<span className="text-lg">🔥</span>}
          />
          <KpiCard
            title="Focus Score"
            value="87"
            unit="%"
            trend="up"
            change={5}
            progress={87}
            icon={<span className="text-lg">🎯</span>}
          />
          <KpiCard
            title="Weekly Hours"
            value="24.5"
            unit="h"
            trend="stable"
            icon={<span className="text-lg">⏰</span>}
          />
          <KpiCard
            title="Mock Test Score"
            value="580"
            unit="/720"
            trend="up"
            change={12}
            progress={81}
            icon={<span className="text-lg">📊</span>}
          />
        </div>
        
        {/* Additional Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <KpiCard
            title="Concept Mastery"
            value="78"
            unit="%"
            trend="up"
            change={3}
            progress={78}
            icon={<span className="text-lg">🧠</span>}
          />
          <KpiCard
            title="Problem Solving"
            value="85"
            unit="%"
            trend="up"
            change={7}
            progress={85}
            icon={<span className="text-lg">⚡</span>}
          />
          <KpiCard
            title="Revision Progress"
            value="92"
            unit="%"
            trend="up"
            change={15}
            progress={92}
            icon={<span className="text-lg">📚</span>}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
