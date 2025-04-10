
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle2, XCircle, Zap, Brain, Activity, Timer } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, TestQuestion, UserAnswer } from './types';
import { getStressTestQuestions } from './test-questions/stressTestQuestions';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <Timer className={`${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} size={18} />
            <span className={`font-medium ${timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between"
        >
          {currentQuestion.type && (
            <div className="flex items-center">
              <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 flex items-center gap-1">
                {currentQuestion.type === 'pattern-recognition' && <Zap className="h-3 w-3" />}
                {currentQuestion.type === 'memory-recall' && <Brain className="h-3 w-3" />}
                {currentQuestion.type}
              </Badge>
            </div>
          )}
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Complexity:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level}
                  className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
                    level <= currentComplexity 
                      ? 'bg-gradient-to-r from-blue-400 to-violet-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-800/50 shadow-lg"
          animate={{ scale: showDistraction ? 0.98 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.imageUrl && (
            <div className="mb-4">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Question visual" 
                className="mx-auto max-h-40 object-contain rounded-lg shadow-md"
              />
            </div>
          )}
          
          <div className="space-y-3 relative">
            {currentQuestion.options.map((option, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full text-left justify-start p-4 h-auto border-blue-100 dark:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900 dark:to-violet-900 flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300 mr-2">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </Button>
              </motion.div>
            ))}
            
            {/* Scientific distraction overlay */}
            <AnimatePresence>
              {showDistraction && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800 shadow-lg flex items-center">
                    <Activity className="text-red-500 mr-2 animate-pulse" size={20} />
                    <span className="font-medium text-red-600 dark:text-red-300">Stay focused!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
        </AnimatePresence>
        
        <CustomProgress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" 
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
        <h3 className="text-lg font-medium flex items-center bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          <Clock className="mr-2 text-blue-500" size={20} />
          Cognitive Stress Test
        </h3>
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">1 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This scientific test measures your ability to perform under pressure through pattern recognition, reaction speed, and memory exercises.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 shadow-md">
            <h4 className="font-medium mb-3 flex items-center text-blue-700 dark:text-blue-400">
              <Zap className="mr-2 text-blue-500" size={18} />
              Scientific Assessment Components:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">1</div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Reaction Time:</span>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">How quickly you can process and respond</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">2</div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Focus under Pressure:</span>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Maintaining accuracy with time constraints</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">3</div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Pattern Recognition:</span>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Identifying visual and logical patterns</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">4</div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Cognitive Flexibility:</span>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Adapting to increasing complexity</p>
                </div>
              </li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg p-6 h-auto text-lg"
            onClick={startTest}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Zap className="mr-2" size={20} />
              Begin Cognitive Stress Test
            </motion.div>
          </Button>
        </div>
      ) : loading ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-40 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl flex items-center justify-center border-2 border-blue-100 dark:border-blue-800/50 shadow-md">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Clock className="mx-auto mb-2 text-blue-500" size={40} />
              </motion.div>
              <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Analyzing cognitive patterns...</p>
            </div>
          </div>
          <CustomProgress value={20} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we calculate your cognitive stress score</p>
        </motion.div>
      ) : isTestActive ? (
        renderQuestion()
      ) : (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 shadow-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-blue-700 dark:text-blue-400">Your Cognitive Stress Score:</h4>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName={`bg-gradient-to-r ${
              results.score >= 80 ? 'from-green-400 to-green-600' :
              results.score >= 65 ? 'from-blue-400 to-blue-600' :
              results.score >= 50 ? 'from-amber-400 to-amber-600' :
              'from-red-400 to-red-600'
            }`} />
            <p className="text-sm">{results.analysis}</p>
            
            {getTestMetrics() && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Accuracy</p>
                  <p className="font-medium text-blue-700 dark:text-blue-300">{Math.round(getTestMetrics()?.correctRate || 0)}%</p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Time</p>
                  <p className="font-medium text-blue-700 dark:text-blue-300">{getTestMetrics()?.avgResponseTime}s</p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time Pressures</p>
                  <p className="font-medium text-blue-700 dark:text-blue-300">{getTestMetrics()?.timeoutsCount} timeouts</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StressTestSection;
