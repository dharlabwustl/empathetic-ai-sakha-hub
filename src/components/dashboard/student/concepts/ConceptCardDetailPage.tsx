
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConceptNotes from './ConceptNotes';
import ConceptFlashcards from './ConceptFlashcards';
import ConceptExamples from './ConceptExamples';
import ConceptRelated from './ConceptRelated';
import ConceptPractice from './ConceptPractice';
import { ArrowLeft } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Mock data for a concept
const mockConcept = {
  id: 'c1',
  title: 'Newton\'s Laws of Motion',
  description: 'The fundamental principles that form the foundation of classical mechanics, describing the relationship between the motion of an object and the forces acting on it.',
  subject: 'Physics',
  difficulty: 'Medium',
  imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb', 
  content: `
    <h2>Introduction</h2>
    <p>Newton's laws of motion are three physical laws that, together, laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
    
    <h2>First Law: Law of Inertia</h2>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force.</p>
    
    <h2>Second Law: F = ma</h2>
    <p>The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.</p>
    
    <h2>Third Law: Action-Reaction</h2>
    <p>For every action, there is an equal and opposite reaction.</p>
  `,
  examples: [
    {
      id: 'ex1',
      title: 'Pushing a Cart',
      description: 'When you push a shopping cart, the cart accelerates due to the force applied. This demonstrates Newton\'s Second Law.',
      imageUrl: 'https://images.unsplash.com/photo-1601598851547-4302969d0614'
    },
    {
      id: 'ex2',
      title: 'Rocket Launch',
      description: 'Rockets expel gas backward to propel themselves forward, demonstrating Newton\'s Third Law.',
      imageUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7'
    }
  ],
  relatedConcepts: [
    { id: 'c2', title: 'Conservation of Momentum', subject: 'Physics' },
    { id: 'c3', title: 'Work and Energy', subject: 'Physics' },
    { id: 'c4', title: 'Circular Motion', subject: 'Physics' }
  ],
  practice: {
    questions: [
      {
        id: 'q1',
        text: 'Which of Newton\'s laws states that an object at rest will remain at rest unless acted upon by an external force?',
        options: ['First Law', 'Second Law', 'Third Law', 'None of these'],
        correctAnswer: 'First Law'
      },
      {
        id: 'q2',
        text: 'The formula F = ma is associated with which of Newton\'s laws?',
        options: ['First Law', 'Second Law', 'Third Law', 'None of these'],
        correctAnswer: 'Second Law'
      }
    ]
  }
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, we would fetch the concept based on conceptId
    const fetchConcept = async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      setConcept(mockConcept);
      setLoading(false);
    };
    
    fetchConcept();
  }, [conceptId]);
  
  const handleGoBack = () => {
    navigate(-1); // Navigate back to previous page
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardTitle className="text-2xl">{concept.title}</CardTitle>
          <CardDescription className="text-base">{concept.description}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-xs font-medium">
              {concept.subject}
            </span>
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded-full text-xs font-medium">
              {concept.difficulty}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html: concept.content}} />
            </TabsContent>
            
            <TabsContent value="notes">
              <ConceptNotes conceptId={conceptId || ''} />
            </TabsContent>
            
            <TabsContent value="flashcards">
              <ConceptFlashcards conceptId={conceptId || ''} />
            </TabsContent>
            
            <TabsContent value="examples">
              <ConceptExamples examples={concept.examples} />
            </TabsContent>
            
            <TabsContent value="related">
              <ConceptRelated concepts={concept.relatedConcepts} />
            </TabsContent>
            
            <TabsContent value="practice">
              <ConceptPractice questions={concept.practice.questions} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardDetailPage;
