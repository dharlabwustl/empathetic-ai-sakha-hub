
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  date: string;
  timeTaken: string;
  score: number;
  maxScore: number;
  subject: string;
}

interface QuizzesListProps {
  quizzes: Quiz[];
  title?: string;
  limit?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const QuizzesList: React.FC<QuizzesListProps> = ({
  quizzes = [],
  title = "Recent Quizzes",
  limit = 5,
  showViewAll = true,
  onViewAll
}) => {
  // If no quizzes provided, use mock data
  const displayQuizzes = quizzes.length > 0 ? quizzes : [
    {
      id: "quiz1",
      title: "Electricity and Magnetism",
      date: "2 days ago",
      timeTaken: "18:45",
      score: 85,
      maxScore: 100,
      subject: "Physics"
    },
    {
      id: "quiz2",
      title: "Organic Chemistry Reactions",
      date: "4 days ago",
      timeTaken: "22:30",
      score: 72,
      maxScore: 100,
      subject: "Chemistry"
    },
    {
      id: "quiz3",
      title: "Calculus: Integration",
      date: "1 week ago",
      timeTaken: "25:15",
      score: 90,
      maxScore: 100,
      subject: "Mathematics"
    }
  ];
  
  const limitedQuizzes = displayQuizzes.slice(0, limit);
  
  // Get badge color based on score percentage
  const getBadgeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (percentage >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (percentage >= 60) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {limitedQuizzes.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No quizzes taken yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {limitedQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{quiz.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span className="mr-2">{quiz.date}</span>
                    <span>•</span>
                    <span className="ml-2">{quiz.timeTaken}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge variant="outline" className={getBadgeColor(quiz.score, quiz.maxScore)}>
                    {quiz.score} / {quiz.maxScore}
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    {Math.round((quiz.score / quiz.maxScore) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showViewAll && displayQuizzes.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-3 text-sm" 
            onClick={onViewAll}
          >
            View all quizzes
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizzesList;
