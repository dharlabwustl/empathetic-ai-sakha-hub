
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Book, Brain, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

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

  return (
    <MathJaxContext>
      <div className="space-y-6">
        {/* Interactive Flashcard Section */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Interactive Flashcard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Formula Display */}
              {flashcard.formula && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <MathJax>{flashcard.formula}</MathJax>
                </div>
              )}

              {/* Question */}
              <div className="text-lg font-medium">
                <MathJax>{flashcard.question}</MathJax>
              </div>

              {/* Tools */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCalculator(!showCalculator)}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculator
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Button>
              </div>

              {/* Answer Section */}
              {showAnswer && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <MathJax>{flashcard.answer}</MathJax>
                </div>
              )}

              {/* Calculator */}
              {showCalculator && (
                <div className="mt-4 p-4 border rounded-lg">
                  {/* Basic calculator implementation */}
                  <div className="grid grid-cols-4 gap-2">
                    {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((key) => (
                      <Button key={key} variant="outline" className="w-full">
                        {key}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Content */}
        <div className="grid gap-6">
          {/* Related Concepts */}
          {flashcard.relatedConcepts && flashcard.relatedConcepts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {flashcard.relatedConcepts.map((concept) => (
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

          {/* Similar pattern for related flashcards and practice exams */}
        </div>
      </div>
    </MathJaxContext>
  );
};

export default FlashcardInteractivePage;
