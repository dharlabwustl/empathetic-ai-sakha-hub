
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, Star, Clock, Target, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from 'framer-motion';

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  accuracy?: number;
  daysToGo?: number;
  totalCards?: number;
  masteredCards?: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'overdue';
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
  accuracy = 0,
  daysToGo = 0,
  totalCards = 0,
  masteredCards = 0,
  status = 'pending',
  relatedConcepts = [],
  onView
}) => {
  const navigate = useNavigate();
  
  const subjectColors = {
    'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
    'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
    'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
    'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
  };

  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const statusConfig = {
    'pending': { color: 'bg-gray-100 text-gray-700', icon: Clock },
    'in-progress': { color: 'bg-blue-100 text-blue-700', icon: Target },
    'completed': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'overdue': { color: 'bg-red-100 text-red-700', icon: AlertCircle }
  };

  const StatusIcon = statusConfig[status].icon;

  const handleCardClick = (e: React.MouseEvent) => {
    console.log("ConceptCard - Navigating to concept detail:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) onView();
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("ConceptCard StudyNow - Navigating to concept detail:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) onView();
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
        <CardHeader className="pb-3 space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700'} px-3 py-1 rounded-full text-xs font-semibold`}>
                {subject}
              </Badge>
              <Badge variant="outline" className={`${difficultyColors[difficulty]} px-3 py-1 rounded-full text-xs font-semibold`}>
                {difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${statusConfig[status].color} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
          
          <CardTitle className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
              <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{accuracy}%</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Accuracy</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
              <div className="text-sm font-bold text-green-700 dark:text-green-300">{masteredCards}/{totalCards}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Mastered</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
              <div className="text-sm font-bold text-orange-700 dark:text-orange-300">{daysToGo}</div>
              <div className="text-xs text-orange-600 dark:text-orange-400">Days Left</div>
            </div>
          </div>

          {relatedConcepts && relatedConcepts.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Related:</p>
              <div className="flex flex-wrap gap-1">
                {relatedConcepts.slice(0, 2).map((concept, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                    {concept}
                  </Badge>
                ))}
                {relatedConcepts.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                    +{relatedConcepts.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
          <Button 
            onClick={handleStudyNowClick}
            className="w-full flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span>Study Now</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
