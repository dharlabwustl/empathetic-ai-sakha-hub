
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";

const AcademicAdvisorView = () => {
  return (
    <SharedPageLayout 
      title="Academic Advisor" 
      subtitle="Get guidance for your academic journey"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Academic Guidance</h2>
            <p className="mb-4">Your academic advisor is here to help you plan your educational path and achieve your goals.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <p>Academic advisor interface would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
