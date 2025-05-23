
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Image, Video, FileText, FlaskConical, MessageSquare, Award, 
  BarChart, RefreshCw, BookMarked, Volume2, Box3d, History, FileQuestion, Brain } from 'lucide-react';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import NoteSection from './concept-detail/NoteSection';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AIInsightsSection from './AIInsightsSection';
import CommonMistakesContent from './CommonMistakesContent';
import ConceptAnalyticsSection from './ConceptAnalyticsSection';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import useUserNotes from '@/hooks/useUserNotes';

// Mock concept data - in a real app you'd fetch this from an API
const getMockConceptData = (conceptId: string) => {
  return {
    id: conceptId,
    title: 'Newton\'s Laws of Motion',
    description: 'Fundamental principles describing the relationship between force and motion.',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium' as const,
    completed: false,
    progress: 65,
    relatedConcepts: ['Conservation of Momentum', 'Work and Energy'],
    content: `
      <h2>Introduction</h2>
      <p>Newton's laws of motion are three fundamental physical laws that establish the relationship between the motion of an object and the forces acting on it. These laws are the foundation of classical mechanics.</p>
      
      <h2>Newton's First Law (Law of Inertia)</h2>
      <p>An object at rest will remain at rest, and an object in motion will remain in motion at constant velocity, unless acted upon by an external force.</p>
      <blockquote>
        <strong>In simpler terms:</strong> Objects resist changes in their state of motion.
      </blockquote>
      
      <h2>Newton's Second Law</h2>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      <p>Mathematically: F = ma</p>
      <ul>
        <li>F represents the net force (in newtons)</li>
        <li>m represents the mass of the object (in kilograms)</li>
        <li>a represents the acceleration (in meters per second squared)</li>
      </ul>
      
      <h2>Newton's Third Law</h2>
      <p>For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.</p>
      
      <h2>Applications</h2>
      <p>These laws explain a wide range of phenomena from everyday experiences to complex systems:</p>
      <ul>
        <li>Rocket propulsion</li>
        <li>Automotive safety (seat belts, air bags)</li>
        <li>Sports physics (baseball, football)</li>
        <li>Planetary motion</li>
      </ul>
    `,
    visualContent: `
      <div class="flex flex-col items-center space-y-4">
        <img src="https://example.com/newtons-laws-diagram.jpg" alt="Newton's Laws Diagram" class="rounded-lg max-w-full" />
        <p class="text-center text-sm text-muted-foreground">Visual representation of Newton's three laws of motion</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 class="text-center font-medium">First Law</h3>
            <div class="flex justify-center my-3">
              <div class="w-20 h-20 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center">
                <span class="text-3xl">→</span>
              </div>
            </div>
            <p class="text-sm text-center">An object in motion stays in motion</p>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 class="text-center font-medium">Second Law</h3>
            <div class="flex justify-center my-3">
              <div class="w-20 h-20 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
                <span class="text-2xl">F=ma</span>
              </div>
            </div>
            <p class="text-sm text-center">Force equals mass times acceleration</p>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 class="text-center font-medium">Third Law</h3>
            <div class="flex justify-center my-3">
              <div class="w-20 h-20 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center">
                <span class="text-3xl">↔️</span>
              </div>
            </div>
            <p class="text-sm text-center">Every action has an equal and opposite reaction</p>
          </div>
        </div>
      </div>
    `,
    simulationContent: `<p>3D simulation content would be embedded here. In a real implementation, this could be an interactive Three.js or other WebGL-based simulation showing Newton's laws in action.</p>`,
    keyPoints: [
      'Objects resist changes in their state of motion (Law of Inertia)',
      'F = ma describes the relationship between force, mass, and acceleration',
      'Every action has an equal and opposite reaction',
      'Newton\'s laws only apply in inertial reference frames'
    ],
    formulas: [
      'F = ma (Force equals mass times acceleration)',
      'F₁ = -F₂ (Action-reaction forces are equal in magnitude, opposite in direction)'
    ],
    notes: [],
    masteryLevel: 65,
    recallStrength: 70,
    revisionSchedule: '2025-06-05',
    totalStudyTime: 240, // minutes
    mastery: {
      level: 'Intermediate',
      percentage: 65
    },
    videos: [
      {
        id: 'v1',
        title: 'Understanding Newton\'s Laws',
        url: 'https://example.com/video1',
        duration: '8:24',
        thumbnail: '/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png'
      },
      {
        id: 'v2',
        title: 'Applications of Newton\'s Second Law',
        url: 'https://example.com/video2',
        duration: '12:45',
        thumbnail: '/lovable-uploads/bffd91d7-243d-42d9-bbd9-52133e18f4b6.png'
      }
    ],
    resources: [
      {
        id: 'r1',
        title: 'Interactive Force Simulator',
        type: 'simulator',
        url: 'https://example.com/simulator'
      },
      {
        id: 'r2',
        title: 'Problem Set: Newton\'s Laws',
        type: 'pdf',
        url: 'https://example.com/problems.pdf'
      }
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'A 5kg object is subjected to a force of 10N. What is its acceleration?',
        options: ['1 m/s²', '2 m/s²', '5 m/s²', '10 m/s²'],
        correctAnswer: '2 m/s²',
        explanation: 'Using F = ma: 10N = 5kg × a, so a = 2 m/s²',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        question: 'When a car accelerates forward, the passengers feel pushed back into their seats. This is an example of:',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Conservation of Energy'],
        correctAnswer: 'Newton\'s First Law',
        explanation: 'This demonstrates inertia - the tendency of objects to resist changes in motion.',
        difficulty: 'medium'
      }
    ],
    previousYearQuestions: [
      {
        id: 'pyq1',
        year: 2023,
        exam: 'Physics Olympiad',
        question: 'A ball is thrown vertically upward with an initial velocity of 20 m/s. Neglecting air resistance, what is the maximum height reached by the ball? (g = 10 m/s²)',
        options: ['10 m', '20 m', '30 m', '40 m'],
        correctAnswer: '20 m',
        solution: 'Using the equation v² = u² + 2as, where final velocity v = 0 at maximum height, u = 20 m/s, and a = -g = -10 m/s². Thus, 0 = 400 - 20s, which gives s = 20 m.'
      },
      {
        id: 'pyq2',
        year: 2022,
        exam: 'National Science Exam',
        question: 'Two masses m₁ = 2kg and m₂ = 3kg are connected by a light inextensible string passing over a smooth pulley. Find the acceleration of the system.',
        options: ['1 m/s²', '2 m/s²', '3 m/s²', '4 m/s²'],
        correctAnswer: '2 m/s²',
        solution: 'Using Newton\'s Second Law and considering the tensions: 3g - T = 3a and T - 2g = 2a. Solving these equations gives a = 2 m/s².'
      }
    ],
    recallQuestions: [
      {
        id: 'rq1',
        question: 'What is Newton\'s First Law?',
        answer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.'
      },
      {
        id: 'rq2',
        question: 'What is the formula for Newton\'s Second Law?',
        answer: 'F = ma (Force equals mass times acceleration)'
      },
      {
        id: 'rq3',
        question: 'State Newton\'s Third Law.',
        answer: 'For every action, there is an equal and opposite reaction.'
      }
    ],
    bookmarked: true,
    estimatedTime: 45
  };
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('learn');
  const [primaryTab, setPrimaryTab] = useState('learn');
  const [secondaryTab, setSecondaryTab] = useState('recall');
  const [concept, setConcept] = useState<any | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [activeRecallQuestion, setActiveRecallQuestion] = useState(0);
  const [showRecallAnswer, setShowRecallAnswer] = useState(false);
  const { saveNote, getNoteForConcept } = useUserNotes();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch concept data based on conceptId
    if (conceptId) {
      // Simulate API call
      setTimeout(() => {
        const data = getMockConceptData(conceptId);
        setConcept(data);
        const savedNotes = getNoteForConcept(conceptId);
        setUserNotes(savedNotes || data.notes?.join('\n') || '');
        setLoading(false);
      }, 500);
    }
  }, [conceptId, getNoteForConcept]);

  const handleSaveNotes = () => {
    if (concept && conceptId) {
      saveNote(conceptId, userNotes);
      toast({
        title: "Notes saved successfully",
        description: "Your notes have been saved for this concept.",
      });
    }
  };

  const handleBookmarkToggle = () => {
    if (concept) {
      setConcept({
        ...concept,
        bookmarked: !concept.bookmarked
      });
      
      toast({
        title: concept.bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        description: concept.bookmarked 
          ? "Concept removed from your bookmarks" 
          : "Concept added to your bookmarks for quick access",
      });
    }
  };

  const handleReadAloud = () => {
    if (concept) {
      if (readAloudActive) {
        setReadAloudActive(false);
        speechSynthesis.cancel();
      } else {
        setReadAloudActive(true);
        let textToRead = "";
        
        // Select text based on active tab
        if (primaryTab === 'learn') {
          // Strip HTML tags for better reading
          textToRead = concept.content.replace(/<[^>]*>?/gm, ' ');
        } else if (primaryTab === 'formulas') {
          textToRead = `Formulas for ${concept.title}: ${concept.formulas.join('. ')}`;
        } else if (primaryTab === 'common-mistakes') {
          textToRead = `Common mistakes for ${concept.title}: Be careful of these misconceptions.`;
        }
        
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleRecallNext = () => {
    if (concept?.recallQuestions) {
      setShowRecallAnswer(false);
      setActiveRecallQuestion((prev) => 
        prev === concept.recallQuestions.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleTabChange = (value: string) => {
    // Cancel any active read-aloud when changing tabs
    if (readAloudActive) {
      speechSynthesis.cancel();
      setReadAloudActive(false);
    }
    
    // Determine if it's a primary or secondary tab
    const isPrimaryTab = [
      'learn', 'visual', 'simulation', 'formulas', 'video', 'common-mistakes', 'previous-year'
    ].includes(value);
    
    const isSecondaryTab = [
      'recall', 'analytics', 'revision', 'notes', 'discuss', 'linked'
    ].includes(value);
    
    if (isPrimaryTab) {
      setPrimaryTab(value);
      setActiveTab(value);
    } else if (isSecondaryTab) {
      setSecondaryTab(value);
      setActiveTab(value);
    }
  };

  if (loading) {
    return (
      <ConceptsPageLayout showBackButton title="Loading Concept..." subtitle="Please wait">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ConceptsPageLayout>
    );
  }

  if (!concept) {
    return (
      <ConceptsPageLayout showBackButton title="Concept Not Found" subtitle="The requested concept could not be found">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-muted-foreground">We couldn't find the concept you're looking for.</p>
          <Button variant="outline">Return to Concepts</Button>
        </div>
      </ConceptsPageLayout>
    );
  }

  return (
    <ConceptsPageLayout 
      showBackButton 
      title="Concept Details" 
      subtitle="Expand your understanding"
    >
      <div className="space-y-6">
        {/* Concept Header Section */}
        <ConceptHeader 
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={concept.bookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Mastery & Recall Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Mastery Level</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{concept.mastery.percentage}%</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {concept.mastery.level}
                  </Badge>
                </div>
                <Progress value={concept.mastery.percentage} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Recall Strength</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{concept.recallStrength}%</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Strong
                  </Badge>
                </div>
                <Progress value={concept.recallStrength} className="h-2 mt-2" 
                  style={{ background: '#e5e7eb' }} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Total Study Time</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold">
                    {Math.floor(concept.totalStudyTime / 60)}h {concept.totalStudyTime % 60}m
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last studied: 2 days ago
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Next Review</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold">
                    {new Date(concept.revisionSchedule).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Based on your recall strength
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Read Aloud Feature */}
        {readAloudActive && (
          <ReadAloudSection 
            text={
              primaryTab === 'learn' ? concept.content.replace(/<[^>]*>?/gm, ' ') :
              primaryTab === 'formulas' ? `Formulas for ${concept.title}: ${concept.formulas.join('. ')}` :
              `Content for ${concept.title}`
            } 
            isActive={readAloudActive} 
            onStop={() => setReadAloudActive(false)}
          />
        )}
        
        {/* Main Content Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <Button
            variant={readAloudActive ? "secondary" : "outline"}
            size="sm"
            onClick={handleReadAloud}
            className={`flex items-center gap-2 ${readAloudActive ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : ""}`}
          >
            <Volume2 className="h-4 w-4" />
            {readAloudActive ? "Stop Reading" : "Read Aloud"}
          </Button>

          <div className="flex-grow"></div>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <BookMarked className="h-4 w-4" /> Save Progress
          </Button>
        </div>
        
        {/* Tab Navigation: Primary Learning Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4 bg-background">
            <TabsTrigger value="learn" className="flex gap-1 items-center">
              <BookOpen className="h-4 w-4" /> Learn
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex gap-1 items-center">
              <Image className="h-4 w-4" /> Visual
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex gap-1 items-center">
              <Box3d className="h-4 w-4" /> 3D Sim
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex gap-1 items-center">
              <FlaskConical className="h-4 w-4" /> Formulas
            </TabsTrigger>
            <TabsTrigger value="video" className="flex gap-1 items-center">
              <Video className="h-4 w-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="common-mistakes" className="flex gap-1 items-center">
              <FileText className="h-4 w-4" /> Mistakes
            </TabsTrigger>
            <TabsTrigger value="previous-year" className="flex gap-1 items-center">
              <History className="h-4 w-4" /> Past Exams
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Navigation: Secondary Management Tabs */}
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6 bg-background">
            <TabsTrigger value="recall" className="flex gap-1 items-center">
              <Brain className="h-4 w-4" /> Recall
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex gap-1 items-center">
              <BarChart className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="revision" className="flex gap-1 items-center">
              <RefreshCw className="h-4 w-4" /> Revision
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex gap-1 items-center">
              <Award className="h-4 w-4" /> Notes
            </TabsTrigger>
            <TabsTrigger value="discuss" className="flex gap-1 items-center">
              <MessageSquare className="h-4 w-4" /> Discuss
            </TabsTrigger>
            <TabsTrigger value="linked" className="flex gap-1 items-center">
              <FileQuestion className="h-4 w-4" /> Linked
            </TabsTrigger>
          </TabsList>
          
          {/* PRIMARY TABS CONTENT */}
          <TabsContent value="learn" className="focus:outline-none">
            <ConceptContent content={concept.content} />
          </TabsContent>
          
          <TabsContent value="visual" className="focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">Visual Representations</h3>
              <div dangerouslySetInnerHTML={{ __html: concept.visualContent }} />
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">3D Simulation</h3>
              
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <Box3d className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h4 className="font-medium text-lg mb-2">Interactive 3D Simulation</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Experience Newton's Laws in an interactive 3D environment
                  </p>
                  <Button>Launch Simulation</Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">First Law Demo</h4>
                  <p className="text-sm text-muted-foreground">
                    Observe objects in motion and how they behave without external forces
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Second Law Lab</h4>
                  <p className="text-sm text-muted-foreground">
                    Experiment with different masses and forces to see how acceleration changes
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Third Law Explorer</h4>
                  <p className="text-sm text-muted-foreground">
                    Interact with objects to observe equal and opposite reactions
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="formulas" className="focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">Key Formulas</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Newton's Second Law</h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm font-mono text-xl text-center w-full md:w-1/2">
                      F = ma
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <p className="mb-2"><strong>Where:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>F = net force (newtons, N)</li>
                        <li>m = mass (kilograms, kg)</li>
                        <li>a = acceleration (meters per second squared, m/s²)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Newton's Third Law</h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm font-mono text-xl text-center w-full md:w-1/2">
                      F₁ = -F₂
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-400">
                      <p className="mb-2"><strong>Where:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>F₁ = force exerted by object 1 on object 2</li>
                        <li>F₂ = force exerted by object 2 on object 1</li>
                        <li>The negative sign indicates opposite directions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Practice: Calculate Force</h4>
                  <div className="space-y-4">
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      Try applying Newton's Second Law to solve this problem:
                    </p>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <p className="mb-4">A 1500 kg car accelerates from 0 to 27 m/s in 9 seconds. Calculate the net force acting on the car.</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Acceleration: </span>
                          <span className="font-mono">(27 - 0) / 9 = 3 m/s²</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Force: </span>
                          <span className="font-mono">F = 1500 kg × 3 m/s² = 4500 N</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4 focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">Video Explanations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {concept.videos.map((video: any) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ y: -5 }}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-video bg-slate-200 dark:bg-slate-800">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="outline" size="icon" className="rounded-full bg-white/90 dark:bg-black/60 h-12 w-12">
                          <Video className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-base">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Duration: {video.duration}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">Watch</Button>
                        <Button variant="ghost" size="sm">Save</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Video className="h-4 w-4 text-blue-600" /> Recommended Learning Path
                </h4>
                <ol className="list-decimal ml-5 space-y-2 text-sm">
                  <li>Start with "Understanding Newton's Laws" (8:24)</li>
                  <li>Practice with interactive examples in the 3D simulation</li>
                  <li>Continue with "Applications of Newton's Second Law" (12:45)</li>
                  <li>Complete the recall exercises to test your understanding</li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="common-mistakes" className="space-y-4 focus:outline-none">
            <CommonMistakesContent conceptName={concept.title} />
          </TabsContent>
          
          <TabsContent value="previous-year" className="space-y-4 focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">Previous Year Questions</h3>
              
              <div className="space-y-6">
                {concept.previousYearQuestions?.map((question: any) => (
                  <div key={question.id} 
                    className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge className="mb-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {question.exam} {question.year}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Question:</h4>
                      <p>{question.question}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h5 className="font-medium">Options:</h5>
                      {question.options.map((option: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id={`pyq-${question.id}-option-${i}`} 
                            name={`pyq-${question.id}`} 
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`pyq-${question.id}-option-${i}`}>{option}</label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <Button size="sm" variant="outline">Check Answer</Button>
                      <Button size="sm" variant="ghost">Show Solution</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Load More Previous Year Questions
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* SECONDARY TABS CONTENT */}
          <TabsContent value="recall" className="focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-4">Recall Exercise</h3>
              
              {concept.recallQuestions && concept.recallQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5" /> Active Recall Question
                    </h4>
                    
                    <div className="mb-6">
                      <p className="text-lg font-medium mb-4">
                        {concept.recallQuestions[activeRecallQuestion].question}
                      </p>
                      
                      {!showRecallAnswer ? (
                        <div className="space-y-4">
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            Try to answer this question from memory before revealing the answer.
                          </p>
                          <Button onClick={() => setShowRecallAnswer(true)}>
                            Show Answer
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <p className="text-gray-800 dark:text-gray-200">
                            {concept.recallQuestions[activeRecallQuestion].answer}
                          </p>
                          
                          <div className="mt-4 flex items-center gap-2">
                            <p className="text-sm">How well did you recall this?</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="bg-red-100 hover:bg-red-200 border-red-200">
                                Didn't Know
                              </Button>
                              <Button variant="outline" size="sm" className="bg-yellow-100 hover:bg-yellow-200 border-yellow-200">
                                Partially
                              </Button>
                              <Button variant="outline" size="sm" className="bg-green-100 hover:bg-green-200 border-green-200">
                                Knew It
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Question {activeRecallQuestion + 1} of {concept.recallQuestions.length}
                      </div>
                      <Button onClick={handleRecallNext}>
                        Next Question
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Why Active Recall Works</h4>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Active recall strengthens neural pathways associated with the information, making it easier 
                      to retrieve later. Testing yourself is one of the most effective study techniques, proven to 
                      be more effective than rereading or highlighting.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="focus:outline-none">
            <ConceptAnalyticsSection 
              conceptId={conceptId || ''} 
              masteryPercent={concept.mastery.percentage}
              recallAccuracy={concept.recallStrength}
            />
          </TabsContent>
          
          <TabsContent value="revision" className="focus:outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-indigo-600" /> Revision Schedule
              </h3>
              
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <h4 className="font-medium mb-4">Spaced Repetition Timeline</h4>
                  
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                    
                    <div className="space-y-8">
                      <div className="relative pl-8">
                        <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -translate-x-[7px]"></div>
                        <div className="font-medium">First Review</div>
                        <div className="text-sm text-muted-foreground">
                          Completed on May 18, 2025
                        </div>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full -translate-x-[7px]"></div>
                        <div className="font-medium">Second Review</div>
                        <div className="text-sm text-muted-foreground">
                          Completed on May 21, 2025
                        </div>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute left-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[7px]"></div>
                        <div className="font-medium">Third Review</div>
                        <div className="text-sm text-muted-foreground">
                          Scheduled for June 5, 2025 (in 13 days)
                        </div>
                        <Button size="sm" className="mt-2" variant="outline">
                          Review Now
                        </Button>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute left-0 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full -translate-x-[7px]"></div>
                        <div className="font-medium text-muted-foreground">Fourth Review</div>
                        <div className="text-sm text-muted-foreground">
                          Scheduled for June 26, 2025 (in 34 days)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                      Optimal Review Timing
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
                      Your next review is calculated using the forgetting curve and your recall strength. 
                      Reviewing at these optimal intervals leads to long-term retention.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Adjust Review Schedule
                    </Button>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
                      Review Methods
                    </h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-2 list-disc list-inside">
                      <li>Active recall questions</li>
                      <li>Flashcards (7 cards available)</li>
                      <li>Practice problems (5 problems)</li>
                      <li>Teach-back method (explanation exercise)</li>
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full">
                  Add to Today's Study Plan
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="focus:outline-none">
            <NoteSection 
              userNotes={userNotes}
              setUserNotes={setUserNotes}
              handleSaveNotes={handleSaveNotes}
            />
          </TabsContent>
          
          <TabsContent value="discuss" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium mb-4">Discussion Forum</h3>
                  
                  <div className="mb-6 bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium mb-2">Start a Discussion</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ask questions about this concept or share your insights with the community.
                    </p>
                    <textarea 
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 mb-3 h-32 bg-white dark:bg-gray-900"
                      placeholder="Type your question or discussion topic here..."
                    ></textarea>
                    <div className="flex justify-end">
                      <Button>Post Discussion</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="font-medium text-blue-700 dark:text-blue-300">M</span>
                          </div>
                          <div>
                            <div className="font-medium">Michael R.</div>
                            <div className="text-xs text-muted-foreground">Posted 2 days ago</div>
                          </div>
                        </div>
                        <Badge variant="outline">Question</Badge>
                      </div>
                      <div className="mb-3">
                        <p>Can someone explain how Newton's laws apply in a rotating reference frame?</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>2 replies • </span>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">View Discussion</button>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <span className="font-medium text-purple-700 dark:text-purple-300">S</span>
                          </div>
                          <div>
                            <div className="font-medium">Sarah T.</div>
                            <div className="text-xs text-muted-foreground">Posted 5 days ago</div>
                          </div>
                        </div>
                        <Badge variant="outline">Insight</Badge>
                      </div>
                      <div className="mb-3">
                        <p>I found a great visualization that helped me understand the third law better...</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>5 replies • </span>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">View Discussion</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline">View All Discussions</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium mb-4">AI Tutor</h3>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg h-[300px] flex flex-col">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Physics Tutor</span>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-3 space-y-3 bg-slate-50 dark:bg-slate-900">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0">
                          <Brain className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm max-w-[80%]">
                          Hello! I'm your AI tutor for Newton's Laws of Motion. What would you like help with?
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Ask a question about this concept..." 
                          className="flex-grow border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm"
                        />
                        <Button size="sm">Send</Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Quick questions: "Explain inertia" • "F=ma examples" • "Real-world applications"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <AIInsightsSection conceptId={conceptId || ''} conceptTitle={concept.title} />
          </TabsContent>
          
          <TabsContent value="linked" className="focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <LinkedConceptsSection 
                  conceptId={conceptId || ''} 
                  subject={concept.subject}
                  topic={concept.topic} 
                />
              </div>
              
              <div className="md:col-span-2 space-y-6">
                {/* Related Flashcards */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-600" /> Related Flashcards
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                          FRONT SIDE
                        </span>
                        <p className="font-medium mt-1">State Newton's First Law of Motion</p>
                      </div>
                      
                      <Button size="sm" variant="secondary" className="w-full bg-white dark:bg-gray-900">
                        Show Answer
                      </Button>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                          FRONT SIDE
                        </span>
                        <p className="font-medium mt-1">What is the formula for Newton's Second Law?</p>
                      </div>
                      
                      <Button size="sm" variant="secondary" className="w-full bg-white dark:bg-gray-900">
                        Show Answer
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All 8 Flashcards
                  </Button>
                </div>
                
                {/* Related Exams */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FileQuestion className="h-5 w-5 text-purple-600" /> Related Practice Exams
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium">Classical Mechanics Quiz</h4>
                      <div className="flex items-center justify-between mt-2 mb-3">
                        <span className="text-sm text-muted-foreground">10 questions • 15 min</span>
                        <Badge>Medium</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contains 3 questions on Newton's Laws</span>
                        <Button size="sm">Start</Button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium">Forces and Motion Assessment</h4>
                      <div className="flex items-center justify-between mt-2 mb-3">
                        <span className="text-sm text-muted-foreground">15 questions • 25 min</span>
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          Hard
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contains 5 questions on Newton's Laws</span>
                        <Button size="sm">Start</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
