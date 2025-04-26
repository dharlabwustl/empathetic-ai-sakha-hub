
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, Check, Clock, Star, Flame, Brain, BarChart, MessageSquare, 
  Mic, RefreshCw, Award, ChevronRight
} from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for flashcard decks
const flashcardDecks = [
  {
    id: "f1",
    title: "Physics Fundamentals",
    subject: "Physics",
    topic: "Mechanics",
    status: "in-progress",
    cardCount: 30,
    masteryPercentage: 65,
    timeEstimate: 15,
    lastReviewed: "2 days ago",
    dueCards: 8,
    flaggedCards: 3,
    isRecommended: true
  },
  {
    id: "f2",
    title: "Organic Chemistry",
    subject: "Chemistry",
    topic: "Chemical Reactions",
    status: "not-started",
    cardCount: 45,
    masteryPercentage: 0,
    timeEstimate: 25,
    lastReviewed: null,
    dueCards: 45,
    flaggedCards: 0,
    isRecommended: false
  },
  {
    id: "f3",
    title: "Algebra Review",
    subject: "Mathematics",
    topic: "Algebra",
    status: "completed",
    cardCount: 25,
    masteryPercentage: 92,
    timeEstimate: 15,
    lastReviewed: "Yesterday",
    dueCards: 0,
    flaggedCards: 2,
    isRecommended: true
  },
  {
    id: "f4",
    title: "Cell Division",
    subject: "Biology",
    topic: "Cell Biology",
    status: "in-progress",
    cardCount: 40,
    masteryPercentage: 30,
    timeEstimate: 20,
    lastReviewed: "4 days ago",
    dueCards: 15,
    flaggedCards: 5,
    isRecommended: true
  },
  {
    id: "f5",
    title: "Modern Physics",
    subject: "Physics",
    topic: "Quantum Mechanics",
    status: "not-started",
    cardCount: 35,
    masteryPercentage: 0,
    timeEstimate: 25,
    lastReviewed: null,
    dueCards: 35,
    flaggedCards: 0,
    isRecommended: false
  },
  {
    id: "f6",
    title: "Calculus Formulas",
    subject: "Mathematics",
    topic: "Calculus",
    status: "completed",
    cardCount: 20,
    masteryPercentage: 85,
    timeEstimate: 10,
    lastReviewed: "3 days ago",
    dueCards: 5,
    flaggedCards: 1,
    isRecommended: false
  }
];

// Get status badge color and text
const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Mastered" };
    case "in-progress":
      return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: RefreshCw, text: "In Progress" };
    case "not-started":
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
  }
};

interface FlashcardDeckProps {
  deck: typeof flashcardDecks[0];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ deck }) => {
  const statusInfo = getStatusInfo(deck.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{deck.title}</CardTitle>
          {deck.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {deck.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {deck.topic}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={statusInfo.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          
          {deck.dueCards > 0 && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              {deck.dueCards} cards due
            </Badge>
          )}
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Mastery</span>
            <span>{deck.masteryPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                deck.masteryPercentage >= 80 
                  ? "bg-emerald-500" 
                  : deck.masteryPercentage >= 40 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              }`} 
              style={{ width: `${deck.masteryPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{deck.timeEstimate} min</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{deck.cardCount} cards</span>
          {deck.flaggedCards > 0 && (
            <>
              <span className="mx-2">•</span>
              <Star className="h-4 w-4 text-amber-500" />
              <span>{deck.flaggedCards} flagged</span>
            </>
          )}
        </div>
        
        {deck.lastReviewed && (
          <div className="mt-2 text-xs text-gray-400">
            Last reviewed: {deck.lastReviewed}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          {deck.status === "completed" 
            ? "Review Again" 
            : deck.status === "in-progress" 
              ? "Continue Practice" 
              : "Start Practice"
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

const FlashcardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30">
        <CardContent className="p-4 flex gap-4 items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Streak Days</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30">
        <CardContent className="p-4 flex gap-4 items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mastery Level</p>
            <h3 className="text-2xl font-bold">68%</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30">
        <CardContent className="p-4 flex gap-4 items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cards Reviewed Today</p>
            <h3 className="text-2xl font-bold">45</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FlashcardsFilters = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <Select defaultValue="all-subjects">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-subjects">All Subjects</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select defaultValue="all-topics">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-topics">All Topics</SelectItem>
            <SelectItem value="mechanics">Mechanics</SelectItem>
            <SelectItem value="electricity">Electricity</SelectItem>
            <SelectItem value="organic">Organic Chemistry</SelectItem>
            <SelectItem value="algebra">Algebra</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <ToggleGroup type="single" defaultValue="all">
          <ToggleGroupItem value="all" className="flex-1" aria-label="All">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="mastered" className="flex-1" aria-label="Mastered">
            Mastered
          </ToggleGroupItem>
          <ToggleGroupItem value="flagged" className="flex-1" aria-label="Flagged">
            Flagged
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="flex-1">
        <ToggleGroup type="single" defaultValue="type">
          <ToggleGroupItem value="type" className="flex-1 gap-1" aria-label="Type Answer">
            <MessageSquare className="h-4 w-4" />
            Type
          </ToggleGroupItem>
          <ToggleGroupItem value="speak" className="flex-1 gap-1" aria-label="Speak Answer">
            <Mic className="h-4 w-4" />
            Speak
          </ToggleGroupItem>
          <ToggleGroupItem value="flip" className="flex-1 gap-1" aria-label="Flip & Recall">
            <RefreshCw className="h-4 w-4" />
            Flip
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

const FlashcardsSection = () => {
  const [timePeriod, setTimePeriod] = useState("today");
  
  return (
    <SharedPageLayout
      title="Master Your Concepts with Flashcards"
      subtitle="Review and reinforce your knowledge with smart, spaced repetition"
    >
      <div className="space-y-6">
        <FlashcardStats />
        <FlashcardsFilters />
        
        <Tabs defaultValue="today" value={timePeriod} onValueChange={setTimePeriod} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="today" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Today
              </TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Week
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Month
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Create Deck</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="today" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcardDecks.slice(0, 4).map(deck => (
                <FlashcardDeck key={deck.id} deck={deck} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcardDecks.slice(0, 5).map(deck => (
                <FlashcardDeck key={deck.id} deck={deck} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcardDecks.map(deck => (
                <FlashcardDeck key={deck.id} deck={deck} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30">
          <CardHeader className="pb-2">
            <CardTitle>Daily Flashcard Challenge</CardTitle>
            <CardDescription>Complete today's flashcard challenges to earn XP</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-2">Progress Today</h4>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0</span>
                  <span>45/75 cards</span>
                </div>
              </div>
              <Button className="flex items-center gap-1">
                Continue Challenge
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsSection;
