
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  BarChart2, 
  Lightbulb, 
  Link as LinkIcon, 
  ArrowRight, 
  ArrowLeft, 
  Volume2,
  CheckCircle,
  Clock,
  Tag,
  Download,
  Video,
  ExternalLink,
  Play,
  PencilLine
} from 'lucide-react';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import ConceptTestQuestion from '@/components/home/exam-analyzer/concept-test/components/ConceptTestQuestion';
import { TestQuestion } from '@/components/home/exam-analyzer/types';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [recallStrength, setRecallStrength] = useState(72);
  const { toast } = useToast();
  const [quickQuizVisible, setQuickQuizVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  
  // Speech synthesis for Read Aloud feature
  const speechSynthesis = window.speechSynthesis;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    console.log("ConceptCardDetailPage - Loaded concept ID:", conceptId);
    
    // Load saved notes
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Get available voices for speech synthesis
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Clean up speech synthesis when component unmounts
    return () => {
      if (isReadingAloud) {
        speechSynthesis.cancel();
      }
    };
  }, [conceptId]);
  
  // Handle saving notes
  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes for this concept have been saved",
    });
  };
  
  // Toggle Read Aloud feature
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    if (conceptCard) {
      const contentToRead = `${conceptCard.title}. ${conceptCard.content}`;
      utteranceRef.current = new SpeechSynthesisUtterance(contentToRead);
      
      // Try to find an Indian English or Hindi voice
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
      );
      
      if (indianVoice) {
        utteranceRef.current.voice = indianVoice;
      } else {
        // Fallback to any English voice
        const englishVoice = voices.find(voice => voice.lang.includes('en-'));
        if (englishVoice) {
          utteranceRef.current.voice = englishVoice;
        }
      }
      
      utteranceRef.current.rate = 0.9; // Slightly slower rate for better comprehension
      utteranceRef.current.onend = () => setIsReadingAloud(false);
      
      speechSynthesis.speak(utteranceRef.current);
      setIsReadingAloud(true);
    }
  };
  
  // Mock quick quiz questions based on NEET medical exam pattern
  const quickQuizQuestions: TestQuestion[] = [
    {
      id: "q1",
      question: "In Newton's Second Law of Motion, which of the following correctly describes the relationship between force (F), mass (m), and acceleration (a)?",
      options: ["F = ma²", "F = ma", "F = m/a", "F = a/m"],
      correctOption: "F = ma"
    },
    {
      id: "q2",
      question: "What is the SI unit of force?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctOption: "Newton"
    },
    {
      id: "q3",
      question: "A 2 kg object experiences a net force of 10N. What is its acceleration?",
      options: ["5 m/s²", "20 m/s²", "2 m/s²", "10 m/s²"],
      correctOption: "5 m/s²"
    }
  ];
  
  // Handle quiz answer submission
  const handleQuizAnswer = (answer: string) => {
    const currentQuestion = quickQuizQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctOption;
    
    if (currentQuestionIndex < quickQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const correctAnswers = isCorrect ? 1 : 0; // Count this answer
      const finalScore = Math.round(((currentQuestionIndex + correctAnswers) / quickQuizQuestions.length) * 100);
      setQuizScore(finalScore);
    }
  };
  
  // Reset quiz state
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizScore(null);
    setQuickQuizVisible(true);
  };
  
  if (loading || !conceptCard) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading concept details...</p>
        </div>
      </div>
    );
  }
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Mock data for related concepts
  const relatedConcepts = [
    { id: 'concept-2', title: "Newton's Laws of Motion", subject: "Physics", difficulty: "Medium" },
    { id: 'concept-3', title: "Conservation of Energy", subject: "Physics", difficulty: "Hard" },
    { id: 'concept-4', title: "Momentum", subject: "Physics", difficulty: "Medium" }
  ];
  
  // Mock attempt history data
  const attemptHistory = [
    { date: "2023-05-15", score: 75, time: "10:30 AM" },
    { date: "2023-05-10", score: 60, time: "3:45 PM" },
    { date: "2023-05-05", score: 45, time: "2:15 PM" }
  ];

  // Mock additional resources
  const additionalResources = [
    {
      title: "NCERT Class 11 Physics Chapter 5",
      type: "pdf",
      icon: <FileText size={16} />,
      link: "#"
    },
    {
      title: "Worked Examples of Newton's Laws",
      type: "video",
      icon: <Video size={16} />,
      link: "#"
    },
    {
      title: "Interactive Force Simulator",
      type: "interactive",
      icon: <Play size={16} />,
      link: "#"
    },
    {
      title: "NEET Previous Year Questions",
      type: "problems",
      icon: <FileText size={16} />,
      link: "#"
    },
  ];

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col space-y-6">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2 hover:bg-slate-100 mb-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          <span>Back to Concepts</span>
        </Button>
        
        {/* Concept header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main concept info */}
          <div className="lg:col-span-2">
            <Card className="border-t-4 shadow-md" style={{ borderTopColor: '#6366f1' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{conceptCard.title}</CardTitle>
                    <CardDescription className="text-base">{conceptCard.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={isReadingAloud ? "destructive" : "outline"} 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={toggleReadAloud}
                    >
                      <Volume2 size={16} />
                      {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                    </Button>
                    
                    <Dialog open={quickQuizVisible} onOpenChange={setQuickQuizVisible}>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm" className="flex items-center gap-2">
                          <Brain size={16} />
                          Quick Quiz
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Test Your Understanding</DialogTitle>
                        </DialogHeader>
                        {quizScore !== null ? (
                          <div className="py-6 text-center">
                            <div className="mb-4 text-4xl font-bold text-indigo-600">{quizScore}%</div>
                            <p className="mb-4">
                              {quizScore >= 70 ? "Great job! You have a good understanding of this concept." :
                               quizScore >= 50 ? "Nice try! Review the concept and try again." :
                               "Keep studying! This concept needs more work."}
                            </p>
                            <Button onClick={resetQuiz}>Try Again</Button>
                          </div>
                        ) : (
                          <ConceptTestQuestion
                            question={quickQuizQuestions[currentQuestionIndex]}
                            onAnswer={handleQuizAnswer}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    {conceptCard.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                    {conceptCard.chapter}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
                    {conceptCard.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Mastery progress */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm font-medium text-indigo-600">{masteryLevel}%</span>
                    </div>
                    <Progress value={masteryLevel} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Recall Strength</span>
                      <span className="text-sm font-medium text-indigo-600">{recallStrength}%</span>
                    </div>
                    <Progress value={recallStrength} className="h-2" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Flashcards
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} />
                  Practice Exam
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <PencilLine size={16} />
                  Take Notes
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Download
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* AI Insights */}
          <div>
            <Card className="border-l-4 border-l-amber-400 shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Focus Areas</h4>
                  <p className="text-sm text-gray-600">Based on your practice, focus on understanding the relationship between force and acceleration.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Weak Links</h4>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span>Mathematical formulation (F = ma)</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Application in real-world problems</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">NEET Exam Tips</h4>
                  <p className="text-sm text-gray-600">This concept appears frequently in NEET exams. Practice numerical problems and conceptual questions.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Recommended Revision</h4>
                  <p className="text-sm text-gray-600">Review this concept again in 3 days to strengthen retention.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 sm:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="exam-relevance" className="hidden sm:block">NEET Relevance</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{conceptCard.content}</p>
                    
                    {conceptCard.keyPoints && conceptCard.keyPoints.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Key Points</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {conceptCard.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {conceptCard.formulas && conceptCard.formulas.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Key Formulas</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                          <ul className="list-none space-y-2">
                            {conceptCard.formulas.map((formula, index) => (
                              <li key={index} className="font-mono">{formula}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Notes Section */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <PencilLine className="mr-2 h-4 w-4" />
                      Personal Notes
                    </h3>
                    <Textarea 
                      placeholder="Add your notes about this concept here..." 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <Button 
                      onClick={handleSaveNotes} 
                      size="sm" 
                      className="mt-2"
                    >
                      Save Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {conceptCard.examples?.map((example, index) => (
                      <li key={index} className="bg-slate-50 p-4 rounded-md border">
                        <p className="font-medium mb-2">Example {index + 1}</p>
                        <p>{example}</p>
                      </li>
                    )) || (
                      <p className="text-gray-500">No examples available for this concept.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="common-mistakes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {conceptCard.commonMistakes?.map((mistake, index) => (
                      <li key={index} className="bg-rose-50 p-4 rounded-md border border-rose-100">
                        <p className="font-medium mb-2 text-rose-700">Mistake {index + 1}</p>
                        <p>{mistake}</p>
                      </li>
                    )) || (
                      <p className="text-gray-500">No common mistakes listed for this concept.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {additionalResources.map((resource, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-indigo-100 text-indigo-700">
                              {resource.icon}
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="ml-2 p-0 h-8 w-8">
                            <ExternalLink size={16} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="exam-relevance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>NEET Exam Relevance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium">Importance in NEET</h3>
                    <p>{conceptCard.examRelevance || "Newton's Laws form an essential part of the Physics syllabus for NEET. Questions based on these laws appear regularly, both as theoretical concepts and numerical problems."}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium">Question Pattern</h3>
                      <p>In NEET exams, questions on this concept typically appear as:</p>
                      <ul>
                        <li>Direct application of formulas in numerical problems</li>
                        <li>Conceptual questions testing understanding of fundamental principles</li>
                        <li>Questions combining multiple physics concepts</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium">Previous Year Questions</h3>
                      <div className="space-y-4 mt-3">
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                          <p className="font-medium text-blue-800">NEET 2022</p>
                          <p>A block of mass m is placed on a smooth inclined plane of angle θ with the horizontal. The force acting on the block along the inclined plane is:</p>
                          <p className="mt-2 font-medium">Ans: mg sin θ</p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                          <p className="font-medium text-blue-800">NEET 2021</p>
                          <p>A body of mass 4 kg is subjected to a force which causes a displacement in the body given by s = t³ + 5, where s is in meters and t is in seconds. Work done by the force in the first 2 seconds is:</p>
                          <p className="mt-2 font-medium">Ans: 52 J</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Concepts */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LinkIcon size={18} />
            Related Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedConcepts.map((concept) => (
              <Card key={concept.id} className="hover:shadow-md transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Study this concept</span>
                    <ArrowRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
