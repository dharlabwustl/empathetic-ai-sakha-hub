
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Calendar, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FlashcardCardProps {
  id: string;
  title: string;
  subject: string;
  totalCards: number;
  completedCards: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  accuracy?: number;
  status?: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  streak?: number;
}

export default function FlashcardCard({
  id,
  title,
  subject,
  totalCards,
  completedCards,
  difficulty,
  estimatedTime,
  accuracy,
  status = 'pending',
  dueDate,
  streak = 0
}: FlashcardCardProps) {
  const navigate = useNavigate();
  const progressPercentage = (completedCards / totalCards) * 100;

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-500 border-blue-200',
      'Chemistry': 'bg-purple-500 border-purple-200', 
      'Biology': 'bg-green-500 border-green-200',
      'Mathematics': 'bg-orange-500 border-orange-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-500 border-gray-200';
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
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

  const handleStudyNow = () => {
    const targetRoute = `/dashboard/student/flashcards/${id}/interactive`;
    console.log('🚨🚨🚨 FLASHCARD CARD - STUDY NOW CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date();
  const daysToGo = dueDate ? Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden border-l-4 ${getSubjectColor(subject).split(' ')[1]} shadow-sm hover:shadow-lg transition-all duration-300`}>
        {/* Header with subject indicator */}
        <div className={`${getSubjectColor(subject).split(' ')[0]} bg-opacity-10 p-4 border-b`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={getSubjectColor(subject).replace('bg-', 'text-').replace('border-', 'border-')}>
                {subject}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className={getStatusColor(status)}>
                {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
              </Badge>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{streak}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Progress Section */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Progress</span>
                <span className="font-semibold">{completedCards}/{totalCards} cards</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3" 
                indicatorClassName={
                  progressPercentage >= 80 ? "bg-green-500" :
                  progressPercentage >= 50 ? "bg-blue-500" : "bg-amber-500"
                }
              />
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">{estimatedTime}m</div>
                  <div className="text-xs text-muted-foreground">Est. Time</div>
                </div>
              </div>
              
              {accuracy !== undefined && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Target className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
              )}
              
              {daysToGo !== null && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Calendar className={`h-4 w-4 ${isOverdue ? 'text-red-500' : 'text-blue-500'}`} />
                  <div>
                    <div className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {isOverdue ? 'Overdue' : `${daysToGo}d`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isOverdue ? 'Past due' : 'Days to go'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 pt-3">
          <div className="w-full flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View Details
            </Button>
            <Button 
              onClick={handleStudyNow}
              className={`${getSubjectColor(subject).split(' ')[0]} hover:opacity-90`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Study Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
