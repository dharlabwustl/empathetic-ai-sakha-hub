
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  BarChart2, 
  Lightbulb, 
  Link as LinkIcon, 
  ArrowRight, 
  ArrowLeft, 
  Volume2,
  CheckCircle,
  PenSquare,
  Calculator,
  BookCopy,
  GraduationCap,
  ChevronRight,
  Play
} from 'lucide-react';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';

// Enhanced concept card detail page
const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [recallStrength, setRecallStrength] = useState(72);
  const [revisionCount, setRevisionCount] = useState(3);
  const [lastRevised, setLastRevised] = useState('2 days ago');
  const [selectedKeyPoint, setSelectedKeyPoint] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Speech synthesis for Read Aloud feature
  const speechSynthesis = window.speechSynthesis;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    console.log("ConceptCardDetailPage - Loaded concept ID:", conceptId);
    
    // Load saved notes (in a real app, these would come from an API)
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Get available voices for speech synthesis
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Cleanup function
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [conceptId, speechSynthesis]);
  
  // Handle saving notes
  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes for this concept have been saved",
    });
  };
  
  // Toggle Read Aloud feature
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    if (conceptCard) {
      // Create text for speech with better pronunciation for PREPZR
      let contentToRead = `${conceptCard.title}. ${conceptCard.content}`;
      
      // If there are key points, add them too for better learning
      if (conceptCard.keyPoints && conceptCard.keyPoints.length > 0) {
        contentToRead += " Key points to remember: " + 
          conceptCard.keyPoints.map((point, index) => `Point ${index + 1}. ${point}`).join('. ');
      }
      
      const utterance = new SpeechSynthesisUtterance(contentToRead);
      utteranceRef.current = utterance;
      
      // Try to find an Indian English or Hindi voice
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      } else {
        // Fallback to any English voice
        const englishVoice = voices.find(voice => voice.lang.includes('en-'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }
      
      utterance.rate = 0.9; // Slightly slower rate for better comprehension
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  // Increase mastery level function
  const handleIncreaseMastery = () => {
    const increment = Math.floor(Math.random() * 6) + 3; // 3-8% increase
    const newMastery = Math.min(masteryLevel + increment, 100);
    setMasteryLevel(newMastery);
    
    toast({
      title: "Mastery increased!",
      description: `Your mastery of this concept has increased by ${increment}%`,
    });
  };
  
  if (loading || !conceptCard) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading concept details...</p>
        </div>
      </div>
    );
  }
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Mock data for related concepts
  const relatedConcepts = conceptCard.relatedConcepts || [
    { id: 'concept-2', title: "Newton's Laws of Motion", subject: "Physics", difficulty: "Medium" },
    { id: 'concept-3', title: "Conservation of Energy", subject: "Physics", difficulty: "Hard" },
    { id: 'concept-4', title: "Momentum", subject: "Physics", difficulty: "Medium" }
  ];
  
  // NEET exam pattern questions for this concept
  const conceptQuestions = [
    {
      id: 'q1',
      text: 'A body starts from rest and moves with uniform acceleration. If it travels a distance d₁ in the first t₁ seconds and a distance d₂ in the first t₂ seconds, then the ratio d₂/d₁ is equal to:',
      options: [
        '(t₂/t₁)²',
        't₂/t₁',
        '(t₂/t₁)³',
        '(t₂/t₁)½'
      ],
      correctOption: 0,
      explanation: 'For uniform acceleration, distance d = (1/2)at². So the ratio d₂/d₁ = (t₂²/t₁²) = (t₂/t₁)².'
    },
    {
      id: 'q2',
      text: 'A particle moves along a straight line such that its displacement varies with time according to the relation s = 3t² - 2t³, where s is in meters and t in seconds. The retardation of the particle at the instant when it comes to rest is:',
      options: [
        '12 m/s²',
        '6 m/s²',
        '8 m/s²',
        '4 m/s²'
      ],
      correctOption: 0,
      explanation: 'The velocity v = ds/dt = 6t - 6t². When the particle comes to rest, v = 0, so t = 1. The acceleration a = dv/dt = 6 - 12t. At t = 1, a = -6, so retardation is 6 m/s². However, since retardation is the magnitude of negative acceleration, the answer is 6 m/s².'
    }
  ];
  
  // Key formulas for the concept
  const formulas = conceptCard.formulas || [
    { id: 'f1', name: 'Distance Formula', equation: 's = ut + ½at²', variables: ['s: displacement', 'u: initial velocity', 'a: acceleration', 't: time'] },
    { id: 'f2', name: 'Velocity-Time', equation: 'v = u + at', variables: ['v: final velocity', 'u: initial velocity', 'a: acceleration', 't: time'] },
    { id: 'f3', name: 'Velocity-Distance', equation: 'v² = u² + 2as', variables: ['v: final velocity', 'u: initial velocity', 'a: acceleration', 's: displacement'] }
  ];

  // Key points from the concept
  const keyPoints = conceptCard.keyPoints || [
    "Acceleration is the rate of change of velocity with respect to time",
    "In uniform motion, acceleration is zero",
    "For a body falling freely under gravity, acceleration is constant at 9.8 m/s²",
    "Negative acceleration is also called retardation or deceleration",
    "In projectile motion, horizontal acceleration is zero (neglecting air resistance)"
  ];

  return (
    <div className="container max-w-7xl py-8">
      {/* Back button and concept info */}
      <div className="flex flex-col space-y-6">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2 hover:bg-slate-100 mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back to Concepts</span>
        </Button>
        
        {/* Concept header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main concept info */}
          <div className="lg:col-span-2">
            <Card className="border-t-4 shadow-md" style={{ borderTopColor: '#6366f1' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{conceptCard.title}</CardTitle>
                    <CardDescription className="text-base">{conceptCard.description}</CardDescription>
                  </div>
                  <Button 
                    variant={isReadingAloud ? "destructive" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={toggleReadAloud}
                  >
                    <Volume2 size={16} />
                    {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    {conceptCard.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                    {conceptCard.chapter || 'Chapter 1'}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
                    {conceptCard.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Masterly progress */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm font-medium text-indigo-600">{masteryLevel}%</span>
                    </div>
                    <Progress value={masteryLevel} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Recall Strength</span>
                      <span className="text-sm font-medium text-indigo-600">{recallStrength}%</span>
                    </div>
                    <Progress value={recallStrength} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
                    <div>
                      <span className="font-medium">Revision Count:</span> {revisionCount} times
                    </div>
                    <div>
                      <span className="font-medium">Last Revised:</span> {lastRevised}
                    </div>
                    <Button size="sm" variant="default" onClick={handleIncreaseMastery} className="bg-indigo-500 hover:bg-indigo-600">
                      <CheckCircle size={14} className="mr-1" />
                      Mark as Revised
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Flashcards
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} />
                  Practice Test
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Brain size={16} />
                  Quick Quiz
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calculator size={16} />
                  Formula Lab
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* AI Insights */}
          <div>
            <Card className="border-l-4 border-l-amber-400 shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  AI Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">NEET Focus Areas</h4>
                  <p className="text-sm text-gray-600">
                    This concept appears frequently in NEET exams, particularly in numerical problems. Focus on problem-solving using the formulas.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Weak Links</h4>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span>Application in projectile motion</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Relative motion calculations</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Study Recommendation</h4>
                  <p className="text-sm text-gray-600">Review this concept again in 3 days to strengthen retention. Practice at least 5 numerical problems.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Test Readiness</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={68} className="h-2" />
                    <span className="text-xs font-medium">68%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">More practice needed for NEET exam proficiency</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="key-points">Key Points</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{conceptCard.content}</p>
                  </div>
                  
                  {/* Video Resources */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Video Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <div className="bg-gray-100 h-36 rounded-t-lg flex items-center justify-center">
                          <Play size={40} className="text-gray-400" />
                        </div>
                        <CardContent className="py-3">
                          <h4 className="font-medium text-sm">NEET Physics: Kinematics Explained</h4>
                          <p className="text-xs text-gray-500 mt-1">Duration: 12:45 • Dr. Pankaj Joshi</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <div className="bg-gray-100 h-36 rounded-t-lg flex items-center justify-center">
                          <Play size={40} className="text-gray-400" />
                        </div>
                        <CardContent className="py-3">
                          <h4 className="font-medium text-sm">Problem Solving: Acceleration & Motion</h4>
                          <p className="text-xs text-gray-500 mt-1">Duration: 18:22 • Priya Sharma</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Key Points Tab */}
            <TabsContent value="key-points" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Points to Remember</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyPoints && keyPoints.length > 0 ? (
                      keyPoints.map((point, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-md border transition-colors ${
                            selectedKeyPoint === point 
                              ? 'bg-indigo-50 border-indigo-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-indigo-50'
                          }`}
                          onClick={() => setSelectedKeyPoint(point)}
                        >
                          <div className="flex gap-3">
                            <div className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </div>
                            <p>{point}</p>
                          </div>
                          {selectedKeyPoint === point && (
                            <div className="mt-3 pt-3 border-t border-indigo-100">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-indigo-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const utterance = new SpeechSynthesisUtterance(point);
                                  speechSynthesis.speak(utterance);
                                }}
                              >
                                <Volume2 size={14} className="mr-1" /> Listen
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No key points available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Formulas Tab */}
            <TabsContent value="formulas" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Important Formulas</span>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Calculator size={14} />
                      Open Formula Lab
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {formulas && formulas.length > 0 ? (
                      formulas.map((formula) => (
                        <div key={formula.id} className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-3 border-b">
                            <h4 className="font-medium">{formula.name}</h4>
                          </div>
                          <div className="p-4">
                            <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-center font-medium text-lg">
                              {formula.equation}
                            </div>
                            <div className="mt-3">
                              <h5 className="text-sm font-medium mb-1">Where:</h5>
                              <ul className="text-sm grid grid-cols-1 md:grid-cols-2 gap-1">
                                {formula.variables.map((variable, i) => (
                                  <li key={i} className="flex items-center gap-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                                    {variable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No formulas available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Examples & Solved Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {conceptCard.examples?.map((example, index) => (
                      <li key={index} className="bg-slate-50 p-5 rounded-md border">
                        <h3 className="font-medium mb-2">Example {index + 1}</h3>
                        <p className="whitespace-pre-wrap">{example}</p>
                      </li>
                    )) || (
                      <div className="text-gray-500 text-center py-8">
                        <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p>No examples available for this concept.</p>
                        <Button variant="outline" size="sm" className="mt-2">Request Examples</Button>
                      </div>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Practice Tab */}
            <TabsContent value="practice" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>NEET Style Practice Questions</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Full Practice Test</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {conceptQuestions.map((question, qIndex) => (
                      <div key={question.id} className="space-y-4">
                        <div className="flex items-start gap-2">
                          <div className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {qIndex + 1}
                          </div>
                          <p className="font-medium">{question.text}</p>
                        </div>
                        
                        <div className="pl-8 space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center">
                              <div className={`p-2 rounded-md border flex items-center cursor-pointer w-full
                                ${oIndex === question.correctOption ? 'bg-green-50 border-green-300' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
                                  {String.fromCharCode(65 + oIndex)}
                                </div>
                                <span>{option}</span>
                                {oIndex === question.correctOption && (
                                  <CheckCircle size={18} className="ml-auto text-green-600" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Explanation */}
                        <div className="pl-8 bg-amber-50 border border-amber-200 rounded-md p-3">
                          <div className="flex items-center mb-1">
                            <Lightbulb size={16} className="text-amber-600 mr-1" />
                            <h4 className="font-medium text-sm">Explanation:</h4>
                          </div>
                          <p className="text-sm">{question.explanation}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end">
                      <Button>
                        More Practice Questions <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenSquare size={18} />
                    My Personal Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Add your notes about this concept here..." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[250px]"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" disabled={notes.trim() === ''}>
                      Clear
                    </Button>
                    <Button 
                      onClick={handleSaveNotes} 
                      disabled={notes.trim() === ''}
                    >
                      Save Notes
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-medium mb-2 flex items-center">
                      <BookCopy size={16} className="mr-1" />
                      Study Tips
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <p>Create flashcards for each formula and practice recalling them daily</p>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <p>Draw diagrams to visualize motion problems when solving examples</p>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <p>Explain this concept to someone else to test your understanding</p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Concepts */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LinkIcon size={18} />
            Related Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedConcepts.map((concept) => (
              <Card key={concept.id} className="hover:shadow-md transition-all cursor-pointer" 
                onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Study this concept</span>
                    <ArrowRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Academic Path Navigation */}
        <div className="mt-10">
          <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GraduationCap size={24} className="text-violet-700 mr-2" />
                  <h2 className="text-lg font-medium">Your Learning Path</h2>
                </div>
                <Badge className="bg-violet-200 text-violet-800 hover:bg-violet-300">Physics</Badge>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Button variant="outline" className="border-violet-300 text-violet-800 hover:bg-violet-100">
                  <ArrowLeft size={16} className="mr-1" /> Previous: Conservation of Energy
                </Button>
                
                <Button className="bg-violet-600 hover:bg-violet-700">
                  Next: Circular Motion <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
