
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
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
  relatedConcepts = [],
  onView
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200 shadow-sm shadow-green-100',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-sm shadow-yellow-100',
    'hard': 'bg-red-100 text-red-800 border-red-200 shadow-sm shadow-red-100'
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate to concept card detail page
    navigate(`/dashboard/student/concepts/card/${id}`);
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/student/concepts/card/${id}`);
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
            {completed && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 rounded-full px-3 py-1 text-xs font-semibold shadow-sm shadow-blue-100">
                Completed
              </Badge>
            )}
          </div>
          <CardTitle 
            className="text-lg font-semibold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300"
          >
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            <Badge variant="secondary" className="font-normal rounded-md mr-2">
              {subject}
            </Badge>
          </p>
        </CardHeader>
        
        <CardContent className="flex-grow pt-4 px-6 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
          
          {progress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Progress</span>
                <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-100 dark:bg-gray-800" 
                indicatorClassName={
                  progress >= 80 ? "bg-gradient-to-r from-green-400 to-green-500 shadow-sm shadow-green-200 dark:shadow-green-900/20" :
                  progress >= 40 ? "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-sm shadow-yellow-200 dark:shadow-yellow-900/20" :
                  "bg-gradient-to-r from-red-400 to-red-500 shadow-sm shadow-red-200 dark:shadow-red-900/20"
                }
              />
            </div>
          )}
          
          {relatedConcepts && relatedConcepts.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Related Concepts:</p>
              <div className="flex flex-wrap gap-1.5">
                {relatedConcepts.map((concept, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
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
