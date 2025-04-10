
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
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
  
  const startTest = () => {
    // Get questions for the selected exam type
    const testQuestions = getStressTestQuestions(selectedExam);
    setQuestions(testQuestions);
    setIsTestActive(true);
    setTimeLeft(testQuestions[0].timeLimit);
    
    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: currentQuestion.timeLimit - timeLeft,
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
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(questions[currentQuestionIndex + 1].timeLimit);
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
            <span className={`font-medium ${timeLeft < 5 ? 'text-red-500' : ''}`}>{timeLeft}s</span>
          </div>
        </div>
        
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
                  {userAnswers[userAnswers.length - 1].isCorrect ? 'Correct!' : 'Incorrect'}
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
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="mr-2 text-blue-500" size={20} />
          Stress Level Test
        </h3>
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">1 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test measures your ability to perform under pressure through pattern recognition, reaction speed, and memory recall exercises.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Clock className="mr-2 text-blue-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You'll face 8 pattern recognition challenges</li>
              <li>Each question has a 15-second time limit</li>
              <li>Try to maintain focus despite distractions</li>
              <li>Answer as quickly and accurately as possible</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={startTest}
          >
            Begin Stress Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border-2 border-blue-100 dark:border-blue-800">
            <div className="text-center">
              <Clock className="mx-auto mb-2 animate-pulse text-blue-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={20} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : isTestActive ? (
        renderQuestion()
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Stress Level Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StressTestSection;
