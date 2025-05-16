
import React from 'react';
import AnalyticsDashboard from '@/components/dashboard/analytics/AnalyticsDashboard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <AnalyticsDashboard />
    </div>
  );
};

export default Analytics;
