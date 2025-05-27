
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  mastery: number;
}

const FlashcardInteractive = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [strugglingCards, setStrugglingCards] = useState<Set<string>>(new Set());

  // Mock flashcard data
  const flashcards: Flashcard[] = [
    {
      id: '1',
      question: 'What is Newton\'s First Law of Motion?',
      answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
      subject: 'Physics',
      difficulty: 'Medium',
      mastery: 75
    },
    {
      id: '2',
      question: 'What is the molecular formula for benzene?',
      answer: 'C₆H₆ - Benzene consists of six carbon atoms arranged in a ring with alternating double bonds.',
      subject: 'Chemistry',
      difficulty: 'Easy',
      mastery: 90
    },
    {
      id: '3',
      question: 'What is photosynthesis?',
      answer: 'The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.',
      subject: 'Biology',
      difficulty: 'Medium',
      mastery: 60
    }
  ];

  const currentCard = flashcards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / flashcards.length) * 100;

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleMarkMastered = () => {
    setMasteredCards(prev => new Set([...prev, currentCard.id]));
    handleNextCard();
  };

  const handleMarkStruggling = () => {
    setStrugglingCards(prev => new Set([...prev, currentCard.id]));
    handleNextCard();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/student/flashcards')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Flashcards
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Interactive Flashcards
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Set {setId}</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentCardIndex(0)}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{currentCardIndex + 1} of {flashcards.length}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Flashcard */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="min-h-[400px] shadow-xl border-2 hover:shadow-2xl transition-shadow">
              <CardHeader className="text-center border-b">
                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <CardTitle className="text-xl">{currentCard.subject}</CardTitle>
                  <Badge variant="outline">
                    Mastery: {currentCard.mastery}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Question
                      </h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {currentCard.question}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="border-t pt-6"
                      >
                        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                          Answer
                        </h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentCard.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Actions */}
                  <div className="flex justify-center gap-4 pt-6">
                    {!showAnswer ? (
                      <Button 
                        onClick={() => setShowAnswer(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                      >
                        <Eye className="h-5 w-5 mr-2" />
                        Show Answer
                      </Button>
                    ) : (
                      <div className="flex gap-4">
                        <Button 
                          onClick={handleMarkStruggling}
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50 px-6 py-3"
                        >
                          <XCircle className="h-5 w-5 mr-2" />
                          Need Practice
                        </Button>
                        <Button 
                          onClick={handleMarkMastered}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Got It!
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCardIndex(index);
                    setShowAnswer(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentCardIndex 
                      ? 'bg-blue-500' 
                      : index < currentCardIndex 
                        ? 'bg-green-400' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={handleNextCard}
              disabled={currentCardIndex === flashcards.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Session Summary */}
          {currentCardIndex === flashcards.length - 1 && showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Session Complete!</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{flashcards.length}</p>
                      <p className="text-sm text-gray-600">Total Cards</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{masteredCards.size}</p>
                      <p className="text-sm text-gray-600">Mastered</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{strugglingCards.size}</p>
                      <p className="text-sm text-gray-600">Need Practice</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/dashboard/student/flashcards')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Back to Flashcard Hub
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardInteractive;
