
import { useState } from 'react';
import { TestType, TestCompletionState, ExamResults } from '../../types';

export const useTestStateInitialization = (selectedExamInitial: string = '') => {
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

  return {
    currentTest,
    setCurrentTest,
    selectedExam,
    setSelectedExam,
    progress,
    setProgress,
    loading,
    setLoading,
    testCompleted,
    setTestCompleted,
    results,
    setResults
  };
};
