
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Brain, Clock, ArrowRight, Star, BarChart } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data for flashcard decks
const MOCK_FLASHCARD_DECKS = [
  {
    id: 'deck1',
    title: "Physics Formulas",
    subject: "Physics",
    topic: "Mechanics & Waves",
    cardCount: 42,
    difficulty: "intermediate",
    estimatedTime: 15,
    progress: 65,
    mastery: 58,
    lastReviewed: "2023-06-10T14:23:00Z"
  },
  {
    id: 'deck2',
    title: "Periodic Table Elements",
    subject: "Chemistry",
    topic: "Elements & Properties",
    cardCount: 118,
    difficulty: "advanced",
    estimatedTime: 30,
    progress: 25,
    mastery: 22,
    lastReviewed: "2023-06-08T08:45:00Z"
  },
  {
    id: 'deck3',
    title: "Integration Rules",
    subject: "Mathematics",
    topic: "Calculus",
    cardCount: 24,
    difficulty: "advanced",
    estimatedTime: 20,
    progress: 100,
    mastery: 92,
    lastReviewed: "2023-06-09T16:10:00Z"
  },
  {
    id: 'deck4',
    title: "Cell Organelles",
    subject: "Biology",
    topic: "Cell Biology",
    cardCount: 15,
    difficulty: "beginner",
    estimatedTime: 10,
    progress: 45,
    mastery: 38,
    lastReviewed: "2023-06-07T11:30:00Z"
  },
  {
    id: 'deck5',
    title: "Chemical Bonds",
    subject: "Chemistry",
    topic: "Molecular Structure",
    cardCount: 18,
    difficulty: "intermediate",
    estimatedTime: 15,
    progress: 0,
    mastery: 0,
    lastReviewed: null
  },
  {
    id: 'deck6',
    title: "Geometric Proofs",
    subject: "Mathematics",
    topic: "Geometry",
    cardCount: 32,
    difficulty: "intermediate",
    estimatedTime: 25,
    progress: 75,
    mastery: 68,
    lastReviewed: "2023-06-05T14:15:00Z"
  }
];

const FlashcardsLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter flashcard decks based on search and active tab
  const filteredDecks = MOCK_FLASHCARD_DECKS.filter(deck => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'in-progress' && deck.progress > 0 && deck.progress < 100) ||
      (activeTab === 'mastered' && deck.mastery >= 80) ||
      (activeTab === 'not-started' && deck.progress === 0);
    
    return matchesSearch && matchesTab;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  
  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-600 dark:text-green-400';
    if (mastery >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
    >
      <div className="space-y-6">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search flashcards, subjects or topics..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select className="border rounded bg-background px-2 py-1 text-sm">
              <option>Latest</option>
              <option>Mastery</option>
              <option>Card Count</option>
            </select>
          </div>
        </div>
        
        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Decks</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="mastered">Mastered</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredDecks.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="h-10 w-10 text-gray-400 mb-2 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No flashcard decks found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'Try a different search term' : 'No flashcard decks in this category yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDecks.map((deck) => (
                  <Card key={deck.id} className="h-full hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                          {deck.subject}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(deck.difficulty)}>
                          {deck.difficulty.charAt(0).toUpperCase() + deck.difficulty.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold">{deck.title}</CardTitle>
                      <CardDescription>{deck.topic}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{deck.cardCount} cards</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{deck.estimatedTime} min</span>
                          </div>
                        </div>
                        
                        {deck.mastery >= 80 && (
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-amber-600 dark:text-amber-400">Mastered!</span>
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{deck.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${deck.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                              style={{ width: `${deck.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <BarChart className={`h-4 w-4 mr-1 ${getMasteryColor(deck.mastery)}`} />
                          <span className={getMasteryColor(deck.mastery)}>
                            Mastery: {deck.mastery}%
                          </span>
                        </div>
                        
                        {deck.lastReviewed && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Last reviewed: {new Date(deck.lastReviewed).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/dashboard/student/flashcards/${deck.id}/interactive`} className="w-full">
                        <Button className="w-full">
                          Study Flashcards
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsLandingPage;
