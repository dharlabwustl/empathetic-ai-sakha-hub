
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle2, XCircle, Zap, Brain } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, TestQuestion, UserAnswer } from './types';
import { getStressTestQuestions } from './test-questions/stressTestQuestions';
import { motion } from 'framer-motion';

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
  
  // Use ref to store timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
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
  };
  
  const handleAnswer = (answer: string) => {
    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
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
  
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" size={16} />
            <span className={`font-medium ${timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
          </div>
        </div>
        
        {currentQuestion.type && (
          <div className="flex items-center">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 flex items-center gap-1">
              {currentQuestion.type === 'pattern-recognition' && <Zap className="h-3 w-3" />}
              {currentQuestion.type === 'memory-recall' && <Brain className="h-3 w-3" />}
              {currentQuestion.type}
            </Badge>
            <div className="ml-auto flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Complexity:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level}
                    className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
                      level <= currentComplexity 
                        ? 'bg-blue-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-100 dark:border-blue-800 shadow-md">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.imageUrl && (
            <div className="mb-4">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Question visual" 
                className="mx-auto max-h-40 object-contain rounded"
              />
            </div>
          )}
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              userAnswers[userAnswers.length - 1].isCorrect 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start">
              {userAnswers[userAnswers.length - 1].isCorrect ? (
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
              ) : (
                <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
              )}
              <div>
                <p className="font-medium">
                  {userAnswers[userAnswers.length - 1].isCorrect 
                    ? `Correct in ${userAnswers[userAnswers.length - 1].timeToAnswer.toFixed(1)}s!` 
                    : 'Incorrect'}
                </p>
                <p className="text-sm mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <CustomProgress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" 
        />
      </div>
    );
  };
  
  const getTestMetrics = () => {
    // Calculate test performance metrics
    if (userAnswers.length === 0) return null;
    
    const answeredQuestions = userAnswers.filter(a => a.answer !== "TIMEOUT");
    const totalAnswered = answeredQuestions.length;
    const correctAnswers = answeredQuestions.filter(a => a.isCorrect).length;
    const avgResponseTime = answeredQuestions.length > 0
      ? answeredQuestions.reduce((sum, a) => sum + a.timeToAnswer, 0) / answeredQuestions.length
      : 0;
    
    return {
      correctRate: totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0,
      avgResponseTime: avgResponseTime.toFixed(1),
      timeoutsCount: userAnswers.filter(a => a.answer === "TIMEOUT").length
    };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="mr-2 text-blue-500" size={20} />
          Cognitive Stress Test
        </h3>
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">1 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test scientifically measures your ability to perform under pressure through pattern recognition, reaction speed, and memory exercises.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Zap className="mr-2 text-blue-500" size={16} />
              Scientific Assessment Components:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><span className="font-medium">Reaction Time:</span> How quickly you can process and respond</li>
              <li><span className="font-medium">Focus under Pressure:</span> Maintaining accuracy with time constraints</li>
              <li><span className="font-medium">Pattern Recognition:</span> Identifying visual and logical patterns</li>
              <li><span className="font-medium">Cognitive Flexibility:</span> Adapting to increasing complexity</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={startTest}
          >
            Begin Cognitive Stress Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border-2 border-blue-100 dark:border-blue-800">
            <div className="text-center">
              <Clock className="mx-auto mb-2 animate-pulse text-blue-500" size={40} />
              <p className="text-sm font-medium">Analyzing cognitive patterns...</p>
            </div>
          </div>
          <CustomProgress value={20} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we calculate your cognitive stress score</p>
        </div>
      ) : isTestActive ? (
        renderQuestion()
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Cognitive Stress Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
            <p className="text-sm">{results.analysis}</p>
            
            {getTestMetrics() && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                  <p className="font-medium">{Math.round(getTestMetrics()?.correctRate || 0)}%</p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg Time</p>
                  <p className="font-medium">{getTestMetrics()?.avgResponseTime}s</p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Time Pressures</p>
                  <p className="font-medium">{getTestMetrics()?.timeoutsCount} timeouts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StressTestSection;
