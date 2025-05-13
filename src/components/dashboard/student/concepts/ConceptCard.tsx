
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, BookMarked, ArrowRight, Zap, BookText, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface ConceptCardProps {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  progress: number;
  description?: string;
  isPremium?: boolean;
  isRecommended?: boolean;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  subject,
  topic,
  difficulty,
  estimatedTime,
  progress,
  description,
  isPremium = false,
  isRecommended = false,
}) => {
  // Determine difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Determine progress color
  const getProgressColor = () => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  // Get badge icon based on premium and recommendation status
  const getBadgeIcon = () => {
    if (isPremium) return <Star className="h-3.5 w-3.5 mr-1" />;
    if (isRecommended) return <BookMarked className="h-3.5 w-3.5 mr-1" />;
    return null;
  };

  return (
    <Link to={`/dashboard/student/concepts/card/${id}`}>
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full">
          <CardHeader className="pb-2 relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">{subject}</p>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">
                  {title}
                </CardTitle>
                {topic && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{topic}</p>
                )}
              </div>
              
              {/* Premium or recommended icon */}
              {(isPremium || isRecommended) && (
                <div className="absolute top-2 right-2">
                  {isPremium ? (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className={cn("text-xs font-medium", getDifficultyColor())}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              
              {isPremium && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs border-none">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
              
              {isRecommended && (
                <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                  <BookMarked className="h-3 w-3 mr-1" /> Recommended
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-3 pb-1">
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {description}
              </p>
            )}
            
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Completion</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-100 dark:bg-gray-800" 
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>{estimatedTime}</span>
              </div>
              
              <div className="flex items-center">
                <BookText className="w-3.5 h-3.5 mr-1.5" />
                <span>Interactive</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 pb-3 flex justify-between items-center border-t border-gray-100 dark:border-gray-800 mt-2">
            <div className="flex items-center">
              <Award className="h-3.5 w-3.5 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Earn 10 XP</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 p-0 h-auto hover:text-blue-700 hover:bg-transparent">
              Continue <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ConceptCard;
