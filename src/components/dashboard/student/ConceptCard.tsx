
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, Clock, CheckCircle, Calendar, Star } from "lucide-react";
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
  status?: 'daily' | 'pending' | 'completed';
  dueDate?: string;
  estimatedTime?: number;
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
  onView,
  status = 'pending',
  dueDate,
  estimatedTime = 15
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const statusColors = {
    'daily': 'bg-blue-100 text-blue-800 border-blue-200',
    'pending': 'bg-orange-100 text-orange-800 border-orange-200',
    'completed': 'bg-green-100 text-green-800 border-green-200'
  };

  const statusIcons = {
    'daily': <Calendar className="h-4 w-4" />,
    'pending': <Clock className="h-4 w-4" />,
    'completed': <CheckCircle className="h-4 w-4" />
  };

  const subjectColors = {
    'Physics': 'bg-blue-50 border-blue-200 text-blue-700',
    'Chemistry': 'bg-green-50 border-green-200 text-green-700',
    'Biology': 'bg-purple-50 border-purple-200 text-purple-700',
    'Mathematics': 'bg-red-50 border-red-200 text-red-700'
  };

  const handleCardClick = (e: React.MouseEvent) => {
    console.log("ConceptCard - Navigating to detail page for concept:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) onView();
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("ConceptCard Study Button - Navigating to detail page for concept:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) onView();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className={`h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden 
                  border border-gray-200/60 dark:border-gray-800/60 rounded-xl cursor-pointer 
                  bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-950/80
                  ${status === 'completed' ? 'opacity-80' : ''}`}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-2 space-y-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${statusColors[status]} capitalize px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                {statusIcons[status]}
                {status}
              </Badge>
              <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
                {difficulty}
              </Badge>
            </div>
            {status === 'daily' && (
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            )}
          </div>
          
          <CardTitle className="text-lg font-semibold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300">
            {title}
          </CardTitle>
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={`${subjectColors[subject] || 'bg-gray-50 border-gray-200 text-gray-700'} font-medium rounded-md`}>
              {subject}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{estimatedTime}m</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow pt-4 px-6 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
            {description}
          </p>
          
          {progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs font-medium mb-2">
                <span>Progress</span>
                <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-100 dark:bg-gray-800" 
                indicatorClassName={
                  progress >= 80 ? "bg-gradient-to-r from-green-400 to-green-500" :
                  progress >= 40 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                  "bg-gradient-to-r from-red-400 to-red-500"
                }
              />
            </div>
          )}
          
          {dueDate && status !== 'completed' && (
            <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Due: {dueDate}</span>
            </div>
          )}
          
          {relatedConcepts && relatedConcepts.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Related:</p>
              <div className="flex flex-wrap gap-1.5">
                {relatedConcepts.slice(0, 2).map((concept, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5">
                    {concept}
                  </Badge>
                ))}
                {relatedConcepts.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5">
                    +{relatedConcepts.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          <Button 
            onClick={handleStudyNowClick}
            variant={status === 'completed' ? "outline" : "default"} 
            className={`w-full flex justify-between items-center transition-all duration-200 ${
              status === 'completed' 
                ? 'border-green-200 text-green-700 hover:bg-green-50' 
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white shadow-md'
            }`}
          >
            <span>{status === 'completed' ? 'Review' : 'Study Now'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
