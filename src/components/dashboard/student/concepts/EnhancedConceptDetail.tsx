
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, BookOpen, FileText, Brain, MessageSquare, Star, 
  BookmarkPlus, Lightbulb, Info, Volume2, Flag, Heading1, Paperclip,
  Zap, Link, FileQuestion, BookMarked, VolumeX, PenLine
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConceptDetailProps {
  conceptId: string;
  title?: string;
  subject?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  content?: string;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({
  conceptId,
  title = "Understanding Cell Division",
  subject = "Biology",
  topic = "Cell Biology",
  difficulty = "medium",
  content = "Cell division is the process by which a parent cell divides into two or more daughter cells. Cell division usually occurs as part of a larger cell cycle. In eukaryotes, there are two distinct types of cell division: mitosis and meiosis."
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookmarked, setBookmarked] = useState(false);
  const [showAIInsight, setShowAIInsight] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [speechInstance, setSpeechInstance] = useState<SpeechSynthesisUtterance | null>(null);
  const [userNote, setUserNote] = useState("");
  const [userNotes, setUserNotes] = useState<string[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponding, setAiResponding] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const { toast } = useToast();

  // Difficulty color mapping
  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500"
  };

  // Simulate connected concepts
  const relatedConcepts = [
    { id: "c1", title: "Mitosis", subject: "Biology" },
    { id: "c2", title: "Meiosis", subject: "Biology" },
    { id: "c3", title: "Cell Cycle", subject: "Biology" }
  ];

  // Simulate flashcards related to concept
  const relatedFlashcards = [
    { id: "f1", front: "What are the main stages of mitosis?", back: "Prophase, Metaphase, Anaphase, Telophase" },
    { id: "f2", front: "What is the purpose of cell division?", back: "Growth, repair, reproduction" }
  ];

  // Simulate formulas related to concept
  const relatedFormulas = [
    { id: "form1", name: "Cell Division Rate", formula: "Rate = N₀ × 2^(t/g)", description: "Where N₀ is initial number of cells, t is time, g is generation time" }
  ];

  // Quick recall practice questions
  const quickRecallQuestions = [
    { question: "What are the two main types of cell division?", answer: "Mitosis and Meiosis" },
    { question: "During which phase of the cell cycle does DNA replication occur?", answer: "S phase (Synthesis)" },
    { question: "Which process produces genetically identical daughter cells?", answer: "Mitosis" }
  ];
  
  // Practice flashcards
  const practiceFlashcards = [
    { question: "Define mitosis", answer: "A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus" },
    { question: "Purpose of meiosis", answer: "To produce haploid gametes (sperm or eggs) for sexual reproduction" }
  ];

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: bookmarked ? "Removed from your saved concepts" : "Added to your saved concepts",
    });
  };

  const toggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Flag removed" : "Concept flagged for revision",
      description: isFlagged ? "Removed from revision list" : "Added to your revision list",
    });
  };

  const toggleAIInsight = () => {
    setShowAIInsight(!showAIInsight);
  };
  
  const toggleReadAloud = () => {
    if (isReading) {
      // Stop reading
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
    } else {
      // Start reading
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = stripHtmlTags(content);
        speech.volume = 1;
        speech.rate = 0.9;
        speech.pitch = 1;
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha'));
        
        if (preferredVoice) {
          speech.voice = preferredVoice;
        }
        
        speech.onend = () => {
          setIsReading(false);
        };
        
        window.speechSynthesis.speak(speech);
        setSpeechInstance(speech);
        setIsReading(true);
        
        toast({
          title: "Reading aloud",
          description: "Text-to-speech started",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Text-to-speech not supported",
          description: "Your browser does not support text-to-speech",
        });
      }
    }
  };
  
  // Handle adding notes
  const handleAddNote = () => {
    if (userNote.trim()) {
      setUserNotes([...userNotes, userNote]);
      setUserNote("");
      
      toast({
        title: "Note added",
        description: "Your note has been saved",
      });
    }
  };
  
  // Strip HTML tags from content for text-to-speech
  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  // Handle AI tutor question
  const askAITutor = () => {
    if (!aiQuestion.trim()) return;
    
    setAiResponding(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "Mitosis is the process of cell division which results in two identical daughter cells, each containing the same number of chromosomes as the parent cell. This is primarily used for growth and repair in multicellular organisms.",
        "Cell division is essential for growth, repair, and reproduction. In unicellular organisms, it's the primary method of reproduction, while in multicellular organisms it helps with growth, tissue repair, and maintaining cell populations.",
        "The key difference between mitosis and meiosis is that mitosis produces two genetically identical diploid cells, while meiosis produces four genetically diverse haploid cells (gametes). Mitosis is for growth and repair, while meiosis is for sexual reproduction."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setAiResponding(false);
    }, 1500);
  };
  
  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && speechInstance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechInstance]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-0.5 rounded text-sm">
                  {subject}
                </span>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2.5 py-0.5 rounded text-sm">
                  {topic}
                </span>
                <span className={`${difficultyColor[difficulty]} bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded text-sm`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={toggleFlag}
                className={isFlagged ? "border-orange-400 text-orange-600" : ""}
              >
                <Flag className={`mr-1 h-4 w-4 ${isFlagged ? 'fill-orange-200' : ''}`} />
                {isFlagged ? 'Flagged' : 'Flag for Revision'}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={toggleBookmark}
              >
                <BookmarkPlus className={`mr-1 h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="default" size="sm">
                <Check className="mr-1 h-4 w-4" />
                Mark as Learned
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <TabsList className="flex bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="readAloud" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Read Aloud
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger 
                value="recall" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Zap className="h-4 w-4 mr-2" />
                Quick Recall
              </TabsTrigger>
              <TabsTrigger 
                value="related" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Link className="h-4 w-4 mr-2" />
                Related
              </TabsTrigger>
              <TabsTrigger 
                value="flashcards" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <FileQuestion className="h-4 w-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger 
                value="ai-insights" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview tab */}
          <TabsContent value="overview" className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="prose dark:prose-invert max-w-none">
                <h3>Concept Explanation</h3>
                <p>{content}</p>
                <p>
                  Cell division is necessary for the growth of organisms, tissue repair, and reproduction. 
                  The process ensures the continuity of life from one generation to the next.
                </p>
                
                <h4>Key Points:</h4>
                <ul>
                  <li>Cell division results in genetically identical daughter cells</li>
                  <li>Mitosis is for growth and repair, meiosis is for sexual reproduction</li>
                  <li>The cell cycle has distinct phases: G1, S, G2, and M phase</li>
                </ul>
                
                <div className="flex space-x-3 mt-6">
                  <Button 
                    onClick={toggleReadAloud}
                    className="flex items-center"
                  >
                    {isReading ? 
                      <><VolumeX className="h-4 w-4 mr-2" /> Stop Reading</> : 
                      <><Volume2 className="h-4 w-4 mr-2" /> Read Aloud</>
                    }
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={toggleAIInsight}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    AI Explanation
                  </Button>
                </div>
                
                {showAIInsight && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <h5 className="font-medium text-yellow-700 dark:text-yellow-300">Sakha AI Explanation</h5>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Think of cell division like a book being copied. The original book (parent cell) 
                      makes copies of all its pages (DNA replication) and then separates into two 
                      complete books (daughter cells). This happens so more books can be added to the 
                      library (growth), damaged books can be replaced (repair), or new libraries can 
                      be started (reproduction).
                    </p>
                  </div>
                )}
              </div>

              {/* Related formulas */}
              {relatedFormulas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Related Formulas</h3>
                  {relatedFormulas.map(formula => (
                    <Card key={formula.id} className="mb-4">
                      <CardHeader className="py-3">
                        <CardTitle className="text-md">{formula.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md font-mono text-center">
                          {formula.formula}
                        </div>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{formula.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Read Aloud tab */}
          <TabsContent value="readAloud" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Read Aloud</h3>
                <Button 
                  variant={isReading ? "destructive" : "default"}
                  onClick={toggleReadAloud}
                >
                  {isReading ? 
                    <><VolumeX className="h-4 w-4 mr-2" /> Stop Reading</> : 
                    <><Volume2 className="h-4 w-4 mr-2" /> Start Reading</>
                  }
                </Button>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Text-to-Speech Reader</CardTitle>
                  <CardDescription>Listen to the concept explanation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${isReading ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-900'}`}>
                    <p className="leading-relaxed">{stripHtmlTags(content)}</p>
                    
                    {isReading && (
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-1 h-5 bg-blue-500 animate-pulse"></div>
                          <div className="w-1 h-7 bg-blue-500 animate-pulse delay-75"></div>
                          <div className="w-1 h-4 bg-blue-500 animate-pulse delay-150"></div>
                          <div className="w-1 h-6 bg-blue-500 animate-pulse delay-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col">
                    <h4 className="font-medium mb-2">Voice Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Speed</label>
                        <select 
                          className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                          disabled={isReading}
                        >
                          <option value="0.7">Slow</option>
                          <option value="0.9" selected>Normal</option>
                          <option value="1.1">Fast</option>
                          <option value="1.3">Very Fast</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Voice</label>
                        <select 
                          className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                          disabled={isReading}
                        >
                          <option value="female" selected>Female</option>
                          <option value="male">Male</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-900 border-t">
                  <Button 
                    variant="outline" 
                    disabled={isReading}
                    onClick={() => {
                      toast({
                        title: "Audio downloaded",
                        description: "The audio file has been downloaded",
                      });
                    }}
                  >
                    Download Audio
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isReading}
                  >
                    Advanced Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Text-to-speech makes learning accessible and helps with pronunciation of complex terms.</p>
              </div>
            </div>
          </TabsContent>

          {/* Notes tab */}
          <TabsContent value="notes" className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium">Your Notes</h3>
                <Button
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Notes exported",
                      description: "Your notes have been exported to PDF",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export Notes
                </Button>
              </div>
              
              {userNotes.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {userNotes.map((note, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <PenLine className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-800 dark:text-gray-200">{note}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right">
                          {new Date().toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg mb-4">
                  <p className="italic text-gray-600 dark:text-gray-400 text-center">No notes added yet. Start taking notes about this concept.</p>
                </div>
              )}
              
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                <Textarea 
                  className="w-full min-h-[150px] bg-transparent outline-none resize-none p-2 border-0" 
                  placeholder="Take notes about this concept..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                />
                <div className="flex justify-between items-center p-2 border-t border-gray-300 dark:border-gray-600">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading1 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleAddNote}>Save Note</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Quick Recall tab */}
          <TabsContent value="recall" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Quick Recall Practice</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                  Strengthen Memory
                </Badge>
              </div>
              
              <div className="space-y-4">
                {quickRecallQuestions.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md">Question {index + 1}</CardTitle>
                        <Badge>Quick Recall</Badge>
                      </div>
                      <CardDescription className="mt-2">{item.question}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <details className="group">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Show Answer</span>
                          <span className="transition-transform transform group-open:rotate-180">
                            ▼
                          </span>
                        </summary>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-800">
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate More Questions
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Related Concepts tab */}
          <TabsContent value="related" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Linked Concept Cards</h3>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  Knowledge Graph
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedConcepts.map(concept => (
                  <Card key={concept.id} className="hover:border-primary transition-colors cursor-pointer hover:shadow-md">
                    <CardHeader className="py-3">
                      <CardTitle className="text-md">{concept.title}</CardTitle>
                      <CardDescription>{concept.subject}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0 pb-3 flex justify-between">
                      <Badge variant="outline">{concept.subject}</Badge>
                      <Button variant="ghost" size="sm">
                        <Link className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-900/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">How concepts are connected</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Understanding the relationships between concepts helps you build a more comprehensive knowledge map. 
                    These linked concepts are essential for mastering the subject matter as a whole.
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm">
                      View Knowledge Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Flashcards & Exams tab */}
          <TabsContent value="flashcards" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Flashcards & Practice Tests</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    Active Recall
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                    Exam Prep
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {practiceFlashcards.map((card, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900 py-3">
                      <CardTitle className="text-md">Flashcard {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Question:</h4>
                        <p>{card.question}</p>
                      </div>
                      <details className="group">
                        <summary className="list-none p-4 cursor-pointer flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <span className="font-medium text-blue-600 dark:text-blue-400">View Answer</span>
                          <span className="transition-transform transform group-open:rotate-180">
                            ▼
                          </span>
                        </summary>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Answer:</h4>
                          <p>{card.answer}</p>
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Convert to Exam Format</CardTitle>
                  <CardDescription>Practice with multiple-choice questions based on this concept</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="font-medium mb-3">What is the main function of mitosis?</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="radio" id="opt1" name="question" className="mr-2" />
                        <label htmlFor="opt1">Cell growth and repair</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="opt2" name="question" className="mr-2" />
                        <label htmlFor="opt2">Production of gametes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="opt3" name="question" className="mr-2" />
                        <label htmlFor="opt3">Genetic recombination</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="opt4" name="question" className="mr-2" />
                        <label htmlFor="opt4">Increasing genetic diversity</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Skip Question
                  </Button>
                  <Button>
                    Check Answer
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex justify-center">
                <Button>
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Generate Complete Practice Test
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* AI Tutor tab */}
          <TabsContent value="ai-insights" className="p-6">
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium text-purple-700 dark:text-purple-300">Ask Sakha AI Tutor</h3>
                </div>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  Have a specific question about {title}? Ask your AI tutor for help!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Type your question here..."
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button 
                      onClick={askAITutor} 
                      disabled={!aiQuestion.trim() || aiResponding}
                    >
                      {aiResponding ? "Processing..." : "Ask"}
                    </Button>
                  </div>
                  
                  {(aiResponding || aiResponse) && (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                          {aiResponding ? (
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex space-x-2 justify-center items-center h-6">
                                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                              <p>{aiResponse}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Learning Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Create a visual diagram of the cell cycle to better understand the sequence of events</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Connect this concept to DNA replication to understand how genetic material is preserved</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Practice explaining the difference between mitosis and meiosis in your own words</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Common Misconceptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Cell division always results in identical cells</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">While mitosis produces genetically identical cells, meiosis produces genetically diverse cells.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">All cells divide at the same rate</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Different cell types have different division rates; some cells like neurons rarely divide.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
