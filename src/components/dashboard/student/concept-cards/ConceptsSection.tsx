
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
  {
    id: '2',
    title: "Organic Chemistry Basics",
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'hard',
    priority: 'medium',
    status: 'in-progress',
    hasFlashcards: true,
    hasPracticeTest: false,
    isBookmarked: true,
    hasVoiceNarration: false
  },
  {
    id: '3',
    title: "Integration Techniques",
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'hard',
    priority: 'high',
    status: 'not-started',
    hasFlashcards: true,
    hasPracticeTest: true,
    isBookmarked: false,
    hasVoiceNarration: true
  },
  {
    id: '4',
    title: "Cell Structure and Function",
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'easy',
    priority: 'low',
    status: 'completed',
    hasFlashcards: true,
    hasPracticeTest: false,
    isBookmarked: true,
    hasVoiceNarration: true
  },
  {
    id: '5',
    title: "Thermodynamics First Law",
    subject: 'Physics',
    topic: 'Thermodynamics',
    difficulty: 'medium',
    priority: 'medium',
    status: 'in-progress',
    hasFlashcards: false,
    hasPracticeTest: true,
    isBookmarked: false,
    hasVoiceNarration: false
  },
  {
    id: '6',
    title: "Coordination Compounds",
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    difficulty: 'medium',
    priority: 'low',
    status: 'not-started',
    hasFlashcards: false,
    hasPracticeTest: true,
    isBookmarked: false,
    hasVoiceNarration: true
  },
  {
    id: '7',
    title: "Probability Distribution",
    subject: 'Mathematics',
    topic: 'Statistics',
    difficulty: 'hard',
    priority: 'medium',
    status: 'not-started',
    hasFlashcards: true,
    hasPracticeTest: false,
    isBookmarked: false,
    hasVoiceNarration: false
  }
];

const ConceptsSection = () => {
  const [selectedTab, setSelectedTab] = React.useState<'today' | 'week' | 'month'>('today');
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);

  // Filter cards based on the selected tab
  const getFilteredCards = () => {
    switch(selectedTab) {
      case 'today':
        return mockCards.slice(0, 3);
      case 'week':
        return mockCards.slice(0, 5);
      case 'month':
        return mockCards;
      default:
        return mockCards;
    }
  };

  const handleToggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Brain className="mr-2 h-5 w-5 text-blue-600" />
            Concept Cards
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleToggleVoice}
          >
            {voiceEnabled ? (
              <span className="text-blue-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                Voice On
              </span>
            ) : (
              <span className="text-gray-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                Voice Off
              </span>
            )}
          </Button>
        </div>
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
                <ConceptCard 
                  key={card.id} 
                  {...card} 
                  voiceEnabled={voiceEnabled}
                />
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
                  <ArrowRight className="h-4 w-4 ml-1" />
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
