
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Play, Pause, Volume2, CheckCircle, Clock, 
  Brain, Lightbulb, Bot, BarChart3, Target, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
}

interface LearningSection {
  id: string;
  title: string;
  content: string;
  timeToRead: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  // Mock learning sections
  const [learningSections, setLearningSections] = useState<LearningSection[]>([
    {
      id: 'intro',
      title: 'Introduction to Newton\'s Laws',
      content: 'Newton\'s laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the forces acting on a body and its motion due to those forces.',
      timeToRead: 5,
      difficulty: 'easy',
      completed: false,
      progress: 0
    },
    {
      id: 'first-law',
      title: 'Newton\'s First Law - Law of Inertia',
      content: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This is also known as the law of inertia.',
      timeToRead: 8,
      difficulty: 'medium',
      completed: false,
      progress: 0
    },
    {
      id: 'second-law',
      title: 'Newton\'s Second Law - F=ma',
      content: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This relationship is expressed as F = ma.',
      timeToRead: 10,
      difficulty: 'hard',
      completed: false,
      progress: 0
    },
    {
      id: 'third-law',
      title: 'Newton\'s Third Law - Action and Reaction',
      content: 'For every action, there is an equal and opposite reaction. This means that whenever one object exerts a force on another object, the second object exerts an equal and opposite force back.',
      timeToRead: 7,
      difficulty: 'medium',
      completed: false,
      progress: 0
    },
    {
      id: 'applications',
      title: 'Real-World Applications',
      content: 'Newton\'s laws explain many everyday phenomena: why we wear seatbelts, how rockets work, why we feel pushed back in an accelerating car, and how athletes use these principles in sports.',
      timeToRead: 12,
      difficulty: 'medium',
      completed: false,
      progress: 0
    }
  ]);

  // Timer for tracking study time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate overall progress
  useEffect(() => {
    const totalSections = learningSections.length;
    const completed = completedSections.size;
    const progressSum = learningSections.reduce((sum, section) => sum + section.progress, 0);
    const avgProgress = progressSum / totalSections;
    setOverallProgress(Math.round(avgProgress));
  }, [learningSections, completedSections]);

  const currentSection = learningSections[activeSection];

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set(prev).add(sectionId));
    setLearningSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, completed: true, progress: 100 }
          : section
      )
    );
  };

  const updateSectionProgress = (sectionId: string, progress: number) => {
    setLearningSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, progress }
          : section
      )
    );
  };

  const playAudioExplanation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const handleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
    if (!showAIAssistant) {
      const aiGreeting = `Hello! I'm your AI tutor for ${conceptName}. I can help explain difficult concepts, answer questions, and provide additional examples. What would you like to know about ${currentSection.title}?`;
      playAudioExplanation(aiGreeting);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Tracking Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Learning Progress - {conceptName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedSections.size}</div>
              <div className="text-sm text-gray-600">Sections Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{learningSections.length}</div>
              <div className="text-sm text-gray-600">Total Sections</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Main Learning Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Learning Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {learningSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeSection === index 
                      ? 'bg-blue-50 border-blue-300 shadow-sm' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setActiveSection(index)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {section.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-sm font-medium line-clamp-1">
                      {section.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{section.timeToRead} min</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(section.difficulty)}`}
                    >
                      {section.difficulty}
                    </Badge>
                  </div>
                  {section.progress > 0 && (
                    <Progress value={section.progress} className="h-1 mt-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                {currentSection.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playAudioExplanation(currentSection.content)}
                  disabled={isPlaying}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isPlaying ? 'Playing...' : 'Listen'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAIAssistant}
                  className="flex items-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  AI Tutor
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{currentSection.timeToRead} min read</span>
              </div>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(currentSection.difficulty)}
              >
                {currentSection.difficulty}
              </Badge>
              {currentSection.completed && (
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="summary">Key Points</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <div className="prose max-w-none">
                  <div className="bg-white p-6 rounded-lg border">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {currentSection.content}
                    </p>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSectionProgress(currentSection.id, 50)}
                        >
                          Mark as Read
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => markSectionComplete(currentSection.id)}
                          disabled={currentSection.completed}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Section
                        </Button>
                      </div>
                      <div className="text-sm text-gray-500">
                        Progress: {currentSection.progress}%
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Key Learning Points</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-blue-800">Core Concept</h4>
                          <p className="text-sm text-blue-700">Understanding the fundamental principle behind {currentSection.title}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-green-800">Real-World Application</h4>
                          <p className="text-sm text-green-700">How this concept applies in everyday situations and practical scenarios</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-purple-800">Mathematical Relationship</h4>
                          <p className="text-sm text-purple-700">The equations and formulas that describe this law mathematically</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">📚 Example 1: Everyday Scenario</h4>
                        <p className="text-blue-700 text-sm">
                          When you're in a car that suddenly stops, your body continues moving forward due to inertia (Newton's First Law).
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">🚀 Example 2: Space Application</h4>
                        <p className="text-green-700 text-sm">
                          Rockets work by expelling gas downward (action), which pushes the rocket upward (reaction) - Newton's Third Law.
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">⚽ Example 3: Sports Physics</h4>
                        <p className="text-purple-700 text-sm">
                          A soccer ball needs more force to accelerate if it's heavier, demonstrating F = ma (Newton's Second Law).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Bot className="h-5 w-5" />
                  AI Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-blue-700">
                    <strong>🤖 AI Tutor:</strong> I'm here to help you understand {currentSection.title}! 
                    I can explain concepts in different ways, provide more examples, or answer any questions you have.
                  </p>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">💡 What I can help with:</h4>
                    <ul className="text-sm space-y-1 text-blue-800">
                      <li>• Simplify complex concepts into easier explanations</li>
                      <li>• Provide step-by-step breakdowns of formulas</li>
                      <li>• Give real-world examples and analogies</li>
                      <li>• Answer specific questions about the material</li>
                      <li>• Suggest practice problems and exercises</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline">Explain Differently</Button>
                    <Button size="sm" variant="outline">More Examples</Button>
                    <Button size="sm" variant="outline">Practice Questions</Button>
                    <Button size="sm" variant="outline">Related Topics</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedLearnTab;
