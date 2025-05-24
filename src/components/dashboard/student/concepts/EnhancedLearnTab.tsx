
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause, 
  RotateCcw, MessageSquare, CheckCircle, Clock, Target,
  Zap, Settings, Headphones, Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import AIAssistantChat from './AIAssistantChat';

interface EnhancedLearnTabProps {
  conceptName: string;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentlyReading, setCurrentlyReading] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showAIChat, setShowAIChat] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState([1]);
  const [audioSettings, setAudioSettings] = useState({
    voice: null as SpeechSynthesisVoice | null,
    pitch: 1,
    volume: 0.8
  });

  // Content for each section
  const sections = {
    basic: {
      title: "Basic Understanding",
      icon: BookOpen,
      color: "blue",
      duration: 90,
      content: {
        introduction: `What is ${conceptName}? Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This fundamental principle of physics helps us understand how forces affect motion in our everyday world.`,
        keyPoints: [
          "Force and acceleration are directly proportional",
          "Mass and acceleration are inversely proportional", 
          "The mathematical relationship is F = ma",
          "This law applies to all objects in the universe"
        ],
        formula: "F = m × a",
        variables: [
          { symbol: "F", name: "Force", unit: "Newtons (N)" },
          { symbol: "m", name: "Mass", unit: "Kilograms (kg)" },
          { symbol: "a", name: "Acceleration", unit: "meters per second squared (m/s²)" }
        ]
      }
    },
    detailed: {
      title: "Detailed Analysis",
      icon: Lightbulb,
      color: "yellow",
      duration: 150,
      content: {
        introduction: `Newton's Second Law is fundamental to understanding motion. It tells us that when a net force acts on an object, it will accelerate in the direction of that force. The greater the force, the greater the acceleration. However, the more massive an object is, the less it will accelerate for the same force.`,
        concepts: [
          {
            title: "Direct Proportionality",
            explanation: "If force increases, acceleration increases (assuming constant mass)",
            example: "Pushing a shopping cart harder makes it accelerate faster"
          },
          {
            title: "Inverse Proportionality", 
            explanation: "If mass increases, acceleration decreases (assuming constant force)",
            example: "Same push on a full vs empty cart - empty cart accelerates more"
          }
        ],
        examples: [
          {
            title: "Car Acceleration",
            problem: "A 1000 kg car experiences a 3000 N force from its engine.",
            solution: "a = F/m = 3000 N / 1000 kg = 3 m/s²"
          },
          {
            title: "Falling Objects",
            problem: "A 2 kg object falls under gravity (9.8 m/s²).",
            solution: "F = m × a = 2 kg × 9.8 m/s² = 19.6 N"
          }
        ]
      }
    },
    advanced: {
      title: "Advanced Analysis",
      icon: Brain,
      color: "purple",
      duration: 200,
      content: {
        introduction: `The advanced mathematical framework of Newton's Second Law extends beyond simple scalar equations to vector analysis. In vector form, the sum of all forces equals mass times acceleration vector. This allows us to analyze complex systems where forces act in multiple directions simultaneously.`,
        topics: [
          {
            title: "Vector Form",
            formula: "∑F⃗ = ma⃗",
            explanation: "The net force vector equals mass times acceleration vector"
          },
          {
            title: "Component Analysis",
            formulas: ["Fx = max", "Fy = may"],
            explanation: "Forces and accelerations can be analyzed in components"
          },
          {
            title: "Applications",
            items: [
              {
                name: "Inclined Planes",
                formula: "F∥ = mg sin θ, F⊥ = mg cos θ"
              },
              {
                name: "Circular Motion", 
                formula: "Fc = mac = mv²/r"
              }
            ]
          }
        ],
        strategy: [
          "Identify all forces acting on the object",
          "Draw a free-body diagram",
          "Choose a coordinate system",
          "Apply Newton's Second Law in component form",
          "Solve the resulting equations",
          "Check units and reasonableness"
        ]
      }
    }
  };

  // Audio management
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAudioSettings(prev => ({
          ...prev,
          voice: voices.find(v => v.lang.startsWith('en')) || voices[0]
        }));
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const startReading = (content: string, sectionId: string) => {
    if (!isAudioEnabled || currentlyReading === sectionId) {
      stopReading();
      return;
    }

    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = readingSpeed[0];
      utterance.pitch = audioSettings.pitch;
      utterance.volume = audioSettings.volume;
      utterance.voice = audioSettings.voice;
      
      utterance.onstart = () => {
        setCurrentlyReading(sectionId);
        setReadingProgress(0);
        
        // Simulate progress tracking
        const duration = sections[activeSubTab as keyof typeof sections].duration;
        const progressInterval = setInterval(() => {
          setReadingProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + (100 / duration);
          });
        }, 1000);
      };
      
      utterance.onend = () => {
        setCurrentlyReading(null);
        setReadingProgress(0);
        setCompletedSections(prev => new Set([...prev, sectionId]));
      };
      
      setCurrentUtterance(utterance);
      speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setCurrentlyReading(null);
    setReadingProgress(0);
  };

  const pauseReading = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  };

  const resumeReading = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  };

  const currentSection = sections[activeSubTab as keyof typeof sections];

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Audio Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Learn {conceptName}</CardTitle>
              <p className="text-gray-600 mt-1">
                Comprehensive learning with synchronized audio guidance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                AI Learning Assistant
              </Button>
              <Button
                variant={isAudioEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="flex items-center gap-2"
              >
                {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                Audio {isAudioEnabled ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Global Audio Controls */}
        {isAudioEnabled && (
          <CardContent className="pt-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-300">
                    Audio Learning Active
                  </span>
                  {currentlyReading && (
                    <Badge variant="outline" className="animate-pulse">
                      Reading: {currentlyReading}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={currentlyReading ? pauseReading : resumeReading}
                    disabled={!currentlyReading}
                  >
                    {speechSynthesis.paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stopReading}
                    disabled={!currentlyReading}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {currentlyReading && (
                <div className="space-y-2">
                  <Progress value={readingProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Reading Progress</span>
                    <span>{Math.round(readingProgress)}%</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>Speed:</span>
                  <Slider
                    value={readingSpeed}
                    onValueChange={setReadingSpeed}
                    min={0.5}
                    max={2}
                    step={0.25}
                    className="w-20"
                  />
                  <span>{readingSpeed[0]}x</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Enhanced Learning Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {Object.entries(sections).map(([key, section]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="flex items-center gap-2 relative"
            >
              <section.icon className="h-4 w-4" />
              <span>{section.title}</span>
              {completedSections.has(key) && (
                <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {Object.entries(sections).map(([key, section]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {key === 'basic' && <BasicTabContent section={section} onRead={startReading} />}
                {key === 'detailed' && <DetailedTabContent section={section} onRead={startReading} />}
                {key === 'advanced' && <AdvancedTabContent section={section} onRead={startReading} />}
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>

      {/* AI Assistant Chat */}
      <AIAssistantChat
        conceptName={conceptName}
        context={`Learning: ${currentSection.title}`}
        isVisible={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
};

// Enhanced Content Components
const BasicTabContent: React.FC<{ section: any; onRead: (content: string, id: string) => void }> = ({ section, onRead }) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              {section.title}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRead(section.content.introduction, 'basic-intro')}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Read Introduction
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">What is Newton's Second Law?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.content.introduction}
            </p>
          </div>

          {/* Key Formula */}
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Key Formula</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRead(`The formula is ${section.content.formula}. Where F represents force, m represents mass, and a represents acceleration.`, 'basic-formula')}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Explain
              </Button>
            </div>
            <div className="text-4xl font-bold text-center py-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {section.content.formula}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {section.content.variables.map((variable: any, index: number) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg"
                  whileHover={{ y: -2 }}
                >
                  <div className={`text-3xl font-bold text-${section.color}-600 mb-1`}>
                    {variable.symbol}
                  </div>
                  <div className="text-sm font-medium">{variable.name}</div>
                  <div className="text-xs text-gray-500">{variable.unit}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Points */}
          <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Key Points to Remember</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRead(section.content.keyPoints.join('. '), 'basic-points')}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Read Points
              </Button>
            </div>
            <div className="space-y-3">
              {section.content.keyPoints.map((point: string, index: number) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DetailedTabContent: React.FC<{ section: any; onRead: (content: string, id: string) => void }> = ({ section, onRead }) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              {section.title}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRead(section.content.introduction, 'detailed-intro')}
            >
              <Volume2 className="h-4 w-4 mr-1" />
              Read Overview
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Detailed Explanation */}
          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Detailed Understanding</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {section.content.introduction}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.content.concepts.map((concept: any, index: number) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-600">{concept.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRead(`${concept.title}: ${concept.explanation}. For example: ${concept.example}`, `detailed-concept-${index}`)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm mb-3">{concept.explanation}</p>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-xs">
                    <strong>Example:</strong> {concept.example}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Practical Examples */}
          <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Practical Examples</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRead('Let me walk you through some practical examples of Newton\'s Second Law', 'detailed-examples')}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Explain Examples
              </Button>
            </div>
            <div className="space-y-4">
              {section.content.examples.map((example: any, index: number) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-600">{example.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRead(`${example.title}: ${example.problem} Solution: ${example.solution}`, `detailed-example-${index}`)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm mb-2">{example.problem}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                    {example.solution}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdvancedTabContent: React.FC<{ section: any; onRead: (content: string, id: string) => void }> = ({ section, onRead }) => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              {section.title}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRead(section.content.introduction, 'advanced-intro')}
            >
              <Volume2 className="h-4 w-4 mr-1" />
              Read Advanced Theory
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Advanced Framework */}
          <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Advanced Mathematical Framework</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {section.content.introduction}
            </p>
            
            <div className="space-y-4">
              {section.content.topics.map((topic: any, index: number) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{topic.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRead(`${topic.title}: ${topic.explanation}`, `advanced-topic-${index}`)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {topic.formula && (
                    <div className="text-center text-lg font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded my-3">
                      {topic.formula}
                    </div>
                  )}
                  
                  {topic.formulas && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {topic.formulas.map((formula: string, i: number) => (
                        <div key={i} className="text-center font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          {formula}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm">{topic.explanation}</p>
                  
                  {topic.items && (
                    <div className="mt-3 space-y-2">
                      {topic.items.map((item: any, i: number) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs font-mono text-gray-600">{item.formula}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Problem-Solving Strategy */}
          <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Problem-Solving Strategy</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRead('Here is the systematic approach to solving Newton\'s Second Law problems: ' + section.content.strategy.join(', then '), 'advanced-strategy')}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Read Strategy
              </Button>
            </div>
            <div className="space-y-3">
              {section.content.strategy.map((step: string, index: number) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLearnTab;
