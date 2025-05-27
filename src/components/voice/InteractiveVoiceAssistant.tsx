
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { cn } from '@/lib/utils';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Visitor',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className,
  assistantName = 'AI Assistant'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log(`${assistantName} processing command:`, lowerCommand);

    // Homepage specific commands
    if (window.location.pathname === '/') {
      handleHomepageCommands(lowerCommand);
    } else if (window.location.pathname.includes('/dashboard')) {
      handleDashboardCommands(lowerCommand);
    } else {
      handleGeneralCommands(lowerCommand);
    }
  };

  const handleHomepageCommands = (command: string) => {
    if (command.includes('what is prepzr') || command.includes('about prepzr')) {
      const message = `${assistantName} here! PREPZR is a revolutionary AI-powered NEET preparation platform that combines cutting-edge technology with personalized learning. We offer intelligent study plans, adaptive flashcards, comprehensive practice exams, and scholarship opportunities to help you excel in your medical entrance exams. Our platform is designed specifically for Indian students preparing for NEET and other medical entrance tests.`;
      speakMessage(message);
      return;
    }

    if (command.includes('features') || command.includes('what can you do')) {
      const message = `PREPZR offers amazing features including AI-powered personalized study plans that adapt to your learning pace, smart flashcards with spaced repetition, comprehensive practice exams with detailed analytics, interactive concept learning with 3D visualizations, scholarship opportunities worth lakhs of rupees, and 24/7 AI tutoring support. We also provide progress tracking, performance insights, and peer learning communities.`;
      speakMessage(message);
      return;
    }

    if (command.includes('pricing') || command.includes('cost') || command.includes('subscription')) {
      const message = `PREPZR offers flexible pricing plans to suit every student's needs. We have a free trial to get you started, followed by affordable monthly and annual subscriptions. Our premium plans include unlimited practice tests, advanced analytics, personalized tutoring, and exclusive scholarship opportunities. The investment in your NEET preparation is significantly more cost-effective than traditional coaching institutes.`;
      speakMessage(message);
      return;
    }

    if (command.includes('sign up') || command.includes('register') || command.includes('join')) {
      const message = `Excellent choice! You can sign up for PREPZR by clicking the 'Get Started' button on this page. We offer a free trial so you can experience our revolutionary learning platform. Join thousands of successful NEET aspirants who have already transformed their preparation with PREPZR's AI-powered approach.`;
      speakMessage(message);
      if (onNavigationCommand) {
        onNavigationCommand('/auth/signup');
      }
      return;
    }

    if (command.includes('coaching') || command.includes('institute') || command.includes('compare')) {
      const message = `PREPZR revolutionizes NEET preparation by offering several advantages over traditional coaching institutes. You get personalized attention through AI tutoring, study at your own pace, access content 24/7, save significantly on costs, and receive data-driven insights about your performance. Unlike coaching institutes with fixed schedules and one-size-fits-all approaches, PREPZR adapts to your unique learning style and needs.`;
      speakMessage(message);
      return;
    }

    // General homepage response
    const message = `Welcome to PREPZR! I'm your AI assistant. I can help you learn about our revolutionary NEET preparation platform, explain our features like personalized study plans and scholarship opportunities, guide you through pricing options, or help you sign up for a free trial. What would you like to know about PREPZR?`;
    speakMessage(message);
  };

  const handleDashboardCommands = (command: string) => {
    if (command.includes('dashboard') || command.includes('home')) {
      const message = `Welcome back to your dashboard, ${userName}! Here you can view your overall progress, access today's study plan, and see personalized recommendations based on your performance.`;
      speakMessage(message);
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
      return;
    }

    if (command.includes('concepts')) {
      const message = `Opening your concepts section, ${userName}. Here you can explore interactive lessons, 3D visualizations, and comprehensive explanations for Physics, Chemistry, and Biology topics.`;
      speakMessage(message);
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
      }
      return;
    }

    if (command.includes('flashcards')) {
      const message = `Perfect choice for quick revision, ${userName}! Your flashcard section uses spaced repetition algorithms to optimize your learning and memory retention.`;
      speakMessage(message);
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
      }
      return;
    }

    if (command.includes('practice exam') || command.includes('test')) {
      const message = `Excellent! Time to test your knowledge with our AI-powered practice exams, ${userName}. These adaptive tests adjust to your skill level and provide detailed performance analytics.`;
      speakMessage(message);
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
      }
      return;
    }

    // General dashboard response
    const message = `I'm here to help you navigate your PREPZR dashboard, ${userName}. I can guide you to concepts, flashcards, practice exams, analytics, and more. I can also provide study tips and motivation based on your progress. What would you like to explore?`;
    speakMessage(message);
  };

  const handleGeneralCommands = (command: string) => {
    if (command.includes('help')) {
      const message = `I'm ${assistantName}, your intelligent companion for PREPZR. I can help you navigate the platform, explain features, and provide guidance based on your current page. How can I assist you today?`;
      speakMessage(message);
      return;
    }

    // Default response
    const message = `I heard you say: "${command}". I'm ${assistantName}, here to help you with PREPZR. I can assist with navigation, answer questions about features, and provide guidance. How can I help you?`;
    speakMessage(message);
  };

  const {
    speakMessage,
    isVoiceSupported,
    voiceInitialized,
    isListening,
    isSpeaking
  } = useVoiceAnnouncer({
    userName,
    autoStart: true,
    onCommand: handleVoiceCommand
  });

  // Initial greeting - only once per session
  useEffect(() => {
    if (isVoiceSupported && voiceInitialized && !hasGreeted && !isMuted) {
      const sessionKey = `voice_greeted_${window.location.pathname}`;
      const hasGreetedThisSession = sessionStorage.getItem(sessionKey);
      
      if (!hasGreetedThisSession) {
        setTimeout(() => {
          let greeting = '';
          
          if (window.location.pathname === '/') {
            greeting = `Hello! I'm your PREPZR AI assistant. I'm here to help you discover how our revolutionary platform can transform your NEET preparation. Feel free to ask me about our features, pricing, or how to get started!`;
          } else if (window.location.pathname.includes('/dashboard')) {
            greeting = `Welcome back, ${userName}! I'm your personal AI study companion. I can help you navigate your dashboard, provide study guidance, and assist with any questions about your NEET preparation journey.`;
          } else {
            greeting = `Hi there! I'm your PREPZR assistant. I'm here to help you navigate and make the most of your learning experience. Just speak to me naturally!`;
          }
          
          speakMessage(greeting);
          setHasGreeted(true);
          sessionStorage.setItem(sessionKey, 'true');
        }, 2000);
      } else {
        setHasGreeted(true);
      }
    }
  }, [isVoiceSupported, voiceInitialized, userName, speakMessage, hasGreeted, isMuted]);

  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6'
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && isSpeaking) {
      window.speechSynthesis.cancel();
    }
  };

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      <div className="flex flex-col items-end space-y-2">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{assistantName}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="h-8 w-8 p-0"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {isListening ? 'Listening...' : 'Say "Hey" to activate'}
                  </span>
                </div>
                
                {isSpeaking && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-blue-600 dark:text-blue-400">Speaking...</span>
                  </div>
                )}
                
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  I can help with navigation, explanations, and guidance. Just speak naturally!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "rounded-full w-14 h-14 shadow-lg transition-all duration-300",
            isListening && "ring-2 ring-green-400 ring-opacity-75",
            isSpeaking && "ring-2 ring-blue-400 ring-opacity-75"
          )}
          variant="default"
        >
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Mic className="h-6 w-6" />
            </motion.div>
          ) : (
            <MicOff className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveVoiceAssistant;
