
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  X, 
  Star,
  BookOpen,
  Clock,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

const FlashcardInteractivePage: React.FC = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState(new Set<string>());
  const [reviewCards, setReviewCards] = useState(new Set<string>());
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    totalTime: 0
  });
  const [startTime] = useState(Date.now());

  // Mock flashcard data
  const flashcardSet = {
    id: setId || '1',
    title: 'Physics - Laws of Motion',
    subject: 'Physics',
    totalCards: 25,
    flashcards: [
      {
        id: '1',
        question: 'What is Newton\'s First Law of Motion?',
        answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
        subject: 'Physics',
        difficulty: 'medium' as const,
        tags: ['Newton', 'Laws of Motion', 'Inertia']
      },
      {
        id: '2',
        question: 'State Newton\'s Second Law of Motion',
        answer: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma',
        subject: 'Physics',
        difficulty: 'medium' as const,
        tags: ['Newton', 'Force', 'Acceleration']
      },
      {
        id: '3',
        question: 'What is Newton\'s Third Law of Motion?',
        answer: 'For every action, there is an equal and opposite reaction.',
        subject: 'Physics',
        difficulty: 'easy' as const,
        tags: ['Newton', 'Action-Reaction', 'Forces']
      },
      {
        id: '4',
        question: 'Define momentum in physics',
        answer: 'Momentum is the product of an object\'s mass and velocity. p = mv. It is a vector quantity.',
        subject: 'Physics',
        difficulty: 'medium' as const,
        tags: ['Momentum', 'Mass', 'Velocity']
      },
      {
        id: '5',
        question: 'What is the law of conservation of momentum?',
        answer: 'The total momentum of a system remains constant if no external forces act on it.',
        subject: 'Physics',
        difficulty: 'hard' as const,
        tags: ['Conservation', 'Momentum', 'System']
      }
    ]
  };

  const currentCard = flashcardSet.flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcardSet.flashcards.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        totalTime: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcardSet.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMastered = () => {
    setMasteredCards(prev => new Set([...prev, currentCard.id]));
    setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    handleNext();
  };

  const handleNeedsReview = () => {
    setReviewCards(prev => new Set([...prev, currentCard.id]));
    setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard/student/flashcards')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Flashcards
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{flashcardSet.title}</h1>
              <p className="text-gray-600">Interactive Study Session</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(sessionStats.totalTime)}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              <Brain className="h-3 w-3 mr-1" />
              {currentIndex + 1} / {flashcardSet.flashcards.length}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-green-700">{sessionStats.correct}</span>
              </div>
              <p className="text-sm text-green-600">Mastered</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <X className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold text-red-700">{sessionStats.incorrect}</span>
              </div>
              <p className="text-sm text-red-600">Need Review</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold text-blue-700">
                  {Math.round(sessionStats.correct / (sessionStats.correct + sessionStats.incorrect || 1) * 100)}%
                </span>
              </div>
              <p className="text-sm text-blue-600">Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard */}
        <div className="mb-6">
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full h-96 cursor-pointer"
            onClick={handleFlip}
          >
            {/* Front of card */}
            <Card 
              className={`absolute inset-0 w-full h-full shadow-lg hover:shadow-xl transition-shadow ${
                isFlipped ? 'invisible' : 'visible'
              }`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{currentCard.subject}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    {currentCard.question}
                  </h2>
                  <p className="text-gray-500 text-sm">Click to reveal answer</p>
                </div>
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card 
              className={`absolute inset-0 w-full h-full shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 ${
                isFlipped ? 'visible' : 'invisible'
              }`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Answer
                  </Badge>
                  <div className="flex flex-wrap gap-1">
                    {currentCard.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleFlip}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Flip Card
            </Button>
            
            {isFlipped && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleNeedsReview}
                >
                  <X className="h-4 w-4 mr-2" />
                  Need Review
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleMastered}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mastered
                </Button>
              </div>
            )}
          </div>

          <Button 
            variant="outline" 
            onClick={handleNext}
            disabled={currentIndex === flashcardSet.flashcards.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Completion Message */}
        {currentIndex === flashcardSet.flashcards.length - 1 && isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  🎉 Session Complete!
                </h3>
                <p className="text-green-600 mb-4">
                  Great job! You've reviewed all {flashcardSet.flashcards.length} flashcards.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/dashboard/student/flashcards')}>
                    Back to Flashcards
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Review Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardInteractivePage;
