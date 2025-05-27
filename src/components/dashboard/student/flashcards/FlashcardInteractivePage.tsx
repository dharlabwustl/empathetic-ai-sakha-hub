
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, CheckCircle, X, Brain, Star } from 'lucide-react';

const FlashcardInteractivePage: React.FC = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  // Mock flashcard data
  const flashcardSet = {
    id: setId || '1',
    title: 'Physics - Laws of Motion',
    subject: 'Physics',
    cards: [
      {
        id: 1,
        question: "What is Newton's First Law of Motion?",
        answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
        difficulty: 'Medium',
        topic: 'Newton\'s Laws'
      },
      {
        id: 2,
        question: "State Newton's Second Law of Motion.",
        answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma",
        difficulty: 'Medium',
        topic: 'Newton\'s Laws'
      },
      {
        id: 3,
        question: "What is Newton's Third Law of Motion?",
        answer: "For every action, there is an equal and opposite reaction.",
        difficulty: 'Easy',
        topic: 'Newton\'s Laws'
      },
      {
        id: 4,
        question: "Define inertia.",
        answer: "Inertia is the tendency of an object to resist changes in its state of motion. It is directly proportional to the mass of the object.",
        difficulty: 'Medium',
        topic: 'Inertia'
      },
      {
        id: 5,
        question: "What is the SI unit of force?",
        answer: "Newton (N). One Newton is the force required to accelerate a mass of 1 kg at 1 m/s².",
        difficulty: 'Easy',
        topic: 'Units'
      }
    ]
  };

  const progress = ((currentCard + 1) / flashcardSet.cards.length) * 100;

  const handleNext = () => {
    if (currentCard < flashcardSet.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
      setIsFlipped(false);
    }
  };

  const handleAnswer = (correct: boolean) => {
    setScore(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
    
    setTimeout(() => {
      if (currentCard < flashcardSet.cards.length - 1) {
        handleNext();
      }
    }, 1000);
  };

  const resetSession = () => {
    setCurrentCard(0);
    setShowAnswer(false);
    setIsFlipped(false);
    setScore({ correct: 0, total: 0 });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentCardData = flashcardSet.cards[currentCard];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">{flashcardSet.title}</h1>
            <Badge variant="outline" className="mt-1">
              {flashcardSet.subject}
            </Badge>
          </div>
          
          <Button variant="outline" onClick={resetSession}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Card {currentCard + 1} of {flashcardSet.cards.length}</span>
            <span>Score: {score.correct}/{score.total}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-6">
          <div 
            className={`relative w-full max-w-2xl h-96 cursor-pointer transition-transform duration-500 ${
              isFlipped ? 'transform-style-preserve-3d rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <Card className={`absolute inset-0 backface-hidden border-2 shadow-lg ${
              !isFlipped ? 'z-10' : 'rotate-y-180'
            }`}>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(currentCardData.difficulty)}
                  >
                    {currentCardData.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {currentCardData.topic}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full text-center p-8">
                <Brain className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Question</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentCardData.question}
                </p>
                <p className="text-sm text-gray-500 mt-6">
                  Click to reveal answer
                </p>
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card className={`absolute inset-0 backface-hidden border-2 shadow-lg rotate-y-180 ${
              isFlipped ? 'z-10' : ''
            }`}>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="font-semibold">Answer</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full text-center p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {currentCardData.answer}
                </p>
                
                {/* Answer buttons */}
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnswer(false);
                    }}
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Incorrect
                  </Button>
                  <Button 
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnswer(true);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Correct
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentCard === 0}
          >
            Previous
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isFlipped ? 'Choose your answer' : 'Click card to flip'}
            </p>
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={currentCard === flashcardSet.cards.length - 1}
          >
            Next
          </Button>
        </div>

        {/* Completion message */}
        {currentCard === flashcardSet.cards.length - 1 && score.total > 0 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardContent className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Session Complete!
              </h3>
              <p className="text-green-700">
                You scored {score.correct} out of {score.total} ({Math.round((score.correct / score.total) * 100)}%)
              </p>
              <Button className="mt-4" onClick={resetSession}>
                Study Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlashcardInteractivePage;
