
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, CheckCircle, Clock, Bookmark, ArrowLeft, FileCheck, Brain } from 'lucide-react';
import { ConceptCard } from '@/types/user/conceptCard';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data fetch function - in a real app, this would come from an API
const fetchConceptById = async (conceptId: string): Promise<ConceptCard> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    id: conceptId,
    title: "Newton's Laws of Motion",
    description: "The fundamental principles that describe the relationship between the motion of an object and the forces acting on it.",
    subject: "Physics",
    chapter: "Mechanics",
    difficulty: "medium",
    content: "Newton's laws of motion are three physical laws that describe the relationship between the motion of an object and the forces acting on it. These laws are fundamental to classical mechanics.",
    examples: [
      "First Law Example: A book on a table remains at rest unless pushed. When pushed, it moves in the direction of the force applied.",
      "Second Law Example: A cart accelerates in proportion to the force applied to it. If the mass is doubled, the acceleration is halved for the same force.",
      "Third Law Example: When a swimmer pushes water backward, the water pushes the swimmer forward with equal force."
    ],
    commonMistakes: [
      "Confusing mass and weight",
      "Failing to account for all forces in a system",
      "Misapplying the third law by not identifying correct action-reaction pairs"
    ],
    examRelevance: "High - frequently tested in both theoretical and numerical problems",
    progress: 65,
    completed: false,
    bookmarked: true
  };
};

const ConceptCardStudyPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (!conceptId) {
      navigate('/dashboard/student/concepts');
      return;
    }
    
    const loadConceptData = async () => {
      try {
        setLoading(true);
        const data = await fetchConceptById(conceptId);
        setConcept(data);
        
        // Load saved notes if they exist
        const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
        if (savedNotes) {
          setNotes(savedNotes);
        }
      } catch (error) {
        console.error("Error loading concept:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConceptData();
  }, [conceptId, navigate]);

  const handleBackToConcepts = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleStartStudy = () => {
    // In a real application, this would start a guided study session
    setActiveTab('content');
  };
  
  const handleSaveNotes = () => {
    if (conceptId) {
      localStorage.setItem(`concept-notes-${conceptId}`, notes);
    }
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
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
      <SharedPageLayout 
        title="Loading Concept" 
        subtitle="Please wait while we load the concept details"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!concept) {
    return (
      <SharedPageLayout 
        title="Concept Not Found" 
        subtitle="The requested concept could not be found"
      >
        <Button 
          variant="outline" 
          className="flex gap-2 items-center mb-4" 
          onClick={handleBackToConcepts}
        >
          <ArrowLeft size={16} />
          Back to Concepts
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Concept not found</h2>
          <p className="text-muted-foreground mt-2">The concept you're looking for doesn't exist or has been removed.</p>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter || 'General'}`}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="flex gap-2 items-center mb-4" 
          onClick={handleBackToConcepts}
        >
          <ArrowLeft size={16} />
          Back to Concepts
        </Button>

        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
          {concept.chapter && (
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {concept.chapter}
            </Badge>
          )}
          <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
            {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
          </Badge>
          {concept.bookmarked && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              <Bookmark className="h-3 w-3 mr-1" />
              Bookmarked
            </Badge>
          )}
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
                <span className="text-sm font-medium">{concept.progress || 0}%</span>
              </div>
              <Progress value={concept.progress || 0} className="h-2" />
            </div>
            {concept.examRelevance && (
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <FileCheck className="h-4 w-4" />
                <span>Exam Relevance: {concept.examRelevance}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={handleStartStudy}
            >
              Start Studying
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
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
                <p>{concept.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Common Mistakes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {concept.commonMistakes?.map((mistake, index) => (
                          <li key={index}>{mistake}</li>
                        )) || (
                          <li>No common mistakes recorded for this concept</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Exam Relevance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{concept.examRelevance || "Exam relevance information not available"}</p>
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
                    <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                    <p>{concept.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {concept.examples?.map((example, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium">Example {index + 1}</h4>
                      <p className="mt-1">{example}</p>
                    </div>
                  )) || (
                    <p>No examples available for this concept.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quiz" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Test your understanding of {concept.title} with this quick assessment.</p>
                <Button size="lg" className="w-full">Start Assessment</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
                <CardDescription>Take notes as you study this concept</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="w-full min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your notes here..."
                  value={notes}
                  onChange={handleNotesChange}
                ></textarea>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardStudyPage;
