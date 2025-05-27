
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BookOpen, Clock, Target, TrendingUp, Play, ChevronRight, Plus } from 'lucide-react';
import OverviewSection from '../OverviewSection';

const FlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const overviewData = {
    type: "Flashcards" as const,
    title: "NEET Flashcards Overview",
    subjects: [
      { name: "Physics", completed: 285, total: 450, progress: 63, efficiency: 78, studyTime: 24 },
      { name: "Chemistry", completed: 340, total: 520, progress: 65, efficiency: 82, studyTime: 28 },
      { name: "Biology", completed: 410, total: 680, progress: 60, efficiency: 75, studyTime: 35 }
    ],
    totalStudyTime: 87,
    overallProgress: 63,
    suggestions: [
      "Focus on Chemistry organic reactions - you're making great progress!",
      "Review Physics thermodynamics concepts to strengthen weak areas",
      "Biology cell structure cards need attention - schedule 20 min today",
      "Consider creating custom cards for NEET previous year questions"
    ]
  };

  const recentFlashcardSets = [
    {
      id: '1',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      cards: 25,
      mastered: 18,
      difficulty: 'Medium',
      lastStudied: '2 hours ago',
      recallAccuracy: 78,
      attempts: 5
    },
    {
      id: '2',
      title: 'Cell Biology Fundamentals',
      subject: 'Biology',
      cards: 30,
      mastered: 22,
      difficulty: 'Easy',
      lastStudied: '1 day ago',
      recallAccuracy: 85,
      attempts: 3
    },
    {
      id: '3',
      title: 'Thermodynamics Concepts',
      subject: 'Physics',
      cards: 20,
      mastered: 12,
      difficulty: 'Hard',
      lastStudied: '3 days ago',
      recallAccuracy: 62,
      attempts: 7
    }
  ];

  const handleStudyFlashcards = (setId?: string) => {
    if (setId) {
      navigate(`/dashboard/student/flashcards/${setId}/interactive`);
    } else {
      navigate('/dashboard/student/flashcards/2/interactive');
    }
  };

  const handleStudySubject = (subject: string) => {
    setActiveTab('all-flashcards');
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection {...overviewData} />
        </TabsContent>

        <TabsContent value="all-flashcards" className="space-y-6 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Flashcards</h1>
              <p className="text-gray-600 dark:text-gray-400">Master concepts with smart spaced repetition</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleStudyFlashcards()}>
                <Play className="mr-2 h-4 w-4" />
                Study Now
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Set
              </Button>
            </div>
          </div>

          {/* Subject Study Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData.subjects.map((subject) => (
              <Card key={subject.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <Badge variant="outline">{subject.progress}% Complete</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>{subject.completed}/{subject.total} Cards</span>
                      <span>{subject.studyTime}h studied</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleStudySubject(subject.name)}
                  >
                    Study {subject.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Flashcard Sets */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Flashcard Sets</CardTitle>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFlashcardSets.map((set) => (
                  <div key={set.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{set.title}</h4>
                        <Badge variant="outline">{set.subject}</Badge>
                        <Badge variant={set.difficulty === 'Easy' ? 'default' : set.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {set.difficulty}
                        </Badge>
                        {set.recallAccuracy && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {set.recallAccuracy}% Accuracy
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{set.cards} cards</span>
                        <span>{set.mastered} mastered</span>
                        <span>Last studied: {set.lastStudied}</span>
                        {set.attempts && (
                          <span>{set.attempts} attempts</span>
                        )}
                      </div>
                      <div className="mt-2">
                        <Progress value={(set.mastered / set.cards) * 100} className="h-1" />
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleStudyFlashcards(set.id)}>
                      <Play className="h-4 w-4 mr-1" />
                      Study
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">1,650</p>
                <p className="text-sm text-gray-600">Total Cards</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">1,035</p>
                <p className="text-sm text-gray-600">Mastered</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">88h</p>
                <p className="text-sm text-gray-600">Study Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-gray-600">Avg Accuracy</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsLandingPage;
