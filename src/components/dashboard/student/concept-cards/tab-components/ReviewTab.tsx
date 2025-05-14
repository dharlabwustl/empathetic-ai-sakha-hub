
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, ThumbsUp, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReviewTabProps {
  concept: {
    id: string;
    title: string;
    quizQuestions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
    reviewNotes?: string;
  };
}

const ReviewTab: React.FC<ReviewTabProps> = ({ concept }) => {
  const quizQuestions = concept.quizQuestions || [
    {
      id: 'q1',
      question: 'What is the primary function of mitochondria in a cell?',
      options: [
        'Protein synthesis',
        'Energy production',
        'DNA replication',
        'Cell division'
      ],
      correctAnswer: 1,
      explanation: 'Mitochondria are often called the powerhouses of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), the source of chemical energy.'
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a component of the cell nucleus?',
      options: [
        'Nucleolus',
        'Chromatin',
        'Ribosomes',
        'Nuclear membrane'
      ],
      correctAnswer: 2,
      explanation: 'Ribosomes are not components of the nucleus. They are found in the cytoplasm and on the endoplasmic reticulum, and they are responsible for protein synthesis.'
    }
  ];
  
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number | null }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [reviewNotes, setReviewNotes] = useState<string>(concept.reviewNotes || '');
  const [notesEditable, setNotesEditable] = useState<boolean>(false);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return; // Prevent changing answers after results are shown
    
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCheckAnswers = () => {
    // Check if all questions have answers
    const unansweredQuestions = quizQuestions.filter(q => userAnswers[q.id] === undefined);
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Please answer all questions",
        description: `${unansweredQuestions.length} questions remain unanswered`,
        variant: "destructive"
      });
      return;
    }
    
    setShowResults(true);
    
    // Calculate results
    const correctAnswers = quizQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;
    
    toast({
      title: "Quiz Results",
      description: `You got ${correctAnswers} out of ${quizQuestions.length} questions correct!`,
      variant: correctAnswers === quizQuestions.length ? "default" : "destructive"
    });
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const handleSaveNotes = () => {
    setNotesEditable(false);
    
    toast({
      title: "Notes Saved",
      description: "Your review notes have been saved successfully"
    });
  };

  const getScore = () => {
    const correctAnswers = quizQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;
    
    return {
      correct: correctAnswers,
      total: quizQuestions.length,
      percentage: Math.round((correctAnswers / quizQuestions.length) * 100)
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Self-Review Quiz</h3>
        <Card>
          <CardContent className="p-4">
            {showResults && (
              <div className="mb-6 p-4 rounded-lg bg-muted">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Quiz Results</h4>
                  <Button variant="outline" size="sm" onClick={handleResetQuiz}>
                    Retry Quiz
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-2xl font-bold ${getScore().percentage >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                    {getScore().percentage}%
                  </div>
                  <div className="text-sm">
                    ({getScore().correct}/{getScore().total} correct)
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {quizQuestions.map((question, qIndex) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="font-medium text-lg">{qIndex + 1}.</span>
                    <span className="font-medium text-lg">{question.question}</span>
                  </div>
                  
                  <div className="space-y-2 ml-6">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex}
                        className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-colors
                          ${showResults 
                            ? oIndex === question.correctAnswer 
                              ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-900' 
                              : userAnswers[question.id] === oIndex 
                                ? 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-900'
                                : 'bg-muted/50'
                            : userAnswers[question.id] === oIndex 
                              ? 'bg-primary/10 border border-primary/30' 
                              : 'bg-muted hover:bg-primary/5'
                          }`}
                        onClick={() => handleOptionSelect(question.id, oIndex)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center border 
                            ${userAnswers[question.id] === oIndex 
                              ? 'border-primary bg-primary/10' 
                              : 'border-muted-foreground'}`}
                          >
                            {userAnswers[question.id] === oIndex && (
                              <div className="h-3 w-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                        
                        {showResults && (
                          <div>
                            {oIndex === question.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : userAnswers[question.id] === oIndex ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {showResults && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-md">
                        <div className="font-medium mb-1">Explanation:</div>
                        <div className="text-sm">{question.explanation}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {!showResults && (
              <div className="mt-4 flex justify-end">
                <Button onClick={handleCheckAnswers}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check Answers
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Review Notes</h3>
          {!notesEditable ? (
            <Button variant="outline" size="sm" onClick={() => setNotesEditable(true)}>
              Edit Notes
            </Button>
          ) : (
            <Button size="sm" onClick={handleSaveNotes}>
              Save Notes
            </Button>
          )}
        </div>
        
        <Card>
          <CardContent className="p-4">
            {notesEditable ? (
              <Textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add your review notes here..."
                className="min-h-[200px]"
              />
            ) : (
              <div className="prose max-w-none dark:prose-invert min-h-[200px]">
                {reviewNotes ? (
                  reviewNotes.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <AlertCircle className="mb-2 h-12 w-12" />
                    <p>No review notes added yet. Click "Edit Notes" to add some!</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewTab;
