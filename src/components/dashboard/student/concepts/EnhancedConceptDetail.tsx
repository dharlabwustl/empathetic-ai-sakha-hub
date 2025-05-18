
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Volume2, BookOpen, Brain, FileText, Star, Flag, 
  ThumbsUp, Send, CheckCircle, MessageCircle, Video,
  Download, PenSquare, Link as LinkIcon, PlayCircle, VolumeX,
  ChevronLeft, ChevronRight, ListChecks, Lightbulb, Bookmark, FileQuestion
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'link';
  url: string;
}

interface Practice {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface RelatedCard {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'exam';
}

interface ConceptDetailProps {
  id?: string;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ id: propId }) => {
  const params = useParams();
  const id = propId || params.id || 'concept-1';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("content");
  const [mastery, setMastery] = useState(65);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [notes, setNotes] = useState("");
  const [doubt, setDoubt] = useState("");
  const [selectedPracticeQuestion, setSelectedPracticeQuestion] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Mock concept data
  const conceptData = {
    id,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "medium",
    description: "Understand the fundamental laws that govern classical mechanics.",
    content: `
      <h2>Newton's First Law of Motion</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.</p>
      <p>This is also known as the <strong>Law of Inertia</strong>. It means that objects naturally resist changes to their state of motion.</p>
      
      <h2>Newton's Second Law of Motion</h2>
      <p>The acceleration of an object depends on the mass of the object and the amount of force applied.</p>
      <p>Mathematically: F = ma, where F is force, m is mass, and a is acceleration.</p>
      
      <h2>Newton's Third Law of Motion</h2>
      <p>For every action, there is an equal and opposite reaction.</p>
      <p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
    `,
    outcomes: [
      "Explain the concept of inertia and its relation to Newton's First Law",
      "Apply F = ma to solve mechanical problems",
      "Identify action-reaction pairs in physical systems"
    ],
    video: "/assets/videos/newtons-laws.mp4",
    relatedCards: [
      { id: "concept-2", title: "Force and Free Body Diagrams", type: "concept" },
      { id: "concept-3", title: "Friction Forces", type: "concept" },
      { id: "flashcard-7", title: "Newton's Laws - Key Points", type: "flashcard" },
      { id: "exam-3", title: "Mechanics Practice Test", type: "exam" }
    ],
    resources: [
      { id: "res-1", title: "Newton's Laws Visualization", type: "video", url: "/assets/videos/newton-visualization.mp4" },
      { id: "res-2", title: "Solved Examples PDF", type: "pdf", url: "/assets/docs/newton-examples.pdf" },
      { id: "res-3", title: "Interactive Simulations", type: "link", url: "https://phet.colorado.edu/en/simulations/category/physics/motion" }
    ],
    practices: [
      {
        id: "q1",
        question: "Which of Newton's laws is also known as the Law of Inertia?",
        options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
        answer: 0,
        explanation: "Newton's First Law is also known as the Law of Inertia as it describes how objects resist changes to their motion."
      },
      {
        id: "q2",
        question: "In the equation F = ma, what does 'a' represent?",
        options: ["Area", "Acceleration", "Amplitude", "Angular velocity"],
        answer: 1,
        explanation: "In F = ma, 'a' represents acceleration, which is the rate of change of velocity over time."
      },
      {
        id: "q3",
        question: "According to Newton's Third Law, when you push against a wall:",
        options: [
          "The wall exerts no force on you", 
          "The wall exerts a smaller force on you", 
          "The wall exerts an equal and opposite force on you", 
          "The wall exerts a greater force on you"
        ],
        answer: 2,
        explanation: "Newton's Third Law states that for every action there is an equal and opposite reaction, so the wall pushes back on you with equal magnitude in the opposite direction."
      }
    ]
  };

  // Toggle speech synthesis for read aloud functionality
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      setIsReadingAloud(true);
      
      if (contentRef.current) {
        // Get text content from HTML
        const text = contentRef.current.textContent || '';
        
        // Create utterance and set properties
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Use available voices (prefer English)
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.includes('en'));
        if (englishVoice) utterance.voice = englishVoice;
        
        // Event handlers
        utterance.onend = () => setIsReadingAloud(false);
        utterance.onerror = () => setIsReadingAloud(false);
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Toggle flag for revision
  const toggleFlag = () => {
    setIsFlagged(!isFlagged);
    
    toast({
      title: isFlagged ? "Removed from revision list" : "Added to revision list",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept will appear in your revision reminders",
      variant: isFlagged ? "default" : "success"
    });
  };

  // Submit notes
  const handleSaveNotes = () => {
    if (notes.trim()) {
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully",
        variant: "success"
      });
    } else {
      toast({
        title: "Cannot save empty notes",
        description: "Please write something before saving",
        variant: "destructive"
      });
    }
  };

  // Submit doubt
  const handleSubmitDoubt = () => {
    if (doubt.trim()) {
      toast({
        title: "Doubt submitted",
        description: "Your question has been sent to our AI tutor. Check back soon for a response.",
        variant: "success"
      });
      setDoubt("");
    } else {
      toast({
        title: "Empty question",
        description: "Please write your doubt before submitting",
        variant: "destructive"
      });
    }
  };

  // Handle answering practice questions
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedPracticeQuestion(questionIndex);
    setSelectedAnswer(optionIndex);
  };

  // Navigate to other related concepts
  const navigateToRelated = (card: RelatedCard) => {
    if (card.type === 'concept') {
      navigate(`/dashboard/student/concepts/${card.id}`);
    } else if (card.type === 'flashcard') {
      navigate(`/dashboard/student/flashcards`);
    } else if (card.type === 'exam') {
      navigate(`/dashboard/student/practice-exam`);
    }
  };

  // Handle difficulty badge color
  const getDifficultyColor = () => {
    if (conceptData.difficulty === "easy") {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    } else if (conceptData.difficulty === "medium") {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    } else if (conceptData.difficulty === "hard") {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }
    return "";
  };

  // Breadcrumb component for navigation path
  const BreadcrumbItem = ({ children, isCurrentPage = false }) => (
    <li className={`inline-flex items-center ${isCurrentPage ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
      {children}
    </li>
  );

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Navigation path */}
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <BreadcrumbItem>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0"
              onClick={() => navigate('/dashboard/student/concepts')}
            >
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              Concepts
            </Button>
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-gray-400" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0"
              onClick={() => navigate('/dashboard/student/concepts?subject=physics')}
            >
              Physics
            </Button>
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-gray-400" />
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <span>Newton's Laws</span>
          </BreadcrumbItem>
        </ol>
      </nav>

      {/* Concept Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <h1 className="text-3xl font-bold">{conceptData.title}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {conceptData.subject}
              </Badge>
              <Badge variant="secondary" className={getDifficultyColor()}>
                {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-400 mr-1" />
                <span className="text-sm font-medium">Mastery: {mastery}%</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isFlagged ? "default" : "outline"}
              className={isFlagged ? "bg-amber-500 hover:bg-amber-600" : ""}
              size="sm"
              onClick={toggleFlag}
            >
              <Flag className={`h-4 w-4 ${isFlagged ? "text-white" : "text-amber-500"} mr-1`} />
              {isFlagged ? "Flagged" : "Flag for Revision"}
            </Button>
            <Button
              variant={isReadingAloud ? "default" : "outline"}
              size="sm"
              onClick={toggleReadAloud}
            >
              {isReadingAloud ? (
                <>
                  <VolumeX className="h-4 w-4 mr-1" />
                  Stop Reading
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-1" />
                  Read Aloud
                </>
              )}
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mt-2">{conceptData.description}</p>
        <Progress value={mastery} className="h-1 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-1">
                <ListChecks className="h-4 w-4" />
                <span className="hidden sm:inline">Practice</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <PenSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                  <CardDescription>After studying this concept, you should be able to:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {conceptData.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Separator className="my-6" />
                  
                  <div className="prose dark:prose-invert max-w-none" ref={contentRef} dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="video" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Video Lecture</CardTitle>
                  <CardDescription>Visual explanation of the concept</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    {/* This would be replaced with an actual video player */}
                    <div className="text-center">
                      <PlayCircle className="h-16 w-16 text-blue-500 mx-auto mb-2" />
                      <p>Video Preview - Newton's Laws of Motion</p>
                      <Button className="mt-4" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "Pause" : "Play"} Video
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Key Takeaways</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Inertia is an object's resistance to changes in motion</span>
                      </li>
                      <li className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>F = ma can predict how forces affect object movement</span>
                      </li>
                      <li className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Action-reaction pairs always act on different objects</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="practice" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Questions</CardTitle>
                  <CardDescription>Test your understanding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {conceptData.practices.map((question, qIndex) => (
                      <div key={question.id} className="space-y-4">
                        <div className="flex items-start gap-2">
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <p className="font-medium">{question.question}</p>
                        </div>
                        
                        <div className="ml-8 space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div 
                              key={oIndex} 
                              className={`flex items-center p-2 rounded-md cursor-pointer border ${
                                selectedPracticeQuestion === qIndex && selectedAnswer === oIndex
                                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                              }`}
                              onClick={() => handleAnswerSelect(qIndex, oIndex)}
                            >
                              <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                                selectedPracticeQuestion === qIndex && selectedAnswer === oIndex
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {selectedPracticeQuestion === qIndex && selectedAnswer === oIndex && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span>{option}</span>
                              
                              {/* Show correct/incorrect after answering */}
                              {showAnswer && selectedPracticeQuestion === qIndex && selectedAnswer === oIndex && (
                                question.answer === oIndex 
                                  ? <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                                  : <div className="ml-auto h-5 w-5 flex items-center justify-center rounded-full bg-red-100 text-red-600">✕</div>
                              )}
                              
                              {/* Show correct answer */}
                              {showAnswer && question.answer === oIndex && selectedPracticeQuestion === qIndex && selectedAnswer !== oIndex && (
                                <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Show explanation when answered */}
                        {showAnswer && selectedPracticeQuestion === qIndex && (
                          <div className={`ml-8 p-3 rounded-md ${
                            selectedAnswer === question.answer
                              ? 'bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-900/30'
                              : 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-900/30'
                          }`}>
                            <p className="text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    onClick={() => setShowAnswer(true)}
                    disabled={selectedAnswer === null}
                  >
                    Check Answers
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>Enhance your understanding with these materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conceptData.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <div className="flex items-center">
                          {resource.type === 'video' && <Video className="h-5 w-5 text-blue-500 mr-3" />}
                          {resource.type === 'pdf' && <FileText className="h-5 w-5 text-red-500 mr-3" />}
                          {resource.type === 'link' && <LinkIcon className="h-5 w-5 text-green-500 mr-3" />}
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.type.toUpperCase()}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            {resource.type === 'link' ? 'Visit' : 'View'}
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                  <CardDescription>Keep track of important points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notes">Personal Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Add your notes here..." 
                        className="min-h-[200px] mt-2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSaveNotes} className="w-full">Save Notes</Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <Label htmlFor="doubt" className="flex items-center gap-2">
                      <FileQuestion className="h-4 w-4" />
                      Ask a Question to AI Tutor
                    </Label>
                    <Textarea 
                      id="doubt" 
                      placeholder="Have a doubt? Ask our AI tutor..."
                      className="min-h-[100px] mt-2"
                      value={doubt}
                      onChange={(e) => setDoubt(e.target.value)}
                    />
                    <Button onClick={handleSubmitDoubt} className="mt-3">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          {/* Related cards section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                Related Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conceptData.relatedCards.map((card) => (
                  <div 
                    key={card.id} 
                    className="p-2 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => navigateToRelated(card)}
                  >
                    <div className="flex items-center">
                      {card.type === 'concept' && <BookOpen className="h-4 w-4 text-blue-500 mr-2" />}
                      {card.type === 'flashcard' && <Brain className="h-4 w-4 text-violet-500 mr-2" />}
                      {card.type === 'exam' && <FileText className="h-4 w-4 text-emerald-500 mr-2" />}
                      <span className="text-sm">{card.title}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="text-xs capitalize">{card.type}</Badge>
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick recall section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Brain className="h-4 w-4 mr-2 text-purple-500" />
                Quick Recall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md border border-purple-100 dark:border-purple-900/30">
                  <p className="text-sm font-medium mb-2">Newton's First Law states:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force."
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 w-full text-xs">
                    <Bookmark className="h-3 w-3 mr-1" />
                    Add to Flashcards
                  </Button>
                </div>
                <Button variant="outline" className="w-full">Practice Flashcards</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Feedback section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">How useful was this?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline"
          onClick={() => navigate('/dashboard/student/concepts/concept-2')}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous: Work & Energy
        </Button>
        
        <Button 
          onClick={() => navigate('/dashboard/student/concepts/concept-3')}
          className="flex items-center"
        >
          Next: Momentum & Impulse
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
