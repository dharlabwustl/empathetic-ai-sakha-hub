
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Volume2, VolumeX, Bookmark, BookmarkPlus, ThumbsUp, ThumbsDown, Clock, Tag } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { ConceptCard } from "@/hooks/useUserStudyPlan";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ConceptDetail extends ConceptCard {
  content: {
    basic: string;
    detailed: string;
    simplified: string;
    advanced: string;
  };
  examples: string[];
  commonMistakes: string[];
  examRelevance: string;
  relatedConcepts: string[];
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCards, loading: cardsLoading, markConceptCompleted } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const [concept, setConcept] = useState<ConceptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [isReading, setIsReading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [helpfulRating, setHelpfulRating] = useState<'helpful' | 'not-helpful' | null>(null);
  const [difficulty, setDifficulty] = useState<'too-easy' | 'just-right' | 'too-hard' | null>(null);
  const navigate = useNavigate();
  
  // Speech synthesis
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (window.speechSynthesis) {
      speechSynthesis.current = window.speechSynthesis;
      speechUtterance.current = new SpeechSynthesisUtterance();
      
      // Try to set Indian English voice if available
      const voices = speechSynthesis.current.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang === 'en-IN' || 
        voice.name.includes('Indian') ||
        voice.name.includes('Hindi')
      );
      
      if (indianVoice) {
        speechUtterance.current.voice = indianVoice;
      }
      
      // Set other speech properties
      speechUtterance.current.rate = 0.9; // slightly slower
      speechUtterance.current.pitch = 1;
      
      // On voices changed, try again to set Indian voice
      speechSynthesis.current.onvoiceschanged = () => {
        if (speechUtterance.current) {
          const updatedVoices = speechSynthesis.current?.getVoices();
          const updatedIndianVoice = updatedVoices?.find(voice => 
            voice.lang === 'en-IN' || 
            voice.name.includes('Indian') ||
            voice.name.includes('Hindi')
          );
          
          if (updatedIndianVoice) {
            speechUtterance.current.voice = updatedIndianVoice;
          }
        }
      };
    }
    
    return () => {
      // Stop speech when component unmounts
      if (speechSynthesis.current && speechSynthesis.current.speaking) {
        speechSynthesis.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (conceptId && !cardsLoading) {
      setLoading(true);
      
      // First check if the concept exists in our conceptCards
      const foundCard = conceptCards.find(card => card.id === conceptId);
      
      if (foundCard) {
        // Extend the concept card with additional information for the detail view
        const detailedConcept: ConceptDetail = {
          ...foundCard,
          content: {
            basic: "Kinematics is the study of motion without considering its causes. In one dimension, we study motion along a straight line.",
            detailed: "Kinematics in one dimension deals with the mathematical description of motion along a straight line. It involves quantities like position, displacement, velocity, and acceleration. The key equations include: x = x₀ + v₀t + ½at², v = v₀ + at, and v² = v₀² + 2a(x - x₀), where x is position, v is velocity, a is acceleration, and t is time.",
            simplified: "Think of kinematics as understanding how objects move in a straight line - like a car driving on a straight road or a ball thrown vertically upward and falling back down.",
            advanced: "One-dimensional kinematics can be expressed using calculus relationships between position (x), velocity (v), and acceleration (a): v = dx/dt and a = dv/dt. These differential equations can be solved to predict the motion of objects under various conditions."
          },
          examples: [
            "A car traveling on a highway at constant speed covers equal distances in equal time intervals.",
            "A ball thrown vertically upward slows down due to gravity until it momentarily stops at its maximum height, then falls back down with increasing speed.",
            "A train accelerating from rest follows the equation x = ½at², where a is its constant acceleration."
          ],
          commonMistakes: [
            "Confusing velocity and acceleration - velocity is the rate of change of position, while acceleration is the rate of change of velocity.",
            "Forgetting to include the sign (direction) of quantities - in one dimension, positive and negative signs indicate direction.",
            "Applying constant acceleration equations to situations where acceleration varies.",
            "Mixing up average velocity and instantaneous velocity in calculations."
          ],
          examRelevance: "Kinematics is highly important for competitive exams, appearing in approximately 70% of mechanics questions. You'll encounter problems involving free fall, projectile motion, relative motion, and graphical analysis of motion. Mastering these concepts is crucial as they form the foundation for more complex topics like Newton's laws and energy conservation.",
          relatedConcepts: [
            "c2", "c3", "c4" // IDs of related concept cards
          ]
        };
        
        setConcept(detailedConcept);
      } else {
        // If concept not found, show an error toast
        toast({
          title: "Concept not found",
          description: "The requested concept could not be found",
          variant: "destructive"
        });
        
        // Navigate back to all concepts
        setTimeout(() => {
          navigate("/dashboard/student/concepts/all");
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [conceptId, conceptCards, cardsLoading, navigate]);

  const handleMarkCompleted = () => {
    if (!concept || !conceptId) return;
    
    // Update the concept card with the mark completed function from the hook
    markConceptCompleted(conceptId, true);
    
    // Update the local state to reflect completion
    setConcept({
      ...concept,
      completed: true
    });
    
    // Show success message
    toast({
      title: "Concept completed!",
      description: "Your progress has been updated",
    });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Concept removed from your bookmarks" : "Concept added to your bookmarks"
    });
  };

  const handleDifficultyRating = (rating: 'too-easy' | 'just-right' | 'too-hard') => {
    setDifficulty(rating);
    toast({
      title: "Thank you for your feedback",
      description: "Your rating helps us improve our content"
    });
  };

  const handleHelpfulRating = (rating: 'helpful' | 'not-helpful') => {
    setHelpfulRating(rating);
    toast({
      title: "Feedback recorded",
      description: "Thank you for helping us improve"
    });
  };

  const toggleReading = () => {
    if (!concept || !speechSynthesis.current || !speechUtterance.current) return;
    
    if (isReading) {
      // Stop reading
      speechSynthesis.current.cancel();
      setIsReading(false);
    } else {
      // Start reading
      let textToRead = "";
      
      switch(activeTab) {
        case "basic":
          textToRead = concept.content.basic;
          break;
        case "detailed":
          textToRead = concept.content.detailed;
          break;
        case "simplified":
          textToRead = concept.content.simplified;
          break;
        case "advanced":
          textToRead = concept.content.advanced;
          break;
        case "examples":
          textToRead = "Examples: " + concept.examples.join(". Next example. ");
          break;
        case "mistakes":
          textToRead = "Common mistakes: " + concept.commonMistakes.join(". Next mistake. ");
          break;
        case "relevance":
          textToRead = "Exam relevance: " + concept.examRelevance;
          break;
        default:
          textToRead = concept.content.basic;
      }
      
      speechUtterance.current.text = textToRead;
      speechUtterance.current.onend = () => setIsReading(false);
      speechSynthesis.current.speak(speechUtterance.current);
      setIsReading(true);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!concept) {
    return (
      <MainLayout>
        <div className="container py-6">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold">Concept not found</h2>
            <p className="text-gray-500">
              The concept you're looking for may have been moved or doesn't exist
            </p>
            <Link to="/dashboard/student/concepts/all">
              <Button className="mt-4">View All Concepts</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const examGoal = userProfile?.goals?.[0]?.title || "IIT-JEE";

  return (
    <MainLayout>
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2 space-x-2">
            <Link to="/dashboard/student/overview" className="hover:text-blue-600">Dashboard</Link>
            <span>/</span>
            <Link to="/dashboard/student/concepts/all" className="hover:text-blue-600">Concept Cards</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{concept.title}</span>
          </div>

          {/* Header Section with Title and Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={concept.difficulty.toLowerCase() === 'easy' ? 'default' : concept.difficulty.toLowerCase() === 'medium' ? 'secondary' : 'destructive'}>{concept.difficulty}</Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    <Clock size={12} className="mr-1" /> 
                    {concept.estimatedTime || 30} min
                  </Badge>
                  <Badge variant="outline" className="bg-indigo-50">
                    <BookOpen size={12} className="mr-1" /> 
                    {concept.subject}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{concept.title}</h1>
                <p className="text-gray-600">
                  {concept.chapter} • Relevant for {examGoal}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={toggleBookmark}
                >
                  {isBookmarked ? (
                    <>
                      <Bookmark size={16} className="text-blue-600" fill="currentColor" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <BookmarkPlus size={16} />
                      Bookmark
                    </>
                  )}
                </Button>

                <Button 
                  variant={concept.completed ? "secondary" : "default"}
                  onClick={handleMarkCompleted}
                  disabled={concept.completed}
                >
                  {concept.completed ? "Completed" : "Mark as Completed"}
                </Button>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Card className="overflow-hidden">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b">
                <TabsList className="bg-white dark:bg-gray-700 p-1 w-auto overflow-x-auto flex-nowrap">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="simplified">Simplified</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="relevance">Exam Relevance</TabsTrigger>
                </TabsList>
                
                {/* Voice Reading Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleReading}
                  title={isReading ? "Stop reading" : "Start reading"}
                >
                  {isReading ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
              </div>

              <CardContent className="p-6">
                <TabsContent value="basic" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{concept.content.basic}</p>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{concept.content.detailed}</p>
                  </div>
                </TabsContent>

                <TabsContent value="simplified" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{concept.content.simplified}</p>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{concept.content.advanced}</p>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <ul className="space-y-4">
                      {concept.examples.map((example, index) => (
                        <li key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="mistakes" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <ul className="space-y-4">
                      {concept.commonMistakes.map((mistake, index) => (
                        <li key={index} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md">
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="relevance" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      {concept.examRelevance}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>

              <CardFooter className="border-t bg-gray-50 dark:bg-gray-800 p-4 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Was this concept explanation helpful?</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={helpfulRating === 'helpful' ? "default" : "outline"}
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleHelpfulRating('helpful')}
                    >
                      <ThumbsUp size={14} />
                      Yes
                    </Button>
                    <Button 
                      variant={helpfulRating === 'not-helpful' ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleHelpfulRating('not-helpful')}
                    >
                      <ThumbsDown size={14} />
                      No
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Difficulty level for you:</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={difficulty === 'too-easy' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDifficultyRating('too-easy')}
                    >
                      Too Easy
                    </Button>
                    <Button 
                      variant={difficulty === 'just-right' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDifficultyRating('just-right')}
                    >
                      Just Right
                    </Button>
                    <Button 
                      variant={difficulty === 'too-hard' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDifficultyRating('too-hard')}
                    >
                      Too Hard
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Tabs>
          </Card>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="text-purple-600" size={18} />
                  Practice with Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Reinforce your understanding with flashcards based on this concept
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/student/flashcards" className="w-full">
                  <Button className="w-full">Review Flashcards</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={18} />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Explore closely related concepts to build a complete understanding
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/student/concepts/all" className="w-full">
                  <Button variant="outline" className="w-full">View Related</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-green-600" size={18} />
                  Practice Exam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Test your knowledge with practice questions based on this concept
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/student/practice-exam" className="w-full">
                  <Button variant="outline" className="w-full">Take Practice Test</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardDetailPage;
