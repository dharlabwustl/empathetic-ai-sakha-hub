
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AnalyticsReporting = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics & Reporting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Advanced analytics and reporting dashboard coming soon.</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsReporting;
