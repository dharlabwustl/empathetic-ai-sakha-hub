
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Star, BarChart } from "lucide-react";
import { motion } from "framer-motion";

interface ExamCardProps {
  exam: any;
  onExamClick: (exam: any) => void;
  onStartExam: (exam: any, e: React.MouseEvent) => void;
  onReviewExam: (exam: any, e: React.MouseEvent) => void;
  isLoadingExam: boolean;
  getDifficultyColor: (difficulty: string) => string;
}

const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onExamClick,
  onStartExam,
  onReviewExam,
  isLoadingExam,
  getDifficultyColor
}) => {
  return (
    <motion.div
      className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onExamClick(exam)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-wrap justify-between gap-2">
        <div className="space-y-1">
          <h3 className="font-medium">{exam.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {exam.description}
          </p>
        </div>

        {!isLoadingExam && (
          <div>
            {exam.completed ? (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={(e) => onReviewExam(exam, e)}
              >
                <BarChart className="h-4 w-4" />
                Review
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="gap-1"
                onClick={(e) => onStartExam(exam, e)}
              >
                <BookOpen className="h-4 w-4" />
                Start
              </Button>
            )}
          </div>
        )}

        {isLoadingExam && (
          <Button variant="outline" size="sm" disabled>
            <span className="animate-spin mr-1">◌</span>
            Loading...
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className={`px-2 py-1 rounded-full ${getDifficultyColor(exam.difficulty)}`}>
            {exam.difficulty}
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3" />
          {exam.timeEstimate || exam.duration}
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <BookOpen className="h-3 w-3" />
          {exam.questions} questions
        </div>
        {exam.completed && (
          <>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Star className={exam.score >= 80 ? "h-3 w-3 text-yellow-500" : "h-3 w-3"} />
              Score: {exam.score}%
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <span>Completed: {exam.dateCompleted || exam.dateTaken}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ExamCard;
