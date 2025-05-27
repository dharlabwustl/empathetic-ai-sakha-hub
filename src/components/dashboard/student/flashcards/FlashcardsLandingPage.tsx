
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Plus, TrendingUp, Clock, Target, Lightbulb, ArrowRight, Star, BookOpen, Zap } from 'lucide-react';
import { SharedPageLayout } from '../SharedPageLayout';
import FlashcardsView from './FlashcardsView';

// Daily Smart Suggestions Component
const DailySmartSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      title: "Focus on Organic Chemistry Reactions",
      description: "You've struggled with functional groups. Practice named reactions flashcards.",
      priority: "High",
      subject: "Chemistry",
      estimatedTime: "25 min",
      type: "Review",
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 2,
      title: "Newton's Laws Quick Review",
      description: "Strengthen your physics foundation before moving to complex mechanics.",
      priority: "Medium", 
      subject: "Physics",
      estimatedTime: "15 min",
      type: "Drill",
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 3,
      title: "Human Physiology Terminology",
      description: "Master medical terms and system functions with spaced repetition.",
      priority: "Medium",
      subject: "Biology", 
      estimatedTime: "20 min",
      type: "Memorize",
      icon: <Target className="h-4 w-4" />
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Lightbulb className="h-5 w-5" />
          Daily Smart Suggestions - Flashcards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="bg-white/80 backdrop-blur-sm border border-purple-100 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {suggestion.icon}
                    <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.estimatedTime}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.subject}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    Start <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const FlashcardsLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview
  const subjects = [
    { 
      name: 'Physics', 
      completed: 45, 
      total: 80, 
      progress: 56, 
      efficiency: 78, 
      studyTime: 12 
    },
    { 
      name: 'Chemistry', 
      completed: 62, 
      total: 90, 
      progress: 69, 
      efficiency: 85, 
      studyTime: 15 
    },
    { 
      name: 'Biology', 
      completed: 58, 
      total: 75, 
      progress: 77, 
      efficiency: 82, 
      studyTime: 11 
    }
  ];

  const totalStudyTime = 38;
  const overallProgress = 67;
  const suggestions = [
    "Focus on weak areas in Organic Chemistry this week",
    "Review Physics formulas using spaced repetition",
    "Practice Biology diagrams with visual flashcards"
  ];

  return (
    <SharedPageLayout
      title="Flashcards Hub"
      subtitle="Master concepts with intelligent spaced repetition"
    >
      <div className="space-y-6">
        {/* Daily Smart Suggestions */}
        <DailySmartSuggestions />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="all-flashcards" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              All Flashcards
            </TabsTrigger>
            <TabsTrigger value="practice" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Practice Mode
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-300 bg-gradient-to-br from-white to-purple-50/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 font-medium">
                        {subject.progress}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{subject.completed}/{subject.total} flashcards</p>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    <div className="space-y-2">
                      <Progress value={subject.progress} className="h-3 bg-gray-200" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center border border-green-200">
                        <p className="text-xl font-bold text-green-700">{subject.efficiency}%</p>
                        <p className="text-xs text-green-600 font-medium">Retention</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                        <p className="text-xl font-bold text-blue-700">{subject.studyTime}h</p>
                        <p className="text-xs text-blue-600 font-medium">Study Time</p>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-purple-600 transition-colors duration-300" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study {subject.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Lightbulb className="h-5 w-5" />
                  PREPZR AI Study Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.total, 0)}</p>
                  <p className="text-sm text-gray-600">Total Cards</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.completed, 0)}</p>
                  <p className="text-sm text-gray-600">Mastered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{totalStudyTime}h</p>
                  <p className="text-sm text-gray-600">Total Time</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="all-flashcards">
            <FlashcardsView />
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Interactive practice mode coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Detailed analytics and insights coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsLandingPage;
