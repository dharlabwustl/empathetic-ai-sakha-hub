
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  BookMarked, 
  PencilLine,
  Bookmark,
  CheckCircle,
  CalendarClock,
  Users,
  Volume2,
  BrainCircuit,
  ArrowLeft,
  Lightbulb,
  Play,
  Layers3D,
  FlaskRound,
  FileText,
  Video,
  Zap,
  Tag
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock concept data for demonstration
const mockConcepts = {
  'concept-1': {
    id: 'concept-1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium' as const,
    estimatedTime: '45 minutes',
    progress: 75,
    masteryLevel: 68,
    recallAccuracy: 72,
    examScore: 65,
    description: 'Understanding the fundamental principles that govern the motion of physical objects and systems.',
    tags: ['Classical Mechanics', 'Dynamics', 'Physics Foundation', 'Forces'],
    content: `
      <h2>Newton's Three Laws of Motion</h2>
      <p>Sir Isaac Newton's three laws of motion are fundamental principles that form the foundation of classical mechanics.</p>
      
      <h3>First Law (Law of Inertia)</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force.</p>
      
      <h3>Second Law (F = ma)</h3>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      
      <h3>Third Law (Action-Reaction)</h3>
      <p>For every action, there is an equal and opposite reaction.</p>
    `,
    isPremium: false,
    isRecommended: true,
    averageCompletionTime: '35 minutes',
    readCount: 1287,
    upvotes: 432,
    completionRate: 78,
    relatedConcepts: [
      { id: 'concept-2', title: 'Kinematics', subject: 'Physics' }, 
      { id: 'concept-3', title: 'Conservation of Energy', subject: 'Physics' }
    ],
    relatedFlashcards: [
      { id: 'flash-1', front: "State Newton's First Law", back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force." },
      { id: 'flash-2', front: "What is the formula for Newton's Second Law?", back: "F = ma, where F is force, m is mass, and a is acceleration" },
      { id: 'flash-3', front: "Explain Newton's Third Law", back: "For every action, there is an equal and opposite reaction" }
    ],
    confidenceRating: 4.2,
    lastStudied: '2023-05-12T10:30:00Z',
    studyAnalytics: {
      timeSpent: 120, // minutes
      recallImprovement: 15, // percentage points
      masteryGain: 8, // percentage points
      studySessions: 5,
      weakAreas: ["Application of Third Law", "Complex Force Calculations"],
      strongAreas: ["Law of Inertia Understanding", "Basic Force Concepts"]
    },
    quizPerformance: [
      { date: "2023-04-28", score: 65 },
      { date: "2023-05-05", score: 72 },
      { date: "2023-05-12", score: 78 }
    ]
  },
  'concept-2': {
    id: 'concept-2',
    title: 'Quantum Mechanics Basics',
    subject: 'Physics',
    topic: 'Quantum Physics',
    difficulty: 'hard' as const,
    estimatedTime: '75 minutes',
    progress: 45,
    masteryLevel: 40,
    recallAccuracy: 38,
    examScore: 42,
    description: 'Introduction to the fundamental principles of quantum mechanics and wave-particle duality.',
    tags: ['Quantum Physics', 'Wave-Particle Duality', 'Uncertainty Principle'],
    content: `
      <h2>Introduction to Quantum Mechanics</h2>
      <p>Quantum mechanics is the branch of physics relating to the very small. It describes nature at the smallest scales of energy levels of atoms and subatomic particles.</p>
      
      <h3>Wave-Particle Duality</h3>
      <p>All particles exhibit both wave and particle properties. This is a central concept of quantum mechanics.</p>
      
      <h3>Heisenberg's Uncertainty Principle</h3>
      <p>It is impossible to simultaneously know the exact position and momentum of a particle.</p>
      
      <h3>Schrödinger's Wave Equation</h3>
      <p>The fundamental equation that describes how the quantum state of a physical system changes over time.</p>
    `,
    isPremium: true,
    isRecommended: false,
    averageCompletionTime: '65 minutes',
    readCount: 876,
    upvotes: 312,
    completionRate: 62,
    relatedConcepts: [
      { id: 'concept-4', title: 'Atomic Structure', subject: 'Physics' },
      { id: 'concept-5', title: 'Particle Physics', subject: 'Physics' }
    ],
    relatedFlashcards: [
      { id: 'flash-4', front: "What is wave-particle duality?", back: "The concept that every particle exhibits both wave and particle properties" },
      { id: 'flash-5', front: "State Heisenberg's Uncertainty Principle", back: "It is impossible to simultaneously know the exact position and momentum of a particle" }
    ],
    confidenceRating: 3.8,
    lastStudied: '2023-04-28T14:15:00Z',
    studyAnalytics: {
      timeSpent: 95, // minutes
      recallImprovement: 8, // percentage points
      masteryGain: 5, // percentage points
      studySessions: 3,
      weakAreas: ["Schrödinger's Equation", "Quantum Entanglement"],
      strongAreas: ["Wave-Particle Duality", "Basic Quantum Concepts"]
    },
    quizPerformance: [
      { date: "2023-03-15", score: 35 },
      { date: "2023-04-02", score: 40 },
      { date: "2023-04-28", score: 45 }
    ]
  }
};

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept, setConcept] = useState(mockConcepts[id as keyof typeof mockConcepts]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState(concept?.confidenceRating || 0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('learn');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [recallAnswer, setRecallAnswer] = useState('');
  const [isRecallSubmitted, setIsRecallSubmitted] = useState(false);
  const [recallFeedback, setRecallFeedback] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  // Handle case when concept is not found
  if (!concept) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Concept not found</h2>
        <p className="mb-8">The concept you're looking for couldn't be found.</p>
        <Link to="/dashboard/student/concepts">
          <Button>Return to Concepts</Button>
        </Link>
      </div>
    );
  }
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "This concept has been removed from your saved items" : "This concept has been saved for later study",
    });
  };
  
  const handleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    if (!isReadingAloud) {
      toast({
        title: "Reading content aloud",
        description: "Text-to-speech has started. Click again to stop.",
      });
    } else {
      toast({
        title: "Reading stopped",
        description: "Text-to-speech has been stopped.",
      });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Concept link has been copied to clipboard",
    });
  };

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < concept.relatedFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setShowFlashcardAnswer(false);
    } else {
      setCurrentFlashcardIndex(0);
      setShowFlashcardAnswer(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setShowFlashcardAnswer(false);
    } else {
      setCurrentFlashcardIndex(concept.relatedFlashcards.length - 1);
      setShowFlashcardAnswer(false);
    }
  };

  const handleRecallSubmit = () => {
    setIsRecallSubmitted(true);
    
    // Simple analysis of recall answer - in a real app, this would use more sophisticated analysis
    const userAnswer = recallAnswer.toLowerCase();
    const keywords = ["inertia", "force", "motion", "newton", "law", "mass", "acceleration", "action", "reaction"];
    
    let keywordsFound = 0;
    keywords.forEach(word => {
      if (userAnswer.includes(word)) keywordsFound++;
    });
    
    const score = Math.min(100, Math.round((keywordsFound / keywords.length) * 100));
    
    if (score >= 80) {
      setRecallFeedback("Excellent! Your recall shows strong understanding of the concept.");
    } else if (score >= 60) {
      setRecallFeedback("Good work! You've recalled many key points, but there's room for improvement.");
    } else if (score >= 40) {
      setRecallFeedback("You've got some of the basics, but should review this concept more thoroughly.");
    } else {
      setRecallFeedback("Your recall needs improvement. Consider studying this concept again.");
    }
    
    toast({
      title: "Recall submitted",
      description: `Your recall accuracy: ${score}%`,
    });
  };

  const handleResetRecall = () => {
    setRecallAnswer('');
    setIsRecallSubmitted(false);
    setRecallFeedback('');
  };

  // Determine mastery indicator color
  const getMasteryColor = () => {
    if (concept.masteryLevel >= 80) return 'from-emerald-500 to-green-600';
    if (concept.masteryLevel >= 60) return 'from-yellow-400 to-amber-500';
    if (concept.masteryLevel >= 40) return 'from-blue-400 to-blue-600';
    return 'from-gray-400 to-gray-500';
  };

  // Determine difficulty color
  const getDifficultyColor = () => {
    switch (concept.difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Link to="/dashboard/student/concepts" className="flex items-center text-blue-600 mb-4 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
      </Link>
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="flex flex-wrap justify-between items-start gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {concept.subject} &rsaquo; {concept.topic}
              </div>
              <CardTitle className="text-2xl font-bold mt-1 mb-2 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
                {concept.title}
              </CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getDifficultyColor()}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
                
                {concept.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1 fill-white" /> Premium
                  </Badge>
                )}
                
                {concept.isRecommended && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    <BookMarked className="h-3 w-3 mr-1" /> Recommended
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-3">
                {concept.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleBookmark} className={isBookmarked ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/50" : ""}>
                {isBookmarked ? <Bookmark className="h-4 w-4 fill-yellow-400 stroke-yellow-400" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReadAloud}
                className={isReadingAloud ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50" : ""}
              >
                <Volume2 className={`h-4 w-4 ${isReadingAloud ? "text-blue-600" : ""}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Concept progress stats */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <BrainCircuit className="h-3.5 w-3.5" /> Mastery Level
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getMasteryColor()}`}
                      style={{ width: `${concept.masteryLevel}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-sm">{concept.masteryLevel}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Recall Accuracy
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${concept.recallAccuracy}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-sm">{concept.recallAccuracy}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" /> Exam Score
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                      style={{ width: `${concept.examScore}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-sm">{concept.examScore}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Est. Study Time
                </p>
                <p className="font-medium">{concept.estimatedTime}</p>
              </div>
            </div>
          </div>
          
          {/* Concept content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-7 mb-4">
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Learn</span>
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center gap-1">
                <Layers3D className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">3D Models</span>
              </TabsTrigger>
              <TabsTrigger value="formula" className="flex items-center gap-1">
                <FlaskRound className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Formula Lab</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Videos</span>
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Flashcards</span>
              </TabsTrigger>
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <BrainCircuit className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Active Recall</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 md:mr-1" /> <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>
          
            {/* Learn Tab Content */}
            <TabsContent value="learn" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Concept</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-slate dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: concept.content }}
                  />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Take notes as you study this concept..."
                      className="min-h-[120px]"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Notes saved",
                          description: "Your notes have been saved successfully",
                        });
                      }}
                    >
                      Save Notes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {concept.relatedConcepts.map((related, index) => (
                      <Link 
                        key={index} 
                        to={`/dashboard/student/concepts/card/${related.id}`}
                        className="block p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <p className="font-medium">{related.title}</p>
                        <p className="text-sm text-gray-500">{related.subject}</p>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* 3D Models Tab Content */}
            <TabsContent value="3d" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interactive 3D Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Layers3D className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium mb-2">3D Visualization</h3>
                      <p className="text-sm text-gray-500 mb-4">Interact with 3D models to better understand Newton's Laws</p>
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "3D Model Loading",
                          description: "This functionality is coming soon!",
                        });
                      }}>Load 3D Model</Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Available 3D Models</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto p-3">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-md flex items-center justify-center">
                          <Play className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">First Law Demonstration</p>
                          <p className="text-xs text-gray-500">Inertia visualization</p>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto p-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                          <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Second Law Forces</p>
                          <p className="text-xs text-gray-500">F=ma interactive model</p>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="flex items-center justify-start gap-2 h-auto p-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center">
                          <Play className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Action-Reaction</p>
                          <p className="text-xs text-gray-500">Third law visualization</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Formula Lab Tab Content */}
            <TabsContent value="formula" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Formula Laboratory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Key Formulas</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="font-medium">Newton's Second Law</p>
                        <div className="mt-2 flex justify-center">
                          <div className="py-2 px-4 bg-white dark:bg-gray-700 rounded-md text-lg font-medium">
                            F = m × a
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Where F is the net force, m is mass, and a is acceleration
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="font-medium">Weight Formula (derived from Second Law)</p>
                        <div className="mt-2 flex justify-center">
                          <div className="py-2 px-4 bg-white dark:bg-gray-700 rounded-md text-lg font-medium">
                            W = m × g
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Where W is weight, m is mass, and g is the acceleration due to gravity
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Interactive Formula Calculator</h3>
                    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Mass (kg)</label>
                          <input 
                            type="number" 
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                            placeholder="Enter mass" 
                            defaultValue="10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Acceleration (m/s²)</label>
                          <input 
                            type="number" 
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                            placeholder="Enter acceleration" 
                            defaultValue="9.8"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Force (N)</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              className="w-full p-2 border rounded-md bg-blue-50 dark:bg-blue-900/30 font-medium dark:border-gray-600" 
                              placeholder="Result" 
                              defaultValue="98.0"
                              readOnly
                            />
                            <Button size="sm">Calculate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Video Tab Content */}
            <TabsContent value="video" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Video Explanations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-md overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/kKKM8Y-u7ds"
                      className="w-full h-full"
                      title="Newton's Laws of Motion"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Video Sections</h3>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer flex items-center justify-between">
                        <div>
                          <p className="font-medium">Introduction to Newton's Laws</p>
                          <p className="text-xs text-gray-500">Overview of the three laws</p>
                        </div>
                        <span className="text-sm text-gray-500">0:00</span>
                      </div>
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer flex items-center justify-between">
                        <div>
                          <p className="font-medium">First Law of Motion</p>
                          <p className="text-xs text-gray-500">Law of Inertia explained</p>
                        </div>
                        <span className="text-sm text-gray-500">2:15</span>
                      </div>
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer flex items-center justify-between">
                        <div>
                          <p className="font-medium">Second Law of Motion</p>
                          <p className="text-xs text-gray-500">Force and acceleration relationship</p>
                        </div>
                        <span className="text-sm text-gray-500">5:42</span>
                      </div>
                      <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer flex items-center justify-between">
                        <div>
                          <p className="font-medium">Third Law of Motion</p>
                          <p className="text-xs text-gray-500">Action and reaction forces</p>
                        </div>
                        <span className="text-sm text-gray-500">8:30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Flashcards Tab Content */}
            <TabsContent value="flashcards" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interactive Flashcards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/2] max-w-md mx-auto">
                    <div 
                      className={`h-full w-full border rounded-xl shadow-md overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br ${
                        showFlashcardAnswer 
                          ? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' 
                          : 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
                      } transition-all duration-300 transform ${
                        showFlashcardAnswer ? 'rotate-y-180' : ''
                      }`}
                      onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                    >
                      <div className="p-6 text-center">
                        <p className="text-lg font-medium mb-2">
                          {showFlashcardAnswer 
                            ? concept.relatedFlashcards[currentFlashcardIndex].back 
                            : concept.relatedFlashcards[currentFlashcardIndex].front}
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                          {showFlashcardAnswer ? "Click to see question" : "Click to reveal answer"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center mt-6 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevFlashcard}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                      {currentFlashcardIndex + 1} of {concept.relatedFlashcards.length}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={handleNextFlashcard}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t">
                  <div className="flex gap-2">
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        toast({
                          title: "Marked as difficult",
                          description: "We'll show this card more frequently",
                        });
                        handleNextFlashcard();
                      }}
                    >
                      Still Learning
                    </Button>
                    <Button 
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => {
                        toast({
                          title: "Marked as review",
                          description: "We'll review this card later",
                        });
                        handleNextFlashcard();
                      }}
                    >
                      Review Later
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        toast({
                          title: "Marked as mastered",
                          description: "Well done! Keep going with other cards",
                        });
                        handleNextFlashcard();
                      }}
                    >
                      Know It
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Active Recall Tab Content */}
            <TabsContent value="recall" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Recall Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">From Memory</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Without looking at your notes, try to explain Newton's three laws of motion in your own words.
                      This exercise strengthens your understanding and memory of the concept.
                    </p>
                    
                    <Textarea 
                      placeholder="Write your understanding of Newton's three laws here..."
                      className="min-h-[150px]"
                      value={recallAnswer}
                      onChange={(e) => setRecallAnswer(e.target.value)}
                      disabled={isRecallSubmitted}
                    />
                    
                    {isRecallSubmitted && recallFeedback && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <h4 className="font-medium mb-1">Feedback</h4>
                        <p className="text-gray-700 dark:text-gray-300">{recallFeedback}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex gap-2 justify-end">
                      {isRecallSubmitted ? (
                        <Button onClick={handleResetRecall}>Try Again</Button>
                      ) : (
                        <Button onClick={handleRecallSubmit} disabled={!recallAnswer.trim()}>
                          Check Recall
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-2">Voice Recall</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Speak your understanding of the concept to practice active recall verbally. 
                      This helps strengthen different memory pathways.
                    </p>
                    
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          toast({
                            title: "Voice Recording",
                            description: "Voice recording feature is coming soon!",
                          });
                        }}
                      >
                        <Volume2 className="h-4 w-4" />
                        <span>Start Voice Recall</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab Content */}
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Study Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Performance Overview</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Mastery Level</span>
                            <span>{concept.masteryLevel}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getMasteryColor()}`}
                              style={{ width: `${concept.masteryLevel}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Recall Accuracy</span>
                            <span>{concept.recallAccuracy}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                              style={{ width: `${concept.recallAccuracy}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Exam Score</span>
                            <span>{concept.examScore}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                              style={{ width: `${concept.examScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Study Stats</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 divide-y divide-gray-200 dark:divide-gray-700">
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">Time Spent</span>
                            <span className="font-medium">{concept.studyAnalytics.timeSpent} mins</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">Recall Improvement</span>
                            <span className="font-medium">+{concept.studyAnalytics.recallImprovement}%</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">Mastery Gain</span>
                            <span className="font-medium">+{concept.studyAnalytics.masteryGain}%</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">Study Sessions</span>
                            <span className="font-medium">{concept.studyAnalytics.studySessions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Progress Over Time</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 h-[200px] flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-gray-500">Quiz Score History Chart</p>
                          <p className="text-xs text-gray-400 mt-1">Visual chart would be displayed here</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Strengths & Areas to Improve</h3>
                        
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Strong Areas</h4>
                          <ul className="mt-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {concept.studyAnalytics.strongAreas.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Areas to Improve</h4>
                          <ul className="mt-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {concept.studyAnalytics.weakAreas.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="w-full flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Quiz Yourself
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Study Together
              </Button>
            </div>
            
            <Link to={`/dashboard/student/concepts/${id}/formula-lab`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Continue Learning
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
