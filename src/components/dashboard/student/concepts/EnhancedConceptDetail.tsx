
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Flag, 
  MessageSquare, 
  Volume2, 
  PauseCircle,
  PlayCircle,
  Edit3,
  BookMarked,
  FlaskConical,
  BarChart2,
  PenTool,
  FileText,
  Link as LinkIcon,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ConceptData {
  id: string;
  title: string;
  description: string;
  content: string;
  subject: string;
  chapter: string;
  difficulty: string;
  estimatedTime: number;
  completed: boolean;
  flaggedForRevision?: boolean;
  relatedConcepts?: {
    id: string;
    title: string;
    description: string;
    subject: string;
  }[];
  formulaCount?: number;
  readTime?: string;
  author?: string;
  concepts?: string[];
  examples?: string[];
  diagrams?: string[];
}

const EnhancedConceptDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isReading, setIsReading] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [isFlagged, setIsFlagged] = useState(false);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [speechRate, setSpeechRate] = useState(1);
  const [activeVoice, setActiveVoice] = useState("en-US");
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch the concept data
  useEffect(() => {
    console.log("Loading concept ID:", conceptId);
    
    // Simulate API call with mock data
    const fetchConceptData = () => {
      setTimeout(() => {
        setConceptData({
          id: conceptId || "1",
          title: "Newton's Laws of Motion",
          description: "Understanding the fundamental principles that govern classical mechanics",
          content: `
# Newton's Laws of Motion

Sir Isaac Newton's three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.

## First Law: Law of Inertia
An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

This means that objects naturally keep doing what they're already doing. If an object is still, it stays still. If it's moving, it keeps moving the same way. The only thing that can change this is a force pushing or pulling on the object.

## Second Law: F = ma
The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.

Simply put, the heavier an object is, the more force is needed to move it. The formula F = ma represents this relationship, where F is force, m is mass, and a is acceleration.

## Third Law: Action and Reaction
For every action, there is an equal and opposite reaction.

This means that whenever one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.

## Applications in Everyday Life
- When you push a shopping cart, the cart pushes back against your hands with equal force
- When you walk, you push the ground backward, and the ground pushes you forward
- Rocket propulsion: gases are expelled backward, propelling the rocket forward
          `,
          subject: "Physics",
          chapter: "Classical Mechanics",
          difficulty: "Medium",
          estimatedTime: 20,
          completed: false,
          readTime: "15 min read",
          author: "Physics Team",
          formulaCount: 5,
          relatedConcepts: [
            { id: "2", title: "Momentum and Impulse", description: "Understanding how forces change motion over time", subject: "Physics" },
            { id: "3", title: "Work and Energy", description: "The relationship between force, distance, and energy transfer", subject: "Physics" },
            { id: "4", title: "Circular Motion", description: "Motion in a curved path and the forces involved", subject: "Physics" }
          ],
          concepts: [
            "Law of Inertia",
            "Force equals mass times acceleration",
            "Action and reaction pairs"
          ],
          examples: [
            "A book on a table remains at rest due to balanced forces",
            "Calculating the force needed to accelerate a 1000kg car at 2m/s²",
            "Rocket propulsion demonstrating the third law"
          ],
          diagrams: [
            "Force diagram showing balanced forces",
            "Acceleration-mass relationship graph",
            "Action-reaction force pairs illustration"
          ]
        });
        setIsLoading(false);
      }, 800);
    };
    
    fetchConceptData();
  }, [conceptId]);
  
  // Speech synthesis for read aloud feature
  useEffect(() => {
    speechSynthRef.current = new SpeechSynthesisUtterance();
    
    return () => {
      if (isReading) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading]);
  
  const readContent = () => {
    if (!conceptData) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    const cleanText = conceptData.content.replace(/#+\s(.*?)\n/g, 'Heading: $1. ');
    
    const speech = speechSynthRef.current;
    if (speech) {
      speech.text = cleanText;
      speech.lang = activeVoice;
      speech.rate = speechRate;
      
      speech.onend = () => {
        setIsReading(false);
      };
      
      window.speechSynthesis.speak(speech);
      setIsReading(true);
      
      toast({
        title: "Reading aloud",
        description: "Reading content, click pause to stop",
      });
    }
  };
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: `Your notes for ${conceptData?.title} have been saved.`,
    });
    
    // In a real app, save to database
    console.log("Saving notes:", userNotes);
  };
  
  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
    });
  };
  
  const handleStartPractice = () => {
    toast({
      title: "Practice started",
      description: "Starting quick recall practice for this concept",
    });
    
    // In a real app, navigate to a practice component
    console.log("Starting practice for concept:", conceptId);
  };
  
  const handleAskAI = () => {
    toast({
      title: "AI Tutor",
      description: "Connecting to AI Tutor for this concept...",
    });
    
    // In a real app, open AI chat interface
    console.log("Opening AI chat for concept:", conceptId);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded w-full mt-4"></div>
        </div>
      </div>
    );
  }

  if (!conceptData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
        <p className="text-gray-500 mb-6">The requested concept could not be found.</p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Back navigation */}
        <Button 
          variant="ghost" 
          className="flex items-center w-fit mb-4" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{conceptData.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20">
                {conceptData.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20">
                {conceptData.chapter}
              </Badge>
              <Badge 
                variant="outline" 
                className={`
                  ${conceptData.difficulty === 'Easy' ? 'bg-green-50 text-green-700 dark:bg-green-900/20' : 
                    conceptData.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20' : 
                    'bg-red-50 text-red-700 dark:bg-red-900/20'}
                `}
              >
                {conceptData.difficulty}
              </Badge>
              {isFlagged && (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-900/20">
                  Flagged for Revision
                </Badge>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{conceptData.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {conceptData.estimatedTime} minutes
              </span>
              <span className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                {conceptData.readTime}
              </span>
              <span className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                {conceptData.formulaCount} formulas
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            <Button 
              variant={isReading ? "destructive" : "outline"} 
              onClick={readContent} 
              className="flex items-center"
            >
              {isReading ? (
                <>
                  <PauseCircle className="mr-2 h-4 w-4" />
                  Stop Reading
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Read Aloud
                </>
              )}
            </Button>
            
            <Button 
              variant={isFlagged ? "default" : "outline"} 
              onClick={handleToggleFlag}
              className="flex items-center"
            >
              <Flag className={`mr-2 h-4 w-4 ${isFlagged ? 'text-white' : ''}`} />
              {isFlagged ? 'Flagged' : 'Flag for Revision'}
            </Button>
            
            <Button 
              onClick={handleAskAI}
              variant="outline"
              className="flex items-center"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
        </div>
        
        {/* Main content with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 md:w-fit mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notes">My Notes</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="formulas">Formulas</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: conceptData.content
                      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/\n\n/gm, '<br><br>')
                  }} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={readContent} className="flex items-center">
                    {isReading ? <PauseCircle className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                    {isReading ? 'Stop Reading' : 'Read Aloud'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("notes")} className="flex items-center">
                    <PenTool className="mr-2 h-4 w-4" />
                    Add Notes
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleToggleFlag} className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  {isFlagged ? 'Remove Flag' : 'Flag for Revision'}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Key Concepts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Key Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {conceptData.concepts?.map((concept, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">
                          {index + 1}
                        </div>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {conceptData.examples?.map((example, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">
                          {index + 1}
                        </div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Diagrams & Visualizations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Diagrams & Visualizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {conceptData.diagrams?.map((diagram, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 text-xs">
                          {index + 1}
                        </div>
                        <span>{diagram}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="mr-2 h-5 w-5" />
                  My Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your notes here..."
                  className="min-h-[200px] mb-4"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button onClick={handleSaveNotes} className="flex items-center">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                  <Button variant="outline" onClick={() => setUserNotes("")}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Quick Recall Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Test your understanding of {conceptData.title} with quick practice questions.
                </p>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Question 1</h3>
                    <p>Which of Newton's laws states that "For every action, there is an equal and opposite reaction"?</p>
                    <RadioGroup defaultValue="third">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="first" id="r1" />
                        <Label htmlFor="r1">First Law</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="second" id="r2" />
                        <Label htmlFor="r2">Second Law</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="third" id="r3" />
                        <Label htmlFor="r3">Third Law</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Question 2</h3>
                    <p>The mathematical formulation of Newton's Second Law is:</p>
                    <RadioGroup defaultValue="fma">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fma" id="q2-1" />
                        <Label htmlFor="q2-1">F = ma</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fmd" id="q2-2" />
                        <Label htmlFor="q2-2">F = md</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fmv" id="q2-3" />
                        <Label htmlFor="q2-3">F = mv</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button onClick={handleStartPractice}>Start Full Practice</Button>
                  <Button variant="outline">Create Flashcards</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Related Tab */}
          <TabsContent value="related">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conceptData.relatedConcepts?.map((concept) => (
                    <Card key={concept.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{concept.title}</h3>
                        <Badge variant="outline" className="mb-2">{concept.subject}</Badge>
                        <p className="text-sm text-muted-foreground">{concept.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4 px-4">
                        <Button variant="link" className="p-0" onClick={() => navigate(`/dashboard/student/concept-study/${concept.id}`)}>
                          View Concept
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formulas Tab */}
          <TabsContent value="formulas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Key Formulas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-semibold mb-2">Newton's Second Law</h3>
                    <div className="p-2 bg-white dark:bg-gray-800 rounded flex justify-center items-center text-lg">
                      F = m × a
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Where F is force, m is mass, and a is acceleration
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-semibold mb-2">Weight</h3>
                    <div className="p-2 bg-white dark:bg-gray-800 rounded flex justify-center items-center text-lg">
                      W = m × g
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Where W is weight, m is mass, and g is gravitational field strength
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-semibold mb-2">Momentum</h3>
                    <div className="p-2 bg-white dark:bg-gray-800 rounded flex justify-center items-center text-lg">
                      p = m × v
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Where p is momentum, m is mass, and v is velocity
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="flex items-center">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Open in Formula Lab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Read aloud configuration (hidden unless actively reading) */}
        {isReading && (
          <Card className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30">
            <CardContent className="p-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-1">
                  <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-600 dark:text-blue-400">Reading aloud</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
                    <select 
                      value={speechRate}
                      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                      className="px-2 py-1 rounded text-sm border"
                    >
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="1.75">1.75x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Voice:</span>
                    <select 
                      value={activeVoice}
                      onChange={(e) => setActiveVoice(e.target.value)}
                      className="px-2 py-1 rounded text-sm border"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="en-IN">English (India)</option>
                    </select>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={readContent}
                  >
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
