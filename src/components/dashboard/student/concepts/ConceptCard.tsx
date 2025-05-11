
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Star, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleStudyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Direct user to concept detail page
    navigate(`/dashboard/student/concepts/${id}`);
  };
  
  // Generate difficulty color
  const difficultyColor = 
    difficulty === 'easy' ? 'bg-green-100 text-green-800 border-green-200' :
    difficulty === 'hard' ? 'bg-red-100 text-red-800 border-red-200' :
    'bg-yellow-100 text-yellow-800 border-yellow-200';
  
  // Format difficulty text with first letter capitalized
  const formattedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
  return (
    <div className="perspective-1000 h-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div 
        className="w-full h-full relative duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front of card */}
        <Card className={`absolute w-full h-full backface-hidden border-2 hover:border-primary/50 transition-colors duration-200 ${className}`}>
          <div className="flex flex-col h-full p-4">
            {/* Card Header */}
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
                {isRecommended && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 ml-2 flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    <span>Recommended</span>
                  </Badge>
                )}
              </div>
              {(subject || chapter) && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {subject}{subject && chapter && ' • '}{chapter}
                </p>
              )}
            </div>
            
            {/* Card Badges */}
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant="outline" className={difficultyColor}>
                  {formattedDifficulty}
                </Badge>
                
                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{timeEstimate} min</span>
                </Badge>
                
                {isNew && (
                  <Badge className="bg-green-500">New</Badge>
                )}
              </div>
              
              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
              
              {/* Flip hint text */}
              <div className="text-xs text-center text-muted-foreground flex items-center justify-center">
                <span>Tap for details</span>
                <ChevronRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Back of card */}
        <Card className={`absolute w-full h-full backface-hidden rotate-y-180 border-2 hover:border-primary/50 transition-colors duration-200 ${className}`}>
          <div className="flex flex-col h-full p-4">
            <div className="mb-3">
              <h3 className="text-base font-semibold mb-2">{title}</h3>
              
              {/* Description (only on back) */}
              {description && (
                <p className="text-sm text-muted-foreground mb-3">{description}</p>
              )}
              
              {/* Tags section (if any) */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            {/* Study Now button */}
            <div className="mt-auto pt-2">
              <Button 
                size="sm" 
                className="w-full gap-1" 
                onClick={handleStudyNow}
              >
                <BookOpen className="h-4 w-4" />
                <span>Study Now</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              {/* Flip back hint */}
              <div className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center">
                <ChevronRight className="h-3 w-3 mr-1 rotate-180" />
                <span>Tap to flip back</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Add the necessary CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ConceptCard;
