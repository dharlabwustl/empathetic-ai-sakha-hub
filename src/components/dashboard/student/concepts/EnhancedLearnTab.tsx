
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause, CheckCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
  isAudioPlaying?: boolean;
  audioEnabled?: boolean;
  onAudioStateChange?: (playing: boolean) => void;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName, 
  isAudioPlaying = false,
  audioEnabled = true,
  onAudioStateChange
}) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showAITutor, setShowAITutor] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const sections = {
    basic: [
      {
        id: 'basic-intro',
        title: 'What is Newton\'s Second Law?',
        content: `Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This fundamental principle of physics helps us understand how forces affect motion in our everyday world.`,
        duration: 15
      },
      {
        id: 'basic-formula',
        title: 'The Mathematical Expression',
        content: `The law is expressed mathematically as F = ma, where F represents force measured in Newtons, m represents mass in kilograms, and a represents acceleration in meters per second squared.`,
        duration: 12
      },
      {
        id: 'basic-example',
        title: 'Simple Example',
        content: `Imagine pushing a shopping cart. When you apply more force, the cart accelerates faster. If you load the cart with heavy items, you need more force to achieve the same acceleration.`,
        duration: 18
      }
    ],
    detailed: [
      {
        id: 'detailed-concept',
        title: 'Deep Understanding',
        content: `Newton's Second Law is fundamental to understanding motion. It tells us that when a net force acts on an object, it will accelerate in the direction of that force. The greater the force, the greater the acceleration. However, the more massive an object is, the less it will accelerate for the same force.`,
        duration: 25
      },
      {
        id: 'detailed-examples',
        title: 'Real-world Applications',
        content: `This law applies everywhere: from car engines accelerating vehicles, to rockets launching into space, to athletes running faster by applying greater force to the ground.`,
        duration: 20
      }
    ],
    advanced: [
      {
        id: 'advanced-math',
        title: 'Vector Analysis',
        content: `The advanced mathematical framework of Newton's Second Law extends beyond simple scalar equations to vector analysis. In vector form, the sum of all forces equals mass times acceleration vector.`,
        duration: 30
      },
      {
        id: 'advanced-applications',
        title: 'Complex Systems',
        content: `This allows us to analyze complex systems where forces act in multiple directions simultaneously. Component analysis becomes crucial when dealing with inclined planes, circular motion, and other complex scenarios.`,
        duration: 35
      }
    ]
  };

  const currentSections = sections[activeSubTab as keyof typeof sections];
  const totalSections = currentSections.length;

  // Audio management
  useEffect(() => {
    if (isAudioPlaying && audioEnabled) {
      startSectionReading();
    } else {
      stopSectionReading();
    }
  }, [isAudioPlaying, audioEnabled, currentSection, activeSubTab]);

  const startSectionReading = () => {
    if (!audioEnabled || currentSection >= currentSections.length) return;

    // Stop any existing audio
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const currentSectionData = currentSections[currentSection];
    const utterance = new SpeechSynthesisUtterance(currentSectionData.content);
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    
    utterance.onstart = () => {
      startProgressTracking(currentSectionData.duration);
    };
    
    utterance.onend = () => {
      markSectionCompleted(currentSectionData.id);
      onAudioStateChange?.(false);
      stopProgressTracking();
      
      // Auto-advance to next section
      if (currentSection < currentSections.length - 1) {
        setTimeout(() => {
          setCurrentSection(prev => prev + 1);
        }, 1000);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSectionReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopProgressTracking();
  };

  const startProgressTracking = (duration: number) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    setReadingProgress(0);
    const totalDuration = duration * 1000; // Convert to milliseconds
    const intervalDuration = 100; // Update every 100ms
    const increment = (intervalDuration / totalDuration) * 100;

    progressInterval.current = setInterval(() => {
      setReadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current!);
          return 100;
        }
        return prev + increment;
      });
    }, intervalDuration);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const markSectionCompleted = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
    if (isAudioPlaying) {
      onAudioStateChange?.(false);
      setTimeout(() => onAudioStateChange?.(true), 100);
    }
  };

  // Reset section tracking when tab changes
  useEffect(() => {
    setCurrentSection(0);
    setReadingProgress(0);
    stopProgressTracking();
  }, [activeSubTab]);

  const getSectionProgress = () => {
    const completed = currentSections.filter(section => 
      completedSections.has(section.id)
    ).length;
    return (completed / totalSections) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Learn {conceptName}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAITutor(!showAITutor)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            AI Tutor
          </Button>
        </div>
      </div>

      {/* Progress Tracking */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Section Progress</span>
            <span className="text-sm text-gray-600">{Math.round(getSectionProgress())}% Complete</span>
          </div>
          <Progress value={getSectionProgress()} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Section {currentSection + 1} of {totalSections}</span>
            <span>{completedSections.size} sections completed</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Tutor Panel */}
      <AnimatePresence>
        {showAITutor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <MessageSquare className="h-5 w-5" />
                  AI Tutor - {activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)} Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    I'm here to help you understand {conceptName}. I can explain any section in more detail, 
                    answer your questions, or provide additional examples. What would you like to know more about?
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Explain Current Section
                  </Button>
                  <Button variant="outline" size="sm">
                    Ask Question
                  </Button>
                  <Button variant="outline" size="sm">
                    More Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">
            <BookOpen className="h-4 w-4 mr-2" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="detailed">
            <Lightbulb className="h-4 w-4 mr-2" />
            Detailed
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Brain className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {Object.entries(sections).map(([tabKey, tabSections]) => (
          <TabsContent key={tabKey} value={tabKey} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {tabKey === 'basic' && <BookOpen className="h-5 w-5 text-blue-600" />}
                    {tabKey === 'detailed' && <Lightbulb className="h-5 w-5 text-yellow-600" />}
                    {tabKey === 'advanced' && <Brain className="h-5 w-5 text-purple-600" />}
                    {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)} Understanding
                  </CardTitle>
                </div>
                <CardDescription>
                  {tabKey === 'basic' && 'Fundamental concepts and definitions'}
                  {tabKey === 'detailed' && 'In-depth understanding with real-world applications'}
                  {tabKey === 'advanced' && 'Complex applications and mathematical analysis'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Audio Progress Indicator */}
                {(isAudioPlaying && activeSubTab === tabKey) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Reading: {tabSections[currentSection]?.title}
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {Math.floor(readingProgress)}%
                      </span>
                    </div>
                    <Progress value={readingProgress} className="h-2" />
                  </motion.div>
                )}

                {/* Section Navigation */}
                <div className="grid grid-cols-1 gap-4">
                  {tabSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all ${
                          currentSection === index 
                            ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => handleSectionClick(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium">{section.title}</h3>
                                {completedSections.has(section.id) && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                {currentSection === index && isAudioPlaying && (
                                  <Badge variant="outline" className="text-xs">Reading</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {section.content}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4">
                              <Badge variant="outline" className="text-xs">
                                {section.duration}s
                              </Badge>
                              {audioEnabled && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSectionClick(index);
                                    onAudioStateChange?.(!isAudioPlaying);
                                  }}
                                >
                                  <Volume2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EnhancedLearnTab;
