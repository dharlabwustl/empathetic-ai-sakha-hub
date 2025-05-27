
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Target, Calendar, CheckCircle, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FlashcardCardProps {
  id: string;
  title: string;
  subject: string;
  totalCards: number;
  completedCards: number;
  masteredCards?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  accuracy?: number;
  daysToGo?: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'overdue';
  lastReviewed?: string;
}

export default function FlashcardCard({
  id,
  title,
  subject,
  totalCards,
  completedCards,
  masteredCards = 0,
  difficulty,
  estimatedTime,
  accuracy = 0,
  daysToGo = 0,
  status = 'pending',
  lastReviewed = 'Never'
}: FlashcardCardProps) {
  const navigate = useNavigate();
  const progressPercentage = (completedCards / totalCards) * 100;
  const masteryPercentage = (masteredCards / totalCards) * 100;

  const subjectColors = {
    'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
    'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
    'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
    'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
  };

  const difficultyColors = {
    'easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'medium': 'bg-amber-100 text-amber-700 border-amber-200',
    'hard': 'bg-rose-100 text-rose-700 border-rose-200'
  };

  const statusConfig = {
    'pending': { color: 'bg-gray-100 text-gray-700', icon: Clock },
    'in-progress': { color: 'bg-blue-100 text-blue-700', icon: Target },
    'completed': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'overdue': { color: 'bg-red-100 text-red-700', icon: AlertCircle }
  };

  const StatusIcon = statusConfig[status].icon;

  const getBorderColorClass = (diff: string) => {
    switch (diff) {
      case 'easy': return 'border-l-emerald-500';
      case 'medium': return 'border-l-amber-500';
      case 'hard': return 'border-l-rose-500';
      default: return 'border-l-slate-500';
    }
  };

  const handleStudyNow = () => {
    const targetRoute = `/dashboard/student/flashcards/1/interactive`;
    console.log('🚨🚨🚨 FLASHCARD CARD - STUDY NOW CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  const handleQuickReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    const targetRoute = `/dashboard/student/flashcards/1/interactive`;
    console.log('🚨🚨🚨 FLASHCARD CARD - QUICK REVIEW CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className={`group relative overflow-hidden border-l-4 ${getBorderColorClass(difficulty)} shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 h-full`}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/20 via-blue-50/20 to-purple-50/20 dark:from-violet-900/10 dark:via-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Header with enhanced gradient */}
        <div className="relative bg-gradient-to-r from-violet-100 via-blue-100 to-purple-100 dark:from-violet-950 dark:via-blue-950 dark:to-purple-950 p-4 border-b border-violet-200/50 dark:border-violet-800/50">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700'} font-semibold`}>
                  {subject}
                </Badge>
                <Badge variant="outline" className={`${difficultyColors[difficulty]} font-semibold`}>
                  {difficulty}
                </Badge>
                <Badge variant="outline" className={`${statusConfig[status].color} font-medium flex items-center gap-1`}>
                  <StatusIcon className="h-3 w-3" />
                  {status.replace('-', ' ')}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {title}
              </h3>
            </div>
            <Star className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors cursor-pointer" />
          </div>
        </div>

        <CardContent className="pt-4 relative z-10">
          <div className="space-y-4">
            {/* Enhanced Progress Section */}
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                </div>
                <span className="font-bold text-blue-600">{completedCards}/{totalCards} cards</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-3" />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Mastery</span>
                </div>
                <span className="font-bold text-green-600">{masteryPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={masteryPercentage} className="h-2" />
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{accuracy}%</div>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Accuracy</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{estimatedTime}m</div>
                <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Est. Time</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{daysToGo}</div>
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Days Left</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
              <Calendar className="h-3 w-3" />
              <span>Last reviewed: {lastReviewed}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-t border-gray-200 dark:border-gray-700 relative z-10">
          <div className="w-full flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={handleQuickReview} className="hover:bg-white/80 dark:hover:bg-gray-800/80">
              Quick Review
            </Button>
            <Button onClick={handleStudyNow} className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Zap className="h-4 w-4 mr-2" />
              Study Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
