
import { useState } from 'react';
import { TestType, UserAnswer } from '../../types';
import { generateReadinessReport } from '../../utils/readinessReportGenerator';
import { generateConceptReport } from '../../utils/conceptReportGenerator';
import { generateCognitiveStressReport } from '../../utils/cognitiveStressReportGenerator';

interface UseTestActionsProps {
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  currentTest: TestType;
  setCurrentTest: (test: TestType) => void;
  progress: number;
  setProgress: (progress: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  testCompleted: boolean;
  setTestCompleted: (completed: boolean) => void;
  results: any;
  setResults: (results: any) => void;
}

export const useTestActions = ({
  selectedExam,
  setSelectedExam,
  currentTest,
  setCurrentTest,
  progress,
  setProgress,
  loading,
  setLoading,
  testCompleted,
  setTestCompleted,
  results,
  setResults
}: UseTestActionsProps) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleStartTest = () => {
    if (!selectedExam) {
      return;
    }
    setCurrentTest('readiness-test');
    setProgress(0);
    setTestCompleted(false);
    setResults(null);
  };

  const handleNavigation = (nextTest: TestType) => {
    setCurrentTest(nextTest);
    setProgress(0);
    setTestCompleted(false);
    setResults(null);
  };

  const handleStartOver = () => {
    setCurrentTest('welcome');
    setProgress(0);
    setTestCompleted(false);
    setSelectedExam('');
    setResults(null);
    setUserAnswers([]);
  };

  // Simulate a readiness test completion
  const simulateReadinessTest = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setTestCompleted(true);
    }, 1500);
  };

  const handleReadinessTestComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setLoading(true);
    
    setTimeout(() => {
      const readinessResults = generateReadinessReport(answers, selectedExam);
      setResults(readinessResults);
      setLoading(false);
      setTestCompleted(true);
    }, 1500);
  };

  // Simulate a concept mastery test completion
  const simulateConceptTest = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setTestCompleted(true);
    }, 2000);
  };

  const handleConceptTestComplete = (answers: UserAnswer[]) => {
    setLoading(true);
    
    setTimeout(() => {
      const conceptResults = generateConceptReport(answers, selectedExam);
      
      // Match up concept test results with readiness results
      if (results && results.categoryScores) {
        conceptResults.readinessMatch = {
          conceptCoverageAccuracy: 
            100 - Math.abs(results.categoryScores.conceptCoverage - conceptResults.score),
          practiceReadinessMatch:
            100 - Math.abs(results.categoryScores.practiceScore - conceptResults.score)
        };
      }
      
      setResults(conceptResults);
      setLoading(false);
      setTestCompleted(true);
    }, 2000);
  };

  // Simulate a stress test completion
  const simulateStressTest = () => {
    setLoading(true);
    
    setTimeout(() => {
      const stressResults = generateCognitiveStressReport(userAnswers, selectedExam);
      setResults(stressResults);
      setLoading(false);
      setTestCompleted(true);
    }, 1500);
  };

  const handleStressTestComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setLoading(true);
    
    setTimeout(() => {
      const stressResults = generateCognitiveStressReport(answers, selectedExam);
      setResults(stressResults);
      setLoading(false);
      setTestCompleted(true);
    }, 1500);
  };

  return {
    handleStartTest,
    simulateStressTest,
    handleStressTestComplete,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  };
};
