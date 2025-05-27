
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Brain,
  Clock,
  Star,
  Trophy
} from 'lucide-react';

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  mastered: boolean;
}

const FlashcardInteractive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  // Mock flashcard data
  const flashcardSet = {
    id: parseInt(id || '1'),
    title: "Physics Formulas & Constants",
    subject: "Physics",
    cards: [
      {
        id: 1,
        front: "What is Newton's Second Law of Motion?",
        back: "F = ma (Force equals mass times acceleration)",
        difficulty: "Medium" as const,
        mastered: false
      },
      {
        id: 2,
        front: "What is the speed of light in vacuum?",
        back: "c = 299,792,458 m/s (approximately 3 × 10⁸ m/s)",
        difficulty: "Easy" as const,
        mastered: false
      },
      {
        id: 3,
        front: "State the Law of Conservation of Energy",
        back: "Energy cannot be created or destroyed, only converted from one form to another. The total energy in an isolated system remains constant.",
        difficulty: "Hard" as const,
        mastered: false
      }
    ] as FlashcardData[]
  };

  const currentCard = flashcardSet.cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / flashcardSet.cards.length) * 100;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastery = (mastered: boolean) => {
    const newMasteredCards = new Set(masteredCards);
    if (mastered) {
      newMasteredCards.add(currentCard.id);
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      newMasteredCards.delete(currentCard.id);
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setMasteredCards(newMasteredCards);
    setSessionStats(prev => ({ ...prev, total: prev.total + 1 }));
    
    // Move to next card after a short delay
    setTimeout(() => {
      if (currentCardIndex < flashcardSet.cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      }
    }, 500);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/student/flashcards')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Flashcards
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{flashcardSet.title}</h1>
            <Badge variant="secondary" className="mt-1">{flashcardSet.subject}</Badge>
          </div>
          
          <Button
            variant="outline"
            onClick={resetSession}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Progress Section */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span className="font-medium">Progress</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <span>{sessionStats.correct}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-red-300" />
                  <span>{sessionStats.incorrect}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-300" />
                  <span>{masteredCards.size}/{flashcardSet.cards.length}</span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="text-sm text-purple-100">
              Card {currentCardIndex + 1} of {flashcardSet.cards.length}
            </div>
          </CardHeader>
        </Card>

        {/* Flashcard */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-full max-w-2xl h-96 perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full preserve-3d cursor-pointer"
                onClick={handleCardFlip}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <Card className="absolute inset-0 backface-hidden bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                        {currentCard.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-purple-600">
                        <Star className="h-4 w-4" />
                        <span className="text-sm font-medium">Front</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-800 leading-relaxed">
                      {currentCard.front}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center pt-8">
                    <p className="text-gray-600 text-center">Click to reveal answer</p>
                  </CardContent>
                </Card>

                {/* Back of card */}
                <Card 
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                        {currentCard.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Brain className="h-4 w-4" />
                        <span className="text-sm font-medium">Answer</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {currentCard.back}
                      </p>
                    </div>
                    
                    {/* Mastery Buttons */}
                    <div className="flex gap-4 justify-center pt-4">
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMastery(false);
                        }}
                        className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Need Review
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMastery(true);
                        }}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Got It!
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Session Complete */}
        {currentCardIndex >= flashcardSet.cards.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8">
              <div className="space-y-4">
                <Trophy className="h-16 w-16 mx-auto text-yellow-300" />
                <h2 className="text-3xl font-bold">Session Complete!</h2>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{sessionStats.correct}</div>
                    <div className="text-sm text-green-200">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{sessionStats.incorrect}</div>
                    <div className="text-sm text-red-200">Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{Math.round((sessionStats.correct / sessionStats.total) * 100)}%</div>
                    <div className="text-sm text-blue-200">Accuracy</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetSession}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    Study Again
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard/student/flashcards')}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Back to Flashcards
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardInteractive;
