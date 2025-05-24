
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Brain, MessageSquare, Mic, MicOff, Volume2, VolumeX,
  Play, Pause, CheckCircle, Lightbulb, Eye, Target, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAIListening, setIsAIListening] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Welcome to learning ${conceptName}. This section will introduce you to the fundamental concepts and importance of this topic.`,
      audioText: `Let's begin our journey into ${conceptName}. This is a fundamental concept that will help you understand the underlying principles.`,
      estimatedTime: 5
    },
    {
      id: 'fundamentals',
      title: 'Core Fundamentals',
      content: `Understanding the basic principles and core concepts of ${conceptName} is essential for mastering this topic.`,
      audioText: `Now we'll dive into the core fundamentals of ${conceptName}. Pay attention to how these principles interconnect.`,
      estimatedTime: 10
    },
    {
      id: 'applications',
      title: 'Real-world Applications',
      content: `Explore how ${conceptName} is applied in real-world scenarios and its practical implications.`,
      audioText: `Let's explore the practical applications of ${conceptName} in the real world. This will help you see its relevance.`,
      estimatedTime: 8
    },
    {
      id: 'examples',
      title: 'Worked Examples',
      content: `Step-by-step examples demonstrating the application of ${conceptName} principles.`,
      audioText: `Now we'll work through some examples together. These will help solidify your understanding of ${conceptName}.`,
      estimatedTime: 12
    },
    {
      id: 'summary',
      title: 'Key Takeaways',
      content: `Summary of the most important points and key takeaways from learning ${conceptName}.`,
      audioText: `Let's summarize the key points we've covered about ${conceptName}. These are the essential concepts to remember.`,
      estimatedTime: 5
    }
  ];

  const playAudioExplanation = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAIAssistant = () => {
    setIsAIListening(!isAIListening);
    if (!isAIListening) {
      setTimeout(() => {
        setIsAIListening(false);
        playAudioExplanation(`I'm here to help you learn ${conceptName}. What specific aspect would you like me to explain further?`);
      }, 3000);
    }
  };

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
      setProgress(prev => Math.min(100, prev + 20)); // 5 sections total
    }
  };

  const totalEstimatedTime = sections.reduce((total, section) => total + section.estimatedTime, 0);

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Learn {conceptName}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive learning path with AI assistance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {completedSections.length}/{sections.length} Complete
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  ~{totalEstimatedTime} min total
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-3 mt-4" />
        </CardHeader>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Audio Learning</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playAudioExplanation(sections[currentSection]?.audioText || '')}
                  disabled={isPlaying}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Playing...' : 'Listen'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">AI Tutor</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant={isAIListening ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleAIAssistant}
                  className="flex items-center gap-2"
                >
                  {isAIListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isAIListening ? 'Listening...' : 'Ask AI'}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => {
          const isCompleted = completedSections.includes(section.id);
          const isCurrent = currentSection === index;
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`cursor-pointer transition-all ${
                isCurrent ? 'ring-2 ring-blue-500 border-blue-200' : 
                isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
              }`}>
                <CardHeader 
                  className="pb-3"
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{section.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{section.estimatedTime} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && <Badge variant="outline" className="bg-green-50 text-green-700">Complete</Badge>}
                      {isCurrent && <Badge variant="outline" className="bg-blue-50 text-blue-700">Current</Badge>}
                    </div>
                  </div>
                </CardHeader>
                
                {isCurrent && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playAudioExplanation(section.audioText)}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen to Explanation
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => markSectionComplete(section.id)}
                          disabled={isCompleted}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Target className="h-4 w-4 mr-2" />
                              Mark Complete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium">Learning Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Use audio explanations to reinforce visual learning</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Ask the AI tutor for clarification on complex topics</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Complete sections in order for optimal understanding</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Take breaks between sections to process information</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLearnTab;
