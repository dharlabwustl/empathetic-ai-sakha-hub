
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Star, 
  BookOpen, 
  Brain, 
  Calculator, 
  Volume2,
  VolumeX,
  Eye,
  CheckCircle,
  Lightbulb,
  Box,
  BarChart3,
  Sparkles,
  Target,
  Clock,
  PenTool
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AIInsights from './AIInsights';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import NoteSection from './concept-detail/NoteSection';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import FormulaReference from './concept-detail/FormulaReference';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import ConceptExercises from './concept-detail/ConceptExercises';
import ConceptResources from './concept-detail/ConceptResources';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  content: string;
  formula?: string;
  keyPoints: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
  progress: number;
  mastery: number;
  timeEstimate: string;
}

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [quizScore, setQuizScore] = useState(0);

  // Mock concept data
  const conceptData: ConceptData = {
    id: conceptId || 'newtons-laws',
    title: "Newton's Laws of Motion",
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'medium',
    description: 'The three fundamental principles that describe the relationship between forces acting on a body and its motion.',
    content: `
      <h3>Introduction</h3>
      <p>Newton's Laws of Motion are three fundamental principles that describe the relationship between forces acting on a body and its motion. These laws form the foundation of classical mechanics.</p>
      
      <h4>First Law (Law of Inertia)</h4>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.</p>
      
      <h4>Second Law (F = ma)</h4>
      <p>The force acting on an object is equal to the mass of the object times its acceleration.</p>
      
      <h4>Third Law (Action-Reaction)</h4>
      <p>For every action, there is an equal and opposite reaction.</p>
    `,
    formula: 'F = ma',
    keyPoints: [
      'Objects resist changes in motion (inertia)',
      'Force equals mass times acceleration',
      'Forces always come in pairs',
      'Net force determines acceleration'
    ],
    commonMistakes: [
      'Confusing mass with weight',
      'Not considering all forces acting on an object',
      'Misunderstanding action-reaction pairs'
    ],
    relatedConcepts: ['Force', 'Acceleration', 'Momentum', 'Energy'],
    progress: 65,
    mastery: 45,
    timeEstimate: '25 min'
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSaveNotes = () => {
    console.log('Saving notes:', userNotes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully."
    });
  };

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        conceptData.content.replace(/<[^>]*>?/gm, '')
      );
      utterance.rate = 0.8;
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleCalculate = () => {
    try {
      // Simple calculator for physics formulas
      const result = eval(calculatorInput.replace(/[^0-9+\-*/.() ]/g, ''));
      setCalculatorResult(result.toString());
    } catch (error) {
      setCalculatorResult('Error');
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    toast({
      title: "Quiz completed!",
      description: `You scored ${score}% on the quiz.`
    });
  };

  // Mock flashcards for the concept
  const flashcards = [
    {
      id: 'f1',
      front: "What is Newton's First Law?",
      back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force."
    },
    {
      id: 'f2',
      front: "What is the formula for Newton's Second Law?",
      back: "F = ma (Force equals mass times acceleration)"
    },
    {
      id: 'f3',
      front: "What is Newton's Third Law?",
      back: "For every action, there is an equal and opposite reaction."
    }
  ];

  // Mock formulas for the concept
  const formulas = [
    {
      id: 'form1',
      name: "Newton's Second Law",
      latex: "F = ma",
      description: "Force equals mass times acceleration. This formula relates the force acting on an object to its mass and acceleration."
    },
    {
      id: 'form2',
      name: "Weight Formula",
      latex: "W = mg",
      description: "Weight equals mass times gravitational acceleration. This formula calculates the weight of an object based on its mass and the gravitational pull."
    }
  ];

  // Mock related concepts
  const relatedConceptsList = [
    {
      id: 'rc1',
      title: 'Momentum',
      masteryLevel: 35
    },
    {
      id: 'rc2',
      title: 'Force and Motion',
      masteryLevel: 60
    },
    {
      id: 'rc3',
      title: 'Conservation of Energy',
      masteryLevel: 25
    }
  ];

  // Determine exam readiness based on mastery level
  const examReady = conceptData.mastery >= 60;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Concepts
        </Button>
      </div>

      {/* Masthead */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6 border border-indigo-100 dark:border-indigo-800"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg">
              <Box className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300">
                  {conceptData.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300">
                  {conceptData.topic}
                </Badge>
                <Badge variant="outline" className={
                  conceptData.difficulty === 'easy' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : conceptData.difficulty === 'medium'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }>
                  {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                {conceptData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {conceptData.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmarkToggle}
            className="text-gray-500 hover:text-amber-500"
          >
            <Star className={`h-6 w-6 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </Button>
        </div>

        {/* Progress Trackers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Progress</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{conceptData.progress}%</span>
            </div>
            <Progress value={conceptData.progress} className="h-2" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mastery Level</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{conceptData.mastery}%</span>
            </div>
            <Progress value={conceptData.mastery} className="h-2" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Est. Time:</span>
              <span className="text-sm font-bold text-amber-600">{conceptData.timeEstimate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Button onClick={handleReadAloud} variant="outline" className="flex items-center gap-2">
            {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isReading ? 'Stop Reading' : 'Read Aloud'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visual Mode
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Practice Quiz
          </Button>
        </div>
      </motion.div>

      {/* AI Insights Section */}
      <div className="mb-6">
        <AIInsights conceptName={conceptData.title} />
      </div>

      {/* Main Content Area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">Learn</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Concept Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: conceptData.content }}
              />
            </CardContent>
          </Card>

          {conceptData.formula && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  Key Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    {conceptData.formula}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Where F = Force, m = mass, a = acceleration
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conceptData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conceptData.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-4 w-4 bg-amber-100 rounded-full mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Question 1</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    A 10 kg object is pushed with a force of 50 N. What is its acceleration?
                  </p>
                  <Button size="sm">Show Solution</Button>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Question 2</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Explain why a passenger moves forward when a car suddenly stops.
                  </p>
                  <Button size="sm">Show Solution</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConceptFlashcards flashcards={flashcards} />
            <QuickRecallSection 
              conceptId={conceptData.id}
              title={conceptData.title}
              content={conceptData.content}
              onQuizComplete={handleQuizComplete}
            />
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-indigo-600" />
                My Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NoteSection 
                userNotes={userNotes}
                setUserNotes={setUserNotes}
                handleSaveNotes={handleSaveNotes}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Physics Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Formula (e.g., 50/10)</label>
                  <Input
                    value={calculatorInput}
                    onChange={(e) => setCalculatorInput(e.target.value)}
                    placeholder="Enter calculation..."
                  />
                </div>
                <Button onClick={handleCalculate} className="w-full">
                  Calculate
                </Button>
                {calculatorResult && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="font-medium">Result: {calculatorResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <FormulaReference 
            formulas={formulas} 
            conceptTitle={conceptData.title} 
          />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full">Open Formula Lab</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Formula Lab</h2>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Experiment with different values for Newton's Second Law.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Mass (kg)</label>
                      <Input type="number" placeholder="Enter mass" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Force (N)</label>
                      <Input type="number" placeholder="Enter force" />
                    </div>
                  </div>
                  
                  <Button className="w-full">Calculate Acceleration</Button>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Result will appear here</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Learning Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Study Sessions</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Quiz Average</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2.5h</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConceptExercises 
                  conceptId={conceptData.id}
                  conceptTitle={conceptData.title}
                  recallAccuracy={75}
                  lastPracticed="2023-06-15"
                  quizScore={quizScore || 0}
                />
                
                <div className="space-y-6">
                  <ConceptSidebar 
                    masteryLevel={conceptData.mastery}
                    relatedConcepts={relatedConceptsList}
                    examReady={examReady}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LinkedConceptsSection 
              conceptId={conceptData.id}
              subject={conceptData.subject}
              topic={conceptData.topic}
            />
            
            <AskTutorSection 
              conceptId={conceptData.id}
              title={conceptData.title}
              subject={conceptData.subject}
              topic={conceptData.topic}
            />
          </div>
          
          <ConceptResources conceptId={conceptData.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;
