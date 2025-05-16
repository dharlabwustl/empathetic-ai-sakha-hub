
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, Bookmark, PenLine, Share2, Volume2, VolumeX, 
  Brain, FileQuestion, Check, ArrowRight, ArrowLeft, Star,
  Clock, Book, Video, Award, Zap, CircleHelp, Activity,
  Lightbulb, PenTool, Mic, Play, Pause, ThumbsUp, ThumbsDown,
  RotateCw, AlertCircle, CheckCircle, ChevronRight
} from "lucide-react";
import { cn } from '@/lib/utils';

// 3D model import - this would be replaced with actual three.js implementation
const Simulation3D = () => (
  <div className="w-full aspect-video bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg flex flex-col items-center justify-center">
    <div className="animate-pulse bg-indigo-500/20 p-8 rounded-full mb-4">
      <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
    </div>
    <p className="text-center text-muted-foreground">
      Interactive 3D model would render here<br />
      <span className="text-sm opacity-70">(Requires Three.js implementation)</span>
    </p>
    <Button variant="outline" className="mt-4">Interact with Model</Button>
  </div>
);

// Mock concept data - would be fetched from API in production
const mockConcept = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "Medium",
  tags: ["Force", "Motion", "Classical Mechanics", "NEET", "JEE", "Foundation"],
  simpleExplanation: "Newton's Laws of Motion describe the relationship between an object and the forces acting upon it. The first law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. The second law explains that force equals mass times acceleration (F = ma). The third law states that for every action, there is an equal and opposite reaction.",
  detailedExplanation: "Sir Isaac Newton's three laws of motion, published in his 'Principia Mathematica' in 1687, form the foundation of classical mechanics. These laws describe the relationship between the motion of an object and the forces acting on it.\n\nFirst Law (Law of Inertia): An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This property is called inertia. In mathematical terms, when the net force on an object is zero (∑F = 0), the object will maintain its velocity.\n\nSecond Law (F = ma): The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration.\n\nThird Law (Action-Reaction): For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object. Mathematically: F₁₂ = -F₂₁.",
  examples: [
    {
      title: "Rocket Propulsion",
      description: "When a rocket expels gas downward (action), the rocket experiences an upward force (reaction), propelling it into space according to Newton's Third Law."
    },
    {
      title: "Car Acceleration",
      description: "When you press the accelerator in a car, the engine applies more force, resulting in greater acceleration according to F = ma (Second Law)."
    },
    {
      title: "Book on Table",
      description: "A book resting on a table experiences two forces: gravity pulling it down and the normal force from the table pushing up. These forces balance out (∑F = 0), keeping the book at rest (First Law)."
    }
  ],
  formulas: [
    {
      name: "Newton's Second Law",
      formula: "F = m × a",
      variables: [
        { symbol: "F", name: "Force", unit: "Newton (N)" },
        { symbol: "m", name: "Mass", unit: "Kilogram (kg)" },
        { symbol: "a", name: "Acceleration", unit: "meter/second² (m/s²)" }
      ],
      explanation: "The force acting on an object is equal to the mass of the object multiplied by its acceleration."
    },
    {
      name: "Weight Formula",
      formula: "W = m × g",
      variables: [
        { symbol: "W", name: "Weight", unit: "Newton (N)" },
        { symbol: "m", name: "Mass", unit: "Kilogram (kg)" },
        { symbol: "g", name: "Gravitational Acceleration", unit: "meter/second² (m/s²)" }
      ],
      explanation: "Weight is a force resulting from gravitational pull, calculated by multiplying mass by the acceleration due to gravity."
    }
  ],
  diagramAnalysis: [
    {
      title: "Force Diagram for First Law",
      imageUrl: "https://example.com/first-law-diagram.png",
      description: "This diagram shows an object at rest with balanced forces (∑F = 0)."
    },
    {
      title: "Force Diagram for Second Law",
      imageUrl: "https://example.com/second-law-diagram.png",
      description: "This diagram illustrates how unbalanced forces lead to acceleration proportional to F/m."
    },
    {
      title: "Force Diagram for Third Law",
      imageUrl: "https://example.com/third-law-diagram.png",
      description: "This diagram demonstrates equal and opposite forces in action-reaction pairs."
    }
  ],
  realWorldApplications: "Newton's Laws have countless real-world applications, from designing vehicles to planning space missions. Engineers use these principles to calculate the forces needed for rockets to escape Earth's gravity. In sports, understanding these laws helps athletes optimize their movements—like a swimmer pushing off the wall or a basketball player shooting. Even everyday activities like walking rely on these laws: you push backward on the ground (action), and the ground pushes you forward (reaction), allowing you to move.",
  examRelevance: "Newton's Laws appear frequently in physics exams at all levels. Key exam topics include:\n\n- Free-body diagrams and force analysis\n- Calculating acceleration using F = ma\n- Identifying action-reaction pairs\n- Applying the laws to complex systems like pulleys and inclined planes\n- Conceptual questions about inertia and equilibrium\n\nExam tip: When solving problems, always start by drawing a free-body diagram showing all forces acting on the object.",
  commonMistakes: [
    "Confusing 'no force' with 'no motion' in the First Law. Objects can move at constant velocity when forces are balanced, not just when there's no force.",
    "Forgetting that acceleration is a vector quantity in F = ma. Direction matters!",
    "Misidentifying action-reaction pairs. Remember, action-reaction forces act on different objects, not on the same object.",
    "Ignoring friction in calculations, leading to idealized results that don't match real-world observations.",
    "Assuming that the larger or more massive object exerts a greater force in an interaction. According to the Third Law, both forces are equal in magnitude."
  ],
  videoUrl: "https://example.com/newtons-laws-video",
  aiInsights: "Based on your study patterns, you seem to understand Newton's First Law well, but you might need more practice with applications of the Third Law. I recommend focusing on action-reaction pairs in complex systems.",
  previousExamQuestions: [
    {
      year: "2023",
      question: "A 5 kg object is subjected to a force of 20 N. What is its acceleration?",
      answer: "4 m/s²",
      explanation: "Using Newton's Second Law: a = F/m = 20N/5kg = 4 m/s²"
    },
    {
      year: "2022",
      question: "Explain why a person in a moving bus falls forward when the bus suddenly stops.",
      answer: "Due to Newton's First Law (inertia), the passenger's body tends to continue moving forward at the original speed when the bus stops.",
      explanation: "This is an application of Newton's First Law. The person's body is in motion and tends to remain in motion (inertia) even when the bus stops."
    }
  ],
  relatedConcepts: [
    { id: "c2", title: "Conservation of Momentum" },
    { id: "c3", title: "Circular Motion" },
    { id: "c4", title: "Work and Energy" },
    { id: "c5", title: "Friction Forces" }
  ],
  recallPrompts: [
    "State Newton's Three Laws of Motion in your own words.",
    "Explain how Newton's Second Law relates force, mass, and acceleration.",
    "Describe a real-world example of Newton's Third Law in action."
  ]
};

