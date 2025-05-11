import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, 
  Calculator, Video, Eye, FileText, Brain, AlertTriangle, BarChart, 
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FormulaTabContent from './FormulaTabContent';

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
    // ... other content sections would be here
  ],
  examples: [
    {
      title: "First Law Example",
      description: "A book on a table remains at rest unless pushed. When pushed, it moves in the direction of the force applied."
    },
    {
      title: "Second Law Example",
      description: "A cart accelerates in proportion to the force applied to it. If the mass is doubled, the acceleration is halved for the same force."
    },
    {
      title: "Third Law Example",
      description: "When a swimmer pushes water backward, the water pushes the swimmer forward with equal force."
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
    // ... more questions
  ]
};

const ConceptCardDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<typeof mockConceptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch the concept data based on conceptId
    // For now, use mock data
    setTimeout(() => {
      setConcept(mockConceptData);
      setLoading(false);
    }, 500);
  }, [conceptId]);

  const handleStartStudy = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
  };
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  const handleFormulaLab = () => {
    navigate(`/dashboard/student/formula-practice?conceptId=${conceptId}`);
    toast({
      title: "Opening Formula Lab",
      description: "Preparing interactive formula practice for this concept"
    });
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your bookmarks for easy access"
    });
  };

  const handleShowHint = () => {
    toast({
      title: "Formula Hint",
      description: "Try breaking down the problem into smaller steps and identify the known variables first."
    });
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
    <div className="container py-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        className="flex gap-2 items-center mb-4" 
        onClick={handleBack}
      >
        <ArrowLeft size={16} />
        Back to Concepts
      </Button>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 mt-4">
        <div>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {concept.chapter}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
            </Badge>
            {concept.important && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                Important
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleStartStudy}
          >
            Start Studying
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            onClick={toggleBookmark}
            className={isBookmarked ? "bg-amber-100 text-amber-800 border-amber-200" : ""}
          >
            <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-amber-500" : ""}`} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>Your mastery of this concept</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Mastery</span>
              <span className="text-sm font-medium">{concept.mastery}%</span>
            </div>
            <Progress value={concept.mastery} className="h-2" />
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {concept.timeEstimate} min</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-auto md:inline-flex md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="formula">Formula Lab</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="exam-mistakes">Exam Mistakes</TabsTrigger>
          <TabsTrigger value="previous-years">Previous Year</TabsTrigger>
          <TabsTrigger value="recall">Recall Accuracy</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About this Concept</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{concept.description}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {concept.contents[1].items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Understanding Newton's laws is essential for:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
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
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                  <p>{concept.contents[0].content}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{concept.contents[1].title}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {concept.contents[1].items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* More content would be dynamically rendered here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Formula Lab Tab */}
        <TabsContent value="formula" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formula Lab</CardTitle>
              <CardDescription>Interactive practice with formulas related to this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Key Formulas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded border font-mono">
                        F = m × a
                      </div>
                      <span>Newton's Second Law</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded border font-mono">
                        F₁ = -F₂
                      </div>
                      <span>Newton's Third Law</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleFormulaLab}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Open Formula Practice Lab
                  </Button>
                  
                  <Button variant="outline" onClick={handleShowHint}>
                    Show Hint
                  </Button>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Why Practice Formulas?</h3>
                  <p>
                    Interactive formula practice helps you develop problem-solving skills and gain intuition
                    for the mathematical relationships in physics concepts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Visual Tab */}
        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Explanations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-500">Interactive diagram would appear here</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Visual explanations help you understand complex concepts through diagrams and animations.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Video Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Explanations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-500">Video tutorial would appear here</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Video explanations provide visual and auditory learning to reinforce your understanding.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>Practical examples of this concept in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {concept.examples.map((example, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <h3 className="font-medium">{example.title}</h3>
                    <p className="mt-2">{example.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Exam Mistakes Tab */}
        <TabsContent value="exam-mistakes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Exam Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-300">Confusing Mass and Weight</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      Students often use weight instead of mass in F=ma calculations. Remember that mass is 
                      measured in kg and doesn't change, while weight is a force measured in newtons.
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-300">Incorrect Force Diagram</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      A common mistake is forgetting to include all forces acting on an object when drawing force 
                      diagrams, especially normal forces and friction.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Previous Years Tab */}
        <TabsContent value="previous-years" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Year Questions</CardTitle>
              <CardDescription>Questions from past exams related to this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">JEE Main 2022</h3>
                    <Badge>Medium</Badge>
                  </div>
                  <p>A block of mass 2 kg is placed on a horizontal surface with coefficient of friction 0.1. 
                     What is the minimum force required to move the block? (g = 10 m/s²)</p>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">Show Answer</Button>
                    <Button variant="outline" size="sm">Add to Practice</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">JEE Advanced 2021</h3>
                    <Badge>Hard</Badge>
                  </div>
                  <p>A 5 kg box is pushed along a horizontal floor by a force of 20 N at an angle of 30° 
                     below the horizontal. If the coefficient of kinetic friction is 0.3, calculate the 
                     acceleration of the box.</p>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">Show Answer</Button>
                    <Button variant="outline" size="sm">Add to Practice</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recall Accuracy Tab */}
        <TabsContent value="recall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recall Accuracy</CardTitle>
              <CardDescription>Your performance on quizzes related to this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Quiz Performance</h3>
                    <p className="text-sm text-muted-foreground">Based on your last 3 attempts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold">75%</span>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Strengths</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Understanding of Newton's First Law</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Application in horizontal motion problems</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Areas to Improve</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Application of Newton's Third Law in complex systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Force resolution in inclined plane problems</span>
                    </li>
                  </ul>
                </div>
                
                <Button>Start Targeted Practice</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Suggestions</CardTitle>
              <CardDescription>Personalized learning recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3">
                  <Brain className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Learning Path Suggestion</h3>
                    <p className="mt-1">
                      Based on your recent performance, focus on improving your understanding of Newton's Third Law 
                      and its applications. After that, proceed to Conservation of Momentum for a natural progression.
                    </p>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex gap-3">
                  <BarChart className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Performance Insight</h3>
                    <p className="mt-1">
                      You spend 45% more time on problems involving inclined planes compared to your peers. 
                      Focusing on force resolution in different coordinate systems may help improve your efficiency.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex gap-3">
                  <MessageSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Study Technique Recommendation</h3>
                    <p className="mt-1">
                      Try the "worked example followed by practice problem" technique for this concept. 
                      Research shows this approach is particularly effective for physics problem-solving skills.
                    </p>
                  </div>
                </div>
                
                <Button className="w-full">Generate Personalized Study Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="hidden">
        <FormulaTabContent conceptId={conceptId || ''} />
      </div>
    </div>
  );
};

export default ConceptCardDetail;
