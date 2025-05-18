
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ChevronRight, BookOpen, Lightbulb, PlayCircle, MessageSquare, FileText, ListChecks, LucideMonitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import LoadingState from '@/components/common/LoadingState';

// Mock data for the concept details
const mockConceptDetail = {
  id: 'concept-123',
  title: 'Newton\'s Laws of Motion',
  category: 'Physics',
  difficulty: 'Intermediate',
  timeToMaster: '30 minutes',
  description: 'Newton\'s three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
  content: `
    <h3>Introduction</h3>
    <p>In classical mechanics, <strong>Newton's laws of motion</strong> are three laws that describe the relationship between the motion of an object and the forces acting on it. These laws form the foundation for classical mechanics.</p>
    
    <h3>First Law: Law of Inertia</h3>
    <p>An object at rest will remain at rest, and an object in motion will remain in motion with the same velocity, unless acted upon by a force. This property is called inertia.</p>
    
    <h3>Second Law: Force and Acceleration</h3>
    <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, it can be expressed as:</p>
    <pre>F = m·a</pre>
    <p>Where:</p>
    <ul>
      <li>F is the net force acting on the object</li>
      <li>m is the mass of the object</li>
      <li>a is the acceleration of the object</li>
    </ul>
    
    <h3>Third Law: Action and Reaction</h3>
    <p>For every action, there is an equal and opposite reaction. If body A exerts a force on body B, then body B exerts a force of equal magnitude but opposite direction on body A.</p>
    
    <h3>Applications</h3>
    <p>Newton's laws have practical applications in everyday life, from determining the force needed to move objects to understanding the motion of vehicles and the functioning of mechanical systems.</p>
  `,
  relatedConcepts: [
    { id: 'concept-124', title: 'Conservation of Momentum' },
    { id: 'concept-125', title: 'Centripetal Forces' },
    { id: 'concept-126', title: 'Work and Energy' },
  ],
  keyFormulas: [
    { id: 'formula-1', name: 'Newton\'s Second Law', equation: 'F = m·a' },
    { id: 'formula-2', name: 'Weight', equation: 'W = m·g' },
    { id: 'formula-3', name: 'Momentum', equation: 'p = m·v' },
  ],
  examples: [
    { 
      id: 'example-1', 
      title: 'Pushing a Box',
      problem: 'A 50 kg box is pushed with a force of 100 N. Calculate its acceleration.',
      solution: 'Using F = m·a, we get a = F/m = 100/50 = 2 m/s².' 
    },
    { 
      id: 'example-2', 
      title: 'Rocket Launch',
      problem: 'A rocket with mass 10,000 kg ejects gas with a force of 200,000 N. Calculate its initial acceleration.',
      solution: 'Using F = m·a, we get a = F/m = 200,000/10,000 = 20 m/s².' 
    },
  ],
  resources: [
    { type: 'video', title: 'Newton\'s Laws Explained', url: '#' },
    { type: 'article', title: 'History of Newtonian Mechanics', url: '#' },
    { type: 'practice', title: 'Newton\'s Laws Practice Problems', url: '#' },
  ]
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('learn');
  
  useEffect(() => {
    // Simulate API call to fetch concept details
    setLoading(true);
    setTimeout(() => {
      setConcept(mockConceptDetail);
      setLoading(false);
    }, 1000);
    
    // Log concept ID for debugging
    console.log("Fetching concept details for:", conceptId);
  }, [conceptId]);
  
  const handleRelatedConceptClick = (id: string) => {
    navigate(`/dashboard/student/concepts/${id}`);
  };
  
  const handleBackClick = () => {
    navigate('/dashboard/student/concepts');
  };
  
  const handleBookmark = () => {
    toast({
      title: "Concept bookmarked",
      description: "This concept has been added to your bookmarks"
    });
  };
  
  if (loading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.category} • ${concept.difficulty} • ${concept.timeToMaster} to master`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <Badge variant="outline" className="mb-2">{concept.category}</Badge>
                <CardTitle className="text-2xl">{concept.title}</CardTitle>
                <CardDescription className="mt-1">{concept.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="learn" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> Learn
                </TabsTrigger>
                <TabsTrigger value="formulas" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" /> Formulas
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" /> Examples
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-1">
                  <PlayCircle className="h-4 w-4" /> Resources
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Learn Tab */}
            <TabsContent value="learn" className="mt-0">
              <CardContent className="prose prose-sm max-w-none pt-6">
                <div dangerouslySetInnerHTML={{ __html: concept.content }} />
              </CardContent>
            </TabsContent>
            
            {/* Formulas Tab */}
            <TabsContent value="formulas" className="mt-0">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Key Formulas</h3>
                <div className="space-y-4">
                  {concept.keyFormulas.map((formula: any) => (
                    <Card key={formula.id} className="overflow-hidden">
                      <div className="flex justify-between items-center bg-muted p-4">
                        <h4 className="font-medium">{formula.name}</h4>
                        <Button variant="outline" size="sm">Practice</Button>
                      </div>
                      <div className="p-4">
                        <div className="bg-primary/5 p-3 rounded text-center">
                          <span className="text-lg font-mono">{formula.equation}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    Open Formula Lab
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="mt-0">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Worked Examples</h3>
                <Accordion type="single" collapsible className="w-full">
                  {concept.examples.map((example: any) => (
                    <AccordionItem key={example.id} value={example.id}>
                      <AccordionTrigger className="text-base font-medium hover:no-underline">
                        {example.title}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <div className="bg-muted p-3 rounded">
                          <strong className="block text-sm font-medium">Problem:</strong>
                          <p>{example.problem}</p>
                        </div>
                        <div className="bg-primary/5 p-3 rounded">
                          <strong className="block text-sm font-medium">Solution:</strong>
                          <p>{example.solution}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {concept.resources.map((resource: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 flex items-start space-x-3">
                        {resource.type === 'video' && <PlayCircle className="h-5 w-5 text-red-500" />}
                        {resource.type === 'article' && <FileText className="h-5 w-5 text-blue-500" />}
                        {resource.type === 'practice' && <ListChecks className="h-5 w-5 text-green-500" />}
                        <div>
                          <h4 className="font-medium text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(resource.url)}>
                          Open Resource
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-between pt-2 pb-6">
            <Button variant="outline" onClick={handleBackClick}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Concepts
            </Button>
            <div className="flex gap-2">
              <Button onClick={handleBookmark} variant="outline">Bookmark</Button>
              <Button onClick={() => navigate(`/dashboard/student/concept-study/${conceptId}`)}>
                Study this Concept
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Related Concepts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Related Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {concept.relatedConcepts.map((related: any) => (
                <Button 
                  key={related.id} 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => handleRelatedConceptClick(related.id)}
                >
                  <LucideMonitor className="h-4 w-4 mr-2 text-primary" />
                  {related.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
