
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, BookOpen, Zap, GraduationCap, Brain, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      case 'easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard': return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  const masteryPercent = recallAccuracy || (quizScore || (progress ? progress : 0));
  const difficultyBorderColor = difficulty === 'easy' ? 'border-l-emerald-500' : 
                                difficulty === 'medium' ? 'border-l-amber-500' : 'border-l-rose-500';

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className={`group relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${difficultyBorderColor} h-full`}>
        {/* Bookmarked indicator */}
        {bookmarked && (
          <div className="absolute top-3 right-3 z-10">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
            </div>
            <Badge className={`${difficultyColor(difficulty)} font-semibold ml-2 shrink-0`}>
              {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4 relative z-10">
          {/* Subject and Topic badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700'} font-medium`}>
              {subject}
            </Badge>
            {chapter && (
              <Badge variant="outline" className="border-purple-200 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20">
                {chapter}
              </Badge>
            )}
            {topic && (
              <Badge variant="outline" className="border-green-200 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20">
                {topic}
              </Badge>
            )}
          </div>
          
          {/* Progress Section */}
          {masteryPercent > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mastery Progress</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(masteryPercent)}%</span>
              </div>
              <Progress value={masteryPercent} className="h-2 bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {timeSuggestion && (
              <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                  <Clock className="h-3 w-3" />
                </div>
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">{timeSuggestion}m</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Study Time</div>
              </div>
            )}
            
            <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
              <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
                <Brain className="h-3 w-3" />
              </div>
              <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                {masteryPercent ? `${Math.round(masteryPercent)}%` : 'New'}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">Mastery</div>
            </div>
            
            {examReady !== undefined && (
              <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                  <GraduationCap className="h-3 w-3" />
                </div>
                <div className="text-xs font-semibold text-green-700 dark:text-green-300">
                  {examReady ? 'Ready' : 'Review'}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">Exam</div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 relative z-10">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <BookOpen className="h-4 w-4" />
              <span>{flashcardsTotal || 0} Cards</span>
              {completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </div>
            <Link to={`/dashboard/student/concepts/${id}`}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Zap className="h-4 w-4 mr-2" />
                Study Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const subjectColors = {
  'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
  'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
  'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
  'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
};

export default ConceptCard;
