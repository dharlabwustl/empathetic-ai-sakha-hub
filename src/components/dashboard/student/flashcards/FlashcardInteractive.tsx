
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { Clock, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight, Flag, BookOpen, Brain } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock flashcard data
const mockFlashcards = [
  {
    id: '1',
    front: "What is Newton's First Law of Motion?",
    back: "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
    difficulty: "medium",
    subject: "Physics",
    topic: "Laws of Motion"
  },
  {
    id: '2',
    front: "Define Atomic Number",
    back: "The atomic number of an element is the number of protons in the nucleus of each atom of that element.",
    difficulty: "easy",
    subject: "Chemistry",
    topic: "Atomic Structure"
  },
  {
    id: '3',
    front: "What is the Pythagorean Theorem?",
    back: "In a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides. a² + b² = c²",
    difficulty: "medium",
    subject: "Mathematics",
    topic: "Geometry"
  },
  {
    id: '4',
    front: "What are the primary functions of mitochondria?",
    back: "Mitochondria are primarily responsible for producing energy through cellular respiration. They convert nutrients into ATP, the energy currency of the cell.",
    difficulty: "hard",
    subject: "Biology",
    topic: "Cell Biology"
  },
  {
    id: '5',
    front: "What was the main cause of World War I?",
    back: "The assassination of Archduke Franz Ferdinand of Austria-Hungary in June 1914 is considered the immediate trigger, but underlying causes included militarism, alliances, imperialism, and nationalism.",
    difficulty: "medium",
    subject: "History",
    topic: "World Wars"
  }
];

// Mock deck data
const mockDeckInfo = {
  "physics": {
    name: "Physics Fundamentals",
    cardCount: 42,
    masteryLevel: 65,
    lastStudied: "2025-04-25"
  },
  "chemistry": {
    name: "Chemistry Basics",
    cardCount: 38,
    masteryLevel: 78,
    lastStudied: "2025-04-26"
  },
  "mathematics": {
    name: "Advanced Mathematics",
    cardCount: 56,
    masteryLevel: 59,
    lastStudied: "2025-04-24"
  },
  "biology": {
    name: "Biology Concepts",
    cardCount: 45,
    masteryLevel: 71,
    lastStudied: "2025-04-23"
  },
  "history": {
    name: "Important Historical Events",
    cardCount: 34,
    masteryLevel: 62,
    lastStudied: "2025-04-22"
  }
};

export default function FlashcardInteractive() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsStatus, setCardsStatus] = useState<Record<string, 'correct' | 'incorrect' | 'skipped' | null>>({});
  const [reviewMode, setReviewMode] = useState<'all' | 'incorrect' | 'marked'>('all');
  
  const deckInfo = deckId ? mockDeckInfo[deckId as keyof typeof mockDeckInfo] : null;
  const totalCards = mockFlashcards.length;
  const progress = (currentCardIndex / totalCards) * 100;
  const currentCard = mockFlashcards[currentCardIndex];
  
  const goToNextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Session complete logic
      setReviewMode('incorrect');
      // Could navigate to a results page here
    }
  };
  
  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };
  
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const markCard = (status: 'correct' | 'incorrect' | 'skipped') => {
    if (!currentCard) return;
    
    setCardsStatus(prev => ({
      ...prev,
      [currentCard.id]: status
    }));
    
    // Auto advance to next card
    goToNextCard();
  };
  
  const getCompletedCount = () => {
    return Object.values(cardsStatus).filter(status => status !== null).length;
  };
  
  const getCorrectCount = () => {
    return Object.values(cardsStatus).filter(status => status === 'correct').length;
  };
  
  return (
    <SharedPageLayout 
      title={deckInfo?.name || "Interactive Flashcards"}
      subtitle={`Study and master ${totalCards} flashcards with interactive learning`}
    >
      <div className="space-y-6">
        {/* Status and Controls Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Progress */}
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress: {Math.round(progress)}%</span>
              <span className="text-muted-foreground">{currentCardIndex + 1}/{totalCards} Cards</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Stats */}
          <div className="flex gap-3 flex-wrap justify-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <ThumbsUp className="h-3.5 w-3.5 mr-1" /> {getCorrectCount()} Correct
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
              <ThumbsDown className="h-3.5 w-3.5 mr-1" /> {Object.values(cardsStatus).filter(s => s === 'incorrect').length} Incorrect
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              <Clock className="h-3.5 w-3.5 mr-1" /> {getCompletedCount()}/{totalCards} Completed
            </Badge>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              Exit Session
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setReviewMode('incorrect')}
            >
              Review Incorrect
            </Button>
          </div>
        </div>
        
        {/* Flashcard */}
        {currentCard && (
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-full max-w-2xl cursor-pointer"
              onClick={handleCardFlip}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full min-h-[300px]">
                {/* Front of Card */}
                <div 
                  className={`absolute w-full h-full bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/40 dark:to-blue-950/40 rounded-xl p-6 shadow-lg border-2 border-violet-100 dark:border-violet-800/30 flex flex-col ${isFlipped ? 'backface-hidden' : ''}`}
                >
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      <BookOpen className="h-3 w-3 mr-1" /> {currentCard.subject}
                    </Badge>
                    <Badge variant="outline" className="mb-2 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      <Brain className="h-3 w-3 mr-1" /> {currentCard.topic}
                    </Badge>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <h3 className="text-xl font-medium text-center">{currentCard.front}</h3>
                  </div>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    <p>Click to reveal answer</p>
                  </div>
                </div>
                
                {/* Back of Card */}
                <div 
                  className={`absolute w-full h-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl p-6 shadow-lg border-2 border-amber-100 dark:border-amber-800/30 flex flex-col ${!isFlipped ? 'backface-hidden' : ''}`}
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                      Answer
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`mb-2 ${
                        currentCard.difficulty === 'easy' 
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                          : currentCard.difficulty === 'medium'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-lg text-center">{currentCard.back}</p>
                  </div>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    <p>How well did you know this?</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Card Navigation & Response Controls */}
            <div className="mt-6 w-full max-w-2xl">
              {/* Navigation Arrows */}
              <div className="flex justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPrevCard}
                  disabled={currentCardIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextCard}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              {/* Response Buttons - Only shown when card is flipped */}
              <div className={`grid grid-cols-3 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <Button 
                  variant="outline" 
                  className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-700/30 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                  onClick={() => markCard('incorrect')}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" /> Didn't Know
                </Button>
                <Button 
                  variant="outline"
                  className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                  onClick={() => markCard('skipped')}
                >
                  <Flag className="h-4 w-4 mr-2" /> Partially Knew
                </Button>
                <Button 
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-700/30 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                  onClick={() => markCard('correct')}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" /> Knew It
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Study Tips */}
        <Card className="bg-blue-50/50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-800/30">
          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium">Study Tips</h3>
            <ul className="text-sm space-y-1">
              <li>• Try to answer each card before flipping it</li>
              <li>• If you're struggling with a card, mark it for review</li>
              <li>• Take breaks every 20-25 minutes for better retention</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
}
