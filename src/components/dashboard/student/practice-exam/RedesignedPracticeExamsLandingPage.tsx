
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  Filter, 
  Calendar,
  Target,
  TrendingUp,
  Award,
  Brain,
  Zap,
  Users,
  BarChart3,
  Plus,
  Search,
  AlertCircle,
  Star
} from "lucide-react";

const RedesignedPracticeExamsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubject, setActiveSubject] = useState("all");

  // Enhanced exam data with weightage analysis
  const subjectData = {
    physics: {
      name: 'Physics',
      totalExams: 15,
      completedExams: 8,
      averageScore: 78,
      bestScore: 92,
      totalQuestions: 675,
      correctAnswers: 526,
      studyTime: '42h 15m',
      examWeightage: 33.3,
      color: 'from-blue-500 to-cyan-500',
      topics: [
        { name: 'Mechanics', exams: 4, avgScore: 85, weightage: 25, difficulty: 'medium', trend: '+5%' },
        { name: 'Thermodynamics', exams: 2, avgScore: 72, weightage: 20, difficulty: 'hard', trend: '+8%' },
        { name: 'Optics', exams: 3, avgScore: 80, weightage: 15, difficulty: 'medium', trend: '+3%' },
        { name: 'Modern Physics', exams: 2, avgScore: 68, weightage: 15, difficulty: 'hard', trend: '+12%' },
        { name: 'Waves', exams: 2, avgScore: 82, weightage: 15, difficulty: 'medium', trend: '+2%' }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      totalExams: 18,
      completedExams: 12,
      averageScore: 84,
      bestScore: 96,
      totalQuestions: 810,
      correctAnswers: 680,
      studyTime: '38h 30m',
      examWeightage: 33.3,
      color: 'from-green-500 to-emerald-500',
      topics: [
        { name: 'Organic Chemistry', exams: 6, avgScore: 88, weightage: 35, difficulty: 'hard', trend: '+6%' },
        { name: 'Inorganic Chemistry', exams: 4, avgScore: 82, weightage: 30, difficulty: 'medium', trend: '+4%' },
        { name: 'Physical Chemistry', exams: 2, avgScore: 76, weightage: 25, difficulty: 'hard', trend: '+15%' }
      ]
    },
    biology: {
      name: 'Biology',
      totalExams: 20,
      completedExams: 15,
      averageScore: 86,
      bestScore: 94,
      totalQuestions: 900,
      correctAnswers: 774,
      studyTime: '45h 45m',
      examWeightage: 33.4,
      color: 'from-purple-500 to-pink-500',
      topics: [
        { name: 'Cell Biology', exams: 4, avgScore: 90, weightage: 20, difficulty: 'medium', trend: '+3%' },
        { name: 'Genetics', exams: 5, avgScore: 82, weightage: 20, difficulty: 'hard', trend: '+8%' },
        { name: 'Human Physiology', exams: 6, avgScore: 88, weightage: 25, difficulty: 'medium', trend: '+5%' },
        { name: 'Plant Biology', exams: 3, avgScore: 85, weightage: 15, difficulty: 'medium', trend: '+7%' },
        { name: 'Ecology', exams: 2, avgScore: 78, weightage: 15, difficulty: 'easy', trend: '+10%' }
      ]
    }
  };

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Strong Improvement in Modern Physics",
      description: "Your scores improved by 12% this month. Continue focusing on problem-solving techniques.",
      type: "improvement",
      priority: "medium",
      impact: "+12% score increase"
    },
    {
      icon: AlertCircle,
      title: "Time Management Alert",
      description: "You're spending 25% more time on Physics exams. Practice speed with timed mock tests.",
      type: "timing",
      priority: "high",
      impact: "25% time optimization"
    },
    {
      icon: Target,
      title: "Chemistry Performance Peak",
      description: "Consistent 84%+ scores in Chemistry. Use this confidence boost for challenging topics.",
      type: "strength",
      priority: "low",
      impact: "Confidence boost"
    },
    {
      icon: Brain,
      title: "Pattern Recognition Improvement",
      description: "Your Biology question accuracy improved 8% through pattern recognition techniques.",
      type: "strategy",
      priority: "medium",
      impact: "+8% accuracy"
    }
  ];

  const overallStats = {
    totalExams: 53,
    completedExams: 35,
    averageScore: 82.7,
    totalQuestions: 2385,
    correctAnswers: 1980,
    studyTime: '126h 30m',
    improvement: '+8.5%',
    rank: 'Top 15%'
  };

  const upcomingExams = [
    {
      id: "1",
      title: "NEET Physics Full Mock Test",
      subject: "Physics",
      duration: 180,
      questions: 90,
      difficulty: "hard",
      deadline: "Tomorrow",
      priority: "high",
      weightage: "High weightage topics"
    },
    {
      id: "2", 
      title: "Chemistry Organic Mock",
      subject: "Chemistry",
      duration: 90,
      questions: 45,
      difficulty: "medium",
      deadline: "2 days",
      priority: "medium",
      weightage: "35% exam weightage"
    },
    {
      id: "3",
      title: "Biology Comprehensive Test",
      subject: "Biology", 
      duration: 120,
      questions: 60,
      difficulty: "medium",
      deadline: "3 days",
      priority: "medium",
      weightage: "Mixed topics"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Practice Exams
            </h1>
            <p className="text-lg text-gray-600 mt-2">AI-driven exam preparation with performance analytics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Filter className="h-4 w-4 mr-2" />
              Smart Filter
            </Button>
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Search className="h-4 w-4 mr-2" />
              Find Exams
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </motion.div>

        {/* Premium Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{overallStats.totalExams}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.completedExams}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round((overallStats.correctAnswers / overallStats.totalQuestions) * 100)}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{overallStats.studyTime}</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{overallStats.improvement}</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{overallStats.rank}</div>
              <div className="text-sm text-gray-600">Rank</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">A+</div>
              <div className="text-sm text-gray-600">Grade</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Performance Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Brain className="h-5 w-5" />
                AI Performance Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 bg-white rounded-lg border-l-4 shadow-sm ${getPriorityColor(insight.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <insight.icon className="h-5 w-5 text-indigo-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {insight.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(subjectData).map(([key, subject]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group cursor-pointer"
                    onClick={() => {setActiveTab("subjects"); setActiveSubject(key);}}
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                      <div className={`bg-gradient-to-r ${subject.color} h-2`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                            {subject.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{subject.averageScore}%</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.completedExams}/{subject.totalExams} exams • {subject.examWeightage}% weightage
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Completion Progress</span>
                            <span>{Math.round((subject.completedExams / subject.totalExams) * 100)}%</span>
                          </div>
                          <Progress value={(subject.completedExams / subject.totalExams) * 100} className="h-3" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-blue-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-blue-700">{subject.averageScore}%</div>
                            <div className="text-xs text-blue-600">Avg Score</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-green-700">{subject.bestScore}%</div>
                            <div className="text-xs text-green-600">Best Score</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-purple-700">{Math.round((subject.correctAnswers / subject.totalQuestions) * 100)}%</div>
                            <div className="text-xs text-purple-600">Accuracy</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>Study time: {subject.studyTime}</span>
                        </div>

                        <Button className={`w-full bg-gradient-to-r ${subject.color} text-white hover:opacity-90`}>
                          <FileText className="h-3 w-3 mr-1" />
                          Take Exam
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="subjects" className="mt-6">
              <Tabs value={activeSubject} onValueChange={setActiveSubject}>
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger value="physics">Physics</TabsTrigger>
                  <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                  <TabsTrigger value="biology">Biology</TabsTrigger>
                </TabsList>

                {Object.entries(subjectData).map(([key, subject]) => (
                  <TabsContent key={key} value={key} className="mt-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                          {subject.name} - Topic-wise Performance Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div className="text-2xl font-bold text-blue-700">{subject.completedExams}</div>
                            <div className="text-sm text-blue-600">Completed Exams</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">{subject.averageScore}%</div>
                            <div className="text-sm text-green-600">Average Score</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                            <div className="text-2xl font-bold text-purple-700">{subject.bestScore}%</div>
                            <div className="text-sm text-purple-600">Best Score</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                            <div className="text-2xl font-bold text-amber-700">{subject.examWeightage}%</div>
                            <div className="text-sm text-amber-600">Exam Weight</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Topic-wise Performance & Trends</h3>
                          <div className="grid gap-4">
                            {subject.topics.map((topic, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                                    <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                      {topic.difficulty}
                                    </Badge>
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                      {topic.weightage}% weightage
                                    </Badge>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      {topic.trend} trend
                                    </Badge>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-gray-900">{topic.avgScore}%</div>
                                    <div className="text-xs text-gray-500">{topic.exams} exams</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Performance Score</span>
                                    <span>{topic.avgScore}%</span>
                                  </div>
                                  <Progress value={topic.avgScore} className="h-2" />
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                  <div className="text-sm text-gray-600">
                                    Priority: {topic.weightage >= 25 ? 'High' : topic.weightage >= 15 ? 'Medium' : 'Low'}
                                  </div>
                                  <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                    <FileText className="h-3 w-3 mr-1" />
                                    Take Test
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      Upcoming Practice Exams & Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingExams.map((exam, index) => (
                        <motion.div
                          key={exam.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-4 bg-white rounded-lg border-l-4 shadow-sm ${getPriorityColor(exam.priority)}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                                  {exam.difficulty}
                                </Badge>
                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                  {exam.subject}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{exam.duration} min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  <span>{exam.questions} questions</span>
                                </div>
                                <span>{exam.weightage}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 mb-2">Due: {exam.deadline}</div>
                              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                                <Play className="h-3 w-3 mr-1" />
                                Start Exam
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    Detailed Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Advanced Analytics Coming Soon</h3>
                    <p className="text-gray-500">Detailed performance charts, trend analysis, and comparison metrics will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedPracticeExamsLandingPage;
