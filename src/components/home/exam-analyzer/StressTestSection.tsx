
import React, { useState, useEffect, useRef } from 'react';
import { TestResults, TestQuestion, UserAnswer } from './types';
import { getStressTestQuestions } from './test-questions/stressTestQuestions';
import StressTestHeader from './stress-test/StressTestHeader';
import StressTestQuestion from './stress-test/StressTestQuestion';
import StressTestIntro from './stress-test/StressTestIntro';
import StressTestLoading from './stress-test/StressTestLoading';
import StressTestResults from './stress-test/StressTestResults';

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
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentComplexity, setCurrentComplexity] = useState(1);
  const [showDistraction, setShowDistraction] = useState(false);
  
  // Use ref to store timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const distractionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (distractionTimerRef.current) clearTimeout(distractionTimerRef.current);
    };
  }, []);
  
  const startTest = () => {
    // Get questions for the selected exam type
    const testQuestions = getStressTestQuestions(selectedExam);
    
    // Sort questions by complexity if available
    const sortedQuestions = [...testQuestions].sort((a, b) => {
      const complexityA = a.complexityLevel || 1;
      const complexityB = b.complexityLevel || 1;
      return complexityA - complexityB;
    });
    
    setQuestions(sortedQuestions);
    setIsTestActive(true);
    setTimeLeft(sortedQuestions[0].timeLimit);
    setCurrentComplexity(sortedQuestions[0].complexityLevel || 1);
    
    // Start the countdown timer
    startTimer();
  };
  
  const startTimer = () => {
    // Clear existing timer if any
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Record start time for reaction time measurement
    startTimeRef.current = Date.now();
    
    // Start new timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - move to next question
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          
          // Record timed-out answer
          const currentQ = questions[currentQuestionIndex];
          const timeoutAnswer: UserAnswer = {
            questionId: currentQ.id,
            answer: "TIMEOUT",
            timeToAnswer: currentQ.timeLimit,
            isCorrect: false
          };
          
          setUserAnswers(prev => [...prev, timeoutAnswer]);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Add random distractions for scientific stress testing
    scheduleDistraction();
  };
  
  const scheduleDistraction = () => {
    // Clear existing distraction timer if any
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
    }
    
    // Schedule a distraction at random time during the question
    const currentQuestion = questions[currentQuestionIndex];
    const distractionDelay = Math.floor(Math.random() * (currentQuestion.timeLimit - 3) * 1000) + 2000;
    
    distractionTimerRef.current = setTimeout(() => {
      setShowDistraction(true);
      
      // Hide the distraction after 1.5 seconds
      setTimeout(() => {
        setShowDistraction(false);
      }, 1500);
    }, distractionDelay);
  };
  
  const handleAnswer = (answer: string) => {
    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Clear the distraction timer
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
      setShowDistraction(false);
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Calculate time taken to answer
    const timeToAnswer = (Date.now() - startTimeRef.current) / 1000;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: Math.min(timeToAnswer, currentQuestion.timeLimit), // Cap at max time limit
      isCorrect
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    
    // Automatically proceed to next question after explanation
    setTimeout(() => {
      setShowExplanation(false);
      handleNextQuestion();
    }, 2000);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Update complexity level if available
      const nextQuestion = questions[nextIndex];
      if (nextQuestion.complexityLevel) {
        setCurrentComplexity(nextQuestion.complexityLevel);
      }
      
      setTimeLeft(questions[nextIndex].timeLimit);
      startTimer(); // Restart timer for next question
    } else {
      // Test is complete
      setIsTestActive(false);
      onCompleteTest(userAnswers);
    }
  };

  return (
    <div className="space-y-6">
      <StressTestHeader />
      
      <p className="text-sm">
        This scientific test measures your ability to perform under pressure through pattern recognition, reaction speed, and memory exercises.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <StressTestIntro onStart={startTest} />
      ) : loading ? (
        <StressTestLoading />
      ) : isTestActive ? (
        <StressTestQuestion
          currentQuestion={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          timeLeft={timeLeft}
          showExplanation={showExplanation}
          showDistraction={showDistraction}
          currentComplexity={currentComplexity}
          userAnswers={userAnswers}
          onAnswer={handleAnswer}
        />
      ) : (
        <StressTestResults results={results} userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default StressTestSection;
