
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  BarChart3,
  Clock,
  Target,
  Star,
  TrendingUp,
  Brain,
  Zap,
  Award,
  Users,
  Calendar,
  Lightbulb
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const RedesignedFlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');

  // Enhanced flashcard data with weightage analysis
  const subjectData = {
    physics: {
      name: 'Physics',
      sets: 12,
      totalCards: 180,
      masteredCards: 125,
      accuracy: 87,
      studyTime: '45h 30m',
      efficiency: 85,
      examWeightage: 33.3,
      color: 'from-blue-500 to-cyan-500',
      topics: [
        { name: 'Mechanics', sets: 4, cards: 60, mastered: 45, accuracy: 90, weightage: 25 },
        { name: 'Thermodynamics', sets: 2, cards: 30, mastered: 20, accuracy: 82, weightage: 20 },
        { name: 'Optics', sets: 3, cards: 45, mastered: 30, accuracy: 85, weightage: 15 },
        { name: 'Modern Physics', sets: 2, cards: 25, mastered: 15, accuracy: 78, weightage: 15 },
        { name: 'Waves', sets: 1, cards: 20, mastered: 15, accuracy: 88, weightage: 15 }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      sets: 15,
      totalCards: 225,
      masteredCards: 180,
      accuracy: 92,
      studyTime: '52h 15m',
      efficiency: 91,
      examWeightage: 33.3,
      color: 'from-green-500 to-emerald-500',
      topics: [
        { name: 'Organic Chemistry', sets: 6, cards: 90, mastered: 75, accuracy: 88, weightage: 35 },
        { name: 'Inorganic Chemistry', sets: 5, cards: 75, mastered: 60, accuracy: 90, weightage: 30 },
        { name: 'Physical Chemistry', sets: 4, cards: 60, mastered: 45, accuracy: 85, weightage: 25 }
      ]
    },
    biology: {
      name: 'Biology',
      sets: 18,
      totalCards: 270,
      masteredCards: 195,
      accuracy: 89,
      studyTime: '61h 45m',
      efficiency: 88,
      examWeightage: 33.4,
      color: 'from-purple-500 to-pink-500',
      topics: [
        { name: 'Cell Biology', sets: 4, cards: 60, mastered: 50, accuracy: 92, weightage: 20 },
        { name: 'Genetics', sets: 5, cards: 75, mastered: 55, accuracy: 85, weightage: 20 },
        { name: 'Human Physiology', sets: 6, cards: 90, mastered: 70, accuracy: 88, weightage: 25 },
        { name: 'Plant Biology', sets: 3, cards: 45, mastered: 20, accuracy: 80, weightage: 15 }
      ]
    }
  };

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Optimal Review Time Detected",
      description: "Your retention peaks at 4-6 PM. Schedule difficult topics during this window.",
      type: "timing",
      impact: "High"
    },
    {
      icon: Brain,
      title: "Concept Connection Opportunity",
      description: "Link Organic Chemistry mechanisms with Biology enzyme functions for better retention.",
      type: "learning",
      impact: "Medium"
    },
    {
      icon: Target,
      title: "Priority Focus: Physics Modern Physics",
      description: "Low accuracy (78%) with high weightage (15%). Dedicate 20 min daily.",
      type: "priority",
      impact: "High"
    },
    {
      icon: Zap,
      title: "Speed Improvement Available",
      description: "Your answer time decreased by 15% this week. Consider timed practice sessions.",
      type: "performance",
      impact: "Medium"
    }
  ];

  const overallStats = {
    totalSets: 45,
    totalCards: 675,
    masteredCards: 500,
    averageAccuracy: 89,
    studyStreak: 15,
    weeklyGoal: 50,
    weeklyProgress: 42,
    totalStudyTime: '159h 30m'
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'border-l-red-500 bg-red-50';
      case 'Medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'Low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Smart Flashcards Studio
            </h1>
            <p className="text-lg text-gray-600 mt-2">AI-powered spaced repetition with weightage optimization</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
              <Filter className="h-4 w-4 mr-2" />
              Smart Filter
            </Button>
            <Button variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Set
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
              <div className="text-2xl font-bold text-violet-600">{overallStats.totalSets}</div>
              <div className="text-sm text-gray-600">Total Sets</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{overallStats.totalCards}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.masteredCards}</div>
              <div className="text-sm text-gray-600">Mastered</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{overallStats.averageAccuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overallStats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.weeklyProgress}</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
              <Progress value={(overallStats.weeklyProgress / overallStats.weeklyGoal) * 100} className="h-1 mt-1" />
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{overallStats.totalStudyTime}</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">A+</div>
              <div className="text-sm text-gray-600">Grade</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 border-violet-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-800">
                <Brain className="h-5 w-5" />
                AI Learning Insights & Optimization
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
                    className={`p-4 bg-white rounded-lg border-l-4 shadow-sm ${getImpactColor(insight.impact)}`}
                  >
                    <div className="flex items-start gap-3">
                      <insight.icon className="h-5 w-5 text-violet-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.type}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            insight.impact === 'High' ? 'border-red-200 text-red-700' :
                            insight.impact === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-green-200 text-green-700'
                          }`}>
                            {insight.impact} Impact
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

        {/* Subject Tabs with Topic Analysis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeSubject} onValueChange={setActiveSubject}>
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="all">All Subjects</TabsTrigger>
              <TabsTrigger value="physics">Physics</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
              <TabsTrigger value="biology">Biology</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(subjectData).map(([key, subject]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group cursor-pointer"
                    onClick={() => setActiveSubject(key)}
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                      <div className={`bg-gradient-to-r ${subject.color} h-2`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold group-hover:text-violet-600 transition-colors">
                            {subject.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{subject.accuracy}%</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.sets} sets • {subject.totalCards} cards • {subject.examWeightage}% weightage
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Mastery Progress</span>
                            <span>{Math.round((subject.masteredCards / subject.totalCards) * 100)}%</span>
                          </div>
                          <Progress value={(subject.masteredCards / subject.totalCards) * 100} className="h-3" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-blue-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-blue-700">{subject.accuracy}%</div>
                            <div className="text-xs text-blue-600">Accuracy</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-green-700">{subject.efficiency}%</div>
                            <div className="text-xs text-green-600">Efficiency</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-purple-700">{subject.sets}</div>
                            <div className="text-xs text-purple-600">Sets</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>Study time: {subject.studyTime}</span>
                        </div>

                        <Button className={`w-full bg-gradient-to-r ${subject.color} text-white hover:opacity-90`}>
                          <Play className="h-3 w-3 mr-1" />
                          Study Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {Object.entries(subjectData).map(([key, subject]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                        {subject.name} - Topic Analysis & Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">{subject.sets}</div>
                          <div className="text-sm text-blue-600">Total Sets</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                          <div className="text-2xl font-bold text-green-700">{subject.accuracy}%</div>
                          <div className="text-sm text-green-600">Accuracy</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <div className="text-2xl font-bold text-purple-700">{subject.efficiency}%</div>
                          <div className="text-sm text-purple-600">Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                          <div className="text-2xl font-bold text-amber-700">{subject.examWeightage}%</div>
                          <div className="text-sm text-amber-600">Exam Weight</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Topic-wise Performance & Weightage</h3>
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
                                  <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                                    {topic.weightage}% weightage
                                  </Badge>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {topic.sets} sets
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">{topic.accuracy}%</div>
                                  <div className="text-xs text-gray-500">{topic.mastered}/{topic.cards} mastered</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Mastery Progress</span>
                                  <span>{Math.round((topic.mastered / topic.cards) * 100)}%</span>
                                </div>
                                <Progress value={(topic.mastered / topic.cards) * 100} className="h-2" />
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <div className="text-sm text-gray-600">
                                  Priority: {topic.weightage >= 25 ? 'High' : topic.weightage >= 15 ? 'Medium' : 'Low'}
                                </div>
                                <Button size="sm" variant="outline" className="text-violet-600 border-violet-200 hover:bg-violet-50">
                                  <Play className="h-3 w-3 mr-1" />
                                  Practice
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedFlashcardsLandingPage;
