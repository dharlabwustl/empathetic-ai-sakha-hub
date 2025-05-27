
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, Clock, FileText, Tag, Star, CheckCircle, Calendar, Target, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PracticeExamCardProps {
  id: string;
  title: string;
  subject: string;
  topic: string;
  linkedConcept: string;
  questionCount: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
  score?: number;
  progress?: number;
  accuracy?: number;
  status?: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  attempts?: number;
  bestScore?: number;
  onStart: (id: string) => void;
  onViewResult: (id: string) => void;
}

export const PracticeExamCard: React.FC<PracticeExamCardProps> = ({
  id,
  title,
  subject,
  topic,
  linkedConcept,
  questionCount,
  duration,
  difficulty,
  priority,
  completed,
  score,
  progress = 0,
  accuracy,
  status = 'pending',
  dueDate,
  attempts = 0,
  bestScore,
  onStart,
  onViewResult,
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

  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
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

  const isOverdue = dueDate && new Date(dueDate) < new Date();
  const daysToGo = dueDate ? Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  const handleStartExam = () => {
    navigate(`/dashboard/student/practice-exam/${id}/start`);
    onStart(id);
  };

  const handleViewResult = () => {
    navigate(`/dashboard/student/practice-exam/${id}/review`);
    onViewResult(id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 ${getSubjectColor(subject)}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getDifficultyColor()}>
                {difficulty}
              </Badge>
              <Badge variant="outline" className={getPriorityColor()}>
                {priority} Priority
              </Badge>
              <Badge variant="outline" className={getStatusColor(status)}>
                {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
              </Badge>
            </div>
            {priority === 'High' && (
              <Star className="h-4 w-4 fill-red-400 text-red-400" />
            )}
          </div>
          
          <CardTitle className="text-lg font-semibold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Subject and Topic Info */}
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge variant="outline" className="flex items-center gap-1">
              <Book className="h-3 w-3" />
              {subject}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {topic}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {linkedConcept}
            </Badge>
          </div>

          {/* Progress Section - only show if exam has been started */}
          {(completed || progress > 0) && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Progress
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2" 
                indicatorClassName={
                  progress >= 80 ? "bg-green-500" :
                  progress >= 50 ? "bg-blue-500" : "bg-amber-500"
                }
              />
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium">{questionCount}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">{duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>

            {score !== undefined && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-sm font-medium">{score}%</div>
                  <div className="text-xs text-muted-foreground">Last Score</div>
                </div>
              </div>
            )}

            {accuracy !== undefined && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Target className="h-4 w-4 text-amber-500" />
                <div>
                  <div className="text-sm font-medium">{accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>
            )}

            {daysToGo !== null && (
              <div className={`flex items-center gap-2 p-2 rounded-lg ${
                isOverdue ? 'bg-red-50' : 'bg-blue-50'
              }`}>
                <Calendar className={`h-4 w-4 ${isOverdue ? 'text-red-500' : 'text-blue-500'}`} />
                <div>
                  <div className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                    {isOverdue ? 'Overdue' : `${daysToGo}d`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isOverdue ? 'Past due' : 'Days left'}
                  </div>
                </div>
              </div>
            )}

            {attempts > 0 && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <div>
                  <div className="text-sm font-medium">{attempts}</div>
                  <div className="text-xs text-muted-foreground">Attempts</div>
                </div>
              </div>
            )}
          </div>

          {/* Score Summary for completed exams */}
          {completed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </span>
                <div className="text-right">
                  {score && (
                    <div className="text-sm font-bold text-green-800">
                      Score: {score}%
                    </div>
                  )}
                  {bestScore && bestScore !== score && (
                    <div className="text-xs text-green-600">
                      Best: {bestScore}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {completed ? (
              <>
                <Button
                  onClick={handleViewResult}
                  variant="outline"
                  className="flex-1 text-blue-600 hover:text-blue-700"
                >
                  📊 View Result
                </Button>
                <Button
                  onClick={handleStartExam}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  🔄 Retake
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartExam}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                ▶️ Start Exam
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
