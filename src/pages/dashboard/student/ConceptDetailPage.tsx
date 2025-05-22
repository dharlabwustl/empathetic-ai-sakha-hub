
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  PieChart, 
  BarChart3,
  Video,
  MessageCircle,
  AlertTriangle,
  Sparkles,
  FlaskConical,
  Lightbulb,
  Eye,
  Cube,
  Star
} from 'lucide-react';

import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import ConceptContent from '@/components/dashboard/student/concepts/concept-detail/ConceptContent';
import ConceptExercises from '@/components/dashboard/student/concepts/concept-detail/ConceptExercises';
import ConceptFlashcards from '@/components/dashboard/student/concepts/concept-detail/ConceptFlashcards';
import ConceptResources from '@/components/dashboard/student/concepts/concept-detail/ConceptResources';
import FormulaTabContent from '@/components/dashboard/student/concepts/concept-detail/FormulaTabContent';
import AIInsightsSection from '@/components/dashboard/student/concepts/AIInsightsSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const [activeMainTab, setActiveMainTab] = useState('learn');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  // Mock data - in a real app this would come from an API
  const conceptData = {
    id: conceptId || 'concept-1',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    topic: "Classical Mechanics",
    difficulty: "medium" as 'easy' | 'medium' | 'hard',
    masteryLevel: 65,
    recallAccuracy: 72,
    studyTime: 135, // in minutes
    flashcardsReviewed: 18,
    questionsAttempted: 24,
    correctAnswers: 18,
    successRate: 75,
    lastPracticed: "2023-05-15T14:30:00Z",
    completedSessions: 4,
    description: "Newton's second law of motion states that the acceleration of an object depends on the mass of the object and the amount of force applied.",
    content: `
      <h2 id="introduction">Introduction to Newton's Second Law</h2>
      <p>Newton's Second Law of Motion is a fundamental principle in classical mechanics that describes the relationship between an object's mass (m), its acceleration (a), and the force (F) applied to it.</p>
      <p>The law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.</p>
      
      <h2 id="mathematical-formulation">Mathematical Formulation</h2>
      <p>Newton's Second Law is typically expressed as:</p>
      <p><strong>F = m × a</strong></p>
      <p>Where:</p>
      <ul>
        <li>F is the net force acting on the object (measured in Newtons, N)</li>
        <li>m is the mass of the object (measured in kilograms, kg)</li>
        <li>a is the acceleration of the object (measured in meters per second squared, m/s²)</li>
      </ul>
      
      <h3 id="vector-nature">Vector Nature</h3>
      <p>It's important to note that both force and acceleration are vector quantities, meaning they have both magnitude and direction. The direction of the acceleration is the same as the direction of the net force.</p>
      
      <h2 id="applications">Practical Applications</h2>
      <p>Newton's Second Law has countless applications in everyday life and engineering:</p>
      <ul>
        <li>Calculating the force needed to accelerate vehicles</li>
        <li>Designing rockets and understanding their propulsion</li>
        <li>Analyzing the forces in structural engineering</li>
        <li>Understanding the motion of objects in sports</li>
      </ul>
      
      <h2 id="limitations">Limitations</h2>
      <p>While Newton's Second Law is incredibly useful, it has limitations:</p>
      <ul>
        <li>It doesn't apply at speeds approaching the speed of light (relativistic speeds)</li>
        <li>It doesn't apply at the quantum level for extremely small particles</li>
        <li>It assumes that mass remains constant (which isn't true for objects traveling near the speed of light)</li>
      </ul>
    `,
    relatedConcepts: [
      { id: 'concept-newton-first', title: "Newton's First Law of Motion", masteryLevel: 88 },
      { id: 'concept-newton-third', title: "Newton's Third Law of Motion", masteryLevel: 45 },
      { id: 'concept-momentum', title: "Momentum and Impulse", masteryLevel: 32 },
      { id: 'concept-energy', title: "Work, Energy and Power", masteryLevel: 58 }
    ],
    flashcards: [
      { 
        id: 'fc1',
        front: "What is Newton's Second Law of Motion?",
        back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass, expressed as F = ma."
      },
      { 
        id: 'fc2',
        front: "What are the units of force in the SI system?",
        back: "The SI unit of force is the Newton (N), which is equal to 1 kg·m/s²."
      },
      { 
        id: 'fc3',
        front: "How does doubling the force affect acceleration?",
        back: "If you double the force applied to an object while keeping the mass constant, the acceleration will also double."
      },
      { 
        id: 'fc4',
        front: "How does doubling the mass affect acceleration?",
        back: "If you double the mass of an object while keeping the force constant, the acceleration will be halved."
      },
      { 
        id: 'fc5',
        front: "Why is Newton's Second Law a vector equation?",
        back: "Because both force and acceleration are vector quantities, having both magnitude and direction. The direction of acceleration is the same as the net force."
      }
    ],
    examReady: false
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleSaveNotes = () => {
    // In a real app, this would save the notes to a database
    console.log('Saving notes:', userNotes);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <ConceptHeader 
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Mastery & Recall Tracker */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-xl font-bold mb-4">Mastery & Recall Tracker</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Mastery Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mastery Level</span>
                <Badge variant="outline" className={`${
                  conceptData.masteryLevel >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  conceptData.masteryLevel >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  conceptData.masteryLevel >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {conceptData.masteryLevel}%
                </Badge>
              </div>
              <Progress 
                value={conceptData.masteryLevel} 
                className="h-2" 
                indicatorClassName={`${
                  conceptData.masteryLevel >= 80 ? 'bg-green-500' :
                  conceptData.masteryLevel >= 60 ? 'bg-blue-500' :
                  conceptData.masteryLevel >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conceptData.masteryLevel < 50 ? 'Needs improvement' :
                 conceptData.masteryLevel < 70 ? 'Good progress' :
                 conceptData.masteryLevel < 90 ? 'Strong understanding' :
                 'Excellent mastery'}
              </p>
            </div>
            
            {/* Success Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Success Rate</span>
                <Badge variant="outline" className={`${
                  conceptData.successRate >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  conceptData.successRate >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}>
                  {conceptData.successRate}%
                </Badge>
              </div>
              <Progress 
                value={conceptData.successRate} 
                className="h-2" 
                indicatorClassName={`${
                  conceptData.successRate >= 80 ? 'bg-green-500' :
                  conceptData.successRate >= 60 ? 'bg-blue-500' :
                  'bg-yellow-500'
                }`}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conceptData.correctAnswers} correct out of {conceptData.questionsAttempted} questions
              </p>
            </div>
            
            {/* Study Time */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Study Time</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  {Math.floor(conceptData.studyTime / 60)}h {conceptData.studyTime % 60}m
                </Badge>
              </div>
              <Progress 
                value={Math.min(100, (conceptData.studyTime / 180) * 100)} 
                className="h-2" 
                indicatorClassName="bg-purple-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conceptData.completedSessions} study sessions completed
              </p>
            </div>
            
            {/* Flashcards */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Flashcards</span>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
                  {conceptData.flashcardsReviewed} cards
                </Badge>
              </div>
              <Progress 
                value={(conceptData.flashcardsReviewed / 25) * 100} 
                className="h-2" 
                indicatorClassName="bg-indigo-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conceptData.flashcardsReviewed >= 20 ? 'Great revision habit!' : 'Review flashcards regularly'}
              </p>
            </div>
          </div>
        </Card>
        
        {/* AI Insights */}
        <AIInsightsSection conceptId={conceptData.id} conceptTitle={conceptData.title} />
        
        {/* Main content with tabs and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Main Tabs */}
              <Tabs defaultValue="learn" value={activeMainTab} onValueChange={(value) => setActiveMainTab(value)}>
                <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  <TabsList className="bg-transparent border-b border-gray-200 dark:border-gray-700 w-full justify-start rounded-none p-0 h-auto">
                    <TabsTrigger 
                      value="learn" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Learn
                    </TabsTrigger>
                    <TabsTrigger 
                      value="recall" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <Brain className="h-4 w-4 mr-2" /> Recall
                    </TabsTrigger>
                    <TabsTrigger 
                      value="visual" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <Eye className="h-4 w-4 mr-2" /> Visual
                    </TabsTrigger>
                    <TabsTrigger 
                      value="3d" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <Cube className="h-4 w-4 mr-2" /> 3D Simulation
                    </TabsTrigger>
                    <TabsTrigger 
                      value="formula" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <FlaskConical className="h-4 w-4 mr-2" /> Formula Lab
                    </TabsTrigger>
                    <TabsTrigger 
                      value="video" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <Video className="h-4 w-4 mr-2" /> Video
                    </TabsTrigger>
                    <TabsTrigger 
                      value="mistakes" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" /> Common Mistakes
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <PieChart className="h-4 w-4 mr-2" /> Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="revision" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> Revision
                    </TabsTrigger>
                    <TabsTrigger 
                      value="discuss" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none rounded-none px-4 py-3 h-auto"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" /> Discuss
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="learn" className="m-0">
                  <ConceptContent 
                    content={conceptData.content}
                    conceptId={conceptData.id} 
                    userNotes={userNotes}
                    setUserNotes={setUserNotes}
                    handleSaveNotes={handleSaveNotes}
                    isReadingAloud={isReadingAloud}
                    setIsReadingAloud={setIsReadingAloud}
                  />
                </TabsContent>

                <TabsContent value="recall" className="m-0">
                  <ConceptFlashcards flashcards={conceptData.flashcards} />
                </TabsContent>
                
                <TabsContent value="visual" className="m-0 p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-indigo-600" /> Visual Learning
                  </h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Interactive visualizations for Newton's Second Law will be displayed here.</p>
                    <Button className="mt-4">
                      <Sparkles className="h-4 w-4 mr-2" /> Generate Visualization
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="3d" className="m-0 p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Cube className="h-5 w-5 mr-2 text-indigo-600" /> 3D Simulation
                  </h2>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">3D interactive simulations for force and acceleration will be displayed here.</p>
                    <Button className="mt-4">
                      <Sparkles className="h-4 w-4 mr-2" /> Launch Simulation
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="formula" className="m-0">
                  <FormulaTabContent 
                    conceptId={conceptData.id}
                    conceptTitle={conceptData.title}
                    handleOpenFormulaLab={() => console.log('Opening formula lab')}
                  />
                </TabsContent>
                
                <TabsContent value="video" className="m-0 p-6">
                  <ConceptResources conceptId={conceptData.id} />
                </TabsContent>
                
                <TabsContent value="mistakes" className="m-0 p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" /> Common Mistakes
                  </h2>
                  
                  <div className="space-y-6">
                    <Card className="border-l-4 border-amber-500">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Confusing Weight and Mass</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Many students confuse weight (a force) with mass (a property of matter). Remember that weight = mass × gravity.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-amber-500">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Not Accounting for All Forces</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          When applying F = ma, students often forget to include all forces acting on an object, leading to incorrect calculations.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-amber-500">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Ignoring Direction</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Force and acceleration are vector quantities. Students often make errors by not accounting for direction in their calculations.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Pro Tip:</h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Always draw a free body diagram before solving Newton's Second Law problems. This helps you visualize all forces acting on an object and their directions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="m-0 p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-purple-600" /> Learning Analytics
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      Detailed performance analytics and learning insights for this concept will be displayed here.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Performance Over Time</h3>
                          <div className="bg-gray-100 dark:bg-gray-800 h-40 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Performance chart will be displayed here</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Concept Mastery Breakdown</h3>
                          <div className="bg-gray-100 dark:bg-gray-800 h-40 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Mastery breakdown chart will be displayed here</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="revision" className="m-0 p-6">
                  <ConceptExercises 
                    conceptId={conceptData.id}
                    conceptTitle={conceptData.title}
                    recallAccuracy={conceptData.recallAccuracy}
                    lastPracticed={conceptData.lastPracticed}
                    quizScore={conceptData.successRate}
                  />
                </TabsContent>
                
                <TabsContent value="discuss" className="m-0 p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-green-600" /> Discussion Forum
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Join the discussion about this concept with other students and teachers.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">Discussion forum will be displayed here.</p>
                      <Button className="mt-4">
                        <MessageCircle className="h-4 w-4 mr-2" /> Start a Discussion
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ConceptSidebar 
              masteryLevel={conceptData.masteryLevel}
              relatedConcepts={conceptData.relatedConcepts}
              examReady={conceptData.examReady}
            />
            
            <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-2" />
                  <h3 className="font-medium">Achievement Progress</h3>
                </div>
                <Progress value={65} className="h-2 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  You're 65% towards earning the "Physics Fundamentals" badge
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
