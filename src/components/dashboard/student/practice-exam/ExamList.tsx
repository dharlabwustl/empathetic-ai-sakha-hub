
import React from 'react';
import { motion } from "framer-motion";
import ExamCard from './ExamCard';

interface ExamListProps {
  exams: any[];
  onExamClick: (exam: any) => void;
  onStartExam: (exam: any, e: React.MouseEvent) => void;
  onReviewExam: (exam: any, e: React.MouseEvent) => void;
  isLoadingExam: boolean;
  getDifficultyColor: (difficulty: string) => string;
}

const ExamList: React.FC<ExamListProps> = ({
  exams,
  onExamClick,
  onStartExam,
  onReviewExam,
  isLoadingExam,
  getDifficultyColor
}) => {
  if (exams.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No exams available
      </div>
    );
  }

  return (
    <motion.div className="space-y-3">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          exam={exam}
          onExamClick={onExamClick}
          onStartExam={onStartExam}
          onReviewExam={onReviewExam}
          isLoadingExam={isLoadingExam}
          getDifficultyColor={getDifficultyColor}
        />
      ))}
    </motion.div>
  );
};

export default ExamList;
