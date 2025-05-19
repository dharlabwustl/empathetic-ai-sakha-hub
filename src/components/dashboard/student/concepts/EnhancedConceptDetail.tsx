
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  CheckCircle, 
  Timer, 
  Star, 
  BadgeCheck, 
  ArrowRight, 
  ChevronRight, 
  VolumeUp,
  MessageSquare,
  Flag,
  Bookmark,
  BookMarked,
  Pencil,
  X,
  Brain,
  Lightbulb,
  Zap,
  Save
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ConceptCard, MasteryLevel } from "@/types/user/conceptCard";
import ConceptExplanationContent from '../concept-cards/ConceptExplanationContent';
import useUserNotes from '@/hooks/useUserNotes';
import { Textarea } from '@/components/ui/textarea';

// Import icons for the new features
import {
  Volume2 as ReadAloudIcon,
  Pencil as NotesIcon,
  Zap as QuickRecallIcon,
  Link as LinkedConceptsIcon,
  BookOpenCheck as FlashcardsIcon,
  Flag as RevisionIcon,
  MessageCircle as AskDoubtIcon
} from 'lucide-react';

interface EnhancedConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({ 
  conceptId, 
  title, 
  subject, 
  topic, 
  difficulty, 
  content 
}) => {
  const { toast } = useToast();
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeQuickRecallCard, setActiveQuickRecallCard] = useState<number | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{type: 'user' | 'bot', message: string}[]>([]);
  
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load user's note for this concept
  useEffect(() => {
    const savedNote = getNoteForConcept(conceptId);
    setNoteContent(savedNote);
  }, [conceptId, getNoteForConcept]);

  // Mock data for the concept detail page
  const masteryLevel: MasteryLevel = {
    level: "Intermediate",
    color: "text-yellow-500",
    minScore: 60
  };

  const masteryPercentage = 65;

  const linkedConcepts = [
    { id: "c1", title: "Cell Theory Basics", difficulty: "easy" as const },
    { id: "c2", title: "Mitosis vs Meiosis", difficulty: "medium" as const },
    { id: "c3", title: "Cytoplasmic Division", difficulty: "medium" as const }
  ];

  const quickRecallCards = [
    { 
      question: "What are the two main types of cell division?", 
      answer: "Mitosis and Meiosis" 
    },
    { 
      question: "Which type of cell division is for growth and repair?", 
      answer: "Mitosis" 
    },
    { 
      question: "What are the phases of the cell cycle?", 
      answer: "Interphase (G₁, S, G₂) and Mitotic phase (mitosis and cytokinesis)" 
    }
  ];

  // Toggle bookmark status
  const handleToggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Concept removed from your bookmarks" : "Concept added to your bookmarks",
    });
  };

  // Toggle revision flag
  const handleToggleFlag = () => {
    setIsFlagged(prev => !prev);
    
    toast({
      title: isFlagged ? "Flag removed" : "Flagged for revision",
      description: isFlagged ? "Concept removed from revision list" : "Added to your revision list for later review",
    });
  };

  // Handle saving user notes
  const handleSaveNote = () => {
    saveNote(conceptId, noteContent);
    setIsEditingNote(false);
    
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  // Read aloud functionality
  const handleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = content;
    
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Set preferred voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google US English') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Daniel')
      );
      
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Text-to-speech unavailable",
        description: "Your browser doesn't support text-to-speech functionality",
        variant: "destructive"
      });
    }
  };

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Flash card conversion handling
  const handleConvertToFlashcards = () => {
    toast({
      title: "Converting to flashcards",
      description: "Creating flashcard set from this concept...",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      toast({
        title: "Flashcards created",
        description: "5 flashcards have been added to your collection",
      });
    }, 1500);
  };

  // AI chat handling
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, {type: 'user', message: chatMessage}]);
    
    // Simulate bot typing
    setTimeout(() => {
      // Add bot response
      const botResponses = [
        "Cell division is the process by which a parent cell divides into two or more daughter cells. There are two main types: mitosis and meiosis.",
        "Great question! Mitosis is used for growth and repair, while meiosis is for sexual reproduction. The key difference is that mitosis produces two identical cells, while meiosis produces four genetically diverse cells.",
        "The phases of mitosis are: prophase, metaphase, anaphase, and telophase. Each phase has unique characteristics related to the chromosome behavior.",
        "I'd be happy to explain that concept in more detail. The cell cycle consists of interphase (G₁, S, G₂ phases) and the mitotic phase."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setChatMessages(prev => [...prev, {type: 'bot', message: randomResponse}]);
    }, 1000);
    
    // Clear input
    setChatMessage('');
  };

  // Handle quick recall cards
  const handleFlipRecallCard = (index: number) => {
    if (activeQuickRecallCard === index) {
      setActiveQuickRecallCard(null);
    } else {
      setActiveQuickRecallCard(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{subject}</span>
              <ChevronRight className="h-4 w-4" />
              <span>{topic}</span>
            </div>
            
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleBookmark}
              className="flex items-center gap-1"
            >
              {isBookmarked ? (
                <BookMarked className="h-4 w-4 text-indigo-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            
            <Button
              variant={isFlagged ? "destructive" : "outline"}
              size="sm"
              onClick={handleToggleFlag}
              className="flex items-center gap-1"
            >
              <Flag className={`h-4 w-4 ${isFlagged ? "text-white" : ""}`} />
              <span className="hidden sm:inline">{isFlagged ? "Flagged" : "Flag for Revision"}</span>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <Badge
            variant={
              difficulty === "easy" ? "success" :
              difficulty === "medium" ? "warning" : "destructive"
            }
            className="text-xs"
          >
            {difficulty === "easy" ? "Easy" :
             difficulty === "medium" ? "Medium" : "Hard"}
          </Badge>
          
          <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
            <BadgeCheck className="h-3 w-3" />
            <span>{masteryLevel.level} Level</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Timer className="h-3 w-3" />
            <span>Est. time: 15 min</span>
          </div>
        </div>
        
        {/* Feature quick access bar */}
        <div className="mt-6">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={handleReadAloud}
                >
                  <ReadAloudIcon size={20} className={isSpeaking ? "text-blue-500 animate-pulse" : ""} />
                  <span className="text-xs">Read Aloud</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={() => {
                    setActiveTab("notes");
                    setIsEditingNote(true);
                  }}
                >
                  <NotesIcon size={20} />
                  <span className="text-xs">Add Notes</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={() => setActiveTab("quick-recall")}
                >
                  <QuickRecallIcon size={20} />
                  <span className="text-xs">Quick Recall</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={() => setActiveTab("linked-concepts")}
                >
                  <LinkedConceptsIcon size={20} />
                  <span className="text-xs">Linked Concepts</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={handleConvertToFlashcards}
                >
                  <FlashcardsIcon size={20} />
                  <span className="text-xs">Flashcards</span>
                </Button>
                
                <Button 
                  variant={isFlagged ? "default" : "ghost"} 
                  className={`flex flex-col items-center justify-center gap-1 h-auto py-3 ${isFlagged ? "bg-red-500 text-white hover:bg-red-600" : ""}`}
                  onClick={handleToggleFlag}
                >
                  <RevisionIcon size={20} />
                  <span className="text-xs">{isFlagged ? "Flagged" : "Flag"}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex flex-col items-center justify-center gap-1 h-auto py-3"
                  onClick={() => {
                    setShowChatbot(true);
                    setActiveTab("ask-doubt");
                    // Add initial bot message
                    if (chatMessages.length === 0) {
                      setChatMessages([{
                        type: 'bot', 
                        message: `Hello! I'm your AI tutor for ${title}. What questions do you have about this concept?`
                      }]);
                    }
                  }}
                >
                  <AskDoubtIcon size={20} />
                  <span className="text-xs">Ask AI Tutor</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Area with Tabs */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="explanations">Explanations</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="quick-recall">Quick Recall</TabsTrigger>
              <TabsTrigger value="linked-concepts">Related</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="ask-doubt">AI Tutor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Progress section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Concept Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Mastery Progress</h3>
                      <span className="text-sm font-medium">{masteryPercentage}%</span>
                    </div>
                    
                    <Progress value={masteryPercentage} className="h-2" />
                    
                    <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        Mastery Level: <span className={masteryLevel.color}>{masteryLevel.level}</span>
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Continue practicing to improve your mastery of this concept.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Content section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>{content}</p>
                </CardContent>
              </Card>
              
              {/* Key Points section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>Cell division is the process by which a parent cell divides into two or more daughter cells.</p>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>Two main types of cell division: mitosis (for growth and repair) and meiosis (for sexual reproduction).</p>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>The cell cycle consists of interphase (G₁, S, G₂ phases) and the mitotic phase.</p>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>During interphase, the cell grows and DNA replication occurs.</p>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>During mitosis, chromosomes are separated into two nuclei, and cytokinesis divides the cytoplasm.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Common Mistakes section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    Common Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-900 dark:text-red-300">
                      Confusing mitosis and meiosis - remember that mitosis produces two identical cells, while meiosis produces four different cells.
                    </li>
                    <li className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-900 dark:text-red-300">
                      Mixing up the phases of mitosis - the correct order is prophase, metaphase, anaphase, and telophase.
                    </li>
                    <li className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-900 dark:text-red-300">
                      Forgetting that interphase is not part of mitosis but is part of the cell cycle.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="explanations">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    Multiple Explanations
                  </CardTitle>
                  <CardDescription>
                    Choose the explanation style that works best for your learning style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConceptExplanationContent conceptTitle={title} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-indigo-500" />
                      My Notes
                    </CardTitle>
                    
                    {!isEditingNote && noteContent && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditingNote(true)}
                        className="gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditingNote ? (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Add your personal notes for this concept..."
                        className="min-h-[200px] text-base"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                      />
                      
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditingNote(false);
                            setNoteContent(getNoteForConcept(conceptId));
                          }}
                        >
                          Cancel
                        </Button>
                        
                        <Button onClick={handleSaveNote} className="gap-1">
                          <Save className="h-4 w-4" />
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  ) : noteContent ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{noteContent}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Pencil className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Add your personal notes to help remember this concept
                      </p>
                      <Button onClick={() => setIsEditingNote(true)}>
                        Add Notes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quick-recall">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Quick Recall Practice
                  </CardTitle>
                  <CardDescription>
                    Test your understanding of key concepts with these recall cards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quickRecallCards.map((card, index) => (
                      <motion.div
                        key={index}
                        className={`border rounded-lg p-4 cursor-pointer relative overflow-hidden ${
                          activeQuickRecallCard === index 
                            ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                            : 'bg-white dark:bg-gray-800'
                        }`}
                        onClick={() => handleFlipRecallCard(index)}
                        initial={false}
                        animate={{ height: activeQuickRecallCard === index ? 'auto' : '80px' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{`Question ${index + 1}`}</h3>
                          <Badge variant="outline">Click to {activeQuickRecallCard === index ? 'hide' : 'reveal'}</Badge>
                        </div>
                        
                        <p className="mt-2">{card.question}</p>
                        
                        {activeQuickRecallCard === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 pt-4 border-t"
                          >
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Answer:</h4>
                            <p className="font-medium text-green-700 dark:text-green-400">{card.answer}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">
                      Generate More Questions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="linked-concepts">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LinkedConceptsIcon className="h-5 w-5 text-blue-500" />
                    Related Concepts
                  </CardTitle>
                  <CardDescription>
                    Explore these related concepts to deepen your understanding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {linkedConcepts.map((concept) => (
                      <Card key={concept.id} className="overflow-hidden">
                        <div className={`h-2 ${
                          concept.difficulty === 'easy' ? 'bg-green-500' : 
                          concept.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{concept.title}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="pb-4">
                          <Badge
                            variant={
                              concept.difficulty === "easy" ? "success" :
                              concept.difficulty === "medium" ? "warning" : "destructive"
                            }
                            className="text-xs mb-4"
                          >
                            {concept.difficulty === "easy" ? "Easy" :
                             concept.difficulty === "medium" ? "Medium" : "Hard"}
                          </Badge>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2 gap-1"
                            onClick={() => {
                              toast({
                                title: "Navigating to concept",
                                description: `Opening "${concept.title}"...`
                              });
                            }}
                          >
                            Explore <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Knowledge Graph
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      See how this concept connects to other topics in your curriculum
                    </p>
                    
                    <Button variant="outline" className="gap-1">
                      View Knowledge Graph <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="formulas">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Relevant Formulas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No formulas for this concept</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This biology concept doesn't have mathematical formulas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ask-doubt">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    Ask AI Tutor
                  </CardTitle>
                  <CardDescription>
                    Get personalized explanations for any questions about {title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
                      {chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.type === 'user' 
                                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-gray-800 dark:text-gray-100' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                            }`}
                          >
                            <p>{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Ask a question about this concept..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} className="h-auto">Send</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
