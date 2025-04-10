
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults } from './types';

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  results: TestResults;
  simulateTest: () => void;
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  results,
  simulateTest
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Brain className="mr-2 text-pink-500" size={20} />
          Concept Mastery Test
        </h3>
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">3 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test identifies gaps between your perceived knowledge and actual performance on key topics.
      </p>
      
      {!loading && !testCompleted ? (
        <div className="space-y-6">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Brain className="mr-2 text-pink-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Rate your confidence on key topics from the exam syllabus</li>
              <li>Answer 5 multiple-choice questions on each topic</li>
              <li>The test adapts to your responses</li>
              <li>We'll map your confidence against actual performance</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={simulateTest}
          >
            Begin Concept Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center border-2 border-pink-100 dark:border-pink-800">
            <div className="text-center">
              <Brain className="mx-auto mb-2 animate-pulse text-pink-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={40} className="h-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Concept Mastery Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptTestSection;
