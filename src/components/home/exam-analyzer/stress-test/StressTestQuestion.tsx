
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Brain, Activity, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestQuestion, UserAnswer } from '../types';
import { CustomProgress } from '@/components/ui/custom-progress';

interface StressTestQuestionProps {
  currentQuestion: TestQuestion;
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  showExplanation: boolean;
  showDistraction: boolean;
  currentComplexity: number;
  userAnswers: UserAnswer[];
  onAnswer: (answer: string) => void;
}

const StressTestQuestion: React.FC<StressTestQuestionProps> = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  showExplanation,
  showDistraction,
  currentComplexity,
  userAnswers,
  onAnswer
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
          Question {currentQuestionIndex + 1}/{questionsLength}
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
                onClick={() => onAnswer(option)}
                disabled={showExplanation}
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900 dark:to-violet-900 flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300 mr-2">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </Button>
            </motion.div>
          ))}
          
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
      
      {showExplanation && (
        <AnswerExplanation 
          userAnswer={userAnswers[userAnswers.length - 1]} 
          explanation={currentQuestion.explanation || ""}
        />
      )}
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questionsLength * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" 
      />
    </div>
  );
};

interface AnswerExplanationProps {
  userAnswer: UserAnswer;
  explanation: string;
}

const AnswerExplanation: React.FC<AnswerExplanationProps> = ({ userAnswer, explanation }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 rounded-lg ${
          userAnswer.isCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-start">
          {userAnswer.isCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 mr-2 mt-1 flex-shrink-0"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 mr-2 mt-1 flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
          <div>
            <p className="font-medium">
              {userAnswer.isCorrect 
                ? `Correct in ${userAnswer.timeToAnswer.toFixed(1)}s!` 
                : 'Incorrect'}
            </p>
            <p className="text-sm mt-1">{explanation}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StressTestQuestion;
