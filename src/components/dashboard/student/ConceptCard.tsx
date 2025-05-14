
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight, Clock, BarChart, Zap } from "lucide-react";
import { NavigateFunction } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export interface ConceptCardProps {
  id: string;
  title: string;
  subject: string;
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  isNew?: boolean;
  isRecommended?: boolean;
  isRevision?: boolean;
  lastAccessed?: string;
  navigate?: NavigateFunction;
  onClick?: (id: string) => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  subject,
  progress,
  difficulty,
  estimatedTime,
  isNew = false,
  isRecommended = false,
  isRevision = false,
  lastAccessed,
  navigate,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    } else if (navigate) {
      navigate(`/dashboard/student/concept/${id}`);
    } else {
      toast({
        title: "Navigation not available",
        description: "This is a preview of the concept card component.",
      });
    }
  };

  const difficultyColor = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  
  // Custom progress bar with indicator class
  const renderCustomProgress = () => {
    const indicatorClass = progress === 100 
      ? "bg-green-500" 
      : progress > 66 
        ? "bg-blue-500" 
        : progress > 33 
          ? "bg-amber-500" 
          : "bg-rose-500";
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
        <div 
          className={`${indicatorClass} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card 
        className="border-2 border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
              <CardDescription>{subject}</CardDescription>
            </div>
            {progress === 100 && (
              <CheckCircle className="text-green-500 h-5 w-5" />
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              {renderCustomProgress()}
            </div>

            <div className="flex flex-wrap gap-2 py-1">
              <Badge variant="outline" className={`${difficultyColor[difficulty]} capitalize font-normal`}>
                {difficulty}
              </Badge>
              
              <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 font-normal flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{estimatedTime} min</span>
              </Badge>
              
              {isNew && (
                <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
              )}
              
              {isRecommended && (
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 font-normal flex items-center gap-1">
                  <BarChart className="h-3 w-3" />
                  <span>Recommended</span>
                </Badge>
              )}
              
              {isRevision && (
                <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 font-normal flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>Revision</span>
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          {lastAccessed && (
            <span className="text-xs text-gray-500">
              Last accessed: {lastAccessed}
            </span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 py-1 h-8 transition-all ${isHovered ? 'translate-x-1' : ''}`}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
