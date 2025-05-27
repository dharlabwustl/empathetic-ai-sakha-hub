
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Clock, FileText, Tag, Star, CheckCircle, Target, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PracticeExamCardProps {
  id: string;
  title: string;
  subject: string;
  topic: string;
  linkedConcept: string;
  questionCount: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
  score?: number;
  accuracy?: number;
  attempts?: number;
  bestScore?: number;
  daysToGo?: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'overdue';
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
  priority,
  completed,
  score,
  accuracy = 0,
  attempts = 0,
  bestScore = 0,
  daysToGo = 0,
  status = 'pending',
  onStart,
  onViewResult,
}) => {
  const subjectColors = {
    'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
    'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
    'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
    'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
  };

  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
      case 'High': return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Low': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const statusConfig = {
    'pending': { color: 'bg-gray-100 text-gray-700', icon: Clock },
    'in-progress': { color: 'bg-blue-100 text-blue-700', icon: Target },
    'completed': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'overdue': { color: 'bg-red-100 text-red-700', icon: AlertCircle }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${completed ? 'border-green-200' : 'border-blue-200'}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700'} text-xs font-semibold`}>
                {subject}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor()}>
                {difficulty}
              </Badge>
              <Badge variant="outline" className={getPriorityColor()}>
                {priority}
              </Badge>
              <Badge variant="outline" className={`${statusConfig[status].color} flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {status.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          {/* Stats Section */}
          {completed && (
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-green-700 dark:text-green-300">{score}%</div>
                <div className="text-xs text-green-600 dark:text-green-400">Last Score</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{bestScore}%</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Best Score</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{accuracy}%</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Accuracy</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-orange-700 dark:text-orange-300">{attempts}</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">Attempts</div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-sm">
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

            {!completed && daysToGo > 0 && (
              <Badge variant="outline" className="flex items-center gap-1 bg-orange-50 text-orange-700">
                <Calendar className="h-3 w-3" />
                {daysToGo} days left
              </Badge>
            )}
          </div>

          {/* Progress Bar for Performance */}
          {completed && score && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-bold text-indigo-600">{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          )}

          <div className="flex justify-end">
            {completed ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => onStart(id)}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Retake
                </Button>
                <Button
                  onClick={() => onViewResult(id)}
                  variant="outline"
                  className="text-green-600 hover:text-green-700"
                >
                  📊 View Result
                </Button>
              </div>
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
