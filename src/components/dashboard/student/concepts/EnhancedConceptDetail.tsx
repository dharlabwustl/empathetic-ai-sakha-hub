
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Play, 
  Pause, 
  Link2 as LinkIcon, 
  Flag, 
  FlagOff,
  Brain,
  GraduationCap,
  Zap,
  ClipboardList,
  CheckCircle,
  MessageSquare,
  Book,
  ArrowLeft,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [isFlagged, setIsFlagged] = useState(false);
  const [notes, setNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<{[key: number]: number}>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Sample practice questions generated based on content
  const practiceQuestions = [
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
  
  // Handle bookmark toggle
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your bookmarks." 
        : "This concept has been added to your bookmarks.",
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
  
  // Handle practice answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setPracticeAnswers({
      ...practiceAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  // Handle practice submission
  const handleSubmitPractice = () => {
    setPracticeSubmitted(true);
    
    // Calculate score
    const correctAnswers = Object.entries(practiceAnswers).filter(
      ([questionIndex, answerIndex]) => 
        practiceQuestions[parseInt(questionIndex)].correct === answerIndex
    ).length;
    
    const score = Math.round((correctAnswers / practiceQuestions.length) * 100);
    
    toast({
      title: "Practice completed!",
      description: `You got ${correctAnswers} out of ${practiceQuestions.length} correct (${score}%).`
    });
  };
  
  // Calculate mastery level based on practice score
  const masteryLevel = 65; // Sample mastery percentage
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">{conceptTitle}</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                Intermediate
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Book className="h-4 w-4 mr-1" />
              <span className="mr-3">{subject}</span>
              <span className="mx-2">•</span>
              <span>{chapter}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={isBookmarked ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
              onClick={handleToggleBookmark}
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className={isFlagged ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
              onClick={handleToggleFlag}
            >
              {isFlagged ? <FlagOff className="h-4 w-4 mr-1" /> : <Flag className="h-4 w-4 mr-1" />}
              {isFlagged ? "Remove Flag" : "Flag for Revision"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className={isReadingAloud ? "bg-green-50 text-green-700 border-green-200" : ""}
              onClick={handleToggleReadAloud}
            >
              {isReadingAloud ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isReadingAloud ? "Stop Reading" : "Read Aloud"}
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">
            <BookOpen className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Brain className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Practice</span>
          </TabsTrigger>
          <TabsTrigger value="notes">
            <ClipboardList className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="tutor">
            <GraduationCap className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>AI Tutor</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Details</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert">
                  <div>{conceptContent.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}</div>
                </CardContent>
              </Card>
              
              {/* Mastery Progress */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Mastery Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Mastery</span>
                        <span className="text-sm font-medium">{masteryLevel}%</span>
                      </div>
                      <Progress value={masteryLevel} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">Recall Accuracy</span>
                          <span className="text-xs font-medium">70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">Quiz Performance</span>
                          <span className="text-xs font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground">
                      Last studied 3 days ago • Scheduled for review tomorrow
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              {/* Related Resources */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Linked Concepts */}
                  {linkedConcepts && linkedConcepts.length > 0 && (
                    <div>
                      <h3 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <LinkIcon className="h-4 w-4 text-blue-500" />
                        Linked Concepts
                      </h3>
                      <div className="space-y-2">
                        {linkedConcepts.map((concept) => (
                          <Button
                            key={concept.id}
                            variant="outline"
                            className="w-full justify-start text-left"
                            onClick={() => navigate(`/dashboard/student/concept-study/${concept.id}`)}
                          >
                            {concept.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Related Flashcards */}
                  {relatedFlashcards && relatedFlashcards.length > 0 && (
                    <div>
                      <h3 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Related Flashcards
                      </h3>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left"
                        onClick={() => navigate(`/dashboard/student/flashcards`)}
                      >
                        View {relatedFlashcards.length} Related Flashcards
                      </Button>
                    </div>
                  )}
                  
                  {/* Related Exams */}
                  {relatedExams && relatedExams.length > 0 && (
                    <div>
                      <h3 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <ClipboardList className="h-4 w-4 text-green-500" />
                        Related Exams
                      </h3>
                      <div className="space-y-2">
                        {relatedExams.map((exam) => (
                          <Button
                            key={exam.id}
                            variant="outline"
                            className="w-full justify-start text-left"
                            onClick={() => navigate(`/dashboard/student/practice-exam/${exam.id}`)}
                          >
                            {exam.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={() => setActiveTab("practice")}>
                    <Brain className="mr-2 h-4 w-4" />
                    Start Quick Recall Practice
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setActiveTab("notes")}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Add Notes
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setActiveTab("tutor")}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Ask AI Tutor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Recall Practice</CardTitle>
            </CardHeader>
            <CardContent>
              {!showPracticeQuestions ? (
                <div className="text-center p-8">
                  <Brain className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h3>
                  <p className="mb-6 text-muted-foreground">
                    This quick recall practice will help reinforce your understanding of {conceptTitle}.
                  </p>
                  <Button onClick={() => setShowPracticeQuestions(true)}>
                    Start Practice Questions
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {practiceQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="space-y-4">
                      <h3 className="font-medium">Question {qIndex + 1}: {q.question}</h3>
                      
                      <RadioGroup 
                        value={practiceAnswers[qIndex]?.toString()} 
                        onValueChange={(val) => handleAnswerSelect(qIndex, parseInt(val))}
                        disabled={practiceSubmitted}
                      >
                        {q.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                            <Radio 
                              value={oIndex.toString()} 
                              id={`q${qIndex}-a${oIndex}`}
                              className={practiceSubmitted ? 
                                q.correct === oIndex ? "text-green-500 border-green-500" : 
                                practiceAnswers[qIndex] === oIndex ? "text-red-500 border-red-500" : "" 
                                : ""}
                            />
                            <Label 
                              htmlFor={`q${qIndex}-a${oIndex}`}
                              className={practiceSubmitted ?
                                q.correct === oIndex ? "text-green-700 font-medium" : 
                                practiceAnswers[qIndex] === oIndex ? "text-red-700" : "" 
                                : ""}
                            >
                              {option}
                              {practiceSubmitted && q.correct === oIndex && (
                                <CheckCircle className="inline-block ml-1 h-4 w-4 text-green-500" />
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      
                      {practiceSubmitted && practiceAnswers[qIndex] !== undefined && practiceAnswers[qIndex] !== q.correct && (
                        <div className="text-sm bg-red-50 text-red-800 p-2 rounded-md mt-2">
                          <span className="font-medium">Correct answer:</span> {q.options[q.correct]}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    {!practiceSubmitted ? (
                      <Button 
                        onClick={handleSubmitPractice}
                        disabled={Object.keys(practiceAnswers).length < practiceQuestions.length}
                      >
                        Submit Answers
                      </Button>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                        <div>
                          <h3 className="font-bold text-lg">
                            Your score: {Math.round((Object.entries(practiceAnswers).filter(
                              ([qIndex, aIndex]) => practiceQuestions[parseInt(qIndex)].correct === aIndex
                            ).length / practiceQuestions.length) * 100)}%
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Great job! Keep practicing to improve your mastery.
                          </p>
                        </div>
                        <Button 
                          onClick={() => {
                            setPracticeSubmitted(false);
                            setPracticeAnswers({});
                            setShowPracticeQuestions(false);
                          }}
                          variant="outline"
                        >
                          Reset & Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={`Add your notes about ${conceptTitle} here...`}
                className="min-h-[200px] mb-4"
              />
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutor" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Ask a question about this concept:</h3>
                <div className="flex gap-2">
                  <Textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder={`E.g., Can you explain ${conceptTitle} with a simple example?`}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAskTutor} 
                    disabled={isAiResponding || !currentQuestion.trim()}
                    className="self-end"
                  >
                    {isAiResponding ? "Thinking..." : "Ask"}
                  </Button>
                </div>
              </div>
              
              {isAiResponding ? (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md animate-pulse">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                    <p>AI is thinking...</p>
                  </div>
                </div>
              ) : aiResponse && (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-2">AI Tutor</h3>
                      <div className="whitespace-pre-wrap">{aiResponse}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {!aiResponse && !isAiResponding && (
                <div className="text-center p-6">
                  <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Ask any question about {conceptTitle} and our AI Tutor will help you understand it better.
                  </p>
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
