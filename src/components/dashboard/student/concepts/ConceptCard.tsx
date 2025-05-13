
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, FileText, Star, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ConceptCardProps {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  completionPercentage?: number;
  timeEstimate?: string;
  tags?: string[];
  isNew?: boolean;
  isRecommended?: boolean;
  isFeatured?: boolean;
  isCompleted?: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  category,
  difficulty,
  completionPercentage = 0,
  timeEstimate,
  tags = [],
  isNew = false,
  isRecommended = false,
  isFeatured = false,
  isCompleted = false
}) => {
  // Determine card classes based on properties
  const getBadgeVariant = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === 'physics') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (lowerTag === 'chemistry') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (lowerTag === 'biology') return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    if (lowerTag === 'math' || lowerTag === 'mathematics') return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getDifficultyColor = (diff: string) => {
    const lowerDiff = diff?.toLowerCase();
    if (lowerDiff === 'easy') return 'text-green-500';
    if (lowerDiff === 'medium') return 'text-amber-500';
    if (lowerDiff === 'hard') return 'text-red-500';
    return 'text-blue-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link to={`/dashboard/student/concepts/card/${id}`} className="block h-full">
        <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900">
          <CardContent className="p-5">
            {/* Status indicators */}
            <div className="flex justify-between mb-3">
              <div className="flex gap-1.5">
                {isNew && (
                  <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                    New
                  </Badge>
                )}
                {isRecommended && (
                  <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
                    <Star className="h-3 w-3 mr-1" /> Recommended
                  </Badge>
                )}
              </div>
              {isCompleted && (
                <Badge variant="outline" className="border-green-500 text-green-500 dark:border-green-400 dark:text-green-400">
                  <Check className="h-3 w-3 mr-1" /> Completed
                </Badge>
              )}
            </div>

            {/* Title and short description */}
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description}</p>
            )}

            {/* Category and difficulty */}
            <div className="flex flex-wrap gap-2 mb-3">
              {category && (
                <Badge variant="outline" className={getBadgeVariant(category)}>
                  {category}
                </Badge>
              )}
              {difficulty && (
                <div className="text-xs flex items-center">
                  <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                  </span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {!isCompleted && completionPercentage > 0 && (
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{completionPercentage}%</span>
                </div>
                <Progress 
                  value={completionPercentage} 
                  className="h-2 bg-gray-100 dark:bg-gray-800"
                />
              </div>
            )}

            {/* Bottom metadata */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
              {timeEstimate && (
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{timeEstimate}</span>
                </div>
              )}
              <div className="flex items-center">
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span>Concept Card</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ConceptCard;
