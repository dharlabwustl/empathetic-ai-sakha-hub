
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Book, Clock, ChevronRight, BookOpen, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ConceptCardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Sample data for concept cards
  const conceptCards = [
    {
      id: 'concept-1',
      title: 'Understanding Newton\'s Laws of Motion',
      subject: 'Physics',
      chapter: 'Mechanics',
      difficulty: 'medium',
      completed: false,
      estimatedTime: 20,
      timeframe: 'today'
    },
    {
      id: 'concept-2',
      title: 'Periodic Table Classification',
      subject: 'Chemistry',
      chapter: 'General Chemistry',
      difficulty: 'easy',
      completed: true,
      estimatedTime: 15,
      timeframe: 'today'
    },
    {
      id: 'concept-3',
      title: 'Integration by Parts',
      subject: 'Math',
      chapter: 'Calculus',
      difficulty: 'hard',
      completed: false,
      estimatedTime: 30,
      timeframe: 'today'
    },
    {
      id: 'concept-4',
      title: 'Cellular Respiration',
      subject: 'Biology',
      chapter: 'Cell Biology',
      difficulty: 'medium',
      completed: false,
      estimatedTime: 25,
      timeframe: 'week'
    },
    {
      id: 'concept-5',
      title: 'World War II Causes',
      subject: 'History',
      chapter: 'Modern History',
      difficulty: 'medium',
      completed: false,
      estimatedTime: 20,
      timeframe: 'month'
    },
    {
      id: 'concept-6',
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      chapter: 'Chemical Bonds',
      difficulty: 'medium',
      completed: false,
      estimatedTime: 22,
      timeframe: 'week'
    }
  ];
  
  // Filter concepts based on selected timeframe
  const filteredConcepts = conceptCards.filter(concept => {
    if (activeTab === 'all') return true;
    return concept.timeframe === activeTab;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Book className="h-5 w-5 mr-2 text-blue-600" />
            Concept Cards
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Master key concepts and strengthen your foundational knowledge
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-white">12 Concepts Today</Badge>
          <Badge variant="outline" className="bg-white">85% Completion Rate</Badge>
        </div>
      </div>
      
      {/* Time Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>🔸 This Week</span>
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>🔸 This Month</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Contents */}
        <TabsContent value="today" className="mt-6">
          <ConceptCardGrid concepts={filteredConcepts} />
        </TabsContent>
        
        <TabsContent value="week" className="mt-6">
          <ConceptCardGrid concepts={filteredConcepts} />
        </TabsContent>
        
        <TabsContent value="month" className="mt-6">
          <ConceptCardGrid concepts={filteredConcepts} />
        </TabsContent>
      </Tabs>
      
      {/* View All Button */}
      <div className="flex justify-end">
        <Link to="/dashboard/student/concepts">
          <Button variant="outline" className="flex items-center gap-2">
            View All Concept Cards
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface ConceptCardGridProps {
  concepts: any[];
}

const ConceptCardGrid: React.FC<ConceptCardGridProps> = ({ concepts }) => {
  if (concepts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardContent>
          <p className="text-muted-foreground">No concept cards available for this time period.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {concepts.map((concept) => (
        <ConceptCard key={concept.id} concept={concept} />
      ))}
    </div>
  );
};

interface ConceptCardProps {
  concept: any;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/dashboard/student/concepts/${concept.id}`}>
        <Card className="h-full border-l-4" style={{ borderLeftColor: getDifficultyColor(concept.difficulty) }}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <Badge variant={concept.completed ? "outline" : "default"} className={concept.completed ? "bg-white" : ""}>
                {concept.completed ? "Completed" : "Pending"}
              </Badge>
              <Badge variant="outline" className={getDifficultyClass(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-200">
              {concept.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-auto pt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Book size={14} />
                <span>{concept.subject}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{concept.chapter}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{concept.estimatedTime} min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};

const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-50 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-50 text-red-700 border-red-200';
    default: return '';
  }
};

export default ConceptCardsSection;
