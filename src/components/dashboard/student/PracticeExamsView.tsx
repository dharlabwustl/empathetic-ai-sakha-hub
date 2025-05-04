
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import BackButton from '@/components/dashboard/student/BackButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PracticeExamsViewProps {
  userProfile?: any;
}

const PracticeExamsView: React.FC<PracticeExamsViewProps> = ({ userProfile }) => {
  return (
    <div className="space-y-8">
      {/* Back button */}
      <BackButton to="/dashboard/student" label="Back to Dashboard" />
      
      <div>
        <h1 className="text-3xl font-bold">Practice Exams</h1>
        <p className="text-gray-500 mt-1">
          Test your knowledge with practice exams tailored to your goals
        </p>
      </div>
      
      <TooltipProvider>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              <div className="flex justify-between items-center">
                <span>Available Practice Tests</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Take practice exams to assess your preparation level. These tests simulate real exam conditions and provide detailed feedback.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-muted-foreground">Practice exams will be available soon</p>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
};

export default PracticeExamsView;
