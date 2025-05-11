
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Star, ArrowRight } from "lucide-react";
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
    e.stopPropagation(); // Prevent triggering the flip
    navigate(`/dashboard/student/concepts/${id}`);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Generate difficulty color
  const difficultyColor = 
    difficulty === 'easy' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
    difficulty === 'hard' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' :
    'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
  
  // Format difficulty text with first letter capitalized
  const formattedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
  return (
    <div className={`concept-card-container h-56 perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={handleCardClick}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 flex flex-col p-4 backface-hidden border-2 border-transparent hover:border-primary/20 transition-colors duration-200 cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">{title}</h3>
            {isRecommended && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 ml-2 flex items-center">
                <Star className="h-3 w-3 mr-1 fill-current" />
                <span>Recommended</span>
              </Badge>
            )}
          </div>
          
          {subject && chapter && (
            <p className="text-sm text-muted-foreground mb-2">
              {subject} • {chapter}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 my-3">
            {/* Difficulty badge */}
            <Badge variant="outline" className={difficultyColor}>
              {formattedDifficulty}
            </Badge>
            
            {/* Time estimate badge */}
            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{timeEstimate} min</span>
            </Badge>
            
            {/* Show "New" badge if specified */}
            {isNew && (
              <Badge className="bg-green-500 text-white">New</Badge>
            )}
          </div>
          
          {/* Progress section at bottom */}
          <div className="mt-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-end mt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
                onClick={handleStudyNow}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Study Now
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </motion.button>
            </div>
          </div>
        </Card>
        
        {/* Back of card - additional concept details */}
        <Card className="absolute inset-0 flex flex-col p-4 backface-hidden rotate-y-180 border-2 border-transparent hover:border-primary/20 transition-colors duration-200 cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          
          {description ? (
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">Master this fundamental concept to strengthen your knowledge foundation.</p>
          )}
          
          {/* Tags list if any */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="mt-auto">
            <div className="text-xs text-muted-foreground mb-2">
              Related topics: {subject}, {chapter}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-primary text-white rounded-md flex items-center justify-center gap-1.5"
              onClick={handleStudyNow}
            >
              <BookOpen className="h-4 w-4" />
              Study Now
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ConceptCard;
