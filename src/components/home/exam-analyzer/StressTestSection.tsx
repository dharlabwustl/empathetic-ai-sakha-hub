
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults } from './types';

interface StressTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  results: TestResults;
  simulateTest: () => void;
}

const StressTestSection: React.FC<StressTestSectionProps> = ({
  loading,
  testCompleted,
  results,
  simulateTest
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="mr-2 text-blue-500" size={20} />
          Stress Level Test
        </h3>
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">1 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test measures your ability to perform under pressure through pattern recognition, reaction speed, and memory recall exercises.
      </p>
      
      {!loading && !testCompleted ? (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Clock className="mr-2 text-blue-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You'll face 8 pattern recognition challenges</li>
              <li>Each question has a 15-second time limit</li>
              <li>Try to maintain focus despite distractions</li>
              <li>Answer as quickly and accurately as possible</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={simulateTest}
          >
            Begin Stress Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border-2 border-blue-100 dark:border-blue-800">
            <div className="text-center">
              <Clock className="mx-auto mb-2 animate-pulse text-blue-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={20} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Stress Level Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StressTestSection;
