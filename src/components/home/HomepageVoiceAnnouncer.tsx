
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Info, Mic, MicOff, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HomepageVoiceAnnouncerProps {
  autoPlay?: boolean;
  delayStart?: number; // milliseconds
}

const HomepageVoiceAnnouncer: React.FC<HomepageVoiceAnnouncerProps> = ({
  autoPlay = true,
  delayStart = 5000, // Default delay of 5 seconds
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesHistoryRef = useRef<string[]>([]);
  
  // Welcome messages sequence - including NEET examination focus
  const welcomeMessages = [
    "Welcome to PREPZR. I'm your AI study assistant. How may I help you in preparing for NEET examination.",
    "PREPZR is designed specifically for students preparing for competitive exams like NEET and IIT-JEE.",
    "Our personalized study plans adapt to your learning style and pace, making NEET preparation more effective.",
    "Take our quick Exam Readiness Test to assess your current preparation level and get a customized study plan.",
    "Sign up for a free 7-day trial to access all our features including AI-powered practice tests and personalized feedback.",
    "Our premium plans offer advanced features like doubt resolution, detailed performance tracking, and specialized NEET tutoring.",
    "We've helped thousands of students achieve their dream scores in NEET. Let us help you too!",
    "Click 'Get Started' to begin your NEET preparation journey with PREPZR today!"
  ];

  // PREPZR feature descriptions for the assistant
  const prepzrFeatures = [
    "PREPZR adapts to your emotional state, providing personalized motivation when you feel anxious or tired.",
    "Our AI-powered study plans are tailored to your learning style and exam timeline.",
    "Practice with exam-like questions and get detailed performance analytics to track your progress.",
    "The voice assistant can answer your questions about NEET subjects and guide your study sessions.",
    "PREPZR has helped thousands of students improve their scores by 30% or more!",
    "Our champion methodology is based on years of research on how top scorers prepare for competitive exams."
  ];

  // Check if first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('prepzrHasVisited');
    
    // Only show for first-time visitors
    if (hasVisitedBefore === 'true') {
      setIsVisible(false);
    } else {
      localStorage.setItem('prepzrHasVisited', 'true');
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    // Don't initialize if not visible
    if (!isVisible) return;
    
    // Check if browser supports speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Create utterance object only once
      utteranceRef.current = new SpeechSynthesisUtterance();
      
      // Set voice characteristics for pleasant Indian female voice
      utteranceRef.current.rate = 0.92; // Slightly slower for better clarity and calmer delivery
      utteranceRef.current.pitch = 1.1; // Higher pitch for female voice
      utteranceRef.current.volume = 1.0;
      utteranceRef.current.lang = 'en-IN'; // Set to Indian English
      
      // Find and set the Indian female voice - prioritizing female voices
      window.speechSynthesis.onvoiceschanged = () => {
        if (utteranceRef.current) {
          // Get all available voices
          const voices = window.speechSynthesis.getVoices();
          
          // First, look specifically for Indian female voices
          let indianFemaleVoice = voices.find(voice => 
            voice.lang.includes('en-IN') && 
            voice.name.toLowerCase().includes('female')
          );
          
          // If no specific Indian female voice found, fall back to any Indian voice
          if (!indianFemaleVoice) {
            indianFemaleVoice = findBestVoice('en-IN');
          }
          
          // If Indian voice found, use it
          if (indianFemaleVoice) {
            utteranceRef.current.voice = indianFemaleVoice;
            console.log('Using Indian female voice for homepage:', indianFemaleVoice.name);
          }
        }
      };
      
      // Try to load voices immediately in case they're already available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && utteranceRef.current) {
        // First, look specifically for Indian female voices
        let indianFemaleVoice = voices.find(voice => 
          voice.lang.includes('en-IN') && 
          voice.name.toLowerCase().includes('female')
        );
        
        // If no specific Indian female voice found, fall back to any Indian voice
        if (!indianFemaleVoice) {
          indianFemaleVoice = findBestVoice('en-IN');
        }
        
        // If Indian voice found, use it
        if (indianFemaleVoice) {
          utteranceRef.current.voice = indianFemaleVoice;
          console.log('Immediately loaded Indian female voice for homepage:', indianFemaleVoice.name);
        }
      }
      
      // Auto-play after delay if enabled - ensuring it starts automatically
      if (autoPlay && isVisible) {
        const timer = setTimeout(() => {
          startAnnouncement();
        }, delayStart);
        
        return () => clearTimeout(timer);
      }
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoPlay, delayStart, isVisible]);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Set to Indian English
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleVoiceInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, show different first message and fewer messages
    if (isLoggedIn && welcomeMessages.length > 0) {
      welcomeMessages[0] = "Welcome back to PREPZR. Ready to continue your NEET preparation journey?";
      // Trim the welcome messages for returning users
      welcomeMessages.splice(3);
      welcomeMessages.push("Let's pick up where you left off with your NEET preparation!");
    }
  }, []);
  
  const handleVoiceInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let response = "I'm sorry, I didn't understand that. How can I help you with your NEET preparation on PREPZR?";
    
    // Process common queries
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = "Hello! Welcome to PREPZR. How can I assist you with your NEET preparation today?";
    } else if (lowerInput.includes("about") || lowerInput.includes("what is") || lowerInput.includes("tell me about")) {
      response = "PREPZR is an AI-powered study assistant designed to help students prepare for competitive exams like NEET. We offer personalized study plans, adaptive learning, and emotional intelligence to support your journey to success.";
    } else if (lowerInput.includes("features") || lowerInput.includes("what can you do")) {
      // Select a random feature to highlight
      response = prepzrFeatures[Math.floor(Math.random() * prepzrFeatures.length)];
    } else if (lowerInput.includes("exam") || lowerInput.includes("test") || lowerInput.includes("neet")) {
      response = "Our Exam Readiness Test will help you understand your current NEET preparation level and create a customized study plan. Click the Test Your Exam Readiness button to start.";
    } else if (lowerInput.includes("trial") || lowerInput.includes("free")) {
      response = "You can try PREPZR with our 7-day free trial. Sign up now to access all features and see how we can help you succeed in NEET.";
    } else if (lowerInput.includes("premium") || lowerInput.includes("paid") || lowerInput.includes("plan")) {
      response = "Our premium plans offer advanced features including unlimited NEET practice tests, personalized feedback, doubt resolution, and specialized tutoring for NEET subjects.";
    } else if (lowerInput.includes("login") || lowerInput.includes("sign in")) {
      response = "You can sign in using the button at the top right of the screen.";
    } else if (lowerInput.includes("register") || lowerInput.includes("sign up")) {
      response = "Click the 'Get Started' button to create your PREPZR account and begin your NEET preparation journey.";
    } else if (lowerInput.includes("help me") || lowerInput.includes("struggling")) {
      response = "Many NEET aspirants struggle with time management and keeping up with vast syllabus. PREPZR helps you by breaking down the curriculum into manageable chunks and creating a personalized study schedule based on your strengths and weaknesses.";
    } else if (lowerInput.includes("success") || lowerInput.includes("topper") || lowerInput.includes("champion")) {
      response = "Our champion methodology is based on studying how top NEET performers prepare. We've found that consistent practice, emotional well-being, and adaptive learning are key factors. PREPZR incorporates all these elements to help you become a champion too!";
    }
    
    // Avoid repeating the same message
    if (!messagesHistoryRef.current.includes(response)) {
      speakMessage(response);
      messagesHistoryRef.current.push(response);
      if (messagesHistoryRef.current.length > 5) {
        messagesHistoryRef.current.shift();
      }
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (error) {
          console.error("Error starting speech recognition", error);
        }
      }
    }
  };
  
  const speakMessage = (message: string) => {
    if (utteranceRef.current && !isMuted) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      
      // Fix PREPZR pronunciation
      const processedMessage = message.replace(/PREPZR/g, "prep-ezer");
      
      utteranceRef.current.text = processedMessage;
      window.speechSynthesis.speak(utteranceRef.current);
    }
    
    // Progress timing - increase duration for calmer speech
    const messageDuration = message.length * 90; // Slightly longer for better enunciation
    let startTime = Date.now();
    
    // Update progress
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(100, (elapsed / messageDuration) * 100);
      setProgress(progressValue);
      
      if (progressValue < 100 && isPlaying) {
        timerRef.current = window.setTimeout(updateProgress, 50);
      } else {
        // Move to next message
        if (currentMessageIndex < welcomeMessages.length - 1 && isPlaying) {
          timerRef.current = window.setTimeout(() => {
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
            setProgress(0);
            speakMessage(welcomeMessages[currentMessageIndex + 1]);
          }, 1200); // Slightly longer pause between messages for a calmer pace
        } else if (currentMessageIndex >= welcomeMessages.length - 1) {
          setIsPlaying(false);
        }
      }
    };
    
    updateProgress();
  };
  
  const startAnnouncement = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setCurrentMessageIndex(0);
    setProgress(0);
    speakMessage(welcomeMessages[0]);
  };
  
  const stopAnnouncement = () => {
    setIsPlaying(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else if (isPlaying) {
      // Resume speaking the current message
      speakMessage(welcomeMessages[currentMessageIndex]);
    }
  };
  
  const dismissComponent = () => {
    stopAnnouncement();
    // Instead of hiding the component completely, minimize it to icon mode
    setIsMinimized(true);
  };

  // Speak a random PREPZR feature when minimized component is clicked
  const handleMinimizedClick = () => {
    const randomFeature = prepzrFeatures[Math.floor(Math.random() * prepzrFeatures.length)];
    speakMessage(randomFeature);
    setIsMinimized(false);
    setHasStarted(true);
  };
  
  if (!isVisible) {
    return null;
  }
  
  // Render minimized floating icon version when dismissed
  if (isMinimized) {
    return (
      <TooltipProvider>
        <motion.div 
          className="fixed bottom-4 right-4 z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="relative group"
                onClick={handleMinimizedClick}
              >
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
                <Button 
                  className="rounded-full h-12 w-12 bg-white shadow-lg border border-indigo-100 hover:bg-indigo-50 relative z-10"
                >
                  <Volume2 className="h-6 w-6 text-indigo-600" />
                </Button>
                
                {/* Expandable info on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0, x: -20 }}
                      animate={{ opacity: 1, width: 'auto', x: -10 }}
                      exit={{ opacity: 0, width: 0, x: -20 }}
                      className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200 w-64"
                    >
                      <p className="text-sm font-medium mb-1">PREPZR Voice Assistant</p>
                      <p className="text-xs text-gray-500">Click to explore how PREPZR can help you crack your exams!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Ask PREPZR about exam preparation
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 z-50 ${isPlaying ? "w-80" : "w-auto"}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border overflow-hidden">
            {hasStarted && isPlaying ? (
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="mr-2"
                    >
                      <Volume2 className={`h-4 w-4 ${isMuted ? 'text-gray-400' : 'text-blue-500'}`} />
                    </motion.div>
                    <h3 className="font-medium text-sm">PREPZR Assistant</h3>
                  </div>
                  <div className="flex space-x-1">
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isMuted ? "Unmute" : "Mute"}
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={toggleListening}
                        >
                          {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isListening ? "Stop speaking" : "Ask PREPZR"}
                      </TooltipContent>
                    </Tooltip>
                    
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={dismissComponent}>
                      <span className="sr-only">Minimize</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3 mt-2">
                  <p className="text-sm">{welcomeMessages[currentMessageIndex]}</p>
                </div>
                
                <Progress value={progress} className="h-1 bg-gray-200" />
                
                <div className="flex justify-between mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={stopAnnouncement} 
                    className="text-xs h-7"
                  >
                    Skip
                  </Button>
                  
                  <div className="space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => {
                        // Find the exam test event dispatcher in the DOM and open it
                        const event = new CustomEvent('open-exam-analyzer');
                        window.dispatchEvent(event);
                      }}
                    >
                      Try Exam Test
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="text-xs h-7 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        window.location.href = '/signup';
                      }}
                    >
                      7-Day Trial
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-xs h-7"
                  onClick={startAnnouncement}
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  PREPZR Voice Assistant
                </Button>
              </div>
            )}
            
            {/* Voice input feedback */}
            {isListening && (
              <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border z-50 text-sm max-w-md">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="h-4 w-4 text-red-500 animate-pulse" />
                  <span className="font-medium">Listening...</span>
                </div>
                {userInput && <p className="text-sm italic">"{userInput}"</p>}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default HomepageVoiceAnnouncer;
