
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Bookmark, 
  PenLine, 
  Share2, 
  Volume2, 
  VolumeX, 
  FileText, 
  BookCheck, 
  ListCheck,
  FileX,
  Link as LinkIcon
} from "lucide-react";
import { cn } from '@/lib/utils';

interface ConceptCardStudyPageProps {
  conceptId?: string;
}

// Mock concept data
const mockConcept = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "Medium",
  tags: ["Force", "Motion", "Classical Mechanics"],
  simpleExplanation: "Newton's Laws of Motion describe the relationship between an object and the forces acting upon it. The first law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. The second law explains that force equals mass times acceleration (F = ma). The third law states that for every action, there is an equal and opposite reaction.",
  detailedExplanation: "Sir Isaac Newton's three laws of motion, published in his 'Principia Mathematica' in 1687, form the foundation of classical mechanics. These laws describe the relationship between the motion of an object and the forces acting on it.\n\nFirst Law (Law of Inertia): An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This property is called inertia. In mathematical terms, when the net force on an object is zero (∑F = 0), the object will maintain its velocity.\n\nSecond Law (F = ma): The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration.\n\nThird Law (Action-Reaction): For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object. Mathematically: F₁₂ = -F₂₁.",
  examples: [
    {
      title: "Rocket Propulsion",
      description: "When a rocket expels gas downward (action), the rocket experiences an upward force (reaction), propelling it into space according to Newton's Third Law."
    },
    {
      title: "Car Acceleration",
      description: "When you press the accelerator in a car, the engine applies more force, resulting in greater acceleration according to F = ma (Second Law)."
    },
    {
      title: "Book on Table",
      description: "A book resting on a table experiences two forces: gravity pulling it down and the normal force from the table pushing up. These forces balance out (∑F = 0), keeping the book at rest (First Law)."
    }
  ],
  diagramAnalysis: [
    {
      title: "Force Diagram for First Law",
      imageUrl: "https://example.com/first-law-diagram.png",
      description: "This diagram shows an object at rest with balanced forces (∑F = 0)."
    },
    {
      title: "Force Diagram for Second Law",
      imageUrl: "https://example.com/second-law-diagram.png",
      description: "This diagram illustrates how unbalanced forces lead to acceleration proportional to F/m."
    },
    {
      title: "Force Diagram for Third Law",
      imageUrl: "https://example.com/third-law-diagram.png",
      description: "This diagram demonstrates equal and opposite forces in action-reaction pairs."
    }
  ],
  formulas: [
    {
      equation: "F = ma",
      description: "Force equals mass times acceleration (Second Law)"
    },
    {
      equation: "∑F = 0",
      description: "When in equilibrium, the sum of all forces equals zero (First Law)"
    },
    {
      equation: "F₁₂ = -F₂₁",
      description: "Action-reaction pairs are equal in magnitude and opposite in direction (Third Law)"
    }
  ],
  realWorldApplications: "Newton's Laws have countless real-world applications, from designing vehicles to planning space missions. Engineers use these principles to calculate the forces needed for rockets to escape Earth's gravity. In sports, understanding these laws helps athletes optimize their movements—like a swimmer pushing off the wall or a basketball player shooting. Even everyday activities like walking rely on these laws: you push backward on the ground (action), and the ground pushes you forward (reaction), allowing you to move.",
  examRelevance: "Newton's Laws appear frequently in physics exams at all levels. Key exam topics include:\n\n- Free-body diagrams and force analysis\n- Calculating acceleration using F = ma\n- Identifying action-reaction pairs\n- Applying the laws to complex systems like pulleys and inclined planes\n- Conceptual questions about inertia and equilibrium\n\nExam tip: When solving problems, always start by drawing a free-body diagram showing all forces acting on the object.",
  neetQuestions: [
    {
      year: "2019",
      question: "If a force of 10 N acts on a mass of 5 kg, what is the acceleration produced?",
      answer: "2 m/s²",
      explanation: "Using Newton's Second Law, F = ma, we get: a = F/m = 10N/5kg = 2 m/s²"
    },
    {
      year: "2020",
      question: "Which of Newton's laws explains the recoil of a gun when fired?",
      answer: "Third Law",
      explanation: "The recoil of a gun is due to the action-reaction pair of forces described by Newton's Third Law."
    }
  ],
  commonMistakes: [
    "Confusing 'no force' with 'no motion' in the First Law. Objects can move at constant velocity when forces are balanced, not just when there's no force.",
    "Forgetting that acceleration is a vector quantity in F = ma. Direction matters!",
    "Misidentifying action-reaction pairs. Remember, action-reaction forces act on different objects, not on the same object.",
    "Ignoring friction in calculations, leading to idealized results that don't match real-world observations.",
    "Assuming that the larger or more massive object exerts a greater force in an interaction. According to the Third Law, both forces are equal in magnitude."
  ],
  videoUrl: "https://example.com/newtons-laws-video",
  relatedConcepts: [
    { id: "c2", title: "Conservation of Momentum", subject: "Physics" },
    { id: "c3", title: "Circular Motion", subject: "Physics" },
    { id: "c4", title: "Work and Energy", subject: "Physics" },
    { id: "c5", title: "Friction Forces", subject: "Physics" }
  ],
  relatedFlashcards: [
    { id: "f1", title: "Newton's Laws Flashcards", count: 12 },
    { id: "f2", title: "Motion Physics", count: 8 }
  ],
  relatedExams: [
    { id: "e1", title: "Physics Mechanics Test" },
    { id: "e2", title: "NEET Physics Practice" }
  ],
  masteryData: {
    examScore: 85,
    recallStrength: 70,
    timePerMCQ: "45 seconds",
    revisionDue: "3 days",
    status: "Needs Revision"
  }
};

