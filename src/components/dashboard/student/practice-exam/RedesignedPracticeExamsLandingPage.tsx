
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  Brain, 
  Zap, 
  Calendar,
  PlayCircle,
  ChevronRight,
  Star,
  BarChart3,
  Timer,
  CheckCircle2,
  AlertCircle,
  Trophy,
  PieChart,
  Activity
} from "lucide-react";

const RedesignedPracticeExamsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalExams: 24,
    completed: 18,
    averageScore: 78,
    timeSpent: 420, // minutes
    streak: 7,
    rank: 142
  };

  const subjects = [
    {
      name: 'Physics',
      exams: 8,
      completed: 6,
      avgScore: 82,
      weakTopics: ['Optics', 'Modern Physics'],
      strongTopics: ['Mechanics', 'Thermodynamics'],
      progress: 75,
      weightage: 35
    },
    {
      name: 'Chemistry',
      exams: 8,
      completed: 6,
      avgScore: 76,
      weakTopics: ['Organic Chemistry', 'Chemical Bonding'],
      strongTopics: ['Inorganic Chemistry'],
      progress: 70,
      weightage: 35
    },
    {
      name: 'Biology',
      exams: 8,
      completed: 6,
      avgScore: 74,
      weakTopics: ['Genetics', 'Evolution'],
      strongTopics: ['Human Physiology', 'Plant Biology'],
      progress: 65,
      weightage: 30
    }
  ];

  const recentExams = [
    {
      id: '1',
      title: 'NEET Full Mock Test 1',
      subject: 'All Subjects',
      score: 85,
      date: '2024-01-15',
      duration: 180,
      questions: 180,
      status: 'completed'
    },
    {
      id: '2',
      title: 'Physics Chapter Test',
      subject: 'Physics',
      score: null,
      date: '2024-01-16',
      duration: 45,
      questions: 45,
      status: 'pending'
    }
  ];

  const aiSuggestions = [
    {
      type: 'weak_area',
      title: 'Focus on Optics',
      description: 'Your performance in optics is below average. Practice more numerical problems.',
      priority: 'high',
      action: 'Take Optics Practice Test'
    },
    {
      type: 'time_management',
      title: 'Improve Speed',
      description: 'You\'re spending too much time on organic chemistry questions.',
      priority: 'medium',
      action: 'Practice Timed Tests'
    },
    {
      type: 'strength',
      title: 'Build on Mechanics',
      description: 'You\'re strong in mechanics. Try advanced level questions.',
      priority: 'low',
      action: 'Take Advanced Test'
    }
  ];

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewExams = () => {
    navigate('/dashboard/student/practice-exam');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Exams</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalExams}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Score</p>
                <p className="text-2xl font-bold text-purple-900">{stats.averageScore}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Study Streak</p>
                <p className="text-2xl font-bold text-orange-900">{stats.streak} days</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Daily Smart Suggestions
          </CardTitle>
          <CardDescription>
            AI-powered recommendations based on your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  suggestion.priority === 'high' ? 'bg-red-100' :
                  suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  {suggestion.type === 'weak_area' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                   suggestion.type === 'time_management' ? <Timer className="h-4 w-4 text-yellow-600" /> :
                   <Trophy className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Recent Performance</h4>
              <div className="space-y-3">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{exam.title}</p>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                    </div>
                    <div className="text-right">
                      {exam.status === 'completed' ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {exam.score}%
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Study Analytics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-900">{stats.timeSpent}</p>
                  <p className="text-sm text-blue-600">Minutes Studied</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-900">#{stats.rank}</p>
                  <p className="text-sm text-purple-600">Your Rank</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Ready for your next challenge?</h3>
              <p className="text-gray-600">Take a practice exam to improve your score</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleViewExams} variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Exams
              </Button>
              <Button onClick={() => handleStartExam('4')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Mock Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubjectAnalysis = (subject: typeof subjects[0]) => (
    <Card key={subject.name} className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{subject.name}</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {subject.weightage}% weightage
          </Badge>
        </div>
        <CardDescription>
          {subject.completed}/{subject.exams} exams completed • Avg: {subject.avgScore}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-green-700 mb-2">Strong Topics</h5>
            <ul className="space-y-1">
              {subject.strongTopics.map((topic) => (
                <li key={topic} className="text-sm text-gray-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-red-700 mb-2">Weak Topics</h5>
            <ul className="space-y-1">
              {subject.weakTopics.map((topic) => (
                <li key={topic} className="text-sm text-gray-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Button size="sm" variant="outline" className="w-full" onClick={handleViewExams}>
          <PlayCircle className="h-4 w-4 mr-2" />
          Practice {subject.name}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Practice Exams
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Master your preparation with AI-powered practice exams, detailed analytics, and personalized recommendations
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="physics" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Physics
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Chemistry
          </TabsTrigger>
          <TabsTrigger value="biology" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Biology
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="physics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {renderSubjectAnalysis(subjects[0])}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Physics Exam Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chemistry">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {renderSubjectAnalysis(subjects[1])}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chemistry Exam Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="biology">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {renderSubjectAnalysis(subjects[2])}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Biology Exam Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedesignedPracticeExamsLandingPage;
