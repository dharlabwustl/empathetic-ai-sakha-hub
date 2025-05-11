
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Book, Calculator, ChevronLeft, Flame, PlusCircle, Lightbulb, Layers, Sigma } from 'lucide-react';

// Import components for different tab contents
import BasicTabContent from '../concepts/BasicTabContent';
import DetailedTabContent from '../concepts/DetailedTabContent';
import ExampleTabContent from '../concepts/ExampleTabContent';
import DiagramsTabContent from '../concepts/DiagramsTabContent';
import QuizTabContent from '../concepts/QuizTabContent';
import FormulaTabContent from '../concepts/FormulaTabContent';
import RelatedTabContent from '../concepts/RelatedTabContent';
import StepsTabContent from '../concepts/StepsTabContent';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock concept data (in production this would come from an API)
const mockConcept = {
  id: '1',
  title: 'Quantum Mechanics Fundamentals',
  subtitle: 'Understanding the basic principles of quantum physics',
  subject: 'Physics',
  difficulty: 'advanced',
  importanceScore: 9.2,
  examFrequency: 'High',
  masteryLevel: 65,
  studyTime: 45,
  conceptType: 'Theoretical',
  description: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
  keyPoints: [
    'Wave-particle duality',
    'Heisenberg uncertainty principle',
    'Quantum superposition',
    'Quantum entanglement',
    'Wave function and probability'
  ],
  detailedExplanation: 'Quantum mechanics is the study of very small things. It explains the behavior of matter and its interactions with energy on the scale of atoms and subatomic particles. Classical physics often fails to explain phenomena at this scale.\n\nThe wave function is central to quantum mechanics and describes the quantum state of a particle or system. The wave function can be used to calculate the probability of finding a particle at a particular position.',
  formulas: [
    { id: '1', name: 'Schrödinger equation', formula: 'iħ(∂/∂t)Ψ(x,t) = ĤΨ(x,t)', description: 'Describes how the quantum state of a physical system changes over time' },
    { id: '2', name: 'Heisenberg Uncertainty', formula: 'ΔxΔp ≥ ħ/2', description: 'Position and momentum cannot both be precisely determined' },
    { id: '3', name: 'Probability density', formula: '|Ψ(x,t)|²', description: 'Probability of finding a particle at position x at time t' }
  ],
  examples: [
    { id: '1', title: 'Particle in a box', description: 'Example of a particle confined to a 1D box with infinite potential walls', difficulty: 'medium' },
    { id: '2', title: 'Hydrogen atom', description: 'Quantum mechanical treatment of the hydrogen atom', difficulty: 'hard' }
  ],
  diagrams: [
    { id: '1', title: 'Wave-particle duality', url: '/diagrams/wave-particle.jpg', description: 'Illustration of wave-particle duality concept' },
    { id: '2', title: 'Quantum tunneling', url: '/diagrams/tunneling.jpg', description: 'Particle tunneling through a potential barrier' }
  ],
  relatedConcepts: [
    { id: '101', title: 'Quantum Field Theory', relationship: 'Advanced extension' },
    { id: '102', title: 'Wave Mechanics', relationship: 'Foundational concept' },
    { id: '103', title: 'Special Relativity', relationship: 'Complementary theory' }
  ],
  steps: [
    { id: '1', title: 'Understanding Wave Functions', description: 'Learn about wave functions and their properties' },
    { id: '2', title: 'Schrödinger Equation', description: 'Study the fundamental equation of quantum mechanics' },
    { id: '3', title: 'Quantum Measurements', description: 'Understand how quantum measurements affect quantum states' }
  ],
  quizzes: [
    {
      id: '1',
      question: 'What is the uncertainty principle?',
      options: [
        'Energy can neither be created nor destroyed',
        'The exact position and momentum of a particle cannot be simultaneously known',
        'Every action has an equal and opposite reaction',
        'The total probability of all possible outcomes always equals 1'
      ],
      correctAnswer: 1
    },
    {
      id: '2',
      question: 'Which equation describes how quantum states evolve over time?',
      options: [
        'Maxwell\'s equation',
        'Newton\'s second law',
        'Schrödinger equation',
        'Einstein\'s field equation'
      ],
      correctAnswer: 2
    }
  ]
};

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  
  // In a real app, we would fetch concept data based on ID
  const concept = mockConcept;
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Add to study plan handler
  const handleAddToStudyPlan = () => {
    toast({
      title: "Added to Study Plan",
      description: `${concept.title} has been added to your study plan.`,
    });
  };
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={concept.subtitle}
      showBackButton={true}
      backButtonAction={handleBack}
    >
      <div className="space-y-6">
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAddToStudyPlan} size="sm" variant="outline">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add to Study Plan
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => navigate(`/dashboard/student/concepts/${id}/formula-lab`)}
          >
            <Calculator className="h-4 w-4 mr-1" />
            Open Formula Lab
          </Button>
          
          <Button size="sm" variant="outline">
            <Book className="h-4 w-4 mr-1" />
            Full Chapter
          </Button>
          
          <Button size="sm" variant="outline">
            <Flame className="h-4 w-4 mr-1" />
            Practice Mode
          </Button>
        </div>
        
        {/* Metadata cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Subject</span>
              <span className="font-medium">{concept.subject}</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <span className="font-medium capitalize">{concept.difficulty}</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Exam Frequency</span>
              <span className="font-medium">{concept.examFrequency}</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Your Mastery</span>
              <span className="font-medium">{concept.masteryLevel}%</span>
            </div>
          </Card>
        </div>
        
        {/* Tabbed content */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:flex lg:flex-wrap">
              <TabsTrigger value="basic">
                <Lightbulb className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Basic</span>
              </TabsTrigger>
              
              <TabsTrigger value="detailed">
                <Layers className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Detailed</span>
              </TabsTrigger>
              
              <TabsTrigger value="formula">
                <Sigma className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Formulas</span>
              </TabsTrigger>
              
              <TabsTrigger value="examples">
                <Book className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Examples</span>
              </TabsTrigger>
              
              <TabsTrigger value="diagrams">
                <svg className="h-4 w-4 mr-1 md:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M7 3V21M17 3V21M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="hidden md:inline">Diagrams</span>
              </TabsTrigger>
              
              <TabsTrigger value="quiz">
                <svg className="h-4 w-4 mr-1 md:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L20 6M7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden md:inline">Quiz</span>
              </TabsTrigger>
              
              <TabsTrigger value="related">
                <svg className="h-4 w-4 mr-1 md:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 15L21 19M21 15L17 19M13 9C13 11.2091 11.2091 13 9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9ZM13 9V3M13 9H19M9 17C5.13401 17 2 20.134 2 24H16C16 20.134 12.866 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden md:inline">Related</span>
              </TabsTrigger>
              
              <TabsTrigger value="steps">
                <svg className="h-4 w-4 mr-1 md:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10H21M3 14H21M5 18L9 6M15 6L19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden md:inline">Study Steps</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <BasicTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="detailed">
              <DetailedTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="formula">
              <FormulaTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="examples">
              <ExampleTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="diagrams">
              <DiagramsTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="quiz">
              <QuizTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="related">
              <RelatedTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="steps">
              <StepsTabContent concept={concept} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
