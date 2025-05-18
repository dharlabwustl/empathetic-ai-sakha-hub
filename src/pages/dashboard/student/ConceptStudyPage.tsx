
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  
  // Mock concept data for enhanced display
  const [concept, setConcept] = useState<{
    id: string;
    title: string;
    description: string;
    content: string;
    formulas: string[];
    examples: { question: string; solution: string }[];
    relatedConcepts: { id: string; title: string }[];
  }>({
    id: conceptId || 'concept-1',
    title: 'Newton\'s Laws of Motion',
    description: 'Fundamental principles that form the foundation of classical mechanics',
    content: `
      <h2>Newton's First Law</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.</p>
      
      <h2>Newton's Second Law</h2>
      <p>The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass. Mathematically: F = ma</p>
      
      <h2>Newton's Third Law</h2>
      <p>For every action, there is an equal and opposite reaction.</p>
    `,
    formulas: [
      'F = ma', 
      'p = mv', 
      'W = F·d = F·d·cosθ'
    ],
    examples: [
      {
        question: 'A 2 kg object experiences a net force of 10 N. What is its acceleration?',
        solution: 'Using F = ma, we have a = F/m = 10/2 = 5 m/s²'
      },
      {
        question: 'If a 1500 kg car accelerates from 0 to 27 m/s in 9 seconds, what is the net force acting on it?',
        solution: 'First, find acceleration: a = Δv/t = 27/9 = 3 m/s². Then use F = ma = 1500 × 3 = 4500 N'
      }
    ],
    relatedConcepts: [
      { id: 'concept-2', title: 'Conservation of Momentum' },
      { id: 'concept-3', title: 'Work and Energy' },
      { id: 'concept-4', title: 'Circular Motion' }
    ]
  });
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Show toast notification
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your study materials",
      });
      
      // Simulate loading and use mock data
      const timer = setTimeout(() => {
        setLoading(false);
        
        // Update concept ID from URL parameter
        setConcept(prev => ({
          ...prev,
          id: conceptId
        }));
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      console.error("ConceptStudyPage: Missing conceptId parameter");
      navigate('/dashboard/student/concepts', { replace: true });
    }
  }, [conceptId, navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            &larr; Back to Concepts
          </Button>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{concept.description}</p>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Concept Content</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="related">Related Concepts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: concept.content }}></div>
              
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Newton's laws describe the relationship between a body and the forces acting upon it</li>
                  <li>These laws are fundamental to understanding classical mechanics</li>
                  <li>They apply to macroscopic objects under everyday conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="formulas">
          <Card>
            <CardHeader>
              <CardTitle>Important Formulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concept.formulas.map((formula, index) => (
                  <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                    <CardContent className="p-4 flex justify-center items-center">
                      <div className="text-xl font-medium text-center py-6">{formula}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
          <div className="space-y-6">
            {concept.examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Example {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Problem:</h3>
                    <p className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">{example.question}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Solution:</h3>
                    <p className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">{example.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="related">
          <Card>
            <CardHeader>
              <CardTitle>Related Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {concept.relatedConcepts.map((related, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="h-auto py-3 justify-start"
                    onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                  >
                    <div>
                      <div className="font-medium">{related.title}</div>
                      <div className="text-xs text-gray-500 mt-1">View concept</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptStudyPage;
