
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Video, Lightbulb, Calculator, List, CheckSquare } from 'lucide-react';
import ConceptOverviewTab from './ConceptOverviewTab';
import ConceptNotesTab from './ConceptNotesTab';
import ConceptVideoTab from './ConceptVideoTab';
import ConceptQuizTab from './ConceptQuizTab';
import ConceptFormulaTab from './ConceptFormulaTab';
import FormulaLabComponent from '../formula-lab/FormulaLabComponent';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [concept, setConcept] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch the concept card data from an API
    const fetchConcept = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock data
        setConcept({
          id,
          title: 'Newton\'s Laws of Motion',
          subject: 'Physics',
          topic: 'Mechanics',
          description: 'The foundation of classical mechanics, Newton\'s three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
          masteryLevel: 65,
          lastPracticed: '2023-05-10T14:30:00Z',
          timeSuggestion: 45,
          hasFormulas: true,
          hasVideos: true,
          hasQuizzes: true,
          examReady: false,
          bookmarked: true,
          progress: 65,
          formulaList: [
            { id: 'f1', name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
            { id: 'f2', name: "Momentum", formula: "p = mv", description: "Momentum equals mass times velocity" }
          ],
          videoList: [
            { id: 'v1', title: "Introduction to Newton's Laws", duration: "8:24", thumbnail: "https://i.imgur.com/7CbcBtJ.png" },
            { id: 'v2', title: "Newton's First Law Explained", duration: "12:15", thumbnail: "https://i.imgur.com/NKQfpLF.png" }
          ]
        });
        setLoading(false);
      }, 600);
    };
    
    fetchConcept();
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleGoToFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${id}/formula-lab`);
  };
  
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-violet-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading concept details...</p>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="p-8 text-center">
        <p>Concept not found</p>
        <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{concept.title}</h1>
          <p className="text-sm text-muted-foreground">
            {concept.subject} • {concept.topic}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Concept Progress</CardTitle>
            <Badge variant={concept.examReady ? "default" : "outline"} className={concept.examReady ? "bg-green-500" : ""}>
              {concept.examReady ? "Exam Ready" : "In Progress"}
            </Badge>
          </div>
          <CardDescription>Your mastery of this concept</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Mastery Level</span>
              <span className="text-sm font-bold">{concept.masteryLevel}%</span>
            </div>
            <Progress value={concept.masteryLevel} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Last Practiced</p>
              <p className="font-medium">
                {new Date(concept.lastPracticed).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Suggested Time</p>
              <p className="font-medium">{concept.timeSuggestion} min</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg hidden md:block">
              <p className="text-muted-foreground text-xs mb-1">Progress</p>
              <p className="font-medium">{concept.progress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex items-center gap-1">
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-1">
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Quizzes</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <ConceptOverviewTab concept={concept} />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <ConceptNotesTab conceptId={concept.id} />
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <ConceptVideoTab videos={concept.videoList} />
        </TabsContent>
        
        <TabsContent value="formulas" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formula Practice</CardTitle>
              <CardDescription>
                Master the formulas through interactive practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConceptFormulaTab formulas={concept.formulaList} />
              
              <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Formula Practice Lab</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Practice solving problems using these formulas in our interactive lab.
                    </p>
                    <Button onClick={handleGoToFormulaLab} className="bg-gradient-to-r from-violet-600 to-indigo-600">
                      Open Formula Lab
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="mt-0">
          <ConceptQuizTab conceptId={concept.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;
