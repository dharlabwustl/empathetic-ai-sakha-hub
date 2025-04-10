
import React from 'react';
import { TestType, TestCompletionState, ExamResults, ExamType } from './types';
import { Button } from '@/components/ui/button';
import IntroSection from './IntroSection';
import StressTestSection from './StressTestSection';
import ReadinessTestSection from './ReadinessTestSection';
import ConceptTestSection from './concept-test/ConceptTestSection';
import ReportSection from './ReportSection';
import ProgressIndicator from './ProgressIndicator';
import { UserAnswer } from './types';

interface TestContainerProps {
  currentTest: TestType;
  selectedExam: string;
  setSelectedExam: (value: string) => void;
  loading: boolean;
  testCompleted: TestCompletionState;
  progress: number;
  results: ExamResults;
  examTypes: ExamType[];
  simulateStressTest: () => void;
  simulateReadinessTest: () => void;
  simulateConceptTest: () => void;
  handleStartTest: () => void;
  handleStartOver: () => void;
  handleStressTestComplete: (answers: UserAnswer[]) => void;
  handleReadinessTestComplete: (answers: UserAnswer[]) => void;
  handleConceptTestComplete: (answers: UserAnswer[]) => void;
  handleNavigation: (test: TestType) => void;
}

const TestContainer: React.FC<TestContainerProps> = ({
  currentTest,
  selectedExam,
  setSelectedExam,
  loading,
  testCompleted,
  progress,
  results,
  examTypes,
  simulateStressTest,
  simulateReadinessTest,
  simulateConceptTest,
  handleStartTest,
  handleStartOver,
  handleStressTestComplete,
  handleReadinessTestComplete,
  handleConceptTestComplete,
  handleNavigation,
}) => {
  return (
    <div className="my-4 space-y-6">
      <ProgressIndicator progress={progress} currentTest={currentTest} />
      
      {currentTest === 'intro' && (
        <IntroSection 
          examTypes={examTypes} 
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          onStartTest={handleStartTest}
        />
      )}
      
      {currentTest === 'stress' && (
        <StressTestSection
          loading={loading}
          testCompleted={testCompleted.stress}
          selectedExam={selectedExam}
          results={results.stress}
          simulateTest={simulateStressTest}
          onCompleteTest={handleStressTestComplete}
        />
      )}
      
      {currentTest === 'readiness' && (
        <ReadinessTestSection 
          loading={loading}
          testCompleted={testCompleted.readiness}
          selectedExam={selectedExam}
          results={results.readiness}
          simulateTest={simulateReadinessTest}
          onCompleteTest={handleReadinessTestComplete}
          onContinue={() => handleNavigation('concept')}
        />
      )}
      
      {currentTest === 'concept' && (
        <ConceptTestSection
          loading={loading}
          testCompleted={testCompleted.concept}
          selectedExam={selectedExam}
          results={results.concept}
          simulateTest={simulateConceptTest}
          onCompleteTest={handleConceptTestComplete}
          onContinue={() => handleNavigation('report')}
        />
      )}
      
      {currentTest === 'report' && (
        <ReportSection
          results={results}
          selectedExam={selectedExam}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default TestContainer;
