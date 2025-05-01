
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';

const AcademicAdvisorView = () => {
  return (
    <SharedPageLayout 
      title="Academic Advisor" 
      subtitle="Get guidance for your academic journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Academic Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your academic advisor is here to help you plan your educational path and achieve your goals.</p>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">Academic advisor interface would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
