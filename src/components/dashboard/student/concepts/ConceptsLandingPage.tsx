
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Target,
  Lightbulb,
  Play,
  Star,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConceptCardView from './concept-cards/ConceptCardView';

const ConceptsLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data for NEET subjects
  const subjects = [
    {
      name: 'Physics',
      completed: 45,
      total: 120,
      progress: 38,
      efficiency: 85,
      studyTime: 24,
      color: 'blue'
    },
    {
      name: 'Chemistry', 
      completed: 67,
      total: 110,
      progress: 61,
      efficiency: 78,
      studyTime: 32,
      color: 'green'
    },
    {
      name: 'Biology',
      completed: 52,
      total: 95,
      progress: 55,
      efficiency: 92,
      studyTime: 28,
      color: 'purple'
    }
  ];

  const smartSuggestions = [
    {
      id: '1',
      title: 'Focus on Thermodynamics Today',
      description: 'Your Physics performance in energy concepts needs attention. Start with basic thermodynamic laws.',
      priority: 'high',
      estimatedTime: 25,
      subject: 'Physics',
      type: 'concept-gap'
    },
    {
      id: '2',
      title: 'Review Organic Reactions',
      description: 'Quick revision of organic chemistry mechanisms before tackling new concepts.',
      priority: 'medium', 
      estimatedTime: 15,
      subject: 'Chemistry',
      type: 'revision'
    },
    {
      id: '3',
      title: 'Cell Biology Deep Dive',
      description: 'Your mastery in cell structure is strong. Build on this with advanced cell processes.',
      priority: 'low',
      estimatedTime: 30,
      subject: 'Biology',
      type: 'strength-building'
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
    navigate(`/dashboard/student/concepts?subject=${subjectName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Concept Cards</h1>
            <p className="text-gray-600 dark:text-gray-400">Master NEET concepts with interactive learning</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/student/concepts/all')} className="gap-2">
          <Play className="h-4 w-4" />
          Continue Learning
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
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Lightbulb className="h-6 w-6" />
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
                  PREPZR AI Daily Smart Recommendations
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
                          Start Now <ChevronRight className="h-3 w-3 ml-1" />
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
              <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-300 bg-gradient-to-br from-white to-blue-50/30" onClick={() => handleStudySubject(subject.name)}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 font-medium">
                      {subject.progress}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{subject.completed}/{subject.total} concepts</p>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <Progress value={subject.progress} className="h-3 bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center border border-green-200">
                      <p className="text-xl font-bold text-green-700">{subject.efficiency}%</p>
                      <p className="text-xs text-green-600 font-medium">Efficiency</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                      <p className="text-xl font-bold text-blue-700">{subject.studyTime}h</p>
                      <p className="text-xs text-blue-600 font-medium">Study Time</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-blue-600 transition-colors duration-300" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStudySubject(subject.name);
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Study {subject.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.total, 0)}</p>
                <p className="text-sm text-gray-600">Total Concepts</p>
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
                <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.studyTime, 0)}h</p>
                <p className="text-sm text-gray-600">Total Time</p>
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
          <ConceptCardView subject="Physics" title="Physics Concepts" />
        </TabsContent>

        <TabsContent value="chemistry">
          <ConceptCardView subject="Chemistry" title="Chemistry Concepts" />
        </TabsContent>

        <TabsContent value="biology">
          <ConceptCardView subject="Biology" title="Biology Concepts" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptsLandingPage;
