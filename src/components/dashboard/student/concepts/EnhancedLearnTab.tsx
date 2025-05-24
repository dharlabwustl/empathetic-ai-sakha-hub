
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, CheckCircle2, Circle, BookOpen } from 'lucide-react';
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
  duration: number; // in seconds
  completed: boolean;
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

  // Sample content sections for the concept
  const contentSections: ContentSection[] = [
    {
      id: 'section1',
      title: 'Introduction to ' + conceptName,
      content: `Welcome to learning about ${conceptName}. This fundamental concept is essential for understanding how forces work in physics. In this section, we'll explore the basic principles and why this concept matters in real-world applications.`,
      duration: 30,
      completed: false
    },
    {
      id: 'section2',
      title: 'Key Principles',
      content: `The key principles of ${conceptName} involve understanding the relationship between force, mass, and acceleration. These principles form the foundation of classical mechanics and help us predict how objects will behave under different conditions.`,
      duration: 45,
      completed: false
    },
    {
      id: 'section3',
      title: 'Mathematical Framework',
      content: `The mathematical representation of ${conceptName} can be expressed through several equations. The most fundamental equation F = ma shows the direct relationship between force and acceleration, with mass as the proportionality constant.`,
      duration: 40,
      completed: false
    },
    {
      id: 'section4',
      title: 'Real-World Applications',
      content: `Understanding ${conceptName} helps us analyze everything from car crashes to rocket launches. Engineers use these principles to design safer vehicles, architects use them to build stable structures, and scientists use them to explore space.`,
      duration: 35,
      completed: false
    },
    {
      id: 'section5',
      title: 'Common Misconceptions',
      content: `Many students initially struggle with common misconceptions about ${conceptName}. For example, thinking that heavier objects always fall faster, or that force is needed to maintain constant velocity. We'll address these misconceptions systematically.`,
      duration: 25,
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

  // Audio reading simulation
  useEffect(() => {
    if (isReading && currentSectionData) {
      const interval = setInterval(() => {
        setSectionProgress(prev => {
          const increment = 100 / currentSectionData.duration; // Progress per second
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            // Section completed
            setCompletedSections(prevCompleted => new Set([...prevCompleted, currentSectionData.id]));
            
            // Move to next section if available
            if (currentSection < contentSections.length - 1) {
              setCurrentSection(prev => prev + 1);
              setSectionProgress(0);
            } else {
              // All sections completed
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

  return (
    <div className="space-y-6">
      {/* Learning Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Learn: {conceptName}
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
                {isReading ? 'Pause' : 'Play'} Reading
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

          {/* Overall Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-gray-500 mt-1">
              {completedSections.size} of {contentSections.length} sections completed
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Sections List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contentSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentSection 
                        ? 'border-blue-500 bg-blue-50' 
                        : completedSections.has(section.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSectionClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {completedSections.has(section.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : index === currentSection ? (
                        <Circle className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {section.duration}s • Section {index + 1}
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

        {/* Current Section Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{currentSectionData?.title}</CardTitle>
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
              <div className="prose prose-sm max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSectionData?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 leading-relaxed text-base">
                      {currentSectionData?.content}
                    </p>
                    
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
                          <span className="text-sm text-blue-700">Audio reading in progress...</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* AI Tutor Integration */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Reading Assistant
                </h5>
                <p className="text-sm text-purple-700 mb-3">
                  Need help understanding this section? I can explain concepts, answer questions, or provide examples.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Ask Question
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
                    Explain Further
                  </Button>
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
        context={`Learning section: ${currentSectionData?.title} - ${currentSectionData?.content.substring(0, 100)}...`}
        subject="Physics"
      />
    </div>
  );
};

export default EnhancedLearnTab;
