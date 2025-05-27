
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Clock, Star, PlayCircle, CheckCircle, Calendar, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PracticeExamCardProps {
  id: string;
  title: string;
  subject: string;
  totalQuestions: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status?: 'daily' | 'pending' | 'completed';
  dueDate?: string;
  lastScore?: number;
  attempts?: number;
  averageScore?: number;
  examType?: string;
}

export default function PracticeExamCard({
  id,
  title,
  subject,
  totalQuestions,
  duration,
  difficulty,
  status = 'pending',
  dueDate,
  lastScore,
  attempts = 0,
  averageScore,
  examType = 'Mock Test'
}: PracticeExamCardProps) {
  const navigate = useNavigate();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 border-green-200';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 border-amber-200';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
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

  const getBorderColorClass = (diff: string) => {
    switch (diff) {
      case 'easy': return 'border-l-green-500';
      case 'medium': return 'border-l-amber-500';
      case 'hard': return 'border-l-red-500';
      default: return 'border-l-slate-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleStartExam = () => {
    const targetRoute = `/dashboard/student/practice-exam/${id}/start`;
    console.log('🚨 PRACTICE EXAM CARD - START EXAM CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  const handleReviewExam = () => {
    const targetRoute = `/dashboard/student/practice-exam/${id}/review`;
    console.log('🚨 PRACTICE EXAM CARD - REVIEW EXAM CLICKED:', targetRoute);
    navigate(targetRoute);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden border-l-4 ${getBorderColorClass(difficulty)} shadow-sm hover:shadow-md transition-shadow ${status === 'completed' ? 'opacity-80' : ''}`}>
        <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`${statusColors[status]} capitalize px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                  {statusIcons[status]}
                  {status}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`${subjectColors[subject] || 'bg-gray-50 border-gray-200 text-gray-700'} font-medium`}>
                  {subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {examType}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {status === 'daily' && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
              {lastScore !== undefined && (
                <div className="text-right">
                  <div className="text-xs text-gray-500">Last Score</div>
                  <div className={`text-sm font-bold ${getScoreColor(lastScore)}`}>{lastScore}%</div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-slate-500" />
              <span className="text-sm">{totalQuestions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-sm">{duration} minutes</span>
            </div>
          </div>

          {attempts > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>Attempts: {attempts}</span>
                </div>
                {averageScore && (
                  <span className={`font-medium ${getScoreColor(averageScore)}`}>
                    Avg: {averageScore}%
                  </span>
                )}
              </div>
              {averageScore && (
                <Progress value={averageScore} className="h-2" />
              )}
            </div>
          )}

          {dueDate && status !== 'completed' && (
            <div className="text-xs text-gray-500 flex items-center gap-1 pt-2 border-t">
              <Calendar className="h-3 w-3" />
              <span>Due: {dueDate}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2 space-y-2">
          <Button 
            className={`w-full flex items-center justify-center gap-2 ${
              status === 'completed' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            onClick={handleStartExam}
          >
            <PlayCircle className="h-4 w-4" />
            {status === 'completed' ? 'Retake Exam' : 'Start Exam'}
          </Button>
          
          {status === 'completed' && attempts > 0 && (
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleReviewExam}
            >
              <Trophy className="h-4 w-4" />
              Review Results
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
