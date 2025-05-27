
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Clock, Play, CheckCircle, BookOpen, Target, TrendingUp } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ContentFeedback from '@/components/dashboard/student/feedback/ContentFeedback';

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  cardCount: number;
  masteredCards: number;
  reviewCards: number;
  newCards: number;
  lastStudied?: string;
  estimatedTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'pending' | 'completed' | 'today';
}

const FlashcardsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');
  const [activeSubject, setActiveSubject] = useState('all');

  // Mock flashcard data
  const flashcardDecks: FlashcardDeck[] = [
    {
      id: 'deck-1',
      title: 'Physics Formulas & Constants',
      subject: 'Physics',
      cardCount: 45,
      masteredCards: 30,
      reviewCards: 10,
      newCards: 5,
      lastStudied: '2 days ago',
      estimatedTime: 25,
      difficulty: 'Medium',
      status: 'today'
    },
    {
      id: 'deck-2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      cardCount: 60,
      masteredCards: 45,
      reviewCards: 15,
      newCards: 0,
      lastStudied: '1 day ago',
      estimatedTime: 30,
      difficulty: 'Hard',
      status: 'pending'
    },
    {
      id: 'deck-3',
      title: 'Biology Classification',
      subject: 'Biology',
      cardCount: 35,
      masteredCards: 35,
      reviewCards: 0,
      newCards: 0,
      lastStudied: 'Today',
      estimatedTime: 15,
      difficulty: 'Easy',
      status: 'completed'
    }
  ];

  // Get unique subjects
  const subjects = useMemo(() => {
    const subjectsSet = new Set(flashcardDecks.map(deck => deck.subject));
    return Array.from(subjectsSet);
  }, [flashcardDecks]);

  // Filter decks based on status and subject
  const filteredDecks = useMemo(() => {
    let filtered = flashcardDecks;

    // Filter by status
    filtered = filtered.filter(deck => deck.status === statusFilter);
    
    // Filter by subject
    if (activeSubject !== 'all') {
      filtered = filtered.filter(deck => deck.subject === activeSubject);
    }
    
    return filtered;
  }, [flashcardDecks, statusFilter, activeSubject]);

  // Calculate overview stats
  const overviewStats = useMemo(() => {
    const totalDecks = flashcardDecks.length;
    const completedDecks = flashcardDecks.filter(d => d.status === 'completed').length;
    const totalCards = flashcardDecks.reduce((sum, deck) => sum + deck.cardCount, 0);
    const masteredCards = flashcardDecks.reduce((sum, deck) => sum + deck.masteredCards, 0);
    
    return {
      totalDecks,
      completedDecks,
      totalCards,
      masteredCards,
      progressPercentage: Math.round((masteredCards / totalCards) * 100)
    };
  }, [flashcardDecks]);

  const handleStudyDeck = (deckId: string) => {
    // Fixed routing to interactive flashcard page
    navigate(`/dashboard/student/flashcards/${deckId}/interactive`);
  };

  const handleQuickReview = (deckId: string) => {
    // Quick review also routes to interactive page
    navigate(`/dashboard/student/flashcards/${deckId}/interactive`);
  };

  const FlashcardDeckCard = ({ deck }: { deck: FlashcardDeck }) => {
    const progressPercentage = Math.round((deck.masteredCards / deck.cardCount) * 100);
    const isCompleted = deck.status === 'completed';

    return (
      <Card className={`transition-all hover:shadow-lg border-2 ${
        isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-purple-200'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className={`text-lg ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                {deck.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {deck.subject}
                </Badge>
                <Badge variant="outline" className={
                  deck.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-200' :
                  deck.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }>
                  {deck.difficulty}
                </Badge>
              </div>
            </div>
            <ContentFeedback
              contentId={deck.id}
              contentType="flashcard"
              contentTitle={deck.title}
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-2xl font-bold text-green-700">{deck.masteredCards}</p>
              <p className="text-xs text-green-600 font-medium">Mastered</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-2xl font-bold text-yellow-700">{deck.reviewCards}</p>
              <p className="text-xs text-yellow-600 font-medium">Review</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-2xl font-bold text-blue-700">{deck.newCards}</p>
              <p className="text-xs text-blue-600 font-medium">New</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-semibold text-purple-600">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deck.estimatedTime} min
            </span>
            {deck.lastStudied && (
              <span>Last: {deck.lastStudied}</span>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {!isCompleted ? (
              <>
                <Button 
                  onClick={() => handleStudyDeck(deck.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Study Cards
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleQuickReview(deck.id)}
                  className="flex-1"
                >
                  Quick Review
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => handleStudyDeck(deck.id)}
                className="w-full"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Review Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Master concepts through spaced repetition"
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-purple-800">{overviewStats.totalDecks}</p>
                  <p className="text-sm text-purple-600 font-medium">Total Decks</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-800">{overviewStats.completedDecks}</p>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-800">{overviewStats.totalCards}</p>
                  <p className="text-sm text-blue-600 font-medium">Total Cards</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold text-orange-800">{overviewStats.progressPercentage}%</p>
                  <p className="text-sm text-orange-600 font-medium">Mastery</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="all-flashcards" className="space-y-6 mt-6">
            {/* Enhanced Status Filter Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-1">
              <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="today" className="text-sm">
                    Today ({flashcardDecks.filter(d => d.status === 'today').length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-sm">
                    Pending ({flashcardDecks.filter(d => d.status === 'pending').length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-sm">
                    Completed ({flashcardDecks.filter(d => d.status === 'completed').length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Subject Filter Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-1">
              <Tabs value={activeSubject} onValueChange={setActiveSubject}>
                <TabsList className={`grid w-full grid-cols-${subjects.length + 1}`}>
                  <TabsTrigger value="all" className="text-sm">All Subjects</TabsTrigger>
                  {subjects.map(subject => (
                    <TabsTrigger key={subject} value={subject} className="text-sm">
                      {subject} ({flashcardDecks.filter(d => d.subject === subject && d.status === statusFilter).length})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Flashcard Decks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">
                    No flashcard decks found for {activeSubject !== 'all' ? activeSubject : ''} {statusFilter} status
                  </p>
                </div>
              ) : (
                filteredDecks.map((deck) => (
                  <FlashcardDeckCard key={deck.id} deck={deck} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
