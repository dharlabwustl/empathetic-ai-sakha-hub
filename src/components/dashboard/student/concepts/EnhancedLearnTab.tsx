
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, BookOpen, 
  CheckCircle, Clock, Brain, MessageSquare, Lightbulb,
  Target, Award, TrendingUp, Zap
} from 'lucide-react';
import AIAssistantChat from './AIAssistantChat';

interface EnhancedLearnTabProps {
  conceptName: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  duration: number;
  completed: boolean;
  type: 'theory' | 'example' | 'application' | 'summary';
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState([1]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  
  const sections: Section[] = [
    {
      id: '1',
      title: 'Introduction',
      content: `Welcome to ${conceptName}! This fundamental concept forms the backbone of physics and helps us understand how objects move and interact in our universe.`,
      duration: 45,
      completed: false,
      type: 'theory'
    },
    {
      id: '2', 
      title: 'Core Principles',
      content: `${conceptName} consists of three fundamental laws that describe the relationship between forces acting on a body and its motion. These principles apply to everything from atoms to galaxies.`,
      duration: 60,
      completed: false,
      type: 'theory'
    },
    {
      id: '3',
      title: 'Real-world Examples',
      content: `Let's explore how ${conceptName} applies in everyday life - from walking and driving to rocket launches and satellite orbits.`,
      duration: 50,
      completed: false,
      type: 'example'
    },
    {
      id: '4',
      title: 'Mathematical Framework',
      content: `The mathematical expressions of ${conceptName} provide precise tools for calculating forces, masses, and accelerations in various scenarios.`,
      duration: 70,
      completed: false,
      type: 'application'
    },
    {
      id: '5',
      title: 'Summary & Review',
      content: `Let's consolidate our understanding of ${conceptName} and prepare for practical applications and problem-solving.`,
      duration: 40,
      completed: false,
      type: 'summary'
    }
  ];

  // Progress tracking
  useEffect(() => {
    const totalSections = sections.length;
    const completed = completedSections.size;
    const overallProgress = (completed / totalSections) * 100;
    setProgress(overallProgress);
  }, [completedSections, sections.length]);

  // Audio playback simulation
  useEffect(() => {
    let interval: number | null = null;
    
    if (isPlaying && !isMuted) {
      interval = window.setInterval(() => {
        // Simulate audio progress
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isMuted]);

  const handlePlay = () => {
    if (!isMuted && sections[currentSection]) {
      const text = sections[currentSection].content;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed[0];
      utterance.onend = () => {
        setIsPlaying(false);
        markSectionCompleted(currentSection);
      };
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const markSectionCompleted = (sectionIndex: number) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'example': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'application': return <Target className="h-4 w-4 text-green-500" />;
      case 'summary': return <Award className="h-4 w-4 text-purple-500" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const completionPercentage = (completedSections.size / sections.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            Learning: {conceptName}
          </h2>
          <Badge variant="outline" className="bg-white/50">
            {Math.round(completionPercentage)}% Complete
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{completedSections.size}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Sections Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{sections.length - completedSections.size}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {sections.reduce((total, section) => total + section.duration, 0)}m
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">85%</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Mastery</div>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="h-3" />
      </motion.div>

      {/* Section Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Learning Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSection(index)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  currentSection === index 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getSectionIcon(section.type)}
                  {completedSections.has(index) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <h3 className="font-medium text-sm">{section.title}</h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {section.duration}s
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Section Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {getSectionIcon(sections[currentSection]?.type)}
              {sections[currentSection]?.title}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(true)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {sections[currentSection]?.content}
              </p>
            </div>

            {/* Audio Controls */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Audio Learning</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Speed:</span>
                  <div className="w-20">
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm font-mono">{speed[0]}x</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={isPlaying ? handlePause : handlePlay}
                  disabled={isMuted}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={toggleMute}
                  className={isMuted ? "text-red-500" : ""}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <div className="flex-1 mx-4">
                  <Progress value={isPlaying ? 50 : 0} className="h-2" />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markSectionCompleted(currentSection)}
                  disabled={completedSections.has(currentSection)}
                >
                  {completedSections.has(currentSection) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    "Mark Complete"
                  )}
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                Previous Section
              </Button>
              
              <Button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
              >
                Next Section
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* AI Assistant */}
      <AIAssistantChat
        conceptName={conceptName}
        context={sections[currentSection]?.content}
        isVisible={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
};

export default EnhancedLearnTab;
