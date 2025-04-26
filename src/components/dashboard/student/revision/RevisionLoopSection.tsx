
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Brain, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  estimatedTime: number;
  completed: boolean;
  scheduledFor: string;
  flashcardsTotal: number;
  flashcardsCompleted: number;
}

interface RevisionLoopSectionProps {
  conceptCards: ConceptCard[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ conceptCards }) => {
  // Filter cards for revision
  const pendingReviewConcepts = conceptCards
    .filter(card => card.completed && card.scheduledFor !== 'today')
    .slice(0, 10);
  
  // Calculate low retention flashcards (those with less than 70% mastery)
  const lowRetentionCount = conceptCards.reduce((acc, card) => {
    const masteryRate = card.flashcardsTotal > 0 
      ? (card.flashcardsCompleted / card.flashcardsTotal) 
      : 1;
    return acc + (masteryRate < 0.7 ? 1 : 0);
  }, 0);
  
  // In a real app, this would be a user-marked flag in the data
  const flaggedItems = conceptCards
    .filter(card => card.difficulty === 'hard')
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Revision Loop</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Pending Review</h3>
                  <p className="text-sm text-gray-500">Concepts</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{pendingReviewConcepts.length}</div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/dashboard/student/concepts">Review Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium">Low Retention</h3>
                  <p className="text-sm text-gray-500">Flashcards</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{lowRetentionCount}</div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/dashboard/student/flashcards">Practice Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-red-100 dark:bg-red-900 p-2 rounded-full">
                  <Flag className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium">Flagged Items</h3>
                  <p className="text-sm text-gray-500">For Revisit</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{flaggedItems.length}</div>
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/dashboard/student/concepts/flagged">Review Flagged</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Revision Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="concepts" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="concepts">Pending Concepts</TabsTrigger>
              <TabsTrigger value="flashcards">Low Retention</TabsTrigger>
              <TabsTrigger value="flagged">Flagged Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="concepts">
              {pendingReviewConcepts.length > 0 ? (
                <div className="space-y-3">
                  {pendingReviewConcepts.map(card => (
                    <RevisionCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      subject={card.subject}
                      chapter={card.chapter}
                      indicator={<BookOpen className="h-4 w-4 text-blue-600" />}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-gray-500">No pending concepts for review</p>
              )}
            </TabsContent>
            
            <TabsContent value="flashcards">
              {lowRetentionCount > 0 ? (
                <div className="space-y-3">
                  {conceptCards
                    .filter(card => {
                      const masteryRate = card.flashcardsTotal > 0 
                        ? (card.flashcardsCompleted / card.flashcardsTotal) 
                        : 1;
                      return masteryRate < 0.7;
                    })
                    .slice(0, 10)
                    .map(card => (
                      <RevisionCard
                        key={card.id}
                        id={card.id}
                        title={`${card.title} Flashcards`}
                        subject={card.subject}
                        chapter={card.chapter}
                        indicator={<Brain className="h-4 w-4 text-amber-600" />}
                      />
                    ))}
                </div>
              ) : (
                <p className="text-center py-6 text-gray-500">No low retention flashcards found</p>
              )}
            </TabsContent>
            
            <TabsContent value="flagged">
              {flaggedItems.length > 0 ? (
                <div className="space-y-3">
                  {flaggedItems.map(card => (
                    <RevisionCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      subject={card.subject}
                      chapter={card.chapter}
                      indicator={<Flag className="h-4 w-4 text-red-600" />}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-gray-500">No flagged items found</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface RevisionCardProps {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  indicator: React.ReactNode;
}

const RevisionCard: React.FC<RevisionCardProps> = ({ id, title, subject, chapter, indicator }) => {
  return (
    <div className="p-3 border rounded-md flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-3">
          {indicator}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <Badge variant="outline" className="mr-2">{subject}</Badge>
            <span>{chapter}</span>
          </div>
        </div>
      </div>
      <Button asChild size="sm" variant="ghost">
        <Link to={`/dashboard/student/concepts/${id}`}>
          Review
        </Link>
      </Button>
    </div>
  );
};

export default RevisionLoopSection;
