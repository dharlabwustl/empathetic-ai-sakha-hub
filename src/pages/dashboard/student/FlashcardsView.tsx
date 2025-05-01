
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ChevronRight, BookOpen, Clock, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Mock flashcard decks
const flashcardDecks = [
  { 
    id: "physics-1", 
    title: "Physics: Mechanics", 
    cardCount: 42, 
    mastered: 28, 
    dueToday: 12, 
    lastStudied: "1 day ago",
    subject: "Physics"
  },
  { 
    id: "chemistry-1", 
    title: "Chemistry: Organic Reactions", 
    cardCount: 36, 
    mastered: 14, 
    dueToday: 8, 
    lastStudied: "3 days ago",
    subject: "Chemistry" 
  },
  { 
    id: "mathematics-1", 
    title: "Mathematics: Calculus", 
    cardCount: 50, 
    mastered: 32, 
    dueToday: 5, 
    lastStudied: "today",
    subject: "Mathematics" 
  },
  { 
    id: "physics-2", 
    title: "Physics: Electricity", 
    cardCount: 28, 
    mastered: 10, 
    dueToday: 15, 
    lastStudied: "1 week ago",
    subject: "Physics"
  }
];

// Mock subjects with card counts
const subjects = [
  { name: "Physics", count: 70, color: "bg-blue-500" },
  { name: "Chemistry", count: 48, color: "bg-green-500" },
  { name: "Mathematics", count: 62, color: "bg-purple-500" },
  { name: "Biology", count: 24, color: "bg-rose-500" },
];

const FlashcardsView = () => {
  return (
    <SharedPageLayout 
      title="Flashcards" 
      subtitle="Review and reinforce your knowledge"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-primary/10 p-3 mb-2">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">84</h3>
              <p className="text-sm text-muted-foreground">Mastered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-2">
                <RotateCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">40</h3>
              <p className="text-sm text-muted-foreground">Due Today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mb-2">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold">28</h3>
              <p className="text-sm text-muted-foreground">New Cards</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Subjects Filter */}
        <div>
          <h2 className="text-xl font-bold mb-4">Browse by Subject</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full">
              All Subjects
            </Button>
            {subjects.map((subject, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="rounded-full"
              >
                <span className={`w-2 h-2 rounded-full ${subject.color} mr-1.5`}></span>
                {subject.name} ({subject.count})
              </Button>
            ))}
          </div>
        </div>
        
        {/* Flashcard Decks */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Your Flashcard Decks</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcardDecks.map((deck) => (
              <Card key={deck.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">{deck.subject}</Badge>
                      <h3 className="font-medium">{deck.title}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">Last studied: {deck.lastStudied}</span>
                      <Badge variant="secondary" className="mt-1">{deck.dueToday} due today</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{deck.mastered} mastered</span>
                      <span>{deck.cardCount} total</span>
                    </div>
                    <Progress value={(deck.mastered / deck.cardCount) * 100} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <span>View Deck</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link to={`/dashboard/student/flashcards/${deck.id}/interactive`}>
                        Start Practice
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Create New Deck Button */}
        <div className="flex justify-center">
          <Button variant="outline">
            Create New Flashcard Deck
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
