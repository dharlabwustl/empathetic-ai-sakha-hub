
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Image, 
  Video, 
  AlertCircle, 
  Lightbulb, 
  Calculator, 
  BarChart, 
  Clock, 
  MessageSquare, 
  Link as LinkIcon,
  BookText,
  Box,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import NoteSection from './concept-detail/NoteSection';
import RecallSection from '@/components/dashboard/student/concepts/RecallSection';
import AIInsightsSection from '@/components/dashboard/student/concepts/AIInsightsSection';
import useUserNotes from '@/hooks/useUserNotes';
import { useToast } from '@/components/ui/use-toast';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [activeManagementTab, setActiveManagementTab] = useState("recall");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [activeReadAloudText, setActiveReadAloudText] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const notesHook = useUserNotes();
  const { toast } = useToast();

  // This is mock data - in a real app, this would come from an API call
  const concept = {
    id: conceptId || '1',
    title: "Ohm's Law",
    subject: "Physics",
    topic: "Electricity",
    difficulty: "medium" as "easy" | "medium" | "hard",
    masteryLevel: 65,
    description: `Ohm's Law is a fundamental principle in electrical engineering that describes the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit. The law states that the current through a conductor between two points is directly proportional to the voltage across the two points, and inversely proportional to the resistance between them. This relationship is expressed mathematically as V = IR, where V is the voltage across the conductor in volts, I is the current flowing through the conductor in amperes, and R is the resistance of the conductor in ohms.`,
    learnContent: `
      <h2>Understanding Ohm's Law</h2>
      <p>Ohm's Law is one of the most fundamental relationships in electrical engineering. It establishes that the current flowing through a conductor is directly proportional to the voltage applied across it, given that the physical conditions (like temperature) remain constant.</p>
      
      <h3>The Mathematical Formula</h3>
      <p>The mathematical representation of Ohm's Law is:</p>
      <p><strong>V = I × R</strong></p>
      <p>Where:</p>
      <ul>
        <li>V represents voltage measured in volts (V)</li>
        <li>I represents current measured in amperes (A)</li>
        <li>R represents resistance measured in ohms (Ω)</li>
      </ul>
      
      <h3>Derived Forms</h3>
      <p>From the basic formula, we can derive two other forms:</p>
      <ul>
        <li>I = V ÷ R (Current equals voltage divided by resistance)</li>
        <li>R = V ÷ I (Resistance equals voltage divided by current)</li>
      </ul>
      
      <h3>Practical Applications</h3>
      <p>Ohm's Law is used extensively in analyzing electrical circuits. It helps in determining:</p>
      <ul>
        <li>How much current will flow in a circuit with a known voltage and resistance</li>
        <li>What voltage is needed to achieve a specific current through a known resistance</li>
        <li>What resistance is needed to limit current to a specific value at a known voltage</li>
      </ul>
      
      <h3>Limitations</h3>
      <p>It's important to note that Ohm's Law doesn't apply to all electrical components. Some components, like diodes and transistors, have non-linear characteristics where the current doesn't increase proportionally with voltage.</p>
    `,
    visualContent: `
      <div>
        <p>Visual representations of Ohm's Law include circuit diagrams, graphs showing the linear relationship between voltage and current, and the Ohm's Law triangle diagram that helps remember the three formulas.</p>
      </div>
    `,
    videoContent: `
      <p>Video tutorials demonstrating Ohm's Law with practical examples and circuit simulations would be shown here.</p>
    `,
    formulas: [
      { id: 'f1', name: "Ohm's Law", formula: "V = I × R", variables: [
        { symbol: "V", name: "Voltage", unit: "Volts (V)" },
        { symbol: "I", name: "Current", unit: "Amperes (A)" },
        { symbol: "R", name: "Resistance", unit: "Ohms (Ω)" },
      ]},
      { id: 'f2', name: "Power Law", formula: "P = V × I", variables: [
        { symbol: "P", name: "Power", unit: "Watts (W)" },
        { symbol: "V", name: "Voltage", unit: "Volts (V)" },
        { symbol: "I", name: "Current", unit: "Amperes (A)" },
      ]},
    ],
    commonMistakes: [
      "Forgetting to convert units (e.g., using kilohms instead of ohms)",
      "Applying Ohm's Law to non-linear components",
      "Mixing up the formulas and incorrectly solving for variables",
      "Not accounting for temperature effects on resistance"
    ],
    questions: [
      {
        id: 'q1',
        text: "If a circuit has a resistance of 5Ω and a current of 2A, what is the voltage?",
        answer: "V = I × R = 2A × 5Ω = 10V"
      },
      {
        id: 'q2',
        text: "What happens to current if voltage is doubled while resistance remains constant?",
        answer: "The current will also double, as they are directly proportional according to Ohm's Law."
      }
    ],
    prevYearQuestions: [
      {
        id: 'py1',
        year: 2023,
        exam: "NEET",
        question: "A wire of resistance 10Ω is drawn out so that its length becomes twice its original length. The resistance of the wire becomes:",
        options: ["5Ω", "10Ω", "20Ω", "40Ω"],
        answer: "40Ω",
        explanation: "When a wire is drawn to twice its length, its cross-sectional area becomes one-fourth. Since R = ρL/A, the resistance becomes four times the original."
      }
    ],
    relatedConcepts: [
      { id: 'rc1', title: "Kirchhoff's Laws", masteryLevel: 45 },
      { id: 'rc2', title: "Electrical Power", masteryLevel: 70 },
      { id: 'rc3', title: "Series and Parallel Circuits", masteryLevel: 55 }
    ],
    examReady: false
  };

  useEffect(() => {
    // In a real app, fetch the concept data based on conceptId
    console.log(`Fetching concept data for ID: ${conceptId}`);
    
    // Load user notes for this concept
    if (conceptId) {
      const savedNotes = notesHook.getNoteForConcept(conceptId);
      setUserNotes(savedNotes);
    }
  }, [conceptId, notesHook]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "This concept has been removed from your bookmarks" : "This concept has been added to your bookmarks",
      duration: 3000
    });
  };

  const handleReadAloud = (text: string) => {
    setActiveReadAloudText(text);
    setReadAloudActive(true);

    // Using the SpeechSynthesis API
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>?/gm, ''));
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  const handleStopReadAloud = () => {
    speechSynthesis.cancel();
    setReadAloudActive(false);
  };

  const handleSaveNotes = () => {
    if (conceptId) {
      const success = notesHook.saveNote(conceptId, userNotes);
      if (success) {
        toast({
          title: "Notes saved",
          description: "Your notes have been saved successfully",
          duration: 3000
        });
      } else {
        toast({
          title: "Error saving notes",
          description: "There was an error saving your notes. Please try again.",
          variant: "destructive",
          duration: 3000
        });
      }
    }
  };

  const getReadAloudTextForTab = () => {
    switch (activeTab) {
      case "learn":
        return concept.description + " " + concept.learnContent.replace(/<[^>]*>?/gm, '');
      case "visual":
        return "Visual representation of Ohm's Law showing the relationship between voltage, current and resistance.";
      case "3d":
        return "3D interactive model demonstrating Ohm's Law principles in a circuit.";
      case "formula":
        return "Ohm's Law is expressed as V equals I times R, where V is voltage in volts, I is current in amperes, and R is resistance in ohms.";
      case "video":
        return "Video tutorials explaining Ohm's Law and its applications.";
      case "mistakes":
        return "Common mistakes when applying Ohm's Law: " + concept.commonMistakes.join(", ");
      default:
        return concept.description;
    }
  };

  // Mastery metrics
  const masteryMetrics = [
    { title: "Mastery Level", value: `${concept.masteryLevel}%`, icon: <BookOpen className="h-5 w-5 text-blue-600" /> },
    { title: "Recall Strength", value: "Medium", icon: <Lightbulb className="h-5 w-5 text-amber-600" /> },
    { title: "Study Time", value: "3.5 hours", icon: <Clock className="h-5 w-5 text-indigo-600" /> },
    { title: "Next Review", value: "Tomorrow", icon: <BarChart className="h-5 w-5 text-green-600" /> }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Concept Header */}
      <ConceptHeader
        title={concept.title}
        subject={concept.subject}
        topic={concept.topic}
        difficulty={concept.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />
      
      {/* Mastery Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {masteryMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                {metric.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="font-semibold text-lg">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content with sidebar layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Main content area - 2/3 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Primary tabs for learning modalities */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 w-full flex flex-wrap gap-2 bg-transparent justify-start">
                  <TabsTrigger value="learn" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="visual" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    <Image className="h-4 w-4 mr-2" />
                    Visual
                  </TabsTrigger>
                  <TabsTrigger value="3d" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
                    <Box className="h-4 w-4 mr-2" />
                    3D Simulation
                  </TabsTrigger>
                  <TabsTrigger value="formula" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Formula Lab
                  </TabsTrigger>
                  <TabsTrigger value="video" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="mistakes" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Common Mistakes
                  </TabsTrigger>
                </TabsList>

                {/* Read aloud section */}
                {readAloudActive && (
                  <div className="mb-6">
                    <ReadAloudSection 
                      text={activeReadAloudText} 
                      isActive={readAloudActive} 
                      onStop={handleStopReadAloud} 
                    />
                  </div>
                )}

                {/* Tab content */}
                <div className="mt-4">
                  <TabsContent value="learn">
                    <div className="prose dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: concept.learnContent }} />
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="visual">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Visual Representation</h3>
                      <div dangerouslySetInnerHTML={{ __html: concept.visualContent }} />
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-4 flex flex-col items-center">
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">Interactive Ohm's Law diagram</p>
                        <div className="w-full max-w-md h-64 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                          <p className="text-gray-400 dark:text-gray-500">Visualization would appear here</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="3d">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>3D Interactive Model</h3>
                      <p>Interact with this 3D model to understand how voltage, current, and resistance relate to each other in a circuit.</p>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-4 flex flex-col items-center">
                        <div className="w-full h-80 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                          <p className="text-gray-400 dark:text-gray-500">3D model would render here</p>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4 w-full max-w-md">
                          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Voltage</p>
                            <p className="font-semibold">12V</p>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
                            <p className="font-semibold">2A</p>
                          </div>
                          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Resistance</p>
                            <p className="font-semibold">6Ω</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="formula">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Formula Reference</h3>
                      
                      <div className="space-y-6">
                        {concept.formulas.map((formula) => (
                          <div key={formula.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <h4 className="font-medium text-lg">{formula.name}</h4>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mt-2 font-mono text-xl text-center">
                              {formula.formula}
                            </div>
                            
                            <h5 className="mt-4 font-medium text-gray-700 dark:text-gray-300">Variables:</h5>
                            <ul className="mt-2">
                              {formula.variables.map((variable, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="font-mono">{variable.symbol}</span> - {variable.name} ({variable.unit})
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400">Formula Practice</h4>
                        <p className="text-sm mt-2">Try some practice calculations:</p>
                        
                        <div className="mt-3 space-y-3">
                          {concept.questions.map((question, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                              <p className="font-medium">{question.text}</p>
                              <details className="mt-2">
                                <summary className="text-blue-600 dark:text-blue-400 cursor-pointer">Show Answer</summary>
                                <p className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">{question.answer}</p>
                              </details>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Video Tutorials</h3>
                      <p>Watch these video tutorials to understand Ohm's Law better:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {[1, 2, 3, 4].map((video) => (
                          <div key={video} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <Play className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h4 className="font-medium mt-3">Ohm's Law Tutorial Part {video}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">12:45 minutes</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mistakes">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Common Mistakes & Misconceptions</h3>
                      <p>Be aware of these common errors when working with Ohm's Law:</p>
                      
                      <ul className="space-y-4 mt-4">
                        {concept.commonMistakes.map((mistake, idx) => (
                          <li key={idx} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                              <div>
                                <p className="font-medium text-red-700 dark:text-red-400">{mistake}</p>
                                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                                  Solution: {idx === 0 
                                    ? "Always check units and convert as needed before applying formulas." 
                                    : idx === 1 
                                    ? "Remember that Ohm's Law only applies to materials with a constant resistance."
                                    : idx === 2
                                    ? "Use triangular diagrams to remember the correct formula variations."
                                    : "Account for how temperature affects resistance in precision calculations."
                                  }
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="mt-8">Previous Year Questions</h3>
                      <div className="space-y-4">
                        {concept.prevYearQuestions.map((question) => (
                          <div key={question.id} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">
                                {question.exam} {question.year}
                              </span>
                            </div>
                            <p className="mt-3 font-medium">{question.question}</p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                              {question.options.map((option, idx) => (
                                <div 
                                  key={idx} 
                                  className={`p-2 rounded border ${
                                    option === question.answer 
                                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-300' 
                                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                  }`}
                                >
                                  {option}
                                  {option === question.answer && ' (Correct)'}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                              <p className="font-medium text-gray-700 dark:text-gray-300">Explanation:</p>
                              <p className="text-sm mt-1">{question.explanation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          onClick={() => handleReadAloud(getReadAloudTextForTab())}
                        >
                          <Play className="h-4 w-4" />
                          Read Aloud
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Secondary tabs for learning management */}
          <div>
            <Tabs defaultValue="recall" value={activeManagementTab} onValueChange={setActiveManagementTab} className="w-full">
              <TabsList className="bg-transparent flex flex-wrap gap-2 justify-start mb-4">
                <TabsTrigger value="recall" className="border">
                  <BookText className="h-4 w-4 mr-2" />
                  Recall
                </TabsTrigger>
                <TabsTrigger value="analytics" className="border">
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="revision" className="border">
                  <Clock className="h-4 w-4 mr-2" />
                  Revision
                </TabsTrigger>
                <TabsTrigger value="notes" className="border">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="discuss" className="border">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss
                </TabsTrigger>
                <TabsTrigger value="linked" className="border">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Linked
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recall">
                <RecallSection conceptName={concept.title} />
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Performance Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Quiz Performance</h4>
                        <p className="text-2xl font-bold mt-1">75%</p>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Spent</h4>
                        <p className="text-2xl font-bold mt-1">3.5 hrs</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last session: Yesterday</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Practice Exercises</h4>
                        <p className="text-2xl font-bold mt-1">12 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">completed</span></p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-lg mt-6 mb-3">Performance Over Time</h4>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64 flex items-center justify-center">
                      <p className="text-gray-400 dark:text-gray-500">Chart showing concept mastery progress would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="revision">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Revision Schedule</h3>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4 mb-6">
                      <h4 className="flex items-center gap-2 font-medium text-amber-800 dark:text-amber-400">
                        <Clock className="h-5 w-5" />
                        Next scheduled revision
                      </h4>
                      <p className="text-amber-700 dark:text-amber-300 mt-2">Tomorrow at 10:00 AM</p>
                    </div>
                    
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Revision History</h4>
                    <div className="space-y-3">
                      {[
                        { date: '2023-05-18', score: 85, time: '15 minutes' },
                        { date: '2023-05-12', score: 70, time: '20 minutes' },
                        { date: '2023-05-05', score: 65, time: '25 minutes' }
                      ].map((revision, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div>
                            <p className="font-medium">{new Date(revision.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {revision.time}</p>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded text-sm">
                            Score: {revision.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3">Optimized Revision Plan</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Based on your learning pattern and memory curve, we've optimized a revision schedule to maximize retention.
                    </p>
                    
                    <div className="space-y-2">
                      {[
                        { date: 'Tomorrow', type: 'Quick Recall', duration: '10 min' },
                        { date: 'Next Week', type: 'Practice Problems', duration: '20 min' },
                        { date: 'Next Month', type: 'Full Review', duration: '30 min' }
                      ].map((plan, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 h-10 w-10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-medium">{plan.date}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{plan.type}</p>
                            </div>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">{plan.duration}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <NoteSection 
                  userNotes={userNotes} 
                  setUserNotes={setUserNotes} 
                  handleSaveNotes={handleSaveNotes} 
                />
              </TabsContent>
              
              <TabsContent value="discuss">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Discussion & Questions</h3>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-indigo-700 dark:text-indigo-400">Ask AI Tutor</h4>
                      <p className="text-sm text-indigo-600 dark:text-indigo-300 mt-1 mb-3">
                        Get immediate help with any questions about {concept.title}
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your question here..."
                          className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                        />
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                          Ask
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Community Q&A</h4>
                    <div className="space-y-4">
                      {[
                        { 
                          question: "How does Ohm's Law apply to AC circuits?", 
                          answer: "In AC circuits, Ohm's Law still applies but you need to use impedance (Z) instead of just resistance (R). The formula becomes V = IZ where Z includes resistance, capacitance, and inductance effects.",
                          user: "Priya S.",
                          time: "2 days ago",
                          votes: 12
                        },
                        { 
                          question: "Can Ohm's Law be used for semiconductors like diodes?", 
                          answer: "No, Ohm's Law doesn't apply directly to semiconductors like diodes because they have non-linear I-V characteristics. Diodes allow current to flow easily in one direction but not the other.",
                          user: "Alex M.",
                          time: "1 week ago",
                          votes: 9
                        }
                      ].map((qa, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between">
                            <h5 className="font-medium">{qa.question}</h5>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{qa.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Asked by {qa.user}</p>
                          
                          <div className="mt-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md">
                            <p className="text-sm">{qa.answer}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <button className="hover:text-blue-600 dark:hover:text-blue-400">
                                👍 Helpful ({qa.votes})
                              </button>
                            </div>
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-4 text-center py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                      Load more questions
                    </button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="linked">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Linked Resources</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Related Concepts
                        </h4>
                        <div className="space-y-2">
                          {concept.relatedConcepts.map((related, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                              <p className="font-medium">{related.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Mastery: {related.masteryLevel}%
                                </span>
                                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                  View
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BookText className="h-4 w-4 text-emerald-600" />
                          Flashcard Sets
                        </h4>
                        <div className="space-y-2">
                          {[
                            { title: "Ohm's Law Basics", count: 10, progress: 60 },
                            { title: "Circuit Analysis", count: 15, progress: 30 },
                          ].map((set, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                              <p className="font-medium">{set.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {set.count} cards
                                </span>
                                <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                                  Practice
                                </button>
                              </div>
                              <div className="mt-2 h-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${set.progress}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-purple-600" />
                          Practice Exams
                        </h4>
                        <div className="space-y-2">
                          {[
                            { title: "Electricity Basics Quiz", questions: 20, time: "15 min" },
                            { title: "Circuit Theory Test", questions: 30, time: "25 min" },
                          ].map((exam, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                              <p className="font-medium">{exam.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {exam.questions} questions • {exam.time}
                                </span>
                                <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                                  Start
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* AI Insights section */}
          <AIInsightsSection conceptId={conceptId || ''} conceptTitle={concept.title} />
        </div>
        
        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          <ConceptSidebar 
            masteryLevel={concept.masteryLevel}
            relatedConcepts={concept.relatedConcepts}
            examReady={concept.examReady}
          />
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
