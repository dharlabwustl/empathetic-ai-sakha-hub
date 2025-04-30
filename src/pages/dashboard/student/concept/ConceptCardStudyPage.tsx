
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Book, 
  Bookmark, 
  BookOpen, 
  Clock, 
  BookText,
  ExternalLink, 
  Flag, 
  History, 
  Lightbulb, 
  ListChecks, 
  MessageSquare, 
  Play,
  PlaySquare, 
  Share2, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronLeft,
  ChevronRight,
  Pen,
  PenLine,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConceptCardStudyPageProps {
  conceptId?: string;
}

const ConceptCardStudyPage: React.FC<ConceptCardStudyPageProps> = ({ conceptId = "1" }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentTab, setCurrentTab] = useState("simple");
  const [timeSpent, setTimeSpent] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  
  // Mock concept data
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Classical Mechanics",
    idealTime: 15, // minutes
    difficultyLevel: "Intermediate",
    examRelevance: 95,
    sections: ["Simple", "Detailed", "Examples", "Real-world Applications", "Exam Relevance", "Common Mistakes", "Diagrams", "Video Analysis"],
    relatedConcepts: ["Conservation of Momentum", "Work and Energy", "Friction", "Circular Motion"]
  };
  
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      // Code to start text-to-speech would go here
      console.log('Voice reading started');
    } else {
      // Code to stop text-to-speech would go here
      console.log('Voice reading stopped');
    }
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const nextSection = () => {
    if (currentSection < concept.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentTab(concept.sections[currentSection + 1].toLowerCase().replace(/-/g, '').replace(/\s+/g, ''));
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentTab(concept.sections[currentSection - 1].toLowerCase().replace(/-/g, '').replace(/\s+/g, ''));
    }
  };
  
  // Simulated time tracking
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/20 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button and concept navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Concepts</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevSection} disabled={currentSection === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentSection + 1} of {concept.sections.length}
            </span>
            <Button variant="outline" size="icon" onClick={nextSection} disabled={currentSection === concept.sections.length - 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Concept header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                      {concept.chapter}
                    </Badge>
                    <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                      {concept.difficultyLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">{concept.title}</CardTitle>
                  <CardDescription className="mt-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Ideal completion time: {concept.idealTime} minutes
                    {timeSpent > 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (You've spent {timeSpent} min)
                      </span>
                    )}
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={isBookmarked ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"}
                    onClick={handleBookmark}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={isVoiceEnabled ? "text-green-500 hover:text-green-600" : "text-muted-foreground"}
                    onClick={toggleVoice}
                  >
                    {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Concept Mastery</span>
                </div>
                <span className="text-sm font-semibold">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/30 py-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated 2 weeks ago</span>
              </div>
              
              <div className="flex items-center">
                <ListChecks className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Exam relevance: <span className="text-green-600 font-semibold">{concept.examRelevance}%</span>
                </span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Voice readout controls */}
        {isVoiceEnabled && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Progress value={45} className="w-64" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="voice-speed" className="text-sm">Speed</Label>
                      <Slider id="voice-speed" defaultValue={[1]} max={2} step={0.1} className="w-24" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="voice-enabled" className="text-sm">Enabled</Label>
                      <Switch id="voice-enabled" checked={isVoiceEnabled} onCheckedChange={setIsVoiceEnabled} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Main tabs content */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={currentTab} onValueChange={(value) => {
            setCurrentTab(value);
            setCurrentSection(concept.sections.findIndex(s => 
              s.toLowerCase().replace(/-/g, '').replace(/\s+/g, '') === value
            ));
          }} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
              {concept.sections.map((section, index) => (
                <TabsTrigger 
                  key={index} 
                  value={section.toLowerCase().replace(/-/g, '').replace(/\s+/g, '')}
                  className="relative"
                >
                  {section}
                  {index === currentSection && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="simple" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Simple Explanation</CardTitle>
                      <CardDescription>A straightforward explanation of Newton's Laws of Motion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <h3 className="font-semibold">Newton's First Law (Law of Inertia)</h3>
                      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.</p>
                      
                      <h3 className="font-semibold">Newton's Second Law (F=ma)</h3>
                      <p>The acceleration of an object depends on the mass of the object and the amount of force applied.</p>
                      
                      <h3 className="font-semibold">Newton's Third Law (Action-Reaction)</h3>
                      <p>For every action, there is an equal and opposite reaction.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="detailed" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Detailed Explanation</CardTitle>
                      <CardDescription>An in-depth look at Newton's Laws of Motion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <h3 className="font-semibold">Newton's First Law (Law of Inertia)</h3>
                      <p>Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This law is often referred to as the law of inertia, where inertia is the property of matter that resists changes in motion.</p>
                      
                      <h3 className="font-semibold">Newton's Second Law (F=ma)</h3>
                      <p>Newton's Second Law establishes the relationship between force, mass, and acceleration. It's mathematically expressed as F = ma, where F is the net force applied, m is the mass of the object, and a is the acceleration produced. This means the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                      
                      <h3 className="font-semibold">Newton's Third Law (Action-Reaction)</h3>
                      <p>Newton's Third Law asserts that for every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object simultaneously exerts a force of equal magnitude in the opposite direction on the first object. These forces always come in pairs and act on different objects.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="examples" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Examples</CardTitle>
                      <CardDescription>Practical examples illustrating Newton's Laws</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="mb-6">
                        <h3 className="font-semibold">First Law Examples</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>A book resting on a table stays at rest unless pushed.</li>
                          <li>Passengers in a vehicle tend to move forward when the vehicle stops suddenly.</li>
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold">Second Law Examples</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>When kicking a football, the harder you kick (more force), the farther it goes.</li>
                          <li>A heavy object needs more force to accelerate it than a lighter object.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">Third Law Examples</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>Rocket propulsion: gases push backward, rocket moves forward.</li>
                          <li>Walking: you push the ground backward, the ground pushes you forward.</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="realworldapplications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Real-world Applications</CardTitle>
                      <CardDescription>How Newton's Laws are applied in everyday life</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h3 className="font-semibold text-blue-700 dark:text-blue-300">Transportation</h3>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Design of seatbelts (First Law)</li>
                            <li>Car engine design (Second Law)</li>
                            <li>Jet propulsion systems (Third Law)</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <h3 className="font-semibold text-purple-700 dark:text-purple-300">Sports</h3>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Design of sports equipment</li>
                            <li>Techniques for improved performance</li>
                            <li>Understanding body mechanics</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h3 className="font-semibold text-green-700 dark:text-green-300">Construction</h3>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Structural stability in buildings</li>
                            <li>Crane operations</li>
                            <li>Bridge design principles</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <h3 className="font-semibold text-amber-700 dark:text-amber-300">Space Exploration</h3>
                          <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Satellite orbital mechanics</li>
                            <li>Spacecraft maneuvering</li>
                            <li>Mission planning calculations</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="examrelevance" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Exam Relevance</CardTitle>
                      <CardDescription>How this concept appears in exams</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h3 className="font-semibold mb-2">Common Question Types</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Numerical problems applying F=ma</li>
                          <li>Conceptual questions on inertia and action-reaction</li>
                          <li>Free body diagrams analyzing forces</li>
                          <li>Real-world scenario analysis using Newton's laws</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Historical Exam Data</h3>
                        <p className="mb-2">This concept appears in approximately 15-20% of physics exams, with an average of 3-4 questions per paper.</p>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium w-32">Appearance Rate:</span>
                          <Progress value={85} className="h-2" />
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium w-32">Marks Weightage:</span>
                          <Progress value={65} className="h-2" />
                          <span className="text-sm font-medium">65%</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50/50 dark:bg-amber-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <h3 className="font-semibold text-amber-700 dark:text-amber-400">Exam Strategy Tip</h3>
                        </div>
                        <p className="text-amber-700 dark:text-amber-400">Focus on mastering free body diagrams and being able to identify all forces acting on an object. These skills are essential for solving most Newton's Laws problems in exams.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="commonmistakes" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Common Mistakes</CardTitle>
                      <CardDescription>Errors to avoid when applying Newton's Laws</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                          <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Mistake #1: Confusing Mass and Weight</h3>
                          <p className="mb-2">Students often use mass and weight interchangeably, but mass is the amount of matter (kg) while weight is a force (N).</p>
                          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                            <p className="font-medium">Correct approach:</p>
                            <p>Remember that weight (W) = mass (m) × gravitational acceleration (g)</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                          <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Mistake #2: Incomplete Free Body Diagrams</h3>
                          <p className="mb-2">Missing forces or incorrect directions in free body diagrams lead to wrong solutions.</p>
                          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                            <p className="font-medium">Correct approach:</p>
                            <p>Systematically identify ALL forces: gravity, normal, friction, tension, applied forces, etc.</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                          <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Mistake #3: Misunderstanding Equilibrium</h3>
                          <p className="mb-2">Thinking that equilibrium means no forces are acting, rather than net force being zero.</p>
                          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                            <p className="font-medium">Correct approach:</p>
                            <p>In equilibrium, forces are still present but they balance out (ΣF = 0)</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="diagrams" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Diagram-based Analysis</CardTitle>
                      <CardDescription>Visual explanations of Newton's Laws</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                          <p className="text-muted-foreground mb-2">[Diagram: First Law - Object at rest and in motion]</p>
                          <h3 className="font-semibold mb-2">First Law Illustration</h3>
                          <p>This diagram shows how objects maintain their state of motion unless an external force acts on them.</p>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                          <p className="text-muted-foreground mb-2">[Diagram: Second Law - Force and Acceleration]</p>
                          <h3 className="font-semibold mb-2">Second Law Illustration</h3>
                          <p>This diagram demonstrates the relationship between force, mass, and acceleration.</p>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                          <p className="text-muted-foreground mb-2">[Diagram: Third Law - Action and Reaction]</p>
                          <h3 className="font-semibold mb-2">Third Law Illustration</h3>
                          <p>This diagram shows equal and opposite forces acting on different objects.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="videoanalysis" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Video Analysis</CardTitle>
                      <CardDescription>Video explanations and demonstrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <PlaySquare className="h-12 w-12 text-primary mx-auto mb-2" />
                            <p className="text-lg font-medium">Newton's Laws of Motion: Visual Explanation</p>
                            <p className="text-sm text-muted-foreground">12:34 • Physics with Professor Smith</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center p-4">
                            <div className="text-center">
                              <PlaySquare className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="font-medium">First Law Demonstrations</p>
                              <p className="text-xs text-muted-foreground">5:20 • Lab Experiments</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center p-4">
                            <div className="text-center">
                              <PlaySquare className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="font-medium">Second Law Demonstrations</p>
                              <p className="text-xs text-muted-foreground">7:45 • Lab Experiments</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center p-4">
                            <div className="text-center">
                              <PlaySquare className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="font-medium">Third Law Demonstrations</p>
                              <p className="text-xs text-muted-foreground">6:15 • Lab Experiments</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 dark:bg-gray-800 aspect-video rounded-lg flex items-center justify-center p-4">
                            <div className="text-center">
                              <PlaySquare className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="font-medium">Problem Solving Walkthrough</p>
                              <p className="text-xs text-muted-foreground">10:30 • Exam Preparation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
        
        {/* Related actions */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                  <BookText className="h-5 w-5 mb-2" />
                  <span>Create Flashcards</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                  <PenLine className="h-5 w-5 mb-2" />
                  <span>Add Notes</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                  <Flag className="h-5 w-5 mb-2" />
                  <span>Flag for Review</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span>Ask Questions</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Related concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Related Concepts</CardTitle>
              <CardDescription>Explore these concepts to deepen your understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {concept.relatedConcepts.map((relatedConcept, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-800">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">{relatedConcept}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Badge variant="outline" className="text-xs">
                        Physics
                      </Badge>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 flex justify-center">
              <Button variant="ghost" className="text-primary">
                View All Related Concepts
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
