
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  ArrowRight, 
  BookText, 
  FileText, 
  Play,
  Headphones,
  FileVideo,
  Notes,
  BrainCircuit,
  Star,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for the concept details
const mockConcept = {
  id: "concept-123",
  title: "Newton's First Law of Motion",
  description: "Newton's First Law of Motion states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
  subject: "Physics",
  difficulty: "medium",
  tags: ["Mechanics", "Forces", "Motion"],
  mastery: 72,
  progress: 65,
  examScore: 3.5,
  maxScore: 5,
  recallStrength: 72,
  avgTimePerMcq: 45,
  nextRevision: "3 days",
  completedAttempts: 8,
  confidenceRating: 3,
  isBookmarked: true,
  relatedConcepts: [
    { id: "concept-124", title: "Newton's Second Law of Motion", subject: "Physics" },
    { id: "concept-125", title: "Newton's Third Law of Motion", subject: "Physics" },
    { id: "concept-126", title: "Friction Forces", subject: "Physics" }
  ],
  weakLinks: [
    "Understanding of balanced forces in real-world scenarios",
    "Application of the concept in rotational motion"
  ],
  suggestedRevision: [
    "Review the concept of balanced forces using everyday examples",
    "Practice more problems involving objects on inclined planes"
  ],
  analytics: {
    understanding: 75,
    application: 60,
    recall: 82,
    percentile: 70
  },
  content: {
    summary: "Newton's First Law of Motion, also known as the Law of Inertia, is a fundamental principle in physics that describes the behavior of objects when no force acts upon them. The law states that an object at rest will remain at rest, and an object in motion will remain in motion at a constant velocity, unless acted upon by an external force. This principle is counter-intuitive to everyday experience because of omnipresent friction forces that gradually slow down moving objects.",
    examples: [
      "A book resting on a table will stay there unless moved by an external force.",
      "A spacecraft in deep space continues to move at a constant velocity when its engines are turned off.",
      "Passengers in a car are thrust forward when the driver suddenly brakes, demonstrating their tendency to remain in motion."
    ],
    keyPoints: [
      "Inertia is the resistance of an object to changes in its state of motion.",
      "The greater the mass of an object, the greater its inertia.",
      "Newton's First Law invalidated the Aristotelian notion that objects naturally come to rest.",
      "The law applies in inertial frames of reference, which are non-accelerating."
    ],
    formulas: [
      "For an object in equilibrium: ΣF = 0 (Sum of all forces equals zero)",
      "Objects with no net force move at constant velocity: v = constant",
      "At equilibrium, acceleration is zero: a = 0 m/s²"
    ],
    applications: [
      "Seat belts in vehicles protect passengers by counteracting their inertia during sudden stops.",
      "The game of billiards relies on the principle of objects remaining in motion.",
      "Satellites in orbit maintain their motion due to inertia, with gravity providing the centripetal force."
    ]
  },
  relatedFlashcards: [
    { id: "flash-123", title: "Basic Physics Concepts" },
    { id: "flash-124", title: "Forces and Motion" }
  ],
  relatedExams: [
    { id: "exam-123", title: "Physics Mechanics Practice Test" }
  ],
  notes: [
    { id: "note-1", content: "Remember that inertia is directly proportional to mass", date: "2023-04-12" },
    { id: "note-2", content: "Watch Professor Smith's video on practical applications", date: "2023-04-15" }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { toast } = useToast();
  const [concept, setConcept] = useState(mockConcept);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [confidenceRating, setConfidenceRating] = useState(concept.confidenceRating || 3);
  const [newNote, setNewNote] = useState("");

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }
    
    return () => {
      if (speechSynthesis && speechUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Simulate loading concept data
  useEffect(() => {
    console.log("Loading concept with ID:", conceptId);
    
    // In a real app, you would fetch the concept data here
    // For now, we'll just use the mock data

    toast({
      title: "Concept loaded",
      description: "Study materials are ready for you",
    });
  }, [conceptId, toast]);

  const readAloud = (text: string) => {
    if (speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      setSpeechUtterance(utterance);
      
      // Start speaking
      setIsReadingAloud(true);
      speechSynthesis.speak(utterance);
      
      // Set up event handlers
      utterance.onend = () => {
        setIsReadingAloud(false);
      };
      
      utterance.onerror = () => {
        setIsReadingAloud(false);
        toast({
          title: "Error",
          description: "There was an error with the text-to-speech service.",
          variant: "destructive"
        });
      };
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
    }
  };

  const handleReadSection = (section: string) => {
    let textToRead = "";
    
    switch (section) {
      case "summary":
        textToRead = concept.content.summary;
        break;
      case "examples":
        textToRead = "Examples: " + concept.content.examples.join(". ");
        break;
      case "keyPoints":
        textToRead = "Key Points: " + concept.content.keyPoints.join(". ");
        break;
      case "formulas":
        textToRead = "Formulas: " + concept.content.formulas.join(". ");
        break;
      case "applications":
        textToRead = "Applications: " + concept.content.applications.join(". ");
        break;
      default:
        textToRead = concept.title + ". " + concept.description;
    }
    
    readAloud(textToRead);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      const updatedConcept = {
        ...concept,
        notes: [
          ...concept.notes,
          {
            id: `note-${concept.notes.length + 1}`,
            content: newNote,
            date: dateString
          }
        ]
      };
      
      setConcept(updatedConcept);
      setNewNote("");
      
      toast({
        title: "Note added",
        description: "Your note has been saved successfully."
      });
    }
  };

  const handleSaveConfidence = () => {
    setConcept({
      ...concept,
      confidenceRating
    });
    
    toast({
      title: "Confidence rating saved",
      description: "Your confidence rating has been updated."
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4 md:px-6">
      {/* Concept Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <Link to="/dashboard/student/concepts" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Concepts
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => isReadingAloud ? stopReading() : handleReadSection('all')}
              className="flex items-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              {isReadingAloud ? (
                <>
                  <Headphones className="h-4 w-4" /> Stop Reading
                </>
              ) : (
                <>
                  <Headphones className="h-4 w-4" /> Read Aloud
                </>
              )}
            </Button>
            
            <Button
              variant={concept.isBookmarked ? "default" : "outline"}
              size="icon"
              className={concept.isBookmarked ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            >
              <Star className={concept.isBookmarked ? "h-4 w-4 text-white" : "h-4 w-4"} />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{concept.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="px-3 py-1">
              {concept.subject}
            </Badge>
            {concept.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4 border border-gray-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg">{concept.description}</p>
          </div>
        </div>
      </div>
      
      {/* Main content area with tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-6">
              {/* Content sections */}
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Summary</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReadSection('summary')}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{concept.content.summary}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Examples</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReadSection('examples')}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {concept.content.examples.map((example, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{example}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Key Points</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReadSection('keyPoints')}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {concept.content.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Formulas</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReadSection('formulas')}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {concept.content.formulas.map((formula, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 font-mono">{formula}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Real-world Applications</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReadSection('applications')}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {concept.content.applications.map((app, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{app}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col">
                    <textarea 
                      className="min-h-[120px] p-3 border rounded-lg resize-y dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Add your study notes here..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        onClick={handleAddNote}
                        className="flex items-center gap-2"
                      >
                        <Notes className="h-4 w-4" /> Save Note
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {concept.notes && concept.notes.length > 0 ? (
                      concept.notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="flex justify-between items-start">
                            <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{note.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notes yet. Add your first note above!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mastery & Recall Tracker</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Exam Score</p>
                        <div className="flex items-center justify-center gap-1">
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{concept.examScore}</p>
                          <p className="text-lg text-gray-500 dark:text-gray-400">/{concept.maxScore}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recall Strength</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{concept.recallStrength}%</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Time per MCQ</p>
                        <div className="flex items-center justify-center gap-1">
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{concept.avgTimePerMcq}</p>
                          <p className="text-lg text-gray-500 dark:text-gray-400">sec</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Next Revision</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Due in {concept.nextRevision}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Attempt History</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center h-32 flex items-center justify-center">
                        <p className="text-gray-500">Performance graph would appear here</p>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-500">Showing quiz attempts over time</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Confidence Check</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">How confident are you with this concept?</p>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-500">Not at all</span>
                        <span className="text-xs text-gray-500">Very confident</span>
                      </div>
                      
                      <div className="flex justify-between gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className={`flex-1 h-8 rounded-md ${
                              confidenceRating === rating 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                            onClick={() => setConfidenceRating(rating)}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={handleSaveConfidence}
                        variant="outline"
                        className="w-full mt-2"
                      >
                        Save Rating
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Weak Link Detector</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {concept.weakLinks.map((link, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{link}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested Revision Plan</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {concept.suggestedRevision.map((suggestion, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Topic-Level Analytics</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Understanding of Core Concept</span>
                            <span>{concept.analytics.understanding}%</span>
                          </div>
                          <Progress value={concept.analytics.understanding} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Application in Complex Problems</span>
                            <span>{concept.analytics.application}%</span>
                          </div>
                          <Progress value={concept.analytics.application} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Memory Recall</span>
                            <span>{concept.analytics.recall}%</span>
                          </div>
                          <Progress value={concept.analytics.recall} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-center p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          You're in the top {100 - concept.analytics.percentile}% for this concept!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-1">
          <div className="space-y-6">
            {/* Practice Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Study Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/dashboard/student/flashcards/${concept.relatedFlashcards[0]?.id || 'default'}/interactive`}>
                  <Button variant="default" className="w-full flex items-center gap-2 bg-indigo-600">
                    <BookText className="h-4 w-4" />
                    <span>Interactive Flashcards</span>
                  </Button>
                </Link>
                
                <Link to={`/dashboard/student/practice-exam/${concept.relatedExams[0]?.id || 'default'}/start`}>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Practice Exam</span>
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FileVideo className="h-4 w-4" />
                  <span>Watch Video Explanation</span>
                </Button>
                
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <span>Interactive Simulation</span>
                </Button>
                
                <Link to={`/dashboard/student/concepts/${conceptId}/formula-lab`}>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>Formula Practice Lab</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Related Concepts */}
            <Card>
              <CardHeader>
                <CardTitle>Related Concepts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {concept.relatedConcepts.map((relConcept) => (
                  <Link key={relConcept.id} to={`/dashboard/student/concepts/${relConcept.id}`}>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{relConcept.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{relConcept.subject}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            
            {/* Study Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Study Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-3.5 w-3.5" /> Progress
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">{concept.progress}%</span>
                  </div>
                  <Progress value={concept.progress} className="h-2" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <BrainCircuit className="h-3.5 w-3.5" /> Mastery
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">{concept.mastery}%</span>
                  </div>
                  <Progress value={concept.mastery} className="h-2" />
                  
                  <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>{concept.completedAttempts} attempts made</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
