
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Brain, BarChart, Zap,
  CheckCircle, Bookmark, Volume2, Flag, PenLine
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptExercises from './concept-detail/ConceptExercises';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptResources from './concept-detail/ConceptResources';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import RevisionSection from './concept-detail/RevisionSection';

// Sample concept data (would normally come from an API/database)
const demoConceptData = {
  id: "concept-1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2>Newton's Second Law of Motion</h2>
    <p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    <p>It can be mathematically expressed as:</p>
    <p class="text-center font-bold text-xl my-4">F = ma</p>
    <p>Where:</p>
    <ul class="list-disc pl-6 my-4">
      <li><strong>F</strong> is the net force applied (measured in newtons, N)</li>
      <li><strong>m</strong> is the mass of the object (measured in kilograms, kg)</li>
      <li><strong>a</strong> is the acceleration (measured in meters per second squared, m/s²)</li>
    </ul>
    <p>This fundamental law forms the backbone of classical mechanics and helps us analyze and predict the motion of objects under the influence of forces.</p>
  `,
  masteryLevel: 65,
  recallAccuracy: 70,
  quizScore: 75,
  lastPracticed: "2025-05-10",
  flashcardsTotal: 10,
  flashcardsCompleted: 7,
  examReady: true,
  formulas: [
    { id: "f1", formula: "F = ma", description: "Force equals mass times acceleration" },
    { id: "f2", formula: "a = F/m", description: "Acceleration equals force divided by mass" }
  ],
  relatedConcepts: [
    { id: "c1", title: "Newton's First Law", masteryLevel: 80 },
    { id: "c2", title: "Newton's Third Law", masteryLevel: 45 },
    { id: "c3", title: "Work and Energy", masteryLevel: 60 }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('content');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const { toast } = useToast();
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  // In a real app, you would fetch data based on conceptId
  const concept = demoConceptData;
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved for this concept.",
    });
  };

  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 pb-12">
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" className="mb-4 p-0 hover:bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to concepts
            </Button>
          </Link>
        </div>
        
        {/* Concept header with glass morphism effect */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-sm rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
                  concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
                }`}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{concept.subject} • {concept.topic}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{concept.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={isFlagged ? "outline" : "ghost"} 
                size="sm"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1 ${isFlagged ? 'border-amber-500 text-amber-500' : ''}`}
              >
                <Flag className="h-4 w-4" />
                {isFlagged ? 'Flagged' : 'Flag for Revision'}
              </Button>
              
              <Button 
                variant={isBookmarked ? "default" : "outline"} 
                size="sm"
                className={`flex items-center gap-1 ${isBookmarked ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                <Brain className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" /> 
                Concept Mastery
              </h3>
              <span className="text-sm font-medium">{concept.masteryLevel}%</span>
            </div>
            <Progress 
              value={concept.masteryLevel} 
              className="h-2 bg-gray-200 dark:bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {concept.masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
              {concept.masteryLevel >= 30 && concept.masteryLevel < 60 && "Making good progress. Keep practicing to reinforce your understanding."}
              {concept.masteryLevel >= 60 && concept.masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
              {concept.masteryLevel >= 80 && "Excellent mastery! You've got a solid grasp of this concept."}
            </p>
          </div>
        </motion.div>
        
        {/* Content and sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <motion.div 
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 p-0 h-auto">
                  <TabsTrigger 
                    value="content" 
                    className="flex items-center gap-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <BookOpen className="h-4 w-4" /> Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="exercises" 
                    className="flex items-center gap-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Brain className="h-4 w-4" /> Exercises
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flashcards" 
                    className="flex items-center gap-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <BarChart className="h-4 w-4" /> Flashcards
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resources" 
                    className="flex items-center gap-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Zap className="h-4 w-4" /> Resources
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="content" className="mt-0">
                    <ConceptContent 
                      content={concept.content} 
                      formulas={concept.formulas} 
                      conceptId={concept.id}
                      userNotes={userNotes}
                      setUserNotes={setUserNotes}
                      handleSaveNotes={handleSaveNotes}
                      isReadingAloud={isReadingAloud}
                      setIsReadingAloud={setIsReadingAloud}
                    />
                  </TabsContent>
                  
                  <TabsContent value="exercises" className="mt-0">
                    <ConceptExercises
                      conceptId={concept.id}
                      conceptTitle={concept.title}
                      recallAccuracy={concept.recallAccuracy}
                      lastPracticed={concept.lastPracticed}
                      quizScore={concept.quizScore}
                    />
                  </TabsContent>
                  
                  <TabsContent value="flashcards" className="mt-0">
                    <ConceptFlashcards 
                      flashcardsTotal={concept.flashcardsTotal}
                      flashcardsCompleted={concept.flashcardsCompleted}
                    />
                  </TabsContent>
                  
                  <TabsContent value="resources" className="mt-0">
                    <ConceptResources conceptId={concept.id} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
          
          {/* Right sidebar */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Quick actions card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => setIsReadingAloud(!isReadingAloud)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                >
                  <PenLine className="h-4 w-4 mr-2" />
                  Add Notes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
              </div>
            </div>
          
            <ConceptSidebar 
              masteryLevel={concept.masteryLevel}
              relatedConcepts={concept.relatedConcepts}
              examReady={concept.examReady}
            />
            
            <RevisionSection 
              conceptId={concept.id}
              isFlagged={isFlagged}
              onToggleFlag={handleToggleFlag}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
