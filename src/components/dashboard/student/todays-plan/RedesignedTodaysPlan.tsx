
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const RedesignedTodaysPlan = () => {
  const navigate = useNavigate();
  
  return (
    <SharedPageLayout
      title="Today's Plan"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/dashboard/student')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Daily Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Your personalized study plan for today will appear here.
          </div>
        </CardContent>
      </Card>
      
      {/* Additional content would go here */}
    </SharedPageLayout>
  );
};

export default RedesignedTodaysPlan;
