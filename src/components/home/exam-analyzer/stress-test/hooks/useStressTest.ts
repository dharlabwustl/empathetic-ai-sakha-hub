
import { useState, useEffect } from 'react';
import { TestQuestion, UserAnswer } from '../../types';
import { getStressTestQuestions } from '../../test-questions/stressTestQuestions';
import { useStressTimer } from './useStressTimer';
import { useTestProgress } from './useTestProgress';
import { useStressDistraction } from './useStressDistraction';

interface UseStressTestProps {
  selectedExam: string;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

export const useStressTest = ({ selectedExam, onCompleteTest }: UseStressTestProps) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentComplexity, setCurrentComplexity] = useState(1);
  const [selectedCognitiveSet, setSelectedCognitiveSet] = useState<number>(1);
  const [testTimeLeft, setTestTimeLeft] = useState(0);

  const {
    currentQuestionIndex,
    userAnswers,
    showExplanation,
    processingNextQuestion,
    setCurrentQuestionIndex,
    setUserAnswers,
    setShowExplanation,
    setProcessingNextQuestion,
    handleNextQuestion: baseHandleNextQuestion,
  } = useTestProgress({ onCompleteTest });

  const { showDistraction, scheduleDistraction, clearDistraction } = useStressDistraction();

  const currentQuestion = questions.length > 0 && currentQuestionIndex < questions.length 
    ? questions[currentQuestionIndex] 
    : undefined;

  const { startTimer, startTimeRef } = useStressTimer({
    timeLeft,
    setTimeLeft,
    isTestActive,
    handleNextQuestion: () => baseHandleNextQuestion(questions),
    setShowExplanation,
    setProcessingNextQuestion,
    currentQuestion
  });

  const startTest = (setNumber: number = 1) => {
    const testQuestions = getStressTestQuestions(selectedExam, setNumber);
    setQuestions(testQuestions);
    setIsTestActive(true);
    setCurrentQuestionIndex(0);
    setTimeLeft(testQuestions[0]?.timeLimit || 15);
    setCurrentComplexity(testQuestions[0]?.complexityLevel || 1);
    setUserAnswers([]);
    setProcessingNextQuestion(false);
    setShowExplanation(false);
    
    const totalTime = testQuestions.reduce((total, q) => total + q.timeLimit, 0) + 10;
    setTestTimeLeft(totalTime);
    startTestTimer(totalTime);
  };

  const startTestTimer = (totalTime: number) => {
    setTestTimeLeft(totalTime);
    const timer = setInterval(() => {
      setTestTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (answer: string) => {
    if (processingNextQuestion || !currentQuestion) return;
    
    clearDistraction();
    
    const timeToAnswer = (Date.now() - startTimeRef.current) / 1000;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: Math.min(timeToAnswer, currentQuestion.timeLimit),
      isCorrect: answer === currentQuestion.correctAnswer
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    setProcessingNextQuestion(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      setProcessingNextQuestion(false);
      baseHandleNextQuestion(questions);
    }, 3000);
  };

  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit);
      if (currentQuestion.complexityLevel) {
        setCurrentComplexity(currentQuestion.complexityLevel);
      }
      scheduleDistraction(currentQuestion);
    }
  }, [currentQuestion, scheduleDistraction]);

  return {
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
  };
};
