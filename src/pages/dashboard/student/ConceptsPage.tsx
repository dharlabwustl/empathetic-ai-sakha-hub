
import React, { useState, useMemo } from 'react';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { SubjectTabs } from '@/components/dashboard/student/concept-cards/SubjectTabs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, BarChart3, Filter, Sparkles, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import CreateConceptDialog from '@/components/dashboard/student/concept-cards/CreateConceptDialog';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Filter cards based on time view, subject, priority filter, and show all state
  const filteredCards = useMemo(() => {
    let filtered = conceptCards.filter(card => card.scheduledFor === timeView);
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    if (priorityFilter) {
      filtered = filtered.filter(card => card.difficulty.toLowerCase() === priorityFilter.toLowerCase());
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [conceptCards, timeView, activeSubject, priorityFilter, showAllCards]);

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

  const handlePriorityFilter = () => {
    // Cycle through priority filters: null -> high -> medium -> low -> null
    if (!priorityFilter) setPriorityFilter('hard');
    else if (priorityFilter === 'hard') setPriorityFilter('medium');
    else if (priorityFilter === 'medium') setPriorityFilter('easy');
    else setPriorityFilter(null);
  };

  const handleCreateConcept = (data: any) => {
    toast({
      title: "Concept Created",
      description: `Your new concept for ${data.subject} has been created successfully.`
    });
    setShowCreateDialog(false);
  };

  const handleViewAll = () => {
    navigate('/dashboard/student/concepts/all');
  };

  const handleAnalytics = () => {
    navigate('/dashboard/student/concepts/analytics');
  };

  return (
    <ConceptsPageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Concept Cards</h1>
          <p className="text-muted-foreground">Master key concepts through interactive learning</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewAll}
            className="flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePriorityFilter}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Prioritize
            {priorityFilter && (
              <Badge variant="secondary" className="ml-1">
                {priorityFilter}
              </Badge>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAnalytics}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Create Concept
          </Button>
        </div>
      </div>

      <div className="space-y-6">
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
                  onView={() => navigate(`/dashboard/student/concepts/${card.id}`)}
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
              View More Concepts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Create Concept Dialog */}
      <CreateConceptDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateConcept}
      />
    </ConceptsPageLayout>
  );
};

export default ConceptsPage;
