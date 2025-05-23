
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen, 
  ArrowLeft, 
  Video, 
  FileText, 
  Activity, 
  MessageCircle, 
  Pencil, 
  Brain,
  Cube, 
  PieChart,
  BarChart4,
  AlertTriangle,
  Flask
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import all the necessary components
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import ConceptMastery from './ConceptMasterySection';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptResources from './concept-detail/ConceptResources';
import AIInsightsSection from './AIInsightsSection';

// Mock data
const conceptData = {
  id: '1',
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as "easy" | "medium" | "hard",
  isBookmarked: true,
  masteryLevel: 65,
  lastPracticed: "2023-04-15",
  quizScore: 75,
  examReady: false,
  description: `Newton's second law of motion describes the relationship between an object's mass and the amount of force needed to accelerate it. The law states that the force acting on an object is equal to the mass of that object times its acceleration: F = ma.`,
  details: `This fundamental principle forms the backbone of classical mechanics and helps us understand the behavior of objects when forces act upon them. The law implies that the greater the mass of an object, the more force is needed to achieve the same acceleration.`,
  formula: "F = ma",
  formulaExplanation: {
    "F": "Force in Newtons (N)",
    "m": "Mass in kilograms (kg)",
    "a": "Acceleration in meters per second squared (m/s²)"
  },
  examples: [
    "A 2kg object accelerating at 5 m/s² requires a force of 10N (F = 2kg × 5m/s² = 10N).",
    "To move a 1,500kg car with an acceleration of 3 m/s², a force of 4,500N is needed."
  ]
};

