
import React from 'react';
import { Button } from '@/components/ui/button';
import { SharedPageLayout } from '../SharedPageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ExamsList from './ExamsList';

const PracticeExamsSection = () => {
  return (
    <TooltipProvider>
      <SharedPageLayout title="Practice Exams" subtitle="Test your knowledge with practice exams">
        {/* Back Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 mb-4" 
              asChild
            >
              <Link to="/dashboard/student">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Return to dashboard</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Exams List */}
        <ExamsList />
      </SharedPageLayout>
    </TooltipProvider>
  );
};

export default PracticeExamsSection;
