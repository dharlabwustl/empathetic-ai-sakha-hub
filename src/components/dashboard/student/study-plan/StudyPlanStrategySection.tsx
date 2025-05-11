
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import StudyTimeAllocation from './StudyTimeAllocation';

const StudyPlanStrategySection = () => {
  const { toast } = useToast();

  const handleViewComplete = () => {
    toast({
      title: "Complete Study Plan",
      description: "Opening your comprehensive study plan",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Study Plan Strategy</CardTitle>
        <div>
          <Button 
            size="sm" 
            onClick={handleViewComplete}
          >
            View Complete Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <StudyTimeAllocation />
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
            <p>Your study plan is optimized based on your exam goals, current performance, and available time.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanStrategySection;
