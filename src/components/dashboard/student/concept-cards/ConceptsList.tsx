
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ConceptCard as IConceptCard } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { Badge } from '@/components/ui/badge';

interface ConceptsListProps {
  conceptCards: IConceptCard[];
  loading: boolean;
  selectedSubject: string;
  selectedDifficulty: string;
  searchQuery: string;
  selectedExamGoal?: string;
  selectedTopicTag?: string;
  selectedTimeRange?: number | null;
}

// Extend ConceptCard type from useUserStudyPlan if needed
type ExtendedConceptCard = IConceptCard & {
  examGoal?: string;
  tags?: string[];
  estimatedTime?: number;
};

const ConceptsList: React.FC<ConceptsListProps> = ({
  conceptCards,
  loading,
  selectedSubject,
  selectedDifficulty,
  searchQuery,
  selectedExamGoal,
  selectedTopicTag,
  selectedTimeRange
}) => {
  // Type assertion to support the expected properties
  const typedCards = conceptCards as ExtendedConceptCard[];

  const filteredCards = typedCards
    .filter(card => !selectedSubject || card.subject === selectedSubject)
    .filter(card => !selectedDifficulty || card.difficulty === selectedDifficulty)
    .filter(card => !selectedExamGoal || (card.examGoal && card.examGoal === selectedExamGoal))
    .filter(card => !selectedTopicTag || (card.tags && card.tags.includes(selectedTopicTag)))
    .filter(card => !selectedTimeRange || (card.estimatedTime && card.estimatedTime <= selectedTimeRange))
    .filter(card => !searchQuery || 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.tags && card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse">
            <CardContent className="p-0 h-full">
              <div className="bg-gray-200 h-full rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredCards.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-8 text-center">
          <BookOpen className="mx-auto text-gray-400 mb-3" size={32} />
          <h3 className="text-lg font-medium mb-1">No concepts found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search query
          </p>
          <Button onClick={() => window.location.reload()}>
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCards.map((card) => (
        <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
          <div className="h-full">
            <ConceptCard
              id={card.id}
              title={card.title}
              subject={card.subject}
              difficulty={card.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
              completed={card.completed}
              progress={card.completed ? 100 : 0}
              description={card.chapter}
              isLocked={false}
            />
            
            {/* Tags section added below the concept card */}
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {card.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-gray-100">
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Estimated time badge */}
            {card.estimatedTime && (
              <div className="mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Clock size={10} className="mr-1" />
                  {card.estimatedTime} min
                </Badge>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ConceptsList;
