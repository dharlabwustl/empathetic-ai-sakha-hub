
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Pause, Volume2, VolumeX, MessageSquare, FileText, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayPause?: () => void;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({
  conceptName,
  isPlaying = false,
  audioEnabled = true,
  onPlayPause
}) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [aiTutorActive, setAiTutorActive] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BookOpen,
      content: `${conceptName} is a fundamental concept that forms the foundation for understanding more complex topics. This comprehensive guide will walk you through all the essential aspects you need to master.`,
      audioScript: `Let's begin our exploration of ${conceptName}. This concept is crucial for your understanding...`
    },
    {
      id: 'theory',
      title: 'Theory & Principles',
      icon: FileText,
      content: `The theoretical foundation of ${conceptName} is built upon several key principles. Understanding these principles will help you apply the concept effectively in various scenarios.`,
      audioScript: `The theoretical aspects of ${conceptName} involve several interconnected principles...`
    },
    {
      id: 'applications',
      title: 'Applications',
      icon: Lightbulb,
      content: `${conceptName} has numerous real-world applications across different fields. Let's explore how this concept is used in practice and why it's so important.`,
      audioScript: `Now let's look at how ${conceptName} is applied in real-world situations...`
    },
    {
      id: 'examples',
      title: 'Examples',
      icon: MessageSquare,
      content: `Here are practical examples that demonstrate ${conceptName} in action. These examples will help solidify your understanding through concrete scenarios.`,
      audioScript: `These examples will help you see ${conceptName} in action and understand its practical implications...`
    }
  ];

  const currentSection = sections.find(s => s.id === selectedSection) || sections[0];

  // Simulate reading progress
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setReadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedSection]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Learn {conceptName}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive text-based learning with audio support
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiTutorActive(!aiTutorActive)}
                className={aiTutorActive ? "bg-blue-50 text-blue-700" : ""}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor
              </Button>
              <Badge variant={isPlaying ? "default" : "outline"}>
                {isPlaying ? "Reading" : "Paused"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedSection === section.id ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => {
                        setSelectedSection(section.id);
                        setReadingProgress(0);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>

          {/* Reading Progress */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Reading Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Section</span>
                  <span>{readingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${readingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <currentSection.icon className="h-5 w-5" />
                  {currentSection.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPlayPause}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Read Aloud'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={audioEnabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="prose prose-lg max-w-none"
              >
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 min-h-96">
                  <h3 className="text-xl font-semibold mb-4">{currentSection.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentSection.content}
                  </p>
                  
                  {/* Additional detailed content based on section */}
                  {selectedSection === 'theory' && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-medium">Key Principles:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Fundamental principle of {conceptName}</li>
                        <li>Mathematical relationships and formulas</li>
                        <li>Underlying assumptions and limitations</li>
                        <li>Historical development and context</li>
                      </ul>
                    </div>
                  )}

                  {selectedSection === 'applications' && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-medium">Real-World Applications:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border">
                          <h5 className="font-medium mb-2">Engineering</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Applications in mechanical and electrical engineering
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border">
                          <h5 className="font-medium mb-2">Technology</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Modern technological implementations
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedSection === 'examples' && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-medium">Worked Examples:</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-medium mb-2">Example 1: Basic Application</h5>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          Step-by-step solution demonstrating {conceptName} in a simple scenario
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Audio Reading Panel */}
              <AnimatePresence>
                {isPlaying && audioEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Reading Audio</span>
                      </div>
                      <div className="flex-1 bg-green-200 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-green-600 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${readingProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-sm text-green-700">{readingProgress}%</span>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      {currentSection.audioScript}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Tutor Panel */}
              <AnimatePresence>
                {aiTutorActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-800 mb-2">AI Tutor Support</h4>
                        <p className="text-sm text-purple-700">
                          I'm here to help you understand {conceptName} better. You're currently reading about {currentSection.title}. 
                          {selectedSection === 'theory' && " This section covers the fundamental principles. "}
                          {selectedSection === 'applications' && " This section shows real-world uses. "}
                          {selectedSection === 'examples' && " This section provides practical examples. "}
                          Would you like me to explain anything in simpler terms?
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                            Simplify This
                          </Button>
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                            Ask Question
                          </Button>
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                            More Examples
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLearnTab;
