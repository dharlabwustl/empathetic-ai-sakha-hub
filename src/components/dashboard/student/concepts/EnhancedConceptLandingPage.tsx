
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Lightbulb,
  BarChart3,
  Zap,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const EnhancedConceptLandingPage = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');

  // Enhanced overview stats
  const overviewStats = {
    totalConcepts: 450,
    masteredConcepts: 320,
    inProgressConcepts: 80,
    newConcepts: 50,
    totalStudyTime: '122h 45m',
    avgEfficiency: 83,
    weeklyGoal: 25,
    weeklyProgress: 18,
    currentStreak: 7
  };

  // Daily AI suggestions
  const dailySuggestions = [
    {
      id: 1,
      type: 'priority',
      title: 'Focus on Thermodynamics',
      description: 'Your weakest area needs 30 mins today for optimal progress',
      action: 'Start Review',
      priority: 'high',
      icon: Target
    },
    {
      id: 2,
      type: 'strength',
      title: 'Mechanics Mastery',
      description: 'Great progress! Review advanced concepts to stay sharp',
      action: 'Continue',
      priority: 'medium',
      icon: Award
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Perfect Study Time',
      description: 'Your focus peaks at 3 PM - schedule difficult topics then',
      action: 'Plan Now',
      priority: 'low',
      icon: Clock
    }
  ];

  // Subject data with detailed breakdown
  const subjectsData = {
    physics: {
      name: 'Physics',
      color: 'blue',
      totalConcepts: 120,
      masteredConcepts: 85,
      progress: 71,
      weeklyTarget: 8,
      completed: 6,
      topics: [
        { 
          name: 'Mechanics', 
          progress: 90, 
          weightage: 25, 
          priority: 'high',
          subtopics: ['Kinematics', 'Dynamics', 'Work & Energy', 'Rotational Motion'],
          examImportance: 95
        },
        { 
          name: 'Thermodynamics', 
          progress: 65, 
          weightage: 20, 
          priority: 'critical',
          subtopics: ['Laws of Thermodynamics', 'Heat Engines', 'Entropy'],
          examImportance: 88
        },
        { 
          name: 'Electromagnetism', 
          progress: 78, 
          weightage: 30, 
          priority: 'high',
          subtopics: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Induction'],
          examImportance: 92
        },
        { 
          name: 'Optics', 
          progress: 85, 
          weightage: 15, 
          priority: 'medium',
          subtopics: ['Geometric Optics', 'Wave Optics', 'Modern Optics'],
          examImportance: 75
        },
        { 
          name: 'Modern Physics', 
          progress: 55, 
          weightage: 10, 
          priority: 'high',
          subtopics: ['Quantum Mechanics', 'Nuclear Physics', 'Relativity'],
          examImportance: 82
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      color: 'green',
      totalConcepts: 150,
      masteredConcepts: 110,
      progress: 73,
      weeklyTarget: 10,
      completed: 8,
      topics: [
        { 
          name: 'Organic Chemistry', 
          progress: 85, 
          weightage: 35, 
          priority: 'critical',
          subtopics: ['Hydrocarbons', 'Functional Groups', 'Reactions', 'Biomolecules'],
          examImportance: 98
        },
        { 
          name: 'Inorganic Chemistry', 
          progress: 70, 
          weightage: 30, 
          priority: 'high',
          subtopics: ['Periodic Table', 'Chemical Bonding', 'Coordination Compounds'],
          examImportance: 90
        },
        { 
          name: 'Physical Chemistry', 
          progress: 80, 
          weightage: 35, 
          priority: 'high',
          subtopics: ['Chemical Kinetics', 'Equilibrium', 'Electrochemistry'],
          examImportance: 94
        }
      ]
    },
    biology: {
      name: 'Biology',
      color: 'purple',
      totalConcepts: 180,
      masteredConcepts: 125,
      progress: 69,
      weeklyTarget: 12,
      completed: 9,
      topics: [
        { 
          name: 'Cell Biology', 
          progress: 95, 
          weightage: 20, 
          priority: 'medium',
          subtopics: ['Cell Structure', 'Cell Division', 'Cell Metabolism'],
          examImportance: 85
        },
        { 
          name: 'Genetics', 
          progress: 70, 
          weightage: 25, 
          priority: 'high',
          subtopics: ['Heredity', 'DNA & RNA', 'Gene Expression', 'Evolution'],
          examImportance: 92
        },
        { 
          name: 'Plant Physiology', 
          progress: 60, 
          weightage: 20, 
          priority: 'critical',
          subtopics: ['Photosynthesis', 'Plant Hormones', 'Transport Systems'],
          examImportance: 88
        },
        { 
          name: 'Human Physiology', 
          progress: 75, 
          weightage: 25, 
          priority: 'high',
          subtopics: ['Digestive System', 'Circulatory System', 'Nervous System'],
          examImportance: 95
        },
        { 
          name: 'Ecology', 
          progress: 65, 
          weightage: 10, 
          priority: 'medium',
          subtopics: ['Ecosystems', 'Environmental Issues', 'Biodiversity'],
          examImportance: 70
        }
      ]
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'priority': return Target;
      case 'strength': return Award;
      case 'schedule': return Clock;
      default: return Lightbulb;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Concept Mastery Hub
            </h1>
            <p className="text-gray-600 mt-2">Master NEET concepts with AI-powered learning paths</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/student/concepts/create')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Concept
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
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
              <div className="text-2xl font-bold text-blue-600">{overviewStats.totalConcepts}</div>
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
              <div className="text-2xl font-bold text-orange-600">{overviewStats.inProgressConcepts}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overviewStats.avgEfficiency}%</div>
              <div className="text-sm text-gray-600">Efficiency</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overviewStats.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{overviewStats.weeklyProgress}</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
              <Progress value={(overviewStats.weeklyProgress / overviewStats.weeklyGoal) * 100} className="h-1 mt-1" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Smart Suggestions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dailySuggestions.map((suggestion, index) => {
                  const IconComponent = getSuggestionIcon(suggestion.type);
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
                          <Button size="sm" variant="outline" className="mt-2 bg-white/20 border-white/30 text-white hover:bg-white/30">
                            {suggestion.action}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                        <div className="text-3xl font-bold text-gray-900">{subject.progress}%</div>
                        <div className="text-sm text-gray-600">Overall Progress</div>
                        <Progress value={subject.progress} className="mt-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{subject.masteredConcepts}</div>
                          <div className="text-xs text-gray-600">Mastered</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{subject.totalConcepts}</div>
                          <div className="text-xs text-gray-600">Total</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm">
                          <span>Weekly Target</span>
                          <span>{subject.completed}/{subject.weeklyTarget}</span>
                        </div>
                        <Progress value={(subject.completed / subject.weeklyTarget) * 100} className="mt-1" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Topics List */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Topic-wise Breakdown</h3>
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
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-blue-600">{topic.progress}%</div>
                                <div className="text-xs text-gray-500">Progress</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-lg font-bold text-blue-600">{topic.weightage}%</div>
                                <div className="text-xs text-blue-600">Exam Weightage</div>
                              </div>
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-lg font-bold text-green-600">{topic.examImportance}%</div>
                                <div className="text-xs text-green-600">Importance</div>
                              </div>
                              <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-lg font-bold text-purple-600">{topic.subtopics.length}</div>
                                <div className="text-xs text-purple-600">Subtopics</div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{topic.progress}%</span>
                              </div>
                              <Progress value={topic.progress} className="h-2" />
                            </div>

                            <div className="mb-4">
                              <h5 className="text-sm font-medium mb-2">Subtopics:</h5>
                              <div className="flex flex-wrap gap-2">
                                {topic.subtopics.map((subtopic) => (
                                  <Badge key={subtopic} variant="outline" className="text-xs">
                                    {subtopic}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <Play className="h-3 w-3 mr-1" />
                                Study Now
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

export default EnhancedConceptLandingPage;
