
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
  const [statusView, setStatusView] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    const subject = searchParams.get('subject');
    
    if (tab && (tab === 'overview' || tab === 'all-concepts')) {
      setActiveTab(tab);
    }
    
    if (subject && tab === 'all-concepts') {
      setActiveSubject(decodeURIComponent(subject));
    }
  }, [searchParams]);

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      const subject = params.get('subject');
      
      if (tab && (tab === 'overview' || tab === 'all-concepts')) {
        setActiveTab(tab);
      }
      
      if (subject && tab === 'all-concepts') {
        setActiveSubject(decodeURIComponent(subject));
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

  // Count concepts per subject and status
  const conceptCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    
    conceptCards.forEach(card => {
      if (!counts[card.subject]) {
        counts[card.subject] = { today: 0, upcoming: 0, completed: 0 };
      }
      
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

  // Filter cards based on status, subject, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards.filter(card => {
      if (statusView === 'completed') {
        return card.completed;
      } else if (statusView === 'today') {
        return !card.completed && card.scheduledFor === 'today';
      } else { // upcoming
        return !card.completed && card.scheduledFor !== 'today';
      }
    });
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [conceptCards, statusView, activeSubject, showAllCards]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    if (value === 'overview') {
      url.searchParams.delete('subject');
    }
    window.history.pushState({}, '', url);
  };

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
    const url = new URL(window.location);
    if (subject === 'all') {
      url.searchParams.delete('subject');
    } else {
      url.searchParams.set('subject', encodeURIComponent(subject));
    }
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
            {/* Status-based Tabs */}
            <Tabs value={statusView} onValueChange={(v) => setStatusView(v as typeof statusView)}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Subject Tabs */}
            <div className="border-b">
              <div className="flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => handleSubjectChange('all')}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeSubject === 'all'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Subjects
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {conceptCards.filter(c => statusView === 'completed' ? c.completed : 
                      statusView === 'today' ? (!c.completed && c.scheduledFor === 'today') :
                      (!c.completed && c.scheduledFor !== 'today')).length}
                  </span>
                </button>
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectChange(subject)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeSubject === subject
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {subject}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {conceptCounts[subject]?.[statusView] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

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
                  <p className="text-gray-500">
                    No {statusView} concept cards found {activeSubject !== 'all' ? `for ${activeSubject}` : ''}
                  </p>
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
            {!showAllCards && filteredCards.length === 6 && (
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
