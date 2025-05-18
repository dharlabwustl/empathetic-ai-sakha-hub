
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentService } from '@/services/api/apiServices';
import { Loader2, Book, Clock, Laptop, CheckCircle, BookOpen, BrainCircuit, Zap, Lightbulb, ArrowLeft } from 'lucide-react';
import { ConceptMasterySection } from '@/components/dashboard/student/concepts/ConceptMasterySection';
import { useToast } from '@/hooks/use-toast';
import FormulaSection from './FormulaSection';
import RelatedFlashcards from './RelatedFlashcards';
import { Badge } from '@/components/ui/badge';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for testing UI
  const mockConcept = {
    id: conceptId || '',
    title: 'Newton\'s Laws of Motion',
    description: 'Newton\'s three laws of motion are the foundation of classical mechanics.',
    content: `
      <h2>First Law: Law of Inertia</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
      
      <h2>Second Law: F = ma</h2>
      <p>The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.</p>
      
      <h2>Third Law: Action-Reaction</h2>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
    `,
    subject: 'Physics',
    chapter: 'Classical Mechanics',
    difficulty: 'Intermediate',
    estimatedTimeMinutes: 20,
    prerequisites: ['Basic Physics', 'Vector Mathematics'],
    keyTakeaways: [
      'Understanding inertia and its role in motion',
      'Relationship between force, mass and acceleration',
      'Action-reaction pairs in physical interactions'
    ],
    relatedConcepts: [
      { id: 'concept-momentum', title: 'Momentum and Conservation' },
      { id: 'concept-energy', title: 'Work and Energy' }
    ],
    flashcards: [
      { id: 'flash-1', front: 'What is Newton\'s First Law?', back: 'The law of inertia: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an unbalanced force.' },
      { id: 'flash-2', front: 'What is Newton\'s Second Law?', back: 'F = ma. The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.' }
    ],
    formulas: [
      { id: 'formula-1', name: 'Newton\'s Second Law', formula: 'F = m × a', variables: 'F = force, m = mass, a = acceleration' },
      { id: 'formula-2', name: 'Weight', formula: 'W = m × g', variables: 'W = weight, m = mass, g = gravitational acceleration' }
    ],
    examples: [
      'A book resting on a table remains at rest because the forces acting on it are balanced.',
      'When you push a shopping cart, it accelerates in proportion to the force you apply and inversely to its mass.'
    ]
  };
  
  useEffect(() => {
    const fetchConceptDetails = async () => {
      setLoading(true);
      try {
        if (!conceptId) {
          throw new Error('Concept ID is required');
        }
        
        // In a production app, this would be a real API call
        // const response = await contentService.getConceptById(conceptId);
        
        // For demo, we'll use mock data
        setTimeout(() => {
          setConcept(mockConcept);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error('Error fetching concept details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load concept details. Please try again.',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };
    
    fetchConceptDetails();
  }, [conceptId, toast]);
  
  const handleStartStudySession = () => {
    if (conceptId) {
      navigate(`/dashboard/student/concept-study/${conceptId}`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading concept details...</span>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="text-center p-8">
        <p>Concept not found. Please check the URL or try again later.</p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          Back to Concepts
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{concept.title}</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                {concept.difficulty}
              </Badge>
            </div>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Book className="h-4 w-4 mr-1" />
              <span className="mr-3">{concept.subject}</span>
              <span className="mx-2">•</span>
              <span>{concept.chapter}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{concept.estimatedTimeMinutes} min</span>
            </div>
            
            <Button 
              onClick={handleStartStudySession}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Laptop className="mr-2 h-4 w-4" />
              Start Study Session
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="mastery">
            <BrainCircuit className="h-4 w-4 mr-2" />
            <span>Mastery</span>
          </TabsTrigger>
          <TabsTrigger value="formulas">
            <Zap className="h-4 w-4 mr-2" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span>Flashcards</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Details</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: concept.content }} />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Examples & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.examples.map((example: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Key Takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {concept.keyTakeaways.map((takeaway: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {concept.prerequisites.map((prereq: string, index: number) => (
                      <div key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                        {prereq}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Related Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {concept.relatedConcepts.map((related: any) => (
                      <Button
                        key={related.id}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                      >
                        {related.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mastery">
          <ConceptMasterySection 
            conceptId={concept.id}
            recallAccuracy={65}
            quizScore={72}
            lastPracticed="2023-05-15T14:30:00Z"
          />
        </TabsContent>
        
        <TabsContent value="formulas">
          <FormulaSection formulas={concept.formulas} conceptTitle={concept.title} />
        </TabsContent>
        
        <TabsContent value="flashcards">
          <RelatedFlashcards flashcards={concept.flashcards} conceptTitle={concept.title} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
