
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Filter, Search, Clock, BookOpen, Bookmark, Bell, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const FlashcardsListingPage = () => {
  const [selectedTab, setSelectedTab] = useState<'today' | 'week' | 'month'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    topic: '',
    status: '',
    difficulty: ''
  });

  const flashcardSets = [
    {
      id: 'f1',
      title: 'Physics: Mechanics Quick Recap',
      cardsCount: 45,
      mastery: 72,
      subject: 'Physics',
      topic: 'Mechanics',
      linkedConcept: 'Newtons Laws of Motion',
      status: 'In Progress',
      isBookmarked: true,
      hasReminder: false,
      difficulty: 'medium',
      lastPracticed: '2 days ago'
    },
    {
      id: 'f2',
      title: 'Organic Chemistry Basics Review',
      cardsCount: 30,
      mastery: 58,
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      linkedConcept: 'Functional Groups',
      status: 'Not Started',
      isBookmarked: false,
      hasReminder: true,
      difficulty: 'hard',
      lastPracticed: 'never'
    },
    {
      id: 'f3',
      title: 'Calculus Derivatives Mastery',
      cardsCount: 25,
      mastery: 86,
      subject: 'Mathematics',
      topic: 'Calculus',
      linkedConcept: 'Limits and Derivatives',
      status: 'Completed',
      isBookmarked: true,
      hasReminder: false,
      difficulty: 'medium',
      lastPracticed: '1 week ago'
    },
    {
      id: 'f4',
      title: 'Modern Physics Fundamentals',
      cardsCount: 32,
      mastery: 45,
      subject: 'Physics',
      topic: 'Modern Physics',
      linkedConcept: 'Quantum Mechanics',
      status: 'In Progress',
      isBookmarked: false,
      hasReminder: true,
      difficulty: 'hard',
      lastPracticed: '3 days ago'
    },
    {
      id: 'f5',
      title: 'Algebra Essentials',
      cardsCount: 40,
      mastery: 92,
      subject: 'Mathematics',
      topic: 'Algebra',
      linkedConcept: 'Quadratic Equations',
      status: 'Completed',
      isBookmarked: true,
      hasReminder: false,
      difficulty: 'easy',
      lastPracticed: '5 days ago'
    },
    {
      id: 'f6',
      title: 'Inorganic Chemistry Reactions',
      cardsCount: 50,
      mastery: 34,
      subject: 'Chemistry',
      topic: 'Inorganic',
      linkedConcept: 'Periodic Table',
      status: 'In Progress',
      isBookmarked: false,
      hasReminder: false,
      difficulty: 'medium',
      lastPracticed: 'yesterday'
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredFlashcards = flashcardSets.filter(set => {
    if (filters.subject && set.subject !== filters.subject) return false;
    if (filters.topic && set.topic !== filters.topic) return false;
    if (filters.status && set.status !== filters.status) return false;
    if (filters.difficulty && set.difficulty !== filters.difficulty) return false;
    if (searchQuery && !set.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !set.subject.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !set.topic.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !set.linkedConcept.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter based on selected tab
    if (selectedTab === 'today' && set.lastPracticed !== 'yesterday' && set.lastPracticed !== 'never') return false;
    if (selectedTab === 'week' && set.lastPracticed === 'never') return false;
    
    return true;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'default';
      case 'Not Started':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/student/flashcards" className="hover:text-blue-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="text-blue-600" />
                All Flashcard Sets
              </h1>
              <p className="text-gray-500">Browse and study all available flashcard sets</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search flashcards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Select onValueChange={(value) => handleFilterChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <Select onValueChange={(value) => handleFilterChange('topic', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Topics</SelectItem>
                  <SelectItem value="Mechanics">Mechanics</SelectItem>
                  <SelectItem value="Organic Chemistry">Organic Chemistry</SelectItem>
                  <SelectItem value="Calculus">Calculus</SelectItem>
                  <SelectItem value="Modern Physics">Modern Physics</SelectItem>
                  <SelectItem value="Algebra">Algebra</SelectItem>
                  <SelectItem value="Inorganic">Inorganic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <Select onValueChange={(value) => handleFilterChange('difficulty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => {
                setSearchQuery('');
                setFilters({
                  subject: '',
                  topic: '',
                  status: '',
                  difficulty: ''
                });
              }}>
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Time-Based Tabs */}
        <Tabs value={selectedTab} onValueChange={(val) => setSelectedTab(val as 'today' | 'week' | 'month')}>
          <TabsList className="mb-6">
            <TabsTrigger value="today" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Today
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> This Week
            </TabsTrigger>
            <TabsTrigger value="month" className="flex items-center gap-1">
              <Brain className="h-4 w-4" /> All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFlashcards.length === 0 ? (
                <div className="col-span-full p-8 text-center bg-gray-50 rounded-lg border">
                  <Brain className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">No flashcard sets match your filters</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      subject: '',
                      topic: '',
                      status: '',
                      difficulty: ''
                    });
                  }}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                filteredFlashcards.map((set) => (
                  <Link key={set.id} to={`/dashboard/student/flashcards/${set.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{set.subject}</Badge>
                          {set.isBookmarked && <Bookmark size={16} className="text-blue-600 fill-blue-600" />}
                        </div>
                        <CardTitle className="text-lg">{set.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-3">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200 flex items-center">
                            <BookOpen size={10} className="mr-1" /> {set.topic}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-violet-50 text-violet-700 border-violet-200 flex items-center">
                            <Tag size={10} className="mr-1" /> {set.linkedConcept}
                          </Badge>
                          <Badge variant={getStatusBadgeVariant(set.status)} className="text-xs flex items-center">
                            {set.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center justify-between mb-1">
                            <span>{set.cardsCount} cards</span>
                            <span>{set.mastery}% mastery</span>
                          </div>
                          <Progress value={set.mastery} className="h-1.5" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {set.hasReminder && <Bell size={14} className="text-amber-600" />}
                          </div>
                          <span>Last practiced: {set.lastPracticed}</span>
                        </div>

                        <Button className="w-full">Study Now</Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FlashcardsListingPage;
