
import React from 'react';
import { motion } from "framer-motion";
import { TestType, TestCompletionState, ExamResults, UserAnswer, ExamType } from './types';
import IntroSection from './IntroSection';
import StressTestSection from './StressTestSection';
import ReadinessTestSection from './ReadinessTestSection';
import ConceptTestSection from './ConceptTestSection';
import ReportSection from './ReportSection';
import { Progress } from "@/components/ui/progress";

interface TestContainerProps {
  currentTest: TestType;
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  loading: boolean;
  progress: number;
  testCompleted: TestCompletionState;
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
}

const TestContainer: React.FC<TestContainerProps> = ({
  currentTest,
  selectedExam,
  setSelectedExam,
  loading,
  progress,
  testCompleted,
  results,
  examTypes,
  simulateStressTest,
  simulateReadinessTest,
  simulateConceptTest,
  handleStartTest,
  handleStartOver,
  handleStressTestComplete,
  handleReadinessTestComplete,
  handleConceptTestComplete
}) => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Progress indicator
  const renderProgressIndicator = () => {
    if (currentTest === 'intro') return null;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 dark:text-gray-400">
            {currentTest === 'stress' ? 'Stress Test' : 
             currentTest === 'readiness' ? 'Readiness Score' : 
             currentTest === 'concept' ? 'Concept Mastery' : 'Complete'}
          </span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  };

  const renderTestContent = () => {
    switch (currentTest) {
      case 'intro':
        return (
          <IntroSection
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            examTypes={examTypes}
            onStartTest={handleStartTest}
          />
        );

      case 'stress':
        return (
          <StressTestSection
            loading={loading}
            testCompleted={testCompleted.stress}
            selectedExam={selectedExam}
            results={results.stress}
            simulateTest={simulateStressTest}
            onCompleteTest={handleStressTestComplete}
          />
        );

      case 'readiness':
        return (
          <ReadinessTestSection
            loading={loading}
            testCompleted={testCompleted.readiness}
            selectedExam={selectedExam}
            results={results.readiness}
            simulateTest={simulateReadinessTest}
            onCompleteTest={handleReadinessTestComplete}
            onContinue={() => {}}
          />
        );

      case 'concept':
        return (
          <ConceptTestSection
            loading={loading}
            testCompleted={testCompleted.concept}
            selectedExam={selectedExam}
            results={results.concept}
            simulateTest={simulateConceptTest}
            onCompleteTest={handleConceptTestComplete}
          />
        );

      case 'report':
        return (
          <ReportSection
            results={results}
            selectedExam={selectedExam}
            examTypes={examTypes}
            onStartOver={handleStartOver}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {renderProgressIndicator()}
      <motion.div 
        className="py-6"
        key={currentTest}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        {renderTestContent()}
      </motion.div>
    </>
  );
};

export default TestContainer;
