
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, Clock, Target, TrendingUp, Play, ChevronRight, Brain, Star, ChevronDown, BarChart3, Zap, Award, Calendar, Plus } from 'lucide-react';

const EnhancedFlashcardsView = () => {
  const navigate = useNavigate();
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  // Overall flashcard stats
  const overallStats = {
    totalDecks: 45,
    totalCards: 1250,
    masteredCards: 890,
    weeklyProgress: 78,
    studyStreak: 15,
    averageAccuracy: 85,
    timeSpent: '18h 45m'
  };

  // Daily AI suggestions for flashcards
  const aiSuggestions = [
    "Review Physics Mechanics cards - due for spaced repetition",
    "Chemistry Organic reactions showing 68% accuracy - needs focus",
    "Biology Genetics flashcards ready for advanced difficulty",
    "Create new cards for weak areas in Thermodynamics"
  ];

  // Subject data for flashcards
  const subjectData = [
    {
      subject: 'Physics',
      totalDecks: 15,
      totalCards: 420,
      masteredCards: 295,
      progress: 70,
      weightage: 33,
      priority: 'High',
      color: 'bg-blue-500',
      topics: [
        {
          id: 'mechanics-flash',
          name: 'Mechanics',
          decks: 5,
          cards: 125,
          mastered: 110,
          progress: 88,
          weightage: 25,
          priority: 'Medium',
          accuracy: 92,
          dueForReview: 8,
          subtopics: [
            { name: 'Laws of Motion', cards: 35, mastered: 33, accuracy: 94, weightage: 8 },
            { name: 'Work & Energy', cards: 30, mastered: 27, accuracy: 90, weightage: 7 },
            { name: 'Rotational Motion', cards: 35, mastered: 30, accuracy: 86, weightage: 6 },
            { name: 'Gravitation', cards: 25, mastered: 20, accuracy: 80, weightage: 4 }
          ]
        },
        {
          id: 'thermodynamics-flash',
          name: 'Thermodynamics',
          decks: 3,
          cards: 85,
          mastered: 60,
          progress: 71,
          weightage: 20,
          priority: 'High',
          accuracy: 75,
          dueForReview: 15,
          subtopics: [
            { name: 'Laws of Thermodynamics', cards: 30, mastered: 24, accuracy: 80, weightage: 8 },
            { name: 'Heat Transfer', cards: 25, mastered: 18, accuracy: 72, weightage: 6 },
            { name: 'Kinetic Theory', cards: 30, mastered: 18, accuracy: 60, weightage: 6 }
          ]
        }
      ]
    },
    {
      subject: 'Chemistry',
      totalDecks: 18,
      totalCards: 485,
      masteredCards: 365,
      progress: 75,
      weightage: 33,
      priority: 'Medium',
      color: 'bg-green-500',
      topics: [
        {
          id: 'organic-flash',
          name: 'Organic Chemistry',
          decks: 8,
          cards: 195,
          mastered: 155,
          progress: 79,
          weightage: 40,
          priority: 'High',
          accuracy: 81,
          dueForReview: 22,
          subtopics: [
            { name: 'Hydrocarbons', cards: 60, mastered: 52, accuracy: 87, weightage: 12 },
            { name: 'Functional Groups', cards: 75, mastered: 58, accuracy: 77, weightage: 15 },
            { name: 'Reactions', cards: 60, mastered: 45, accuracy: 75, weightage: 13 }
          ]
        },
        {
          id: 'inorganic-flash',
          name: 'Inorganic Chemistry',
          decks: 6,
          cards: 145,
          mastered: 108,
          progress: 74,
          weightage: 30,
          priority: 'Medium',
          accuracy: 83,
          dueForReview: 18,
          subtopics: [
            { name: 'Periodic Table', cards: 50, mastered: 42, accuracy: 84, weightage: 10 },
            { name: 'Chemical Bonding', cards: 55, mastered: 38, accuracy: 69, weightage: 12 },
            { name: 'Coordination Compounds', cards: 40, mastered: 28, accuracy: 70, weightage: 8 }
          ]
        }
      ]
    },
    {
      subject: 'Biology',
      totalDecks: 12,
      totalCards: 345,
      masteredCards: 230,
      progress: 67,
      weightage: 34,
      priority: 'Medium',
      color: 'bg-purple-500',
      topics: [
        {
          id: 'cell-biology-flash',
          name: 'Cell Biology',
          decks: 4,
          cards: 120,
          mastered: 110,
          progress: 92,
          weightage: 25,
          priority: 'Low',
          accuracy: 94,
          dueForReview: 5,
          subtopics: [
            { name: 'Cell Structure', cards: 40, mastered: 38, accuracy: 95, weightage: 8 },
            { name: 'Cell Division', cards: 45, mastered: 42, accuracy: 93, weightage: 9 },
            { name: 'Cell Cycle', cards: 35, mastered: 30, accuracy: 86, weightage: 8 }
          ]
        },
        {
          id: 'genetics-flash',
          name: 'Genetics',
          decks: 5,
          cards: 105,
          mastered: 65,
          progress: 62,
          weightage: 30,
          priority: 'High',
          accuracy: 78,
          dueForReview: 28,
          subtopics: [
            { name: 'Mendel\'s Laws', cards: 35, mastered: 28, accuracy: 80, weightage: 10 },
            { name: 'DNA & RNA', cards: 40, mastered: 22, accuracy: 55, weightage: 12 },
            { name: 'Gene Expression', cards: 30, mastered: 15, accuracy: 50, weightage: 8 }
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Smart Flashcards Hub
            </h1>
            <p className="text-gray-600 mt-2">Master concepts with spaced repetition and active recall</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Create New Deck
          </Button>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{overallStats.totalDecks}</div>
              <div className="text-sm text-gray-600">Total Decks</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600">{overallStats.totalCards}</div>
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
              <div className="text-2xl font-bold text-blue-600">{overallStats.weeklyProgress}%</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{overallStats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{overallStats.averageAccuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{overallStats.timeSpent}</div>
              <div className="text-sm text-gray-600">This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Brain className="h-5 w-5" />
              Daily Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-emerald-200 shadow-sm flex items-start gap-2">
                  <Zap className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
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
                      <span>Mastery</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Decks: {subject.totalDecks}</div>
                    <div className="text-gray-600">Cards: {subject.totalCards}</div>
                    <div className="text-gray-600">Weightage: {subject.weightage}%</div>
                    <div className="text-green-600">Mastered: {subject.masteredCards}</div>
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
                    <span>{subject.subject} Flashcards</span>
                    <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                      {subject.priority} Priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">{subject.totalDecks}</div>
                      <div className="text-sm text-emerald-700">Total Decks</div>
                    </div>
                    <div className="text-center p-3 bg-teal-50 rounded-lg">
                      <div className="text-2xl font-bold text-teal-600">{subject.totalCards}</div>
                      <div className="text-sm text-teal-700">Total Cards</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{subject.masteredCards}</div>
                      <div className="text-sm text-green-700">Mastered</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{subject.weightage}%</div>
                      <div className="text-sm text-blue-700">Weightage</div>
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
                              {topic.dueForReview > 0 && (
                                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                                  {topic.dueForReview} due
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-emerald-600 font-medium">{topic.accuracy}% accuracy</span>
                              <span className="text-blue-600 font-medium">{topic.weightage}% weightage</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Mastery Progress</span>
                              <span>{topic.mastered}/{topic.cards} cards</span>
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
                                  <span className="text-xs text-emerald-600">{subtopic.accuracy}% acc</span>
                                  <span className="text-xs text-blue-600">{subtopic.weightage}%</span>
                                  <span className="text-xs text-gray-600">{subtopic.mastered}/{subtopic.cards}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <Play className="h-3 w-3 mr-1" />
                              Study Cards
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Button>
                            <Button size="sm" variant="outline">
                              <Plus className="h-3 w-3 mr-1" />
                              Add Cards
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

export default EnhancedFlashcardsView;
