
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, 
  Calculator, Video, Eye, FileText, Brain, AlertTriangle, Star, PieChart
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
  const [activeTab, setActiveTab] = useState('summary');

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

  // Function to show hint for formula or concept
  const handleShowHint = () => {
    toast({
      title: "Concept Hint",
      description: "Hint: Think about how force, mass, and acceleration are related in Newton's Second Law.",
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
            className={`w-full md:w-auto ${isBookmarked ? "bg-amber-100 text-amber-800 border-amber-200" : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"}`}
            onClick={toggleBookmark}
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

      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 md:w-auto">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="formula-lab">Formula Lab</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="exam-mistakes">Exam Mistakes</TabsTrigger>
          <TabsTrigger value="previous-years">Previous Years</TabsTrigger>
          <TabsTrigger value="recall">Recall</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Explanation Tab */}
        <TabsContent value="explanation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Newton's First Law</h3>
                  <p className="mt-2">An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force. This property of objects is called inertia.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Newton's Second Law</h3>
                  <p className="mt-2">The acceleration of an object depends directly on the net force acting upon it and inversely on its mass. This relationship is expressed mathematically as:</p>
                  <div className="p-3 bg-blue-50 mt-2 rounded-md font-mono text-center text-lg">F = ma</div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Newton's Third Law</h3>
                  <p className="mt-2">For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Visual Tab */}
        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Representation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-full max-w-md">
                  <div className="text-center text-sm text-gray-500">Visual representation placeholder</div>
                </div>
                <Button onClick={handleShowHint}>
                  Show Hint
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Formula Lab Tab */}
        <TabsContent value="formula-lab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formula Lab</CardTitle>
              <CardDescription>Practice solving numeric problems with interactive formulas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Strengthen your understanding of {conceptCard.title} by practicing with formula-based problems.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-6">
                <h3 className="font-medium text-lg mb-3 text-blue-800 dark:text-blue-300">Key Formulas for {conceptCard.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                      <span className="font-medium text-lg">F = m×a</span>
                    </div>
                    <span>Force equals mass times acceleration (Newton's Second Law)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                      <span className="font-medium text-lg">a = F/m</span>
                    </div>
                    <span>Acceleration equals force divided by mass</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                      <span className="font-medium text-lg">F₁ = -F₂</span>
                    </div>
                    <span>For every action, there is an equal and opposite reaction (Newton's Third Law)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button onClick={handleShowHint}>Show Hint</Button>
                <Button onClick={handleFormulaLabClick} className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Open Interactive Formula Lab
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Video Tab */}
        <TabsContent value="video" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Explanation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center mt-4 text-sm text-gray-500">Video explanation coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Example Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold">Example 1: First Law</h3>
                  <p className="mt-2">A book is at rest on a table. Explain why it remains stationary even though Earth's gravity is pulling on it.</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold">Example 2: Second Law</h3>
                  <p className="mt-2">A force of 10N acts on a 2kg mass. What is its acceleration?</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold">Example 3: Third Law</h3>
                  <p className="mt-2">When a person stands on the ground, explain the forces acting between the person and Earth.</p>
                  <Button className="mt-4">View Solution</Button>
                </div>
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
                <div className="flex gap-3 p-3 border border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Confusing Mass and Weight</h4>
                    <p className="text-sm mt-1">Students often confuse mass (measured in kg) with weight (a force measured in N). Remember that F = ma uses mass, not weight.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 border border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Incorrect Force Diagrams</h4>
                    <p className="text-sm mt-1">When drawing force diagrams, ensure all forces acting on a body are included, and only those forces.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 border border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Ignoring Friction</h4>
                    <p className="text-sm mt-1">In real-world problems, friction often plays a significant role. Don't forget to account for it when it's relevant.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Previous Years Questions Tab */}
        <TabsContent value="previous-years" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Years Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border p-4 rounded-lg">
                  <div className="text-sm text-gray-500">JEE Main 2021</div>
                  <h4 className="font-medium mt-1">Question 1:</h4>
                  <p className="mt-2">A block of mass m is placed on a smooth inclined plane of angle θ with the horizontal. The force exerted by the inclined plane on the block is:</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button variant="outline">A. mg sin θ</Button>
                    <Button variant="outline">B. mg cos θ</Button>
                    <Button variant="outline">C. mg</Button>
                    <Button variant="outline">D. mg cos θ perpendicular to the plane</Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <div className="text-sm text-gray-500">NEET 2020</div>
                  <h4 className="font-medium mt-1">Question 2:</h4>
                  <p className="mt-2">When a car takes a sharp turn on a horizontal road, the passengers feel a force pushing them away from the center of the curve. This apparent force is an example of:</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button variant="outline">A. Centripetal force</Button>
                    <Button variant="outline">B. Centrifugal force</Button>
                    <Button variant="outline">C. Gravitational force</Button>
                    <Button variant="outline">D. Frictional force</Button>
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
              <CardDescription>Test your memory of this concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Your Recall Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Retention</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Application</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2 mt-1" />
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Start Recall Test</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Personalized insights based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Learning Style Match</h3>
                  </div>
                  <p className="text-sm">Your visual learning style matches well with the diagrams in this concept. Spend extra time on the visual representations to reinforce your understanding.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">Strength Area</h3>
                  </div>
                  <p className="text-sm">You've demonstrated strong understanding of vector problems. Apply this strength to the force problems in Newton's Laws.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium">Knowledge Gap</h3>
                  </div>
                  <p className="text-sm">You may need additional practice with problems involving multiple forces and resultant acceleration. Focus on the examples that involve force resolution.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full h-fit">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Related Concepts</h4>
                    <p className="text-sm mt-1">After mastering Newton's Laws, we recommend studying:</p>
                    <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                      <li>Work, Energy, and Power</li>
                      <li>Circular Motion</li>
                      <li>Gravitation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full h-fit">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Study Method</h4>
                    <p className="text-sm mt-1">Try the Feynman Technique: Explain Newton's Laws in your own simple words as if teaching someone else. This will highlight any areas you don't fully understand.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full h-fit">
                    <Calculator className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Practice Strategy</h4>
                    <p className="text-sm mt-1">Solve at least 5 problems for each law, gradually increasing in difficulty. Focus especially on problems that combine multiple laws.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* My Notes Tab */}
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
                <Button onClick={() => toast({ title: "Notes saved", description: "Your notes have been saved successfully" })}>
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
