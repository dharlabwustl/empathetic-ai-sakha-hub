
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookAudio, BookText, FileText, Book, Brain, TrendingUp, History, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Download, Star, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

// Mock concept data
const conceptData = {
  id: 'concept-1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "Medium",
  estimatedTime: "45 min",
  masteryLevel: 72,
  recallStrength: 65,
  lastStudied: "2023-05-10T14:30:00Z",
  attemptsCount: 8,
  content: {
    overview: `Newton's three laws of motion are fundamental principles in classical mechanics that describe the relationship between the motion of an object and the forces acting on it. These laws form the foundation for classical mechanics and were first presented by Sir Isaac Newton in his work "Philosophiæ Naturalis Principia Mathematica" (Mathematical Principles of Natural Philosophy) in 1687.`,
    details: `<h3>First Law of Motion (Law of Inertia)</h3>
<p>Newton's first law states that an object at rest will remain at rest, and an object in motion will remain in motion with a constant velocity unless acted upon by an external force.</p>
<p>This law is often referred to as the law of inertia. Inertia is the resistance of any physical object to any change in its state of motion. This includes changes to the object's speed or direction of motion.</p>
<h3>Second Law of Motion (Force, Mass, and Acceleration)</h3>
<p>Newton's second law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.</p>
<p>Mathematically, it is expressed as: F = ma</p>
<p>Where:</p>
<ul>
<li>F is the net force applied (measured in newtons, N)</li>
<li>m is the mass of the object (measured in kilograms, kg)</li>
<li>a is the acceleration (measured in meters per second squared, m/s²)</li>
</ul>
<h3>Third Law of Motion (Action and Reaction)</h3>
<p>Newton's third law states that for every action, there is an equal and opposite reaction.</p>
<p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first. These forces act on different objects and are of the same type.</p>
<p>Examples include:</p>
<ul>
<li>A swimmer pushing against water propels the swimmer forward and the water backward.</li>
<li>The force of a rocket's exhaust pushing downward propels the rocket upward.</li>
<li>When you walk, you push against the ground, and the ground pushes back, propelling you forward.</li>
</ul>`,
    examples: `<h3>Example 1: First Law - Inertia</h3>
<p>When a bus suddenly stops, passengers lean forward. This happens because their bodies were in motion with the bus and want to continue moving forward due to inertia, while the bus has stopped.</p>

<h3>Example 2: Second Law - Force and Acceleration</h3>
<p>If you push a shopping cart with a force of 10 N, it will accelerate at a certain rate. If you double the force to 20 N, the acceleration will also double. If you place more items in the cart (increasing its mass), the same force will produce less acceleration.</p>

<h3>Example 3: Third Law - Action and Reaction</h3>
<p>When a bird flies, it pushes air downward and backward with its wings (action). The air simultaneously pushes the bird upward and forward with an equal force (reaction), allowing it to stay airborne and move forward.</p>

<h3>Example 4: Combined Laws</h3>
<p>Consider a rocket launch:</p>
<ul>
<li>Before ignition, the rocket remains on the launch pad (First Law - object at rest)</li>
<li>During lift-off, the engines exert a force greater than the rocket's weight, causing upward acceleration (Second Law)</li>
<li>The rocket expels gas downward (action), and the gas pushes the rocket upward (reaction) (Third Law)</li>
</ul>`,
    applications: `<h3>Aerospace Engineering</h3>
<p>Newton's laws are fundamental to the design and operation of aircraft and spacecraft. Engineers calculate the forces needed for takeoff, landing, and maneuvering based on these principles.</p>

<h3>Automotive Safety</h3>
<p>Seatbelts and airbags are designed based on Newton's first law. During a collision, they provide the external force needed to safely decelerate passengers who would otherwise continue moving forward.</p>

<h3>Sports Science</h3>
<p>Athletes and coaches apply Newton's laws to optimize performance. For instance, sprinters push against starting blocks (third law) to accelerate forward (second law).</p>

<h3>Everyday Applications</h3>
<ul>
<li>Walking (third law - pushing against the ground)</li>
<li>Driving (second law - acceleration proportional to engine force)</li>
<li>Stopping a vehicle (first law - brakes provide the force to overcome inertia)</li>
<li>Throwing or catching a ball (all three laws apply in different ways)</li>
</ul>`
  },
  formulas: [
    { id: "f1", name: "Newton's Second Law", formula: "F = ma", variables: ["F: Force (N)", "m: Mass (kg)", "a: Acceleration (m/s²)"] },
    { id: "f2", name: "Weight", formula: "W = mg", variables: ["W: Weight (N)", "m: Mass (kg)", "g: Gravitational acceleration (9.8 m/s²)"] },
    { id: "f3", name: "Momentum", formula: "p = mv", variables: ["p: Momentum (kg⋅m/s)", "m: Mass (kg)", "v: Velocity (m/s)"] }
  ],
  relatedConcepts: [
    { id: "c1", title: "Momentum and Impulse", subject: "Physics" },
    { id: "c2", title: "Work and Energy", subject: "Physics" },
    { id: "c3", title: "Circular Motion", subject: "Physics" }
  ],
  aiInsights: [
    { type: "weak-link", content: "Your understanding of inertia seems weak based on practice tests. Focus on the first law application examples." },
    { type: "suggestion", content: "Try connecting Newton's Second Law with the concept of momentum for deeper understanding." },
    { type: "revision", content: "Your recall of force units and calculations has declined. Review formula applications." }
  ],
  studyHistory: [
    { date: "2023-05-10", duration: 45, activityType: "initial-study" },
    { date: "2023-05-12", duration: 30, activityType: "practice-test", score: 65 },
    { date: "2023-05-15", duration: 20, activityType: "review" },
    { date: "2023-05-20", duration: 35, activityType: "practice-test", score: 78 },
    { date: "2023-05-25", duration: 25, activityType: "review" },
    { date: "2023-06-01", duration: 40, activityType: "practice-test", score: 82 },
    { date: "2023-06-10", duration: 20, activityType: "review" },
    { date: "2023-06-15", duration: 35, activityType: "practice-test", score: 88 }
  ]
};

