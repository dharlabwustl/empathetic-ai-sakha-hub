
import React, { useState } from 'react';
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
  Mic,
  PlayCircle,
  PauseCircle,
  Star,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechRecognitionButton from './SpeechRecognitionButton';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number; // in minutes
  accuracy?: number;
  lastStudied?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface ComprehensiveOverviewSectionProps {
  title: string;
  subjects: SubjectProgress[];
  totalStudyTime: number;
  overallProgress: number;
  suggestions: string[];
  userName?: string;
  pageContext?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-practice';
  weeklyGoal?: number;
  dailyStreak?: number;
  totalMastered?: number;
}

const ComprehensiveOverviewSection: React.FC<ComprehensiveOverviewSectionProps> = ({
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions,
  userName = 'Student',
  pageContext = 'concepts',
  weeklyGoal = 40,
  dailyStreak = 7,
  totalMastered = 45
}) => {
  const [showDetailedView, setShowDetailedView] = useState(false);
  
  const totalCompleted = subjects.reduce((sum, subject) => sum + subject.completed, 0);
  const totalPending = subjects.reduce((sum, subject) => sum + (subject.total - subject.completed), 0);
  const averageEfficiency = subjects.reduce((sum, subject) => sum + subject.efficiency, 0) / subjects.length;
  const averageAccuracy = subjects.reduce((sum, subject) => sum + (subject.accuracy || 0), 0) / subjects.length;

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-emerald-600';
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 70) return 'text-blue-600';
    if (efficiency >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContextIcon = () => {
    switch (pageContext) {
      case 'flashcards':
        return <Zap className="h-5 w-5 text-purple-600" />;
      case 'practice-exam':
        return <Target className="h-5 w-5 text-blue-600" />;
      case 'formula-practice':
        return <BarChart3 className="h-5 w-5 text-green-600" />;
      default:
        return <Brain className="h-5 w-5 text-indigo-600" />;
    }
  };

  const getContextualSuggestions = () => {
    switch (pageContext) {
      case 'flashcards':
        return [
          "Focus on cards you've marked as difficult for better retention",
          "Use spaced repetition - review cards you last saw 3 days ago",
          "Create visual associations for abstract concepts",
          "Practice active recall instead of passive reading"
        ];
      case 'practice-exam':
        return [
          "Take mock tests in exam-like conditions to build stamina",
          "Review incorrect answers immediately after each test",
          "Focus on time management - aim to complete each section 10 minutes early",
          "Identify patterns in your mistakes to target weak areas"
        ];
      case 'formula-practice':
        return [
          "Practice derivations, not just memorization of formulas",
          "Create a formula sheet with units and applications",
          "Solve problems step-by-step to understand formula application",
          "Connect related formulas to build conceptual understanding"
        ];
      default:
        return suggestions;
    }
  };

  return (
    <div className="space-y-6 mb-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 p-6 rounded-2xl border border-blue-200/30 dark:border-blue-800/30">
      {/* Header with Voice Assistant */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getContextIcon()}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive learning analytics and insights
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SpeechRecognitionButton 
            context="dashboard"
            size="md"
            userName={userName}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetailedView(!showDetailedView)}
            className="flex items-center gap-2"
          >
            {showDetailedView ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
            {showDetailedView ? 'Simple View' : 'Detailed View'}
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalCompleted}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{totalPending}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{Math.round(totalStudyTime / 60)}h</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Study Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getEfficiencyColor(averageEfficiency)}`}>{Math.round(averageEfficiency)}%</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-100 dark:bg-pink-800 rounded-lg">
                  <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">{Math.round(averageAccuracy)}%</p>
                  <p className="text-xs text-pink-600 dark:text-pink-400">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Progress Overview */}
      {showDetailedView && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-600" />
                Detailed Subject Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{subject.name}</span>
                        {subject.difficulty && (
                          <Badge className={`text-xs ${getDifficultyColor(subject.difficulty)}`}>
                            {subject.difficulty}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {subject.completed}/{subject.total}
                        </Badge>
                        <span className="text-sm font-medium">{subject.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Efficiency: <span className={getEfficiencyColor(subject.efficiency)}>{subject.efficiency}%</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Time: {Math.floor(subject.studyTime / 60)}h {subject.studyTime % 60}m
                          </span>
                          {subject.accuracy && (
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              Accuracy: {subject.accuracy}%
                            </span>
                          )}
                          {subject.lastStudied && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Last: {subject.lastStudied}
                            </span>
                          )}
                        </div>
                        {subject.progress === 100 && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Award className="h-3 w-3" />
                            Mastered!
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Smart AI Suggestions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Smart AI Suggestions for {pageContext.charAt(0).toUpperCase() + pageContext.slice(1).replace('-', ' ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getContextualSuggestions().map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-indigo-800 hover:shadow-md transition-shadow"
              >
                <Brain className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{suggestion}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Action Buttons */}
          <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Schedule Study Time
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                Get More Tips
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Set Goals
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                <Mic className="h-3 w-3" />
                Ask Voice Assistant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-800 rounded-lg">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Goal</p>
                <p className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                  {Math.round(totalStudyTime / 60)}/{weeklyGoal}h
                </p>
                <Progress value={(totalStudyTime / 60 / weeklyGoal) * 100} className="h-1 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg">
                <Award className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Daily Streak</p>
                <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{dailyStreak} days</p>
                <p className="text-xs text-emerald-600">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-800 rounded-lg">
                <Star className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Topics Mastered</p>
                <p className="text-xl font-bold text-violet-700 dark:text-violet-300">{totalMastered}</p>
                <p className="text-xs text-violet-600">Excellent progress!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveOverviewSection;
