
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BookOpen, 
  BookMarked, 
  BarChart2, 
  Lightbulb, 
  File, 
  VolumeX, 
  Volume2, 
  Link, 
  PlaySquare, 
  Layers, 
  BrainCircuit, 
  PencilLine, 
  Bookmark, 
  Star, 
  CheckCircle, 
  XCircle
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import SharedPageLayout from '../SharedPageLayout';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for concept details
const CONCEPT_MOCK_DATA = {
  id: 'concept-1',
  title: 'Newton\'s Laws of Motion',
  subject: 'Physics',
  chapter: 'Mechanics',
  difficulty: 'Medium',
  essentialFor: ['NEET', 'JEE'],
  masteryLevel: 68,
  lastPracticed: '2023-05-12',
  recallStrength: 72,
  content: `
    <h2>First Law of Motion (Law of Inertia)</h2>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.</p>
    <p>This property of objects to resist changes to their state of motion is called inertia.</p>
    
    <h2>Second Law of Motion</h2>
    <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    <p>Mathematically: F = ma, where:</p>
    <ul>
      <li>F is the net force applied (in Newtons)</li>
      <li>m is the mass of the object (in kilograms)</li>
      <li>a is the acceleration (in meters per second squared)</li>
    </ul>
    
    <h2>Third Law of Motion</h2>
    <p>For every action, there is an equal and opposite reaction.</p>
    <p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
  `,
  formulas: [
    { id: 'f1', expression: 'F = ma', description: 'Net force equals mass times acceleration' },
    { id: 'f2', expression: 'p = mv', description: 'Momentum equals mass times velocity' },
    { id: 'f3', expression: 'F₁ = -F₂', description: 'Action and reaction forces are equal and opposite' }
  ],
  relatedConcepts: [
    { id: 'concept-2', title: 'Conservation of Momentum' },
    { id: 'concept-3', title: 'Friction' },
    { id: 'concept-4', title: 'Circular Motion' },
  ],
  practiceExams: [
    { id: 'exam-1', title: 'Newton\'s Laws Basic Quiz', questions: 5, difficulty: 'Easy' },
    { id: 'exam-2', title: 'Advanced Applications', questions: 10, difficulty: 'Hard' },
  ],
  flashcards: [
    { id: 'flash-1', front: 'State Newton\'s First Law of Motion', back: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.' },
    { id: 'flash-2', front: 'What is F = ma?', back: 'Newton\'s Second Law of Motion: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.' },
  ],
  performanceData: {
    quizAttempts: [
      { date: '2023-04-10', score: 60, timeSpent: '4:30' },
      { date: '2023-04-25', score: 75, timeSpent: '3:45' },
      { date: '2023-05-12', score: 85, timeSpent: '3:15' },
    ],
    weakAreas: [
      { topic: 'Applications of Third Law', confidence: 55 },
      { topic: 'Complex Problems with Multiple Forces', confidence: 62 },
    ],
    strongAreas: [
      { topic: 'Basic Definitions', confidence: 95 },
      { topic: 'Simple Force Calculations', confidence: 88 },
    ],
    lastStudySession: '2023-05-12',
    recommendedNextTopics: [
      'Practice complex problems involving multiple forces',
      'Review applications of Newton\'s Third Law in everyday situations'
    ]
  }
};

const ConceptCardDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speakMessage, isSpeaking, toggleMute } = useVoiceAnnouncer();
  
  // States
  const [concept, setConcept] = useState(CONCEPT_MOCK_DATA);
  const [userNotes, setUserNotes] = useState<string>(localStorage.getItem(`concept-notes-${conceptId}`) || '');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("content");
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real app, fetch the concept data based on conceptId
    console.log(`Loading concept with ID: ${conceptId}`);
    
    // For now, we're using mock data
    // In a real application, you would fetch data here
  }, [conceptId]);
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
  }, [userNotes, conceptId]);
  
  const handleBackClick = () => {
    navigate('/dashboard/student/concepts');
  };
  
  const handleReadAloud = () => {
    if (isReadingAloud) {
      toggleMute(true);
      setIsReadingAloud(false);
    } else {
      if (contentRef.current) {
        const textToRead = contentRef.current.innerText;
        speakMessage(`Reading ${concept.title}: ${textToRead}`);
        setIsReadingAloud(true);
        
        // Set reading state to false when speech ends
        document.addEventListener('voice-speaking-ended', () => {
          setIsReadingAloud(false);
        }, { once: true });
      }
    }
  };
  
  const handleOpenFlashcards = () => {
    toast({
      title: "Flashcards",
      description: "Opening flashcard practice for this concept",
    });
    // In a real app, this would navigate to a flashcards view or open a modal
  };
  
  const handleOpenPracticeExam = () => {
    toast({
      title: "Practice Exam",
      description: "Starting a practice exam for this concept",
    });
    // In a real app, this would navigate to an exam view
  };
  
  const handleLinkedConcepts = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  const ExtraHeaderContent = () => (
    <div className="flex items-center gap-2 mt-2 lg:mt-0">
      <Button 
        size="sm" 
        variant={isReadingAloud ? "destructive" : "default"}
        onClick={handleReadAloud}
        className="flex items-center gap-1.5"
      >
        {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {isReadingAloud ? "Stop Reading" : "Read Aloud"}
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => setActiveTab("notes")} className="flex items-center gap-1.5">
        <PencilLine className="h-4 w-4" />
        My Notes
      </Button>
    </div>
  );
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.chapter}`}
      showBackButton={true}
      extraHeaderContent={<ExtraHeaderContent />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Content Area - 8 columns on large screens */}
        <div className="lg:col-span-8 space-y-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="content" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="formulas" className="flex items-center gap-1.5">
                <File className="h-4 w-4" />
                <span className="hidden sm:inline">Formulas</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1.5">
                <PencilLine className="h-4 w-4" />
                <span className="hidden sm:inline">My Notes</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-1.5">
                <PlaySquare className="h-4 w-4" />
                <span className="hidden sm:inline">Practice</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1.5">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>
                    Read and understand the concept. Use the Read Aloud feature for auditory learning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={contentRef} 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: concept.content }} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Formulas Tab */}
            <TabsContent value="formulas" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Formulas</CardTitle>
                  <CardDescription>
                    Essential formulas related to {concept.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {concept.formulas.map((formula) => (
                      <div key={formula.id} className="border rounded-lg p-4">
                        <div className="text-xl font-mono text-center mb-2">{formula.expression}</div>
                        <p className="text-sm text-center text-muted-foreground">{formula.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Notes</CardTitle>
                  <CardDescription>
                    Take personal notes on this concept to enhance your understanding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your notes here..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <div className="mt-4 text-sm text-muted-foreground">
                    Notes are automatically saved as you type
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Practice Tab */}
            <TabsContent value="practice" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Resources</CardTitle>
                  <CardDescription>
                    Reinforce your understanding with these practice resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-primary/20 hover:border-primary/60 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Flashcards</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-4">
                          {concept.flashcards.length} flashcards available for quick recall practice
                        </p>
                        <Button onClick={handleOpenFlashcards} className="w-full">
                          Start Flashcard Practice
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-primary/20 hover:border-primary/60 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Practice Exams</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-4">
                          {concept.practiceExams.length} quizzes available to test your knowledge
                        </p>
                        <Button onClick={handleOpenPracticeExam} className="w-full">
                          Take Practice Exam
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Track your progress and mastery of this concept
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Mastery Level</h3>
                        <span className="text-lg font-bold">{concept.masteryLevel}%</span>
                      </div>
                      <Progress value={concept.masteryLevel} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Recall Strength</h3>
                        <span className="text-lg font-bold">{concept.recallStrength}%</span>
                      </div>
                      <Progress value={concept.recallStrength} className="h-2" />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Quiz Attempts</h3>
                      <div className="space-y-2">
                        {concept.performanceData.quizAttempts.map((attempt, index) => (
                          <div key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded">
                            <span>{attempt.date}</span>
                            <div className="flex items-center gap-4">
                              <Badge variant={attempt.score >= 80 ? "success" : "default"}>
                                {attempt.score}%
                              </Badge>
                              <span className="text-sm text-muted-foreground">{attempt.timeSpent}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar - 4 columns on large screens */}
        <div className="lg:col-span-4 space-y-4">
          {/* Mastery Card */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                Concept Mastery
                <Badge variant={concept.masteryLevel >= 80 ? "success" : "default"}>
                  {concept.masteryLevel}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={concept.masteryLevel} className="h-2 mb-4" />
              <div className="text-sm">
                Last studied: <span className="font-medium">{concept.lastPracticed}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ScrollArea className="max-h-[200px]">
                <div className="space-y-2">
                  {concept.relatedConcepts.map((relatedConcept) => (
                    <motion.button
                      key={relatedConcept.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLinkedConcepts(relatedConcept.id)}
                      className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded transition-colors text-left"
                    >
                      <Link className="h-4 w-4 flex-shrink-0" />
                      <span>{relatedConcept.title}</span>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* AI Insights */}
          <Card className="border-l-4 border-l-blue-400 dark:border-l-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-blue-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Weak Areas Detected</h4>
              <div className="space-y-2 mb-4">
                {concept.performanceData.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-2 rounded text-sm">
                    <span>{area.topic}</span>
                    <Badge variant="outline" className="bg-red-100 dark:bg-red-900/40">
                      {area.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
              
              <h4 className="font-medium mb-2">Strengths</h4>
              <div className="space-y-2 mb-4">
                {concept.performanceData.strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                    <span>{area.topic}</span>
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/40">
                      {area.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
              
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <AlertTitle>Recommended Focus</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {concept.performanceData.recommendedNextTopics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleOpenFlashcards} className="flex items-center justify-center gap-1.5">
                <Layers className="h-4 w-4" />
                Flashcards
              </Button>
              <Button variant="outline" size="sm" onClick={handleOpenPracticeExam} className="flex items-center justify-center gap-1.5">
                <PlaySquare className="h-4 w-4" />
                Practice
              </Button>
              <Button variant="outline" size="sm" onClick={handleReadAloud} className="flex items-center justify-center gap-1.5">
                {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isReadingAloud ? "Stop" : "Read"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("notes")} className="flex items-center justify-center gap-1.5">
                <PencilLine className="h-4 w-4" />
                Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
