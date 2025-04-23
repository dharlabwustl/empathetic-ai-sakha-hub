
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ProfileCard from '@/components/dashboard/ProfileCard';
import StudyStreakCard from './StudyStreakCard';
import UpcomingExamCard from './UpcomingExamCard';
import RecommendationCard from './RecommendationCard';
import KpiCardGrid from '@/components/dashboard/KpiCardGrid';

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Your study progress and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <KpiCardGrid kpis={kpis} />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <ProfileCard userProfile={userProfile} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StudyStreakCard streakDays={userProfile.streakDays || 0} />
        
        {userProfile.goals && userProfile.goals.length > 0 && (
          <UpcomingExamCard
            examTitle={userProfile.goals[0].title}
            examDate={userProfile.examPreparation && typeof userProfile.examPreparation !== 'string' 
              ? userProfile.examPreparation.examDate 
              : ''}
            daysLeft={userProfile.examPreparation && typeof userProfile.examPreparation !== 'string' 
              ? userProfile.examPreparation.daysLeft 
              : 30}
          />
        )}
        
        <RecommendationCard 
          recommendationType="resource"
          title="Recommended Resources"
          items={[
            { id: '1', title: 'Physics Formula Sheet', type: 'pdf' },
            { id: '2', title: 'Chemistry Quick Notes', type: 'doc' },
            { id: '3', title: 'Math Problem Solving', type: 'video' }
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
