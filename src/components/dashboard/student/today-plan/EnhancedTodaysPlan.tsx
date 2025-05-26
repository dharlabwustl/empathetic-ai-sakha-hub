
import React from 'react';
import { Helmet } from 'react-helmet';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import ModernTodaysPlan from './ModernTodaysPlan';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const isMobile = useIsMobile();
  
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
      
      <div className={`${isMobile ? 'px-0' : ''}`}>
        <ModernTodaysPlan 
          userName={userProfile?.name || "Student"}
          isMobile={isMobile}
        />
      </div>
      
      {/* Voice assistant for learning support */}
      <FloatingVoiceButton 
        userName={userProfile?.name || "Student"}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
