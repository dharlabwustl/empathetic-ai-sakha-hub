import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, BookOpen, Clock, Book, Lightbulb, Zap, Target } from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConceptCardViewProps {
  title?: string;
  subject?: string;
  chapter?: string;
  limit?: number;
  showViewAll?: boolean;
}

const ConceptCardView: React.FC<ConceptCardViewProps> = ({
  title = "Concept Cards",
  subject,
  chapter,
  limit = 6,
  showViewAll = true
}) => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [selectedView, setSelectedView] = useState<'today' | 'week' | 'month'>('today');
  const [activeSubject, setActiveSubject] = useState<string>(subject || 'all');
  const [showAllCards, setShowAllCards] = useState(false);
  const navigate = useNavigate();
  
  // Smart suggestions data
  const smartSuggestions = [
    {
      id: 'sg1',
      title: 'Focus on Physics Today',
      description: 'Your Physics performance needs attention. Start with Laws of Motion.',
      type: 'priority',
      priority: 'high'
    },
    {
      id: 'sg2', 
      title: 'Quick Chemistry Review',
      description: 'Review organic reactions before starting new concepts.',
      type: 'review',
      priority: 'medium'
    },
    {
      id: 'sg3',
      title: 'Biology Weak Areas',
      description: 'Focus on Cell Biology and Genetics for better scores.',
      type: 'improvement',
      priority: 'high'
    },
    {
      id: 'sg4',
      title: 'Daily Revision',
      description: 'Spend 20 minutes reviewing yesterday\'s concepts.',
      type: 'routine',
      priority: 'low'
    }
  ];
  
  // Get unique subjects
  const subjects = React.useMemo(() => {
    const subjectsSet = new Set(conceptCards.map(card => card.subject));
    return Array.from(subjectsSet);
  }, [conceptCards]);
  
  // Filter cards based on props and selected view
  const filteredCards = React.useMemo(() => {
    let filtered = conceptCards.filter(card => {
      // Filter by time period
      if (selectedView === 'today') {
        return card.scheduledFor === 'today';
      } else if (selectedView === 'week') {
        return card.scheduledFor === 'week';
      } else {
        return card.scheduledFor === 'month';
      }
    });
    
    // Filter by subject if specified or if a subject is selected
    if (subject) {
      filtered = filtered.filter(card => card.subject === subject);
    } else if (activeSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === activeSubject);
    }
    
    // Filter by chapter if specified
    if (chapter) {
      filtered = filtered.filter(card => card.chapter === chapter);
    }
    
    // Apply limit unless showAllCards is true
    if (!showAllCards) {
      return filtered.slice(0, limit);
    }
    
    return filtered;
  }, [conceptCards, selectedView, subject, activeSubject, chapter, limit, showAllCards]);
  
  const handleCardClick = (cardId: string) => {
    console.log("ConceptCardView - Navigating to concept detail:", cardId);
    navigate(`/dashboard/student/concepts/${cardId}`);
  };
  
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
        {[...Array(limit)].map((_, i) => (
          <Card key={i} className="h-48">
            <CardContent className="p-0 h-full">
              <div className="bg-gray-200 h-full rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {title && <h3 className="text-xl font-medium">{title}</h3>}
      
      {/* Smart Daily Suggestions - Only show on overview */}
      {title === "Concept Cards" && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="h-5 w-5" />
              PREPZR AI Daily Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {smartSuggestions.slice(0, 4).map((suggestion) => (
                <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2">
                    <div className={`p-1.5 rounded-full ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                      suggestion.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {suggestion.type === 'priority' ? <Target className="h-3 w-3" /> : 
                       suggestion.type === 'review' ? <Brain className="h-3 w-3" /> :
                       suggestion.type === 'improvement' ? <Zap className="h-3 w-3" /> :
                       <Clock className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{suggestion.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        suggestion.priority === 'high' ? 'border-red-200 text-red-700' :
                        suggestion.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-green-200 text-green-700'
                      }`}
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        {/* Time Period Tabs */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <Button 
            variant={selectedView === 'today' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('today')}
            className="rounded-full"
          >
            Today
          </Button>
          <Button 
            variant={selectedView === 'week' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('week')}
            className="rounded-full"
          >
            This Week
          </Button>
          <Button 
            variant={selectedView === 'month' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedView('month')}
            className="rounded-full"
          >
            This Month
          </Button>
        </div>
        
        {/* Only show subject tabs if no specific subject is provided */}
        {!subject && subjects.length > 1 && (
          <Tabs value={activeSubject} onValueChange={setActiveSubject} className="flex-grow">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="all">All Subjects</TabsTrigger>
              {subjects.map(subj => (
                <TabsTrigger key={subj} value={subj}>{subj}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
      
      {filteredCards.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              No concept cards found for {subject || activeSubject !== 'all' ? (subject || activeSubject) + ' ' : ''}
              {selectedView === 'today' ? "today" : selectedView === 'week' ? "this week" : "this month"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => (
            <div key={card.id} onClick={() => handleCardClick(card.id)} className="cursor-pointer">
              <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden group border-l-4" style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={card.completed ? "outline" : "default"} className="mb-2">
                      {card.completed ? "Completed" : "Pending"}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyClass(card.difficulty)}>
                      {card.difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {card.title}
                  </h3>
                  
                  <div className="mt-auto pt-2 space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Book size={14} />
                      <span>{card.subject}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{card.chapter}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{card.estimatedTime} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
      
      {showViewAll && !showAllCards && filteredCards.length >= limit && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowAllCards(true)}
          >
            View All Concepts <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </div>
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

export default ConceptCardView;
