
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Brain,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Zap,
  Award,
  Calendar,
  BarChart3,
  Users,
  Mic
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Subject {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number;
}

interface EnhancedOverviewSectionProps {
  title: string;
  subjects: Subject[];
  totalStudyTime: number;
  overallProgress: number;
  suggestions: string[];
  userName?: string;
  pageContext?: 'concepts' | 'flashcards' | 'practice-exam';
}

const EnhancedOverviewSection: React.FC<EnhancedOverviewSectionProps> = ({
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions,
  userName = 'Student',
  pageContext = 'concepts'
}) => {
  const getContextIcon = () => {
    switch (pageContext) {
      case 'concepts': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcards': return <Brain className="h-5 w-5 text-purple-500" />;
      case 'practice-exam': return <Target className="h-5 w-5 text-green-500" />;
      default: return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
  };

  const getContextColor = () => {
    switch (pageContext) {
      case 'concepts': return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20';
      case 'flashcards': return 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20';
      case 'practice-exam': return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
      default: return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 90) return { color: 'bg-green-100 text-green-700 border-green-200', label: 'Excellent' };
    if (efficiency >= 80) return { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Good' };
    if (efficiency >= 70) return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Average' };
    return { color: 'bg-red-100 text-red-700 border-red-200', label: 'Needs Work' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <Card className={`bg-gradient-to-r ${getContextColor()} border-opacity-50`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getContextIcon()}
            <div>
              <div className="text-xl font-bold">{title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                Your personalized NEET preparation dashboard
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Overall Progress */}
            <div className="text-center">
              <motion.div
                className="relative w-20 h-20 mx-auto mb-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                  <div className="bg-white rounded-full h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{overallProgress}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-sm font-medium">Overall Progress</div>
            </div>

            {/* Study Time */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-lg font-bold text-green-600">{formatTime(totalStudyTime)}</div>
              <div className="text-sm text-gray-500">Study Time</div>
            </div>

            {/* Best Subject */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-lg font-bold text-yellow-600">
                {subjects.reduce((best, current) => current.progress > best.progress ? current : best).name}
              </div>
              <div className="text-sm text-gray-500">Top Subject</div>
            </div>

            {/* Efficiency */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-purple-600">
                {Math.round(subjects.reduce((sum, s) => sum + s.efficiency, 0) / subjects.length)}%
              </div>
              <div className="text-sm text-gray-500">Avg Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      subject.name === 'Physics' ? 'bg-blue-500' :
                      subject.name === 'Chemistry' ? 'bg-green-500' :
                      subject.name === 'Biology' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <span className="font-medium">{subject.name}</span>
                    <Badge variant="outline" className={getEfficiencyBadge(subject.efficiency).color}>
                      {getEfficiencyBadge(subject.efficiency).label}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{subject.completed}/{subject.total}</div>
                    <div className="text-xs text-gray-500">{formatTime(subject.studyTime)}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-gray-600">{subject.completed} completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span className="text-gray-600">{subject.efficiency}% efficient</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-purple-500" />
                    <span className="text-gray-600">{subject.total - subject.completed} pending</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI-Powered Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Mic className="h-4 w-4 mr-2" />
              Ask AI for More Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedOverviewSection;
