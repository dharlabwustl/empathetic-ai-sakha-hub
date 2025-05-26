
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, VolumeX, Mic, MicOff, X, Minimize2, Maximize2 } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useLocation } from 'react-router-dom';

interface EnhancedVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  context?: string;
}

const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  context = 'general'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const location = useLocation();
  const greetingTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    confidence,
    speakText,
    startListening,
    stopListening,
    stopSpeaking,
    processCommand,
    toggleMute,
    updateSettings
  } = useVoiceAssistant({
    userName,
    initialSettings: {
      language,
      autoRestart: false,
      continuous: false
    }
  });

  // Context-aware responses based on current page
  const getContextualGreeting = () => {
    const currentPath = location.pathname;
    
    if (currentPath === '/') {
      return `Welcome to PREPZR! I'm Sakha, your AI study companion. I'm here to help you discover how PREPZR can transform your exam preparation. Would you like to know about our unique features, start your free 7-day trial, or take our exam readiness test?`;
    } else if (currentPath.includes('/dashboard')) {
      return `Hi ${userName}! I'm Sakha, ready to help you with your studies. I can guide you through your dashboard, help with study planning, or answer questions about your progress. What would you like to focus on today?`;
    } else if (currentPath.includes('/concepts')) {
      return `I'm here to help you master concepts, ${userName}. I can explain difficult topics, suggest study strategies, or help you track your progress. What concept would you like to work on?`;
    }
    
    return `Hello ${userName}! I'm Sakha, your AI learning assistant. How can I help you today?`;
  };

  const getContextualResponses = () => {
    const currentPath = location.pathname;
    
    if (currentPath === '/') {
      return {
        'features': () => {
          speakText(`PREPZR offers personalized AI tutoring, adaptive study plans, mood-based learning, real-time progress tracking, and 24/7 support. Unlike traditional coaching, we understand your emotional state and adapt our teaching accordingly. Would you like to experience this with our free trial?`);
        },
        'trial': () => {
          speakText(`Our 7-day free trial gives you full access to all premium features - AI tutoring, personalized study plans, practice exams, and progress analytics. No credit card required! Should I help you get started?`);
          if (onNavigationCommand) onNavigationCommand('/signup');
        },
        'readiness': () => {
          speakText(`Our exam readiness test analyzes your current preparation level across all subjects and creates a personalized study roadmap. It takes just 15 minutes. Would you like to take it now?`);
          // Trigger exam readiness analyzer
          window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        },
        'why prepzr': () => {
          speakText(`PREPZR is India's only emotionally intelligent exam prep platform. While others focus on content, we focus on you - your mood, learning style, and personal growth. Our AI adapts in real-time, making learning stress-free and 3x more effective than traditional methods.`);
        },
        'better': () => {
          speakText(`Unlike coaching centers with fixed schedules or apps with static content, PREPZR offers truly personalized learning. Our AI understands when you're stressed, motivated, or confused, and adjusts teaching methods accordingly. We're not just another EdTech platform - we're your personal study companion.`);
        }
      };
    } else if (currentPath.includes('/dashboard')) {
      return {
        'progress': () => {
          speakText(`I can see your study progress, efficiency ratings, and areas that need attention. Your performance is improving! Would you like me to explain your analytics or suggest your next study session?`);
        },
        'study plan': () => {
          speakText(`Your personalized study plan is designed based on your goals, strengths, and areas for improvement. I can help you adjust it or explain why certain topics are prioritized. What would you like to know?`);
        },
        'concepts': () => {
          speakText(`I can help you understand difficult concepts, provide visual explanations, or suggest related topics to study. Which subject would you like to focus on?`);
          if (onNavigationCommand) onNavigationCommand('/dashboard/student/concepts');
        }
      };
    }
    
    return {};
  };

  // Smart greeting with context awareness
  useEffect(() => {
    if (isOpen && !hasGreeted && !isSpeaking) {
      const shouldGreet = Date.now() - lastInteractionTime > 5000; // 5 seconds since last interaction
      
      if (shouldGreet) {
        greetingTimeoutRef.current = setTimeout(() => {
          const greeting = getContextualGreeting();
          speakText(greeting);
          setHasGreeted(true);
          setConversationContext([greeting]);
        }, 1000);
      }
    }

    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [isOpen, hasGreeted, isSpeaking, location.pathname]);

  // Handle voice commands with context
  useEffect(() => {
    if (transcript && confidence > 0.6) {
      const contextualCommands = getContextualResponses();
      const processed = processCommand({
        ...contextualCommands,
        'hello': () => {
          const greeting = getContextualGreeting();
          speakText(greeting);
        },
        'help': () => {
          speakText(`I can help you navigate, explain features, answer questions about your studies, or guide you through PREPZR. What specific help do you need?`);
        },
        'mute': () => toggleMute(),
        'stop': () => {
          stopSpeaking();
          stopListening();
        },
        'close': () => setIsOpen(false)
      });

      if (processed) {
        setLastInteractionTime(Date.now());
        setConversationContext(prev => [...prev.slice(-4), transcript]); // Keep last 5 interactions
      }
    }
  }, [transcript, confidence]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`fixed ${positionClasses[position]} z-50`}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Volume2 className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed ${positionClasses[position]} z-50`}
          >
            <Card className={`w-80 bg-white/95 backdrop-blur-sm border-purple-200 shadow-2xl ${isMinimized ? 'h-auto' : 'h-96'}`}>
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold text-purple-800">Sakha AI</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                    >
                      {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!isMinimized && (
                  <>
                    {/* Status */}
                    <div className="text-center mb-4">
                      {isSpeaking && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-blue-600 font-medium"
                        >
                          🗣️ Speaking...
                        </motion.div>
                      )}
                      {isListening && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-green-600 font-medium"
                        >
                          🎤 Listening...
                        </motion.div>
                      )}
                      {!isSpeaking && !isListening && (
                        <div className="text-gray-600">Ready to help!</div>
                      )}
                    </div>

                    {/* Transcript */}
                    {transcript && (
                      <div className="bg-gray-100 p-2 rounded mb-4 text-sm">
                        <strong>You said:</strong> {transcript}
                        {confidence > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Confidence: {Math.round(confidence * 100)}%
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600 mb-2">Quick commands:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {location.pathname === '/' ? (
                          <>
                            <Button variant="outline" size="sm" onClick={() => speakText('Tell me about PREPZR features')}>Features</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('Start free trial')}>Free Trial</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('Take readiness test')}>Readiness Test</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('Why is PREPZR better')}>Why PREPZR?</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => speakText('Show my progress')}>Progress</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('Open study plan')}>Study Plan</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('Help with concepts')}>Concepts</Button>
                            <Button variant="outline" size="sm" onClick={() => speakText('General help')}>Help</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Voice Controls */}
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? "destructive" : "default"}
                    size="sm"
                    className="flex-1"
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                    {isListening ? 'Stop' : 'Listen'}
                  </Button>
                  
                  {isSpeaking && (
                    <Button
                      onClick={stopSpeaking}
                      variant="outline"
                      size="sm"
                    >
                      Stop Speaking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedVoiceAssistant;
