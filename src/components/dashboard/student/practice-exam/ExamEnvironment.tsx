
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ExamEnvironmentProps {
  exam: any;
  currentQuestion: any;
  currentQuestionIndex: number;
  questions: any[];
  selectedAnswers: Record<string, number>;
  examTimer: number | null;
  handleAnswerSelect: (questionId: string, answerIndex: number) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSubmitExam: () => void;
  closeExamEnvironment: () => void;
  examSubmitting: boolean;
  getDifficultyColor: (difficulty: string) => string;
  formatTime: (seconds: number | null) => string;
}

const ExamEnvironment: React.FC<ExamEnvironmentProps> = ({
  exam,
  currentQuestion,
  currentQuestionIndex,
  questions,
  selectedAnswers,
  examTimer,
  handleAnswerSelect,
  handlePreviousQuestion,
  handleNextQuestion,
  handleSubmitExam,
  closeExamEnvironment,
  examSubmitting,
  getDifficultyColor,
  formatTime
}) => {
  const [timeWarning, setTimeWarning] = useState(false);
  
  // Show warning when less than 5 minutes remain
  useEffect(() => {
    if (examTimer !== null && examTimer <= 300 && examTimer > 0) {
      setTimeWarning(true);
    } else {
      setTimeWarning(false);
    }
  }, [examTimer]);
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Exam header */}
        <div className="border-b p-4 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex-1">
            <h2 className="font-semibold">{exam.title}</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className={`px-2 py-0.5 rounded-full ${getDifficultyColor(exam.difficulty)}`}>
                {exam.difficulty}
              </span>
              <span className="text-gray-500 dark:text-gray-400">{questions.length} Questions</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 p-2 rounded-md ${timeWarning ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' : ''}`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(examTimer)}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeExamEnvironment}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="px-4 py-2 border-b">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{progressPercentage.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-1" />
        </div>
        
        {/* Question content */}
        <div className="p-6">
          {currentQuestion ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="text-lg font-medium">{currentQuestion.text}</div>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <motion.div
                      key={`${currentQuestion.id}-option-${index}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.1, delay: index * 0.05 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer border-2 transition-all ${
                          selectedAnswers[currentQuestion.id] === index 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                              selectedAnswers[currentQuestion.id] === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div>{option}</div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <AlertCircle className="h-10 w-10 mx-auto mb-2" />
              <p>Question not found.</p>
            </div>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="border-t p-4 flex justify-between gap-3 sticky bottom-0 bg-white dark:bg-gray-900">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex gap-3">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                variant="default"
                onClick={handleNextQuestion}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmitExam}
                disabled={examSubmitting}
              >
                {examSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    Submitting...
                  </>
                ) : (
                  'Submit Exam'
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExamEnvironment;
