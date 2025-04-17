
import React from 'react';

interface TestProgressBarProps {
  testTimeLeft: number;
  currentQuestionIndex: number;
  questionsLength: number;
  selectedCognitiveSet: number;
}

const TestProgressBar: React.FC<TestProgressBarProps> = ({ 
  testTimeLeft, 
  currentQuestionIndex, 
  questionsLength,
  selectedCognitiveSet 
}) => {
  return (
    <div className="mb-2 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
      <div>
        Test time remaining: {Math.floor(testTimeLeft / 60)}:{(testTimeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div>
        Set {selectedCognitiveSet} - Question {currentQuestionIndex + 1}/{questionsLength}
      </div>
    </div>
  );
};

export default TestProgressBar;
