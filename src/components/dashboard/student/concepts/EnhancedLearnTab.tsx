
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  BookOpen, CheckCircle, MessageSquare, Clock,
  Target, Lightbulb, Brain, FileText, Star,
  ChevronRight, ChevronDown
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
  difficulty: 'basic' | 'intermediate' | 'advanced';
  completed: boolean;
  subsections?: LearningSubsection[];
}

interface LearningSubsection {
  id: string;
  title: string;
  content: string;
  audioText: string;
  examples?: string[];
  keyPoints?: string[];
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({
  conceptName,
  globalAudioState
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [activeSubsection, setActiveSubsection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['intro']));
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiContext, setAiContext] = useState('');
  const [readingSpeed, setReadingSpeed] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Comprehensive learning sections for Newton's Laws
  const learningSections: LearningSection[] = [
    {
      id: 'intro',
      title: 'Introduction to Newton\'s Laws',
      content: 'Newton\'s Laws of Motion are three fundamental principles that describe the relationship between forces and motion. These laws form the foundation of classical mechanics.',
      audioText: 'Welcome to Newton\'s Laws of Motion. These three fundamental principles, formulated by Sir Isaac Newton in 1687, describe the relationship between forces acting on a body and its motion. They form the foundation of classical mechanics and help us understand everything from walking to rocket launches.',
      duration: 45,
      difficulty: 'basic',
      completed: false,
      subsections: [
        {
          id: 'historical-context',
          title: 'Historical Context',
          content: 'Sir Isaac Newton published these laws in his work "Principia Mathematica" in 1687.',
          audioText: 'Sir Isaac Newton published these revolutionary laws in his masterwork "Philosophiæ Naturalis Principia Mathematica" in 1687, fundamentally changing our understanding of physics and motion.',
          keyPoints: [
            'Published in 1687 in Principia Mathematica',
            'Revolutionary understanding of motion and forces',
            'Foundation for all of classical mechanics'
          ]
        },
        {
          id: 'importance',
          title: 'Why These Laws Matter',
          content: 'These laws explain everyday phenomena and enable technological advances.',
          audioText: 'These laws are not just theoretical concepts. They explain why you feel pushed back in your seat when a car accelerates, how rockets reach space, and why satellites orbit Earth.',
          examples: [
            'Car acceleration and deceleration',
            'Rocket propulsion',
            'Satellite orbital mechanics',
            'Sports physics'
          ]
        }
      ]
    },
    {
      id: 'first-law',
      title: 'First Law - Law of Inertia',
      content: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
      audioText: 'Newton\'s First Law, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This law introduces the concept of inertia.',
      duration: 60,
      difficulty: 'basic',
      completed: false,
      subsections: [
        {
          id: 'inertia-concept',
          title: 'Understanding Inertia',
          content: 'Inertia is the resistance of any physical object to any change in its velocity.',
          audioText: 'Inertia is the tendency of objects to resist changes in their state of motion. The more massive an object, the greater its inertia.',
          keyPoints: [
            'Resistance to changes in motion',
            'Directly related to mass',
            'Applies to both rest and motion'
          ]
        },
        {
          id: 'first-law-examples',
          title: 'Real-World Examples',
          content: 'Examples of the first law in everyday life.',
          audioText: 'You experience the first law when you\'re in a moving car that suddenly stops. Your body continues moving forward due to inertia until the seatbelt applies a force to stop you.',
          examples: [
            'Passengers jerking forward when car brakes',
            'Objects sliding on a table when table is pulled',
            'Hockey puck sliding on ice',
            'Coins staying in place when paper is pulled quickly'
          ]
        }
      ]
    },
    {
      id: 'second-law',
      title: 'Second Law - F = ma',
      content: 'The acceleration of an object is directly proportional to the net force acting on the object, is in the direction of the net force, and is inversely proportional to the mass of the object.',
      audioText: 'Newton\'s Second Law quantifies the relationship between force, mass, and acceleration. It states that force equals mass times acceleration, written as F equals m a. This law allows us to calculate exactly how objects will move when forces are applied.',
      duration: 75,
      difficulty: 'intermediate',
      completed: false,
      subsections: [
        {
          id: 'formula-breakdown',
          title: 'Breaking Down F = ma',
          content: 'Understanding each component of the famous equation.',
          audioText: 'In the equation F equals m a, F represents the net force in Newtons, m is the mass in kilograms, and a is the acceleration in meters per second squared.',
          keyPoints: [
            'F = Net force (Newtons)',
            'm = Mass (kilograms)',  
            'a = Acceleration (m/s²)',
            'Force and acceleration are vectors'
          ]
        },
        {
          id: 'applications',
          title: 'Practical Applications',
          content: 'How the second law applies in engineering and daily life.',
          audioText: 'Engineers use the second law to design everything from car brakes to rocket engines. The law helps calculate the force needed to achieve desired accelerations.',
          examples: [
            'Car engine power calculations',
            'Rocket thrust requirements',
            'Elevator design specifications',
            'Athletic performance analysis'
          ]
        }
      ]
    },
    {
      id: 'third-law',
      title: 'Third Law - Action-Reaction',
      content: 'For every action, there is an equal and opposite reaction.',
      audioText: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object simultaneously exerts a force equal in magnitude and opposite in direction on the first object.',
      duration: 55,
      difficulty: 'intermediate',
      completed: false,
      subsections: [
        {
          id: 'action-reaction-pairs',
          title: 'Understanding Action-Reaction Pairs',
          content: 'Forces always come in pairs that act on different objects.',
          audioText: 'Action-reaction pairs are forces that act on different objects. When you push on a wall, the wall pushes back on you with equal force.',
          keyPoints: [
            'Forces always occur in pairs',
            'Equal magnitude, opposite direction',
            'Act on different objects',
            'Simultaneous occurrence'
          ]
        },
        {
          id: 'third-law-examples',
          title: 'Examples in Nature and Technology',
          content: 'How the third law enables movement and propulsion.',
          audioText: 'Walking is possible because of the third law. When you push backward against the ground, the ground pushes forward on you, propelling you forward.',
          examples: [
            'Walking and running',
            'Swimming stroke mechanics',
            'Rocket and jet propulsion',
            'Recoil in firearms'
          ]
        }
      ]
    },
    {
      id: 'applications',
      title: 'Real-World Applications',
      content: 'How Newton\'s laws apply to modern technology and everyday situations.',
      audioText: 'Newton\'s laws are not just academic concepts but practical tools used in engineering, sports science, space exploration, and countless other fields. Understanding these laws helps us design better machines and understand natural phenomena.',
      duration: 80,
      difficulty: 'advanced',
      completed: false,
      subsections: [
        {
          id: 'transportation',
          title: 'Transportation Systems',
          content: 'How the laws govern vehicle design and operation.',
          audioText: 'In transportation, all three laws work together. Cars use friction for acceleration and braking, follow inertial motion on highways, and rely on action-reaction forces for propulsion.',
          examples: [
            'Automotive safety systems',
            'Aircraft lift and propulsion',
            'Train braking systems',
            'Ship navigation'
          ]
        },
        {
          id: 'space-exploration',
          title: 'Space Exploration',
          content: 'Critical role in rocket design and orbital mechanics.',
          audioText: 'Space exploration is impossible without understanding Newton\'s laws. Rockets work by expelling mass in one direction to create thrust in the opposite direction, following the third law.',
          examples: [
            'Rocket propulsion systems',
            'Satellite orbital mechanics',
            'Spacecraft maneuvering',
            'Planetary mission planning'
          ]
        }
      ]
    }
  ];

