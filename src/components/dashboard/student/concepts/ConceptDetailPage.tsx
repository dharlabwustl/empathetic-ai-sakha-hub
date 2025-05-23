
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, FlaskConical, MessageSquare, Award, PlayCircle } from 'lucide-react';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptContent from './concept-detail/ConceptContent';
import NoteSection from './concept-detail/NoteSection';
import { motion } from 'framer-motion';

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
        thumbnail: 'https://example.com/thumb1.jpg'
      },
      {
        id: 'v2',
        title: 'Applications of Newton\'s Second Law',
        url: 'https://example.com/video2',
        duration: '12:45',
        thumbnail: 'https://example.com/thumb2.jpg'
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
    bookmarked: true,
    estimatedTime: 45
  };
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('content');
  const [concept, setConcept] = useState<any | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch concept data based on conceptId
    if (conceptId) {
      // Simulate API call
      setTimeout(() => {
        const data = getMockConceptData(conceptId);
        setConcept(data);
        setUserNotes(data.notes?.join('\n') || '');
        setLoading(false);
      }, 500);
    }
  }, [conceptId]);

  const handleSaveNotes = () => {
    // In a real app, save notes to backend
    console.log("Saving notes:", userNotes);
    // For demo, just update local state
    setConcept(prev => ({
      ...prev,
      notes: userNotes.split('\n')
    }));
  };

  const handleBookmarkToggle = () => {
    if (concept) {
      setConcept({
        ...concept,
        bookmarked: !concept.bookmarked
      });
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
        
        {/* Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Mastery Progress</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {concept.mastery.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${concept.mastery.percentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Current Level: <span className="font-medium">{concept.mastery.level}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Estimated time: <span className="font-medium">{concept.estimatedTime} min</span>
            </span>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="content" className="flex gap-1 items-center">
              <BookOpen className="h-4 w-4" /> Content
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex gap-1 items-center">
              <Video className="h-4 w-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex gap-1 items-center">
              <FileText className="h-4 w-4" /> Practice
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex gap-1 items-center">
              <FlaskConical className="h-4 w-4" /> Formulas
            </TabsTrigger>
            <TabsTrigger value="discuss" className="flex gap-1 items-center">
              <MessageSquare className="h-4 w-4" /> Discuss
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex gap-1 items-center">
              <Award className="h-4 w-4" /> My Notes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="focus:outline-none">
            <ConceptContent content={concept.content} />
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-4 focus:outline-none">
            <h3 className="text-lg font-medium">Video Explanations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concept.videos.map((video: any) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="rounded-full bg-white/90 dark:bg-black/60">
                        <PlayCircle className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Duration: {video.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4 focus:outline-none">
            <h3 className="text-lg font-medium">Practice Questions</h3>
            <div className="space-y-4">
              {concept.practiceQuestions.map((question: any, index: number) => (
                <div key={question.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Question {index + 1}: {question.question}</h4>
                  <div className="space-y-2 mt-3">
                    {question.options.map((option: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={`q${index}-option${i}`} 
                          name={`question-${question.id}`} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor={`q${index}-option${i}`} className="text-sm">{option}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Check Answer</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="formulas" className="space-y-4 focus:outline-none">
            <h3 className="text-lg font-medium">Key Formulas</h3>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ul className="space-y-3">
                {concept.formulas.map((formula: string, index: number) => (
                  <li key={index} className="pb-2 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                    <div className="font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded-md text-center">
                      {formula}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="discuss" className="space-y-4 focus:outline-none">
            <h3 className="text-lg font-medium">Discussion Forum</h3>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center py-8">
              <p className="text-muted-foreground">Join the discussion about this concept.</p>
              <Button className="mt-4">Start a Discussion</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="focus:outline-none">
            <NoteSection 
              userNotes={userNotes}
              setUserNotes={setUserNotes}
              handleSaveNotes={handleSaveNotes}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
