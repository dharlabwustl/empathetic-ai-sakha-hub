
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, ChevronRight } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults } from './types';

interface ReadinessTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  results: TestResults;
  simulateTest: () => void;
  onContinue: () => void;
}

const ReadinessTestSection: React.FC<ReadinessTestSectionProps> = ({
  loading,
  testCompleted,
  results,
  simulateTest,
  onContinue
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Target className="mr-2 text-violet-500" size={20} />
          Readiness Score Test
        </h3>
        <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">2 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test evaluates your current preparation level by analyzing content coverage, practice effectiveness, and study commitment.
      </p>
      
      {!loading && !testCompleted ? (
        <div className="space-y-6">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Target className="mr-2 text-violet-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You'll answer 10 questions about your study habits</li>
              <li>Be honest about your preparation level</li>
              <li>Questions cover syllabus knowledge, practice, and time management</li>
              <li>Results will help create your personalized study plan</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={simulateTest}
          >
            Begin Readiness Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center border-2 border-violet-100 dark:border-violet-800">
            <div className="text-center">
              <Target className="mx-auto mb-2 animate-pulse text-violet-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={30} className="h-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Readiness Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onContinue}
          >
            <span>Continue to Next Test</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadinessTestSection;
