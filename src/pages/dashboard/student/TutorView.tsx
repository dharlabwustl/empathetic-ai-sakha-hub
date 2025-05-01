
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";

const TutorView = () => {
  return (
    <SharedPageLayout 
      title="24/7 AI Tutor" 
      subtitle="Get personalized help with your studies anytime"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">AI Tutor Chat</h2>
            <p className="mb-4">Your AI tutor is here to help you with any questions you have about your studies.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <p>AI tutor interface would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default TutorView;
