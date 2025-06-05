
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Award
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubject, setActiveSubject] = useState('physics');

  // Overview stats
  const overviewStats = {
    totalSets: 24,
    totalCards: 680,
    masteredCards: 485,
    averageAccuracy: 87,
    studyStreak: 12,
    weeklyGoal: 50,
    weeklyProgress: 38,
    totalStudyTime: '45h 30m'
  };

  // Daily suggestions
  const dailySuggestions = [
    {
      id: 1,
      title: 'Review Weak Cards',
      description: '15 cards need urgent review to maintain retention',
      action: 'Review Now',
      priority: 'high',
      icon: Target,
      timeEstimate: '10 min'
    },
    {
      id: 2,
      title: 'New Card Session',
      description: 'Perfect time to learn 8 new chemistry concepts',
      action: 'Start Learning',
      priority: 'medium',
      icon: Plus,
      timeEstimate: '15 min'
    },
    {
      id: 3,
      title: 'Mastery Streak',
      description: 'You\'re on fire! Keep the momentum going',
      action: 'Continue',
      priority: 'low',
      icon: Award,
      timeEstimate: '5 min'
    }
  ];

  // Subject data with detailed breakdown
  const subjectsData = {
    physics: {
      name: 'Physics',
      color: 'blue',
      totalSets: 8,
      totalCards: 220,
      masteredCards: 165,
      progress: 75,
      accuracy: 84,
      topics: [
        { 
          name: 'Mechanics', 
          sets: 3, 
          cards: 85, 
          mastered: 72, 
          progress: 85, 
          accuracy: 89,
          weightage: 30,
          priority: 'high',
          lastStudied: '2 hours ago'
        },
        { 
          name: 'Thermodynamics', 
          sets: 2, 
          cards: 45, 
          mastered: 28, 
          progress: 62, 
          accuracy: 76,
          weightage: 25,
          priority: 'critical',
          lastStudied: '1 day ago'
        },
        { 
          name: 'Electromagnetism', 
          sets: 2, 
          cards: 60, 
          mastered: 48, 
          progress: 80, 
          accuracy: 87,
          weightage: 25,
          priority: 'medium',
          lastStudied: '5 hours ago'
        },
        { 
          name: 'Optics', 
          sets: 1, 
          cards: 30, 
          mastered: 17, 
          progress: 57, 
          accuracy: 82,
          weightage: 20,
          priority: 'medium',
          lastStudied: '3 days ago'
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      color: 'green',
      totalSets: 9,
      totalCards: 285,
      masteredCards: 215,
      progress: 75,
      accuracy: 91,
      topics: [
        { 
          name: 'Organic Chemistry', 
          sets: 4, 
          cards: 120, 
          mastered: 95, 
          progress: 79, 
          accuracy: 93,
          weightage: 40,
          priority: 'critical',
          lastStudied: '1 hour ago'
        },
        { 
          name: 'Inorganic Chemistry', 
          sets: 3, 
          cards: 90, 
          mastered: 72, 
          progress: 80, 
          accuracy: 88,
          weightage: 35,
          priority: 'high',
          lastStudied: '4 hours ago'
        },
        { 
          name: 'Physical Chemistry', 
          sets: 2, 
          cards: 75, 
          mastered: 48, 
          progress: 64, 
          accuracy: 92,
          weightage: 25,
          priority: 'high',
          lastStudied: '2 days ago'
        }
      ]
    },
    biology: {
      name: 'Biology',
      color: 'purple',
      totalSets: 7,
      totalCards: 175,
      masteredCards: 105,
      progress: 60,
      accuracy: 85,
      topics: [
        { 
          name: 'Cell Biology', 
          sets: 2, 
          cards: 55, 
          mastered: 48, 
          progress: 87, 
          accuracy: 91,
          weightage: 25,
          priority: 'medium',
          lastStudied: '6 hours ago'
        },
        { 
          name: 'Genetics', 
          sets: 2, 
          cards: 45, 
          mastered: 25, 
          progress: 56, 
          accuracy: 78,
          weightage: 30,
          priority: 'high',
          lastStudied: '1 day ago'
        },
        { 
          name: 'Human Physiology', 
          sets: 2, 
          cards: 50, 
          mastered: 22, 
          progress: 44, 
          accuracy: 82,
          weightage: 30,
          priority: 'critical',
          lastStudied: '3 days ago'
        },
        { 
          name: 'Plant Biology', 
          sets: 1, 
          cards: 25, 
          mastered: 10, 
          progress: 40, 
          accuracy: 89,
          weightage: 15,
          priority: 'medium',
          lastStudied: '1 week ago'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Flashcards Studio
            </h1>
            <p className="text-gray-600 mt-2">Master concepts through spaced repetition and active recall</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/student/flashcards/create')} className="bg-gradient-to-r from-violet-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create New Set
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
              <div className="text-2xl font-bold text-violet-600">{overviewStats.totalSets}</div>
              <div className="text-sm text-gray-600">Sets</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{overviewStats.totalCards}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{overviewStats.masteredCards}</div>
              <div className="text-sm text-gray-600">Mastered</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{overviewStats.averageAccuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{overviewStats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overviewStats.weeklyProgress}</div>
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
          <Card className="bg-gradient-to-r from-violet-500 to-blue-500 border-0 shadow-xl">
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
                            <span className="text-white/70 text-xs">{suggestion.timeEstimate}</span>
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
                        <div className="text-3xl font-bold text-gray-900">{subject.progress}%</div>
                        <div className="text-sm text-gray-600">Overall Progress</div>
                        <Progress value={subject.progress} className="mt-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{subject.masteredCards}</div>
                          <div className="text-xs text-gray-600">Mastered</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{subject.accuracy}%</div>
                          <div className="text-xs text-gray-600">Accuracy</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{subject.totalSets}</div>
                          <div className="text-sm text-gray-600">Card Sets</div>
                        </div>
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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="text-center p-2 bg-blue-50 rounded-lg">
                                <div className="text-sm font-bold text-blue-600">{topic.sets}</div>
                                <div className="text-xs text-blue-600">Sets</div>
                              </div>
                              <div className="text-center p-2 bg-green-50 rounded-lg">
                                <div className="text-sm font-bold text-green-600">{topic.mastered}</div>
                                <div className="text-xs text-green-600">Mastered</div>
                              </div>
                              <div className="text-center p-2 bg-purple-50 rounded-lg">
                                <div className="text-sm font-bold text-purple-600">{topic.accuracy}%</div>
                                <div className="text-xs text-purple-600">Accuracy</div>
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
                                Last studied: {topic.lastStudied}
                              </div>
                              <div className="text-sm text-gray-600">
                                {topic.cards} cards total
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

export default FlashcardsPage;
