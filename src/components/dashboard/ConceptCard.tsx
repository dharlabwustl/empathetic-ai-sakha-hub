
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
    <Card className="overflow-hidden border-2 border-slate-200 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 flex-1">
              <div className="flex gap-2 items-center flex-wrap">
                <Badge 
                  variant="outline" 
                  className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700 border-gray-200'} font-medium`}
                >
                  {subject}
                </Badge>
                <Badge variant="outline" className={`${difficultyColors[difficulty]} font-medium`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
                {isBookmarked && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
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
                  className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1.5 rounded-full font-medium border border-blue-200 dark:border-blue-800"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1.5 rounded-full font-medium">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold">Learning Progress</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {mastery > 0 && (
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Target className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">{mastery}%</p>
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium">Mastery</p>
                </div>
              )}
              {timeEstimate && (
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-400">{timeEstimate}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500 font-medium">Est. Time</p>
                </div>
              )}
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                <p className="text-sm font-bold text-purple-700 dark:text-purple-400">{difficulty}</p>
                <p className="text-xs text-purple-600 dark:text-purple-500 font-medium">Level</p>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-2 rounded-none border-t justify-between hover:bg-blue-50 dark:hover:bg-blue-900/20 py-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300"
          onClick={handleCardClick}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            View Concept
          </span>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-gray-500 group-hover:text-blue-600" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;