// Mock flashcards
const mockFlashcards = [
  { id: "f1", front: "What is Newton's Second Law?", back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass." },
  { id: "f2", front: "Write the equation for Newton's Second Law", back: "F = ma, where F is force, m is mass, and a is acceleration." },
  { id: "f3", front: "If a 5kg object experiences a force of 20N, what is its acceleration?", back: "a = F/m = 20N/5kg = 4 m/s²" },
  { id: "f4", front: "What happens to acceleration if the mass doubles but force remains constant?", back: "Acceleration decreases by half since a = F/m and m has doubled." },
  { id: "f5", front: "A 1,000kg car accelerates at 2 m/s². What force is applied?", back: "F = ma = 1,000kg × 2m/s² = 2,000N" }
];

// Mock related concepts
const relatedConcepts = [
  { id: "c1", title: "Newton's First Law", masteryLevel: 85 },
  { id: "c2", title: "Newton's Third Law", masteryLevel: 40 },
  { id: "c3", title: "Conservation of Momentum", masteryLevel: 65 },
];

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [isBookmarked, setIsBookmarked] = useState(conceptData.isBookmarked);
  const navigate = useNavigate();
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Concepts
        </Button>
      </div>

      {/* Concept Header */}
      <ConceptHeader
        title={conceptData.title}
        subject={conceptData.subject}
        topic={conceptData.topic}
        difficulty={conceptData.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />
      
      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        
        {/* Main Content Area - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mastery & Recall Tracker */}
          <Card>
            <CardContent className="p-0">
              <ConceptMastery 
                conceptId={conceptId || "1"} 
                recallAccuracy={conceptData.masteryLevel} 
                quizScore={conceptData.quizScore}
                lastPracticed={conceptData.lastPracticed}
              />
            </CardContent>
          </Card>
          
          {/* AI Insights Section */}
          <Card>
            <CardContent className="p-0">
              <AIInsightsSection 
                conceptId={conceptId || "1"}
                conceptTitle={conceptData.title}
              />
            </CardContent>
          </Card>
          
          {/* Main Tabs for Learning Content */}
          <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-11 mb-4">
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Learn
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Activity className="h-4 w-4" /> Visual
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center gap-1">
                <Cube className="h-4 w-4" /> 3D Sim
              </TabsTrigger>
              <TabsTrigger value="formula" className="flex items-center gap-1">
                <Flask className="h-4 w-4" /> Formula
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" /> Video
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> Mistakes
              </TabsTrigger>
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <Brain className="h-4 w-4" /> Recall
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" /> Analytics
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-1">
                <BarChart4 className="h-4 w-4" /> Revision
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <Pencil className="h-4 w-4" /> Notes
              </TabsTrigger>
              <TabsTrigger value="discuss" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> Discuss
              </TabsTrigger>
            </TabsList>
            
            {/* Learn Content */}
            <TabsContent value="learn" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-semibold mb-4">Understanding {conceptData.title}</h2>
                      <p className="mb-4">{conceptData.description}</p>
                      <p>{conceptData.details}</p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mt-6">
                      <h3 className="text-xl font-semibold mb-2">Examples</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {conceptData.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="mt-6">
                      <h3 className="text-xl font-semibold mb-4">Practice with Flashcards</h3>
                      <ConceptFlashcards flashcards={mockFlashcards} />
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Visual Content */}
            <TabsContent value="visual" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Visual Representations</h2>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Activity className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-500">Interactive visualization of {conceptData.title}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Force and Acceleration Relationship</h3>
                    <p>This visual demonstrates how changes in force affect acceleration for objects of different masses.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* 3D Simulation */}
            <TabsContent value="3d" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">3D Interactive Simulation</h2>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Cube className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-500">3D simulation of {conceptData.title}</p>
                      <p className="text-sm text-slate-400 mt-2">Drag to rotate, scroll to zoom</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Experiment with Variables</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Mass (kg)</p>
                        <input type="range" min="1" max="10" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Force (N)</p>
                        <input type="range" min="0" max="50" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Friction</p>
                        <input type="range" min="0" max="1" step="0.01" className="w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Formula Lab */}
            <TabsContent value="formula" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Formula Lab</h2>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg mb-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-medium mb-4">Key Formula</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        F = ma
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-left mt-8">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <div className="font-bold text-xl text-blue-700 dark:text-blue-400">F</div>
                          <div className="text-sm mt-1">Force (Newtons)</div>
                          <div className="text-xs text-slate-500 mt-1">Vector quantity</div>
                        </div>
                        
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                          <div className="font-bold text-xl text-purple-700 dark:text-purple-400">m</div>
                          <div className="text-sm mt-1">Mass (Kilograms)</div>
                          <div className="text-xs text-slate-500 mt-1">Scalar quantity</div>
                        </div>
                        
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                          <div className="font-bold text-xl text-emerald-700 dark:text-emerald-400">a</div>
                          <div className="text-sm mt-1">Acceleration (m/s²)</div>
                          <div className="text-xs text-slate-500 mt-1">Vector quantity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Formula Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Mass (kg)</label>
                        <input type="number" className="w-full border rounded p-2" placeholder="Enter mass" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Force (N)</label>
                        <input type="number" className="w-full border rounded p-2" placeholder="Enter force" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Acceleration (m/s²)</label>
                        <input type="number" className="w-full border rounded p-2" placeholder="Enter acceleration" />
                      </div>
                    </div>
                    
                    <Button className="mt-4">Calculate</Button>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg mt-4">
                      <h4 className="font-medium text-green-800 dark:text-green-400">Result</h4>
                      <p className="text-sm mt-1">The calculation result will appear here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Video Content */}
            <TabsContent value="video" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Video Explanations</h2>
                  <ConceptResources conceptId={conceptId || "1"} />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Common Mistakes */}
            <TabsContent value="mistakes" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Common Mistakes</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
                      <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
                        Confusing Mass and Weight
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Students often confuse mass (m) with weight (W = mg). Mass is an intrinsic property of an object,
                        while weight is the force exerted on an object due to gravity.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg">
                      <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400 mb-2">
                        Forgetting Vector Nature
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Both force and acceleration are vectors, meaning they have direction. Students often calculate
                        magnitude but forget to account for direction in problems.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400 mb-2">
                        Inconsistent Units
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Using inconsistent units is a common error. Make sure mass is in kg, acceleration in m/s², 
                        and force in Newtons (N).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Recall Tab */}
            <TabsContent value="recall" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Spaced Repetition</h2>
                  <ConceptFlashcards flashcards={mockFlashcards} />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Performance Analytics</h2>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-500">Your performance analytics visualization</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Recall Accuracy</h3>
                      <p className="text-2xl font-bold">{conceptData.masteryLevel}%</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Quiz Score</h3>
                      <p className="text-2xl font-bold">{conceptData.quizScore}%</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Last Reviewed</h3>
                      <p className="text-2xl font-bold">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Revision Tab */}
            <TabsContent value="revision" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Revision Schedule</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Next Review Due</h3>
                          <p className="text-sm text-gray-500">Based on optimal spaced repetition</p>
                        </div>
                        <div className="text-xl font-bold">Tomorrow</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-3">Revision History</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>April 15, 2023</span>
                          <span className="text-emerald-600">85% accuracy</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>April 8, 2023</span>
                          <span className="text-amber-600">70% accuracy</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>March 30, 2023</span>
                          <span className="text-red-600">55% accuracy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
                  <div className="min-h-64">
                    <textarea
                      className="w-full min-h-64 p-4 border rounded-lg"
                      placeholder="Add your notes about Newton's Second Law here..."
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <Button>Save Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Discussion Tab */}
            <TabsContent value="discuss" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Discussion Forum</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-medium">SA</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Student A</span>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="mt-1">
                            Can someone explain why F=ma doesn't work in relativistic cases?
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg ml-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-medium">TB</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Tutor B</span>
                            <span className="text-xs text-gray-500">1 day ago</span>
                          </div>
                          <p className="mt-1">
                            Great question! At speeds approaching the speed of light, Newton's second law must be modified because mass becomes velocity-dependent. Einstein's special relativity addresses this limitation.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Add Your Comment</h3>
                      <textarea 
                        className="w-full p-3 border rounded-lg" 
                        rows={4}
                        placeholder="Type your question or comment here..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button>Post Comment</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar Area - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          <ConceptSidebar 
            masteryLevel={conceptData.masteryLevel}
            relatedConcepts={relatedConcepts}
            examReady={conceptData.examReady}
          />
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
