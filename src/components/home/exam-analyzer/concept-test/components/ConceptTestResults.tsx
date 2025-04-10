
import React from 'react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults } from '../../types';

interface ConceptTestResultsProps {
  results: TestResults;
}

const ConceptTestResults: React.FC<ConceptTestResultsProps> = ({ results }) => {
  return (
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
  );
};

export default ConceptTestResults;
