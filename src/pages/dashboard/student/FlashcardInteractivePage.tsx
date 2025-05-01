
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Lightbulb, 
  Repeat, 
  Mic, 
  Check, 
  X, 
  Calculator,
  BookOpen,
  BarChart,
  ListChecks
} from 'lucide-react';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  relatedConcepts?: { id: string; title: string }[];
  formulaIncluded?: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl?: string;
}

const mockFlashcardData: Record<string, { deckName: string; cards: FlashcardData[] }> = {
  "1": {
    deckName: "Physics Formulas",
    cards: [
      {
        id: "1-1",
        question: "What is Newton's Second Law of Motion?",
        answer: "F = ma",
        explanation: "Force equals mass times acceleration. This fundamental law describes the relationship between an object's mass, its acceleration, and the force applied.",
        relatedConcepts: [{ id: "c1", title: "Newton's Laws of Motion" }],
        formulaIncluded: true,
        difficulty: "Medium"
      },
      {
        id: "1-2",
        question: "What is the formula for kinetic energy?",
        answer: "KE = ½mv²",
        explanation: "Kinetic energy equals one-half times mass times velocity squared. This represents the energy of an object due to its motion.",
        relatedConcepts: [{ id: "c2", title: "Energy Principles" }],
        formulaIncluded: true,
        difficulty: "Easy"
      },
      {
        id: "1-3",
        question: "What is the universal law of gravitation?",
        answer: "F = G(m₁m₂)/r²",
        explanation: "The gravitational force between two masses is proportional to the product of the masses and inversely proportional to the square of the distance between them.",
        relatedConcepts: [{ id: "c3", title: "Gravitation" }],
        formulaIncluded: true,
        difficulty: "Hard"
      }
    ]
  }
};

