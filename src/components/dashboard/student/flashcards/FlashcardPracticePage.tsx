
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookmarkIcon, Share2, Mic, RefreshCw, ArrowLeft, Check, Calculator, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const FlashcardPracticePage = () => {
  const { topicName } = useParams<{ topicName: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate mock flashcards based on topic name
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const mockCards = generateMockFlashcards(topicName || '');
      setCards(mockCards);
      setLoading(false);
    }, 800);
  }, [topicName]);

  const generateMockFlashcards = (topic: string): Flashcard[] => {
    const formattedTopic = formatTopicName(topic);
    const topicArea = determineSubject(topic);
    
    if (topicArea === 'Math') {
      return [
        {
          id: '1',
          question: `What is the derivative of x² in the context of ${formattedTopic}?`,
          answer: '2x',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: `Solve for x: 3x + 7 = 22 in the context of ${formattedTopic}`,
          answer: 'x = 5',
          difficulty: 'medium'
        },
        {
          id: '3', 
          question: `What is the integral of 2x with respect to x in the context of ${formattedTopic}?`,
          answer: 'x² + C, where C is the constant of integration',
          difficulty: 'hard'
        }
      ];
    } else if (topicArea === 'Physics') {
      return [
        {
          id: '1',
          question: `What is the formula for force in ${formattedTopic}?`,
          answer: 'F = ma (Force = mass × acceleration)',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: `State Newton's Third Law as it applies to ${formattedTopic}`,
          answer: 'For every action, there is an equal and opposite reaction',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: `How does gravity affect objects in ${formattedTopic}?`,
          answer: 'All objects are attracted to each other with a force proportional to their masses and inversely proportional to the square of the distance between them',
          difficulty: 'hard'
        }
      ];
    } else {
      return [
        {
          id: '1',
          question: `Define the concept of ${formattedTopic}`,
          answer: `${formattedTopic} is a fundamental concept in ${topicArea} that deals with...`,
          difficulty: 'easy'
        },
        {
          id: '2',
          question: `Explain the significance of ${formattedTopic} in modern ${topicArea}`,
          answer: `${formattedTopic} is significant because it allows us to understand...`,
          difficulty: 'medium'
        },
        {
          id: '3',
          question: `What are the key applications of ${formattedTopic}?`,
          answer: `${formattedTopic} is applied in various fields such as...`,
          difficulty: 'hard'
        }
      ];
    }
  };

  // Helper functions to format topic names
  const formatTopicName = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const determineSubject = (topic: string): string => {
    const topics = {
      Physics: ["newton", "motion", "gravity", "force", "energy", "wave", "light", "optics", "electricity"],
      Chemistry: ["acid", "base", "element", "compound", "reaction", "bond", "molecule", "periodic"],
      Math: ["algebra", "calculus", "geometry", "trigonometry", "equation", "function", "matrix", "vector"],
      Biology: ["cell", "gene", "evolution", "ecosystem", "protein", "dna", "organ", "tissue"]
    };

    for (const [subject, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => topic.toLowerCase().includes(keyword))) {
        return subject;
      }
    }
    return "General Science";
  };

  const handleSubmit = () => {
    if (answer.trim() === '') {
      toast({
        title: "Empty Answer",
        description: "Please provide an answer or click 'Show Answer'",
        variant: "destructive"
      });
      return;
    }
    
    // Simple string similarity check
    const userAnswer = answer.toLowerCase().trim();
    const correctAnswer = cards[currentIndex]?.answer.toLowerCase();
    
    let similarity = 0;
    if (correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer)) {
      // If one is substring of the other
      similarity = Math.min(userAnswer.length, correctAnswer.length) / Math.max(userAnswer.length, correctAnswer.length);
    } else {
      // Basic word match count
      const userWords = userAnswer.split(/\s+/);
      const correctWords = correctAnswer.split(/\s+/);
      
      let matchCount = 0;
      for (const word of userWords) {
        if (word.length > 2 && correctWords.some(correct => correct.includes(word))) {
          matchCount++;
        }
      }
      
      similarity = matchCount / Math.max(userWords.length, correctWords.length);
    }
    
    const accuracyScore = Math.round(similarity * 100);
    setAccuracy(accuracyScore);
    
    toast({
      title: accuracyScore > 70 ? "Great job!" : "Nice try!",
      description: `Your answer is approximately ${accuracyScore}% accurate.`,
      variant: accuracyScore > 70 ? "default" : "destructive"
    });
    
    setIsFlipped(true);
  };

  const toggleSpeechRecognition = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Speech Recognition Stopped" : "Listening...",
      description: isListening ? undefined : "Speak clearly to capture your answer",
      duration: 2000
    });
    
    // Mock speech recognition
    if (!isListening) {
      setTimeout(() => {
        setAnswer(prev => prev + " [speech input would appear here]");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setAnswer('');
      setAccuracy(null);
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "Flashcard Set Complete!",
        description: "You've reviewed all flashcards in this set.",
        duration: 3000
      });
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setAnswer('');
      setAccuracy(null);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  if (loading) {
    return (
      <SharedPageLayout title="Loading Flashcards" subtitle="Please wait while we prepare your practice materials">
        <div className="space-y-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <SharedPageLayout title="Flashcards Not Found" subtitle="We couldn't find flashcards for this topic">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p>Sorry, the flashcards you're looking for don't seem to exist.</p>
            <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  const currentCard = cards[currentIndex];
  const formattedTopic = formatTopicName(topicName || '');

  return (
    <SharedPageLayout
      title={`${formattedTopic} Flashcards`}
      subtitle={`Practice and memorize key concepts from ${determineSubject(topicName || '')}`}
      backButton={true}
      onBack={handleGoBack}
    >
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <Badge variant={
            currentCard.difficulty === 'easy' ? 'outline' : 
            currentCard.difficulty === 'medium' ? 'secondary' : 
            'destructive'
          }>
            {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
          </Badge>
        </div>
        <Progress value={(currentIndex + 1) / cards.length * 100} className="h-1" />

        {/* Flashcard */}
        <Card className="shadow-lg border-2">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl text-center mb-4">Question</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="min-h-[150px] flex items-center justify-center text-lg text-center p-4 bg-gray-50 rounded-lg">
                    {currentCard.question}
                  </div>
                  
                  {currentCard.imageUrl && (
                    <div className="mt-4 flex justify-center">
                      <div className="bg-gray-200 rounded-lg w-full h-40 flex items-center justify-center">
                        [Image for this flashcard would appear here]
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 space-y-4">
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[80px]"
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={toggleSpeechRecognition} variant={isListening ? "destructive" : "outline"}>
                        <Mic className="h-4 w-4 mr-2" />
                        {isListening ? "Stop" : "Voice Input"}
                      </Button>
                      
                      <Button onClick={toggleCalculator} variant="outline">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculator
                      </Button>
                      
                      <Button onClick={() => setIsFlipped(true)} variant="outline">
                        Show Answer
                      </Button>
                      
                      <Button onClick={handleSubmit} variant="default">
                        Submit
                      </Button>
                    </div>
                    
                    {showCalculator && (
                      <div className="p-4 border rounded-md">
                        <p className="text-center text-muted-foreground">Calculator would be displayed here</p>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', '=', '/'].map((btn) => (
                            <Button key={btn} variant="outline" size="sm" className="h-10">
                              {btn}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl text-center mb-4">Answer</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg min-h-[150px] flex flex-col items-center justify-center">
                    <p className="text-lg text-center">{currentCard.answer}</p>
                    
                    {accuracy !== null && (
                      <div className="mt-4 w-full">
                        <p className="text-center mb-1">Your Answer Accuracy</p>
                        <Progress value={accuracy} className="h-2" />
                        <p className="text-center mt-1 text-sm">
                          {accuracy}% - {
                            accuracy > 80 ? "Excellent! 🌟" :
                            accuracy > 60 ? "Good! 👍" :
                            accuracy > 40 ? "Getting there 🤔" :
                            "Keep studying 📚"
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Your answer:</p>
                    <p className="mt-1">{answer || "(No answer provided)"}</p>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => setIsFlipped(false)} className="w-full max-w-xs">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
          
          <CardFooter className="flex justify-between mt-6">
            <div>
              <Button 
                variant="outline" 
                onClick={handlePreviousCard} 
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Card Flagged for Review",
                  duration: 2000
                });
              }}>
                <Flag className="h-4 w-4 mr-2" />
                Flag
              </Button>
              
              <Button 
                variant="default" 
                onClick={handleNextCard} 
                disabled={currentIndex === cards.length - 1}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Card set complete message */}
        {currentIndex === cards.length - 1 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-green-800">End of flashcard set!</h3>
              <p className="text-green-700 mt-2">You've reached the end of this set. Great job!</p>
              <div className="mt-4">
                <Button onClick={handleGoBack} variant="default">
                  <Check className="h-4 w-4 mr-2" /> Complete Practice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardPracticePage;
