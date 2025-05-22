import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, FlaskConical, BookmarkPlus, Video, 
  MessageSquare, Brain, Zap, ListChecks, ArrowLeft, 
  Bookmark, ChevronRight, Award, CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptResources from './concept-detail/ConceptResources';
import ConceptExercises from './concept-detail/ConceptExercises';
import FormulaReference from './concept-detail/FormulaReference';
import AskTutorSection from './concept-detail/AskTutorSection';
import { useToast } from '@/hooks/use-toast';

// Mock data for concept cards - in a real app this would come from an API
const mockConcept = {
  id: "concept-1",
  title: "Newton's Second Law",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2>Introduction</h2>
    <p>Newton's Second Law of Motion describes the relationship between an object's mass (m), its acceleration (a), and the applied force (F). It states that the force acting on an object is equal to the mass of that object times its acceleration.</p>
    
    <h2>The Fundamental Equation</h2>
    <p>The mathematical representation of Newton's Second Law is:</p>
    <p class="text-center text-xl font-bold my-4">F = ma</p>
    <p>Where:</p>
    <ul>
      <li>F is the net force acting on the object (measured in Newtons, N)</li>
      <li>m is the mass of the object (measured in kilograms, kg)</li>
      <li>a is the acceleration of the object (measured in meters per second squared, m/s²)</li>
    </ul>
    
    <h3>Implications of the Law</h3>
    <p>This law implies that:</p>
    <ol>
      <li>The acceleration of an object is directly proportional to the net force acting on it</li>
      <li>The acceleration of an object is inversely proportional to its mass</li>
    </ol>
    
    <h2>Applications</h2>
    <p>Newton's Second Law has numerous practical applications:</p>
    <ul>
      <li>Designing vehicle braking systems</li>
      <li>Calculating rocket thrust requirements</li>
      <li>Engineering elevator safety systems</li>
      <li>Analyzing sports movements and techniques</li>
    </ul>
    
    <h2>Common Misconceptions</h2>
    <p>A common misconception is confusing mass and weight. Mass is a measure of the amount of matter in an object, while weight is the force of gravity acting on that mass. On Earth, an object's weight can be calculated as W = mg, where g is the acceleration due to gravity (approximately 9.8 m/s² on Earth).</p>
  `,
  mastery: {
    level: "Intermediate",
    percentage: 65
  },
  examReady: false,
  bookmarked: false,
  relatedConcepts: [
    { id: "concept-2", title: "Newton's First Law", masteryLevel: 85 },
    { id: "concept-3", title: "Newton's Third Law", masteryLevel: 40 },
    { id: "concept-4", title: "Conservation of Momentum", masteryLevel: 60 }
  ],
  flashcards: [
    { 
      id: "f1", 
      front: "What is Newton's Second Law?", 
      back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F = ma)." 
    },
    { 
      id: "f2", 
      front: "What are the units of force in SI?", 
      back: "The SI unit of force is the Newton (N), which is equal to kg·m/s²." 
    },
    { 
      id: "f3", 
      front: "How does mass affect acceleration?", 
      back: "Mass and acceleration are inversely proportional. For a given force, objects with greater mass will have smaller acceleration." 
    },
    { 
      id: "f4", 
      front: "What happens to acceleration if force is doubled?", 
      back: "If the force applied to an object is doubled while the mass remains constant, the acceleration will also double." 
    }
  ],
  formulas: [
    { 
      id: "formula1", 
      name: "Newton's Second Law Formula", 
      latex: "F = ma", 
      description: "Force equals mass times acceleration. This is the fundamental equation of Newton's Second Law." 
    },
    { 
      id: "formula2", 
      name: "Finding Acceleration", 
      latex: "a = \\frac{F}{m}", 
      description: "Acceleration can be calculated by dividing the net force by the mass of the object." 
    },
    { 
      id: "formula3", 
      name: "Finding Mass", 
      latex: "m = \\frac{F}{a}", 
      description: "Mass can be calculated by dividing the net force by the acceleration of the object." 
    }
  ],
  recallAccuracy: 75,
  lastPracticed: "2025-05-15",
  quizScore: 68
};

const ConceptDetailPage = () => {
  const navigate = useNavigate();
  const { conceptId } = useParams<{ conceptId: string }>();
  const [concept, setConcept] = useState(mockConcept);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const { toast } = useToast();
  
  // In a real app, fetch concept data based on conceptId
  useEffect(() => {
    // This would be a fetch call to get concept data
    console.log(`Fetching concept data for ID: ${conceptId}`);
    setIsBookmarked(mockConcept.bookmarked);
    
    // Simulating loading user notes from storage
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      setUserNotes(savedNotes);
    }
  }, [conceptId]);
  
  const handleSaveNotes = () => {
    // Save notes to local storage (in a real app, this would be an API call)
    localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "This concept has been added to your bookmarks for quick access"
    });
  };
  
  const handleOpenFormulaLab = () => {
    // Open formula interactive lab/calculator
    toast({
      title: "Formula Lab",
      description: "Opening Formula Lab for interactive practice"
    });
  };

  const handleBackButtonClick = () => {
    navigate('/concepts');
  };

  // Stop speech if user changes tabs or navigates away
  useEffect(() => {
    return () => {
      if (isReadingAloud) {
        speechSynthesis.cancel();
      }
    };
  }, [isReadingAloud]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackButtonClick}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Concepts
          </Button>
        </div>

        <div className="space-y-6">
          {/* Concept Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-1.5">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                    {concept.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800/50">
                    {concept.topic}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${concept.difficulty === 'easy' 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50' 
                      : concept.difficulty === 'medium' 
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50' 
                      : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/50'
                    }
                  `}>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {concept.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="flex gap-1.5 items-center rounded-full w-10 h-10 p-0 justify-center"
                  onClick={handleBookmarkToggle}
                >
                  {isBookmarked ? (
                    <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Start Practice
                </Button>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">Mastery Level:</span>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{concept.mastery.level} ({concept.mastery.percentage}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  {concept.examReady ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 gap-1 flex items-center">
                      <CheckCircle className="h-3 w-3" />
                      Exam Ready
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      Needs Practice
                    </Badge>
                  )}
                </div>
              </div>
              <Progress 
                value={concept.mastery.percentage} 
                className="h-2"
                indicatorClassName={`${
                  concept.mastery.percentage >= 80 ? 'bg-green-500 dark:bg-green-500' : 
                  concept.mastery.percentage >= 60 ? 'bg-blue-500 dark:bg-blue-500' : 
                  concept.mastery.percentage >= 40 ? 'bg-amber-500 dark:bg-amber-500' : 
                  'bg-red-500 dark:bg-red-500'
                }`}
              />
            </div>
          </motion.div>
          
          {/* Main Content Area with Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content - 3/4 width on large screens */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                {/* Tabs Navigation */}
                <Tabs 
                  defaultValue="learn" 
                  value={activeTab}
                  onValueChange={setActiveTab as any}
                  className="w-full"
                >
                  <div className="bg-white dark:bg-gray-800 px-1 pt-1 border-b border-gray-200 dark:border-gray-700">
                    <TabsList className="w-full flex justify-start overflow-x-auto hide-scrollbar bg-transparent h-auto p-0">
                      <TabsTrigger 
                        value="learn" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <BookOpen className="h-4 w-4 mr-2" /> 
                        Learn
                      </TabsTrigger>
                      <TabsTrigger 
                        value="practice" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <Brain className="h-4 w-4 mr-2" /> 
                        Practice
                      </TabsTrigger>
                      <TabsTrigger 
                        value="formulas" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <Zap className="h-4 w-4 mr-2" /> 
                        Formulas
                      </TabsTrigger>
                      <TabsTrigger 
                        value="flashcards" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-2" /> 
                        Flashcards
                      </TabsTrigger>
                      <TabsTrigger 
                        value="resources" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <Video className="h-4 w-4 mr-2" /> 
                        Resources
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tutor" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-3 bg-transparent"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" /> 
                        Ask Tutor
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="learn" className="m-0 p-0">
                    <ConceptContent 
                      content={concept.content} 
                      conceptId={concept.id}
                      userNotes={userNotes}
                      setUserNotes={setUserNotes}
                      handleSaveNotes={handleSaveNotes}
                      isReadingAloud={isReadingAloud}
                      setIsReadingAloud={setIsReadingAloud}
                    />
                  </TabsContent>
                  
                  <TabsContent value="practice" className="m-0 p-0">
                    <div className="p-6">
                      <ConceptExercises 
                        conceptId={conceptId || ''}
                        conceptTitle={concept.title}
                        recallAccuracy={concept.recallAccuracy || 75}
                        lastPracticed={concept.lastPracticed || "2025-05-15"}
                        quizScore={concept.quizScore || 68}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="formulas" className="m-0 p-0">
                    <div className="p-6">
                      <FormulaReference 
                        formulas={concept.formulas || []}
                        conceptTitle={concept.title}
                        handleOpenFormulaLab={handleOpenFormulaLab}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="flashcards" className="m-0 p-0">
                    <ConceptFlashcards flashcards={concept.flashcards || []} />
                  </TabsContent>
                  
                  <TabsContent value="resources" className="m-0 p-0">
                    <div className="p-6">
                      <ConceptResources conceptId={concept.id} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tutor" className="m-0 p-0">
                    <AskTutorSection 
                      conceptId={concept.id}
                      title={concept.title}
                      subject={concept.subject}
                      topic={concept.topic}
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            {/* Sidebar - 1/4 width on large screens */}
            <div className="lg:col-span-1 space-y-6">
              <ConceptSidebar 
                masteryLevel={masteryLevel}
                relatedConcepts={concept.relatedConcepts || []}
                examReady={concept.examReady || false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbars but keeping functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default ConceptDetailPage;
