
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
  Brain, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle2,
  Play,
  Star,
  Calendar,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  cardCount: number;
  completed: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  lastStudied?: string;
  mastery: number;
  streak: number;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

const EnhancedFlashcardsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const subjects = [
    { name: 'Physics', color: '#3b82f6', completed: 125, total: 180, progress: 69, efficiency: 78 },
    { name: 'Chemistry', color: '#10b981', completed: 98, total: 140, progress: 70, efficiency: 82 },
    { name: 'Biology', color: '#8b5cf6', completed: 156, total: 210, progress: 74, efficiency: 85 }
  ];

  const flashcardDecks: FlashcardDeck[] = [
    {
      id: '1',
      title: 'Mechanics Fundamentals',
      subject: 'Physics',
      chapter: 'Mechanics',
      cardCount: 25,
      completed: 18,
      difficulty: 'medium',
      estimatedTime: 30,
      lastStudied: '2 days ago',
      mastery: 72,
      streak: 5,
      priority: 'high',
      tags: ['force', 'motion', 'energy']
    },
    {
      id: '2',
      title: 'Organic Reactions',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      cardCount: 35,
      completed: 12,
      difficulty: 'hard',
      estimatedTime: 45,
      mastery: 45,
      streak: 2,
      priority: 'high',
      tags: ['reactions', 'mechanisms', 'synthesis']
    },
    {
      id: '3',
      title: 'Cell Structure & Function',
      subject: 'Biology',
      chapter: 'Cell Biology',
      cardCount: 20,
      completed: 20,
      difficulty: 'easy',
      estimatedTime: 25,
      lastStudied: '1 day ago',
      mastery: 95,
      streak: 12,
      priority: 'low',
      tags: ['cells', 'organelles', 'functions']
    },
    {
      id: '4',
      title: 'Thermodynamics',
      subject: 'Physics',
      chapter: 'Heat & Energy',
      cardCount: 28,
      completed: 8,
      difficulty: 'hard',
      estimatedTime: 40,
      mastery: 28,
      streak: 1,
      priority: 'high',
      tags: ['heat', 'entropy', 'laws']
    },
    {
      id: '5',
      title: 'Photosynthesis',
      subject: 'Biology',
      chapter: 'Plant Biology',
      cardCount: 15,
      completed: 15,
      difficulty: 'medium',
      estimatedTime: 20,
      lastStudied: '3 days ago',
      mastery: 88,
      streak: 8,
      priority: 'medium',
      tags: ['chlorophyll', 'light', 'carbon']
    }
  ];

  const filteredDecks = flashcardDecks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deck.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deck.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || deck.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || deck.difficulty === selectedDifficulty;
    const isCompleted = deck.completed === deck.cardCount;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'completed' && isCompleted) ||
                         (selectedStatus === 'pending' && !isCompleted);
    
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

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-purple-600';
    if (streak >= 5) return 'text-blue-600';
    if (streak >= 3) return 'text-green-600';
    return 'text-gray-600';
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Decks</p>
                <p className="text-2xl font-bold text-purple-800">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Cards Mastered</p>
                <p className="text-2xl font-bold text-blue-800">379</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Best Streak</p>
                <p className="text-2xl font-bold text-green-800">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Avg Efficiency</p>
                <p className="text-2xl font-bold text-orange-800">82%</p>
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
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Efficiency</span>
                <span className="font-medium">{subject.efficiency}%</span>
              </div>
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => setActiveTab(subject.name.toLowerCase())}
              >
                <Play className="mr-2 h-4 w-4" />
                Study Flashcards
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const FlashcardGrid = ({ decks }: { decks: FlashcardDeck[] }) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => {
        const completionRate = (deck.completed / deck.cardCount) * 100;
        const isCompleted = deck.completed === deck.cardCount;

        return (
          <Card 
            key={deck.id} 
            className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${getPriorityColor(deck.priority)}`}
            onClick={() => navigate(`/dashboard/student/flashcards/${deck.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(deck.difficulty)}
                >
                  {deck.difficulty}
                </Badge>
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {deck.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Zap className={`h-4 w-4 ${getStreakColor(deck.streak)}`} />
                      <span className={`text-sm font-medium ${getStreakColor(deck.streak)}`}>
                        {deck.streak}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {deck.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{deck.chapter}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{deck.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{deck.mastery}%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{deck.completed}/{deck.cardCount} cards</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Mastery</span>
                  <span>{deck.mastery}%</span>
                </div>
                <Progress value={deck.mastery} className="h-2" />
              </div>

              {deck.lastStudied && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Last studied {deck.lastStudied}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {deck.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/student/flashcards/${deck.id}`);
                  }}
                >
                  <Play className="mr-1 h-3 w-3" />
                  Study
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle review action
                  }}
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="Master NEET concepts with intelligent flashcards" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Flashcards
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Accelerate learning with spaced repetition and adaptive difficulty
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search flashcard decks..."
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
                  <SelectItem value="pending">In Progress</SelectItem>
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
            <FlashcardGrid 
              decks={filteredDecks.filter(d => d.subject === 'Physics')} 
            />
          </TabsContent>

          <TabsContent value="chemistry" className="mt-6">
            <FlashcardGrid 
              decks={filteredDecks.filter(d => d.subject === 'Chemistry')} 
            />
          </TabsContent>

          <TabsContent value="biology" className="mt-6">
            <FlashcardGrid 
              decks={filteredDecks.filter(d => d.subject === 'Biology')} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedFlashcardsPage;
