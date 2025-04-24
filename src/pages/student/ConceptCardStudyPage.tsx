
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, CheckCircle, Brain, BookOpenCheck, Lightbulb, GraduationCap } from 'lucide-react';

// Mock data to find the card by ID
const mockConceptCards = [
  {
    id: "cc1",
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental laws of motion and their applications in mechanics",
    subject: "Physics",
    chapter: "Classical Mechanics",
    difficulty: "medium",
    completed: false,
    progress: 0,
    content: `
      <h2>Newton's Three Laws of Motion</h2>
      <p>Sir Isaac Newton's three laws of motion form the foundation of classical mechanics.</p>
      
      <h3>First Law: Law of Inertia</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.</p>
      
      <h3>Second Law: F = ma</h3>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma, where F is force, m is mass, and a is acceleration.</p>
      
      <h3>Third Law: Action and Reaction</h3>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.</p>
    `,
    examples: [
      {
        question: "A 2 kg object experiences a net force of 10 N. What is its acceleration?",
        solution: "Using Newton's Second Law: F = ma\na = F/m = 10 N / 2 kg = 5 m/s²"
      },
      {
        question: "Explain why a rocket moves forward.",
        solution: "As per Newton's Third Law, the rocket expels gas backward (action) and experiences a thrust force forward (reaction), propelling it in the forward direction."
      }
    ],
    relatedTopics: ["Momentum", "Friction", "Circular Motion", "Gravity"]
  },
  {
    id: "cc2",
    title: "Chemical Bonding",
    description: "Learn about different types of chemical bonds and their formation mechanisms",
    subject: "Chemistry",
    chapter: "Chemical Structures",
    difficulty: "hard",
    completed: false,
    progress: 30,
    content: `
      <h2>Chemical Bonding</h2>
      <p>Chemical bonding is the attraction between atoms that allows the formation of chemical substances containing two or more atoms.</p>
      
      <h3>Ionic Bonding</h3>
      <p>Involves the transfer of electrons between atoms, typically between a metal and a non-metal, resulting in the formation of positive and negative ions that attract each other.</p>
      
      <h3>Covalent Bonding</h3>
      <p>Involves the sharing of electron pairs between atoms, typically between non-metals, resulting in the formation of molecules.</p>
      
      <h3>Metallic Bonding</h3>
      <p>Involves the sharing of free electrons among a structure of positively charged ions, typically in metals, resulting in the formation of a lattice structure.</p>
    `,
    examples: [
      {
        question: "Identify the type of bonding in NaCl.",
        solution: "NaCl (sodium chloride) exhibits ionic bonding, where sodium (a metal) donates an electron to chlorine (a non-metal), forming Na+ and Cl- ions that attract each other electrostatically."
      },
      {
        question: "Explain the bonding in a water molecule (H2O).",
        solution: "H2O exhibits covalent bonding, where each hydrogen atom shares an electron pair with the oxygen atom, forming two separate covalent bonds."
      }
    ],
    relatedTopics: ["Lewis Structures", "Molecular Geometry", "Electronegativity", "Valence Bond Theory"]
  }
];

const ConceptCardStudyPage = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundCard = mockConceptCards.find(c => c.id === cardId);
      if (foundCard) {
        setCard(foundCard);
        setProgress(foundCard.progress);
        setCompleted(foundCard.completed);
      }
      setLoading(false);
    }, 500);
  }, [cardId]);
  
  const handleMarkComplete = () => {
    setCompleted(!completed);
    setProgress(completed ? 50 : 100);
    
    toast({
      title: completed ? "Marked as in progress" : "Marked as completed",
      description: `Concept card has been marked as ${completed ? "in progress" : "completed"}.`,
    });
  };
  
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="animate-pulse">
            <CardHeader className="h-24"></CardHeader>
            <CardContent className="h-96"></CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Concept Card Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The requested concept card could not be found.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGoBack}>Go Back</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="mb-4 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Concept Cards
        </Button>
        
        <Card className="mb-6">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700">
                    {card.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700">
                    {card.chapter}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${card.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700' : ''}
                    ${card.difficulty === 'medium' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700' : ''}
                    ${card.difficulty === 'hard' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700' : ''}
                  `}>
                    {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold">{card.title}</CardTitle>
                <CardDescription className="text-base">{card.description}</CardDescription>
              </div>
              
              <Button
                variant={completed ? "outline" : "default"}
                className={`min-w-32 ${completed ? 'text-green-600 border-green-200 hover:bg-green-50' : ''}`}
                onClick={handleMarkComplete}
              >
                {completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          
          <div>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  <span>Examples</span>
                </TabsTrigger>
                <TabsTrigger value="related" className="flex items-center gap-1.5">
                  <Brain className="h-4 w-4" />
                  <span>Related Topics</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <CardContent className="prose dark:prose-invert max-w-none py-6">
                  <div dangerouslySetInnerHTML={{ __html: card.content }} />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="examples">
                <CardContent className="py-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Example Problems
                  </h3>
                  
                  <div className="space-y-6">
                    {card.examples?.map((example: any, index: number) => (
                      <Card key={index} className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Problem {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Question:</h4>
                            <p>{example.question}</p>
                          </div>
                          <div className="pt-3 border-t">
                            <h4 className="font-medium mb-2">Solution:</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap">{example.solution}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!card.examples || card.examples.length === 0) && (
                      <p className="text-center py-6 text-muted-foreground">No example problems available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="related">
                <CardContent className="py-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BookOpenCheck className="h-5 w-5 mr-2" />
                    Related Topics
                  </h3>
                  
                  {card.relatedTopics && card.relatedTopics.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {card.relatedTopics.map((topic: string, index: number) => (
                        <Card key={index} className="bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{topic}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">No related topics available for this concept.</p>
                  )}
                </CardContent>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
