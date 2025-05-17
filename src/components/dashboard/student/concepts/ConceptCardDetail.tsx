
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/hooks/use-toast";
import { 
  Sparkles, BookOpen, Brain, FlaskConical, PenLine, 
  BookText, FileText, Play, BookMarked, BarChart3, 
  ArrowLeft, Volume2, Save, Link, Clock, CheckCircle,
  AlertCircle, ListChecks, Layers3, Lightbulb, Files, Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for the concept detail
const mockConcept = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  content: `
    <h2>Introduction to Newton's Laws of Motion</h2>
    <p>Newton's laws of motion are fundamental principles that describe the relationship between an object and the forces acting upon it. These laws form the foundation of classical mechanics and are critical for understanding physical phenomena.</p>
    
    <h3>First Law: Law of Inertia</h3>
    <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.</p>
    
    <h3>Second Law: F = ma</h3>
    <p>The acceleration of an object depends on the mass of the object and the force applied. This can be expressed as F = ma, where F is the force, m is the mass, and a is the acceleration.</p>
    
    <h3>Third Law: Action and Reaction</h3>
    <p>For every action, there is an equal and opposite reaction. If object A exerts a force on object B, then object B exerts an equal and opposite force on object A.</p>
    
    <h2>Applications of Newton's Laws</h2>
    <p>Newton's laws are applied in numerous scenarios from everyday situations to complex engineering problems:</p>
    <ul>
      <li>Automotive design and safety</li>
      <li>Aerospace engineering</li>
      <li>Sports performance analysis</li>
      <li>Structural engineering</li>
      <li>Biomechanics</li>
    </ul>
    
    <h2>Common Misconceptions</h2>
    <p>One common misconception is that a force is needed to keep an object in motion. According to the first law, once an object is in motion, it will continue in motion with the same speed and direction unless a force acts upon it.</p>
  `,
  difficulty: "medium",
  estimatedTime: "45 min",
  tags: ["#Mechanics", "#Force", "#Motion"],
  relatedConcepts: [
    { id: '2', title: 'Conservation of Momentum', subject: 'Physics' },
    { id: '3', title: 'Work and Energy', subject: 'Physics' },
    { id: '4', title: 'Circular Motion', subject: 'Physics' }
  ],
  practiceExams: [
    { id: 'e1', title: 'Newton\'s Laws Practice Test', questions: 15 },
    { id: 'e2', title: 'Mechanics Fundamentals', questions: 20 }
  ],
  formulas: [
    { id: 'f1', equation: 'F = ma', variables: [
      { symbol: 'F', description: 'Force (N)' },
      { symbol: 'm', description: 'Mass (kg)' },
      { symbol: 'a', description: 'Acceleration (m/s²)' }
    ]},
    { id: 'f2', equation: 'W = F·d·cos(θ)', variables: [
      { symbol: 'W', description: 'Work (J)' },
      { symbol: 'F', description: 'Force (N)' },
      { symbol: 'd', description: 'Distance (m)' },
      { symbol: 'θ', description: 'Angle between force and displacement' }
    ]},
    { id: 'f3', equation: 'p = mv', variables: [
      { symbol: 'p', description: 'Momentum (kg·m/s)' },
      { symbol: 'm', description: 'Mass (kg)' },
      { symbol: 'v', description: 'Velocity (m/s)' }
    ]}
  ],
  studyStats: {
    masteryLevel: 72,
    studyTimeSpent: 210, // minutes
    lastStudied: '2023-06-15',
    attemptHistory: [
      { date: '2023-06-10', score: 65, timeSpent: 45 },
      { date: '2023-06-12', score: 70, timeSpent: 55 },
      { date: '2023-06-15', score: 72, timeSpent: 40 }
    ],
    recallStrength: 68,
    weakAreas: [
      { topic: 'Third Law Applications', confidence: 55 },
      { topic: 'Force Calculations', confidence: 60 }
    ]
  }
};

// Artificial Intelligence generated insights
const aiInsights = {
  strengths: [
    "Strong understanding of First Law principles",
    "Good grasp of basic equations and their applications"
  ],
  weaknesses: [
    "Difficulty applying Third Law in complex scenarios",
    "Need more practice with quantitative force problems"
  ],
  revisionSuggestions: [
    "Review Third Law applications with vector diagrams",
    "Practice force calculation problems with varying friction coefficients",
    "Connect Newton's Second Law with circular motion concepts"
  ],
  learningRecommendations: [
    "Try the interactive simulation 'Forces in Motion'",
    "Watch Dr. Singh's video explanation of Third Law paradoxes",
    "Solve problem set #42 in your question bank"
  ]
};

