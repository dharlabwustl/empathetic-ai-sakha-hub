
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ConceptCard as IConceptCard } from '@/hooks/useUserStudyPlan';
import ConceptCard from '@/components/dashboard/student/ConceptCard';

interface ConceptsListProps {
  conceptCards: IConceptCard[];
  loading: boolean;
  selectedSubject: string;
  selectedDifficulty: string;
  searchQuery: string;
}

const ConceptsList: React.FC<ConceptsListProps> = ({
  conceptCards,
  loading,
  selectedSubject,
  selectedDifficulty,
  searchQuery
}) => {
  const filteredCards = conceptCards
    .filter(card => !selectedSubject || card.subject === selectedSubject)
    .filter(card => !selectedDifficulty || card.difficulty === selectedDifficulty)
    .filter(card => !searchQuery || 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.chapter.toLowerCase().includes(searchQuery.toLowerCase())
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
        </Link>
      ))}
    </div>
  );
};

export default ConceptsList;
