
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bookmark, BookmarkCheck, Volume, VolumeX, Star, StarHalf, Clock, 
  BarChart4, Link2, FileText, FileVideo, FileImage, Lightbulb, 
  BookOpen, AlertTriangle, ExternalLink, CheckCircle, Brain,
  ArrowRight, PlayCircle, BookCheck, BookText, ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration - in a real app, this would come from an API
const conceptData = {
  id: "c123",
  title: "Osmosis in Plant Cells",
  description: "The process by which water molecules move from an area of higher water potential to an area of lower water potential across a partially permeable membrane.",
  subject: "Biology",
  difficulty: "medium",
  masteryPercent: 65,
  isBookmarked: false,
  status: "in-progress",
  lastStudied: "2023-05-04",
  voiceLanguage: "en", // 'en' for English, 'hi' for Hindi
  
  content: {
    conceptSummary: {
      text: "Osmosis is the passive movement of water molecules across a semi-permeable membrane from a region of lower solute concentration to a region of higher solute concentration. In plant cells, osmosis plays a crucial role in maintaining turgor pressure, which provides structural support to plants. When a plant cell is placed in a hypotonic solution (more water outside), water moves into the cell, causing it to become turgid. In a hypertonic solution (less water outside), water moves out of the cell, causing plasmolysis where the cell membrane pulls away from the cell wall.",
      keyPoints: [
        "Passive transport process (no energy required)",
        "Movement from lower to higher solute concentration",
        "Important for maintaining turgor pressure in plants",
        "Affected by external environment conditions"
      ]
    },
    
    visualExplanation: {
      images: [
        "/lovable-uploads/c3eac5b2-c8be-4622-8c94-681e9afdf888.png"
      ],
      caption: "Diagram showing osmosis process in plant cells: hypotonic, isotonic, and hypertonic conditions"
    },
    
    formulaBox: {
      formulas: [
        { 
          formula: "Ψ = Ψs + Ψp", 
          description: "Water potential (Ψ) equals solute potential (Ψs) plus pressure potential (Ψp)" 
        },
        { 
          formula: "Ψs = -iCRT", 
          description: "Solute potential calculation where i is ionization constant, C is molar concentration, R is gas constant, and T is temperature" 
        }
      ]
    },
    
    linkedConcepts: [
      { id: "c124", title: "Diffusion", masteryPercent: 75 },
      { id: "c125", title: "Active Transport", masteryPercent: 40 },
      { id: "c126", title: "Plasmolysis", masteryPercent: 55 },
      { id: "c127", title: "Cell Wall Structure", masteryPercent: 60 }
    ],
    
    videoExplanation: {
      videoUrl: "https://www.youtube.com/embed/SDGfOg9Tav8",
      duration: "3:42",
      title: "Osmosis in Plant Cells Explained"
    },
    
    realWorldExamples: [
      "Wilting of plants during drought conditions as cells lose water through osmosis",
      "Food preservation using salt or sugar which creates a hypertonic environment, preventing bacterial growth",
      "Use of fertilizers which can cause osmotic stress if applied in high concentrations",
      "Kidney dialysis machines use osmosis principles to filter blood"
    ],
    
    commonMistakes: [
      "Confusing osmosis with diffusion (osmosis is specifically the movement of water molecules)",
      "Thinking osmosis requires energy (it's a passive process)",
      "Incorrectly identifying hypertonic vs hypotonic solutions",
      "Forgetting that water moves from high water potential to low water potential"
    ],
    
    mcqQuiz: [
      {
        question: "What happens to a plant cell placed in a hypertonic solution?",
        options: [
          "The cell gains water and becomes turgid",
          "The cell loses water and undergoes plasmolysis",
          "The cell maintains its water balance",
          "The cell wall breaks down"
        ],
        correctAnswer: 1,
        explanation: "In a hypertonic solution, the water concentration is higher inside the cell than outside, causing water to move out of the cell, resulting in plasmolysis."
      },
      {
        question: "Osmosis is defined as the movement of:",
        options: [
          "Solute particles from high to low concentration",
          "Water molecules from high to low solute concentration",
          "Both solute and water molecules across a membrane",
          "Ions against their concentration gradient"
        ],
        correctAnswer: 1,
        explanation: "Osmosis specifically refers to the passive movement of water molecules from a region of lower solute concentration (higher water potential) to a region of higher solute concentration (lower water potential)."
      },
      {
        question: "Which of the following factors does NOT affect the rate of osmosis in plant cells?",
        options: [
          "Temperature",
          "Concentration gradient",
          "Light intensity",
          "Surface area of the membrane"
        ],
        correctAnswer: 2,
        explanation: "Light intensity does not directly affect osmosis. The main factors are temperature, concentration gradient, pressure, and surface area of the membrane."
      }
    ],
    
    seenInNEET: [
      {
        year: 2022,
        question: "The movement of water molecules through a semi-permeable membrane is affected by:",
        relevance: "Direct application of osmosis concept"
      },
      {
        year: 2020,
        question: "Guard cells regulate the opening and closing of stomata due to changes in their:",
        relevance: "Application of turgor pressure concept related to osmosis"
      }
    ]
  },
  
  masteryData: {
    examScore: 70,
    recallStrength: 65,
    confidenceLevel: 60,
    averageTimePerQuestion: 45, // seconds
    nextRevisionDue: "2023-05-10",
    attemptsHistory: [
      { date: "2023-04-10", score: 40 },
      { date: "2023-04-20", score: 55 },
      { date: "2023-05-01", score: 70 }
    ],
    status: "Needs Revision"
  },
  
  aiInsights: {
    weakLinks: [
      "Understanding of water potential calculation",
      "Application in hypertonic environments"
    ],
    suggestedRevision: "Focus on numericals involving water potential and practice more questions on hypertonic conditions",
    performance: "You're in the top 30% for this concept, but improving formula application could boost your score significantly."
  }
};