const ConceptCardDetail = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept] = useState(mockConcept);
  const [userNotes, setUserNotes] = useState(localStorage.getItem(`concept-notes-${conceptId}`) || '');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log view event for analytics
    console.log(`Viewing concept: ${conceptId}`);
    
    // Fetch concept data here in a real app
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set up voice speaking ended listener
    const handleSpeakingEnded = () => {
      setIsReadingAloud(false);
    };
    
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      // Clean up event listener
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, [conceptId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
  }, [userNotes, conceptId]);

  const handleBackClick = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      // Cancel speech if already reading
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsReadingAloud(false);
      return;
    }

    // Extract text content from HTML
    let textToRead = '';
    if (contentRef.current) {
      const textContent = contentRef.current.textContent || '';
      textToRead = textContent.replace(/\s+/g, ' ').trim();
    }

    if (textToRead && 'speechSynthesis' in window) {
      // Create utterance with proper PREPZR pronunciation (Prep-zer)
      const correctedText = textToRead.replace(/PREPZR/gi, 'Prep-zer');
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an Indian female voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianFemaleVoice = voices.find(v => 
        (v.name.includes('Indian') || v.lang === 'en-IN' || v.lang === 'hi-IN') && 
        (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
      );
      
      if (indianFemaleVoice) {
        utterance.voice = indianFemaleVoice;
      }
      
      // Set properties
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsReadingAloud(true);
      };
      
      utterance.onend = () => {
        setIsReadingAloud(false);
      };
      
      utterance.onerror = () => {
        setIsReadingAloud(false);
        toast({
          title: "Read Aloud Error",
          description: "There was a problem with the text-to-speech service.",
          variant: "destructive"
        });
      };
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
    } else {
      toast({
        title: "Read Aloud Not Available",
        description: "Text-to-speech is not supported in your browser or no content to read.",
        variant: "destructive"
      });
    }
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };

  const handleRelatedConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  const handlePracticeExamClick = (examId: string) => {
    navigate(`/dashboard/student/practice/${examId}`);
  };

  const handleFlashcardsClick = () => {
    navigate(`/dashboard/student/flashcards?concept=${conceptId}`);
  };

  // Determine mastery level color
  const getMasteryLevelColor = (level: number) => {
    if (level < 40) return 'bg-red-500';
    if (level < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get difficulty badge class
  const getDifficultyBadgeClass = (difficulty: string) => {
    if (difficulty === "easy") return 'bg-green-100 text-green-800 hover:bg-green-200';
    if (difficulty === "medium") return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    return 'bg-red-100 text-red-800 hover:bg-red-200';
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.topic}`}
      showBackButton
      onBackClick={handleBackClick}
      extraHeaderContent={
        <div className="flex items-center gap-2 ml-auto">
          <Button
            size="sm"
            variant={isReadingAloud ? "destructive" : "outline"}
            className="flex items-center gap-1"
            onClick={handleReadAloud}
          >
            <Volume2 size={16} />
            {isReadingAloud ? "Stop Reading" : "Read Aloud"}
          </Button>
          
          <Badge className={getDifficultyBadgeClass(concept.difficulty)}>
            {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock size={14} />
            {concept.estimatedTime}
          </Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - takes 2/3 on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Study Content</CardTitle>
                <div className="flex items-center gap-2">
                  {concept.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardDescription>
                Master this concept with our comprehensive material
              </CardDescription>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="content">
                  <BookText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="formulas">
                  <FileText className="h-4 w-4 mr-2" />
                  Formulas
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <PenLine className="h-4 w-4 mr-2" />
                  My Notes
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-4">
                <CardContent ref={contentRef}>
                  <div className="prose prose-sm dark:prose-invert max-w-none" 
                       dangerouslySetInnerHTML={{ __html: concept.content }} />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="formulas" className="mt-4">
                <CardContent>
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Key Formulas</h3>
                    
                    {concept.formulas.map((formula) => (
                      <div key={formula.id} className="p-4 border rounded-md bg-muted/30">
                        <div className="text-xl font-medium text-center my-2">
                          {formula.equation}
                        </div>
                        <div className="text-sm mt-4">
                          <h4 className="font-medium mb-2">Where:</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {formula.variables.map((variable, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="font-medium">{variable.symbol}</span>
                                <span>= {variable.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-4">
                      <Layers3 className="mr-2 h-4 w-4" />
                      Open Formula Lab
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-4">
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">My Study Notes</h3>
                    <Textarea
                      placeholder="Take your personal notes on this concept here..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="min-h-[200px] w-full"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotes} className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-4">
                <CardContent>
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Learning Analytics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Mastery Level</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{concept.studyStats.masteryLevel}%</div>
                          <Progress 
                            value={concept.studyStats.masteryLevel} 
                            className={`h-2 mt-2 ${getMasteryLevelColor(concept.studyStats.masteryLevel)}`} 
                          />
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Recall Strength</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{concept.studyStats.recallStrength}%</div>
                          <Progress 
                            value={concept.studyStats.recallStrength} 
                            className={`h-2 mt-2 ${getMasteryLevelColor(concept.studyStats.recallStrength)}`} 
                          />
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.round(concept.studyStats.studyTimeSpent / 60)} hrs</div>
                          <p className="text-sm text-muted-foreground">Last studied: {concept.studyStats.lastStudied}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Attempt History</h4>
                      <div className="space-y-2">
                        {concept.studyStats.attemptHistory.map((attempt, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{attempt.date}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm">
                                <Clock className="inline mr-1 h-3 w-3" />
                                {attempt.timeSpent} min
                              </span>
                              <span className="font-medium">{attempt.score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Areas for Improvement</h4>
                      <div className="space-y-2">
                        {concept.studyStats.weakAreas.map((area, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{area.topic}</span>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={area.confidence} 
                                className={`h-2 w-20 ${getMasteryLevelColor(area.confidence)}`}
                              />
                              <span>{area.confidence}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* AI Insights Card */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/40 dark:to-blue-950/30 border-purple-200 dark:border-purple-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Insights & Suggestions
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Your Strengths
                  </h4>
                  <ul className="text-sm space-y-1">
                    {aiInsights.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-green-500">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-amber-500" /> Areas to Improve
                  </h4>
                  <ul className="text-sm space-y-1">
                    {aiInsights.weaknesses.map((weakness, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-500">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <ListChecks className="h-4 w-4 text-blue-500" /> Revision Suggestions
                  </h4>
                  <ul className="text-sm space-y-1">
                    {aiInsights.revisionSuggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2 flex items-center gap-1">
                    <Lightbulb className="h-4 w-4 text-purple-500" /> Recommendations
                  </h4>
                  <ul className="text-sm space-y-1">
                    {aiInsights.learningRecommendations.map((recommendation, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-purple-500">•</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar content - takes 1/3 on large screens */}
        <div className="space-y-6">
          {/* Related Study Materials */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Tools</CardTitle>
              <CardDescription>
                Resources to enhance your learning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleFlashcardsClick}
              >
                <Files className="mr-2 h-4 w-4" />
                <span>Interactive Flashcards</span>
              </Button>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Practice Exams</h4>
                <div className="space-y-2">
                  {concept.practiceExams.map(exam => (
                    <Button 
                      key={exam.id}
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handlePracticeExamClick(exam.id)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      <div className="flex justify-between items-center w-full">
                        <span>{exam.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {exam.questions} Q
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Related Concepts</h4>
                <div className="space-y-2">
                  {concept.relatedConcepts.map(relatedConcept => (
                    <Button 
                      key={relatedConcept.id}
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleRelatedConceptClick(relatedConcept.id)}
                    >
                      <Link className="mr-2 h-4 w-4" />
                      <div className="flex justify-between items-center w-full">
                        <span>{relatedConcept.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {relatedConcept.subject}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="default" 
                className="w-full"
                onClick={handleReadAloud}
              >
                <Volume2 className="mr-2 h-4 w-4" />
                {isReadingAloud ? "Stop Reading" : "Read Aloud"}
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleFlashcardsClick}
              >
                <Brain className="mr-2 h-4 w-4" />
                Practice with Flashcards
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  navigate('/dashboard/student/concepts');
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Concepts
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // Toggle bookmark functionality here
                  toast({
                    title: "Concept Bookmarked",
                    description: "Added to your saved concepts"
                  });
                }}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save for Later
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
