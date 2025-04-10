
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAnswer } from '../../types';

interface AnswerExplanationProps {
  userAnswer: UserAnswer;
  explanation: string;
}

const AnswerExplanation: React.FC<AnswerExplanationProps> = ({ userAnswer, explanation }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 rounded-lg ${
          userAnswer.isCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-start">
          {userAnswer.isCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 mr-2 mt-1 flex-shrink-0"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 mr-2 mt-1 flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
          <div>
            <p className="font-medium">
              {userAnswer.isCorrect 
                ? `Correct in ${userAnswer.timeToAnswer.toFixed(1)}s!` 
                : 'Incorrect'}
            </p>
            <p className="text-sm mt-1">{explanation}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnswerExplanation;
