
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Video, Headphones, Image, LineChart, ChevronLeft, ChevronRight, Check, Star, Clock } from "lucide-react";

// MicroConcept Card Types
type MediaType = 'text' | 'audio' | 'video' | 'image';
type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  examGoal: string;
  description: string;
  mediaType: MediaType;
  mediaUrl?: string;
  difficulty: DifficultyLevel;
  readTime: number; // in minutes
  examples: string[];
  relatedConcepts: string[];
  completed: boolean;
}

// Mock concept cards
const sampleConceptCards: ConceptCard[] = [
  {
    id: '1',
    title: 'Newton\'s First Law of Motion',
    subject: 'Physics',
    examGoal: 'IIT-JEE',
    description: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
    mediaType: 'text',
    difficulty: 'medium',
    readTime: 5,
    examples: ['A book at rest on a table remains at rest', 'Passengers in a moving bus tend to fall backward when it suddenly starts'],
    relatedConcepts: ['Inertia', 'Balanced Forces', 'Friction'],
    completed: false
  },
  {
    id: '2',
    title: 'Quadratic Formula',
    subject: 'Mathematics',
    examGoal: 'IIT-JEE',
    description: 'For a quadratic equation ax² + bx + c = 0, the solutions are given by x = (-b ± √(b² - 4ac)) / 2a.',
    mediaType: 'video',
    mediaUrl: 'https://example.com/videos/quadratic-formula.mp4',
    difficulty: 'easy',
    readTime: 8,
    examples: ['Solving x² - 5x + 6 = 0', 'Finding the roots of 3x² + 2x - 1 = 0'],
    relatedConcepts: ['Discriminant', 'Parabolas', 'Complex Roots'],
    completed: true
  },
  {
    id: '3',
    title: 'Periodic Table Classification',
    subject: 'Chemistry',
    examGoal: 'IIT-JEE',
    description: 'Elements in the periodic table are organized by atomic number and grouped by similar electron configurations and chemical properties.',
    mediaType: 'image',
    mediaUrl: 'https://example.com/images/periodic-table.jpg',
    difficulty: 'medium',
    readTime: 7,
    examples: ['Noble gases have full valence shells', 'Alkali metals are highly reactive'],
    relatedConcepts: ['Electronegativity', 'Atomic Radius', 'Ionization Energy'],
    completed: false
  },
  {
    id: '4',
    title: 'Organic Chemistry Functional Groups',
    subject: 'Chemistry',
    examGoal: 'NEET',
    description: 'Functional groups are specific groupings of atoms that determine the characteristic chemical reactions of organic molecules.',
    mediaType: 'audio',
    mediaUrl: 'https://example.com/audio/functional-groups.mp3',
    difficulty: 'hard',
    readTime: 10,
    examples: ['Alcohols contain -OH group', 'Carboxylic acids contain -COOH group'],
    relatedConcepts: ['IUPAC Nomenclature', 'Reaction Mechanisms', 'Isomerism'],
    completed: false
  }
];

const getMediaIcon = (mediaType: MediaType) => {
  switch (mediaType) {
    case 'video': return <Video className="text-blue-500" size={18} />;
    case 'audio': return <Headphones className="text-purple-500" size={18} />;
    case 'image': return <Image className="text-green-500" size={18} />;
    default: return <BookOpen className="text-amber-500" size={18} />;
  }
};

