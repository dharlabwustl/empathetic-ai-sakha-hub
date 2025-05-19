
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, Bookmark, PlayCircle, Edit, MessageSquare, Star, BrainCircuit, VideoIcon, FileText, BookMarked, CheckCircle2, AlertCircle, PlayIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ConceptCard } from '@/types/user/conceptCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [conceptData, setConceptData] = useState<ConceptCard | null>(null);
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [notes, setNotes] = useState<string>("");
  const [isFlagged, setIsFlagged] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [mastery, setMastery] = useState({
    level: "Intermediate",
    percentage: 65
  });
  
  useEffect(() => {
    console.log("Pages/ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Show toast notification
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
      
      // In a real app, fetch concept data from API here
      // For now, simulate loading and use mock data
      const timer = setTimeout(() => {
        // Mock concept data for demonstration
        setConceptData({
          id: conceptId,
          title: "Newton's Laws of Motion",
          subject: "Physics",
          chapter: "Classical Mechanics",
          topic: "Forces and Motion",
          difficulty: "medium",
          description: "Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.",
          keyPoints: [
            "First Law: An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
            "Second Law: Force equals mass times acceleration (F = ma).",
            "Third Law: For every action, there is an equal and opposite reaction."
          ],
          examples: [
            "A book lying on a table remains at rest due to the first law.",
            "When kicking a ball, the force applied determines its acceleration (second law).",
            "When rowing a boat, the paddle exerts force on water, and water exerts equal force back (third law)."
          ],
          relatedConcepts: ["concept-123", "concept-456", "concept-789"],
          content: "Detailed content about Newton's Laws of Motion",
          estimatedTime: 45,
          lastPracticed: "2024-05-14",
          recallAccuracy: 78,
          bookmarked: false,
          examReady: false,
          masteryLevel: 65,
          mastery: {
            level: "Intermediate",
            percentage: 65
          },
          formulas: ["F = ma", "p = mv", "W = F·d·cos(θ)"],
          notes: ["Pay attention to the direction of forces", "Vector quantities have both magnitude and direction"],
          videos: [
            {
              id: "video-1",
              title: "Understanding Newton's First Law",
              url: "https://www.youtube.com/embed/CQYELiTtUs8",
              duration: "8:24",
              thumbnail: "https://img.youtube.com/vi/CQYELiTtUs8/hqdefault.jpg"
            },
            {
              id: "video-2",
              title: "Newton's Second Law Explained",
              url: "https://www.youtube.com/embed/ou9YMWlJgkE",
              duration: "10:15",
              thumbnail: "https://img.youtube.com/vi/ou9YMWlJgkE/hqdefault.jpg"
            },
            {
              id: "video-3",
              title: "Newton's Third Law in Real Life",
              url: "https://www.youtube.com/embed/8bTdMmNZm2M",
              duration: "7:30",
              thumbnail: "https://img.youtube.com/vi/8bTdMmNZm2M/hqdefault.jpg"
            }
          ],
          resources: [
            {
              id: "resource-1",
              title: "Newton's Laws Study Guide",
              type: "PDF",
              url: "#"
            },
            {
              id: "resource-2",
              title: "Force and Motion Practice Problems",
              type: "Worksheet",
              url: "#"
            },
            {
              id: "resource-3",
              title: "Interactive Forces Simulator",
              type: "Web App",
              url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html"
            }
          ],
          practiceQuestions: [
            {
              id: "question-1",
              question: "A 5 kg object accelerates at 2 m/s² when a force is applied. What is the magnitude of the force?",
              options: [
                "5 N",
                "7 N",
                "10 N",
                "15 N"
              ],
              correctAnswer: "10 N",
              explanation: "Using Newton's Second Law: F = ma = 5 kg × 2 m/s² = 10 N"
            },
            {
              id: "question-2",
              question: "According to Newton's Third Law, when you push against a wall, the wall:",
              options: [
                "Pushes back with a force equal to your push",
                "Doesn't exert any force",
                "Pushes back with less force than your push",
                "Pushes back with more force than your push"
              ],
              correctAnswer: "Pushes back with a force equal to your push",
              explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
            }
          ],
          commonMistakes: [
            "Confusing mass and weight",
            "Forgetting that friction acts in the opposite direction to motion",
            "Not accounting for all forces in a free-body diagram"
          ],
          examRelevance: "High - Newton's Laws appear in 30% of mechanics questions in NEET exams"
        });
        setLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      console.error("ConceptStudyPage: Missing conceptId parameter");
      navigate('/dashboard/student/concepts', { replace: true });
    }
  }, [conceptId, navigate, toast]);
  
  const handleReadAloud = () => {
    setReadAloudActive(!readAloudActive);
    if (!readAloudActive) {
      // Use browser's text-to-speech API
      const speech = new SpeechSynthesisUtterance();
      speech.text = conceptData?.description + " " + conceptData?.keyPoints?.join(". ");
      speech.rate = 0.9;
      speech.pitch = 1.0;
      window.speechSynthesis.speak(speech);
      
      toast({
        title: "Read Aloud Started",
        description: "Listening to concept explanation",
      });
    } else {
      // Stop reading
      window.speechSynthesis.cancel();
      
      toast({
        title: "Read Aloud Stopped",
        description: "Audio playback has been stopped",
      });
    }
  };
  
  const handleSaveNotes = () => {
    // In a real app, save notes to backend
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from Revision List" : "Added to Revision List",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
    });
  };
  
  const handleAskAI = () => {
    // In a real app, open AI tutor chat with context
    navigate(`/dashboard/student/tutor?conceptId=${conceptId}`);
  };
  
  const handlePracticeRecall = () => {
    // In a real app, navigate to a recall practice page
    toast({
      title: "Starting Recall Practice",
      description: "Testing your knowledge of this concept",
    });
  };

  const handleSelectResource = (resourceId: string) => {
    setSelectedResource(resourceId === selectedResource ? null : resourceId);
    
    const resource = conceptData?.resources?.find(r => r.id === resourceId);
    if (resource) {
      window.open(resource.url, '_blank');
    }
  };

  const handlePlayVideo = (videoId: string) => {
    setActiveVideoId(videoId === activeVideoId ? null : videoId);
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({...prev, [questionId]: answerIndex}));
  };

  const handleSubmitQuiz = (questionId: string) => {
    setQuizSubmitted(prev => ({...prev, [questionId]: true}));
    
    const question = conceptData?.practiceQuestions?.find(q => q.id === questionId);
    const selectedAnswer = quizAnswers[questionId];
    
    if (question && selectedAnswer !== undefined) {
      const isCorrect = question.options[selectedAnswer] === question.correctAnswer;
      
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect 
          ? "Great job! You got it right." 
          : `The correct answer is: ${question.correctAnswer}`,
        variant: isCorrect ? "default" : "destructive",
      });
      
      // In a real app, update mastery level
      if (isCorrect) {
        setMastery(prev => ({
          ...prev,
          percentage: Math.min(100, prev.percentage + 5)
        }));
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Enhanced Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">{conceptData?.title}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800">
              {conceptData?.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800">
              {conceptData?.chapter}
            </Badge>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800">
              {conceptData?.topic}
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">
              {conceptData?.difficulty === "easy" ? "Easy" : conceptData?.difficulty === "medium" ? "Medium" : "Hard"}
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Mastery Level:</span>
            <Progress value={conceptData?.masteryLevel} className="h-2 w-28" />
            <span className="ml-2 text-sm font-medium">{conceptData?.masteryLevel}%</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={readAloudActive ? "destructive" : "outline"}
            onClick={handleReadAloud}
            className="flex items-center gap-2"
          >
            <PlayCircle className="h-4 w-4" />
            {readAloudActive ? "Stop Reading" : "Read Aloud"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleToggleFlag}
            className={`flex items-center gap-2 ${isFlagged ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700' : ''}`}
          >
            <Bookmark className="h-4 w-4" fill={isFlagged ? "currentColor" : "none"} />
            {isFlagged ? "Flagged" : "Flag for Revision"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAskAI}
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI Tutor
          </Button>
          
          <Button 
            size="sm" 
            variant="default"
            className="flex items-center gap-2"
            onClick={handlePracticeRecall}
          >
            <BrainCircuit className="h-4 w-4" />
            Practice Recall
          </Button>
        </div>
      </div>
      
      {/* Enhanced Concept Tab Navigation */}
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto">
          <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
          <TabsTrigger value="details" className="py-3">Details</TabsTrigger>
          <TabsTrigger value="practice" className="py-3">Practice</TabsTrigger>
          <TabsTrigger value="notes" className="py-3">Notes</TabsTrigger>
          <TabsTrigger value="related" className="py-3">Related</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Concept Overview</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{conceptData?.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-2">Learning Outcomes</h4>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Understand and apply Newton's three laws of motion</li>
                    <li>Solve problems involving forces and acceleration</li>
                    <li>Analyze motion in terms of forces acting on objects</li>
                    <li>Recognize real-world applications of Newton's laws</li>
                  </ul>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold mb-2">Key Takeaways</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {conceptData?.keyPoints?.map((point, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Exam Relevance</h4>
                    <p className="text-gray-700 dark:text-gray-300">{conceptData?.examRelevance}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Common Mistakes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {conceptData?.commonMistakes?.map((mistake, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Video Explanations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conceptData?.videos?.slice(0, 2).map((video) => (
                  <div key={video.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {activeVideoId === video.id ? (
                      <div className="aspect-video">
                        <iframe 
                          src={video.url} 
                          title={video.title} 
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <div 
                        className="aspect-video bg-cover bg-center relative cursor-pointer"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                        onClick={() => handlePlayVideo(video.id)}
                      >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center">
                            <PlayIcon className="h-8 w-8 text-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-3">
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Duration: {video.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  View All Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Concept Description</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">{conceptData?.description}</p>
              
              <h4 className="text-lg font-semibold mb-2">Key Points</h4>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {conceptData?.keyPoints?.map((point: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-semibold mb-2">Examples</h4>
              <ul className="list-disc pl-6 space-y-2">
                {conceptData?.examples?.map((example: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{example}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Videos and Resources</h3>
              
              <h4 className="text-lg font-semibold mb-3">Video Lessons</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {conceptData?.videos?.map((video) => (
                  <div key={video.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {activeVideoId === video.id ? (
                      <div className="aspect-video">
                        <iframe 
                          src={video.url} 
                          title={video.title}
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <div 
                        className="aspect-video bg-cover bg-center relative cursor-pointer"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                        onClick={() => handlePlayVideo(video.id)}
                      >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="h-12 w-12 bg-white/90 rounded-full flex items-center justify-center">
                            <PlayIcon className="h-6 w-6 text-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-3">
                      <h4 className="font-medium">{video.title}</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duration: {video.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold mb-3">Study Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conceptData?.resources?.map((resource) => (
                  <div
                    key={resource.id}
                    className={`border p-4 rounded-lg cursor-pointer transition-all ${
                      selectedResource === resource.id
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
                    }`}
                    onClick={() => handleSelectResource(resource.id)}
                  >
                    <div className="flex items-start">
                      {resource.type === 'PDF' ? (
                        <FileText className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                      ) : resource.type === 'Web App' ? (
                        <Globe className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                      ) : (
                        <FileText className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      )}
                      <div>
                        <h5 className="font-medium mb-1">{resource.title}</h5>
                        <div className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded inline-block">
                          {resource.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Relevant Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {conceptData?.formulas?.map((formula: string, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-xl font-medium text-center p-2 border-b border-gray-200 dark:border-gray-700">
                      {formula}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center pt-2">
                      {index === 0 ? "Newton's Second Law" : 
                       index === 1 ? "Linear Momentum" : 
                       "Work Done by a Force"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Practice Questions</h3>
              {conceptData?.practiceQuestions?.map((question, index) => (
                <div key={question.id} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="text-lg font-medium mb-3">Question {index + 1}</h4>
                  <p className="mb-4">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className={`flex items-center p-2 rounded-md ${
                        quizSubmitted[question.id] && option === question.correctAnswer 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : quizSubmitted[question.id] && quizAnswers[question.id] === optIndex && option !== question.correctAnswer
                          ? 'bg-red-50 dark:bg-red-900/20'
                          : ''
                      }`}>
                        <input 
                          type="radio" 
                          name={`question-${question.id}`} 
                          id={`opt-${question.id}-${optIndex}`}
                          checked={quizAnswers[question.id] === optIndex}
                          onChange={() => handleQuizAnswer(question.id, optIndex)}
                          disabled={quizSubmitted[question.id]}
                          className="mr-2"
                        />
                        <label htmlFor={`opt-${question.id}-${optIndex}`}>
                          {option}
                          {quizSubmitted[question.id] && option === question.correctAnswer && (
                            <CheckCircle2 className="inline-block ml-2 h-4 w-4 text-green-600" />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {quizSubmitted[question.id] && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <p className="font-medium text-blue-800 dark:text-blue-300">Explanation:</p>
                      <p className="text-blue-700 dark:text-blue-400">{question.explanation}</p>
                    </div>
                  )}
                  
                  {!quizSubmitted[question.id] && (
                    <Button 
                      className="mt-4"
                      onClick={() => handleSubmitQuiz(question.id)}
                      disabled={quizAnswers[question.id] === undefined}
                    >
                      Check Answer
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Flashcards</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/dashboard/student/flashcards?conceptId=${conceptId}`)}
                >
                  <BookMarked className="h-4 w-4 mr-2" />
                  View Full Deck
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-medium">
                      What is Newton's First Law?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-medium">
                      What is the formula for Newton's Second Law?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        F = ma (Force equals mass times acceleration)
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-base font-medium">
                      What is Newton's Third Law?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        For every action, there is an equal and opposite reaction.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Your Study Notes</h3>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-800"
                placeholder="Enter your notes about this concept..."
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Ask a Doubt</h3>
              <textarea 
                className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-800"
                placeholder="Ask a question about this concept..."
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handleAskAI}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI Tutor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Related Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/dashboard/student/concept-study/concept-123`)}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <span>Conservation of Momentum</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Related to Newton's Laws through the principle of momentum conservation
                  </div>
                </div>
                
                <div 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/dashboard/student/concept-study/concept-456`)}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <span>Friction and Forces</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Explores the effects of friction as a force opposing motion
                  </div>
                </div>
                
                <div 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/dashboard/student/concept-study/concept-789`)}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <span>Work and Energy</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Connects forces with work and energy transfers
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Related Practice Exams</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/dashboard/student/practice-exam?topic=mechanics`)}
                >
                  View All Exams
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Forces and Motion Quiz</h4>
                    <Badge>15 Questions</Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Practice quiz focusing on Newton's Laws applications
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm">Start Quiz</Button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Classical Mechanics Test</h4>
                    <Badge>30 Questions</Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Comprehensive test covering mechanics principles
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm">Start Test</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptStudyPage;
