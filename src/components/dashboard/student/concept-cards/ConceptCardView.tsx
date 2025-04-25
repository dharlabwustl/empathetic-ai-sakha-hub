
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, BookOpen, Clock, Tag, Book } from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

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
  
  // Filter cards based on props and selected view
  const filteredCards = conceptCards
    .filter(card => !subject || card.subject === subject)
    .filter(card => !chapter || card.chapter === chapter)
    .filter(card => card.scheduledFor === selectedView)
    .slice(0, limit);
  
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
    <div className="space-y-4">
      {title && <h3 className="text-xl font-medium">{title}</h3>}
      
      {!subject && !chapter && (
        <div className="flex items-center space-x-4 mb-4 overflow-x-auto pb-2">
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
      )}
      
      {filteredCards.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No concept cards found for {selectedView === 'today' ? "today" : selectedView === 'week' ? "this week" : "this month"}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => (
            <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
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
            </Link>
          ))}
        </div>
      )}
      
      {showViewAll && filteredCards.length > 0 && (
        <div className="flex justify-center mt-4">
          <Link to="/dashboard/student/concepts/all">
            <Button variant="outline" className="flex items-center gap-2">
              View All Concepts <ArrowRight size={16} />
            </Button>
          </Link>
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