export default function FlashcardInteractivePage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [interactionMode, setInteractionMode] = useState<'typing' | 'speech' | 'multiple-choice'>('typing');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    totalCards: deckId ? mockFlashcardData[deckId].cards.length : 0
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  if (!deckId || !mockFlashcardData[deckId]) {
    return (
      <SharedPageLayout title="Flashcard Study">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-3">Deck not found</h3>
          <Button onClick={() => navigate('/dashboard/student/flashcards')}>
            Back to Flashcards
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  const deckData = mockFlashcardData[deckId];
  const cards = deckData.cards;
  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  
  const handleFlip = () => {
    if (!isFlipped && interactionMode === 'typing') {
      // Check answer before flipping if in typing mode
      const normalizedUserAnswer = userAnswer.trim().toLowerCase();
      const normalizedCorrectAnswer = currentCard.answer.trim().toLowerCase();
      const isAnswerCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
      
      setIsCorrect(isAnswerCorrect);
      setSessionStats(prev => ({
        ...prev,
        correct: isAnswerCorrect ? prev.correct + 1 : prev.correct,
        incorrect: !isAnswerCorrect ? prev.incorrect + 1 : prev.incorrect
      }));
    }
    
    // Play flip sound
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setUserAnswer('');
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      // End of deck
      navigate(`/dashboard/student/flashcards/${deckId}/results`);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setUserAnswer('');
      setIsCorrect(null);
      setShowExplanation(false);
    }
  };
  
  const handleSkip = () => {
    setSessionStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    handleNext();
  };
  
  const handleSpeechRecognition = () => {
    // Simulate speech recognition
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer("Force equals mass times acceleration");
      // In a real implementation, this would use the Web Speech API
    }, 2000);
  };
  
  const handleTryAgain = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setIsFlipped(false);
  };

  return (
    <SharedPageLayout 
      title={`Studying: ${deckData.deckName}`} 
      subtitle="Master concepts through interactive flashcards"
    >
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="w-full py-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {cards.length}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Check className="mr-1 h-3.5 w-3.5" /> {sessionStats.correct}
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <X className="mr-1 h-3.5 w-3.5" /> {sessionStats.incorrect}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Interaction mode selector */}
        <Tabs 
          value={interactionMode} 
          onValueChange={(value) => setInteractionMode(value as 'typing' | 'speech' | 'multiple-choice')}
          className="w-full justify-center"
        >
          <TabsList>
            <TabsTrigger value="typing" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" /> Typing
            </TabsTrigger>
            <TabsTrigger value="speech" className="flex items-center gap-2">
              <Mic className="h-4 w-4" /> Speech
            </TabsTrigger>
            <TabsTrigger value="multiple-choice" className="flex items-center gap-2">
              <Brain className="h-4 w-4" /> Multiple Choice
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Main flashcard */}
        <div className="flex justify-center">
          <Card className={`w-full max-w-2xl perspective-1000 ${isFlipped ? 'is-flipped' : ''}`}>
            <div className={`card-inner relative ${isFlipped ? 'rotate-y-180' : ''} transition-transform duration-500 transform-style-3d h-[400px] w-full`}>
              {/* Front side */}
              <CardContent className={`absolute w-full h-full backface-hidden p-6 flex flex-col ${isFlipped ? 'invisible' : ''}`}>
                <div className="text-sm text-muted-foreground mb-4 flex justify-between">
                  <Badge variant="outline" className={`
                    ${currentCard.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      currentCard.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      currentCard.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                      'bg-purple-100 text-purple-700'}
                  `}>
                    {currentCard.difficulty}
                  </Badge>
                  
                  {currentCard.formulaIncluded && (
                    <Badge variant="outline" className="bg-indigo-100 text-indigo-700">
                      <Calculator className="h-3.5 w-3.5 mr-1" />
                      Formula
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-6">{currentCard.question}</h3>
                
                {currentCard.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={currentCard.imageUrl}
                      alt="Flashcard illustration" 
                      className="rounded-md mx-auto max-h-[120px] object-contain"
                    />
                  </div>
                )}
                
                {interactionMode === 'typing' && (
                  <div className="mt-auto">
                    <Textarea
                      placeholder="Type your answer here..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="resize-none h-[120px]"
                    />
                    <div className="text-xs text-muted-foreground mt-2 flex items-center">
                      <Mic className="h-3.5 w-3.5 mr-1" />
                      <span>Pro tip: Click the microphone icon to use speech-to-text</span>
                    </div>
                  </div>
                )}
                
                {interactionMode === 'speech' && (
                  <div className="mt-auto flex flex-col items-center">
                    <Button 
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      className="rounded-full h-20 w-20 mb-4"
                      onClick={handleSpeechRecognition}
                    >
                      <Mic className={`h-8 w-8 ${isRecording ? 'animate-pulse' : ''}`} />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {isRecording ? "Listening..." : "Press to speak your answer"}
                    </p>
                    <Textarea
                      placeholder="Your spoken answer will appear here..."
                      value={userAnswer}
                      readOnly
                      className="resize-none h-[60px] mt-3"
                    />
                  </div>
                )}
                
                {interactionMode === 'multiple-choice' && (
                  <div className="mt-auto space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left py-4 h-auto">
                      A) KE = ½mv²
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left py-4 h-auto">
                      B) F = ma
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left py-4 h-auto">
                      C) E = mc²
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left py-4 h-auto">
                      D) F = G(m₁m₂)/r²
                    </Button>
                  </div>
                )}
              </CardContent>
              
              {/* Back side */}
              <CardContent className={`absolute w-full h-full backface-hidden p-6 flex flex-col rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
                <h3 className="text-xl font-semibold mb-3">Answer:</h3>
                <div className="text-lg mb-2">{currentCard.answer}</div>
                
                {isCorrect !== null && (
                  <div className={`p-3 rounded-md ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} mb-4`}>
                    <div className="flex items-center">
                      {isCorrect ? <Check className="h-5 w-5 mr-2" /> : <X className="h-5 w-5 mr-2" />}
                      <span className="font-medium">Your answer was {isCorrect ? 'correct!' : 'incorrect.'}</span>
                    </div>
                    {!isCorrect && (
                      <div className="mt-2 text-sm">
                        <div>Your answer: <span className="italic">{userAnswer || '(No answer provided)'}</span></div>
                        <div>Correct answer: <span className="font-medium">{currentCard.answer}</span></div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-sm flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                  </Button>
                  
                  {showExplanation && currentCard.explanation && (
                    <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                      {currentCard.explanation}
                    </div>
                  )}
                </div>
                
                {currentCard.relatedConcepts && currentCard.relatedConcepts.length > 0 && (
                  <div className="mt-auto">
                    <h4 className="text-sm font-medium mb-2">Related Concepts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCard.relatedConcepts.map(concept => (
                        <Button 
                          key={concept.id}
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          {concept.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        </div>
        
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="flex gap-3">
            {!isFlipped ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="flex items-center gap-2"
                >
                  Skip <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleFlip}
                  className="flex items-center gap-2"
                >
                  Check Answer <Check className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                {!isCorrect && (
                  <Button 
                    variant="outline" 
                    onClick={handleTryAgain}
                    className="flex items-center gap-2"
                  >
                    <Repeat className="h-4 w-4" /> Try Again
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next Card <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Tools panel */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <BarChart className="h-3.5 w-3.5" /> Analytics
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Calculator className="h-3.5 w-3.5" /> Formula Sheet
                </Button>
              </div>
              <Button size="sm" variant="default" className="h-8">
                <Mic className="h-3.5 w-3.5 mr-1.5" /> Voice Input
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Hidden audio element for card flip sound */}
        <audio ref={audioRef} src="/card-flip-sound.mp3" preload="auto" />
        
        <style jsx global>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </SharedPageLayout>
  );
}
