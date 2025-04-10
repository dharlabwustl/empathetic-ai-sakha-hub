
import { useState } from 'react';
import { TestType, TestCompletionState, ExamResults, UserAnswer } from '../types';
import {
  calculateStressTestResults,
  calculateReadinessTestResults,
  calculateConceptTestResults,
  calculateOverallResults,
} from '../testDataService';

export const useTestState = (selectedExamInitial: string = '') => {
  const [currentTest, setCurrentTest] = useState<TestType>('intro');
  const [selectedExam, setSelectedExam] = useState<string>(selectedExamInitial);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState<TestCompletionState>({
    stress: false,
    readiness: false,
    concept: false
  });
  
  const [results, setResults] = useState<ExamResults>({
    stress: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    readiness: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    concept: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    overall: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    }
  });

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

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentTest === 'stress') {
        setCurrentTest('intro');
        setProgress(0);
      } else if (currentTest === 'readiness') {
        setCurrentTest('stress');
        setProgress(10);
      } else if (currentTest === 'concept') {
        setCurrentTest('readiness');
        setProgress(30);
      } else if (currentTest === 'report') {
        setCurrentTest('concept');
        setProgress(60);
      }
    } else {
      if (currentTest === 'stress' && testCompleted.stress) {
        setCurrentTest('readiness');
        setProgress(30);
      } else if (currentTest === 'readiness' && testCompleted.readiness) {
        setCurrentTest('concept');
        setProgress(60);
      } else if (currentTest === 'concept' && testCompleted.concept) {
        setCurrentTest('report');
        setProgress(100);
      }
    }
  };

  const handleStartOver = () => {
    setCurrentTest('intro');
    setSelectedExam('');
    setTestCompleted({
      stress: false,
      readiness: false,
      concept: false
    });
    setProgress(0);
  };

  return {
    currentTest,
    selectedExam,
    setSelectedExam,
    progress,
    loading,
    testCompleted,
    results,
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
