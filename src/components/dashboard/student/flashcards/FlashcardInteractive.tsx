
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, X, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlashcardInteractive: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Mock flashcard data
  const flashcards = [
    {
      id: 1,
      question: "What is Newton's First Law of Motion?",
      answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
      subject: "Physics",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "What is the chemical formula for water?",
      answer: "H₂O - Two hydrogen atoms bonded to one oxygen atom",
      subject: "Chemistry",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is photosynthesis?",
      answer: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water, releasing oxygen as a byproduct.",
      subject: "Biology",
      difficulty: "Medium"
    }
  ];

  const progress = ((currentCard + 1) / flashcards.length) * 100;

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Interactive Flashcards</h1>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="bg-white">
              Card {currentCard + 1} of {flashcards.length}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(flashcards[currentCard].difficulty)}>
              {flashcards[currentCard].difficulty}
            </Badge>
            <Badge variant="outline" className="bg-white">
              {flashcards[currentCard].subject}
            </Badge>
          </div>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-2xl h-96 perspective-1000"
            initial={false}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card (Question) */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white shadow-xl border-2 border-purple-200">
                <CardHeader className="text-center bg-gradient-to-r from-purple-100 to-blue-100">
                  <CardTitle className="flex items-center justify-center gap-2 text-purple-700">
                    <Brain className="h-6 w-6" />
                    Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full p-8">
                  <p className="text-xl text-center text-gray-800 leading-relaxed">
                    {flashcards[currentCard].question}
                  </p>
                </CardContent>
              </Card>

              {/* Back of card (Answer) */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white shadow-xl border-2 border-green-200" 
                    style={{ transform: 'rotateY(180deg)' }}>
                <CardHeader className="text-center bg-gradient-to-r from-green-100 to-teal-100">
                  <CardTitle className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    Answer
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full p-8">
                  <p className="text-lg text-center text-gray-800 leading-relaxed">
                    {flashcards[currentCard].answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            onClick={prevCard}
            disabled={currentCard === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={flipCard}
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <RotateCcw className="h-4 w-4" />
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </Button>
          
          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentCard === flashcards.length - 1}
            className="gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Study Actions */}
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4"
          >
            <Button variant="outline" className="gap-2 border-red-200 text-red-700 hover:bg-red-50">
              <X className="h-4 w-4" />
              Need More Practice
            </Button>
            <Button variant="outline" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
              <CheckCircle className="h-4 w-4" />
              Got It Right
            </Button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlashcardInteractive;
