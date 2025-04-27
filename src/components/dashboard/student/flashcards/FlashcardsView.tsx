
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, BarChart, Plus, Brain, Clock, ChevronRight, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for flashcard decks
const mockFlashcards = [
  {
    id: 1,
    title: "Physics Formulas",
    subject: "Physics",
    topic: "Core Formulas",
    cardCount: 25,
    masteryLevel: 75,
    lastReviewed: "Yesterday",
    dueCards: 8,
    priority: "high"
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    topic: "Organic",
    cardCount: 40,
    masteryLevel: 60,
    lastReviewed: "3 days ago",
    dueCards: 15,
    priority: "medium"
  },
  {
    id: 3,
    title: "Mathematical Theorems",
    subject: "Mathematics",
    topic: "Theorems",
    cardCount: 20,
    masteryLevel: 85,
    lastReviewed: "Today",
    dueCards: 3,
    priority: "low"
  },
  {
    id: 4,
    title: "Biology Terms",
    subject: "Biology",
    topic: "Terminology",
    cardCount: 35,
    masteryLevel: 45,
    lastReviewed: "1 week ago",
    dueCards: 20,
    priority: "high"
  }
];

// Mock data for statistics
const mockStats = {
  totalCards: 120,
  masteredCards: 68,
  reviewAccuracy: 75,
  streakDays: 7,
  lastActivity: "Today",
  timeSpent: "3h 45m"
};

const FlashcardsView: React.FC = () => {
  const { subject } = useParams<{ subject?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Filter flashcards based on subject if provided
  const filteredFlashcards = subject 
    ? mockFlashcards.filter(deck => deck.subject.toLowerCase() === subject.toLowerCase())
    : mockFlashcards;
  
  const handleAnalytics = () => {
    navigate('/dashboard/student/flashcards/analytics');
    toast({
      title: "Flashcard Analytics",
      description: "Analyzing your flashcard progress and completion patterns.",
    });
  };
  
  const handleCreateDeck = () => {
    setShowCreateDialog(false);
    toast({
      title: "Flashcard Deck Created",
      description: "Your new flashcard deck has been added to your study plan.",
    });
  };
  
  const handleDailyChallenge = () => {
    navigate('/dashboard/student/flashcards/challenge');
    toast({
      title: "Daily Challenge Started",
      description: "Complete today's challenge to boost your knowledge retention.",
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {subject ? `${subject} Flashcards` : 'All Flashcards'}
          </h1>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleAnalytics}>
              <BarChart className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Create Deck</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Flashcard Deck</DialogTitle>
                  <DialogDescription>
                    Generate a new set of flashcards for your study plan.
                    <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="deckName">Deck Name</Label>
                    <Input id="deckName" placeholder="e.g., Physics Formulas" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue="physics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" placeholder="e.g., Mechanics, Organic Chemistry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCount">Number of Cards</Label>
                    <Select defaultValue="20">
                      <SelectTrigger>
                        <SelectValue placeholder="Select card count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 Cards</SelectItem>
                        <SelectItem value="20">20 Cards</SelectItem>
                        <SelectItem value="30">30 Cards</SelectItem>
                        <SelectItem value="40">40 Cards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateDeck}>Create Deck</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="all">All Decks</TabsTrigger>
                <TabsTrigger value="due">Due Today</TabsTrigger>
                <TabsTrigger value="recent">Recently Studied</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFlashcards.map((deck) => (
                <FlashcardDeck key={deck.id} deck={deck} />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <FlashcardStatsCard />
            <FlashcardChallengeCard onStartChallenge={handleDailyChallenge} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Flashcard Deck Component
interface FlashcardDeckProps {
  deck: typeof mockFlashcards[0];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ deck }) => {
  const navigate = useNavigate();
  
  const handleOpenDeck = () => {
    navigate(`/dashboard/student/flashcards/${deck.id}`);
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{deck.title}</CardTitle>
          <Badge className={
            deck.priority === "high" 
              ? "bg-red-100 text-red-800 border-red-200"
              : deck.priority === "medium"
                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                : "bg-blue-100 text-blue-800 border-blue-200"
          }>
            {deck.priority.charAt(0).toUpperCase() + deck.priority.slice(1)} Priority
          </Badge>
        </div>
        <CardDescription className="flex gap-2 items-center">
          <Badge variant="outline">{deck.subject}</Badge>
          <Badge variant="outline" className="bg-gray-50">{deck.topic}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Mastery Level</span>
            <span>{deck.masteryLevel}%</span>
          </div>
          <Progress value={deck.masteryLevel} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{deck.cardCount} cards</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Clock className="h-4 w-4" />
            <span>Due: {deck.dueCards}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Last review:</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span>{deck.lastReviewed}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700" 
          onClick={handleOpenDeck}
        >
          Study Now
        </Button>
      </CardFooter>
    </Card>
  );
};

// Flashcard Stats Card Component
const FlashcardStatsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Flashcard Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Cards</p>
            <p className="text-2xl font-bold">{mockStats.totalCards}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Mastered</p>
            <p className="text-2xl font-bold">{mockStats.masteredCards} <span className="text-sm text-muted-foreground">({Math.round(mockStats.masteredCards / mockStats.totalCards * 100)}%)</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Review Accuracy</p>
            <p className="text-2xl font-bold">{mockStats.reviewAccuracy}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-2xl font-bold">{mockStats.streakDays} days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Flashcard Challenge Card Component
interface FlashcardChallengeCardProps {
  onStartChallenge: () => void;
}

const FlashcardChallengeCard: React.FC<FlashcardChallengeCardProps> = ({ onStartChallenge }) => {
  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Daily Flash Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Complete today's challenge to boost your knowledge retention and maintain your streak!</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onStartChallenge}>
          Start Challenge
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlashcardsView;
