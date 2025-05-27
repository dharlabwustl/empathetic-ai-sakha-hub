
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Star, BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

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
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200'
  };

  const subjectColors = {
    Physics: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/50',
    Chemistry: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50',
    Biology: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/50'
  };
  
  const handleCardClick = () => {
    if (onView) {
      onView();
    } else {
      navigate(`/dashboard/student/concepts/${id}`);
    }
  };
  
  return (
    <Card className="overflow-hidden border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 transition-all hover:shadow-lg hover:scale-[1.02] group">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2 flex-1">
              <div className="flex gap-2 items-center flex-wrap">
                <Badge 
                  variant="outline" 
                  className={subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700 border-gray-200'}
                >
                  {subject}
                </Badge>
                <Badge variant="outline" className={difficultyColors[difficulty]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
                {isBookmarked && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              
              {description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1 rounded-full font-medium">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Learning Progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {mastery > 0 && (
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Target className="h-4 w-4 mx-auto mb-1 text-green-600" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">{mastery}%</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Mastery</p>
                </div>
              )}
              {timeEstimate && (
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-400">{timeEstimate}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Est. Time</p>
                </div>
              )}
              <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                <p className="text-sm font-bold text-purple-700 dark:text-purple-400">{difficulty}</p>
                <p className="text-xs text-purple-600 dark:text-purple-500">Level</p>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-2 rounded-none border-t justify-between hover:bg-slate-50 dark:hover:bg-slate-800 py-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
          onClick={handleCardClick}
        >
          <span className="font-medium">View Concept</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;
