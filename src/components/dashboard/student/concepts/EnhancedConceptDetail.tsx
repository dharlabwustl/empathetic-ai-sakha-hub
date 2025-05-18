
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle, 
  Star, 
  Flag, 
  MessageSquare, 
  Brain, 
  ArrowLeft, 
  Clock, 
  CheckSquare, 
  ChevronRight, 
  PlayCircle, 
  PauseCircle, 
  Volume2, 
  VolumeX,
  BookmarkPlus,
  AlertCircle
} from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';

// Mock concept data
const CONCEPT_DATA = {
  id: "concept-1",
  title: "Newton's Laws of Motion",
  subject: "Physics",
  description: "Understanding the fundamental principles that govern the motion of objects and the forces acting upon them.",
  difficulty: "medium" as const,
  completionPercentage: 35,
  masteryLevel: 42,
  timeEstimate: "30 min",
  objectives: [
    "Understand and explain Newton's three laws of motion",
    "Apply Newton's laws to solve problems involving forces and motion",
    "Analyze real-world scenarios using Newton's laws",
    "Calculate force, mass, and acceleration using F=ma"
  ],
  content: "Newton's laws of motion are three physical laws that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws laid the foundation for classical mechanics and revolutionized our understanding of physics.\n\nThe first law states that an object at rest will stay at rest, and an object in motion will stay in motion with the same speed and direction, unless acted upon by an unbalanced force.\n\nThe second law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is often written as F=ma where F is the net force, m is the mass, and a is the acceleration.\n\nThe third law states that for every action, there is an equal and opposite reaction. This means that if object A exerts a force on object B, then object B exerts a force of equal magnitude but in the opposite direction on object A.",
  videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds",
  resourceLinks: [
    { title: "Khan Academy: Newton's Laws", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws" },
    { title: "Physics Classroom: Newton's Laws", url: "https://www.physicsclassroom.com/class/newtlaws" },
    { title: "MIT OpenCourseWare: Classical Mechanics", url: "https://ocw.mit.edu/courses/physics/8-01sc-classical-mechanics-fall-2016/" }
  ],
  formulas: [
    { name: "Newton's Second Law", formula: "F = ma", variables: "F = force, m = mass, a = acceleration" },
    { name: "Weight", formula: "W = mg", variables: "W = weight, m = mass, g = gravitational acceleration" },
    { name: "Friction Force", formula: "F_f = μN", variables: "F_f = friction force, μ = friction coefficient, N = normal force" }
  ],
  practiceQuestions: [
    {
      id: "q1",
      question: "A 2 kg object is subject to a force of 5 N. What is its acceleration?",
      options: ["2.5 m/s²", "10 m/s²", "0.4 m/s²", "5 m/s²"],
      correctAnswer: 0,
      explanation: "Using Newton's Second Law (F = ma), we can solve for acceleration: a = F/m = 5N/2kg = 2.5 m/s²"
    },
    {
      id: "q2",
      question: "Which of Newton's laws best explains why passengers in a car feel pushed back into their seats when the car accelerates forward?",
      options: ["First Law", "Second Law", "Third Law", "Law of Conservation of Momentum"],
      correctAnswer: 0,
      explanation: "This is due to Newton's First Law (inertia). The body resists the change in motion and feels pushed back relative to the accelerating car."
    }
  ],
  relatedConcepts: [
    { id: "concept-2", title: "Momentum and Impulse", subject: "Physics" },
    { id: "concept-3", title: "Work and Energy", subject: "Physics" },
    { id: "concept-4", title: "Circular Motion", subject: "Physics" }
  ],
  relatedFlashcards: [
    { id: "flashcard-1", title: "Newton's Laws Basics", count: 10 },
    { id: "flashcard-2", title: "Force and Motion", count: 15 }
  ],
  relatedExams: [
    { id: "exam-1", title: "Physics Mechanics Test", questionsCount: 25 },
    { id: "exam-2", title: "Newton's Laws Quiz", questionsCount: 10 }
  ]
};

interface EnhancedConceptDetailProps {
  conceptId: string;
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({ conceptId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept, setConcept] = useState(CONCEPT_DATA);
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisUtterance | null>(null);
  const [showAskDoubtDialog, setShowAskDoubtDialog] = useState(false);
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Fetch concept data based on conceptId
  useEffect(() => {
    console.log(`Loading concept data for ID: ${conceptId}`);
    // In a real app, you would fetch the concept data here
    // For now, we're using the mock data
  }, [conceptId]);
  
  // Handle text-to-speech functionality
  const handleReadAloud = (text: string | string[]) => {
    // If already speaking, stop current speech
    if (isSpeaking && currentVoice) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentVoice(null);
      return;
    }
    
    // Convert array to string if needed
    const contentToSpeak = typeof text === 'string' ? text : text.join(' ');
    
    const utterance = new SpeechSynthesis.utterance(contentToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentVoice(null);
    };
    
    setIsSpeaking(true);
    setCurrentVoice(utterance);
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Reading Content",
      description: "Text-to-speech activated. Click again to stop."
    });
  };
  
  // Handle answering practice questions
  const handleAnswerQuestion = (questionId: string, selectedOption: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };
  
  // Check answer and show feedback
  const checkAnswer = (questionId: string) => {
    const question = concept.practiceQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = answers[questionId] === question.correctAnswer;
    
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect ? "Great job! Your answer is correct." : "Try again. Review the explanation for help.",
      variant: isCorrect ? "default" : "destructive"
    });
    
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
  };
  
  // Handle adding a note
  const handleAddNote = () => {
    if (noteContent.trim()) {
      setNotes(prev => [...prev, noteContent.trim()]);
      setNoteContent("");
      
      toast({
        title: "Note Added",
        description: "Your note has been saved successfully."
      });
    }
  };
  
  // Handle toggling bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Bookmark Added",
      description: isBookmarked 
        ? "Concept removed from your bookmarks." 
        : "Concept added to your bookmarks for easy access."
    });
  };
  
  // Handle toggling flag for revision
  const handleToggleFlag = () => {
    setIsFlagged(prev => !prev);
    
    toast({
      title: isFlagged ? "Flag Removed" : "Flagged for Revision",
      description: isFlagged 
        ? "Concept removed from your revision list." 
        : "Concept added to your revision list."
    });
  };
  
  // Handle submitting a doubt to AI tutor
  const handleSubmitDoubt = () => {
    if (!doubtQuestion.trim()) return;
    
    setIsSubmittingDoubt(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmittingDoubt(false);
      setShowAskDoubtDialog(false);
      
      toast({
        title: "Doubt Submitted",
        description: "Your question has been sent to the AI tutor. Check your notifications for the response."
      });
      
      setDoubtQuestion("");
    }, 1500);
  };
  
  // Navigate to related concept
  const handleNavigateToRelatedConcept = (relatedConceptId: string) => {
    navigate(`/dashboard/student/concepts/${relatedConceptId}`);
  };
  
  // Navigate to flashcards
  const handleNavigateToFlashcards = (flashcardSetId: string) => {
    navigate(`/dashboard/student/flashcards?setId=${flashcardSetId}`);
  };
  
  // Navigate to practice exams
  const handleNavigateToExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam?examId=${examId}`);
  };
  
  // Go back
  const handleGoBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  // Format content for better readability
  const formattedContent = concept.content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4">{paragraph}</p>
  ));
  
  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (concept.difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} concept`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <Helmet>
        <title>{concept.title} - PREPZR</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Concept header with key info */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <Breadcrumb className="mb-2">
              <BreadcrumbItem>
                <BreadcrumbLink onClick={handleGoBack}>Concepts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>{concept.subject}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{concept.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`${getDifficultyColor()} capitalize`}>
                {concept.difficulty}
              </Badge>
              <Badge variant="secondary">
                <Clock className="h-3.5 w-3.5 mr-1" /> {concept.timeEstimate}
              </Badge>
              {isBookmarked && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  <Star className="h-3.5 w-3.5 mr-1 fill-amber-500" /> Bookmarked
                </Badge>
              )}
              {isFlagged && (
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  <Flag className="h-3.5 w-3.5 mr-1 fill-purple-200" /> Flagged for Revision
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleToggleBookmark}>
              <Star className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleToggleFlag}>
              <Flag className={`h-4 w-4 mr-2 ${isFlagged ? 'fill-purple-200 text-purple-500' : ''}`} />
              {isFlagged ? 'Flagged' : 'Flag for Revision'}
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => setShowAskDoubtDialog(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Doubt
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleReadAloud(concept.content)}>
              {isSpeaking ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
              {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
            </Button>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Completion progress</span>
              <span className="font-medium">{concept.completionPercentage}%</span>
            </div>
            <Progress value={concept.completionPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Mastery level</span>
              <span className="font-medium">{concept.masteryLevel}%</span>
            </div>
            <Progress value={concept.masteryLevel} className="h-2" 
              className={
                concept.masteryLevel >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
                concept.masteryLevel >= 60 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                concept.masteryLevel >= 40 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                'bg-gradient-to-r from-gray-400 to-gray-500'
              }
            />
          </div>
        </div>
      
        {/* Main tabbed content */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:grid-cols-10 max-w-full overflow-auto">
            <TabsTrigger value="overview" className="col-span-1 md:col-span-2">
              <BookOpen className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="col-span-1 md:col-span-2">
              <Video className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="col-span-1 md:col-span-2">
              <FileText className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="col-span-1 md:col-span-2">
              <MessageSquare className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="related" className="col-span-1 md:col-span-2">
              <Brain className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Related</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
                <CardDescription>
                  What you'll learn from this concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {concept.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Concept Content</CardTitle>
                <CardDescription>
                  Read and understand the key principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={contentRef} className="prose dark:prose-invert max-w-none">
                  {formattedContent}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReadAloud(concept.content)}>
                    {isSpeaking ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
                    {isSpeaking ? 'Pause' : 'Read Aloud'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Formulas</CardTitle>
                <CardDescription>
                  Key equations and formulas to remember
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.formulas.map((formula, index) => (
                    <div key={index} className="bg-muted/40 p-4 rounded-lg">
                      <div className="font-semibold">{formula.name}</div>
                      <div className="text-lg my-2 font-mono bg-muted p-2 rounded text-center">
                        {formula.formula}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Where: </span>
                        {formula.variables}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Video lesson tab */}
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Video Lesson</CardTitle>
                <CardDescription>
                  Visual explanation of the concept
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={concept.videoUrl} 
                    title="Concept video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Resources</h3>
                  <ul className="space-y-2">
                    {concept.resourceLinks.map((resource, index) => (
                      <li key={index}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice questions tab */}
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>
                  Test your understanding of the concept
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {concept.practiceQuestions.map((question, questionIndex) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="font-medium mb-2">
                      {questionIndex + 1}. {question.question}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            answers[question.id] === optionIndex 
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleAnswerQuestion(question.id, optionIndex)}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                              answers[question.id] === optionIndex
                                ? 'border-primary bg-primary/10'
                                : 'border-muted-foreground'
                            }`}>
                              {answers[question.id] === optionIndex && 
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              }
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="outline"
                        onClick={() => checkAnswer(question.id)}
                        disabled={answers[question.id] === undefined}
                      >
                        Check Answer
                      </Button>
                      
                      {showFeedback[question.id] && (
                        <Badge
                          className={answers[question.id] === question.correctAnswer 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }
                        >
                          {answers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                        </Badge>
                      )}
                    </div>
                    
                    {showFeedback[question.id] && (
                      <div className={`mt-4 p-3 rounded-md ${
                        answers[question.id] === question.correctAnswer 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <div className="font-medium mb-1">Explanation:</div>
                        <div className="text-sm">{question.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
                <CardDescription>
                  Add and manage your notes for this concept
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-1 font-medium">Add a new note</div>
                  <Textarea 
                    placeholder="Enter your notes here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button className="mt-2" onClick={handleAddNote}>
                    Add Note
                  </Button>
                </div>
                
                <div>
                  <div className="font-medium mb-2">Your saved notes</div>
                  
                  {notes.length > 0 ? (
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-3">
                        {notes.map((note, index) => (
                          <div key={index} className="bg-muted/40 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div className="text-sm text-muted-foreground">Note {index + 1}</div>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                Edit
                              </Button>
                            </div>
                            <div className="mt-1">{note}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No notes yet. Add your first note above.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Related materials tab */}
          <TabsContent value="related">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Related Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {concept.relatedConcepts.map((relatedConcept) => (
                    <div 
                      key={relatedConcept.id}
                      className="border rounded-md p-3 mb-3 hover:bg-muted/50 cursor-pointer transition-all"
                      onClick={() => handleNavigateToRelatedConcept(relatedConcept.id)}
                    >
                      <div className="font-medium">{relatedConcept.title}</div>
                      <div className="text-sm text-muted-foreground">{relatedConcept.subject}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Related Flashcards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {concept.relatedFlashcards.map((flashcardSet) => (
                    <div 
                      key={flashcardSet.id}
                      className="border rounded-md p-3 mb-3 hover:bg-muted/50 cursor-pointer transition-all"
                      onClick={() => handleNavigateToFlashcards(flashcardSet.id)}
                    >
                      <div className="font-medium">{flashcardSet.title}</div>
                      <div className="text-sm text-muted-foreground">{flashcardSet.count} cards</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Practice Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {concept.relatedExams.map((exam) => (
                    <div 
                      key={exam.id}
                      className="border rounded-md p-3 mb-3 hover:bg-muted/50 cursor-pointer transition-all"
                      onClick={() => handleNavigateToExam(exam.id)}
                    >
                      <div className="font-medium">{exam.title}</div>
                      <div className="text-sm text-muted-foreground">{exam.questionsCount} questions</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Ask a doubt dialog */}
      <Dialog open={showAskDoubtDialog} onOpenChange={setShowAskDoubtDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ask a Doubt</DialogTitle>
            <DialogDescription>
              Submit your question to the AI tutor for personalized help.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="doubt" className="text-sm font-medium">
                Your question
              </label>
              <Textarea 
                id="doubt"
                placeholder="Type your question here..."
                value={doubtQuestion}
                onChange={(e) => setDoubtQuestion(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAskDoubtDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitDoubt}
              disabled={!doubtQuestion.trim() || isSubmittingDoubt}
            >
              {isSubmittingDoubt && (
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              )}
              Submit Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default EnhancedConceptDetail;
