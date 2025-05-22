
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, ClipboardList, PenLine, Video, Star } from 'lucide-react';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptContent from '@/components/dashboard/student/concepts/concept-detail/ConceptContent';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import ConceptExercises from '@/components/dashboard/student/concepts/concept-detail/ConceptExercises';
import ConceptFlashcards from '@/components/dashboard/student/concepts/concept-detail/ConceptFlashcards';
import ConceptResources from '@/components/dashboard/student/concepts/concept-detail/ConceptResources';
import { useToast } from '@/hooks/use-toast';
import SidebarLayout from '@/components/dashboard/SidebarLayout';

interface Concept {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  masteryLevel: number;
  flashcards: {
    id: string;
    front: string;
    back: string;
  }[];
  relatedConcepts: {
    id: string;
    title: string;
    masteryLevel: number;
  }[];
  recallAccuracy: number;
  lastPracticed: string;
  quizScore: number;
  isBookmarked: boolean;
  examReady: boolean;
}

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [activeTab, setActiveTab] = useState("learn");
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    const mockConcept: Concept = {
      id: conceptId || 'concept-1',
      title: "Newton's Second Law of Motion",
      subject: "Physics",
      topic: "Classical Mechanics",
      difficulty: "medium",
      content: `
        <h2 id="introduction">Introduction to Newton's Second Law</h2>
        <p>Newton's Second Law of Motion is one of the fundamental laws that govern the physical universe. It describes the relationship between an object's mass, its acceleration, and the applied force.</p>
        
        <h3 id="formula">The Mathematical Formula</h3>
        <p>Newton's Second Law is typically expressed as:</p>
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md my-4">
          <p class="text-center text-lg font-medium">F = ma</p>
        </div>
        <p>Where:</p>
        <ul>
          <li><strong>F</strong> is the net force acting on the object (measured in Newtons, N)</li>
          <li><strong>m</strong> is the mass of the object (measured in kilograms, kg)</li>
          <li><strong>a</strong> is the acceleration of the object (measured in meters per second squared, m/s²)</li>
        </ul>
        
        <h2 id="implications">Key Implications</h2>
        <p>This law has several important implications:</p>
        <ol>
          <li>The acceleration of an object is directly proportional to the net force applied to it.</li>
          <li>The acceleration of an object is inversely proportional to its mass.</li>
          <li>The direction of the acceleration is in the same direction as the net force.</li>
        </ol>
        
        <h3 id="examples">Real-World Examples</h3>
        <p>Newton's Second Law explains many everyday phenomena:</p>
        <ul>
          <li>A car accelerates faster when more gas is applied (increasing force).</li>
          <li>It's harder to push a heavy shopping cart than a lighter one (mass affects acceleration).</li>
          <li>A rocket accelerates upward when the thrust force exceeds its weight.</li>
        </ul>
        
        <h2 id="history">Historical Context</h2>
        <p>Isaac Newton published this law in his work "Philosophiæ Naturalis Principia Mathematica" in 1687. It represented a breakthrough in our understanding of mechanics and laid the groundwork for classical physics.</p>
        
        <h2 id="applications">Applications in Modern Physics</h2>
        <p>This fundamental law is used extensively in:</p>
        <ul>
          <li>Engineering design and analysis</li>
          <li>Sports science and biomechanics</li>
          <li>Automotive safety systems</li>
          <li>Aerospace design and rocket propulsion</li>
        </ul>
      `,
      masteryLevel: 65,
      flashcards: [
        {
          id: "f1",
          front: "What is Newton's Second Law of Motion?",
          back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Expressed as F = ma."
        },
        {
          id: "f2",
          front: "What are the units of measurement for Force in Newton's Second Law?",
          back: "Force is measured in Newtons (N). One Newton is the force needed to accelerate 1 kg by 1 m/s²."
        },
        {
          id: "f3",
          front: "How does mass affect acceleration according to Newton's Second Law?",
          back: "Mass and acceleration are inversely proportional. For a given force, a larger mass will experience less acceleration, while a smaller mass will experience more acceleration."
        }
      ],
      relatedConcepts: [
        {
          id: "c2",
          title: "Newton's First Law",
          masteryLevel: 80
        },
        {
          id: "c3",
          title: "Newton's Third Law",
          masteryLevel: 45
        },
        {
          id: "c4",
          title: "Law of Conservation of Momentum",
          masteryLevel: 60
        }
      ],
      recallAccuracy: 70,
      lastPracticed: "2023-05-15",
      quizScore: 65,
      isBookmarked: false,
      examReady: false
    };

    // Simulate API delay
    setTimeout(() => {
      setConcept(mockConcept);
      setLoading(false);
    }, 800);
  }, [conceptId]);

  // Handle user notes
  const handleSaveNotes = () => {
    // In a real app, we would save to backend here
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully."
    });
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (!concept) return;
    
    setConcept({
      ...concept,
      isBookmarked: !concept.isBookmarked
    });
    
    toast({
      title: concept.isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: concept.isBookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "This concept has been added to your bookmarks"
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="p-6 w-full h-[80vh] flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (!concept) {
    return (
      <SidebarLayout>
        <div className="p-6 flex flex-col items-center justify-center h-[80vh]">
          <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">The concept you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center mb-4"
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Concepts
          </Button>
          
          <ConceptHeader
            title={concept.title}
            subject={concept.subject}
            topic={concept.topic}
            difficulty={concept.difficulty}
            isBookmarked={concept.isBookmarked}
            onBookmarkToggle={handleBookmarkToggle}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <Tabs 
                defaultValue="learn" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="px-4 border-b border-gray-200 dark:border-gray-700">
                  <TabsList className="h-16 bg-transparent relative flex justify-between w-full overflow-x-auto scrollbar-none">
                    <TabsTrigger 
                      value="learn" 
                      className="flex items-center h-16 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Learn
                    </TabsTrigger>
                    <TabsTrigger 
                      value="practice" 
                      className="flex items-center h-16 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none"
                    >
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Practice
                    </TabsTrigger>
                    <TabsTrigger 
                      value="flashcards" 
                      className="flex items-center h-16 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none"
                    >
                      <PenLine className="h-4 w-4 mr-2" />
                      Flashcards
                    </TabsTrigger>
                    <TabsTrigger 
                      value="resources" 
                      className="flex items-center h-16 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </div>

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
                
                <TabsContent value="practice" className="m-0 p-6">
                  <ConceptExercises 
                    conceptId={concept.id}
                    conceptTitle={concept.title}
                    recallAccuracy={concept.recallAccuracy}
                    lastPracticed={concept.lastPracticed}
                    quizScore={concept.quizScore}
                  />
                </TabsContent>
                
                <TabsContent value="flashcards" className="m-0">
                  <ConceptFlashcards 
                    flashcards={concept.flashcards}
                  />
                </TabsContent>
                
                <TabsContent value="resources" className="m-0 p-6">
                  <ConceptResources 
                    conceptId={concept.id}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <ConceptSidebar 
              masteryLevel={concept.masteryLevel}
              relatedConcepts={concept.relatedConcepts}
              examReady={concept.examReady}
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ConceptDetailPage;
