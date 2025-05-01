
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";

const StudyPlanView = () => {
  return (
    <SharedPageLayout 
      title="Study Plan" 
      subtitle="Your comprehensive study calendar and exam preparation"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Exam Preparation Plan</h2>
            <p className="mb-4">Your personalized study plan is designed to help you reach your academic goals.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-center">Your complete study plan will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanView;
