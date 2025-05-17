
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { 
  Headphones, 
  BookOpen, 
  Layers3, 
  FileText, 
  BarChart2, 
  Link as LinkIcon,
  Info
} from "lucide-react";
import { motion } from 'framer-motion';
import { ConceptCard } from '@/types/user/conceptCard';

interface ConceptAnalytics {
  mastery: number;
  recall: number;
  attemptsHistory: { date: string; score: number }[];
  timeSpent: number;
  weakPoints: string[];
  strongPoints: string[];
  recommendedRevision: string[];
}

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speakMessage, isSpeaking, toggleMute } = useVoiceAnnouncer();
  
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [linkedConcepts, setLinkedConcepts] = useState<ConceptCard[]>([]);
  const [activeTab, setActiveTab] = useState("content");
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const [analytics, setAnalytics] = useState<ConceptAnalytics>({
    mastery: 75,
    recall: 68,
    attemptsHistory: [
      { date: "2025-05-02", score: 65 },
      { date: "2025-05-09", score: 72 },
      { date: "2025-05-15", score: 75 }
    ],
    timeSpent: 120, // minutes
    weakPoints: ["Reaction mechanisms", "Nomenclature rules"],
    strongPoints: ["Basic principles", "Element properties"],
    recommendedRevision: ["Review nomenclature", "Practice reaction balancing"]
  });
  
  useEffect(() => {
    console.log("ConceptCardDetailPage - Loading concept with ID:", conceptId);
    
    // Simulate fetching the concept data
    setLoading(true);
    setTimeout(() => {
      // Mock data for demonstration
      const mockConcept: ConceptCard = {
        id: conceptId || "concept-1",
        title: "Organic Chemistry Fundamentals",
        description: "This concept covers the foundational principles of organic chemistry including carbon bonding, functional groups, and basic reaction mechanisms. Understanding these principles is crucial for advanced topics in chemistry.",
        subject: "Chemistry",
        chapter: "Organic Chemistry",
        topic: "Chemical Bonding",
        difficulty: "medium",
        progress: 75,
        completed: false,
        content: `
          <h2>Introduction to Organic Chemistry</h2>
          <p>Organic chemistry is the study of carbon compounds. Carbon atoms can form stable covalent bonds with other carbon atoms and with atoms of other elements like hydrogen, oxygen, nitrogen, sulfur, and halogens.</p>
          
          <h2>Key Concepts</h2>
          <ul>
            <li>Carbon atoms form four covalent bonds</li>
            <li>Carbon can form single, double, or triple bonds</li>
            <li>Functional groups determine chemical properties</li>
            <li>Stereochemistry affects biological activity</li>
          </ul>
          
          <h2>Functional Groups</h2>
          <p>Functional groups are specific groups of atoms within molecules that are responsible for the chemical reactions of those molecules. Common functional groups include:</p>
          <ul>
            <li>Alcohols (-OH)</li>
            <li>Aldehydes (-CHO)</li>
            <li>Ketones (-CO-)</li>
            <li>Carboxylic acids (-COOH)</li>
            <li>Amines (-NH2)</li>
          </ul>
        `,
        examples: [
          "Methane (CH4) is the simplest organic compound",
          "Ethanol (C2H5OH) contains the alcohol functional group",
          "Acetic acid (CH3COOH) contains the carboxylic acid group"
        ],
        commonMistakes: [
          "Confusing structural isomers with stereoisomers",
          "Incorrectly identifying functional groups",
          "Forgetting to account for resonance structures"
        ],
        examRelevance: "High - appears in 75% of chemistry exams as fundamental knowledge",
        relatedConcepts: ["Isomerism", "Reaction Mechanisms", "Biochemistry Basics"]
      };
      
      setConcept(mockConcept);
      
      // Mock linked concepts
      const mockLinkedConcepts: ConceptCard[] = [
        {
          id: "concept-2",
          title: "Isomerism in Organic Chemistry",
          description: "Understanding different types of isomers and their properties",
          subject: "Chemistry",
          difficulty: "hard",
          progress: 60
        },
        {
          id: "concept-3",
          title: "Reaction Mechanisms",
          description: "Step-by-step processes of chemical reactions",
          subject: "Chemistry",
          difficulty: "hard",
          progress: 45
        },
        {
          id: "concept-4",
          title: "Biochemistry Basics",
          description: "Chemical processes in living organisms",
          subject: "Chemistry",
          difficulty: "medium",
          progress: 80
        }
      ];
      
      setLinkedConcepts(mockLinkedConcepts);
      
      // Load saved notes if any
      const savedNotes = localStorage.getItem(`notes-${conceptId}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      setLoading(false);
      
      toast({
        title: "Concept loaded",
        description: "Study materials are ready for you",
      });
    }, 1000);
  }, [conceptId, toast]);
  
  const handleSaveNotes = () => {
    localStorage.setItem(`notes-${conceptId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  const handleReadAloud = () => {
    if (!concept) return;
    
    if (isSpeaking) {
      toggleMute(true); // Stop speaking
      toast({
        title: "Reading stopped",
        description: "Voice reading has been stopped",
      });
      return;
    }
    
    const textToRead = `${concept.title}. ${concept.description} ${extractTextFromHTML(concept.content || '')}`;
    speakMessage(textToRead);
    
    toast({
      title: "Reading aloud",
      description: "Voice assistant is reading the content",
    });
  };
  
  const extractTextFromHTML = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  };
  
  const handlePracticeExam = () => {
    navigate(`/dashboard/student/practice-exam?topic=${concept?.topic}`);
    toast({
      title: "Practice exam",
      description: "Loading practice exam for this concept",
    });
  };
  
  const handleFlashcards = () => {
    navigate(`/dashboard/student/flashcards?topic=${concept?.topic}`);
    toast({
      title: "Flashcards",
      description: "Loading flashcards for this concept",
    });
  };
  
  const handleLinkedConcept = (id: string) => {
    navigate(`/dashboard/student/concepts/${id}`);
  };
  
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  const getMasteryBadgeColor = (mastery: number): string => {
    if (mastery >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (mastery >= 60) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (mastery >= 40) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };
  
  const getMasteryLabel = (mastery: number): string => {
    if (mastery >= 80) return 'Excellent';
    if (mastery >= 60) return 'Good';
    if (mastery >= 40) return 'Moderate';
    return 'Needs work';
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center animate-pulse">
          <h2 className="text-2xl font-semibold text-primary">Loading Concept</h2>
          <p className="text-muted-foreground mt-2">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  if (!concept) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Concept Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested concept could not be found</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/dashboard/student/concepts')}
          >
            Back to Concepts
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`${getDifficultyColor(concept?.difficulty || 'medium')} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
              {concept?.difficulty || 'Medium'}
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 rounded-full px-3 py-1 text-xs font-semibold">
              {concept?.subject || 'Subject'}
            </Badge>
            {concept?.chapter && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 rounded-full px-3 py-1 text-xs font-semibold">
                {concept.chapter}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{concept?.title || 'Loading...'}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{concept?.description || 'Loading description...'}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 lg:mt-0">
          <Button 
            onClick={handleReadAloud}
            variant="outline" 
            className="flex items-center gap-2 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Headphones className="h-4 w-4" />
            {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          </Button>
          
          <Button 
            onClick={handleSaveNotes}
            variant="outline" 
            className="flex items-center gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <BookOpen className="h-4 w-4" />
            Save Notes
          </Button>
        </div>
      </div>
      
      {/* Progress tracking */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span>Progress</span>
          <span className="text-indigo-600 dark:text-indigo-400">{concept?.progress || 0}%</span>
        </div>
        <Progress 
          value={concept?.progress || 0} 
          className="h-2 bg-gray-100 dark:bg-gray-800" 
          indicatorClassName={
            (concept?.progress || 0) >= 80 ? "bg-gradient-to-r from-green-400 to-green-500" :
            (concept?.progress || 0) >= 40 ? "bg-gradient-to-r from-blue-400 to-blue-500" :
            "bg-gradient-to-r from-amber-400 to-amber-500"
          }
        />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div 
                    className="prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: concept?.content || 'No content available' }} 
                  />
                  
                  {concept?.examples && concept.examples.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Examples</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {concept.examples.map((example, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {concept?.commonMistakes && concept.commonMistakes.length > 0 && (
                    <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h3 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-300">Common Mistakes to Avoid</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {concept.commonMistakes.map((mistake, index) => (
                          <li key={index} className="text-amber-700 dark:text-amber-300">{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {concept?.examRelevance && (
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Exam Relevance</h3>
                      <p className="text-blue-700 dark:text-blue-300">{concept.examRelevance}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>My Study Notes</CardTitle>
                  <CardDescription>
                    Take personal notes on this concept. Your notes are automatically saved when you click "Save Notes".
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    ref={notesRef}
                    placeholder="Write your notes here..." 
                    className="min-h-[300px] p-4" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotes} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Notes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Analytics</CardTitle>
                  <CardDescription>
                    Track your progress and understanding of this concept
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-center mb-1">{analytics.mastery}%</div>
                      <div className="text-sm text-center text-muted-foreground">Mastery Level</div>
                      <Badge className={`${getMasteryBadgeColor(analytics.mastery)} mt-2 mx-auto block w-fit`}>
                        {getMasteryLabel(analytics.mastery)}
                      </Badge>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-center mb-1">{analytics.recall}%</div>
                      <div className="text-sm text-center text-muted-foreground">Recall Strength</div>
                      <Badge className={`${getMasteryBadgeColor(analytics.recall)} mt-2 mx-auto block w-fit`}>
                        {getMasteryLabel(analytics.recall)}
                      </Badge>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-center mb-1">{analytics.attemptsHistory.length}</div>
                      <div className="text-sm text-center text-muted-foreground">Practice Attempts</div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 mt-2 mx-auto block w-fit">
                        Last: {analytics.attemptsHistory[analytics.attemptsHistory.length - 1]?.date}
                      </Badge>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Study Time</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You've spent <span className="font-medium text-primary">{analytics.timeSpent} minutes</span> studying this concept
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">Weak Points</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {analytics.weakPoints.map((point, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Strong Points</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {analytics.strongPoints.map((point, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300">Revision Suggestions</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {analytics.recommendedRevision.map((suggestion, index) => (
                        <li key={index} className="text-blue-700 dark:text-blue-300">{suggestion}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300">Weak Links Detected</h3>
                      <p className="text-blue-700 dark:text-blue-300">
                        Your understanding of reaction mechanisms seems to impact your performance in related concepts. 
                        Focus on strengthening this fundamental knowledge to improve your overall performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Additional resources and related content */}
        <div className="space-y-6">
          {/* Action buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Study Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                onClick={handleFlashcards}
              >
                <Layers3 className="h-4 w-4 mr-2" />
                Interactive Flashcards
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-800 border-green-200"
                onClick={handlePracticeExam}
              >
                <FileText className="h-4 w-4 mr-2" />
                Practice Exam
              </Button>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Performance Analytics</h3>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Linked concepts */}
          {linkedConcepts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {linkedConcepts.map((relatedConcept) => (
                    <motion.div
                      key={relatedConcept.id}
                      whileHover={{ x: 5 }}
                      className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => handleLinkedConcept(relatedConcept.id)}
                    >
                      <div className="flex items-start gap-2">
                        <LinkIcon className="h-4 w-4 mt-1 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-sm">{relatedConcept.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{relatedConcept.description}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={`${getDifficultyColor(relatedConcept.difficulty)} text-xs px-2 py-0.5`}>
                              {relatedConcept.difficulty}
                            </Badge>
                            
                            {relatedConcept.progress !== undefined && (
                              <div className="text-xs text-muted-foreground">
                                {relatedConcept.progress}% complete
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