  const [sections, setSections] = useState(learningSections);

  // Enhanced audio synthesis with progress tracking
  const speakText = (text: string, onComplete?: () => void) => {
    if (isMuted || !globalAudioState?.isEnabled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = readingSpeed;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    let progress = 0;
    const words = text.split(' ');
    const wordsPerSecond = readingSpeed * 3; // Approximate words per second

    utterance.onstart = () => {
      setIsPlaying(true);
      // Start progress tracking
      progressIntervalRef.current = window.setInterval(() => {
        progress += 100 / (words.length / wordsPerSecond);
        setCurrentProgress(Math.min(progress, 100));
      }, 1000);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentProgress(100);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      markSectionCompleted();
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    } else {
      const currentSection = sections[activeSection];
      const currentSubsection = currentSection.subsections?.[activeSubsection];
      const textToSpeak = currentSubsection?.audioText || currentSection.audioText;
      speakText(textToSpeak);
    }
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentProgress(0);
    setActiveSection(0);
    setActiveSubsection(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const markSectionCompleted = () => {
    const currentSectionId = sections[activeSection].id;
    setCompletedSections(prev => new Set([...prev, currentSectionId]));
    
    setSections(prev => prev.map((section, index) => 
      index === activeSection ? { ...section, completed: true } : section
    ));
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleAskAI = (context: string) => {
    setAiContext(context);
    setShowAITutor(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Learn - {conceptName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive learning with synchronized audio and AI assistance
              </p>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                disabled={isMuted}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Start Learning'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAI('comprehensive learning')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Section {activeSection + 1} of {sections.length}</span>
              <span>{completedSections.size}/{sections.length} completed</span>
            </div>
            <Progress value={(completedSections.size / sections.length) * 100} className="h-2" />
            
            {/* Audio Progress */}
            {isPlaying && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Audio Progress</span>
                  <span>{Math.round(currentProgress)}%</span>
                </div>
                <Progress value={currentProgress} className="h-1" />
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {sections[activeSection].completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {sections[activeSection].title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getDifficultyColor(sections[activeSection].difficulty)}>
                      {sections[activeSection].difficulty}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {sections[activeSection].duration}s
                    </Badge>
                  </div>
                </div>
                
                {/* Reading Speed Control */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Speed:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadingSpeed(0.8)}
                    className={readingSpeed === 0.8 ? 'bg-blue-100' : ''}
                  >
                    Slow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadingSpeed(1)}
                    className={readingSpeed === 1 ? 'bg-blue-100' : ''}
                  >
                    Normal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadingSpeed(1.3)}
                    className={readingSpeed === 1.3 ? 'bg-blue-100' : ''}
                  >
                    Fast
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                {/* Main Section Content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {sections[activeSection].content}
                  </p>
                </div>
                
                {/* Subsections */}
                {sections[activeSection].subsections && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Detailed Analysis
                    </h3>
                    
                    <Tabs value={activeSubsection.toString()} onValueChange={(value) => setActiveSubsection(parseInt(value))}>
                      <TabsList className="grid w-full grid-cols-2">
                        {sections[activeSection].subsections!.map((subsection, index) => (
                          <TabsTrigger key={subsection.id} value={index.toString()}>
                            {subsection.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {sections[activeSection].subsections!.map((subsection, index) => (
                        <TabsContent key={subsection.id} value={index.toString()} className="mt-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{subsection.title}</h4>
                            <p className="text-gray-700 mb-4">{subsection.content}</p>
                            
                            {/* Key Points */}
                            {subsection.keyPoints && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Key Points
                                </h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {subsection.keyPoints.map((point, idx) => (
                                    <li key={idx} className="text-gray-700">{point}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Examples */}
                            {subsection.examples && (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4" />
                                  Examples
                                </h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {subsection.examples.map((example, idx) => (
                                    <li key={idx} className="text-gray-700">{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => speakText(subsection.audioText)}
                              className="flex items-center gap-2"
                            >
                              <Volume2 className="h-3 w-3" />
                              Play Section Audio
                            </Button>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className={`rounded-lg cursor-pointer transition-all ${
                    activeSection === index
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => setActiveSection(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      <div className="flex items-center gap-1">
                        {section.completed && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <Badge className={`text-xs ${getDifficultyColor(section.difficulty)}`}>
                          {section.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{section.duration}s</span>
                      {section.subsections && (
                        <span>{section.subsections.length} subsections</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* AI Assistant Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('current section')}
              >
                <Lightbulb className="h-4 w-4" />
                Explain Current Section
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('quiz me')}
              >
                <Target className="h-4 w-4" />
                Quiz Me
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('real world examples')}
              >
                <Star className="h-4 w-4" />
                More Examples
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('study tips')}
              >
                <FileText className="h-4 w-4" />
                Study Tips
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
        context={aiContext}
        subject="Physics"
      />
    </div>
  );
};

export default EnhancedLearnTab;
