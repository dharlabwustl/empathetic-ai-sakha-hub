
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Award, Target, BookOpen, Zap, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PracticeExamCardProps {
  id: string;
  title: string;
  subject: string;
  totalQuestions: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lastScore?: number;
  averageScore?: number;
  attemptsCount?: number;
  topic?: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  isPremium?: boolean;
}

export default function PracticeExamCard({
  id,
  title,
  subject,
  totalQuestions,
  duration,
  difficulty,
  lastScore,
  averageScore,
  attemptsCount = 0,
  topic,
  status = 'not-started',
  isPremium = false
}: PracticeExamCardProps) {
  const navigate = useNavigate();

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
    'not-started': { color: 'bg-gray-100 text-gray-700', icon: Target, text: 'Not Started' },
    'in-progress': { color: 'bg-blue-100 text-blue-700', icon: Clock, text: 'In Progress' },
    'completed': { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Completed' }
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

  const handleStartExam = () => {
    navigate(`/dashboard/student/practice-exam/${id}/start`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className={`group relative overflow-hidden border-l-4 ${getBorderColorClass(difficulty)} shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 h-full`}>
        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
              Premium
            </Badge>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-blue-50/20 to-violet-50/20 dark:from-emerald-900/10 dark:via-blue-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Header with enhanced gradient */}
        <CardHeader className="pb-3 relative bg-gradient-to-r from-emerald-100 via-blue-100 to-violet-100 dark:from-emerald-950 dark:via-blue-950 dark:to-violet-950 border-b border-emerald-200/50 dark:border-emerald-800/50">
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
                  {statusConfig[status].text}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                {title}
              </h3>
              {topic && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{topic}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 relative z-10">
          <div className="space-y-4">
            {/* Exam Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{totalQuestions}</div>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Questions</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{duration}m</div>
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Duration</div>
              </div>
            </div>

            {/* Performance Stats */}
            {attemptsCount > 0 && (
              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Performance</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{attemptsCount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Attempts</div>
                  </div>
                  
                  {lastScore !== undefined && (
                    <div>
                      <div className={`text-sm font-bold ${getScoreColor(lastScore)}`}>{lastScore}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Last Score</div>
                    </div>
                  )}
                  
                  {averageScore !== undefined && (
                    <div>
                      <div className={`text-sm font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Average</div>
                    </div>
                  )}
                </div>
                
                {averageScore !== undefined && (
                  <div className="mt-2">
                    <Progress value={averageScore} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-t border-gray-200 dark:border-gray-700 relative z-10">
          <div className="w-full flex items-center justify-between gap-2">
            {status === 'completed' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/dashboard/student/practice-exam/${id}/review`)}
                className="hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                Review
              </Button>
            )}
            <Button 
              onClick={handleStartExam} 
              className={`${status === 'completed' ? 'flex-1' : 'w-full'} bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              <Zap className="h-4 w-4 mr-2" />
              {status === 'not-started' ? 'Start Exam' : status === 'in-progress' ? 'Continue' : 'Retake'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
