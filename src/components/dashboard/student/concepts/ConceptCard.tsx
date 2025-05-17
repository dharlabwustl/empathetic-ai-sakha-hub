
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, BookMarked, ArrowRight, BrainCircuit } from 'lucide-react';
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
  masteryLevel?: number;
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
  masteryLevel = 0,
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

  // Determine mastery indicator color
  const getMasteryColor = () => {
    if (masteryLevel >= 80) return 'from-emerald-500 to-green-600';
    if (masteryLevel >= 60) return 'from-yellow-400 to-amber-500';
    if (masteryLevel >= 40) return 'from-blue-400 to-blue-600';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <Link to={`/dashboard/student/concepts/card/${id}`}>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <CardHeader className="pb-2 relative border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{subject}</p>
                <CardTitle className="text-lg font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
                  {title}
                </CardTitle>
                {topic && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{topic}</p>
                )}
              </div>
              
              {/* Premium tag */}
              {isPremium && (
                <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                  <Star className="h-3 w-3 mr-1 fill-white" /> Premium
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="outline" className={cn("text-xs", getDifficultyColor())}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              
              {isRecommended && (
                <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                  <BookMarked className="h-3 w-3 mr-1" /> Recommended
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-4 space-y-4">
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {description}
              </p>
            )}
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-100 dark:bg-gray-800" 
                indicatorClassName={getProgressColor()}
              />
            </div>
            
            {masteryLevel > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <BrainCircuit className="h-3 w-3" /> Mastery
                  </span>
                  <span className="font-medium">{masteryLevel}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getMasteryColor()} rounded-full`}
                    style={{ width: `${masteryLevel}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>{estimatedTime}</span>
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 pb-3">
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 p-0 hover:text-blue-700 hover:bg-transparent">
              Continue learning <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ConceptCard;
