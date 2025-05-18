
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Play, 
  Pause, 
  VolumeX, 
  Volume2, 
  Bookmark, 
  MessageSquare, 
  File, 
  Link2 as LinkIcon, 
  Flag, 
  FlagOff,
  Brain,
  GraduationCap,
  Zap,
  ClipboardList,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedConceptDetailProps {
  conceptId: string;
  conceptTitle: string;
  conceptContent: string;
  subject: string;
  chapter: string;
  linkedConcepts?: Array<{id: string, title: string}>;
  relatedFlashcards?: Array<{id: string, front: string, back: string}>;
  relatedExams?: Array<{id: string, title: string}>;
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({
  conceptId,
  conceptTitle,
  conceptContent,
  subject,
  chapter,
  linkedConcepts = [],
  relatedFlashcards = [],
  relatedExams = []
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [isFlagged, setIsFlagged] = useState(false);
  const [notes, setNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<Array<{question: string, options: string[], correct: number}>>([]);
  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Read aloud functionality
  const handleToggleReadAloud = () => {
    if (!window.speechSynthesis) {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser doesn't support text-to-speech functionality.",
        variant: "destructive"
      });
      return;
    }
    
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(conceptContent);
      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === 'en-IN' || voice.name.includes('Indian') || voice.lang === 'en-US'
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  // Handle saving notes
  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully."
    });
  };
  
  // Handle flagging for revision
  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    
    toast({
      title: isFlagged ? "Removed from revision list" : "Added to revision list",
      description: isFlagged 
        ? "This concept has been removed from your revision list." 
        : "This concept has been added to your revision list.",
    });
  };
  
  // Handle asking AI tutor
  const handleAskTutor = () => {
    if (!currentQuestion.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a question to ask the AI tutor.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAiResponding(true);
    
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on "${conceptTitle}", I can explain that: ${conceptContent.substring(0, 150)}... 
      
To answer your question specifically: "${currentQuestion}" 

The key principle here is that ${conceptContent.substring(50, 150)}... Does that help clarify things? Feel free to ask follow-up questions!`);
      setIsAiResponding(false);
    }, 1500);
  };
  
  // Start quick recall practice
  const handleStartQuickRecall = () => {
    // In a real app, this would generate questions based on the concept content
    // Here we'll simulate some sample practice questions
    const sampleQuestions = [
      {
        question: `Which of the following best describes ${conceptTitle}?`,
        options: [
          "The relationship between force and acceleration",
          "The conservation of energy in closed systems",
          "The relationship between mass and gravity",
          "The effects of friction on moving objects"
        ],
        correct: 0
      },
      {
        question: `What is the primary application of ${conceptTitle} in real-world scenarios?`,
        options: [
          "Predicting weather patterns",
          "Designing efficient engines",
          "Building stable structures",
          "Understanding planetary motion"
        ],
        correct: 3
      },
      {
        question: "Which scientist is most closely associated with this concept?",
        options: [
          "Albert Einstein",
          "Isaac Newton",
          "Niels Bohr",
          "Galileo Galilei"
        ],
        correct: 1
      }
    ];
    
    setPracticeQuestions(sampleQuestions);
    setShowPracticeQuestions(true);
    setPracticeSubmitted(false);
    setPracticeAnswers({});
    
    toast({
      title: "Quick Recall Started",
      description: "Answer the questions to test your understanding of this concept."
    });
  };
  
  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (practiceSubmitted) return;
    setPracticeAnswers({
      ...practiceAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleSubmitQuiz = () => {
    setPracticeSubmitted(true);
    
    // Calculate score
    let correct = 0;
    practiceQuestions.forEach((q, i) => {
      if (practiceAnswers[i] === q.correct) {
        correct++;
      }
    });
    
    toast({
      title: "Quiz Submitted",
      description: `You got ${correct} out of ${practiceQuestions.length} correct.`
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{conceptTitle}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{subject}</span>
            <span>•</span>
            <span>{chapter}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={isReadingAloud ? "destructive" : "outline"} 
            size="sm"
            onClick={handleToggleReadAloud}
          >
            {isReadingAloud ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop Reading
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Read Aloud
              </>
            )}
          </Button>
          
          <Button
            variant={isFlagged ? "destructive" : "outline"}
            size="sm"
            onClick={handleToggleFlag}
          >
            {isFlagged ? (
              <>
                <FlagOff className="h-4 w-4 mr-2" />
                Unflag
              </>
            ) : (
              <>
                <Flag className="h-4 w-4 mr-2" />
                Flag for Revision
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="quick-recall" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Practice</span>
          </TabsTrigger>
          <TabsTrigger value="related" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Related</span>
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Ask</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                {typeof conceptContent === 'string' && conceptContent.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Textarea
                placeholder="Take notes on this concept..."
                className="min-h-[200px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quick-recall" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Recall Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showPracticeQuestions ? (
                <div className="text-center p-4">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-medium text-lg">Test your understanding</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate practice questions based on this concept to reinforce your learning.
                  </p>
                  <Button onClick={handleStartQuickRecall}>
                    <Zap className="h-4 w-4 mr-2" /> Start Practice
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {practiceQuestions.map((question, qIndex) => (
                    <div key={qIndex} className={`border rounded-md p-4 ${
                      practiceSubmitted && practiceAnswers[qIndex] === question.correct ? 'border-green-500 bg-green-50' : 
                      practiceSubmitted && practiceAnswers[qIndex] !== undefined ? 'border-red-500 bg-red-50' : 
                      'border-gray-200'
                    }`}>
                      <p className="font-medium mb-3">{qIndex + 1}. {question.question}</p>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div 
                            key={oIndex}
                            onClick={() => handleSelectAnswer(qIndex, oIndex)}
                            className={`p-2 rounded-md cursor-pointer ${
                              practiceAnswers[qIndex] === oIndex && !practiceSubmitted ? 'bg-blue-100 border border-blue-300' :
                              practiceSubmitted && oIndex === question.correct ? 'bg-green-100 border border-green-300' :
                              practiceSubmitted && practiceAnswers[qIndex] === oIndex ? 'bg-red-100 border border-red-300' :
                              'hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      {practiceSubmitted && practiceAnswers[qIndex] !== question.correct && (
                        <p className="text-sm text-green-600 mt-2">
                          The correct answer is: {question.options[question.correct]}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {!practiceSubmitted && (
                    <Button 
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(practiceAnswers).length !== practiceQuestions.length}
                      className="w-full"
                    >
                      Submit Answers
                    </Button>
                  )}
                  
                  {practiceSubmitted && (
                    <div className="flex space-x-4">
                      <Button onClick={() => setShowPracticeQuestions(false)} variant="outline" className="flex-1">
                        Close
                      </Button>
                      <Button onClick={handleStartQuickRecall} className="flex-1">
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Quick Recall adapts to your performance to focus on areas you need most practice.</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Linked Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" /> Linked Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {linkedConcepts.length > 0 ? (
                  <div className="space-y-2">
                    {linkedConcepts.map((concept, idx) => (
                      <Button key={idx} variant="ghost" className="w-full justify-start text-left">
                        {concept.title}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No linked concepts available.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Related Flashcards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Related Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {relatedFlashcards.length > 0 ? (
                  <div className="space-y-2">
                    {relatedFlashcards.map((card, idx) => (
                      <div key={idx} className="bg-muted p-2 rounded-md text-sm">
                        <p className="font-medium">{card.front}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No related flashcards available.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Related Exams */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" /> Related Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                {relatedExams.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {relatedExams.map((exam, idx) => (
                      <Badge key={idx} variant="outline">
                        {exam.title}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No related exams available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ask" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ask AI Tutor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ask a question about this concept..."
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAskTutor} disabled={isAiResponding}>
                {isAiResponding ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Thinking...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" /> Send Question
                  </>
                )}
              </Button>
              
              {aiResponse && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">AI Tutor Response:</h3>
                  <div className="bg-muted p-4 rounded-md">
                    {aiResponse.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedConceptDetail;
