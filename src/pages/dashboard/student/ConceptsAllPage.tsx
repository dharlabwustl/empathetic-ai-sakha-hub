
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ConceptsList from '@/components/dashboard/student/concept-cards/ConceptsList';
import ConceptFilters from '@/components/dashboard/student/concept-cards/ConceptFilters';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubjectFilters } from '@/hooks/useSubjectFilters';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, CalendarDays, BookOpen, Filter, RefreshCw, Book, ListFilter, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ViewMode = 'all' | 'today' | 'week' | 'month' | 'completed' | 'pending';

const ConceptsAllPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
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
          {/* Header Section with improved design */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <Link to="/dashboard/student/overview" className="inline-flex items-center text-white hover:text-blue-100">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Concept Cards</h1>
                <p className="text-blue-100 mt-2">
                  Master concepts for your {examGoal} exam preparation
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Brain className="text-blue-200" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-100">Exam Goal</p>
                  <p className="text-white font-semibold">{examGoal}</p>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1 text-blue-100">
                <span>Overall Progress</span>
                <span>{completedConcepts}/{totalConcepts} Concepts</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Exam Goal Card - More prominently displayed */}
          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardContent className="p-5">
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
                
                <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Completion</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{completedConcepts}/{totalConcepts}</p>
                      <Progress value={completionPercentage} className="w-24 h-2" />
                    </div>
                  </div>
                  
                  <Link to="/dashboard/student/concepts/today" className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 hover:bg-blue-100 transition-colors">
                    <CalendarDays size={14} />
                    View Today's Plan
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjectProgress.map((item) => (
              <Card key={item.subject} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className={`h-1 ${
                  item.percentage >= 90 ? 'bg-green-500' : 
                  item.percentage >= 60 ? 'bg-blue-500' : 
                  item.percentage >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="text-blue-600" size={16} />
                    <h3 className="font-semibold">{item.subject}</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{item.completed}/{item.total}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {Math.round(item.percentage)}% complete
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced View Selection Tabs */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList className="h-auto p-1 bg-gray-100/80">
                <TabsTrigger value="all" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  All Concepts
                </TabsTrigger>
                <TabsTrigger value="today" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  Today ({todayCards.length})
                </TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  This Week ({weekCards.length})
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  This Month ({monthCards.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  Completed ({completedCards.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white">
                  Pending ({pendingCards.length})
                </TabsTrigger>
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
            
            <Card className="border mb-4 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4 text-blue-700">
                  <ListFilter size={18} />
                  <h3 className="font-medium">Active Filters</h3>
                </div>
                
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
                  
                  {!selectedSubject && !selectedDifficulty && !selectedTopicTag && !selectedTimeRange && !searchQuery && (
                    <p className="text-gray-500 text-sm">No filters applied. Showing all concepts.</p>
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
              </CardContent>
            </Card>

            {/* Tab Contents */}
            <TabsContent value="all" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <BarChart2 className="text-blue-600" size={18} />
                  All Concept Cards ({conceptCards.length})
                </h3>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/student/progress">
                    View Detailed Progress
                  </Link>
                </Button>
              </div>
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

            <TabsContent value="today" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CalendarDays className="text-blue-600" size={18} />
                  Today's Concepts ({todayCards.length})
                </h3>
              </div>
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

            <TabsContent value="week" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CalendarDays className="text-purple-600" size={18} />
                  This Week's Concepts ({weekCards.length})
                </h3>
              </div>
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

            <TabsContent value="month" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CalendarDays className="text-green-600" size={18} />
                  This Month's Concepts ({monthCards.length})
                </h3>
              </div>
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

            <TabsContent value="completed" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Check className="text-green-600" size={18} />
                  Completed Concepts ({completedCards.length})
                </h3>
              </div>
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

            <TabsContent value="pending" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <AlertCircle className="text-amber-600" size={18} />
                  Pending Concepts ({pendingCards.length})
                </h3>
              </div>
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
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptsAllPage;
