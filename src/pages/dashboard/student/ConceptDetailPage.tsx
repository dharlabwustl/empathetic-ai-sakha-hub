
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, BookText, FileText, Play, BrainCircuit, Clock, ArrowRight, Star, CheckCircle, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedSectionLayout } from '@/components/dashboard/student/SharedSectionLayout';

interface ConceptNote {
  id: string;
  content: string;
  createdAt: string;
}

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState<ConceptNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Fetch concept data based on ID
  // For now, we'll use mock data
  const conceptData = {
    id: conceptId || '1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    difficulty: 'medium',
    description: 'Newton\'s three laws of motion describe the relationship between the motion of an object and the forces acting on it. The first law states that an object will remain at rest or in uniform motion unless acted upon by an external force. The second law relates force, mass, and acceleration (F=ma). The third law states that for every action, there is an equal and opposite reaction.',
    content: `
      <h2>Newton's First Law of Motion</h2>
      <p>Newton's first law states that an object will remain at rest or in a state of uniform motion unless acted upon by an external force. This property of objects to resist changes in motion is called inertia.</p>
      
      <h2>Newton's Second Law of Motion</h2>
      <p>Newton's second law states that the force acting on an object is equal to the mass of the object multiplied by its acceleration (F=ma). This means that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      
      <h2>Newton's Third Law of Motion</h2>
      <p>Newton's third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on another body, the second body exerts a force of equal magnitude and opposite direction on the first body.</p>
      
      <h2>Real-world Applications</h2>
      <p>Newton's laws of motion have numerous applications in everyday life and engineering. They help us understand how objects move, why they stop moving, and how forces affect their behavior. Some examples include:</p>
      <ul>
        <li>Rocket propulsion (third law)</li>
        <li>Car safety features like seat belts (first law)</li>
        <li>Determining the force needed to move objects (second law)</li>
      </ul>
    `,
    progress: 65,
    mastery: 72,
    timeEstimate: '45 min',
    completed: false,
    tags: ['Classical Mechanics', 'Forces', 'Motion'],
    examScore: 3.5,
    recallStrength: 72,
    avgTimePerMCQ: 45,
    nextRevisionDue: 3,
    confidenceLevel: 65,
    topicAnalytics: {
      coreConcept: 75,
      complexProblems: 60,
      memoryRecall: 82,
      topPercentile: 30
    },
    weakLinks: [
      'Understanding of balanced forces in real-world scenarios',
      'Application of the concept in rotational motion'
    ],
    revisionPlan: [
      'Review the concept of balanced forces using everyday examples',
      'Practice more problems involving objects on inclined planes'
    ],
    attemptHistory: [
      { date: '2025-04-10', score: 45 },
      { date: '2025-04-20', score: 62 },
      { date: '2025-05-05', score: 72 },
    ],
    relatedConcepts: [
      { id: '2', title: 'Conservation of Momentum', subject: 'Physics' },
      { id: '3', title: 'Work-Energy Theorem', subject: 'Physics' },
      { id: '4', title: 'Rotational Dynamics', subject: 'Physics' },
    ],
    relatedFlashcards: {
      id: 'phys-newton-1',
      title: 'Newton\'s Laws Flashcards',
      count: 15
    },
    relatedExams: {
      id: 'phys-exam-2',
      title: 'Classical Mechanics Exam',
      questionCount: 25
    }
  };

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Add a new note
  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: ConceptNote = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toISOString(),
      };
      setNotes([...notes, note]);
      setNewNote('');
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully",
      });
    }
  };

  // Delete a note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
    });
  };

  // Read content aloud
  const handleReadAloud = () => {
    if (!speechSynthesis) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Extract text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = conceptData.content;
    const textToSpeak = tempDiv.textContent || tempDiv.innerText || '';

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    toast({
      title: isSpeaking ? "Paused reading" : "Reading content aloud",
      description: isSpeaking ? "Text-to-speech has been paused" : "Listening to content may help with retention",
    });
  };

  // Navigate to related concepts, flashcards, or exams
  const navigateToFlashcards = () => {
    navigate(`/dashboard/student/flashcards/${conceptData.relatedFlashcards.id}`);
    toast({
      title: "Loading flashcards",
      description: `Opening ${conceptData.relatedFlashcards.title}`,
    });
  };

  const navigateToPracticeExam = () => {
    navigate(`/dashboard/student/practice-exam/${conceptData.relatedExams.id}/start`);
    toast({
      title: "Loading practice exam",
      description: `Opening ${conceptData.relatedExams.title}`,
    });
  };

  return (
    <SharedSectionLayout title={conceptData.title} subtitle={conceptData.subject}>
      <div className="space-y-6">
        {/* Header Section with Quick Actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300">
                {conceptData.subject}
              </Badge>
              {conceptData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300">
                  {tag}
                </Badge>
              ))}
              <Badge variant={conceptData.difficulty === 'easy' ? 'outline' : conceptData.difficulty === 'medium' ? 'secondary' : 'destructive'} className="capitalize">
                {conceptData.difficulty}
              </Badge>
              {conceptData.completed && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Completed
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleReadAloud}
            >
              <Volume2 className={`h-4 w-4 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
              {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Concept Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: conceptData.content }} />
              </CardContent>
            </Card>
            
            {/* Related Concepts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Related Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {conceptData.relatedConcepts.map((concept) => (
                    <Card key={concept.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-medium text-sm">{concept.title}</h3>
                          <Badge variant="outline" className="w-fit text-xs">{concept.subject}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab Content */}
          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Add a new note about this concept..." 
                    value={newNote} 
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px] resize-y"
                  />
                  <Button onClick={handleAddNote}>Save Note</Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  {notes.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No notes yet. Add your first note above.</p>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                        <p className="text-sm mb-2">{note.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab Content */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-muted-foreground text-sm mb-2">Exam Score</h3>
                    <div className="text-3xl font-bold">{conceptData.examScore}</div>
                    <div className="text-xs text-muted-foreground mt-1">/5</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-muted-foreground text-sm mb-2">Recall Strength</h3>
                    <div className="text-3xl font-bold">{conceptData.recallStrength}%</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-muted-foreground text-sm mb-2">Avg. Time per MCQ</h3>
                    <div className="text-3xl font-bold">{conceptData.avgTimePerMCQ}</div>
                    <div className="text-xs text-muted-foreground mt-1">sec</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-muted-foreground text-sm mb-2">Next Revision</h3>
                    <div className="text-3xl font-bold">Due in {conceptData.nextRevisionDue} days</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Attempt History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Attempt History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-gray-50 dark:bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Performance graph would appear here</p>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">Showing quiz attempts over time</p>
              </CardContent>
            </Card>
            
            {/* Confidence Check */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Confidence Check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">How confident are you with this concept?</p>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                        style={{ width: `${conceptData.confidenceLevel}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Not at all</span>
                      <span>Very confident</span>
                    </div>
                  </div>
                  
                  <Button size="sm">Save Rating</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Weak Link Detector</h3>
                  <ul className="space-y-1">
                    {conceptData.weakLinks.map((link, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Suggested Revision Plan</h3>
                  <ol className="space-y-1 list-decimal list-inside">
                    {conceptData.revisionPlan.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Topic-Level Analytics</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Understanding of Core Concept</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{conceptData.topicAnalytics.coreConcept}%</span>
                      </div>
                      <Progress value={conceptData.topicAnalytics.coreConcept} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Application in Complex Problems</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{conceptData.topicAnalytics.complexProblems}%</span>
                      </div>
                      <Progress value={conceptData.topicAnalytics.complexProblems} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Memory Recall</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{conceptData.topicAnalytics.memoryRecall}%</span>
                      </div>
                      <Progress value={conceptData.topicAnalytics.memoryRecall} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 py-1 px-3">
                      You're in the top {conceptData.topicAnalytics.topPercentile}% for this concept!
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Tab Content */}
          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                      <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-semibold">Interactive Flashcards</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice {conceptData.relatedFlashcards.count} flashcards on {conceptData.title}
                    </p>
                    <Button className="w-full" onClick={navigateToFlashcards}>
                      Start Flashcards
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                      <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold">Practice Exam</h3>
                    <p className="text-sm text-muted-foreground">
                      Take a {conceptData.relatedExams.questionCount}-question exam on {conceptData.title}
                    </p>
                    <Button className="w-full" onClick={navigateToPracticeExam}>
                      Start Practice Exam
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <BookText className="mr-2 h-4 w-4" />
                    Solve Example Problems
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video Explanation
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Test Understanding
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Timed Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedSectionLayout>
  );
};

export default ConceptDetailPage;
