import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Search, ArrowRight, BookOpen, Tag, Star, Volume2, VolumeX } from 'lucide-react';
import ConceptCard from './ConceptCard';
import { ConceptCardProps } from './ConceptCard';

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
            onClick={() => setVoiceEnabled(!voiceEnabled)}
          >
            {voiceEnabled ? (
              <span className="text-blue-600 flex items-center gap-1">
                <Volume2 className="h-4 w-4" />
                Voice On
              </span>
            ) : (
              <span className="text-gray-500 flex items-center gap-1">
                <VolumeX className="h-4 w-4" />
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
