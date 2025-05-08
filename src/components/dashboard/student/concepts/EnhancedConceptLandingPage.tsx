
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Bookmark, PenLine, Share2, Volume2, VolumeX, Book, ArrowRight, Clock, Calculator } from "lucide-react";
import { cn } from '@/lib/utils';
import FormulaTabContent from './FormulaTabContent';
import { Link } from 'react-router-dom';

// Props interface for the component
interface EnhancedConceptLandingPageProps {
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
  visualExplanation: {
    title: "Visualizing Newton's Laws",
    imageUrl: "https://example.com/newtons-laws-visual.png",
    description: "This GIF demonstrates the effects of Newton's laws on moving objects."
  },
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
  realWorldApplications: "Newton's Laws have countless real-world applications, from designing vehicles to planning space missions. Engineers use these principles to calculate the forces needed for rockets to escape Earth's gravity. In sports, understanding these laws helps athletes optimize their movements—like a swimmer pushing off the wall or a basketball player shooting. Even everyday activities like walking rely on these laws: you push backward on the ground (action), and the ground pushes you forward (reaction), allowing you to move.",
  commonMistakes: [
    "Confusing 'no force' with 'no motion' in the First Law. Objects can move at constant velocity when forces are balanced, not just when there's no force.",
    "Forgetting that acceleration is a vector quantity in F = ma. Direction matters!",
    "Misidentifying action-reaction pairs. Remember, action-reaction forces act on different objects, not on the same object."
  ],
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
  videoUrl: "https://example.com/newtons-laws-video",
  relatedConcepts: [
    { id: "c2", title: "Conservation of Momentum" },
    { id: "c3", title: "Circular Motion" },
    { id: "c4", title: "Work and Energy" }
  ],
  masteryData: {
    examScore: 85,
    recallStrength: 70,
    timePerMCQ: "45 seconds",
    revisionDue: "3 days",
    status: "Needs Revision"
  }
};

