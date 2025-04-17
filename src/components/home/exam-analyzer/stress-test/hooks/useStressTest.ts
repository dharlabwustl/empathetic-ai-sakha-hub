
import { useState, useRef, useEffect } from 'react';
import { TestQuestion, UserAnswer } from '../../types';
import { getStressTestQuestions } from '../../test-questions/stressTestQuestions';

interface UseStressTestProps {
  selectedExam: string;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

export const useStressTest = ({ selectedExam, onCompleteTest }: UseStressTestProps) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentComplexity, setCurrentComplexity] = useState(1);
  const [showDistraction, setShowDistraction] = useState(false);
  const [selectedCognitiveSet, setSelectedCognitiveSet] = useState<number>(1);
  const [totalTestTime, setTotalTestTime] = useState<number>(0);
  const [testTimeLeft, setTestTimeLeft] = useState<number>(0);
  const [processingNextQuestion, setProcessingNextQuestion] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const testTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const distractionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const explanationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear all timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (testTimerRef.current) clearInterval(testTimerRef.current);
      if (distractionTimerRef.current) clearTimeout(distractionTimerRef.current);
      if (explanationTimeoutRef.current) clearTimeout(explanationTimeoutRef.current);
    };
  }, []);
  
  const startTest = (setNumber: number = 1) => {
    setSelectedCognitiveSet(setNumber);
    const testQuestions = getStressTestQuestions(selectedExam, setNumber);
    
    const sortedQuestions = [...testQuestions].sort((a, b) => {
      const complexityA = a.complexityLevel || 1;
      const complexityB = b.complexityLevel || 1;
      return complexityA - complexityB;
    });
    
    setQuestions(sortedQuestions);
    setIsTestActive(true);
    setCurrentQuestionIndex(0); // Ensure we start at the first question
    setTimeLeft(sortedQuestions[0]?.timeLimit || 15);
    setCurrentComplexity(sortedQuestions[0]?.complexityLevel || 1);
    setUserAnswers([]);
    setProcessingNextQuestion(false);
    setShowExplanation(false);
    
    // Calculate total test time (sum of all question time limits plus a buffer)
    const totalTime = sortedQuestions.reduce((total, q) => total + q.timeLimit, 0) + 10;
    setTotalTestTime(totalTime);
    setTestTimeLeft(totalTime);
    
    // Start both question timer and overall test timer
    startTimer();
    startTestTimer();
  };
  
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          
          const currentQ = questions[currentQuestionIndex];
          if (!currentQ) return 0; // Guard against undefined
          
          const timeoutAnswer: UserAnswer = {
            questionId: currentQ.id,
            answer: "TIMEOUT",
            timeToAnswer: currentQ.timeLimit,
            isCorrect: false
          };
          
          setUserAnswers(prev => [...prev, timeoutAnswer]);
          setShowExplanation(true);
          setProcessingNextQuestion(true);
          
          // Clear any previous explanation timeout
          if (explanationTimeoutRef.current) {
            clearTimeout(explanationTimeoutRef.current);
          }
          
          // Schedule moving to the next question after showing explanation
          explanationTimeoutRef.current = setTimeout(() => {
            setShowExplanation(false);
            setProcessingNextQuestion(false);
            handleNextQuestion();
          }, 3000); // Show explanation for 3 seconds
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    scheduleDistraction();
  };
  
  const startTestTimer = () => {
    if (testTimerRef.current) {
      clearInterval(testTimerRef.current);
    }
    
    testTimerRef.current = setInterval(() => {
      setTestTimeLeft(prev => {
        if (prev <= 1) {
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const endTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (testTimerRef.current) clearInterval(testTimerRef.current);
    if (distractionTimerRef.current) clearTimeout(distractionTimerRef.current);
    if (explanationTimeoutRef.current) clearTimeout(explanationTimeoutRef.current);
    
    setIsTestActive(false);
    onCompleteTest(userAnswers);
  };
  
  const scheduleDistraction = () => {
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Guard against undefined
    
    const distractionDelay = Math.floor(Math.random() * (currentQuestion.timeLimit - 3) * 1000) + 2000;
    
    distractionTimerRef.current = setTimeout(() => {
      setShowDistraction(true);
      
      setTimeout(() => {
        setShowDistraction(false);
      }, 1500);
    }, distractionDelay);
  };
  
  const handleAnswer = (answer: string) => {
    if (processingNextQuestion) return; // Prevent multiple answers while processing
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
      setShowDistraction(false);
    }
    
    // Clear any previous explanation timeout
    if (explanationTimeoutRef.current) {
      clearTimeout(explanationTimeoutRef.current);
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Guard against undefined
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const timeToAnswer = (Date.now() - startTimeRef.current) / 1000;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: Math.min(timeToAnswer, currentQuestion.timeLimit),
      isCorrect
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    setProcessingNextQuestion(true);
    
    explanationTimeoutRef.current = setTimeout(() => {
      setShowExplanation(false);
      setProcessingNextQuestion(false);
      handleNextQuestion();
    }, 3000); // Show for 3 seconds
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      const nextQuestion = questions[nextIndex];
      if (!nextQuestion) return; // Guard against undefined
      
      if (nextQuestion.complexityLevel) {
        setCurrentComplexity(nextQuestion.complexityLevel);
      }
      
      setTimeLeft(nextQuestion.timeLimit);
      startTimer();
    } else {
      endTest();
    }
  };

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
    totalTestTime,
    testTimeLeft,
    processingNextQuestion,
    startTest,
    handleAnswer
  };
};
