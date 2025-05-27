
import React, { useState, useMemo, useEffect } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, BookOpen, Clock, Target, TrendingUp, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [searchParams] = useSearchParams();
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'upcoming' | 'completed'>('today');

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overview' || tab === 'all-concepts')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const overviewData = {
    type: "Concepts" as const,
    title: "PREPZR Concepts Overview",
    subjects: [
      { name: "Physics", completed: 45, total: 80, progress: 56, efficiency: 78, studyTime: 24 },
      { name: "Chemistry", completed: 52, total: 75, progress: 69, efficiency: 82, studyTime: 28 },
      { name: "Biology", completed: 68, total: 95, progress: 72, efficiency: 75, studyTime: 35 }
    ],
    totalStudyTime: 87,
    overallProgress: 66,
    suggestions: [
      "Focus on Physics mechanics concepts for better understanding",
      "Chemistry organic reactions need more attention and practice", 
      "Biology plant physiology concepts are progressing well",
      "Consider reviewing thermodynamics concepts in Physics"
    ]
  };

  // Get unique subjects from concept cards
  const subjects = useMemo(() => {
    const subjectsSet = new Set(conceptCards.map(card => card.subject));
    return Array.from(subjectsSet);
  }, [conceptCards]);

  // Count concepts per subject and status
  const conceptCounts = useMemo(() => {
    const counts = {
      today: {} as Record<string, number>,
      upcoming: {} as Record<string, number>,
      completed: {} as Record<string, number>
    };

    conceptCards.forEach(card => {
      if (card.completed) {
        counts.completed[card.subject] = (counts.completed[card.subject] || 0) + 1;
      } else if (card.scheduledFor === 'today') {
        counts.today[card.subject] = (counts.today[card.subject] || 0) + 1;
      } else {
        counts.upcoming[card.subject] = (counts.upcoming[card.subject] || 0) + 1;
      }
    });

    return counts;
  }, [conceptCards]);

  // Filter cards based on status, subject, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards;

    // Filter by status
    if (statusFilter === 'today') {
      filtered = filtered.filter(card => card.scheduledFor === 'today' && !card.completed);
    } else if (statusFilter === 'upcoming') {
      filtered = filtered.filter(card => (card.scheduledFor === 'week' || card.scheduledFor === 'month') && !card.completed);
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(card => card.completed);
    }
    
    // Filter by subject
    if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [conceptCards, statusFilter, activeSubject, showAllCards]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  const getStatusCount = (status: 'today' | 'upcoming' | 'completed') => {
    if (status === 'today') {
      return conceptCards.filter(card => card.scheduledFor === 'today' && !card.completed).length;
    } else if (status === 'upcoming') {
      return conceptCards.filter(card => (card.scheduledFor === 'week' || card.scheduledFor === 'month') && !card.completed).length;
    } else {
      return conceptCards.filter(card => card.completed).length;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <ConceptsPageLayout>
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="all-concepts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <Target className="h-4 w-4 mr-2" />
                All Concepts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <OverviewSection {...overviewData} />
            </TabsContent>

            <TabsContent value="all-concepts" className="space-y-6 mt-6">
              {/* Enhanced Status Filter Tabs with Counts */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Study Status
                </h3>
                <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                  <TabsList className="bg-gray-50">
                    <TabsTrigger value="today" className="relative">
                      Today
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                        {getStatusCount('today')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="relative">
                      Upcoming
                      <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-700">
                        {getStatusCount('upcoming')}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="relative">
                      Completed
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                        {getStatusCount('completed')}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Enhanced Subject Tabs with Status Counts */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Filter by Subject
                </h3>
                <SubjectTabs
                  subjects={subjects}
                  activeSubject={activeSubject}
                  onSubjectChange={setActiveSubject}
                  conceptCounts={conceptCounts[statusFilter]}
                />
              </div>

              {/* Enhanced Cards Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {loading ? (
                  Array(6).fill(0).map((_, index) => (
                    <motion.div key={`skeleton-${index}`}>
                      <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl shadow-sm"></div>
                    </motion.div>
                  ))
                ) : filteredCards.length === 0 ? (
                  <div className="col-span-full">
                    <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100">
                      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No concepts found</h3>
                      <p className="text-gray-500">
                        No concept cards found for {activeSubject !== 'all' ? activeSubject : ''} {statusFilter} status
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredCards.map((card) => (
                    <motion.div 
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <ConceptCard 
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        subject={card.subject}
                        difficulty={card.difficulty.toLowerCase() as any}
                        completed={card.completed}
                        progress={card.progress}
                        relatedConcepts={card.relatedConcepts}
                        onView={() => window.location.href = `/dashboard/student/concepts/${card.id}`}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* Enhanced View All Button */}
              {!showAllCards && filteredCards.length === 6 && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllCards(true)}
                    className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-xl shadow-lg"
                  >
                    View All Concepts
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ConceptsPageLayout>
    </div>
  );
};

export default ConceptsPage;
