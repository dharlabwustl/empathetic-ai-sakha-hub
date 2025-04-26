
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, ChartBar, Brain, Tag } from 'lucide-react';

export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  linkedConcept?: string;
  questionCount: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
}

const PracticeExamCard: React.FC<{ exam: PracticeExam }> = ({ exam }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  const getStatusBadge = () => {
    switch(exam.status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{exam.title}</h3>
          {getStatusBadge()}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
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
          
          {exam.linkedConcept && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              {exam.linkedConcept}
            </Badge>
          )}
          
          <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
            {exam.difficulty}
          </Badge>
        </div>
        
        <div className="flex gap-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {exam.duration} min
          </div>
          <div>
            {exam.questionCount} questions
          </div>
        </div>
        
        {exam.status === 'completed' ? (
          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-gray-500">Score: </span>
              <span className="font-medium">{exam.score}%</span>
            </div>
            <Link to={`/dashboard/student/exams/${exam.id}/review`}>
              <Button className="w-full" variant="outline">
                <ChartBar className="h-4 w-4 mr-2" />
                View Result
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={`/dashboard/student/exams/${exam.id}`}>
            <Button className="w-full">
              Start Test
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeExamCard;
