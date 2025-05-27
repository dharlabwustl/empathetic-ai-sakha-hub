
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, BookOpen, Clock, Target, TrendingUp, Play, ChevronRight } from 'lucide-react';

const FlashcardsLandingPage = () => {
  // Mock data for NEET subjects
  const subjectProgress = [
    {
      subject: 'Physics',
      totalCards: 450,
      masteredCards: 285,
      reviewCards: 65,
      newCards: 100,
      studyTime: '24h 30m',
      efficiency: 78,
      color: 'bg-blue-500'
    },
    {
      subject: 'Chemistry', 
      totalCards: 520,
      masteredCards: 340,
      reviewCards: 80,
      newCards: 100,
      studyTime: '28h 15m',
      efficiency: 82,
      color: 'bg-green-500'
    },
    {
      subject: 'Biology',
      totalCards: 680,
      masteredCards: 410,
      reviewCards: 120,
      newCards: 150,
      studyTime: '35h 45m',
      efficiency: 75,
      color: 'bg-purple-500'
    }
  ];

  const recentFlashcardSets = [
    {
      id: '1',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      cards: 25,
      mastered: 18,
      difficulty: 'Medium',
      lastStudied: '2 hours ago'
    },
    {
      id: '2',
      title: 'Cell Biology Fundamentals',
      subject: 'Biology',
      cards: 30,
      mastered: 22,
      difficulty: 'Easy',
      lastStudied: '1 day ago'
    },
    {
      id: '3',
      title: 'Thermodynamics Concepts',
      subject: 'Physics',
      cards: 20,
      mastered: 12,
      difficulty: 'Hard',
      lastStudied: '3 days ago'
    }
  ];

  const aiSuggestions = [
    "Focus on Chemistry organic reactions - you're making great progress!",
    "Review Physics thermodynamics concepts to strengthen weak areas",
    "Biology cell structure cards need attention - schedule 20 min today",
    "Consider creating custom cards for NEET previous year questions"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400">Master concepts with smart spaced repetition</p>
        </div>
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Create New Set
        </Button>
      </div>

      {/* NEET Subject Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjectProgress.map((subject) => (
          <Card key={subject.subject} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.subject}</CardTitle>
                <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((subject.masteredCards / subject.totalCards) * 100)}%</span>
                </div>
                <Progress value={(subject.masteredCards / subject.totalCards) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-50 rounded">
                  <p className="text-lg font-bold text-green-700">{subject.masteredCards}</p>
                  <p className="text-xs text-green-600">Mastered</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded">
                  <p className="text-lg font-bold text-yellow-700">{subject.reviewCards}</p>
                  <p className="text-xs text-yellow-600">Review</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p className="text-lg font-bold text-blue-700">{subject.newCards}</p>
                  <p className="text-xs text-blue-600">New</p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{subject.studyTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{subject.efficiency}% efficiency</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Study {subject.subject}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Brain className="h-5 w-5" />
            AI Study Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{set.cards} cards</span>
                    <span>{set.mastered} mastered</span>
                    <span>Last studied: {set.lastStudied}</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={(set.mastered / set.cards) * 100} className="h-1" />
                  </div>
                </div>
                <Button size="sm">
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
            <p className="text-sm text-gray-600">Avg Efficiency</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardsLandingPage;
