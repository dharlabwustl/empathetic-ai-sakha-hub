
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  MessageCircle,
  Bookmark,
  BookMarked,
  Share2,
  ThumbsUp,
  CheckCircle,
  PlayCircle,
  PenSquare,
  Lightbulb,
  Clock,
  BadgeCheck,
  Timer,
  BarChart3,
  HelpCircle,
  Copy,
  Volume2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import StudyNotesSidebar from '@/components/dashboard/student/StudyNotesSidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import voice component for reading content
import VoiceReader from '@/components/voice/VoiceReader';

// Mock data for the concept card
const mockConceptData = {
  id: "1",
  title: "Organic Chemistry - Alkenes",
  description: "Understanding the structure, properties, and reactions of alkenes",
  subject: "Chemistry",
  chapter: "Hydrocarbons",
  difficulty: "Medium",
  importance: "High",
  timeToMaster: "45 min",
  masteryLevel: 65,
  lastStudied: "3 days ago",
  content: `
    <h2>What are Alkenes?</h2>
    <p>Alkenes are unsaturated hydrocarbons that contain at least one carbon-carbon double bond. The general formula for alkenes is C<sub>n</sub>H<sub>2n</sub>.</p>
    
    <h3>Structure of Alkenes</h3>
    <p>The carbon-carbon double bond in alkenes consists of one sigma (σ) bond and one pi (π) bond. The carbon atoms involved in the double bond, and the four atoms attached to them, lie in a plane, with bond angles of approximately 120°.</p>
    
    <h3>Physical Properties</h3>
    <ul>
      <li>Physical state: First three members (C2-C4) are gases, C5-C17 are liquids, and higher alkenes are solids.</li>
      <li>Boiling point: Increases with increase in molecular mass.</li>
      <li>Solubility: Insoluble in water but soluble in organic solvents.</li>
    </ul>
    
    <h3>Chemical Properties</h3>
    <p>Due to the presence of the double bond, alkenes are more reactive than alkanes and undergo addition reactions.</p>
    
    <h4>Important Reactions:</h4>
    <ol>
      <li><strong>Hydrogenation:</strong> Addition of hydrogen in presence of catalysts like Ni, Pt, or Pd to form alkanes.</li>
      <li><strong>Halogenation:</strong> Addition of halogens to form dihalides.</li>
      <li><strong>Hydrohalogenation:</strong> Addition of hydrogen halides to form alkyl halides.</li>
      <li><strong>Hydration:</strong> Addition of water in presence of acid catalysts to form alcohols.</li>
      <li><strong>Oxidation:</strong> With cold dilute KMnO4 (Baeyer's reagent) to form diols.</li>
    </ol>
    
    <h4>Markovnikov's Rule:</h4>
    <p>In the addition of unsymmetrical reagents to unsymmetrical alkenes, the negative part of the reagent goes to the carbon atom with fewer hydrogen atoms.</p>
  `,
  exampleProblems: [
    {
      id: "ep1",
      question: "What is the product of the reaction of propene with HBr?",
      options: [
        "1-bromopropane",
        "2-bromopropane",
        "Propane",
        "1,2-dibromopropane"
      ],
      correctAnswer: 1,
      explanation: "According to Markovnikov's rule, the H atom adds to the carbon with more hydrogen atoms, and Br adds to the carbon with fewer hydrogen atoms, resulting in 2-bromopropane."
    },
    {
      id: "ep2",
      question: "Which of the following alkenes will give the same product upon hydrogenation?",
      options: [
        "But-1-ene and but-2-ene",
        "Propene and but-1-ene",
        "Ethene and propene",
        "Propene and 2-methylpropene"
      ],
      correctAnswer: 0,
      explanation: "Both but-1-ene and but-2-ene give butane upon hydrogenation, as the double bond position doesn't matter when all carbons become single-bonded."
    }
  ],
  visualAids: [
    {
      id: "va1",
      type: "image",
      title: "Alkene Structure",
      url: "/img/alkene-structure.png",
      description: "Molecular structure of ethene showing the carbon-carbon double bond"
    },
    {
      id: "va2",
      type: "image",
      title: "Addition Reactions of Alkenes",
      url: "/img/alkene-reactions.png",
      description: "Summary of common addition reactions of alkenes"
    }
  ],
  videoResources: [
    {
      id: "vr1",
      title: "Introduction to Alkenes",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "12:35",
      instructor: "Dr. Sarah Chen"
    },
    {
      id: "vr2",
      title: "Alkene Reactions Mechanism",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "18:47",
      instructor: "Prof. Michael Brown"
    }
  ],
  relatedConcepts: [
    {
      id: "rc1",
      title: "Alkynes",
      path: "/dashboard/student/concept/2"
    },
    {
      id: "rc2",
      title: "Aromatic Hydrocarbons",
      path: "/dashboard/student/concept/3"
    },
    {
      id: "rc3",
      title: "Alcohols",
      path: "/dashboard/student/concept/4"
    }
  ],
  practiceProblems: [
    {
      id: "pp1",
      question: "When ethene reacts with cold, dilute KMnO4, the product formed is:",
      options: [
        "Ethane",
        "Ethanol",
        "Ethylene glycol",
        "Ethanal"
      ],
      correctAnswer: 2,
      difficulty: "Easy"
    },
    {
      id: "pp2",
      question: "The addition of HBr to 1-butene gives primarily:",
      options: [
        "1-bromobutane",
        "2-bromobutane",
        "An equal mixture of 1-bromobutane and 2-bromobutane",
        "2,2-dibromobutane"
      ],
      correctAnswer: 1,
      difficulty: "Medium"
    },
    {
      id: "pp3",
      question: "Which reagent can distinguish between ethene and ethyne?",
      options: [
        "H2/Ni",
        "Br2/CCl4",
        "Ammoniacal Cu2Cl2",
        "Acidified K2Cr2O7"
      ],
      correctAnswer: 2,
      difficulty: "Hard"
    }
  ],
  keyPoints: [
    "Alkenes contain at least one carbon-carbon double bond",
    "The general formula is CnH2n",
    "They undergo addition reactions due to the presence of pi bonds",
    "Markovnikov's rule predicts the product of addition reactions",
    "Alkenes can be prepared by dehydration of alcohols or dehydrohalogenation of alkyl halides"
  ],
  mnemonics: [
    {
      title: "ADDH for Alkene Reactions",
      description: "Addition, Dehydrogenation, Dimerization, Halogenation - the main types of reactions alkenes undergo"
    },
    {
      title: "POSH Alkenes",
      description: "Primary, Oxidation, Secondary, Halogenation - products formed in different reaction types"
    }
  ]
};

