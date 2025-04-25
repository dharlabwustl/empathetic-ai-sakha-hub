
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Search, ArrowRight } from 'lucide-react';
import ConceptCard, { ConceptCardProps } from './ConceptCard';

// We'll move this to API/hooks later
const mockCards: ConceptCardProps[] = [
  {
    id: '1',
    title: "Newton's Laws of Motion",
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'medium',
    priority: 'high',
    status: 'not-started',
    hasFlashcards: true,
    hasPracticeTest: true,
    isBookmarked: false,
    hasVoiceNarration: true
  },
  // ... Add more mock cards here
];

const ConceptsSection = () => {
  const [selectedTab, setSelectedTab] = React.useState<'today' | 'week' | 'month'>('today');

  // Filter cards based on the selected tab
  const getFilteredCards = () => {
    switch(selectedTab) {
      case 'today':
        return mockCards.slice(0, 3);
      case 'week':
        return mockCards.slice(0, 6);
      case 'month':
        return mockCards;
      default:
        return mockCards;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Brain className="mr-2 h-5 w-5 text-blue-600" />
          Concept Cards
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as 'today' | 'week' | 'month')}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredCards().map((card) => (
                <ConceptCard key={card.id} {...card} />
              ))}
            </div>
            
            {getFilteredCards().length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No concept cards scheduled for this period</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <Link to="/dashboard/student/concepts/all">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  View All Concept Cards
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConceptsSection;
