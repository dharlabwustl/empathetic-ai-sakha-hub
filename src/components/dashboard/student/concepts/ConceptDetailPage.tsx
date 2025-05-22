
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import FormulaReference from './concept-detail/FormulaReference';
import { ConceptMasterySection } from './ConceptMasterySection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useUserNotes from '@/hooks/useUserNotes';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Book, ArrowRight, CheckCircle2, BookOpen, FileText } from 'lucide-react';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [userNotes, setUserNotes] = useState('');
  const [conceptData, setConceptData] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(35);
  const [activeTab, setActiveTab] = useState('content');

  // Mock flashcards data
  const mockFlashcards = [
    {
      id: 'card1',
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest will remain at rest, and an object in motion will remain in motion at constant velocity and in a straight line, unless acted upon by an unbalanced force."
    },
    {
      id: 'card2',
      front: "What is inertia?",
      back: "Inertia is the resistance of an object to any change in its motion, including change to its speed and direction."
    },
    {
      id: 'card3',
      front: "State Newton's Second Law of Motion",
      back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma."
    },
    {
      id: 'card4',
      front: "State Newton's Third Law of Motion",
      back: "For every action, there is an equal and opposite reaction."
    },
    {
      id: 'card5',
      front: "How does a rocket work according to Newton's Third Law?",
      back: "A rocket expels gas backward (action), which propels the rocket forward (reaction)."
    }
  ];
  
  // Mock formulas data
  const mockFormulas = [
    {
      id: 'formula1',
      name: "Newton's Second Law",
      latex: "F = m \\times a",
      description: "The force (F) acting on an object is equal to the mass (m) of the object times its acceleration (a)."
    },
    {
      id: 'formula2',
      name: "Force of Gravity",
      latex: "F_g = G \\frac{m_1 \\times m_2}{r^2}",
      description: "The gravitational force between two masses is proportional to the product of their masses and inversely proportional to the square of the distance between them."
    },
    {
      id: 'formula3',
      name: "Momentum",
      latex: "p = m \\times v",
      description: "Momentum (p) is equal to mass (m) times velocity (v)."
    }
  ];

  // Mock concept data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockConcept = {
        id: conceptId || 'concept-1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        topic: 'Mechanics',
        difficulty: 'medium' as 'easy' | 'medium' | 'hard',
        content: `
          <h2>Newton's First Law of Motion</h2>
          <p>An object at rest will remain at rest, and an object in motion will remain in motion at constant velocity and in a straight line, unless acted upon by an unbalanced force.</p>
          <h3>Key Points</h3>
          <ul>
            <li>Objects naturally keep doing what they're already doing (rest or constant motion)</li>
            <li>This tendency is called "inertia"</li>
            <li>Unbalanced forces change this natural state</li>
          </ul>
          
          <h2>Newton's Second Law of Motion</h2>
          <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This can be represented by the equation F = ma.</p>
          <h3>Key Points</h3>
          <ul>
            <li>More force = more acceleration</li>
            <li>More mass = less acceleration</li>
            <li>Units: force in newtons (N), mass in kg, acceleration in m/s²</li>
          </ul>
          
          <h2>Newton's Third Law of Motion</h2>
          <p>For every action, there is an equal and opposite reaction. This means that forces always occur in pairs, with one object exerting a force on another, and the second object exerting an equal and opposite force on the first.</p>
          <h3>Examples</h3>
          <ul>
            <li>When you push against a wall, the wall pushes back with equal force</li>
            <li>Rocket propulsion: gases push out, rocket moves forward</li>
            <li>Walking: you push backward on the ground, ground pushes you forward</li>
          </ul>
          
          <h2>Applications</h2>
          <p>Newton's laws of motion are fundamental to classical mechanics and have widespread applications in engineering, sports, transportation, and everyday life. They form the basis for understanding how forces influence the motion of objects in our physical world.</p>
        `,
      };
      
      setConceptData(mockConcept);
      
      // Get saved notes for this concept
      const savedNotes = getNoteForConcept(mockConcept.id);
      setUserNotes(savedNotes);
      
    }, 500);
  }, [conceptId]);

  // Handle saving notes
  const handleSaveNotes = () => {
    if (conceptId) {
      saveNote(conceptId, userNotes);
      toast({
        title: "Notes saved successfully",
        description: "Your notes have been saved for this concept.",
      });
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  // Handle mastery update
  const handleMasteryUpdate = (newLevel: number) => {
    setMasteryLevel(newLevel);
    toast({
      title: "Mastery level updated",
      description: `Your mastery of this concept is now ${newLevel}%`,
    });
  };

  // Handle formula lab open
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab...",
    });
    // In a real app, you would navigate to the formula lab page
  };

  if (!conceptData) {
    return (
      <SharedPageLayout
        title="Loading Concept"
        subtitle="Please wait while we load the concept details"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <Helmet>
        <title>{conceptData.title} - Concept Study</title>
      </Helmet>
      
      <ConceptHeader 
        title={conceptData.title}
        subject={conceptData.subject}
        topic={conceptData.topic}
        difficulty={conceptData.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="mastery" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Mastery</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: conceptData.content }} />
            </div>
            
            <div className="mt-8 border-t pt-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium mb-1">Master this concept</h4>
                <p className="text-sm text-muted-foreground">Practice with flashcards and exercises</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('flashcards')}
                  className="flex items-center gap-1"
                >
                  Study Flashcards
                </Button>
                <Button
                  onClick={() => setActiveTab('formulas')}
                  className="flex items-center gap-1"
                >
                  View Formulas <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Your Notes</h3>
            <textarea
              className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Take notes on this concept..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveNotes}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save Notes
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-indigo-500" />
              Practice Questions
            </h3>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Test your understanding</h4>
                <p className="text-sm mb-3">Solve problems to reinforce your knowledge of this concept.</p>
                <Button>Start Practice Quiz</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcards">
          <ConceptFlashcards flashcards={mockFlashcards} />
        </TabsContent>
        
        <TabsContent value="formulas">
          <FormulaReference 
            formulas={mockFormulas} 
            conceptTitle={conceptData.title}
            handleOpenFormulaLab={handleOpenFormulaLab}
          />
        </TabsContent>
        
        <TabsContent value="mastery">
          <ConceptMasterySection 
            conceptId={conceptData.id} 
            recallAccuracy={masteryLevel}
            quizScore={70}
            lastPracticed="2023-05-20"
          />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
