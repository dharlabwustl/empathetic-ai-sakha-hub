
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  AudioLines, 
  MessageSquare, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Share2,
  List,
  Layers,
  Highlighter
} from "lucide-react";

interface ConceptCardDetailProps {
  conceptId: string;
  onBack?: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId, onBack }) => {
  const [activeTab, setActiveTab] = useState("read");
  const [loading, setLoading] = useState(true);
  const [conceptData, setConceptData] = useState<any>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  
  useEffect(() => {
    // Simulate loading concept data
    setLoading(true);
    
    setTimeout(() => {
      // Mock concept data
      const mockConceptData = {
        id: conceptId,
        title: "Newton's Laws of Motion",
        subtitle: "Fundamental principles of classical mechanics",
        subject: "Physics",
        chapter: "Mechanics",
        difficulty: "Intermediate",
        estimatedTime: "15 min",
        lastStudied: "3 days ago",
        mastery: 65,
        content: `
          <h2>Introduction to Newton's Laws</h2>
          <p>Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it.</p>
          
          <h3>Newton's First Law (Law of Inertia)</h3>
          <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
          <p>This means that an object will not change its motion unless a force acts on it.</p>
          
          <h3>Newton's Second Law (F = ma)</h3>
          <p>The force acting on an object is equal to the mass of that object times its acceleration.</p>
          <p>This is represented by the equation: F = ma</p>
          <p>where F is the net force applied, m is the mass of the object, and a is the acceleration.</p>
          
          <h3>Newton's Third Law</h3>
          <p>For every action, there is an equal and opposite reaction.</p>
          <p>When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object.</p>
          
          <h2>Applications</h2>
          <p>Newton's laws are applied in countless scenarios, from rocket propulsion to automobile safety systems. Understanding these principles helps engineers design safer vehicles, more efficient machines, and even plan space missions.</p>
        `,
        diagrams: [
          {
            title: "First Law Illustration",
            url: "https://placehold.co/600x400?text=First+Law+Diagram"
          },
          {
            title: "Second Law Graph",
            url: "https://placehold.co/600x400?text=F=ma+Graph"
          },
          {
            title: "Third Law Demonstration",
            url: "https://placehold.co/600x400?text=Third+Law+Demo"
          }
        ],
        formulas: [
          { name: "Newton's Second Law", formula: "F = ma" },
          { name: "Weight calculation", formula: "W = mg" },
          { name: "Momentum", formula: "p = mv" }
        ],
        questions: [
          {
            question: "What happens to an object in motion when no forces act upon it?",
            answer: "It continues moving at constant velocity (same speed and direction)."
          },
          {
            question: "How does the acceleration of an object change if the force applied is doubled?",
            answer: "If the mass remains constant, the acceleration doubles as well (F = ma)."
          },
          {
            question: "When a person walks, what is the equal and opposite reaction force?",
            answer: "The person pushes backward on the ground, and the ground pushes forward on the person with equal magnitude."
          }
        ],
        relatedConcepts: ["Momentum", "Friction", "Gravitational Force", "Work and Energy"]
      };
      
      setConceptData(mockConceptData);
      setLoading(false);
    }, 800);
  }, [conceptId]);
  
  // Simulate audio playback
  const toggleAudioPlayback = () => {
    if (audioPlaying) {
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      // Simulate audio finishing after 10 seconds
      setTimeout(() => {
        setAudioPlaying(false);
      }, 10000);
    }
  };
  
  // Handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText("");
    }
  };
  
  // Add highlight
  const addHighlight = () => {
    if (selectedText) {
      setHighlights([...highlights, selectedText]);
      setSelectedText("");
    }
  };
  
  // Add note
  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, noteText]);
      setNoteText("");
      setIsAddingNote(false);
    }
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  // Download content as PDF (simulated)
  const downloadContent = () => {
    alert("Downloading content as PDF...");
  };
  
  // Share concept (simulated)
  const shareContent = () => {
    navigator.clipboard.writeText(`Check out this concept: ${conceptData?.title}`);
    alert("Link copied to clipboard!");
  };
  
  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!conceptData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Concept Not Found</CardTitle>
          <CardDescription>The requested concept could not be loaded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onBack} variant="outline">Back to Concepts</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Button variant="ghost" size="sm" className="mb-2" onClick={onBack}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Concepts
            </Button>
            <CardTitle className="text-2xl font-bold">{conceptData.title}</CardTitle>
            <CardDescription className="text-base">{conceptData.subtitle}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleBookmark}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 mr-1 text-blue-500" />
              ) : (
                <Bookmark className="h-4 w-4 mr-1" />
              )}
              {bookmarked ? "Saved" : "Save"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={shareContent}
            >
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline">{conceptData.subject}</Badge>
          <Badge variant="outline">{conceptData.chapter}</Badge>
          <Badge>{conceptData.difficulty}</Badge>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div>Est. time: {conceptData.estimatedTime}</div>
            <div>Last studied: {conceptData.lastStudied}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Mastery:</span>
            <Progress value={conceptData.mastery} className="w-32" />
            <span className="text-sm font-medium">{conceptData.mastery}%</span>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="read" className="flex-1">
              <BookOpen className="h-4 w-4 mr-1" /> Read
            </TabsTrigger>
            <TabsTrigger value="visualize" className="flex-1">
              <Lightbulb className="h-4 w-4 mr-1" /> Visualize
            </TabsTrigger>
            <TabsTrigger value="listen" className="flex-1">
              <AudioLines className="h-4 w-4 mr-1" /> Listen
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-1" /> Practice
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex-1">
              <FileText className="h-4 w-4 mr-1" /> Notes
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4">
          <TabsContent value="read" className="space-y-4">
            <div 
              className="prose dark:prose-invert max-w-none"
              onMouseUp={handleTextSelection}
              dangerouslySetInnerHTML={{ __html: conceptData.content }}
            />
            
            {selectedText && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex gap-3 z-10">
                <Button size="sm" onClick={addHighlight}>
                  <Highlighter className="h-4 w-4 mr-1" /> Highlight
                </Button>
                <Button size="sm" onClick={() => {
                  setNoteText(`Note about: "${selectedText}"\n\n`);
                  setIsAddingNote(true);
                  setSelectedText("");
                }}>
                  <FileText className="h-4 w-4 mr-1" /> Add Note
                </Button>
              </div>
            )}
            
            <div className="flex justify-between mt-4 pt-4 border-t">
              <div>
                <Button variant="outline" onClick={downloadContent}>
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
              </div>
              
              <div>
                <Button variant="ghost">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button variant="ghost">
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualize" className="space-y-6">
            <h3 className="text-xl font-medium">Visual Aids</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conceptData.diagrams.map((diagram: any, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img 
                    src={diagram.url} 
                    alt={diagram.title} 
                    className="w-full object-cover"
                  />
                  <div className="p-3 border-t">
                    <h4 className="font-medium">{diagram.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-medium pt-4">Key Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {conceptData.formulas.map((formula: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="text-sm text-muted-foreground mb-1">{formula.name}</div>
                  <div className="text-lg font-bold">{formula.formula}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="listen" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Audio Explanation</h3>
              <p className="mb-4">Listen to an audio explanation of {conceptData.title}. This audio covers all key principles and applications.</p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={toggleAudioPlayback}
                  className={`${audioPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  {audioPlaying ? (
                    <>
                      <div className="flex items-center">
                        <span className="sr-only">Audio is playing</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-4 bg-white animate-sound-wave-1"></div>
                          <div className="w-1 h-6 bg-white animate-sound-wave-2"></div>
                          <div className="w-1 h-8 bg-white animate-sound-wave-3"></div>
                          <div className="w-1 h-4 bg-white animate-sound-wave-4"></div>
                        </div>
                        <span className="ml-2">Playing...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Play Audio
                    </>
                  )}
                </Button>
              </div>
              
              <style jsx>{`
                @keyframes sound-wave-1 {
                  0%, 100% { height: 4px; }
                  50% { height: 12px; }
                }
                @keyframes sound-wave-2 {
                  0%, 100% { height: 6px; }
                  50% { height: 20px; }
                }
                @keyframes sound-wave-3 {
                  0%, 100% { height: 8px; }
                  50% { height: 16px; }
                }
                @keyframes sound-wave-4 {
                  0%, 100% { height: 4px; }
                  50% { height: 10px; }
                }
                .animate-sound-wave-1 {
                  animation: sound-wave-1 0.5s infinite;
                }
                .animate-sound-wave-2 {
                  animation: sound-wave-2 0.7s infinite;
                }
                .animate-sound-wave-3 {
                  animation: sound-wave-3 0.6s infinite;
                }
                .animate-sound-wave-4 {
                  animation: sound-wave-4 0.5s infinite;
                }
              `}</style>
            </div>
            
            <h3 className="text-xl font-medium pt-4">Key Points</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">1</div>
                <p>Newton's First Law establishes the principle of inertia.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">2</div>
                <p>The Second Law quantifies the relationship between force, mass, and acceleration.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">3</div>
                <p>The Third Law describes the symmetry of forces in interactions between objects.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4">
            <h3 className="text-xl font-medium">Practice Questions</h3>
            <div className="space-y-6">
              {conceptData.questions.map((item: any, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <p className="mt-1">{item.question}</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="font-medium text-sm text-muted-foreground">Answer</h4>
                    <p className="mt-1">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Practice with AI Tutor
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Your Notes</h3>
              <Button 
                onClick={() => {
                  setNoteText("");
                  setIsAddingNote(true);
                }}
                disabled={isAddingNote}
              >
                <FileText className="h-4 w-4 mr-1" /> Add Note
              </Button>
            </div>
            
            {isAddingNote ? (
              <div className="border rounded-lg p-4 space-y-3">
                <textarea
                  className="w-full min-h-[150px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your note here..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingNote(false)}>Cancel</Button>
                  <Button onClick={addNote}>Save Note</Button>
                </div>
              </div>
            ) : notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <p className="whitespace-pre-line">{note}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Added on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-muted-foreground">You haven't added any notes yet.</p>
              </div>
            )}
            
            {highlights.length > 0 && (
              <>
                <h3 className="text-xl font-medium pt-4">Your Highlights</h3>
                <div className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-3 py-1">
                      <p className="italic">"{highlight}"</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <h4 className="text-sm font-medium">Related Concepts</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {conceptData.relatedConcepts.map((concept: string, index: number) => (
              <Badge key={index} variant="secondary">{concept}</Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm">
          <List className="h-4 w-4 mr-1" /> View in Study Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConceptCardDetail;
