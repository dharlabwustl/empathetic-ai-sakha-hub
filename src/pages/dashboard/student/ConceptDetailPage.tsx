
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  BookMarked, 
  CheckCircle, 
  AlarmClock, 
  Star, 
  Volume2, 
  PenLine, 
  FlaskConical, 
  GraduationCap, 
  Lightbulb, 
  Zap, 
  VolumeX,
  Brain
} from 'lucide-react';
import { ConceptExamSection } from '@/components/dashboard/student/concepts/ConceptExamSection';
import { ConceptCard as ConceptCardType } from '@/types/user/conceptCard';

// Mock concept data
const getMockConcept = (conceptId: string): ConceptCardType => {
  return {
    id: conceptId,
    title: "Cellular Respiration & Photosynthesis",
    description: "Comprehensive study of the processes of cellular respiration and photosynthesis, their relationship, and their role in energy production within cells.",
    subject: "Biology",
    chapter: "Cell Biology",
    topic: "Cellular Metabolism",
    difficulty: "medium",
    completed: false,
    progress: 65,
    relatedConcepts: ["Enzyme Kinetics", "Cell Structure", "Mitochondria Function"],
    content: `
      <h2>Cellular Respiration</h2>
      <p>Cellular respiration is the process by which cells break down glucose and other organic compounds to produce energy in the form of ATP (adenosine triphosphate).</p>
      
      <h3>The Stages of Cellular Respiration</h3>
      <ol>
        <li><strong>Glycolysis:</strong> Occurs in the cytoplasm and breaks down glucose into pyruvate, producing a small amount of ATP.</li>
        <li><strong>Pyruvate Oxidation:</strong> Pyruvate is converted to acetyl-CoA, which enters the Krebs cycle.</li>
        <li><strong>The Krebs Cycle (Citric Acid Cycle):</strong> Takes place in the mitochondrial matrix, generating NADH and FADH2.</li>
        <li><strong>Electron Transport Chain:</strong> Located in the inner mitochondrial membrane, this is where most ATP is produced through oxidative phosphorylation.</li>
      </ol>
      
      <h3>The Net ATP Production</h3>
      <p>The complete oxidation of one glucose molecule through cellular respiration produces approximately 30-32 ATP molecules (the exact number varies slightly depending on the organism and conditions).</p>
      
      <h2>Photosynthesis</h2>
      <p>Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy into chemical energy in the form of glucose or other carbohydrates.</p>
      
      <h3>The Stages of Photosynthesis</h3>
      <ol>
        <li><strong>Light-Dependent Reactions:</strong> Occur in the thylakoid membrane of chloroplasts. These reactions convert light energy into chemical energy in the form of ATP and NADPH.</li>
        <li><strong>Calvin Cycle (Light-Independent Reactions):</strong> Takes place in the stroma of chloroplasts. These reactions use the ATP and NADPH produced in the light-dependent reactions to convert CO2 into glucose.</li>
      </ol>
      
      <h3>The Overall Equation for Photosynthesis</h3>
      <p>6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ (glucose) + 6 O₂</p>
      
      <h2>The Relationship Between Cellular Respiration and Photosynthesis</h2>
      <p>Cellular respiration and photosynthesis can be considered opposite processes. Photosynthesis captures energy from sunlight to build carbohydrates, while cellular respiration breaks down carbohydrates to release energy. The products of one process are the reactants of the other.</p>
    `,
    examples: [
      "In muscle cells during exercise, cellular respiration rates increase to meet the higher energy demands.",
      "Plants in low light conditions may have reduced photosynthesis rates, affecting their growth and overall health.",
      "C4 plants have evolved special adaptations to enhance photosynthetic efficiency in hot, dry environments."
    ],
    commonMistakes: [
      "Confusing the location of glycolysis (cytoplasm) and the Krebs cycle (mitochondria).",
      "Thinking photosynthesis only occurs during the day - while light reactions require light, the Calvin cycle can continue in the dark if ATP and NADPH are available.",
      "Overlooking the role of water in photosynthesis as a source of electrons, not just a medium for reactions."
    ],
    examRelevance: "Extremely high: Questions on cellular respiration and photosynthesis appear in virtually every biology examination, with particular emphasis on comparing and contrasting these processes.",
    recallAccuracy: 72,
    quizScore: 68,
    lastPracticed: "2023-10-15",
    timeSuggestion: 45,
    flashcardsTotal: 15,
    flashcardsCompleted: 9,
    examReady: false,
    bookmarked: true
  };
};

