
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Star, ArrowRight } from "lucide-react";

export interface ConceptCardProps {
  id: string | number;
  title: string;
  subject?: string;
  chapter?: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  timeEstimate?: number;
  progress?: number;
  isRecommended?: boolean;
  isNew?: boolean;
  tags?: string[];
  className?: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  subject,
  chapter,
  description,
  difficulty = 'medium',
  timeEstimate = 30,
  progress = 0,
  isRecommended = false,
  isNew = false,
  tags = [],
  className = "",
}) => {
  const navigate = useNavigate();
  
  const handleStudyNow = () => {
    // Direct user to concept detail page
    navigate(`/dashboard/student/concepts/card/${id}`);
  };
  
  // Generate difficulty color
  const difficultyColor = 
    difficulty === 'easy' ? 'bg-green-100 text-green-800 border-green-200' :
    difficulty === 'hard' ? 'bg-red-100 text-red-800 border-red-200' :
    'bg-yellow-100 text-yellow-800 border-yellow-200';
  
  // Format difficulty text with first letter capitalized
  const formattedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
  return (
    <Card className={`h-full flex flex-col group perspective-1000 transition-all duration-500 border-transparent hover:border-primary/20 ${className}`}>
      <div className="flex-grow flex flex-col transform-style-3d relative duration-700 group-hover:rotate-y-180">
        <div className="absolute inset-0 backface-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
                {subject && chapter && (
                  <CardDescription className="text-sm mt-1">
                    {subject} • {chapter}
                  </CardDescription>
                )}
              </div>
              {isRecommended && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 ml-2 flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  <span>Recommended</span>
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-2 flex-grow">
            <div className="mb-3 flex flex-wrap gap-2">
              {/* Difficulty badge */}
              <Badge variant="outline" className={difficultyColor}>
                {formattedDifficulty}
              </Badge>
              
              {/* Time estimate badge */}
              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{timeEstimate} min</span>
              </Badge>
              
              {/* Show "New" badge if specified */}
              {isNew && (
                <Badge className="bg-green-500">New</Badge>
              )}
            </div>
            
            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
            )}
            
            {/* Progress bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          </CardContent>
        </div>
        
        {/* Back of card - animated on hover */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-primary/5 to-primary/10 rounded-md p-4 flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
          <p className="text-sm text-center text-muted-foreground mb-4">
            {description || `Master the key concepts of ${title} in under ${timeEstimate} minutes.`}
          </p>
          <Button 
            size="sm" 
            className="w-full gap-1 mt-auto" 
            onClick={handleStudyNow}
          >
            <BookOpen className="h-4 w-4" />
            <span>Study Now</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Always visible footer */}
      <CardFooter className="pt-3 pb-4 flex justify-end mt-auto">
        <Button 
          size="sm" 
          className="gap-1" 
          onClick={handleStudyNow}
        >
          <BookOpen className="h-4 w-4" />
          <span>Study Now</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;
