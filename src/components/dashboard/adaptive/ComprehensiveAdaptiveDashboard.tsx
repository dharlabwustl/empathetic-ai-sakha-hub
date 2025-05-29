
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle2, Clock, BookOpen, Zap, Trophy, Star, Flame, ChevronRight, ChevronDown, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NEETStrategyCard from '../student/NEETStrategyCard';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

interface SubjectData {
  name: string;
  progress: number;
  mastery: number;
  weeklyHours: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  strongTopics: string[];
  weakTopics: string[];
  recentScore?: number;
  trend: 'up' | 'down' | 'stable';
}

interface ExamReadinessData {
  overall: number;
  subjects: SubjectData[];
  timeToExam: number;
  confidence: number;
  lastAssessment: string;
  strengths: string[];
  improvements: string[];
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Mock comprehensive exam readiness data
  const examReadiness: ExamReadinessData = {
    overall: 76,
    subjects: [
      {
        name: 'Physics',
        progress: 78,
        mastery: 72,
        weeklyHours: 12,
        status: 'good',
        strongTopics: ['Mechanics', 'Thermodynamics'],
        weakTopics: ['Optics', 'Modern Physics'],
        recentScore: 85,
        trend: 'up'
      },
      {
        name: 'Chemistry',
        progress: 65,
        mastery: 58,
        weeklyHours: 14,
        status: 'needs-improvement',
        strongTopics: ['Organic Chemistry'],
        weakTopics: ['Physical Chemistry', 'Inorganic Chemistry'],
        recentScore: 72,
        trend: 'stable'
      },
      {
        name: 'Biology',
        progress: 82,
        mastery: 79,
        weeklyHours: 10,
        status: 'excellent',
        strongTopics: ['Genetics', 'Ecology'],
        weakTopics: ['Human Physiology'],
        recentScore: 91,
        trend: 'up'
      }
    ],
    timeToExam: 45,
    confidence: 73,
    lastAssessment: '2 days ago',
    strengths: ['Consistent study schedule', 'Strong conceptual understanding', 'Good problem-solving speed'],
    improvements: ['Focus on weak topics', 'Increase Chemistry practice', 'Regular mock tests']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 85) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 70) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 55) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Needs Work', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const readinessLevel = getReadinessLevel(examReadiness.overall);

  // Enhanced responsive design classes
  const responsiveGrid = "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6";
  const responsiveCard = "w-full";

  return (
    <div className="space-y-6">
      {/* Custom CSS for dashboard styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .exam-readiness-glow {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          .subject-progress-bar {
            transition: all 0.3s ease;
          }
          .subject-progress-bar:hover {
            transform: scaleY(1.1);
          }
          @media (max-width: 768px) {
            .mobile-responsive {
              padding: 1rem;
            }
            .mobile-text {
              font-size: 0.875rem;
            }
          }
        `
      }} />

      {/* Main Exam Readiness Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className={`${responsiveCard} exam-readiness-glow border-2 border-blue-200 dark:border-blue-800 mobile-responsive`}>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-xl lg:text-2xl flex items-center gap-2 text-gray-900 dark:text-white">
                <Trophy className="h-6 w-6 lg:h-7 lg:w-7 text-yellow-500" />
                NEET Exam Readiness
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={`${readinessLevel.bg} ${readinessLevel.color} border-0 text-sm lg:text-base px-3 py-1`}>
                  {readinessLevel.level}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailedView(!showDetailedView)}
                  className="text-xs lg:text-sm"
                >
                  {showDetailedView ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  Details
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            {/* Overall Score Circle */}
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - examReadiness.overall / 100)}`}
                      className="text-blue-500 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {examReadiness.overall}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-xs lg:text-sm text-blue-600 dark:text-blue-400 font-medium">Days to Exam</p>
                    <p className="text-lg lg:text-xl font-bold text-blue-900 dark:text-blue-100">{examReadiness.timeToExam}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
                    <p className="text-xs lg:text-sm text-green-600 dark:text-green-400 font-medium">Confidence</p>
                    <p className="text-lg lg:text-xl font-bold text-green-900 dark:text-green-100">{examReadiness.confidence}%</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700 col-span-2 lg:col-span-1">
                    <p className="text-xs lg:text-sm text-purple-600 dark:text-purple-400 font-medium">Last Assessment</p>
                    <p className="text-sm lg:text-base font-bold text-purple-900 dark:text-purple-100">{examReadiness.lastAssessment}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Progress Grid */}
            <div className={responsiveGrid}>
              {examReadiness.subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setExpandedSubject(expandedSubject === subject.name ? null : subject.name)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm lg:text-base text-gray-900 dark:text-white">{subject.name}</h3>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <Badge className={`${getStatusColor(subject.status)} text-xs px-2 py-1`}>
                      {subject.status === 'needs-improvement' ? 'Needs Work' : subject.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2 subject-progress-bar" />
                    
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Mastery: {subject.mastery}%</span>
                      <span>{subject.weeklyHours}h/week</span>
                    </div>
                    
                    {subject.recentScore && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Recent: <span className="font-semibold">{subject.recentScore}%</span>
                      </div>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {expandedSubject === subject.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2"
                      >
                        <div>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Strong Topics:</p>
                          <div className="flex flex-wrap gap-1">
                            {subject.strongTopics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Weak Topics:</p>
                          <div className="flex flex-wrap gap-1">
                            {subject.weakTopics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Detailed Insights */}
            <AnimatePresence>
              {showDetailedView && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {examReadiness.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                          <Star className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {examReadiness.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm text-orange-700 dark:text-orange-300 flex items-start gap-2">
                          <Target className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base">
                <BarChart3 className="h-4 w-4 mr-2" />
                Take Practice Test
              </Button>
              <Button variant="outline" className="flex-1 text-sm lg:text-base">
                <BookOpen className="h-4 w-4 mr-2" />
                Study Weak Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* NEET Strategy Card */}
      <NEETStrategyCard 
        userProfile={userProfile}
        examReadiness={examReadiness}
        className="w-full"
      />
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
