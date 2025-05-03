
import React, { useState } from 'react';
import StressLoader from './StressLoader';
import { TestResults } from '../types';
import StressTestQuiz from './StressTestQuiz';
import StressTestResults from './StressTestResults';
import StressTestIntro from './StressTestIntro';

interface StressTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults | null;
  simulateTest: () => void;
  onCompleteTest: (answers: any[]) => void;
  onContinue: () => void;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const StressTestSection: React.FC<StressTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue,
  examDetails
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  
  const handleStartTest = () => {
    setIsTestActive(true);
    simulateTest();
  };
  
  if (loading) {
    return <StressLoader />;
  }
  
  if (testCompleted && results) {
    return (
      <div className="space-y-4">
        <StressTestResults results={results} userAnswers={userAnswers} />
        
        <div className="flex justify-end mt-6">
          <button 
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-md shadow-md font-medium"
            onClick={onContinue}
          >
            Continue to Concept Test
          </button>
        </div>
      </div>
    );
  }
  
  if (isTestActive) {
    return (
      <StressTestQuiz 
        selectedExam={selectedExam} 
        onCompleteTest={(answers) => {
          setUserAnswers(answers);
          onCompleteTest(answers);
        }}
        examDetails={examDetails}
      />
    );
  }
  
  return (
    <StressTestIntro onStartTest={handleStartTest} />
  );
};

export default StressTestSection;
