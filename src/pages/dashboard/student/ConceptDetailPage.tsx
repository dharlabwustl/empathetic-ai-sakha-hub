
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptContent from '@/components/dashboard/student/concepts/concept-detail/ConceptContent';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import ConceptExercises from '@/components/dashboard/student/concepts/concept-detail/ConceptExercises';
import FormulaReference from '@/components/dashboard/student/concepts/concept-detail/FormulaReference';
import ConceptFlashcards from '@/components/dashboard/student/concepts/concept-detail/ConceptFlashcards';
import ConceptResources from '@/components/dashboard/student/concepts/concept-detail/ConceptResources';
import LinkedConceptsSection from '@/components/dashboard/student/concepts/concept-detail/LinkedConceptsSection';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { useToast } from '@/hooks/use-toast';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from an API
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    topic: "Mechanics",
    content: `
      <h2 id="introduction">Introduction to Newton's Second Law</h2>
      <p>Newton's Second Law of Motion describes the relationship between an object's mass, its acceleration, and the force applied to it. It is one of the fundamental laws of classical mechanics.</p>
      
      <h2 id="formula">The Formula</h2>
      <p>The mathematical representation of Newton's Second Law is:</p>
      <p><strong>F = ma</strong></p>
      <p>Where:</p>
      <ul>
        <li>F is the net force acting on the object (measured in Newtons, N)</li>
        <li>m is the mass of the object (measured in kilograms, kg)</li>
        <li>a is the acceleration of the object (measured in meters per second squared, m/s²)</li>
      </ul>
      
      <h2 id="implications">Implications of the Law</h2>
      <p>This law implies that:</p>
      <ol>
        <li>The acceleration of an object is directly proportional to the net force acting on it</li>
        <li>The acceleration of an object is inversely proportional to its mass</li>
        <li>The direction of acceleration is in the direction of the net force</li>
      </ol>
      
      <h3 id="examples">Real-world Examples</h3>
      <p>Newton's Second Law explains many everyday phenomena:</p>
      <ul>
        <li>A car accelerates when you press the gas pedal because the engine applies a force</li>
        <li>Heavy objects require more force to move than lighter objects</li>
        <li>A rocket accelerates upward when the engines fire, creating a downward force</li>
      </ul>
      
      <h2 id="applications">Applications in Engineering and Technology</h2>
      <p>This law is fundamental to:</p>
      <ul>
        <li>Vehicle design and safety systems</li>
        <li>Aerospace engineering</li>
        <li>Sports equipment development</li>
        <li>Robotics and automation</li>
      </ul>
    `,
    difficulty: "medium" as 'easy' | 'medium' | 'hard',
    masteryLevel: 65,
    lastPracticed: "2023-06-15T10:30:00Z",
    quizScore: 78
  };
  
  const relatedConcepts = [
    {
      id: "c1",
      title: "Newton's First Law of Motion",
      masteryLevel: 85
    },
    {
      id: "c2",
      title: "Newton's Third Law of Motion",
      masteryLevel: 72
    },
    {
      id: "c3",
      title: "Conservation of Momentum",
      masteryLevel: 45
    }
  ];
  
  const formulas = [
    {
      id: "f1",
      name: "Newton's Second Law",
      latex: "F = ma",
      description: "Force equals mass times acceleration"
    },
    {
      id: "f2",
      name: "Weight Formula",
      latex: "W = mg",
      description: "Weight equals mass times gravitational acceleration"
    },
    {
      id: "f3",
      name: "Momentum Formula",
      latex: "p = mv",
      description: "Momentum equals mass times velocity"
    }
  ];
  
  const flashcards = [
    {
      id: "fc1",
      front: "What is Newton's Second Law of Motion?",
      back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F = ma)."
    },
    {
      id: "fc2",
      front: "If a 5kg object experiences a force of 10N, what is its acceleration?",
      back: "Using F = ma, a = F/m = 10N/5kg = 2 m/s²"
    },
    {
      id: "fc3",
      front: "How does doubling the mass affect acceleration when force remains constant?",
      back: "If mass is doubled, acceleration is halved (a = F/m)."
    }
  ];
  
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your saved items" : "Concept added to your saved items"
    });
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Stop reading aloud when switching tabs
    if (isReadingAloud && value !== "learn") {
      setIsReadingAloud(false);
    }
  };
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };
  
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening Formula Lab for interactive exploration"
    });
  };
  
  return (
    <ConceptsPageLayout
      showBackButton={true}
      title="Concept Details"
      subtitle="Explore and master this concept"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Concept Header */}
        <ConceptHeader
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleToggleBookmark}
        />
        
        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="learn" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-6 md:flex w-full bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                <TabsTrigger value="learn" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Learn
                </TabsTrigger>
                <TabsTrigger value="practice" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Practice
                </TabsTrigger>
                <TabsTrigger value="formulas" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Formulas
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="related" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30">
                  Related
                </TabsTrigger>
              </TabsList>
              
              <motion.div 
                className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                
                <TabsContent value="practice" className="m-0">
                  <ConceptExercises
                    conceptId={conceptData.id}
                    conceptTitle={conceptData.title}
                    recallAccuracy={conceptData.masteryLevel}
                    lastPracticed={conceptData.lastPracticed}
                    quizScore={conceptData.quizScore}
                  />
                </TabsContent>
                
                <TabsContent value="formulas" className="m-0">
                  <div className="p-6">
                    <FormulaReference
                      formulas={formulas}
                      conceptTitle={conceptData.title}
                      handleOpenFormulaLab={handleOpenFormulaLab}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="flashcards" className="m-0">
                  <ConceptFlashcards flashcards={flashcards} />
                </TabsContent>
                
                <TabsContent value="resources" className="m-0">
                  <ConceptResources conceptId={conceptData.id} />
                </TabsContent>
                
                <TabsContent value="related" className="m-0">
                  <LinkedConceptsSection
                    conceptId={conceptData.id}
                    subject={conceptData.subject}
                    topic={conceptData.topic}
                  />
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ConceptSidebar
              masteryLevel={conceptData.masteryLevel}
              relatedConcepts={relatedConcepts}
              examReady={conceptData.masteryLevel > 80}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Add MathJax script for formula rendering */}
      <style jsx global>{`
        .latex-formula {
          overflow-x: auto;
          padding: 0.5rem;
          max-width: 100%;
        }
        
        .formula-box {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
          background: #f8fafc;
        }
        
        @media (prefers-color-scheme: dark) {
          .formula-box {
            background: #1e293b;
            border-color: #334155;
          }
        }
      `}</style>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
