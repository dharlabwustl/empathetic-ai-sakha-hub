
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  TrendingUp, 
  Target, 
  Clock, 
  Brain, 
  CheckCircle,
  Play,
  BarChart3,
  Award,
  Timer
} from "lucide-react";
import { motion } from 'framer-motion';

const PracticeExamsPageNew = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const overviewStats = {
    totalExams: 45,
    completedExams: 32,
    inProgressExams: 8,
    averageScore: 78,
    weeklyExams: 5,
    weeklyGoal: 7,
    studyStreak: 9
  };

  const aiSuggestions = [
    {
      id: 1,
      priority: 'high',
      text: 'Physics mock test performance dropped by 12% - focus on Electromagnetism',
      action: 'Take Test',
      estimated: '180 min'
    },
    {
      id: 2,
      priority: 'medium', 
      text: 'Chemistry organic reactions showing improvement - continue current pace',
      action: 'Continue',
      estimated: '120 min'
    },
    {
      id: 3,
      priority: 'low',
      text: 'Schedule Biology full mock test for comprehensive assessment',
      action: 'Schedule',
      estimated: '180 min'
    }
  ];

  const subjectData = {
    physics: {
      totalExams: 15,
      completedExams: 12,
      averageScore: 76,
      weightage: 35,
      topics: [
        { name: 'Mechanics', exams: 4, avgScore: 82, accuracy: 85, weightage: 30, priority: 'medium' },
        { name: 'Thermodynamics', exams: 3, avgScore: 71, accuracy: 74, weightage: 25, priority: 'high' },
        { name: 'Electromagnetism', exams: 4, avgScore: 68, accuracy: 72, weightage: 35, priority: 'high' },
        { name: 'Modern Physics', exams: 4, avgScore: 79, accuracy: 81, weightage: 10, priority: 'low' }
      ]
    },
    chemistry: {
      totalExams: 15,
      completedExams: 11,
      averageScore: 81,
      weightage: 35,
      topics: [
        { name: 'Organic Chemistry', exams: 5, avgScore: 84, accuracy: 87, weightage: 40, priority: 'high' },
        { name: 'Inorganic Chemistry', exams: 4, avgScore: 77, accuracy: 80, weightage: 30, priority: 'medium' },
        { name: 'Physical Chemistry', exams: 6, avgScore: 82, accuracy: 85, weightage: 30, priority: 'medium' }
      ]
    },
    biology: {
      totalExams: 15,
      completedExams: 9,
      averageScore: 77,
      weightage: 30,
      topics: [
        { name: 'Cell Biology', exams: 3, avgScore: 88, accuracy: 91, weightage: 25, priority: 'low' },
        { name: 'Genetics', exams: 3, avgScore: 72, accuracy: 76, weightage: 35, priority: 'high' },
        { name: 'Ecology', exams: 2, avgScore: 69, accuracy: 73, weightage: 20, priority: 'medium' },
        { name: 'Human Physiology', exams: 1, avgScore: 85, accuracy: 88, weightage: 20, priority: 'medium' }
      ]
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
            <p className="text-gray-600 mt-2">Assess your preparation with realistic exam simulations</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
              <FileText className="h-4 w-4 mr-2" />
              Create Custom Exam
            </Button>
            <Button variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Quick Test
            </Button>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">{overviewStats.totalExams}</div>
                  <div className="text-sm text-gray-600">Total Exams</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{overviewStats.completedExams}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{overviewStats.inProgressExams}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{overviewStats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{overviewStats.studyStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">{overviewStats.weeklyExams}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">{overviewStats.weeklyGoal}</div>
                  <div className="text-sm text-gray-600">Weekly Goal</div>
                  <Progress value={(overviewStats.weeklyExams / overviewStats.weeklyGoal) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Daily Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={`${getPriorityColor(suggestion.priority)} border-white/20 text-white`}>
                              {suggestion.priority} priority
                            </Badge>
                            <span className="text-sm text-white/80">{suggestion.estimated}</span>
                          </div>
                          <p className="text-white/90">{suggestion.text}</p>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          {suggestion.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {Object.entries(subjectData).map(([subject, data]) => (
                <Card key={subject} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg capitalize flex items-center justify-between">
                      <span>{subject}</span>
                      <Timer className="h-5 w-5 text-emerald-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{Math.round((data.completedExams / data.totalExams) * 100)}%</span>
                    </div>
                    <Progress value={(data.completedExams / data.totalExams) * 100} className="h-2" />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-medium ml-1">{data.completedExams}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Score:</span>
                        <span className="font-medium ml-1">{data.averageScore}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {data.weightage}% exam weightage
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Subject Tabs */}
          {Object.entries(subjectData).map(([subject, data]) => (
            <TabsContent key={subject} value={subject} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Topic-wise Breakdown */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                      Topic-wise Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.topics.map((topic) => (
                      <div key={topic.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                              {topic.priority}
                            </Badge>
                            <span className="text-sm text-gray-600">{topic.avgScore}%</span>
                          </div>
                        </div>
                        <Progress value={topic.accuracy} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{topic.exams} exams taken</span>
                          <span>{topic.weightage}% weightage</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Weightage Analysis */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-teal-600" />
                      Weightage Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600">{data.weightage}%</div>
                      <div className="text-sm text-gray-600">Overall Exam Weightage</div>
                    </div>
                    <div className="space-y-3">
                      {data.topics.map((topic) => (
                        <div key={topic.name} className="flex items-center justify-between">
                          <span className="text-sm">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal-600 h-2 rounded-full" 
                                style={{ width: `${topic.weightage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{topic.weightage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default PracticeExamsPageNew;
