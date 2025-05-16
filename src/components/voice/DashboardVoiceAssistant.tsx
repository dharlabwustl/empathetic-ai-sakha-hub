import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = 'Student',
  currentMood,
  onMoodChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Speech recognition setup
  const [recognition, setRecognition] = useState<any>(null);
  
  // Check if this is the first visit to the dashboard
  useEffect(() => {
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const hasSeenDashboardIntro = localStorage.getItem('has_seen_dashboard_intro') === 'true';
    
    if (isNewUser && !hasSeenDashboardIntro) {
      setIsFirstVisit(true);
      setShowWelcomeMessage(true);
      localStorage.setItem('has_seen_dashboard_intro', 'true');
    }
  }, []);
  
  // Initialize voice features
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-IN'; // Set to Indian English

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onresult = (event: any) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setShowTranscript(true);
      
      // Process the command
      processCommand(currentTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    
    // Welcome message for first-time users
    if (isFirstVisit) {
      setTimeout(() => {
        speakWelcomeMessage();
      }, 1000);
    }
    
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.abort();
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
    };
  }, [isFirstVisit]);
  
  // Track page changes to provide context-aware voice assistance
  useEffect(() => {
    // After navigation, provide context
    const currentPath = location.pathname;
    
    // Only speak on internal dashboard navigation, not initial load
    if (transcript) {
      if (currentPath.includes('/dashboard/student/study-plan')) {
        speakResponse("I've opened your study plan. Here you can see your personalized learning schedule and track your progress.");
      } else if (currentPath.includes('/dashboard/student/concepts')) {
        speakResponse("Welcome to the concepts page. Here you can explore and master key NEET topics organized by subject.");
      } else if (currentPath.includes('/dashboard/student/practice')) {
        speakResponse("This is your practice area. Take tests to evaluate your knowledge and identify areas for improvement.");
      } else if (currentPath.includes('/dashboard/student/analytics')) {
        speakResponse("Your analytics dashboard shows your progress and performance trends over time.");
      }
    }
  }, [location.pathname]);

  const speakWelcomeMessage = useCallback(() => {
    const welcomeMessage = `Namaste ${userName}! Welcome to your personalized PREPZR dashboard. I'll help you navigate through everything. You can ask me to show you features, create a study plan, or start a practice test anytime. Let me guide you through a quick tour to get started.`;
    speakResponse(welcomeMessage, true);
  }, [userName]);
  
  // Process voice commands
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Help & introduction commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      setIsHelpDialogOpen(true);
      speakResponse(`I can help you navigate the dashboard, create study plans, prepare for exams, and more. Let me show you some available commands.`);
      return;
    }
    
    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('show dashboard') || lowerCommand.includes('main page')) {
      navigate('/dashboard/student');
      speakResponse("Taking you to the main dashboard.");
      return;
    }
    
    if (lowerCommand.includes('go to study plan') || lowerCommand.includes('show study plan') || lowerCommand.includes('my plan')) {
      navigate('/dashboard/student/study-plan');
      speakResponse("Opening your study plan.");
      return;
    }
    
    if (lowerCommand.includes('go to concepts') || lowerCommand.includes('show concepts')) {
      navigate('/dashboard/student/concepts');
      speakResponse("Opening the concepts page.");
      return;
    }
    
    if (lowerCommand.includes('go to practice') || lowerCommand.includes('practice tests') || lowerCommand.includes('take test')) {
      navigate('/dashboard/student/practice');
      speakResponse("Opening practice tests.");
      return;
    }
    
    if (lowerCommand.includes('go to analytics') || lowerCommand.includes('show analytics') || lowerCommand.includes('my performance')) {
      navigate('/dashboard/student/analytics');
      speakResponse("Opening your performance analytics.");
      return;
    }
    
    // Mood tracking commands
    if (lowerCommand.includes('i feel') || lowerCommand.includes('i am feeling')) {
      const mood = detectMood(lowerCommand);
      if (mood && onMoodChange) {
        onMoodChange(mood);
        speakResponse(`I've updated your mood to ${mood}. I'll adjust recommendations based on how you're feeling.`);
      } else {
        speakResponse("I couldn't quite understand how you're feeling. Could you try saying it differently?");
      }
      return;
    }
    
    // Study suggestions based on mood
    if (lowerCommand.includes('what should i study') || lowerCommand.includes('suggest topics')) {
      if (currentMood === MoodType.TIRED || currentMood === MoodType.STRESSED) {
        speakResponse("Since you're feeling tired, let's focus on lighter review topics today. I'd recommend short study sessions with breaks in between.");
      } else if (currentMood === MoodType.MOTIVATED || currentMood === MoodType.FOCUSED) {
        speakResponse("You're in a great mindset for productive studying! Let's tackle some challenging concepts in your weak areas today.");
      } else {
        speakResponse("Based on your past performance, I recommend focusing on Physics concepts, particularly kinematics and Newton's laws.");
      }
      return;
    }
    
    // Topic explanations
    if (lowerCommand.includes('explain') || lowerCommand.includes('tell me about')) {
      // Extract topic from command
      const topicMatches = lowerCommand.match(/explain\s+(.+)/i) || lowerCommand.match(/tell me about\s+(.+)/i);
      
      if (topicMatches && topicMatches[1]) {
        const topic = topicMatches[1];
        speakResponse(`I'd be happy to explain ${topic}. This is an important concept in the NEET curriculum. Let me guide you through the key points.`);
      } else {
        speakResponse("What topic would you like me to explain? You can say something like 'explain photosynthesis'.");
      }
      return;
    }
    
    // Logout command
    if (lowerCommand.includes('logout') || lowerCommand.includes('sign out')) {
      speakResponse("Logging you out now.");
      setTimeout(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
      }, 2000);
      return;
    }
    
    // General inquiries about NEET exam
    if (lowerCommand.includes('neet') && (lowerCommand.includes('about') || lowerCommand.includes('what is'))) {
      speakResponse("The National Eligibility cum Entrance Test or NEET is the entrance examination for MBBS and BDS programs in Indian medical and dental colleges. It's conducted by the National Testing Agency and is a highly competitive exam requiring thorough preparation in Physics, Chemistry, and Biology.");
      return;
    }
    
    // Fallback for unrecognized commands
    speakResponse("I didn't quite understand that. You can ask me to help navigate the dashboard, create a study plan, or explain NEET concepts.");
  };

  // Detect mood from user's speech
  const detectMood = (speech: string): MoodType | null => {
    const lowerSpeech = speech.toLowerCase();
    
    if (lowerSpeech.includes('happy') || lowerSpeech.includes('great') || lowerSpeech.includes('excited')) {
      return MoodType.HAPPY;
    } else if (lowerSpeech.includes('motivated') || lowerSpeech.includes('ready') || lowerSpeech.includes('eager')) {
      return MoodType.MOTIVATED;
    } else if (lowerSpeech.includes('focused') || lowerSpeech.includes('concentrate')) {
      return MoodType.FOCUSED;
    } else if (lowerSpeech.includes('tired') || lowerSpeech.includes('exhausted') || lowerSpeech.includes('sleepy')) {
      return MoodType.TIRED;
    } else if (lowerSpeech.includes('stressed') || lowerSpeech.includes('pressured')) {
      return MoodType.STRESSED;
    } else if (lowerSpeech.includes('confused') || lowerSpeech.includes('lost')) {
      return MoodType.CONFUSED;
    } else if (lowerSpeech.includes('anxious') || lowerSpeech.includes('worried') || lowerSpeech.includes('nervous')) {
      return MoodType.ANXIOUS;
    } else if (lowerSpeech.includes('overwhelmed')) {
      return MoodType.OVERWHELMED;
    } else if (lowerSpeech.includes('okay') || lowerSpeech.includes('fine') || lowerSpeech.includes('alright')) {
      return MoodType.NEUTRAL;
    }
    
    return null;
  };

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel(); // Stop any current speech
      toast({
        title: "Voice Assistant Muted",
        description: "I won't speak, but I'll still listen when activated.",
        duration: 3000,
      });
    } else {
      speakResponse("Voice assistant unmuted. I can speak again.", true);
    }
  };

  // Start listening
  const startListening = () => {
    if (!recognition) return;
    
    try {
      recognition.start();
      toast({
        title: "Voice Assistant Listening",
        description: "What can I help you with?",
        duration: 3000,
      });
      setShowTranscript(true);
    } catch (error) {
      console.error("Error starting recognition:", error);
    }
  };

  // Stop listening
  const stopListening = () => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      
      // Delay hiding the transcript
      setTimeout(() => {
        if (!transcript) {
          setShowTranscript(false);
        }
      }, 3000);
    } catch (error) {
      console.error("Error stopping recognition:", error);
    }
  };

  // Speak response with Indian English voice preference
  const speakResponse = (text: string, forceSpeech = false) => {
    if (isMuted && !forceSpeech) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Improve PREPZR pronunciation
    const processedText = text.replace(/PREPZR/gi, 'Prep-zer');
    utterance.text = processedText;
    
    // Set language to Indian English
    utterance.lang = 'en-IN';
    
    // Try to use a good voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang === 'en-IN' || voice.lang === 'hi-IN'
    );
    
    // Otherwise try to find any good voice
    const preferredVoice = indianVoice || voices.find(voice => 
      voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('Samantha')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set sensible defaults for voice
    utterance.rate = 0.9;  // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
    
    // Also display as toast for accessibility
    toast({
      title: "PREPZR Assistant",
      description: processedText,
      duration: 5000,
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Transcript display */}
        <AnimatePresence>
          {showTranscript && transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs md:max-w-md transition-all duration-300 mb-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {isListening ? "Listening..." : "I heard:"}
                </span>
                {isListening && (
                  <span className="flex items-center">
                    <span className="animate-pulse mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                    <span className="animate-pulse delay-75 mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                    <span className="animate-pulse delay-150 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                {transcript}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Welcome message for first-time users */}
        <AnimatePresence>
          {showWelcomeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-lg shadow-lg max-w-xs md:max-w-md mb-2 text-white"
            >
              <div className="flex items-start gap-3">
                <Volume2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Voice Assistant Activated</h4>
                  <p className="text-sm text-purple-100">
                    Hi there! I'm your PREPZR voice assistant. Ask me to help you navigate, explain NEET concepts, or create a study plan.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => setShowWelcomeMessage(false)}
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Assistant controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`h-10 w-10 rounded-full shadow-md ${isMuted ? 'bg-red-100 border-red-200' : 'bg-white'}`}
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-red-500" />
            ) : (
              <Volume2 className="h-5 w-5 text-gray-700" />
            )}
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className={`h-12 w-12 rounded-full shadow-xl flex items-center justify-center ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Help dialog */}
      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Commands</DialogTitle>
            <DialogDescription>
              Here are some commands you can use with the voice assistant.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Navigation</h3>
              <div className="grid grid-cols-1 gap-2">
                <Badge variant="outline" className="justify-start font-normal">Go to dashboard</Badge>
                <Badge variant="outline" className="justify-start font-normal">Show my study plan</Badge>
                <Badge variant="outline" className="justify-start font-normal">Open practice tests</Badge>
                <Badge variant="outline" className="justify-start font-normal">Show analytics</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Learning</h3>
              <div className="grid grid-cols-1 gap-2">
                <Badge variant="outline" className="justify-start font-normal">Explain [topic]</Badge>
                <Badge variant="outline" className="justify-start font-normal">What should I study?</Badge>
                <Badge variant="outline" className="justify-start font-normal">Tell me about NEET exam</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Mood Tracking</h3>
              <div className="grid grid-cols-1 gap-2">
                <Badge variant="outline" className="justify-start font-normal">I feel tired</Badge>
                <Badge variant="outline" className="justify-start font-normal">I'm feeling motivated</Badge>
                <Badge variant="outline" className="justify-start font-normal">I am stressed</Badge>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsHelpDialogOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardVoiceAssistant;
