
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion } from "framer-motion";

interface ExamEnvironmentProps {
  exam: any;
  currentQuestion: any;
  currentQuestionIndex: number;
  questions: any[];
  selectedAnswers: Record<string, number | null>;
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
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{exam.title}</h2>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Badge className={getDifficultyColor(exam.difficulty)}>
                {exam.difficulty}
              </Badge>
              <span className="text-gray-500 dark:text-gray-400">
                {questions.length} Questions
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
              <div className="flex items-center text-blue-700 dark:text-blue-300">
                <Clock className="h-4 w-4 mr-2" />
                <span>{formatTime(examTimer)}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500"
              onClick={closeExamEnvironment}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1 mb-6">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {currentQuestion && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">{currentQuestion.text}</h3>
              
              <div className="space-y-2">
                {currentQuestion.options.map((option: string, index: number) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestion.id] === index 
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                          selectedAnswers[currentQuestion.id] === index 
                            ? "border-blue-500 bg-blue-500 text-white" 
                            : "border-gray-300"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button 
                  onClick={handleNextQuestion}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitExam}
                  disabled={examSubmitting}
                >
                  {examSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Exam"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExamEnvironment;
