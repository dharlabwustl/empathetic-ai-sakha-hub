import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Brain, FlaskConical, CheckCircle, 
  BarChart, Bookmark, Star, Clock, Award, Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptExercises from './concept-detail/ConceptExercises';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import ConceptResources from './concept-detail/ConceptResources';
import ConceptSidebar from './concept-detail/ConceptSidebar';

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back button and concept header */}
      <div className="mb-6">
        <Link to="/dashboard/student/concepts">
          <Button variant="ghost" className="mb-4 p-0 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to concepts
          </Button>
        </Link>
        
        <ConceptHeader 
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmark}
        />
      </div>
      
      {/* Content and sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <motion.div 
          className="lg:col-span-3"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-1">
                <Brain className="h-4 w-4" /> Exercises
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Flashcards
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-1">
                <Zap className="h-4 w-4" /> Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
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
            
            <TabsContent value="exercises">
              <ConceptExercises
                conceptId={concept.id}
                conceptTitle={concept.title}
                recallAccuracy={concept.recallAccuracy}
                lastPracticed={concept.lastPracticed}
                quizScore={concept.quizScore}
              />
            </TabsContent>
            
            <TabsContent value="flashcards">
              <ConceptFlashcards 
                flashcardsTotal={concept.flashcardsTotal}
                flashcardsCompleted={concept.flashcardsCompleted}
              />
            </TabsContent>
            
            <TabsContent value="resources">
              <ConceptResources conceptId={concept.id} />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Right sidebar */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ConceptSidebar 
            masteryLevel={concept.masteryLevel}
            relatedConcepts={concept.relatedConcepts}
            examReady={concept.examReady}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
