
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  TrendingUp, 
  Target,
  Lightbulb,
  Play,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PracticeExamLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data for NEET subjects
  const subjects = [
    {
      name: 'Physics',
      completed: 12,
      total: 25,
      progress: 48,
      averageScore: 76,
      studyTime: 8,
      color: 'blue'
    },
    {
      name: 'Chemistry', 
      completed: 18,
      total: 30,
      progress: 60,
      averageScore: 82,
      studyTime: 12,
      color: 'green'
    },
    {
      name: 'Biology',
      completed: 15,
      total: 28,
      progress: 54,
      averageScore: 88,
      studyTime: 10,
      color: 'purple'
    }
  ];

  const smartSuggestions = [
    {
      id: '1',
      title: 'Physics Mock Test Required',
      description: 'Take a comprehensive physics test to identify weak areas in mechanics and thermodynamics.',
      priority: 'high',
      estimatedTime: 90,
      subject: 'Physics',
      type: 'mock-test'
    },
    {
      id: '2',
      title: 'Chemistry Quick Quiz',
      description: 'Short practice quiz on organic chemistry reactions you studied this week.',
      priority: 'medium', 
      estimatedTime: 30,
      subject: 'Chemistry',
      type: 'quick-practice'
    },
    {
      id: '3',
      title: 'Biology Review Test',
      description: 'Test your understanding of cell biology concepts with a focused practice session.',
      priority: 'low',
      estimatedTime: 45,
      subject: 'Biology',
      type: 'topic-review'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-200 bg-green-50 text-green-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const handleStudySubject = (subjectName: string) => {
    navigate(`/dashboard/student/practice-exam?subject=${subjectName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Exams</h1>
            <p className="text-gray-600 dark:text-gray-400">Test your knowledge and track NEET exam readiness</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/student/practice-exam/start')} className="gap-2">
          <Play className="h-4 w-4" />
          Take Practice Test
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="physics">Physics ({subjects[0].completed}/{subjects[0].total})</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry ({subjects[1].completed}/{subjects[1].total})</TabsTrigger>
          <TabsTrigger value="biology">Biology ({subjects[2].completed}/{subjects[2].total})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Smart Daily Suggestions */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Lightbulb className="h-6 w-6" />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                  PREPZR AI Practice Recommendations
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {smartSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className={`p-4 border-2 hover:shadow-md transition-all cursor-pointer ${getPriorityColor(suggestion.priority)}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="text-xs font-medium">
                          {suggestion.subject}
                        </Badge>
                        <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                          {suggestion.priority.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {suggestion.estimatedTime} min
                        </div>
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                          Start Test <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-green-300 bg-gradient-to-br from-white to-green-50/30" onClick={() => handleStudySubject(subject.name)}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
                  <p className="text-sm text-gray-600">{subject.completed}/{subject.total} exams taken</p>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <Progress value={subject.progress} className="h-3 bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                      <p className="text-xl font-bold text-blue-700">{subject.averageScore}%</p>
                      <p className="text-xs text-blue-600 font-medium">Avg Score</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg text-center border border-purple-200">
                      <p className="text-xl font-bold text-purple-700">{subject.studyTime}h</p>
                      <p className="text-xs text-purple-600 font-medium">Practice Time</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-green-600 transition-colors duration-300" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStudySubject(subject.name);
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Practice {subject.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.total, 0)}</p>
                <p className="text-sm text-gray-600">Total Tests</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.completed, 0)}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{Math.round(subjects.reduce((acc, s) => acc + s.averageScore, 0) / subjects.length)}%</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)}%</p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="physics">
          <div className="text-center py-8">
            <p className="text-gray-500">Physics practice exams will be loaded here</p>
          </div>
        </TabsContent>

        <TabsContent value="chemistry">
          <div className="text-center py-8">
            <p className="text-gray-500">Chemistry practice exams will be loaded here</p>
          </div>
        </TabsContent>

        <TabsContent value="biology">
          <div className="text-center py-8">
            <p className="text-gray-500">Biology practice exams will be loaded here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamLandingPage;
