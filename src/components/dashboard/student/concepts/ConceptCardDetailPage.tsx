
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentService } from '@/services/api/apiServices';
import { 
  Loader2, Book, Clock, Laptop, CheckCircle, BookOpen, BrainCircuit, 
  Zap, Lightbulb, ArrowLeft, MessageSquare, Volume2, Flag,
  Bookmark, PenLine, Brain, Star, RotateCcw, VideoIcon, Paperclip
} from 'lucide-react';
import { ConceptMasterySection } from '@/components/dashboard/student/concepts/ConceptMasterySection';
import { useToast } from '@/hooks/use-toast';
import FormulaSection from './FormulaSection';
import RelatedFlashcards from './RelatedFlashcards';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [userNotes, setUserNotes] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [recallQuestions, setRecallQuestions] = useState<{question: string; answer: string; revealed: boolean}[]>([]);
  
  // Refs
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Mock data for testing UI
  const mockConcept = {
    id: conceptId || '',
    title: 'Newton\'s Laws of Motion',
    description: 'Newton\'s three laws of motion are the foundation of classical mechanics.',
    content: `
      <h2>First Law: Law of Inertia</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
      
      <h2>Second Law: F = ma</h2>
      <p>The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.</p>
      
      <h2>Third Law: Action-Reaction</h2>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
    `,
    subject: 'Physics',
    chapter: 'Classical Mechanics',
    difficulty: 'Intermediate',
    estimatedTimeMinutes: 20,
    prerequisites: ['Basic Physics', 'Vector Mathematics'],
    keyTakeaways: [
      'Understanding inertia and its role in motion',
      'Relationship between force, mass and acceleration',
      'Action-reaction pairs in physical interactions'
    ],
    relatedConcepts: [
      { id: 'concept-momentum', title: 'Momentum and Conservation' },
      { id: 'concept-energy', title: 'Work and Energy' }
    ],
    flashcards: [
      { id: 'flash-1', front: 'What is Newton\'s First Law?', back: 'The law of inertia: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an unbalanced force.' },
      { id: 'flash-2', front: 'What is Newton\'s Second Law?', back: 'F = ma. The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.' }
    ],
    formulas: [
      { id: 'formula-1', name: 'Newton\'s Second Law', formula: 'F = m × a', variables: 'F = force, m = mass, a = acceleration' },
      { id: 'formula-2', name: 'Weight', formula: 'W = m × g', variables: 'W = weight, m = mass, g = gravitational acceleration' }
    ],
    examples: [
      'A book resting on a table remains at rest because the forces acting on it are balanced.',
      'When you push a shopping cart, it accelerates in proportion to the force you apply and inversely to its mass.'
    ],
    visualAids: [
      { type: 'image', url: '/assets/images/newtons-laws-diagram.png', caption: 'Visual representation of Newton\'s Laws' },
      { type: 'video', url: 'https://example.com/videos/newtons-laws.mp4', caption: 'Animation demonstrating Newton\'s Laws' }
    ],
    practiceQuestions: [
      {
        question: 'A 5 kg object is acted upon by a 10 N force. What is its acceleration?',
        options: ['1 m/s²', '2 m/s²', '5 m/s²', '10 m/s²'],
        correctAnswer: '2 m/s²',
        explanation: 'Using F = ma, we get a = F/m = 10N/5kg = 2 m/s²'
      },
      {
        question: 'Which of Newton\'s laws explains why passengers move forward when a bus stops suddenly?',
        options: ['First Law', 'Second Law', 'Third Law', 'None of the above'],
        correctAnswer: 'First Law',
        explanation: 'The First Law (inertia) explains that objects in motion tend to stay in motion unless acted upon by an external force.'
      }
    ]
  };
  
  // Generate quick recall questions based on concept
  useEffect(() => {
    if (concept) {
      const questionsList = [
        {
          question: `What is the main principle of ${concept.title}?`,
          answer: concept.description,
          revealed: false
        },
        {
          question: `What is ${concept.title} used for?`,
          answer: concept.keyTakeaways[0],
          revealed: false
        },
        {
          question: `How does ${concept.title} relate to other concepts in ${concept.subject}?`,
          answer: `${concept.title} is fundamental to understanding ${concept.chapter} and connects to concepts like ${concept.relatedConcepts.map((c: any) => c.title).join(', ')}.`,
          revealed: false
        }
      ];
      setRecallQuestions(questionsList);
    }
  }, [concept]);
  
  // Initialize speech synthesis
  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis;
    return () => {
      if (speechSynthesisRef.current && speechUtteranceRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    const fetchConceptDetails = async () => {
      setLoading(true);
      try {
        if (!conceptId) {
          throw new Error('Concept ID is required');
        }
        
        // In a production app, this would be a real API call
        // const response = await contentService.getConceptById(conceptId);
        
        // For demo, we'll use mock data
        setTimeout(() => {
          setConcept(mockConcept);
          
          // Check if there are saved notes for this concept
          const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
          if (savedNotes) {
            setUserNotes(savedNotes);
          }
          
          // Check if the concept is bookmarked
          const bookmarks = JSON.parse(localStorage.getItem('concept-bookmarks') || '[]');
          setIsBookmarked(bookmarks.includes(conceptId));
          
          // Check if the concept is flagged for revision
          const flagged = JSON.parse(localStorage.getItem('concept-flagged') || '[]');
          setIsFlagged(flagged.includes(conceptId));
          
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error('Error fetching concept details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load concept details. Please try again.',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };
    
    fetchConceptDetails();
  }, [conceptId, toast]);
  
  const handleStartStudySession = () => {
    if (conceptId) {
      navigate(`/dashboard/student/concept-study/${conceptId}`);
    }
  };
  
  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
    toast({
      title: 'Notes Saved',
      description: 'Your notes have been saved successfully.',
    });
  };
  
  const handleToggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('concept-bookmarks') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((id: string) => id !== conceptId);
      toast({
        title: 'Bookmark Removed',
        description: 'This concept has been removed from your bookmarks.',
      });
    } else {
      updatedBookmarks = [...bookmarks, conceptId];
      toast({
        title: 'Bookmarked',
        description: 'This concept has been added to your bookmarks.',
      });
    }
    
    localStorage.setItem('concept-bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };
  
  const handleToggleFlag = () => {
    const flagged = JSON.parse(localStorage.getItem('concept-flagged') || '[]');
    let updatedFlagged;
    
    if (isFlagged) {
      updatedFlagged = flagged.filter((id: string) => id !== conceptId);
      toast({
        title: 'Flag Removed',
        description: 'This concept has been removed from your revision list.',
      });
    } else {
      updatedFlagged = [...flagged, conceptId];
      toast({
        title: 'Flagged for Revision',
        description: 'This concept has been added to your revision list.',
      });
    }
    
    localStorage.setItem('concept-flagged', JSON.stringify(updatedFlagged));
    setIsFlagged(!isFlagged);
  };
  
  const handleReadAloud = () => {
    if (!concept) return;
    
    if (isSpeaking && speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const textToSpeak = `${concept.title}. ${concept.description}. ${stripHtml(concept.content)}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechUtteranceRef.current = utterance;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    speechSynthesisRef.current?.speak(utterance);
    setIsSpeaking(true);
  };
  
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const toggleRevealAnswer = (index: number) => {
    const updatedQuestions = [...recallQuestions];
    updatedQuestions[index].revealed = !updatedQuestions[index].revealed;
    setRecallQuestions(updatedQuestions);
  };
  
  const handleAskAITutor = () => {
    const question = prompt("What would you like to ask the AI tutor about this concept?");
    if (question) {
      toast({
        title: 'Question Sent',
        description: 'Your question has been sent to the AI tutor. Check the chat panel for a response.',
      });
      // In a real implementation, we would send this question to an AI service
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading concept details...</span>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="text-center p-8">
        <p>Concept not found. Please check the URL or try again later.</p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          Back to Concepts
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{concept.title}</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                {concept.difficulty}
              </Badge>
              {isBookmarked && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Bookmarked
                </Badge>
              )}
              {isFlagged && (
                <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                  <Flag className="h-3 w-3 mr-1" />
                  Flagged for Revision
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Book className="h-4 w-4 mr-1" />
              <span className="mr-3">{concept.subject}</span>
              <span className="mx-2">•</span>
              <span>{concept.chapter}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{concept.estimatedTimeMinutes} min</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleReadAloud}
                className={isSpeaking ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : ""}
              >
                <Volume2 className="mr-1 h-4 w-4" />
                {isSpeaking ? "Stop Reading" : "Read Aloud"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleToggleBookmark}
                className={isBookmarked ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300" : ""}
              >
                <Bookmark className="mr-1 h-4 w-4" />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleToggleFlag}
                className={isFlagged ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300" : ""}
              >
                <Flag className="mr-1 h-4 w-4" />
                {isFlagged ? "Flagged" : "Flag for Revision"}
              </Button>
              
              <Button 
                onClick={handleStartStudySession}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Laptop className="mr-2 h-4 w-4" />
                Start Study Session
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes">
            <PenLine className="h-4 w-4 mr-2" />
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="recall">
            <Brain className="h-4 w-4 mr-2" />
            <span>Quick Recall</span>
          </TabsTrigger>
          <TabsTrigger value="mastery">
            <BrainCircuit className="h-4 w-4 mr-2" />
            <span>Mastery</span>
          </TabsTrigger>
          <TabsTrigger value="formulas">
            <Zap className="h-4 w-4 mr-2" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span>Flashcards</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Details</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: concept.content }} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={handleAskAITutor}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask AI Tutor
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleToggleBookmark}>
                      <Bookmark className="mr-1 h-4 w-4" />
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleToggleFlag}>
                      <Flag className="mr-1 h-4 w-4" />
                      {isFlagged ? "Flagged" : "Flag for Revision"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Examples & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.examples.map((example: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {concept.visualAids && concept.visualAids.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Visual Aids</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {concept.visualAids.map((aid: any, index: number) => (
                        <div key={index} className="border rounded-lg p-2">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mb-2">
                            {aid.type === 'video' ? (
                              <div className="flex flex-col items-center">
                                <VideoIcon className="h-10 w-10 text-blue-500" />
                                <span className="text-sm mt-2">Video Content</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Paperclip className="h-10 w-10 text-blue-500" />
                                <span className="text-sm mt-2">Image Content</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-center text-muted-foreground">{aid.caption}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {concept.practiceQuestions && concept.practiceQuestions.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Practice Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {concept.practiceQuestions.map((q: any, idx: number) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Question {idx + 1}: {q.question}</h3>
                          <div className="space-y-2 mb-4">
                            {q.options.map((option: string, i: number) => (
                              <div key={i} className={`p-2 rounded-md ${option === q.correctAnswer ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                                {option}
                                {option === q.correctAnswer && (
                                  <span className="ml-2 text-green-600 dark:text-green-400">✓ Correct</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                            <p className="text-sm text-blue-700 dark:text-blue-300"><strong>Explanation:</strong> {q.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Key Takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.keyTakeaways.map((takeaway: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {concept.prerequisites.map((prereq: string, index: number) => (
                      <div key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                        {prereq}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Related Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {concept.relatedConcepts.map((related: any) => (
                      <Button
                        key={related.id}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                      >
                        {related.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Completion</span>
                        <span className="text-sm">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Quiz Score</span>
                        <span className="text-sm">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Mastery Level</span>
                        <span className="text-sm">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm">Last studied: 2 days ago</span>
                    <Badge variant="outline">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>Intermediate</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
              <CardDescription>Take notes as you study this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={userNotes} 
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Start typing your notes here..."
                className="min-h-[300px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last saved: {new Date().toLocaleString()}</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setUserNotes('')}>
                  Clear
                </Button>
                <Button onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="recall" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Recall Practice</CardTitle>
              <CardDescription>Test your understanding with these recall questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recallQuestions.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4">
                      <h3 className="font-medium">Question {index + 1}: {item.question}</h3>
                    </div>
                    <div className="p-4">
                      {item.revealed ? (
                        <>
                          <p className="mb-4">{item.answer}</p>
                          <Button variant="outline" size="sm" onClick={() => toggleRevealAnswer(index)}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Hide Answer
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => toggleRevealAnswer(index)}>
                          Reveal Answer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleAskAITutor}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI Tutor
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="mastery">
          <ConceptMasterySection 
            conceptId={concept.id}
            recallAccuracy={65}
            quizScore={72}
            lastPracticed="2023-05-15T14:30:00Z"
          />
        </TabsContent>
        
        <TabsContent value="formulas">
          <FormulaSection formulas={concept.formulas} conceptTitle={concept.title} />
        </TabsContent>
        
        <TabsContent value="flashcards">
          <RelatedFlashcards flashcards={concept.flashcards} conceptTitle={concept.title} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
