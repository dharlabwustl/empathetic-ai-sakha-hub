
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SidebarLayout } from '@/components/dashboard/SidebarLayout';
import { ConceptMasterySection } from '@/components/dashboard/student/concepts/ConceptMasterySection';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { ConceptCard as ConceptCardType } from '@/types/user/conceptCard';
import ConceptHeader from '@/components/dashboard/student/concepts/concept-detail/ConceptHeader';
import ConceptSidebar from '@/components/dashboard/student/concepts/concept-detail/ConceptSidebar';
import { 
  Book, 
  Brain, 
  Video, 
  FileText, 
  MessageSquare, 
  Repeat, 
  PieChart, 
  FlaskConical, 
  Cube, 
  Eye,
  AlertCircle
} from 'lucide-react';

// Mock data for concept detail
const mockConcept: ConceptCardType = {
  id: "concept-1",
  title: "Ohm's Law",
  description: "The relationship between voltage, current, and resistance in electrical circuits.",
  subject: "Physics",
  chapter: "Electricity",
  topic: "Circuit Theory",
  difficulty: "medium",
  completed: false,
  progress: 65,
  relatedConcepts: [],
  content: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points, and inversely proportional to the resistance between them. The mathematical equation is I = V/R, where I is the current (in amperes), V is the voltage (in volts), and R is the resistance (in ohms).",
  examples: [
    "A circuit with a 9V battery and a 3Ω resistor will have a current of I = V/R = 9V/3Ω = 3A",
    "If the current in a circuit is 2A and the resistance is 5Ω, then the voltage is V = IR = 2A × 5Ω = 10V"
  ],
  commonMistakes: [
    "Confusing current and voltage",
    "Forgetting to convert units",
    "Not accounting for total resistance in a circuit"
  ],
  examRelevance: "Very high - appears in 80% of exams",
  recallAccuracy: 75,
  quizScore: 65,
  lastPracticed: "2023-08-15",
  timeSuggestion: 30,
  flashcardsTotal: 12,
  flashcardsCompleted: 8,
  examReady: false,
  bookmarked: true,
  estimatedTime: 30,
  keyPoints: [
    "Ohm's Law: I = V/R",
    "Current is directly proportional to voltage",
    "Current is inversely proportional to resistance",
    "Only applies to ohmic conductors"
  ],
  formulas: [
    "I = V/R (current = voltage / resistance)",
    "V = IR (voltage = current × resistance)",
    "R = V/I (resistance = voltage / current)",
    "P = VI (power = voltage × current)"
  ],
  notes: [
    "Remember that real conductors may not strictly follow Ohm's law under all conditions",
    "Temperature can affect resistance and therefore the relationship",
    "For non-ohmic conductors, the relationship is not linear"
  ],
  masteryLevel: 65,
  mastery: {
    level: "Intermediate",
    percentage: 65
  },
  videos: [
    {
      id: "vid1",
      title: "Understanding Ohm's Law",
      url: "https://www.youtube.com/watch?v=videoid1",
      duration: "8:24",
      thumbnail: "https://via.placeholder.com/320x180"
    },
    {
      id: "vid2",
      title: "Solving Ohm's Law Problems",
      url: "https://www.youtube.com/watch?v=videoid2",
      duration: "12:05",
      thumbnail: "https://via.placeholder.com/320x180"
    }
  ],
  resources: [
    {
      id: "res1",
      title: "Ohm's Law Practice Problems",
      type: "PDF",
      url: "#"
    },
    {
      id: "res2",
      title: "Interactive Ohm's Law Calculator",
      type: "Tool",
      url: "#"
    }
  ],
  practiceQuestions: [
    {
      id: "q1",
      question: "If a circuit has a resistance of 4Ω and a current of 2A, what is the voltage?",
      options: ["2V", "4V", "8V", "16V"],
      correctAnswer: "8V",
      explanation: "Using V = IR, V = 2A × 4Ω = 8V",
      difficulty: "easy"
    },
    {
      id: "q2",
      question: "Which of the following correctly states Ohm's Law?",
      options: [
        "Voltage is inversely proportional to current",
        "Current is directly proportional to resistance",
        "Current is directly proportional to voltage and inversely proportional to resistance",
        "Resistance is directly proportional to current"
      ],
      correctAnswer: "Current is directly proportional to voltage and inversely proportional to resistance",
      explanation: "Ohm's Law states that I = V/R, which means current is directly proportional to voltage and inversely proportional to resistance.",
      difficulty: "medium"
    }
  ]
};

