
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
  ScrollText,
  Star,
  ThumbsUp,
  Volume2,
  Share2,
  Bookmark,
  PenTool
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { CustomProgress } from '@/components/ui/custom-progress';

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState<number>(0);
  const [notes, setNotes] = useState('');
  
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
    isPremium: true,
    isRecommended: true,
    suggestedTime: '2 days before exam',
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
    ],
    commonMistakes: [
      'Forgetting that Bernoulli's theorem only applies along a streamline',
      'Neglecting the effects of fluid viscosity in real-world applications',
      'Incorrectly assuming the theorem applies to compressible fluids without modifications',
      'Not accounting for energy losses due to friction in practical applications'
    ],
    examTips: [
      'Pay attention to the assumptions made when applying the theorem',
      'Practice converting between different forms of the equation',
      'Remember to include appropriate units in your calculations',
      'Understand how to apply the principle to explain real-world phenomena'
    ],
    studyMaterials: [
      { name: "Video: Bernoulli's Principle Explanation", type: "video", duration: "12:30" },
      { name: "Interactive Simulation", type: "simulation", duration: "15:00" },
      { name: "Practice Problems PDF", type: "document", pages: 5 },
      { name: "Advanced Applications Article", type: "article", pages: 8 }
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

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "This concept has been removed from your bookmarks" : "This concept has been saved to your bookmarks",
      variant: "default",
    });
  };

  const handleToggleReadAloud = () => {
    setIsReading(!isReading);
    if (!isReading) {
      toast({
        title: "Read aloud started",
        description: "Reading concept summary...",
      });
    } else {
      toast({
        title: "Read aloud stopped",
        description: "Text-to-speech paused",
      });
    }
  };

  const handleShare = () => {
    // Mock share functionality
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this concept with others",
      });
    });
  };

  const handleUpdateConfidence = (rating: number) => {
    setConfidenceRating(rating);
    
    toast({
      title: "Confidence updated",
      description: `Your confidence level has been set to ${rating}/5`,
    });
  };

  const handleSaveNotes = () => {
    if (notes.trim()) {
      toast({
        title: "Notes saved",
        description: "Your notes have been saved for this concept",
      });
    }
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
          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
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
                    {concept.isPremium && (
                      <Badge variant="default" className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Premium
                      </Badge>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={isReading ? "text-blue-600 bg-blue-50" : "text-gray-500"}
                    onClick={handleToggleReadAloud}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={isBookmarked ? "text-amber-600" : "text-gray-500"}
                    onClick={handleToggleBookmark}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-500" : ""}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Mastery Progress</h3>
                  <span className="text-sm font-semibold">{concept.masteryLevel}%</span>
                </div>
                <CustomProgress 
                  value={concept.masteryLevel} 
                  className="h-2" 
                  indicatorClassName={
                    concept.masteryLevel >= 80 ? "bg-gradient-to-r from-emerald-500 to-green-600" :
                    concept.masteryLevel >= 60 ? "bg-gradient-to-r from-yellow-400 to-amber-500" :
                    concept.masteryLevel >= 40 ? "bg-gradient-to-r from-blue-400 to-blue-600" :
                    "bg-gradient-to-r from-gray-400 to-gray-500"
                  }
                />
              </div>

              <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Concept Summary
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleToggleSummary}>
                    {activeSummary === 'short' ? 'Show Detailed' : 'Show Brief'}
                  </Button>
                </div>
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  {activeSummary === 'short' ? concept.shortSummary : concept.longSummary}
                </div>
              </div>

              {/* Confidence assessment */}
              <div className="mb-6 border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-blue-50/30 dark:bg-blue-900/20">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                  Confidence Self-Assessment
                </h3>
                <p className="text-sm mb-3">How confident are you with this concept?</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button 
                      key={rating}
                      variant={confidenceRating === rating ? "default" : "outline"}
                      size="sm"
                      className={confidenceRating === rating ? "bg-blue-500" : ""}
                      onClick={() => handleUpdateConfidence(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                  <span className="text-sm ml-2">
                    {confidenceRating === 1 && "Not confident at all"}
                    {confidenceRating === 2 && "Slightly confident"}
                    {confidenceRating === 3 && "Moderately confident"}
                    {confidenceRating === 4 && "Very confident"}
                    {confidenceRating === 5 && "Extremely confident"}
                  </span>
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
                  
                  <div className="flex items-center gap-2 mt-6 mb-2">
                    <BookOpen className="h-4 w-4 text-red-500" />
                    <h3 className="font-semibold">Common Mistakes</h3>
                  </div>
                  <ul className="space-y-2">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                        <span className="mt-0.5 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          !
                        </span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
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
                  
                  <div className="flex items-center gap-2 mt-6 mb-2">
                    <GraduationCap className="h-4 w-4 text-amber-500" />
                    <h3 className="font-semibold">Exam Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {concept.examTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                        <span className="mt-0.5 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
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
                  
                  <div className="flex items-center gap-2 mt-6 mb-2">
                    <ScrollText className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">Study Materials</h3>
                  </div>
                  <div className="space-y-2">
                    {concept.studyMaterials.map((material, index) => (
                      <div key={index} className="flex justify-between items-center border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          {material.type === "video" && <BookOpen className="h-4 w-4 text-red-500" />}
                          {material.type === "simulation" && <Beaker className="h-4 w-4 text-green-500" />}
                          {material.type === "document" && <FileText className="h-4 w-4 text-blue-500" />}
                          {material.type === "article" && <BookMarked className="h-4 w-4 text-purple-500" />}
                          <span>{material.name}</span>
                        </div>
                        <Badge variant="outline">
                          {material.duration || `${material.pages} pages`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Notes section */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <PenTool className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold">Personal Notes</h3>
                </div>
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md mb-2 bg-white dark:bg-gray-800"
                  placeholder="Add your personal notes about this concept here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600"
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4 bg-gray-50/50 dark:bg-gray-800/20">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Concepts
              </Button>
              <div className="flex gap-2">
                <Button 
                  onClick={handleMarkComplete} 
                  disabled={markingCompleted} 
                  variant="outline" 
                  className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                  size="sm"
                >
                  <Check className="h-4 w-4" />
                  {markingCompleted ? 'Saving...' : 'Mark Complete'}
                </Button>
                <Button size="sm">
                  <GraduationCap className="mr-1 h-4 w-4" /> Start Practice
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
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
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
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
                  <CustomProgress 
                    value={50} 
                    className="h-1" 
                    indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600"
                  />
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    <h3 className="font-medium text-sm">Best Time to Study</h3>
                  </div>
                  <p className="text-sm">{concept.suggestedTime}</p>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Social proof / analytics */}
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit className="h-4 w-4" />
                Learning Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Time spent</span>
                    <span className="text-sm">45 minutes</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Practice attempts</span>
                    <span className="text-sm">3 quizzes</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Latest score</span>
                    <span className="text-sm">85%</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revisits</span>
                    <span className="text-sm">4 times</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
