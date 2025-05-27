
import React, { useState, useMemo, useEffect } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, Search, Filter, BookOpen, Clock, Target } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [searchParams] = useSearchParams();
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [searchTerm, setSearchTerm] = useState('');

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
    const counts: Record<string, { today: number; upcoming: number; completed: number; total: number }> = {};
    
    conceptCards.forEach(card => {
      if (!counts[card.subject]) {
        counts[card.subject] = { today: 0, upcoming: 0, completed: 0, total: 0 };
      }
      
      counts[card.subject].total++;
      
      if (card.completed) {
        counts[card.subject].completed++;
      } else if (card.scheduledFor === 'today') {
        counts[card.subject].today++;
      } else {
        counts[card.subject].upcoming++;
      }
    });
    
    return counts;
  }, [conceptCards]);

  // Filter cards based on status, subject, search term, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter === 'today') {
      filtered = filtered.filter(card => card.scheduledFor === 'today');
    } else if (statusFilter === 'upcoming') {
      filtered = filtered.filter(card => card.scheduledFor === 'week' || card.scheduledFor === 'month');
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
  }, [conceptCards, statusFilter, activeSubject, showAllCards, searchTerm]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  const getStatusCounts = () => {
    const totalCounts = { today: 0, upcoming: 0, completed: 0 };
    
    Object.values(conceptCounts).forEach(counts => {
      totalCounts.today += counts.today;
      totalCounts.upcoming += counts.upcoming;
      totalCounts.completed += counts.completed;
    });
    
    return totalCounts;
  };

  const statusCounts = getStatusCounts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ConceptsPageLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Concept Mastery Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your learning progress across all subjects
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
              <Target className="h-3 w-3 mr-1" />
              {conceptCards.filter(c => c.completed).length}/{conceptCards.length} Completed
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="overview" className="rounded-md font-medium">Overview</TabsTrigger>
            <TabsTrigger value="all-concepts" className="rounded-md font-medium">All Concepts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <OverviewSection {...overviewData} />
          </TabsContent>

          <TabsContent value="all-concepts" className="space-y-6 mt-6">
            {/* Enhanced Search and Filters */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search concepts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Filters Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Status Filter Tabs */}
            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <TabsList className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-1 rounded-lg shadow-sm">
                <TabsTrigger value="today" className="relative">
                  <Clock className="h-4 w-4 mr-2" />
                  Today
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                    {statusCounts.today}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="relative">
                  <Target className="h-4 w-4 mr-2" />
                  Upcoming
                  <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
                    {statusCounts.upcoming}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="relative">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Completed
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                    {statusCounts.completed}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Enhanced Subject Tabs */}
            <SubjectTabs
              subjects={subjects}
              activeSubject={activeSubject}
              onSubjectChange={setActiveSubject}
              conceptCounts={Object.fromEntries(
                Object.entries(conceptCounts).map(([subject, counts]) => [
                  subject, 
                  counts[statusFilter]
                ])
              )}
            />

            {/* Enhanced Cards Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                Array(6).fill(0).map((_, index) => (
                  <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                    <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl shadow-sm"></div>
                  </motion.div>
                ))
              ) : filteredCards.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      No concept cards found
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {searchTerm ? 'Try adjusting your search terms' : `No ${statusFilter} concepts for ${activeSubject !== 'all' ? activeSubject : 'selected filters'}`}
                    </p>
                  </div>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <motion.div key={card.id} variants={itemVariants}>
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
                  className="group px-6 py-3 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200"
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
  );
};

export default ConceptsPage;
