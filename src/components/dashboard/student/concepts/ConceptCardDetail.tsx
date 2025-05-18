
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, FileText, Play, Star, CheckCircle2, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ConceptCardDetailProps {
  // Any props if needed
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [conceptData, setConceptData] = useState<any>(null);
  const [mastery, setMastery] = useState(45);

  // Mock data for concept
  useEffect(() => {
    // Simulate loading concept data
    setTimeout(() => {
      setConceptData({
        id: id || '1',
        title: 'Newton\'s Laws of Motion',
        category: 'Physics',
        difficulty: 'Medium',
        importance: 'High',
        shortDescription: 'Understanding the fundamental principles that govern motion in classical mechanics.',
        longDescription: `Newton's laws of motion are three physical laws that, together, laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.

The three laws are:
1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.
2. Second Law (F=ma): The force acting on an object is equal to the mass of that object times its acceleration.
3. Third Law (Action-Reaction): For every action, there is an equal and opposite reaction.`,
        keyTerms: [
          { term: 'Inertia', definition: 'The resistance of an object to changes in its state of motion.' },
          { term: 'Force', definition: 'An influence that can change the motion of an object.' },
          { term: 'Mass', definition: 'A measure of the amount of matter in an object.' },
          { term: 'Acceleration', definition: 'The rate of change of velocity with respect to time.' },
          { term: 'Newton', definition: 'The SI unit of force, equal to kg·m/s².' }
        ],
        formulas: [
          { name: 'Newton\'s Second Law', formula: 'F = ma', variables: ['F: force', 'm: mass', 'a: acceleration'] },
          { name: 'Weight', formula: 'W = mg', variables: ['W: weight', 'm: mass', 'g: gravitational acceleration'] }
        ],
        examples: [
          { title: 'Pushing a Box', description: 'When you push a box, you apply a force that accelerates it according to F=ma.' },
          { title: 'Rocket Launch', description: 'A rocket expels gas in one direction (action) and experiences thrust in the opposite direction (reaction).' }
        ],
        relatedConcepts: [
          { id: '2', title: 'Momentum and Impulse' },
          { id: '3', title: 'Work and Energy' },
          { id: '4', title: 'Friction Forces' }
        ],
        resources: [
          { type: 'video', title: 'Understanding Newton\'s Laws', url: '#' },
          { type: 'pdf', title: 'Comprehensive Guide to Classical Mechanics', url: '#' },
          { type: 'practice', title: 'Interactive Newton\'s Laws Practice', url: '#' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleStudyNow = () => {
    toast({
      title: "Starting study session",
      description: "Preparing your study materials"
    });
    if (id) {
      navigate(`/dashboard/student/concepts/study/${id}`);
    }
  };

  const handlePractice = () => {
    toast({
      title: "Starting practice session",
      description: "Preparing practice problems"
    });
    // Navigate to practice
    if (id) {
      navigate(`/dashboard/student/concepts/${id}/practice`);
    }
  };

  const increaseMastery = () => {
    const newMastery = Math.min(mastery + 10, 100);
    setMastery(newMastery);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newMastery}%`
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading concept details...</p>
      </div>
    );
  }

  if (!conceptData) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto my-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not load concept data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container p-4 md:p-6 max-w-5xl">
      {/* Back button */}
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
      </Button>

      {/* Main concept card */}
      <Card className="mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                  {conceptData.category}
                </Badge>
                <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100">
                  {conceptData.difficulty} Difficulty
                </Badge>
                <Badge variant="outline" className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100">
                  {conceptData.importance} Importance
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl">{conceptData.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{conceptData.shortDescription}</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium mb-1">Your Mastery</div>
              <div className="w-36 h-2.5">
                <Progress value={mastery} className="h-2.5" />
              </div>
              <div className="mt-1 text-sm">
                <span className={`font-semibold ${
                  mastery >= 70 ? 'text-green-600 dark:text-green-400' : 
                  mastery >= 40 ? 'text-amber-600 dark:text-amber-400' : 
                  'text-red-600 dark:text-red-400'
                }`}>
                  {mastery}%
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="pt-4">
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{conceptData.longDescription}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-lg mb-2">Key Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conceptData.keyTerms.map((term: any, index: number) => (
                    <Card key={index} className="border border-gray-200 dark:border-gray-800">
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-sm font-bold">{term.term}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{term.definition}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-bold text-lg mb-2">Related Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {conceptData.relatedConcepts.map((concept: any) => (
                    <Button 
                      key={concept.id}
                      variant="outline"
                      onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                      className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      {concept.title}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="formulas" className="space-y-4">
              {conceptData.formulas.map((formula: any, index: number) => (
                <Card key={index} className="overflow-hidden border-gray-200 dark:border-gray-800">
                  <CardHeader className="py-3 bg-blue-50 dark:bg-blue-900/20">
                    <CardTitle className="text-lg">{formula.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="mb-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-center">
                        <span className="text-xl font-math">{formula.formula}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Variables:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {formula.variables.map((variable: string, i: number) => (
                          <li key={i}>{variable}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={() => navigate(`/dashboard/student/concepts/${id}/formula-lab`)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Open Formula Practice Lab
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {conceptData.examples.map((example: any, index: number) => (
                  <Card key={index} className="overflow-hidden border-gray-200 dark:border-gray-800">
                    <CardHeader className="py-3 bg-amber-50 dark:bg-amber-900/20">
                      <CardTitle className="text-lg flex items-center">
                        <span className="bg-amber-100 dark:bg-amber-800 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-amber-800 dark:text-amber-100">
                          {index + 1}
                        </span>
                        {example.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                      <p className="text-gray-700 dark:text-gray-300">{example.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handlePractice}
                  className="bg-gradient-to-r from-amber-600 to-orange-600"
                >
                  <Play className="mr-2 h-4 w-4" /> Practice with Examples
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {conceptData.resources.map((resource: any, index: number) => (
                  <Card key={index} className="overflow-hidden border-gray-200 dark:border-gray-800">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-semibold flex items-center">
                        {resource.type === 'video' && <Play className="h-4 w-4 mr-2" />}
                        {resource.type === 'pdf' && <FileText className="h-4 w-4 mr-2" />}
                        {resource.type === 'practice' && <Star className="h-4 w-4 mr-2" />}
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="pt-2 pb-4">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Open {resource.type}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </CardContent>

          <CardFooter className="flex flex-wrap justify-between gap-4 pt-2 pb-6 px-6">
            <div className="flex gap-2">
              <Button onClick={increaseMastery} variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" /> I understand this
              </Button>
              <Button onClick={handleStudyNow} variant="default" className="bg-gradient-to-r from-blue-600 to-violet-600">
                <BookOpen className="mr-2 h-4 w-4" /> Study Now
              </Button>
            </div>
            <Button onClick={handlePractice} variant="secondary">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Practice & Test
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
