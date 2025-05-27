
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, X, Brain, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

const FlashcardInteractivePage: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [sessionComplete, setSessionComplete] = useState(false);

  // Mock flashcard data based on setId
  useEffect(() => {
    const mockFlashcards: FlashcardData[] = [
      {
        id: '1',
        question: 'What is Newton\'s First Law of Motion?',
        answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
        subject: 'Physics',
        difficulty: 'medium',
        explanation: 'This is also known as the Law of Inertia.'
      },
      {
        id: '2',
        question: 'What is the chemical formula for water?',
        answer: 'H₂O',
        subject: 'Chemistry',
        difficulty: 'easy',
        explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom.'
      },
      {
        id: '3',
        question: 'What is the powerhouse of the cell?',
        answer: 'Mitochondria',
        subject: 'Biology',
        difficulty: 'easy',
        explanation: 'Mitochondria produce ATP, the energy currency of the cell.'
      },
      {
        id: '4',
        question: 'What is the derivative of sin(x)?',
        answer: 'cos(x)',
        subject: 'Mathematics',
        difficulty: 'medium',
        explanation: 'The derivative of sine function is cosine function.'
      },
      {
        id: '5',
        question: 'What is Ohm\'s Law?',
        answer: 'V = IR (Voltage equals Current times Resistance)',
        subject: 'Physics',
        difficulty: 'medium',
        explanation: 'This fundamental law relates voltage, current, and resistance in electrical circuits.'
      }
    ];

    setFlashcards(mockFlashcards);
  }, [setId]);

  const currentCard = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
  const accuracy = flashcards.length > 0 ? (correctCount / Math.max(completedCards.size, 1)) * 100 : 0;

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    setCompletedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  const handleIncorrect = () => {
    setCompletedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setCompletedCards(new Set());
    setSessionComplete(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Session Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{correctCount}/{flashcards.length}</div>
                  <div className="text-sm text-blue-600">Correct Answers</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{accuracy.toFixed(0)}%</div>
                  <div className="text-sm text-purple-600">Accuracy</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(accuracy / 20) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  {accuracy >= 80 ? "Excellent work!" : 
                   accuracy >= 60 ? "Good job!" : 
                   "Keep practicing!"}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={handleRestart} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restart Session
                </Button>
                <Button onClick={() => navigate('/dashboard/student/flashcards')}>
                  Back to Flashcards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Loading flashcards...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/student/flashcards')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Flashcards
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
              {currentCard.difficulty}
            </Badge>
            <div className="text-sm text-gray-600">
              {currentIndex + 1} of {flashcards.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{correctCount}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{completedCards.size - correctCount}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{accuracy.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${showAnswer}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="min-h-[400px] cursor-pointer" onClick={handleFlipCard}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{currentCard.subject}</Badge>
                    <div className="text-sm text-gray-500">
                      Click to {showAnswer ? 'hide' : 'reveal'} answer
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    {!showAnswer ? (
                      <>
                        <h2 className="text-xl font-semibold mb-4">Question:</h2>
                        <p className="text-lg leading-relaxed">{currentCard.question}</p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl font-semibold mb-4 text-green-600">Answer:</h2>
                        <p className="text-lg leading-relaxed font-medium">{currentCard.answer}</p>
                        {currentCard.explanation && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>Explanation:</strong> {currentCard.explanation}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!showAnswer ? (
            <Button onClick={handleFlipCard} size="lg" className="px-8">
              Reveal Answer
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                onClick={handleIncorrect}
                variant="outline"
                size="lg"
                className="px-6 border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                Incorrect
              </Button>
              <Button
                onClick={handleCorrect}
                size="lg"
                className="px-6 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Correct
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            disabled={currentIndex === flashcards.length - 1 || !showAnswer}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardInteractivePage;
