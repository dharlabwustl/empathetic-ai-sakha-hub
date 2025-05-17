
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, BookOpen, Brain, Star, BarChart, BookText, MoveLeft, HeartPulse, CheckCircle, AlertCircle, Volume2, BarChart2, Flame, Lightbulb, ArrowRight } from 'lucide-react';
import SharedPageLayout from '@/components/dashboard/student/SharedPageLayout';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

// Sample data for concept card
const dummyConceptData = {
  id: "concept-1",
  title: "Kinematics in One Dimension",
  subject: "Physics",
  description: "The study of motion without considering its causes, focusing on displacement, velocity, and acceleration in a straight line.",
  masteryLevel: 85,
  difficultyLevel: "Medium",
  learningPathPosition: 3,
  estimatedTimeToMaster: "45 minutes",
  prerequisites: ["Basic Mathematics", "Vector Basics"],
  relatedConcepts: [
    { id: "concept-2", title: "Kinematics in Two Dimensions" },
    { id: "concept-3", title: "Newton's Laws of Motion" },
    { id: "concept-4", title: "Work and Energy" }
  ],
  content: {
    overview: "Kinematics is the branch of mechanics that describes the motion of objects without considering the causes of motion. In one-dimensional kinematics, we study motion along a straight line.\n\nThe key parameters we study are position (x), displacement (Δx), velocity (v), and acceleration (a). These parameters are related through a set of equations that allow us to predict the position and velocity of an object at any time if we know its initial conditions and acceleration.",
    keyPoints: [
      "Position is defined as the location of an object relative to a reference point",
      "Displacement is the change in position, defined as the final position minus the initial position",
      "Velocity is the rate of change of position with respect to time",
      "Acceleration is the rate of change of velocity with respect to time",
      "For constant acceleration, we can use a set of kinematic equations to relate position, velocity, and time"
    ],
    equations: [
      { id: "eq1", equation: "v = v₀ + at", description: "Final velocity equals initial velocity plus acceleration times time" },
      { id: "eq2", equation: "x = x₀ + v₀t + ½at²", description: "Position as a function of initial position, initial velocity, time, and acceleration" },
      { id: "eq3", equation: "v² = v₀² + 2a(x - x₀)", description: "Relates final velocity to initial velocity, acceleration, and displacement" }
    ],
    examples: [
      {
        id: "ex1",
        title: "Calculating Final Velocity",
        problem: "A car accelerates from rest at 4 m/s² for 10 seconds. What is its final velocity?",
        solution: "Using v = v₀ + at:\nv = 0 + (4 m/s²)(10 s) = 40 m/s"
      },
      {
        id: "ex2",
        title: "Finding Displacement",
        problem: "A ball is thrown upward with an initial velocity of 15 m/s. How high does it go?",
        solution: "Using v² = v₀² + 2a(x - x₀) and knowing that v = 0 at the highest point:\n0 = (15 m/s)² + 2(-9.8 m/s²)(x - 0)\nx = (15 m/s)²/(2 * 9.8 m/s²) = 11.5 m"
      }
    ],
    commonMisconceptions: [
      "Confusing average velocity with instantaneous velocity",
      "Thinking that zero velocity means zero acceleration",
      "Applying kinematic equations when acceleration is not constant"
    ],
    applicationScenarios: [
      "Analyzing the motion of vehicles in transportation",
      "Predicting the landing position of projectiles",
      "Designing safety systems that account for stopping distances"
    ]
  },
  studyStats: {
    timesViewed: 12,
    lastReviewDate: "2023-05-10T14:30:00Z",
    masteryScoreHistory: [
      { date: "2023-04-01", score: 65 },
      { date: "2023-04-15", score: 72 },
      { date: "2023-05-01", score: 78 },
      { date: "2023-05-10", score: 85 }
    ],
    recallAccuracy: 78,
    practiceTestResults: [
      { date: "2023-04-05", score: 70, timeSpent: "8 minutes" },
      { date: "2023-04-20", score: 75, timeSpent: "7 minutes" },
      { date: "2023-05-05", score: 82, timeSpent: "6 minutes" }
    ]
  },
  flashcards: [
    { id: "fc1", question: "What is displacement?", answer: "The change in position of an object, defined as the final position minus the initial position." },
    { id: "fc2", question: "What is the equation for final velocity under constant acceleration?", answer: "v = v₀ + at" }
  ]
};

