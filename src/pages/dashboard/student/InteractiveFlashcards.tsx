
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Check, 
  X,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FlashcardVoiceAssistant from '@/components/voice/FlashcardVoiceAssistant';

const InteractiveFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [reviewLaterCards, setReviewLaterCards] = useState<string[]>([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Mock flashcard data
  const flashcards = [
    {
      id: '1',
      front: "What is the derivative of sin(x)?",
      back: "cos(x)",
      subject: "Mathematics",
      difficulty: "Easy"
    },
    {
      id: '2',
      front: "What is Newton's Second Law?",
      back: "F = ma (Force equals mass times acceleration)",
      subject: "Physics",
      difficulty: "Medium"
    },
    {
      id: '3',
      front: "What is the chemical formula for water?",
      back: "H₂O (Two hydrogen atoms and one oxygen atom)",
      subject: "Chemistry",
      difficulty: "Easy"
    },
    {
      id: '4',
      front: "What is the quadratic formula?",
      back: "x = (-b ± √(b² - 4ac)) / 2a",
      subject: "Mathematics",
      difficulty: "Hard"
    }
  ];

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / totalCards) * 100;
  const studyProgress = ((knownCards.length + reviewLaterCards.length) / totalCards) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 150);
    }
  };

  const handleKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id]);
    }
    handleNext();
  };

  const handleReviewLater = () => {
    if (!reviewLaterCards.includes(currentCard.id)) {
      setReviewLaterCards([...reviewLaterCards, currentCard.id]);
    }
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setReviewLaterCards([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Review and master key concepts with smart flashcards"
      showBackButton={true}
      backButtonUrl="/dashboard/student/flashcards"
    >
      <Helmet>
        <title>Interactive Flashcards - PREPZR</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Voice Assistant */}
        <div className="flex justify-end">
          <FlashcardVoiceAssistant 
            flashcardData={currentCard}
            userName="Student"
            isEnabled={true}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFlip={handleFlip}
          />
        </div>

        {/* Header with Progress */}
        <Card className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Flashcard Review</h2>
                  <p className="text-purple-100">Card {currentIndex + 1} of {totalCards}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-100">Study Progress</p>
                <p className="text-2xl font-bold">{Math.round(studyProgress)}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-purple-100">
                <span>Progress through deck</span>
                <span>{currentIndex + 1}/{totalCards}</span>
              </div>
              <Progress value={progress} className="h-2 bg-purple-500/30" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{knownCards.length}</div>
              <div className="text-sm text-green-600">Known</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">{reviewLaterCards.length}</div>
              <div className="text-sm text-orange-600">Review Later</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {totalCards - knownCards.length - reviewLaterCards.length}
              </div>
              <div className="text-sm text-blue-600">Remaining</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Flashcard */}
        <div className="perspective-1000 w-full h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? '-flipped' : '')}
              initial={{ rotateY: isFlipped ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Card 
                className={`absolute w-full h-full cursor-pointer flex flex-col justify-center p-8 bg-gradient-to-br ${
                  !isFlipped 
                    ? 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20' 
                    : 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20'
                } border-2 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow`}
                onClick={handleFlip}
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge className={getDifficultyColor(currentCard.difficulty)}>
                      {currentCard.difficulty}
                    </Badge>
                    <Badge variant="outline">{currentCard.subject}</Badge>
                    <Badge className="bg-indigo-100 text-indigo-800">
                      {!isFlipped ? 'Question' : 'Answer'}
                    </Badge>
                  </div>
                  
                  <div className="min-h-[120px] flex items-center justify-center">
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                      {!isFlipped ? currentCard.front : currentCard.back}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to {!isFlipped ? 'reveal answer' : 'see question'}
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1 max-w-xs"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="px-6"
            >
              {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="flex-1 max-w-xs"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Action Buttons */}
          {isFlipped && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-4"
            >
              <Button 
                variant="outline" 
                onClick={handleReviewLater}
                className="flex-1 max-w-xs border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-800"
              >
                <X className="h-4 w-4 mr-2" />
                Review Later
              </Button>
              <Button 
                variant="outline" 
                onClick={handleKnown}
                className="flex-1 max-w-xs border-green-200 bg-green-50 hover:bg-green-100 text-green-800"
              >
                <Check className="h-4 w-4 mr-2" />
                I Know This
              </Button>
            </motion.div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Reset Progress
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </SharedPageLayout>
  );
};

export default InteractiveFlashcards;
