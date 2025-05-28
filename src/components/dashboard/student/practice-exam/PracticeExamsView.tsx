
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  Filter, 
  Calendar,
  Target,
  Award,
  TrendingUp,
  Brain,
  Play,
  BarChart3,
  Zap
} from "lucide-react";
import { motion } from 'framer-motion';
import BackButton from '@/components/dashboard/student/BackButton';

const PracticeExamsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  
  // Overview stats
  const overviewStats = {
    totalExams: 45,
    completedExams: 32,
    avgScore: 78,
    highestScore: 92,
    totalStudyTime: '28h 45m',
    improvementRate: '+12%',
    weeklyTarget: 3,
    weeklyCompleted: 2
  };

  // Daily suggestions
  const dailySuggestions = [
    {
      id: 1,
      title: 'Complete Physics Mock',
      description: 'Perfect time for a comprehensive physics test based on your energy levels',
      action: 'Start Mock Test',
      priority: 'high',
      icon: Target,
      estimatedTime: '3 hours'
    },
    {
      id: 2,
      title: 'Review Weak Areas',
      description: 'Focus on thermodynamics concepts from your last exam',
      action: 'Review Now',
      priority: 'medium',
      icon: Brain,
      estimatedTime: '45 min'
    },
    {
      id: 3,
      title: 'Quick Practice',
      description: 'Short chemistry quiz to maintain momentum',
      action: 'Quick Quiz',
      priority: 'low',
      icon: Zap,
      estimatedTime: '20 min'
    }
  ];

  // Subject data with detailed breakdown
  const subjectsData = {
    physics: {
      name: 'Physics',
      color: 'blue',
      totalExams: 15,
      completedExams: 12,
      avgScore: 75,
      progress: 80,
      topics: [
        { 
          name: 'Mechanics', 
          exams: 4, 
          completed: 4, 
          avgScore: 82, 
          progress: 100,
          weightage: 30,
          priority: 'medium',
          lastAttempted: '2 days ago',
          trend: '+5%'
        },
        { 
          name: 'Thermodynamics', 
          exams: 3, 
          completed: 2, 
          avgScore: 68, 
          progress: 67,
          weightage: 25,
          priority: 'critical',
          lastAttempted: '1 week ago',
          trend: '-3%'
        },
        { 
          name: 'Electromagnetism', 
          exams: 4, 
          completed: 3, 
          avgScore: 78, 
          progress: 75,
          weightage: 25,
          priority: 'high',
          lastAttempted: '3 days ago',
          trend: '+8%'
        },
        { 
          name: 'Optics', 
          exams: 2, 
          completed: 2, 
          avgScore: 85, 
          progress: 100,
          weightage: 15,
          priority: 'low',
          lastAttempted: '5 days ago',
          trend: '+12%'
        },
        { 
          name: 'Modern Physics', 
          exams: 2, 
          completed: 1, 
          avgScore: 72, 
          progress: 50,
          weightage: 5,
          priority: 'medium',
          lastAttempted: '1 week ago',
          trend: '+2%'
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      color: 'green',
      totalExams: 18,
      completedExams: 14,
      avgScore: 82,
      progress: 78,
      topics: [
        { 
          name: 'Organic Chemistry', 
          exams: 6, 
          completed: 5, 
          avgScore: 85, 
          progress: 83,
          weightage: 40,
          priority: 'high',
          lastAttempted: '1 day ago',
          trend: '+15%'
        },
        { 
          name: 'Inorganic Chemistry', 
          exams: 6, 
          completed: 5, 
          avgScore: 78, 
          progress: 83,
          weightage: 35,
          priority: 'medium',
          lastAttempted: '3 days ago',
          trend: '+7%'
        },
        { 
          name: 'Physical Chemistry', 
          exams: 6, 
          completed: 4, 
          avgScore: 80, 
          progress: 67,
          weightage: 25,
          priority: 'high',
          lastAttempted: '5 days ago',
          trend: '+10%'
        }
      ]
    },
    biology: {
      name: 'Biology',
      color: 'purple',
      totalExams: 12,
      completedExams: 6,
      avgScore: 76,
      progress: 50,
      topics: [
        { 
          name: 'Cell Biology', 
          exams: 3, 
          completed: 2, 
          avgScore: 88, 
          progress: 67,
          weightage: 25,
          priority: 'medium',
          lastAttempted: '4 days ago',
          trend: '+20%'
        },
        { 
          name: 'Genetics', 
          exams: 3, 
          completed: 2, 
          avgScore: 72, 
          progress: 67,
          weightage: 30,
          priority: 'high',
          lastAttempted: '1 week ago',
          trend: '+5%'
        },
        { 
          name: 'Human Physiology', 
          exams: 3, 
          completed: 1, 
          avgScore: 65, 
          progress: 33,
          weightage: 30,
          priority: 'critical',
          lastAttempted: '2 weeks ago',
          trend: '-2%'
        },
        { 
          name: 'Plant Biology', 
          exams: 2, 
          completed: 1, 
          avgScore: 78, 
          progress: 50,
          weightage: 15,
          priority: 'medium',
          lastAttempted: '10 days ago',
          trend: '+8%'
        }
      ]
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <BackButton to="/dashboard/student" />
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Practice Exam Center
            </h1>
            <p className="text-gray-600 mt-2">Test your knowledge with comprehensive mock examinations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </Button>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{overviewStats.totalExams}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{overviewStats.completedExams}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overviewStats.avgScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{overviewStats.highestScore}%</div>
              <div className="text-sm text-gray-600">Best Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overviewStats.improvementRate}</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{overviewStats.weeklyCompleted}</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
              <Progress value={(overviewStats.weeklyCompleted / overviewStats.weeklyTarget) * 100} className="h-1 mt-1" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Smart Suggestions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-emerald-500 to-blue-500 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dailySuggestions.map((suggestion, index) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 text-white mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{suggestion.title}</h3>
                          <p className="text-white/80 text-sm mt-1">{suggestion.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                              {suggestion.action}
                            </Button>
                            <span className="text-white/70 text-xs">{suggestion.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeSubject} onValueChange={setActiveSubject}>
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="physics" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                Physics
              </TabsTrigger>
              <TabsTrigger value="chemistry" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                Chemistry
              </TabsTrigger>
              <TabsTrigger value="biology" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                Biology
              </TabsTrigger>
            </TabsList>

            {Object.entries(subjectsData).map(([key, subject]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Subject Overview */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${subject.color}-500`} />
                        {subject.name} Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{subject.avgScore}%</div>
                        <div className="text-sm text-gray-600">Average Score</div>
                        <Progress value={subject.avgScore} className="mt-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{subject.completedExams}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{subject.totalExams}</div>
                          <div className="text-xs text-gray-600">Total</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{subject.progress}%</div>
                          <div className="text-sm text-gray-600">Progress</div>
                          <Progress value={subject.progress} className="mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Topics List */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Topic-wise Performance</h3>
                      <Badge variant="outline" className="bg-white/80">
                        {subject.topics.length} Topics
                      </Badge>
                    </div>

                    {subject.topics.map((topic, index) => (
                      <motion.div
                        key={topic.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold text-lg">{topic.name}</h4>
                                <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                                  {topic.priority}
                                </Badge>
                                <Badge variant="outline" className={`${getTrendColor(topic.trend)} border-current`}>
                                  {topic.trend}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-blue-600">{topic.avgScore}%</div>
                                <div className="text-xs text-gray-500">Avg Score</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="text-center p-2 bg-blue-50 rounded-lg">
                                <div className="text-sm font-bold text-blue-600">{topic.exams}</div>
                                <div className="text-xs text-blue-600">Total Exams</div>
                              </div>
                              <div className="text-center p-2 bg-green-50 rounded-lg">
                                <div className="text-sm font-bold text-green-600">{topic.completed}</div>
                                <div className="text-xs text-green-600">Completed</div>
                              </div>
                              <div className="text-center p-2 bg-purple-50 rounded-lg">
                                <div className="text-sm font-bold text-purple-600">{topic.progress}%</div>
                                <div className="text-xs text-purple-600">Progress</div>
                              </div>
                              <div className="text-center p-2 bg-orange-50 rounded-lg">
                                <div className="text-sm font-bold text-orange-600">{topic.weightage}%</div>
                                <div className="text-xs text-orange-600">Weightage</div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{topic.progress}%</span>
                              </div>
                              <Progress value={topic.progress} className="h-2" />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm text-gray-600">
                                Last attempted: {topic.lastAttempted}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <TrendingUp className="h-3 w-3" />
                                <span className={getTrendColor(topic.trend)}>
                                  {topic.trend}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <Play className="h-3 w-3 mr-1" />
                                Start Exam
                              </Button>
                              <Button size="sm" variant="outline">
                                <BarChart3 className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeExamsView;
