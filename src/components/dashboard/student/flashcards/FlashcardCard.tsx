import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Target, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
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
    'easy': 'bg-green-100 text-green-700 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'hard': 'bg-red-100 text-red-700 border-red-200'
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
      case 'easy': return 'border-l-green-500';
      case 'medium': return 'border-l-yellow-500';
      case 'hard': return 'border-l-red-500';
      default: return 'border-l-slate-500';
    }
  };

  // FIXED: Ensure ALL navigation goes to INTERACTIVE (not practice)
  const handleStudyNow = () => {
    const targetRoute = `/dashboard/student/flashcards/1/interactive`;
    console.log('🚨🚨🚨 FLASHCARD CARD - STUDY NOW CLICKED:', targetRoute);
    console.log('🚨🚨🚨 Current location before navigation:', window.location.href);
    navigate(targetRoute);
    console.log('🚨🚨🚨 Navigate called from FlashcardCard');
  };

  const handleQuickReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    const targetRoute = `/dashboard/student/flashcards/1/interactive`;
    console.log('🚨🚨🚨 FLASHCARD CARD - QUICK REVIEW CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden border-l-4 ${getBorderColorClass(difficulty)} shadow-sm hover:shadow-md transition-shadow`}>
        <div className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-950 dark:to-blue-950 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={`${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-50 text-gray-700'} text-xs font-semibold`}>
                  {subject}
                </Badge>
                <Badge variant="outline" className={`${difficultyColors[difficulty]} text-xs font-semibold`}>
                  {difficulty}
                </Badge>
                <Badge variant="outline" className={`${statusConfig[status].color} text-xs font-medium flex items-center gap-1`}>
                  <StatusIcon className="h-3 w-3" />
                  {status.replace('-', ' ')}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <Star className="h-5 w-5 text-amber-500" />
          </div>
        </div>

        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Progress Section */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-bold text-blue-600">{completedCards}/{totalCards} cards</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mastery</span>
                <span className="font-bold text-green-600">{masteryPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={masteryPercentage} className="h-2" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{accuracy}%</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Accuracy</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-orange-700 dark:text-orange-300">{estimatedTime}m</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">Est. Time</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{daysToGo}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Days Left</div>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last reviewed: {lastReviewed}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 dark:bg-gray-900/50">
          <div className="w-full flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={handleQuickReview}>
              Quick Review
            </Button>
            {/* FIXED: BUTTON MUST GO TO INTERACTIVE, NOT PRACTICE */}
            <Button onClick={handleStudyNow} className="flex-1">
              Study Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
