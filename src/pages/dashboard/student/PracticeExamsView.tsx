
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const PracticeExamsView = () => {
  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge and track progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex items-center mb-4 gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Practice Exams</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <CardContent className="p-0">
              <p className="text-muted-foreground">Your practice exams will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
