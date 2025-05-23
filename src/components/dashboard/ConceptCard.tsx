
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Star, BookOpen } from 'lucide-react';

interface ConceptCardProps {
  id: string;
  title: string;
  description?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  mastery?: number;
  timeEstimate?: string;
  tags?: string[];
  isBookmarked?: boolean;
  onView?: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  progress,
  mastery = 0,
  timeEstimate,
  tags,
  isBookmarked = false,
  onView
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };
  
  const handleCardClick = () => {
    if (onView) {
      onView();
    } else {
      navigate(`/dashboard/student/concepts/${id}`);
    }
  };
  
  return (
    <Card className="overflow-hidden border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex gap-2 items-center mb-1">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
                  {subject}
                </Badge>
                <Badge variant="outline" className={difficultyColors[difficulty]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
                {isBookmarked && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              
              <h3 className="font-medium text-lg">{title}</h3>
              
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-3">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          
          {(mastery > 0 || timeEstimate) && (
            <div className="flex justify-between mt-3 text-xs text-slate-500 dark:text-slate-400">
              {mastery > 0 && (
                <span className="flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  Mastery: {mastery}%
                </span>
              )}
              {timeEstimate && (
                <span>{timeEstimate}</span>
              )}
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-2 rounded-none border-t justify-between hover:bg-slate-50 dark:hover:bg-slate-800"
          onClick={handleCardClick}
        >
          <span>View Concept</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;
