
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, X, LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

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
  if (!currentQuestion) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
            <p className="mb-6">This exam has no questions yet.</p>
            <Button onClick={closeExamEnvironment}>Close Exam</Button>
          </div>
        </div>
      </motion.div>
    );
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{exam.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentQuestionIndex + 1} of {questions.length} questions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getDifficultyColor(exam.difficulty)}>
              {exam.difficulty}
            </Badge>
            <span className="text-sm font-medium flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded-md">
              <Clock className="h-4 w-4" />
              {formatTime(examTimer)}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeExamEnvironment}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2 w-full bg-gray-100 dark:bg-gray-800" />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Progress: {answeredCount}/{questions.length} questions answered</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-3">Question {currentQuestionIndex + 1}</h3>
            <p className="mb-6 text-gray-800 dark:text-gray-200">{currentQuestion.text}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option: string, index: number) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[currentQuestion.id] === index 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                      selectedAnswers[currentQuestion.id] === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button 
            variant="outline"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSubmitExam}
            disabled={examSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {examSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : 'Submit Exam'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExamEnvironment;
