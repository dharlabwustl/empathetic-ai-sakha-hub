
import React from 'react';
import { Helmet } from 'react-helmet';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import ModernTodaysPlan from './ModernTodaysPlan';
import OverviewSection from '../OverviewSection';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Mock overview data for today's plan
  const todaysOverview = {
    subjects: [
      { name: 'Physics', completed: 2, total: 4, progress: 50, efficiency: 85, studyTime: 90 },
      { name: 'Chemistry', completed: 1, total: 3, progress: 33, efficiency: 70, studyTime: 60 },
      { name: 'Biology', completed: 3, total: 3, progress: 100, efficiency: 95, studyTime: 75 },
      { name: 'Mathematics', completed: 1, total: 2, progress: 50, efficiency: 80, studyTime: 45 }
    ],
    totalStudyTime: 270,
    overallProgress: 58,
    suggestions: [
      'You\'re doing great with Biology today! 🎉',
      'Focus on Chemistry next - only 2 tasks remaining',
      'Take a 10-minute break before Physics numericals',
      'Your morning session efficiency is above 80% ⚡'
    ]
  };

  return (
    <SharedPageLayout
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-8 ${isMobile ? 'px-0' : ''}`}>
        {/* Today's Overview Section */}
        <OverviewSection 
          title="Today's Progress"
          subjects={todaysOverview.subjects}
          totalStudyTime={todaysOverview.totalStudyTime}
          overallProgress={todaysOverview.overallProgress}
          suggestions={todaysOverview.suggestions}
          userName={userProfile?.name || 'Student'}
        />
        
        {/* Modern Today's Plan Component */}
        <ModernTodaysPlan />
      </div>
      
      {/* Voice assistant for learning support */}
      <FloatingVoiceButton 
        userName={userProfile?.name || 'Student'}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
