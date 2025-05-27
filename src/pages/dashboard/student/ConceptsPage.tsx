
import React, { useState, useMemo, useEffect } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [searchParams] = useSearchParams();
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overview' || tab === 'all-concepts')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const tab = new URLSearchParams(window.location.search).get('tab');
      if (tab && (tab === 'overview' || tab === 'all-concepts')) {
        setActiveTab(tab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const overviewData = {
    type: "Concepts" as const,
    title: "NEET Concepts Overview",
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

  // Count concepts per subject
  const conceptCounts = useMemo(() => {
    return conceptCards.reduce((acc, card) => {
      acc[card.subject] = (acc[card.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [conceptCards]);

  // Filter cards based on time view, subject, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards.filter(card => card.scheduledFor === timeView);
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [conceptCards, timeView, activeSubject, showAllCards]);

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

  return (
    <ConceptsPageLayout>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all-concepts">All Concepts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <OverviewSection {...overviewData} />
          </TabsContent>

          <TabsContent value="all-concepts" className="space-y-6 mt-6">
            {/* Time-based Tabs */}
            <Tabs value={timeView} onValueChange={(v) => setTimeView(v as typeof timeView)}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Subject Tabs */}
            <SubjectTabs
              subjects={subjects}
              activeSubject={activeSubject}
              onSubjectChange={setActiveSubject}
              conceptCounts={conceptCounts}
            />

            {/* Cards Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                Array(6).fill(0).map((_, index) => (
                  <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                    <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                  </motion.div>
                ))
              ) : filteredCards.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No concept cards found for {activeSubject !== 'all' ? activeSubject : ''} {timeView === 'today' ? 'today' : timeView === 'week' ? 'this week' : 'this month'}</p>
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

            {/* View All Button */}
            {!showAllCards && filteredCards.length === 6 && filteredCards.length < conceptCards.filter(card => card.scheduledFor === timeView && (activeSubject === 'all' || card.subject === activeSubject)).length && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAllCards(true)}
                  className="group"
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