// Mock quiz data
const mockQuizData = [
  {
    id: "q1",
    question: "What is the general formula for alkenes?",
    options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnHn"],
    correctAnswer: 1,
    difficulty: "Easy",
    userAnswer: null
  },
  {
    id: "q2",
    question: "Which of the following is NOT a characteristic reaction of alkenes?",
    options: ["Addition", "Substitution", "Oxidation", "Hydrogenation"],
    correctAnswer: 1,
    difficulty: "Medium",
    userAnswer: null
  },
  {
    id: "q3",
    question: "Markovnikov's rule applies to the addition of which of the following to alkenes?",
    options: ["H2", "O3", "HBr", "O2"],
    correctAnswer: 2,
    difficulty: "Medium",
    userAnswer: null
  },
  {
    id: "q4",
    question: "The addition of H2O to an alkene in the presence of H2SO4 results in the formation of:",
    options: ["An alkane", "An alcohol", "An ether", "A carboxylic acid"],
    correctAnswer: 1,
    difficulty: "Easy",
    userAnswer: null
  },
  {
    id: "q5",
    question: "What product is formed when propene undergoes ozonolysis followed by reduction with Zn/H2O?",
    options: ["Propane", "Ethanol and formaldehyde", "Ethanal and methanal", "Propanol"],
    correctAnswer: 2,
    difficulty: "Hard",
    userAnswer: null
  }
];

