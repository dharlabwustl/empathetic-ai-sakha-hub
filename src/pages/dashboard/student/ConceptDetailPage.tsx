
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SharedNavigation from '@/components/dashboard/student/SharedNavigation';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptContent from '@/components/dashboard/student/concepts/concept-detail/ConceptContent';
import ConceptFlashcards from '@/components/dashboard/student/concepts/concept-detail/ConceptFlashcards';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import ConceptResources from '@/components/dashboard/student/concepts/concept-detail/ConceptResources';
import ConceptDetailFormulaTab from '@/pages/dashboard/student/ConceptDetailFormulaTab';
import { useToast } from '@/hooks/use-toast';
import { Book, Activity, Calculator, Brain, FileText, MessageSquare } from 'lucide-react';
import '@/styles/flashcard-animations.css';

// Mock concept data - in a real app, this would come from an API
const mockConcept = {
  id: "1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    
    <h2 id="formula">The Formula</h2>
    <p>The mathematical representation of Newton's Second Law is:</p>
    <p><strong>F = ma</strong></p>
    <p>Where:</p>
    <ul>
      <li>F is the net force applied (measured in Newtons, N)</li>
      <li>m is the mass of the object (measured in kilograms, kg)</li>
      <li>a is the acceleration produced (measured in meters per second squared, m/s²)</li>
    </ul>
    
    <h3 id="implications">Implications of the Formula</h3>
    <p>This formula shows that:</p>
    <ul>
      <li>Doubling the force doubles the acceleration (if mass remains constant)</li>
      <li>Doubling the mass halves the acceleration (if force remains constant)</li>
    </ul>
    
    <h2 id="applications">Real-world Applications</h2>
    <p>Newton's Second Law is fundamental to understanding:</p>
    <ul>
      <li>How rockets work (propulsion)</li>
      <li>Vehicle acceleration and braking systems</li>
      <li>Sports physics (throwing, hitting, jumping)</li>
      <li>Elevator motion</li>
    </ul>
    
    <h2 id="common-mistakes">Common Mistakes</h2>
    <p>Students often make these errors when applying Newton's Second Law:</p>
    <ul>
      <li>Not accounting for all forces acting on an object</li>
      <li>Using weight instead of mass in calculations</li>
      <li>Ignoring friction or air resistance in relevant scenarios</li>
      <li>Not using consistent units</li>
    </ul>
  `,
  masteryLevel: 65,
  examReady: false,
  keyPoints: [
    "Force causes acceleration",
    "Acceleration is inversely proportional to mass",
    "SI unit of force is Newton (N)",
    "Vector quantity - has both magnitude and direction"
  ],
  notes: [],
  relatedConcepts: [
    { id: "2", title: "Newton's First Law", masteryLevel: 80 },
    { id: "3", title: "Newton's Third Law", masteryLevel: 45 },
    { id: "4", title: "Conservation of Momentum", masteryLevel: 30 }
  ],
  formulas: [
    { 
      id: "f1", 
      name: "Newton's Second Law", 
      latex: "F = m × a", 
      description: "Net force equals mass times acceleration"
    },
    { 
      id: "f2", 
      name: "Weight Formula", 
      latex: "W = m × g", 
      description: "Weight equals mass times gravitational acceleration"
    },
    { 
      id: "f3", 
      name: "Momentum", 
      latex: "p = m × v", 
      description: "Momentum equals mass times velocity"
    }
  ],
  flashcards: [
    {
      id: "fc1",
      front: "What is Newton's Second Law of Motion?",
      back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma"
    },
    {
      id: "fc2",
      front: "What is the SI unit of force?",
      back: "The SI unit of force is the Newton (N), which equals 1 kg·m/s²"
    },
    {
      id: "fc3",
      front: "How does doubling the mass affect acceleration when force remains constant?",
      back: "Doubling the mass reduces the acceleration by half (acceleration is inversely proportional to mass)"
    },
    {
      id: "fc4",
      front: "How does doubling the force affect acceleration when mass remains constant?",
      back: "Doubling the force doubles the acceleration (acceleration is directly proportional to force)"
    }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept, setConcept] = useState(mockConcept);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [userNotes, setUserNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    // Simulating API fetch - in a real app, fetch data based on conceptId
    console.log(`Fetching concept data for ID: ${conceptId}`);
    
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setConcept(mockConcept);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [conceptId]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Concept bookmarked" : "Bookmark removed",
      description: !isBookmarked 
        ? "This concept has been added to your bookmarks" 
        : "This concept has been removed from your bookmarks",
    });
  };

  const handleSaveNotes = () => {
    // Simulate saving notes to backend
    toast({
      title: "Notes saved",
      description: "Your notes for this concept have been saved"
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <SharedNavigation />
      
      <div className="container max-w-[1400px] mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Concept header */}
          <ConceptHeader
            title={concept.title}
            subject={concept.subject}
            topic={concept.topic}
            difficulty={concept.difficulty}
            isBookmarked={isBookmarked}
            onBookmarkToggle={handleBookmarkToggle}
          />
          
          {/* Main content with tabs */}
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {/* Main content area - 2/3 width on medium screens and up */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab as any}>
                  <div className="px-4 sm:px-6 overflow-x-auto">
                    <TabsList className="mt-2 w-full justify-start gap-1 overflow-x-auto pb-px">
                      <TabsTrigger value="learn" className="flex items-center gap-1.5">
                        <Book className="h-4 w-4" />
                        <span>Learn</span>
                      </TabsTrigger>
                      <TabsTrigger value="practice" className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4" />
                        <span>Practice</span>
                      </TabsTrigger>
                      <TabsTrigger value="formulas" className="flex items-center gap-1.5">
                        <Calculator className="h-4 w-4" />
                        <span>Formulas</span>
                      </TabsTrigger>
                      <TabsTrigger value="flashcards" className="flex items-center gap-1.5">
                        <Brain className="h-4 w-4" />
                        <span>Flashcards</span>
                      </TabsTrigger>
                      <TabsTrigger value="resources" className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4" />
                        <span>Resources</span>
                      </TabsTrigger>
                      <TabsTrigger value="ask-tutor" className="flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        <span>Ask Tutor</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {/* Tab contents */}
                  <TabsContent value="learn">
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
                  
                  <TabsContent value="practice">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Practice questions for this concept are coming soon.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="formulas">
                    <ConceptDetailFormulaTab concept={concept} />
                  </TabsContent>
                  
                  <TabsContent value="flashcards">
                    <ConceptFlashcards flashcards={concept.flashcards} />
                  </TabsContent>
                  
                  <TabsContent value="resources">
                    <ConceptResources conceptId={concept.id} />
                  </TabsContent>
                  
                  <TabsContent value="ask-tutor">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Ask a Tutor</h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        The tutor feature is coming soon. Here you'll be able to ask questions about this concept.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar - 1/3 width on medium screens and up */}
            <div className="space-y-6">
              <ConceptSidebar
                masteryLevel={concept.masteryLevel}
                relatedConcepts={concept.relatedConcepts}
                examReady={concept.examReady}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Import necessary styles for flashcard animations */}
      <style jsx global>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default ConceptDetailPage;
