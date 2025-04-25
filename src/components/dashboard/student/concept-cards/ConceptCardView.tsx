
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Brain, BookOpen, Clock, Book, Tag, Star, AlertCircle, CheckCircle 
} from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{title}</h3>
          {!subject && !chapter && (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Brain size={16} />
                Voice Mode
              </Button>
            </div>
          )}
        </div>
      )}
      
      <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as 'today' | 'week' | 'month')}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="today" className="flex items-center">
            <Clock size={14} className="mr-1" />
            Today
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center">
            <CheckCircle size={14} className="mr-1" />
            This Week
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            This Month
          </TabsTrigger>
        </TabsList>
        
        {['today', 'week', 'month'].map((tab) => (
          <TabsContent key={tab} value={tab} className="pt-4">
            {filteredCards.length === 0 ? (
              <Card className="bg-gray-50">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No concept cards scheduled for {tab === 'today' ? "today" : tab === 'week' ? "this week" : "this month"}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card) => (
                  <Link 
                    key={card.id} 
                    to={`/dashboard/student/concepts/${card.id}`}
                    className="block transition-transform hover:scale-[1.02]"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden group border-l-4" 
                          style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={card.completed ? "outline" : "default"} className="mb-2">
                            {card.completed ? "Completed" : "Pending"}
                          </Badge>
                          <div className="flex gap-1">
                            <Badge variant="outline" className={getDifficultyClass(card.difficulty)}>
                              {card.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <Star size={10} className="mr-1" />
                              High
                            </Badge>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                          {card.title}
                        </h3>
                        
                        <div className="mt-auto pt-2 space-y-1.5 text-sm text-gray-500">
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
                          
                          <div className="flex items-center gap-1">
                            <Tag size={14} />
                            <div className="flex flex-wrap gap-1">
                              {card.tags && card.tags.map((tag, i) => (
                                <span key={i} className="bg-gray-100 px-1.5 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              <AlertCircle size={10} className="mr-1" />
                              Flashcards
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              <CheckCircle size={10} className="mr-1" />
                              Test Ready
                            </Badge>
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
                <Link to="/dashboard/student/concepts/all" className="inline-flex">
                  <Button variant="outline" className="flex items-center gap-2">
                    View All Concepts <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

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
