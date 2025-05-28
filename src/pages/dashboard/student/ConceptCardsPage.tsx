
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Brain, 
  Star,
  ChevronRight,
  BarChart3,
  Calendar,
  Award
} from "lucide-react";
import { motion } from 'framer-motion';

const ConceptCardsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const overviewStats = {
    totalConcepts: 450,
    masteredConcepts: 320,
    inProgressConcepts: 85,
    weeklyGoal: 50,
    weeklyProgress: 38,
    studyStreak: 7,
    averageAccuracy: 87
  };

  const aiSuggestions = [
    {
      id: 1,
      priority: 'high',
      text: 'Focus on Physics Electromagnetism - performance has dropped 15% this week',
      action: 'Review Now',
      estimated: '25 min'
    },
    {
      id: 2,
      priority: 'medium', 
      text: 'Great progress in Organic Chemistry! Consider advancing to harder concepts',
      action: 'Level Up',
      estimated: '30 min'
    },
    {
      id: 3,
      priority: 'low',
      text: 'Schedule Biology revision session for better retention',
      action: 'Schedule',
      estimated: '20 min'
    }
  ];

  const subjectData = {
    physics: {
      totalConcepts: 120,
      masteredConcepts: 85,
      weightage: 35,
      topics: [
        { name: 'Mechanics', concepts: 25, mastery: 90, weightage: 30, priority: 'medium' },
        { name: 'Thermodynamics', concepts: 18, mastery: 75, weightage: 25, priority: 'high' },
        { name: 'Electromagnetism', concepts: 22, mastery: 65, weightage: 35, priority: 'high' },
        { name: 'Modern Physics', concepts: 15, mastery: 80, weightage: 10, priority: 'low' }
      ]
    },
    chemistry: {
      totalConcepts: 150,
      masteredConcepts: 110,
      weightage: 35,
      topics: [
        { name: 'Organic Chemistry', concepts: 45, mastery: 85, weightage: 40, priority: 'high' },
        { name: 'Inorganic Chemistry', concepts: 35, mastery: 70, weightage: 30, priority: 'medium' },
        { name: 'Physical Chemistry', concepts: 30, mastery: 80, weightage: 30, priority: 'medium' }
      ]
    },
    biology: {
      totalConcepts: 180,
      masteredConcepts: 125,
      weightage: 30,
      topics: [
        { name: 'Cell Biology', concepts: 30, mastery: 95, weightage: 25, priority: 'low' },
        { name: 'Genetics', concepts: 25, mastery: 70, weightage: 35, priority: 'high' },
        { name: 'Ecology', concepts: 20, mastery: 60, weightage: 20, priority: 'medium' },
        { name: 'Human Physiology', concepts: 35, mastery: 85, weightage: 20, priority: 'medium' }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Concept Cards
            </h1>
            <p className="text-gray-600 mt-2">Master NEET concepts with personalized learning paths</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <BookOpen className="h-4 w-4 mr-2" />
            Create New Concept
          </Button>
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
                  <div className="text-2xl font-bold text-indigo-600">{overviewStats.totalConcepts}</div>
                  <div className="text-sm text-gray-600">Total Concepts</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{overviewStats.masteredConcepts}</div>
                  <div className="text-sm text-gray-600">Mastered</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{overviewStats.inProgressConcepts}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{overviewStats.averageAccuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
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
                  <div className="text-2xl font-bold text-pink-600">{overviewStats.weeklyProgress}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">{overviewStats.weeklyGoal}</div>
                  <div className="text-sm text-gray-600">Weekly Goal</div>
                  <Progress value={(overviewStats.weeklyProgress / overviewStats.weeklyGoal) * 100} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
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
                    <CardTitle className="text-lg capitalize">{subject}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((data.masteredConcepts / data.totalConcepts) * 100)}%</span>
                    </div>
                    <Progress value={(data.masteredConcepts / data.totalConcepts) * 100} className="h-2" />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Mastered:</span>
                        <span className="font-medium ml-1">{data.masteredConcepts}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium ml-1">{data.totalConcepts}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
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
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      Topic-wise Breakdown
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
                            <span className="text-sm text-gray-600">{topic.mastery}%</span>
                          </div>
                        </div>
                        <Progress value={topic.mastery} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{topic.concepts} concepts</span>
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
                      <Target className="h-5 w-5 text-purple-600" />
                      Weightage Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{data.weightage}%</div>
                      <div className="text-sm text-gray-600">Overall Exam Weightage</div>
                    </div>
                    <div className="space-y-3">
                      {data.topics.map((topic) => (
                        <div key={topic.name} className="flex items-center justify-between">
                          <span className="text-sm">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
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

export default ConceptCardsPage;
