
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';

const TutorView = () => {
  return (
    <SharedPageLayout 
      title="24/7 AI Tutor" 
      subtitle="Get personalized learning assistance anytime you need it"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">AI Tutor Assistant</h2>
            </div>
            <p className="mb-4">Your personal AI tutor is here to help with any academic questions or learning challenges.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-center">AI chat interface would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default TutorView;
