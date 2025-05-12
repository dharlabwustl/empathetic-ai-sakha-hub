
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, Calculator, BookText, BrainCircuit, Lightbulb, Beaker } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Mock data for the concept detail
const mockConceptData = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  chapter: "Mechanics",
  description: "The fundamental principles that describe the relationship between the motion of an object and the forces acting on it.",
  difficulty: "medium",
  timeEstimate: 25,
  mastery: 65,
  completed: false,
  important: true,
  hasFormulas: true,
  contents: [
    {
      type: 'text',
      content: "Newton's laws of motion are three physical laws that describe the relationship between the motion of an object and the forces acting on it. These laws are fundamental to classical mechanics."
    },
    {
      type: 'list',
      title: "The Three Laws",
      items: [
        "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.",
        "Second Law: The acceleration of an object depends directly on the net force acting upon it and inversely on its mass. (F = ma)",
        "Third Law: For every action, there is an equal and opposite reaction."
      ]
    },
  ],
  examples: [
    {
      title: "First Law Example",
      description: "A book on a table remains at rest unless pushed. When pushed, it moves in the direction of the force applied.",
      imageUrl: "https://placehold.co/300x200/e2e8f0/1e293b?text=First+Law"
    },
    {
      title: "Second Law Example",
      description: "A cart accelerates in proportion to the force applied to it. If the mass is doubled, the acceleration is halved for the same force.",
      imageUrl: "https://placehold.co/300x200/e2e8f0/1e293b?text=Second+Law"
    },
    {
      title: "Third Law Example",
      description: "When a swimmer pushes water backward, the water pushes the swimmer forward with equal force.",
      imageUrl: "https://placehold.co/300x200/e2e8f0/1e293b?text=Third+Law"
    },
  ],
  quizQuestions: [
    {
      question: "What is Newton's First Law also known as?",
      options: ["Law of Acceleration", "Law of Inertia", "Law of Action-Reaction", "Law of Gravity"],
      correctAnswer: 1
    },
    {
      question: "In the equation F = ma, what does 'm' represent?",
      options: ["Motion", "Momentum", "Mass", "Movement"],
      correctAnswer: 2
    },
  ],
  formulas: [
    {
      id: "f1",
      name: "Newton's Second Law",
      formula: "F = ma",
      variables: [
        { symbol: "F", name: "Force", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (Kilogram)" },
        { symbol: "a", name: "Acceleration", unit: "m/s² (Meter per second squared)" }
      ],
      description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."
    },
    {
      id: "f2",
      name: "Weight Formula",
      formula: "W = mg",
      variables: [
        { symbol: "W", name: "Weight", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (Kilogram)" },
        { symbol: "g", name: "Gravitational acceleration", unit: "m/s² (typically 9.8 m/s² on Earth)" }
      ],
      description: "Weight is the force exerted on an object due to gravity."
    }
  ]
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<typeof mockConceptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch the concept data based on conceptId
    // For now, use mock data
    setTimeout(() => {
      setConcept(mockConceptData);
      setLoading(false);
    }, 500);
  }, [conceptId]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: bookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "This concept has been added to your bookmarks for quick access",
    });
  };
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-gradient-to-r from-green-400 to-green-500';
    if (value >= 40) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    return 'bg-gradient-to-r from-red-400 to-red-500';
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="container py-8">
        <Button 
          variant="outline" 
          className="flex gap-2 items-center mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
          Back to Concepts
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Concept not found</h2>
          <p className="text-muted-foreground mt-2">The concept you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Back Button - Enhanced with animation */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="outline" 
          className="flex gap-2 items-center mb-6 shadow-sm hover:shadow transition-all duration-300" 
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
          Back to Concepts
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-gray-100 dark:via-indigo-300 dark:to-gray-100">
              {concept.title}
            </h1>
            <Button 
              variant="ghost" 
              size="icon"
              className={`${bookmarked ? "text-yellow-500" : "text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300`}
              onClick={handleBookmark}
            >
              <Bookmark className={bookmarked ? "fill-yellow-500" : ""} size={20} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 rounded-full px-3 py-1">
              {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 rounded-full px-3 py-1">
              {concept.chapter}
            </Badge>
            <Badge variant="outline" className={`${getDifficultyColor(concept.difficulty)} rounded-full px-3 py-1`}>
              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
            </Badge>
            {concept.important && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 rounded-full px-3 py-1">
                Important
              </Badge>
            )}
          </div>
        </div>

        <Button 
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 flex gap-2 items-center shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => navigate(`/dashboard/student/concepts/${conceptId}/study`)}
        >
          <BookText size={18} />
          Start Studying
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="mb-8 overflow-hidden border border-gray-200/60 dark:border-gray-800/60 shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
            <CardTitle>Progress</CardTitle>
            <CardDescription>Your mastery of this concept</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Mastery</span>
                <span className="text-sm font-medium">{concept.mastery}%</span>
              </div>
              <Progress 
                value={concept.mastery} 
                className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full" 
                indicatorClassName={getProgressColor(concept.mastery)}
              />
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Estimated time: {concept.timeEstimate} min</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 md:w-auto p-1 bg-gray-100/70 dark:bg-gray-900/70 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow rounded-lg transition-all duration-300"
            >
              <BookOpen size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow rounded-lg transition-all duration-300"
            >
              <BrainCircuit size={16} />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger 
              value="examples" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow rounded-lg transition-all duration-300"
            >
              <Lightbulb size={16} />
              <span>Examples</span>
            </TabsTrigger>
            <TabsTrigger 
              value="formula" 
              className={`flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow rounded-lg transition-all duration-300 ${!concept.hasFormulas ? 'hidden' : ''}`}
            >
              <Calculator size={16} />
              <span>Formula Lab</span>
            </TabsTrigger>
            <TabsTrigger 
              value="quiz"
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow rounded-lg transition-all duration-300"
            >
              <Beaker size={16} />
              <span>Quiz</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
                <CardTitle>About this Concept</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="leading-relaxed">{concept.description}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gray-50 dark:bg-gray-900">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Key Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="list-disc pl-5 space-y-2">
                        {concept.contents[1].items.map((item, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2 bg-gray-50 dark:bg-gray-900">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BrainCircuit className="h-5 w-5 text-purple-500" />
                        Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="font-medium">Understanding Newton's laws is essential for:</p>
                      <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                        <li>Engineering design and analysis</li>
                        <li>Sports science and athletic performance</li>
                        <li>Vehicle safety and transportation</li>
                        <li>Space exploration and orbital mechanics</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
                <CardTitle>Detailed Content</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Introduction</h3>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">{concept.contents[0].content}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{concept.contents[1].title}</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      {concept.contents[1].items.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/40">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Study Tips
                    </h3>
                    <ul className="list-disc pl-6 space-y-3 text-blue-700 dark:text-blue-300">
                      <li>Connect each law to real-life examples you can observe</li>
                      <li>Practice applying the second law formula (F=ma) with different values</li>
                      <li>Create diagrams showing action-reaction pairs for the third law</li>
                      <li>Use animations or videos to visualize the concepts in motion</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {concept.examples.map((example, index) => (
                <Card key={index} className="overflow-hidden border border-gray-200/60 dark:border-gray-800/60 shadow-md hover:shadow-lg transition-all duration-300">
                  {example.imageUrl && (
                    <div className="h-48 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                      <img 
                        src={example.imageUrl} 
                        alt={example.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 dark:text-gray-300">{example.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formula" className="space-y-6">
            <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <span>Formula Lab</span>
                  </div>
                  <Button onClick={handleOpenFormulaLab} className="bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-300">
                    Open Formula Lab
                  </Button>
                </CardTitle>
                <CardDescription>
                  Practice and master formulas related to {concept.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {concept.formulas.map((formula, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{formula.name}</h3>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center mb-6 shadow-inner">
                        <span className="text-2xl md:text-3xl font-serif">{formula.formula}</span>
                      </div>
                      <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Variables:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        {formula.variables.map((variable, vIndex) => (
                          <div key={vIndex} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-sm border border-gray-100 dark:border-gray-700 shadow-sm">
                            <span className="font-bold text-blue-600 dark:text-blue-400">{variable.symbol}</span>: {variable.name} ({variable.unit})
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-3 border-t border-gray-100 dark:border-gray-800 pt-6 bg-gray-50 dark:bg-gray-900">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">In the Formula Lab you can:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Practice with interactive formula calculators</li>
                  <li>See step-by-step solutions for different problems</li>
                  <li>Get hints and explanations for each formula</li>
                  <li>Track your understanding of each formula</li>
                </ul>
                <Button 
                  variant="outline" 
                  onClick={handleOpenFormulaLab} 
                  className="mt-3 w-full sm:w-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm hover:shadow transition-all duration-300"
                >
                  Start Formula Practice
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="quiz" className="space-y-6">
            <Card className="border border-gray-200/60 dark:border-gray-800/60 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
                <CardTitle>Knowledge Assessment</CardTitle>
                <CardDescription>Test your understanding with these quiz questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {concept.quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 dark:bg-gray-900 p-5">
                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">Question {qIndex + 1}</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{question.question}</p>
                      </div>
                      <div className="p-5 space-y-3 bg-white dark:bg-gray-800">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                            <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                              <span className="text-sm">{String.fromCharCode(97 + oIndex)}</span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-end border-t border-gray-200 dark:border-gray-700">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all duration-300">Show Answer</Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center pt-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg">
                      Start Full Practice Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ConceptCardDetailPage;
