
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConceptsPageLayout } from './concept-cards/ConceptsPageLayout';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import ConceptExercises from './concept-detail/ConceptExercises';
import ConceptResources from './concept-detail/ConceptResources';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  BookOpen, 
  Image, 
  Cube, 
  Calculator, 
  Video, 
  AlertOctagon,
  Brain,
  LineChart,
  Clock,
  Pencil,
  MessageSquare,
  History
} from 'lucide-react';

// This would typically come from an API or state management
const getMockConcept = (id: string) => {
  return {
    id,
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "medium" as const,
    masteryLevel: 65,
    recallAccuracy: 72,
    lastPracticed: "2025-04-18",
    quizScore: 68,
    examReady: false,
    isBookmarked: false,
    content: `
      <h2 id="introduction">Introduction to Newton's Second Law</h2>
      <p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      <p>This can be expressed mathematically as:</p>
      <div class="formula">F = ma</div>
      <p>Where:</p>
      <ul>
        <li>F is the net force acting on the object (in Newtons)</li>
        <li>m is the mass of the object (in kilograms)</li>
        <li>a is the acceleration of the object (in meters per second squared)</li>
      </ul>
      
      <h2 id="example">Example Applications</h2>
      <p>Newton's Second Law helps us understand many everyday scenarios:</p>
      <ul>
        <li>A car accelerating when the gas pedal is pressed</li>
        <li>A rocket launching into space</li>
        <li>A ball falling due to gravity</li>
      </ul>
      
      <h3 id="calculations">Calculation Examples</h3>
      <p>If a 1000 kg car experiences a net force of 5000 N, its acceleration would be:</p>
      <div class="formula">a = F/m = 5000 N / 1000 kg = 5 m/s²</div>
      
      <h2 id="historical">Historical Context</h2>
      <p>Sir Isaac Newton published this law in his work "Philosophiæ Naturalis Principia Mathematica" in 1687, revolutionizing our understanding of classical mechanics.</p>
    `,
    relatedConcepts: [
      { id: "c1", title: "Newton's First Law", masteryLevel: 82 },
      { id: "c2", title: "Newton's Third Law", masteryLevel: 45 },
      { id: "c3", title: "Conservation of Momentum", masteryLevel: 70 }
    ],
    flashcards: [
      { id: "f1", front: "What is Newton's Second Law?", back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass." },
      { id: "f2", front: "What is the formula for Newton's Second Law?", back: "F = ma, where F is force, m is mass, and a is acceleration." },
      { id: "f3", front: "What is the SI unit of Force?", back: "Newton (N), which equals 1 kg·m/s²" },
      { id: "f4", front: "If a 2kg object experiences a force of 10N, what is its acceleration?", back: "a = F/m = 10N/2kg = 5 m/s²" }
    ]
  };
};

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [userNotes, setUserNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const { toast } = useToast();
  
  const concept = getMockConcept(conceptId || "default");
  const [isBookmarked, setIsBookmarked] = useState(concept.isBookmarked);

  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully."
    });
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your bookmarks" : "Concept added to your bookmarks"
    });
  };

  return (
    <ConceptsPageLayout 
      showBackButton={true}
      title="Concept Detail"
      subtitle="Master this concept for your exam"
    >
      <div className="flex flex-col space-y-6">
        {/* Concept Header */}
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Main content and sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area (2/3) */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {/* Mastery Tracker Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900/30"
            >
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Mastery & Recall Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mastery Level</span>
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{concept.masteryLevel}%</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${concept.masteryLevel}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Recall Accuracy</span>
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{concept.recallAccuracy}%</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                      style={{ width: `${concept.recallAccuracy}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quiz Performance</span>
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-400">{concept.quizScore}%</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                    <div
                      className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full"
                      style={{ width: `${concept.quizScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30"
            >
              <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-400">AI Learning Insights</h3>
              <div className="prose dark:prose-invert max-w-none">
                <ul className="space-y-1">
                  <li>Focus on applying Newton's Second Law to more complex multi-force scenarios</li>
                  <li>Review the relationship between mass, force and acceleration again</li>
                  <li>Practice calculating force for bodies with changing mass (like rockets)</li>
                </ul>
              </div>
            </motion.div>
            
            {/* Primary Tabs for Learning Modes */}
            <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4">
                  <TabsList className="flex h-auto p-0 bg-transparent overflow-auto custom-scrollbar">
                    <TabsTrigger value="learn" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Learn</span>
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Image className="h-4 w-4 mr-2" />
                      <span>Visual</span>
                    </TabsTrigger>
                    <TabsTrigger value="3d" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Cube className="h-4 w-4 mr-2" />
                      <span>3D Model</span>
                    </TabsTrigger>
                    <TabsTrigger value="formula" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Calculator className="h-4 w-4 mr-2" />
                      <span>Formula Lab</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Video className="h-4 w-4 mr-2" />
                      <span>Videos</span>
                    </TabsTrigger>
                    <TabsTrigger value="mistakes" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <AlertOctagon className="h-4 w-4 mr-2" />
                      <span>Common Mistakes</span>
                    </TabsTrigger>
                    <TabsTrigger value="pyq" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <History className="h-4 w-4 mr-2" />
                      <span>Previous Years</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Content Tabs */}
                <TabsContent value="learn" className="m-0">
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
                
                <TabsContent value="visual" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Image className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Visual Representation</h3>
                    <p className="text-gray-500">Interactive diagrams and visualizations for Newton's Second Law</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="3d" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Cube className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">3D Simulation</h3>
                    <p className="text-gray-500">Interactive 3D models to demonstrate force and motion</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="formula" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Calculator className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Formula Lab</h3>
                    <p className="text-gray-500">Practice with the F = ma formula and related equations</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="video" className="m-0">
                  <ConceptResources conceptId={concept.id} />
                </TabsContent>
                
                <TabsContent value="mistakes" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertOctagon className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Common Mistakes</h3>
                    <p className="text-gray-500">Avoid these errors when solving Newton's Second Law problems</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pyq" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <History className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Previous Year Questions</h3>
                    <p className="text-gray-500">Questions from past exams on Newton's Second Law</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Secondary Tabs for Learning Management */}
            <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Tabs defaultValue="recall" className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4">
                  <TabsList className="flex h-auto p-0 bg-transparent overflow-auto custom-scrollbar">
                    <TabsTrigger value="recall" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Brain className="h-4 w-4 mr-2" />
                      <span>Recall</span>
                    </TabsTrigger>
                    <TabsTrigger value="flashcards" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Brain className="h-4 w-4 mr-2" />
                      <span>Flashcards</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <LineChart className="h-4 w-4 mr-2" />
                      <span>Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="revision" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Revision</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <Pencil className="h-4 w-4 mr-2" />
                      <span>Notes</span>
                    </TabsTrigger>
                    <TabsTrigger value="discuss" className="py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>Discuss</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="recall" className="m-0">
                  <ConceptExercises 
                    conceptId={concept.id}
                    conceptTitle={concept.title}
                    recallAccuracy={concept.recallAccuracy}
                    lastPracticed={concept.lastPracticed}
                    quizScore={concept.quizScore}
                  />
                </TabsContent>
                
                <TabsContent value="flashcards" className="m-0">
                  <ConceptFlashcards flashcards={concept.flashcards} />
                </TabsContent>
                
                <TabsContent value="analytics" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <LineChart className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Analytics</h3>
                    <p className="text-gray-500">Track your progress and performance on this concept</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="revision" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Clock className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Revision Schedule</h3>
                    <p className="text-gray-500">Optimized revision plan based on your learning patterns</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Pencil className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Personal Notes</h3>
                    <p className="text-gray-500">Your collected notes and annotations for this concept</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="discuss" className="m-0 p-6">
                  <div className="flex flex-col items-center justify-center h-64">
                    <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium">Discussion Forum</h3>
                    <p className="text-gray-500">Join the community discussion about this concept</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar (1/3) */}
          <div className="col-span-1 space-y-6">
            <ConceptSidebar 
              masteryLevel={concept.masteryLevel}
              relatedConcepts={concept.relatedConcepts}
              examReady={concept.examReady}
            />
          </div>
        </div>
        
        <style>
          {`
          .formula {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 4px;
            font-family: monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 16px 0;
            font-size: 1.2em;
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(155, 155, 155, 0.5);
            border-radius: 20px;
          }
          
          .prose h2 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-size: 1.5em;
            font-weight: 600;
          }
          
          .prose h3 {
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            font-size: 1.25em;
            font-weight: 600;
          }
          
          .prose ul {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
          }
          `}
        </style>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
