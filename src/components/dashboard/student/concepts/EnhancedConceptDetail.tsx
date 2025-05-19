
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, FileText, Zap, Brain, MessageCircle, Check, PlayCircle, PenTool } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ConceptMedia {
  type: 'image' | 'video' | '3d-model';
  url: string;
  caption?: string;
}

interface ConceptExample {
  id: string;
  title: string;
  content: string;
  solution?: string;
}

interface ConceptNoteProps {
  content: string;
  color: string;
}

const ConceptNote: React.FC<ConceptNoteProps> = ({ content, color }) => {
  return (
    <div className={`p-4 rounded-md bg-${color}-50 border border-${color}-200 dark:bg-${color}-900/20 dark:border-${color}-800/40 my-4`}>
      <p className="text-sm">{content}</p>
    </div>
  );
};

const EnhancedConceptDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [userProgress, setUserProgress] = useState(0);
  const [userNotes, setUserNotes] = useState<string[]>([]);
  
  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    const fetchConcept = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock concept data
        const mockConcept = {
          id: conceptId,
          title: 'Newton\'s Laws of Motion',
          subject: 'Physics',
          category: 'Mechanics',
          shortDescription: 'Fundamental principles that describe the relationship between an object and the forces acting upon it.',
          detailedDescription: 'Newton\'s laws of motion are three physical laws that, together, laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
          mainContent: `
            <h2>First Law: Law of Inertia</h2>
            <p>Newton's first law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia.</p>
            
            <h2>Second Law: Force = Mass × Acceleration</h2>
            <p>The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.</p>
            
            <h2>Third Law: Action-Reaction</h2>
            <p>For every action, there is an equal and opposite reaction. This means that in every interaction, there is a pair of forces acting on the two interacting objects.</p>
          `,
          media: [
            {
              type: 'image',
              url: '/images/concept/newton-laws.jpg',
              caption: 'Illustration of Newton\'s Laws'
            },
            {
              type: 'video',
              url: 'https://www.youtube.com/watch?v=mn34mnnDnKU',
              caption: 'Video explanation'
            }
          ],
          examples: [
            {
              id: 'ex1',
              title: 'Example 1: Pushing a Box',
              content: 'A 10 kg box is at rest on a horizontal surface. If you apply a horizontal force of 50 N, what will be the box\'s acceleration?',
              solution: 'Using F = ma, a = F/m = 50N/10kg = 5 m/s²'
            },
            {
              id: 'ex2',
              title: 'Example 2: Rocket Propulsion',
              content: 'How does a rocket accelerate in space when there\'s no air to push against?',
              solution: 'According to Newton\'s third law, the rocket expels gas in one direction, and experiences a force in the opposite direction.'
            }
          ],
          formulas: [
            {
              id: 'f1',
              formula: 'F = ma',
              description: 'Force equals mass times acceleration'
            },
            {
              id: 'f2',
              formula: 'Fnet = 0',
              description: 'When an object is not accelerating, the net force is zero'
            }
          ],
          applications: [
            'Automotive engineering: designing braking systems',
            'Space travel and rocket propulsion',
            'Sports science: analyzing athletic performance',
            'Engineering: designing structures to withstand forces'
          ],
          relatedConcepts: ['momentum', 'friction', 'gravity', 'force']
        };
        
        setConcept(mockConcept);
        
        // Mock user progress
        setUserProgress(65);
        
        // Mock user notes
        setUserNotes([
          'Remember to understand the distinction between mass and weight',
          'First law is counterintuitive - need to think about it more'
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching concept:', error);
        toast({
          title: 'Error',
          description: 'Failed to load the concept. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };
    
    fetchConcept();
  }, [conceptId, toast]);

  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleMarkAsCompleted = () => {
    setUserProgress(100);
    toast({
      title: 'Concept Completed',
      description: 'Great job! You\'ve completed this concept.',
    });
  };
  
  const handleAddNote = (note: string) => {
    setUserNotes(prev => [...prev, note]);
    toast({
      title: 'Note Added',
      description: 'Your note has been saved.',
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // If concept not found
  if (!concept) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Concept Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400">
              The concept you're looking for doesn't exist or has been moved.
            </p>
            <Button className="mt-4" onClick={() => navigate('/dashboard/student/concepts')}>
              View All Concepts
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-auto">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant={userProgress >= 100 ? 'outline' : 'secondary'}>
            {userProgress >= 100 ? (
              <span className="flex items-center">
                <Check className="h-3 w-3 mr-1" /> 
                Completed
              </span>
            ) : `${userProgress}% Complete`}
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMarkAsCompleted}
            disabled={userProgress >= 100}
          >
            Mark as Complete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{concept.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40">
                {concept.subject}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40">
                {concept.category}
              </Badge>
            </div>
            
            <p className="text-lg font-medium mb-4">
              {concept.shortDescription}
            </p>
            
            <Progress value={userProgress} className="h-2 mb-6" />
            
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="content" className="flex gap-1">
                  <BookOpen className="h-4 w-4" /> Content
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex gap-1">
                  <FileText className="h-4 w-4" /> Examples
                </TabsTrigger>
                <TabsTrigger value="formulas" className="flex gap-1">
                  <Brain className="h-4 w-4" /> Formulas
                </TabsTrigger>
                <TabsTrigger value="interactive" className="flex gap-1">
                  <Zap className="h-4 w-4" /> Interactive
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div dangerouslySetInnerHTML={{ __html: concept.mainContent }} />
                  </CardContent>
                </Card>
                
                <ConceptNote 
                  content="Remember that these laws apply in an inertial reference frame. They may need to be modified for non-inertial frames."
                  color="blue"
                />
                
                {concept.media?.map((media: ConceptMedia, index: number) => (
                  <div key={`media-${index}`} className="my-4">
                    {media.type === 'image' && (
                      <figure>
                        <img 
                          src={media.url}
                          alt={media.caption || concept.title}
                          className="w-full rounded-lg"
                        />
                        {media.caption && (
                          <figcaption className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                            {media.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    
                    {media.type === 'video' && (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-blue-500 mb-2" />
                        <p className="text-sm">
                          <a 
                            href={media.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Watch Video: {media.caption || 'Video Resource'}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Applications</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {concept.applications?.map((application: string, index: number) => (
                      <li key={`app-${index}`}>{application}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="examples">
                <div className="space-y-6">
                  {concept.examples?.map((example: ConceptExample) => (
                    <Card key={example.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-3">{example.title}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
                          <p>{example.content}</p>
                        </div>
                        
                        <details className="mt-4">
                          <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">
                            View Solution
                          </summary>
                          <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-blue-800 dark:text-blue-200">
                            {example.solution}
                          </div>
                        </details>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="formulas">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Key Formulas</h3>
                    <div className="space-y-4">
                      {concept.formulas?.map((formula: any) => (
                        <div key={formula.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                          <div className="text-xl font-semibold text-center mb-2">
                            {formula.formula}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {formula.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Formula Sheet</h4>
                      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Download Formula PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="interactive">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center p-8">
                      <h3 className="text-xl font-medium mb-4">Interactive Learning Module</h3>
                      <p className="mb-6 text-gray-600 dark:text-gray-400">
                        Explore Newton's Laws of Motion through interactive simulations and experiments.
                      </p>
                      
                      <div className="aspect-video bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex flex-col items-center justify-center border border-blue-200 dark:border-blue-800/40">
                        <Zap className="h-10 w-10 text-blue-500 mb-3" />
                        <h4 className="text-lg font-medium mb-2">Interactive Physics Simulation</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                          Experiment with forces and observe how objects respond according to Newton's Laws
                        </p>
                        <Button variant="warning" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Launch Interactive Module
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Notes</h3>
                
                {userNotes.length > 0 ? (
                  <div className="space-y-3">
                    {userNotes.map((note, index) => (
                      <div 
                        key={`note-${index}`}
                        className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border-l-4 border-yellow-400"
                      >
                        <p className="text-sm">{note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    You haven't added any notes yet.
                  </p>
                )}
                
                <div className="mt-4 flex">
                  <Button 
                    className="w-full flex items-center gap-2"
                    variant="outline"
                    onClick={() => handleAddNote("I need to review this concept again.")}
                  >
                    <PenTool className="h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Related Concepts</h3>
                <div className="space-y-2">
                  {concept.relatedConcepts?.map((relatedConcept: string, index: number) => (
                    <Button 
                      key={`related-${index}`}
                      variant="outline"
                      className="w-full justify-start text-left mb-2"
                      onClick={() => navigate(`/dashboard/student/concepts/${relatedConcept}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {relatedConcept.charAt(0).toUpperCase() + relatedConcept.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Ask AI Tutor</h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md mb-4 flex items-center gap-3">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm">Have questions about this concept?</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Our AI Tutor can help explain it</p>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI Tutor
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
