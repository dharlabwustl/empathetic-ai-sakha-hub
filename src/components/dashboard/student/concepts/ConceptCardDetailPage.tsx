
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockConceptCardData } from '@/hooks/useMockConceptCardData';
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckSquare, 
  Edit3, 
  Flag, 
  Lightbulb,
  MessageCircle, 
  Play, 
  Save, 
  Share2, 
  Volume2, 
  VolumeX,
  Clock,
  Book,
  ListChecks,
  Link2,
  CreditCard,
  FileQuestion,
  MessagesSquare,
  Bookmark,
  BookmarkPlus,
  Check
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConceptCard } from '@/types/user/conceptCard';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Separator } from "@/components/ui/separator";

interface ConceptCardDetailProps {
  conceptId?: string;
}

const ConceptCardDetailPage: React.FC<ConceptCardDetailProps> = ({ conceptId: propConceptId }) => {
  const params = useParams<{ conceptId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conceptData, setConceptData] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('content');
  const [isReading, setIsReading] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [userNotes, setUserNotes] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const noteInputRef = useRef<HTMLTextAreaElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Debugging log for the ID resolution
  const resolvedId = propConceptId || params.conceptId;
  console.log("ConceptCardDetailPage - Resolved concept ID:", resolvedId);
  
  useEffect(() => {
    if (resolvedId) {
      fetchConceptData(resolvedId);
    } else {
      setError("No concept ID provided");
      setLoading(false);
    }
    
    // Initialize speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    
    return () => {
      // Stop any ongoing speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, [resolvedId]);
  
  const fetchConceptData = async (id: string) => {
    setLoading(true);
    try {
      // Use mock data for now
      const mockData = useMockConceptCardData();
      const concept = mockData.find(c => c.id === id);
      
      if (concept) {
        console.log("ConceptCardDetailPage - Found concept data:", concept);
        setConceptData(concept);
        
        // Load user data from localStorage if available
        const savedNotes = localStorage.getItem(`concept_notes_${id}`);
        if (savedNotes) {
          setUserNotes(JSON.parse(savedNotes));
        }
        
        const isBookmarked = localStorage.getItem(`concept_bookmarked_${id}`) === 'true';
        setIsBookmarked(isBookmarked);
        
        const isFlagged = localStorage.getItem(`concept_flagged_${id}`) === 'true';
        setIsFlagged(isFlagged);
      } else {
        setError("Concept not found");
      }
    } catch (err) {
      console.error("Error fetching concept data:", err);
      setError("Failed to load concept data");
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    if (conceptData && speechSynthesisRef.current) {
      const textToRead = `${conceptData.title}. ${conceptData.description}. ${conceptData.content}`;
      speechSynthesisRef.current.text = textToRead;
      speechSynthesisRef.current.rate = speechRate;
      window.speechSynthesis.speak(speechSynthesisRef.current);
      setIsReading(true);
      
      speechSynthesisRef.current.onend = () => {
        setIsReading(false);
      };
    }
  };
  
  const handleSpeechRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.rate = newRate;
      
      if (isReading) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speechSynthesisRef.current);
      }
    }
  };
  
  const handleAddNote = () => {
    if (currentNote.trim()) {
      const updatedNotes = [...userNotes, currentNote.trim()];
      setUserNotes(updatedNotes);
      setCurrentNote('');
      
      // Save to localStorage
      if (resolvedId) {
        localStorage.setItem(`concept_notes_${resolvedId}`, JSON.stringify(updatedNotes));
      }
      
      toast({
        title: "Note added",
        description: "Your note has been saved successfully",
      });
      
      if (noteInputRef.current) {
        noteInputRef.current.focus();
      }
    }
  };
  
  const handleDeleteNote = (index: number) => {
    const updatedNotes = userNotes.filter((_, i) => i !== index);
    setUserNotes(updatedNotes);
    
    // Update localStorage
    if (resolvedId) {
      localStorage.setItem(`concept_notes_${resolvedId}`, JSON.stringify(updatedNotes));
    }
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
    });
  };
  
  const handleToggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    if (resolvedId) {
      localStorage.setItem(`concept_bookmarked_${resolvedId}`, newBookmarkState.toString());
    }
    
    toast({
      title: newBookmarkState ? "Concept bookmarked" : "Bookmark removed",
      description: newBookmarkState 
        ? "This concept has been added to your bookmarks" 
        : "This concept has been removed from your bookmarks",
    });
  };
  
  const handleToggleFlag = () => {
    const newFlagState = !isFlagged;
    setIsFlagged(newFlagState);
    
    if (resolvedId) {
      localStorage.setItem(`concept_flagged_${resolvedId}`, newFlagState.toString());
    }
    
    toast({
      title: newFlagState ? "Flagged for revision" : "Flag removed",
      description: newFlagState 
        ? "This concept has been flagged for future revision" 
        : "This concept has been removed from your revision list",
    });
  };
  
  const handleMarkAsCompleted = () => {
    if (!conceptData) return;
    
    const updatedConcept = { ...conceptData, completed: true, progress: 100 };
    setConceptData(updatedConcept);
    
    toast({
      title: "Concept marked as completed",
      description: "Your progress has been updated",
    });
  };
  
  const handleAskQuestion = () => {
    if (askingQuestion && question.trim()) {
      // Mock AI response - in a real app, this would call an API
      setShowAiResponse(true);
      setAiResponse("I'm analyzing the concept... Please give me a moment...");
      
      // Simulate API call delay
      setTimeout(() => {
        const responses = [
          "This concept relates to the fundamental principles of chemical bonding. The key point is understanding how electrons are shared or transferred between atoms.",
          "The main idea here is to focus on how the mathematical formula works in different scenarios. Try practicing with different values to build intuition.",
          "What's important in this concept is understanding the cause and effect relationship. Consider how one variable change impacts the entire system."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setAiResponse(randomResponse);
        
        toast({
          title: "AI Tutor responded",
          description: "Check out the answer to your question",
        });
      }, 1500);
      
      setQuestion('');
    }
    
    setAskingQuestion(!askingQuestion);
  };
  
  const handlePracticeClick = (practiceType: string) => {
    navigate(`/dashboard/student/${practiceType.toLowerCase()}`, { 
      state: { conceptId: resolvedId } 
    });
    
    toast({
      title: `${practiceType} practice initiated`,
      description: `Starting ${practiceType.toLowerCase()} practice for this concept`,
    });
  };
  
  const handleViewRelatedConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concept-study/${conceptId}`);
  };
  
  if (loading) {
    return (
      <SharedPageLayout title="Loading Concept..." subtitle="Please wait while we prepare your study material">
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (error || !conceptData) {
    return (
      <SharedPageLayout title="Error" subtitle={error || "Failed to load concept"}>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="mb-4">We couldn't load this concept. Please try again later.</p>
              <Button onClick={handleBackClick}>Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }
  
  const difficultyColor = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  };
  
  return (
    <SharedPageLayout 
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.chapter || 'General'}`}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Top action bar */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={difficultyColor[conceptData.difficulty]}>
              {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
            </Badge>
            <Badge variant={conceptData.completed ? "outline" : "default"} className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/60">
              {conceptData.completed ? "Completed" : "In Progress"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{conceptData.estimatedTime} min</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={isBookmarked ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800/60" : ""}
                    onClick={handleToggleBookmark}
                  >
                    {isBookmarked ? <Bookmark className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBookmarked ? "Remove bookmark" : "Bookmark this concept"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={isFlagged ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800/60" : ""}
                    onClick={handleToggleFlag}
                  >
                    <Flag className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFlagged ? "Remove revision flag" : "Flag for revision"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={isReading ? "secondary" : "outline"}
                    className={isReading ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300" : ""}
                    onClick={handleReadAloud}
                  >
                    {isReading ? (
                      <>
                        <VolumeX className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Read Aloud</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isReading ? "Stop reading" : "Read content aloud"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={askingQuestion ? "secondary" : "outline"}
                    onClick={handleAskQuestion}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ask AI tutor about this concept</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Reading speed controls - show only when reading */}
        {isReading && (
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/60">
            <CardContent className="pt-4 pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-300">Reading Speed:</div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSpeechRateChange(Math.max(0.5, speechRate - 0.25))}
                    disabled={speechRate <= 0.5}
                    className="h-7 px-2"
                  >
                    Slower
                  </Button>
                  <span className="text-sm font-medium w-12 text-center">{speechRate}x</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSpeechRateChange(Math.min(2, speechRate + 0.25))}
                    disabled={speechRate >= 2}
                    className="h-7 px-2"
                  >
                    Faster
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Ask AI panel - conditionally shown */}
        {askingQuestion && (
          <Card className="border-blue-200 dark:border-blue-800/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessagesSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Ask AI Tutor</span>
              </CardTitle>
              <CardDescription>
                Ask any question about this concept and get an instant answer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your question here..." 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAskQuestion} disabled={!question.trim()}>
                  Ask
                </Button>
              </div>
              
              {showAiResponse && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-medium">AI Tutor Response:</h4>
                  </div>
                  <p className="text-sm">{aiResponse}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Progress indicator */}
        {!conceptData.completed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{conceptData.progress || 0}%</span>
            </div>
            <Progress value={conceptData.progress || 0} className="h-2" />
          </div>
        )}
        
        {/* Main content tabs */}
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="formulas" className="hidden sm:block">Formulas</TabsTrigger>
            <TabsTrigger value="videos" className="hidden sm:block">Videos</TabsTrigger>
            <TabsTrigger value="flashcards" className="hidden md:block">Flashcards</TabsTrigger>
            <TabsTrigger value="quizzes" className="hidden md:block">Quizzes</TabsTrigger>
          </TabsList>
          
          {/* Content Tab */}
          <TabsContent value="content" className="mt-4 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert prose-img:rounded-xl prose-headings:text-blue-800 dark:prose-headings:text-blue-300 max-w-none">
                  <div className="text-lg" dangerouslySetInnerHTML={{ __html: conceptData.content || '' }} />
                  
                  {conceptData.keyPoints && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Key Points to Remember</h3>
                      <ul className="space-y-2">
                        {conceptData.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {conceptData.examples && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Examples</h3>
                      <div className="space-y-4">
                        {conceptData.examples.map((example, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                            <span className="font-medium">Example {index + 1}:</span> {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {conceptData.commonMistakes && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Common Mistakes</h3>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
                        <ul className="space-y-2">
                          {conceptData.commonMistakes.map((mistake, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-600 dark:text-amber-400 font-medium mr-2">⚠️</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {conceptData.examRelevance && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Exam Relevance</h3>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md">
                        {conceptData.examRelevance}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              {!conceptData.completed && (
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button onClick={handleMarkAsCompleted}>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Your Notes
                </CardTitle>
                <CardDescription>
                  Add personal notes to help you remember this concept
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Type your notes here..." 
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-[100px]"
                  ref={noteInputRef}
                />
                <Button onClick={handleAddNote} disabled={!currentNote.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
                
                {userNotes.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium">Previously Saved Notes ({userNotes.length})</h3>
                    {userNotes.map((note, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{note}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleDeleteNote(index)}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 text-gray-400 hover:text-red-500" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {userNotes.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Edit3 className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-sm text-muted-foreground max-w-xs">
                      You haven't added any notes yet. Your notes will appear here to help you with revision.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Related Tab */}
          <TabsContent value="related" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Related Concepts
                </CardTitle>
                <CardDescription>
                  Explore these related concepts to deepen your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(conceptData.relatedConcepts && conceptData.relatedConcepts.length > 0) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* We'll use dummy data for related concepts */}
                    {['c001', 'c002', 'c003', 'c004'].map((conceptId) => (
                      <Card key={conceptId} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewRelatedConcept(conceptId)}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                {conceptId === 'c001' && 'Newton\'s First Law'}
                                {conceptId === 'c002' && 'Conservation of Momentum'}
                                {conceptId === 'c003' && 'Elastic Collisions'}
                                {conceptId === 'c004' && 'Centripetal Force'}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {conceptId === 'c001' && 'Physics > Mechanics'}
                                {conceptId === 'c002' && 'Physics > Mechanics'}
                                {conceptId === 'c003' && 'Physics > Mechanics'}
                                {conceptId === 'c004' && 'Physics > Circular Motion'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Link2 className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-sm text-muted-foreground max-w-xs">
                      No related concepts found for this topic.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Practice Options
                </CardTitle>
                <CardDescription>
                  Choose from different ways to practice and test your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <Card className="border-green-100 dark:border-green-800/30 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePracticeClick('Flashcards')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Flashcards</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Review with interactive flashcards
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-100 dark:border-purple-800/30 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePracticeClick('Quiz')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                          <FileQuestion className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Quiz</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Test your knowledge with questions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePracticeClick('Practice-Exam')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                          <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Practice Exam</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Full exam simulation with timer
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {conceptData.practiceQuestions && conceptData.practiceQuestions.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Quick Practice Questions</h3>
                    <div className="space-y-4">
                      {conceptData.practiceQuestions.slice(0, 2).map((question, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h4 className="font-medium">{question.question}</h4>
                            <div className="mt-3 space-y-2">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center">
                                  <div className="h-5 w-5 border rounded-full flex items-center justify-center mr-2">
                                    {String.fromCharCode(65 + optIndex)}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                            <Collapsible className="mt-3">
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" size="sm">Show Answer</Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="p-3 mt-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                                  <div className="font-medium">Answer: {question.correctAnswer}</div>
                                  {question.explanation && (
                                    <div className="mt-1 text-sm">{question.explanation}</div>
                                  )}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" onClick={() => handlePracticeClick('Quiz')}>
                        <Play className="h-4 w-4 mr-2" />
                        See All Practice Questions
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formulas Tab */}
          <TabsContent value="formulas" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Formulas & Equations</CardTitle>
                <CardDescription>
                  Important formulas and equations for this concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                {conceptData.formulas && conceptData.formulas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conceptData.formulas.map((formula, index) => (
                      <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                        <div className="flex items-start">
                          <div className="font-mono text-sm">{formula}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-sm text-muted-foreground max-w-xs">
                      No formulas available for this concept.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Educational Videos</CardTitle>
                <CardDescription>
                  Watch these videos to enhance your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                {conceptData.videos && conceptData.videos.length > 0 ? (
                  <div className="space-y-4">
                    {conceptData.videos.map((video, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative pt-[56.25%] bg-gray-100 dark:bg-gray-800">
                          {/* Video thumbnail or embed would go here */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-12 w-12 text-gray-400" />
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-medium">{video.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{video.duration}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-sm text-muted-foreground max-w-xs">
                      No videos available for this concept.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Flashcards Tab */}
          <TabsContent value="flashcards" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>
                  Quick review flashcards for this concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Button onClick={() => handlePracticeClick('Flashcards')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Start Flashcard Practice
                  </Button>
                  <p className="text-sm text-muted-foreground max-w-xs mt-2">
                    {conceptData.flashcardsTotal ? 
                      `${conceptData.flashcardsTotal} flashcards available` : 
                      'Flashcards are being generated for this concept'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Quizzes & Tests</CardTitle>
                <CardDescription>
                  Test your knowledge with these quizzes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Button onClick={() => handlePracticeClick('Quiz')}>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    Start Quiz
                  </Button>
                  <p className="text-sm text-muted-foreground max-w-xs mt-2">
                    {conceptData.practiceQuestions ? 
                      `${conceptData.practiceQuestions.length} questions available` : 
                      'Questions are being prepared for this concept'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