const getDifficultyColor = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const MicroConceptView = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'all' | 'today' | 'completed'>('today');
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<ConceptCard | null>(null);
  
  const filteredCards = sampleConceptCards.filter(card => {
    if (viewMode === 'completed') return card.completed;
    if (viewMode === 'today') return !card.completed;
    return true;
  }).filter(card => {
    if (filterSubject) return card.subject === filterSubject;
    return true;
  });
  
  const handleNextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  const handleMarkComplete = (cardId: string) => {
    // This would update the backend in a real implementation
    console.log(`Marked card ${cardId} as complete`);
  };
  
  // Get unique subjects for filtering
  const subjects = [...new Set(sampleConceptCards.map(card => card.subject))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Concept Cards</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="today" onValueChange={(value) => setViewMode(value as any)}>
            <TabsList>
              <TabsTrigger value="today">Today's Cards</TabsTrigger>
              <TabsTrigger value="all">All Cards</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Subject Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={filterSubject === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setFilterSubject(null)}
        >
          All Subjects
        </Badge>
        {subjects.map(subject => (
          <Badge 
            key={subject}
            variant={filterSubject === subject ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilterSubject(subject)}
          >
            {subject}
          </Badge>
        ))}
      </div>
      
      {filteredCards.length > 0 ? (
        <div className="relative">
          {/* Card Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft size={18} />
            </Button>
            <span className="text-sm text-gray-500">
              Card {currentCardIndex + 1} of {filteredCards.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextCard}
              disabled={currentCardIndex === filteredCards.length - 1}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
          
          {/* Current Card */}
          {filteredCards[currentCardIndex] && (
            <motion.div
              key={filteredCards[currentCardIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{filteredCards[currentCardIndex].title}</CardTitle>
                      <CardDescription className="flex items-center mt-2 gap-2">
                        <Badge>{filteredCards[currentCardIndex].subject}</Badge>
                        <Badge variant="outline">{filteredCards[currentCardIndex].examGoal}</Badge>
                        <Badge className={getDifficultyColor(filteredCards[currentCardIndex].difficulty)}>
                          {filteredCards[currentCardIndex].difficulty}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={14} />
                          {filteredCards[currentCardIndex].readTime} min read
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="p-2 rounded-full bg-white dark:bg-gray-800">
                        {getMediaIcon(filteredCards[currentCardIndex].mediaType)}
                      </div>
                      {filteredCards[currentCardIndex].completed && (
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <Check size={12} />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {filteredCards[currentCardIndex].description}
                    </p>
                  </div>
                  
                  {/* Media Content Based on Type */}
                  <div className="py-2">
                    <h4 className="font-medium mb-2">Content</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center h-48">
                      {filteredCards[currentCardIndex].mediaType === 'text' ? (
                        <p className="text-center text-gray-500">Text content available</p>
                      ) : filteredCards[currentCardIndex].mediaType === 'video' ? (
                        <div className="text-center">
                          <Video className="mx-auto text-blue-500 mb-2" size={32} />
                          <p className="text-sm text-gray-500">Video content available</p>
                        </div>
                      ) : filteredCards[currentCardIndex].mediaType === 'audio' ? (
                        <div className="text-center">
                          <Headphones className="mx-auto text-purple-500 mb-2" size={32} />
                          <p className="text-sm text-gray-500">Audio content available</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Image className="mx-auto text-green-500 mb-2" size={32} />
                          <p className="text-sm text-gray-500">Image content available</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Examples */}
                  <div>
                    <h4 className="font-medium mb-2">Examples</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {filteredCards[currentCardIndex].examples.map((example, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Related Concepts */}
                  <div>
                    <h4 className="font-medium mb-2">Related Concepts</h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredCards[currentCardIndex].relatedConcepts.map((concept, i) => (
                        <Badge key={i} variant="outline" className="cursor-pointer hover:bg-primary/10">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Analytics */}
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <LineChart size={16} className="text-blue-500" />
                      Concept Analysis
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This concept frequently appears in {filteredCards[currentCardIndex].examGoal} and is an essential building block for advanced topics.
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t px-6 py-4">
                  <div className="flex justify-between items-center w-full">
                    <Button variant="outline" className="gap-1">
                      <Star size={16} className="text-amber-500" />
                      Save for Later
                    </Button>
                    
                    {!filteredCards[currentCardIndex].completed && (
                      <Button 
                        onClick={() => handleMarkComplete(filteredCards[currentCardIndex].id)}
                        className="gap-1"
                      >
                        <Check size={16} />
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <BookOpen className="mx-auto text-gray-400" size={32} />
          <h3 className="mt-2 text-lg font-medium">No Concept Cards Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {viewMode === 'completed' ? "You haven't completed any concept cards yet." : 
             filterSubject ? `No cards available for ${filterSubject}` : 
             "No concept cards are available for today."}
          </p>
        </div>
      )}
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>
      <p>Flashcards content goes here</p>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Practice Exams</h2>
      <p>Practice exams content goes here</p>
    </div>
  );
};
