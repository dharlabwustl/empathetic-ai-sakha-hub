
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BookOpen,
  ChevronLeft,
  Lightbulb,
  BookmarkCheck,
  BookmarkPlus,
  Check,
  StickyNote,
  Headphones,
  HeadphonesOff,
  PauseCircle,
  PlayCircle,
  BarChart3,
  BadgeCheck,
  Clock,
  FileText,
  ArrowLeft,
  ArrowRight,
  Share,
} from 'lucide-react';
import LoadingState from '@/components/common/LoadingState';
import { useToast } from '@/hooks/use-toast';

// Mock data for concept
const mockConcepts = [
  {
    id: 'concept-1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'Medium',
    content: `
      <h2>Introduction to Newton's Laws</h2>
      <p>Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it.</p>
      
      <h3>First Law (Law of Inertia)</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.</p>
      
      <h3>Second Law (F = ma)</h3>
      <p>The acceleration of an object depends on the mass of the object and the amount of force applied. The mathematical formula is:</p>
      <p><strong>F = ma</strong></p>
      <p>where F is force, m is mass, and a is acceleration.</p>
      
      <h3>Third Law (Action-Reaction)</h3>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
      
      <h3>Applications</h3>
      <p>These laws explain everyday phenomena like:</p>
      <ul>
        <li>Why you move forward when a car stops suddenly</li>
        <li>How rockets propel themselves in space</li>
        <li>Why a heavier object requires more force to move</li>
      </ul>
    `,
    formulas: [
      { id: 'f1', formula: 'F = ma', description: 'Force equals mass times acceleration' },
      { id: 'f2', formula: 'p = mv', description: 'Momentum equals mass times velocity' },
      { id: 'f3', formula: 'Fₙᵉₜ = 0', description: 'Net force is zero for an object at equilibrium' }
    ],
    examples: [
      { 
        id: 'e1', 
        title: 'Car Braking', 
        description: 'When a car brakes suddenly, passengers continue moving forward due to inertia (First Law).' 
      },
      { 
        id: 'e2', 
        title: 'Rocket Propulsion', 
        description: 'Rockets expel gas in one direction and experience thrust in the opposite direction (Third Law).'
      }
    ],
    relatedConcepts: ['concept-2', 'concept-3', 'concept-4'],
    recallStrength: 65,
    lastReviewed: '2023-05-10'
  },
  {
    id: 'concept-2',
    title: 'Kinematics',
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'Medium',
    content: 'Kinematics is the study of motion without considering its causes...',
    relatedConcepts: ['concept-1', 'concept-3']
  },
  {
    id: 'concept-3',
    title: 'Conservation of Energy',
    subject: 'Physics',
    chapter: 'Energy',
    difficulty: 'Medium',
    content: 'The law of conservation of energy states that energy cannot be created or destroyed...',
    relatedConcepts: ['concept-1', 'concept-2']
  },
  {
    id: 'concept-4',
    title: 'Gravitation',
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'Hard',
    content: 'Newton\'s law of universal gravitation states that every particle attracts every other particle...',
    relatedConcepts: ['concept-1']
  }
];

// Mock flashcard data
const mockFlashcards = [
  {
    id: 'flash1',
    question: 'What is Newton\'s First Law?',
    answer: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.'
  },
  {
    id: 'flash2',
    question: 'What is the formula for Newton\'s Second Law?',
    answer: 'F = ma (Force equals mass times acceleration)'
  },
  {
    id: 'flash3',
    question: 'What is Newton\'s Third Law?',
    answer: 'For every action, there is an equal and opposite reaction.'
  }
];

