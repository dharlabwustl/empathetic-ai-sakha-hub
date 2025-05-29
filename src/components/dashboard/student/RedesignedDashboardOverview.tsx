
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import ExamReadinessSection from './ExamReadinessSection';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import AICoachCard from './AICoachCard';
import NEETStrategyCard from './NEETStrategyCard';
import SubjectWiseBreakdownCard from './SubjectWiseBreakdownCard';
import KpiTabsCard from './KpiTabsCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(
    getCurrentMoodFromLocalStorage()
  );

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Example weekly trends data for the exam readiness score
  const weeklyTrendsData = [
    { week: '1', score: 30 },
    { week: '2', score: 35 },
    { week: '3', score: 40 },
    { week: '4', score: 38 },
    { week: '5', score: 45 },
    { week: '6', score: 52 },
    { week: '7', score: 58 }
  ];
  
  // Example weak and strong areas with CTAs
  const weakAreas = [
    { name: 'Organic Chemistry', link: '/dashboard/student/concepts/chemistry' },
    { name: 'Thermodynamics', link: '/dashboard/student/concepts/physics' },
    { name: 'Vectors', link: '/dashboard/student/concepts/physics' }
  ];
  
  const strongAreas = [
    { name: 'Algebra', link: '/dashboard/student/concepts/mathematics' },
    { name: 'Mechanics', link: '/dashboard/student/concepts/physics' },
    { name: 'Biology', link: '/dashboard/student/concepts/biology' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <EnhancedNameHeaderCard userProfile={userProfile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Section */}
          <ExamReadinessSection 
            score={65}
            previousScore={58}
            weeklyTrends={weeklyTrendsData}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
          />
          
          {/* Today's Top Priority Section */}
          <TodaysTopPrioritySection />
          
          {/* Today's Plan Section */}
          <TodaysPlanSection currentMood={currentMood} />
          
          {/* Subject Wise Breakdown and KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SubjectWiseBreakdownCard />
            <KpiTabsCard kpis={kpis} />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Exam Goal Card with Mood Log */}
          <ExamGoalCard 
            userProfile={userProfile}
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          
          {/* Mood Based Learning */}
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodSelect={handleMoodChange}
          />
          
          {/* AI Coach Card */}
          <AICoachCard />
          
          {/* NEET Strategy Card */}
          <NEETStrategyCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
