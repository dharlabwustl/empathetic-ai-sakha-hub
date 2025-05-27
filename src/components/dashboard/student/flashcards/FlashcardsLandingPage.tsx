
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target,
  Lightbulb,
  Play,
  Clock,
  RotateCcw,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlashcardsLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data for NEET subjects
  const subjects = [
    {
      name: 'Physics',
      completed: 156,
      total: 280,
      progress: 56,
      efficiency: 82,
      studyTime: 18,
      color: 'blue'
    },
    {
      name: 'Chemistry', 
      completed: 203,
      total: 340,
      progress: 60,
      efficiency: 88,
      studyTime: 25,
      color: 'green'
    },
    {
      name: 'Biology',
      completed: 178,
      total: 290,
      progress: 61,
      efficiency: 91,
      studyTime: 22,
      color: 'purple'
    }
  ];

  const smartSuggestions = [
    {
      id: '1',
      title: 'Review Weak Chemistry Cards',
      description: 'Focus on organic reactions you marked as difficult. Spaced repetition will strengthen retention.',
      priority: 'high',
      estimatedTime: 20,
      subject: 'Chemistry',
      type: 'weakness-focus'
    },
    {
      id: '2',
      title: 'Physics Formula Drill',
      description: 'Quick practice session for mechanics formulas before your upcoming test.',
      priority: 'medium', 
      estimatedTime: 15,
      subject: 'Physics',
      type: 'exam-prep'
    },
    {
      id: '3',
      title: 'Biology Terminology Quiz',
      description: 'Test your knowledge of biological terms you\'ve been studying this week.',
      priority: 'low',
      estimatedTime: 12,
      subject: 'Biology',
      type: 'practice-test'
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
    navigate(`/dashboard/student/flashcards?subject=${subjectName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Smart Flashcards</h1>
            <p className="text-gray-600 dark:text-gray-400">Memorize and master NEET concepts efficiently</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/student/flashcards/interactive')} className="gap-2">
          <Play className="h-4 w-4" />
          Start Study Session
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
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Lightbulb className="h-6 w-6" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  PREPZR AI Flashcard Recommendations
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
                          Study Now <ChevronRight className="h-3 w-3 ml-1" />
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
              <Card key={subject.name} className="group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-purple-300 bg-gradient-to-br from-white to-purple-50/30" onClick={() => handleStudySubject(subject.name)}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
                      <p className="text-xs text-green-600 font-medium">Accuracy</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                      <p className="text-xl font-bold text-blue-700">{subject.studyTime}h</p>
                      <p className="text-xs text-blue-600 font-medium">Study Time</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-purple-600 transition-colors duration-300" 
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
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{subjects.reduce((acc, s) => acc + s.studyTime, 0)}h</p>
                <p className="text-sm text-gray-600">Practice Time</p>
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
            <p className="text-gray-500">Physics flashcards will be loaded here</p>
          </div>
        </TabsContent>

        <TabsContent value="chemistry">
          <div className="text-center py-8">
            <p className="text-gray-500">Chemistry flashcards will be loaded here</p>
          </div>
        </TabsContent>

        <TabsContent value="biology">
          <div className="text-center py-8">
            <p className="text-gray-500">Biology flashcards will be loaded here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsLandingPage;
