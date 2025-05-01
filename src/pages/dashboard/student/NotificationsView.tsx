
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import NudgesList from '@/components/dashboard/student/NudgesList';
import { useKpiTracking } from '@/hooks/useKpiTracking';

const NotificationsView = () => {
  const { nudges, markNudgeAsRead } = useKpiTracking();
  
  return (
    <SharedPageLayout 
      title="Notifications" 
      subtitle="Stay updated with important alerts"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <NudgesList nudges={nudges} markNudgeAsRead={markNudgeAsRead} />
    </SharedPageLayout>
  );
};

export default NotificationsView;
