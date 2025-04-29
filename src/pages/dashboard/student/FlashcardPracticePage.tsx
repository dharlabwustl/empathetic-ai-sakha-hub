
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
}

const FlashcardPracticePage = () => {
  const { cardId } = useParams();
  const [loading, setLoading] = useState(true);
  const [flashcard, setFlashcard] = useState<FlashcardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | 'partial' | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  
  useEffect(() => {
    // Mock data fetch
    const fetchData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const mockFlashcard: FlashcardData = {
          id: cardId || '1',
          question: "What are the three laws of motion formulated by Newton?",
          answer: "1. An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. 2. The acceleration of an object is directly proportional to the force applied and inversely proportional to the object's mass. 3. For every action, there is an equal and opposite reaction.",
          subject: "Physics",
          topic: "Classical Mechanics",
          difficulty: "medium",
          mastered: false
        };

        setFlashcard(mockFlashcard);
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [cardId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const checkAnswer = () => {
    if (!flashcard) return;

    // Simple string matching for demo - in a real app, use more sophisticated comparison
    const flashcardAnswerLower = flashcard.answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();

    if (userAnswerLower === flashcardAnswerLower) {
      setResult('correct');
      setAccuracy(100);
    } else if (flashcardAnswerLower.includes(userAnswerLower) || userAnswerLower.includes(flashcardAnswerLower.substring(0, 10))) {
      // Very simple partial matching
      const similarity = Math.min(userAnswerLower.length, flashcardAnswerLower.length) / 
                        Math.max(userAnswerLower.length, flashcardAnswerLower.length) * 100;
      setResult('partial');
      setAccuracy(Math.round(similarity));
    } else {
      setResult('incorrect');
      setAccuracy(0);
    }
    
    setIsFlipped(true);
  };

  const reset = () => {
    setUserAnswer('');
    setResult(null);
    setAccuracy(null);
    setIsFlipped(false);
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Flashcard"
        subtitle="Please wait..."
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!flashcard) {
    return (
      <SharedPageLayout
        title="Flashcard Not Found"
        subtitle="The requested flashcard could not be found"
      >
        <div className="text-center py-8">
          <Link to="/dashboard/student/flashcards">
            <Button>Back to Flashcards</Button>
          </Link>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title="Flashcard Practice"
      subtitle="Test your knowledge with interactive flashcards"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-4 flex-wrap">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
            {flashcard.subject}
          </Badge>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
            {flashcard.topic}
          </Badge>
          <Badge className={`
            ${flashcard.difficulty === 'easy' ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' : 
              flashcard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'}
          `}>
            {flashcard.difficulty.charAt(0).toUpperCase() + flashcard.difficulty.slice(1)}
          </Badge>
        </div>
        
        {/* Flashcard */}
        <div 
          className={`relative w-full h-96 cursor-pointer perspective-1000 transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front side */}
          <Card 
            className={`absolute w-full h-full backface-hidden ${
              isFlipped ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
          >
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6">
              <CardTitle className="text-xl">Question</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-lg flex items-center justify-center h-64">
              <p className="text-center">{flashcard.question}</p>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
              <Button onClick={handleFlip} variant="outline">
                Show Answer
              </Button>
              
              <div className="flex gap-2">
                <Button disabled>Hint</Button>
                <Button disabled>Related Concept</Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Back side */}
          <Card 
            className={`absolute w-full h-full backface-hidden rotate-y-180 ${
              isFlipped ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6">
              <CardTitle className="text-xl">Answer</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-lg flex items-center justify-center h-64">
              <p className="text-center">{flashcard.answer}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleFlip} variant="outline">
                Back to Question
              </Button>
              
              <Button onClick={reset}>Next Card</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Answer input area */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1"
                  disabled={isFlipped || result !== null}
                />
                
                <Button 
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim() || isFlipped || result !== null}
                >
                  Submit
                </Button>
              </div>
              
              {result && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Accuracy:</span>
                    <span className={`font-bold ${
                      accuracy && accuracy > 80 ? 'text-green-600' :
                      accuracy && accuracy > 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {accuracy}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={accuracy || 0} 
                    className={`${
                      accuracy && accuracy > 80 ? 'bg-green-600' :
                      accuracy && accuracy > 50 ? 'bg-yellow-600' :
                      'bg-red-600'
                    } h-2`} 
                  />
                  
                  <div className={`p-4 rounded-lg ${
                    result === 'correct' ? 'bg-green-100 border border-green-200 text-green-800' :
                    result === 'partial' ? 'bg-yellow-100 border border-yellow-200 text-yellow-800' :
                    'bg-red-100 border border-red-200 text-red-800'
                  }`}>
                    {result === 'correct' ? 
                      'Great job! Your answer is correct!' :
                      result === 'partial' ? 
                      'Good attempt! Your answer contains some correct elements but is not fully accurate.' :
                      'Not quite right. Try reviewing the concept again.'
                    }
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">
          <Link to="/dashboard/student/flashcards">
            <Button variant="outline">Back to Flashcards</Button>
          </Link>
          
          <div className="flex gap-2">
            <Button variant="outline" disabled>Previous Card</Button>
            <Button disabled>Next Card</Button>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardPracticePage;
