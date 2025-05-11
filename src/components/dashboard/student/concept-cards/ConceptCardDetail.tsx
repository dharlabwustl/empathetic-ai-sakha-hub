
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, 
  Calculator, Video, BookText, Brain, X, MessageCircle, FileText,
  BarChart, Lightbulb, Braces, Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock concept card data for testing/development
const mockConceptCard = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  chapter: "Mechanics",
  description: "The fundamental principles that describe the relationship between the motion of an object and the forces acting on it.",
  difficulty: "medium",
  timeEstimate: 25,
  mastery: 65,
  completed: false,
  important: true
};

// Mock hook for getting concept card details
const useConceptCardDetails = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [conceptCard, setConceptCard] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setConceptCard(mockConceptCard);
      setLoading(false);
    }, 500);
  }, [id]);

  return {
    conceptCard,
    loading
  };
};

const ConceptCardDetail = () => {
  const { id: conceptId } = useParams();
  const navigate = useNavigate();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Function to navigate to the concept study page
  const handleStudyClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
    toast({
      title: "Loading study materials",
      description: "Preparing your personalized learning experience",
    });
  };

  // Function to navigate to formula lab for this concept
  const handleFormulaLabClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    toast({
      title: "Loading Formula Lab",
      description: "Preparing practice exercises for this concept",
    });
  };

  // Function to toggle bookmark status
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "This concept has been removed from your bookmarks" : "This concept has been added to your bookmarks for easy access",
    });
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

  if (!conceptCard) {
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
          <h1 className="text-3xl font-bold">{conceptCard.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              {conceptCard.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {conceptCard.chapter}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
              {conceptCard.difficulty.charAt(0).toUpperCase() + conceptCard.difficulty.slice(1)} Difficulty
            </Badge>
            {conceptCard.important && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                Important
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button 
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700"
            onClick={handleStudyClick}
          >
            Start Studying
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            className="w-full md:w-auto border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            onClick={handleFormulaLabClick}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Formula Lab
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
              <span className="text-sm font-medium">{conceptCard.mastery}%</span>
            </div>
            <Progress value={conceptCard.mastery} className="h-2" />
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {conceptCard.timeEstimate} min</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-y-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="formula">Formula Lab</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="mistakes">Exam Mistakes</TabsTrigger>
          <TabsTrigger value="previous">Previous Years</TabsTrigger>
          <TabsTrigger value="recall">Recall Accuracy</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About this Concept</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{conceptCard.description}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>First Law (Law of Inertia): Objects maintain their state of rest or motion unless acted upon by a force.</li>
                      <li>Second Law: F = ma. The force equals mass times acceleration.</li>
                      <li>Third Law: For every action, there is an equal and opposite reaction.</li>
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
              
              {/* Formula Lab Button in Overview Tab */}
              <div className="mt-6">
                <Button 
                  onClick={handleFormulaLabClick}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Calculator className="h-5 w-5" />
                  Practice in Formula Lab
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="explanation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Newton's laws of motion are three fundamental laws that describe the relationship between the motion of an object and the forces acting on it.</p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Newton's First Law</h3>
                <p className="mt-2">An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Newton's Second Law</h3>
                <p className="mt-2">The acceleration of an object depends directly on the net force acting upon it and inversely on its mass.</p>
                <div className="p-3 bg-blue-50 mt-2 rounded-md font-mono text-center text-lg">F = ma</div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Newton's Third Law</h3>
                <p className="mt-2">For every action, there is an equal and opposite reaction.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Representations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-center">
                <p>Interactive visualizations to help you understand the concept better:</p>
                
                <div className="p-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🖼️</div>
                    <p>Visual content for Newton's Laws would be displayed here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="font-medium mb-2">First Law Visualization</h3>
                    <div className="bg-blue-100 h-32 rounded-lg flex items-center justify-center">
                      <p>Inertia Visualization</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="font-medium mb-2">Second Law Visualization</h3>
                    <div className="bg-green-100 h-32 rounded-lg flex items-center justify-center">
                      <p>Force & Acceleration</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="font-medium mb-2">Third Law Visualization</h3>
                    <div className="bg-purple-100 h-32 rounded-lg flex items-center justify-center">
                      <p>Action & Reaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="formula" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formula Lab</CardTitle>
              <CardDescription>Practice solving problems with interactive formulas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-lg mb-4 text-blue-800">Key Formulas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-white p-3 rounded-md shadow-sm w-full sm:w-auto">
                        <span className="font-medium text-lg">F = m×a</span>
                      </div>
                      <span>Force equals mass times acceleration (Newton's Second Law)</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-white p-3 rounded-md shadow-sm w-full sm:w-auto">
                        <span className="font-medium text-lg">a = F/m</span>
                      </div>
                      <span>Acceleration equals force divided by mass</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-white p-3 rounded-md shadow-sm w-full sm:w-auto">
                        <span className="font-medium text-lg">F₁ = -F₂</span>
                      </div>
                      <span>For every action, there is an equal and opposite reaction (Newton's Third Law)</span>
                    </div>
                  </div>
                </div>
                
                <div className="border p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Practice Problem</h3>
                  
                  <div className="mb-4">
                    <p>A 2kg object is acted upon by a force of 10N. What is its acceleration?</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="font-medium mb-2">Formula:</div>
                      <div className="bg-gray-100 p-3 rounded-md font-mono">a = F/m</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium mb-2">Solution:</div>
                      <div className="bg-gray-100 p-3 rounded-md font-mono">a = 10N / 2kg = 5 m/s²</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">Show Hint</Button>
                    <Button onClick={handleFormulaLabClick}>
                      <Calculator className="mr-2 h-4 w-4" />
                      Open Formula Lab
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Introduction to Newton's Laws</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 8:42</span>
                    <Button size="sm">Watch Now</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Applications of Newton's Laws</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 10:15</span>
                    <Button size="sm">Watch Now</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Problem Solving with Newton's Laws</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 12:30</span>
                    <Button size="sm">Watch Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Applied Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold">First Law Example</h3>
                  <p className="mt-1">A book on a table remains at rest because the force of gravity pulling it down is balanced by the normal force from the table pushing up.</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold">Second Law Example</h3>
                  <p className="mt-1">When you push a shopping cart, the acceleration depends on how hard you push (force) and how heavily loaded the cart is (mass).</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold">Third Law Example</h3>
                  <p className="mt-1">When a swimmer pushes water backward, the water pushes the swimmer forward with equal force. This is how swimming propels you forward.</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold">Real-world Application</h3>
                  <p className="mt-1">In rocket propulsion, exhaust gases are expelled in one direction, creating a thrust force in the opposite direction that propels the rocket forward.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mistakes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Exam Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium">Confusing mass and weight</h3>
                  <p className="text-gray-600 mt-1">Mass is an object's resistance to acceleration, while weight is the force of gravity on an object.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium">Ignoring friction in calculations</h3>
                  <p className="text-gray-600 mt-1">Many students forget to account for friction when applying Newton's laws to real-world problems.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium">Missing force components in inclined planes</h3>
                  <p className="text-gray-600 mt-1">When analyzing objects on inclined planes, remember to break forces into their x and y components.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium">Forgetting action-reaction pairs</h3>
                  <p className="text-gray-600 mt-1">Action-reaction forces act on different bodies. Many students incorrectly identify forces acting on the same body as action-reaction pairs.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="previous" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Years' Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">NEET 2022</span>
                    <Badge>Medium</Badge>
                  </div>
                  <p className="mt-2">A block of mass 10 kg is moving with a velocity of 5 m/s on a frictionless surface. If a force of 20 N is applied on it for 3 seconds in the direction opposite to its motion, what will be its final velocity?</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">JEE Main 2021</span>
                    <Badge>Hard</Badge>
                  </div>
                  <p className="mt-2">A particle of mass 2 kg is subjected to a force of 8 N which causes a displacement s in the particle given by s = t³ + 3t, where s is in meters and t in seconds. Find the work done by the force in 2 seconds.</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">NEET 2020</span>
                    <Badge>Easy</Badge>
                  </div>
                  <p className="mt-2">A block of mass 5 kg is placed on a surface with a coefficient of friction µ = 0.2. If a force of 15 N is applied horizontally, what is the acceleration of the block?</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recall Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Recall Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Last Quiz Score</div>
                      <div className="text-2xl font-bold">82%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Avg. Response Time</div>
                      <div className="text-2xl font-bold">18s</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Recall Accuracy</div>
                      <div className="text-2xl font-bold">76%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Weak Areas</div>
                      <div className="text-lg font-semibold">3rd Law Applications</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Improvement Trend</h3>
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Recall accuracy chart would appear here</span>
                  </div>
                </div>
                
                <div>
                  <Button className="w-full">Test Recall Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium">Learning Pattern</h3>
                  <p className="text-gray-600 mt-1">You learn this concept best through visual examples and practice problems. You tend to understand the principles quickly but need more practice with mathematical applications.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-medium">Strengths</h3>
                  <p className="text-gray-600 mt-1">You have a strong grasp of Newton's First Law and its applications. Your understanding of inertia is excellent compared to your peers.</p>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">Areas for Improvement</h3>
                  <p className="text-gray-600 mt-1">You could benefit from more practice with problems involving Newton's Third Law, particularly in systems with multiple interacting objects.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-medium">Connected Concepts</h3>
                  <p className="text-gray-600 mt-1">Based on your learning pattern, reviewing conservation of momentum and circular motion would enhance your understanding of Newton's Laws.</p>
                </div>
                
                <div className="mt-4">
                  <Button className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Get Personalized Insights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Practice Force Diagrams</h3>
                    <p className="text-gray-600 mt-1">Spend 15 minutes drawing free body diagrams for different scenarios involving multiple forces. This will strengthen your ability to identify all forces acting on an object.</p>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg flex items-start gap-3">
                  <Braces className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Solve Mathematical Problems</h3>
                    <p className="text-gray-600 mt-1">Focus on numerical problems involving Newton's Second Law (F=ma) with various masses and forces to build computational fluency.</p>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Explain to Others</h3>
                    <p className="text-gray-600 mt-1">Teaching concepts to others reinforces your own understanding. Try explaining Newton's Third Law to a friend or family member in simple terms.</p>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg flex items-start gap-3">
                  <FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Review Related Concepts</h3>
                    <p className="text-gray-600 mt-1">Spend time reviewing friction, tension, and normal forces as these concepts are closely related to Newton's Laws and often appear together in problems.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full min-h-[200px] p-3 border rounded-md"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Add your notes about this concept here..."
              />
              <div className="mt-4 flex justify-end">
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;
