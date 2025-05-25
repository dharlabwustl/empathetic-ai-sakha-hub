import React from 'react';
import { UserProfileType } from "@/types/user/base";
import ExamReadinessCard from '@/components/dashboard/student/cards/ExamReadinessCard';
import { KpiData } from "@/hooks/useKpiTracking";
import DailySmartSuggestions from './cards/DailySmartSuggestions';

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
      <ExamReadinessCard userProfile={userProfile} />
      
      {/* Daily Smart Suggestions - placed below exam readiness */}
      <DailySmartSuggestions userProfile={userProfile} />
      
      {/* Other dashboard content can go here */}
    </div>
  );
};

export default RedesignedDashboardOverview;