// Subject-specific additional content
const subjectSpecificContent = {
  Biology: {
    visualMnemonics: {
      text: "Think of a plant cell as a water balloon inside a rigid box. The water (via osmosis) fills the balloon, pushing it against the box (cell wall) creating turgor pressure.",
      image: "/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png"
    },
    oneLineExamFacts: [
      "Plasmolysis is irreversible in prolonged hypertonic conditions",
      "Guard cells use osmosis for stomatal movements",
      "Root hairs maximize surface area for water uptake via osmosis",
      "Aquaporins are specialized channel proteins that facilitate osmosis"
    ],
    highYield: true
  },
  Chemistry: {
    reactionMechanisms: [
      {
        name: "Osmotic Pressure Effect",
        equation: "π = iCRT",
        explanation: "The osmotic pressure (π) depends on solute concentration (C), temperature (T), and the gas constant (R)"
      }
    ],
    pyqAnalysis: "15% of NEET chemistry questions test osmosis principles indirectly through solutions and colligative properties."
  },
  Physics: {
    animations: {
      url: "https://cdn.example.com/osmosis-animation.gif",
      description: "Animation showing water molecule movement across membrane"
    },
    realLifeApplications: [
      "Reverse osmosis in water purification systems",
      "Osmosis-powered electrical generators in development"
    ],
    oneLineDerivations: [
      "The osmotic pressure equation π = iCRT can be derived from van't Hoff's work on colligative properties"
    ]
  }
};

