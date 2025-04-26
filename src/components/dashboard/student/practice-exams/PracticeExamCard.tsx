
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Clock, FileText, Tag, Star, CheckCircle } from 'lucide-react';

interface PracticeExamCardProps {
  id: string;
  title: string;
  subject: string;
  topic: string;
  linkedConcept: string;
  questionCount: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  score?: number;
  onStart: (id: string) => void;
  onViewResult: (id: string) => void;
}

export const PracticeExamCard: React.FC<PracticeExamCardProps> = ({
  id,
  title,
  subject,
  topic,
  linkedConcept,
  questionCount,
  duration,
  difficulty,
  completed,
  score,
  onStart,
  onViewResult,
}) => {
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <Badge className={getDifficultyColor()}>
              {difficulty}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="outline" className="flex items-center gap-1">
              <Book className="h-3 w-3" />
              {subject}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {topic}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {linkedConcept}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {questionCount} Questions
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration}
            </Badge>

            {completed && (
              <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700">
                <CheckCircle className="h-3 w-3" />
                Score: {score}%
              </Badge>
            )}
          </div>

          <div className="flex justify-end">
            {completed ? (
              <Button
                onClick={() => onViewResult(id)}
                variant="outline"
                className="text-blue-600 hover:text-blue-700"
              >
                📊 View Result
              </Button>
            ) : (
              <Button
                onClick={() => onStart(id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                ▶️ Start Test
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
