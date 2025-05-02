
import React from 'react';
import { TestResults } from '../types';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/ui/custom-progress';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface ConceptTestResultsProps {
  results: TestResults;
  onContinue: () => void;
}

const ConceptTestResults: React.FC<ConceptTestResultsProps> = ({ results, onContinue }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Concept Test Results</h3>
          <span className="text-2xl font-bold">{results.score}%</span>
        </div>
        
        <CustomProgress 
          value={results.score} 
          className="h-2 mb-6" 
          indicatorClassName={`bg-gradient-to-r ${
            results.score >= 80 ? 'from-green-400 to-green-600' :
            results.score >= 60 ? 'from-blue-400 to-blue-600' :
            results.score >= 40 ? 'from-amber-400 to-amber-600' :
            'from-red-400 to-red-600'
          }`} 
        />
        
        <div className="text-sm mb-6">
          {results.analysis || 'Your concept understanding is generally good, but there are some areas that need improvement.'}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {results.strengths && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-700 dark:text-green-400 flex items-center mb-2">
                <CheckCircle2 className="mr-2" size={16} />
                Strengths
              </h4>
              <p className="text-sm">{results.strengths}</p>
            </div>
          )}
          
          {results.weaknesses && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-amber-700 dark:text-amber-400 flex items-center mb-2">
                <AlertTriangle className="mr-2" size={16} />
                Areas to Improve
              </h4>
              <p className="text-sm">{results.weaknesses}</p>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ConceptTestResults;