// New analytics data
const analyticsData = {
  masteryScore: 85,
  recallStrength: 78,
  attemptHistory: [
    { date: "2023-04-05", score: 70, type: "Practice Test" },
    { date: "2023-04-20", score: 75, type: "Flashcard Session" },
    { date: "2023-05-05", score: 82, type: "Quiz" },
    { date: "2023-05-10", score: 85, type: "Self-Assessment" },
  ],
  timeEngaged: "3 hours 45 minutes",
  weaknessAreas: ["Acceleration calculations", "Time-displacement graphs"],
  strengths: ["Basic equations", "Velocity calculations"],
  recommendedActions: [
    "Practice more acceleration problems",
    "Review graph interpretations",
    "Try interactive simulations"
  ]
};

// AI insights data
const aiInsightsData = {
  weakLinks: [
    { 
      concept: "Interpreting acceleration graphs", 
      description: "You've struggled with questions involving interpretation of acceleration-time graphs",
      recommendation: "Review the relationship between the area under acceleration-time graphs and velocity changes"
    },
    {
      concept: "Free fall problems", 
      description: "Your accuracy on free fall problems is lower than other kinematics topics",
      recommendation: "Focus on the sign convention for gravity and practice more free fall scenarios"
    }
  ],
  revisionSuggestions: [
    "Spaced repetition of the three key kinematic equations",
    "Try explaining kinematics concepts in your own words to strengthen understanding",
    "Create your own examples relating to real-world scenarios"
  ],
  connectionToFutureTopics: [
    {
      topic: "Newton's Laws",
      relevance: "Understanding kinematics is essential before learning how forces cause acceleration",
    },
    {
      topic: "Work and Energy",
      relevance: "Kinematic equations can be derived from energy conservation principles"
    }
  ],
  personalizedTips: [
    "Based on your learning style, try using more visual aids when studying graphs",
    "Your recall accuracy improves 30% when you use mnemonic devices for equations",
    "Consider studying this topic in the morning when your focus scores are highest"
  ]
};

const ConceptCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notes, setNotes] = useState<string>(localStorage.getItem(`concept-notes-${id}`) || '');
  const [showAiInsights, setShowAiInsights] = useState(false);
  const { speakMessage, toggleMute, voiceSettings, isSpeaking } = useVoiceAnnouncer();
  
  // Fetch concept data when ID changes
  useEffect(() => {
    console.log("Loading concept with ID:", id);
    // In a real app, we would fetch the concept data from an API here
    // For now, we'll use the dummy data
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleReadAloud = () => {
    if (contentRef.current) {
      // Extract text content to read
      const textToRead = `Concept: ${dummyConceptData.title}. ${dummyConceptData.content.overview}`;
      speakMessage(textToRead);
      
      toast({
        title: "Reading aloud",
        description: "The content is being read aloud. Click the button again to stop.",
      });
    }
  };

  const handleStopReading = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      toast({
        title: "Reading stopped",
        description: "Text-to-speech has been stopped.",
      });
    }
  };

  // Save notes to localStorage when they change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(`concept-notes-${id}`, newNotes);
  };

  const navigateToRelatedConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const navigateToFlashcards = () => {
    navigate(`/dashboard/student/flashcards/${id}`);
  };

  const navigateToPracticeExam = () => {
    navigate(`/dashboard/student/practice-exam`);
  };

  const navigateToFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${id}/formula-lab`);
  };

  return (
    <SharedPageLayout
      title={dummyConceptData.title}
      subtitle={`${dummyConceptData.subject} • ${dummyConceptData.difficultyLevel} • ${dummyConceptData.estimatedTimeToMaster}`}
      showBackButton={true}
      backButtonAction={handleBackClick}
      extraHeaderContent={
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Concept {dummyConceptData.learningPathPosition}/15
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Mastery: {dummyConceptData.masteryLevel}%
          </Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-2">
        {/* Main content - left and center columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Voice controls and study tools */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={isSpeaking ? handleStopReading : handleReadAloud}
            >
              <Volume2 className="h-4 w-4" />
              {isSpeaking ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={navigateToFlashcards}
            >
              <BookOpen className="h-4 w-4" />
              Interactive Flashcards
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={navigateToPracticeExam}
            >
              <CheckCircle className="h-4 w-4" />
              Practice Questions
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={navigateToFormulaLab}
            >
              <Brain className="h-4 w-4" />
              Formula Lab
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowAiInsights(!showAiInsights)}
            >
              <Lightbulb className="h-4 w-4" />
              AI Insights
            </Button>
          </div>

          {/* Main content card with tabs */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">{dummyConceptData.title}</CardTitle>
              <CardDescription>{dummyConceptData.description}</CardDescription>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Mastery Level</span>
                  <span>{dummyConceptData.masteryLevel}%</span>
                </div>
                <Progress value={dummyConceptData.masteryLevel} className="h-2" />
              </div>
            </CardHeader>
            <CardContent ref={contentRef}>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="equations">Equations</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="misconceptions">Misconceptions</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <p className="text-base leading-7">{dummyConceptData.content.overview}</p>
                  <div>
                    <h3 className="font-semibold text-base mb-2">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {dummyConceptData.content.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="equations" className="mt-4">
                  <h3 className="font-semibold text-base mb-4">Essential Equations</h3>
                  <div className="space-y-4">
                    {dummyConceptData.content.equations.map((eq) => (
                      <div key={eq.id} className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                        <div className="text-lg font-semibold text-center mb-2">{eq.equation}</div>
                        <div className="text-sm text-gray-700">{eq.description}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-4 space-y-6">
                  {dummyConceptData.content.examples.map((example) => (
                    <div key={example.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{example.title}</h4>
                      <div className="bg-gray-50 p-3 rounded mb-3">
                        <h5 className="text-sm font-medium mb-1">Problem:</h5>
                        <p>{example.problem}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <h5 className="text-sm font-medium mb-1">Solution:</h5>
                        <p className="whitespace-pre-line">{example.solution}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="misconceptions" className="mt-4">
                  <h3 className="font-semibold text-base mb-3">Common Misconceptions</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    {dummyConceptData.content.commonMisconceptions.map((item, index) => (
                      <li key={index} className="text-base">
                        <span className="font-medium text-red-600">Misconception:</span> {item}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="applications" className="mt-4">
                  <h3 className="font-semibold text-base mb-3">Real-World Applications</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    {dummyConceptData.content.applicationScenarios.map((item, index) => (
                      <li key={index} className="text-base">{item}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* AI Insights panel - collapsible */}
          {showAiInsights && (
            <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                    AI Learning Insights
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAiInsights(false)}
                    className="h-7 w-7 p-0 rounded-full"
                  >
                    ×
                  </Button>
                </div>
                <CardDescription>Personalized recommendations to improve your mastery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-base mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                      Potential Weak Links
                    </h3>
                    {aiInsightsData.weakLinks.map((item, i) => (
                      <div key={i} className="mb-3 p-3 bg-white rounded-md border border-orange-100">
                        <p className="font-medium text-orange-700">{item.concept}</p>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-700 mt-1"><span className="font-medium">Try this:</span> {item.recommendation}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Revision Suggestions
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {aiInsightsData.revisionSuggestions.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2 flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                      Connection to Future Topics
                    </h3>
                    {aiInsightsData.connectionToFutureTopics.map((item, i) => (
                      <div key={i} className="mb-2">
                        <p className="font-medium">{item.topic}</p>
                        <p className="text-gray-600">{item.relevance}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2 flex items-center">
                      <Flame className="h-4 w-4 mr-2 text-purple-500" />
                      Personalized Learning Tips
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {aiInsightsData.personalizedTips.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes section */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">My Notes</CardTitle>
              <CardDescription>Take personal notes on this concept to aid your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Add your notes here..." 
                className="min-h-[150px] resize-y"
                value={notes}
                onChange={handleNotesChange}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => {
                toast({
                  title: "Notes saved",
                  description: "Your notes have been saved successfully."
                });
              }}>
                Save Notes
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right sidebar with analytics and related content */}
        <div className="space-y-4">
          {/* Analytics card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-600" />
                Learning Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Mastery Score</span>
                  <span>{analyticsData.masteryScore}%</span>
                </div>
                <Progress value={analyticsData.masteryScore} className="h-2 bg-gray-100" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Recall Strength</span>
                  <span>{analyticsData.recallStrength}%</span>
                </div>
                <Progress value={analyticsData.recallStrength} className="h-2 bg-gray-100" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Attempt History</h4>
                <div className="space-y-2 text-sm">
                  {analyticsData.attemptHistory.map((attempt, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{attempt.type} ({attempt.date})</span>
                      <Badge variant={attempt.score >= 80 ? "success" : "outline"}>
                        {attempt.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-1">Areas to Improve</h4>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  {analyticsData.weaknessAreas.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2">
                Total time engaged: {analyticsData.timeEngaged}
              </div>
            </CardContent>
          </Card>

          {/* Related concepts */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dummyConceptData.relatedConcepts.map((concept) => (
                <Button
                  key={concept.id}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigateToRelatedConcept(concept.id)}
                >
                  <span className="truncate">{concept.title}</span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dummyConceptData.prerequisites.map((prereq, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flashcards preview */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Flashcards</CardTitle>
              <CardDescription>Quick review with flashcards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummyConceptData.flashcards.map((flashcard) => (
                <Card key={flashcard.id} className="bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">{flashcard.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-sm text-muted-foreground">
                    Click to reveal answer...
                  </CardContent>
                </Card>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={navigateToFlashcards}
              >
                View All Flashcards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
