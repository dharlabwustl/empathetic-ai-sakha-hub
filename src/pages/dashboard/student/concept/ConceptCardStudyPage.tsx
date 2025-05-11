
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Bookmark, 
  Share2, 
  Edit3, 
  PlayCircle, 
  PauseCircle,
  Volume2,
  VolumeX,
  ChevronLeft,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  Video,
  ExternalLink,
  Maximize2,
  Minimize2,
  Link,
  Calculator,
  CheckSquare,
  Star
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// Mock concept data for demonstration
const mockConceptData = {
  id: '1',
  title: 'Newton\'s First Law of Motion',
  subject: 'Physics',
  topic: 'Mechanics',
  difficulty: 'Medium',
  tags: ['NEET', 'JEE', 'Physics', 'Mechanics'],
  marksWeightage: '4-6 marks',
  pyqFrequency: 'High',
  idealTimeToComplete: '15 mins',
  masteryPercentage: 68,
  masteryStatus: 'Needs Revision',
  content: {
    summary: "Newton's First Law states that an object at rest will stay at rest, and an object in motion will stay in motion at constant velocity, unless acted upon by an external force. This is also known as the law of inertia.",
    detailedExplanation: `Newton's First Law of Motion is one of the fundamental principles of classical mechanics. It establishes the relationship between an object's motion and the forces acting on it.

    The law states: 'An object at rest will remain at rest, and an object in motion will continue in motion with a constant velocity (in a straight line), unless acted upon by an external force.'
    
    This property of objects to resist changes in their state of motion is called inertia. The mass of an object is a measure of its inertia - objects with greater mass have greater inertia.
    
    The first law challenges the intuitive notion that an object in motion will naturally come to rest. In the absence of friction and other forces, an object would continue moving indefinitely.
    
    Galileo Galilei first proposed the concept that would later become Newton's First Law. Newton formalized it in his masterwork 'Philosophiæ Naturalis Principia Mathematica' published in 1687.`,
    visualExplanation: {
      url: "/images/newtons-first-law-visual.gif",
      caption: "Visual demonstration of inertia with objects at rest and in motion"
    },
    formulaBox: [
      {
        formula: "∑F = 0",
        meaning: "When the net force on an object is zero, the object will maintain its state of motion",
        example: "When a book is resting on a table, the gravitational force and normal force cancel out, resulting in ∑F = 0"
      },
      {
        formula: "v = constant (when ∑F = 0)",
        meaning: "Velocity remains constant when net force is zero",
        example: "A spacecraft moving through empty space continues at constant velocity"
      }
    ],
    linkedConcepts: [
      { id: "2", title: "Newton's Second Law of Motion", masteryPercentage: 45 },
      { id: "3", title: "Newton's Third Law of Motion", masteryPercentage: 72 },
      { id: "4", title: "Momentum and Impulse", masteryPercentage: 30 },
      { id: "5", title: "Friction", masteryPercentage: 82 }
    ],
    videoExplanation: {
      url: "https://www.youtube.com/embed/CQYELiTtUs8",
      title: "Newton's First Law: Explained Simply",
      duration: "2:35"
    },
    realWorldExamples: [
      {
        title: "Seatbelt Safety",
        description: "When a car suddenly stops, passengers continue moving forward due to inertia. Seatbelts prevent injuries by restraining this forward motion.",
        imageUrl: "/images/seatbelt-example.jpg"
      },
      {
        title: "Tablecloth Trick",
        description: "In the classic tablecloth trick, objects on the table remain in place when the cloth is quickly pulled away because objects at rest tend to stay at rest.",
        imageUrl: "/images/tablecloth-example.jpg"
      },
      {
        title: "Space Travel",
        description: "Spacecraft need only minimal fuel to maintain their velocity in space due to the absence of external forces that would otherwise slow them down.",
        imageUrl: "/images/spacecraft-example.jpg"
      }
    ],
    commonMistakes: [
      "Confusing a state of rest with the absence of forces (rather than balanced forces)",
      "Assuming that constant motion requires a constant force",
      "Ignoring friction when analyzing real-world scenarios",
      "Thinking that heavier objects fall faster than lighter ones (in vacuum)"
    ],
    quickQuiz: [
      {
        question: "An object moving at constant velocity has:",
        options: [
          "A net force acting on it in the direction of motion",
          "No net force acting on it",
          "A net force acting opposite to the direction of motion",
          "Continuously increasing acceleration"
        ],
        correctAnswer: 1,
        explanation: "According to Newton's First Law, an object moving at constant velocity has no net force acting on it (∑F = 0)."
      },
      {
        question: "The property of an object to resist changes in its state of motion is called:",
        options: [
          "Momentum",
          "Inertia",
          "Impulse",
          "Force"
        ],
        correctAnswer: 1,
        explanation: "Inertia is the property of matter that causes it to resist changes in its state of motion. Mass is a measure of inertia."
      },
      {
        question: "A book is at rest on a table. Which of the following statements is true?",
        options: [
          "There are no forces acting on the book",
          "The book has no inertia",
          "The net force on the book is zero",
          "The book is experiencing acceleration"
        ],
        correctAnswer: 2,
        explanation: "The book has gravitational force pulling down and normal force from the table pushing up. These forces balance, making the net force zero."
      }
    ],
    neeyPYQs: [
      {
        year: 2022,
        question: "A ball of mass 'm' is thrown vertically upward with velocity 'v'. The force acting on the ball when it reaches its maximum height is:",
        options: [
          "mg downward",
          "mg upward",
          "Zero",
          "mg(v/g) downward"
        ],
        correctAnswer: 0,
        explanation: "At maximum height, the velocity becomes zero momentarily, but the gravitational force mg continues to act downward."
      },
      {
        year: 2020,
        question: "A body is sliding down an inclined plane with uniform velocity. The force of friction is:",
        options: [
          "Equal to the component of weight parallel to the inclined plane",
          "Less than the component of weight parallel to the inclined plane",
          "Greater than the component of weight parallel to the inclined plane",
          "Zero"
        ],
        correctAnswer: 0,
        explanation: "For uniform velocity, the net force must be zero. So the friction force must equal the component of weight parallel to the plane in magnitude but opposite in direction."
      }
    ]
  },
  mastery: {
    examScore: 3.5,
    recallStrength: 72,
    confidence: 65,
    averageTimePerQuestion: 45, // seconds
    nextRevisionDue: "2025-05-08T10:00:00",
    attemptHistory: [
      { date: "2025-04-20", score: 2.0 },
      { date: "2025-04-25", score: 3.0 },
      { date: "2025-05-02", score: 3.5 }
    ]
  },
  aiInsights: {
    weakLinks: [
      "Understanding of balanced forces in real-world scenarios",
      "Application of the concept in rotational motion"
    ],
    revisionSuggestions: [
      "Review the concept of balanced forces using everyday examples",
      "Practice more problems involving objects on inclined planes"
    ],
    performanceMilestone: "You're in the top 30% for this concept!"
  }
};

const ConceptCardStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept] = useState(mockConceptData); // In a real app, you'd fetch this data
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceReading, setIsVoiceReading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTab, setCurrentTab] = useState("summary");
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi">("en");
  const [confidenceRating, setConfidenceRating] = useState(concept.mastery.confidence);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Effect to cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Concept removed from your saved items" : "Concept saved to your bookmarks",
    });
  };

  // Handle sharing concept
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  // Handle note taking
  const handleAddNote = () => {
    toast({
      title: "Add note",
      description: "Note feature will open here",
    });
  };

  // Toggle voice reading
  const handleToggleVoiceRead = () => {
    if (isVoiceReading) {
      window.speechSynthesis.cancel();
      setIsVoiceReading(false);
      return;
    }

    // Get text to read based on current tab
    let textToRead = "";
    switch (currentTab) {
      case "summary":
        textToRead = concept.content.summary;
        break;
      case "detailedExplanation":
        textToRead = concept.content.detailedExplanation;
        break;
      case "realWorldExamples":
        textToRead = "Real world examples: " + concept.content.realWorldExamples.map(ex => ex.title + ": " + ex.description).join(". ");
        break;
      case "commonMistakes":
        textToRead = "Common mistakes: " + concept.content.commonMistakes.join(". ");
        break;
      default:
        textToRead = concept.content.summary;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = currentLanguage === "en" ? "en-US" : "hi-IN";
    speechSynthesisRef.current = utterance;
    
    utterance.onend = () => {
      setIsVoiceReading(false);
    };
    
    window.speechSynthesis.speak(utterance);
    setIsVoiceReading(true);
  };

  // Toggle language
  const handleToggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "hi" : "en");
    // If currently reading, restart with the new language
    if (isVoiceReading) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        handleToggleVoiceRead();
      }, 100);
    }
  };

  // Toggle full screen
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle quiz answers
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  // Get subject-specific styling
  const getSubjectTheme = () => {
    switch (concept.subject) {
      case 'Biology':
        return {
          headerBg: 'bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30',
          tabBg: 'bg-green-50/80 dark:bg-green-900/20',
          accentColor: 'green',
          icon: <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
        };
      case 'Chemistry':
        return {
          headerBg: 'bg-gradient-to-r from-purple-50 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-800/30',
          tabBg: 'bg-purple-50/80 dark:bg-purple-900/20',
          accentColor: 'purple',
          icon: <Calculator className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        };
      case 'Physics':
      default:
        return {
          headerBg: 'bg-gradient-to-r from-blue-50 to-sky-100 dark:from-blue-900/30 dark:to-sky-800/30',
          tabBg: 'bg-blue-50/80 dark:bg-blue-800/20',
          accentColor: 'blue',
          icon: <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        };
    }
  };

  const subjectTheme = getSubjectTheme();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Keyboard shortcuts
      switch (event.key) {
        case "1":
          if (event.altKey) setCurrentTab("summary");
          break;
        case "2":
          if (event.altKey) setCurrentTab("visualExplanation");
          break;
        case "3":
          if (event.altKey) setCurrentTab("formulaBox");
          break;
        case "4":
          if (event.altKey) setCurrentTab("linkedConcepts");
          break;
        case "5":
          if (event.altKey) setCurrentTab("videoExplanation");
          break;
        case "6":
          if (event.altKey) setCurrentTab("realWorldExamples");
          break;
        case "7":
          if (event.altKey) setCurrentTab("commonMistakes");
          break;
        case "8":
          if (event.altKey) setCurrentTab("quickQuiz");
          break;
        case "9":
          if (event.altKey) setCurrentTab("neetPYQs");
          break;
        case "b":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleBookmark();
          }
          break;
        case "v":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleVoiceRead();
          }
          break;
        case "l":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleLanguage();
          }
          break;
        case "f":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleFullScreen();
          }
          break;
        case "Escape":
          if (isVoiceReading) {
            window.speechSynthesis.cancel();
            setIsVoiceReading(false);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVoiceReading, currentTab, currentLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Concepts
        </Button>
        
        {/* Top Panel - Always Visible */}
        <div className={`rounded-lg shadow-md p-4 mb-6 ${subjectTheme.headerBg}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{concept.title}</h1>
                <Badge variant="outline" className="bg-gray-100/70 text-gray-700 dark:bg-gray-800/70 dark:text-gray-300 ml-2">
                  {concept.difficulty}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100/70 text-blue-700 dark:bg-blue-800/70 dark:text-blue-300">
                  {concept.subject}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-3">
                <span>Topic: <span className="font-medium">{concept.topic}</span></span>
                <span>Marks: <span className="font-medium">{concept.marksWeightage}</span></span>
                <span>PYQ Frequency: <span className="font-medium">{concept.pyqFrequency}</span></span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
              <Button 
                size="sm" 
                variant={isBookmarked ? "default" : "outline"}
                onClick={handleToggleBookmark}
                title="Bookmark (Ctrl+B)"
                className={`bg-${isBookmarked ? `${subjectTheme.accentColor}-600 hover:bg-${subjectTheme.accentColor}-700` : ''}`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span className="ml-1 hidden sm:inline">
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleShare}
                title="Share concept"
              >
                <Share2 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Share</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddNote}
                title="Add note"
              >
                <Edit3 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Note</span>
              </Button>
              
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant={isVoiceReading ? "default" : "outline"}
                  onClick={handleToggleVoiceRead}
                  title="Read aloud (Ctrl+V)"
                  className={isVoiceReading ? `bg-${subjectTheme.accentColor}-600 hover:bg-${subjectTheme.accentColor}-700` : ''}
                >
                  {isVoiceReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggleLanguage}
                  title="Toggle language (Ctrl+L)"
                >
                  <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggleFullScreen}
                  title="Toggle fullscreen (Ctrl+F)"
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mastery progress bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="font-medium">Concept Mastery:</span>
              <div className="flex items-center">
                <span className="mr-2">{concept.masteryPercentage}%</span>
                <Badge 
                  variant="outline" 
                  className={`
                    ${concept.masteryStatus === 'Mastered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${concept.masteryStatus === 'Needs Revision' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                    ${concept.masteryStatus === 'Revise Again' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                  `}
                >
                  {concept.masteryStatus}
                </Badge>
              </div>
            </div>
            <Progress 
              value={concept.masteryPercentage} 
              className={`h-2 ${
                concept.masteryPercentage >= 80 ? 'bg-green-200 dark:bg-green-950' : 
                concept.masteryPercentage >= 50 ? 'bg-amber-200 dark:bg-amber-950' : 
                'bg-red-200 dark:bg-red-950'
              }`} 
              indicatorClassName={`
                ${concept.masteryPercentage >= 80 ? 'bg-green-600 dark:bg-green-500' : 
                  concept.masteryPercentage >= 50 ? 'bg-amber-600 dark:bg-amber-500' : 
                  'bg-red-600 dark:bg-red-500'
                }
              `}
            />
          </div>
        </div>
        
        {/* Main tabbed content */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className={`w-full flex overflow-x-auto p-0 ${subjectTheme.tabBg} border-b`}>
              <TabsTrigger 
                value="summary" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                1. Summary
              </TabsTrigger>
              <TabsTrigger 
                value="visualExplanation" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                2. Visual
              </TabsTrigger>
              <TabsTrigger 
                value="formulaBox" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <Calculator className="h-4 w-4 mr-2" />
                3. Formulas
              </TabsTrigger>
              <TabsTrigger 
                value="linkedConcepts" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <Link className="h-4 w-4 mr-2" />
                4. Linked
              </TabsTrigger>
              <TabsTrigger 
                value="videoExplanation" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <Video className="h-4 w-4 mr-2" />
                5. Video
              </TabsTrigger>
              <TabsTrigger 
                value="realWorldExamples" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                6. Examples
              </TabsTrigger>
              <TabsTrigger 
                value="commonMistakes" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                7. Mistakes
              </TabsTrigger>
              <TabsTrigger 
                value="quickQuiz" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                8. Quiz
              </TabsTrigger>
              <TabsTrigger 
                value="neetPYQs" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none"
              >
                <Star className="h-4 w-4 mr-2" />
                9. NEET PYQs
              </TabsTrigger>
            </TabsList>
            
            {/* Tab 1: Concept Summary */}
            <TabsContent value="summary" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Concept Summary</h3>
                <p className="text-gray-700 dark:text-gray-300">{concept.content.summary}</p>
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-3">Key Points:</h4>
                  <ul className="space-y-2">
                    <li>Objects at rest stay at rest until acted upon by an external force</li>
                    <li>Objects in motion stay in motion at constant velocity until acted upon by an external force</li>
                    <li>Inertia is the property of matter that resists changes in motion</li>
                    <li>The more mass an object has, the greater its inertia</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={handleToggleVoiceRead}
                  className={`${isVoiceReading ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40'}`}
                  variant="outline"
                >
                  {isVoiceReading ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                  {isVoiceReading ? 'Stop Reading' : `Read Aloud (${currentLanguage.toUpperCase()})`}
                </Button>
              </div>
            </TabsContent>
            
            {/* Tab 2: Visual Explanation */}
            <TabsContent value="visualExplanation" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Visual Explanation</h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <img 
                    src="https://static.vecteezy.com/system/resources/previews/013/117/143/original/newton-s-first-law-of-motion-three-cases-of-inertia-vector.jpg" 
                    alt="Visual explanation of Newton's First Law" 
                    className="mx-auto max-h-80 object-contain rounded"
                  />
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {concept.content.visualExplanation.caption}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2">Visual Analysis:</h4>
                  <p>
                    The animation above illustrates three key scenarios demonstrating Newton's First Law:
                  </p>
                  <ol className="mt-3 space-y-2">
                    <li><strong>Object at rest:</strong> The ball on the left remains stationary when no external force acts on it.</li>
                    <li><strong>Object in uniform motion:</strong> The middle ball continues moving at constant velocity in the absence of external forces.</li>
                    <li><strong>Force application:</strong> The ball on the right changes its state of motion when an external force is applied.</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 3: Formula Box */}
            <TabsContent value="formulaBox" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Formula Box</h3>
                <div className="space-y-6">
                  {concept.content.formulaBox.map((item, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                      <div className="text-center mb-3">
                        <span className="text-lg font-bold bg-white dark:bg-gray-800 px-4 py-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                          {item.formula}
                        </span>
                      </div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Meaning:</p>
                      <p className="mb-3 text-gray-600 dark:text-gray-400">{item.meaning}</p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Example:</p>
                      <p className="text-gray-600 dark:text-gray-400">{item.example}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/40 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2" />
                    Physical Interpretation
                  </h4>
                  <p>
                    While Newton's First Law doesn't have a complex mathematical formula like the Second Law (F=ma), 
                    it establishes the fundamental condition where ∑F = 0 results in constant velocity (including v = 0 for objects at rest).
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 4: Linked Concepts */}
            <TabsContent value="linkedConcepts" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Linked Concepts</h3>
                <div className="space-y-4">
                  {concept.content.linkedConcepts.map((related, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
                      onClick={() => navigate(`/dashboard/student/concepts/${related.id}/study`)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 cursor-pointer hover:underline">
                          {related.title}
                        </h4>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Mastery:</span>
                          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                related.masteryPercentage >= 80 ? 'bg-green-500' : 
                                related.masteryPercentage >= 50 ? 'bg-amber-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${related.masteryPercentage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {related.masteryPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-3">Concept Map</h4>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 flex justify-center min-h-[200px]">
                    <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center justify-center">
                      <Link className="h-10 w-10 mb-2" />
                      <p>Interactive concept map would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 5: Video Explanation */}
            <TabsContent value="videoExplanation" className="m-0 bg-white dark:bg-gray-800">
              <div className="aspect-video w-full">
                <iframe
                  ref={videoRef}
                  src={concept.content.videoExplanation.url}
                  title="Video explanation"
                  className="w-full h-[400px]"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{concept.content.videoExplanation.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This video explains Newton's First Law of Motion with visual demonstrations and examples to help solidify your understanding of the concept.
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-lg mb-2">Key Timestamps</h4>
                  <div className="space-y-2">
                    <div className="flex">
                      <Badge variant="outline" className="mr-2">0:45</Badge>
                      <span>Definition of Newton's First Law</span>
                    </div>
                    <div className="flex">
                      <Badge variant="outline" className="mr-2">2:30</Badge>
                      <span>Demonstration with everyday examples</span>
                    </div>
                    <div className="flex">
                      <Badge variant="outline" className="mr-2">5:15</Badge>
                      <span>Mathematical representation and problem solving</span>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Duration: {concept.content.videoExplanation.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 6: Real-world Examples */}
            <TabsContent value="realWorldExamples" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Real-world Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concept.content.realWorldExamples.map((example, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <p className="text-gray-400 dark:text-gray-500">Example image</p>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">{example.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{example.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-3">Physics-Specific Applications</h4>
                  <p className="mb-4">
                    For physics concepts like Newton's First Law, it's important to understand how they're applied in various scenarios:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <strong>Engineering:</strong> When designing vehicles, engineers account for inertia in crash safety systems.
                    </li>
                    <li>
                      <strong>Space Exploration:</strong> Spacecraft utilize Newton's First Law to minimize fuel consumption once they reach desired velocity.
                    </li>
                    <li>
                      <strong>Sports Science:</strong> Athletes use principles of inertia when optimizing movements in sports like gymnastics or diving.
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 7: Common Mistakes */}
            <TabsContent value="commonMistakes" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
                <ul className="space-y-4">
                  {concept.content.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-lg p-4 flex">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300 mr-3 mt-0.5 flex-shrink-0">
                        ✕
                      </span>
                      <div>
                        <p className="text-red-800 dark:text-red-300">{mistake}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">NEET Exam Traps</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Questions may mix up concepts of balanced forces vs. no forces acting on an object</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Beware of questions about objects on inclined planes with friction (multiple forces acting)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Questions might confuse Newton's First Law with the Second or Third Law</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 8: MCQ Flash Quiz */}
            <TabsContent value="quickQuiz" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-6">MCQ Flash Quiz</h3>
                <div className="space-y-8">
                  {concept.content.quickQuiz.map((quiz, qIdx) => (
                    <div key={qIdx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <h4 className="text-lg font-medium mb-4">Question {qIdx + 1}: {quiz.question}</h4>
                      <div className="space-y-3">
                        {quiz.options.map((option, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`flex items-center p-3 rounded-lg cursor-pointer border transition-colors ${
                              quizAnswers[qIdx] === undefined ? 
                                'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80' : 
                                quizAnswers[qIdx] === oIdx ? 
                                  (quiz.correctAnswer === oIdx ? 
                                    'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 
                                    'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20') : 
                                  quiz.correctAnswer === oIdx ? 
                                    'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 
                                    'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                            }`}
                            onClick={() => quizAnswers[qIdx] === undefined && handleQuizAnswer(qIdx, oIdx)}
                          >
                            <div className={`h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                              quizAnswers[qIdx] === oIdx ? 
                                (quiz.correctAnswer === oIdx ? 
                                  'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600' : 
                                  'bg-red-500 border-red-500 dark:bg-red-600 dark:border-red-600') : 
                                quiz.correctAnswer === oIdx && quizAnswers[qIdx] !== undefined ? 
                                  'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600' : 
                                  'border-gray-400 dark:border-gray-500'
                            }`}>
                              {quizAnswers[qIdx] === oIdx && (
                                quiz.correctAnswer === oIdx ? 
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg> : 
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              )}
                              {quiz.correctAnswer === oIdx && quizAnswers[qIdx] !== undefined && quizAnswers[qIdx] !== oIdx && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className={`${
                              quizAnswers[qIdx] !== undefined && (
                                (quizAnswers[qIdx] === oIdx && quiz.correctAnswer === oIdx) || 
                                quiz.correctAnswer === oIdx
                              ) ? 'font-medium text-green-700 dark:text-green-400' : 
                              quizAnswers[qIdx] === oIdx && quiz.correctAnswer !== oIdx ? 'font-medium text-red-700 dark:text-red-400' : ''
                            }`}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {quizAnswers[qIdx] !== undefined && (
                        <div className={`mt-4 p-3 rounded-lg ${
                          quizAnswers[qIdx] === quiz.correctAnswer ? 
                            'bg-green-50 border border-green-100 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : 
                            'bg-red-50 border border-red-100 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                        }`}>
                          <p className="font-medium">
                            {quizAnswers[qIdx] === quiz.correctAnswer ? 'Correct!' : 'Incorrect!'}
                          </p>
                          <p className="mt-1">{quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setQuizAnswers([])}
                    disabled={quizAnswers.length === 0}
                  >
                    Reset Quiz
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab 9: NEET PYQs */}
            <TabsContent value="neetPYQs" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">NEET Previous Year Questions</h3>
                <div className="space-y-8">
                  {concept.content.neeyPYQs.map((pyq, pyqIdx) => (
                    <div key={pyqIdx} className="border border-blue-200 dark:border-blue-800 rounded-lg p-5 bg-blue-50/50 dark:bg-blue-900/10">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-medium">NEET {pyq.year}</h4>
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          4 Marks
                        </Badge>
                      </div>
                      <p className="mb-4">{pyq.question}</p>
                      <div className="space-y-3">
                        {pyq.options.map((option, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`p-3 rounded-lg border ${
                              pyq.correctAnswer === oIdx ? 
                                'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 
                                'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                                pyq.correctAnswer === oIdx ? 
                                  'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400' : 
                                  'border-gray-400 dark:border-gray-500'
                              }`}>
                                {pyq.correctAnswer === oIdx && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className={pyq.correctAnswer === oIdx ? 'font-medium text-green-800 dark:text-green-400' : ''}>
                                {option}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Explanation:</p>
                        <p className="text-gray-600 dark:text-gray-400">{pyq.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-3">NEET Exam Pattern Analysis</h4>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 rounded-lg p-4">
                    <p className="mb-3">
                      This concept has appeared in NEET exams with the following pattern:
                    </p>
                    <ul className="space-y-2">
                      <li>Frequency: 1-2 questions per year</li>
                      <li>Question Type: Direct application or combined with other laws of motion</li>
                      <li>Difficulty: Medium to Hard</li>
                      <li>Common Format: Problem-based questions requiring identification of forces and their effects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Mastery & Recall Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Mastery & Recall Tracker</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Exam Score</span>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">{concept.mastery.examScore}</span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">/5</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Recall Strength</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{concept.mastery.recallStrength}%</span>
                  <Progress 
                    value={concept.mastery.recallStrength} 
                    className="h-2 flex-1"
                    indicatorClassName={`${
                      concept.mastery.recallStrength >= 80 ? 'bg-green-500' : 
                      concept.mastery.recallStrength >= 50 ? 'bg-amber-500' : 
                      'bg-red-500'
                    }`}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Time per MCQ</span>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">{concept.mastery.averageTimePerQuestion}</span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">sec</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Next Revision</span>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-medium">Due in 3 days</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h4 className="font-medium text-lg mb-3">Attempt History</h4>
                <div className="bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-48 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <p>Performance graph would appear here</p>
                    <p className="text-sm mt-1">Showing quiz attempts over time</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-3">Confidence Check</h4>
                <div className="bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    How confident are you with this concept?
                  </p>
                  <Slider 
                    value={[confidenceRating]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setConfidenceRating(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Not at all</span>
                    <span>Very confident</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Confidence updated",
                          description: "Your confidence level has been saved",
                        });
                      }}
                    >
                      Save Rating
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
              AI Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-lg p-4">
                  <h4 className="font-medium text-lg text-red-800 dark:text-red-300 mb-2">Weak Link Detector</h4>
                  <ul className="space-y-2 text-red-700 dark:text-red-200">
                    {concept.aiInsights.weakLinks.map((weakLink, idx) => (
                      <li key={idx} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{weakLink}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 rounded-lg p-4">
                  <h4 className="font-medium text-lg text-green-800 dark:text-green-300 mb-2">Suggested Revision Plan</h4>
                  <ul className="space-y-2 text-green-700 dark:text-green-200">
                    {concept.aiInsights.revisionSuggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 rounded-lg p-4 h-full">
                  <h4 className="font-medium text-lg text-purple-800 dark:text-purple-300 mb-4">Topic-Level Analytics</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Understanding of Core Concept</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-2">
                        <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application in Complex Problems</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-2">
                        <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Recall</span>
                        <span>82%</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-2">
                        <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-800/40">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" />
                      <p className="font-medium">{concept.aiInsights.performanceMilestone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
