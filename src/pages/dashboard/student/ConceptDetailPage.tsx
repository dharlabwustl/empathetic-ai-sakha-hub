
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Brain, Eye, Calculator, Video, 
  AlertTriangle, Volume2, VolumeX, Mic, MicOff, FileText,
  BarChart3, Clock, Target, CheckCircle, Play, Pause,
  Settings, Lightbulb, Users, MessageCircle, Link2,
  RotateCcw, PenTool, Share2, Download, ExternalLink,
  Zap, Award, TrendingUp, RefreshCw, ChevronRight,
  Box, Atom, FlaskConical, HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/dashboard/student/BackButton';
import ConceptAnalytics from '@/components/dashboard/student/concepts/ConceptAnalytics';
import PersonalizedRecommendations from '@/components/dashboard/student/concepts/concept-detail/PersonalizedRecommendations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface ConceptDetailPageProps {
  conceptId?: string;
}

const ConceptDetailPage: React.FC<ConceptDetailPageProps> = ({ conceptId: propConceptId }) => {
  const { conceptId: paramConceptId } = useParams<{ conceptId: string }>();
  const conceptId = propConceptId || paramConceptId || 'default-concept';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState('learn');
  const [learnSubTab, setLearnSubTab] = useState('basic');
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [timeSpent, setTimeSpent] = useState(45);
  const [questionsAnswered, setQuestionsAnswered] = useState(12);
  const [accuracy, setAccuracy] = useState(78);
  const [isReading, setIsReading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [voiceAnswer, setVoiceAnswer] = useState('');
  const [showCompletion, setShowCompletion] = useState(false);
  
  // Mock concept data
  const conceptData = {
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    difficulty: "Medium",
    description: "Understanding the relationship between force, mass, and acceleration",
    formula: "F = ma",
    keyPoints: [
      "Force is directly proportional to mass and acceleration",
      "Greater force produces greater acceleration",
      "Heavier objects require more force for same acceleration"
    ]
  };

  // Charts data
  const performanceData = [
    { week: 'Week 1', score: 45, time: 20 },
    { week: 'Week 2', score: 52, time: 25 },
    { week: 'Week 3', score: 61, time: 30 },
    { week: 'Week 4', score: 68, time: 35 },
    { week: 'Week 5', score: 75, time: 40 },
    { week: 'Week 6', score: 78, time: 45 }
  ];

  const subjectBreakdown = [
    { name: 'Mechanics', value: 85, color: '#8884d8' },
    { name: 'Thermodynamics', value: 70, color: '#82ca9d' },
    { name: 'Electromagnetism', value: 60, color: '#ffc658' },
    { name: 'Optics', value: 45, color: '#ff7300' }
  ];

  const difficultyProgression = [
    { level: 'Basic', completed: 100, total: 100 },
    { level: 'Intermediate', completed: 75, total: 100 },
    { level: 'Advanced', completed: 45, total: 100 },
    { level: 'Expert', completed: 20, total: 100 }
  ];

  // Auto-completion trigger
  useEffect(() => {
    if (masteryLevel >= 80 && !showCompletion) {
      setShowCompletion(true);
      toast({
        title: "🎉 Concept Mastered!",
        description: "You've achieved 80% mastery. Mark as completed?",
      });
    }
  }, [masteryLevel, showCompletion, toast]);

  // Text-to-speech functionality
  const handleReadAloud = (text: string) => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
    }
  };

  // Voice recording
  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Processing your answer..."
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your answer clearly"
      });
    }
  };

  const handleAnswerSubmit = () => {
    const answer = userAnswer || voiceAnswer;
    if (!answer) {
      toast({
        title: "No answer provided",
        description: "Please type or record your answer"
      });
      return;
    }

    // Simulate AI analysis
    const newMastery = Math.min(masteryLevel + 5, 100);
    setMasteryLevel(newMastery);
    
    toast({
      title: "Answer analyzed!",
      description: `Mastery increased to ${newMastery}%. Great work!`
    });
    
    setUserAnswer('');
    setVoiceAnswer('');
  };

  const handleCompleteLesson = () => {
    setMasteryLevel(100);
    toast({
      title: "🎉 Lesson Completed!",
      description: "Congratulations! You've mastered this concept."
    });
  };

  const generateInsights = () => {
    toast({
      title: "🧠 Generating New Insights",
      description: "Analyzing your learning pattern to create personalized recommendations..."
    });
    
    setTimeout(() => {
      toast({
        title: "✨ Insights Generated!",
        description: "Check your personalized study recommendations below."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto p-6 space-y-6">
        <BackButton to="/dashboard/student/concepts" />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {conceptData.title}
              </h1>
              <div className="flex items-center gap-2 justify-center mt-2">
                <Badge variant="outline">{conceptData.subject}</Badge>
                <Badge variant="outline">{conceptData.difficulty}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReadAloud(conceptData.description)}
                  className="p-1"
                >
                  {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics Section */}
        <ConceptAnalytics
          masteryLevel={masteryLevel}
          timeSpent={timeSpent}
          questionsAnswered={questionsAnswered}
          accuracy={accuracy}
          conceptTitle={conceptData.title}
        />

        {/* Auto-completion notification */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950/30">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Ready to Complete!
                      </h3>
                      <p className="text-green-700 dark:text-green-300 mb-4">
                        You've achieved {masteryLevel}% mastery. Mark this concept as completed?
                      </p>
                      <Button 
                        onClick={handleCompleteLesson}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Complete Lesson
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Tools Tabs */}
        <Card className="shadow-xl border-2 border-purple-100 dark:border-purple-800">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Learning Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 bg-gray-50 dark:bg-gray-800">
                <TabsTrigger value="learn" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visual
                </TabsTrigger>
                <TabsTrigger value="3d" className="flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  3D
                </TabsTrigger>
                <TabsTrigger value="formula" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Formula
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Mistakes
                </TabsTrigger>
              </TabsList>

              {/* Learn Tab */}
              <TabsContent value="learn" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Detailed Explanation</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadAloud("Newton's Second Law explanation content")}
                  >
                    {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    {isReading ? "Stop Reading" : "Read Aloud"}
                  </Button>
                </div>
                
                <Tabs value={learnSubTab} onValueChange={setLearnSubTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-3">Basic Understanding</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Key Formula:</h5>
                          <div className="text-2xl font-mono bg-white dark:bg-gray-800 p-3 rounded border">
                            F = ma
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Where F = Force, m = mass, a = acceleration
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="detailed" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-3">Detailed Analysis</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-blue-600 mb-2">Mathematical Derivation</h5>
                            <p className="mb-3">Starting from the definition of momentum (p = mv):</p>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                              <div>F = dp/dt</div>
                              <div>F = d(mv)/dt</div>
                              <div>F = m(dv/dt) + v(dm/dt)</div>
                              <div>For constant mass: F = ma</div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-green-600 mb-2">Real-world Applications</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                              <li>Car acceleration and braking systems</li>
                              <li>Rocket propulsion and space travel</li>
                              <li>Sports biomechanics and athletic performance</li>
                              <li>Engineering design and safety calculations</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-3">Advanced Concepts</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-purple-600 mb-2">Vector Form</h5>
                            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                              <div className="text-lg font-mono">F⃗ = ma⃗</div>
                              <p className="text-sm mt-2">Force and acceleration are vector quantities with both magnitude and direction.</p>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-red-600 mb-2">Limitations and Extensions</h5>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                              <li>Valid only for constant mass systems</li>
                              <li>Requires inertial reference frames</li>
                              <li>Modified for relativistic speeds (F = dp/dt)</li>
                              <li>Extended to rotational motion (τ = Iα)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Visual Tab */}
              <TabsContent value="visual" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Visual Learning</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadAloud("Visual diagrams and charts for Newton's Second Law")}
                  >
                    {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    Read Aloud
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Force vs Acceleration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Mass Effect Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={difficultyProgression}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="level" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="completed" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Physics Concepts Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={subjectBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {subjectBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Learning Progress Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="time" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 3D Tab */}
              <TabsContent value="3d" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">3D Interactive Models</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadAloud("Interactive 3D models demonstrating Newton's Second Law")}
                  >
                    {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    Read Aloud
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="h-96">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Atom className="h-5 w-5" />
                        Force Vector Visualization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-full">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <motion.div
                          animate={{ 
                            x: [0, 50, 0, -50, 0],
                            rotate: [0, 90, 180, 270, 360]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center"
                        >
                          <span className="text-white font-bold">F</span>
                        </motion.div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 border-4 border-dashed border-blue-400 rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Interactive visualization of force vectors and their effects on object motion
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="h-96">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Box className="h-5 w-5" />
                        Mass-Acceleration Relationship
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-full">
                      <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-space-around relative">
                        <motion.div
                          animate={{ y: [0, -20, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-xs">1kg</span>
                        </motion.div>
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-xs">2kg</span>
                        </motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-xs">4kg</span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Same force applied to different masses shows inverse relationship
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Formula Tab */}
              <TabsContent value="formula" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Formula Deep Dive</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReadAloud("Detailed formula explanation for Newton's Second Law")}
                    >
                      {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      Read Aloud
                    </Button>
                    <Button
                      onClick={() => navigate('/dashboard/student/concepts/formula-lab')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      <FlaskConical className="h-4 w-4 mr-2" />
                      Open Formula Lab
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Core Formula
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold mb-4">
                          F = ma
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">F</div>
                            <div className="text-sm">Force (Newtons)</div>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">m</div>
                            <div className="text-sm">Mass (kg)</div>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">a</div>
                            <div className="text-sm">Acceleration (m/s²)</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Worked Example 1</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="font-medium">Problem: A 5kg object experiences a force of 20N. Find acceleration.</p>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                            <div>Given: m = 5kg, F = 20N</div>
                            <div>Formula: F = ma</div>
                            <div>Rearrange: a = F/m</div>
                            <div>Solution: a = 20/5 = 4 m/s²</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Worked Example 2</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="font-medium">Problem: Find force needed to accelerate 10kg object at 3 m/s².</p>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                            <div>Given: m = 10kg, a = 3 m/s²</div>
                            <div>Formula: F = ma</div>
                            <div>Solution: F = 10 × 3 = 30N</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value="video" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Video Explanations</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadAloud("Video content for Newton's Second Law explanations")}
                  >
                    {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    Read Aloud
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                          <h3 className="text-xl font-semibold">Newton's Second Law Explained</h3>
                          <p className="text-blue-200">Interactive video demonstration</p>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        <Play className="h-4 w-4 mr-2" />
                        Play Main Video (12:34)
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Real-world Examples", duration: "8:45", level: "Basic" },
                      { title: "Mathematical Derivation", duration: "15:20", level: "Advanced" },
                      { title: "Laboratory Experiments", duration: "22:10", level: "Intermediate" }
                    ].map((video, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                            <Play className="h-8 w-8 text-gray-500" />
                          </div>
                          <h4 className="font-medium mb-1">{video.title}</h4>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>{video.duration}</span>
                            <Badge variant="outline">{video.level}</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <Play className="h-3 w-3 mr-2" />
                            Watch
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Mistakes Tab */}
              <TabsContent value="mistakes" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Common Mistakes</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadAloud("Common mistakes students make with Newton's Second Law")}
                  >
                    {isReading ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    Read Aloud
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      mistake: "Confusing mass and weight",
                      explanation: "Mass is measured in kg, weight is force (mg) measured in Newtons",
                      correction: "Always use mass (m) in the formula F = ma, not weight"
                    },
                    {
                      mistake: "Ignoring vector nature",
                      explanation: "Force and acceleration are vectors with direction",
                      correction: "Consider both magnitude and direction in calculations"
                    },
                    {
                      mistake: "Unit conversion errors",
                      explanation: "Mixing different unit systems (kg, g, N, kN)",
                      correction: "Convert all quantities to SI units before calculation"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          {item.mistake}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{item.explanation}</p>
                        <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                          <p className="text-green-800 dark:text-green-200 font-medium">✓ {item.correction}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Management Tools */}
        <Card className="shadow-xl border-2 border-green-100 dark:border-green-800">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Management Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="recall">
              <TabsList className="grid w-full grid-cols-6 bg-gray-50 dark:bg-gray-800">
                <TabsTrigger value="recall">Recall</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="revision">Revision</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discuss">Discuss</TabsTrigger>
                <TabsTrigger value="linked">Linked</TabsTrigger>
              </TabsList>

              <TabsContent value="recall" className="p-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Quick Recall Test
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                          <h4 className="font-medium mb-2">Question:</h4>
                          <p>What happens to acceleration when mass doubles while force remains constant?</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Type Your Answer:</label>
                            <Textarea
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              placeholder="Explain your understanding..."
                              className="h-24"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Or Record Voice Answer:</label>
                            <div className="flex items-center gap-3">
                              <Button
                                variant={isRecording ? "destructive" : "outline"}
                                onClick={handleVoiceRecord}
                                className="flex-1"
                              >
                                {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                                {isRecording ? "Stop Recording" : "Start Recording"}
                              </Button>
                            </div>
                            {voiceAnswer && (
                              <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/30 rounded text-sm">
                                Voice answer recorded ✓
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button onClick={handleAnswerSubmit} className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Answer for Analysis
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Study Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total sessions</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Last 5 attempts</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">+23%</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Since first attempt</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revision" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Revision Schedule</h4>
                    <Badge>Due: Tomorrow</Badge>
                  </div>
                  <div className="space-y-3">
                    {['Key Formula Review', 'Practice Problems', 'Concept Application'].map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <span>{item}</span>
                          <Button size="sm" variant="outline">
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="p-6">
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <PenTool className="h-4 w-4 mr-2" />
                    Add New Note
                  </Button>
                  <div className="space-y-3">
                    {['Personal understanding', 'Key insights', 'Questions to ask'].map((note, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{note}</span>
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Note content preview...</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="discuss" className="p-6">
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start New Discussion
                  </Button>
                  <div className="space-y-3">
                    {['Clarification needed', 'Real-world examples', 'Study group formation'].map((topic, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{topic}</span>
                            <Badge variant="outline">3 replies</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Discussion preview...</p>
                          <Button size="sm" variant="ghost" className="mt-2">
                            <Users className="h-4 w-4 mr-2" />
                            Join Discussion
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="linked" className="p-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Related Concepts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Newton\'s First Law', 'Newton\'s Third Law', 'Force and Momentum', 'Work and Energy'].map((concept, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <span className="font-medium">{concept}</span>
                            <div className="text-sm text-gray-600 dark:text-gray-400">85% mastery</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Suggested Actions (Bottom Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-2 border-amber-100 dark:border-amber-800">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Suggested Next Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Practice Related Problems",
                      description: "Solve problems combining Newton's laws",
                      icon: <Target className="h-5 w-5" />,
                      route: "/dashboard/student/practice-exams"
                    },
                    {
                      title: "Review Flashcards",
                      description: "Quick review of key concepts",
                      icon: <RotateCcw className="h-5 w-5" />,
                      route: "/dashboard/student/flashcards"
                    },
                    {
                      title: "Take Mock Test",
                      description: "Test your understanding",
                      icon: <FileText className="h-5 w-5" />,
                      route: "/dashboard/student/practice-exams"
                    },
                    {
                      title: "Explore Applications",
                      description: "Real-world physics applications",
                      icon: <ExternalLink className="h-5 w-5" />,
                      route: "/dashboard/student/concepts"
                    }
                  ].map((action, index) => (
                    <Card key={index} className="hover:shadow-md transition-all cursor-pointer" 
                          onClick={() => navigate(action.route)}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                            {action.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{action.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <ChevronRight className="h-3 w-3 ml-auto" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button onClick={generateInsights} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate New Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <PersonalizedRecommendations 
              conceptId={conceptId}
              masteryLevel={masteryLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
