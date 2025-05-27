
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useTestState = () => {
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartTest = (testType: string) => {
    if (!selectedExam && testType !== 'scholar') {
      toast({
        title: "Please select an exam",
        description: "Choose your target exam to continue",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentTest(testType);
    setTestCompleted(false);
    setResults(null);
    setProgress(0);
    
    if (testType === 'readiness') {
      simulateReadinessTest();
    } else if (testType === 'scholar') {
      simulateScholarTest();
    } else if (testType === 'concept') {
      simulateConceptTest();
    }
  };

  const simulateReadinessTest = () => {
    setLoading(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLoading(false);
      }
      setProgress(currentProgress);
    }, 500);
  };

  const simulateScholarTest = () => {
    setLoading(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLoading(false);
      }
      setProgress(currentProgress);
    }, 600);
  };

  const simulateConceptTest = () => {
    setLoading(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLoading(false);
      }
      setProgress(currentProgress);
    }, 700);
  };

  const handleReadinessTestComplete = () => {
    const mockResults = {
      overall: Math.floor(Math.random() * 30) + 60,
      subjects: {
        physics: Math.floor(Math.random() * 40) + 50,
        chemistry: Math.floor(Math.random() * 40) + 45,
        biology: Math.floor(Math.random() * 40) + 55
      },
      recommendations: [
        "Focus more on Chemistry organic reactions",
        "Strengthen Physics mechanics concepts",
        "Review Biology classification thoroughly"
      ]
    };
    setResults(mockResults);
    setTestCompleted(true);
  };

  const handleScholarTestComplete = () => {
    const score = Math.floor(Math.random() * 30) + 75; // 75-100% range
    const qualified = score >= 90;
    
    const mockResults = {
      score,
      qualified,
      subjects: {
        physics: Math.floor(Math.random() * 25) + 75,
        chemistry: Math.floor(Math.random() * 25) + 75,
        biology: Math.floor(Math.random() * 25) + 75
      },
      message: qualified 
        ? "🎉 Congratulations! You've qualified for 1 month free premium access!"
        : "Great effort! You need 90% or above to qualify for free premium access."
    };
    setResults(mockResults);
    setTestCompleted(true);
    
    if (qualified) {
      toast({
        title: "Congratulations! 🎉",
        description: "You've earned 1 month of free premium access!",
      });
    }
  };

  const handleConceptTestComplete = () => {
    const mockResults = {
      overall: Math.floor(Math.random() * 40) + 50,
      conceptsMastered: Math.floor(Math.random() * 20) + 15,
      conceptsToReview: Math.floor(Math.random() * 10) + 8,
      subjects: {
        physics: Math.floor(Math.random() * 40) + 50,
        chemistry: Math.floor(Math.random() * 40) + 45,
        biology: Math.floor(Math.random() * 40) + 55
      }
    };
    setResults(mockResults);
    setTestCompleted(true);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleStartOver = () => {
    setCurrentTest(null);
    setSelectedExam('');
    setProgress(0);
    setLoading(false);
    setTestCompleted(false);
    setResults(null);
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
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateScholarTest,
    handleScholarTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  };
};
