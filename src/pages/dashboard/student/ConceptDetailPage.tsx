
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Calculator, FlaskRound, BookText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NotesTabContent from "@/components/dashboard/student/concepts/NotesTabContent";
import QuizTabContent from "@/components/dashboard/student/concepts/QuizTabContent";
import ResourcesTabContent from "@/components/dashboard/student/concepts/ResourcesTabContent";
import FormulaTabContent from "@/components/dashboard/student/concepts/FormulaTabContent";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import { conceptsData } from "@/components/dashboard/student/concepts/conceptsData";
import { Concept } from "@/types/student/concept";
import { Progress } from "@/components/ui/progress";
import MathJax from "@/components/common/MathJax";

const ConceptDetailPage: React.FC = () => {
  const { toast } = useToast();
  const { id, conceptId } = useParams();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching concept by id
    const fetchedConcept = conceptsData.find(c => c.id === id || c.id === conceptId);
    
    if (fetchedConcept) {
      setConcept(fetchedConcept);
      setProgress(fetchedConcept.progressPercentage || 0);
    } else {
      // If concept not found, redirect to concepts list
      toast({
        title: "Concept not found",
        description: "The concept you're looking for doesn't exist or has been moved.",
        variant: "destructive",
      });
      navigate("/dashboard/student/concepts");
    }
  }, [id, conceptId, navigate, toast]);

  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleNavigateToFormulaPractice = () => {
    navigate(`/dashboard/student/concepts/${concept?.id}/formula-lab`);
  };

  // Placeholder concept if real one is still loading
  const placeholderConcept = {
    id: "loading",
    title: "Loading concept...",
    description: "Please wait while we load the concept details.",
    content: "Loading...",
    category: "Loading",
    difficulty: "medium",
    estimatedTime: "? min",
    tags: ["loading"],
  } as Concept;

  const currentConcept = concept || placeholderConcept;

  return (
    <SharedPageLayout
      title={currentConcept.title}
      subtitle={currentConcept.description}
      backAction={handleGoBack}
    >
      <div className="space-y-6">
        {/* Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium">{currentConcept.category}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{currentConcept.estimatedTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-24 h-2" />
                  <span className="text-xs text-muted-foreground">{progress}% complete</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/concepts')}>
                  View All Concepts
                </Button>
                {currentConcept.hasFormulaLab && (
                  <Button size="sm" onClick={handleNavigateToFormulaPractice}>
                    <FlaskRound className="mr-2 h-4 w-4" />
                    Open Formula Lab
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concept Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="formula">Formulas</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Concept Overview</CardTitle>
                <CardDescription>
                  Master this concept to improve your understanding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Key Points</h3>
                  <div className="pl-4 border-l-2 border-primary/50 space-y-3">
                    {currentConcept.keyPoints?.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <MathJax>{point}</MathJax>
                      </div>
                    )) || (
                      <p>No key points available for this concept.</p>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Concept Description</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <MathJax>{currentConcept.content}</MathJax>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {currentConcept.tags?.map((tag, i) => (
                    <div 
                      key={i} 
                      className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-md text-xs"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <NotesTabContent conceptId={currentConcept.id} />
          </TabsContent>
          
          <TabsContent value="quiz">
            <QuizTabContent concept={currentConcept} />
          </TabsContent>
          
          <TabsContent value="formula">
            <FormulaTabContent 
              conceptName={currentConcept.title} 
              formulas={currentConcept.formulas}
              onNavigateToFormulaPractice={handleNavigateToFormulaPractice}
            />
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourcesTabContent conceptId={currentConcept.id} />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
