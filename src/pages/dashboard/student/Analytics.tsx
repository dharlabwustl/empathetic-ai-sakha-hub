
import React from 'react';
import AnalyticsDashboard from '@/components/dashboard/analytics/AnalyticsDashboard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const Analytics = () => {
  const navigate = useNavigate();
  
  return (
    <SharedPageLayout
      title="Analytics Dashboard"
      subtitle="Gain deeper insights into your study patterns and performance"
    >
      <AnalyticsDashboard />
    </SharedPageLayout>
  );
};

export default Analytics;
