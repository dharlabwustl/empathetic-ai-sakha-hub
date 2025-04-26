
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic: string;
  questionCount: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
}

interface PracticeExamCardProps {
  exam: PracticeExam;
}

const PracticeExamCard: React.FC<PracticeExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  
  const handleStartExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}`);
  };
  
  const handleReviewExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}/results`);
  };
  
  // Define color schemes based on difficulty
  const difficultyColors = {
    easy: 'bg-green-50 text-green-700 border-green-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    hard: 'bg-red-50 text-red-700 border-red-200',
  };
  
  // Define status components
  const statusDisplay = {
    'not-started': <Badge variant="outline" className="bg-gray-100">Not Started</Badge>,
    'in-progress': <Badge variant="outline" className="bg-blue-100 text-blue-700">In Progress</Badge>,
    'completed': <Badge variant="outline" className="bg-green-100 text-green-700">Completed</Badge>,
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md border-t-2 border-t-blue-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base line-clamp-2">{exam.title}</h3>
          {statusDisplay[exam.status]}
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <div className="mb-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Subject:</span>
            <span className="font-medium">{exam.subject}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Topic:</span>
            <span className="font-medium">{exam.topic}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Questions:</span>
            <span className="font-medium">{exam.questionCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              {exam.duration} min
            </span>
          </div>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${difficultyColors[exam.difficulty]}`}>
          <span className="capitalize">{exam.difficulty}</span> Difficulty
        </div>
        
        {exam.score !== undefined && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Score:</span>
              <span className={`font-bold ${
                exam.score >= 80 ? 'text-green-600' : 
                exam.score >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {exam.score}%
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {exam.status === 'completed' ? (
          <Button 
            onClick={handleReviewExam} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Review Exam
          </Button>
        ) : exam.status === 'in-progress' ? (
          <Button 
            onClick={handleStartExam} 
            variant="default" 
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <AlertCircle className="h-4 w-4" />
            Continue Exam
          </Button>
        ) : (
          <Button 
            onClick={handleStartExam} 
            variant="default" 
            className="w-full flex items-center justify-center gap-2"
          >
            <PlayCircle className="h-4 w-4" />
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeExamCard;