const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('learn');
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(mockQuizData.map(() => null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});
  const [showNotes, setShowNotes] = useState(false);
  const [isReadingContent, setIsReadingContent] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Handle toggling explanations
  const toggleExplanation = (questionId: string) => {
    setShowExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (quizAnswers.some(answer => answer === null)) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setQuizSubmitted(true);
    
    // Calculate score
    const correctAnswers = quizAnswers.filter((answer, index) => 
      answer === mockQuizData[index].correctAnswer
    ).length;
    
    toast({
      title: "Quiz Submitted",
      description: `You scored ${correctAnswers} out of ${mockQuizData.length}!`,
      variant: correctAnswers > mockQuizData.length / 2 ? "default" : "destructive"
    });
  };

  // Handle retry quiz
  const handleRetryQuiz = () => {
    setQuizAnswers(mockQuizData.map(() => null));
    setQuizSubmitted(false);
  };

  // Handle save to notes
  const handleSaveToNotes = () => {
    toast({
      title: "Saved to Notes",
      description: "This concept has been saved to your study notes.",
    });
  };

  // Handle share concept
  const handleShareConcept = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Concept card link copied to clipboard!",
    });
  };

  // Handle content reading with voice
  const startReading = () => {
    setIsReadingContent(true);
  };

  const stopReading = () => {
    setIsReadingContent(false);
  };

  // Ref for content section (for voice reading)
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <SharedPageLayout 
      title={mockConceptData.title}
      subtitle={mockConceptData.description} 
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      {/* Floating Actions */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full p-3 shadow-md ${isReadingContent ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          onClick={isReadingContent ? stopReading : startReading}
        >
          <Volume2 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-3 bg-green-500 text-white shadow-md"
          onClick={() => setShowNotes(!showNotes)}
        >
          <PenSquare size={20} />
        </motion.button>
      </div>
      
      {/* Study Notes Sidebar */}
      {showNotes && (
        <StudyNotesSidebar
          isOpen={showNotes}
          onClose={() => setShowNotes(false)}
          conceptTitle={mockConceptData.title}
          conceptId={mockConceptData.id}
        />
      )}
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Concept Information and Stats */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Concept Overview
              </CardTitle>
              <CardDescription>
                Key details about this concept
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Subject:</span>
                  <Badge variant="outline" className="bg-blue-50">{mockConceptData.subject}</Badge>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Chapter:</span>
                  <Badge variant="outline" className="bg-purple-50">{mockConceptData.chapter}</Badge>
                </motion.div>
                
                <Separator />
                
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Difficulty:</span>
                  <Badge className={
                    mockConceptData.difficulty === "Easy" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                    mockConceptData.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                    "bg-red-100 text-red-800 hover:bg-red-100"
                  }>{mockConceptData.difficulty}</Badge>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Importance:</span>
                  <Badge className={
                    mockConceptData.importance === "Low" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                    mockConceptData.importance === "Medium" ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100" : 
                    "bg-violet-100 text-violet-800 hover:bg-violet-100"
                  }>{mockConceptData.importance}</Badge>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Time to Master:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{mockConceptData.timeToMaster}</span>
                  </div>
                </motion.div>
                
                <Separator />
                
                <motion.div variants={itemVariants}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Your Mastery:</span>
                    <span className="font-medium">{mockConceptData.masteryLevel}%</span>
                  </div>
                  <Progress value={mockConceptData.masteryLevel} className="h-2" />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Studied:</span>
                  <span>{mockConceptData.lastStudied}</span>
                </motion.div>
                
                <Separator />
                
                <motion.div variants={itemVariants} className="pt-2">
                  <p className="text-sm font-medium mb-2">Key Points:</p>
                  <ul className="space-y-2">
                    {mockConceptData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button onClick={handleSaveToNotes} variant="outline" className="w-full">
                <BookMarked className="h-4 w-4 mr-2" />
                Save to Notes
              </Button>
              <Button onClick={handleShareConcept} variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Concept
              </Button>
            </CardFooter>
          </Card>
          
          {/* Mnemonics Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Mnemonics & Memory Aids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConceptData.mnemonics.map((mnemonic, index) => (
                  <div key={index} className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">{mnemonic.title}</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-200">{mnemonic.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concepts Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockConceptData.relatedConcepts.map((concept) => (
                  <Button 
                    key={concept.id}
                    variant="outline" 
                    className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => navigate(concept.path)}
                  >
                    <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
                    {concept.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column: Main Content Tabs */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <Tabs defaultValue={currentTab} value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="learn" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Learn</span>
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>Practice</span>
                  </TabsTrigger>
                  <TabsTrigger value="visualize" className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    <span>Visualize</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="px-2 sm:px-6">
              {/* Learn Tab */}
              <TabsContent value="learn" className="mt-0 space-y-4">
                <div 
                  ref={contentRef}
                  className="prose dark:prose-invert prose-headings:scroll-m-20 prose-headings:tracking-tight max-w-none"
                  dangerouslySetInnerHTML={{ __html: mockConceptData.content }}
                />
                
                {isReadingContent && (
                  <VoiceReader 
                    text={mockConceptData.content.replace(/<[^>]*>/g, ' ')}
                    onStop={stopReading}
                    language="en-IN"
                  />
                )}
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Quick Examples
                  </h3>
                  
                  <div className="mt-4 space-y-6">
                    {mockConceptData.exampleProblems.map((problem, index) => (
                      <div key={problem.id} className="space-y-2">
                        <p className="font-medium">Example {index + 1}: {problem.question}</p>
                        <ul className="space-y-1">
                          {problem.options.map((option, optIndex) => (
                            <li 
                              key={optIndex}
                              className={`flex items-center gap-2 p-2 rounded-md ${
                                optIndex === problem.correctAnswer ? 'bg-green-100 dark:bg-green-900/30' : ''
                              }`}
                            >
                              {optIndex === problem.correctAnswer && (
                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                              )}
                              <span>{option}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic mt-2">
                          {problem.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Practice Tab */}
              <TabsContent value="practice" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Concept Quiz</h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      5 Questions
                    </Badge>
                  </div>
                  
                  {/* Quiz Questions */}
                  <div className="space-y-6">
                    {mockQuizData.map((question, qIndex) => (
                      <Card key={question.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">
                              {qIndex + 1}. {question.question}
                            </CardTitle>
                            <Badge 
                              variant="outline" 
                              className={
                                question.difficulty === "Easy" ? "bg-green-50 text-green-700" : 
                                question.difficulty === "Medium" ? "bg-yellow-50 text-yellow-700" : 
                                "bg-red-50 text-red-700"
                              }
                            >
                              {question.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`
                                  p-3 rounded-md cursor-pointer border transition-colors
                                  ${quizAnswers[qIndex] === optIndex ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
                                  ${quizSubmitted && optIndex === question.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                                  ${quizSubmitted && quizAnswers[qIndex] === optIndex && optIndex !== question.correctAnswer ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                                `}
                                onClick={() => handleAnswerSelect(qIndex, optIndex)}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {quizSubmitted && (
                                    <>
                                      {optIndex === question.correctAnswer && (
                                        <Check className="h-5 w-5 text-green-600" />
                                      )}
                                      {quizAnswers[qIndex] === optIndex && optIndex !== question.correctAnswer && (
                                        <span className="text-red-600">✗</span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {quizSubmitted && quizAnswers[qIndex] !== question.correctAnswer && (
                            <div className="mt-4">
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-blue-600 dark:text-blue-400"
                                onClick={() => toggleExplanation(question.id)}
                              >
                                {showExplanation[question.id] ? 'Hide Explanation' : 'Show Explanation'}
                              </Button>
                              
                              {showExplanation[question.id] && (
                                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                                  The correct answer is <strong>{question.options[question.correctAnswer]}</strong>.
                                  {/* Replace with actual explanation when available */}
                                  <p className="mt-1">
                                    This follows from the concept of {mockConceptData.title.split(' - ')[1]} reactions
                                    where the resulting product depends on the mechanism of the reaction.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Quiz Actions */}
                  <div className="flex justify-between mt-6">
                    {!quizSubmitted ? (
                      <Button 
                        className="w-full"
                        onClick={handleQuizSubmit}
                      >
                        Submit Quiz
                      </Button>
                    ) : (
                      <div className="flex w-full gap-4">
                        <Button 
                          variant="outline"
                          className="w-1/2"
                          onClick={handleRetryQuiz}
                        >
                          Retry Quiz
                        </Button>
                        <Button 
                          className="w-1/2"
                          onClick={() => navigate('/dashboard/student/concepts')}
                        >
                          Next Concept
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Practice Problems */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Additional Practice Problems</h3>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {mockConceptData.practiceProblems.map((problem, index) => (
                        <AccordionItem key={problem.id} value={`problem-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex justify-between items-center w-full">
                              <span>Problem {index + 1}: {problem.question.length > 70 ? `${problem.question.substring(0, 70)}...` : problem.question}</span>
                              <Badge 
                                variant="outline" 
                                className={
                                  problem.difficulty === "Easy" ? "bg-green-50 text-green-700 ml-2" : 
                                  problem.difficulty === "Medium" ? "bg-yellow-50 text-yellow-700 ml-2" : 
                                  "bg-red-50 text-red-700 ml-2"
                                }
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 py-2">
                              <p>{problem.question}</p>
                              <div className="space-y-2">
                                {problem.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`
                                      p-3 rounded-md border
                                      ${optIndex === problem.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}
                                    `}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{option}</span>
                                      {optIndex === problem.correctAnswer && (
                                        <Check className="h-5 w-5 text-green-600" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </TabsContent>
              
              {/* Visualize Tab */}
              <TabsContent value="visualize" className="mt-0">
                <div className="space-y-8">
                  {/* Visual Aids Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Visual Aids</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockConceptData.visualAids.map((visual) => (
                        <Card key={visual.id} className="overflow-hidden">
                          <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <img 
                              src={visual.url} 
                              alt={visual.title} 
                              className="object-contain max-h-full max-w-full"
                            />
                          </div>
                          <CardContent className="pt-4">
                            <h4 className="font-medium">{visual.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{visual.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  {/* Video Resources Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Video Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockConceptData.videoResources.map((video) => (
                        <Card key={video.id} className="overflow-hidden">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                            <iframe 
                              src={video.url} 
                              title={video.title}
                              className="w-full h-full"
                              allowFullScreen
                            ></iframe>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                              <PlayCircle className="h-16 w-16 text-white" />
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <h4 className="font-medium">{video.title}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-500 dark:text-gray-400">{video.instructor}</span>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {video.duration}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  {/* 3D Models Section (Placeholder) */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">3D Molecule Models</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <BarChart3 className="h-16 w-16 mx-auto text-gray-400" />
                          <p className="mt-4 text-gray-500 dark:text-gray-400">
                            3D molecular models for this concept will be available soon
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard/student/concepts')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Concepts
              </Button>
              
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Discussion Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-violet-500" />
            Questions & Discussions
          </CardTitle>
          <CardDescription>
            Ask questions or share insights about this concept
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
            <MessageCircle className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Discussions for this concept will be available soon</p>
          </div>
        </CardContent>
      </Card>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
