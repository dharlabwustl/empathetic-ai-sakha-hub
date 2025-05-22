
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet';
import { 
  ArrowLeft, BookOpen, Clock, Bookmark, Share, ThumbsUp, ThumbsDown, 
  Play, PenLine, CheckCircle, Video, File, FileText, Lightbulb, Brain, 
  MessageSquare, Star, ChevronRight, BarChart3, PlusCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  content: string;
  summary: string;
  keyPoints: string[];
  examples: {
    id: string;
    title: string;
    content: string;
  }[];
  formulas: {
    id: string;
    name: string;
    formula: string;
    variables: {
      symbol: string;
      name: string;
    }[];
  }[];
  resources: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
  videos: {
    id: string;
    title: string;
    url: string;
    duration: string;
    thumbnail?: string;
  }[];
  quizzes: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
  relatedConcepts: {
    id: string;
    title: string;
    subject: string;
  }[];
  masteryScore: number;
}

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('learn');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [masteryProgress, setMasteryProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);

  // Fetch concept data
  useEffect(() => {
    setLoading(true);
    // This would normally be an API call
    setTimeout(() => {
      // Mock data based on the design example (Ohm's Law)
      const mockData: ConceptData = {
        id: conceptId || 'concept-1',
        title: "Ohm's Law",
        subject: 'Physics',
        topic: 'Electricity',
        chapter: 'Electric Circuits',
        difficulty: 'medium',
        estimatedTime: 15,
        content: `<p>Ohm's Law is a fundamental relationship in electrical engineering. It states that the current through a conductor between two points is directly proportional to the voltage across the two points.</p>
                  <p>Mathematically, this relationship is expressed as:</p>
                  <p class="text-center font-bold">I = V/R</p>
                  <p>Where:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>I is the current through the conductor in amperes (A)</li>
                    <li>V is the voltage across the conductor in volts (V)</li>
                    <li>R is the resistance of the conductor in ohms (Ω)</li>
                  </ul>
                  <p class="mt-3">This law is attributed to the German physicist Georg Ohm, who published it in 1827.</p>
                  <p class="mt-3">Ohm's law is valid for electrical circuits containing resistive elements like resistors, but it doesn't hold true for non-linear elements like diodes and transistors.</p>
                  <p class="mt-3">Understanding Ohm's Law is essential for analyzing and designing electrical circuits, as it allows us to predict how current will flow in a circuit based on the applied voltage and the resistance of the components.</p>`,
        summary: "Ohm's Law states that the current through a conductor is directly proportional to the voltage across it and inversely proportional to the resistance. It's expressed as I = V/R.",
        keyPoints: [
          "The current (I) is directly proportional to the voltage (V)",
          "The current (I) is inversely proportional to the resistance (R)",
          "Ohm's Law is only valid for ohmic conductors at constant temperature",
          "It is fundamental in analyzing electrical circuits"
        ],
        examples: [
          {
            id: 'ex1',
            title: 'Basic Example',
            content: 'If a circuit has a resistance of 5Ω and a voltage of 10V, the current would be I = V/R = 10V/5Ω = 2A.'
          },
          {
            id: 'ex2',
            title: 'Calculating Voltage',
            content: 'If a circuit has a current of 3A and a resistance of 4Ω, the voltage would be V = I×R = 3A×4Ω = 12V.'
          },
          {
            id: 'ex3',
            title: 'Finding Resistance',
            content: 'If a circuit has a voltage of 9V and a current of 0.5A, the resistance would be R = V/I = 9V/0.5A = 18Ω.'
          }
        ],
        formulas: [
          {
            id: 'f1',
            name: "Ohm's Law - Current",
            formula: "I = V/R",
            variables: [
              { symbol: 'I', name: 'Current (Amperes)' },
              { symbol: 'V', name: 'Voltage (Volts)' },
              { symbol: 'R', name: 'Resistance (Ohms)' }
            ]
          },
          {
            id: 'f2',
            name: "Ohm's Law - Voltage",
            formula: "V = I×R",
            variables: [
              { symbol: 'V', name: 'Voltage (Volts)' },
              { symbol: 'I', name: 'Current (Amperes)' },
              { symbol: 'R', name: 'Resistance (Ohms)' }
            ]
          },
          {
            id: 'f3',
            name: "Ohm's Law - Resistance",
            formula: "R = V/I",
            variables: [
              { symbol: 'R', name: 'Resistance (Ohms)' },
              { symbol: 'V', name: 'Voltage (Volts)' },
              { symbol: 'I', name: 'Current (Amperes)' }
            ]
          }
        ],
        resources: [
          {
            id: 'r1',
            title: "Ohm's Law in Depth",
            type: 'pdf',
            url: '#'
          },
          {
            id: 'r2',
            title: 'Electric Circuit Analysis',
            type: 'website',
            url: '#'
          }
        ],
        videos: [
          {
            id: 'v1',
            title: "Understanding Ohm's Law",
            url: 'https://www.youtube.com/watch?v=8jB6hDUqN0Y',
            duration: '8:24',
            thumbnail: 'https://img.youtube.com/vi/8jB6hDUqN0Y/maxresdefault.jpg'
          },
          {
            id: 'v2',
            title: "Ohm's Law in Practice",
            url: 'https://www.youtube.com/watch?v=NfcgA1axPLo',
            duration: '5:16',
            thumbnail: 'https://img.youtube.com/vi/NfcgA1axPLo/maxresdefault.jpg'
          }
        ],
        quizzes: [
          {
            id: 'q1',
            question: "If a circuit has a resistance of 6Ω and a voltage of 12V, what is the current?",
            options: ["1A", "2A", "3A", "4A"],
            correctAnswer: "2A",
            explanation: "Using Ohm's Law: I = V/R = 12V/6Ω = 2A"
          },
          {
            id: 'q2',
            question: "In a circuit with a current of 0.5A and resistance of 10Ω, what is the voltage?",
            options: ["0.05V", "5V", "10V", "20V"],
            correctAnswer: "5V",
            explanation: "Using Ohm's Law: V = I×R = 0.5A×10Ω = 5V"
          },
          {
            id: 'q3',
            question: "What happens to the current if the resistance doubles while voltage remains constant?",
            options: ["Current doubles", "Current halves", "Current remains the same", "Current becomes zero"],
            correctAnswer: "Current halves",
            explanation: "From I = V/R, if R doubles, I becomes half of its original value."
          }
        ],
        relatedConcepts: [
          {
            id: 'rc1',
            title: 'Series and Parallel Circuits',
            subject: 'Physics'
          },
          {
            id: 'rc2',
            title: 'Kirchhoff\'s Laws',
            subject: 'Physics'
          },
          {
            id: 'rc3',
            title: 'Electric Power',
            subject: 'Physics'
          }
        ],
        masteryScore: 65
      };

      setConceptData(mockData);
      // Set initial mastery progress
      setMasteryProgress(mockData.masteryScore);
      setLoading(false);
    }, 800);
  }, [conceptId]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  const handleOptionSelect = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
  };

  const handleQuizSubmit = () => {
    if (!selectedOption || hasSubmitted) return;
    
    const currentQuiz = conceptData?.quizzes[activeQuizIndex];
    if (!currentQuiz) return;
    
    const isCorrect = selectedOption === currentQuiz.correctAnswer;
    
    toast({
      title: isCorrect ? "Correct answer!" : "Incorrect answer",
      description: currentQuiz.explanation || (isCorrect ? "Good job!" : "Try again!"),
      variant: isCorrect ? "default" : "destructive",
    });
    
    setHasSubmitted(true);
    
    // Update mastery progress for correct answers
    if (isCorrect && masteryProgress < 100) {
      const newProgress = Math.min(masteryProgress + 5, 100);
      setMasteryProgress(newProgress);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuizIndex < (conceptData?.quizzes.length || 0) - 1) {
      setActiveQuizIndex(activeQuizIndex + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    }
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  const getMasteryColor = () => {
    if (masteryProgress >= 80) return "bg-green-500";
    if (masteryProgress >= 60) return "bg-blue-500";
    if (masteryProgress >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <SharedPageLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!conceptData) {
    return (
      <SharedPageLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">Concept not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The concept you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/dashboard/student')}>Return to Dashboard</Button>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout>
      <Helmet>
        <title>{conceptData.title} | PREPZR</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Back button and navigation path */}
        <div className="flex items-center mb-4 text-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard/student/concepts')}
            className="hover:bg-transparent p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Concepts
          </Button>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">{conceptData.subject}</span>
          <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">{conceptData.chapter}</span>
        </div>

        {/* Concept Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-3">
            <h1 className="text-3xl font-bold">{conceptData.title}</h1>
            
            <div className="flex items-center mt-2 md:mt-0 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBookmarkToggle}
                className={isBookmarked ? "text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-yellow-500" : ""}`} />
                <span className="ml-1">{isBookmarked ? "Saved" : "Save"}</span>
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4" />
                <span className="ml-1">Share</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200">
              <BookOpen className="h-3 w-3 mr-1" />
              {conceptData.subject}
            </Badge>
            <Badge variant="outline" className={
              conceptData.difficulty === 'easy' 
                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200"
                : conceptData.difficulty === 'medium'
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200"
                  : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200"
            }>
              {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200">
              <Clock className="h-3 w-3 mr-1" />
              {conceptData.estimatedTime} mins
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 mb-4">
            <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">Summary</div>
            <p className="text-blue-700 dark:text-blue-300">{conceptData.summary}</p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="font-medium text-base mr-2">Mastery Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{masteryProgress}%</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.round(masteryProgress / 20) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300 dark:text-gray-700'
                  }`} 
                />
              ))}
            </div>
          </div>
          <Progress value={masteryProgress} className={`h-2 ${getMasteryColor()}`} />
        </div>

        {/* Main tabbed content */}
        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start overflow-x-auto pb-px">
            <TabsTrigger value="learn" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-1.5">
              <PenLine className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-1.5">
              <FileText className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Points</h2>
                  <ul className="space-y-2">
                    {conceptData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Detailed Explanation</h2>
                  <div 
                    className={`prose prose-blue max-w-none dark:prose-invert ${!showFullContent && "max-h-64 overflow-hidden relative"}`}
                    dangerouslySetInnerHTML={{ __html: conceptData.content }}
                  />
                  
                  {!showFullContent && conceptData.content.length > 300 && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
                  )}
                  
                  {conceptData.content.length > 300 && (
                    <Button 
                      variant="ghost" 
                      className="mt-4"
                      onClick={() => setShowFullContent(!showFullContent)}
                    >
                      {showFullContent ? "Show Less" : "Read More"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Formulas</h2>
                  <div className="space-y-4">
                    {conceptData.formulas.map((formula) => (
                      <div key={formula.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h3 className="font-medium mb-2">{formula.name}</h3>
                        <div className="text-2xl font-bold text-center my-4 bg-white dark:bg-gray-800 py-3 rounded-md border border-gray-200 dark:border-gray-700">
                          {formula.formula}
                        </div>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Where:</h4>
                          <ul className="space-y-1">
                            {formula.variables.map((variable, idx) => (
                              <li key={idx} className="text-sm flex">
                                <span className="font-semibold w-6">{variable.symbol}</span>
                                <span className="text-gray-600 dark:text-gray-400">{variable.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Examples</h2>
                  <div className="space-y-4">
                    {conceptData.examples.map((example) => (
                      <div key={example.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-400">{example.title}</h3>
                        <p>{example.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Video Explanations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conceptData.videos.map((video) => (
                      <a 
                        key={video.id} 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img 
                              src={video.thumbnail || `https://img.youtube.com/vi/${video.url.split('v=')[1]}/mqdefault.jpg`} 
                              alt={video.title} 
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                              <Play className="h-12 w-12 text-white" fill="white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Related Concepts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {conceptData.relatedConcepts.map((related) => (
                      <Button
                        key={related.id}
                        variant="outline"
                        className="justify-start h-auto py-2"
                        onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <div className="text-left">
                            <div className="font-medium">{related.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{related.subject}</div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Practice Quiz</h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Question {activeQuizIndex + 1} of {conceptData.quizzes.length}
                    </div>
                  </div>
                  
                  {conceptData.quizzes && conceptData.quizzes[activeQuizIndex] && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="font-medium text-lg">{conceptData.quizzes[activeQuizIndex].question}</p>
                      </div>
                      
                      <div className="space-y-2">
                        {conceptData.quizzes[activeQuizIndex].options.map((option) => (
                          <div
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedOption === option
                                ? hasSubmitted
                                  ? selectedOption === conceptData.quizzes[activeQuizIndex].correctAnswer
                                    ? "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
                                    : "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
                                  : "bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700"
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="flex-1">{option}</div>
                              {hasSubmitted && selectedOption === option && (
                                selectedOption === conceptData.quizzes[activeQuizIndex].correctAnswer ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <span className="text-red-600 font-bold">✕</span>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {hasSubmitted && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-lg mt-4">
                          <div className="font-medium mb-1">Explanation:</div>
                          <p>{conceptData.quizzes[activeQuizIndex].explanation}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between pt-2">
                        <div></div>
                        <div>
                          {!hasSubmitted ? (
                            <Button 
                              onClick={handleQuizSubmit}
                              disabled={!selectedOption}
                            >
                              Submit Answer
                            </Button>
                          ) : (
                            <Button 
                              onClick={handleNextQuestion} 
                              disabled={activeQuizIndex === conceptData.quizzes.length - 1}
                            >
                              Next Question
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Interactive Practice</h2>
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-1" />
                      Start Simulation
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg h-52 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive practice tools will appear here</p>
                      <Button variant="ghost" size="sm" className="mt-2">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
                  <div className="space-y-3">
                    {conceptData.resources.map((resource) => (
                      <a 
                        key={resource.id} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-3">
                          {resource.type === 'pdf' ? (
                            <File className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          ) : resource.type === 'video' ? (
                            <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{resource.type}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Videos</h2>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Video
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conceptData.videos.map((video) => (
                      <a 
                        key={video.id} 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img 
                              src={video.thumbnail || `https://img.youtube.com/vi/${video.url.split('v=')[1]}/mqdefault.jpg`} 
                              alt={video.title} 
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                              <Play className="h-12 w-12 text-white" fill="white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Your Notes</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSaveNotes}>
                        Save Notes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2">
                    <textarea
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Write your notes about this concept here..."
                      className="w-full min-h-[300px] p-2 bg-transparent resize-none focus:outline-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Feedback</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">How helpful was this concept explanation?</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Helpful
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Not Helpful
                      </Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your feedback helps us improve our concept explanations. Thanks for contributing!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
