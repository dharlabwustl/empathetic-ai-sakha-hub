
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Brain, Calendar, CircleCheck, FlipHorizontal, Mic, Keyboard, CheckCircle, XCircle, Bookmark, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FlashcardsSection = () => {
  const [activeTimeTab, setActiveTimeTab] = useState('today');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [practiceMode, setPracticeMode] = useState('type');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Sample data for flashcard decks
  const flashcardDecks = [
    {
      id: 'math-algebra',
      name: 'Algebra Basics',
      subject: 'Math',
      topic: 'Algebra',
      cardCount: 20,
      mastery: 65,
      timeframe: 'today'
    },
    {
      id: 'physics-kinematics',
      name: 'Kinematics Fundamentals',
      subject: 'Physics',
      topic: 'Mechanics',
      cardCount: 15,
      mastery: 48,
      timeframe: 'today'
    },
    {
      id: 'chemistry-periodic',
      name: 'Periodic Table Elements',
      subject: 'Chemistry',
      topic: 'General',
      cardCount: 30,
      mastery: 72,
      timeframe: 'week'
    },
    {
      id: 'biology-cells',
      name: 'Cell Structure',
      subject: 'Biology',
      topic: 'Cellular Biology',
      cardCount: 25,
      mastery: 58,
      timeframe: 'week'
    },
    {
      id: 'history-world-war',
      name: 'World War II Events',
      subject: 'History',
      topic: 'Modern History',
      cardCount: 18,
      mastery: 35,
      timeframe: 'month'
    }
  ];
  
  // Filter flashcard decks based on selected timeframe
  const filteredDecks = flashcardDecks.filter(deck => {
    if (activeTimeTab === 'all') return true;
    return deck.timeframe === activeTimeTab;
  });
  
  // Personal stats
  const stats = {
    streakDays: 7,
    masteryLevel: 62,
    cardsReviewedToday: 15
  };
  
  // Subject options
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'math', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'history', label: 'History' }
  ];
  
  // Topic options (would dynamically change based on subject)
  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'calculus', label: 'Calculus' },
    { value: 'mechanics', label: 'Mechanics' },
    { value: 'cellular', label: 'Cellular Biology' }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-violet-600" />
            Master Your Concepts with Flashcards
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Review, practice, and master concepts with smart flashcards
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-violet-100 dark:bg-violet-800/40 px-3 py-1.5 rounded-full">
            <span className="text-violet-600 dark:text-violet-300">🔥 Streak:</span>
            <Badge variant="secondary" className="bg-white dark:bg-gray-800">{stats.streakDays} days</Badge>
          </div>
          
          <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/40 px-3 py-1.5 rounded-full">
            <span className="text-amber-600 dark:text-amber-300">🎯 Mastery:</span>
            <Badge variant="secondary" className="bg-white dark:bg-gray-800">{stats.masteryLevel}%</Badge>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-800/40 px-3 py-1.5 rounded-full">
            <span className="text-emerald-600 dark:text-emerald-300">🧠 Today:</span>
            <Badge variant="secondary" className="bg-white dark:bg-gray-800">{stats.cardsReviewedToday} cards</Badge>
          </div>
        </div>
      </div>
      
      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjectOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger>
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            {topicOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
          <Button 
            size="sm" 
            variant={practiceMode === 'type' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('type')}
            className="flex items-center gap-1.5"
          >
            <Keyboard size={16} /> Type
          </Button>
          <Button 
            size="sm" 
            variant={practiceMode === 'speak' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('speak')}
            className="flex items-center gap-1.5"
          >
            <Mic size={16} /> Speak
          </Button>
          <Button 
            size="sm" 
            variant={practiceMode === 'flip' ? 'default' : 'ghost'}
            onClick={() => setPracticeMode('flip')}
            className="flex items-center gap-1.5"
          >
            <FlipHorizontal size={16} /> Flip
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
          <Button 
            size="sm" 
            variant={statusFilter === 'all' ? 'default' : 'ghost'}
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'mastered' ? 'default' : 'ghost'}
            onClick={() => setStatusFilter('mastered')}
            className="flex items-center gap-1.5"
          >
            <CircleCheck size={16} /> Mastered
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'flagged' ? 'default' : 'ghost'}
            onClick={() => setStatusFilter('flagged')}
          >
            Flagged
          </Button>
        </div>
      </div>
      
      {/* Time Tabs */}
      <Tabs defaultValue="today" className="w-full" value={activeTimeTab} onValueChange={setActiveTimeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔸 This Week</span>
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔸 This Month</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Contents */}
        <TabsContent value="today" className="mt-6">
          <FlashcardDeckGrid decks={filteredDecks} />
        </TabsContent>
        
        <TabsContent value="week" className="mt-6">
          <FlashcardDeckGrid decks={filteredDecks} />
        </TabsContent>
        
        <TabsContent value="month" className="mt-6">
          <FlashcardDeckGrid decks={filteredDecks} />
        </TabsContent>
      </Tabs>
      
      {/* View All Button */}
      <div className="flex justify-end">
        <Link to="/dashboard/student/flashcards">
          <Button variant="outline" className="flex items-center gap-2">
            View All Flashcards
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Flashcard Deck Grid Component
interface FlashcardDeckGridProps {
  decks: any[];
}

const FlashcardDeckGrid: React.FC<FlashcardDeckGridProps> = ({ decks }) => {
  if (decks.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardContent>
          <p className="text-muted-foreground">No flashcard decks available for this time period.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {decks.map((deck) => (
        <FlashcardDeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

// Flashcard Deck Card Component
interface FlashcardDeckCardProps {
  deck: any;
}

const FlashcardDeckCard: React.FC<FlashcardDeckCardProps> = ({ deck }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full border-l-4" style={{ borderLeftColor: getSubjectColor(deck.subject) }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-white">{deck.subject}</Badge>
            <Badge variant="secondary">{deck.cardCount} cards</Badge>
          </div>
          <CardTitle className="text-lg">{deck.name}</CardTitle>
          <CardDescription>{deck.topic}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Mastery</span>
            <span className={getMasteryColorClass(deck.mastery)}>{deck.mastery}%</span>
          </div>
          <Progress value={deck.mastery} className="h-2" />
        </CardContent>
        
        <CardFooter>
          <Link to={`/dashboard/student/flashcards/${deck.id}`} className="w-full">
            <Button className="w-full">Start Practice</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Helper functions
function getSubjectColor(subject: string): string {
  const colors = {
    'Math': '#6366F1', // Indigo
    'Physics': '#3B82F6', // Blue
    'Chemistry': '#10B981', // Emerald
    'Biology': '#84CC16', // Lime
    'History': '#B45309', // Amber
    'default': '#8B5CF6' // Violet
  };
  
  return colors[subject as keyof typeof colors] || colors.default;
}

function getMasteryColorClass(mastery: number): string {
  if (mastery >= 80) return 'text-green-600';
  if (mastery >= 60) return 'text-blue-600';
  if (mastery >= 40) return 'text-amber-600';
  return 'text-red-600';
}

export default FlashcardsSection;
