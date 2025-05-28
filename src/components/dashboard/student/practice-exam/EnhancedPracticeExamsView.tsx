
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FileText, Clock, Target, TrendingUp, Play, ChevronRight, Brain, Star, ChevronDown, BarChart3, Zap, Award, Calendar, Plus, CheckCircle } from 'lucide-react';

const EnhancedPracticeExamsView = () => {
  const navigate = useNavigate();
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  // Overall exam stats
  const overallStats = {
    totalExams: 32,
    completedExams: 18,
    pendingExams: 14,
    weeklyProgress: 82,
    studyStreak: 9,
    averageScore: 78,
    timeSpent: '45h 20m'
  };

  // Daily AI suggestions for practice exams
  const aiSuggestions = [
    "Take Physics Mock Test 5 - your mechanics score improved to 85%",
    "Chemistry Organic section needs more practice - attempt topic test",
    "Biology performance is consistent - ready for full length test",
    "Focus on time management - average 1.8 min/question in last test"
  ];

  // Subject data for practice exams
  const subjectData = [
    {
      subject: 'Physics',
      totalExams: 12,
      completedExams: 7,
      pendingExams: 5,
      progress: 72,
      weightage: 33,
      priority: 'High',
      color: 'bg-blue-500',
      averageScore: 75,
      bestScore: 89,
      topics: [
        {
          id: 'mechanics-exam',
          name: 'Mechanics',
          exams: 4,
          completed: 3,
          progress: 75,
          weightage: 25,
          priority: 'Medium',
          averageScore: 82,
          bestScore: 89,
          timeSpent: '8h 30m',
          subtopics: [
            { name: 'Laws of Motion', exams: 2, avgScore: 85, bestScore: 92, weightage: 8 },
            { name: 'Work & Energy', exams: 1, avgScore: 78, bestScore: 78, weightage: 7 },
            { name: 'Rotational Motion', exams: 1, avgScore: 82, bestScore: 82, weightage: 6 },
            { name: 'Gravitation', exams: 0, avgScore: 0, bestScore: 0, weightage: 4 }
          ]
        },
        {
          id: 'thermodynamics-exam',
          name: 'Thermodynamics',
          exams: 3,
          completed: 2,
          progress: 67,
          weightage: 20,
          priority: 'High',
          averageScore: 68,
          bestScore: 74,
          timeSpent: '5h 45m',
          subtopics: [
            { name: 'Laws of Thermodynamics', exams: 1, avgScore: 72, bestScore: 72, weightage: 8 },
            { name: 'Heat Transfer', exams: 1, avgScore: 64, bestScore: 64, weightage: 6 },
            { name: 'Kinetic Theory', exams: 0, avgScore: 0, bestScore: 0, weightage: 6 }
          ]
        }
      ]
    },
    {
      subject: 'Chemistry',
      totalExams: 10,
      completedExams: 6,
      pendingExams: 4,
      progress: 78,
      weightage: 33,
      priority: 'Medium',
      color: 'bg-green-500',
      averageScore: 81,
      bestScore: 92,
      topics: [
        {
          id: 'organic-exam',
          name: 'Organic Chemistry',
          exams: 4,
          completed: 3,
          progress: 75,
          weightage: 40,
          priority: 'High',
          averageScore: 79,
          bestScore: 88,
          timeSpent: '9h 15m',
          subtopics: [
            { name: 'Hydrocarbons', exams: 2, avgScore: 85, bestScore: 90, weightage: 12 },
            { name: 'Functional Groups', exams: 2, avgScore: 76, bestScore: 82, weightage: 15 },
            { name: 'Reactions', exams: 1, avgScore: 74, bestScore: 74, weightage: 13 }
          ]
        },
        {
          id: 'inorganic-exam',
          name: 'Inorganic Chemistry',
          exams: 3,
          completed: 2,
          progress: 67,
          weightage: 30,
          priority: 'Medium',
          averageScore: 83,
          bestScore: 89,
          timeSpent: '6h 20m',
          subtopics: [
            { name: 'Periodic Table', exams: 1, avgScore: 88, bestScore: 88, weightage: 10 },
            { name: 'Chemical Bonding', exams: 1, avgScore: 78, bestScore: 78, weightage: 12 },
            { name: 'Coordination Compounds', exams: 0, avgScore: 0, bestScore: 0, weightage: 8 }
          ]
        }
      ]
    },
    {
      subject: 'Biology',
      totalExams: 10,
      completedExams: 5,
      pendingExams: 5,
      progress: 65,
      weightage: 34,
      priority: 'Medium',
      color: 'bg-purple-500',
      averageScore: 76,
      bestScore: 86,
      topics: [
        {
          id: 'cell-biology-exam',
          name: 'Cell Biology',
          exams: 3,
          completed: 3,
          progress: 100,
          weightage: 25,
          priority: 'Low',
          averageScore: 84,
          bestScore: 89,
          timeSpent: '7h 10m',
          subtopics: [
            { name: 'Cell Structure', exams: 1, avgScore: 86, bestScore: 86, weightage: 8 },
            { name: 'Cell Division', exams: 1, avgScore: 82, bestScore: 82, weightage: 9 },
            { name: 'Cell Cycle', exams: 1, avgScore: 84, bestScore: 84, weightage: 8 }
          ]
        },
        {
          id: 'genetics-exam',
          name: 'Genetics',
          exams: 4,
          completed: 2,
          progress: 50,
          weightage: 30,
          priority: 'High',
          averageScore: 68,
          bestScore: 75,
          timeSpent: '5h 30m',
          subtopics: [
            { name: 'Mendel\'s Laws', exams: 1, avgScore: 72, bestScore: 72, weightage: 10 },
            { name: 'DNA & RNA', exams: 1, avgScore: 64, bestScore: 64, weightage: 12 },
            { name: 'Gene Expression', exams: 0, avgScore: 0, bestScore: 0, weightage: 8 }
          ]
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Practice Exams Hub
            </h1>
            <p className="text-gray-600 mt-2">Master exam strategy with comprehensive practice tests</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Exam
          </Button>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{overallStats.totalExams}</div>
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
              <div className="text-2xl font-bold text-blue-600">{overallStats.pendingExams}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.weeklyProgress}%</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{overallStats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{overallStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600">{overallStats.timeSpent}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Brain className="h-5 w-5" />
              Daily Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-orange-200 shadow-sm flex items-start gap-2">
                  <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjectData.map((subject) => (
                <div key={subject.subject} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{subject.subject}</h4>
                    <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                      {subject.priority} Priority
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Total: {subject.totalExams}</div>
                    <div className="text-green-600">Done: {subject.completedExams}</div>
                    <div className="text-blue-600">Avg: {subject.averageScore}%</div>
                    <div className="text-purple-600">Best: {subject.bestScore}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Tabs */}
        <Tabs defaultValue="Physics" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            {subjectData.map((subject) => (
              <TabsTrigger key={subject.subject} value={subject.subject} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                {subject.subject}
              </TabsTrigger>
            ))}
          </TabsList>

          {subjectData.map((subject) => (
            <TabsContent key={subject.subject} value={subject.subject} className="space-y-6">
              {/* Subject Overview */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{subject.subject} Practice Exams</span>
                    <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                      {subject.priority} Priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{subject.totalExams}</div>
                      <div className="text-sm text-orange-700">Total Exams</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{subject.completedExams}</div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{subject.averageScore}%</div>
                      <div className="text-sm text-blue-700">Average Score</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{subject.weightage}%</div>
                      <div className="text-sm text-purple-700">Weightage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Topic-wise Breakdown */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Topic-wise Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subject.topics.map((topic) => (
                    <Collapsible key={topic.id}>
                      <CollapsibleTrigger 
                        className="w-full"
                        onClick={() => toggleTopic(topic.id)}
                      >
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <ChevronDown className={`h-4 w-4 transition-transform ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`} />
                              <h4 className="font-semibold">{topic.name}</h4>
                              <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                                {topic.priority}
                              </Badge>
                              {topic.completed === topic.exams && (
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Complete
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-orange-600 font-medium">{topic.averageScore}% avg</span>
                              <span className="text-green-600 font-medium">{topic.bestScore}% best</span>
                              <span className="text-blue-600 font-medium">{topic.weightage}% weightage</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Completion Progress</span>
                              <span>{topic.completed}/{topic.exams} exams</span>
                            </div>
                            <Progress value={topic.progress} className="h-2" />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-8 pr-4 pb-4">
                          <div className="space-y-2">
                            {topic.subtopics.map((subtopic, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm font-medium">{subtopic.name}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-orange-600">{subtopic.avgScore}% avg</span>
                                  <span className="text-xs text-green-600">{subtopic.bestScore}% best</span>
                                  <span className="text-xs text-blue-600">{subtopic.weightage}%</span>
                                  <span className="text-xs text-gray-600">{subtopic.exams} exams</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Play className="h-3 w-3 mr-1" />
                              Take Exam
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Button>
                            <Button size="sm" variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {topic.timeSpent}
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedPracticeExamsView;
