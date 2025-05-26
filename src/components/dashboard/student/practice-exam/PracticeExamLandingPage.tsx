
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  Target,
  Star,
  Play,
  TrendingUp,
  Award,
  Brain,
  BarChart3,
  Timer,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const PracticeExamLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const practiceExams = [
    {
      id: 'neet-mock-15',
      title: 'NEET Mock Test #15',
      type: 'Full Length',
      duration: 180,
      questions: 180,
      subjects: ['Physics', 'Chemistry', 'Biology'],
      difficulty: 'High',
      lastScore: 156,
      maxScore: 180,
      averageScore: 142,
      attempts: 3,
      bestTime: '2h 45m',
      status: 'available',
      tags: ['Official Pattern', 'Latest Syllabus']
    },
    {
      id: 'physics-kinematics',
      title: 'Physics: Kinematics Deep Dive',
      type: 'Subject Specific',
      duration: 90,
      questions: 45,
      subjects: ['Physics'],
      difficulty: 'Medium',
      lastScore: 38,
      maxScore: 45,
      averageScore: 35,
      attempts: 5,
      bestTime: '1h 20m',
      status: 'recommended',
      tags: ['Conceptual', 'Problem Solving']
    },
    {
      id: 'chemistry-organic',
      title: 'Organic Chemistry Mastery Test',
      type: 'Topic Specific',
      duration: 60,
      questions: 30,
      subjects: ['Chemistry'],
      difficulty: 'High',
      lastScore: 22,
      maxScore: 30,
      averageScore: 19,
      attempts: 2,
      bestTime: '45m',
      status: 'in-progress',
      tags: ['Advanced', 'Mechanisms']
    },
    {
      id: 'biology-complete',
      title: 'Biology Comprehensive Review',
      type: 'Subject Specific',
      duration: 120,
      questions: 90,
      subjects: ['Biology'],
      difficulty: 'Medium',
      lastScore: 78,
      maxScore: 90,
      averageScore: 72,
      attempts: 4,
      bestTime: '1h 55m',
      status: 'completed',
      tags: ['Complete Syllabus', 'Revision']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'recommended': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'in-progress': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}`);
  };

  const overallStats = {
    totalExams: practiceExams.length,
    totalQuestions: practiceExams.reduce((sum, exam) => sum + (exam.questions * exam.attempts), 0),
    averageAccuracy: Math.round(
      practiceExams.reduce((sum, exam) => sum + ((exam.lastScore / exam.maxScore) * 100), 0) / practiceExams.length
    ),
    totalHours: Math.round(
      practiceExams.reduce((sum, exam) => sum + ((exam.duration * exam.attempts) / 60), 0)
    )
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Master exam patterns with AI-powered practice tests"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{overallStats.totalExams}</div>
                  <div className="text-sm text-gray-600">Practice Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{overallStats.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{overallStats.averageAccuracy}%</div>
                  <div className="text-sm text-gray-600">Avg Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{overallStats.totalHours}h</div>
                  <div className="text-sm text-gray-600">Practice Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Quick Start Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Timer className="h-6 w-6 text-red-500" />
                  <div className="text-center">
                    <div className="font-medium">15-Min Sprint</div>
                    <div className="text-sm text-gray-600">Quick practice</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <div className="text-center">
                    <div className="font-medium">Weak Areas</div>
                    <div className="text-sm text-gray-600">Targeted practice</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <div className="text-center">
                    <div className="font-medium">Full Mock</div>
                    <div className="text-sm text-gray-600">Complete test</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                  <div className="text-center">
                    <div className="font-medium">Analytics</div>
                    <div className="text-sm text-gray-600">View reports</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Practice Exams List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Available Practice Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {practiceExams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-5 border-2 rounded-xl transition-all hover:shadow-md cursor-pointer ${
                      selectedExam === exam.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{exam.title}</h3>
                          <Badge variant="outline">{exam.type}</Badge>
                          <Badge className={getDifficultyColor(exam.difficulty)}>
                            {exam.difficulty}
                          </Badge>
                          <Badge className={getStatusColor(exam.status)}>
                            {exam.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {exam.duration} min
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {exam.questions} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {exam.attempts} attempts
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {exam.subjects.map((subject) => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {exam.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-blue-600">{exam.lastScore}</div>
                            <div className="text-xs text-gray-600">Last Score</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-green-600">{Math.round((exam.lastScore / exam.maxScore) * 100)}%</div>
                            <div className="text-xs text-gray-600">Accuracy</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-purple-600">{exam.averageScore}</div>
                            <div className="text-xs text-gray-600">Average</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-orange-600">{exam.bestTime}</div>
                            <div className="text-xs text-gray-600">Best Time</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((exam.lastScore / exam.maxScore) * 100)}%</span>
                          </div>
                          <Progress value={(exam.lastScore / exam.maxScore) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {exam.lastScore > exam.averageScore && (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4" />
                            Above Average
                          </div>
                        )}
                        {exam.status === 'recommended' && (
                          <div className="flex items-center gap-1 text-purple-600 text-sm">
                            <Star className="h-4 w-4" />
                            AI Recommended
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartExam(exam.id);
                        }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {exam.status === 'in-progress' ? 'Continue' : 'Start Test'}
                      </Button>
                    </div>

                    {selectedExam === exam.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Strong Topics</div>
                            <div className="text-xs text-gray-600">Easy questions: 92%</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Needs Focus</div>
                            <div className="text-xs text-gray-600">Complex problems</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <Award className="h-5 w-5 text-green-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Improvement</div>
                            <div className="text-xs text-gray-600">+8% since first attempt</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default PracticeExamLandingPage;
