
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import KpiSection from "./KpiSection";
import UpcomingMilestonesSection from "./dashboard-sections/UpcomingMilestonesSection";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";
import StudyStreakSection from "./dashboard-sections/StudyStreakSection";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import DailySmartSuggestions from "./DailySmartSuggestions";
import { useNavigate } from 'react-router-dom';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const navigate = useNavigate();

  const handleSuggestionAction = (action: string) => {
    switch (action) {
      case 'concepts':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcards':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice-exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'break':
        navigate('/dashboard/student/feel-good-corner');
        break;
      default:
        console.log('Suggestion action:', action);
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <KpiSection kpis={kpis} />
      
      {/* Exam Readiness and Name Section */}
      <ExamReadinessSection userProfile={userProfile} />
      
      {/* Daily Smart Suggestions - Below Exam Readiness */}
      <DailySmartSuggestions onActionClick={handleSuggestionAction} />
      
      {/* Grid Layout for remaining sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysPlanSection currentMood={userProfile.mood} />
        <StudyStreakSection userProfile={userProfile} />
      </div>
      
      {/* Upcoming Milestones */}
      <UpcomingMilestonesSection />
    </div>
  );
};

export default RedesignedDashboardOverview;
