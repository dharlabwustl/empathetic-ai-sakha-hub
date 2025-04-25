
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, CheckCircle, Brain, BookOpenCheck, Lightbulb, GraduationCap, Volume2, VolumeMute, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data to find the card by ID
const mockConceptCards = [
  {
    id: "cc1",
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental laws of motion and their applications in mechanics",
    subject: "Physics",
    chapter: "Classical Mechanics",
    difficulty: "medium",
    completed: false,
    progress: 0,
    content: {
      basic: `
        <h2>Newton's Three Laws of Motion (Basic)</h2>
        <p>Sir Isaac Newton's three laws of motion are the foundation of classical mechanics.</p>
        
        <h3>First Law: Law of Inertia</h3>
        <p>Objects at rest stay at rest, and objects in motion stay in motion with the same speed and direction, unless acted upon by a force.</p>
        
        <h3>Second Law: F = ma</h3>
        <p>The acceleration of an object depends on the force applied and the mass of the object. More force = more acceleration. More mass = less acceleration.</p>
        
        <h3>Third Law: Action and Reaction</h3>
        <p>For every action, there is an equal and opposite reaction.</p>
      `,
      detailed: `
        <h2>Newton's Three Laws of Motion (Detailed)</h2>
        <p>Sir Isaac Newton's three laws of motion form the foundation of classical mechanics and were first published in his work "Philosophiæ Naturalis Principia Mathematica" in 1687.</p>
        
        <h3>First Law: Law of Inertia</h3>
        <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force. This law describes the concept of inertia, the resistance of any physical object to any change in its velocity.</p>
        
        <h3>Second Law: F = ma</h3>
        <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, F = ma, where F is force, m is mass, and a is acceleration. This law allows us to quantitatively calculate how forces affect motion.</p>
        
        <h3>Third Law: Action and Reaction</h3>
        <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object. This law explains why forces always occur in pairs.</p>
        
        <h4>Mathematical Representations</h4>
        <p>First Law: If ΣF = 0, then v = constant (or a = 0)</p>
        <p>Second Law: ΣF = ma or ΣF = d(mv)/dt</p>
        <p>Third Law: F_AB = -F_BA</p>
      `,
      simplified: `
        <h2>Newton's Laws Made Simple</h2>
        
        <h3>First Law: Things Keep Doing What They're Doing</h3>
        <p>If something is sitting still, it will keep sitting still unless something pushes or pulls it. If something is moving, it will keep moving the same way unless something pushes or pulls it.</p>
        
        <h3>Second Law: Bigger Push, Bigger Change</h3>
        <p>When you push something, how much it speeds up depends on two things:</p>
        <ul>
          <li>How hard you push (more push = more speed-up)</li>
          <li>How heavy it is (heavier things are harder to speed up)</li>
        </ul>
        
        <h3>Third Law: Push and Push Back</h3>
        <p>Whenever you push on something, that thing pushes back on you just as hard. That's why when you jump, you push down on the ground, and the ground pushes up on you!</p>
      `,
      advanced: `
        <h2>Advanced Analysis of Newton's Laws</h2>
        
        <h3>First Law as a Consequence of the Second Law</h3>
        <p>The first law can be viewed as a special case of the second law where the net force is zero, resulting in zero acceleration and thus constant velocity.</p>
        
        <h3>Second Law in Different Reference Frames</h3>
        <p>Newton's second law holds true only in inertial reference frames. In non-inertial reference frames, we need to introduce fictitious forces like the Coriolis force and centrifugal force to maintain the mathematical form of the law.</p>
        
        <h3>Limitations of Newtonian Mechanics</h3>
        <p>Newton's laws break down under certain conditions:</p>
        <ul>
          <li>At speeds approaching the speed of light (requiring Einstein's special relativity)</li>
          <li>At quantum scales (requiring quantum mechanics)</li>
          <li>In extremely strong gravitational fields (requiring general relativity)</li>
        </ul>
        
        <h3>Differential Form</h3>
        <p>The second law can be expressed in differential form as:</p>
        <p>F = d(mv)/dt = m(dv/dt) + v(dm/dt)</p>
        <p>This is particularly useful for systems with variable mass, such as rockets.</p>
        
        <h3>Conservation Laws</h3>
        <p>Newton's laws lead directly to conservation laws when applied to isolated systems:</p>
        <ul>
          <li>Conservation of linear momentum</li>
          <li>Conservation of angular momentum</li>
          <li>Conservation of energy (with appropriate definitions)</li>
        </ul>
      `
    },
    examples: [
      {
        question: "A 2 kg object experiences a net force of 10 N. What is its acceleration?",
        solution: "Using Newton's Second Law: F = ma\na = F/m = 10 N / 2 kg = 5 m/s²"
      },
      {
        question: "Explain why a rocket moves forward.",
        solution: "As per Newton's Third Law, the rocket expels gas backward (action) and experiences a thrust force forward (reaction), propelling it in the forward direction."
      }
    ],
    commonMistakes: [
      {
        mistake: "Confusing mass and weight",
        explanation: "Mass is a measure of the amount of matter, while weight is the force of gravity acting on that mass. Mass remains constant regardless of location, but weight changes with gravitational field strength."
      },
      {
        mistake: "Applying Newton's First Law incorrectly",
        explanation: "Many students think objects naturally come to a stop, but this is due to unbalanced forces like friction, not a violation of the law."
      },
      {
        mistake: "Ignoring action-reaction pairs",
        explanation: "The action and reaction forces in the Third Law act on different objects. Students often incorrectly apply both forces to the same object."
      }
    ],
    examRelevance: {
      importanceLevel: "High",
      commonQuestionTypes: [
        "Numerical problems applying F=ma",
        "Conceptual questions about inertia",
        "Free-body diagrams and force analysis",
        "Real-world applications of the laws"
      ],
      examTips: "Pay close attention to identifying all forces in a problem. Many exam questions involve calculating the acceleration of objects under multiple forces or explaining everyday phenomena using Newton's laws."
    },
    relatedTopics: ["Momentum", "Friction", "Circular Motion", "Gravity", "Work and Energy"]
  },
  {
    id: "cc2",
    title: "Chemical Bonding",
    description: "Learn about different types of chemical bonds and their formation mechanisms",
    subject: "Chemistry",
    chapter: "Chemical Structures",
    difficulty: "hard",
    completed: false,
    progress: 30,
    content: {
      basic: `
        <h2>Chemical Bonding (Basic)</h2>
        <p>Chemical bonds are forces that hold atoms together to form molecules and compounds.</p>
        
        <h3>Main Types of Bonds:</h3>
        <ul>
          <li><strong>Ionic Bond:</strong> Transfer of electrons between a metal and non-metal</li>
          <li><strong>Covalent Bond:</strong> Sharing of electrons between non-metals</li>
          <li><strong>Metallic Bond:</strong> Sharing of electrons among many metal atoms</li>
        </ul>
      `,
      detailed: `
        <h2>Chemical Bonding (Detailed)</h2>
        <p>Chemical bonding is the attraction between atoms that allows the formation of chemical substances containing two or more atoms.</p>
        
        <h3>Ionic Bonding</h3>
        <p>Involves the transfer of electrons between atoms, typically between a metal and a non-metal, resulting in the formation of positive and negative ions that attract each other. The electrostatic attraction between oppositely charged ions forms a crystalline lattice structure.</p>
        <p>Example: NaCl (table salt) - Sodium (Na) donates an electron to Chlorine (Cl)</p>
        
        <h3>Covalent Bonding</h3>
        <p>Involves the sharing of electron pairs between atoms, typically between non-metals, resulting in the formation of discrete molecules. Bonds can be single, double, or triple depending on the number of electron pairs shared.</p>
        <p>Example: H₂O - each Hydrogen shares an electron pair with Oxygen</p>
        
        <h3>Metallic Bonding</h3>
        <p>Involves the sharing of free electrons among a structure of positively charged metal ions, resulting in a "sea of electrons" model. This explains properties like electrical conductivity and malleability of metals.</p>
        <p>Example: Copper (Cu) metal lattice with delocalized electrons</p>
      `,
      simplified: `
        <h2>Chemical Bonds Made Simple</h2>
        
        <h3>Ionic Bonds: Give and Take</h3>
        <p>Some atoms like to give away electrons, and some like to take them. When one atom gives an electron to another, they become charged (ions) and stick together because opposite charges attract.</p>
        <p>Think of it like magnets sticking together!</p>
        
        <h3>Covalent Bonds: Sharing is Caring</h3>
        <p>When atoms don't want to give up their electrons completely, they share them instead. It's like two people holding hands - neither person lets go of their arm, but they're connected by holding hands.</p>
        
        <h3>Metallic Bonds: Community Electrons</h3>
        <p>In metals, all atoms put their outer electrons in a shared pool. It's like all the metal atoms putting their electrons into a community swimming pool, and then sitting in the pool together.</p>
      `,
      advanced: `
        <h2>Advanced Analysis of Chemical Bonding</h2>
        
        <h3>Molecular Orbital Theory</h3>
        <p>Beyond the simple Lewis model, molecular orbital (MO) theory provides a more accurate quantum mechanical description of bonding. Atomic orbitals combine to form molecular orbitals that can be bonding or antibonding.</p>
        
        <h3>Hybridization</h3>
        <p>To explain observed molecular geometries, we often need to consider the hybridization of atomic orbitals. Common hybridizations include sp³ (tetrahedral), sp² (trigonal planar), and sp (linear).</p>
        
        <h3>Bond Polarity and Electronegativity</h3>
        <p>The unequal sharing of electrons in covalent bonds leads to bond polarity, which can be calculated based on the difference in electronegativity between atoms. Highly polar bonds exhibit partial ionic character.</p>
        
        <h3>Resonance Structures</h3>
        <p>Some molecules cannot be adequately represented by a single Lewis structure and require multiple resonance forms, where electrons are delocalized across the molecule.</p>
        
        <h3>Intermolecular Forces</h3>
        <p>Beyond intramolecular bonds, intermolecular forces like hydrogen bonding, dipole-dipole interactions, and London dispersion forces play crucial roles in determining physical properties of substances.</p>
      `
    },
    examples: [
      {
        question: "Identify the type of bonding in NaCl.",
        solution: "NaCl (sodium chloride) exhibits ionic bonding, where sodium (a metal) donates an electron to chlorine (a non-metal), forming Na+ and Cl- ions that attract each other electrostatically."
      },
      {
        question: "Explain the bonding in a water molecule (H2O).",
        solution: "H2O exhibits covalent bonding, where each hydrogen atom shares an electron pair with the oxygen atom, forming two separate covalent bonds."
      }
    ],
    commonMistakes: [
      {
        mistake: "Assuming all bonds are purely ionic or purely covalent",
        explanation: "Many bonds have partial ionic character based on electronegativity differences."
      },
      {
        mistake: "Forgetting formal charges",
        explanation: "When drawing Lewis structures, students often forget to calculate formal charges to determine the most stable arrangement."
      },
      {
        mistake: "Ignoring molecular geometry",
        explanation: "Bond angles and molecular shapes are determined by electron pair repulsion, not just the number of bonds."
      }
    ],
    examRelevance: {
      importanceLevel: "Very High",
      commonQuestionTypes: [
        "Drawing Lewis structures",
        "Predicting molecular geometry using VSEPR theory",
        "Identifying bond types in unknown compounds",
        "Explaining physical properties based on bonding"
      ],
      examTips: "Be able to quickly determine electronegativity differences to predict bond polarity. Practice drawing many different Lewis structures, especially those with multiple bonds or resonance structures."
    },
    relatedTopics: ["Lewis Structures", "Molecular Geometry", "Electronegativity", "Valence Bond Theory"]
  }
];

