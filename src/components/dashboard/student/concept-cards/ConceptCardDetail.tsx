import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  Lightbulb,
  Play, 
  CheckCircle, 
  BookMarked,
  Beaker, 
  Calculator,
  ArrowLeft,
  Brain,
  MessageCircle,
  History,
  BookCheck
} from 'lucide-react';
import { Formula, Flashcard } from '@/components/icons/custom-icons';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useVoiceContext } from '@/contexts/VoiceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Concept {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  content: string;
  formulas?: string[];
  examples?: string[];
  diagrams?: string[];
  video_url?: string;
  practice_problems?: Array<{
    id: string;
    question: string;
    answer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  key_points?: string[];
  related_concepts?: Array<{
    id: string;
    title: string;
  }>;
  completion_percentage?: number;
}

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speakText, stopSpeaking, isSpeaking, isVoiceEnabled } = useVoiceContext();
  const [autoPlayVoice, setAutoPlayVoice] = useState(false);

  useEffect(() => {
    // For demo purposes, we're using mock data here
    // In a real application, this would be an API call
    const fetchConcept = async () => {
      setLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for the concept
        const mockConcept: Concept = {
          id: id || 'concept-1',
          title: 'Newton\'s Laws of Motion',
          subject: 'Physics',
          chapter: 'Classical Mechanics',
          difficulty: 'medium',
          description: 'Newton\'s laws of motion are three basic laws of classical mechanics that describe the relationship between the motion of an object and the forces acting on it.',
          content: `
## First Law: Law of Inertia
An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

This means that there is a natural tendency of objects to keep on doing what they're doing. All objects resist changes in their state of motion. In the absence of an unbalanced force, an object in motion will maintain its state of motion.

## Second Law: Law of Acceleration
The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.

This is formulated as: F = ma, where 'F' is the net force applied, 'm' is the mass of the object, and 'a' is the acceleration produced.

## Third Law: Law of Action-Reaction
For every action, there is an equal and opposite reaction.

This means that for every force action, there is an equal and opposite force reaction. Forces always occur in pairs - equal and opposite action-reaction force pairs.
          `,
          formulas: [
            'F = ma',
            'p = mv',
            'F_net = Δp/Δt'
          ],
          examples: [
            'When you push a cart, the cart exerts an equal and opposite force on you.',
            'A rocket propels itself forward by expelling gases backward.',
            'When you walk, you push the ground backward, and the ground pushes you forward.'
          ],
          diagrams: [
            '/img/concepts/newtons-laws-diagram-1.png',
            '/img/concepts/newtons-laws-diagram-2.png'
          ],
          video_url: 'https://www.youtube.com/embed/6vVPOxYqUkA',
          practice_problems: [
            {
              id: 'problem-1',
              question: 'A 5 kg object experiences a net force of 20 N. What is its acceleration?',
              answer: '4 m/s²',
              explanation: 'Using Newton\'s Second Law: F = ma, we can solve for acceleration: a = F/m = 20/5 = 4 m/s²',
              difficulty: 'easy'
            },
            {
              id: 'problem-2',
              question: 'A 1000 kg car is accelerating at 2 m/s². What is the net force acting on it?',
              answer: '2000 N',
              explanation: 'Using Newton\'s Second Law: F = ma = 1000 kg × 2 m/s² = 2000 N',
              difficulty: 'medium'
            },
            {
              id: 'problem-3',
              question: 'A 70 kg astronaut pushes against a 50,000 kg space station with a force of 100 N. What is the acceleration of the astronaut and the space station?',
              answer: 'Astronaut: 1.43 m/s², Space station: 0.002 m/s²',
              explanation: 'For the astronaut: a = F/m = 100/70 = 1.43 m/s². For the space station: a = F/m = 100/50,000 = 0.002 m/s²',
              difficulty: 'hard'
            }
          ],
          key_points: [
            'Newton\'s First Law establishes the concept of inertia.',
            'Newton\'s Second Law provides a mathematical relationship between force, mass, and acceleration.',
            'Newton\'s Third Law explains the nature of forces as interactions between objects.',
            'These laws form the foundation of classical mechanics.'
          ],
          related_concepts: [
            {
              id: 'concept-2',
              title: 'Conservation of Momentum'
            },
            {
              id: 'concept-3',
              title: 'Friction Forces'
            },
            {
              id: 'concept-4',
              title: 'Circular Motion'
            }
          ],
          completion_percentage: 75
        };
        
        setConcept(mockConcept);
      } catch (error) {
        console.error('Error fetching concept:', error);
        toast({
          title: "Failed to load concept",
          description: "There was an error loading the concept details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConcept();
  }, [id, toast]);

  useEffect(() => {
    // Auto-play voice narration if enabled
    if (autoPlayVoice && concept && activeTab === 'learn' && isVoiceEnabled) {
      const textToRead = `${concept.title}. ${concept.description} Let's explore ${concept.title} in detail.`;
      speakText(textToRead);

      return () => {
        stopSpeaking();
      };
    }
  }, [concept, autoPlayVoice, activeTab, speakText, stopSpeaking, isVoiceEnabled]);

  const handleSpeakContent = (text: string) => {
    if (isVoiceEnabled) {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        speakText(text);
      }
    } else {
      toast({
        title: "Voice is disabled",
        description: "Please enable voice in settings to use this feature.",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    stopSpeaking();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 hover:bg-green-200';
      case 'medium':
        return 'text-amber-600 bg-amber-100 hover:bg-amber-200';
      case 'hard':
        return 'text-red-600 bg-red-100 hover:bg-red-200';
      default:
        return 'text-gray-600 bg-gray-100 hover:bg-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mb-8 mx-auto"></div>
          <div className="h-40 w-full max-w-3xl bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!concept) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto my-12">
        <AlertDescription>
          Concept not found. The concept may have been removed or the URL may be incorrect.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-12 pt-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {/* Concept Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{concept.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{concept.subject}</Badge>
              <Badge variant="outline">{concept.chapter}</Badge>
              <Badge className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => handleSpeakContent(`${concept.title}. ${concept.description}`)}
              className="flex items-center gap-2"
            >
              {isSpeaking ? 'Stop Narration' : 'Read Aloud'}
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-voice"
                checked={autoPlayVoice}
                onCheckedChange={setAutoPlayVoice}
              />
              <Label htmlFor="auto-voice">Auto Narrate</Label>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-4">{concept.description}</p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Your progress</span>
            <span>{concept.completion_percentage}%</span>
          </div>
          <Progress 
            value={concept.completion_percentage} 
            className="h-2"
          />
        </div>
      </div>
      
      {/* Main content with tabs */}
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 lg:flex">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Practice</span>
          </TabsTrigger>
          <TabsTrigger value="watch" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span>Watch</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="hidden md:flex items-center gap-2">
            <Flashcard className="h-4 w-4" />
            <span>Flashcards</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Learn {concept.title}
              </CardTitle>
              <CardDescription>
                Detailed explanation of the concept
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none dark:prose-invert">
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: concept.content.replace(/\n/g, '<br>') }}></div>
              
              {concept.key_points && concept.key_points.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Key Points
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {concept.key_points.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="rounded-full h-5 w-5 bg-green-100 text-green-600 flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {concept.diagrams && concept.diagrams.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2">Diagrams & Illustrations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {concept.diagrams.map((diagram, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <img 
                          src={diagram} 
                          alt={`Diagram ${index + 1} for ${concept.title}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleTabChange('practice')}
              >
                Practice This Concept
              </Button>
            </CardFooter>
          </Card>
          
          {/* Related Concepts Card */}
          {concept.related_concepts && concept.related_concepts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Concepts</CardTitle>
                <CardDescription>
                  Explore these concepts to deepen your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {concept.related_concepts.map((relatedConcept) => (
                    <Button 
                      key={relatedConcept.id}
                      variant="outline"
                      className="justify-start"
                      onClick={() => navigate(`/dashboard/student/concepts/card/${relatedConcept.id}`)}
                    >
                      <BookMarked className="h-4 w-4 mr-2" />
                      {relatedConcept.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Practice Problems
              </CardTitle>
              <CardDescription>
                Solve these problems to test your understanding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {concept.practice_problems && concept.practice_problems.length > 0 ? (
                concept.practice_problems.map((problem, index) => (
                  <div 
                    key={problem.id} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Problem {index + 1}</h4>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <p className="mb-4">{problem.question}</p>
                    
                    <div className="collapse-content">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-2">
                        <div className="font-medium mb-1">Answer:</div>
                        <p>{problem.answer}</p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="font-medium mb-1">Explanation:</div>
                        <p>{problem.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4">
                  <p>No practice problems available for this concept yet.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">More Practice Questions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Watch Tab */}
        <TabsContent value="watch" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Video Explanation
              </CardTitle>
              <CardDescription>
                Visual explanation of {concept.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {concept.video_url ? (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    className="w-full h-full"
                    src={concept.video_url}
                    title={`Video explanation of ${concept.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p>No video available for this concept yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Examples Section */}
          {concept.examples && concept.examples.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practical Examples</CardTitle>
                <CardDescription>
                  Real-world applications of {concept.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {concept.examples.map((example, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p>{example}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Formulas Tab */}
        <TabsContent value="formulas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Key Formulas
              </CardTitle>
              <CardDescription>
                Important formulas related to {concept.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {concept.formulas && concept.formulas.length > 0 ? (
                <div className="space-y-4">
                  {concept.formulas.map((formula, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-center"
                    >
                      <p className="font-mono text-lg">{formula}</p>
                    </div>
                  ))}
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      Open Formula Lab
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p>No formulas available for this concept yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flashcard className="h-5 w-5" />
                Flashcards
              </CardTitle>
              <CardDescription>
                Quick revision cards for {concept.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <p>Flashcards for this concept are coming soon!</p>
                <Button className="mt-4">Create Flashcards</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Button variant="outline" className="flex-col h-auto py-4 gap-2">
          <BookCheck className="h-5 w-5" />
          <span>Mark as Complete</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-4 gap-2">
          <MessageCircle className="h-5 w-5" />
          <span>Ask Tutor</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-4 gap-2">
          <Brain className="h-5 w-5" />
          <span>Mind Map</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-4 gap-2">
          <History className="h-5 w-5" />
          <span>Revision History</span>
        </Button>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