const EnhancedConceptLandingPage: React.FC<EnhancedConceptLandingPageProps> = ({ conceptId }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  
  // Voice reading functionality (mock implementation)
  const toggleVoiceReading = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would start or stop text-to-speech
  };
  
  // Language toggle
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };
  
  // Bookmark functionality
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real implementation, this would save to the user's bookmarks
  };
  
  const concept = mockConcept; // In a real app, this would fetch based on conceptId
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Top Panel - Always Visible */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{concept.title}</h1>
              <Badge variant={isBookmarked ? "default" : "outline"} 
                className="cursor-pointer" onClick={toggleBookmark}>
                <Bookmark className={cn("h-4 w-4 mr-1", isBookmarked ? "fill-current" : "")} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Badge>
            </div>
            
            <div className="flex items-center flex-wrap gap-2 mt-2">
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
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleVoiceReading} className="flex items-center gap-1">
              {isVoiceActive ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isVoiceActive ? 'Stop' : 'Read Aloud'}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-1">
              {language === 'english' ? 'EN' : 'HI'}
            </Button>
            <div className="bg-gray-100 dark:bg-gray-700 h-6 w-[1px]"></div>
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
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${concept.masteryData.examScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area - Tabs */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start p-2 bg-muted/50 rounded-t-lg overflow-x-auto flex-nowrap">
                  <TabsTrigger value="summary" className="whitespace-nowrap">Concept Summary</TabsTrigger>
                  <TabsTrigger value="visual" className="whitespace-nowrap">Visual Explanation</TabsTrigger>
                  <TabsTrigger value="formula" className="whitespace-nowrap">Formula Box</TabsTrigger>
                  <TabsTrigger value="linked" className="whitespace-nowrap">Linked Concepts</TabsTrigger>
                  <TabsTrigger value="video" className="whitespace-nowrap">Video Explanation</TabsTrigger>
                  <TabsTrigger value="real-world" className="whitespace-nowrap">Real-World Examples</TabsTrigger>
                  <TabsTrigger value="mistakes" className="whitespace-nowrap">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="quiz" className="whitespace-nowrap">MCQ Flash Quiz</TabsTrigger>
                  <TabsTrigger value="neet" className="whitespace-nowrap">Seen in NEET</TabsTrigger>
                </TabsList>
                
                {/* Tab Content */}
                <TabsContent value="summary" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Concept Summary</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.simpleExplanation}</p>
                    <p className="mt-4">{concept.detailedExplanation}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="visual" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{concept.visualExplanation.title}</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Visual explanation placeholder</p>
                  </div>
                  <p>{concept.visualExplanation.description}</p>
                </TabsContent>
                
                {/* Enhanced Formula Tab with FormulaTabContent component */}
                <TabsContent value="formula">
                  <FormulaTabContent conceptId={conceptId} />
                  <div className="px-6 pb-6 flex justify-center">
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link to="/dashboard/student/formula-practice-lab">
                        <Calculator className="h-4 w-4" />
                        PREPZR Formula Lab
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="linked" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Connected Concepts</h2>
                  <div className="space-y-3">
                    {concept.relatedConcepts.map((related) => (
                      <Card key={related.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{related.title}</h3>
                            <p className="text-sm text-muted-foreground">Physics</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="video" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Video Explanation</h2>
                  <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">Video player placeholder (2-3 minute explanation)</p>
                  </div>
                  <p>This video provides a visual explanation of Newton's Laws of Motion, with animations and real-world examples.</p>
                </TabsContent>
                
                <TabsContent value="real-world" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Real-World Applications</h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{concept.realWorldApplications}</p>
                    <div className="mt-6 space-y-4">
                      {concept.examples.map((example, idx) => (
                        <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-lg">
                          <h3 className="font-medium text-blue-800 dark:text-blue-300">{example.title}</h3>
                          <p className="mt-1">{example.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Common Mistakes</h2>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3 rounded-lg text-red-800 dark:text-red-300">
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="quiz" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">MCQ Flash Quiz</h2>
                  <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-3">Quick Concept Check</h3>
                    <p className="mb-4">If a force of 10N acts on an object of mass 2kg, what will be its acceleration?</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <input type="radio" id="opt1" name="quiz" className="h-4 w-4" />
                        <label htmlFor="opt1">5 m/s²</label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <input type="radio" id="opt2" name="quiz" className="h-4 w-4" />
                        <label htmlFor="opt2">20 m/s²</label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <input type="radio" id="opt3" name="quiz" className="h-4 w-4" />
                        <label htmlFor="opt3">2 m/s²</label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <input type="radio" id="opt4" name="quiz" className="h-4 w-4" />
                        <label htmlFor="opt4">0.2 m/s²</label>
                      </div>
                    </div>
                    <Button className="mt-4 w-full">Check Answer</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="neet" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">NEET Previous Year Questions</h2>
                  <div className="space-y-6">
                    {concept.neetQuestions.map((q, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              NEET {q.year}
                            </Badge>
                          </div>
                          <p className="mb-4">{q.question}</p>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                            <p><strong>Answer:</strong> {q.answer}</p>
                            <p className="mt-2 text-sm">{q.explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Notes Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <Button variant="outline" size="sm" onClick={() => setNotesOpen(!notesOpen)}>
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
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Mastery & Recall Section */}
          <Card>
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
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time per MCQ: {concept.masteryData.timePerMCQ}</span>
                  </div>
                  
                  <Badge variant="outline" className={
                    concept.masteryData.status === "Mastered" ? "bg-green-50 text-green-700 border-green-200" :
                    concept.masteryData.status === "Needs Revision" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }>
                    {concept.masteryData.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center pt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Revision due in: {concept.masteryData.revisionDue}</span>
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
                <Button variant="default" className="w-full">Take Practice Quiz</Button>
                <Button variant="outline" className="w-full">Review Flashcards</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Subject-specific section (for Physics) */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Book className="h-5 w-5 text-blue-600" />
                Physics Learning Tools
              </h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Download Formula Sheet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  View Solved Problems
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Explore Animations
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Concept Tags */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Concept Tags</h2>
              <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-800">
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
        </div>
      </div>
    </div>
  );
};

export default EnhancedConceptLandingPage;
