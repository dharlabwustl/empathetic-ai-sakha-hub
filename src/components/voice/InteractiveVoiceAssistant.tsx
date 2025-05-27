
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'User',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const recognitionRef = useRef<any>(null);
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    // Initial greeting when component mounts
    if (!hasGreetedRef.current && !isMuted) {
      setTimeout(() => {
        const greeting = `Hello ${userName}! I'm PREPZR AI, your intelligent learning companion. I'm here to help you navigate through your studies and answer any questions you have about your exam preparation.`;
        speakMessage(greeting);
        hasGreetedRef.current = true;
      }, 2000);
    }
  }, [userName, isMuted]);

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
    speech.lang = language;
    speech.rate = 0.9;
    speech.pitch = 1.0;
    speech.volume = 0.8;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      !voice.name.toLowerCase().includes('male')
    );
    
    if (femaleVoices.length > 0) {
      speech.voice = femaleVoices[0];
    }

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      speakMessage("I'm listening. How can I help you?");
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      speakMessage("Sorry, I couldn't understand that. Please try again.");
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleVoiceCommand = (command: string) => {
    console.log('PREPZR AI processing command:', command);

    // Navigation commands
    if (command.includes('dashboard') || command.includes('home')) {
      onNavigationCommand?.('/dashboard/student');
      speakMessage('Navigating to your dashboard');
      return;
    }

    if (command.includes('concepts') || command.includes('learn')) {
      onNavigationCommand?.('/dashboard/student/concepts');
      speakMessage('Opening concepts section for your learning journey');
      return;
    }

    if (command.includes('flashcard') || command.includes('cards')) {
      onNavigationCommand?.('/dashboard/student/flashcards');
      speakMessage('Opening flashcards for quick revision');
      return;
    }

    if (command.includes('practice exam') || command.includes('test') || command.includes('exam')) {
      onNavigationCommand?.('/dashboard/student/practice-exam');
      speakMessage('Opening practice exams to test your knowledge');
      return;
    }

    if (command.includes('help') || command.includes('what can you do')) {
      speakMessage(`Hi ${userName}! I'm PREPZR AI, your intelligent study companion. I can help you navigate to different sections, check your progress, provide study tips, and answer questions about your exam preparation. What would you like to do?`);
      return;
    }

    // Default response
    speakMessage(`I heard "${command}". I'm PREPZR AI, here to assist with your studies. You can ask me to navigate to different sections or help with your learning. How can I help you today?`);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {isExpanded ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-4 w-80 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">PREPZR AI Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={isListening ? stopListening : startListening}
                className="flex-1"
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Talk'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">Try saying:</p>
              <ul className="space-y-1">
                <li>"Show my dashboard"</li>
                <li>"Open concepts"</li>
                <li>"Practice exams"</li>
                <li>"What can you do?"</li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
      >
        <div className="text-center">
          <div className="text-xs font-bold">AI</div>
        </div>
      </Button>
    </div>
  );
};

export default InteractiveVoiceAssistant;
