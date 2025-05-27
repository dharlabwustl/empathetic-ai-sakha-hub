
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, VolumeX, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  assistantName?: string;
  context?: 'homepage' | 'dashboard' | 'general';
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className,
  assistantName = 'PREPZR AI',
  context = 'general'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    synthRef.current = window.speechSynthesis;

    // Initial greeting based on context
    if (isOpen) {
      setTimeout(() => {
        if (context === 'homepage') {
          speakMessage(getHomepageGreeting());
        } else if (context === 'dashboard') {
          speakMessage(getDashboardGreeting());
        }
      }, 1000);
    }
  }, [isOpen, context, userName, language]);

  const getHomepageGreeting = () => {
    return `Hi there! I'm your PREP-zer AI companion. Welcome to India's most advanced exam preparation platform! I'm here to introduce you to our revolutionary features like personalized study plans, AI-powered exam readiness analysis, and scholarship opportunities. Ready to discover how PREP-zer can transform your exam preparation journey?`;
  };

  const getDashboardGreeting = () => {
    const isReturning = localStorage.getItem('user_login_count');
    if (isReturning && parseInt(isReturning) > 1) {
      return `Welcome back, ${userName}! Great to see you continuing your preparation journey. I can help you navigate your study plan, check today's tasks, review concept cards, access flashcards, practice exams, and track your exam readiness progress. What would you like to focus on today?`;
    } else {
      return `Hello ${userName}! I'm excited to guide you through your PREP-zer dashboard. I can help you understand your personalized study plan, today's learning tasks, concept cards, exam syllabus, flashcards, practice exams, and formula practice tools. Where shall we start your learning adventure?`;
    }
  };

  const speakMessage = (message: string) => {
    if (isMuted || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = message.replace(/PREPZR/gi, 'PREP-zer').replace(/PREP-ZR/gi, 'PREP-zer');
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Select appropriate voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    synthRef.current.speak(utterance);
    
    // Add to conversation
    setConversation(prev => [...prev, { type: 'assistant', message }]);
  };

  const handleVoiceCommand = (command: string) => {
    setIsProcessing(true);
    setConversation(prev => [...prev, { type: 'user', message: command }]);

    setTimeout(() => {
      const response = processCommand(command.toLowerCase());
      speakMessage(response);
      setIsProcessing(false);
    }, 1000);
  };

  const processCommand = (command: string): string => {
    if (context === 'homepage') {
      return processHomepageCommand(command);
    } else if (context === 'dashboard') {
      return processDashboardCommand(command);
    }
    return "I'm here to help! Could you please be more specific about what you'd like to know?";
  };

  const processHomepageCommand = (command: string): string => {
    // Features and introduction
    if (command.includes('feature') || command.includes('what does') || command.includes('what can')) {
      return "PREP-zer offers cutting-edge features including AI-powered personalized study plans, interactive concept cards, smart flashcards, comprehensive practice exams, formula lab, real-time exam readiness tracking, and scholarship test opportunities. Our platform uses advanced analytics to optimize your learning path for maximum results.";
    }

    // Free trial and pricing
    if (command.includes('free') || command.includes('trial') || command.includes('cost') || command.includes('price')) {
      return "Absolutely! PREP-zer offers a comprehensive free trial to experience our platform. You can explore our study tools, take sample tests, and see your personalized study plan. For full access to premium features, we have affordable subscription plans starting from just 199 rupees per month. Would you like me to guide you through the signup process?";
    }

    // Exam readiness and scholarship
    if (command.includes('exam readiness') || command.includes('scholarship') || command.includes('test')) {
      return "Our AI-powered exam readiness analyzer evaluates your preparation across all subjects and provides a comprehensive readiness score. Plus, PREP-zer offers exclusive scholarship tests with prizes up to 10 lakh rupees! These opportunities can significantly reduce your education costs while rewarding your hard work.";
    }

    // Comparison with coaching institutes
    if (command.includes('coaching') || command.includes('institute') || command.includes('better') || command.includes('why choose')) {
      return "PREP-zer revolutionizes exam preparation by offering 24/7 personalized learning, adaptive AI technology, and comprehensive analytics at a fraction of coaching institute costs. Unlike rigid classroom schedules, you get flexible, self-paced learning with instant doubt resolution and performance tracking that traditional institutes simply cannot match.";
    }

    // Signup and getting started
    if (command.includes('signup') || command.includes('register') || command.includes('start') || command.includes('join')) {
      if (onNavigationCommand) {
        onNavigationCommand('/register');
      }
      return "Excellent choice! I'm directing you to our signup page where you can create your free account in just 2 minutes. You'll immediately get access to our study tools and can start your personalized learning journey right away.";
    }

    // About PREPZR
    if (command.includes('about') || command.includes('company') || command.includes('who')) {
      return "PREP-zer is India's most advanced AI-powered exam preparation platform, founded by IIT alumni with a mission to democratize quality education. We've helped thousands of students achieve their dreams through our innovative technology and personalized approach to learning.";
    }

    // Default homepage response
    return "I'm here to help you discover how PREP-zer can transform your exam preparation! You can ask me about our features, free trial, exam readiness analysis, scholarship opportunities, or how we compare to traditional coaching. What interests you most?";
  };

  const processDashboardCommand = (command: string): string => {
    // Study plan and academic guidance
    if (command.includes('study plan') || command.includes('academic') || command.includes('advisor')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
      return `${userName}, your personalized study plan is designed based on your learning patterns and exam timeline. I can show you today's recommended topics, upcoming milestones, and help you stay on track with your preparation goals.`;
    }

    // Today's plan and tasks
    if (command.includes('today') || command.includes('plan') || command.includes('task') || command.includes('schedule')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/todays-plan');
      }
      return "Let me show you today's learning agenda! Your daily plan includes concept revision, practice problems, flashcard reviews, and mock test sessions - all optimized for your learning pace and exam timeline.";
    }

    // Concepts and study materials
    if (command.includes('concept') || command.includes('topic') || command.includes('learn') || command.includes('study material')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
      }
      return "Your concept cards contain comprehensive study materials organized by subjects and difficulty levels. I can guide you through Physics, Chemistry, Biology, or Mathematics concepts based on your current study focus.";
    }

    // Flashcards
    if (command.includes('flashcard') || command.includes('revision') || command.includes('quick review')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
      }
      return "Flashcards are perfect for quick revision and memory reinforcement! Your personalized deck includes high-yield facts, formulas, and key concepts. Regular flashcard practice significantly improves retention and recall speed.";
    }

    // Practice exams and tests
    if (command.includes('practice') || command.includes('exam') || command.includes('test') || command.includes('mock')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
      }
      return "Practice exams are crucial for exam readiness! I can guide you through subject-wise tests, full-length mocks, and timed practice sessions. Regular testing helps identify knowledge gaps and improves time management skills.";
    }

    // Formula practice
    if (command.includes('formula') || command.includes('equation') || command.includes('calculation')) {
      return "The formula lab provides interactive practice with mathematical equations and scientific formulas. This hands-on approach helps build confidence in problem-solving and formula application across all subjects.";
    }

    // Pending tasks and backlogs
    if (command.includes('pending') || command.includes('backlog') || command.includes('incomplete') || command.includes('remaining')) {
      return `${userName}, I can help you prioritize your pending tasks and clear backlogs efficiently. Staying current with your study schedule is key to maintaining momentum and achieving your target scores.`;
    }

    // Exam readiness and performance
    if (command.includes('readiness') || command.includes('performance') || command.includes('score') || command.includes('progress')) {
      return "Your exam readiness dashboard shows real-time preparation analytics, subject-wise performance trends, and predicted scores. This data-driven approach helps optimize your study strategy for maximum impact.";
    }

    // Motivation for returning users
    if (command.includes('motivate') || command.includes('encourage') || command.includes('progress')) {
      const loginCount = localStorage.getItem('user_login_count');
      if (loginCount && parseInt(loginCount) > 1) {
        return `${userName}, you're showing excellent consistency in your preparation! Your dedication is paying off with steady improvement in practice scores. Keep maintaining this momentum - every study session brings you closer to your dream college!`;
      }
    }

    // Navigation help
    if (command.includes('navigate') || command.includes('go to') || command.includes('show me')) {
      return "I can guide you to any section of your dashboard - study plans, concept cards, flashcards, practice exams, formula lab, performance analytics, or settings. Just tell me where you'd like to go!";
    }

    // Default dashboard response
    return `${userName}, I'm here to help you navigate your learning journey! I can assist with study plans, today's tasks, concept reviews, practice exams, flashcard sessions, or performance tracking. What would you like to focus on right now?`;
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      synthRef.current?.cancel();
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6', 
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
        >
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </Button>
      ) : (
        <Card className="w-80 shadow-xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">{assistantName}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {context === 'homepage' ? 'Welcome Guide' : 'Study Assistant'}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Voice Controls */}
            <div className="flex gap-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={toggleListening}
                className="flex-1"
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>

            {/* Conversation Display */}
            <div className="max-h-48 overflow-y-auto space-y-2 bg-gray-50 rounded-lg p-3">
              {conversation.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  {context === 'homepage' 
                    ? "Ask me about PREP-zer features, free trial, or getting started!" 
                    : "Ask me about your study plan, today's tasks, or any learning tools!"
                  }
                </p>
              ) : (
                conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "text-sm p-2 rounded",
                      msg.type === 'user' 
                        ? "bg-blue-100 text-blue-900 ml-4" 
                        : "bg-white border mr-4"
                    )}
                  >
                    {msg.message}
                  </div>
                ))
              )}
              {isProcessing && (
                <div className="text-sm text-center text-gray-500 animate-pulse">
                  Processing your request...
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              {context === 'homepage' ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('tell me about features')}>
                    Features
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('free trial')}>
                    Free Trial
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('scholarship test')}>
                    Scholarships
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('signup')}>
                    Get Started
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('show study plan')}>
                    Study Plan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('today tasks')}>
                    Today's Plan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('practice exam')}>
                    Practice Test
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVoiceCommand('exam readiness')}>
                    Readiness
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveVoiceAssistant;
