
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Subtitles, Mic, MicOff, HelpCircle, Globe, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';

interface HomePageVoiceAssistantProps {
  autoPlay?: boolean;
  delayStart?: number;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({
  autoPlay = true,
  delayStart = 5000,
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
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    language: 'hi-IN',
    pitch: 1.1,
    rate: 0.92,
    volume: 1.0
  });

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesHistoryRef = useRef<string[]>([]);
  
  // Welcome messages sequence - including NEET examination focus
  const welcomeMessages = [
    "नमस्ते, मैं प्रेपज़र की AI सहायक हूँ। NEET परीक्षा की तैयारी में मैं आपकी कैसे सहायता कर सकती हूँ?",
    "PREPZR विशेष रूप से NEET और IIT-JEE जैसी प्रतिस्पर्धी परीक्षाओं की तैयारी करने वाले छात्रों के लिए डिज़ाइन किया गया है।",
    "हमारी व्यक्तिगत अध्ययन योजनाएँ आपके सीखने की शैली और गति के अनुसार ढल जाती हैं, जिससे NEET की तैयारी अधिक प्रभावी हो जाती है।",
    "अपने वर्तमान तैयारी स्तर का आकलन करने और एक अनुकूलित अध्ययन योजना प्राप्त करने के लिए हमारा त्वरित परीक्षा तत्परता परीक्षण लें।",
    "AI-संचालित अभ्यास परीक्षणों और व्यक्तिगत प्रतिक्रिया सहित हमारी सभी सुविधाओं तक पहुंच के लिए 7-दिवसीय निःशुल्क परीक्षण के लिए साइन अप करें।",
    "हमारे प्रीमियम प्लान में संदेह समाधान, विस्तृत प्रदर्शन ट्रैकिंग और विशेष NEET ट्यूशन जैसी उन्नत सुविधाएँ शामिल हैं।",
    "हमने हजारों छात्रों को NEET में अपने सपनों के स्कोर प्राप्त करने में मदद की है। हम आपकी भी मदद करें!",
    "PREPZR के साथ आज ही अपनी NEET की तैयारी शुरू करने के लिए 'शुरू करें' पर क्लिक करें!"
  ];

  // PREPZR feature descriptions for the assistant
  const prepzrFeatures = [
    "PREPZR आपकी भावनात्मक स्थिति के अनुसार ढलता है, और जब आप चिंतित या थके हुए महसूस करें तो व्यक्तिगत प्रेरणा प्रदान करता है।",
    "हमारी AI-संचालित अध्ययन योजनाएँ आपकी सीखने की शैली और परीक्षा समय सीमा के अनुसार तैयार की गई हैं।",
    "परीक्षा जैसे प्रश्नों के साथ अभ्यास करें और अपनी प्रगति को ट्रैक करने के लिए विस्तृत प्रदर्शन विश्लेषण प्राप्त करें।",
    "वॉयस असिस्टेंट आपके NEET विषयों के बारे में आपके सवालों का जवाब दे सकता है और आपके अध्ययन सत्रों का मार्गदर्शन कर सकता है।",
    "PREPZR ने हजारों छात्रों को उनके स्कोर में 30% या अधिक सुधार करने में मदद की है!",
    "हमारी चैंपियन पद्धति प्रतिस्पर्धी परीक्षाओं की तैयारी कैसे करें, इस पर शीर्ष स्कोरर्स के वर्षों के शोध पर आधारित है।"
  ];

  // English versions for language switching
  const welcomeMessagesEnglish = [
    "Welcome to PREPZR. I'm your AI study assistant. How may I help you in preparing for NEET examination.",
    "PREPZR is designed specifically for students preparing for competitive exams like NEET and IIT-JEE.",
    "Our personalized study plans adapt to your learning style and pace, making NEET preparation more effective.",
    "Take our quick Exam Readiness Test to assess your current preparation level and get a customized study plan.",
    "Sign up for a free 7-day trial to access all our features including AI-powered practice tests and personalized feedback.",
    "Our premium plans offer advanced features like doubt resolution, detailed performance tracking, and specialized NEET tutoring.",
    "We've helped thousands of students achieve their dream scores in NEET. Let us help you too!",
    "Click 'Get Started' to begin your NEET preparation journey with PREPZR today!"
  ];

  const prepzrFeaturesEnglish = [
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

  // Load voice settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('voiceAssistantSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setVoiceSettings(settings);
      } catch (e) {
        console.error('Error parsing saved voice settings', e);
      }
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
      
      // Set voice characteristics
      updateUtteranceSettings();
      
      // Set up listeners for speaking events
      document.addEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
      
