import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, Calculator } from 'lucide-react';
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
        <TabsList className="grid grid-cols-3 md:grid-cols-5 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
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
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Content</CardTitle>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Check your understanding of Newton's Laws with these questions.</p>
              <Button className="w-full">Start Quiz</Button>
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
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;
