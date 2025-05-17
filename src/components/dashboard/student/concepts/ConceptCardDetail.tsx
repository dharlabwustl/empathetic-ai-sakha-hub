
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  FileText,
  Lightbulb,
  BookCheck,
  GraduationCap,
  BrainCircuit,
  Beaker,
  Notebook,
  FlaskConical,
  BookMarked,
  LibrarySquare,
  ScrollText
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
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock concept data - in a real app, fetch this from API
  const concept = {
    id: conceptId || '1',
    title: "Bernoulli's Theorem and Its Applications",
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
        answer: 'The pressure decreases as the pipe narrows, due to increased velocity (by continuity equation) and the conservation of energy as described by Bernoulli\'s theorem.',
      },
      {
        question: 'Explain why a spinning ball curves in its trajectory using Bernoulli\'s principle.',
        answer: 'When a ball spins, it creates a difference in air velocity around its surface. The side where the surface motion adds to the airflow has higher velocity, leading to lower pressure (Bernoulli\'s principle). This pressure differential creates a force perpendicular to the airflow, causing the ball to curve.',
      },
    ],
    relatedConcepts: [
      'Continuity Equation',
      'Fluid Dynamics',
      'Venturi Effect',
      'Pressure in Fluids',
      'Aerodynamics',
    ],
    examples: [
      {
        title: 'Venturi Meter',
        description: 'A device used to measure the flow rate of fluids based on Bernoulli\'s principle.',
        explanation: 'When fluid passes through a constriction, its velocity increases and pressure decreases. The pressure difference can be used to calculate flow rate.'
      },
      {
        title: 'Aircraft Wing',
        description: 'Wing design creates lift based on Bernoulli\'s principle.',
        explanation: 'The curved upper surface creates faster airflow, resulting in lower pressure above the wing compared to below, generating lift.'
      }
    ],
    keyTakeaways: [
      'The sum of pressure, kinetic energy per unit volume, and potential energy per unit volume is constant',
      'As fluid velocity increases, pressure decreases',
      'As elevation increases, pressure decreases',
      'Only applies to incompressible, non-viscous fluids in laminar flow'
    ]
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
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };
  
  const handleOpenPracticeQuiz = () => {
    toast({
      title: "Opening Practice Quiz",
      description: "Launching practice questions for this concept",
    });
    // In a real app, navigate to the quiz page
    navigate(`/dashboard/student/concepts/${conceptId}/quiz`);
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
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-t-4 border-t-blue-500">
            <CardHeader className="pb-2 bg-blue-50/50 dark:bg-blue-900/20">
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
                    <Badge 
                      variant={
                        concept.difficulty === 'Easy' 
                          ? 'default' 
                          : concept.difficulty === 'Medium' 
                          ? 'secondary' 
                          : 'destructive'
                      } 
                      className="font-normal">
                      {concept.difficulty}
                    </Badge>
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleMarkComplete} 
                  disabled={markingCompleted} 
                  variant="outline" 
                  className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                >
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
                    <Lightbulb className="h-4 w-4 text-amber-500" />
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

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="formulas">Formulas</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookCheck className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">Key Takeaways</h3>
                  </div>
                  <ul className="space-y-2">
                    {concept.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                        <span className="mt-0.5 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mt-6 mb-2">
                    <BrainCircuit className="h-4 w-4 text-purple-500" />
                    <h3 className="font-semibold">Learning Examples</h3>
                  </div>
                  <div className="space-y-4">
                    {concept.examples.map((example, index) => (
                      <div key={index} className="border rounded-md p-4 bg-purple-50/50 dark:bg-purple-900/20">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">{example.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{example.description}</p>
                        <p className="mt-2">{example.explanation}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Formula className="h-4 w-4 text-purple-500" />
                      <h3 className="font-semibold">Key Formulas</h3>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-200"
                      onClick={handleOpenFormulaLab}
                    >
                      <Beaker className="h-3.5 w-3.5 mr-1" />
                      Formula Lab
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {concept.formulas.map((formula, index) => (
                      <div key={index} className="bg-purple-50/50 dark:bg-purple-900/20 rounded-md p-4">
                        <div className="font-mono text-lg text-center p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800">
                          {formula.equation}
                        </div>
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{formula.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-4 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flashcard className="h-4 w-4 text-green-500" />
                      <h3 className="font-semibold">Practice Questions</h3>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                      onClick={handleOpenPracticeQuiz}
                    >
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Full Practice Quiz
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {concept.practiceQuestions.map((qa, index) => (
                      <div key={index} className="border rounded-md overflow-hidden">
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 border-b">
                          <h4 className="font-medium flex items-start gap-2">
                            <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                              Q
                            </span>
                            {qa.question}
                          </h4>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800">
                          <p className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                            <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                              A
                            </span>
                            {qa.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="related" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LibrarySquare className="h-4 w-4 text-indigo-500" />
                    <h3 className="font-semibold">Related Concepts</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {concept.relatedConcepts.map((relConcept, index) => (
                      <div 
                        key={index}
                        className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-md p-3 flex items-center justify-between hover:bg-indigo-100 dark:hover:bg-indigo-800/30 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <BookMarked className="h-4 w-4 text-indigo-500" />
                          <span>{relConcept}</span>
                        </span>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50/50 dark:bg-gray-800/20">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Concepts
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Notebook className="mr-1 h-4 w-4" /> Add Notes
                </Button>
                <Button size="sm">
                  <GraduationCap className="mr-1 h-4 w-4" /> Start Practice
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                <li>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <ScrollText className="mr-2 h-4 w-4 text-blue-600" />
                    Interactive Diagram
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="mr-2 h-4 w-4 text-purple-600" />
                    Study Notes
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <GraduationCap className="mr-2 h-4 w-4 text-amber-600" />
                    Video Explanation
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookCheck className="h-4 w-4" />
                Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Today's Progress</span>
                    <span className="font-semibold">15/30 min</span>
                  </div>
                  <Progress value={50} className="h-1" />
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
