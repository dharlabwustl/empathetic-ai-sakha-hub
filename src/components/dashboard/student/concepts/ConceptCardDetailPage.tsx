
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  PenTool, 
  FileText, 
  FileQuestion, 
  Calculator, 
  BrainCircuit, 
  CheckCircle, 
  Award, 
  Link as LinkIcon,
  Share2,
  ThumbsUp,
  Bookmark,
  BarChart2,
  AlarmClock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";

// Mock concept data fetch function
const fetchConceptDetail = (id: string) => {
  return {
    id,
    title: "Newton's Laws of Motion",
    description: "Fundamental principles that describe the relationship between the motion of an object and the forces acting on it.",
    subject: "Physics",
    content: `
      <h2>Introduction to Newton's Laws</h2>
      <p>Sir Isaac Newton developed three laws that form the foundation of classical mechanics. These laws describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
      
      <h3>Newton's First Law: Law of Inertia</h3>
      <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
      <p>This means that objects resist changes in their state of motion. In the absence of an unbalanced force, an object in motion will maintain its state of motion. This property of objects to resist changes in motion is called inertia.</p>
      
      <h3>Newton's Second Law: Law of Acceleration</h3>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      <p>Mathematically, this can be expressed as: F = ma, where F is the net force, m is the mass, and a is the acceleration.</p>
      
      <h3>Newton's Third Law: Law of Action-Reaction</h3>
      <p>For every action, there is an equal and opposite reaction.</p>
      <p>This means that when one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.</p>
    `,
    difficulty: "medium",
    completed: false,
    progress: 65,
    mastery: 70,
    timeEstimate: "30 min",
    tags: ["Classical Mechanics", "Forces", "Motion", "Conservation Laws"],
    isBookmarked: true,
    relatedConcepts: [
      {id: "concept-2", title: "Conservation of Momentum", subject: "Physics"},
      {id: "concept-3", title: "Work and Energy", subject: "Physics"},
      {id: "concept-4", title: "Equilibrium", subject: "Physics"}
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "What is Newton's First Law also known as?",
        options: ["Law of Action-Reaction", "Law of Inertia", "Law of Acceleration", "Law of Gravity"],
        correctAnswer: "Law of Inertia"
      },
      {
        id: "q2",
        question: "Which equation represents Newton's Second Law?",
        options: ["E = mc²", "F = ma", "a = F/m", "p = mv"],
        correctAnswer: "F = ma"
      }
    ],
    formulas: [
      {
        id: "formula-1",
        name: "Newton's Second Law",
        latex: "F = m \\cdot a",
        description: "Force equals mass times acceleration"
      },
      {
        id: "formula-2",
        name: "Weight",
        latex: "W = m \\cdot g",
        description: "Weight equals mass times gravitational acceleration"
      }
    ],
    notes: [
      {
        id: "note-1",
        title: "Application Examples",
        content: "Examples of Newton's First Law: A book resting on a table, objects in space continuing on their trajectory."
      }
    ],
    tutorAvailable: true,
    similarProblems: 12
  };
};

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMasteryAnimation, setShowMasteryAnimation] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.FOCUSED);
  const { toast } = useToast();

  useEffect(() => {
    if (conceptId) {
      // In a real app, this would be an API call
      const conceptData = fetchConceptDetail(conceptId);
      setConcept(conceptData);
      setLoading(false);
      
      // Simulate loading any saved progress
      setTimeout(() => {
        setShowMasteryAnimation(true);
      }, 1000);
    }
  }, [conceptId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookmark = () => {
    toast({
      title: concept.isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: concept.isBookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "This concept has been added to your bookmarks"
    });
    
    setConcept(prev => ({...prev, isBookmarked: !prev.isBookmarked}));
  };

  const handleStartQuiz = () => {
    toast({
      title: "Quiz Started",
      description: "Ready to test your knowledge on this concept!"
    });
    setActiveTab("quiz");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading concept details...</p>
      </div>
    );
  }

  const getMasteryColor = () => {
    if (concept.mastery >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-600';
    if (concept.mastery >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500';
    if (concept.mastery >= 40) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    'hard': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300'
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Back navigation button */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={handleGoBack} 
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Concepts
        </Button>
      </div>
      
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 p-8 mb-8">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <mask id="grid-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect x="0" y="50%" width="100%" height="50%" fill="black" />
              </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" mask="url(#grid-mask)" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>
        
        <div className="relative z-10 flex justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="font-medium">
                {concept.subject}
              </Badge>
              <Badge className={`${difficultyColors[concept.difficulty]} capitalize`}>
                {concept.difficulty}
              </Badge>
              {concept.tags.slice(0, 3).map((tag: string, i: number) => (
                <Badge key={i} variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  {tag}
                </Badge>
              ))}
              {concept.completed && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex gap-1 items-center">
                  <CheckCircle className="h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              {concept.title}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">{concept.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Study Progress</span>
                <div className="flex items-center gap-2 mt-1">
                  <Progress 
                    value={concept.progress} 
                    className="h-2" 
                  />
                  <span className="font-medium text-sm">{concept.progress}%</span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Mastery Level</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${getMasteryColor()}`}
                      initial={{ width: "0%" }}
                      animate={showMasteryAnimation ? { width: `${concept.mastery}%` } : { width: "0%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-medium text-sm">{concept.mastery}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <AlarmClock className="text-gray-400 h-4 w-4" />
                <span className="text-sm">{concept.timeEstimate} study time</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileQuestion className="text-gray-400 h-4 w-4" />
                <span className="text-sm">{concept.quizQuestions.length} practice questions</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setActiveTab("study")}>
                <BookOpen className="mr-2 h-4 w-4" /> Start Learning
              </Button>
              
              <Button variant="outline" onClick={handleStartQuiz}>
                <FileQuestion className="mr-2 h-4 w-4" /> Take Quiz
              </Button>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-3">
            <Button variant="ghost" className="flex items-center gap-2" onClick={handleBookmark}>
              <motion.div 
                animate={concept.isBookmarked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Star className={`h-5 w-5 ${concept.isBookmarked ? "text-yellow-400 fill-yellow-400" : ""}`} />
              </motion.div>
              <span>{concept.isBookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            
            <Button variant="ghost" className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-none">
          <TabsTrigger value="overview" className="flex gap-1 items-center">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="study" className="flex gap-1 items-center">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Study</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex gap-1 items-center">
            <FileQuestion className="h-4 w-4" />
            <span className="hidden sm:inline">Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex gap-1 items-center">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex gap-1 items-center">
            <PenTool className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Concept Overview</h2>
                    <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: concept.content }} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                      <Award className="h-5 w-5 text-amber-500" />
                      Key Takeaways
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Objects in motion stay in motion unless acted upon by an external force</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>The acceleration of an object is proportional to the force applied (F=ma)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>For every action, there is an equal and opposite reaction</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <BrainCircuit className="h-5 w-5 text-purple-500" />
                      AI Study Assistance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Get personalized help tailored to your learning style</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <MessageSquare className="mr-2 h-4 w-4" /> 
                      Chat with AI Tutor
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <LinkIcon className="h-5 w-5 text-blue-500" />
                      Related Concepts
                    </h3>
                    <div className="space-y-3">
                      {concept.relatedConcepts.map((related: any) => (
                        <div key={related.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <p className="font-medium">{related.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{related.subject}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <BarChart2 className="h-5 w-5 text-indigo-500" />
                      Learning Analytics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Time Spent</span>
                          <span>45 minutes</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quiz Performance</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Retention Score</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Study Tab */}
          <TabsContent value="study">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Study Content</h2>
                <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: concept.content }} />
                
                {/* Interactive study elements would go here */}
                <div className="mt-8 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <h3 className="text-lg font-semibold mb-2">Interactive Example: Newton's Second Law</h3>
                  <p className="mb-4">Adjust the mass and force to see how acceleration changes.</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div>
                      <label className="block text-sm mb-1">Mass (kg)</label>
                      <input type="range" min="1" max="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Force (N)</label>
                      <input type="range" min="1" max="1000" className="w-full" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-md">
                    <p className="font-mono text-center">a = F/m = 10 m/s²</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">Test your knowledge of {concept.title}</p>
                
                <div className="space-y-8">
                  {concept.quizQuestions.map((q: any) => (
                    <div key={q.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <h3 className="text-lg font-medium mb-3">{q.question}</h3>
                      <div className="space-y-2">
                        {q.options.map((option: string, i: number) => (
                          <div key={i} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`${q.id}-option-${i}`}
                              name={q.id} 
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={`${q.id}-option-${i}`} className="ml-2">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button>Submit Answers</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formulas Tab */}
          <TabsContent value="formulas">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Key Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concept.formulas.map((formula: any) => (
                    <div key={formula.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <h3 className="text-lg font-medium mb-2">{formula.name}</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-center mb-2">
                        {formula.latex}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Notes</h2>
                  <Button variant="outline">
                    <PenTool className="mr-2 h-4 w-4" /> Add Note
                  </Button>
                </div>
                
                {concept.notes.length > 0 ? (
                  <div className="space-y-4">
                    {concept.notes.map((note: any) => (
                      <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-2">{note.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PenTool className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No notes yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Add notes to help remember key concepts</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Learning feedback section */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
        <h2 className="text-xl font-bold mb-4">Your Learning Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="ghost" className="flex items-center justify-center gap-2 p-6 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <span>I understand this</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center justify-center gap-2 p-6 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <span>Ask AI to explain</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center justify-center gap-2 p-6 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <Bookmark className="h-5 w-5 text-blue-500" />
            <span>Review Later</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
