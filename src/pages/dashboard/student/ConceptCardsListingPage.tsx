import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Filter, Brain } from 'lucide-react';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

const ConceptCardsListingPage = () => {
  const navigate = useNavigate();
  const { conceptCards, loading } = useUserStudyPlan();
  
  const [filters, setFilters] = useState({
    subject: '',
    topic: '',
    timeline: 'all',
    difficulty: '',
    status: '',
    priority: '',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredCards = conceptCards.filter(card => {
    if (filters.subject && card.subject !== filters.subject) return false;
    if (filters.topic && card.topic !== filters.topic) return false;
    if (filters.difficulty && card.difficulty !== filters.difficulty) return false;
    if (filters.status) {
      if (filters.status === 'completed' && !card.completed) return false;
      if (filters.status === 'pending' && card.completed) return false;
    }
    if (filters.priority && card.priority !== filters.priority) return false;
    if (filters.search && !card.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const subjects = Array.from(new Set(conceptCards.map(card => card.subject)));
  const topics = Array.from(new Set(conceptCards.map(card => card.topic)));

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard/student/overview')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="text-blue-600" />
                  Concept Cards Library
                </h1>
                <p className="text-gray-500">
                  Explore and master concepts at your own pace
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search concepts..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full"
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select 
                    value={filters.subject} 
                    onValueChange={(value) => handleFilterChange('subject', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Subjects</SelectItem>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Select 
                    value={filters.topic} 
                    onValueChange={(value) => handleFilterChange('topic', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Topics</SelectItem>
                      {topics.map(topic => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={filters.status} 
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select 
                    value={filters.difficulty} 
                    onValueChange={(value) => handleFilterChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={filters.priority} 
                    onValueChange={(value) => handleFilterChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-48 animate-pulse">
                  <CardContent className="p-0 h-full">
                    <div className="bg-gray-200 h-full rounded-md"></div>
                  </CardContent>
                </Card>
              ))
            ) : filteredCards.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No concept cards found matching your filters</p>
              </div>
            ) : (
              filteredCards.map((card) => (
                <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
                  <ConceptCard {...card} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardsListingPage;
