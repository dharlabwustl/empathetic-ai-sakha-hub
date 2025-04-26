
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Calculator,
  FileText,
  Brain,
  Settings,
  Bookmark,
  RefreshCw,
  Check,
  X,
  FileCheck,
  Functions
} from 'lucide-react';
import FlashcardQuestion from '@/components/dashboard/student/flashcard-browser/FlashcardQuestion';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  relatedConceptId?: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  cardsCount: number;
  mastery: number;
  cards: Flashcard[];
  relatedConceptIds: string[];
  relatedExamIds: string[];
}

const FlashcardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [reviewLaterCards, setReviewLaterCards] = useState<Set<number>>(new Set());

  // Mock data for formulas
  const physicsFormulas = [
    { id: 1, name: "Newton's Second Law", formula: "F = m × a" },
    { id: 2, name: "Kinetic Energy", formula: "KE = ½ × m × v²" },
    { id: 3, name: "Gravitational Potential Energy", formula: "PE = m × g × h" },
    { id: 4, name: "Momentum", formula: "p = m × v" },
    { id: 5, name: "Work", formula: "W = F × d × cos(θ)" }
  ];

  const mathFormulas = [
    { id: 1, name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / 2a" },
    { id: 2, name: "Pythagorean Theorem", formula: "a² + b² = c²" },
    { id: 3, name: "Area of a Circle", formula: "A = π × r²" },
    { id: 4, name: "Derivative Power Rule", formula: "d/dx(xⁿ) = n × xⁿ⁻¹" },
    { id: 5, name: "Integration Power Rule", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ -1" }
  ];

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call to get the specific flashcard set
      // For now, we'll use mock data
      setTimeout(() => {
        setFlashcardSet({
          id: id,
          title: "Physics: Mechanics Quick Recap",
          subject: "Physics",
          topic: "Mechanics",
          description: "Review key concepts in mechanics for your upcoming tests.",
          cardsCount: 10,
          mastery: 72,
          cards: [
            {
              id: "card1",
              question: "What is Newton's First Law of Motion?",
              answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
              topic: "Newton's Laws"
            },
            {
              id: "card2",
              question: "What is acceleration?",
              answer: "Acceleration is the rate of change of velocity with respect to time.",
              topic: "Kinematics"
            },
            {
              id: "card3",
              question: "What is the formula for kinetic energy?",
              answer: "KE = ½mv²",
              topic: "Energy"
            },
            {
              id: "card4",
              question: "State the conservation of momentum principle.",
              answer: "In a closed system, the total momentum before a collision equals the total momentum after the collision.",
              topic: "Momentum"
            },
            {
              id: "card5",
              question: "What is the relationship between force, mass, and acceleration?",
              answer: "F = ma (Force equals mass times acceleration)",
              topic: "Newton's Laws"
            }
          ],
          relatedConceptIds: ["c1", "c2", "c3"],
          relatedExamIds: ["1", "2"]
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleNextCard = () => {
    if (flashcardSet && currentCardIndex < flashcardSet.cards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    if (showFormulas) setShowFormulas(false);
  };

  const toggleFormulas = () => {
    setShowFormulas(!showFormulas);
    if (showCalculator) setShowCalculator(false);
  };

  const handleMarkKnown = () => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.add(currentCardIndex);
      return newSet;
    });
    handleNextCard();
  };

  const handleMarkForReview = () => {
    setReviewLaterCards(prev => {
      const newSet = new Set(prev);
      newSet.add(currentCardIndex);
      return newSet;
    });
    handleNextCard();
  };

  const handleReplayAudio = () => {
    // In a real app, this would trigger text-to-speech
    console.log("Replaying audio for answer");
  };

  const handleBookmark = () => {
    console.log("Bookmarked card", currentCardIndex);
  };

  const handleViewConcept = () => {
    // In a real app, this would navigate to the related concept
    console.log("Viewing related concept");
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!flashcardSet) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Flashcard Set Not Found</h2>
            <p className="mt-2 text-gray-500">The flashcard set you're looking for doesn't exist.</p>
            <Link to="/dashboard/student/flashcards">
              <Button className="mt-4">Return to Flashcards</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentCard = flashcardSet.cards[currentCardIndex];

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard/student/flashcards" className="mr-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{flashcardSet.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-600">
                  {flashcardSet.subject}
                </Badge>
                <Badge variant="outline">
                  {flashcardSet.topic}
                </Badge>
                <span className="text-sm text-gray-500">
                  {currentCardIndex + 1} of {flashcardSet.cards.length} cards
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleVoice}
              className={voiceEnabled ? "bg-blue-50 text-blue-600" : ""}
            >
              <Volume2 className="h-4 w-4 mr-1" />
              {voiceEnabled ? "Voice On" : "Voice Off"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleCalculator}
              className={showCalculator ? "bg-blue-50 text-blue-600" : ""}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Calculator
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleFormulas}
              className={showFormulas ? "bg-blue-50 text-blue-600" : ""}
            >
              <Functions className="h-4 w-4 mr-1" />
              Formulas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-${showCalculator || showFormulas ? '8' : '12'}`}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <FlashcardQuestion
                  topic={currentCard.topic}
                  question={currentCard.question}
                  answer={currentCard.answer}
                  isFlipped={isFlipped}
                  currentQuestionIndex={currentCardIndex}
                  totalQuestions={flashcardSet.cards.length}
                  onFlip={() => setIsFlipped(!isFlipped)}
                  onBookmark={handleBookmark}
                  onReplayAudio={handleReplayAudio}
                  onMarkDone={() => {}}
                  onViewConcept={handleViewConcept}
                  voiceEnabled={voiceEnabled}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                  onClick={handleMarkForReview}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Review Later
                </Button>
                <Button 
                  variant="outline"
                  className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  onClick={handleMarkKnown}
                >
                  <Check className="h-4 w-4 mr-1" />
                  I Know This
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcardSet.cards.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Progress and Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Session Progress</span>
                    <span>
                      {currentCardIndex + 1}/{flashcardSet.cards.length} cards
                      ({Math.round(((currentCardIndex + 1) / flashcardSet.cards.length) * 100)}%)
                    </span>
                  </div>
                  <Progress value={((currentCardIndex + 1) / flashcardSet.cards.length) * 100} />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery Level</span>
                    <span>{flashcardSet.mastery}%</span>
                  </div>
                  <Progress value={flashcardSet.mastery} />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-2 bg-green-50 rounded-md">
                    <div className="text-xl font-bold text-green-600">
                      {knownCards.size}
                    </div>
                    <div className="text-xs text-green-600">Known</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-md">
                    <div className="text-xl font-bold text-red-600">
                      {reviewLaterCards.size}
                    </div>
                    <div className="text-xs text-red-600">For Review</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-md">
                    <div className="text-xl font-bold text-blue-600">
                      {flashcardSet.cards.length - knownCards.size - reviewLaterCards.size - currentCardIndex}
                    </div>
                    <div className="text-xs text-blue-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-semibold mt-8 mb-4">Related Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Related Concepts */}
              {flashcardSet.relatedConceptIds.map((conceptId, index) => (
                <Link key={conceptId} to={`/dashboard/student/concepts/${conceptId}`}>
                  <Card className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-blue-600" size={16} />
                        <span className="text-sm text-gray-500">Related Concept</span>
                      </div>
                      <h4 className="font-medium">
                        {index === 0 ? 'Newton\'s Laws of Motion' : index === 1 ? 'Work and Energy' : 'Momentum and Collisions'}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Related Exams */}
              {flashcardSet.relatedExamIds.map((examId, index) => (
                <Link key={examId} to={`/dashboard/student/exams/${examId}`}>
                  <Card className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck className="text-green-600" size={16} />
                        <span className="text-sm text-gray-500">Practice Exam</span>
                      </div>
                      <h4 className="font-medium">
                        {index === 0 ? 'Physics Mechanics Test' : 'Newton\'s Laws Quiz'}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Calculator or Formula Reference */}
          {showCalculator && (
            <div className="lg:col-span-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                    Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-2 bg-gray-50 mb-4">
                    <div className="text-right text-2xl font-mono min-h-[40px]">
                      0
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                      <Button key={key} variant="outline" className="h-12">
                        {key}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['C', 'DEL', '(', ')', 'sin', 'cos', 'tan', '^', 'π', 'e', '√', 'log'].map((key) => (
                      <Button key={key} variant="outline" className="h-10">
                        {key}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Formulas Reference */}
          {showFormulas && (
            <div className="lg:col-span-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Functions className="h-5 w-5 mr-2 text-blue-600" />
                    Formula Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="physics">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="physics">Physics</TabsTrigger>
                      <TabsTrigger value="math">Mathematics</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="physics" className="mt-0">
                      <div className="space-y-2">
                        {physicsFormulas.map(formula => (
                          <div key={formula.id} className="border rounded-md p-3 bg-blue-50">
                            <div className="font-medium text-blue-800">{formula.name}</div>
                            <div className="text-lg font-mono mt-1 text-center">{formula.formula}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="math" className="mt-0">
                      <div className="space-y-2">
                        {mathFormulas.map(formula => (
                          <div key={formula.id} className="border rounded-md p-3 bg-purple-50">
                            <div className="font-medium text-purple-800">{formula.name}</div>
                            <div className="text-lg font-mono mt-1 text-center">{formula.formula}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FlashcardDetailPage;
