
import React, { useState, useEffect, useRef } from 'react';
import { TestResults, TestQuestion, UserAnswer } from './types';
import { getStressTestQuestions, getCognitiveTestSets } from './test-questions/stressTestQuestions';
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
  const [selectedCognitiveSet, setSelectedCognitiveSet] = useState<number>(1); // Default to the first set
  const [totalTestTime, setTotalTestTime] = useState<number>(0);
  const [testTimeLeft, setTestTimeLeft] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const testTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const distractionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (testTimerRef.current) clearInterval(testTimerRef.current);
      if (distractionTimerRef.current) clearTimeout(distractionTimerRef.current);
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
    setTimeLeft(sortedQuestions[0].timeLimit);
    setCurrentComplexity(sortedQuestions[0].complexityLevel || 1);
    
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
    
    setIsTestActive(false);
    onCompleteTest(userAnswers);
  };
  
  const scheduleDistraction = () => {
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const distractionDelay = Math.floor(Math.random() * (currentQuestion.timeLimit - 3) * 1000) + 2000;
    
    distractionTimerRef.current = setTimeout(() => {
      setShowDistraction(true);
      
      setTimeout(() => {
        setShowDistraction(false);
      }, 1500);
    }, distractionDelay);
  };
  
  const handleAnswer = (answer: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
      setShowDistraction(false);
    }
    
    const currentQuestion = questions[currentQuestionIndex];
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
    
    setTimeout(() => {
      setShowExplanation(false);
      handleNextQuestion();
    }, 2000);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      const nextQuestion = questions[nextIndex];
      if (nextQuestion.complexityLevel) {
        setCurrentComplexity(nextQuestion.complexityLevel);
      }
      
      setTimeLeft(questions[nextIndex].timeLimit);
      startTimer();
    } else {
      endTest();
    }
  };

  // Get cognitive test sets for the selected exam
  const cognitiveTestSets = getCognitiveTestSets(selectedExam);

  return (
    <div className="space-y-6">
      <StressTestHeader />
      
      <p className="text-sm">
        This scientific test measures your ability to perform under pressure through pattern recognition, 
        reaction speed, and memory exercises specific to {selectedExam}.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div>
          <StressTestIntro onStart={() => startTest(selectedCognitiveSet)} />
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Select Cognitive Test Set:</h3>
            <div className="flex gap-2">
              {[1, 2, 3].map(setNum => (
                <button
                  key={setNum}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedCognitiveSet === setNum 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setSelectedCognitiveSet(setNum)}
                >
                  Set {setNum}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Each set focuses on different cognitive skills relevant to {selectedExam}.
            </p>
          </div>
        </div>
      ) : loading ? (
        <StressTestLoading />
      ) : isTestActive ? (
        <div>
          <div className="mb-2 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
            <div>
              Test time remaining: {Math.floor(testTimeLeft / 60)}:{(testTimeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div>
              Set {selectedCognitiveSet} - Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
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
        </div>
      ) : (
        <StressTestResults results={results} userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default StressTestSection;
