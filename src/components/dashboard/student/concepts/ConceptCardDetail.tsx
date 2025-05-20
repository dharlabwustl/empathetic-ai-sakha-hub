import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Brain, Clock, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ConceptContent from './concept-detail/ConceptContent';
import ConceptFlashcards from './concept-detail/ConceptFlashcards';
import RevisionLoopSection from './concept-detail/RevisionLoopSection';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const mockConcept = {
  id: "c1",
  title: "Newton's Laws of Motion",
  subtitle: "Fundamental principles of classical mechanics",
  subject: "Physics",
  chapter: "Mechanics",
  difficulty: "Intermediate",
  estimatedTime: "15 min",
  lastStudied: "3 days ago",
  mastery: 65,
  content: `
    <h2>Introduction to Newton's Laws</h2>
    <p>Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it.</p>
    
    <h3>Newton's First Law (Law of Inertia)</h3>
    <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
    <p>This means that an object will not change its motion unless a force acts on it.</p>
    
    <h3>Newton's Second Law (F = ma)</h3>
    <p>The force acting on an object is equal to the mass of that object times its acceleration.</p>
    <p>This is represented by the equation: F = ma</p>
    <p>where F is the net force applied, m is the mass of the object, and a is the acceleration.</p>
    
    <h3>Newton's Third Law</h3>
    <p>For every action, there is an equal and opposite reaction.</p>
    <p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object.</p>
    
    <h2>Applications</h2>
    <p>Newton's laws are applied in countless scenarios, from rocket propulsion to automobile safety systems. Understanding these principles helps engineers design safer vehicles, more efficient machines, and even plan space missions.</p>
  `,
  diagrams: [
    {
      title: "First Law Illustration",
      url: "https://placehold.co/600x400?text=First+Law+Diagram"
    },
    {
      title: "Second Law Graph",
      url: "https://placehold.co/600x400?text=F=ma+Graph"
    },
    {
      title: "Third Law Demonstration",
      url: "https://placehold.co/600x400?text=Third+Law+Demo"
    }
  ],
  formulas: [
    { name: "Newton's Second Law", formula: "F = ma" },
    { name: "Weight calculation", formula: "W = mg" },
    { name: "Momentum", formula: "p = mv" }
  ],
  questions: [
    {
      question: "What happens to an object in motion when no forces act upon it?",
      answer: "It continues moving at constant velocity (same speed and direction)."
    },
    {
      question: "How does the acceleration of an object change if the force applied is doubled?",
      answer: "If the mass remains constant, the acceleration doubles as well (F = ma)."
    },
    {
      question: "When a person walks, what is the equal and opposite reaction force?",
      answer: "The person pushes backward on the ground, and the ground pushes forward on the person with equal magnitude."
    }
  ],
  relatedConcepts: [
    { id: "rc1", title: "Momentum", subject: "Physics", difficulty: "Medium" },
    { id: "rc2", title: "Friction", subject: "Physics", difficulty: "Easy" },
    { id: "rc3", title: "Gravitational Force", subject: "Physics", difficulty: "Medium" },
    { id: "rc4", title: "Work and Energy", subject: "Physics", difficulty: "Hard" }
  ],
  quizQuestions: [
    {
      question: "Which of Newton's laws states that an object at rest stays at rest unless acted upon by an external force?",
      options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
      correctAnswer: "First Law"
    },
    {
      question: "The equation F = ma represents which of Newton's laws?",
      options: ["First Law", "Second Law", "Third Law", "None of the above"],
      correctAnswer: "Second Law"
    },
    {
      question: "According to Newton's third law, when one object exerts a force on another object, the second object...",
      options: [
        "Accelerates proportionally to its mass",
        "Remains at rest",
        "Exerts an equal and opposite force on the first object",
        "Moves in the same direction as the force"
      ],
      correctAnswer: "Exerts an equal and opposite force on the first object"
    }
  ],
  keyPoints: [
    "Newton's First Law establishes the principle of inertia",
    "The Second Law quantifies the relationship between force, mass, and acceleration",
    "The Third Law describes the symmetry of forces in interactions between objects",
    "These laws provide the foundation for classical mechanics"
  ]
};

const ConceptCardDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [hasAddedBookmark, setHasAddedBookmark] = useState(false);
  const [isRevisionStarted, setIsRevisionStarted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // In a real app, you would fetch the concept based on conceptId
  const concept = mockConcept;
  
  const handleAddBookmark = () => {
    setHasAddedBookmark(!hasAddedBookmark);
    
    toast({
      title: hasAddedBookmark ? "Bookmark removed" : "Bookmark added",
      description: hasAddedBookmark 
        ? `Removed ${concept.title} from your bookmarks` 
        : `Added ${concept.title} to your bookmarks for quick access`,
    });
  };
  
  const handleStartRevision = () => {
    setIsRevisionStarted(true);
    setActiveTab('revision');
    
    toast({
      title: "Revision loop started",
      description: "Follow the revision steps to master this concept",
    });
  };
  
  const completedChecklistItems = concept.masteryChecklist.filter(item => item.completed).length;
  const totalChecklistItems = concept.masteryChecklist.length;
  const masteryPercentage = (completedChecklistItems / totalChecklistItems) * 100;
  
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Back navigation */}
      <Button 
        variant="ghost" 
        className="gap-1" 
        onClick={() => navigate('/dashboard/student/concepts')}
        size={isMobile ? "sm" : "default"}
      >
        <ArrowLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        <span className={isMobile ? 'text-xs' : ''}>Back to All Concepts</span>
      </Button>
      
      {/* Concept header card */}
      <Card>
        <CardHeader className={`${isMobile ? 'p-4' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  {concept.difficulty}
                </Badge>
              </div>
              
              <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-2`}>{concept.title}</CardTitle>
              <CardDescription className={`${isMobile ? 'text-xs' : ''}`}>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-muted-foreground`} />
                  <span>Time to master: {concept.timeToMaster}</span>
                </div>
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className={`gap-1 ${hasAddedBookmark ? 'text-yellow-500 border-yellow-200' : ''}`}
                onClick={handleAddBookmark}
              >
                <Star className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${hasAddedBookmark ? 'fill-yellow-500' : ''}`} />
                <span className={isMobile ? 'text-xs' : ''}>
                  {hasAddedBookmark ? 'Bookmarked' : 'Bookmark'}
                </span>
              </Button>
              <Button 
                className="gap-1"
                size={isMobile ? "sm" : "default"} 
                onClick={handleStartRevision}
              >
                <Zap className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                <span className={isMobile ? 'text-xs' : ''}>Start Revision Loop</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`${isMobile ? 'px-4 py-0' : 'pt-0'}`}>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-full md:w-3/4">
              <Alert className={`${isMobile ? 'text-xs p-3' : ''}`}>
                <Brain className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
                <AlertTitle className={isMobile ? 'text-sm' : ''}>Mastery Progress</AlertTitle>
                <AlertDescription className={isMobile ? 'text-xs' : ''}>
                  You've completed {completedChecklistItems} of {totalChecklistItems} mastery checklist items
                </AlertDescription>
                <div className="mt-2">
                  <Progress value={masteryPercentage} className={`h-1.5 ${isMobile ? 'mt-2' : ''}`} />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Proficient</span>
                    <span>Expert</span>
                  </div>
                </div>
              </Alert>
            </div>
            
            <div className="w-full md:w-1/4 bg-muted/30 rounded-lg p-3">
              <h4 className={`font-medium mb-2 ${isMobile ? 'text-sm' : ''}`}>Related Concepts</h4>
              <ul className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <li className="cursor-pointer hover:underline text-blue-600 dark:text-blue-400">Conservation of Momentum</li>
                <li className="cursor-pointer hover:underline text-blue-600 dark:text-blue-400">Forces and Equilibrium</li>
                <li className="cursor-pointer hover:underline text-blue-600 dark:text-blue-400">Circular Motion</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className={`${isMobile ? 'p-4' : ''} pt-4`}>
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex">
              <TabsTrigger value="overview" className={isMobile ? 'text-xs py-1.5' : ''}>Overview</TabsTrigger>
              <TabsTrigger value="revision" className={isMobile ? 'text-xs py-1.5' : ''}>
                Revision Loop
                {isRevisionStarted && (
                  <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-green-500">✓</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="flashcards" className={isMobile ? 'text-xs py-1.5' : ''}>Flashcards</TabsTrigger>
              <TabsTrigger value="formulas" className={isMobile ? 'text-xs py-1.5' : ''}>Formulas</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>
      
      {/* Tab content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ConceptContent
              title={concept.title}
              content={concept.content}
              subtopics={concept.subtopics}
              relatedFormulas={concept.relatedFormulas}
              examples={concept.examples}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className={isMobile ? 'text-lg' : ''}>Mastery Checklist</CardTitle>
                <CardDescription className={isMobile ? 'text-xs' : ''}>
                  Complete all items to master this concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {concept.masteryChecklist.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <div className={`h-4 w-4 rounded-full mr-2 ${item.completed ? 'bg-green-500' : 'border border-gray-300'}`}>
                        {item.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                      </div>
                      <span>{item.task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'revision' && (
          <RevisionLoopSection conceptTitle={concept.title} isStarted={isRevisionStarted} />
        )}
        
        {activeTab === 'flashcards' && (
          <ConceptFlashcards flashcardsTotal={10} flashcardsCompleted={3} />
        )}
        
        {activeTab === 'formulas' && (
          <Card>
            <CardHeader>
              <CardTitle className={isMobile ? 'text-lg' : ''}>Key Formulas</CardTitle>
              <CardDescription className={isMobile ? 'text-xs' : ''}>
                Important formulas related to {concept.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {concept.relatedFormulas.map((formula, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-xl font-mono text-center mb-2">{formula}</p>
                      {formula === 'F = ma' && (
                        <div className="text-sm">
                          <p className="font-medium">Newton's Second Law of Motion</p>
                          <p className="text-muted-foreground">Where:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            <li>F = Force (in Newtons, N)</li>
                            <li>m = Mass (in kilograms, kg)</li>
                            <li>a = Acceleration (in meters per second squared, m/s²)</li>
                          </ul>
                        </div>
                      )}
                      {formula === 'p = mv' && (
                        <div className="text-sm">
                          <p className="font-medium">Momentum</p>
                          <p className="text-muted-foreground">Where:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            <li>p = Momentum (in kg·m/s)</li>
                            <li>m = Mass (in kilograms, kg)</li>
                            <li>v = Velocity (in meters per second, m/s)</li>
                          </ul>
                        </div>
                      )}
                      {formula === 'F * t = m * Δv' && (
                        <div className="text-sm">
                          <p className="font-medium">Impulse-Momentum Theorem</p>
                          <p className="text-muted-foreground">Where:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1 text-muted-foreground">
                            <li>F = Force (in Newtons, N)</li>
                            <li>t = Time (in seconds, s)</li>
                            <li>m = Mass (in kilograms, kg)</li>
                            <li>Δv = Change in velocity (in meters per second, m/s)</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                View Formula Sheet
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ConceptCardDetail;
