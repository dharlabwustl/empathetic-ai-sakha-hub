
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft } from 'lucide-react';

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

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<typeof mockConceptData | null>(null);
  const [loading, setLoading] = useState(true);

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
  
  const handleFormulaLabClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
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

        <Button 
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700"
          onClick={handleStartStudy}
        >
          Start Studying
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
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
        <TabsList className="grid grid-cols-3 md:grid-cols-7 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="formula-lab">Formula Lab</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practical Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {concept.examples.map((example, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p>{example.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Self-Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {concept.quizQuestions.map((question, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Question {qIndex + 1}: {question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex} 
                          className={`p-3 border rounded-md cursor-pointer ${
                            oIndex === question.correctAnswer ? 'hover:bg-green-50 hover:border-green-200' : 'hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea 
                  className="w-full min-h-[200px] p-3 border rounded-md" 
                  placeholder="Add your personal notes about this concept here..."
                ></textarea>
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="formula-lab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formula Lab</CardTitle>
              <CardDescription>Practice with key formulas related to this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold">Key Formulas:</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-white p-2 rounded-md">F = ma</div>
                      <span>Force equals mass times acceleration (Newton's Second Law)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-white p-2 rounded-md">p = mv</div>
                      <span>Momentum equals mass times velocity</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleFormulaLabClick} className="w-full">
                  Open Interactive Formula Lab
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Personalized insights and suggestions based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Learning Pattern Analysis</h3>
                  <p className="mt-2">Based on your interaction with similar physics concepts, you learn best with visual examples and practical applications.</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Suggested Focus Areas</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Spend more time on understanding the mathematical formulations of Newton's Second Law</li>
                    <li>Review examples that apply multiple laws simultaneously</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Connected Concepts</h3>
                  <p className="mt-2">This concept is strongly related to:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">Friction</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">Momentum</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">Circular Motion</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
