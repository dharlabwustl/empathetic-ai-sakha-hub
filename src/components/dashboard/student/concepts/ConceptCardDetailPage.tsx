
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, BookOpen, Brain, FileText, Bookmark, BookmarkPlus, FileSpreadsheet,
  Clock, CheckCircle, Volume2, Play, Box, FileVideo, 
  PenLine, MessageSquare, FileQuestion, ArrowRight, Cube3D, BookMarked
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
}

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [mastery, setMastery] = useState(30);
  const [hasAddedNote, setHasAddedNote] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState<number>(0);
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [simulating3D, setSimulating3D] = useState(false);
  
  const { speakMessage, toggleMute, isVoiceSupported } = useVoiceAnnouncer({});

  useEffect(() => {
    // Start timer to track study time
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // In a real app, fetch concept data by ID from an API
  // For now, use mock data
  const conceptData: ConceptCardData = {
    id: conceptId || '1',
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
    videoUrl: "https://www.youtube.com/embed/mn34mnnDnKU",
    tags: ["Newton", "Classical Mechanics", "Forces", "Motion", "Physics Fundamentals"],
    difficulty: "medium"
  };
  
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
      variant: increase ? "default" : "default",
    });
  };
  
  // Add a function to navigate to flashcards
  const handleStartInteractiveLearning = () => {
    navigate(`/dashboard/student/flashcards/physics-${conceptId}/interactive`);
    toast({
      title: "Interactive learning started",
      description: "Get ready to master this concept with flashcards!",
    });
  };

  // Handle read aloud functionality
  const toggleReadAloud = () => {
    if (!isVoiceSupported) {
      toast({
        title: "Text-to-Speech Not Supported",
        description: "Your browser doesn't support text-to-speech functionality. Please try a different browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (readAloudActive) {
      // Stop reading
      toggleMute(true);
      setReadAloudActive(false);
    } else {
      // Start reading
      setReadAloudActive(true);
      
      // Prepare the text to be read aloud based on active tab
      let textToRead = `${conceptData.title}. `;
      
      if (activeTab === "simple") {
        textToRead += conceptData.simpleExplanation;
      } else if (activeTab === "detailed") {
        textToRead += conceptData.detailedExplanation;
      } else if (activeTab === "examples") {
        textToRead += "Examples: ";
        conceptData.examples.forEach((example, index) => {
          textToRead += `Example ${index + 1}: ${example.question} Solution: ${example.solution} `;
        });
      }
      
      speakMessage(textToRead);
      
      // Auto turn off after content is read (roughly estimate reading time)
      setTimeout(() => {
        setReadAloudActive(false);
      }, textToRead.length * 55); 
    }
  };

  // Update confidence rating
  const handleConfidenceRating = (rating: number) => {
    setConfidenceRating(rating);
    
    // Provide feedback based on confidence
    let feedbackMessage = "";
    if (rating <= 2) {
      feedbackMessage = "It's okay to find this challenging. Let's focus on reviewing the basics first.";
    } else if (rating <= 4) {
      feedbackMessage = "You're making progress! Continue practicing with examples to build confidence.";
    } else {
      feedbackMessage = "Great confidence level! Try testing your knowledge with practice questions.";
    }
    
    toast({
      title: "Confidence Recorded",
      description: feedbackMessage,
    });
  };
  
  const toggle3DSimulation = () => {
    setSimulating3D(!simulating3D);
    if (!simulating3D) {
      toast({
        title: "3D Simulation Mode",
        description: "You're now viewing an interactive 3D simulation of Newton's Laws",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header area with premium design */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')} className="mb-2 bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-800 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">{conceptData.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">{conceptData.subject}</Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">{conceptData.topic}</Badge>
              <Badge variant={
                conceptData.difficulty === 'easy' ? "outline" : 
                conceptData.difficulty === 'medium' ? "secondary" : "destructive"
              } className={
                conceptData.difficulty === 'easy' ? "bg-green-100 text-green-800 border-green-200" : 
                conceptData.difficulty === 'medium' ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                "bg-red-100 text-red-800 border-red-200"
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
              className={`${isBookmarked ? "text-yellow-500 border-yellow-200 bg-yellow-50" : "bg-white/80"} backdrop-blur-sm`}
            >
              {isBookmarked ? <BookMarked className="fill-yellow-500" /> : <BookmarkPlus />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleReadAloud}
              className={`${readAloudActive ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-white/80"} backdrop-blur-sm`}
            >
              <Volume2 className={readAloudActive ? "text-blue-700" : ""} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mastery indicator with premium styling */}
      <div className="mb-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Mastery Level</span>
            <span className={
              mastery >= 80 ? "text-green-600 dark:text-green-400" :
              mastery >= 40 ? "text-yellow-600 dark:text-yellow-400" :
              "text-red-600 dark:text-red-400"
            }>{mastery}%</span>
          </div>
          <Progress 
            value={mastery} 
            className="h-2.5 bg-gray-100 dark:bg-gray-800" 
          />
          <div className="flex justify-center space-x-4 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUpdateMastery(false)}
              disabled={mastery <= 0}
              className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              Need More Practice
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUpdateMastery(true)}
              disabled={mastery >= 100}
              className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              I Understand This
            </Button>
          </div>
        </div>

        {/* Confidence rating section */}
        <div>
          <h3 className="font-medium mb-2 text-sm">How confident are you about this concept?</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={confidenceRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleConfidenceRating(rating)}
                  className={`w-10 h-10 ${confidenceRating === rating 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"}`}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {confidenceRating === 1 && "Not confident at all"}
              {confidenceRating === 2 && "Slightly confident"}
              {confidenceRating === 3 && "Moderately confident"}
              {confidenceRating === 4 && "Very confident"}
              {confidenceRating === 5 && "Extremely confident"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Learn: {conceptData.title}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleReadAloud}
                  className={`${readAloudActive ? "bg-blue-100 text-blue-700 border-blue-200" : ""}`}
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  {readAloudActive ? "Stop Reading" : "Read Aloud"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start px-6 pt-4 pb-0 overflow-x-auto bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <TabsTrigger value="simple">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Explanation</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="applications">Real-World Applications</TabsTrigger>
                  <TabsTrigger value="3d">3D Simulation</TabsTrigger>
                  <TabsTrigger value="formula">Formula Lab</TabsTrigger>
                  <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video">Video Analysis</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="simple" className="prose max-w-none dark:prose-invert mt-0">
                    <p>{conceptData.simpleExplanation}</p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4 border border-blue-100 dark:border-blue-800">
                      <h4 className="text-blue-800 dark:text-blue-300 text-sm font-medium m-0 mb-1">Quick recall</h4>
                      <p className="text-blue-800 dark:text-blue-300 m-0 text-sm">Try to explain Newton's First Law in your own words:</p>
                      <textarea 
                        className="w-full h-20 p-2 rounded-md border border-blue-200 dark:border-blue-700 mt-2 bg-white dark:bg-gray-800 text-sm"
                        placeholder="Type your answer here..."
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Check Answer</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="detailed" className="prose max-w-none dark:prose-invert mt-0">
                    {conceptData.detailedExplanation.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-0">
                    <div className="space-y-6">
                      {conceptData.examples.map((example, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Example {idx + 1}</h3>
                          <div className="mb-3 bg-white dark:bg-gray-950 p-4 rounded-md shadow-inner border border-gray-200 dark:border-gray-800">
                            <p className="font-medium text-sm mb-1 text-indigo-600 dark:text-indigo-400">Question:</p>
                            <p>{example.question}</p>
                          </div>
                          <div className="mb-3 bg-white dark:bg-gray-950 p-4 rounded-md shadow-inner border border-gray-200 dark:border-gray-800">
                            <p className="font-medium text-sm mb-1 text-green-600 dark:text-green-400">Solution:</p>
                            <p>{example.solution}</p>
                          </div>
                          <div className="bg-white dark:bg-gray-950 p-4 rounded-md shadow-inner border border-gray-200 dark:border-gray-800">
                            <p className="font-medium text-sm mb-2 text-blue-600 dark:text-blue-400">Step by step:</p>
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
                    <div className="space-y-6">
                      {conceptData.diagrams.map((diagram, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
                          <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Diagram {idx + 1}</h3>
                          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">{diagram.description}</p>
                          <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-md overflow-hidden">
                            {diagram.imageUrl ? (
                              <img 
                                src={diagram.imageUrl} 
                                alt={diagram.description} 
                                className="w-full h-full object-contain" 
                              />
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">
                                Diagram image preview
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="applications" className="mt-0">
                    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Real-World Applications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conceptData.realWorldApplications.map((app, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start">
                              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                                <span className="font-bold text-blue-700 dark:text-blue-300">{idx + 1}</span>
                              </div>
                              <p>{app}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="3d" className="mt-0">
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 h-[450px] relative">
                      {!simulating3D && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                          <Cube3D className="h-16 w-16 mb-4 text-indigo-400" />
                          <h3 className="text-xl font-bold text-white mb-2">Interactive 3D Simulation</h3>
                          <p className="text-gray-300 text-center mb-6">Experience Newton's Laws in an interactive 3D environment</p>
                          <Button 
                            onClick={toggle3DSimulation} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Start 3D Simulation
                          </Button>
                        </div>
                      )}
                      {simulating3D && (
                        <div className="p-4 absolute top-4 right-4 z-20">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={toggle3DSimulation}
                            className="bg-gray-800 border-gray-600 text-gray-200"
                          >
                            Exit Simulation
                          </Button>
                        </div>
                      )}
                      {simulating3D && (
                        <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 absolute"></div>
                      )}
                      {simulating3D && (
                        <div className="absolute bottom-6 left-6 right-6 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
                          <h4 className="text-gray-200 text-sm font-medium mb-2">Simulation Controls</h4>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-200">Reset</Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-200">Pause</Button>
                            <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700">Apply Force</Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">Active Recall Check</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Based on the simulation, explain how Newton's Third Law is demonstrated:</p>
                      <div className="flex space-x-2">
                        <input 
                          type="text" 
                          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900" 
                          placeholder="Type your answer or speak by clicking the mic button"
                        />
                        <Button variant="outline" className="bg-white dark:bg-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="formula" className="mt-0">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 rounded-lg p-6 border border-blue-100 dark:border-indigo-900">
                        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">Key Formulae</h3>
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Newton's Second Law</h4>
                              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Most Important</Badge>
                            </div>
                            <div className="flex items-center justify-center py-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                              <span className="text-2xl font-bold">F = m × a</span>
                            </div>
                            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                              <p>Where:</p>
                              <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>F = Force (Newtons, N)</li>
                                <li>m = Mass (kilograms, kg)</li>
                                <li>a = Acceleration (meters per second squared, m/s²)</li>
                              </ul>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium mb-2">Weight Formula</h4>
                            <div className="flex items-center justify-center py-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                              <span className="text-2xl font-bold">W = m × g</span>
                            </div>
                            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                              <p>Where:</p>
                              <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>W = Weight (Newtons, N)</li>
                                <li>m = Mass (kilograms, kg)</li>
                                <li>g = Acceleration due to gravity (9.8 m/s² on Earth)</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Open Formula Lab
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exam" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <h3 className="font-medium">Importance in Exams:</h3>
                        <Badge className={`ml-2 ${
                          conceptData.examRelevance.importance === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                          conceptData.examRelevance.importance === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {conceptData.examRelevance.importance.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <FileQuestion className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                          Frequently Asked Questions
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {conceptData.examRelevance.frequentQuestions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                          Exam Tips
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {conceptData.examRelevance.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 rounded-lg p-4 border border-blue-100 dark:border-indigo-900">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Brain className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                          AI-Powered Insight
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          This concept appears in approximately 15% of NEET exams, primarily in questions involving force calculations and real-world applications. Focus on practicing numerical problems involving Newton's Second Law and motion analysis.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mistakes" className="mt-0">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30 p-4">
                      <h3 className="font-medium mb-3 text-red-800 dark:text-red-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="M12 3c-1.1 0-2 .9-2 2v2.47a12.9 12.9 0 0 0-2.29 1.67L5.27 7.68A2 2 0 0 0 2 10.24v2.76a2 2 0 0 0 .64 1.47 13.57 13.57 0 0 0 4.29 2.77L6 19.58a2 2 0 0 0 .83 2.18c.95.57 2.88 1.24 5.17 1.24s4.22-.67 5.17-1.24A2 2 0 0 0 18 19.58l-.93-2.34c1.61-.72 3.14-1.69 4.29-2.77A2 2 0 0 0 22 13v-2.76a2 2 0 0 0-3.27-1.54 12.9 12.9 0 0 0-2.29-1.67V5c0-1.1-.9-2-2-2Z"></path></svg>
                        Common Mistakes to Avoid
                      </h3>
                      <ul className="space-y-3">
                        {conceptData.commonMistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">{idx + 1}</span>
                            <span className="text-red-700 dark:text-red-300">{mistake}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-md border border-red-200 dark:border-red-900/30">
                        <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Check your understanding:</h4>
                        <p className="text-sm mb-2">Which of the following statements is incorrect about Newton's Laws?</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="radio" id="option1" name="quiz" className="mr-2" />
                            <label htmlFor="option1" className="text-sm">Newton's First Law is also known as the Law of Inertia</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="option2" name="quiz" className="mr-2" />
                            <label htmlFor="option2" className="text-sm">Force is measured in Joules</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="option3" name="quiz" className="mr-2" />
                            <label htmlFor="option3" className="text-sm">Newton's Third Law involves action and reaction forces</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="option4" name="quiz" className="mr-2" />
                            <label htmlFor="option4" className="text-sm">Acceleration is inversely proportional to mass</label>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">Check Answer</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="mt-0">
                    <div className="flex flex-col">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <iframe
                          src={conceptData.videoUrl}
                          className="w-full h-full"
                          title={`Video explanation of ${conceptData.title}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-4 space-y-3">
                        <h3 className="font-medium">Key Video Timestamps</h3>
                        <div className="space-y-2">
                          <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <div className="bg-blue-100 dark:bg-blue-900 rounded p-1 mr-2">
                              <FileVideo className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">00:14 - Introduction to Newton's Laws</p>
                            </div>
                            <div className="ml-auto">
                              <Button variant="ghost" size="sm">Jump</Button>
                            </div>
                          </div>
                          <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <div className="bg-blue-100 dark:bg-blue-900 rounded p-1 mr-2">
                              <FileVideo className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">01:23 - First Law explained</p>
                            </div>
                            <div className="ml-auto">
                              <Button variant="ghost" size="sm">Jump</Button>
                            </div>
                          </div>
                          <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <div className="bg-blue-100 dark:bg-blue-900 rounded p-1 mr-2">
                              <FileVideo className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">03:45 - Second Law calculations</p>
                            </div>
                            <div className="ml-auto">
                              <Button variant="ghost" size="sm">Jump</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Video Notes</h4>
                          <textarea 
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-gray-800"
                            placeholder="Take notes while watching the video..."
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Practice section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => navigate(`/dashboard/student/flashcards/physics-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
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
              className="h-auto py-6 flex flex-col items-center border-2 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-gray-900"
            >
              <FileQuestion className="h-10 w-10 mb-2 text-indigo-600 dark:text-indigo-400" />
              <div className="text-center">
                <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Take a Practice Quiz</h3>
                <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Test your knowledge with targeted questions</p>
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
          {/* User notes with premium styling */}
          <Card className="shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg flex items-center">
                <PenLine className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Your Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {hasAddedNote ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 text-sm mb-3 border border-blue-100 dark:border-blue-800">
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
                className="w-full mt-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={handleAddNote}
              >
                <PenLine className="h-4 w-4 mr-2" />
                {hasAddedNote ? "Edit Notes" : "Add Notes"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Tags with premium styling */}
          <Card className="shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {conceptData.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study statistics with premium styling */}
          <Card className="shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Study Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Topic Mastery</span>
                    <span className="text-green-600 dark:text-green-400">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-100 dark:bg-gray-800" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Score</span>
                    <span className="text-yellow-600 dark:text-yellow-400">72%</span>
                  </div>
                  <Progress value={72} className="h-2 bg-gray-100 dark:bg-gray-800" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Spent</span>
                    <span className="text-blue-600 dark:text-blue-400">45 minutes</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-100 dark:bg-gray-800" />
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30 mt-2">
                  <h4 className="text-xs font-medium text-indigo-800 dark:text-indigo-300 mb-1">AI Insight</h4>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    You're making good progress! To improve mastery, focus on applying Newton's Second Law in numerical problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources with premium styling */}
          <Card className="shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
              <CardTitle className="text-lg">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => navigate(`/dashboard/student/concepts/card/2`)}
                >
                  <BookOpen className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Conservation of Momentum
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => navigate(`/dashboard/student/concepts/card/3`)}
                >
                  <BookOpen className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  Work and Energy
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => navigate(`/dashboard/student/concepts/card/4`)}
                >
                  <BookOpen className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                  Circular Motion
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Discussion with premium styling */}
          <Card className="shadow-md border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
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

export default ConceptCardDetailPage;
