
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, Star, Clock, BrainCircuit, Tag, CheckCircle, Calendar, Target, TrendingUp } from "lucide-react";
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
  status?: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  accuracy?: number;
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
  status = 'pending',
  dueDate,
  accuracy,
  onView
}) => {
  const navigate = useNavigate();
  
  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'border-blue-500 bg-blue-50',
      'Chemistry': 'border-purple-500 bg-purple-50', 
      'Biology': 'border-green-500 bg-green-50',
      'Mathematics': 'border-orange-500 bg-orange-50'
    };
    return colors[subject as keyof typeof colors] || 'border-gray-500 bg-gray-50';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getMasteryColor = () => {
    if (mastery >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-600';
    if (mastery >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500';
    if (mastery >= 40) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    console.log("ConceptCard - Navigating to concept detail:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) {
      onView();
    }
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("ConceptCard StudyNow - Navigating to concept detail:", id);
    navigate(`/dashboard/student/concepts/${id}`);
    
    if (onView) {
      onView();
    }
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date();
  const daysToGo = dueDate ? Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className={`h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden 
                  border-l-4 cursor-pointer ${getSubjectColor(subject)}`}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-2 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className={`${getDifficultyColor(difficulty)} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
                {difficulty}
              </Badge>
              <Badge variant="outline" className={getStatusColor(status)}>
                {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
              </Badge>
            </div>
            {isBookmarked && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </CardTitle>
          
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="font-normal rounded-md">
              {subject}
            </Badge>
            
            {tags && tags.length > 0 && tags.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="outline" className="font-normal rounded-md flex items-center gap-1 bg-gray-50 dark:bg-gray-800">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow pt-2 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {description}
          </p>
          
          <div className="space-y-3">
            {/* Progress Section */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <TrendingUp className="h-3.5 w-3.5" /> Study Progress
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-100 dark:bg-gray-800" 
              />
            </div>
            
            {/* Mastery Section */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <BrainCircuit className="h-3.5 w-3.5" /> Mastery
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">{mastery}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getMasteryColor()} rounded-full transition-all duration-300`}
                  style={{ width: `${mastery}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
                <Clock className="h-3.5 w-3.5" />
                <span>{timeEstimate}</span>
              </div>
              
              {accuracy !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <Target className="h-3.5 w-3.5" />
                  <span>{accuracy}% accuracy</span>
                </div>
              )}
              
              {daysToGo !== null && (
                <div className={`flex items-center gap-1 text-xs p-2 rounded ${
                  isOverdue ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
                }`}>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{isOverdue ? 'Overdue' : `${daysToGo}d left`}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
          <Button 
            variant="default" 
            className="w-full flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white transition-all duration-300 rounded-lg"
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
