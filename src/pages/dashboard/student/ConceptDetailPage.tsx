
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Sparkles, BookOpen, FlaskConical, Video, AlertCircle, Lightbulb, BarChart2, RefreshCw, FileText, MessageSquare, Eye, Cube, Ruler, Star, ArrowRight, ThumbsUp, Medal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Mock data for concept
const conceptMockData = {
  id: "physics-ohms-law",
  title: "Ohm's Law",
  subject: "Physics",
  description: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
  masteryLevel: 65,
  formula: "V = I × R",
  variables: [
    { symbol: "V", name: "Voltage", unit: "volts (V)" },
    { symbol: "I", name: "Current", unit: "amperes (A)" },
    { symbol: "R", name: "Resistance", unit: "ohms (Ω)" }
  ],
  content: "<p>Ohm's Law is one of the most fundamental principles in electrical engineering and physics. Discovered by German physicist Georg Ohm in 1827, it describes the relationship between voltage, current, and resistance in an electrical circuit.</p><p>The law states that the current flowing through a conductor is <strong>directly proportional</strong> to the voltage across it, given that the physical conditions (like temperature) remain constant.</p><h3>The Formula</h3><p>Mathematically, Ohm's Law is expressed as:</p><p class='formula'>V = I × R</p><p>Where:<br/>- V is the voltage across the conductor in volts (V)<br/>- I is the current through the conductor in amperes (A)<br/>- R is the resistance of the conductor in ohms (Ω)</p><h3>Understanding through Analogy</h3><p>Think of electricity flowing through a wire like water flowing through a pipe:</p><ul><li>Voltage (V) is like the water pressure pushing the water through the pipe</li><li>Current (I) is like the rate of water flow through the pipe</li><li>Resistance (R) is like the narrowness of the pipe that restricts the water flow</li></ul><p>Just as higher water pressure leads to more water flow, higher voltage leads to more current. Similarly, just as a narrower pipe restricts water flow, higher resistance restricts current flow.</p>",
  relatedConcepts: [
    { id: "physics-kirchhoffs-laws", title: "Kirchhoff's Laws" },
    { id: "physics-electrical-power", title: "Electrical Power" },
    { id: "physics-resistivity", title: "Resistivity and Conductivity" }
  ],
  commonMistakes: [
    "Forgetting that Ohm's Law applies only to ohmic conductors",
    "Mixing up the units of measurement",
    "Not accounting for temperature changes affecting resistance",
    "Applying the law to complete circuits when it's meant for individual components"
  ],
  examQuestions: [
    {
      question: "If a circuit has a resistance of 5Ω and a current of 2A flows through it, what is the voltage across the circuit?",
      options: ["7V", "10V", "3V", "2.5V"],
      correct: 1,
      explanation: "Using Ohm's Law: V = I × R = 2A × 5Ω = 10V"
    },
    {
      question: "A 12V battery is connected to a circuit with a resistance of 6Ω. What is the current flowing through the circuit?",
      options: ["72A", "2A", "0.5A", "18A"],
      correct: 1,
      explanation: "Using Ohm's Law: I = V ÷ R = 12V ÷ 6Ω = 2A"
    }
  ],
  recallQuestions: [
    {
      question: "What is the formula for Ohm's Law?",
      answer: "V = I × R"
    },
    {
      question: "What are the SI units for voltage, current, and resistance?",
      answer: "Voltage: volts (V), Current: amperes (A), Resistance: ohms (Ω)"
    },
    {
      question: "Who discovered Ohm's Law?",
      answer: "Georg Ohm in 1827"
    }
  ],
  analytics: {
    timesStudied: 15,
    averageTimeSpent: "8 minutes",
    lastStudied: "2 days ago",
    strengths: ["Formula application", "Basic understanding"],
    weaknesses: ["Complex circuit applications", "Temperature effects"]
  },
  visualAids: [
    { type: "image", url: "/lovable-uploads/ohms-law-triangle.png", caption: "Ohm's Law Triangle" },
    { type: "image", url: "/lovable-uploads/circuit-diagram.png", caption: "Simple Circuit Diagram" }
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  simulationUrl: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html"
};

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [concept, setConcept] = useState(conceptMockData);
  const [activeTab, setActiveTab] = useState("learn");
  const [isLoading, setIsLoading] = useState(true);
  const [readingMode, setReadingMode] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [conceptId]);

  // Handle different tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (isLoading) {
    return (
      <ConceptsPageLayout showBackButton title="Loading Concept..." subtitle="Please wait while we prepare your learning experience">
        <div className="flex flex-col items-center justify-center p-10 space-y-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          />
          <p className="text-gray-500">Loading concept data...</p>
        </div>
      </ConceptsPageLayout>
    );
  }

  return (
    <ConceptsPageLayout 
      showBackButton 
      title={concept.title} 
      subtitle={`${concept.subject} Concept`}
    >
      <div className="space-y-6">
        {/* Mastery & Recall Tracker Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                Mastery Progress
              </h3>
              <p className="text-sm text-gray-500">Track your understanding and recall of this concept</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                Last studied: {concept.analytics.lastStudied}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                Studied {concept.analytics.timesStudied} times
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-blue-700 dark:text-blue-300">Overall Mastery</span>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                      {concept.masteryLevel}% Complete
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-blue-200 dark:bg-blue-700/30">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${concept.masteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-green-700 dark:text-green-300">Recall Accuracy</span>
                <ThumbsUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                      82% Correct
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-green-200 dark:bg-green-700/30">
                  <motion.div 
                    className="bg-gradient-to-r from-green-400 to-green-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-purple-700 dark:text-purple-300">Practice Questions</span>
                <Medal className="h-4 w-4 text-purple-500" />
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-400">
                      7/10 Completed
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-purple-200 dark:bg-purple-700/30">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-400 to-purple-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-amber-700 dark:text-amber-300">Time Invested</span>
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{concept.analytics.averageTimeSpent}</p>
              <p className="text-xs text-amber-500 dark:text-amber-400">per study session</p>
            </div>
          </div>
        </motion.div>
        
        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 p-4 shadow-sm"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-800/30 mr-3">
              <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">AI Insights</h3>
          </div>
          <div className="pl-12">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Focus on:</span> Complex circuit applications and temperature effects on resistance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Tip:</span> Practice calculating current in circuits with multiple resistors to solidify your understanding.
            </p>
            <Button variant="link" className="text-indigo-600 dark:text-indigo-400 p-0 flex items-center">
              <span>Get personalized study plan</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learn" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
            <TabsTrigger value="learn" className="flex items-center justify-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center justify-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center justify-center">
              <Cube className="h-4 w-4 mr-2" />
              <span>3D Simulation</span>
            </TabsTrigger>
            <TabsTrigger value="formula" className="flex items-center justify-center">
              <Ruler className="h-4 w-4 mr-2" />
              <span>Formula Lab</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center justify-center">
              <Video className="h-4 w-4 mr-2" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Common Mistakes</span>
            </TabsTrigger>
            <TabsTrigger value="recall" className="hidden md:flex items-center justify-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span>Recall</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="hidden md:flex items-center justify-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <div className={`p-4 rounded-lg ${readingMode ? "bg-amber-50 dark:bg-amber-950/20" : "bg-white dark:bg-gray-900"} border border-gray-200 dark:border-gray-800 transition-colors duration-300`}>
            {/* Learn Tab */}
            <TabsContent value="learn" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Learn: {concept.title}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setReadingMode(!readingMode)}
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-950/30"
                >
                  {readingMode ? "Exit Reading Mode" : "Reading Mode"}
                </Button>
              </div>
              
              <div className={`prose dark:prose-invert max-w-none ${readingMode ? "text-lg" : ""}`} 
                dangerouslySetInnerHTML={{ __html: concept.content }}>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-medium mb-2">Quick Formula Reference</h4>
                <Card className="bg-gray-50 dark:bg-gray-900 p-3 flex justify-center items-center">
                  <div className="text-center">
                    <p className="text-xl font-semibold mb-2">{concept.formula}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {concept.variables.map(variable => (
                        <div key={variable.symbol} className="bg-white dark:bg-gray-800 rounded p-2 text-center">
                          <span className="font-medium">{variable.symbol}</span>: {variable.name} <span className="text-gray-500">({variable.unit})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Add Notes
                </Button>
                <Button size="sm">
                  Mark as Completed
                </Button>
              </div>
            </TabsContent>

            {/* Visual Tab */}
            <TabsContent value="visual" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Visual Learning</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {concept.visualAids.map((aid, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <img 
                      src={aid.url} 
                      alt={aid.caption} 
                      className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-900"
                    />
                    <div className="p-4">
                      <p className="text-center text-gray-700 dark:text-gray-300">{aid.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Interactive Diagrams</h4>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interactive diagram would be displayed here</p>
                </div>
              </div>
            </TabsContent>

            {/* 3D Simulation Tab */}
            <TabsContent value="simulation" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">3D Simulation</h3>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe 
                  src={concept.simulationUrl}
                  title="Ohm's Law Simulation"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">How to use this simulation</h4>
                <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Adjust the voltage slider to see how it affects current</li>
                  <li>Change the resistance to observe the relationship between resistance and current</li>
                  <li>Note how the formula values update in real-time</li>
                  <li>Try extreme values to test the limits of Ohm's Law</li>
                </ul>
              </div>
            </TabsContent>

            {/* Formula Lab Tab */}
            <TabsContent value="formula" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Formula Lab</h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{concept.formula}</h4>
                  <p className="text-blue-600 dark:text-blue-400">Ohm's Law Formula</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {concept.variables.map(variable => (
                    <div key={variable.symbol} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <div className="text-center">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{variable.symbol}</span>
                        <p className="font-medium">{variable.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{variable.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Formula Rearrangements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                      <p className="text-lg font-semibold">V = I × R</p>
                      <p className="text-sm text-gray-500">Find voltage</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                      <p className="text-lg font-semibold">I = V ÷ R</p>
                      <p className="text-sm text-gray-500">Find current</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                      <p className="text-lg font-semibold">R = V ÷ I</p>
                      <p className="text-sm text-gray-500">Find resistance</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Formula Calculator</h4>
                <Card className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Voltage (V)</label>
                      <input type="number" className="w-full p-2 border rounded" placeholder="Enter value..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Current (I)</label>
                      <input type="number" className="w-full p-2 border rounded" placeholder="Enter value..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Resistance (R)</label>
                      <input type="number" className="w-full p-2 border rounded" placeholder="Enter value..." />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button>Calculate</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Video Explanation</h3>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <iframe 
                  src={concept.videoUrl}
                  title="Video explanation of Ohm's Law"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-3">
                  <h4 className="font-medium">Key Points</h4>
                  <ul className="mt-2 text-sm list-disc pl-4">
                    <li>Basic definition of Ohm's Law</li>
                    <li>Relationship between voltage, current, and resistance</li>
                    <li>Real-world applications</li>
                  </ul>
                </Card>
                <Card className="p-3">
                  <h4 className="font-medium">Video Notes</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Take notes while watching the video to improve recall and understanding.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Open Notes</Button>
                </Card>
                <Card className="p-3">
                  <h4 className="font-medium">Related Videos</h4>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Video className="h-3 w-3 mr-2" />
                      <span>Kirchhoff's Laws Explained</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="h-3 w-3 mr-2" />
                      <span>Solving Circuit Problems</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Common Mistakes Tab */}
            <TabsContent value="mistakes" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
              <div className="space-y-4">
                {concept.commonMistakes.map((mistake, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400 dark:border-red-600"
                  >
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-700 dark:text-red-300">Mistake #{idx + 1}</h4>
                        <p className="mt-1 text-red-600 dark:text-red-400">{mistake}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Pro Tips to Avoid These Mistakes
                </h4>
                <ul className="list-disc pl-5 text-green-700 dark:text-green-300 space-y-1">
                  <li>Always check the units you're using in calculations</li>
                  <li>Remember that Ohm's Law applies to ohmic materials only</li>
                  <li>Draw circuit diagrams to visualize the problem</li>
                  <li>Practice with varied problems to build intuition</li>
                </ul>
              </div>
            </TabsContent>

            {/* Recall Tab */}
            <TabsContent value="recall" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Recall & Retention</h3>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Flashcard Review</h4>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl mb-4">What is the formula for Ohm's Law?</p>
                    <Button>Show Answer</Button>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    Previous Card
                  </Button>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Card 1 of 5
                  </div>
                  <Button variant="outline" size="sm">
                    Next Card
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Quick Questions</h4>
                <div className="space-y-4">
                  {concept.recallQuestions.map((q, idx) => (
                    <Card key={idx} className="p-4">
                      <h5 className="font-medium">{q.question}</h5>
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="ghost" size="sm">Show Answer</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Your Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {concept.analytics.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-400 mr-2"></div>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Areas to Improve</h4>
                  <ul className="space-y-2">
                    {concept.analytics.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-amber-400 mr-2"></div>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Study History</h4>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-gray-500">Study history chart would be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Performance on Related Concepts</h4>
                <div className="space-y-2">
                  {concept.relatedConcepts.map((related, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg flex justify-between items-center">
                      <span>{related.title}</span>
                      <div className="w-32">
                        <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Secondary tabs that appear on small screens */}
            <div className="md:hidden mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
              <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="text-left flex justify-start" onClick={() => setActiveTab("recall")}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Recall</span>
                </Button>
                <Button variant="outline" className="text-left flex justify-start" onClick={() => setActiveTab("analytics")}>
                  <BarChart2 className="h-4 w-4 mr-2" />
                  <span>Analytics</span>
                </Button>
                <Button variant="outline" className="text-left flex justify-start" onClick={() => navigate('/notes')}>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Notes</span>
                </Button>
                <Button variant="outline" className="text-left flex justify-start" onClick={() => navigate('/discuss')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Discuss</span>
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
        
        {/* Related Concepts Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold mb-3">Related Concepts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {concept.relatedConcepts.map((related, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 shadow-sm cursor-pointer"
                onClick={() => navigate(`/concept/${related.id}`)}
              >
                <h4 className="font-medium">{related.title}</h4>
                <div className="mt-2 flex justify-between items-center">
                  <Badge variant="secondary">Physics</Badge>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
