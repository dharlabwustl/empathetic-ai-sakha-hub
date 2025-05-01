
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from 'lucide-react';

const StudyPlanView = () => {
  return (
    <SharedPageLayout 
      title="Study Plan" 
      subtitle="Your comprehensive study calendar and exam preparation path"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex items-center mb-4 gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Exam Goal Study Plan</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This comprehensive study plan is specifically designed for your exam goal.</p>
            <p className="text-muted-foreground">It includes a full calendar view of your preparation schedule, topic breakdowns, and milestone tracking.</p>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanView;
