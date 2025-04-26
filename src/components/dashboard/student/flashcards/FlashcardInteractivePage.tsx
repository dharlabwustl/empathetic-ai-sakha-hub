
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Book, Brain, FileText, ArrowLeft, ArrowRight, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface FlashcardInteractivePageProps {
  flashcard: {
    id: string;
    question: string;
    answer: string;
    formula?: string;
    hint?: string;
    relatedConcepts?: any[];
    relatedFlashcards?: any[];
    relatedExams?: any[];
  };
}

const FlashcardInteractivePage = ({ flashcard }: FlashcardInteractivePageProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('');
  const [activeTab, setActiveTab] = useState('question');
  const [showRelated, setShowRelated] = useState(true);

  // Handle calculator input
  const handleCalcInput = (value: string) => {
    if (value === '=') {
      try {
        setCalculatorValue(eval(calculatorValue).toString());
      } catch (error) {
        setCalculatorValue('Error');
      }
    } else if (value === 'C') {
      setCalculatorValue('');
    } else if (value === '←') {
      setCalculatorValue(prev => prev.slice(0, -1));
    } else {
      setCalculatorValue(prev => prev + value);
    }
  };

  // Placeholder for related content if none provided
  const placeholderConcepts = [
    { id: 'c1', title: 'Newton\'s Laws of Motion' },
    { id: 'c2', title: 'Kinetic Energy' },
    { id: 'c3', title: 'Potential Energy' }
  ];

  const placeholderFlashcards = [
    { id: 'f1', title: 'Conservation of Momentum' },
    { id: 'f2', title: 'Energy Conversion' }
  ];

  const placeholderExams = [
    { id: 'e1', title: 'Physics Mock Test' },
    { id: 'e2', title: 'Energy and Work Practice Quiz' }
  ];

  // Use provided related content or placeholders
  const relatedConcepts = flashcard.relatedConcepts?.length > 0 ? flashcard.relatedConcepts : placeholderConcepts;
  const relatedFlashcards = flashcard.relatedFlashcards?.length > 0 ? flashcard.relatedFlashcards : placeholderFlashcards;
  const relatedExams = flashcard.relatedExams?.length > 0 ? flashcard.relatedExams : placeholderExams;

  return (
    <MathJaxContext>
      <div className="space-y-6">
        {/* Advanced Flashcard Section */}
        <Card className="relative overflow-hidden border-2 border-blue-100 dark:border-blue-900 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30">
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Flashcard</span>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Hint
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="text-violet-600 hover:text-violet-800 dark:text-violet-400"
                >
                  <Calculator className="h-4 w-4 mr-1" />
                  Calculator
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="question">Question</TabsTrigger>
                <TabsTrigger value="answer">Answer</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <TabsContent value="question">
                {/* Formula Display */}
                {flashcard.formula && (
                  <div className="p-4 mb-4 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 rounded-lg border border-violet-100 dark:border-violet-800 shadow-sm">
                    <h3 className="text-sm font-semibold mb-1 text-violet-700 dark:text-violet-400">Formula</h3>
                    <MathJax className="text-center text-lg">{flashcard.formula}</MathJax>
                  </div>
                )}

                {/* Question */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-medium mb-2">
                    <MathJax>{flashcard.question}</MathJax>
                  </h3>
                  
                  {/* Hint Section */}
                  {showHint && flashcard.hint && (
                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                      <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">Hint</h4>
                      <p><MathJax>{flashcard.hint}</MathJax></p>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAnswer(true)}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Show Answer
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ArrowLeft size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="answer">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 shadow-inner">
                  <h3 className="text-sm font-semibold mb-2 text-blue-700 dark:text-blue-400">Solution</h3>
                  <div className="text-lg">
                    <MathJax>{flashcard.answer}</MathJax>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>

          {/* Calculator */}
          {showCalculator && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h3 className="text-sm font-semibold mb-2">Scientific Calculator</h3>
              
              <div className="mb-4">
                <input 
                  type="text" 
                  value={calculatorValue} 
                  readOnly 
                  className="w-full p-2 text-right rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  '7', '8', '9', '/',
                  '4', '5', '6', '*',
                  '1', '2', '3', '-',
                  '0', '.', '=', '+'
                ].map((key) => (
                  <Button 
                    key={key} 
                    variant="outline" 
                    className="w-full h-10"
                    onClick={() => handleCalcInput(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  'sin', 'cos', 'tan', '^',
                  '(', ')', 'π', 'e',
                  'log', 'ln', '√', 'C',
                  '←', 'EXP', 'ANS', '%'
                ].map((key) => (
                  <Button 
                    key={key} 
                    variant="secondary" 
                    size="sm"
                    className="w-full h-8"
                    onClick={() => handleCalcInput(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Related Content Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Related Resources</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRelated(!showRelated)}
              className="flex items-center gap-1"
            >
              {showRelated ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showRelated ? "Hide" : "Show"}
            </Button>
          </div>

          {showRelated && (
            <div className="grid gap-6">
              {/* Related Concepts */}
              {relatedConcepts && relatedConcepts.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Book className="h-5 w-5 text-blue-500" />
                    Related Concepts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedConcepts.map((concept) => (
                      <Link key={concept.id} to={`/dashboard/student/concepts/${concept.id}`}>
                        <Card className="hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <Book className="h-4 w-4 text-blue-500 mb-2" />
                            <h4 className="font-medium">{concept.title}</h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Flashcards */}
              {relatedFlashcards && relatedFlashcards.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-violet-500" />
                    Related Flashcards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedFlashcards.map((flashcard) => (
                      <Link key={flashcard.id} to={`/dashboard/student/flashcards/${flashcard.id}`}>
                        <Card className="hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <Brain className="h-4 w-4 text-violet-500 mb-2" />
                            <h4 className="font-medium">{flashcard.title}</h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Exams */}
              {relatedExams && relatedExams.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    Related Practice Exams
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedExams.map((exam) => (
                      <Link key={exam.id} to={`/dashboard/student/exams/${exam.id}`}>
                        <Card className="hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <FileText className="h-4 w-4 text-green-500 mb-2" />
                            <h4 className="font-medium">{exam.title}</h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MathJaxContext>
  );
};

export default FlashcardInteractivePage;
