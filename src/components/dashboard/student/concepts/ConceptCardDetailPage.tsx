
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  FileText, 
  Lightbulb, 
  Calculator, 
  Star, 
  CheckCircle, 
  ChevronLeft, 
  PenLine, 
  ArrowRight, 
  Volume2, 
  VolumeX,
  Bookmark,
  Share2,
  Video,
  BookmarksIcon,
  AlertCircle,
  Brain,
  PencilRuler,
  History
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

interface ExampleType {
  id: string;
  title: string;
  description: string;
}

interface FormulaType {
  id: string;
  title: string;
  expression: string;
  variables: {
    symbol: string;
    name: string;
    unit: string;
  }[];
}

interface QuizQuestionType {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface ExamMistakeType {
  id: string;
  title: string;
  mistake: string;
  correction: string;
}

interface PreviousYearQuestionType {
  id: string;
  year: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Mock data for concept card details - this would come from an API in a real app
  const conceptDetails = {
    id: conceptId || 'concept-1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    progress: 65,
    mastery: 70,
    recallAccuracy: 68,
    examReady: false,
    lastPracticed: '2 days ago',
    description: 'Understand the fundamental principles governing the motion of objects, including Newton\'s three laws that form the foundation of classical mechanics.',
    content: `
      <h2>Newton's First Law: Law of Inertia</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force.</p>
      
      <h2>Newton's Second Law: Law of Acceleration</h2>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma.</p>
      
      <h2>Newton's Third Law: Action and Reaction</h2>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.</p>
    `,
    examples: [
      {
        id: 'example-1',
        title: 'A Book on a Table',
        description: 'A book resting on a table doesn\'t move because the gravitational force pulling it down is balanced by the normal force from the table pushing up.'
      },
      {
        id: 'example-2',
        title: 'Rocket Propulsion',
        description: 'A rocket moves forward by expelling gas backwards. The forward thrust is a reaction to the backward force of the expelled gas (Third Law).'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which of Newton\'s laws explains why a passenger without a seatbelt continues to move forward when a car suddenly stops?',
        options: [
          'First Law (Inertia)',
          'Second Law (F=ma)',
          'Third Law (Action-Reaction)',
          'Law of Conservation of Energy'
        ],
        correctAnswer: 0,
        explanation: 'Newton\'s First Law states that an object in motion remains in motion unless acted upon by an external force. When the car stops, the passenger continues moving forward due to inertia.'
      },
      {
        id: 'q2',
        question: 'If you push against a wall, why doesn\'t the wall move?',
        options: [
          'The wall has too much mass',
          'The wall exerts an equal and opposite force on you',
          'The wall is anchored to the ground',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All answers are correct, but the key principle is Newton\'s Third Law - the wall exerts an equal and opposite force to your push. Additionally, the wall is anchored and has significant mass.'
      }
    ],
    formulas: [
      {
        id: 'formula-1',
        title: 'Force',
        expression: 'F = ma',
        variables: [
          { symbol: 'F', name: 'Force', unit: 'N (Newtons)' },
          { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
          { symbol: 'a', name: 'Acceleration', unit: 'm/s² (meters per second squared)' }
        ]
      },
      {
        id: 'formula-2',
        title: 'Momentum',
        expression: 'p = mv',
        variables: [
          { symbol: 'p', name: 'Momentum', unit: 'kg⋅m/s' },
          { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
          { symbol: 'v', name: 'Velocity', unit: 'm/s (meters per second)' }
        ]
      }
    ],
    examMistakes: [
      {
        id: 'mistake-1',
        title: 'Misinterpreting the First Law',
        mistake: 'Thinking that an object will stop moving once the force is removed.',
        correction: 'Newton\'s First Law states that an object will continue moving at constant velocity unless acted upon by an external force. It won\'t spontaneously stop.'
      },
      {
        id: 'mistake-2',
        title: 'Confusing Mass and Weight',
        mistake: 'Using mass and weight interchangeably in force calculations.',
        correction: 'Mass is an intrinsic property measured in kg, while weight is a force due to gravity (F = mg) measured in Newtons. In F = ma, you must use mass, not weight.'
      }
    ],
    previousYearQuestions: [
      {
        id: 'pyq-1',
        year: '2022',
        question: 'A 5 kg box is pushed with a force of 20 N. What is the resulting acceleration?',
        options: [
          '1 m/s²',
          '2 m/s²',
          '4 m/s²',
          '5 m/s²'
        ],
        correctAnswer: 2,
        explanation: 'Using F = ma: 20 N = 5 kg × a, so a = 4 m/s²'
      }
    ],
    tags: ['Force', 'Mechanics', 'Motion', 'Laws'],
    relatedConcepts: [
      { id: 'c2', title: 'Conservation of Momentum' },
      { id: 'c3', title: 'Circular Motion' },
      { id: 'c4', title: 'Work and Energy' },
      { id: 'c5', title: 'Friction Forces' }
    ],
    aiInsights: [
      'Students often confuse the application of Newton\'s Third Law in complex situations. Consider solving multi-body problems to strengthen understanding.',
      'Your recall accuracy for Newton\'s First Law is significantly higher than for the Second Law. Consider focusing more practice on Second Law applications.',
      'Numerical problems involving the Second Law tend to be your weak point. Try more practice with varying mass and force scenarios.'
    ]
  };

  // Handle opening the formula lab
  const handleOpenFormulaLab = () => {
    toast({
      title: "Opening Formula Lab",
      description: "Loading interactive formula practice environment...",
    });
    // In a real app, this would navigate to the formula lab with the concept ID
    console.log('Opening formula lab for concept:', conceptId);
  };

  // Text-to-speech for read aloud functionality
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
        return;
      }

      const activeContent = getActiveTabContent();
      const utterance = new SpeechSynthesisUtterance(activeContent);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsReadingAloud(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech functionality.",
        variant: "destructive",
      });
    }
  };

