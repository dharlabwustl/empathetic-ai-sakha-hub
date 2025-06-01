
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Brain, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Play,
  Star,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  completed: boolean;
  mastery: number;
  lastStudied?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

const EnhancedConceptsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const subjects = [
    { name: 'Physics', color: '#3b82f6', completed: 45, total: 68, progress: 66 },
    { name: 'Chemistry', color: '#10b981', completed: 38, total: 55, progress: 69 },
    { name: 'Biology', color: '#8b5cf6', completed: 52, total: 73, progress: 71 }
  ];

  const conceptCards: ConceptCard[] = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      chapter: 'Mechanics',
      difficulty: 'medium',
      estimatedTime: 25,
      completed: true,
      mastery: 85,
      lastStudied: '2 days ago',
      priority: 'high',
      tags: ['laws', 'motion', 'force']
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      difficulty: 'hard',
      estimatedTime: 35,
      completed: false,
      mastery: 45,
      priority: 'high',
      tags: ['reactions', 'organic', 'mechanisms']
    },
    {
      id: '3',
      title: 'Cell Division and Mitosis',
      subject: 'Biology',
      chapter: 'Cell Biology',
      difficulty: 'medium',
      estimatedTime: 20,
      completed: true,
      mastery: 92,
      lastStudied: '1 day ago',
      priority: 'medium',
      tags: ['cell', 'division', 'mitosis']
    },
    {
      id: '4',
      title: 'Thermodynamics Laws',
      subject: 'Physics',
      chapter: 'Thermodynamics',
      difficulty: 'hard',
      estimatedTime: 40,
      completed: false,
      mastery: 30,
      priority: 'high',
      tags: ['heat', 'energy', 'laws']
    },
    {
      id: '5',
      title: 'Photosynthesis Process',
      subject: 'Biology',
      chapter: 'Plant Biology',
      difficulty: 'easy',
      estimatedTime: 15,
      completed: true,
      mastery: 88,
      lastStudied: '3 days ago',
      priority: 'low',
      tags: ['plants', 'energy', 'chlorophyll']
    }
  ];

  const filteredConcepts = conceptCards.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || concept.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'completed' && concept.completed) ||
                         (selectedStatus === 'pending' && !concept.completed);
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Concepts</p>
                <p className="text-2xl font-bold text-blue-800">196</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Mastered</p>
                <p className="text-2xl font-bold text-green-800">135</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Mastery</p>
                <p className="text-2xl font-bold text-purple-800">74%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Study Time</p>
                <p className="text-2xl font-bold text-orange-800">45h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  {subject.name}
                </span>
                <Badge variant="outline">{subject.progress}%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{subject.completed}/{subject.total}</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => setActiveTab(subject.name.toLowerCase())}
              >
                <Play className="mr-2 h-4 w-4" />
                Study {subject.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ConceptGrid = ({ concepts }: { concepts: ConceptCard[] }) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {concepts.map((concept) => (
        <Card 
          key={concept.id} 
          className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${getPriorityColor(concept.priority)}`}
          onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <Badge 
                variant="outline" 
                className={getDifficultyColor(concept.difficulty)}
              >
                {concept.difficulty}
              </Badge>
              {concept.completed && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {concept.title}
            </CardTitle>
            <p className="text-sm text-gray-600">{concept.chapter}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{concept.estimatedTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{concept.mastery}%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Mastery</span>
                <span>{concept.mastery}%</span>
              </div>
              <Progress value={concept.mastery} className="h-2" />
            </div>

            {concept.lastStudied && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Last studied {concept.lastStudied}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              {concept.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Concept Cards - PREPZR</title>
        <meta name="description" content="Master NEET concepts with interactive learning cards" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Concept Mastery
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master NEET concepts through structured learning and spaced repetition
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="physics" className="mt-6">
            <ConceptGrid 
              concepts={filteredConcepts.filter(c => c.subject === 'Physics')} 
            />
          </TabsContent>

          <TabsContent value="chemistry" className="mt-6">
            <ConceptGrid 
              concepts={filteredConcepts.filter(c => c.subject === 'Chemistry')} 
            />
          </TabsContent>

          <TabsContent value="biology" className="mt-6">
            <ConceptGrid 
              concepts={filteredConcepts.filter(c => c.subject === 'Biology')} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedConceptsPage;
