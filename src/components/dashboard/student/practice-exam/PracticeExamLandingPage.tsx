
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Plus, TrendingUp, Clock, Target, Lightbulb, ArrowRight, Star, Play, Trophy } from 'lucide-react';
import { SharedPageLayout } from '../SharedPageLayout';

// Daily Smart Suggestions Component
const DailySmartSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      title: "Take Physics Mock Test",
      description: "Your mechanics concepts are strong. Test your speed with a full-length mock.",
      priority: "High",
      subject: "Physics",
      estimatedTime: "3 hours",
      type: "Mock Test",
      icon: <Trophy className="h-4 w-4" />
    },
    {
      id: 2,
      title: "Chemistry Weak Area Practice",
      description: "Focus on Organic Chemistry questions where you scored below 60%.",
      priority: "High",
      subject: "Chemistry",
      estimatedTime: "45 min",
      type: "Topic Test", 
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 3,
      title: "Biology Speed Test",
      description: "Practice answering Biology questions faster to improve time management.",
      priority: "Medium",
      subject: "Biology",
      estimatedTime: "30 min",
      type: "Speed Test",
      icon: <Clock className="h-4 w-4" />
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
    <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Lightbulb className="h-5 w-5" />
          Daily Smart Suggestions - Practice Exams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="bg-white/80 backdrop-blur-sm border border-green-100 hover:shadow-md transition-all cursor-pointer">
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

const PracticeExamLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview
  const subjects = [
    { 
      name: 'Physics', 
      completed: 12, 
      total: 20, 
      progress: 60, 
      efficiency: 75, 
      studyTime: 18 
    },
    { 
      name: 'Chemistry', 
      completed: 15, 
      total: 22, 
      progress: 68, 
      efficiency: 82, 
      studyTime: 22 
    },
    { 
      name: 'Biology', 
      completed: 18, 
      total: 25, 
      progress: 72, 
      efficiency: 78, 
      studyTime: 20 
    }
  ];

  const totalStudyTime = 60;
  const overallProgress = 67;
  const suggestions = [
    "Take a full-length NEET mock test this weekend",
    "Focus on time management in Physics numerical problems",
    "Practice more Chemistry organic reaction questions"
  ];

  return (
    <SharedPageLayout
      title="Practice Exams Hub"
      subtitle="Test your knowledge and perfect your exam strategy"
    >
      <div className="space-y-6">
        {/* Daily Smart Suggestions */}
        <DailySmartSuggestions />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="available-exams" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Available Exams
            </TabsTrigger>
            <TabsTrigger value="mock-tests" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Mock Tests
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
                        {subject.progress}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{subject.completed}/{subject.total} exams completed</p>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    <div className="space-y-2">
                      <Progress value={subject.progress} className="h-3 bg-gray-200" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center border border-green-200">
                        <p className="text-xl font-bold text-green-700">{subject.efficiency}%</p>
                        <p className="text-xs text-green-600 font-medium">Avg Score</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                        <p className="text-xl font-bold text-blue-700">{subject.studyTime}h</p>
                        <p className="text-xs text-blue-600 font-medium">Practice Time</p>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-green-600 transition-colors duration-300" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Practice {subject.name}
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
                  <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.total, 0)}</p>
                  <p className="text-sm text-gray-600">Total Exams</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.completed, 0)}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{totalStudyTime}h</p>
                  <p className="text-sm text-gray-600">Practice Time</p>
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

          <TabsContent value="available-exams">
            <Card>
              <CardHeader>
                <CardTitle>Available Practice Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Practice exam selection coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mock-tests">
            <Card>
              <CardHeader>
                <CardTitle>Full-Length Mock Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Mock test interface coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Detailed performance analytics coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamLandingPage;