interface ConceptCardProps {
  id: string;
  title: string;
  masteryPercent: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ id, title, masteryPercent }) => {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{title}</h4>
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Mastery</span>
          <span>{masteryPercent}%</span>
        </div>
        <Progress value={masteryPercent} className="h-1.5" />
        <Button variant="ghost" size="sm" className="w-full mt-3 text-blue-600">
          <BookOpen className="h-3.5 w-3.5 mr-1" /> Study
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

const EnhancedConceptLandingPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept] = useState(conceptData); // In a real app, fetch concept by conceptId
  const [activeTab, setActiveTab] = useState("summary");
  const [isBookmarked, setIsBookmarked] = useState(concept.isBookmarked);
  const [voiceLanguage, setVoiceLanguage] = useState(concept.voiceLanguage);
  const [confidenceLevel, setConfidenceLevel] = useState(concept.masteryData.confidenceLevel);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Get subject-specific content based on the concept's subject
  const specificContent = subjectSpecificContent[concept.subject as keyof typeof subjectSpecificContent] || {};

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your saved items" : "Concept saved for later revision",
    });
  };
  
  // Handle voice language toggle
  const handleVoiceLanguageToggle = () => {
    const newLanguage = voiceLanguage === 'en' ? 'hi' : 'en';
    setVoiceLanguage(newLanguage);
    toast({
      title: `Voice language changed to ${newLanguage === 'en' ? 'English' : 'Hindi'}`,
      description: "The read-aloud feature will now use the selected language",
    });
  };
  
  // Handle read aloud functionality
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
        return;
      }
      
      // Get text to read based on active tab
      let textToRead = "";
      switch (activeTab) {
        case "summary":
          textToRead = concept.content.conceptSummary.text;
          break;
        case "examples":
          textToRead = "Real world examples: " + concept.content.realWorldExamples.join(". ");
          break;
        case "mistakes":
          textToRead = "Common mistakes: " + concept.content.commonMistakes.join(". ");
          break;
        default:
          textToRead = concept.content.conceptSummary.text;
      }
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = voiceLanguage === 'en' ? 'en-US' : 'hi-IN';
      
      utterance.onend = () => {
        setIsReadingAloud(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech functionality",
        variant: "destructive"
      });
    }
  };
  
  // Handle MCQ answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowAnswer(true);
  };
  
  // Handle next MCQ question
  const handleNextQuestion = () => {
    if (currentMCQIndex < concept.content.mcqQuiz.length - 1) {
      setCurrentMCQIndex(currentMCQIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  // Get mastery color
  const getMasteryColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-4 pl-1 hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Concepts
      </Button>
      
      {/* Top Panel - Always Visible */}
      <Card className="mb-6 overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <CardTitle className="text-2xl mb-1">{concept.title}</CardTitle>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={`capitalize font-normal ${getDifficultyColor(concept.difficulty)}`}>
                  {concept.difficulty} difficulty
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-normal">
                  {concept.subject}
                </Badge>
                {concept.subject === 'Biology' && subjectSpecificContent.Biology.highYield && (
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300 font-normal">
                    High Yield
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={isBookmarked ? "default" : "outline"} 
                      size="sm"
                      onClick={handleBookmarkToggle}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isBookmarked ? "Remove from bookmarks" : "Save for later revision"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReadAloud}
                    >
                      {isReadingAloud ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume className="h-4 w-4 mr-2" />}
                      {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Listen to the content read aloud
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1">
                <Label htmlFor="voice-toggle" className="text-sm">EN</Label>
                <Switch 
                  id="voice-toggle" 
                  checked={voiceLanguage === 'hi'}
                  onCheckedChange={handleVoiceLanguageToggle}
                />
                <Label htmlFor="voice-toggle" className="text-sm">HI</Label>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Mastery Level</span>
              <span className="text-sm font-medium">{concept.masteryPercent}%</span>
            </div>
            <Progress 
              value={concept.masteryPercent} 
              className={`h-2 ${getMasteryColor(concept.masteryPercent)}`} 
            />
          </div>
        </CardHeader>
      </Card>
      
      {/* Main Content Area with Learning Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Tabs */}
          <Card className="overflow-hidden border-0 shadow-md">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="p-0 bg-gray-100 flex w-full overflow-x-auto">
                <TabsTrigger value="summary" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  Concept Summary
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <FileImage className="h-4 w-4 mr-2" />
                  Visual Explanation
                </TabsTrigger>
                <TabsTrigger value="formula" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  Formula Box
                </TabsTrigger>
                <TabsTrigger value="linked" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <Link2 className="h-4 w-4 mr-2" />
                  Linked Concepts
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <FileVideo className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
              </TabsList>
              <TabsList className="p-0 bg-gray-100 flex w-full overflow-x-auto">
                <TabsTrigger value="examples" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Real-World Examples
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Common Mistakes
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  MCQ Quiz
                </TabsTrigger>
                <TabsTrigger value="neet" className="flex-1 data-[state=active]:bg-white rounded-none py-3">
                  <BookText className="h-4 w-4 mr-2" />
                  Seen in NEET
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <TabsContent value="summary" className="m-0 p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Concept Summary</h3>
                  <p className="mb-4">{concept.content.conceptSummary.text}</p>
                  
                  <h4 className="text-lg font-medium mb-2">Key Points</h4>
                  <ul className="space-y-2">
                    {concept.content.conceptSummary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-baseline">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Subject-specific content for Biology */}
                  {concept.subject === 'Biology' && (
                    <div className="mt-6 bg-green-50 p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                        Biology Visual Mnemonic
                      </h4>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <img 
                          src={subjectSpecificContent.Biology.visualMnemonics.image} 
                          alt="Visual mnemonic" 
                          className="w-full md:w-1/3 rounded-lg"
                        />
                        <p className="text-green-800">{subjectSpecificContent.Biology.visualMnemonics.text}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* One-line exam facts for Biology */}
                  {concept.subject === 'Biology' && (
                    <div className="mt-4">
                      <h4 className="text-lg font-medium mb-2">One-line Exam Facts</h4>
                      <ul className="space-y-2">
                        {subjectSpecificContent.Biology.oneLineExamFacts.map((fact, index) => (
                          <li key={index} className="flex items-baseline">
                            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="visual" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Visual Explanation</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  {concept.content.visualExplanation.images.map((image, index) => (
                    <div key={index}>
                      <img 
                        src={image} 
                        alt={concept.title} 
                        className="mx-auto max-h-80 mb-4"
                      />
                    </div>
                  ))}
                  <p className="text-gray-600 italic">{concept.content.visualExplanation.caption}</p>
                </div>
                
                {/* Physics-specific animations */}
                {concept.subject === 'Physics' && subjectSpecificContent.Physics.animations && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-2">Animation</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <img 
                        src={subjectSpecificContent.Physics.animations.url} 
                        alt="Animation" 
                        className="mx-auto max-h-60"
                      />
                      <p className="text-gray-600 italic mt-2">{subjectSpecificContent.Physics.animations.description}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="formula" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Formula Box</h3>
                <div className="space-y-4">
                  {concept.content.formulaBox.formulas.map((formula, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center font-mono text-xl mb-2">{formula.formula}</div>
                      <p className="text-center text-gray-600">{formula.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Chemistry-specific reaction mechanisms */}
                {concept.subject === 'Chemistry' && subjectSpecificContent.Chemistry.reactionMechanisms && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">Reaction Mechanisms</h4>
                    <div className="space-y-4">
                      {subjectSpecificContent.Chemistry.reactionMechanisms.map((reaction, index) => (
                        <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">{reaction.name}</h5>
                          <div className="text-center font-mono text-lg mb-2">{reaction.equation}</div>
                          <p className="text-center text-gray-600">{reaction.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Physics-specific one-liner derivations */}
                {concept.subject === 'Physics' && subjectSpecificContent.Physics.oneLineDerivations && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">One-liner Derivations</h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {subjectSpecificContent.Physics.oneLineDerivations.map((derivation, index) => (
                          <li key={index} className="text-gray-700">{derivation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="linked" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Linked Concepts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.content.linkedConcepts.map((linkedConcept) => (
                    <div 
                      key={linkedConcept.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/dashboard/student/concepts/${linkedConcept.id}`)}
                    >
                      <ConceptCard 
                        id={linkedConcept.id} 
                        title={linkedConcept.title} 
                        masteryPercent={linkedConcept.masteryPercent} 
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="m-0 p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src={concept.content.videoExplanation.videoUrl}
                    title={concept.content.videoExplanation.title}
                    className="w-full h-[400px]"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{concept.content.videoExplanation.title}</h3>
                    <Badge variant="outline">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {concept.content.videoExplanation.duration}
                    </Badge>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Timestamps</h4>
                    <ul className="space-y-2">
                      <li className="flex">
                        <Badge variant="outline" className="mr-2">0:45</Badge>
                        <span>Definition of {concept.title}</span>
                      </li>
                      <li className="flex">
                        <Badge variant="outline" className="mr-2">1:30</Badge>
                        <span>Mechanism explained with animation</span>
                      </li>
                      <li className="flex">
                        <Badge variant="outline" className="mr-2">2:15</Badge>
                        <span>Real-world applications and examples</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Real-World Examples</h3>
                <div className="space-y-3">
                  {concept.content.realWorldExamples.map((example, index) => (
                    <div key={index} className="flex p-3 bg-green-50 rounded-lg">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-200 text-green-800 mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
                
                {/* Physics-specific real life applications */}
                {concept.subject === 'Physics' && subjectSpecificContent.Physics.realLifeApplications && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">Additional Applications in Physics</h4>
                    <div className="space-y-3">
                      {subjectSpecificContent.Physics.realLifeApplications.map((application, index) => (
                        <div key={index} className="flex p-3 bg-blue-50 rounded-lg">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-200 text-blue-800 mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="mistakes" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
                <div className="space-y-3">
                  {concept.content.commonMistakes.map((mistake, index) => (
                    <div key={index} className="flex p-3 bg-red-50 rounded-lg">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-200 text-red-800 mr-3 mt-0.5 flex-shrink-0">
                        ✕
                      </span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="quiz" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">MCQ Flash Quiz</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">
                    Question {currentMCQIndex + 1} of {concept.content.mcqQuiz.length}
                  </h4>
                  
                  <p className="mb-4">{concept.content.mcqQuiz[currentMCQIndex].question}</p>
                  
                  <div className="space-y-2">
                    {concept.content.mcqQuiz[currentMCQIndex].options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          selectedAnswer === optionIndex 
                            ? optionIndex === concept.content.mcqQuiz[currentMCQIndex].correctAnswer
                              ? 'bg-green-100 border-green-300'
                              : 'bg-red-100 border-red-300'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => handleAnswerSelect(optionIndex)}
                      >
                        <div className="flex">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 mr-3 flex-shrink-0">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {showAnswer && (
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <h5 className="font-medium mb-2">Explanation</h5>
                      <p>{concept.content.mcqQuiz[currentMCQIndex].explanation}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleNextQuestion}
                      disabled={!showAnswer || currentMCQIndex >= concept.content.mcqQuiz.length - 1}
                    >
                      Next Question
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="neet" className="m-0 p-6">
                <h3 className="text-xl font-semibold mb-4">Seen in NEET</h3>
                
                <div className="space-y-4">
                  {concept.content.seenInNEET.map((pyq, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 py-3">
                        <div className="flex justify-between">
                          <Badge variant="secondary">NEET {pyq.year}</Badge>
                          <Badge variant="outline">High Relevance</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="font-medium mb-2">{pyq.question}</p>
                        <p className="text-sm text-gray-600">{pyq.relevance}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Chemistry-specific PYQ analysis */}
                {concept.subject === 'Chemistry' && subjectSpecificContent.Chemistry.pyqAnalysis && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium flex items-center mb-2">
                      <BarChart4 className="h-5 w-5 mr-2 text-yellow-600" />
                      PYQ Analysis
                    </h4>
                    <p className="text-gray-700">{subjectSpecificContent.Chemistry.pyqAnalysis}</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* AI Insights Section */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 py-4">
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium flex items-center text-red-800">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Weak Link Detector
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    {concept.aiInsights.weakLinks.map((weakLink, index) => (
                      <li key={index} className="flex items-baseline">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                        <span>{weakLink}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium flex items-center text-green-800">
                    <Brain className="h-4 w-4 mr-2" />
                    Suggested Revision Plan
                  </h4>
                  <p className="mt-2 text-sm">{concept.aiInsights.suggestedRevision}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium flex items-center text-blue-800">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Performance Analytics
                </h4>
                <p className="mt-2 text-sm">{concept.aiInsights.performance}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Mastery & Recall Side Panel */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 py-4">
              <CardTitle className="text-lg">Mastery & Recall</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Exam Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Exam Score</span>
                    <span className="text-sm font-semibold">{concept.masteryData.examScore}%</span>
                  </div>
                  <Progress 
                    value={concept.masteryData.examScore} 
                    className={`h-2 ${getMasteryColor(concept.masteryData.examScore)}`} 
                  />
                </div>
                
                {/* Recall Strength */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Recall Strength</span>
                    <span className="text-sm font-semibold">{concept.masteryData.recallStrength}%</span>
                  </div>
                  <Progress 
                    value={concept.masteryData.recallStrength} 
                    className={`h-2 ${getMasteryColor(concept.masteryData.recallStrength)}`} 
                  />
                </div>
                
                {/* Confidence Level */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-sm font-semibold">{confidenceLevel}%</span>
                  </div>
                  <Slider 
                    value={[confidenceLevel]} 
                    onValueChange={(value) => setConfidenceLevel(value[0])}
                    min={0}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
                
                {/* Average Time per Question */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="text-sm">Average Time/Question</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                    {concept.masteryData.averageTimePerQuestion} sec
                  </Badge>
                </div>
                
                {/* Next Revision Due */}
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm">Next Revision Due</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {new Date(concept.masteryData.nextRevisionDue).toLocaleDateString()}
                  </Badge>
                </div>
                
                {/* Concept Status */}
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm">Concept Status</span>
                  </div>
                  <Badge 
                    className={
                      concept.masteryData.status === 'Mastered' ? 'bg-green-100 text-green-800 border-green-300' :
                      concept.masteryData.status === 'Needs Revision' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      'bg-red-100 text-red-800 border-red-300'
                    }
                  >
                    {concept.masteryData.status}
                  </Badge>
                </div>
                
                {/* Attempts History */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <BarChart4 className="h-4 w-4 mr-1" />
                    Progress over Time
                  </h4>
                  <div className="h-36 bg-gray-50 rounded-lg">
                    {/* This would be a chart in production */}
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="relative w-full h-4/5">
                        {/* Simple bar chart rendering */}
                        <div className="absolute bottom-0 left-0 w-full h-full flex justify-between items-end">
                          {concept.masteryData.attemptsHistory.map((attempt, idx) => (
                            <div 
                              key={idx} 
                              className="w-1/4 mx-1"
                              title={`${attempt.date}: ${attempt.score}%`}
                            >
                              <div 
                                className={`w-full rounded-t-sm ${getMasteryColor(attempt.score)}`}
                                style={{ height: `${attempt.score}%` }}
                              ></div>
                              <div className="text-xs text-center mt-1">{new Date(attempt.date).toLocaleDateString().split('/')[1]}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Practice More Section */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 py-4">
              <CardTitle className="text-lg">Practice More</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Practice More Questions
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <BookText className="h-4 w-4 mr-2" />
                  Flashcard Review
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <BookCheck className="h-4 w-4 mr-2" />
                  Take Full Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptLandingPage;