  // Get text content of active tab for read aloud functionality
  const getActiveTabContent = (): string => {
    switch (activeTab) {
      case 'overview':
        return `${conceptDetails.title}. ${conceptDetails.description} ${conceptDetails.content.replace(/<[^>]*>/g, '')}`;
      case 'examples':
        return `Examples for ${conceptDetails.title}: ${conceptDetails.examples.map(ex => `${ex.title}: ${ex.description}`).join('. ')}`;
      case 'quiz':
        return `Quiz questions for ${conceptDetails.title}: ${conceptDetails.quizQuestions.map(q => `Question: ${q.question} Options: ${q.options.join(', ')}`).join('. ')}`;
      case 'formulas':
        return `Key formulas for ${conceptDetails.title}: ${conceptDetails.formulas.map(f => `${f.title}: ${f.expression}. Where ${f.variables.map(v => `${v.symbol} is ${v.name} measured in ${v.unit}`).join(', ')}`).join('. ')}`;
      case 'mistakes':
        return `Common exam mistakes for ${conceptDetails.title}: ${conceptDetails.examMistakes.map(m => `${m.title}: ${m.mistake} Correction: ${m.correction}`).join('. ')}`;
      case 'previous-year':
        return `Previous year questions for ${conceptDetails.title}: ${conceptDetails.previousYearQuestions.map(q => `From year ${q.year}: ${q.question}`).join('. ')}`;
      case 'insights':
        return `AI insights for ${conceptDetails.title}: ${conceptDetails.aiInsights.join('. ')}`;
      default:
        return '';
    }
  };

