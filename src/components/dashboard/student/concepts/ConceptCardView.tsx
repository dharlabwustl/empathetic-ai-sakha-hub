
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, BookOpen, Brain, FileText, Bookmark, BookmarkPlus,
  Clock, CheckCircle, PenLine, MessageSquare, FileQuestion, ArrowRight,
  Play, Volume2, RotateCw, Mic, Activity, Award, Tag, Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  difficulty: "medium"
};

const ConceptCardView = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [mastery, setMastery] = useState(30); // Initial mastery level (0-100)
  const [hasAddedNote, setHasAddedNote] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recallAnswer, setRecallAnswer] = useState('');
  const [recallScore, setRecallScore] = useState<number | null>(null);
  const [activeRecallTab, setActiveRecallTab] = useState('text');
  const [examScore, setExamScore] = useState(65);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // In a real app, we would fetch the concept data from an API
  const conceptData = mockConceptData;
  
  // Set up timer to track study time
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
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
      variant: increase ? "default" : "default", // Changed from secondary to default for consistent styling
    });
  };
  
  const handleStartInteractiveLearning = () => {
    navigate(`/dashboard/student/flashcards/physics-${conceptId}/interactive`);
    toast({
      title: "Interactive learning started",
      description: "Get ready to master this concept with flashcards!",
    });
  };
  
  // Voice recording for active recall
  const toggleRecording = () => {
    if (isRecording) {
      // Simulate stopping recording
      setIsRecording(false);
      
      // In a real app, this would process the audio recording
      setTimeout(() => {
        const simulatedScore = Math.floor(Math.random() * 40) + 60;
        setRecallScore(simulatedScore);
        toast({
          title: "Voice answer processed",
          description: `Your recall score: ${simulatedScore}%`,
        });
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecallScore(null);
      toast({
        title: "Voice recording started",
        description: "Speak your answer clearly...",
      });
      
      // Simulate stopping after 10 seconds
      setTimeout(() => {
        if (isRecording) toggleRecording();
      }, 10000);
    }
  };
  
  // Handle text recall submission
  const handleRecallSubmit = () => {
    if (recallAnswer.trim().length < 10) {
      toast({
        title: "Answer too short",
        description: "Please provide a more detailed answer",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would analyze the answer against key points
    const simulatedScore = Math.floor(Math.random() * 30) + 70;
    setRecallScore(simulatedScore);
    
    toast({
      title: "Recall answer submitted",
      description: `Your recall score: ${simulatedScore}%`,
    });
    
    // Update overall mastery based on recall performance
    if (simulatedScore > 80) {
      handleUpdateMastery(true);
    }
  };
  
  // Quiz questions for the Quick Test tab
  const quizQuestions = [
    {
      id: 'q1',
      question: "Which of Newton's laws states that an object at rest will stay at rest unless acted upon by an external force?",
      options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
      answer: "First Law"
    },
    {
      id: 'q2',
      question: "In the equation F = ma, what does 'a' represent?",
      options: ["Area", "Acceleration", "Amplitude", "Angle"],
      answer: "Acceleration"
    },
    {
      id: 'q3',
      question: "For every action, there is an equal and opposite reaction. This is known as:",
      options: ["Law of Conservation", "Newton's First Law", "Newton's Second Law", "Newton's Third Law"],
      answer: "Newton's Third Law"
    }
  ];
  
  const handleQuizSubmit = () => {
    let correct = 0;
    
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.answer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / quizQuestions.length) * 100);
    setExamScore(score);
    
    toast({
      title: "Quiz completed",
      description: `You scored ${score}% (${correct}/${quizQuestions.length} correct)`,
    });
    
    // Update mastery based on quiz performance
    if (score >= 70) {
      handleUpdateMastery(true);
    }
  };
  
  // Toggle read aloud feature
  const handleReadAloud = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // In a real implementation, this would use a text-to-speech API
      toast({
        title: "Reading content aloud",
        description: "Text-to-speech started",
      });
    } else {
      if (audioRef.current.paused) {
        audioRef.current.play();
        toast({
          title: "Resumed reading",
          description: "Text-to-speech continues",
        });
      } else {
        audioRef.current.pause();
        toast({
          title: "Paused reading",
          description: "Text-to-speech paused",
        });
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header area */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">{conceptData.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">{conceptData.subject}</Badge>
            <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300">{conceptData.topic}</Badge>
            <Badge variant={
              conceptData.difficulty === 'easy' ? "outline" : 
              conceptData.difficulty === 'medium' ? "secondary" : "destructive"
            } className={
              conceptData.difficulty === 'easy' 
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" 
                : conceptData.difficulty === 'medium'
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
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
            {isBookmarked ? <Bookmark className="fill-yellow-500" /> : <BookmarkPlus />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleReadAloud}>
            <Volume2 />
          </Button>
        </div>
      </div>
      
      {/* Mastery indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Mastery Level</span>
          <span>{mastery}%</span>
        </div>
        <Progress 
          value={mastery} 
          className="h-2"
          indicatorClassName={`${
            mastery >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
            mastery >= 60 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
            mastery >= 40 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
            'bg-gradient-to-r from-gray-400 to-gray-500'
          }`}
        />
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
          <Card className="mb-6 shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20">
              <CardTitle>Learn: {conceptData.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-0 overflow-x-auto p-1 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800">
                  <TabsTrigger value="simple">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Explanation</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="3d">3D Simulation</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video">Video Analysis</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="simple" className="prose max-w-none dark:prose-invert mt-0">
                    <p>{conceptData.simpleExplanation}</p>
                  </TabsContent>
                  
                  <TabsContent value="detailed" className="prose max-w-none dark:prose-invert mt-0">
                    {conceptData.detailedExplanation.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-0">
                    <div className="space-y-6">
                      {conceptData.examples.map((example, idx) => (
                        <div key={idx} className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                          <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Example {idx + 1}</h3>
                          <div className="mb-3 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                            <p className="font-medium text-sm mb-1">Question:</p>
                            <p>{example.question}</p>
                          </div>
                          <div className="mb-3 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                            <p className="font-medium text-sm mb-1">Solution:</p>
                            <p>{example.solution}</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
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
                  
                  <TabsContent value="diagrams" className="mt-0">
                    <div className="space-y-4">
                      {conceptData.diagrams.map((diagram, idx) => (
                        <div key={idx} className="border rounded-lg p-4 shadow-sm">
                          <h3 className="font-medium mb-2">Diagram {idx + 1}</h3>
                          <p className="text-sm mb-3">{diagram.description}</p>
                          <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-md">
                            <span className="text-gray-500 dark:text-gray-400">
                              {diagram.imageUrl ? "Diagram Image" : "No image available"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="3d" className="mt-0">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium mb-2 flex items-center">
                          <span className="text-blue-600 dark:text-blue-400">3D Interactive Simulation</span>
                        </h3>
                        
                        <div className="aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Play className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-medium mb-2">Newton's Laws of Motion Simulation</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Interact with objects to see Newton's Laws in action
                            </p>
                            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                              Launch 3D Simulation
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                            <h4 className="text-sm font-medium mb-1">First Law</h4>
                            <p className="text-xs">Inertia Demonstration</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                            <h4 className="text-sm font-medium mb-1">Second Law</h4>
                            <p className="text-xs">Force & Acceleration</p>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                            <h4 className="text-sm font-medium mb-1">Third Law</h4>
                            <p className="text-xs">Action & Reaction</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="applications" className="mt-0">
                    <div>
                      <h3 className="font-medium mb-3">Real-World Applications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conceptData.realWorldApplications.map((app, idx) => (
                          <div key={idx} className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-900/30">
                            <p>{app}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exam" className="mt-0">
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
                  
                  <TabsContent value="mistakes" className="mt-0">
                    <div>
                      <h3 className="font-medium mb-3">Common Mistakes to Avoid</h3>
                      <div className="space-y-2">
                        {conceptData.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                            <p className="text-red-800 dark:text-red-300 flex items-start">
                              <span className="mr-2 mt-0.5">⚠️</span>
                              {mistake}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="mt-0">
                    <div className="flex flex-col items-center">
                      <div className="w-full aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                        <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                          <Play className="mr-2 h-5 w-5" />
                          Play Video
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Video explanation of {conceptData.title}
                      </p>
                      
                      <div className="w-full bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Video Notes</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">00:14</Badge>
                            <span>Introduction to Newton's Laws</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">01:23</Badge>
                            <span>First Law explained with demonstrations</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">03:45</Badge>
                            <span>Second Law and mathematical examples</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">05:32</Badge>
                            <span>Third Law with real-world applications</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Active Recall Section */}
          <Card className="mb-6 shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Active Recall Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                Studies show that active recall is one of the most effective learning techniques. Try to explain the concept in your own words.
              </p>
              
              <Tabs value={activeRecallTab} onValueChange={setActiveRecallTab} className="mt-4">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="voice">Voice Input</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recall-answer">Explain Newton's Laws of Motion in your own words:</Label>
                    <Textarea 
                      id="recall-answer"
                      placeholder="Type your explanation here..."
                      className="h-32"
                      value={recallAnswer}
                      onChange={(e) => setRecallAnswer(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleRecallSubmit} className="w-full">
                    Submit Answer
                  </Button>
                  
                  {recallScore !== null && activeRecallTab === 'text' && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-green-600" />
                        Recall Analysis
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Accuracy Score:</span>
                            <span className="text-sm font-medium">{recallScore}%</span>
                          </div>
                          <Progress 
                            value={recallScore} 
                            className="h-2"
                            indicatorClassName={
                              recallScore >= 80 ? "bg-green-500" : 
                              recallScore >= 60 ? "bg-yellow-500" : 
                              "bg-red-500"
                            }
                          />
                        </div>
                        
                        <div className="text-sm mt-2">
                          <p className="font-medium">Analysis:</p>
                          <p className="mt-1">
                            {recallScore >= 80 
                              ? "Excellent understanding! You've correctly identified the key principles." 
                              : recallScore >= 60
                              ? "Good attempt! Consider reviewing the relationship between force, mass and acceleration." 
                              : "Review recommended. Focus on the fundamental principles of each law."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="voice" className="mt-4 space-y-4">
                  <div className="text-center py-6">
                    <div className="mb-4">
                      <Button
                        onClick={toggleRecording}
                        variant={isRecording ? "destructive" : "outline"}
                        className={isRecording ? "animate-pulse" : ""}
                        size="lg"
                      >
                        <Mic className="mr-2 h-5 w-5" />
                        {isRecording ? "Stop Recording" : "Start Speaking"}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {isRecording 
                        ? "Speak clearly, explaining Newton's Laws in your own words..." 
                        : "Click the button and explain Newton's Laws in your own words"}
                    </p>
                  </div>
                  
                  {recallScore !== null && activeRecallTab === 'voice' && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-green-600" />
                        Voice Analysis
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Voice Recognition Score:</span>
                            <span className="text-sm font-medium">{recallScore}%</span>
                          </div>
                          <Progress 
                            value={recallScore} 
                            className="h-2"
                            indicatorClassName={
                              recallScore >= 80 ? "bg-green-500" : 
                              recallScore >= 60 ? "bg-yellow-500" : 
                              "bg-red-500"
                            }
                          />
                        </div>
                        
                        <div className="text-sm mt-2">
                          <p className="font-medium">Analysis:</p>
                          <p className="mt-1">
                            {recallScore >= 80 
                              ? "Excellent verbal explanation! You articulated the concepts clearly." 
                              : recallScore >= 60
                              ? "Good attempt! Work on explaining the Second Law more precisely." 
                              : "More practice recommended. Try focusing on one law at a time."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Quick Test Section */}
          <Card className="mb-6 shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <CardTitle className="flex items-center">
                <FileQuestion className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                Quick Test
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="space-y-3">
                    <h3 className="font-medium">Question {idx + 1}</h3>
                    <p>{q.question}</p>
                    
                    <RadioGroup 
                      value={quizAnswers[q.id]} 
                      onValueChange={(value) => {
                        setQuizAnswers({...quizAnswers, [q.id]: value});
                      }}
                    >
                      <div className="space-y-2">
                        {q.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                            <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                
                <Button onClick={handleQuizSubmit} className="w-full">
                  Submit Answers
                </Button>
                
                {examScore !== null && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Award className="mr-2 h-4 w-4 text-blue-600" />
                      Exam Score
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Your Score:</span>
                          <span className="text-sm font-medium">{examScore}%</span>
                        </div>
                        <Progress 
                          value={examScore} 
                          className="h-2"
                          indicatorClassName={
                            examScore >= 80 ? "bg-green-500" : 
                            examScore >= 60 ? "bg-yellow-500" : 
                            "bg-red-500"
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Practice section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => navigate(`/dashboard/student/flashcards/physics-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
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
              className="h-auto py-6 flex flex-col items-center border-2 border-indigo-200 dark:border-indigo-900/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              <FileQuestion className="h-10 w-10 mb-2 text-indigo-600 dark:text-indigo-400" />
              <div className="text-center">
                <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Take a Practice Quiz</h3>
                <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80">Test your knowledge with targeted questions</p>
              </div>
            </Button>
          </div>
          
          {/* Add the Start Interactive Learning button */}
          <Button 
            variant="default" 
            size="lg"
            onClick={handleStartInteractiveLearning}
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Interactive Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* User notes */}
          <Card className="shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
              <CardTitle className="text-lg">Your Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {hasAddedNote ? (
                <div className="bg-yellow-50/70 dark:bg-yellow-900/10 rounded-md p-4 text-sm mb-3 border-l-4 border-yellow-400 dark:border-yellow-600">
                  <p>First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.</p>
                  <p className="mt-2">Second Law: F = ma - The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass.</p>
                  <p className="mt-2">Third Law: Every action has an equal and opposite reaction.</p>
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
          <Card className="shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
              <CardTitle className="text-lg flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {conceptData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100/70 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 cursor-pointer transition-colors">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">+ Add Tag</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Study statistics */}
          <Card className="shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
              <CardTitle className="text-lg">Study Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-indigo-500" />
                      Topic Mastery
                    </span>
                    <span>{mastery}%</span>
                  </div>
                  <Progress 
                    value={mastery} 
                    className="h-2"
                    indicatorClassName={
                      mastery >= 80 ? "bg-green-500" : 
                      mastery >= 60 ? "bg-yellow-500" : 
                      "bg-indigo-500"
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Award className="h-4 w-4 mr-1 text-amber-500" />
                      Quiz Score
                    </span>
                    <span>{examScore}%</span>
                  </div>
                  <Progress 
                    value={examScore} 
                    className="h-2"
                    indicatorClassName="bg-amber-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      Time Spent
                    </span>
                    <span>{Math.floor(studyTime / 60)} minutes</span>
                  </div>
                  <Progress 
                    value={Math.min((studyTime / (60 * 45)) * 100, 100)} 
                    className="h-2"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      Practice Completion
                    </span>
                    <span>40%</span>
                  </div>
                  <Progress 
                    value={40} 
                    className="h-2"
                    indicatorClassName="bg-green-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2">Learning Streak</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day} 
                      className={`h-8 flex-1 rounded ${
                        day <= 5 ? 'bg-green-500/80' : 'bg-gray-200 dark:bg-gray-700'
                      } flex items-center justify-center text-xs text-white font-medium`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">5 days study streak!</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card className="shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
              <CardTitle className="text-lg">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
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
              
              <div className="mt-4 text-center">
                <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                  View all related concepts
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Interactive Flashcards */}
          <Card className="shadow-md border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-indigo-700 dark:text-indigo-300">
                <Brain className="mr-2 h-5 w-5" />
                Interactive Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner border border-indigo-100 dark:border-indigo-900/30">
                <div className="text-center mb-3">
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    Card 1 of 10
                  </Badge>
                </div>
                <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-900/10 p-4 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900/20 min-h-[120px] flex items-center justify-center mb-3">
                  <p className="text-center font-medium">What is Newton's First Law of Motion?</p>
                </div>
                <Button className="w-full" variant="outline">
                  Reveal Answer
                </Button>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="ghost" size="sm">
                  Previous
                </Button>
                <Button variant="ghost" size="sm">
                  Next
                </Button>
              </div>
              <div className="mt-4 text-center">
                <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700" onClick={handleStartInteractiveLearning}>
                  Start Full Flashcard Session
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Discussion */}
          <Card className="shadow-md border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
              <CardTitle className="text-lg">Discussion</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
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

export default ConceptCardView;
