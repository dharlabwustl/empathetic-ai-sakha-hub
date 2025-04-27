import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Activity, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { SharedPageLayout } from '../SharedPageLayout';

const FlashcardsOverviewSection = () => {
  // Mock flashcards data
  const flashcardsData = [
    {
      id: "fc1",
      title: "Physics Formulas",
      subject: "Physics",
      totalCards: 48,
      masteredCards: 32,
      lastReview: "2 days ago",
      nextReview: "Tomorrow",
      favorite: true
    },
    {
      id: "fc2",
      title: "Chemical Elements",
      subject: "Chemistry",
      totalCards: 36,
      masteredCards: 24,
      lastReview: "5 days ago",
      nextReview: "Today",
      favorite: false
    },
    {
      id: "fc3",
      title: "Math Theorems",
      subject: "Mathematics",
      totalCards: 24,
      masteredCards: 10,
      lastReview: "1 week ago",
      nextReview: "Today",
      favorite: false
    }
  ];

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            View All
          </Button>
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Deck
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Flashcards</TabsTrigger>
          <TabsTrigger value="due">Due Today</TabsTrigger>
          <TabsTrigger value="recent">Recently Studied</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcardsData.map(deck => (
            <Card key={deck.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {deck.subject}
                  </span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    deck.nextReview === "Today" 
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" 
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  }`}>
                    {deck.nextReview === "Today" ? "Due Today" : `Due ${deck.nextReview}`}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{deck.title}</CardTitle>
                <CardDescription>{deck.totalCards} cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mastery Progress</span>
                      <span>{Math.round(deck.masteredCards / deck.totalCards * 100)}%</span>
                    </div>
                    <Progress value={deck.masteredCards / deck.totalCards * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Last reviewed: {deck.lastReview}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Study Now</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        {/* Other tabs content */}
        <TabsContent value="due">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcardsData.filter(deck => deck.nextReview === "Today").map(deck => (
              <Card key={deck.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {deck.subject}
                    </span>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                      Due Today
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{deck.title}</CardTitle>
                  <CardDescription>{deck.totalCards} cards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mastery Progress</span>
                        <span>{Math.round(deck.masteredCards / deck.totalCards * 100)}%</span>
                      </div>
                      <Progress value={deck.masteredCards / deck.totalCards * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Last reviewed: {deck.lastReview}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Study Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <p className="text-center py-8 text-muted-foreground">Recently studied flashcards will appear here.</p>
        </TabsContent>
        
        <TabsContent value="favorites">
          <p className="text-center py-8 text-muted-foreground">Favorite flashcards will appear here.</p>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Daily Flash Challenge</CardTitle>
          <CardDescription>Complete today's flashcard challenge to maintain your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You have 15 flashcards scheduled for review today.</p>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full">Start Daily Challenge</Button>
        </CardFooter>
      </Card>
    </SharedPageLayout>
  );
};

export default FlashcardsOverviewSection;
