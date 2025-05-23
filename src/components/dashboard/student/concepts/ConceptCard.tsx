
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, Star, Clock, BrainCircuit, Tag, CheckCircle } from "lucide-react";
import { motion } from 'framer-motion';

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  mastery?: number;
  timeEstimate?: string;
  tags?: string[];
  isBookmarked?: boolean;
  relatedConcepts?: string[];
  onView?: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  completed = false,
  progress = 0,
  mastery = 0,
  timeEstimate = "25 min",
  tags = [],
  isBookmarked = false,
  relatedConcepts = [],
  onView
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    'hard': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300'
  };

  const getMasteryColor = () => {
    if (mastery >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-600';
    if (mastery >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500';
    if (mastery >= 40) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate to concept card detail page using updated correct route
    navigate(`/concepts/${id}`);
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/concepts/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className="h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden 
                  border border-gray-200/60 dark:border-gray-800/60 rounded-xl cursor-pointer 
                  bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-950/80"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-2 space-y-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
              {difficulty}
            </Badge>
            {isBookmarked && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <CardTitle 
            className="text-lg font-semibold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300"
          >
            {title}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="secondary" className="font-normal rounded-md">
              {subject}
            </Badge>
            
            {tags && tags.length > 0 && tags.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="outline" className="font-normal rounded-md flex items-center gap-1 bg-gray-50 dark:bg-gray-800">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
            
            {completed && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 font-normal rounded-md flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow pt-4 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> Study Progress
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-1.5 bg-gray-100 dark:bg-gray-800" 
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <BrainCircuit className="h-3.5 w-3.5" /> Mastery
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">{mastery}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getMasteryColor()} rounded-full`}
                  style={{ width: `${mastery}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{timeEstimate}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
          <Button 
            variant="default" 
            className="w-full flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-300 rounded-lg"
            onClick={handleStudyNowClick}
          >
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Study Now</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
