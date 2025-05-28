
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Play, 
  ChevronRight, 
  Brain, 
  Star,
  Award,
  BarChart3,
  Lightbulb,
  BookMarked,
  Users,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

const RedesignedConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('all');

  // Enhanced concept data with weightage analysis
  const subjectData = {
    physics: {
      name: 'Physics',
      totalConcepts: 120,
      masteredConcepts: 85,
      inProgressConcepts: 20,
      newConcepts: 15,
      studyTime: '32h 45m',
      efficiency: 82,
      examWeightage: 33.3,
      improvementRate: '+18%',
      color: 'from-blue-500 to-cyan-500',
      topics: [
        { name: 'Mechanics', progress: 90, weightage: 25, concepts: 25, difficulty: 'medium' },
        { name: 'Thermodynamics', progress: 75, weightage: 20, concepts: 18, difficulty: 'hard' },
        { name: 'Optics', progress: 65, weightage: 15, concepts: 22, difficulty: 'medium' },
        { name: 'Modern Physics', progress: 45, weightage: 15, concepts: 15, difficulty: 'hard' },
        { name: 'Waves', progress: 80, weightage: 15, concepts: 20, difficulty: 'medium' },
        { name: 'Electromagnetism', progress: 55, weightage: 10, concepts: 20, difficulty: 'hard' }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      totalConcepts: 150,
      masteredConcepts: 110,
      inProgressConcepts: 25,
      newConcepts: 15,
      studyTime: '41h 20m',
      efficiency: 88,
      examWeightage: 33.3,
      improvementRate: '+22%',
      color: 'from-green-500 to-emerald-500',
      topics: [
        { name: 'Organic Chemistry', progress: 85, weightage: 35, concepts: 45, difficulty: 'hard' },
        { name: 'Inorganic Chemistry', progress: 70, weightage: 30, concepts: 35, difficulty: 'medium' },
        { name: 'Physical Chemistry', progress: 80, weightage: 25, concepts: 30, difficulty: 'hard' },
        { name: 'Environmental Chemistry', progress: 90, weightage: 10, concepts: 15, difficulty: 'easy' }
      ]
    },
    biology: {
      name: 'Biology',
      totalConcepts: 180,
      masteredConcepts: 125,
      inProgressConcepts: 35,
      newConcepts: 20,
      studyTime: '48h 15m',
      efficiency: 79,
      examWeightage: 33.4,
      improvementRate: '+15%',
      color: 'from-purple-500 to-pink-500',
      topics: [
        { name: 'Cell Biology', progress: 95, weightage: 20, concepts: 30, difficulty: 'medium' },
        { name: 'Genetics', progress: 70, weightage: 20, concepts: 25, difficulty: 'hard' },
        { name: 'Ecology', progress: 60, weightage: 15, concepts: 20, difficulty: 'medium' },
        { name: 'Human Physiology', progress: 80, weightage: 25, concepts: 35, difficulty: 'medium' },
        { name: 'Plant Biology', progress: 65, weightage: 15, concepts: 25, difficulty: 'medium' },
        { name: 'Evolution', progress: 75, weightage: 5, concepts: 15, difficulty: 'easy' }
      ]
    }
  };

  const aiSuggestions = [
    {
      icon: TrendingUp,
      title: "Focus on Physics Electromagnetism",
      description: "This topic has high exam weightage (25%) but low progress (55%). Dedicate 30 min daily.",
      priority: "high",
      timeEstimate: "30 min/day"
    },
    {
      icon: Target,
      title: "Review Chemistry Organic Mechanisms",
      description: "Great progress! Schedule weekly reviews to maintain 85% mastery in this high-weightage topic.",
      priority: "medium",
      timeEstimate: "15 min/week"
    },
    {
      icon: Lightbulb,
      title: "Biology Genetics Breakthrough",
      description: "Consider concept mapping for complex inheritance patterns. Your efficiency can improve by 15%.",
      priority: "medium",
      timeEstimate: "45 min"
    },
    {
      icon: BookMarked,
      title: "Quick Win: Environmental Chemistry",
      description: "Low weightage but easy difficulty. Complete remaining concepts for a confidence boost.",
      priority: "low",
      timeEstimate: "20 min"
    }
  ];

  const overallStats = {
    totalConcepts: 450,
    masteredConcepts: 320,
    averageEfficiency: 83,
    totalStudyTime: '122h 20m',
    weeklyGoal: 35,
    weeklyProgress: 28,
    streak: 12
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Concept Mastery Hub
            </h1>
            <p className="text-lg text-gray-600 mt-2">AI-powered concept learning with weightage analysis</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Search className="h-4 w-4 mr-2" />
              Smart Search
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Concept
            </Button>
          </div>
        </motion.div>

        {/* Premium Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{overallStats.totalConcepts}</div>
              <div className="text-sm text-gray-600">Total Concepts</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.masteredConcepts}</div>
              <div className="text-sm text-gray-600">Mastered</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{overallStats.averageEfficiency}%</div>
              <div className="text-sm text-gray-600">Efficiency</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.totalStudyTime}</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overallStats.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{overallStats.weeklyProgress}</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
              <Progress value={(overallStats.weeklyProgress / overallStats.weeklyGoal) * 100} className="h-1 mt-1" />
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">A+</div>
              <div className="text-sm text-gray-600">Performance</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Suggestions Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Brain className="h-5 w-5" />
                Daily AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 bg-white rounded-lg border-l-4 shadow-sm ${getPriorityColor(suggestion.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <suggestion.icon className="h-5 w-5 text-indigo-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {suggestion.timeEstimate}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            suggestion.priority === 'high' ? 'border-red-200 text-red-700' :
                            suggestion.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-green-200 text-green-700'
                          }`}>
                            {suggestion.priority} priority
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

        {/* Subject Tabs with Topic Breakdown */}
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
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold">{subject.name}</CardTitle>
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Exam Weightage: {subject.examWeightage}%
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Overall Progress</span>
                            <span>{Math.round((subject.masteredConcepts / subject.totalConcepts) * 100)}%</span>
                          </div>
                          <Progress value={(subject.masteredConcepts / subject.totalConcepts) * 100} className="h-3" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-green-50 rounded-lg text-center border border-green-200">
                            <div className="text-lg font-bold text-green-700">{subject.masteredConcepts}</div>
                            <div className="text-xs text-green-600">Mastered</div>
                          </div>
                          <div className="p-2 bg-yellow-50 rounded-lg text-center border border-yellow-200">
                            <div className="text-lg font-bold text-yellow-700">{subject.inProgressConcepts}</div>
                            <div className="text-xs text-yellow-600">Learning</div>
                          </div>
                          <div className="p-2 bg-blue-50 rounded-lg text-center border border-blue-200">
                            <div className="text-lg font-bold text-blue-700">{subject.newConcepts}</div>
                            <div className="text-xs text-blue-600">New</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                          <div className="flex items-center gap-1 text-xs">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{subject.studyTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-600 font-medium">{subject.improvementRate}</span>
                          </div>
                        </div>

                        <Button 
                          className={`w-full bg-gradient-to-r ${subject.color} text-white hover:opacity-90`}
                          onClick={() => setActiveSubject(key)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Study {subject.name}
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
                  {/* Subject Overview */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                        {subject.name} - Topic Wise Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">{subject.efficiency}%</div>
                          <div className="text-sm text-blue-600">Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                          <div className="text-2xl font-bold text-green-700">{subject.examWeightage}%</div>
                          <div className="text-sm text-green-600">Exam Weight</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <div className="text-2xl font-bold text-purple-700">{subject.studyTime}</div>
                          <div className="text-sm text-purple-600">Study Time</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                          <div className="text-2xl font-bold text-amber-700">{subject.improvementRate}</div>
                          <div className="text-sm text-amber-600">Improvement</div>
                        </div>
                      </div>

                      {/* Topic Breakdown */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Topic-wise Breakdown & Weightage</h3>
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
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">{topic.progress}%</div>
                                  <div className="text-xs text-gray-500">{topic.concepts} concepts</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{topic.progress}%</span>
                                </div>
                                <Progress value={topic.progress} className="h-2" />
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <div className="text-sm text-gray-600">
                                  Priority: {topic.weightage >= 25 ? 'High' : topic.weightage >= 15 ? 'Medium' : 'Low'}
                                </div>
                                <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                  <Play className="h-3 w-3 mr-1" />
                                  Study Now
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

export default RedesignedConceptsLandingPage;