// Component for the concept card detail page
const ConceptCardDetail: React.FC<{conceptId?: string}> = ({ conceptId: propsConceptId }) => {
  const { conceptId: urlConceptId } = useParams<{ conceptId: string }>();
  const actualConceptId = propsConceptId || urlConceptId;
  
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [notes, setNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string>("");
  const { toast } = useToast();
  const {
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    toggleMute
  } = useVoiceAnnouncer({});

  // Local state for analytics
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  
  // Log the conceptId for debugging
  useEffect(() => {
    console.log("ConceptCardDetail - Concept ID:", actualConceptId);
    console.log("From URL params:", urlConceptId);
    console.log("From props:", propsConceptId);
  }, [actualConceptId, urlConceptId, propsConceptId]);

  useEffect(() => {
    // Load saved notes from localStorage
    const loadedNotes = localStorage.getItem(`concept-notes-${actualConceptId}`);
    if (loadedNotes) {
      setNotes(loadedNotes);
      setSavedNotes(loadedNotes);
    }
  }, [actualConceptId]);

  // If conceptId doesn't exist, show error
  if (!actualConceptId) {
    return (
      <SharedPageLayout 
        title="Concept Not Found"
        subtitle="The concept you're looking for could not be loaded"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <Card className="shadow-sm border">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-center">Concept ID is missing</h2>
            <p className="text-muted-foreground text-center mt-2">
              We couldn't load this concept because the ID is missing or invalid.
            </p>
            <Button 
              onClick={() => navigate('/dashboard/student/concepts')}
              className="mt-6"
            >
              Go to Concepts
            </Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${actualConceptId}`, notes);
    setSavedNotes(notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      toggleMute(true);
      return;
    }
    
    let contentToRead = "";
    
    switch (activeTab) {
      case "overview":
        contentToRead = conceptData.content.overview;
        break;
      case "details":
        // Strip HTML tags for better reading
        contentToRead = conceptData.content.details.replace(/<[^>]*>?/gm, '');
        break;
      case "examples":
        contentToRead = conceptData.content.examples.replace(/<[^>]*>?/gm, '');
        break;
      case "applications":
        contentToRead = conceptData.content.applications.replace(/<[^>]*>?/gm, '');
        break;
      default:
        contentToRead = conceptData.content.overview;
    }
    
    speakMessage(`${conceptData.title}. ${contentToRead}`, true);
  };

  const navigateToConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  const navigateToFlashcards = () => {
    navigate(`/dashboard/student/flashcards?concept=${actualConceptId}`);
  };

  const navigateToPracticeExams = () => {
    navigate(`/dashboard/student/practice-exams?concept=${actualConceptId}`);
  };

  return (
    <SharedPageLayout 
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content and tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top action buttons */}
          <div className="flex flex-wrap gap-3 mb-4 justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleReadAloud}
              >
                <BookAudio className="h-4 w-4" />
                {isSpeaking ? "Stop Reading" : "Read Aloud"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center gap-1"
                onClick={() => navigateToFlashcards()}
              >
                <FileText className="h-4 w-4" />
                Flashcards
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center gap-1"
                onClick={() => navigateToPracticeExams()}
              >
                <BookText className="h-4 w-4" />
                Practice Exam
              </Button>
            </div>
            
            <Button
              variant={showAnalytics ? "default" : "outline"}
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <TrendingUp className="h-4 w-4" />
              Analytics
            </Button>
          </div>
          
          {/* Enhanced UI elements */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {conceptData.estimatedTime} time
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
              <Book className="h-3 w-3" />
              {conceptData.subject}
            </Badge>
            <Badge variant="outline" className={getDifficultyClass(conceptData.difficulty)}>
              {conceptData.difficulty} Difficulty
            </Badge>
          </div>
          
          {/* Analytics section */}
          {showAnalytics && (
            <Card className="bg-slate-50 dark:bg-slate-900 shadow-sm border mb-4 animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Learning Analytics
                </CardTitle>
                <CardDescription>Track your mastery progress for this concept</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Mastery Level</span>
                    <span className="text-sm">{conceptData.masteryLevel}%</span>
                  </div>
                  <Progress value={conceptData.masteryLevel} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Recall Strength</span>
                    <span className="text-sm">{conceptData.recallStrength}%</span>
                  </div>
                  <Progress value={conceptData.recallStrength} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm">
                    <div className="text-sm text-muted-foreground">Study Sessions</div>
                    <div className="text-2xl font-bold">{conceptData.studyHistory.length}</div>
                  </div>
                  <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm">
                    <div className="text-sm text-muted-foreground">Last Reviewed</div>
                    <div className="text-lg font-medium">
                      {new Date(conceptData.lastStudied).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Performance Trend</h4>
                  <div className="h-24 bg-white dark:bg-slate-800 rounded-md p-2 flex items-end gap-1">
                    {conceptData.studyHistory
                      .filter(h => h.activityType === 'practice-test')
                      .map((history, index) => (
                        <div 
                          key={index} 
                          className="flex-1 bg-primary hover:bg-primary/80 transition-all rounded-t-sm relative group"
                          style={{ height: `${history.score}%` }}
                        >
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                            {history.score}%
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Content tabs */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <CardTitle>{conceptData.title}</CardTitle>
                  <CardDescription>{conceptData.subject} • {conceptData.topic}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="examples" className="flex-1">Examples</TabsTrigger>
                  <TabsTrigger value="applications" className="flex-1">Applications</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-4" ref={contentRef}>
                <TabsContent value="overview" className="mt-0">
                  <p className="text-muted-foreground">{conceptData.content.overview}</p>
                  
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={() => setActiveTab("details")}
                      className="flex items-center gap-2"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: conceptData.content.details }}>
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: conceptData.content.examples }}>
                  </div>
                </TabsContent>
                
                <TabsContent value="applications" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: conceptData.content.applications }}>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          {/* Notes section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Notes</CardTitle>
              <CardDescription>Take notes to help you remember this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Type your notes here..." 
                className="min-h-[150px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                disabled={notes === savedNotes}
                onClick={handleSaveNotes}
              >
                Save Notes
              </Button>
              <Button 
                variant="ghost"
                onClick={() => {
                  const noteContent = notes || conceptData.content.overview;
                  const blob = new Blob([noteContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${conceptData.title.replace(/\s+/g, '_')}_notes.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Additional info */}
        <div className="space-y-6">
          {/* Formulas card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Key Formulas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {conceptData.formulas.map((formula, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{formula.name}</h4>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border text-center my-2 font-mono">
                      {formula.formula}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-xs mb-1">Where:</p>
                      <ul className="space-y-1 list-disc pl-4">
                        {formula.variables.map((variable, vIdx) => (
                          <li key={vIdx} className="text-xs">{variable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/dashboard/student/concepts/${actualConceptId}/formula-lab`)}
                >
                  Practice with Formulas
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Related concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {conceptData.relatedConcepts.map((concept, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900"
                    onClick={() => navigateToConcept(concept.id)}
                  >
                    <div>
                      <p className="font-medium">{concept.title}</p>
                      <p className="text-sm text-muted-foreground">{concept.subject}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI insights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {conceptData.aiInsights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-md border ${
                    insight.type === 'weak-link' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
                    insight.type === 'suggestion' ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20' : 
                    'border-green-200 bg-green-50 dark:bg-green-900/20'
                  }`}>
                    <div className="flex gap-2 items-start">
                      {insight.type === 'weak-link' ? (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : insight.type === 'suggestion' ? (
                        <Brain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{insight.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study history */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <History className="h-5 w-5 mr-2 text-gray-600" />
                Study History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {conceptData.studyHistory.slice(0, 4).map((history, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium capitalize">{history.activityType.replace('-', ' ')}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(history.date).toLocaleDateString()} • {history.duration} min
                      </p>
                    </div>
                    {history.score && (
                      <Badge variant={history.score > 75 ? "default" : "outline"}>
                        {history.score}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              
              {conceptData.studyHistory.length > 4 && (
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View All ({conceptData.studyHistory.length})
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};

const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-50 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-50 text-red-700 border-red-200';
    default: return '';
  }
};

export default ConceptCardDetail;
