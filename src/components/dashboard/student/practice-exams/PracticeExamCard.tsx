
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, FileText } from 'lucide-react';

export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic: string;
  questionCount: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
  linkedConceptIds?: string[];
  linkedFlashcardIds?: string[];
}

interface Props {
  exam: PracticeExam;
}

const PracticeExamCard: React.FC<Props> = ({ exam }) => {
  const navigate = useNavigate();
  
  const handleStartExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}`);
  };
  
  const handleReviewExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}/results`);
  };
  
  const getDifficultyColor = () => {
    switch (exam.difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return '';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-sm text-gray-500">
            {exam.subject}
          </span>
          <Badge 
            variant="outline" 
            className={getDifficultyColor()}
          >
            {exam.difficulty}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
        
        <div className="flex flex-wrap gap-2 mt-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {exam.questionCount} questions
          </Badge>
          <Badge variant="outline" className="text-xs">
            {exam.duration} min
          </Badge>
        </div>
        
        <div className="mt-auto space-y-2">
          {exam.status === 'completed' ? (
            <>
              <div className="text-sm text-gray-500 mb-2">
                Score: {exam.score}%
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleReviewExam}
              >
                <FileText className="h-4 w-4 mr-2" />
                Review Exam
              </Button>
            </>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleStartExam}
            >
              <Play className="h-4 w-4 mr-2" />
              {exam.status === 'in-progress' ? 'Continue Exam' : 'Start Exam'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeExamCard;
