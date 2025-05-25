
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Play, Brain, Eye, Zap, TrendingUp, Target, Clock, Award, BarChart2, LineChart, BookMarked, FileText, AlertTriangle, Bot, Users } from "lucide-react";
import { motion } from "framer-motion";
import VideoTabContent from '@/components/dashboard/student/concepts/VideoTabContent';
import FormulaTabContent from '@/components/dashboard/student/concepts/FormulaTabContent';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import EnhancedLearnTab from '@/components/dashboard/student/concepts/EnhancedLearnTab';
import EnhancedVisualTab from '@/components/dashboard/student/concepts/EnhancedVisualTab';
import Enhanced3DTab from '@/components/dashboard/student/concepts/Enhanced3DTab';
import CommonMistakesTab from '@/components/dashboard/student/concepts/CommonMistakesTab';
import AskAITab from '@/components/dashboard/student/concepts/AskAITab';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learn');
  const [masteryLevel, setMasteryLevel] = useState(65);

  // Mock concept data
  const concept = {
    id: conceptId || '1',
    title: "Newton's Second Law",
    subject: "Physics",
    difficulty: "Medium",
    description: "Understanding the relationship between force, mass, and acceleration in classical mechanics.",
    timeToMaster: "2-3 hours",
    examWeight: "High",
    lastStudied: "2 days ago",
    studyStreak: 5
  };

  const relatedConcepts = [
    { id: '2', title: "Newton's First Law", masteryLevel: 85 },
    { id: '3', title: "Force and Motion", masteryLevel: 70 },
    { id: '4', title: "Momentum", masteryLevel: 45 }
  ];

  // KPI Data
  const kpiData = [
    {
      title: "Study Time",
      value: "4.5 hrs",
      change: "+12%",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Accuracy",
      value: "78%",
      change: "+5%",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Streak",
      value: "5 days",
      change: "New!",
      icon: Award,
      color: "text-purple-600"
    },
    {
      title: "Mastery",
      value: `${masteryLevel}%`,
      change: "+8%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  // Suggested actions for learning tools
  const learningToolActions = [
    {
      title: "Watch Core Video",
      description: "11-minute explanation of key principles",
      action: () => setActiveTab('video'),
      icon: Play,
      color: "bg-blue-500"
    },
    {
      title: "Practice Problems",
      description: "Solve 5 related problems",
      action: () => navigate(`/dashboard/student/flashcards?concept=${encodeURIComponent(concept.title)}`),
      icon: Brain,
      color: "bg-green-500"
    },
    {
      title: "Take Quick Quiz",
      description: "Test your understanding",
      action: () => navigate(`/dashboard/student/practice-exam?concept=${encodeURIComponent(concept.title)}`),
      icon: Zap,
      color: "bg-purple-500"
    },
    {
      title: "Ask AI Tutor",
      description: "Get instant help and explanations",
      action: () => setActiveTab('ask-ai'),
      icon: Bot,
      color: "bg-indigo-500"
    }
  ];

  const learningPaths = [
    { title: "Beginner Path", progress: 60, lessons: 8 },
    { title: "Advanced Applications", progress: 30, lessons: 12 },
    { title: "Exam Prep Track", progress: 80, lessons: 6 }
  ];

  const performanceStats = [
    { label: "Study Time", value: "4.5 hrs", change: "+12%" },
    { label: "Accuracy", value: "78%", change: "+5%" },
    { label: "Streak", value: "5 days", change: "New!" }
  ];

  const handleRelatedConceptClick = (relatedConceptId: string) => {
    navigate(`/dashboard/student/concepts/${relatedConceptId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/student/concepts')}
            className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {concept.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    {concept.difficulty}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {concept.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {concept.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {concept.timeToMaster}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {concept.examWeight} Priority
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {concept.studyStreak} day streak
                  </span>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {masteryLevel}%
                  </div>
                  <div className="text-sm text-gray-500">Mastery Level</div>
                </div>
                <Progress value={masteryLevel} className="h-3 mb-2" />
                <div className="text-xs text-gray-500 text-center">
                  Last studied: {concept.lastStudied}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* KPI Section - Moved above learning tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kpi.value}</p>
                      <p className="text-xs text-green-600">{kpi.change}</p>
                    </div>
                    <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-7 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                    <TabsTrigger value="learn" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <BookMarked className="h-4 w-4 mr-2" />
                      Learn
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <LineChart className="h-4 w-4 mr-2" />
                      Visual
                    </TabsTrigger>
                    <TabsTrigger value="3d" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <Brain className="h-4 w-4 mr-2" />
                      3D Model
                    </TabsTrigger>
                    <TabsTrigger value="video" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <Play className="h-4 w-4 mr-2" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="formula" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Formula
                    </TabsTrigger>
                    <TabsTrigger value="mistakes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Mistakes
                    </TabsTrigger>
                    <TabsTrigger value="ask-ai" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <Bot className="h-4 w-4 mr-2" />
                      Ask AI
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <TabsContent value="learn" className="mt-0">
                      <EnhancedLearnTab conceptName={concept.title} />
                    </TabsContent>
                    
                    <TabsContent value="visual" className="mt-0">
                      <EnhancedVisualTab conceptName={concept.title} />
                    </TabsContent>
                    
                    <TabsContent value="3d" className="mt-0">
                      <Enhanced3DTab conceptName={concept.title} />
                    </TabsContent>
                    
                    <TabsContent value="video" className="mt-0">
                      <VideoTabContent conceptName={concept.title} />
                    </TabsContent>
                    
                    <TabsContent value="formula" className="mt-0">
                      <FormulaTabContent conceptName={concept.title} />
                    </TabsContent>

                    <TabsContent value="mistakes" className="mt-0">
                      <CommonMistakesTab conceptName={concept.title} />
                    </TabsContent>

                    <TabsContent value="ask-ai" className="mt-0">
                      <AskAITab conceptName={concept.title} />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Learning Tools Actions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Target className="h-5 w-5 mr-2 text-indigo-600" />
                    Learning Tools & Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {learningToolActions.map((action, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-gray-200 dark:border-gray-700"
                          onClick={action.action}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                              <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {action.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bottom Horizontal Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Learning Paths */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Learning Paths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{path.title}</span>
                        <span className="text-sm text-gray-500">{path.lessons} lessons</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                      <div className="text-xs text-gray-500">{path.progress}% complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BarChart2 className="h-5 w-5 mr-2 text-purple-600" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{stat.label}</div>
                        <div className="text-sm text-gray-500">{stat.change}</div>
                      </div>
                      <div className="text-xl font-bold text-indigo-600">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Tools */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="h-5 w-5 mr-2 text-orange-600" />
                    Quick Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate(`/dashboard/student/concepts/${encodeURIComponent(concept.title)}/formula-lab`)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Formula Lab
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate(`/dashboard/student/flashcards?concept=${encodeURIComponent(concept.title)}`)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Flashcards
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate(`/dashboard/student/practice-exam?concept=${encodeURIComponent(concept.title)}`)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Practice Quiz
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('ask-ai')}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Ask AI Tutor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <ConceptSidebar 
              masteryLevel={masteryLevel}
              relatedConcepts={relatedConcepts}
              examReady={masteryLevel >= 80}
              onRelatedConceptClick={handleRelatedConceptClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
