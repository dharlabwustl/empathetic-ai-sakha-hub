
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Video, 
  CheckCircle, 
  MessageSquare, 
  Star, 
  ArrowLeft, 
  Bookmark, 
  BookmarkPlus, 
  Volume2, 
  VolumeX, 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  MonitorPlay,
  PlusCircle,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock concept data for demonstration
const mockConcept = {
  id: "c1",
  title: "Newton's Laws of Motion",
  subject: "Physics",
  difficulty: "medium",
  importance: "high",
  masteryLevel: 65,
  description: "Understanding the fundamental laws that describe the relationship between forces acting on a body and its motion due to those forces.",
  explanations: {
    simple: "Objects stay at rest or move in a straight line unless acted upon by a force. Force equals mass times acceleration. For every action, there is an equal and opposite reaction.",
    detailed: "Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it. The first law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force. The second law states that the acceleration of an object depends on the mass of the object and the amount of force applied. The third law states that when one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.",
    examples: "First Law: A book resting on a table remains at rest. Second Law: Pushing a shopping cart requires more force to accelerate if it's heavy. Third Law: Rockets expel gas that pushes against the ground, which in turn pushes the rocket upward.",
    diagram: "The first law is illustrated by a ball rolling forever without friction. The second law is demonstrated by showing different masses accelerating under the same force. The third law is visually represented by showing action-reaction pairs."
  },
  videos: [
    {
      id: "v1",
      title: "Introduction to Newton's Laws",
      duration: "8:45",
      thumbnail: "https://example.com/newton-thumbnail.jpg",
      url: "https://www.youtube.com/embed/6wjqBg0lJTo"
    },
    {
      id: "v2",
      title: "Real-world Applications of Newton's Laws",
      duration: "12:30",
      thumbnail: "https://example.com/newton-applications.jpg",
      url: "https://www.youtube.com/embed/kKKM8Y-u7ds"
    }
  ],
  realWorldExamples: [
    "Rocket propulsion: When a rocket expels gas downwards (action), the gas exerts an upward force on the rocket (reaction), propelling it into space.",
    "Car accidents: When a moving car hits a stationary object, the passengers continue moving forward due to inertia (Newton's first law) until stopped by a seat belt.",
    "Elevator rides: When an elevator accelerates upward, you feel heavier (apparent weight increase) due to Newton's second law."
  ],
  commonMistakes: [
    "Confusing mass and weight. Mass is a measure of matter in an object, while weight is the force of gravity on that object.",
    "Thinking that an object moving at constant velocity requires a constant force. Forces cause acceleration, not velocity.",
    "Forgetting that Newton's laws only apply in inertial reference frames and break down at very high speeds (relativity) or very small scales (quantum mechanics)."
  ],
  examRelevance: "Newton's laws form the foundation of classical mechanics and are tested extensively in physics exams. Expect numerical problems involving force calculations (F=ma), free-body diagrams, and applications like inclined planes, pulleys, and connected masses. Conceptual questions often focus on identifying action-reaction pairs and inertial properties.",
  relatedConcepts: [
    {
      id: "rc1",
      title: "Forces and Free-body Diagrams",
      subject: "Physics"
    },
    {
      id: "rc2",
      title: "Momentum and Impulse",
      subject: "Physics"
    },
    {
      id: "rc3",
      title: "Circular Motion",
      subject: "Physics"
    }
  ],
  tags: ["mechanics", "forces", "classical physics", "important", "fundamental"]
};

const ConceptStudyPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("explanation");
  const [explanationType, setExplanationType] = useState("simple");
  const [isReading, setIsReading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [note, setNote] = useState("");
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const { toast } = useToast();
  
  const concept = mockConcept; // In a real app, fetch concept by conceptId
  
  // Calculate mastery level color
  const getMasteryColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Calculate difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Calculate importance badge color
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleSpeech = () => {
    if (!speechSynthesisRef.current) {
      toast({
        title: "Speech synthesis not available",
        description: "Your browser does not support text-to-speech functionality.",
        variant: "destructive"
      });
      return;
    }

    if (isReading) {
      // Stop reading
      speechSynthesisRef.current.cancel();
      setIsReading(false);
      return;
    }

    // Get text content based on active tab and explanation type
    let textToRead = "";
    
    if (activeTab === "explanation") {
      textToRead = `${concept.title}. ${concept.explanations[explanationType as keyof typeof concept.explanations]}`;
    } else if (activeTab === "realworld") {
      textToRead = `Real world examples for ${concept.title}: ${concept.realWorldExamples.join(". ")}`;
    } else if (activeTab === "exam") {
      textToRead = `Exam relevance for ${concept.title}: ${concept.examRelevance}`;
    } else if (activeTab === "mistakes") {
      textToRead = `Common mistakes for ${concept.title}: ${concept.commonMistakes.join(". ")}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsReading(false);
    
    speechSynthesisRef.current.speak(utterance);
    setIsReading(true);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked ? "This concept has been removed from your bookmarks." : "This concept has been added to your bookmarks for later review.",
    });
  };

  const saveNote = () => {
    toast({
      title: "Note saved",
      description: "Your note has been saved with this concept."
    });
    setShowNoteDialog(false);
  };

  const openVideo = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const closeVideo = () => {
    setActiveVideoId("");
  };

  const goToFlashcards = () => {
    navigate(`/dashboard/student/flashcards/enhanced`);
    toast({
      title: "Flashcards loaded",
      description: "Practice this concept with interactive flashcards"
    });
  };

  const goToPractice = () => {
    navigate(`/dashboard/student/practice-exam`);
    toast({
      title: "Practice exams",
      description: "Test your knowledge of this concept with practice questions"
    });
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={concept.subject}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header Card with Concept Overview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div className="flex items-center gap-3">
                <CardTitle>{concept.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`${isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'} hover:text-yellow-500`}
                  onClick={toggleBookmark}
                >
                  {isBookmarked ? <Bookmark className="h-5 w-5 fill-yellow-500" /> : <BookmarkPlus className="h-5 w-5" />}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
                </Badge>
                <Badge className={getImportanceColor(concept.importance)}>
                  {concept.importance.charAt(0).toUpperCase() + concept.importance.slice(1)} Importance
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{concept.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Mastery Level</span>
                <span className="text-sm font-medium">{concept.masteryLevel}%</span>
              </div>
              <Progress value={concept.masteryLevel} className={`h-2 ${getMasteryColor(concept.masteryLevel)}`} />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 text-sm">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={goToFlashcards}
              >
                <FileText className="h-3.5 w-3.5" />
                Practice Flashcards
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={goToPractice}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Take Quiz
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowNoteDialog(true)}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Notes
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center gap-1 ${isReading ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onClick={toggleSpeech}
              >
                {isReading ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                {isReading ? 'Stop Reading' : 'Read Aloud'}
              </Button>
            </div>
            
            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-1 mr-1">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Tags:</span>
              </div>
              {concept.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6 w-full">
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="realworld">Real-world Examples</TabsTrigger>
            <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
            <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
            <TabsTrigger value="videos">Video Analysis</TabsTrigger>
          </TabsList>
          
          {/* Explanation Tab */}
          <TabsContent value="explanation" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <CardTitle className="text-lg">Understanding {concept.title}</CardTitle>
                  <Tabs value={explanationType} onValueChange={setExplanationType}>
                    <TabsList>
                      <TabsTrigger value="simple">Simple</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                      <TabsTrigger value="diagram">Diagram</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose max-w-none dark:prose-invert">
                  {explanationType === "simple" && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
                      <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Simplified Explanation</h3>
                      <p>{concept.explanations.simple}</p>
                    </div>
                  )}
                  
                  {explanationType === "detailed" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Detailed Explanation</h3>
                      <p>{concept.explanations.detailed}</p>
                    </div>
                  )}
                  
                  {explanationType === "examples" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Examples</h3>
                      <p>{concept.explanations.examples}</p>
                    </div>
                  )}
                  
                  {explanationType === "diagram" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Diagram-based Analysis</h3>
                      <p>{concept.explanations.diagram}</p>
                      <div className="bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center rounded-md">
                        <p className="text-muted-foreground">Diagram visualization would appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-900/30 flex justify-end">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Real-world Examples Tab */}
          <TabsContent value="realworld" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-world Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {concept.realWorldExamples.map((example, index) => (
                    <li key={index} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800">
                      <div className="flex gap-3">
                        <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                          <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-300" />
                        </div>
                        <p>{example}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Exam Relevance Tab */}
          <TabsContent value="exam" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exam Relevance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="text-lg font-medium mb-3 text-purple-800 dark:text-purple-300">How This Will Be Tested</h3>
                  <p className="leading-relaxed">{concept.examRelevance}</p>
                  
                  <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Exam Preparation Tips
                    </h4>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Practice calculating forces with different mass and acceleration combinations</li>
                      <li>Study free-body diagrams and force components</li>
                      <li>Understand the application of each law in different scenarios</li>
                      <li>Review action-reaction pairs and inertial reference frames</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Common Mistakes Tab */}
          <TabsContent value="mistakes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground italic">
                    Understanding these common pitfalls will help you avoid making the same mistakes in your exams.
                  </p>
                  
                  <ul className="space-y-4">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-100 dark:border-red-800">
                        <div className="flex gap-3">
                          <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-300" />
                          </div>
                          <div>
                            <p>{mistake}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.videos.map(video => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative cursor-pointer" onClick={() => openVideo(video.id)}>
                  {/* Video thumbnail would go here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="default" size="icon" className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary">
                      <MonitorPlay className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{video.title}</h3>
                    <Badge variant="outline">{video.duration}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => openVideo(video.id)}>
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Related Concepts Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recommended Related Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {concept.relatedConcepts.map(related => (
              <Card key={related.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-full">
                      <Lightbulb className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">{related.title}</p>
                      <p className="text-sm text-muted-foreground">{related.subject}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3 px-4">
                  <Button variant="ghost" size="sm" className="w-full">
                    Explore Concept
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note for {concept.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Textarea 
              placeholder="Write your notes here..." 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              className="h-40"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNoteDialog(false)}>Cancel</Button>
            <Button onClick={saveNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={!!activeVideoId} onOpenChange={(open) => !open && closeVideo()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {activeVideoId && concept.videos.find(v => v.id === activeVideoId)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video mt-2">
            {activeVideoId && (
              <iframe 
                width="100%" 
                height="100%" 
                src={concept.videos.find(v => v.id === activeVideoId)?.url}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="rounded-md"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;
