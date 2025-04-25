
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, ArrowRight, ArrowLeft, BookOpen, Brain, Check, X, BookmarkPlus, Volume2, VolumeX, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useUserProfile } from '@/hooks/useUserProfile';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isImage?: boolean;
  lastShown?: Date;
  mastered?: boolean;
  timesCorrect?: number;
  timesIncorrect?: number;
  interval?: number; // For spaced repetition
}

const FlashcardsFeature = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState('today');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  // Mock flashcards data - in a real app, this would come from an API
  const mockFlashcards: Record<string, Flashcard[]> = {
    today: [
      { id: 'f1', front: 'What is Newton\'s First Law?', back: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.', subject: 'Physics', topic: 'Mechanics', difficulty: 'medium', timesCorrect: 2, timesIncorrect: 1, interval: 2 },
      { id: 'f2', front: 'What is the formula for kinetic energy?', back: 'KE = (1/2)mv²', subject: 'Physics', topic: 'Energy', difficulty: 'easy', timesCorrect: 3, timesIncorrect: 0, interval: 4 },
      { id: 'f3', front: 'Define pH scale', back: 'The pH scale measures how acidic or basic a solution is. It ranges from 0 to 14, with 7 being neutral. Values less than 7 are acidic, and values greater than 7 are basic.', subject: 'Chemistry', topic: 'Acid-Base', difficulty: 'medium', timesCorrect: 1, timesIncorrect: 2, interval: 1 }
    ],
    recent: [
      { id: 'f4', front: 'What is the function of mitochondria?', back: 'Mitochondria are the powerhouse of the cell, responsible for producing most of the cell\'s supply of ATP through cellular respiration.', subject: 'Biology', topic: 'Cell Biology', difficulty: 'medium', timesCorrect: 4, timesIncorrect: 1, interval: 7 },
      { id: 'f5', front: 'What is integration in calculus?', back: 'Integration is the process of finding the integral or antiderivative of a function. It's the reverse process of differentiation and is used to calculate areas, volumes, and more.', subject: 'Mathematics', topic: 'Calculus', difficulty: 'hard', timesCorrect: 2, timesIncorrect: 3, interval: 1 }
    ],
    mastered: [
      { id: 'f6', front: 'What is the speed of light?', back: 'The speed of light in vacuum is approximately 3 x 10⁸ meters per second or 299,792,458 meters per second.', subject: 'Physics', topic: 'Waves', difficulty: 'easy', timesCorrect: 5, timesIncorrect: 0, interval: 14, mastered: true },
      { id: 'f7', front: 'What are the first 10 elements of the periodic table?', back: '1. Hydrogen (H)\n2. Helium (He)\n3. Lithium (Li)\n4. Beryllium (Be)\n5. Boron (B)\n6. Carbon (C)\n7. Nitrogen (N)\n8. Oxygen (O)\n9. Fluorine (F)\n10. Neon (Ne)', subject: 'Chemistry', topic: 'Periodic Table', difficulty: 'medium', timesCorrect: 8, timesIncorrect: 1, interval: 30, mastered: true }
    ],
    review: [
      { id: 'f8', front: 'What is the quadratic formula?', back: 'x = (-b ± √(b² - 4ac)) / 2a', subject: 'Mathematics', topic: 'Algebra', difficulty: 'medium', timesCorrect: 1, timesIncorrect: 3, interval: 1 },
      { id: 'f9', front: 'What is the difference between DNA and RNA?', back: 'DNA: double-stranded, has deoxyribose sugar, uses thymine, stores genetic information\nRNA: single-stranded, has ribose sugar, uses uracil instead of thymine, helps in protein synthesis', subject: 'Biology', topic: 'Genetics', difficulty: 'hard', timesCorrect: 0, timesIncorrect: 2, interval: 1 }
    ]
  };

  const allFlashcards = [...mockFlashcards.today, ...mockFlashcards.recent, ...mockFlashcards.review, ...mockFlashcards.mastered];
  const groupedBySubject: Record<string, Flashcard[]> = {};
  
  allFlashcards.forEach(card => {
    if (!groupedBySubject[card.subject]) {
      groupedBySubject[card.subject] = [];
    }
    groupedBySubject[card.subject].push(card);
  });

  const currentCards = mockFlashcards[activeTab] || [];
  const currentCard = currentCards[currentIndex] || null;
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCards.length);
  };
  
  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentCards.length) % currentCards.length);
  };
  
  const handleResult = (correct: boolean) => {
    toast({
      title: correct ? "Correct!" : "Incorrect",
      description: correct ? "Keep up the good work!" : "Don't worry, you'll get it next time!",
      variant: correct ? "default" : "destructive",
    });
    
    if (currentIndex < currentCards.length - 1) {
      setTimeout(() => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1000);
    } else {
      setFlipped(false);
      setTimeout(() => {
        toast({
          title: "Review Complete",
          description: "You've completed this flashcard set!",
        });
      }, 1000);
    }
  };
  
  const handleBookmark = () => {
    toast({
      title: "Flashcard Bookmarked",
      description: "This flashcard has been added to your bookmarks",
    });
  };
  
  const toggleReading = () => {
    if (!currentCard) return;
    
    if (isReading) {
      // Stop reading
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
    } else {
      // Start reading
      if (window.speechSynthesis) {
        const textToRead = flipped ? currentCard.back : currentCard.front;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        // Try to set Indian English voice if available
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(voice => 
          voice.lang === 'en-IN' || 
          voice.name.includes('Indian') ||
          voice.name.includes('Hindi')
        );
        
        if (indianVoice) {
          utterance.voice = indianVoice;
        }
        
        utterance.rate = 0.9; // slightly slower
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-indigo-600" />
            Flashcard Study
          </h2>
          <p className="text-gray-600">
            Memorize key concepts for your {examGoal} preparation
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {allFlashcards.length} Flashcards Available
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw size={14} className="mr-1" />
            Shuffle
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="today">Today's Cards ({mockFlashcards.today.length})</TabsTrigger>
            <TabsTrigger value="recent">Recent ({mockFlashcards.recent.length})</TabsTrigger>
            <TabsTrigger value="review">Need Review ({mockFlashcards.review.length})</TabsTrigger>
            <TabsTrigger value="mastered">Mastered ({mockFlashcards.mastered.length})</TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Subject Distribution</h3>
                {Object.entries(groupedBySubject).map(([subject, cards]) => (
                  <div key={subject} className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>{subject}</span>
                      <span>{cards.length} cards</span>
                    </div>
                    <Progress value={(cards.length / allFlashcards.length) * 100} className="h-1 mt-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Mastery Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mastered</span>
                    <span>{mockFlashcards.mastered.length} cards</span>
                  </div>
                  <Progress 
                    value={(mockFlashcards.mastered.length / allFlashcards.length) * 100} 
                    className="h-2 bg-gray-100" 
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((mockFlashcards.mastered.length / allFlashcards.length) * 100)}% mastery achieved
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Spaced Repetition</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Upcoming reviews based on your retention pattern
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Today</span>
                    <span>{mockFlashcards.today.length + mockFlashcards.review.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tomorrow</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span>12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <TabsContent value="today" className="mt-4">
          {renderFlashcardContent(mockFlashcards.today)}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          {renderFlashcardContent(mockFlashcards.recent)}
        </TabsContent>
        
        <TabsContent value="review" className="mt-4">
          {renderFlashcardContent(mockFlashcards.review)}
        </TabsContent>
        
        <TabsContent value="mastered" className="mt-4">
          {renderFlashcardContent(mockFlashcards.mastered)}
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderFlashcardContent(cards: Flashcard[]) {
    if (cards.length === 0) {
      return (
        <Card className="bg-gray-50">
          <CardContent className="p-8 text-center">
            <BookOpen className="mx-auto text-gray-400 mb-3" size={32} />
            <h3 className="text-lg font-medium mb-1">No flashcards available</h3>
            <p className="text-gray-500 mb-4">
              Complete more concept cards to unlock flashcards
            </p>
            <Button asChild>
              <Link to="/dashboard/student/concepts/all">
                View Concept Cards
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    const card = cards[currentIndex];
    if (!card) return null;
    
    return (
      <div className="flex flex-col items-center">
        {/* Flashcard */}
        <div className="w-full max-w-2xl mb-6">
          <div className="mb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={
                card.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                card.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }>
                {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {card.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {card.topic}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              {currentIndex + 1} of {cards.length}
            </div>
          </div>

          {/* Card itself */}
          <div 
            className="relative w-full h-64 cursor-pointer"
            onClick={handleFlip}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={flipped ? 'back' : 'front'}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 w-full h-full bg-white border rounded-xl p-6 flex flex-col ${
                  flipped ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-500 font-medium">
                    {flipped ? 'ANSWER' : 'QUESTION'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark();
                      }}
                    >
                      <BookmarkPlus size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReading();
                      }}
                    >
                      {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                  </div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-center text-lg">
                    {flipped ? card.back : card.front}
                  </p>
                </div>
                <div className="mt-4 text-sm text-center text-gray-500">
                  Tap to {flipped ? 'see question' : 'reveal answer'}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevious} disabled={cards.length <= 1}>
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </Button>
            <div className="flex gap-2">
              {flipped && (
                <>
                  <Button 
                    variant="outline" 
                    className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                    onClick={() => handleResult(false)}
                  >
                    <X size={16} className="mr-1" />
                    Didn't Know
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleResult(true)}
                  >
                    <Check size={16} className="mr-1" />
                    Got It
                  </Button>
                </>
              )}
            </div>
            <Button variant="outline" onClick={handleNext} disabled={cards.length <= 1}>
              Next
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>

          {/* Feedback buttons if card is flipped */}
          {flipped && (
            <div className="mt-4 flex justify-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsDown size={14} className="mr-1" />
                Too Hard
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp size={14} className="mr-1" />
                Just Right
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

// Type definitions
interface Link {
  href: string;
  label: string;
}

export default FlashcardsFeature;
