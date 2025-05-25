import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  FileText, 
  AudioLines, 
  MessageSquare, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Share2,
  List,
  Layers,
  Highlighter,
  Flag,
  Check,
  HelpCircle,
  Brain,
  Link as LinkIcon,
  Headphones,
  PauseCircle,
  Clock,
  BrainCircuit,
  Pen,
  CopyCheck
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import useUserNotes from '@/hooks/useUserNotes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import LearningPageVoiceAssistant from '@/components/voice/LearningPageVoiceAssistant';
import { useLanguage } from '@/hooks/useLanguage';

interface ConceptCardDetailProps {
  conceptId: string;
  onBack?: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId, onBack }) => {
  const [activeTab, setActiveTab] = useState("read");
  const [loading, setLoading] = useState(true);
  const [conceptData, setConceptData] = useState<any>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [flaggedForRevision, setFlaggedForRevision] = useState(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [aiTutorDialogOpen, setAiTutorDialogOpen] = useState(false);
  const [tutorQuestion, setTutorQuestion] = useState("");
  const [tutorResponse, setTutorResponse] = useState("");
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizResults, setQuizResults] = useState({ correct: 0, total: 0 });
  const [isShowingRelatedConcepts, setIsShowingRelatedConcepts] = useState(false);
  const speakTextRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { saveNote, getNoteForConcept } = useUserNotes();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  useEffect(() => {
    // Simulate loading concept data
    setLoading(true);
    
    setTimeout(() => {
      // Mock concept data
      const mockConceptData = {
        id: conceptId,
        title: "Newton's Laws of Motion",
        subtitle: "Fundamental principles of classical mechanics",
        subject: "Physics",
        chapter: "Mechanics",
        difficulty: "Intermediate",
        estimatedTime: "15 min",
        lastStudied: "3 days ago",
        mastery: 65,
        content: `
          <h2>Introduction to Newton's Laws</h2>
          <p>Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it.</p>
          
          <h3>Newton's First Law (Law of Inertia)</h3>
          <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
          <p>This means that an object will not change its motion unless a force acts on it.</p>
          
          <h3>Newton's Second Law (F = ma)</h3>
          <p>The force acting on an object is equal to the mass of that object times its acceleration.</p>
          <p>This is represented by the equation: F = ma</p>
          <p>where F is the net force applied, m is the mass of the object, and a is the acceleration.</p>
          
          <h3>Newton's Third Law</h3>
          <p>For every action, there is an equal and opposite reaction.</p>
          <p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object.</p>
          
          <h2>Applications</h2>
          <p>Newton's laws are applied in countless scenarios, from rocket propulsion to automobile safety systems. Understanding these principles helps engineers design safer vehicles, more efficient machines, and even plan space missions.</p>
        `,
        diagrams: [
          {
            title: "First Law Illustration",
            url: "https://placehold.co/600x400?text=First+Law+Diagram"
          },
          {
            title: "Second Law Graph",
            url: "https://placehold.co/600x400?text=F=ma+Graph"
          },
          {
            title: "Third Law Demonstration",
            url: "https://placehold.co/600x400?text=Third+Law+Demo"
          }
        ],
        formulas: [
          { name: "Newton's Second Law", formula: "F = ma" },
          { name: "Weight calculation", formula: "W = mg" },
          { name: "Momentum", formula: "p = mv" }
        ],
        questions: [
          {
            question: "What happens to an object in motion when no forces act upon it?",
            answer: "It continues moving at constant velocity (same speed and direction)."
          },
          {
            question: "How does the acceleration of an object change if the force applied is doubled?",
            answer: "If the mass remains constant, the acceleration doubles as well (F = ma)."
          },
          {
            question: "When a person walks, what is the equal and opposite reaction force?",
            answer: "The person pushes backward on the ground, and the ground pushes forward on the person with equal magnitude."
          }
        ],
        relatedConcepts: [
          { id: "rc1", title: "Momentum", subject: "Physics", difficulty: "Medium" },
          { id: "rc2", title: "Friction", subject: "Physics", difficulty: "Easy" },
          { id: "rc3", title: "Gravitational Force", subject: "Physics", difficulty: "Medium" },
          { id: "rc4", title: "Work and Energy", subject: "Physics", difficulty: "Hard" }
        ],
        quizQuestions: [
          {
            question: "Which of Newton's laws states that an object at rest stays at rest unless acted upon by an external force?",
            options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
            correctAnswer: "First Law"
          },
          {
            question: "The equation F = ma represents which of Newton's laws?",
            options: ["First Law", "Second Law", "Third Law", "None of the above"],
            correctAnswer: "Second Law"
          },
          {
            question: "According to Newton's third law, when one object exerts a force on another object, the second object...",
            options: [
              "Accelerates proportionally to its mass",
              "Remains at rest",
              "Exerts an equal and opposite force on the first object",
              "Moves in the same direction as the force"
            ],
            correctAnswer: "Exerts an equal and opposite force on the first object"
          }
        ],
        keyPoints: [
          "Newton's First Law establishes the principle of inertia",
          "The Second Law quantifies the relationship between force, mass, and acceleration",
          "The Third Law describes the symmetry of forces in interactions between objects",
          "These laws provide the foundation for classical mechanics"
        ]
      };
      
      setConceptData(mockConceptData);
      setLoading(false);
      
      // Load saved notes
      const savedNote = getNoteForConcept(conceptId);
      if (savedNote) {
        setNotes([savedNote]);
      }

      // Load saved highlights
      try {
        const savedHighlights = localStorage.getItem(`highlights-${conceptId}`);
        if (savedHighlights) {
          setHighlights(JSON.parse(savedHighlights));
        }
      } catch (e) {
        console.error("Error loading highlights:", e);
      }
      
      // Check if bookmarked
      try {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
        setBookmarked(bookmarks.includes(conceptId));
      } catch (e) {
        console.error("Error loading bookmark state:", e);
      }
      
      // Check if flagged for revision
      try {
        const flagged = JSON.parse(localStorage.getItem('flaggedConcepts') || '[]');
        setFlaggedForRevision(flagged.includes(conceptId));
      } catch (e) {
        console.error("Error loading flagged state:", e);
      }
      
    }, 800);
  }, [conceptId]);
  
  // Text-to-speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices and set a good one if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = ['Google US English', 'Microsoft David', 'Samantha'];
      
      for (const voiceName of preferredVoices) {
        const voice = voices.find(v => v.name.includes(voiceName));
        if (voice) {
          utterance.voice = voice;
          break;
        }
      }
      
      // Set properties
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Set callbacks
      utterance.onstart = () => setAudioPlaying(true);
      utterance.onend = () => setAudioPlaying(false);
      utterance.onerror = () => {
        setAudioPlaying(false);
        toast({
          title: "Read Aloud Error",
          description: "There was an error with text-to-speech. Please try again.",
          variant: "destructive"
        });
      };
      
      // Save reference to stop later if needed
      speakTextRef.current = utterance;
      
      // Speak
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Feature Not Supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive"
      });
    }
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
    }
  };
  
  // Read aloud the concept content
  const readAloudContent = () => {
    if (!conceptData) return;
    
    // Extract text content from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = conceptData.content;
    const textContent = tempDiv.textContent || '';
    
    if (audioPlaying) {
      stopSpeaking();
    } else {
      speakText(textContent);
    }
  };
  
  // Extract plain text from HTML
  const getPlainText = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || '';
  };
  
  // Handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText("");
    }
  };
  
  // Add highlight
  const addHighlight = () => {
    if (selectedText) {
      const newHighlights = [...highlights, selectedText];
      setHighlights(newHighlights);
      setSelectedText("");
      
      // Save to localStorage
      localStorage.setItem(`highlights-${conceptId}`, JSON.stringify(newHighlights));
      
      toast({
        title: "Highlight Added",
        description: "Your highlight has been saved.",
      });
    }
  };
  
  // Add note
  const addNote = () => {
    if (noteText.trim()) {
      const newNotes = [...notes, noteText];
      setNotes(newNotes);
      
      // Save note to localStorage
      saveNote(conceptId, noteText);
      
      setNoteText("");
      setIsAddingNote(false);
      
      toast({
        title: "Note Added",
        description: "Your note has been saved.",
      });
    }
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
      
      let updatedBookmarks;
      if (bookmarked) {
        updatedBookmarks = bookmarks.filter((id: string) => id !== conceptId);
      } else {
        updatedBookmarks = [...bookmarks, conceptId];
      }
      
      localStorage.setItem('bookmarkedConcepts', JSON.stringify(updatedBookmarks));
      setBookmarked(!bookmarked);
      
      toast({
        title: bookmarked ? "Bookmark Removed" : "Bookmark Added",
        description: bookmarked 
          ? "This concept has been removed from your bookmarks." 
          : "This concept has been added to your bookmarks."
      });
    } catch (e) {
      console.error("Error toggling bookmark:", e);
      toast({
        title: "Error",
        description: "Could not update bookmark status.",
        variant: "destructive"
      });
    }
  };
  
  // Toggle flag for revision
  const toggleFlagForRevision = () => {
    try {
      const flagged = JSON.parse(localStorage.getItem('flaggedConcepts') || '[]');
      
      let updatedFlagged;
      if (flaggedForRevision) {
        updatedFlagged = flagged.filter((id: string) => id !== conceptId);
      } else {
        updatedFlagged = [...flagged, conceptId];
      }
      
      localStorage.setItem('flaggedConcepts', JSON.stringify(updatedFlagged));
      setFlaggedForRevision(!flaggedForRevision);
      
      toast({
        title: flaggedForRevision ? "Removed from Revision" : "Flagged for Revision",
        description: flaggedForRevision 
          ? "This concept has been removed from your revision list." 
          : "This concept has been added to your revision list."
      });
    } catch (e) {
      console.error("Error toggling flag:", e);
      toast({
        title: "Error",
        description: "Could not update revision status.",
        variant: "destructive"
      });
    }
  };
  
  // Submit question to AI Tutor
  const submitTutorQuestion = () => {
    if (!tutorQuestion.trim()) return;
    
    setIsTutorThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (tutorQuestion.toLowerCase().includes("first law")) {
        response = "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force. This is also called the law of inertia. For example, when you're in a car and it suddenly stops, your body tends to continue moving forward - that's inertia in action!";
      } else if (tutorQuestion.toLowerCase().includes("second law")) {
        response = "Newton's Second Law establishes that Force = mass × acceleration (F = ma). This means the force acting on an object is equal to the mass of that object multiplied by its acceleration. The greater the mass, the more force needed to achieve the same acceleration. This explains why it's harder to push a heavy object than a light one.";
      } else if (tutorQuestion.toLowerCase().includes("third law")) {
        response = "Newton's Third Law states that for every action, there is an equal and opposite reaction. When one object exerts a force on another object, the second object exerts an equal force in the opposite direction on the first object. For instance, when you push against a wall, the wall pushes back with equal force, which is why you don't go through it.";
      } else {
        response = "Newton's laws of motion are fundamental principles that describe the relationship between an object and the forces acting on it. The first law covers inertia, the second law quantifies the relationship between force, mass and acceleration (F=ma), and the third law states that for every action there's an equal and opposite reaction. These principles form the foundation of classical mechanics and help us understand how objects move in our physical world.";
      }
      
      setTutorResponse(response);
      setIsTutorThinking(false);
    }, 1500);
  };
  
  // Start quiz
  const startQuiz = () => {
    setCurrentQuizQuestion(0);
    setSelectedAnswer(null);
    setQuizAnswered(false);
    setQuizResults({ correct: 0, total: 0 });
    setQuizDialogOpen(true);
  };
  
  // Check quiz answer
  const checkAnswer = () => {
    if (!selectedAnswer || !conceptData?.quizQuestions) return;
    
    const currentQuestion = conceptData.quizQuestions[currentQuizQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setQuizAnswered(true);
    setQuizResults(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };
  
  // Next quiz question
  const nextQuestion = () => {
    if (!conceptData?.quizQuestions) return;
    
    if (currentQuizQuestion < conceptData.quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else {
      // Quiz finished
      toast({
        title: "Quiz Completed",
        description: `You scored ${quizResults.correct} out of ${conceptData.quizQuestions.length}!`,
      });
      setQuizDialogOpen(false);
    }
  };
  
  // Download content as PDF (simulated)
  const downloadContent = () => {
    toast({
      title: "Downloading PDF",
      description: "Your PDF is being prepared for download."
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "The PDF has been downloaded successfully.",
      });
    }, 1500);
  };
  
  // Share concept (simulated)
  const shareContent = () => {
    navigator.clipboard.writeText(`Check out this concept: ${conceptData?.title}`);
    toast({
      title: "Link Copied",
      description: "Link copied to clipboard!",
    });
  };
  
  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!conceptData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Concept Not Found</CardTitle>
          <CardDescription>The requested concept could not be loaded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onBack} variant="outline">Back to Concepts</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Button variant="ghost" size="sm" className="mb-2" onClick={onBack}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Concepts
              </Button>
              <CardTitle className="text-2xl font-bold">{conceptData.title}</CardTitle>
              <CardDescription className="text-base">{conceptData.subtitle}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleBookmark}
                className={bookmarked ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : ""}
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-1 text-blue-500" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-1" />
                )}
                {bookmarked ? "Saved" : "Save"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleFlagForRevision}
                className={flaggedForRevision ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : ""}
              >
                <Flag className={`h-4 w-4 mr-1 ${flaggedForRevision ? "text-amber-500" : ""}`} />
                {flaggedForRevision ? "Flagged" : "Flag for Revision"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={shareContent}
              >
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline">{conceptData.subject}</Badge>
            <Badge variant="outline">{conceptData.chapter}</Badge>
            <Badge>{conceptData.difficulty}</Badge>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {conceptData.estimatedTime}
              </div>
              <div>Last studied: {conceptData.lastStudied}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Mastery:</span>
              <Progress value={conceptData.mastery} className="w-32" />
              <span className="text-sm font-medium">{conceptData.mastery}%</span>
            </div>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={readAloudContent}
              className={audioPlaying ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : ""}
            >
              {audioPlaying ? (
                <>
                  <PauseCircle className="mr-1 h-4 w-4" /> Stop Reading
                </>
              ) : (
                <>
                  <Headphones className="mr-1 h-4 w-4" /> Read Aloud
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={startQuiz}
            >
              <BrainCircuit className="mr-1 h-4 w-4" /> Quick Recall Practice
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingNote(true)}
            >
              <Pen className="mr-1 h-4 w-4" /> Add Notes
            </Button>
            <Dialog open={aiTutorDialogOpen} onOpenChange={setAiTutorDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <HelpCircle className="mr-1 h-4 w-4" /> Ask AI Tutor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Ask AI Tutor about {conceptData.title}</DialogTitle>
                  <DialogDescription>
                    Get personalized help with understanding this concept.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  {tutorResponse && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm">{tutorResponse}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Ask a question about this concept..."
                      value={tutorQuestion}
                      onChange={(e) => setTutorQuestion(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={submitTutorQuestion} 
                      disabled={isTutorThinking || !tutorQuestion.trim()}
                      className="w-full"
                    >
                      {isTutorThinking ? "Thinking..." : "Ask Question"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShowingRelatedConcepts(!isShowingRelatedConcepts)}
            >
              <LinkIcon className="mr-1 h-4 w-4" /> Related Concepts
            </Button>
          </div>
          {/* Related concepts panel */}
          {isShowingRelatedConcepts && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Related Concepts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {conceptData.relatedConcepts.map((concept: any) => (
                  <div 
                    key={concept.id} 
                    className="p-3 border rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <LinkIcon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{concept.title}</p>
                        <p className="text-xs text-muted-foreground">{concept.subject} • {concept.difficulty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="w-full">
              <TabsTrigger value="read" className="flex-1">
                <BookOpen className="h-4 w-4 mr-1" /> Read
              </TabsTrigger>
              <TabsTrigger value="visualize" className="flex-1">
                <Lightbulb className="h-4 w-4 mr-1" /> Visualize
              </TabsTrigger>
              <TabsTrigger value="listen" className="flex-1">
                <AudioLines className="h-4 w-4 mr-1" /> Listen
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-1" /> Practice
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                <FileText className="h-4 w-4 mr-1" /> Notes
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex-1">
                <Brain className="h-4 w-4 mr-1" /> Flashcards
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-4">
            <TabsContent value="read" className="space-y-4">
              <div 
                className="prose dark:prose-invert max-w-none"
                onMouseUp={handleTextSelection}
                dangerouslySetInnerHTML={{ __html: conceptData.content }}
              />
              
              {selectedText && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex gap-3 z-10">
                  <Button size="sm" onClick={addHighlight}>
                    <Highlighter className="h-4 w-4 mr-1" /> Highlight
                  </Button>
                  <Button size="sm" onClick={() => {
                    setNoteText(`Note about: "${selectedText}"\n\n`);
                    setIsAddingNote(true);
                    setSelectedText("");
                  }}>
                    <FileText className="h-4 w-4 mr-1" /> Add Note
                  </Button>
                </div>
              )}
              
              <div className="flex justify-between mt-4 pt-4 border-t">
                <div>
                  <Button variant="outline" onClick={downloadContent}>
                    <Download className="h-4 w-4 mr-1" /> Download PDF
                  </Button>
                </div>
                
                <div>
                  <Button variant="ghost">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button variant="ghost">
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="visualize" className="space-y-6">
              <h3 className="text-xl font-medium">Visual Aids</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conceptData.diagrams.map((diagram: any, index: number) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <img 
                      src={diagram.url} 
                      alt={diagram.title} 
                      className="w-full object-cover"
                    />
                    <div className="p-3 border-t">
                      <h4 className="font-medium">{diagram.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-medium pt-4">Key Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conceptData.formulas.map((formula: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="text-sm text-muted-foreground mb-1">{formula.name}</div>
                    <div className="text-lg font-bold">{formula.formula}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="listen" className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Audio Explanation</h3>
                <p className="mb-4">Listen to an audio explanation of {conceptData.title}. This audio covers all key principles and applications.</p>
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    onClick={readAloudContent}
                    className={`${audioPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    {audioPlaying ? (
                      <>
                        <div className="flex items-center">
                          <span className="sr-only">Audio is playing</span>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-4 bg-white animate-sound-wave-1"></div>
                            <div className="w-1 h-6 bg-white animate-sound-wave-2"></div>
                            <div className="w-1 h-8 bg-white animate-sound-wave-3"></div>
                            <div className="w-1 h-4 bg-white animate-sound-wave-4"></div>
                          </div>
                          <span className="ml-2">Playing...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Headphones className="mr-2 h-4 w-4" /> Start Reading Aloud
                      </>
                    )}
                  </Button>
                </div>
                
                <style jsx>{`
                  @keyframes sound-wave-1 {
                    0%, 100% { height: 4px; }
                    50% { height: 12px; }
                  }
                  @keyframes sound-wave-2 {
                    0%, 100% { height: 6px; }
                    50% { height: 20px; }
                  }
                  @keyframes sound-wave-3 {
                    0%, 100% { height: 8px; }
                    50% { height: 16px; }
                  }
                  @keyframes sound-wave-4 {
                    0%, 100% { height: 4px; }
                    50% { height: 10px; }
                  }
                  .animate-sound-wave-1 {
                    animation: sound-wave-1 0.5s infinite;
                  }
                  .animate-sound-wave-2 {
                    animation: sound-wave-2 0.7s infinite;
                  }
                  .animate-sound-wave-3 {
                    animation: sound-wave-3 0.6s infinite;
                  }
                  .animate-sound-wave-4 {
                    animation: sound-wave-4 0.5s infinite;
                  }
                `}</style>
              </div>
              
              <h3 className="text-xl font-medium pt-4">Key Points</h3>
              <div className="space-y-2">
                {conceptData.keyPoints.map((point: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">{index + 1}</div>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-4">
              <h3 className="text-xl font-medium">Practice Questions</h3>
              <div className="space-y-6">
                {conceptData.questions.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <p className="mt-1">{item.question}</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-sm text-muted-foreground">Answer</h4>
                      <p className="mt-1">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button className="flex-1" onClick={startQuiz}>
                  <BrainCircuit className="mr-2 h-4 w-4" /> Quick Recall Practice
                </Button>
                <Dialog open={aiTutorDialogOpen} onOpenChange={setAiTutorDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" /> Ask AI Tutor
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Your Notes</h3>
                <Button 
                  onClick={() => {
                    setNoteText("");
                    setIsAddingNote(true);
                  }}
                  disabled={isAddingNote}
                >
                  <Pen className="h-4 w-4 mr-1" /> Add Note
                </Button>
              </div>
              
              {isAddingNote ? (
                <div className="border rounded-lg p-4 space-y-3">
                  <Textarea
                    className="w-full min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your note here..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingNote(false)}>Cancel</Button>
                    <Button onClick={addNote}>Save Note</Button>
                  </div>
                </div>
              ) : notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map((note, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                      <p className="whitespace-pre-line">{note}</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Added on {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-muted-foreground">You haven't added any notes yet.</p>
                </div>
              )}
              
              {highlights.length > 0 && (
                <>
                  <h3 className="text-xl font-medium pt-4">Your Highlights</h3>
                  <div className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="border-l-4 border-yellow-400 pl-3 py-1">
                        <p className="italic">"{highlight}"</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="flashcards" className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Flashcards & Exam Format</h3>
                <p className="mb-4">Convert this concept into flashcards and exam questions to test your knowledge.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-5 bg-white dark:bg-gray-900 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <h4 className="font-medium">Flashcards</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Create a set of flashcards based on this concept to practice recall.
                    </p>
                    <Button className="w-full" onClick={() => navigate('/dashboard/student/flashcards')}>
                      Study Flashcards
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-5 bg-white dark:bg-gray-900 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <CopyCheck className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Practice Tests</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Test your understanding with exam-style questions.
                    </p>
                    <Button className="w-full" onClick={() => navigate('/dashboard/student/practice-exam')}>
                      Take Practice Test
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Preview Flashcards</h4>
                  <div className="border rounded-lg overflow-hidden mb-4">
                    <div className="p-4 border-b bg-white dark:bg-gray-900 text-center">
                      <p className="font-medium">What is Newton's First Law?</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-center">
                      <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={startQuiz}>
                    <BrainCircuit className="mr-2 h-4 w-4" /> Quick Recall Practice
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-between border-t pt-4">
          <div>
            <h4 className="text-sm font-medium">Related Concepts</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {conceptData.relatedConcepts.map((concept: any) => (
                <Badge 
                  key={concept.id} 
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                >
                  {concept.title}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/today')}>
            <List className="h-4 w-4 mr-1" /> View in Study Plan
          </Button>
        </CardFooter>
        
        {/* Quick Recall Practice Dialog */}
        <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Quick Recall Practice</DialogTitle>
              <DialogDescription>
                Test your understanding of {conceptData.title}
              </DialogDescription>
            </DialogHeader>
            
            {conceptData.quizQuestions && currentQuizQuestion < conceptData.quizQuestions.length && (
              <div className="space-y-4">
                <div className="py-2">
                  <h4 className="font-medium mb-2">
                    Question {currentQuizQuestion + 1} of {conceptData.quizQuestions.length}
                  </h4>
                  <p>{conceptData.quizQuestions[currentQuizQuestion].question}</p>
                </div>
                
                <div className="space-y-2">
                  {conceptData.quizQuestions[currentQuizQuestion].options.map((option: string) => (
                    <div 
                      key={option} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer === option 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      } ${
                        quizAnswered && option === conceptData.quizQuestions[currentQuizQuestion].correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : ''
                      } ${
                        quizAnswered && selectedAnswer === option && option !== conceptData.quizQuestions[currentQuizQuestion].correctAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : ''
                      }`}
                      onClick={() => {
                        if (!quizAnswered) {
                          setSelectedAnswer(option);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-2 flex-shrink-0 ${
                          selectedAnswer === option 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === option && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-4">
                  {!quizAnswered ? (
                    <Button 
                      className="w-full"
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={nextQuestion}
                    >
                      {currentQuizQuestion < conceptData.quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  )}
                </div>
                
                {quizAnswered && (
                  <div className={`p-3 rounded-lg ${
                    selectedAnswer === conceptData.quizQuestions[currentQuizQuestion].correctAnswer
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                  }`}>
                    {selectedAnswer === conceptData.quizQuestions[currentQuizQuestion].correctAnswer 
                      ? 'Correct! Well done.' 
                      : `Incorrect. The correct answer is: ${conceptData.quizQuestions[currentQuizQuestion].correctAnswer}`
                    }
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Context-aware voice assistant for concept cards */}
        <LearningPageVoiceAssistant 
          userName={userProfile?.name || "Student"}
          pageType="concepts"
        />
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