      // Try to load voices immediately in case they're already available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && utteranceRef.current) {
        updateVoice();
      }
      
      // Auto-play after delay if enabled
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
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, [autoPlay, delayStart, isVisible, voiceSettings]);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = voiceSettings.language; // Use current language
      
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
  }, [voiceSettings.language]);
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, customize messages
    if (isLoggedIn) {
      // Custom welcome message for returning users
    }
  }, []);

  const handleSpeakingStarted = (event: any) => {
    setIsPlaying(true);
  };

  const handleSpeakingEnded = () => {
    setIsPlaying(false);
  };
  
  const updateUtteranceSettings = () => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = voiceSettings.rate;
      utteranceRef.current.pitch = voiceSettings.pitch;
      utteranceRef.current.volume = voiceSettings.volume;
      utteranceRef.current.lang = voiceSettings.language;
      updateVoice();
    }
  };
  
  const updateVoice = () => {
    if (!utteranceRef.current) return;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const bestVoice = findBestVoice(voiceSettings.language);
      if (bestVoice) {
        utteranceRef.current.voice = bestVoice;
        console.log(`Using voice: ${bestVoice.name} for language: ${voiceSettings.language}`);
      }
    }
  };
  
  const handleVoiceInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let response = voiceSettings.language.startsWith('hi') ?
      "मुझे खेद है, मैं आपको नहीं समझ पाया। मैं PREPZR पर NEET की तैयारी में आपकी कैसे मदद कर सकता हूँ?" :
      "I'm sorry, I didn't understand that. How can I help you with your NEET preparation on PREPZR?";
    
    // Get appropriate messages based on language
    const messages = voiceSettings.language.startsWith('hi') ? prepzrFeatures : prepzrFeaturesEnglish;
    
    // Process common queries
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("नमस्ते")) {
      response = voiceSettings.language.startsWith('hi') ?
        "नमस्ते! PREPZR में आपका स्वागत है। आज मैं आपकी NEET की तैयारी में कैसे मदद कर सकता हूँ?" :
        "Hello! Welcome to PREPZR. How can I assist you with your NEET preparation today?";
    } else if (lowerInput.includes("about") || lowerInput.includes("what is") || lowerInput.includes("tell me about") || 
               lowerInput.includes("क्या है") || lowerInput.includes("बारे में")) {
      response = voiceSettings.language.startsWith('hi') ?
        "PREPZR एक AI-संचालित अध्ययन सहायक है जो छात्रों को NEET जैसी प्रतिस्पर्धी परीक्षाओं की तैयारी में मदद करने के लिए डिज़ाइन किया गया है। हम व्यक्तिगत अध्ययन योजनाएँ, अनुकूली शिक्षण और आपकी सफलता की यात्रा का समर्थन करने के लिए भावनात्मक बुद्धिमत्ता प्रदान करते हैं।" :
        "PREPZR is an AI-powered study assistant designed to help students prepare for competitive exams like NEET. We offer personalized study plans, adaptive learning, and emotional intelligence to support your journey to success.";
    } else if (lowerInput.includes("features") || lowerInput.includes("what can you do") || 
               lowerInput.includes("सुविधाएं") || lowerInput.includes("क्या कर सकते हो")) {
      // Select a random feature to highlight
      response = messages[Math.floor(Math.random() * messages.length)];
    } else if (lowerInput.includes("exam") || lowerInput.includes("test") || lowerInput.includes("neet") || 
               lowerInput.includes("परीक्षा") || lowerInput.includes("टेस्ट")) {
      response = voiceSettings.language.startsWith('hi') ?
        "हमारा परीक्षा तत्परता टेस्ट आपको आपके वर्तमान NEET तैयारी स्तर को समझने और एक अनुकूलित अध्ययन योजना बनाने में मदद करेगा। शुरू करने के लिए परीक्षा तत्परता परीक्षण बटन पर क्लिक करें।" :
        "Our Exam Readiness Test will help you understand your current NEET preparation level and create a customized study plan. Click the Test Your Exam Readiness button to start.";
    } else if (lowerInput.includes("hindi") || lowerInput.includes("english") || 
               lowerInput.includes("हिंदी") || lowerInput.includes("अंग्रेजी")) {
      // Handle language switching
      if (lowerInput.includes("hindi") || lowerInput.includes("हिंदी")) {
        setVoiceSettings({...voiceSettings, language: 'hi-IN'});
        localStorage.setItem('voiceAssistantSettings', JSON.stringify({...voiceSettings, language: 'hi-IN'}));
        response = "अब मैं हिंदी में बात करूँगा।";
      } else {
        setVoiceSettings({...voiceSettings, language: 'en-IN'});
        localStorage.setItem('voiceAssistantSettings', JSON.stringify({...voiceSettings, language: 'en-IN'}));
        response = "I'll now speak in English.";
      }
      // Update recognition language
      if (recognitionRef.current) {
        recognitionRef.current.lang = voiceSettings.language;
      }
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
      
      // Fix pronunciation for speech only - not for display
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
        if (currentMessageIndex < getCurrentWelcomeMessages().length - 1 && isPlaying) {
          timerRef.current = window.setTimeout(() => {
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
            setProgress(0);
            speakMessage(getCurrentWelcomeMessages()[currentMessageIndex + 1]);
          }, 1200); // Slightly longer pause between messages for a calmer pace
        } else if (currentMessageIndex >= getCurrentWelcomeMessages().length - 1) {
          setIsPlaying(false);
        }
      }
    };
    
    updateProgress();
  };

  const getCurrentWelcomeMessages = () => {
    return voiceSettings.language.startsWith('hi') ? welcomeMessages : welcomeMessagesEnglish;
  };
  
  const startAnnouncement = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setCurrentMessageIndex(0);
    setProgress(0);
    speakMessage(getCurrentWelcomeMessages()[0]);
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
      speakMessage(getCurrentWelcomeMessages()[currentMessageIndex]);
    }
  };
  
  const dismissComponent = () => {
    stopAnnouncement();
    // Instead of hiding the component completely, minimize it to icon mode
    setIsMinimized(true);
  };

  // Speak a random PREPZR feature when minimized component is clicked
  const handleMinimizedClick = () => {
    const messages = voiceSettings.language.startsWith('hi') ? prepzrFeatures : prepzrFeaturesEnglish;
    const randomFeature = messages[Math.floor(Math.random() * messages.length)];
    speakMessage(randomFeature);
    setIsMinimized(false);
    setHasStarted(true);
  };

  // Save settings and close dialog
  const handleSaveSettings = () => {
    localStorage.setItem('voiceAssistantSettings', JSON.stringify(voiceSettings));
    updateUtteranceSettings();
    setShowSettingsDialog(false);

    // Provide feedback in the selected language
    const message = voiceSettings.language.startsWith('hi') 
      ? "आपकी वॉयस सहायक सेटिंग्स अपडेट की गई हैं।" 
      : "Your voice assistant settings have been updated.";
    
    speakMessage(message);
  };
  
  if (!isVisible) {
    return null;
  }
  
  // Render minimized floating icon version when dismissed
  if (isMinimized) {
    return (
      <motion.div 
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
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
                className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200 w-64"
              >
                <p className="text-sm font-medium mb-1">PREPZR Voice Assistant</p>
                <p className="text-xs text-gray-500">Click to explore how PREPZR can help you crack your exams!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={toggleListening}
                    >
                      {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => setShowSettingsDialog(true)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={dismissComponent}>
                      <span className="sr-only">Minimize</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3 mt-2">
                  <p className="text-sm">{getCurrentWelcomeMessages()[currentMessageIndex]}</p>
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

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
            <DialogDescription>
              Customize your PREPZR voice assistant experience
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="language">Language & Voice</TabsTrigger>
              <TabsTrigger value="properties">Voice Properties</TabsTrigger>
            </TabsList>
            
            <TabsContent value="language" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="language">Assistant Language</Label>
                <Select 
                  value={voiceSettings.language} 
                  onValueChange={(value) => setVoiceSettings({...voiceSettings, language: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hi-IN">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="en-IN">English (Indian)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {voiceSettings.language.startsWith('hi') ? 
                    "हिंदी डिफ़ॉल्ट भाषा है और NEET परीक्षा के लिए अनुशंसित है" : 
                    "Hindi is the default language and recommended for NEET exam"}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="properties" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="pitch">Pitch</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.pitch.toFixed(1)}</span>
                  </div>
                  <Slider
                    id="pitch"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[voiceSettings.pitch]}
                    onValueChange={([value]) => setVoiceSettings({...voiceSettings, pitch: value})}
                  />
                  <p className="text-xs text-muted-foreground">Adjust how high or low the voice sounds</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="rate">Speaking Rate</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.rate.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="rate"
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={[voiceSettings.rate]}
                    onValueChange={([value]) => setVoiceSettings({...voiceSettings, rate: value})}
                  />
                  <p className="text-xs text-muted-foreground">Adjust how fast or slow the assistant speaks</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="volume">Volume</Label>
                    <span className="text-sm text-muted-foreground">{voiceSettings.volume.toFixed(1)}</span>
                  </div>
                  <Slider
                    id="volume"
                    min={0.1}
                    max={1}
                    step={0.1}
                    value={[voiceSettings.volume]}
                    onValueChange={([value]) => setVoiceSettings({...voiceSettings, volume: value})}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomePageVoiceAssistant;
