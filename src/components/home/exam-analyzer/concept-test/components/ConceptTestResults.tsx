
import React from 'react';
import { TestResults, UserAnswer } from '../../types';
import { CheckCircle2, AlertTriangle, Brain } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';

interface ConceptTestResultsProps {
  results: TestResults;
  userAnswers?: UserAnswer[];
  subject?: string;
}

const ConceptTestResults: React.FC<ConceptTestResultsProps> = ({ 
  results,
  userAnswers = [],
  subject = ''
}) => {
  const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
  const totalAnswers = userAnswers.length;
  const percentCorrect = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-blue-500 to-blue-600";
    if (score >= 40) return "from-amber-500 to-amber-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="mr-2 text-pink-500" size={24} />
            <h3 className="text-lg font-medium">
              Concept Test Results
              {subject && <span className="text-sm ml-2 text-gray-500">({subject})</span>}
            </h3>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {percentCorrect}%
          </span>
        </div>
        
        <CustomProgress 
          value={percentCorrect} 
          className="h-2 mb-4" 
          indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(percentCorrect)}`} 
        />
        
        <div className="flex items-center justify-between text-sm mb-6">
          <span>
            <span className="font-medium">{correctAnswers}</span> correct out of {totalAnswers} questions
          </span>
          <span className={`font-medium ${
            results.level === 'Excellent' || results.level === 'Good' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-amber-600 dark:text-amber-400'
          }`}>
            {results.level || 'Average'} level
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
            <p className="text-sm">{results.analysis || 'Analysis not available.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.strengths && results.strengths.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-green-700 dark:text-green-400 flex items-center mb-2">
                  <CheckCircle2 className="mr-2" size={16} />
                  Strengths
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {results.improvements && results.improvements.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-amber-700 dark:text-amber-400 flex items-center mb-2">
                  <AlertTriangle className="mr-2" size={16} />
                  Areas to Improve
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm">{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptTestResults;
