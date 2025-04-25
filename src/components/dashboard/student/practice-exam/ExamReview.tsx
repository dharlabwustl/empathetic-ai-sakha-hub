
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, FileText, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";

interface ExamReviewProps {
  exam: any;
  reviewData: any;
  closeExamReview: () => void;
  handleToast: (title: string, description: string) => void;
}

const ExamReview: React.FC<ExamReviewProps> = ({
  exam,
  reviewData,
  closeExamReview,
  handleToast
}) => {
  if (!reviewData) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{exam.title} - Review</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">No review data available for this exam.</p>
            <Button onClick={closeExamReview}>Close Review</Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{exam.title} - Review</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed on: {exam.dateCompleted} | Score: {exam.score}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Completed
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeExamReview}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Performance Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-xl font-bold">{exam.score}%</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
                <p className="text-xl font-bold">{reviewData.timeSpent}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                <p className="text-xl font-bold">{reviewData.correctAnswers}/{reviewData.questions.length}</p>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div>
            <h3 className="text-lg font-medium mb-3">Questions Review</h3>
            {reviewData.questions.map((question: any, qIndex: number) => {
              const userAnswer = reviewData.userAnswers[qIndex];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Question {qIndex + 1}</span>
                      <h4 className="font-medium">{question.text}</h4>
                    </div>
                    <Badge className={isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium">Your answer:</p>
                    <p className={`text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {question.options[userAnswer] || "No answer selected"}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Correct answer:</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {question.options[question.correctAnswer]}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Explanation:</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Review concepts related to questions you missed</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Practice similar problems to reinforce understanding</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Consider attempting the next difficulty level exam</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={closeExamReview}>
              Close Review
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                handleToast("Report Downloaded", "Your exam report has been downloaded.");
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExamReview;
