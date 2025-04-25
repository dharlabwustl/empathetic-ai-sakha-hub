
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ConceptsList from '@/components/dashboard/student/concept-cards/ConceptsList';
import ConceptFilters from '@/components/dashboard/student/concept-cards/ConceptFilters';
import ConceptProgress from '@/components/dashboard/student/concept-cards/ConceptProgress';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubjectFilters } from '@/hooks/useSubjectFilters';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Brain, CalendarDays, BookOpen, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ViewMode = 'all' | 'today' | 'week' | 'month' | 'completed' | 'pending';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const {
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    searchQuery,
    setSearchQuery,
    selectedExamGoal,
    setSelectedExamGoal,
    selectedTopicTag,
    setSelectedTopicTag,
    selectedTimeRange,
    setSelectedTimeRange,
    clearFilters
  } = useSubjectFilters();

  // Extract concept cards based on time periods for different views
  const todayCards = conceptCards.filter(card => card.scheduledFor === 'today');
  const weekCards = conceptCards.filter(card => ['today', 'this-week'].includes(card.scheduledFor || ''));
  const monthCards = conceptCards.filter(card => ['today', 'this-week', 'this-month'].includes(card.scheduledFor || ''));
  const completedCards = conceptCards.filter(card => card.completed);
  const pendingCards = conceptCards.filter(card => !card.completed);

  // Get view mode from URL if possible
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/all')) setViewMode('all');
    else if (path.includes('/today')) setViewMode('today');
    else if (path.includes('/week')) setViewMode('week');
    else if (path.includes('/month')) setViewMode('month');
    else if (path.includes('/completed')) setViewMode('completed');
    else if (path.includes('/pending')) setViewMode('pending');
  }, [location]);

  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
  
  // Calculate completion metrics
  const totalConcepts = conceptCards.length;
  const completedConcepts = conceptCards.filter(card => card.completed).length;
  const completionPercentage = totalConcepts > 0 ? (completedConcepts / totalConcepts) * 100 : 0;
  
  // Get subjects with their completion status
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  const subjectProgress = subjects.map(subject => {
    const subjectCards = conceptCards.filter(card => card.subject === subject);
    const completed = subjectCards.filter(card => card.completed).length;
    const total = subjectCards.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { subject, completed, total, percentage };
  });

  // Function to get the display set of cards based on the selected view
  const getDisplayCards = () => {
    switch (viewMode) {
      case 'today':
        return todayCards;
      case 'week':
        return weekCards;
      case 'month':
        return monthCards;
      case 'completed':
        return completedCards;
      case 'pending':
        return pendingCards;
      case 'all':
      default:
        return conceptCards;
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Concept Cards</h1>
                <p className="text-gray-600 mt-1">
                  Master concepts for your {examGoal} exam preparation
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                <Brain className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium">Exam Goal</p>
                  <p className="text-blue-700 font-semibold">{examGoal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Goal Card - More prominently displayed */}
          <Card className="border-t-4 border-t-blue-500">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-100">
                    <BookOpen className="text-blue-700" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{examGoal}</h3>
                    <p className="text-sm text-gray-600">Your personalized study plan</p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Completion</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{completedConcepts}/{totalConcepts}</p>
                      <Progress value={completionPercentage} className="w-24 h-2" />
                    </div>
                  </div>
                  
                  <Link to="/dashboard/student/today" className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 hover:bg-blue-100 transition-colors">
                    <CalendarDays size={14} />
                    View Today's Plan
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <ConceptProgress conceptCards={conceptCards} />

          {/* Enhanced View Selection Tabs */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Concepts</TabsTrigger>
                <TabsTrigger value="today" className="text-xs sm:text-sm">Today ({todayCards.length})</TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm">This Week ({weekCards.length})</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">This Month ({monthCards.length})</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed ({completedCards.length})</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending ({pendingCards.length})</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={clearFilters}>
                  <RefreshCw size={14} />
                  Reset
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Filter size={14} />
                  Filters
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSubject && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Subject: {selectedSubject}
                  </Badge>
                )}
                {selectedDifficulty && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    Difficulty: {selectedDifficulty}
                  </Badge>
                )}
                {selectedTopicTag && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Tag: {selectedTopicTag}
                  </Badge>
                )}
                {selectedTimeRange && (
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    Time: ≤ {selectedTimeRange} min
                  </Badge>
                )}
                {searchQuery && (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Search: "{searchQuery}"
                  </Badge>
                )}
              </div>

              {/* Enhanced Filters */}
              <ConceptFilters
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedExamGoal={selectedExamGoal}
                setSelectedExamGoal={setSelectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                setSelectedTopicTag={setSelectedTopicTag}
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
                clearFilters={clearFilters}
                conceptCards={conceptCards}
              />
            </div>

            {/* Tab Contents */}
            <TabsContent value="all" className="mt-0">
              <ConceptsList
                conceptCards={conceptCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>

            <TabsContent value="today" className="mt-0">
              <ConceptsList
                conceptCards={todayCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <ConceptsList
                conceptCards={weekCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              <ConceptsList
                conceptCards={monthCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <ConceptsList
                conceptCards={completedCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <ConceptsList
                conceptCards={pendingCards}
                loading={loading}
                selectedSubject={selectedSubject}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                selectedExamGoal={selectedExamGoal}
                selectedTopicTag={selectedTopicTag}
                selectedTimeRange={selectedTimeRange}
              />
            </TabsContent>
          </Tabs>

          {/* Subject Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectProgress.map((item) => (
              <Card key={item.subject} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.subject}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{item.completed}/{item.total}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptsPage;