// Mock exam questions
const mockExamQuestions = [
  {
    id: 'q1',
    question: 'A car accelerates from 0 to 60 km/h in 5 seconds. If the car has a mass of 1000 kg, what is the net force applied?',
    options: [
      { id: 'a', text: '3333 N' },
      { id: 'b', text: '2000 N' },
      { id: 'c', text: '3000 N' },
      { id: 'd', text: '5000 N' }
    ],
    correctAnswer: 'a',
    explanation: 'Using F = ma: First convert 60 km/h to m/s: 60 km/h = 16.67 m/s. Then calculate acceleration: a = change in velocity / time = 16.67 / 5 = 3.33 m/s². Finally, F = ma = 1000 kg × 3.33 m/s² = 3333 N.'
  },
  {
    id: 'q2',
    question: 'Which of Newton\'s laws explains why passengers in a vehicle move forward when the vehicle stops suddenly?',
    options: [
      { id: 'a', text: 'Newton\'s First Law' },
      { id: 'b', text: 'Newton\'s Second Law' },
      { id: 'c', text: 'Newton\'s Third Law' },
      { id: 'd', text: 'Law of Conservation of Energy' }
    ],
    correctAnswer: 'a',
    explanation: 'Newton\'s First Law (Law of Inertia) explains that an object in motion tends to stay in motion. When the car stops suddenly, the passengers continue moving forward due to inertia.'
  }
];

// AI Insights Mock Data
const mockAIInsights = [
  {
    id: 'ai1', 
    title: 'Connection to Everyday Life',
    content: 'Try to observe Newton\'s laws in your daily activities: riding a bicycle, throwing a ball, or even walking. This will help reinforce your understanding.'
  },
  {
    id: 'ai2', 
    title: 'Common Misconception',
    content: 'Many students confuse mass and weight. Remember that mass is a property of matter, while weight is a force caused by gravity.'
  },
  {
    id: 'ai3', 
    title: 'Exam Success Tip',
    content: 'In problems involving Newton\'s Second Law, always identify all forces acting on the object before calculating the net force.'
  }
];

const ConceptCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [relatedConcepts, setRelatedConcepts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [notes, setNotes] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const foundConcept = mockConcepts.find(c => c.id === id) || mockConcepts[0];
      setConcept(foundConcept);
      
      // Find related concept data
      if (foundConcept.relatedConcepts) {
        const related = mockConcepts.filter(c => 
          foundConcept.relatedConcepts.includes(c.id) && c.id !== foundConcept.id
        );
        setRelatedConcepts(related);
      }
      
      setLoading(false);
      
      // Load saved notes if any
      const savedNotes = localStorage.getItem(`concept-notes-${foundConcept.id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      // Check if bookmarked
      const bookmarked = localStorage.getItem(`concept-bookmark-${foundConcept.id}`);
      setIsBookmarked(bookmarked === 'true');
      
      // Check if understood
      const conceptUnderstood = localStorage.getItem(`concept-understood-${foundConcept.id}`);
      setUnderstood(conceptUnderstood === 'true');
      
    }, 800);
    
    // Clean up speech synthesis on unmount
    return () => {
      if (utteranceRef.current && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [id]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Stop speech if tab changes
    if (isSpeaking) {
      handleStopSpeech();
    }
  };
  
  // Text-to-speech functionality
  const handleReadAloud = () => {
    if (!concept) return;
    
    if (isSpeaking) {
      handleStopSpeech();
      return;
    }
    
    // Create a clean text version without HTML tags for reading aloud
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = concept.content;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    
    utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current.rate = 0.9; // Slightly slower for better comprehension
    utteranceRef.current.onend = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utteranceRef.current);
    setIsSpeaking(true);
    
    toast({
      title: "Reading aloud",
      description: "Text-to-speech has started. Click the button again to stop.",
    });
  };
  
  const handleStopSpeech = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Notes functionality
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    
    // Save to local storage
    if (concept) {
      localStorage.setItem(`concept-notes-${concept.id}`, newNotes);
    }
  };
  
  // Bookmark functionality
  const handleToggleBookmark = () => {
    if (!concept) return;
    
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    localStorage.setItem(`concept-bookmark-${concept.id}`, newBookmarkState.toString());
    
    toast({
      title: newBookmarkState ? "Concept Bookmarked" : "Bookmark Removed",
      description: newBookmarkState 
        ? "This concept has been added to your bookmarks." 
        : "This concept has been removed from your bookmarks.",
    });
  };
  
  // Mark as understood functionality
  const handleMarkUnderstood = () => {
    if (!concept) return;
    
    const newState = !understood;
    setUnderstood(newState);
    localStorage.setItem(`concept-understood-${concept.id}`, newState.toString());
    
    // Update recall strength in localStorage
    if (newState) {
      const currentDate = new Date().toISOString();
      localStorage.setItem(`concept-last-reviewed-${concept.id}`, currentDate);
      localStorage.setItem(`concept-recall-strength-${concept.id}`, '85'); // Boost recall strength
      
      toast({
        title: "Concept Mastered!",
        description: "Great job! Your recall strength has been updated.",
      });
    }
  };

  // Update recall strength
  const updateRecallStrength = (increase: boolean) => {
    if (!concept) return;
    
    const currentRecallStr = localStorage.getItem(`concept-recall-strength-${concept.id}`) || '50';
    let newStrength = parseInt(currentRecallStr);
    
    if (increase) {
      newStrength = Math.min(newStrength + 10, 100);
    } else {
      newStrength = Math.max(newStrength - 5, 0);
    }
    
    localStorage.setItem(`concept-recall-strength-${concept.id}`, newStrength.toString());
    
    // Update concept data for display
    setConcept({...concept, recallStrength: newStrength});
    
    toast({
      title: increase ? "Recall Improved!" : "Need More Review",
      description: increase 
        ? "Your understanding of this concept is improving." 
        : "Keep practicing this concept to improve recall.",
    });
  };
  
  // Get recall strength from localStorage or concept data
  const getRecallStrength = () => {
    if (!concept) return 0;
    
    const savedStrength = localStorage.getItem(`concept-recall-strength-${concept.id}`);
    if (savedStrength) {
      return parseInt(savedStrength);
    }
    
    return concept.recallStrength || 0;
  };
  
  if (loading) {
    return <LoadingState message="Loading concept..." />;
  }

  if (!concept) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load concept details. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <Link to="/dashboard/student/concepts" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Concepts
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleToggleBookmark}
              className={`${isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}`}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                  Bookmarked
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Bookmark
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link Copied!",
                  description: "Concept link copied to clipboard."
                });
              }}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {concept.chapter}
            </Badge>
            <Badge variant="outline" className={`
              ${concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                concept.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                'bg-red-50 text-red-700 border-red-200'}
            `}>
              {concept.difficulty} Difficulty
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              {/* Read aloud and other controls */}
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReadAloud}
                  className={isSpeaking ? 'bg-red-50 text-red-600' : ''}
                >
                  {isSpeaking ? (
                    <>
                      <HeadphonesOff className="h-4 w-4 mr-2" />
                      Stop Reading
                    </>
                  ) : (
                    <>
                      <Headphones className="h-4 w-4 mr-2" />
                      Read Aloud
                    </>
                  )}
                </Button>
                
                <Button 
                  variant={understood ? "default" : "outline"} 
                  size="sm"
                  onClick={handleMarkUnderstood}
                >
                  {understood ? (
                    <>
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      Understood
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Understood
                    </>
                  )}
                </Button>
              </div>
            
              {/* Tabs for different content sections */}
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="w-full grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="formulas">Formulas</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div 
                    className="prose max-w-none" 
                    dangerouslySetInnerHTML={{ __html: concept.content }}
                  />
                </TabsContent>
                
                {/* Formulas Tab */}
                <TabsContent value="formulas" className="space-y-4">
                  {concept.formulas ? (
                    <div className="space-y-4">
                      {concept.formulas.map((formula: any) => (
                        <div key={formula.id} className="p-4 border rounded-md bg-blue-50/30">
                          <div className="text-xl font-mono font-semibold text-center mb-2">
                            {formula.formula}
                          </div>
                          <p className="text-sm text-muted-foreground text-center">
                            {formula.description}
                          </p>
                        </div>
                      ))}
                      <div className="text-center mt-4">
                        <Button variant="outline">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Open Formula Lab
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No formulas available for this concept.</p>
                  )}
                </TabsContent>
                
                {/* Examples Tab */}
                <TabsContent value="examples" className="space-y-4">
                  {concept.examples ? (
                    <div className="space-y-4">
                      {concept.examples.map((example: any) => (
                        <div key={example.id} className="p-4 border rounded-md">
                          <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                          <p>{example.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No examples available for this concept.</p>
                  )}
                </TabsContent>
                
                {/* Practice Tab */}
                <TabsContent value="practice" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                          <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                          <h3 className="text-lg font-semibold">Flashcards</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Test your knowledge with flashcards related to {concept.title}.
                        </p>
                        <Button variant="outline" className="w-full">
                          Practice Flashcards ({mockFlashcards.length})
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                          <FileText className="h-5 w-5 mr-2 text-blue-600" />
                          <h3 className="text-lg font-semibold">Practice Questions</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Challenge yourself with exam-style questions.
                        </p>
                        <Button variant="outline" className="w-full">
                          Try Practice Exam ({mockExamQuestions.length} Questions)
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Notes Section */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center">
                <StickyNote className="h-5 w-5 mr-2 text-yellow-600" />
                <h3 className="text-lg font-semibold">My Notes</h3>
              </div>
              <Textarea 
                placeholder="Add your notes here... They will be saved automatically."
                value={notes}
                onChange={handleNotesChange}
                className="min-h-[150px] border border-yellow-200 focus:border-yellow-500"
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with related concepts, AI insights, recall tracking */}
        <div className="space-y-6">
          {/* Recall Strength */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold">Recall Strength</h3>
                </div>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last reviewed: {concept.lastReviewed ? new Date(concept.lastReviewed).toLocaleDateString() : 'Never'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory retention</span>
                  <span className="font-medium">{getRecallStrength()}%</span>
                </div>
                <Progress value={getRecallStrength()} className="h-2" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                How well do you understand this concept?
              </p>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => updateRecallStrength(false)}
                >
                  Need More Review
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                  onClick={() => updateRecallStrength(true)}
                >
                  Got It!
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concepts */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                <h3 className="text-lg font-semibold">Related Concepts</h3>
              </div>
              
              {relatedConcepts.length > 0 ? (
                <div className="space-y-2">
                  {relatedConcepts.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/dashboard/student/concepts/card/${related.id}`} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium">{related.title}</h4>
                        <p className="text-xs text-muted-foreground">{related.subject} • {related.chapter}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No related concepts found.</p>
              )}
            </CardContent>
          </Card>
          
          {/* AI Study Insights */}
          <Card className="border-blue-200">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                <h3 className="text-lg font-semibold">AI Study Insights</h3>
              </div>
              
              <div className="space-y-3">
                {mockAIInsights.map((insight) => (
                  <div key={insight.id} className="p-3 bg-blue-50/50 rounded-md border border-blue-100">
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.content}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                <Lightbulb className="h-4 w-4 mr-2" />
                Get Personalized Study Tips
              </Button>
            </CardContent>
          </Card>
          
          {/* Study Tools */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Study Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-sm h-auto py-3 flex flex-col items-center justify-center">
                  <BookOpen className="h-4 w-4 mb-1" />
                  <span>Formula Lab</span>
                </Button>
                <Button variant="outline" className="text-sm h-auto py-3 flex flex-col items-center justify-center">
                  <FileText className="h-4 w-4 mb-1" />
                  <span>Practice Exam</span>
                </Button>
                <Button variant="outline" className="text-sm h-auto py-3 flex flex-col items-center justify-center">
                  <StickyNote className="h-4 w-4 mb-1" />
                  <span>Flashcards</span>
                </Button>
                <Button variant="outline" className="text-sm h-auto py-3 flex flex-col items-center justify-center">
                  <Lightbulb className="h-4 w-4 mb-1" />
                  <span>AI Tutor</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
