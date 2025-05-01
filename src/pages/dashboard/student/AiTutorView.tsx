
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';

const AiTutorView = () => {
  return (
    <SharedPageLayout 
      title="24/7 AI Tutor" 
      subtitle="Get help with your studies anytime, anywhere"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex items-center mb-4 gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">AI Tutor Assistant</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Personal AI Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Ask questions, get explanations, and receive guidance for your studies.</p>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">AI tutor chat interface would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AiTutorView;
