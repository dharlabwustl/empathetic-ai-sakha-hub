
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  File,
  FileQuestion,
  Lightbulb,
  Music,
  FlaskConical,
  BookCheck,
  GraduationCap,
  BrainCircuit,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Custom icons for components that don't exist in lucide-react
const Formula = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M8 18h8" />
    <path d="M18 18h.01" />
    <path d="M4 18h.01" />
  </svg>
);

const Flashcard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const ConceptCardDetail = () => {
  const navigate = useNavigate();
  const { id: conceptId } = useParams();
  const { toast } = useToast();
  const [activeSummary, setActiveSummary] = useState('short');
  const [markingCompleted, setMarkingCompleted] = useState(false);
  
  // Mock concept data - in a real app, fetch this from API
  const concept = {
    id: conceptId || '1',
    title: 'Bernoulli's Theorem and Its Applications',
    subject: 'Physics',
    chapter: 'Fluid Dynamics',
    difficulty: 'Medium',
    estimatedTime: '15 min',
    masteryLevel: 72,
    progress: 80,
    shortSummary: `Bernoulli's theorem states that for an incompressible, frictionless fluid in steady flow, the sum of pressure, kinetic energy per unit volume, and potential energy per unit volume remains constant along a streamline.`,
    longSummary: `Bernoulli's theorem is a fundamental principle in fluid dynamics which states that for an incompressible, frictionless fluid in steady flow, the sum of pressure (P), kinetic energy per unit volume (½ρv²), and potential energy per unit volume (ρgh) remains constant along a streamline.

    The mathematical expression is:
    P + ½ρv² + ρgh = constant

    Where:
    - P is the pressure
    - ρ is the fluid density
    - v is the fluid velocity
    - g is the gravitational acceleration
    - h is the height from a reference point

    This principle has numerous applications including explaining the lift force on an aircraft wing, the working of atomizers, spray guns, carburetors, and the curve of a spinning ball in sports.`,
    applications: [
      'Aircraft wing design - provides lift force',
      'Venturi tubes in carburetors',
      'Atomizers and spray systems',
      'Blood flow in the cardiovascular system',
      'Weather prediction and wind patterns',
    ],
    formulas: [
      {
        equation: 'P + ½ρv² + ρgh = constant',
        description: 'The Bernoulli equation for incompressible flow along a streamline',
      },
      {
        equation: 'P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂',
        description: 'Comparing two points along a streamline',
      },
    ],
    practiceQuestions: [
      {
        question: 'A fluid flows through a horizontal pipe with a decreasing cross-sectional area. What happens to the pressure as the pipe narrows?',
        answer: 'The pressure decreases as the pipe narrows, due to increased velocity (by continuity equation) and the conservation of energy as described by Bernoulli's theorem.',
      },
      {
        question: 'Explain why a spinning ball curves in its trajectory using Bernoulli's principle.',
        answer: 'When a ball spins, it creates a difference in air velocity around its surface. The side where the surface motion adds to the airflow has higher velocity, leading to lower pressure (Bernoulli's principle). This pressure differential creates a force perpendicular to the airflow, causing the ball to curve.',
      },
    ],
    relatedConcepts: [
      'Continuity Equation',
      'Fluid Dynamics',
      'Venturi Effect',
      'Pressure in Fluids',
      'Aerodynamics',
    ],
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMarkComplete = () => {
    setMarkingCompleted(true);
    
    // Simulate API call
    setTimeout(() => {
      setMarkingCompleted(false);
      toast({
        title: "Progress saved",
        description: `${concept.title} marked as completed`,
      });
    }, 1000);
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Opening Formula Lab",
      description: "Interactive formula workspace for Bernoulli's Theorem",
    });
    // In a real app, navigate to the formula lab or open a dialog
  };
  
  const handleOpenPracticeQuiz = () => {
    toast({
      title: "Opening Practice Quiz",
      description: "Launching practice questions for this concept",
    });
    // In a real app, navigate to the quiz page
  };

  const handleToggleSummary = () => {
    setActiveSummary(activeSummary === 'short' ? 'long' : 'short');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6 space-x-2">
        <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <h1 className="text-2xl font-bold">{concept.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{concept.title}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="font-normal">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className="font-normal">
                      {concept.chapter}
                    </Badge>
                    <Badge variant="outline" className="font-normal flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {concept.estimatedTime}
                    </Badge>
                    <Badge variant={concept.difficulty === 'Easy' ? 'default' : concept.difficulty === 'Medium' ? 'secondary' : 'destructive'} 
                      className="font-normal">
                      {concept.difficulty}
                    </Badge>
                  </CardDescription>
                </div>
                <Button onClick={handleMarkComplete} disabled={markingCompleted} variant="outline" 
                  className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                  <Check className="h-4 w-4" />
                  {markingCompleted ? 'Saving...' : 'Mark Complete'}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Mastery Progress</h3>
                  <span className="text-sm font-semibold">{concept.masteryLevel}%</span>
                </div>
                <Progress value={concept.masteryLevel} className="h-2" />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Concept Summary
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleToggleSummary}>
                    {activeSummary === 'short' ? 'Show Detailed' : 'Show Brief'}
                  </Button>
                </div>
                <div className="mt-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  {activeSummary === 'short' ? concept.shortSummary : concept.longSummary}
                </div>
              </div>

              <Tabs defaultValue="applications" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="formulas">Formulas</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="applications" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">Real-world Applications</h3>
                  </div>
                  <ul className="space-y-2">
                    {concept.applications.map((app, index) => (
                      <li key={index} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        <span className="mt-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{app}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="formulas" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Formula className="h-4 w-4 text-purple-500" />
                    <h3 className="font-semibold">Key Formulas</h3>
                  </div>
                  <div className="space-y-3">
                    {concept.formulas.map((formula, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        <div className="mb-2 font-mono text-center text-lg py-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                          {formula.equation}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{formula.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleOpenFormulaLab}>
                    <Formula className="mr-2 h-4 w-4" />
                    Open in Formula Lab
                  </Button>
                </TabsContent>

                <TabsContent value="practice" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileQuestion className="h-4 w-4 text-amber-500" />
                    <h3 className="font-semibold">Practice Questions</h3>
                  </div>
                  <div className="space-y-4">
                    {concept.practiceQuestions.map((q, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="font-medium text-gray-800 dark:text-gray-200">{q.question}</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800/50">
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{q.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleOpenPracticeQuiz} className="w-full">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Start Practice Quiz
                  </Button>
                </TabsContent>

                <TabsContent value="related" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <File className="h-4 w-4 text-green-500" />
                    <h3 className="font-semibold">Related Concepts</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {concept.relatedConcepts.map((related, index) => (
                      <Button key={index} variant="outline" className="justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {related}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Read Study Material
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Flashcard className="mr-2 h-4 w-4" />
                Practice Flashcards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Music className="mr-2 h-4 w-4" />
                Audio Explanation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FlaskConical className="mr-2 h-4 w-4" />
                Interactive Simulation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-900">
                <Check className="h-4 w-4 text-green-600" />
                <p className="text-sm">Continuity Equation</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-900">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-semibold">Bernoulli's Theorem</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                <BrainCircuit className="h-4 w-4 text-gray-400" />
                <p className="text-sm">Venturi Effect</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                <BrainCircuit className="h-4 w-4 text-gray-400" />
                <p className="text-sm">Applications in Aerodynamics</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-32 p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Add your notes about this concept here..."
              ></textarea>
              <Button className="mt-2 w-full">Save Notes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
