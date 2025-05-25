import React from 'react';
import ExamReadinessCard from '@/components/dashboard/student/cards/ExamReadinessCard';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import DailySmartSuggestions from './DailySmartSuggestions';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  return (
    <div className="space-y-6">
      {/* Exam Readiness Card */}
      <ExamReadinessCard />
      
      {/* Daily Smart Suggestions - Moved below exam readiness */}
      <DailySmartSuggestions />
      
      {/* Additional dashboard content can go here */}
    </div>
  );
};

export default RedesignedDashboardOverview;