// Mock data for related concepts
const mockRelatedConcepts = [
  {
    id: "concept-2",
    title: "Kirchhoff's Laws",
    masteryLevel: 45
  },
  {
    id: "concept-3",
    title: "Series Circuits",
    masteryLevel: 70
  },
  {
    id: "concept-4",
    title: "Parallel Circuits",
    masteryLevel: 60
  }
];

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [concept, setConcept] = useState<ConceptCardType | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");
  
  // Fetch concept data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        if (conceptId) {
          // In a real app, this would be an API call
          setConcept(mockConcept);
          setIsBookmarked(mockConcept.bookmarked || false);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load concept data. Please try again.");
        setLoading(false);
      }
    }, 1000);
  }, [conceptId]);
  
  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your bookmarks" : "Concept added to your bookmarks",
    });
  };
  
  if (loading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (error || !concept) {
    return (
      <ErrorState 
        title="Error loading concept"
        message={error || "Concept data not found."}
        action={
          <Button onClick={() => navigate("/dashboard/student/concepts")}>
            Back to Concepts
          </Button>
        }
      />
    );
  }
  
  return (
    <SidebarLayout>
      <Helmet>
        <title>{concept.title} - PREPZR</title>
      </Helmet>
      
      <div className="container mx-auto p-4">
        {/* Back button navigation */}
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/dashboard/student/concepts")}
        >
          ← Back to Concepts
        </Button>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concept header with title and metadata */}
            <ConceptHeader
              title={concept.title}
              subject={concept.subject}
              topic={concept.topic || concept.subject}
              difficulty={concept.difficulty}
              isBookmarked={isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
            />
            
            {/* Mastery tracker card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  Mastery & Recall Tracker
                </h2>
                <Badge variant="outline" className={
                  concept.mastery?.level === "Expert" || concept.masteryLevel >= 90 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                  concept.mastery?.level === "Advanced" || concept.masteryLevel >= 75 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                  concept.mastery?.level === "Intermediate" || concept.masteryLevel >= 60 ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" :
                  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                }>
                  {concept.mastery?.level || "Intermediate"} Level
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mastery Level</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{concept.masteryLevel}%</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400">+5% this week</div>
                  </div>
                  <Progress value={concept.masteryLevel || 0} className="h-1 mt-2" />
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recall Accuracy</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{concept.recallAccuracy}%</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Last: 3 days ago</div>
                  </div>
                  <Progress value={concept.recallAccuracy || 0} className="h-1 mt-2" />
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-900/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quiz Score</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{concept.quizScore}%</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">Last: 1 week ago</div>
                  </div>
                  <Progress value={concept.quizScore || 0} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">AI Insights</div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1.5">
                  Your recall accuracy has improved 10% in the last two weeks. Focus on the "Current vs. Voltage Relationship" subtopic to reach mastery level.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button size="sm" variant="outline" className="text-xs">Review Now</Button>
                <Button size="sm" variant="outline" className="text-xs">Take Quiz</Button>
                <Button size="sm" variant="outline" className="text-xs">Practice Recall</Button>
              </div>
            </motion.div>
            
            {/* Tabs section with all content areas */}
            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full overflow-x-auto flex no-scrollbar pb-0.5">
                <TabsTrigger value="learn" className="flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  <span>Learn</span>
                </TabsTrigger>
                
                <TabsTrigger value="visual" className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>Visual</span>
                </TabsTrigger>
                
                <TabsTrigger value="3d" className="flex items-center gap-1">
                  <Cube className="h-4 w-4" />
                  <span>3D Simulation</span>
                </TabsTrigger>
                
                <TabsTrigger value="formula" className="flex items-center gap-1">
                  <FlaskConical className="h-4 w-4" />
                  <span>Formula Lab</span>
                </TabsTrigger>
                
                <TabsTrigger value="video" className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>Video</span>
                </TabsTrigger>
                
                <TabsTrigger value="mistakes" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Common Mistakes</span>
                </TabsTrigger>
                
                <TabsTrigger value="recall" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>Recall</span>
                </TabsTrigger>
                
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <PieChart className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                
                <TabsTrigger value="revision" className="flex items-center gap-1">
                  <Repeat className="h-4 w-4" />
                  <span>Revision</span>
                </TabsTrigger>
                
                <TabsTrigger value="notes" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Notes</span>
                </TabsTrigger>
                
                <TabsTrigger value="discuss" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Discuss</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Learn tab content */}
              <TabsContent value="learn" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <article className="prose dark:prose-invert max-w-none">
                      <h2>Understanding {concept.title}</h2>
                      <p>{concept.content}</p>
                      
                      {concept.keyPoints && concept.keyPoints.length > 0 && (
                        <>
                          <h3>Key Points</h3>
                          <ul>
                            {concept.keyPoints.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {concept.examples && concept.examples.length > 0 && (
                        <>
                          <h3>Examples</h3>
                          <ol>
                            {concept.examples.map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ol>
                        </>
                      )}
                      
                      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                          <span className="p-1 bg-blue-100 dark:bg-blue-800 rounded-md">
                            <Book className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </span>
                          Exam Relevance
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {concept.examRelevance || "This concept frequently appears in exams and is considered essential knowledge."}
                        </p>
                      </div>
                    </article>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Visual tab content */}
              <TabsContent value="visual" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Visual Learning</h2>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Visual representation of {concept.title}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Visual learning helps reinforce concepts through diagrams, graphs, and illustrations. 
                      Seeing the relationship between variables makes it easier to understand complex topics.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 3D Simulation tab content */}
              <TabsContent value="3d" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">3D Interactive Simulation</h2>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">3D simulation of {concept.title}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Interact with a 3D model to understand how changing variables affects outcomes. 
                      This hands-on approach builds intuitive understanding of the concept.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reset Simulation</Button>
                      <Button variant="outline" size="sm">Toggle Variables</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Formula Lab tab content */}
              <TabsContent value="formula" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Formula Lab</h2>
                    {concept.formulas && concept.formulas.length > 0 ? (
                      <div className="space-y-4">
                        {concept.formulas.map((formula, idx) => (
                          <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="font-mono text-lg text-center my-2">{formula}</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button size="sm" variant="outline">Practice</Button>
                              <Button size="sm" variant="outline">Derivation</Button>
                              <Button size="sm" variant="outline">Calculator</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No formulas available for this concept.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Video tab content */}
              <TabsContent value="video" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Video Lessons</h2>
                    {concept.videos && concept.videos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {concept.videos.map((video) => (
                          <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button variant="ghost" className="rounded-full h-12 w-12 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{video.title}</h3>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{video.duration}</span>
                                <Button variant="ghost" size="sm">Watch</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No videos available for this concept.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Common Mistakes tab content */}
              <TabsContent value="mistakes" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Common Mistakes to Avoid</h2>
                    {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                      <div className="space-y-4">
                        {concept.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/50">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                              <div>
                                <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">Mistake #{idx + 1}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{mistake}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No common mistakes listed for this concept.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Recall tab content */}
              <TabsContent value="recall" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Active Recall</h2>
                    <p className="mb-4">Test your understanding with these active recall questions:</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium mb-2">What is the formula for {concept.title}?</h3>
                        <Button className="mr-2">Show Answer</Button>
                        <Button variant="outline">Next Question</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Analytics tab content */}
              <TabsContent value="analytics" className="focus-visible:outline-none focus-visible:ring-0">
                <ConceptMasterySection 
                  conceptId={concept.id}
                  recallAccuracy={concept.recallAccuracy}
                  quizScore={concept.quizScore}
                  lastPracticed={concept.lastPracticed}
                />
              </TabsContent>
              
              {/* Revision tab content */}
              <TabsContent value="revision" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Revision Plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium mb-2">Spaced Repetition Schedule</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span>First revision</span>
                            <span className="font-medium">Today</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Second revision</span>
                            <span className="font-medium">In 3 days</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Third revision</span>
                            <span className="font-medium">In 1 week</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium mb-2">Memory Anchors</h3>
                        <p className="text-sm">Use these memory techniques to improve recall:</p>
                        <ul className="list-disc ml-5 mt-2 text-sm">
                          <li>Visualize a battery pushing electrons through a resistor</li>
                          <li>Remember "VIR" as "Very Important Relationship"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notes tab content */}
              <TabsContent value="notes" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Your Notes</h2>
                    {concept.notes && concept.notes.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {concept.notes.map((note, idx) => (
                          <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mb-4">No notes yet. Add your first note below.</p>
                    )}
                    <div className="flex gap-2">
                      <Button>Add Note</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Discuss tab content */}
              <TabsContent value="discuss" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Discuss with AI Tutor</h2>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 max-h-96 overflow-y-auto mb-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                            <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                            <p>Hello! I'm your AI tutor. What would you like to know about {concept.title}?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Ask a question about this concept..." 
                      />
                      <Button>Ask</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <ConceptSidebar
              masteryLevel={concept.masteryLevel || 0}
              relatedConcepts={mockRelatedConcepts}
              examReady={concept.examReady || false}
            />
            
            {/* Quick practice actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 px-4 py-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Quick Practice</h3>
              </div>
              <div className="p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Take a Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  Practice Flashcards
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Formula Practice
                </Button>
              </div>
            </motion.div>
            
            {/* Recommended resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-4 py-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Recommended Resources</h3>
              </div>
              <div className="p-4 space-y-3">
                {concept.resources && concept.resources.map((resource) => (
                  <a 
                    key={resource.id}
                    href={resource.url}
                    className="flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      {resource.type === 'PDF' && <FileText className="mr-2 h-4 w-4 text-red-500" />}
                      {resource.type === 'Tool' && <FlaskConical className="mr-2 h-4 w-4 text-blue-500" />}
                      {resource.type === 'Video' && <Video className="mr-2 h-4 w-4 text-green-500" />}
                      <span className="text-sm">{resource.title}</span>
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ConceptDetailPage;
