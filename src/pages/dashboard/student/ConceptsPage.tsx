
import React, { useState, useMemo, useEffect } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, Filter, Search, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import { Input } from '@/components/ui/input';

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

  // Get status counts for filter tabs
  const statusCounts = useMemo(() => {
    const counts = { today: 0, upcoming: 0, completed: 0 };
    
    conceptCards.forEach(card => {
      if (activeSubject === 'all' || card.subject === activeSubject) {
        if (card.completed) {
          counts.completed++;
        } else if (card.scheduledFor === 'today') {
          counts.today++;
        } else {
          counts.upcoming++;
        }
      }
    });
    
    return counts;
  }, [conceptCards, activeSubject]);

  // Filter cards based on all criteria
  const filteredCards = useMemo(() => {
    let filtered = conceptCards;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
  }, [conceptCards, statusFilter, activeSubject, showAllCards, searchTerm]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'today': return <Clock className="h-4 w-4" />;
      case 'upcoming': return <BookOpen className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <ConceptsPageLayout>
        <div className="space-y-8">
          {/* Enhanced Header */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Master Concepts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive learning materials designed for deep understanding
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm border border-gray-200/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="all-concepts" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
                All Concepts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-8">
              <OverviewSection {...overviewData} />
            </TabsContent>

            <TabsContent value="all-concepts" className="space-y-8 mt-8">
              {/* Enhanced Search and Filters */}
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search concepts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 border-gray-200/50"
                    />
                  </div>
                  
                  {/* Enhanced Status Filter Tabs */}
                  <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                    <TabsList className="bg-gray-100/80">
                      <TabsTrigger value="today" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Today
                        <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                          {statusCounts.today}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="upcoming" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Upcoming
                        <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-700">
                          {statusCounts.upcoming}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Completed
                        <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                          {statusCounts.completed}
                        </Badge>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Enhanced Subject Tabs */}
                <div className="mt-6">
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
                </div>
              </motion.div>

              {/* Enhanced Cards Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {loading ? (
                  Array(6).fill(0).map((_, index) => (
                    <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                      <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl shadow-lg"></div>
                    </motion.div>
                  ))
                ) : filteredCards.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl max-w-md mx-auto">
                      {getStatusIcon(statusFilter)}
                      <p className="text-gray-500 mt-4 text-lg">
                        No concept cards found for {activeSubject !== 'all' ? activeSubject : ''} {statusFilter} status
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Try adjusting your filters or search terms
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
                        status={card.completed ? 'completed' : (card.scheduledFor === 'today' ? 'in-progress' : 'pending')}
                        onView={() => window.location.href = `/dashboard/student/concepts/${card.id}`}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* Enhanced View All Button */}
              {!showAllCards && filteredCards.length === 6 && (
                <motion.div 
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setShowAllCards(true)}
                    className="group bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300"
                    size="lg"
                  >
                    View All Concepts
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ConceptsPageLayout>
    </div>
  );
};

export default ConceptsPage;
