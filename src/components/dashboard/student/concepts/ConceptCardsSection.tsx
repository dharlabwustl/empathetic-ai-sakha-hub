import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, BookOpen, Zap, GraduationCap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  chapter?: string;
  topic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  relatedConcepts?: string[];
  content?: string;
  examples?: string[];
  commonMistakes?: string[];
  examRelevance?: string;
  recallAccuracy?: number;
  quizScore?: number;
  lastPracticed?: string;
  timeSuggestion?: number;
  flashcardsTotal?: number;
  flashcardsCompleted?: number;
  examReady?: boolean;
  bookmarked?: boolean;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  chapter,
  topic,
  difficulty,
  completed,
  progress,
  relatedConcepts,
  content,
  examples,
  commonMistakes,
  examRelevance,
  recallAccuracy,
  quizScore,
  lastPracticed,
  timeSuggestion,
  flashcardsTotal,
  flashcardsCompleted,
  examReady,
  bookmarked,
}) => {
  const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  // Calculate mastery percentage based on recallAccuracy, quizScore, and completion status
  const masteryPercent = recallAccuracy || (quizScore || (progress ? progress : 0));

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={difficultyColor(difficulty)}>
            {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-400">
            {subject}
          </Badge>
          {chapter && (
            <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-400">
              {chapter}
            </Badge>
          )}
          {topic && (
            <Badge variant="outline" className="border-green-300 text-green-700 dark:text-green-400">
              {topic}
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          {timeSuggestion && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              <span>{timeSuggestion} min</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <Brain className="h-4 w-4 text-purple-600" />
            <span>{masteryPercent ? `${Math.round(masteryPercent)}% mastery` : 'Not studied yet'}</span>
          </div>
          
          {examReady !== undefined && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <span>{examReady ? 'Exam ready' : 'Needs review'}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span>{flashcardsTotal || 0} Flashcards</span>
        </div>
        <Link to={`/dashboard/student/concepts/${id}`}>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Study Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;
