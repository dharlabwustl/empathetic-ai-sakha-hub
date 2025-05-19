
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen,
  MessageSquare,
  FileText,
  PenTool,
  Volume2,
  VolumeX,
  BookmarkPlus,
  BookmarkCheck,
  Flag,
  Brain,
  Link,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

// Mock data for concept
const mockConceptData = {
  id: '1',
  title: 'Newton\'s Laws of Motion',
  subject: 'Physics',
  chapter: 'Classical Mechanics',
  difficulty: 'Medium',
  timeToComplete: '25 minutes',
  masteryLevel: 72,
  description: 'Newton\'s laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
  content: `
    <h2>First Law: Law of Inertia</h2>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
    
    <h2>Second Law: F = ma</h2>
    <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The direction of the acceleration is in the direction of the applied net force.</p>
    
    <h2>Third Law: Action and Reaction</h2>
    <p>For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.</p>
    
    <h3>Applications</h3>
    <ul>
      <li>Rocket propulsion</li>
      <li>Walking</li>
      <li>Swimming</li>
      <li>Car acceleration and braking</li>
    </ul>
  `,
  formulas: [
    {
      id: 'f1',
      name: 'Second Law of Motion',
      formula: 'F = m × a',
      variables: [
        { symbol: 'F', name: 'Force', unit: 'N (Newtons)' },
        { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
        { symbol: 'a', name: 'Acceleration', unit: 'm/s² (meters per second squared)' }
      ]
    },
    {
      id: 'f2',
      name: 'Weight Formula',
      formula: 'W = m × g',
      variables: [
        { symbol: 'W', name: 'Weight', unit: 'N (Newtons)' },
        { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
        { symbol: 'g', name: 'Gravitational acceleration', unit: 'm/s² (meters per second squared)' }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: 'q1',
      question: 'A 2kg object experiences a net force of 10N. What is its acceleration?',
      options: [
        '2 m/s²',
        '5 m/s²',
        '10 m/s²',
        '20 m/s²'
      ],
      answer: 1,
      explanation: 'Using Newton\'s Second Law (F = ma), a = F/m = 10N/2kg = 5 m/s²'
    },
    {
      id: 'q2',
      question: 'Which of Newton\'s laws explains rocket propulsion?',
      options: [
        'First law',
        'Second law',
        'Third law',
        'None of the above'
      ],
      answer: 2,
      explanation: 'Newton\'s Third Law: The rocket pushes gas particles out the back, and the gas particles push the rocket forward with an equal and opposite force.'
    }
  ],
  relatedConcepts: [
    { id: '2', title: 'Momentum and Impulse', subject: 'Physics' },
    { id: '3', title: 'Work and Energy', subject: 'Physics' },
    { id: '4', title: 'Circular Motion', subject: 'Physics' }
  ]
};

interface EnhancedConceptDetailProps {
  conceptId: string;
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({ conceptId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept, setConcept] = useState(mockConceptData);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isAskingDoubt, setIsAskingDoubt] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Fetch concept data
  useEffect(() => {
    // In a real app, fetch data based on conceptId
    console.log(`Fetching concept data for ID: ${conceptId}`);
    // setConcept would be set with actual API data
  }, [conceptId]);

  // Handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
      description: isBookmarked 
        ? `${concept.title} removed from your bookmarks` 
        : `${concept.title} added to your bookmarks for quick access`,
    });
  };

  // Handle flag for revision
  const handleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? 'Removed from revision list' : 'Flagged for revision',
      description: isFlagged 
        ? `${concept.title} removed from your revision list` 
        : `${concept.title} added to your revision list`,
    });
  };

  // Handle read aloud functionality
  const handleReadAloud = () => {
    if (!speechSynthesis) return;
    
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      // Extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = concept.content;
      const textToRead = tempDiv.textContent || tempDiv.innerText;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.onend = () => setIsReadingAloud(false);
      
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  // Handle practicing a question
  const handlePracticeQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  // Handle selecting an answer
  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (selectedQuestionIndex === null || selectedAnswer === null) return;
    
    setShowAnswer(true);
    setIsQuizSubmitted(true);
    
    const isCorrect = selectedAnswer === concept.practiceQuestions[selectedQuestionIndex].answer;
    
    toast({
      title: isCorrect ? 'Correct Answer!' : 'Incorrect Answer',
      description: isCorrect 
        ? 'Well done! You got it right.' 
        : `The correct answer is: ${concept.practiceQuestions[selectedQuestionIndex].options[concept.practiceQuestions[selectedQuestionIndex].answer]}`,
      variant: isCorrect ? 'default' : 'destructive',
    });
  };

  // Handle asking a doubt
  const handleAskDoubt = () => {
    if (!doubtQuestion.trim()) return;
    
    toast({
      title: 'Question Submitted',
      description: 'Your question has been sent to our AI Tutor.',
    });
    
    setIsAskingDoubt(false);
    setDoubtQuestion('');
    
    // In a real app, this would send the question to an API endpoint
    setTimeout(() => {
      toast({
        title: 'AI Tutor Response',
        description: 'Your answer is ready! Check the chat panel to view it.',
      });
    }, 2000);
  };

  // Handle saving notes
  const handleSaveNotes = () => {
    toast({
      title: 'Notes Saved',
      description: 'Your notes have been saved successfully',
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      {/* Back button and actions */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-muted-foreground" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Concepts
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={isReadingAloud ? "destructive" : "outline"} 
            size="sm"
            onClick={handleReadAloud}
            className="flex items-center gap-1"
          >
            {isReadingAloud ? (
              <>
                <VolumeX className="h-4 w-4" />
                Stop Reading
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Read Aloud
              </>
            )}
          </Button>
          
          <Button 
            variant={isBookmarked ? "default" : "outline"} 
            size="sm"
            onClick={handleBookmark}
            className="flex items-center gap-1"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Bookmarked
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4" />
                Bookmark
              </>
            )}
          </Button>
          
          <Button 
            variant={isFlagged ? "warning" : "outline"} 
            size="sm"
            onClick={handleFlag}
            className={`flex items-center gap-1 ${isFlagged ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
          >
            <Flag className="h-4 w-4" />
            {isFlagged ? 'Flagged' : 'Flag for Revision'}
          </Button>
        </div>
      </div>
      
      {/* Concept header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{concept.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              {concept.chapter}
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              {concept.difficulty}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Mastery Level:</span>
          <div className="flex-grow max-w-64">
            <Progress value={concept.masteryLevel} className="h-2" />
          </div>
          <span className="text-sm font-medium">{concept.masteryLevel}%</span>
        </div>
        
        <p className="text-muted-foreground">{concept.description}</p>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="content" className="mb-6">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="content" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>Practice</span>
          </TabsTrigger>
          <TabsTrigger value="related" className="flex items-center gap-1">
            <Link className="h-4 w-4" />
            <span>Related</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <PenTool className="h-4 w-4" />
            <span>My Notes</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: concept.content }}
              />
              
              <div className="mt-6 border-t pt-4">
                <Button 
                  onClick={() => setIsAskingDoubt(true)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask a Doubt
                </Button>
                
                {isAskingDoubt && (
                  <div className="mt-4 border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Ask Your Doubt</h3>
                    <Textarea 
                      placeholder="Type your question about this concept..."
                      value={doubtQuestion}
                      onChange={(e) => setDoubtQuestion(e.target.value)}
                      className="mb-4"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAskingDoubt(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAskDoubt}>
                        Submit Question
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Formulas Tab */}
        <TabsContent value="formulas">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                {concept.formulas.map(formula => (
                  <div key={formula.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="text-lg font-medium mb-2">{formula.name}</h3>
                    <div className="text-2xl font-bold mb-4 text-center py-3 bg-white dark:bg-gray-800 rounded-md">
                      {formula.formula}
                    </div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Variables:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {formula.variables.map(variable => (
                        <div key={variable.symbol} className="border rounded p-2 text-sm">
                          <span className="font-medium">{variable.symbol}</span>: {variable.name} ({variable.unit})
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => navigate(`/concepts/${conceptId}/formula-lab`)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Formula Lab
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Practice Tab */}
        <TabsContent value="practice">
          <Card>
            <CardContent className="pt-6">
              {selectedQuestionIndex !== null ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Question {selectedQuestionIndex + 1}</h3>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedQuestionIndex(null)}
                    >
                      Back to Questions
                    </Button>
                  </div>
                  
                  <div className="mb-6 border-b pb-4">
                    <p className="text-lg mb-4">
                      {concept.practiceQuestions[selectedQuestionIndex].question}
                    </p>
                    
                    <RadioGroup 
                      value={selectedAnswer?.toString()} 
                      onValueChange={(value) => handleSelectAnswer(Number(value))}
                      disabled={showAnswer}
                    >
                      {concept.practiceQuestions[selectedQuestionIndex].options.map((option, i) => (
                        <div key={i} className="flex items-start space-x-2 my-2">
                          <RadioGroupItem value={i.toString()} id={`option-${i}`} />
                          <Label htmlFor={`option-${i}`} className="flex-1">{option}</Label>
                          {showAnswer && i === concept.practiceQuestions[selectedQuestionIndex].answer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {showAnswer && selectedAnswer === i && i !== concept.practiceQuestions[selectedQuestionIndex].answer && (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {!showAnswer ? (
                    <Button 
                      onClick={handleSubmitAnswer} 
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Explanation:</h4>
                      <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        {concept.practiceQuestions[selectedQuestionIndex].explanation}
                      </p>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" onClick={() => {
                          setSelectedQuestionIndex(null);
                          setSelectedAnswer(null);
                          setShowAnswer(false);
                        }}>
                          Try Another Question
                        </Button>
                        
                        <Button variant="default" onClick={() => {
                          const nextIndex = (selectedQuestionIndex + 1) % concept.practiceQuestions.length;
                          setSelectedQuestionIndex(nextIndex);
                          setSelectedAnswer(null);
                          setShowAnswer(false);
                        }}>
                          Next Question
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-4">Practice Questions</h3>
                  <div className="grid gap-3">
                    {concept.practiceQuestions.map((question, index) => (
                      <div 
                        key={question.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                        onClick={() => handlePracticeQuestion(index)}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Badge variant={isQuizSubmitted ? "outline" : "secondary"}>
                            {isQuizSubmitted ? "Attempted" : "New"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground line-clamp-1 mt-1">
                          {question.question}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <Button variant="outline" className="w-full">
                      Take a Full Quiz on This Concept
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Related Concepts Tab */}
        <TabsContent value="related">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Related Concepts</h3>
              <div className="grid gap-3">
                {concept.relatedConcepts.map(relatedConcept => (
                  <div 
                    key={relatedConcept.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/student/concept-study/${relatedConcept.id}`)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{relatedConcept.title}</h4>
                      <Badge variant="outline">{relatedConcept.subject}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Link className="h-4 w-4" />
                      <span>Open concept</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">My Notes</h3>
              <Textarea 
                placeholder="Type your notes about this concept here..."
                className="min-h-[200px] mb-4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Study tips */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Study Tips for {concept.title}</CardTitle>
          </div>
          <CardDescription>Personalized recommendations to master this concept</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="mt-1 bg-green-100 text-green-700 rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span>Associate each law with real-life examples to build intuitive understanding.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 bg-green-100 text-green-700 rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span>Practice solving problems involving all three laws to see how they interconnect.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 bg-green-100 text-green-700 rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span>Create your own examples where these laws apply to strengthen your grasp.</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full">
            Generate More Study Tips
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnhancedConceptDetail;
