
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Filter, Search } from 'lucide-react';

const ConceptCardsListingPage = () => {
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

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/student/concepts" className="hover:text-blue-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="text-blue-600" />
                All Concept Cards
              </h1>
              <p className="text-gray-500">Browse and filter all available concept cards</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search concepts..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Select onValueChange={(value) => handleFilterChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
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

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timeline</label>
              <Select onValueChange={(value) => handleFilterChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select onValueChange={(value) => handleFilterChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
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
        </Card>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="h-48 animate-pulse" />
            ))
          ) : filteredCards.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No concept cards found</p>
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
    </MainLayout>
  );
};

export default ConceptCardsListingPage;
