
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Volume2, FileText, Link, Edit, Save, Play, BarChart2, Brain, Lightbulb, ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Define interface for concept data structure
interface Concept {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  content: {
    overview: string;
    keyPoints: string[];
    examples: { title: string; content: string }[];
    formulas?: { name: string; formula: string; description: string }[];
  };
  mastery?: number;
  analytics?: {
    attempts: number;
    correctAnswers: number;
    incorrectAnswers: number;
    averageTime: string;
    lastAttempt: string;
  };
  relatedConcepts?: { id: string; title: string }[];
}

// Mock data for demonstration
const mockConcept: Concept = {
  id: 'concept-1',
  title: "Newton's Laws of Motion",
  description: "Fundamental principles describing the relationship between forces and motion",
  subject: "Physics",
  difficulty: "Medium",
  estimatedTime: "45 min",
  content: {
    overview: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws are fundamental to classical mechanics. First Law: An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. Second Law: The rate of change of momentum of a body is directly proportional to the force applied. Third Law: For every action, there is an equal and opposite reaction.",
    keyPoints: [
      "First Law (Inertia): A body remains at rest, or in motion at a constant speed in a straight line, unless acted upon by a force.",
      "Second Law (F=ma): The acceleration of an object depends on the mass of the object and the amount of force applied.",
      "Third Law: For every action, there is an equal and opposite reaction.",
      "These laws form the foundation for classical mechanics.",
      "The laws are only valid in inertial reference frames."
    ],
    examples: [
      {
        title: "First Law Example",
        content: "When a bus stops suddenly, passengers continue moving forward due to inertia."
      },
      {
        title: "Second Law Example",
        content: "A force of 10 N acting on a mass of 2 kg produces an acceleration of 5 m/s²."
      },
      {
        title: "Third Law Example",
        content: "A rocket pushes exhaust gases downward, and the gases push the rocket upward with equal force."
      }
    ],
    formulas: [
      {
        name: "Second Law of Motion",
        formula: "F = m × a",
        description: "Force equals mass times acceleration."
      },
      {
        name: "Weight Formula",
        formula: "W = m × g",
        description: "Weight equals mass times gravitational acceleration."
      }
    ]
  },
  mastery: 75,
  analytics: {
    attempts: 12,
    correctAnswers: 9,
    incorrectAnswers: 3,
    averageTime: "4m 25s",
    lastAttempt: "2 days ago"
  },
  relatedConcepts: [
    { id: "concept-2", title: "Momentum and Collisions" },
    { id: "concept-3", title: "Work, Energy and Power" },
    { id: "concept-4", title: "Circular Motion" }
  ]
};

