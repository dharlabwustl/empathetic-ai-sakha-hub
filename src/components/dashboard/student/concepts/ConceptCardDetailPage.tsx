
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  VolumeUp, 
  VolumeX, 
  Brain, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ListChecks, 
  FlaskConical, 
  Sparkles, 
  PencilLine,
  Save,
  Calendar,
  Info,
  HeadphonesIcon,
  BookmarkIcon,
  LightbulbIcon,
  LucideArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Loader2 } from 'lucide-react';

interface ConceptNote {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
  masteryLevel: number;
}

interface FlashcardSet {
  id: string;
  title: string;
  count: number;
}

interface PracticeExam {
  id: string;
  title: string;
  questionsCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface RecallHistoryItem {
  date: string;
  score: number;
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('explanation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesisUtterance | null>(null);
  const [notes, setNotes] = useState<ConceptNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [recallStrength, setRecallStrength] = useState(65);
  const [conceptData, setConceptData] = useState<any>(null);

  // Mock data for concept
  const mockConcept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Classical Mechanics",
    masteryLevel: 65,
    lastPracticed: "2023-09-15T10:30:00Z",
    content: {
      explanation: `
        <h2>Introduction</h2>
        <p>Newton's laws of motion are three fundamental laws that describe the relationship between the motion of an object and the forces acting on it. These laws are the foundation of classical mechanics.</p>
        
        <h2>First Law: Law of Inertia</h2>
        <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.</p>
        
        <h2>Second Law: F = ma</h2>
        <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
        <p>Mathematically: F = ma</p>
        
        <h2>Third Law: Action-Reaction</h2>
        <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.</p>
        
        <h2>Applications</h2>
        <p>Newton's laws find applications in various fields:</p>
        <ul>
          <li>Rocket propulsion</li>
          <li>Automobile safety</li>
          <li>Sporting activities</li>
          <li>Engineering designs</li>
        </ul>
      `,
      examples: `
        <h2>First Law Examples</h2>
        <p>1. A ball on a smooth surface continues to roll until friction stops it.</p>
        <p>2. Passengers in a moving vehicle tend to continue moving forward when the vehicle suddenly stops.</p>
        
        <h2>Second Law Examples</h2>
        <p>1. A 2 kg object acted upon by a 10 N force accelerates at 5 m/s².</p>
        <p>2. Heavier objects require more force to achieve the same acceleration as lighter ones.</p>
        
        <h2>Third Law Examples</h2>
        <p>1. When swimming, you push water backwards, and the water pushes you forward.</p>
        <p>2. A rocket expels gas downward (action) and the rocket moves upward (reaction).</p>
      `,
      practice: `
        <h2>Practice Questions</h2>
        <p>1. A 4 kg ball experiences a net force of 20 N. What is its acceleration?</p>
        <p>2. Explain why a person standing on a boat and jumping off causes the boat to move in the opposite direction.</p>
        <p>3. Calculate the force needed to accelerate a 1200 kg car from 0 to 27 m/s in 10 seconds.</p>
      `,
    },
    formulas: [
      { id: 'f1', name: 'Newton\'s Second Law', formula: 'F = ma', variables: [{symbol: 'F', name: 'Force'}, {symbol: 'm', name: 'Mass'}, {symbol: 'a', name: 'Acceleration'}] },
      { id: 'f2', name: 'Weight', formula: 'W = mg', variables: [{symbol: 'W', name: 'Weight'}, {symbol: 'm', name: 'Mass'}, {symbol: 'g', name: 'Gravitational acceleration'}] },
      { id: 'f3', name: 'Momentum', formula: 'p = mv', variables: [{symbol: 'p', name: 'Momentum'}, {symbol: 'm', name: 'Mass'}, {symbol: 'v', name: 'Velocity'}] },
    ],
  };

  // Mock data for related concepts
  const relatedConcepts: RelatedConcept[] = [
    { id: 'c1', title: 'Conservation of Momentum', subject: 'Physics', masteryLevel: 80 },
    { id: 'c2', title: 'Friction Forces', subject: 'Physics', masteryLevel: 55 },
    { id: 'c3', title: 'Circular Motion', subject: 'Physics', masteryLevel: 70 },
  ];

  // Mock data for flashcard sets
  const flashcardSets: FlashcardSet[] = [
    { id: 'fs1', title: 'Newton\'s Laws Basics', count: 12 },
    { id: 'fs2', title: 'Advanced Mechanics', count: 18 },
    { id: 'fs3', title: 'Physics Formulas', count: 15 },
  ];

  // Mock data for practice exams
  const practiceExams: PracticeExam[] = [
    { id: 'pe1', title: 'Newton\'s Laws Quiz', questionsCount: 10, difficulty: 'easy' },
    { id: 'pe2', title: 'Mechanics Midterm', questionsCount: 25, difficulty: 'medium' },
    { id: 'pe3', title: 'Advanced Physics Exam', questionsCount: 30, difficulty: 'hard' },
  ];

  // Mock recall history
  const recallHistory: RecallHistoryItem[] = [
    { date: '2023-08-01', score: 45 },
    { date: '2023-08-15', score: 55 },
    { date: '2023-09-01', score: 60 },
    { date: '2023-09-15', score: 65 },
  ];

  // Load concept data and notes
  useEffect(() => {
    if (conceptId) {
      // Simulate API call
      setTimeout(() => {
        setConceptData(mockConcept);
        setLoading(false);
        
        // Load saved notes from localStorage
        const savedNotes = localStorage.getItem(`concept_notes_${conceptId}`);
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      }, 800);
    }
  }, [conceptId]);

  // Text to speech functionality
  const startSpeech = () => {
    if (!conceptData || isPlaying) return;
    
    // Create text content from HTML (basic version - in real app would need better HTML parsing)
    const textContent = conceptData.content.explanation.replace(/<[^>]*>/g, ' ');
    
    const utterance = new SpeechSynthesisUtterance(textContent);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Set up event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setSpeechSynthesis(null);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setSpeechSynthesis(null);
      toast({
        title: "Error",
        description: "Failed to play audio. Please try again.",
        variant: "destructive"
      });
    };
    
    // Save reference to control playback
    setSpeechSynthesis(utterance);
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Reading content",
      description: "The concept explanation is now being read aloud."
    });
  };

  const stopSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setSpeechSynthesis(null);
      
      toast({
        title: "Reading stopped",
        description: "Audio playback has been stopped."
      });
    }
  };

  // Notes functionality
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteObj: ConceptNote = {
      id: `note_${Date.now()}`,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedNotes = [...notes, newNoteObj];
    setNotes(updatedNotes);
    setNewNote('');
    
    // Save to localStorage
    localStorage.setItem(`concept_notes_${conceptId}`, JSON.stringify(updatedNotes));
    
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully."
    });
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    // Update localStorage
    localStorage.setItem(`concept_notes_${conceptId}`, JSON.stringify(updatedNotes));
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed."
    });
  };

  // Handle navigation to a related concept
  const handleRelatedConceptClick = (conceptId: string) => {
    console.log(`Navigate to concept: ${conceptId}`);
    // This would use navigate to go to the related concept in a real app
    toast({
      title: "Loading concept",
      description: "Navigating to the selected related concept."
    });
  };

  // Handle navigation to flashcard set
  const handleFlashcardClick = (setId: string) => {
    console.log(`Navigate to flashcard set: ${setId}`);
    toast({
      title: "Opening flashcards",
      description: "Loading flashcard practice session."
    });
  };

  // Handle navigation to practice exam
  const handlePracticeExamClick = (examId: string) => {
    console.log(`Navigate to practice exam: ${examId}`);
    toast({
      title: "Loading exam",
      description: "Setting up practice exam session."
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-primary">Loading Concept</h2>
          <p className="text-muted-foreground mt-2">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }

  return (
    <SharedPageLayout
      title={conceptData?.title || 'Concept Details'}
      subtitle={`${conceptData?.subject} > ${conceptData?.chapter}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      {/* Header with mastery and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">{conceptData?.subject}</Badge>
            <Badge variant="outline">{conceptData?.chapter}</Badge>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Mastery Level</p>
              <p className="text-sm font-medium">{recallStrength}%</p>
            </div>
            <Progress value={recallStrength} className="h-2" />
          </div>
        </div>
        
        <div className="flex gap-2">
          {isPlaying ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopSpeech}
              className="flex items-center gap-2"
            >
              <VolumeX className="h-4 w-4" />
              Stop Reading
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={startSpeech}
              className="flex items-center gap-2"
            >
              <VolumeUp className="h-4 w-4" />
              Read Aloud
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              // Simulate marking as mastered
              setRecallStrength(prevValue => Math.min(prevValue + 5, 100));
              toast({
                title: "Progress updated",
                description: "Your mastery level has been updated."
              });
            }}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark as Reviewed
          </Button>
        </div>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="explanation" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mb-4">
          <TabsTrigger value="explanation">
            <BookOpen className="h-4 w-4 mr-2" />
            Explanation
          </TabsTrigger>
          <TabsTrigger value="examples">
            <ListChecks className="h-4 w-4 mr-2" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="practice">
            <FlaskConical className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="notes">
            <PencilLine className="h-4 w-4 mr-2" />
            My Notes
          </TabsTrigger>
          <TabsTrigger value="related">
            <Brain className="h-4 w-4 mr-2" />
            Related
          </TabsTrigger>
          <TabsTrigger value="ai-insights">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="explanation" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-blue max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: conceptData?.content.explanation || '' }}
              />
              
              {/* Formulas section */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Key Formulas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {conceptData?.formulas.map((formula: any) => (
                    <div key={formula.id} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                      <p className="font-medium">{formula.name}</p>
                      <p className="text-lg font-mono my-2">{formula.formula}</p>
                      <div className="text-xs text-muted-foreground">
                        {formula.variables.map((v: any) => (
                          <span key={v.symbol} className="mr-3">{v.symbol}: {v.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-blue max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: conceptData?.content.examples || '' }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-blue max-w-none dark:prose-invert mb-8"
                dangerouslySetInnerHTML={{ __html: conceptData?.content.practice || '' }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Add a Note</h3>
                <Textarea 
                  placeholder="Write your notes about this concept here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button 
                  onClick={handleAddNote} 
                  className="mt-3"
                  disabled={!newNote.trim()}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Your Notes</h3>
                {notes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    You haven't added any notes for this concept yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {notes.map(note => (
                      <div key={note.id} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteNote(note.id)}
                            className="h-6 w-6 p-0 text-muted-foreground"
                          >
                            &times;
                          </Button>
                        </div>
                        <p className="whitespace-pre-wrap">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Related concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Related Concepts
                </CardTitle>
                <CardDescription>
                  These concepts are related to what you're currently studying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedConcepts.map(concept => (
                    <div
                      key={concept.id}
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => handleRelatedConceptClick(concept.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{concept.title}</h4>
                        <Badge variant="outline">{concept.subject}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-grow">
                          <Progress value={concept.masteryLevel} className="h-2" />
                        </div>
                        <span className="text-xs font-medium">{concept.masteryLevel}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Flashcard sets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Flashcard Sets
                </CardTitle>
                <CardDescription>
                  Practice with these flashcard sets to reinforce your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flashcardSets.map(set => (
                    <div
                      key={set.id}
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => handleFlashcardClick(set.id)}
                    >
                      <h4 className="font-medium">{set.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Brain className="h-4 w-4" />
                        <span>{set.count} flashcards</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        Practice Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Practice exams */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  Practice Exams
                </CardTitle>
                <CardDescription>
                  Test your knowledge with these practice exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {practiceExams.map(exam => (
                    <div
                      key={exam.id}
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => handlePracticeExamClick(exam.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{exam.title}</h4>
                        <Badge
                          variant="outline"
                          className={`
                            ${exam.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                            exam.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            'bg-red-50 text-red-700 border-red-200'}
                          `}
                        >
                          {exam.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{exam.questionsCount} questions</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        Start Exam
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recall tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Recall Strength
                </CardTitle>
                <CardDescription>
                  Track your learning and recall over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Current Recall Strength</p>
                    <p className="text-sm font-medium">{recallStrength}%</p>
                  </div>
                  <Progress value={recallStrength} className="h-2 mt-2" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recall History</h4>
                  <div className="space-y-2">
                    {recallHistory.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress value={item.score} className="h-2 w-24" />
                          <span>{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last reviewed on {new Date(conceptData?.lastPracticed).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next review recommended: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-insights" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LightbulbIcon className="h-5 w-5 text-blue-500" />
                  Learning Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-blue-50/50 dark:bg-blue-950/20">
                    <h4 className="font-medium mb-1">Important Connections</h4>
                    <p className="text-sm">
                      This concept connects strongly with the Conservation of Momentum and Circular Motion.
                      Understanding these relationships will help you solve complex problems.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-green-50/50 dark:bg-green-950/20">
                    <h4 className="font-medium mb-1">Study Suggestion</h4>
                    <p className="text-sm">
                      Your recall strength is improving, but you should focus on applications of the Third Law.
                      Try the "Advanced Physics Exam" to strengthen this area.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-amber-50/50 dark:bg-amber-950/20">
                    <h4 className="font-medium mb-1">Common Mistake Alert</h4>
                    <p className="text-sm">
                      Many students confuse inertia with momentum. Remember that inertia is a property of matter,
                      while momentum is a vector quantity equal to mass times velocity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookmarkIcon className="h-5 w-5 text-purple-500" />
                  Study Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Review Core Principles</h4>
                      <p className="text-sm text-muted-foreground">
                        Re-read the explanation focusing on each law's implications
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Test Your Understanding</h4>
                      <p className="text-sm text-muted-foreground">
                        Practice with "Newton's Laws Quiz" to confirm basic understanding
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Apply to Complex Problems</h4>
                      <p className="text-sm text-muted-foreground">
                        Work through the practice problems in the "Practice" tab
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Connect to Related Concepts</h4>
                      <p className="text-sm text-muted-foreground">
                        Study "Conservation of Momentum" next to build on this knowledge
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-2">
                    Generate Personalized Study Plan
                    <LucideArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeadphonesIcon className="h-5 w-5 text-green-500" />
                  Audio Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm mb-4">
                  Listen to a concise 3-minute summary of the key points from Newton's Laws of Motion.
                  Perfect for quick revision before exams.
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={isPlaying ? stopSpeech : startSpeech}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        Stop Audio
                      </>
                    ) : (
                      <>
                        <VolumeUp className="h-4 w-4" />
                        Play Audio Summary
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline">
                    <Info className="mr-2 h-4 w-4" />
                    Generate Q&A
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
