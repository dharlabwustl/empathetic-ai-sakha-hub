
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, ArrowRight, Star } from "lucide-react";
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
  
  const handleCardClick = () => {
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
    <div className="group perspective-1000 h-full">
      <div className="relative h-full w-full transform-style-3d transition-all duration-500 hover:cursor-pointer">
        {/* Front of the card */}
        <div 
          className="absolute inset-0 backface-hidden"
          onClick={handleCardClick}
        >
          <Card className="h-full flex flex-col p-5 border-2 border-gray-100 hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2">
                <Badge variant="outline" className={difficultyColor}>
                  {formattedDifficulty}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{timeEstimate} min</span>
                </Badge>
              </div>
              {isRecommended && (
                <Badge className="bg-blue-500">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  <span>Recommended</span>
                </Badge>
              )}
              {isNew && !isRecommended && (
                <Badge className="bg-green-500">New</Badge>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            
            {(subject || chapter) && (
              <p className="text-sm text-muted-foreground mb-3">
                {subject}{chapter && ` • ${chapter}`}
              </p>
            )}
            
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {description}
              </p>
            )}
            
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
              
              <div className="flex justify-end mt-4">
                <motion.div 
                  className="flex items-center text-primary text-sm font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span>Study Now</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </motion.div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Back of the card - with flip animation */}
        <div className="absolute inset-0 backface-hidden rotate-y-180" onClick={handleCardClick}>
          <Card className="h-full flex flex-col p-5 justify-between bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">{title}</h3>
              
              <p className="text-sm text-center">
                {description || `Master the key concepts of ${title} to improve your understanding.`}
              </p>
              
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center">
              <motion.div 
                className="flex items-center text-primary font-medium gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>Study Now</span>
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
