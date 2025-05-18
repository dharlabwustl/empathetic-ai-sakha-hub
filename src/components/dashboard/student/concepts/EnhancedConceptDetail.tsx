
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Book, BookOpen, Check, Clock, Edit, FileText, FlaskConical, Info, Lightbulb, Play, Star } from 'lucide-react';

// Mock concept data
const MOCK_CONCEPT_DATA = {
  "id": "concept-1",
  "title": "Newton's Three Laws of Motion",
  "description": "Fundamental principles that form the foundation of classical mechanics, describing the relationship between an object and the forces acting on it.",
  "subject": "Physics",
  "chapter": "Classical Mechanics",
  "difficulty": "Medium",
  "estimatedTime": 45,
  "content": `
  ## Newton's First Law of Motion
  
  An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.
  
  This law is often called the **Law of Inertia**. Inertia is the resistance of any physical object to any change in its state of motion.
  
  ## Newton's Second Law of Motion
  
  The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This can be expressed mathematically as:
  
  $$F = ma$$
  
  Where:
  - $F$ is the net force applied (newtons, N)
  - $m$ is the mass of the object (kilograms, kg)
  - $a$ is the acceleration (meters per second squared, m/s²)
  
  ## Newton's Third Law of Motion
  
  For every action, there is an equal and opposite reaction.
  
  When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.
  
  ## Applications
  
  These laws explain a wide range of phenomena in our everyday lives:
  
  1. A rocket propels forward by pushing exhaust gases backward (Third Law)
  2. A car accelerates when force is applied from the engine (Second Law)
  3. Objects on a table remain at rest due to balanced forces (First Law)
  `,
  "keyFormulas": [
    {
      "name": "Newton's Second Law",
      "formula": "F = ma",
      "variables": [
        { "symbol": "F", "name": "Force", "unit": "N (newtons)" },
        { "symbol": "m", "name": "Mass", "unit": "kg (kilograms)" },
        { "symbol": "a", "name": "Acceleration", "unit": "m/s² (meters per second squared)" }
      ]
    },
    {
      "name": "Force of Gravity",
      "formula": "F_g = mg",
      "variables": [
        { "symbol": "F_g", "name": "Force of gravity", "unit": "N (newtons)" },
        { "symbol": "m", "name": "Mass", "unit": "kg (kilograms)" },
        { "symbol": "g", "name": "Acceleration due to gravity", "unit": "m/s² (9.8 m/s² on Earth)" }
      ]
    }
  ],
  "exampleProblems": [
    {
      "question": "A 2 kg object experiences a force of 10 N. What is its acceleration?",
      "solution": "Using Newton's Second Law: F = ma\nRearranging: a = F/m\na = 10 N / 2 kg = 5 m/s²"
    },
    {
      "question": "A 1500 kg car accelerates from 0 to 27 m/s in 9 seconds. What is the net force acting on the car?",
      "solution": "First, find acceleration:\na = (v_f - v_i) / t = (27 - 0) / 9 = 3 m/s²\n\nNow use Newton's Second Law:\nF = ma = 1500 kg × 3 m/s² = 4500 N"
    }
  ],
  "relatedConcepts": [
    { "id": "concept-2", "title": "Momentum and Impulse" },
    { "id": "concept-3", "title": "Work, Energy and Power" },
    { "id": "concept-4", "title": "Circular Motion" }
  ],
  "learningOutcomes": [
    "Explain Newton's Three Laws of Motion and their implications",
    "Apply Newton's Second Law to solve physics problems",
    "Identify examples of Newton's Laws in everyday scenarios",
    "Analyze forces and their effects on motion"
  ],
  "videoUrl": "https://www.youtube.com/embed/CQYELiTtUs8",
  "progress": 35,
  "quizResults": {
    "correct": 3,
    "total": 5,
    "lastAttempt": "2023-07-15"
  }
};

const EnhancedConceptDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conceptData, setConceptData] = useState(MOCK_CONCEPT_DATA);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [isStudyComplete, setIsStudyComplete] = useState(false);

  // Fetch concept data based on conceptId
  useEffect(() => {
    // In a real app, fetch data from API using conceptId
    // For now, just simulate loading
    setLoading(true);
    setTimeout(() => {
      setConceptData(MOCK_CONCEPT_DATA);
      setLoading(false);
    }, 300);
  }, [conceptId]);

  const handleGoBack = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleMarkAsComplete = () => {
    setIsStudyComplete(true);
    toast({
      title: "Concept marked as complete!",
      description: "Your progress has been updated successfully.",
    });
  };

  const handlePracticeQuiz = () => {
    toast({
      title: "Practice Quiz Starting",
      description: "Prepare to test your knowledge on this concept.",
    });
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleGoBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>
        <div className="flex items-center space-x-2">
          <Badge variant={isStudyComplete ? "success" : "outline"}>
            {isStudyComplete ? "Completed" : "In Progress"}
          </Badge>
          {!isStudyComplete && (
            <Button size="sm" onClick={handleMarkAsComplete} className="bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>

      {/* Title and info card */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{conceptData.title}</CardTitle>
              <CardDescription className="mt-1">{conceptData.description}</CardDescription>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center">
                <Book className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-sm text-muted-foreground">{conceptData.subject}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-sm text-muted-foreground">{conceptData.chapter}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-amber-500" />
                <span className="text-sm text-muted-foreground">{conceptData.estimatedTime} min</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your progress</span>
              <span className="text-sm text-muted-foreground">{conceptData.progress}%</span>
            </div>
            <Progress value={conceptData.progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="formulas">Key Formulas</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-500" />
                Content Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: conceptData.content }}></div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={handleGoBack}>
                Back to Concepts
              </Button>
              <Button onClick={handlePracticeQuiz}>
                <Play className="mr-2 h-4 w-4" />
                Test Understanding
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {conceptData.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 rounded-full bg-blue-100 text-blue-700 h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      {index + 1}
                    </div>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-green-500" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {conceptData.relatedConcepts.map((concept) => (
                  <Button 
                    key={concept.id} 
                    variant="outline" 
                    onClick={() => navigate(`/dashboard/student/concept-study/${concept.id}`)}
                    className="justify-start text-left h-auto py-2"
                  >
                    <div>
                      <div className="font-medium">{concept.title}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FlaskConical className="mr-2 h-5 w-5 text-purple-500" />
                Key Formulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conceptData.keyFormulas.map((formula, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                    <h3 className="text-lg font-medium mb-2">{formula.name}</h3>
                    <div className="text-xl font-mono text-center my-4 bg-white dark:bg-slate-800 p-3 rounded">
                      {formula.formula}
                    </div>
                    <h4 className="font-medium text-sm text-muted-foreground mt-4 mb-2">Variables:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {formula.variables.map((variable, vIndex) => (
                        <div key={vIndex} className="text-sm">
                          <span className="font-mono font-bold">{variable.symbol}</span>: {variable.name} <span className="text-xs text-muted-foreground">({variable.unit})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleOpenFormulaLab} className="w-full">
                <FlaskConical className="mr-2 h-4 w-4" />
                Practice with Formula Lab
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-emerald-500" />
                Example Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {conceptData.exampleProblems.map((problem, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                        {index + 1}
                      </div>
                      Question
                    </h3>
                    <p>{problem.question}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">
                        <Check className="h-4 w-4" />
                      </div>
                      Solution
                    </h3>
                    <pre className="whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
                      {problem.solution}
                    </pre>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5 text-red-500" />
                Video Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={conceptData.videoUrl} 
                  title={conceptData.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-900/40">
                <h3 className="text-amber-800 dark:text-amber-400 font-medium mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Learning Tips
                </h3>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1">•</span>
                    <span>Take notes while watching the video</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1">•</span>
                    <span>Pause and try to solve problems before seeing the solution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1">•</span>
                    <span>Rewatch complex sections to ensure understanding</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-amber-500" />
                Practice Your Knowledge
              </CardTitle>
              <CardDescription>
                Test your understanding of {conceptData.title} with quizzes and practice problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Quick Quiz</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">5 multiple choice questions</p>
                    {conceptData.quizResults && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Last score:</span>
                          <span className="font-medium">{conceptData.quizResults.correct}/{conceptData.quizResults.total}</span>
                        </div>
                        <Progress value={(conceptData.quizResults.correct / conceptData.quizResults.total) * 100} className="h-1.5 mt-1" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full" onClick={handlePracticeQuiz}>
                      <Play className="mr-2 h-3 w-3" />
                      {conceptData.quizResults ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Formula Lab</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Practice using key formulas with interactive examples</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full" onClick={handleOpenFormulaLab}>
                      <FlaskConical className="mr-2 h-3 w-3" />
                      Open Lab
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Flashcards</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Quick revision with concept flashcards</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full">
                      <BookOpen className="mr-2 h-3 w-3" />
                      View Cards
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Your Practice Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-500">4</div>
                    <div className="text-xs text-muted-foreground">Practice Sessions</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-500">20</div>
                    <div className="text-xs text-muted-foreground">Questions Attempted</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-500">75%</div>
                    <div className="text-xs text-muted-foreground">Avg. Score</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2 h-5 w-5 text-indigo-500" />
                Personal Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900 min-h-[200px]">
                <p className="text-muted-foreground text-center italic">
                  This is where your notes about this concept will appear.
                  <br />
                  Take notes while you study to improve retention!
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Edit className="mr-2 h-4 w-4" />
                Add Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedConceptDetail;
