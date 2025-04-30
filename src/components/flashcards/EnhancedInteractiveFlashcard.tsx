
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  subject: string;
  chapter: string;
}

const EnhancedInteractiveFlashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'correct' | 'incorrect' | null>(null);
  
  // Mock flashcard data
  const flashcards: FlashcardData[] = [
    {
      id: '1',
      question: 'What is Newton\'s First Law of Motion?',
      answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
      difficulty: 'medium',
      tags: ['Physics', 'Mechanics', 'Laws of Motion'],
      subject: 'Physics',
      chapter: 'Mechanics'
    },
    {
      id: '2',
      question: 'What is the chemical formula for Sodium Chloride?',
      answer: 'NaCl',
      difficulty: 'easy',
      tags: ['Chemistry', 'Chemical Formulas', 'Compounds'],
      subject: 'Chemistry',
      chapter: 'Periodic Table'
    },
    {
      id: '3',
      question: 'What is the value of π (pi) to 5 decimal places?',
      answer: '3.14159',
      difficulty: 'medium',
      tags: ['Mathematics', 'Constants', 'Geometry'],
      subject: 'Mathematics',
      chapter: 'Constants'
    },
    {
      id: '4',
      question: 'What organelle is known as the "powerhouse of the cell"?',
      answer: 'Mitochondria',
      difficulty: 'easy',
      tags: ['Biology', 'Cell Biology', 'Organelles'],
      subject: 'Biology',
      chapter: 'Cell Biology'
    },
    {
      id: '5',
      question: 'What is the integral of sin(x)?',
      answer: '-cos(x) + C',
      difficulty: 'hard',
      tags: ['Mathematics', 'Calculus', 'Integration'],
      subject: 'Mathematics',
      chapter: 'Calculus'
    }
  ];

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setUserAnswer(null);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setUserAnswer(null);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setUserAnswer(isCorrect ? 'correct' : 'incorrect');
  };

  const handleReset = () => {
    setIsFlipped(false);
    setUserAnswer(null);
    setCurrentIndex(0);
  };

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Card {currentIndex + 1} of {flashcards.length}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[currentCard.difficulty]}`}>
            {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <motion.div 
        className="perspective-1000 relative" 
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div 
          className={`w-full h-[400px] md:h-[450px] rounded-2xl shadow-lg ${
            isFlipped ? 'bg-indigo-50 dark:bg-indigo-950' : 'bg-white dark:bg-gray-800'
          } p-8 flex flex-col justify-between`}
          initial={false}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            backgroundColor: isFlipped ? '#eef2ff' : '#ffffff'
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Front of the card (Question) */}
          <div className={`absolute inset-0 p-8 transition-opacity duration-300 flex flex-col ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-semibold text-sm text-purple-600 dark:text-purple-400">{currentCard.subject}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="font-medium text-sm text-gray-500">{currentCard.chapter}</span>
              </div>
              <div className="flex gap-1">
                {currentCard.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Question:</h3>
            <div className="text-lg flex-1 flex items-center justify-center">
              <p className="text-center font-medium">{currentCard.question}</p>
            </div>
            <div className="mt-auto pt-4">
              <Button 
                variant="default" 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                onClick={handleFlip}
              >
                Show Answer
              </Button>
            </div>
          </div>

          {/* Back of the card (Answer) */}
          <div 
            className={`absolute inset-0 p-8 transition-opacity duration-300 flex flex-col ${!isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Answer:</h3>
            <div className="text-lg flex-1 flex items-center justify-center">
              <p className="text-center font-medium">{currentCard.answer}</p>
            </div>
            <div className="mt-auto pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant={userAnswer === 'incorrect' ? 'default' : 'outline'} 
                  className={userAnswer === 'incorrect' ? 'bg-red-500 hover:bg-red-600' : ''}
                  onClick={() => handleAnswer(false)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Incorrect
                </Button>
                <Button 
                  variant={userAnswer === 'correct' ? 'default' : 'outline'} 
                  className={userAnswer === 'correct' ? 'bg-green-500 hover:bg-green-600' : ''}
                  onClick={() => handleAnswer(true)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Correct
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrev}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex space-x-2">
          {flashcards.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedInteractiveFlashcard;
