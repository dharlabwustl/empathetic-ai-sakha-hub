import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import DailySmartSuggestions from './DailySmartSuggestions';
import ExamReadinessSection from './ExamReadinessSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
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
  
  // Example weak and strong areas
  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Vectors'];
  const strongAreas = ['Algebra', 'Mechanics', 'Biology'];

  return (
    <div className="space-y-6">
      {/* Daily Smart Suggestions - moved here */}
      <DailySmartSuggestions userName={userProfile.name || 'Student'} />
      
      {/* Exam Readiness Section - For the main dashboard */}
      <div className="mb-6">
        <ExamReadinessSection 
          score={65}
          previousScore={58}
          weeklyTrends={weeklyTrendsData}
          weakAreas={weakAreas}
          strongAreas={strongAreas}
        />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
