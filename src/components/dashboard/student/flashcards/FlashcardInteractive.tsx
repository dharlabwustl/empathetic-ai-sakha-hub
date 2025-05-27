
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle, 
  X,
  Eye,
  EyeOff,
  Star,
  Timer,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

const FlashcardInteractive: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [needsReview, setNeedsReview] = useState<Set<string>>(new Set());
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    totalTime: 0
  });

  // Mock flashcard data
  const flashcards: FlashcardData[] = [
    {
      id: '1',
      question: 'What is Newton\'s First Law of Motion?',
      answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
      difficulty: 'medium',
      subject: 'Physics',
      topic: 'Mechanics'
    },
    {
      id: '2',
      question: 'Define acceleration',
      answer: 'Acceleration is the rate of change of velocity with respect to time. It is a vector quantity measured in m/s².',
      difficulty: 'easy',
      subject: 'Physics',
      topic: 'Mechanics'
    },
    {
      id: '3',
      question: 'What is the formula for kinetic energy?',
      answer: 'KE = ½mv², where m is mass and v is velocity',
      difficulty: 'medium',
      subject: 'Physics',
      topic: 'Energy'
    }
  ];

  const currentCard = flashcards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleMarkMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard.id);
    setMasteredCards(newMastered);
    setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    handleNext();
  };

  const handleMarkReview = () => {
    const newReview = new Set(needsReview);
    newReview.add(currentCard.id);
    setNeedsReview(newReview);
    setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Interactive Flashcards
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Master concepts with spaced repetition</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-white shadow-sm">
              Card {currentCardIndex + 1} of {flashcards.length}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
              {currentCard.difficulty}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-700">{sessionStats.correct}</span>
              </div>
              <p className="text-sm text-green-600">Mastered</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-700">{sessionStats.incorrect}</span>
              </div>
              <p className="text-sm text-orange-600">Review Later</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-700">{masteredCards.size}</span>
              </div>
              <p className="text-sm text-blue-600">Total Mastered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Flashcard */}
        <div className="relative">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="min-h-[400px] cursor-pointer shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                  onClick={handleFlip}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    {currentCard.subject} - {currentCard.topic}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
                    {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <AnimatePresence mode="wait">
                  {!showAnswer ? (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="text-center py-8">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Question</div>
                        <p className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
                          {currentCard.question}
                        </p>
                      </div>
                      
                      <div className="text-center pt-8">
                        <Button onClick={handleFlip} className="bg-blue-600 hover:bg-blue-700">
                          <Eye className="h-4 w-4 mr-2" />
                          Show Answer
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Answer</div>
                        <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                          {currentCard.answer}
                        </p>
                      </div>
                      
                      <div className="flex justify-center gap-4 pt-6">
                        <Button 
                          onClick={(e) => { e.stopPropagation(); handleMarkReview(); }}
                          variant="outline" 
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Need Review
                        </Button>
                        <Button 
                          onClick={(e) => { e.stopPropagation(); handleMarkMastered(); }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mastered
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentCardIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setCurrentCardIndex(0)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
          
          <Button 
            onClick={handleNext} 
            disabled={currentCardIndex === flashcards.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <style>
        {`
          .flashcard-3d {
            perspective: 1000px;
          }
          .flashcard-inner {
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
          .flashcard-flipped {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
};

export default FlashcardInteractive;
