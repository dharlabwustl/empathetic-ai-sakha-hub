
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RotateCcw, CheckCircle, X, Brain, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
}

const InteractiveFlashcardsPage: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  
  // Mock flashcard data
  const [flashcards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'What is Newton\'s First Law of Motion?',
      back: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
      difficulty: 'medium',
      mastered: false
    },
    {
      id: '2', 
      front: 'Define Photosynthesis',
      back: 'The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.',
      difficulty: 'easy',
      mastered: false
    },
    {
      id: '3',
      front: 'What is the chemical formula for water?',
      back: 'H₂O - Two hydrogen atoms bonded to one oxygen atom.',
      difficulty: 'easy',
      mastered: true
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState(new Set<string>());

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleMarkAsKnown = () => {
    setCompletedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  const handleMarkAsUnknown = () => {
    setCompletedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Flashcards
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Interactive Flashcards</h1>
              <p className="text-gray-600 dark:text-gray-400">Set ID: {setId}</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            {completedCards.size}/{flashcards.length} Completed
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{currentIndex + 1} of {flashcards.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-2 min-h-[400px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Question {currentIndex + 1}
                  </CardTitle>
                  <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="min-h-[150px] flex items-center justify-center">
                    <p className="text-lg font-medium text-center">
                      {showAnswer ? currentCard.back : currentCard.front}
                    </p>
                  </div>
                  
                  {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)} className="w-full">
                      Show Answer
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        How well did you know this?
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button 
                          variant="outline" 
                          onClick={handleMarkAsUnknown}
                          className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                          Need Practice
                        </Button>
                        <Button 
                          onClick={handleMarkAsKnown}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Got It!
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => {
              setCurrentIndex(0);
              setShowAnswer(false);
              setCompletedCards(new Set());
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
          >
            Next
          </Button>
        </div>

        {/* Completion Status */}
        {currentIndex === flashcards.length - 1 && showAnswer && (
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                Great Job!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                You've completed this flashcard set. 
                You got {completedCards.size} out of {flashcards.length} cards right!
              </p>
              <Button onClick={() => navigate('/dashboard/student/flashcards')}>
                Return to Flashcards
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InteractiveFlashcardsPage;