const ConceptCardStudyPage = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [activeContentSubTab, setActiveContentSubTab] = useState("basic");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundCard = mockConceptCards.find(c => c.id === cardId);
      if (foundCard) {
        setCard(foundCard);
        setProgress(foundCard.progress);
        setCompleted(foundCard.completed);
      }
      setLoading(false);
    }, 500);
  }, [cardId]);
  
  const handleMarkComplete = () => {
    setCompleted(!completed);
    setProgress(completed ? 50 : 100);
    
    toast({
      title: completed ? "Marked as in progress" : "Marked as completed",
      description: `Concept card has been marked as ${completed ? "in progress" : "completed"}.`,
    });
  };
  
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  const toggleVoice = () => {
    if (isVoiceEnabled && isSpeaking) {
      // Stop currently speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (isVoiceEnabled) {
      // Already enabled but not speaking, don't change state
      setIsVoiceEnabled(false);
    } else {
      // Enable voice
      setIsVoiceEnabled(true);
    }
  };
  
  const speakContent = () => {
    if (!isVoiceEnabled || !card?.content) return;
    
    // Get current content based on active tab
    const contentToSpeak = card.content[activeContentSubTab];
    
    // Strip HTML tags for speech
    const textToSpeak = contentToSpeak.replace(/<[^>]*>/g, ' ');
    
    // Create and configure speech
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speech.rate = 1;
    speech.pitch = 1;
    
    // Event handlers
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Voice playback error",
        description: "There was an error playing the voice narration.",
        variant: "destructive"
      });
    };
    
    // Start speaking
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(speech);
  };
  
  useEffect(() => {
    // Stop speaking when changing tabs
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeTab, activeContentSubTab]);
  
  useEffect(() => {
    // Speak content when voice is enabled and content changes
    if (isVoiceEnabled && !isSpeaking && card) {
      speakContent();
    }
  }, [isVoiceEnabled, activeContentSubTab, card]);
  
  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="animate-pulse">
            <CardHeader className="h-24"></CardHeader>
            <CardContent className="h-96"></CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Concept Card Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The requested concept card could not be found.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGoBack}>Go Back</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="mb-4 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Concept Cards
        </Button>
        
        <Card className="mb-6">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700">
                    {card.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700">
                    {card.chapter}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${card.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700' : ''}
                    ${card.difficulty === 'medium' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700' : ''}
                    ${card.difficulty === 'hard' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700' : ''}
                  `}>
                    {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold">{card.title}</CardTitle>
                <CardDescription className="text-base">{card.description}</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={isVoiceEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={toggleVoice}
                  title={isVoiceEnabled ? "Disable voice narration" : "Enable voice narration"}
                  className="rounded-full"
                >
                  {isVoiceEnabled ? 
                    <Volume2 className={`h-4 w-4 ${isSpeaking ? 'animate-pulse' : ''}`} /> : 
                    <VolumeMute className="h-4 w-4" />
                  }
                </Button>
                
                <Button
                  variant={completed ? "outline" : "default"}
                  className={`min-w-32 ${completed ? 'text-green-600 border-green-200 hover:bg-green-50' : ''}`}
                  onClick={handleMarkComplete}
                >
                  {completed ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          
          <div>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  <span>Examples</span>
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Common Mistakes</span>
                </TabsTrigger>
                <TabsTrigger value="exam" className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" />
                  <span>Exam Relevance</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <Tabs 
                  defaultValue="basic" 
                  value={activeContentSubTab} 
                  onValueChange={setActiveContentSubTab}
                  className="mt-4"
                >
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed</TabsTrigger>
                    <TabsTrigger value="simplified">Simplified</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  {["basic", "detailed", "simplified", "advanced"].map((tabKey) => (
                    <TabsContent key={tabKey} value={tabKey} className="prose dark:prose-invert max-w-none pt-4 pb-6 px-4">
                      <div dangerouslySetInnerHTML={{ __html: card.content[tabKey] }} />
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
              
              <TabsContent value="examples">
                <CardContent className="py-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Example Problems
                  </h3>
                  
                  <div className="space-y-6">
                    {card.examples?.map((example: any, index: number) => (
                      <Card key={index} className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Problem {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Question:</h4>
                            <p>{example.question}</p>
                          </div>
                          <div className="pt-3 border-t">
                            <h4 className="font-medium mb-2">Solution:</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap">{example.solution}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!card.examples || card.examples.length === 0) && (
                      <p className="text-center py-6 text-muted-foreground">No example problems available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="mistakes">
                <CardContent className="py-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Common Mistakes to Avoid
                  </h3>
                  
                  <div className="space-y-6">
                    {card.commonMistakes?.map((item: any, index: number) => (
                      <Card key={index} className="bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-red-800 dark:text-red-300">{item.mistake}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300">{item.explanation}</p>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!card.commonMistakes || card.commonMistakes.length === 0) && (
                      <p className="text-center py-6 text-muted-foreground">No common mistakes documented for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="exam">
                <CardContent className="py-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Exam Relevance
                  </h3>
                  
                  {card.examRelevance ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={`
                          ${card.examRelevance.importanceLevel === 'Low' ? 'bg-blue-100 text-blue-800' : ''}
                          ${card.examRelevance.importanceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${card.examRelevance.importanceLevel === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                          ${card.examRelevance.importanceLevel === 'Very High' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          Importance: {card.examRelevance.importanceLevel}
                        </Badge>
                      </div>
                    
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Common Question Types</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-2">
                            {card.examRelevance.commonQuestionTypes.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Exam Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{card.examRelevance.examTips}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">No exam relevance information available for this concept.</p>
                  )}
                </CardContent>
              </TabsContent>
            </Tabs>
          </div>
          
          <CardFooter className="border-t pt-6 pb-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 w-full flex items-center">
              <BookOpenCheck className="h-5 w-5 mr-2" />
              Related Concepts
            </h3>
            
            {card.relatedTopics && card.relatedTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                {card.relatedTopics.map((topic: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                      <CardContent className="p-4 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{topic}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">No related topics available for this concept.</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