interface ConceptCardDetailProps {
  conceptId?: string;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId }) => {
  const [concept, setConcept] = useState<Concept | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [notes, setNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [speechInstance, setSpeechInstance] = useState<SpeechSynthesisUtterance | null>(null);
  const [recallStrength, setRecallStrength] = useState(60); // Added for recall strength tracking
  const [lastPracticed, setLastPracticed] = useState("3 days ago"); // Added for last practiced tracking
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch concept data
  useEffect(() => {
    console.log("Fetching concept data for ID:", conceptId);
    
    // In a real application, this would be an API call
    // For now, using mock data
    setConcept(mockConcept);
    
    // Try to load saved notes from localStorage
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [conceptId]);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.rate = 0.92;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      utterance.lang = 'en-IN';
      
      // Set voice when voices are available
      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        const voice = findBestVoice('en-IN');
        if (voice) {
          utterance.voice = voice;
        }
      };
      
      // Try to set voice immediately if voices are already loaded
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const voice = findBestVoice('en-IN');
        if (voice) {
          utterance.voice = voice;
        }
      }
      
      setSpeechInstance(utterance);
      
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);
  
  // Handle read aloud functionality
  const handleReadAloud = () => {
    if (!speechInstance) return;
    
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    // Get the text to read based on active tab
    let textToRead = '';
    
    if (concept) {
      switch (activeTab) {
        case 'overview':
          textToRead = concept.content.overview;
          break;
        case 'keypoints':
          textToRead = "Key Points: " + concept.content.keyPoints.join(". ");
          break;
        case 'examples':
          textToRead = concept.content.examples.map(ex => 
            `${ex.title}. ${ex.content}`
          ).join(". ");
          break;
        case 'formulas':
          if (concept.content.formulas) {
            textToRead = concept.content.formulas.map(formula => 
              `${formula.name}. ${formula.formula}. ${formula.description}`
            ).join(". ");
          }
          break;
        default:
          textToRead = concept.content.overview;
      }
      
      speechInstance.text = textToRead;
      window.speechSynthesis.speak(speechInstance);
      setIsReadingAloud(true);
      
      // Reset button when finished speaking
      speechInstance.onend = () => {
        setIsReadingAloud(false);
      };
    }
  };
  
  // Handle notes saving
  const saveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, notes);
    setIsEditingNotes(false);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  // Handle navigation to related concepts
  const navigateToRelatedConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };
  
  // Navigate to practice exams
  const navigateToPracticeExams = () => {
    navigate('/dashboard/student/practice-exam');
    toast({
      title: "Practice mode",
      description: "Loading practice questions related to this concept",
    });
  };
  
  // Navigate to flashcards
  const navigateToFlashcards = () => {
    navigate('/dashboard/student/flashcards');
    toast({
      title: "Flashcards",
      description: "Loading flashcards related to this concept",
    });
  };

  // Mark as understood
  const markAsUnderstood = () => {
    // In a real app, this would update the mastery level in your data store
    if (concept && concept.mastery) {
      const newMastery = Math.min(concept.mastery + 5, 100);
      setConcept({...concept, mastery: newMastery});
      
      toast({
        title: "Progress updated",
        description: "Your mastery level has been increased",
      });
    }
  };
  
  if (!concept) {
    return (
      <SharedPageLayout title="Loading Concept" subtitle="Please wait...">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={concept.subject}
      showBackButton
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Concept overview card */}
          <Card className="shadow-md border border-border">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">{concept.title}</CardTitle>
                  <CardDescription className="mt-1 text-foreground/70">{concept.description}</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant={concept.difficulty === 'Easy' ? 'outline' : 
                              concept.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                    {concept.difficulty}
                  </Badge>
                  <Badge variant="outline">{concept.estimatedTime}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Read Aloud button */}
              <div className="flex justify-end mb-4">
                <Button
                  variant={isReadingAloud ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleReadAloud}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="h-4 w-4" />
                  {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
                </Button>
              </div>
              
              {/* Content tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="formulas">Formulas</TabsTrigger>
                </TabsList>
                
                <div ref={contentRef}>
                  <TabsContent value="overview" className="mt-0">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-800">
                      <p className="text-base leading-7">{concept.content.overview}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="keypoints" className="mt-0">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-800">
                      <ul className="space-y-3 list-disc pl-5">
                        {concept.content.keyPoints.map((point, index) => (
                          <li key={index} className="text-base leading-7">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-0">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-800 space-y-6">
                      {concept.content.examples.map((example, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-semibold text-lg">{example.title}</h4>
                          <p className="mt-2">{example.content}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="formulas" className="mt-0">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-800 space-y-6">
                      {concept.content.formulas?.map((formula, index) => (
                        <div key={index} className="bg-muted/30 p-4 rounded-md">
                          <h4 className="font-semibold text-lg">{formula.name}</h4>
                          <div className="text-xl font-mono my-2 text-center p-3 bg-muted/50 rounded">
                            {formula.formula}
                          </div>
                          <p className="text-sm text-muted-foreground">{formula.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
            
            <CardFooter className="pt-0 flex flex-wrap gap-2">
              {/* Learning action buttons */}
              <div className="flex flex-wrap gap-2 mt-4 w-full justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={navigateToFlashcards} 
                  className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
                >
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Practice Flashcards
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={navigateToPracticeExams} 
                  className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800"
                >
                  <Play className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Practice Exams
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAsUnderstood} 
                  className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Mark as Understood
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Notes section */}
          <Card className="shadow-md border border-border">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">My Notes</CardTitle>
                {isEditingNotes ? (
                  <Button size="sm" onClick={saveNotes} variant="outline">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => setIsEditingNotes(true)} variant="ghost">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this concept here... What are the key points you want to remember? How does this connect to other concepts you've learned?"
                  className="min-h-[200px]"
                />
              ) : (
                <div className="min-h-[200px] p-3 bg-muted/20 rounded-md">
                  {notes ? (
                    <p className="whitespace-pre-wrap">{notes}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No notes added yet. Click Edit to add notes.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* AI Insights card */}
          <Card className="shadow-md border border-border">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Weak links detection */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <span>Improvement Suggestion</span>
                  </h4>
                  <p className="mt-2 text-sm">
                    Based on your practice answers, you seem to struggle with applying the Second Law in 
                    problems involving multiple forces. Focus on force diagrams and vector addition to 
                    improve understanding.
                  </p>
                </div>
                
                {/* Revision suggestions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold">Revision Recommendations</h4>
                  <ul className="mt-2 text-sm space-y-2 list-disc pl-5">
                    <li>Review the relationship between mass, force and acceleration</li>
                    <li>Practice problems with unbalanced forces</li>
                    <li>Review the "Momentum and Collisions" related concept</li>
                  </ul>
                </div>

                {/* Learning path recommendation */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-green-600" />
                    <span>Learning Path</span>
                  </h4>
                  <p className="mt-2 text-sm">
                    Based on your progress, we recommend completing 3 flashcard sessions and 2 practice exams 
                    to solidify your understanding of Newton's Laws before moving to "Momentum and Collisions".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          {/* Mastery tracking */}
          <Card className="shadow-md border border-border">
            <CardHeader className="bg-muted/30 pb-2">
              <CardTitle className="text-xl">Concept Mastery</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6">
                {/* Mastery level */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Mastery Level</span>
                    <span className="text-sm font-semibold">{concept.mastery}%</span>
                  </div>
                  <Progress value={concept.mastery} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Keep practicing to increase your mastery level
                  </p>
                </div>
                
                {/* Recall strength - New */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Recall Strength</span>
                    <span className="text-sm font-semibold">{recallStrength}%</span>
                  </div>
                  <Progress value={recallStrength} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Last practiced: {lastPracticed}</span>
                  </div>
                </div>
                
                {/* Practice stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Attempts</div>
                    <div className="text-lg font-semibold">{concept.analytics?.attempts}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Avg. Time</div>
                    <div className="text-lg font-semibold">{concept.analytics?.averageTime}</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Correct</div>
                    <div className="text-lg font-semibold text-green-600">
                      {concept.analytics?.correctAnswers}
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                    <div className="text-lg font-semibold text-red-600">
                      {concept.analytics?.incorrectAnswers}
                    </div>
                  </div>
                </div>
                
                {/* Last attempt */}
                <div className="flex justify-between text-sm">
                  <span>Last attempt:</span>
                  <span className="font-medium">{concept.analytics?.lastAttempt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related concepts card */}
          {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
            <Card className="shadow-md border border-border">
              <CardHeader className="bg-muted/30 pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  <span>Related Concepts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {concept.relatedConcepts.map((related) => (
                    <Button 
                      key={related.id} 
                      variant="outline" 
                      className="w-full justify-start text-left hover:bg-primary/5"
                      onClick={() => navigateToRelatedConcept(related.id)}
                    >
                      <div>
                        <div className="font-medium">{related.title}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Study tools card - New */}
          <Card className="shadow-md border border-border">
            <CardHeader className="bg-muted/30 pb-2">
              <CardTitle className="text-xl">Study Tools</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Button variant="outline" onClick={navigateToFlashcards} className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Practice with Flashcards
                </Button>
                <Button variant="outline" onClick={navigateToPracticeExams} className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2 text-green-500" />
                  Test Knowledge with Exams
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart2 className="h-4 w-4 mr-2 text-purple-500" />
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/concepts')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Concepts
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-to-r from-primary to-indigo-600" 
              onClick={navigateToPracticeExams}
            >
              Practice
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
