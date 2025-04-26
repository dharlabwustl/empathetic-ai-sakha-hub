
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { ArrowLeft, Book, Calculator, Send, ChevronLeft, ChevronRight, BookOpen, FileText, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  hint?: string;
  formula?: string;
  relatedConcepts?: string[];
  relatedFlashcards?: string[];
  relatedExams?: string[];
};

const FlashcardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [progress, setProgress] = useState(0);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Mock fetch flashcard data
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock flashcard set
      const mockCards: Flashcard[] = [
        {
          id: '1',
          question: 'What is the equation for calculating velocity?',
          answer: 'v = u + at, where v is final velocity, u is initial velocity, a is acceleration, and t is time.',
          tags: ['Physics', 'Kinematics'],
          hint: 'Think about how velocity changes over time',
          formula: 'v = u + at',
          relatedConcepts: ['c1', 'c2'],
          relatedFlashcards: ['f2', 'f3'],
          relatedExams: ['1']
        },
        {
          id: '2',
          question: 'What is the formula for kinetic energy?',
          answer: 'KE = (1/2)mv², where m is mass and v is velocity.',
          tags: ['Physics', 'Energy'],
          hint: 'Energy related to motion',
          formula: 'KE = \\frac{1}{2}mv^2',
          relatedConcepts: ['c3', 'c4'],
          relatedFlashcards: ['f1', 'f3'],
          relatedExams: ['2']
        },
        {
          id: '3',
          question: 'What is the law of conservation of energy?',
          answer: 'Energy cannot be created or destroyed, only converted from one form to another.',
          tags: ['Physics', 'Energy', 'Conservation Laws'],
          hint: 'Think about total energy in a closed system',
          relatedConcepts: ['c5'],
          relatedFlashcards: ['f1', 'f2'],
          relatedExams: ['1', '2']
        }
      ];

      setCards(mockCards);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setUserAnswer('');
      setProgress(((currentIndex + 1) / (cards.length - 1)) * 100);
    } else {
      toast({
        title: "Flashcard Set Completed!",
        description: "You've reviewed all the flashcards in this set."
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setUserAnswer('');
      setProgress(((currentIndex - 1) / (cards.length - 1)) * 100);
    }
  };

  const handleCheck = () => {
    setShowAnswer(true);
  };

  const toggleCalculator = () => {
    setCalculatorOpen(!calculatorOpen);
  };

  const renderFormulaToolbar = () => {
    return (
      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
        <div className="flex flex-wrap gap-2">
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">x²</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">√</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">∫</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">π</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">Σ</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">÷</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">×</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">-</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">+</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">=</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">^</button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">{"()"}</button>
        </div>
      </div>
    );
  };

  // Function to render linked resources
  const renderLinkedResources = () => {
    if (!currentCard) return null;

    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold">Related Resources</h2>
        
        {/* Related Concepts */}
        {currentCard.relatedConcepts && currentCard.relatedConcepts.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCard.relatedConcepts.map((conceptId, index) => (
                  <Link 
                    key={conceptId} 
                    to={`/dashboard/student/concepts/${conceptId}`}
                    className="p-4 border rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Related Concept {index + 1}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Related Flashcards */}
        {currentCard.relatedFlashcards && currentCard.relatedFlashcards.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                Practice with Similar Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCard.relatedFlashcards.map((flashcardId, index) => (
                  <Link 
                    key={flashcardId} 
                    to={`/dashboard/student/flashcards/${flashcardId}`}
                    className="p-4 border rounded-md hover:bg-purple-50 transition-colors flex items-center"
                  >
                    <Brain className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Flashcard Set {index + 1}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Related Practice Exams */}
        {currentCard.relatedExams && currentCard.relatedExams.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-600" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCard.relatedExams.map((examId, index) => (
                  <Link 
                    key={examId} 
                    to={`/dashboard/student/exams/${examId}`}
                    className="p-4 border rounded-md hover:bg-green-50 transition-colors flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2 text-green-600" />
                    <span>Practice Exam {index + 1}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard/student/flashcards" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft size={16} className="mr-1" /> Back to Flashcards
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleCalculator}
              className="flex items-center gap-2"
            >
              <Calculator size={16} /> Calculator
            </Button>
            
            <Tabs defaultValue="practice">
              <TabsList>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="browse">Browse</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Card className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Book className="mr-2 text-blue-600" />
                    <h2 className="text-xl font-bold">Flashcard {currentIndex + 1} of {cards.length}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentCard?.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Question:</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md min-h-24 flex items-center justify-center">
                    <p className="text-center text-lg">{currentCard?.question}</p>
                  </div>
                </div>
                
                {calculatorOpen && (
                  <div className="bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 border">
                    <h3 className="text-lg font-medium mb-2">Calculator</h3>
                    <div className="mb-4">
                      <Input type="text" placeholder="0" className="text-right text-xl p-4" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                        <Button key={key} variant="outline" className="h-12">
                          {key}
                        </Button>
                      ))}
                    </div>
                    {currentCard?.formula && (
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                        <div className="text-sm text-gray-500 mb-1">Formula:</div>
                        <div className="font-mono text-center">{currentCard.formula}</div>
                      </div>
                    )}
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Answer:</h3>
                  <div className="flex gap-2">
                    <Input
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-grow"
                      disabled={showAnswer}
                    />
                    <Button 
                      onClick={handleCheck}
                      disabled={showAnswer || !userAnswer.trim()}
                      className="flex items-center gap-1"
                    >
                      <Send size={16} /> Check
                    </Button>
                  </div>
                  
                  {/* Formula toolbar */}
                  {renderFormulaToolbar()}
                  
                  {currentCard?.hint && !showAnswer && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                      <p className="text-sm text-yellow-700">
                        <strong>Hint:</strong> {currentCard.hint}
                      </p>
                    </div>
                  )}
                </div>
                
                {showAnswer && (
                  <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Correct Answer:</h3>
                    <p>{currentCard?.answer}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div>
                  <Progress value={progress} className="w-48" />
                  <p className="text-sm text-gray-500 mt-1">{Math.round(progress)}% complete</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={16} className="mr-1" /> Previous
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1 && !showAnswer}
                  >
                    Next <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            {/* Related Resources Section */}
            {renderLinkedResources()}
          </div>
          
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Flashcard Set Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Overall Progress</span>
                    <span className="text-sm font-medium">{currentIndex + 1} of {cards.length}</span>
                  </div>
                  <Progress value={(currentIndex + 1) / cards.length * 100} className="h-2" />
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Flashcard Navigation</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {cards.map((_, idx) => (
                      <Button
                        key={idx}
                        variant={idx === currentIndex ? "default" : idx < currentIndex ? "outline" : "ghost"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setShowAnswer(false);
                          setUserAnswer('');
                          setProgress((idx / (cards.length - 1)) * 100);
                        }}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlashcardDetailPage;