// Notes interface
interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

// Related resource interface
interface RelatedResource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'practice' | 'interactive';
  url: string;
  duration?: string;
}

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { toast } = useToast();
  const [concept, setConcept] = useState<ConceptCardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingAloud, setReadingAloud] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  
  // Related resources
  const [relatedResources] = useState<RelatedResource[]>([
    {
      id: "video1",
      title: "Cellular Respiration: Glycolysis Explained",
      type: "video",
      url: "#",
      duration: "12 min"
    },
    {
      id: "video2",
      title: "Photosynthesis: Light and Dark Reactions",
      type: "video",
      url: "#",
      duration: "15 min"
    },
    {
      id: "article1",
      title: "ATP Production in Mitochondria",
      type: "article",
      url: "#"
    },
    {
      id: "practice1",
      title: "Photosynthesis Practice Problems",
      type: "practice",
      url: "#"
    },
    {
      id: "interactive1",
      title: "Interactive Electron Transport Chain",
      type: "interactive",
      url: "#"
    }
  ]);
  
  // Fetch concept data
  useEffect(() => {
    if (!conceptId) return;
    
    setLoading(true);
    
    // In a real app, this would be an API call
    const mockData = getMockConcept(conceptId);
    
    setTimeout(() => {
      setConcept(mockData);
      setIsBookmarked(mockData.bookmarked || false);
      setLoading(false);
    }, 800);
  }, [conceptId]);
  
  // Function to handle read aloud
  const handleReadAloud = () => {
    if (!concept) return;
    
    if (readingAloud) {
      // Stop reading
      window.speechSynthesis.cancel();
      setReadingAloud(false);
      toast({
        title: "Reading stopped",
        description: "Text-to-speech has been stopped",
      });
    } else {
      // Start reading
      const utterance = new SpeechSynthesisUtterance();
      // Strip HTML tags for reading
      const textContent = concept.content.replace(/<[^>]*>/g, '');
      utterance.text = textContent;
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      
      window.speechSynthesis.speak(utterance);
      setReadingAloud(true);
      
      // Event handler for when speech ends
      utterance.onend = () => {
        setReadingAloud(false);
      };
      
      toast({
        title: "Reading aloud",
        description: "Text-to-speech has started",
      });
    }
  };
  
  // Function to toggle bookmark
  const handleToggleBookmark = () => {
    if (!concept) return;
    
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Concept removed from bookmarks" : "Concept added to bookmarks for easy access",
    });
  };
  
  // Function to add a note
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteObj: Note = {
      id: `note_${Date.now()}`,
      content: newNote,
      timestamp: new Date()
    };
    
    setNotes([...notes, newNoteObj]);
    setNewNote("");
    
    toast({
      title: "Note added",
      description: "Your note has been saved",
    });
  };
  
  // Function to delete a note
  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
    });
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Concept..."
        subtitle="Please wait while we load the concept details"
        showBackButton
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-pulse flex flex-col items-center space-y-6 w-full">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-3 w-full">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!concept) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="The requested concept could not be found"
        showBackButton
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            We couldn't find the concept you're looking for.
          </p>
          <Button className="mt-4" variant="outline">Return to Concepts</Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  const getDifficultyColor = () => {
    switch (concept.difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.chapter} > ${concept.topic}`}
      showBackButton
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header with actions and progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getDifficultyColor()}>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
                  </Badge>
                  {concept.examReady && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Exam Ready
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-3">
                  <div className="flex items-center">
                    <AlarmClock className="h-4 w-4 mr-1" />
                    <span>Study time: {concept.timeSuggestion} min</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BookMarked className="h-4 w-4 mr-1" />
                    <span>Last practiced: {new Date(concept.lastPracticed || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleReadAloud}>
                  {readingAloud ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                  {readingAloud ? "Stop Reading" : "Read Aloud"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleToggleBookmark}
                  className={isBookmarked ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300" : ""}
                >
                  <Star className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-yellow-500" : ""}`} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{concept.progress}%</span>
              </div>
              <Progress value={concept.progress || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Main content tabs */}
        <Tabs defaultValue="content" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-1.5">
              <FlaskConical className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-1.5">
              <PenLine className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="exam" className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              <span>Exam Prep</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="border rounded-md mt-4">
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: concept.content }} />
              </div>
              
              {/* Examples section */}
              {concept.examples && concept.examples.length > 0 && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                    Real-World Examples
                  </h3>
                  <ul className="space-y-3">
                    {concept.examples.map((example, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common mistakes section */}
              {concept.commonMistakes && concept.commonMistakes.length > 0 && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-red-500" />
                    Common Pitfalls to Avoid
                  </h3>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 font-bold mr-2 flex-shrink-0">⚠</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Exam relevance */}
              {concept.examRelevance && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-500" />
                    Exam Relevance
                  </h3>
                  <p>{concept.examRelevance}</p>
                </div>
              )}
              
              {/* Related resources section */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedResources.map(resource => (
                    <div 
                      key={resource.id} 
                      className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center">
                        {resource.type === 'video' && <BookOpen className="h-5 w-5 mr-3 text-red-500" />}
                        {resource.type === 'article' && <BookMarked className="h-5 w-5 mr-3 text-blue-500" />}
                        {resource.type === 'practice' && <FlaskConical className="h-5 w-5 mr-3 text-green-500" />}
                        {resource.type === 'interactive' && <Zap className="h-5 w-5 mr-3 text-purple-500" />}
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{resource.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs font-normal capitalize">
                              {resource.type}
                            </Badge>
                            {resource.duration && (
                              <span className="text-xs text-muted-foreground">
                                {resource.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Tutor Insights */}
              <div className="mt-8 border-t pt-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">AI Tutor Insights</h3>
                      <p className="text-sm">
                        This concept is foundational to understanding energy transformations in living organisms. 
                        Based on your current progress, focus on the relationship between the electron transport chain 
                        and ATP synthesis. Previous assessments show you're confident with glycolysis but could 
                        strengthen your understanding of photosynthetic light reactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="border rounded-md mt-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Practice Questions</h2>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Question 1</h3>
                  <p className="mb-4">Which stage of cellular respiration produces the most ATP?</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <input type="radio" id="q1-a" name="q1" className="h-4 w-4" />
                      <label htmlFor="q1-a" className="flex-grow cursor-pointer">Glycolysis</label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <input type="radio" id="q1-b" name="q1" className="h-4 w-4" />
                      <label htmlFor="q1-b" className="flex-grow cursor-pointer">Krebs Cycle</label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <input type="radio" id="q1-c" name="q1" className="h-4 w-4" />
                      <label htmlFor="q1-c" className="flex-grow cursor-pointer">Electron Transport Chain</label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <input type="radio" id="q1-d" name="q1" className="h-4 w-4" />
                      <label htmlFor="q1-d" className="flex-grow cursor-pointer">Fermentation</label>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button>Check Answer</Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View More Practice Questions
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="border rounded-md mt-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
              
              <div className="mb-6">
                <textarea 
                  className="w-full border rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add your notes here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <Button onClick={handleAddNote}>Save Note</Button>
                </div>
              </div>
              
              {notes.length === 0 ? (
                <div className="text-center py-8 border rounded-md">
                  <p className="text-muted-foreground">You haven't added any notes yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notes.map(note => (
                    <div key={note.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <p className="whitespace-pre-wrap">{note.content}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-muted-foreground"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          ✕
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {note.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="exam" className="mt-4">
            <ConceptExamSection
              conceptId={concept.id}
              conceptTitle={concept.title}
              examReady={concept.examReady}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