  // Toggle bookmark status
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? 
        "This concept has been removed from your bookmarked concepts." : 
        "This concept has been added to your bookmarks for quick access.",
    });
  };

  // Save user notes
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    });
    // In a real app, this would save notes to the database
  };

  // Set user confidence level
  const handleSetConfidence = (rating: number) => {
    setConfidenceRating(rating);
    toast({
      title: "Confidence updated",
      description: "Your confidence level for this concept has been updated.",
    });
    // In a real app, this would save confidence rating to the database
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window && isReadingAloud) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReadingAloud]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button and header */}
      <div className="mb-6">
        <Link to="/dashboard/student/concepts" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Concepts
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {conceptDetails.title}
            </h1>
            <div className="flex items-center flex-wrap text-sm text-gray-600 dark:text-gray-300 mt-2 gap-2">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{conceptDetails.subject}</span>
              </div>
              
              {conceptDetails.topic && (
                <div className="flex items-center">
                  <span className="mx-2">•</span>
                  <span>{conceptDetails.topic}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{conceptDetails.estimatedTime}</span>
              </div>
              
              <div className="flex items-center">
                <span className="mx-2">•</span>
                <History className="h-4 w-4 mr-1" />
                <span>Last practiced: {conceptDetails.lastPracticed}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Badge variant="outline" className={
              conceptDetails.difficulty === 'easy' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : conceptDetails.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }>
              {conceptDetails.difficulty.charAt(0).toUpperCase() + conceptDetails.difficulty.slice(1)}
            </Badge>
            
            <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Star className="h-3 w-3 mr-1" /> Important Concept
            </Badge>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReadAloud}
            className="flex items-center gap-1"
          >
            {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleBookmark}
            className={cn(
              "flex items-center gap-1",
              isBookmarked && "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            )}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-current" : "")} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
        
        {/* Progress indicators */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700 shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Overall progress</span>
              <span className="font-medium">{conceptDetails.progress}%</span>
            </div>
            <Progress 
              value={conceptDetails.progress} 
              className="h-2 bg-gray-100 dark:bg-gray-800" 
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700 shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Mastery level</span>
              <span className="font-medium">{conceptDetails.mastery}%</span>
            </div>
            <Progress 
              value={conceptDetails.mastery} 
              className="h-2 bg-gray-100 dark:bg-gray-800" 
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700 shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Recall accuracy</span>
              <span className="font-medium">{conceptDetails.recallAccuracy}%</span>
            </div>
            <Progress 
              value={conceptDetails.recallAccuracy} 
              className="h-2 bg-gray-100 dark:bg-gray-800" 
            />
          </div>
        </div>
        
        {/* Exam readiness indicator */}
        <div className="mt-4 flex items-center">
          <Badge 
            variant="outline"
            className={conceptDetails.examReady 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" 
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
            }
          >
            {conceptDetails.examReady ? (
              <>
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Exam Ready
              </>
            ) : (
              <>
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                More Practice Needed
              </>
            )}
          </Badge>
          
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
            {conceptDetails.examReady 
              ? "You've mastered this concept! Time to move on to related topics."
              : "Continue practicing to improve your understanding of this concept."}
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <div className="overflow-x-auto">
          <div className="border-b dark:border-gray-700 mb-6 w-max min-w-full">
            <TabsList className="bg-transparent">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="examples"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Examples
              </TabsTrigger>
              <TabsTrigger 
                value="quiz"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Quiz
              </TabsTrigger>
              <TabsTrigger 
                value="formulas"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Formulas
              </TabsTrigger>
              <TabsTrigger 
                value="mistakes"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Common Mistakes
              </TabsTrigger>
              <TabsTrigger 
                value="previous-year"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                Previous Year Questions
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
              >
                AI Insights
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="overview" className="mt-0">
          <Card className="border dark:border-gray-700">
            <CardContent className="pt-6">
              <div 
                className="prose dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: conceptDetails.content }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.examples.map(example => (
              <Card key={example.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                  <p>{example.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.quizQuestions.map((question, index) => (
              <Card key={question.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Question {index + 1}: {question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`p-3 border rounded-lg ${
                          optIndex === question.correctAnswer 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-200 dark:border-gray-700'
                        } hover:border-blue-400 cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center">
                          {optIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Explanation:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="formulas" className="mt-0">
          <FormulaTabContent 
            conceptId={conceptDetails.id} 
            conceptTitle={conceptDetails.title}
            handleOpenFormulaLab={handleOpenFormulaLab} 
          />
        </TabsContent>
        
        <TabsContent value="mistakes" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.examMistakes.map((mistake, index) => (
              <Card key={mistake.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{mistake.title}</h3>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-4">
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">Common Mistake:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{mistake.mistake}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Correct Approach:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{mistake.correction}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="previous-year" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.previousYearQuestions.map((question, index) => (
              <Card key={question.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      {question.year}
                    </Badge>
                    <h3 className="text-lg font-semibold ml-3">Question {index + 1}</h3>
                  </div>
                  
                  <p className="mb-4">{question.question}</p>
                  
                  <div className="space-y-3 mb-4">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`p-3 border rounded-lg ${
                          optIndex === question.correctAnswer 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          {optIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Solution:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <Card className="border dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
              </div>
              
              <div className="space-y-4">
                {conceptDetails.aiInsights.map((insight, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{insight}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Your Confidence Level</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={confidenceRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSetConfidence(rating)}
                      className={cn(
                        "flex-1",
                        confidenceRating === rating && "bg-blue-600 hover:bg-blue-700"
                      )}
                    >
                      {rating}
                      {rating === 1 && " (Low)"}
                      {rating === 5 && " (High)"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <Button variant="outline" size="sm" onClick={() => setNotesOpen(!notesOpen)}>
          <PenLine className="h-4 w-4 mr-1" />
          {notesOpen ? "Hide Notes" : "Add Notes"}
        </Button>
      </div>
      
      {notesOpen && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <textarea 
              className="w-full h-32 p-3 border rounded-md bg-background resize-none" 
              placeholder="Write your notes here..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
            />
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={handleSaveNotes}>Save Notes</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <PencilRuler className="h-5 w-5 text-blue-600 mr-2" />
                Practice This Concept
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Try Practice Questions
                </Button>
                
                <Button variant="outline" className="justify-start" onClick={handleOpenFormulaLab}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Practice with Formula Lab
                </Button>
                
                <Button variant="outline" className="justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Video Explanation
                </Button>
                
                <Button variant="outline" className="justify-start">
                  <BookmarksIcon className="h-4 w-4 mr-2" />
                  Create Flashcards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                Related Concepts
              </h3>
              <div className="space-y-3">
                {conceptDetails.relatedConcepts.map((related) => (
                  <RouterLink 
                    key={related.id}
                    to={`/dashboard/student/concepts/card/${related.id}`}
                    className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    {related.title}
                    <ArrowRight className="h-4 w-4 float-right mt-1" />
                  </RouterLink>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Concept Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {conceptDetails.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Formula Tab Content Component
const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId, conceptTitle, handleOpenFormulaLab }) => {
  return (
    <div className="space-y-6">
      <Card className="border dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Key Formulas</h3>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleOpenFormulaLab}
            >
              <Calculator className="h-4 w-4 mr-1" /> Open Formula Lab
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Force</h4>
                  <div className="text-xl font-bold my-2">F = ma</div>
                </div>
                
                <Button variant="secondary" size="sm" onClick={handleOpenFormulaLab} className="mt-3 md:mt-0">
                  <Lightbulb className="h-4 w-4 mr-1" /> Practice
                </Button>
              </div>
              
              <div className="text-sm mt-3 pt-3 border-t dark:border-gray-700">
                <p className="mb-2"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-mono">F</span> = Force (Newtons)</li>
                  <li><span className="font-mono">m</span> = Mass (kilograms)</li>
                  <li><span className="font-mono">a</span> = Acceleration (m/s²)</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Momentum</h4>
                  <div className="text-xl font-bold my-2">p = mv</div>
                </div>
                
                <Button variant="secondary" size="sm" onClick={handleOpenFormulaLab} className="mt-3 md:mt-0">
                  <Lightbulb className="h-4 w-4 mr-1" /> Practice
                </Button>
              </div>
              
              <div className="text-sm mt-3 pt-3 border-t dark:border-gray-700">
                <p className="mb-2"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-mono">p</span> = Momentum (kg⋅m/s)</li>
                  <li><span className="font-mono">m</span> = Mass (kilograms)</li>
                  <li><span className="font-mono">v</span> = Velocity (m/s)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm mt-6">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            <span>Access more related formulas in the Formula Lab</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardDetailPage;
