
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Star, Flag, MessageCircle, Brain, CheckCircle, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SharedPageLayout } from '../SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

// Import the components we'll need for the tabs
import ConceptContent from './concept-detail/ConceptContent';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import RevisionSection from './concept-detail/RevisionSection';
import ConceptHeader from './concept-detail/ConceptHeader';

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
  formulas: [
    { id: "f1", name: "Force", formula: "F = ma", description: "Force equals mass times acceleration" },
    { id: "f2", name: "Weight", formula: "W = mg", description: "Weight equals mass times gravitational acceleration" }
  ],
  relatedConcepts: [
    { id: "c1", title: "Newton's First Law", subject: "Physics" },
    { id: "c2", title: "Newton's Third Law", subject: "Physics" },
    { id: "c3", title: "Conservation of Momentum", subject: "Physics" }
  ],
  practiceQuestions: [
    {
      id: "q1",
      question: "A 2kg object experiences a force of 10N. What is its acceleration?",
      options: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²"],
      correctAnswer: "5 m/s²"
    },
    {
      id: "q2",
      question: "If mass is doubled while force remains constant, what happens to acceleration?",
      options: ["Doubles", "Remains the same", "Halves", "Cannot be determined"],
      correctAnswer: "Halves"
    }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [validationCompleted, setValidationCompleted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // In a real app, you would fetch data based on conceptId
  const concept = demoConceptData;
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  const handleFlagToggle = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
    });
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab...",
    });
    // In a real app, you would navigate to the formula lab page
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved successfully",
      description: "Your notes have been saved for this concept.",
    });
  };

  // Handle quiz completion and mastery update
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setValidationCompleted(true);

    toast({
      title: "Knowledge validation complete",
      description: `You scored ${score}% on the concept quiz.`,
    });
  };

  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    
    if (!isReadingAloud) {
      // Start reading
      const cleanText = concept.content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      speechSynthesis.cancel();
    }
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} - ${concept.topic}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <div className="space-y-6">
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Progress bar section */}
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
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
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {concept.masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
            {concept.masteryLevel >= 30 && concept.masteryLevel < 60 && "Making good progress. Keep practicing to reinforce your understanding."}
            {concept.masteryLevel >= 60 && concept.masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
            {concept.masteryLevel >= 80 && "Excellent mastery! You've got a solid grasp of this concept."}
          </p>
        </div>
        
        {/* Main content and sidebar layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 p-0 h-auto">
                  <TabsTrigger 
                    value="content" 
                    className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <BookOpen className="h-4 w-4" /> {!isMobile && "Content"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="formulas" 
                    className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <FlaskConical className="h-4 w-4" /> {!isMobile && "Formulas"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recall" 
                    className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <Brain className="h-4 w-4" /> {!isMobile && "Practice"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="linked" 
                    className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <ArrowLeft className="h-4 w-4" /> {!isMobile && "Related"}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tutor" 
                    className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    <MessageCircle className="h-4 w-4" /> {!isMobile && "Ask Tutor"}
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-0">
                  <TabsContent value="content" className="mt-0">
                    <ConceptContent 
                      content={concept.content}
                      conceptId={conceptId || concept.id}
                      userNotes={userNotes}
                      setUserNotes={setUserNotes}
                      handleSaveNotes={handleSaveNotes}
                      isReadingAloud={isReadingAloud}
                      setIsReadingAloud={setIsReadingAloud}
                    />
                  </TabsContent>
                  
                  <TabsContent value="formulas" className="mt-0">
                    <FormulaTabContent 
                      conceptId={conceptId || concept.id} 
                      conceptTitle={concept.title}
                      handleOpenFormulaLab={handleOpenFormulaLab}
                    />
                  </TabsContent>
                  
                  <TabsContent value="recall" className="mt-0">
                    <QuickRecallSection 
                      conceptId={conceptId || concept.id} 
                      title={concept.title}
                      content={concept.content}
                      onQuizComplete={handleQuizComplete}
                    />
                  </TabsContent>
                  
                  <TabsContent value="linked" className="mt-0">
                    <LinkedConceptsSection 
                      conceptId={conceptId || concept.id}
                      subject={concept.subject}
                      topic={concept.topic}
                    />
                  </TabsContent>
                  
                  <TabsContent value="tutor" className="mt-0">
                    <AskTutorSection 
                      conceptId={conceptId || concept.id}
                      title={concept.title}
                      subject={concept.subject}
                      topic={concept.topic}
                    />
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={toggleReadAloud}
                >
                  {isReadingAloud ? <MessageCircle className="h-4 w-4 mr-2" /> : <BookOpen className="h-4 w-4 mr-2" />}
                  {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`justify-start ${isFlagged ? 'border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400' : ''}`}
                  onClick={handleFlagToggle}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {isFlagged ? "Remove from Revision" : "Flag for Revision"}
                </Button>
                
                {validationCompleted && quizScore !== null && (
                  <div className="flex items-center justify-between px-2 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mr-2" />
                      <span className="text-xs font-medium text-green-700 dark:text-green-400">
                        Validation Score
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                      {quizScore}%
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          
            {/* Revision Section */}
            <RevisionSection 
              conceptId={conceptId || concept.id}
              isFlagged={isFlagged}
              onToggleFlag={handleFlagToggle}
            />
          </motion.div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
