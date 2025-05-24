
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, BookOpen, 
  CheckCircle, Circle, Brain, MessageSquare, Lightbulb,
  FileText, Users, Video, Calculator, Target, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AITutorDialog from './AITutorDialog';

interface EnhancedLearnTabProps {
  conceptName: string;
  globalAudioState?: {
    isPlaying: boolean;
    isEnabled: boolean;
    progress: number;
  };
}

interface LearningSection {
  id: string;
  title: string;
  content: string;
  audioText: string;
  duration: number;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  keyPoints: string[];
  examples: string[];
  isCompleted: boolean;
  hasQuiz: boolean;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName,
  globalAudioState 
}) => {
  // Audio and progress states
  const [isLocalAudioPlaying, setIsLocalAudioPlaying] = useState(false);
  const [currentAudioProgress, setCurrentAudioProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedContext, setSelectedContext] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock learning sections data
  const learningSections: LearningSection[] = [
    {
      id: 'introduction',
      title: 'Introduction to the Concept',
      content: `${conceptName} is a fundamental principle in ${globalAudioState ? 'physics' : 'science'} that describes the relationship between various forces and their effects. Understanding this concept is crucial for mastering more advanced topics.`,
      audioText: `Welcome to your comprehensive study of ${conceptName}. In this introduction, we'll explore what makes this concept so important and how it connects to broader scientific principles. This foundational understanding will prepare you for the more detailed analysis that follows.`,
      duration: 12000,
      difficulty: 'Basic',
      keyPoints: [
        'Definition and core principles',
        'Historical context and discovery',
        'Real-world applications',
        'Connection to other concepts'
      ],
      examples: [
        'Everyday examples you can observe',
        'Simple demonstrations',
        'Conceptual analogies'
      ],
      isCompleted: false,
      hasQuiz: true
    },
    {
      id: 'fundamental-principles',
      title: 'Fundamental Principles',
      content: `The core principles underlying ${conceptName} involve several key relationships. These principles form the theoretical foundation that explains observed phenomena and allows us to make predictions.`,
      audioText: `Now let's dive deep into the fundamental principles that govern ${conceptName}. These principles are like the building blocks - once you understand them, everything else becomes much clearer. Pay attention to how these principles interconnect and support each other.`,
      duration: 18000,
      difficulty: 'Intermediate',
      keyPoints: [
        'Primary governing equations',
        'Key variables and their relationships',
        'Underlying assumptions',
        'Boundary conditions'
      ],
      examples: [
        'Mathematical derivations',
        'Theoretical applications',
        'Problem-solving strategies'
      ],
      isCompleted: false,
      hasQuiz: true
    },
    {
      id: 'mathematical-framework',
      title: 'Mathematical Framework',
      content: `The mathematical representation of ${conceptName} provides precise tools for analysis and calculation. This framework includes equations, formulas, and computational methods.`,
      audioText: `Mathematics is the language that allows us to precisely describe ${conceptName}. In this section, we'll explore the mathematical framework step by step. Don't worry if it seems complex at first - we'll break down each equation and show you how to apply them practically.`,
      duration: 22000,
      difficulty: 'Advanced',
      keyPoints: [
        'Key equations and formulas',
        'Variable definitions',
        'Mathematical relationships',
        'Calculation methods'
      ],
      examples: [
        'Worked examples',
        'Step-by-step solutions',
        'Common calculation errors to avoid'
      ],
      isCompleted: false,
      hasQuiz: true
    },
    {
      id: 'practical-applications',
      title: 'Practical Applications',
      content: `Real-world applications of ${conceptName} span multiple industries and disciplines. Understanding these applications helps connect theory to practice.`,
      audioText: `This is where theory meets reality! Let's explore how ${conceptName} is applied in real-world scenarios. From engineering applications to everyday phenomena, you'll see how this concept shapes our world in ways you might never have realized.`,
      duration: 16000,
      difficulty: 'Intermediate',
      keyPoints: [
        'Industrial applications',
        'Engineering uses',
        'Scientific research applications',
        'Emerging technologies'
      ],
      examples: [
        'Case studies',
        'Industry examples',
        'Current research'
      ],
      isCompleted: false,
      hasQuiz: false
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics and Extensions',
      content: `Advanced aspects of ${conceptName} include cutting-edge research, complex scenarios, and connections to other advanced concepts.`,
      audioText: `For those ready to push further, let's explore the advanced frontiers of ${conceptName}. These topics represent current research areas and complex applications that showcase the full power and elegance of this concept.`,
      duration: 20000,
      difficulty: 'Advanced',
      keyPoints: [
        'Current research directions',
        'Complex scenarios',
        'Interdisciplinary connections',
        'Future developments'
      ],
      examples: [
        'Research papers',
        'Advanced problem sets',
        'Cutting-edge applications'
      ],
      isCompleted: false,
      hasQuiz: true
    }
  ];

  // Audio control functions
  const handleLocalAudioToggle = () => {
    const newPlayingState = !isLocalAudioPlaying;
    setIsLocalAudioPlaying(newPlayingState);
    
    if (newPlayingState) {
      startAudioNarration();
    } else {
      stopAudioNarration();
    }
  };

  const startAudioNarration = () => {
    const section = learningSections[currentSection];
    if (section) {
      const totalDuration = section.duration;
      let elapsed = 0;
      
      intervalRef.current = setInterval(() => {
        elapsed += 100;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        setCurrentAudioProgress(progress);
        
        if (progress >= 100) {
          setIsLocalAudioPlaying(false);
          markSectionCompleted(section.id);
          clearInterval(intervalRef.current!);
        }
      }, 100);
    }
  };

  const stopAudioNarration = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAudio = () => {
    stopAudioNarration();
    setCurrentAudioProgress(0);
    setIsLocalAudioPlaying(false);
  };

  const markSectionCompleted = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const navigateToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    resetAudio();
  };

  const openAITutor = (context: string) => {
    setSelectedContext(context);
    setShowAITutor(true);
  };

  // Global audio synchronization
  useEffect(() => {
    if (globalAudioState?.isPlaying && !globalAudioState.isEnabled) {
      stopAudioNarration();
      setIsLocalAudioPlaying(false);
    }
  }, [globalAudioState]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentSectionData = learningSections[currentSection];
  const overallProgress = (completedSections.size / learningSections.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Comprehensive Learning Guide
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Master {conceptName} with structured, audio-guided learning
              </p>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocalAudioToggle}
                className="flex items-center gap-2"
              >
                {isLocalAudioPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isLocalAudioPlaying ? 'Pause' : 'Play'} Audio
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetAudio}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAITutor('learning-assistance')}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                AI Tutor
              </Button>
            </div>
          </div>
          
          {/* Progress Indicators */}
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Current Section Progress</span>
                <span>{Math.round(currentAudioProgress)}%</span>
              </div>
              <Progress value={currentAudioProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Learning Progress</span>
                <span>{Math.round(overallProgress)}% ({completedSections.size}/{learningSections.length} sections)</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="min-h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{currentSectionData.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${
                      currentSectionData.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                      currentSectionData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentSectionData.difficulty}
                    </Badge>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{Math.round(currentSectionData.duration / 1000)} min read</span>
                    </div>
                    
                    {completedSections.has(currentSectionData.id) && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {currentSection > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToSection(currentSection - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentSection < learningSections.length - 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToSection(currentSection + 1)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Main Content */}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentSectionData.content}
                </p>
                
                {isLocalAudioPlaying && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Now Playing Audio Narration
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                      "{currentSectionData.audioText.substring(0, 100)}..."
                    </p>
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Key Points */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Key Learning Points
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentSectionData.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Examples & Applications */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Examples & Applications
                </h3>
                <div className="space-y-3">
                  {currentSectionData.examples.map((example, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-sm">{example}</span>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={() => openAITutor(`example: ${example}`)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Explore this example
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Section Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markSectionCompleted(currentSectionData.id)}
                    disabled={completedSections.has(currentSectionData.id)}
                    className="flex items-center gap-2"
                  >
                    {completedSections.has(currentSectionData.id) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                    Mark as Complete
                  </Button>
                  
                  {currentSectionData.hasQuiz && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Calculator className="h-4 w-4" />
                      Take Quiz
                    </Button>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAITutor(currentSectionData.content)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI about this section
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation & Progress Sidebar */}
        <div className="space-y-4">
          {/* Section Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Learning Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {learningSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentSection 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => navigateToSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSections.has(section.id) 
                        ? 'bg-green-500 text-white' 
                        : index === currentSection 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                    }`}>
                      {completedSections.has(section.id) ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{section.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          className={`text-xs ${
                            section.difficulty === 'Basic' ? 'bg-green-100 text-green-700' :
                            section.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                          variant="outline"
                        >
                          {section.difficulty}
                        </Badge>
                        {section.hasQuiz && (
                          <div className="w-2 h-2 bg-orange-400 rounded-full" title="Has Quiz"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => openAITutor('concept-overview')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Explain Concept
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => openAITutor('check-understanding')}
              >
                <Target className="h-4 w-4 mr-2" />
                Check Understanding
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Video className="h-4 w-4 mr-2" />
                Watch Videos
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Study Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={selectedContext}
        subject="Physics" // You can make this dynamic
      />
    </div>
  );
};

export default EnhancedLearnTab;
