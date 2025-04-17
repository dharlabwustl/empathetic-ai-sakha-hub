
import React from 'react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, UserAnswer } from '../../types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptTestResultsProps {
  results: TestResults;
  onContinue?: () => void;
  subject?: string; // Added this prop
  userAnswers?: UserAnswer[]; // Added this prop
}

const ConceptTestResults: React.FC<ConceptTestResultsProps> = ({ 
  results, 
  onContinue,
  subject,
  userAnswers = []
}) => {
  const subjectText = subject ? ` for ${subject}` : '';

  return (
    <div className="space-y-4">
      <motion.div 
        className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-pink-700 dark:text-pink-300">
            Your Concept Mastery Score{subjectText}:
          </h4>
          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{results.score}%</span>
        </div>
        
        <CustomProgress 
          value={results.score} 
          className="h-2 my-2" 
          indicatorClassName={`bg-gradient-to-r from-pink-400 to-pink-600`} 
        />
        
        <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-lg mt-3">
          <p className="text-sm">{results.analysis}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {results.strengths.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/50">
              <span className="font-medium">Strengths:</span> {results.strengths[0]}
            </div>
          )}
          
          {results.improvements.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded text-xs text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/50">
              <span className="font-medium">To improve:</span> {results.improvements[0]}
            </div>
          )}
        </div>
        
        {userAnswers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-pink-100 dark:border-pink-800">
            <p className="text-sm font-medium mb-2">Question Summary:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Correct: {userAnswers.filter(a => a.isCorrect).length}</div>
              <div>Incorrect: {userAnswers.filter(a => !a.isCorrect).length}</div>
            </div>
          </div>
        )}
      </motion.div>
      
      {onContinue && (
        <div className="flex justify-end">
          <Button onClick={onContinue} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
            Continue <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConceptTestResults;