export default function ConceptStudyPage() {
  const { conceptId } = useParams<{conceptId: string}>();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [mastery, setMastery] = useState(65);
  const [recallAnswer, setRecallAnswer] = useState("");
  const [currentRecallPrompt, setCurrentRecallPrompt] = useState(0);
  const [showRecallFeedback, setShowRecallFeedback] = useState(false);
  const [recallCorrect, setRecallCorrect] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [confidence, setConfidence] = useState(3);
  const [studyTimeSeconds, setStudyTimeSeconds] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { toast } = useToast();
  
  const recallInputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // For conceptId, in a real app we'd fetch the concept data
  // For this mock, we'll just use our prepared data
  const concept = mockConcept;
  
  // Study timer functionality
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStudyTimeSeconds(prev => prev + 1);
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Voice reading functionality
  const toggleVoiceReading = () => {
    setIsVoiceActive(!isVoiceActive);
    
    // In a real implementation, this would use the actual text-to-speech API
    if (!isVoiceActive) {
      let textToRead = "";
      switch (activeTab) {
        case "simple":
          textToRead = concept.simpleExplanation;
          break;
        case "detailed":
          textToRead = concept.detailedExplanation;
          break;
        // Add cases for other tabs
        default:
          textToRead = concept.title;
      }
      
      toast({
        title: "Read Aloud Activated",
        description: "The content is now being read aloud."
      });
      
      // Actual speech synthesis would happen here
      // For now, we just simulate it
      
      // speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead));
    } else {
      // speechSynthesis.cancel();
      toast({
        title: "Read Aloud Stopped",
        description: "Text-to-speech has been turned off."
      });
    }
  };
  
  // Bookmark functionality
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Concept Bookmarked" : "Bookmark Removed",
      description: !isBookmarked 
        ? "You can find this concept in your bookmarks section." 
        : "Concept removed from your bookmarks.",
    });
  };
  
  // Notes functionality
  const handleSaveNote = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved for this concept.",
    });
    // In a real app, we'd send this to the backend
  };
  
  // Active recall functionality
  const checkRecallAnswer = () => {
    // In a real app, this would use AI or pattern matching to check answers
    // For this demo, we'll simulate response
    setShowRecallFeedback(true);
    
    // Simulate checking against correct answers
    const answer = recallAnswer.toLowerCase();
    const prompt = concept.recallPrompts[currentRecallPrompt].toLowerCase();
    
    // Simple check if answer contains key terms
    const correct = 
      (prompt.includes("three laws") && 
       answer.includes("inertia") && 
       answer.includes("force") && 
       answer.includes("action") && 
       answer.includes("reaction")) ||
      (prompt.includes("second law") && 
       answer.includes("force") && 
       answer.includes("mass") && 
       answer.includes("acceleration") && 
       (answer.includes("f=ma") || answer.includes("f = ma"))) ||
      (prompt.includes("third law") && 
       answer.includes("action") && 
       answer.includes("reaction") && 
       answer.includes("equal") && 
       answer.includes("opposite"));
    
    setRecallCorrect(correct);
    
    // Update mastery based on recall success
    if (correct) {
      setMastery(prev => Math.min(100, prev + 5));
    }
    
    setTimeout(() => {
      setShowRecallFeedback(false);
      setRecallAnswer("");
      // Move to next prompt
      setCurrentRecallPrompt((currentRecallPrompt + 1) % concept.recallPrompts.length);
    }, 3000);
  };
  
  // Speech recognition for active recall
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // This would use the Web Speech API in a real implementation
      toast({
        title: "Voice Recording Started",
        description: "Speak your answer clearly...",
      });
      
      // Simulate speech recognition after 3 seconds
      setTimeout(() => {
        // This would normally come from the speech recognition API
        const simulatedText = "Newton's Third Law states that for every action, there is an equal and opposite reaction. This means when one object exerts a force on another, the second object exerts an equal force in the opposite direction.";
        
        setRecallAnswer(simulatedText);
        setIsRecording(false);
        
        toast({
          title: "Voice Recording Finished",
          description: "Your answer has been transcribed.",
        });
      }, 3000);
    } else {
      // Stop recording
      toast({
        title: "Voice Recording Stopped",
        description: "Recording has been cancelled.",
      });
    }
  };
  
  // Confidence rating handling
  const handleConfidenceChange = (rating: number) => {
    setConfidence(rating);
    
    // Update mastery based on confidence (small effect)
    if (rating > confidence) {
      setMastery(prev => Math.min(100, prev + 2));
    } else if (rating < confidence) {
      setMastery(prev => Math.max(0, prev - 2));
    }
    
    let message = "";
    if (rating <= 1) {
      message = "Don't worry, we'll help you understand this better.";
    } else if (rating <= 3) {
      message = "You're making progress. Keep practicing!";
    } else {
      message = "Great confidence! Try testing yourself with practice questions.";
    }
    
    toast({
      title: "Confidence Updated",
      description: message,
    });
  };
  
  // Video player controls
  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button and header */}
      <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 rounded-xl">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/dashboard/student/concepts">&larr; Back to Concepts</Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                {concept.title}
              </h1>
              
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" /> 
                High Importance
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="secondary">{concept.subject}</Badge>
              <Badge variant="outline">{concept.topic}</Badge>
              <Badge variant="outline" className={cn(
                "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
                concept.difficulty === "Easy" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
                concept.difficulty === "Hard" && "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
              )}>
                {concept.difficulty}
              </Badge>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(studyTimeSeconds)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBookmark}
              className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
            >
              <Bookmark className={cn("h-4 w-4 mr-1", isBookmarked && "fill-yellow-500")} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleVoiceReading}
              className={isVoiceActive ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300" : ""}
            >
              {isVoiceActive ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
              {isVoiceActive ? 'Stop Reading' : 'Read Aloud'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Mastery indicator */}
          <Card className="mb-6 border-t-4" style={{ borderTopColor: 'rgb(99, 102, 241)' }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Mastery Level</span>
                <span className={cn(
                  "text-base",
                  mastery < 30 ? "text-red-500" : 
                  mastery < 70 ? "text-yellow-500" : 
                  "text-green-500"
                )}>
                  {mastery}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={mastery} className="h-2.5" />
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">How confident are you with this concept?</p>
                <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button 
                      key={rating}
                      variant={confidence === rating ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "flex-1",
                        rating <= 2 ? "data-[state=default]:bg-red-500" :
                        rating === 3 ? "data-[state=default]:bg-yellow-500" :
                        "data-[state=default]:bg-green-500"
                      )}
                      onClick={() => handleConfidenceChange(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Not at all</span>
                  <span>Very confident</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content tabs */}
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="simple" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start p-2 bg-muted/50 rounded-t-lg overflow-x-auto flex-nowrap">
                  <TabsTrigger value="simple" className="whitespace-nowrap">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="detailed" className="whitespace-nowrap">Detailed Explanation</TabsTrigger>
                  <TabsTrigger value="examples" className="whitespace-nowrap">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams" className="whitespace-nowrap">Diagram Analysis</TabsTrigger>
                  <TabsTrigger value="formula" className="whitespace-nowrap">Formula Lab</TabsTrigger>
                  <TabsTrigger value="3d" className="whitespace-nowrap">3D Simulation</TabsTrigger>
                  <TabsTrigger value="real-world" className="whitespace-nowrap">Real-World Applications</TabsTrigger>
                  <TabsTrigger value="exam" className="whitespace-nowrap">Exam Relevance</TabsTrigger>
                  <TabsTrigger value="mistakes" className="whitespace-nowrap">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video" className="whitespace-nowrap">Video Analysis</TabsTrigger>
                  <TabsTrigger value="aiinsights" className="whitespace-nowrap">AI Insights</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                      Simple Explanation
                    </h2>
                    {isVoiceActive && (
                      <Badge variant="outline" className="animate-pulse bg-blue-50 text-blue-700">
                        <Volume2 className="h-3 w-3 mr-1" /> Reading...
                      </Badge>
                    )}
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    <p className="text-lg">{concept.simpleExplanation}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                      Detailed Explanation
                    </h2>
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.detailedExplanation.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <FileQuestion className="h-5 w-5 mr-2 text-green-500" />
                      Examples with Walkthrough
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {concept.examples.map((example, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg border border-muted hover:border-muted-foreground/20 transition-colors">
                        <h3 className="font-medium text-lg mb-2 flex items-center">
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-2">
                            {index + 1}
                          </span>
                          {example.title}
                        </h3>
                        <p>{example.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Book className="h-5 w-5 mr-2 text-blue-500" />
                      Diagram-Based Analysis
                    </h2>
                  </div>
                  <div className="space-y-8">
                    {concept.diagramAnalysis.map((diagram, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 h-48 flex items-center justify-center">
                          <div className="text-center p-6 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg">
                            <p className="font-medium">{diagram.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">Click to enlarge</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{diagram.title}</h3>
                          <p className="text-sm mt-2">{diagram.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="formula" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-purple-500" />
                      Formula Lab
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {concept.formulas.map((formula, index) => (
                      <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                        <h3 className="font-medium text-lg mb-2">{formula.name}</h3>
                        
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-md flex items-center justify-center my-3">
                          <div className="text-xl font-medium text-indigo-700 dark:text-indigo-300">{formula.formula}</div>
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          <p className="font-medium">Where:</p>
                          <ul className="list-none space-y-2">
                            {formula.variables.map((variable, vIndex) => (
                              <li key={vIndex} className="flex items-center">
                                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-3">
                                  {variable.symbol}
                                </span>
                                <span className="flex-1">
                                  {variable.name} ({variable.unit})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="mt-4 text-muted-foreground">{formula.explanation}</p>
                        
                        <div className="mt-4 flex justify-center">
                          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:text-indigo-300 dark:border-indigo-800 dark:hover:bg-indigo-950">
                            Try Interactive Calculator
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="3d" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-amber-500" />
                      3D Simulation
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <p className="text-center text-muted-foreground mb-4">
                        Interact with the 3D model to better understand the concept
                      </p>
                      
                      <Simulation3D />
                      
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <RotateCw className="h-4 w-4 mr-1" />
                          Rotate
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          View Forces
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          Simulate Collision
                        </Button>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Instructions:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Click and drag to rotate the model</li>
                          <li>Use the buttons above to change the simulation</li>
                          <li>Observe how forces interact according to Newton's Laws</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="real-world" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-pink-500" />
                      Real-World Applications
                    </h2>
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.realWorldApplications}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                        <h3 className="font-medium text-green-800 dark:text-green-300 flex items-center text-lg">
                          <Award className="h-5 w-5 mr-2" />
                          Sports
                        </h3>
                        <p className="mt-2">Newton's laws explain how athletes generate and control forces for optimal performance in sports like swimming, basketball, and running.</p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center text-lg">
                          <Zap className="h-5 w-5 mr-2" />
                          Transportation
                        </h3>
                        <p className="mt-2">Vehicle design, safety features, and propulsion systems all rely on understanding and applying Newton's three laws of motion.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="exam" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <FileQuestion className="h-5 w-5 mr-2 text-violet-500" />
                      Exam Relevance
                    </h2>
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.examRelevance.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    
                    <div className="not-prose mt-6">
                      <h3 className="font-medium text-lg">Previous Exam Questions</h3>
                      <div className="space-y-4 mt-3">
                        {concept.previousExamQuestions.map((q, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 flex justify-between">
                              <span className="font-medium">{q.year} Question</span>
                              <span className="text-sm text-muted-foreground">NEET</span>
                            </div>
                            <div className="p-4">
                              <p className="font-medium mb-3">{q.question}</p>
                              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                                <p className="font-medium text-green-800 dark:text-green-300 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Answer: {q.answer}
                                </p>
                                <p className="text-sm mt-2">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                      Common Mistakes to Avoid
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-lg text-red-800 dark:text-red-300 flex items-start">
                        <span className="bg-red-100 dark:bg-red-800 rounded-full w-6 h-6 flex items-center justify-center text-red-800 dark:text-red-200 font-medium mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="video" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Video className="h-5 w-5 mr-2 text-red-500" />
                      Video Analysis
                    </h2>
                  </div>
                  <div className="relative aspect-video bg-gradient-to-r from-indigo-900/10 to-purple-900/10 rounded-lg flex items-center justify-center mb-4">
                    {!isVideoPlaying ? (
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={toggleVideo} 
                        className="absolute flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 shadow-xl rounded-full px-6"
                      >
                        <Play className="h-5 w-5" />
                        Play Video
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                          <Pause 
                            className="h-8 w-8 text-white dark:text-gray-200 cursor-pointer" 
                            onClick={toggleVideo} 
                          />
                        </div>
                        <p className="text-sm text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          Video playing...
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>This video provides a visual explanation of Newton's Laws of Motion, with animations and real-world examples to help reinforce your understanding.</p>
                    
                    <h3>Key Points Covered in Video:</h3>
                    <ul>
                      <li>Visualization of all three laws with practical demonstrations</li>
                      <li>Step-by-step problem-solving using Newton's laws</li>
                      <li>Common exam questions and how to approach them</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="aiinsights" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-500" />
                      AI-Generated Insights
                    </h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800 mb-6">
                    <p className="text-lg font-medium mb-3">Personalized Learning Insights</p>
                    <p>{concept.aiInsights}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Suggested Focus Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 mr-1 text-indigo-500" />
                            Practice drawing force diagrams
                          </li>
                          <li className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 mr-1 text-indigo-500" />
                            Review action-reaction pairs in complex systems
                          </li>
                          <li className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 mr-1 text-indigo-500" />
                            Solve numerical problems using F=ma
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Exam Prediction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Readiness for NEET</span>
                              <span>72%</span>
                            </div>
                            <Progress value={72} className="h-2" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Based on your performance, you have a good understanding but need more practice with numerical applications.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Active Recall Testing */}
          <Card className="mb-6 overflow-hidden border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-green-500" />
                Active Recall Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Recall Prompt:</h3>
                <p className="p-3 bg-muted rounded-md">{concept.recallPrompts[currentRecallPrompt]}</p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Your Answer:</h3>
                  <Button 
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleRecording}
                    className="flex items-center gap-1"
                  >
                    <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
                    {isRecording ? "Stop Recording" : "Record Answer"}
                  </Button>
                </div>
                
                <Textarea 
                  ref={recallInputRef}
                  value={recallAnswer}
                  onChange={(e) => setRecallAnswer(e.target.value)}
                  placeholder="Type your answer here or use voice recording..."
                  className="min-h-[100px]"
                  disabled={showRecallFeedback}
                />
                
                {showRecallFeedback && (
                  <div className={`mt-3 p-3 rounded-md ${recallCorrect ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"}`}>
                    <div className="flex items-center font-medium mb-1">
                      {recallCorrect ? (
                        <>
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Great job!
                        </>
                      ) : (
                        <>
                          <CircleHelp className="h-4 w-4 mr-2" />
                          Close, but review these points:
                        </>
                      )}
                    </div>
                    <p className="text-sm">
                      {recallCorrect 
                        ? "Your understanding of this concept is strong. Keep up the great work!" 
                        : "Make sure to mention all key aspects: inertia in the first law, force-mass-acceleration relationship in the second law, and equal and opposite forces in the third law."}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={checkRecallAnswer} 
                  disabled={!recallAnswer.trim().length || showRecallFeedback}
                >
                  Submit Answer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Your Notes */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <Button variant="outline" size="sm" onClick={() => setNotesOpen(!notesOpen)}>
              <PenLine className="h-4 w-4 mr-1" />
              {notesOpen ? "Close Notes" : "Add Notes"}
            </Button>
          </div>
          
          {notesOpen && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <Textarea 
                  className="w-full h-32 p-3 border rounded-md bg-background resize-none" 
                  placeholder="Write your notes here..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                  <Button size="sm" onClick={handleSaveNote}>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Practice section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
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
              className="h-auto py-6 flex flex-col items-center border-2"
            >
              <FileQuestion className="h-10 w-10 mb-2" />
              <div className="text-center">
                <h3 className="font-medium">Take a Practice Quiz</h3>
                <p className="text-xs opacity-90">Test your knowledge with targeted questions</p>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Quick access tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Concept Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-2.5 py-1">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study progress */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
              <CardTitle className="text-lg font-medium flex items-center">
                <Activity className="h-5 w-5 text-primary mr-2" />
                Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery Level</span>
                    <span>{mastery}%</span>
                  </div>
                  <Progress value={mastery} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Spent</span>
                    <span>{Math.floor(studyTimeSeconds / 60)} min</span>
                  </div>
                  <Progress value={(studyTimeSeconds / 60) * 2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Score</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recall Accuracy</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BookOpen className="h-5 w-5 text-primary mr-2" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {concept.relatedConcepts.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/dashboard/student/concepts/card/${related.id}`}
                    className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors flex items-center"
                  >
                    <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{related.title}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full text-primary">
                  View Topic Map
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* AI coach */}
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="pb-2 bg-green-50 dark:bg-green-900/20">
              <CardTitle className="text-lg font-medium flex items-center text-green-800 dark:text-green-300">
                <Brain className="h-5 w-5 mr-2" />
                AI Study Coach
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4 text-sm">
                <p className="italic">
                  "Based on your interaction with this concept card, I recommend focusing on the relationship between force and acceleration in different scenarios."
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800 dark:text-green-300">Suggested Actions:</h4>
                  <ul className="space-y-1.5">
                    <li className="flex">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Revisit the Formula Lab section</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Practice numerical problems with F=ma</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Take the practice quiz on this topic</span>
                    </li>
                  </ul>
                </div>
                
                <Button size="sm" variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30">
                  Get Detailed Study Plan
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Exam relevance card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Award className="h-5 w-5 text-amber-500 mr-2" />
                Exam Relevance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm mr-2">NEET:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-2">JEE:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This concept appears in approximately 8% of NEET physics questions and 12% of JEE physics questions.
                </p>
                <div className="mt-4">
                  <Button size="sm" variant="secondary" className="w-full">
                    View Exam Insights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
