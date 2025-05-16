
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const HomePageVoiceAssistant: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Speech recognition setup
  const [recognition, setRecognition] = useState<any>(null);
  
  // Initialize voice features
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-IN'; // Set to Indian English by default
    
    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      
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
    
    return () => {
      try {
        recognitionInstance.abort();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    };
  }, []);

  // Process visitor voice commands
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Sign up commands
    if (lowerCommand.includes('sign up') || lowerCommand.includes('register') || lowerCommand.includes('create account')) {
      speakResponse("I'll help you sign up for PREPZR. Let me take you to the registration page.");
      navigate('/signup');
      return;
    }
    
    // Login commands
    if (lowerCommand.includes('log in') || lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
      speakResponse("Taking you to the login page.");
      navigate('/login');
      return;
    }
    
    // Free trial commands
    if (lowerCommand.includes('free trial') || lowerCommand.includes('try for free')) {
      speakResponse("PREPZR offers a 7-day free trial so you can experience our platform. Let me take you to sign up for a free account.");
      navigate('/signup');
      return;
    }
    
    // Exam readiness commands
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('ready for exam') || lowerCommand.includes('check my readiness')) {
      speakResponse("Let me help you check your exam readiness with our analyzer tool.");
      const event = new Event('open-exam-analyzer');
      window.dispatchEvent(event);
      return;
    }
    
    // What is PREPZR commands
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('explain prepzr') || lowerCommand.includes('about prepzr')) {
      speakResponse("Prep-zer is an AI-powered study companion that adapts to your learning style. It offers features like personalized study plans, concept cards, flashcards, practice exams, and a 24/7 AI tutor to help you achieve your academic goals and ace your NEET exams.");
      return;
    }
    
    // Why PREPZR is best commands
    if (lowerCommand.includes('why prepzr') || lowerCommand.includes('best for exam') || lowerCommand.includes('advantages') || lowerCommand.includes('benefits')) {
      speakResponse("Prep-zer offers unique advantages for exam preparation: personalized AI-driven study plans, adaptive learning that responds to your mood and performance, comprehensive revision tools with flashcards and concept maps, realistic practice exams, and 24/7 AI tutoring support. Our platform is designed specifically for NEET exam preparation.");
      return;
    }
    
    // Specific NEET exam questions
    if (lowerCommand.includes('neet') || lowerCommand.includes('medical entrance')) {
      speakResponse("PREPZR is specifically designed to help students prepare for NEET exams with specialized content for Physics, Chemistry, Biology, Botany and Zoology. Our concept cards, practice tests and AI-powered study plans are tailored for medical entrance exam success.");
      return;
    }
    
    // Features commands
    if (lowerCommand.includes('features') || lowerCommand.includes('what can i do')) {
      speakResponse("Prep-zer offers comprehensive exam preparation features including personalized study plans, flashcards, concept cards with interactive content, formula lab, practice exams, performance analytics, and a 24/7 AI tutor. Would you like to learn more about any specific feature?");
      return;
    }
    
    // Help or unknown commands
    speakResponse("Namaste! Welcome to Prep-zer! I can help you learn about our platform, sign up for a free trial, check your exam readiness, or explore our features designed specifically for NEET preparation. What would you like to know?");
  };

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Start listening
  const startListening = () => {
    if (!recognition) return;
    
    try {
      recognition.start();
      toast({
        title: "Voice Assistant Activated",
        description: "I'm listening. How can I help you with PREPZR?",
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

  // Speak response with Indian accent
  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Improve PREPZR pronunciation
    const processedText = text.replace(/PREPZR/gi, 'Prep-zer');
    utterance.text = processedText;
    
    // Set to Indian English
    utterance.lang = 'en-IN';
    
    // Try to use a good voice if available
    const voices = window.speechSynthesis.getVoices();
    
    // First try to find an Indian English voice
    let preferredVoice = voices.find(voice => voice.lang === 'en-IN' || voice.lang === 'hi-IN');
    
    // If no Indian voice found, fall back to any female or Google voice
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('Samantha')
      );
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set sensible defaults for voice
    utterance.rate = 0.95; // Slightly slower for clearer Indian accent
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Transcript display */}
      {showTranscript && transcript && (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs md:max-w-md transition-all duration-300 mb-2 border border-gray-200 dark:border-gray-700">
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
        </div>
      )}
      
      {/* Voice assistant button */}
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
  );
};

export default HomePageVoiceAssistant;
