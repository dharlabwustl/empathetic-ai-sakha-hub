
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, X, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

interface UnifiedVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  language?: string;
  context?: 'homepage' | 'dashboard' | 'learning' | 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor' | 'todays-plan';
  onNavigationCommand?: (route: string) => void;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  isOpen,
  onClose,
  userName = 'Student',
  language = 'en-US',
  context = 'homepage',
  onNavigationCommand
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isHandsFree, setIsHandsFree] = useState(false);
  
  // Voice settings
  const [volume, setVolume] = useState(85);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(60);
  
  // Refs
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);

  // Get context-aware messages
  const getContextualMessages = () => {
    const baseMessages = {
      homepage: {
        greeting: `Welcome to PREPZR, ${userName}! I'm Sakha AI, your emotionally intelligent exam preparation assistant. PREPZR is India's first adaptive learning platform that understands your mood and learning style. I can help you navigate our features, start your free trial, or analyze your exam readiness.`,
        help: "I can help you sign up, take a demo, analyze your exam readiness, or learn about our features. Try saying 'Sign up', 'Free trial', 'Analyze readiness', or 'Tell me about PREPZR'."
      },
      dashboard: {
        greeting: `Welcome back ${userName}! Ready to continue your exam preparation journey? I can help you navigate your dashboard, check your study plan, review concept cards, or start practice exams.`,
        help: "I can help you with your study plan, concept cards, flashcards, practice exams, academic advisor, or today's plan. What would you like to explore?"
      },
      'todays-plan': {
        greeting: `Hello ${userName}! Let's review your personalized study plan for today. I can help you understand your tasks, track progress, or suggest optimizations.`,
        help: "I can explain your daily tasks, help mark them complete, suggest study techniques, or adjust your plan based on your mood."
      },
      concepts: {
        greeting: `Welcome to Concept Cards, ${userName}! I'm here to help you master complex topics through interactive learning.`,
        help: "I can explain concepts, create custom flashcards, suggest related topics, or help with difficult problems."
      },
      flashcards: {
        greeting: `Ready for some smart revision, ${userName}? I'll help you optimize your flashcard sessions.`,
        help: "I can create new flashcards, explain difficult concepts, suggest study patterns, or track your progress."
      },
      'practice-exam': {
        greeting: `Time to test your knowledge, ${userName}! I'll guide you through practice exams and help analyze your performance.`,
        help: "I can start exams, explain answers, identify weak areas, or suggest improvement strategies."
      },
      'formula-lab': {
        greeting: `Welcome to Formula Lab, ${userName}! Let's explore interactive formulas and solve problems step by step.`,
        help: "I can explain derivations, help solve problems, suggest practice questions, or clarify concepts."
      },
      'academic-advisor': {
        greeting: `Hello ${userName}! I'm your AI academic advisor. Let's plan your study strategy and track your progress.`,
        help: "I can analyze your performance, suggest study plans, recommend resources, or provide career guidance."
      }
    };
    
    return baseMessages[context] || baseMessages.homepage;
  };

  // Speak with consistent female voice
  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-zer');
    speech.lang = language;
    speech.rate = 0.85 + (speed / 100) * 0.4;
    speech.pitch = 0.9 + (pitch / 100) * 0.4;
    speech.volume = volume / 100;

    // Get consistent female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Zira') ||
      voice.name.includes('Samantha') ||
      (!voice.name.includes('Male') && voice.lang.includes('en'))
    );
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.onend = () => {
      if (isHandsFree && !isMuted) {
        setTimeout(() => startListening(), 1000);
      }
    };

    window.speechSynthesis.speak(speech);
  };

  // Voice recognition setup
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }

    if (recognitionRef.current || isMuted) return;

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => setIsListening(true);
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
        
        if (isHandsFree && !isMuted) {
          timeoutRef.current = window.setTimeout(() => {
            startListening();
          }, 3000);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        
        if (isHandsFree && !isMuted && event.error !== 'aborted') {
          timeoutRef.current = window.setTimeout(() => {
            startListening();
          }, 5000);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setTranscript(transcript);
        
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 2000) return;
        lastCommandTimeRef.current = now;
        
        handleVoiceCommand(transcript);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast({
        title: "Voice recognition error",
        description: "Failed to start voice recognition",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsListening(false);
  };

  // Handle voice commands based on context
  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);

    // Universal commands
    if (command.includes('help') || command.includes('what can you do')) {
      speakMessage(getContextualMessages().help);
      return;
    }

    if (command.includes('mute') || command.includes('stop talking')) {
      setIsMuted(true);
      stopListening();
      return;
    }

    // Navigation commands
    if (command.includes('home') || command.includes('dashboard')) {
      if (context === 'homepage') {
        navigate('/dashboard/student');
        speakMessage('Taking you to your dashboard.');
      } else {
        navigate('/dashboard/student');
        speakMessage('Going to dashboard home.');
      }
      return;
    }

    // Context-specific commands
    switch (context) {
      case 'homepage':
        handleHomepageCommands(command);
        break;
      case 'dashboard':
        handleDashboardCommands(command);
        break;
      case 'todays-plan':
        handleTodaysPlanCommands(command);
        break;
      case 'concepts':
        handleConceptsCommands(command);
        break;
      case 'flashcards':
        handleFlashcardsCommands(command);
        break;
      case 'practice-exam':
        handlePracticeExamCommands(command);
        break;
      case 'formula-lab':
        handleFormulaLabCommands(command);
        break;
      case 'academic-advisor':
        handleAcademicAdvisorCommands(command);
        break;
      default:
        speakMessage("I'm not sure how to help with that. Try saying 'help' to see what I can do.");
    }
  };

  const handleHomepageCommands = (command: string) => {
    if (command.includes('sign up') || command.includes('signup')) {
      navigate('/signup');
      speakMessage('Taking you to sign up. Create your free account to start your personalized exam preparation journey.');
    } else if (command.includes('demo') || command.includes('try')) {
      navigate('/login');
      speakMessage('Opening demo access. You can explore PREPZR features without signing up.');
    } else if (command.includes('analyze') || command.includes('readiness')) {
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your exam readiness analysis. This will help create your personalized study plan.');
    } else if (command.includes('features') || command.includes('about prepzr')) {
      speakMessage('PREPZR is India\'s first emotionally aware exam preparation platform. We provide adaptive study plans, concept cards, practice exams, and emotional support for JEE, NEET, UPSC, and CAT aspirants.');
    } else {
      speakMessage('I can help you sign up, try our demo, analyze your exam readiness, or learn about PREPZR features. What interests you?');
    }
  };

  const handleDashboardCommands = (command: string) => {
    if (command.includes('study plan') || command.includes('today')) {
      navigate('/dashboard/student/todays-plan');
      speakMessage('Opening your personalized study plan for today.');
    } else if (command.includes('concept') || command.includes('concepts')) {
      navigate('/dashboard/student/concepts');
      speakMessage('Opening concept cards for interactive learning.');
    } else if (command.includes('flashcard') || command.includes('revision')) {
      navigate('/dashboard/student/flashcards');
      speakMessage('Opening flashcards for quick revision.');
    } else if (command.includes('exam') || command.includes('practice')) {
      navigate('/dashboard/student/practice-exam');
      speakMessage('Opening practice exams to test your knowledge.');
    } else if (command.includes('formula') || command.includes('formulas')) {
      navigate('/dashboard/student/formula-lab');
      speakMessage('Opening formula lab for interactive problem solving.');
    } else if (command.includes('advisor') || command.includes('guidance')) {
      navigate('/dashboard/student/academic-advisor');
      speakMessage('Opening your AI academic advisor for personalized guidance.');
    } else {
      speakMessage('I can help you navigate to study plan, concept cards, flashcards, practice exams, formula lab, or academic advisor. Where would you like to go?');
    }
  };

  const handleTodaysPlanCommands = (command: string) => {
    if (command.includes('progress') || command.includes('how am i doing')) {
      speakMessage('Let me check your progress. You can see your completion status in the progress meter above. Keep up the great work!');
    } else if (command.includes('next task') || command.includes('what should i do')) {
      speakMessage('Focus on your next pending task. I can see your task breakdown below. Start with the highest priority items first.');
    } else if (command.includes('motivation') || command.includes('encourage')) {
      speakMessage('You\'re doing amazing! Every step forward is progress. Remember, consistent effort leads to exam success. Keep going!');
    } else {
      speakMessage('I can help you track progress, prioritize tasks, or provide motivation. How can I support your study session today?');
    }
  };

  const handleConceptsCommands = (command: string) => {
    speakMessage('I can explain concepts, create flashcards, or help with difficult topics. What specific concept would you like to explore?');
  };

  const handleFlashcardsCommands = (command: string) => {
    speakMessage('I can help create new flashcards, explain difficult concepts, or suggest optimal revision techniques. What would you like to work on?');
  };

  const handlePracticeExamCommands = (command: string) => {
    speakMessage('I can start practice exams, explain answers, or help analyze your performance. Ready to test your knowledge?');
  };

  const handleFormulaLabCommands = (command: string) => {
    speakMessage('I can help with formula derivations, solve problems step by step, or explain mathematical concepts. What formula would you like to explore?');
  };

  const handleAcademicAdvisorCommands = (command: string) => {
    speakMessage('I can analyze your performance, suggest study strategies, recommend resources, or provide career guidance. How can I help with your academic planning?');
  };

  // Toggle hands-free mode
  const toggleHandsFree = () => {
    const newHandsFree = !isHandsFree;
    setIsHandsFree(newHandsFree);
    
    if (newHandsFree && !isMuted) {
      startListening();
      speakMessage('Hands-free mode activated. I\'m now listening continuously for your commands.');
    } else {
      stopListening();
      speakMessage('Hands-free mode deactivated.');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Sakha AI Assistant
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    PREPZR's Intelligent Learning Companion
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Voice Controls */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  className="flex items-center gap-2"
                  disabled={isMuted}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isListening ? 'Stop' : 'Listen'}
                </Button>
                
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  variant={isMuted ? "destructive" : "outline"}
                  className="flex items-center gap-2"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
              </div>

              {/* Hands-free Mode */}
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                  <Label className="text-sm font-medium">Hands-free Mode</Label>
                </div>
                <Switch
                  checked={isHandsFree}
                  onCheckedChange={toggleHandsFree}
                  disabled={isMuted}
                />
              </div>

              {/* Current Transcript */}
              {transcript && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">You said:</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{transcript}</p>
                </div>
              )}

              {/* Voice Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Voice Settings</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-xs">Volume</Label>
                      <span className="text-xs text-gray-500">{volume}%</span>
                    </div>
                    <Slider
                      value={[volume]}
                      onValueChange={(values) => setVolume(values[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-xs">Speed</Label>
                      <span className="text-xs text-gray-500">{speed}%</span>
                    </div>
                    <Slider
                      value={[speed]}
                      onValueChange={(values) => setSpeed(values[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-xs">Pitch</Label>
                      <span className="text-xs text-gray-500">{pitch}%</span>
                    </div>
                    <Slider
                      value={[pitch]}
                      onValueChange={(values) => setPitch(values[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Context Help */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Try saying:</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {context === 'homepage' && (
                    <>
                      <li>• "Sign up for free trial"</li>
                      <li>• "Analyze my exam readiness"</li>
                      <li>• "Tell me about PREPZR"</li>
                      <li>• "Take a demo"</li>
                    </>
                  )}
                  {context === 'dashboard' && (
                    <>
                      <li>• "Show my study plan"</li>
                      <li>• "Open concept cards"</li>
                      <li>• "Start practice exam"</li>
                      <li>• "Go to formula lab"</li>
                    </>
                  )}
                  {context === 'todays-plan' && (
                    <>
                      <li>• "Show my progress"</li>
                      <li>• "What should I do next?"</li>
                      <li>• "I need motivation"</li>
                    </>
                  )}
                  <li>• "Help" for more options</li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => speakMessage(getContextualMessages().greeting)}
                  disabled={isMuted}
                >
                  Play Greeting
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => speakMessage(getContextualMessages().help)}
                  disabled={isMuted}
                >
                  Get Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnifiedVoiceAssistant;
