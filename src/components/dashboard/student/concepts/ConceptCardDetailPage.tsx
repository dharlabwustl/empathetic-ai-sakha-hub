
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, BookOpen, Brain, FileText, Bookmark, 
  Clock, CheckCircle, RotateCw, Volume2, Play, 
  PenLine, MessageSquare, FileQuestion, ArrowRight,
  Cube, BarChart, Formula, Beaker, Video, LayoutList,
  BookmarkIcon, MicIcon
} from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface ConceptCardData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  simpleExplanation: string;
  detailedExplanation: string;
  examples: {
    question: string;
    solution: string;
    steps: string[];
  }[];
  diagrams: { description: string; imageUrl?: string; }[];
  realWorldApplications: string[];
  examRelevance: {
    importance: 'high' | 'medium' | 'low';
    frequentQuestions: string[];
    tips: string[];
  };
  commonMistakes: string[];
  videoUrl?: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  formulas?: string[];
}

// Mock data for a concept card
const mockConceptData: ConceptCardData = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  simpleExplanation: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws are fundamental to classical mechanics.",
  detailedExplanation: "Newton's First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.\n\nNewton's Second Law (F = ma): The acceleration of an object depends directly upon the net force acting upon the object, and inversely upon the mass of the object.\n\nNewton's Third Law: For every action, there is an equal and opposite reaction. Forces always occur in pairs.",
  examples: [
    {
      question: "A 2kg object is subjected to a force of 10 Newtons. What is its acceleration?",
      solution: "a = F/m = 10/2 = 5 m/s²",
      steps: [
        "Identify the known values: mass (m) = 2kg, force (F) = 10N",
        "Apply Newton's Second Law: F = ma",
        "Rearrange to solve for acceleration: a = F/m",
        "Substitute the values: a = 10/2 = 5 m/s²"
      ]
    },
    {
      question: "Explain why passengers in a car move forward when the driver brakes suddenly.",
      solution: "According to Newton's First Law, objects in motion tend to stay in motion unless acted upon by an external force. When a car brakes suddenly, the passengers' bodies continue moving forward due to inertia until restrained by seat belts or other forces.",
      steps: [
        "Consider Newton's First Law (Law of Inertia)",
        "The passengers are initially moving with the car",
        "When the car brakes, it applies a force to stop",
        "The passengers' bodies continue moving forward due to inertia",
        "They stop only when acted upon by another force (seat belt, dashboard, etc.)"
      ]
    }
  ],
  diagrams: [
    {
      description: "Force diagram showing Newton's Second Law",
      imageUrl: "https://example.com/force-diagram.jpg"
    },
    {
      description: "Illustration of Newton's Third Law with rocket propulsion",
      imageUrl: "https://example.com/rocket-propulsion.jpg"
    }
  ],
  realWorldApplications: [
    "Rocket propulsion: Rockets move forward by expelling gas backwards (Third Law)",
    "Car safety features: Seat belts and airbags counteract inertia in collisions (First Law)",
    "Sports: In baseball, the force applied to a ball determines its acceleration (Second Law)"
  ],
  examRelevance: {
    importance: 'high',
    frequentQuestions: [
      "Calculating acceleration using F = ma",
      "Explaining real-world phenomena using Newton's Laws",
      "Force diagram analysis"
    ],
    tips: [
      "Always draw force diagrams for problems involving multiple forces",
      "Remember that Newton's Laws apply only in inertial reference frames",
      "Pay attention to units: force in Newtons, mass in kg, acceleration in m/s²"
    ]
  },
  commonMistakes: [
    "Forgetting that weight is a force (mass × gravity)",
    "Confusing mass and weight",
    "Incorrectly identifying all forces acting on an object"
  ],
  videoUrl: "https://example.com/newtons-laws-video.mp4",
  tags: ["Newton", "Classical Mechanics", "Forces", "Motion", "Physics Fundamentals"],
  difficulty: "medium",
  formulas: [
    "F = ma",
    "a = F/m",
    "F₁ = -F₂",
    "W = mg"
  ]
};

