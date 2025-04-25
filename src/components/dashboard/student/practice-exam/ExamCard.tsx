
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, LoaderCircle, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    subject: string;
    description: string;
    progress?: number;
    cardCount?: number;
    timeEstimate: string;
    difficulty: string;
    questions: number;
    completed?: boolean;
    score?: number;
    dateCompleted?: string;
  };
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
      key={exam.id}
      className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
      whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onExamClick(exam)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
            {exam.title}
            {exam.completed ? (
              <div className="h-3.5 w-3.5 ml-1.5 text-green-500">✓</div>
            ) : (
              <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-gray-400" />
            )}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {exam.subject} • {exam.completed ? `Score: ${exam.score}%` : `${exam.questions} questions`}
          </p>
        </div>
        <Badge className={`${getDifficultyColor(exam.difficulty)}`}>
          {exam.completed ? "Completed" : exam.difficulty}
        </Badge>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {exam.completed ? `Completed: ${exam.dateCompleted}` : `Duration: ${exam.timeEstimate}`}
        </span>
        {exam.completed ? (
          <Button 
            size="sm" 
            variant="outline"
            className="h-7 text-xs border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
            onClick={(e) => onReviewExam(exam, e)}
          >
            Review Exam
          </Button>
        ) : (
          <Button 
            size="sm" 
            className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => onStartExam(exam, e)}
            disabled={isLoadingExam}
          >
            {isLoadingExam ? (
              <>
                <LoaderCircle className="h-3 w-3 mr-1 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Start Exam
                <ArrowRight className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ExamCard;
