
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Bookmark, 
  BookOpen, 
  Play, 
  ExternalLink, 
  CheckCircle,
  AlertTriangle,
  Monitor,
  List,
  Video
} from "lucide-react";
import { motion } from "framer-motion";
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams();
  const [activeTab, setActiveTab] = useState("explanation");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(70); // Example progress percentage
  const { toast } = useToast();

  // For demo purposes only - would fetch from API in real app
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    category: "Classical Mechanics",
    difficulty: "Intermediate",
    estimatedTime: "15 minutes",
    completionStatus: 70,
    relatedConcepts: [
      { id: "2", title: "Conservation of Momentum", subject: "Physics" },
      { id: "3", title: "Work and Energy", subject: "Physics" },
      { id: "4", title: "Circular Motion", subject: "Physics" }
    ],
    relatedFlashcards: [
      { id: "f1", title: "Newton's Laws Flashcards", count: 15 },
      { id: "f2", title: "Force and Motion Concepts", count: 10 }
    ],
    relatedPracticeTests: [
      { id: "p1", title: "Newton's Laws Quiz", questions: 10 },
      { id: "p2", title: "Mechanics Practice Test", questions: 25 }
    ],
    examples: [
      {
        title: "Car Braking",
        description: "When a car suddenly brakes, passengers feel pushed forward. This demonstrates Newton's First Law as their bodies resist the change in motion, continuing to move forward while the car slows down.",
        image: "/images/car-braking.jpg"
      },
      {
        title: "Rocket Propulsion",
        description: "Rockets demonstrate Newton's Third Law. As the engine expels gas downward (action), the rocket is propelled upward (reaction).",
        image: "/images/rocket.jpg"
      },
      {
        title: "Pushing Objects of Different Mass",
        description: "Pushing a shopping cart versus pushing a car demonstrates Newton's Second Law. The same force causes different accelerations due to different masses.",
        image: "/images/pushing-objects.jpg"
      }
    ],
    commonMistakes: [
      {
        title: "Confusing Mass and Weight",
        description: "Mass is the amount of matter in an object and doesn't change. Weight is the force of gravity acting on that mass and depends on location.",
        solution: "Remember that mass is measured in kilograms (kg), while weight is measured in newtons (N)."
      },
      {
        title: "Ignoring Other Forces",
        description: "Forgetting to account for friction or other forces when analyzing a problem.",
        solution: "Always identify ALL forces acting on an object when solving physics problems."
      },
      {
        title: "Misinterpreting the Third Law",
        description: "Thinking action-reaction pairs act on the same object.",
        solution: "Remember that action-reaction forces always act on DIFFERENT objects."
      }
    ],
    examRelevance: {
      importance: "High",
      frequency: "Very Common",
      questionTypes: ["Conceptual", "Numerical", "Application"],
      typicalQuestions: [
        "Explain how Newton's laws apply to an elevator accelerating upward.",
        "Calculate the force needed to accelerate a 1500kg car from rest to 60km/h in 10 seconds.",
        "Describe the forces acting on a book resting on a table."
      ]
    },
    videoAnalysis: [
      {
        title: "Newton's Laws Explained",
        url: "https://www.example.com/video1",
        duration: "8:24",
        description: "Clear explanation of all three laws with animated examples."
      },
      {
        title: "Problem Solving with Newton's Laws",
        url: "https://www.example.com/video2",
        duration: "12:15",
        description: "Step-by-step approaches to solve typical exam questions."
      }
    ]
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked ? "Removed from your saved items" : "Added to your saved items for quick access later",
      variant: isBookmarked ? "default" : "success",
    });
  };

  const handleToggleNarration = () => {
    setIsNarrating(!isNarrating);
    if (!isNarrating) {
      toast({
        title: "Voice narration started",
        description: "Listening to explanation of " + conceptData.title,
      });
    } else {
      toast({
        title: "Voice narration stopped",
      });
    }
  };

  const handleMarkAsComplete = () => {
    setCompletionStatus(100);
    toast({
      title: "Concept marked as complete!",
      description: "Great job on learning " + conceptData.title,
      variant: "success",
    });
  };

  return (
    <SharedPageLayout 
      title={conceptData.title} 
      subtitle={`${conceptData.subject} > ${conceptData.category} • ${conceptData.difficulty} • Est. time: ${conceptData.estimatedTime}`}
      showBackButton 
      backButtonUrl={`/dashboard/student/concepts/${conceptData.subject.toLowerCase()}`}
    >
      <div className="space-y-6">
        {/* Main Card with Tabs */}
        <Card className="shadow-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center border-b p-3">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="explanation" className="flex items-center gap-2 text-xs md:text-sm">
                  <BookOpen className="h-4 w-4 hidden sm:inline" />
                  <span>Explanations</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center gap-2 text-xs md:text-sm">
                  <List className="h-4 w-4 hidden sm:inline" />
                  <span>Examples</span>
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex items-center gap-2 text-xs md:text-sm">
                  <AlertTriangle className="h-4 w-4 hidden sm:inline" />
                  <span>Mistakes</span>
                </TabsTrigger>
                <TabsTrigger value="exams" className="flex items-center gap-2 text-xs md:text-sm">
                  <Monitor className="h-4 w-4 hidden sm:inline" />
                  <span>Exam Tips</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2 text-xs md:text-sm">
                  <Video className="h-4 w-4 hidden sm:inline" />
                  <span>Videos</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleToggleBookmark}
                  className={`gap-1 ${isBookmarked ? 'text-yellow-600 hover:text-yellow-700' : ''}`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-600' : ''}`} />
                  <span className="hidden sm:inline">Bookmark</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleToggleNarration}
                  className={`gap-1 ${isNarrating ? 'text-green-600 hover:text-green-700' : ''}`}
                >
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">{isNarrating ? 'Stop' : 'Narrate'}</span>
                </Button>
              </div>
            </div>

            <TabsContent value="explanation" className="m-0 p-0">
              <div className="p-6">
                <ConceptExplanationContent conceptTitle={conceptData.title} />
              </div>
            </TabsContent>

            <TabsContent value="examples" className="m-0 p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Real-World Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conceptData.examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-lg overflow-hidden border shadow-sm"
                    >
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-400">Example Image</div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-2">{example.title}</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mistakes" className="m-0 p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Common Mistakes to Avoid</h3>
                <div className="space-y-6">
                  {conceptData.commonMistakes.map((mistake, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4"
                    >
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {mistake.title}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{mistake.description}</p>
                      <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/20 rounded p-3">
                        <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-1">Solution:</p>
                        <p className="text-sm">{mistake.solution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="exams" className="m-0 p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Exam Relevance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
                      <h4 className="font-medium mb-2">Importance Level</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className={`bg-blue-600 h-2.5 rounded-full ${
                            conceptData.examRelevance.importance === 'High' ? 'w-full' : 
                            conceptData.examRelevance.importance === 'Medium' ? 'w-2/3' : 'w-1/3'
                          }`}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{conceptData.examRelevance.importance}</span>
                      </div>
                    </div>
                    
                    <div className="bg-violet-50 dark:bg-violet-900/10 rounded-lg p-4 border border-violet-100 dark:border-violet-900/20">
                      <h4 className="font-medium mb-2">Question Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {conceptData.examRelevance.questionTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-violet-100 dark:bg-violet-800/30 text-violet-800 dark:text-violet-300 rounded text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-4 border border-amber-100 dark:border-amber-900/20">
                    <h4 className="font-medium mb-3">Sample Exam Questions</h4>
                    <ul className="space-y-3">
                      {conceptData.examRelevance.typicalQuestions.map((question, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">Q{index + 1}.</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="m-0 p-0">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Video Analysis</h3>
                <div className="space-y-4">
                  {conceptData.videoAnalysis.map((video, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/3 h-40 bg-gray-200 flex items-center justify-center rounded">
                          <Play className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="w-full sm:w-2/3">
                          <h4 className="font-medium mb-2">{video.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Duration: {video.duration}</span>
                            <Button variant="outline" size="sm" className="gap-1">
                              <ExternalLink className="h-3 w-3" />
                              <span className="text-xs">Watch Video</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <CardFooter className="border-t p-4 bg-muted/30 flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${completionStatus}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{completionStatus}% complete</span>
            </div>
            <Button 
              onClick={handleMarkAsComplete}
              disabled={completionStatus === 100}
              variant="outline"
              className="gap-1"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{completionStatus === 100 ? 'Completed' : 'Mark Complete'}</span>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Related Content Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Related Content</h3>
          
          {/* Related Flashcards */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              Related Flashcards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {conceptData.relatedFlashcards.map((deck) => (
                <Link key={deck.id} to={`/dashboard/student/flashcards/${deck.id}/interactive`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h5 className="font-medium">{deck.title}</h5>
                      <p className="text-sm text-muted-foreground">{deck.count} cards</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Related Practice Tests */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Monitor className="h-4 w-4 text-violet-500" />
              Practice Tests
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {conceptData.relatedPracticeTests.map((test) => (
                <Link key={test.id} to={`/dashboard/student/practice-exam/${test.id}/start`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h5 className="font-medium">{test.title}</h5>
                      <p className="text-sm text-muted-foreground">{test.questions} questions</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Related Concept Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              Related Concept Cards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {conceptData.relatedConcepts.map((concept) => (
                <Link key={concept.id} to={`/dashboard/student/concepts/card/${concept.id}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h5 className="font-medium">{concept.title}</h5>
                      <p className="text-sm text-muted-foreground">{concept.subject}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
