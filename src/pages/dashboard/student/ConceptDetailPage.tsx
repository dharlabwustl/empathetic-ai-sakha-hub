
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/input";
import { 
  BookOpen, 
  Eye, 
  Box, 
  Calculator, 
  Video, 
  AlertTriangle,
  Brain,
  BarChart,
  RefreshCw,
  FileText,
  MessageCircle,
  Link2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Send,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Star,
  Timer,
  Award,
  Users,
  BookmarkPlus,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import Visual3DContent from '@/components/dashboard/student/concepts/Visual3DContent';
import CommonMistakesContent from '@/components/dashboard/student/concepts/CommonMistakesContent';
import AIInsightsSection from '@/components/dashboard/student/concepts/AIInsightsSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learn');
  const [activeManagementTab, setActiveManagementTab] = useState('recall');
  const [masteryScore, setMasteryScore] = useState(68);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recallAnswer, setRecallAnswer] = useState('');
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [answerAccuracy, setAnswerAccuracy] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);

  // Mock concept data
  const concept = {
    id: conceptId || 'newtons-laws',
    title: "Newton's Laws of Motion",
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'Medium',
    description: 'The three fundamental laws that form the foundation of classical mechanics and describe the relationship between forces and motion.',
    estimatedTime: 45,
    prerequisites: ['Basic Algebra', 'Vector Concepts'],
    applications: ['Engineering', 'Astronomy', 'Sports Science']
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(concept.description);
        utterance.onend = () => setIsReadingAloud(false);
        window.speechSynthesis.speak(utterance);
        setIsReadingAloud(true);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = () => {
    // Simulate AI analysis
    const accuracy = Math.floor(Math.random() * 40) + 60; // 60-100%
    setAnswerAccuracy(accuracy);
    setHasSubmittedAnswer(true);
    
    // Update mastery score based on accuracy
    const newMastery = Math.min(100, masteryScore + Math.floor(accuracy / 10));
    setMasteryScore(newMastery);
  };

  const resetRecall = () => {
    setRecallAnswer('');
    setHasSubmittedAnswer(false);
    setAnswerAccuracy(null);
    setAudioBlob(null);
  };

  const renderLearnContent = (level) => {
    const content = {
      basic: {
        title: "Basic Understanding",
        content: "Newton's Laws of Motion are three fundamental principles that describe the relationship between forces acting on a body and its motion. These laws form the foundation of classical mechanics.",
        keyPoints: [
          "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an external force.",
          "Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F = ma).",
          "Third Law: For every action, there is an equal and opposite reaction."
        ],
        examples: [
          "A ball rolling on a flat surface will eventually stop due to friction (First Law)",
          "Pushing a shopping cart - more force means more acceleration (Second Law)",
          "Walking - you push backward on the ground, the ground pushes you forward (Third Law)"
        ]
      },
      detailed: {
        title: "Detailed Analysis",
        content: "Each of Newton's laws reveals deeper insights into the nature of motion and forces, with mathematical formulations and precise conditions of applicability.",
        keyPoints: [
          "First Law defines inertial reference frames and introduces the concept of force as that which changes motion",
          "Second Law provides the mathematical relationship F = ma, where F is net force, m is mass, and a is acceleration",
          "Third Law establishes the principle of momentum conservation in isolated systems"
        ],
        examples: [
          "Seat belts in cars protect passengers when the vehicle suddenly stops (First Law application)",
          "Rocket propulsion systems use F = ma to calculate thrust requirements for specific missions",
          "Recoil of a gun demonstrates action-reaction pairs with momentum conservation"
        ]
      },
      advanced: {
        title: "Advanced Applications",
        content: "Newton's laws extend beyond simple mechanics to complex systems, relativistic considerations, and modern engineering applications.",
        keyPoints: [
          "First Law breaks down at very high speeds where special relativity applies",
          "Second Law in rotational form: τ = Iα (torque equals moment of inertia times angular acceleration)",
          "Third Law applications in rocket propulsion, jet engines, and spacecraft maneuvering"
        ],
        examples: [
          "Spacecraft navigation using reaction wheels and thrusters based on Newton's laws",
          "Gyroscopic effects in rotating machinery and vehicle dynamics",
          "Orbital mechanics and satellite trajectory calculations using gravitational forces"
        ]
      }
    };

    const levelContent = content[level];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">{levelContent.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{levelContent.content}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {levelContent.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Real-World Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {levelContent.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/student/concepts')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Concepts
          </Button>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadAloud}
              className="flex items-center gap-2"
            >
              {isReadingAloud ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Mastery: {masteryScore}%</span>
              <Progress value={masteryScore} className="w-20" />
            </div>
          </div>
        </motion.div>

        {/* Concept Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{concept.title}</CardTitle>
                  <CardDescription className="text-indigo-100">
                    {concept.subject} • {concept.chapter}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {concept.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    <Timer className="h-3 w-3 mr-1" />
                    {concept.estimatedTime} min
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{concept.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Prerequisites:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline">{prereq}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {concept.applications.map((app, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AIInsightsSection conceptId={concept.id} conceptTitle={concept.title} />
        </motion.div>

        {/* Learning Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Learning Tools
              </CardTitle>
              <CardDescription className="text-blue-100">
                Interactive learning experiences tailored to your learning style
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 mb-6">
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
                    3D Simulation
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

                <TabsContent value="learn">
                  <Tabs defaultValue="basic">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="basic">Basic</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">{renderLearnContent('basic')}</TabsContent>
                    <TabsContent value="detailed">{renderLearnContent('detailed')}</TabsContent>
                    <TabsContent value="advanced">{renderLearnContent('advanced')}</TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="visual">
                  <Visual3DContent conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="3d">
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">3D Physics Simulations</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Immersive simulations to visualize and understand Newton's Laws in action
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-2 border-green-200 dark:border-green-800">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-green-600" />
                            Collision Lab
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                            <div className="text-center">
                              <Play className="h-12 w-12 mx-auto mb-2 text-green-600" />
                              <p className="font-medium">Interactive Collision Simulation</p>
                              <p className="text-sm text-gray-600 mt-1">Observe momentum conservation</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                            Experiment with different masses, velocities, and collision types to see Newton's laws in action.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-purple-200 dark:border-purple-800">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-600" />
                            Force Vectors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                            <div className="text-center">
                              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                              <p className="font-medium">Force Vector Visualization</p>
                              <p className="text-sm text-gray-600 mt-1">See forces in 3D space</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                            Visualize force vectors, resultant forces, and their effects on object motion in 3D space.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="formula">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Formula Practice Lab</h3>
                      <p className="mb-4">Practice Newton's Law formulas with interactive exercises and real-time feedback.</p>
                      <Button 
                        onClick={() => window.open('/dashboard/student/concepts/1/formula-lab', '_blank')}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Open Formula Lab
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold mb-2">F = ma</h4>
                          <p className="text-sm text-gray-600">Second Law of Motion</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold mb-2">p = mv</h4>
                          <p className="text-sm text-gray-600">Momentum</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold mb-2">Σf = 0</h4>
                          <p className="text-sm text-gray-600">Equilibrium</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2">Introduction to Newton's Laws</h4>
                          <p className="text-sm text-gray-600 mb-3">Basic concepts and real-world examples</p>
                          <Badge variant="outline">10 min</Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2">Problem Solving Techniques</h4>
                          <p className="text-sm text-gray-600 mb-3">Step-by-step solutions to common problems</p>
                          <Badge variant="outline">15 min</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mistakes">
                  <CommonMistakesContent conceptName={concept.title} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Management Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Management Tools
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Track progress, test knowledge, and manage your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs value={activeManagementTab} onValueChange={setActiveManagementTab}>
                <TabsList className="grid grid-cols-6 mb-8">
                  <TabsTrigger value="recall" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Recall
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="revision" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Revision
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="discuss" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Discuss
                  </TabsTrigger>
                  <TabsTrigger value="linked" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    Linked
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recall" className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Knowledge Validation Test</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Explain your understanding of Newton's Laws in your own words. Our AI will analyze your response and provide feedback.
                    </p>
                  </div>

                  {!hasSubmittedAnswer ? (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <label className="text-sm font-medium">
                          Explain Newton's Laws of Motion and provide examples:
                        </label>
                        <Textarea
                          placeholder="Type your understanding of Newton's Laws here..."
                          value={recallAnswer}
                          onChange={(e) => setRecallAnswer(e.target.value)}
                          className="min-h-32"
                        />
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-2">Or record your answer:</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={isRecording ? "destructive" : "outline"}
                              size="sm"
                              onClick={isRecording ? stopRecording : startRecording}
                            >
                              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                              {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </Button>
                            {audioBlob && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Audio recorded
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={submitAnswer}
                          disabled={!recallAnswer.trim() && !audioBlob}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Answer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`p-6 rounded-lg border-2 ${
                        answerAccuracy >= 80 
                          ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' 
                          : answerAccuracy >= 60 
                          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800'
                          : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {answerAccuracy >= 80 ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                          )}
                          <div>
                            <h4 className="text-lg font-bold">
                              Answer Analysis Complete
                            </h4>
                            <p className="text-sm">Accuracy Score: {answerAccuracy}%</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Understanding Level</span>
                            <Progress value={answerAccuracy} className="w-32" />
                          </div>
                          
                          <div className="text-sm space-y-2">
                            <p><strong>Strengths:</strong> Good grasp of fundamental concepts, clear examples provided.</p>
                            <p><strong>Areas to improve:</strong> Mathematical relationships could be explained more precisely.</p>
                            <p><strong>Recommendation:</strong> Review the formula derivations and practice more numerical problems.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button onClick={resetRecall} variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-semibold mb-1">Progress Trend</h4>
                        <p className="text-2xl font-bold text-blue-600">+12%</p>
                        <p className="text-sm text-gray-600">This week</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Timer className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-semibold mb-1">Study Time</h4>
                        <p className="text-2xl font-bold text-green-600">2.5h</p>
                        <p className="text-sm text-gray-600">Total spent</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h4 className="font-semibold mb-1">Mastery Score</h4>
                        <p className="text-2xl font-bold text-purple-600">{masteryScore}%</p>
                        <p className="text-sm text-gray-600">Current level</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="revision" className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Next Revision: Tomorrow</h4>
                    <p className="text-sm">Based on spaced repetition algorithm and your performance</p>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-6">
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Add Personal Note
                    </Button>
                    <div className="text-center text-gray-500 py-8">
                      No personal notes yet. Start by adding your first note!
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discuss" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">AI Tutor Chat</h4>
                        <p className="text-sm text-gray-600 mb-4">Get instant help with questions</p>
                        <Button className="w-full">Start Chat</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">Study Groups</h4>
                        <p className="text-sm text-gray-600 mb-4">Join discussions with peers</p>
                        <Button className="w-full" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="linked" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">Force and Energy</h4>
                        <p className="text-sm text-gray-600">Related physics concept</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">Momentum Conservation</h4>
                        <p className="text-sm text-gray-600">Advanced application</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