interface FormulaTabContentProps {
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
  conceptId: string;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptTitle, handleOpenFormulaLab, conceptId }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">
          Key Formulas for {conceptTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockConceptData.formulas?.map((formula, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <div className="text-center font-mono text-lg py-2">
                {formula}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={handleOpenFormulaLab} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Formula className="mr-2 h-5 w-5" />
            Open Interactive Formula Lab
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
        <h4 className="font-medium mb-2">Practice Using These Formulas</h4>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
            <h5 className="font-medium text-sm mb-1">Sample Problem:</h5>
            <p className="text-sm">A force of 50N acts on a 10kg object. Calculate its acceleration.</p>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Brain className="h-3 w-3 mr-1" /> Show Solution
              </Button>
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
            <h5 className="font-medium text-sm mb-1">Sample Problem:</h5>
            <p className="text-sm">An object experiences an acceleration of 4 m/s² when a force of 20N is applied. What is the object's mass?</p>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Brain className="h-3 w-3 mr-1" /> Show Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SimulationTabContentProps {
  conceptTitle: string;
}

const SimulationTabContent: React.FC<SimulationTabContentProps> = ({ conceptTitle }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
          3D Simulation: {conceptTitle}
        </h3>
        
        <div className="aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-inner flex items-center justify-center border border-purple-100 dark:border-purple-900">
          <div className="text-center">
            <Cube className="h-16 w-16 mx-auto text-purple-400 mb-4" />
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Launch Interactive 3D Simulation
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Interact with a 3D model demonstrating Newton's Laws of Motion
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
          <h4 className="font-medium mb-2">Simulation Controls</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Click and drag to rotate the view</li>
            <li>Use scroll wheel to zoom in/out</li>
            <li>Press space to play/pause the simulation</li>
            <li>Use sliders to adjust force and mass values</li>
            <li>Toggle between First, Second, and Third Law demonstrations</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
          <h4 className="font-medium mb-2">Learning Objectives</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Visualize how force affects acceleration</li>
            <li>Observe Newton's Third Law in action</li>
            <li>Understand inertia through interactive examples</li>
            <li>Test different scenarios to reinforce concepts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface ActiveRecallTabContentProps {
  conceptTitle: string;
}

const ActiveRecallTabContent: React.FC<ActiveRecallTabContentProps> = ({ conceptTitle }) => {
  const [recallMethod, setRecallMethod] = useState<'writing' | 'speaking'>('writing');
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      setFeedback("Please provide an answer before checking.");
      return;
    }
    
    // Simple check if the answer contains key terms
    const keyTerms = ["inertia", "rest", "motion", "force", "unbalanced"];
    const lowerCaseAnswer = userAnswer.toLowerCase();
    const containsKeyTerms = keyTerms.some(term => lowerCaseAnswer.includes(term));
    
    if (containsKeyTerms) {
      setFeedback("Good! Your answer contains key concepts. Remember that Newton's First Law states that an object will remain at rest or in uniform motion unless acted upon by an unbalanced force.");
    } else {
      setFeedback("Your answer is missing some key concepts. Try mentioning inertia, rest, motion, or unbalanced forces.");
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real implementation, this would process the speech recording
      setTimeout(() => {
        setUserAnswer("An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an outside force.");
        setFeedback("Speech detected! Processing your answer...");
      }, 1000);
    } else {
      setUserAnswer('');
      setFeedback(null);
      setIsRecording(true);
    }
  };
  
  const resetExercise = () => {
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-5 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
          Active Recall: {conceptTitle}
        </h3>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Question:</h4>
          <p className="bg-white dark:bg-gray-800 p-3 rounded-md border border-emerald-100 dark:border-emerald-900">
            Explain Newton's First Law of Motion in your own words.
          </p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Your Answer:</h4>
            <div className="flex gap-2">
              <Button 
                variant={recallMethod === 'writing' ? "default" : "outline"} 
                size="sm"
                onClick={() => setRecallMethod('writing')}
                className="text-xs"
              >
                <PenLine className="h-3 w-3 mr-1" /> Writing
              </Button>
              <Button 
                variant={recallMethod === 'speaking' ? "default" : "outline"} 
                size="sm"
                onClick={() => setRecallMethod('speaking')}
                className="text-xs"
              >
                <MicIcon className="h-3 w-3 mr-1" /> Speaking
              </Button>
            </div>
          </div>
          
          {recallMethod === 'writing' ? (
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full rounded-md border border-emerald-200 dark:border-emerald-800 min-h-[120px] p-3 bg-white dark:bg-gray-800"
              placeholder="Type your understanding of Newton's First Law here..."
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-md border border-emerald-200 dark:border-emerald-800 min-h-[120px] p-3">
              {userAnswer ? (
                <p>{userAnswer}</p>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Button 
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={toggleRecording}
                    className="gap-2"
                  >
                    <MicIcon className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
                    {isRecording ? "Stop Recording" : "Start Speaking"}
                  </Button>
                  {isRecording && (
                    <p className="text-sm text-muted-foreground mt-2">Recording... Speak clearly</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button onClick={handleSubmit} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            Check Answer
          </Button>
          <Button variant="outline" onClick={resetExercise} className="flex-1">
            Reset
          </Button>
        </div>
        
        {feedback && (
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-md border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-medium mb-1">Feedback:</h4>
            <p className="text-sm">{feedback}</p>
          </div>
        )}
        
        <div className="mt-4">
          <Button 
            variant="link" 
            className="text-emerald-700 dark:text-emerald-400"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide Answer" : "Show Correct Answer"}
          </Button>
          
          {showAnswer && (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-md border border-emerald-200 dark:border-emerald-800 mt-2">
              <p className="text-sm">
                Newton's First Law states that an object at rest will stay at rest, and an object in motion will stay in motion with the same speed and direction, unless acted upon by an unbalanced force. This property is called inertia.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [mastery, setMastery] = useState(30); // Initial mastery level (0-100)
  const [hasAddedNote, setHasAddedNote] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  const { speakMessage, stopSpeaking } = useVoiceAnnouncer({
    initialSettings: { language: 'en-IN' }
  });
  
  // In a real app, we would fetch the concept data from an API
  const conceptData = mockConceptData;
  
  // Track study time using useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Concept bookmarked" : "Bookmark removed",
      description: !isBookmarked 
        ? "You can find this concept in your bookmarks section." 
        : "Concept removed from your bookmarks.",
    });
  };
  
  const handleAddNote = () => {
    setHasAddedNote(true);
    toast({
      title: "Note added",
      description: "Your note has been saved to this concept card",
    });
  };
  
  const handleUpdateMastery = (increase: boolean) => {
    const change = increase ? 10 : -10;
    const newMastery = Math.max(0, Math.min(100, mastery + change));
    setMastery(newMastery);
    
    toast({
      title: increase ? "Mastery increased" : "Mastery decreased",
      description: `Your mastery is now ${newMastery}%`,
      variant: increase ? "default" : "secondary",
    });
  };
  
  const handleStartInteractiveLearning = () => {
    navigate(`/dashboard/student/flashcards/physics-${conceptId}/interactive`);
    toast({
      title: "Interactive learning started",
      description: "Get ready to master this concept with flashcards!",
    });
  };
  
  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concept-formula-lab/${conceptId}`);
  };
  
  const handleReadAloud = () => {
    if (isReadingAloud) {
      stopSpeaking();
      setIsReadingAloud(false);
      return;
    }
    
    setIsReadingAloud(true);
    
    let textToRead = "";
    
    if (activeTab === 'simple') {
      textToRead = `${conceptData.title}. ${conceptData.simpleExplanation}`;
    } else if (activeTab === 'detailed') {
      textToRead = `${conceptData.title}. ${conceptData.detailedExplanation}`;
    } else if (activeTab === 'examples') {
      textToRead = `Examples for ${conceptData.title}. `;
      conceptData.examples.forEach((example, index) => {
        textToRead += `Example ${index + 1}: ${example.question}. Solution: ${example.solution}. `;
      });
    } else {
      textToRead = `${conceptData.title}. ${conceptData.simpleExplanation}`;
    }
    
    speakMessage(textToRead, true);
    
    // Reset button after speech is done (estimated time based on word count)
    const wordCount = textToRead.split(' ').length;
    const estimatedDuration = wordCount * 500; // Rough estimate: 500ms per word
    
    setTimeout(() => {
      setIsReadingAloud(false);
    }, estimatedDuration);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header area */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{conceptData.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary">{conceptData.subject}</Badge>
            <Badge>{conceptData.topic}</Badge>
            <Badge variant={
              conceptData.difficulty === 'easy' ? "outline" : 
              conceptData.difficulty === 'medium' ? "secondary" : "destructive"
            }>
              {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(studyTime)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleBookmark}
            className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
          >
            {isBookmarked ? <BookmarkIcon className="fill-yellow-500" /> : <BookmarkIcon />}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleReadAloud}
            className={isReadingAloud ? "bg-blue-100 text-blue-700 border-blue-300" : ""}
          >
            <Volume2 className={isReadingAloud ? "animate-pulse" : ""} />
          </Button>
        </div>
      </div>
      
      {/* Mastery indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Mastery Level</span>
          <span>{mastery}%</span>
        </div>
        <Progress value={mastery} className="h-2" />
        <div className="flex justify-center space-x-4 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUpdateMastery(false)}
            disabled={mastery <= 0}
          >
            Need More Practice
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUpdateMastery(true)}
            disabled={mastery >= 100}
          >
            I Understand This
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 border-t-4 border-t-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-2">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                Learn: {conceptData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-4 overflow-x-auto flex flex-wrap">
                  <TabsTrigger value="simple">Simple</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Visuals</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="formulas">Formulas</TabsTrigger>
                  <TabsTrigger value="simulation">3D Simulation</TabsTrigger>
                  <TabsTrigger value="exam">Exam Tips</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Errors</TabsTrigger>
                  <TabsTrigger value="recall">Active Recall</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="prose max-w-none dark:prose-invert">
                  <p>{conceptData.simpleExplanation}</p>
                </TabsContent>
                
                <TabsContent value="detailed" className="prose max-w-none dark:prose-invert">
                  {conceptData.detailedExplanation.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </TabsContent>
                
                <TabsContent value="examples">
                  <div className="space-y-6">
                    {conceptData.examples.map((example, idx) => (
                      <div key={idx} className="bg-muted/20 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Example {idx + 1}</h3>
                        <div className="mb-3 bg-card p-3 rounded-md">
                          <p className="font-medium text-sm mb-1">Question:</p>
                          <p>{example.question}</p>
                        </div>
                        <div className="mb-3">
                          <p className="font-medium text-sm mb-1">Solution:</p>
                          <p>{example.solution}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Steps:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            {example.steps.map((step, stepIdx) => (
                              <li key={stepIdx} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams">
                  <div className="space-y-4">
                    {conceptData.diagrams.map((diagram, idx) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Visual {idx + 1}</h3>
                        <p className="text-sm mb-3">{diagram.description}</p>
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                          <span className="text-gray-500 dark:text-gray-400">
                            {diagram.imageUrl ? "Diagram Image" : "No image available"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="applications">
                  <div>
                    <h3 className="font-medium mb-3">Real-World Applications</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {conceptData.realWorldApplications.map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="formulas">
                  <FormulaTabContent 
                    conceptTitle={conceptData.title} 
                    handleOpenFormulaLab={handleOpenFormulaLab}
                    conceptId={conceptId || '1'}
                  />
                </TabsContent>
                
                <TabsContent value="simulation">
                  <SimulationTabContent conceptTitle={conceptData.title} />
                </TabsContent>
                
                <TabsContent value="exam">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <h3 className="font-medium">Importance in Exams:</h3>
                      <Badge className={`ml-2 ${
                        conceptData.examRelevance.importance === 'high' ? 'bg-red-100 text-red-800' :
                        conceptData.examRelevance.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {conceptData.examRelevance.importance.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {conceptData.examRelevance.frequentQuestions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Exam Tips</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {conceptData.examRelevance.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes">
                  <div>
                    <h3 className="font-medium mb-3">Common Mistakes to Avoid</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {conceptData.commonMistakes.map((mistake, idx) => (
                        <li key={idx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="recall">
                  <ActiveRecallTabContent conceptTitle={conceptData.title} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Practice section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => navigate(`/dashboard/student/flashcards/physics-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center"
            >
              <Brain className="h-10 w-10 mb-2" />
              <div className="text-center">
                <h3 className="font-medium">Practice with Flashcards</h3>
                <p className="text-xs opacity-90">Review key points with spaced repetition</p>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate(`/dashboard/student/practice-exam/quiz-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center"
            >
              <FileQuestion className="h-10 w-10 mb-2" />
              <div className="text-center">
                <h3 className="font-medium">Take a Practice Quiz</h3>
                <p className="text-xs opacity-90">Test your knowledge with targeted questions</p>
              </div>
            </Button>
          </div>
          
          {/* Add the Start Interactive Learning button */}
          <Button 
            variant="default" 
            size="lg"
            onClick={handleStartInteractiveLearning}
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Interactive Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* User notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <PenLine className="mr-2 h-4 w-4" /> Your Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {hasAddedNote ? (
                <div className="bg-muted/30 rounded-md p-3 text-sm mb-3">
                  <p>First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-6">
                  <PenLine className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>You haven't added any notes yet</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleAddNote}
              >
                <PenLine className="h-4 w-4 mr-2" />
                {hasAddedNote ? "Edit Notes" : "Add Notes"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LayoutList className="mr-2 h-4 w-4" /> Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {conceptData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="mr-2 h-4 w-4" /> Study Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Topic Mastery</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Score</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Spent</span>
                    <span>{Math.floor(studyTime / 60)} minutes</span>
                  </div>
                  <Progress value={Math.min(100, (studyTime / 3600) * 100)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-4 w-4" /> Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/2`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Conservation of Momentum
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/3`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Work and Energy
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/4`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Circular Motion
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Video section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Video className="mr-2 h-4 w-4" /> Video Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md mb-3">
                <Button variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Play Video
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Watch a detailed video explanation of {conceptData.title}
              </p>
            </CardContent>
          </Card>
          
          {/* Discussion */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-center py-4 text-muted-foreground">
                <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Join the discussion about this concept</p>
                <Button className="mt-3" variant="secondary">
                  View Discussion Thread
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
