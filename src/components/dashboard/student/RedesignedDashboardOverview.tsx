
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
      {/* 1. Name Section Card */}
      <NameSectionCard userProfile={userProfile} />

      {/* 2. Exam Goal Card */}
      <ExamGoalCard 
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />

      {/* 3. Exam Readiness Score Card */}
      <ExamReadinessScoreCard />

      {/* 4. NEET Strategy Card - Moved to top as requested */}
      <NEETStrategyCard />

      {/* 5. Daily Smart Suggestions */}
      <DailySmartSuggestions />

      {/* 6. Rest of the cards - Maintained in existing order */}
      {/* Top Priority and Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysTopPrioritySection />
        <TodaysPlanSection currentMood={currentMood} />
      </div>

      {/* Mood and AI Coach Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodBasedSuggestions 
          currentMood={currentMood} 
          onMoodSelect={handleMoodChange}
        />
        <AICoachCard />
      </div>

      {/* Weak and Strong Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakAreasCard />
        <StrongAreasCard />
      </div>

      {/* KPI Cards Grid */}
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
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
