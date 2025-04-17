
import React from 'react';
import { TestResults, UserAnswer } from './types';
import StressTestHeader from './stress-test/StressTestHeader';
import StressTestQuestion from './stress-test/StressTestQuestion';
import StressTestIntro from './stress-test/StressTestIntro';
import StressTestLoading from './stress-test/StressTestLoading';
import StressTestResults from './stress-test/StressTestResults';
import CognitiveSetSelector from './stress-test/components/CognitiveSetSelector';
import TestProgressBar from './stress-test/components/TestProgressBar';
import { useStressTest } from './stress-test/hooks/useStressTest';

interface StressTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

const StressTestSection: React.FC<StressTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest
}) => {
  const {
    isTestActive,
    currentQuestionIndex,
    timeLeft,
    userAnswers,
    questions,
    showExplanation,
    currentComplexity,
    showDistraction,
    selectedCognitiveSet,
    setSelectedCognitiveSet,
    testTimeLeft,
    processingNextQuestion,
    startTest,
    handleAnswer
  } = useStressTest({
    selectedExam,
    onCompleteTest
  });

  return (
    <div className="space-y-6">
      <StressTestHeader />
      
      <p className="text-sm">
        This scientific test measures your ability to perform under pressure through pattern recognition, 
        reaction speed, and memory exercises specific to {selectedExam}.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div>
          <StressTestIntro onStart={() => startTest(selectedCognitiveSet)} />
          <CognitiveSetSelector 
            selectedExam={selectedExam}
            selectedCognitiveSet={selectedCognitiveSet}
            setSelectedCognitiveSet={setSelectedCognitiveSet}
          />
        </div>
      ) : loading ? (
        <StressTestLoading />
      ) : isTestActive ? (
        <div>
          <TestProgressBar 
            testTimeLeft={testTimeLeft}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            selectedCognitiveSet={selectedCognitiveSet}
          />
          <StressTestQuestion
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            timeLeft={timeLeft}
            showExplanation={showExplanation}
            showDistraction={showDistraction}
            currentComplexity={currentComplexity}
            userAnswers={userAnswers}
            onAnswer={!processingNextQuestion ? handleAnswer : () => {}}
          />
        </div>
      ) : (
        <StressTestResults results={results} userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default StressTestSection;
