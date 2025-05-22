
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, FlaskConical, BookmarkPlus, BookMarked, Video, 
  MessageSquare, Brain, Zap, ListChecks, ArrowLeft 
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptResources from './concept-detail/ConceptResources';
import ConceptExercises from './concept-detail/ConceptExercises';
import FormulaTabContent from './FormulaTabContent';

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
    { id: "formula1", name: "Force", expression: "F = ma", variables: ["F", "m", "a"] },
    { id: "formula2", name: "Acceleration", expression: "a = F/m", variables: ["a", "F", "m"] },
    { id: "formula3", name: "Mass", expression: "m = F/a", variables: ["m", "F", "a"] }
  ]
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
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // This would update the bookmarked status via an API call in a real app
  };
  
  const handleOpenFormulaLab = () => {
    // Open formula interactive lab/calculator
    console.log("Opening formula interactive lab");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          onClick={handleBackButtonClick}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Concepts
        </Button>
      </div>

      <div className="space-y-6">
        {/* Concept Header */}
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Main Content Area with Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3/4 width on large screens */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="overflow-hidden">
              {/* Mastery Level Indicator */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Mastery Level</h2>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {concept.mastery.level} • {masteryLevel}%
                    </p>
                  </div>
                  <div className="w-32">
                    <Progress 
                      value={masteryLevel} 
                      className="h-2"
                      indicatorClassName={`${
                        masteryLevel >= 80 ? 'bg-green-500' : 
                        masteryLevel >= 60 ? 'bg-blue-500' : 
                        masteryLevel >= 40 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tabs Navigation */}
              <Tabs 
                defaultValue="learn" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full flex justify-start px-4 pt-3 pb-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <TabsTrigger 
                    value="learn" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <BookOpen className="h-4 w-4 mr-2" /> Learn
                  </TabsTrigger>
                  <TabsTrigger 
                    value="practice" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <Brain className="h-4 w-4 mr-2" /> Practice
                  </TabsTrigger>
                  <TabsTrigger 
                    value="formulas" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <Zap className="h-4 w-4 mr-2" /> Formulas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flashcards" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" /> Flashcards
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resources" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <Video className="h-4 w-4 mr-2" /> Resources
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mcq" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-none px-4 py-2"
                  >
                    <ListChecks className="h-4 w-4 mr-2" /> MCQs
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="learn" className="pt-0 m-0">
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
                
                <TabsContent value="practice" className="pt-0 m-0">
                  <ConceptExercises 
                    conceptId={conceptId || ''}
                    conceptTitle={concept.title}
                    recallAccuracy={75}
                    lastPracticed="2025-05-15"
                    quizScore={68}
                  />
                </TabsContent>
                
                <TabsContent value="formulas" className="pt-0 m-0">
                  <FormulaTabContent 
                    conceptId={conceptId || ''}
                    conceptTitle={concept.title}
                    handleOpenFormulaLab={handleOpenFormulaLab}
                  />
                </TabsContent>
                
                <TabsContent value="flashcards" className="pt-0 m-0">
                  <ConceptFlashcards flashcards={concept.flashcards} />
                </TabsContent>
                
                <TabsContent value="resources" className="pt-0 m-0">
                  <ConceptResources conceptId={concept.id} />
                </TabsContent>
                
                <TabsContent value="mcq" className="pt-0 m-0">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Multiple Choice Questions</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Test your understanding of {concept.title} with these practice questions.
                    </p>
                    <Card className="p-6 bg-gray-50 dark:bg-gray-800/50">
                      <p>MCQ questions will be available soon. Check back later for practice questions!</p>
                      <Button className="mt-4">Request MCQs</Button>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar - 1/4 width on large screens */}
          <div className="space-y-4">
            <ConceptSidebar 
              masteryLevel={masteryLevel}
              relatedConcepts={concept.relatedConcepts}
              examReady={concept.examReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
