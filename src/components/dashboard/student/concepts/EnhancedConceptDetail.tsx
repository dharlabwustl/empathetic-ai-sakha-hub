
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Lightbulb, 
  Flag, 
  MessageSquarePlus, 
  Download, 
  Share2, 
  CheckCircle, 
  Star, 
  VolumeIcon, 
  ExternalLink, 
  PlayCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedConceptDetailProps {
  conceptId: string;
}

// Mock concept data
const mockConcept = {
  id: "concept-1",
  title: "Newton's Laws of Motion",
  description: "An exploration of Newton's three laws of motion which form the foundation of classical mechanics.",
  coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
  progress: 65,
  estimatedTime: "25 mins",
  difficulty: "intermediate",
  lastStudied: "2 days ago",
  isFlagged: false,
  learningOutcomes: [
    "Understand and explain Newton's First Law (Law of Inertia)",
    "Apply Newton's Second Law (F = ma) to solve problems",
    "Recognize action-reaction pairs using Newton's Third Law",
    "Analyze real-world examples of Newton's Laws"
  ],
  videoLessons: [
    {
      id: "v1",
      title: "Newton's First Law Explained",
      duration: "8:24",
      thumbnail: "https://images.unsplash.com/photo-1581500947882-709458c363e6"
    },
    {
      id: "v2",
      title: "Force and Acceleration: Newton's Second Law",
      duration: "9:12",
      thumbnail: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a"
    },
    {
      id: "v3",
      title: "Action and Reaction: The Third Law",
      duration: "7:16",
      thumbnail: "https://images.unsplash.com/photo-1607893469067-5ee0868b7e83"
    }
  ],
  notes: "Remember that Newton's First Law is often called the Law of Inertia. An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
  practiceQuestions: [
    {
      id: "q1",
      question: "What happens to an object's motion when no net external force acts upon it?",
      options: [
        "It accelerates in the direction of the largest force",
        "It maintains constant velocity (or remains at rest)",
        "It always comes to a stop",
        "Its velocity increases at a constant rate"
      ],
      correctAnswer: 1
    },
    {
      id: "q2",
      question: "Newton's Second Law states that force equals:",
      options: [
        "Mass times velocity",
        "Mass divided by acceleration",
        "Mass times acceleration",
        "Momentum times velocity"
      ],
      correctAnswer: 2
    },
    {
      id: "q3",
      question: "According to Newton's Third Law, when one object exerts a force on another object:",
      options: [
        "The second object exerts an equal and opposite force on the first",
        "The second object moves in the opposite direction",
        "The first object experiences twice the force",
        "Both objects accelerate at the same rate"
      ],
      correctAnswer: 0
    }
  ],
  resources: [
    {
      title: "Interactive Forces Simulation",
      type: "simulation",
      url: "https://example.com/force-simulation"
    },
    {
      title: "Newton's Laws of Motion Fact Sheet",
      type: "pdf",
      url: "https://example.com/newton-laws-pdf"
    },
    {
      title: "Historical Context: Isaac Newton Biography",
      type: "article",
      url: "https://example.com/newton-bio"
    }
  ],
  relatedConcepts: [
    { id: "concept-2", title: "Conservation of Momentum" },
    { id: "concept-3", title: "Force and Friction" },
    { id: "concept-4", title: "Circular Motion" }
  ],
  keyFormulas: [
    { id: "f1", formula: "F = ma", description: "Force equals mass times acceleration" },
    { id: "f2", formula: "p = mv", description: "Momentum equals mass times velocity" },
    { id: "f3", formula: "Fg = G(m₁m₂)/r²", description: "Gravitational force" }
  ]
};

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({ conceptId }) => {
  const [concept, setConcept] = useState(mockConcept);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFlagged, setIsFlagged] = useState(concept.isFlagged);
  const [userNotes, setUserNotes] = useState(concept.notes || "");
  const [isReading, setIsReading] = useState(false);
  const { toast } = useToast();

  // Load data effect
  useEffect(() => {
    // In a real app, we would fetch concept data based on conceptId
    console.log(`Loading concept data for ID: ${conceptId}`);
    // For demo, we'll use mock data
  }, [conceptId]);

  const handleFlagToggle = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: !isFlagged ? "Concept flagged for revision" : "Flag removed",
      description: !isFlagged 
        ? "This concept will appear in your revision list" 
        : "This concept has been removed from your revision list",
    });
  };

  const handleAddNote = () => {
    // In a real app, save the note to the backend
    toast({
      title: "Note saved",
      description: "Your notes for this concept have been saved",
    });
  };

  const handleShareConcept = () => {
    // In a real app, generate a shareable link
    navigator.clipboard.writeText(`https://yourapp.com/concepts/${concept.id}`);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this concept with others",
    });
  };

  const handleDownloadResources = () => {
    // In a real app, generate a downloadable package
    toast({
      title: "Downloading resources",
      description: "Your study materials are being prepared for download",
    });
  };

  const handleTextToSpeech = () => {
    setIsReading(!isReading);
    
    if (!isReading) {
      const textToRead = `${concept.title}. ${concept.description}. ${concept.notes}`;
      
      // Use browser's text-to-speech API
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      
      toast({
        title: "Reading content aloud",
        description: "Text-to-speech activated",
      });
    } else {
      speechSynthesis.cancel();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < concept.practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      toast({
        title: "Practice completed",
        description: "You've completed all practice questions for this concept",
      });
    }
  };

  const handlePlayVideo = (videoId: string) => {
    setIsPlaying(true);
    toast({
      title: "Playing video",
      description: `Starting video: ${concept.videoLessons.find(v => v.id === videoId)?.title}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section with Progress and Actions */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">{concept.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Physics
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {concept.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last studied {concept.lastStudied}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 lg:mt-0">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleTextToSpeech}
              className={isReading ? "bg-blue-100" : ""}
            >
              <VolumeIcon className="h-4 w-4 mr-1" />
              {isReading ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            <Button 
              size="sm" 
              variant={isFlagged ? "destructive" : "outline"} 
              onClick={handleFlagToggle}
            >
              <Flag className="h-4 w-4 mr-1" />
              {isFlagged ? "Unflag" : "Flag for Revision"}
            </Button>
            
            <Button size="sm" variant="outline" onClick={handleShareConcept}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-medium">Mastery Progress</span>
            <span>{concept.progress}%</span>
          </div>
          <Progress value={concept.progress} className="h-2" />
        </div>
        
        <p className="text-muted-foreground mt-4">
          {concept.description}
        </p>
      </div>
      
      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Lightbulb className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Learning Outcomes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Learning Outcomes</h3>
                  <ul className="space-y-2">
                    {concept.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Key Formulas */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Formulas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {concept.keyFormulas.map((formula, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="text-lg font-mono font-semibold">{formula.formula}</div>
                        <p className="text-sm text-muted-foreground">{formula.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Related Concepts */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Related Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {concept.relatedConcepts.map((related, index) => (
                      <Badge key={index} variant="secondary" className="p-2 cursor-pointer hover:bg-secondary/80">
                        {related.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Quick Access */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="text-blue-600 px-0">
                      <Star className="h-4 w-4 mr-1" fill="currentColor" />
                      Add to Favorites
                    </Button>
                  </div>
                  
                  <div>
                    <Button variant="outline" size="sm" onClick={handleDownloadResources}>
                      <Download className="h-4 w-4 mr-1" />
                      Download Materials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concept.videoLessons.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover" 
                  />
                  <Button 
                    variant="default"
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 h-12 w-12 rounded-full"
                    onClick={() => handlePlayVideo(video.id)}
                  >
                    <PlayCircle className="h-8 w-8" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Duration: {video.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Video Notes</h3>
            <p>
              When watching the videos, pay special attention to the demonstrations of Newton's laws in action. 
              Try to identify real-world examples where you observe these laws in your daily life.
            </p>
          </div>
        </TabsContent>
        
        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Practice Questions</h3>
                  <Badge variant="outline">
                    {currentQuestion + 1}/{concept.practiceQuestions.length}
                  </Badge>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  <p className="font-medium mb-4">
                    {concept.practiceQuestions[currentQuestion].question}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {concept.practiceQuestions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border rounded-md cursor-pointer transition-all ${
                          selectedAnswer === index 
                            ? selectedAnswer === concept.practiceQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary"
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="flex items-center">
                          <div className="h-5 w-5 mr-2 rounded-full border flex items-center justify-center">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleNextQuestion} 
                    disabled={selectedAnswer === null}
                    className="w-full md:w-auto"
                  >
                    {currentQuestion < concept.practiceQuestions.length - 1 
                      ? "Next Question" 
                      : "Complete Practice"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Notes</h3>
                <textarea 
                  className="w-full min-h-[200px] p-3 border rounded-md"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Add your notes about this concept here..."
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote}>Save Notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Study Resources</h3>
                
                <div className="space-y-4">
                  {concept.resources.map((resource, index) => (
                    <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                      <div className={`h-10 w-10 rounded-md flex items-center justify-center mr-3 ${
                        resource.type === 'simulation' 
                          ? 'bg-blue-100 text-blue-600' 
                          : resource.type === 'pdf'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {resource.type === 'simulation' && (
                          <PlayCircle className="h-5 w-5" />
                        )}
                        {resource.type === 'pdf' && (
                          <FileText className="h-5 w-5" />
                        )}
                        {resource.type === 'article' && (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                        >
                          Open Resource
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Download all resources as a package
                  </span>
                  <Button variant="outline" size="sm" onClick={handleDownloadResources}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedConceptDetail;
