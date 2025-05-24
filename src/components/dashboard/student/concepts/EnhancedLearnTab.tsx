
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, CheckCircle2, Circle, BookOpen, Brain, Lightbulb, FileText } from 'lucide-react';
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

interface ContentSection {
  id: string;
  title: string;
  content: string;
  detailedExplanation: string;
  keyPoints: string[];
  examples: string[];
  commonMistakes: string[];
  duration: number;
  completed: boolean;
  category: 'foundation' | 'theory' | 'application' | 'analysis' | 'synthesis';
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName,
  globalAudioState 
}) => {
  const [isReading, setIsReading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Comprehensive content sections with detailed analysis
  const contentSections: ContentSection[] = [
    {
      id: 'foundation',
      title: 'Foundational Understanding',
      category: 'foundation',
      content: `${conceptName} is a fundamental concept that forms the backbone of physics understanding. This principle governs how objects interact with forces and how motion results from these interactions.`,
      detailedExplanation: `At its core, ${conceptName} represents one of the most elegant and powerful principles in physics. Developed through centuries of observation and mathematical refinement, this concept allows us to predict and understand the behavior of everything from falling apples to orbiting planets. The beauty lies in its universality - the same principles that govern a ball rolling down a hill also explain the motion of galaxies through space.`,
      keyPoints: [
        'Universal applicability across all scales of motion',
        'Mathematical framework for predicting outcomes',
        'Connection between forces and resulting motion',
        'Foundation for more advanced physics concepts'
      ],
      examples: [
        'A car accelerating from a traffic light',
        'A satellite maintaining orbital velocity',
        'A pendulum swinging back and forth'
      ],
      commonMistakes: [
        'Confusing force with motion',
        'Thinking heavier objects always fall faster',
        'Believing constant motion requires constant force'
      ],
      duration: 45,
      completed: false
    },
    {
      id: 'theoretical_framework',
      title: 'Theoretical Framework',
      category: 'theory',
      content: `The theoretical framework of ${conceptName} is built upon precise mathematical relationships that describe the fundamental interactions between matter and motion.`,
      detailedExplanation: `The mathematical elegance of ${conceptName} emerges from vector algebra and calculus. Forces as vectors have both magnitude and direction, requiring vector addition to find net effects. The relationship F = ma isn't just an equation—it's a profound statement about the nature of reality. Mass represents inertia, the resistance to changes in motion, while acceleration describes how velocity changes over time. This framework allows us to solve complex problems by breaking them into simpler components.`,
      keyPoints: [
        'Vector nature of forces and acceleration',
        'Mass as a measure of inertia',
        'Acceleration as the rate of velocity change',
        'Net force determines motion changes'
      ],
      examples: [
        'Vector addition of multiple forces',
        'Calculating acceleration on inclined planes',
        'Analyzing circular motion forces'
      ],
      commonMistakes: [
        'Treating vectors as simple numbers',
        'Ignoring direction in force calculations',
        'Confusing mass with weight'
      ],
      duration: 50,
      completed: false
    },
    {
      id: 'real_world_applications',
      title: 'Real-World Applications',
      category: 'application',
      content: `Understanding ${conceptName} opens doors to analyzing countless real-world phenomena, from engineering marvels to natural processes.`,
      detailedExplanation: `Engineers use these principles to design everything from bridges to spacecraft. When designing a bridge, engineers must consider all forces: the weight of the bridge itself, traffic loads, wind forces, and even seismic activity. Each component must be designed to handle specific force requirements. In aerospace, rocket design relies heavily on understanding how forces create acceleration, leading to the rocket equation that determines fuel requirements for reaching orbit.`,
      keyPoints: [
        'Structural engineering and safety design',
        'Transportation systems optimization',
        'Sports performance analysis',
        'Industrial machinery design'
      ],
      examples: [
        'Suspension bridge cable calculations',
        'Rocket thrust-to-weight ratios',
        'Automobile braking systems',
        'Wind turbine blade design'
      ],
      commonMistakes: [
        'Oversimplifying real-world complexity',
        'Ignoring friction and air resistance',
        'Not accounting for material limits'
      ],
      duration: 55,
      completed: false
    },
    {
      id: 'analytical_methods',
      title: 'Analytical Methods',
      category: 'analysis',
      content: `Mastering ${conceptName} requires developing analytical skills to break complex problems into manageable components and apply systematic problem-solving approaches.`,
      detailedExplanation: `Effective analysis starts with drawing free-body diagrams, isolating the object of interest and identifying all forces acting upon it. This visual representation prevents oversight and clarifies the problem structure. Next, we establish coordinate systems, choosing orientations that simplify calculations. Breaking forces into components along these axes allows us to apply Newton's laws in each direction independently. This systematic approach transforms complex three-dimensional problems into manageable one-dimensional calculations.`,
      keyPoints: [
        'Free-body diagram construction',
        'Coordinate system selection',
        'Force component analysis',
        'Systematic equation setup'
      ],
      examples: [
        'Analyzing forces on objects on inclined planes',
        'Solving pulley system problems',
        'Calculating forces in static equilibrium'
      ],
      commonMistakes: [
        'Incomplete force identification',
        'Poor coordinate system choices',
        'Sign convention errors'
      ],
      duration: 48,
      completed: false
    },
    {
      id: 'advanced_synthesis',
      title: 'Advanced Synthesis',
      category: 'synthesis',
      content: `Advanced understanding of ${conceptName} involves synthesizing knowledge to solve complex, multi-step problems and connecting to other physics principles.`,
      detailedExplanation: `At the synthesis level, we combine multiple physics concepts to solve real-world problems. This might involve integrating forces with energy conservation, momentum principles, or rotational dynamics. For example, analyzing a car crash involves forces, momentum conservation, energy dissipation, and material deformation. Advanced problems often require numerical methods and computer simulations, as analytical solutions become impractical. This level of understanding prepares students for research and engineering careers where complex, interconnected systems are the norm.`,
      keyPoints: [
        'Multi-concept integration',
        'Complex system analysis',
        'Numerical solution methods',
        'Research applications'
      ],
      examples: [
        'Spacecraft trajectory optimization',
        'Earthquake-resistant building design',
        'Fluid dynamics in weather systems'
      ],
      commonMistakes: [
        'Over-complicating simple problems',
        'Losing sight of fundamental principles',
        'Relying too heavily on technology'
      ],
      duration: 52,
      completed: false
    }
  ];

  const currentSectionData = contentSections[currentSection];

  // Handle global audio state changes
  useEffect(() => {
    if (globalAudioState) {
      setIsReading(globalAudioState.isPlaying && globalAudioState.isEnabled && isAudioEnabled);
    }
  }, [globalAudioState, isAudioEnabled]);

  // Audio reading simulation with detailed progression
  useEffect(() => {
    if (isReading && currentSectionData) {
      const interval = setInterval(() => {
        setSectionProgress(prev => {
          const increment = 100 / currentSectionData.duration;
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            setCompletedSections(prevCompleted => new Set([...prevCompleted, currentSectionData.id]));
            
            if (currentSection < contentSections.length - 1) {
              setCurrentSection(prev => prev + 1);
              setSectionProgress(0);
            } else {
              setIsReading(false);
              setSectionProgress(100);
            }
            
            return newProgress >= 100 ? 100 : newProgress;
          }
          
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isReading, currentSection, currentSectionData, contentSections.length]);

  // Calculate overall progress
  useEffect(() => {
    const totalSections = contentSections.length;
    const completedCount = completedSections.size;
    const currentSectionProgress = currentSection < totalSections ? sectionProgress / 100 : 0;
    const overall = ((completedCount + currentSectionProgress) / totalSections) * 100;
    setOverallProgress(overall);
  }, [completedSections, currentSection, sectionProgress, contentSections.length]);

  const handlePlayPause = () => {
    setIsReading(!isReading);
    window.dispatchEvent(new CustomEvent('learnAudioToggle', { 
      detail: { isPlaying: !isReading } 
    }));
  };

  const handleReset = () => {
    setCurrentSection(0);
    setSectionProgress(0);
    setOverallProgress(0);
    setIsReading(false);
    setCompletedSections(new Set());
    setExpandedSection(null);
  };

  const handleSectionClick = (index: number) => {
    if (!isReading) {
      setCurrentSection(index);
      setSectionProgress(0);
    }
  };

  const handleSectionComplete = () => {
    setCompletedSections(prev => new Set([...prev, currentSectionData.id]));
    if (currentSection < contentSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setSectionProgress(0);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'foundation': return <BookOpen className="h-4 w-4" />;
      case 'theory': return <Brain className="h-4 w-4" />;
      case 'application': return <Lightbulb className="h-4 w-4" />;
      case 'analysis': return <FileText className="h-4 w-4" />;
      case 'synthesis': return <Bot className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'theory': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'application': return 'text-green-600 bg-green-50 border-green-200';
      case 'analysis': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'synthesis': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Comprehensive Learning Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Comprehensive Learning: {conceptName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                disabled={!isAudioEnabled}
                className="flex items-center gap-2"
              >
                {isReading ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isReading ? 'Pause' : 'Start'} Learning
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="flex items-center gap-2"
              >
                {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Learning Progress */}
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Learning Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{completedSections.size}</div>
                <div className="text-xs text-gray-500">Sections Complete</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{contentSections.length}</div>
                <div className="text-xs text-gray-500">Total Sections</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {Math.round((completedSections.size / contentSections.length) * 100)}%
                </div>
                <div className="text-xs text-gray-500">Mastery Level</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Sections Navigator */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contentSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentSection 
                        ? `border-blue-500 bg-blue-50` 
                        : completedSections.has(section.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSectionClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {completedSections.has(section.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : index === currentSection ? (
                        <Circle className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getCategoryColor(section.category)}`}>
                      {getCategoryIcon(section.category)}
                      <span className="capitalize">{section.category}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {section.duration}s • {section.keyPoints.length} key points
                    </div>
                    
                    {/* Section Progress Bar */}
                    {index === currentSection && (
                      <div className="mt-2">
                        <Progress value={sectionProgress} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Learning Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(currentSectionData?.category || 'foundation')}`}>
                    {getCategoryIcon(currentSectionData?.category || 'foundation')}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentSectionData?.title}</CardTitle>
                    <p className="text-sm text-gray-500 capitalize">{currentSectionData?.category} Level</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!completedSections.has(currentSectionData?.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSectionComplete}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Current Section Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Section Progress</span>
                  <span>{Math.round(sectionProgress)}%</span>
                </div>
                <Progress value={sectionProgress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {/* Main Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSectionData?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="prose prose-sm max-w-none"
                  >
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {currentSectionData?.content}
                      </p>
                      
                      {/* Detailed Explanation */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Detailed Analysis</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          {currentSectionData?.detailedExplanation}
                        </p>
                      </div>

                      {/* Key Points */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">Key Points</h4>
                        <ul className="space-y-1">
                          {currentSectionData?.keyPoints.map((point, index) => (
                            <li key={index} className="text-green-800 text-sm flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Examples */}
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-2">Practical Examples</h4>
                        <ul className="space-y-1">
                          {currentSectionData?.examples.map((example, index) => (
                            <li key={index} className="text-purple-800 text-sm flex items-start gap-2">
                              <Lightbulb className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Mistakes */}
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-2">Common Mistakes to Avoid</h4>
                        <ul className="space-y-1">
                          {currentSectionData?.commonMistakes.map((mistake, index) => (
                            <li key={index} className="text-orange-800 text-sm flex items-start gap-2">
                              <Circle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Reading Indicator */}
                    {isReading && (
                      <motion.div
                        className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                          <span className="text-sm text-blue-700">Audio learning in progress...</span>
                          <span className="text-xs text-blue-600 ml-auto">
                            {Math.round(sectionProgress)}% complete
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Enhanced AI Learning Assistant */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Learning Assistant
                  </h5>
                  <p className="text-sm text-purple-700 mb-3">
                    Ready to dive deeper? I can provide additional explanations, generate practice problems, or clarify any concepts!
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowAITutor(true)}
                    >
                      Ask Questions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowAITutor(true)}
                    >
                      Get Examples
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowAITutor(true)}
                    >
                      Practice Problems
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowAITutor(true)}
                    >
                      Test Knowledge
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={`Comprehensive learning - ${currentSectionData?.category} level: ${currentSectionData?.title}. Content: ${currentSectionData?.content}. Key points: ${currentSectionData?.keyPoints.join(', ')}`}
        subject="Physics"
      />
    </div>
  );
};

export default EnhancedLearnTab;
