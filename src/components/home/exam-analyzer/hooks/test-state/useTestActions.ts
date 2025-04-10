
import { useState } from 'react';
import { TestType, TestCompletionState, ExamResults, UserAnswer } from '../../types';
import {
  calculateStressTestResults,
  calculateReadinessTestResults,
  calculateConceptTestResults,
  calculateOverallResults,
} from '../../testDataService';

export interface TestStateActions {
  handleStartTest: () => void;
  simulateStressTest: () => void;
  handleStressTestComplete: (answers: UserAnswer[]) => void;
  simulateReadinessTest: () => void;
  handleReadinessTestComplete: (answers: UserAnswer[]) => void;
  simulateConceptTest: () => void;
  handleConceptTestComplete: (answers: UserAnswer[]) => void;
  handleNavigation: (test: TestType) => void;
  handleStartOver: () => void;
}

export interface TestStateProps {
  selectedExam: string;
  setSelectedExam: React.Dispatch<React.SetStateAction<string>>;
  currentTest: TestType;
  setCurrentTest: React.Dispatch<React.SetStateAction<TestType>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  testCompleted: TestCompletionState;
  setTestCompleted: React.Dispatch<React.SetStateAction<TestCompletionState>>;
  results: ExamResults;
  setResults: React.Dispatch<React.SetStateAction<ExamResults>>;
}

export const useTestActions = ({
  selectedExam,
  setCurrentTest,
  setProgress,
  setLoading,
  testCompleted,
  setTestCompleted,
  results,
  setResults,
  currentTest,
}: TestStateProps): TestStateActions => {
  
  const handleStartTest = () => {
    if (!selectedExam) return;
    setCurrentTest('stress');
    setProgress(10);
  };

  const simulateStressTest = () => {
    setLoading(true);
    let progressCounter = 10;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 30) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleStressTestComplete = (answers: UserAnswer[]) => {
    const stressResults = calculateStressTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      stress: stressResults
    }));
    
    setTestCompleted(prev => ({ ...prev, stress: true }));
    setCurrentTest('readiness');
    setProgress(30);
  };

  const simulateReadinessTest = () => {
    setLoading(true);
    let progressCounter = 30;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 60) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleReadinessTestComplete = (answers: UserAnswer[]) => {
    const readinessResults = calculateReadinessTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      readiness: readinessResults
    }));
    
    setTestCompleted(prev => ({ ...prev, readiness: true }));
    setCurrentTest('concept');
    setProgress(60);
  };

  const simulateConceptTest = () => {
    setLoading(true);
    let progressCounter = 60;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleConceptTestComplete = (answers: UserAnswer[]) => {
    const conceptResults = calculateConceptTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      concept: conceptResults
    }));
    
    setTestCompleted(prev => ({ ...prev, concept: true }));
    
    const overallResults = calculateOverallResults(
      results.stress, 
      results.readiness, 
      conceptResults, 
      selectedExam
    );
    
    setResults(prev => ({
      ...prev,
      overall: overallResults
    }));
    
    setCurrentTest('report');
    setProgress(100);
  };

  const handleNavigation = (test: TestType) => {
    setCurrentTest(test);
    
    // Update progress based on the test
    if (test === 'intro') {
      setProgress(0);
    } else if (test === 'stress') {
      setProgress(10);
    } else if (test === 'readiness') {
      setProgress(30);
    } else if (test === 'concept') {
      setProgress(60);
    } else if (test === 'report') {
      setProgress(100);
    }
  };

  const handleStartOver = () => {
    setCurrentTest('intro');
    setProgress(0);
    setTestCompleted({
      stress: false,
      readiness: false,
      concept: false
    });
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
