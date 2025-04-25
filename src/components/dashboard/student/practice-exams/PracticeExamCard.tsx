
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Tag, FileText, ChevronRight, ChartBar } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  linkedConcept?: string;
  questionCount: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
  isBookmarked?: boolean;
}

interface PracticeExamCardProps {
  exam: PracticeExam;
}

const PracticeExamCard: React.FC<PracticeExamCardProps> = ({ exam }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Not Started
          </Badge>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{exam.title}</h3>
            {getStatusBadge(exam.status)}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {exam.subject}
            </Badge>
            
            {exam.topic && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {exam.topic}
              </Badge>
            )}
            
            <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
              {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
            </Badge>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              {exam.questionCount} questions
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {exam.duration} min
            </div>
          </div>
          
          {exam.status === 'completed' ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Score</span>
                <span className="font-medium">{exam.score}%</span>
              </div>
              <Link to={`/dashboard/student/exams/${exam.id}/review`}>
                <Button className="w-full" variant="outline">
                  <ChartBar className="h-4 w-4 mr-1" />
                  View Result
                </Button>
              </Link>
            </div>
          ) : (
            <Link to={`/dashboard/student/exams/${exam.id}`}>
              <Button className="w-full">
                <ChevronRight className="h-4 w-4 mr-1" />
                Start Test
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PracticeExamCard;