const ConceptCardStudyPage: React.FC<ConceptCardStudyPageProps> = ({ conceptId: propConceptId }) => {
  const params = useParams<{conceptId: string}>();
  const conceptId = propConceptId || params.conceptId;
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  
  // Voice reading functionality (mock implementation)
  const toggleVoiceReading = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would start or stop text-to-speech
  };
  
  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow keyboard navigation between tabs using number keys
      if (e.key >= '1' && e.key <= '9') {
        const tabIndex = parseInt(e.key) - 1;
        const tabValues = ["simple", "detailed", "examples", "formulas", "diagrams", "real-world", "exam", "mistakes", "video"];
        if (tabIndex < tabValues.length) {
          setActiveTab(tabValues[tabIndex]);
        }
      }
      // Space bar toggles voice reading
      if (e.key === ' ' && (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        toggleVoiceReading();
      }
      // B toggles bookmark
      if (e.key === 'b' && (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        setIsBookmarked(!isBookmarked);
      }
      // N toggles notes
      if (e.key === 'n' && (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        setNotesOpen(!notesOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookmarked, isVoiceActive, notesOpen]);
  
  // Bookmark functionality
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real implementation, this would save to the user's bookmarks
  };
  
  const concept = mockConcept; // In a real app, this would fetch based on conceptId
  
  const getSubjectStyles = (subject: string) => {
    switch(subject.toLowerCase()) {
      case 'physics':
        return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20";
      case 'chemistry':
        return "bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20";
      case 'biology':
        return "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button and header - Subject specific styling */}
      <div className={`mb-6 rounded-lg p-4 ${getSubjectStyles(concept.subject)}`}>
        <Button variant="outline" asChild className="mb-4 bg-white dark:bg-gray-800">
          <Link to="/dashboard/student/concepts">&larr; Back to Concepts</Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{concept.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {concept.subject}
              </Badge>
              <Badge variant="outline">{concept.topic}</Badge>
              <Badge variant="outline" className={
                concept.difficulty === "Easy" ? "bg-green-50 text-green-700 border-green-200" :
                concept.difficulty === "Medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                "bg-red-50 text-red-700 border-red-200"
              }>
                {concept.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant={isVoiceActive ? "default" : "outline"} 
              size="sm" 
              onClick={toggleVoiceReading} 
              className="flex items-center gap-1"
              title="Read Aloud (Space)"
            >
              {isVoiceActive ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isVoiceActive ? 'Stop' : 'Read Aloud'}
            </Button>
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              size="sm" 
              onClick={toggleBookmark} 
              className="flex items-center gap-1"
              title="Bookmark (B)"
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-current" : "")} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Mastery Meter */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Concept Mastery</span>
            <span className="font-medium">{concept.masteryData.examScore}%</span>
          </div>
          <div className="w-full bg-white dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${concept.masteryData.examScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 overflow-hidden border-2">
            <CardContent className="p-0">
              <Tabs defaultValue="simple" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start p-1 bg-muted/70 rounded-t-lg overflow-x-auto flex-nowrap sticky top-0 z-10 shadow-sm border-b border-gray-200">
                  <TabsTrigger value="simple" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 1">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">1</span>Simple Explanation
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 2">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">2</span>Detailed
                  </TabsTrigger>
                  <TabsTrigger value="examples" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 3">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">3</span>Examples
                  </TabsTrigger>
                  <TabsTrigger value="formulas" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 4">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">4</span>Formulas
                  </TabsTrigger>
                  <TabsTrigger value="diagrams" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 5">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">5</span>Diagrams
                  </TabsTrigger>
                  <TabsTrigger value="real-world" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 6">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">6</span>Applications
                  </TabsTrigger>
                  <TabsTrigger value="exam" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 7">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">7</span>For Exam
                  </TabsTrigger>
                  <TabsTrigger value="mistakes" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 8">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">8</span>Common Mistakes
                  </TabsTrigger>
                  <TabsTrigger value="video" className="whitespace-nowrap rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800" title="Press 9">
                    <span className="hidden sm:inline mr-2 opacity-50 text-xs">9</span>Video
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Simple Explanation</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.simpleExplanation}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Detailed Explanation</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.detailedExplanation.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="examples" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Examples with Walkthrough</h2>
                  <div className="space-y-6">
                    {concept.examples.map((example, index) => (
                      <div key={index} className="bg-muted/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="font-medium text-lg mb-2">{example.title}</h3>
                        <p>{example.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="formulas" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Formulas</h2>
                  <div className="space-y-4">
                    {concept.formulas.map((formula, idx) => (
                      <Card key={idx} className="overflow-hidden border-2">
                        <CardContent className="p-4">
                          <div className="text-center bg-slate-50 dark:bg-slate-800 p-5 mb-3 font-mono text-lg font-bold rounded-md">
                            {formula.equation}
                          </div>
                          <p>{formula.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Diagram-Based Analysis</h2>
                  <div className="space-y-8">
                    {concept.diagramAnalysis.map((diagram, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-200 dark:bg-gray-800 h-48 flex items-center justify-center">
                          <p className="text-muted-foreground">Diagram placeholder</p>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{diagram.title}</h3>
                          <p className="text-sm mt-2">{diagram.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="real-world" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Real-World Applications</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.realWorldApplications}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="exam" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Exam Relevance</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    {concept.examRelevance.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium mt-8 mb-4">NEET Previous Year Questions</h3>
                  <div className="space-y-6">
                    {concept.neetQuestions.map((q, idx) => (
                      <Card key={idx} className="overflow-hidden border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              NEET {q.year}
                            </Badge>
                          </div>
                          <p className="mb-4">{q.question}</p>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-100 dark:border-green-800">
                            <p><strong>Answer:</strong> {q.answer}</p>
                            <p className="mt-2 text-sm">{q.explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Common Mistakes</h2>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-lg text-red-800 dark:text-red-300">
                        <FileX className="h-5 w-5 inline-block mr-2 text-red-500" />
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="video" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Video Analysis</h2>
                  <div className="bg-gray-200 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video player placeholder</p>
                  </div>
                  <div className="mt-4 prose max-w-none dark:prose-invert">
                    <p>This video provides a visual explanation of Newton's Laws of Motion, with animations and real-world examples.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <Button 
              variant={notesOpen ? "default" : "outline"} 
              size="sm" 
              onClick={() => setNotesOpen(!notesOpen)}
              title="Toggle Notes (N)"
            >
              <PenLine className="h-4 w-4 mr-1" />
              {notesOpen ? "Close Notes" : "Add Notes"}
            </Button>
          </div>
          
          {notesOpen && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <textarea 
                  className="w-full h-32 p-3 border rounded-md bg-background resize-none" 
                  placeholder="Write your notes here..."
                />
                <div className="mt-3 flex justify-end">
                  <Button size="sm">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Mastery & Recall Section */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Exam Score
                    </span>
                    <span>{concept.masteryData.examScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-600 rounded-full h-2" style={{width: `${concept.masteryData.examScore}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Recall Strength
                    </span>
                    <span>{concept.masteryData.recallStrength}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-600 rounded-full h-2" style={{width: `${concept.masteryData.recallStrength}%`}}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2">
                  <span>Time per MCQ:</span>
                  <Badge variant="outline">{concept.masteryData.timePerMCQ}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-1">
                  <span>Revision due:</span>
                  <Badge variant="outline">{concept.masteryData.revisionDue}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-1">
                  <span>Status:</span>
                  <Badge variant={
                    concept.masteryData.status === "Mastered" ? "default" :
                    concept.masteryData.status === "Needs Revision" ? "secondary" :
                    "destructive"
                  }>
                    {concept.masteryData.status}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
                <Button variant="default" className="w-full">
                  <ListCheck className="mr-2 h-4 w-4" />
                  Take Practice Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Cards Section */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                Related Concepts
              </h2>
              <div className="space-y-3">
                {concept.relatedConcepts.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/dashboard/student/concepts/${related.id}/study`}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span>{related.title}</span>
                    <Badge variant="outline">{related.subject}</Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Flashcard Section */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <BookCheck className="h-5 w-5 text-emerald-600" />
                Related Flashcards
              </h2>
              <div className="space-y-3">
                {concept.relatedFlashcards.map((flashcard) => (
                  <Link 
                    key={flashcard.id}
                    to={`/dashboard/student/flashcards/${flashcard.id}/practice`}
                    className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                  >
                    <span>{flashcard.title}</span>
                    <Badge variant="outline" className="bg-white">{flashcard.count} cards</Badge>
                  </Link>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/dashboard/student/flashcards`}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View All Flashcards
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Exam Cards */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-purple-600" />
                Practice Exams
              </h2>
              <div className="space-y-3">
                {concept.relatedExams.map((exam) => (
                  <Link 
                    key={exam.id}
                    to={`/dashboard/student/practice-exam/${exam.id}/start`}
                    className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <span>{exam.title}</span>
                    <Badge variant="outline" className="bg-white">Take Exam</Badge>
                  </Link>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/dashboard/student/practice-exam`}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View All Practice Exams
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-800 overflow-hidden border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-lg font-medium text-purple-800 dark:text-purple-300">AI Insights</h2>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-purple-700 dark:text-purple-300">Weak Areas</h3>
                  <p className="mt-1">You seem to struggle with applications of Newton's Third Law. Focus on action-reaction pairs in complex systems.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-purple-700 dark:text-purple-300">Suggested Revision</h3>
                  <p className="mt-1">Review this concept again in 3 days to strengthen your recall. Focus on the video explanation and practice quiz.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-purple-700 dark:text-purple-300">Performance Milestone</h3>
                  <p className="mt-1">You're in the top 25% for understanding Newton's First Law! Keep up the good work.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Keyboard Shortcuts Guide */}
          <Card className="overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">Keyboard Shortcuts</h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">1</kbd> - <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">9</kbd> Switch tabs</p>
                <p><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Space</kbd> Toggle read aloud</p>
                <p><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">B</kbd> Toggle bookmark</p>
                <p><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">N</kbd> Toggle notes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-center text-muted-foreground">
        <p>Subject-specific module: <strong>{concept.subject}</strong> | Last updated: May 1, 2025</p>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
