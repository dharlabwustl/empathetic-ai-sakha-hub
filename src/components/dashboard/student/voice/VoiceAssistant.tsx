
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';
import { handleVoiceCommand, getGreeting } from './voiceUtils';

interface VoiceAssistantProps {
  userName: string;
  isFirstTimeUser?: boolean;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  userName,
  isFirstTimeUser = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  
  // Use Web Speech API for speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log("Speech recognition not supported in this browser");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      setTranscript(event.results[last][0].transcript);
    };
    
    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };
    
    if (isListening) {
      recognition.start();
    }
    
    return () => {
      recognition.stop();
    };
  }, [isListening]);
  
  // Process the transcript when user stops speaking
  useEffect(() => {
    if (!isListening && transcript) {
      const assistantResponse = handleVoiceCommand(transcript);
      setResponse(assistantResponse);
      
      // Speak the response if not muted
      if (!isMuted) {
        speak(assistantResponse);
      }
    }
  }, [isListening, transcript, isMuted]);
  
  // Welcome message for first-time users
  useEffect(() => {
    if (isFirstTimeUser && !isMuted) {
      const welcomeMessage = getGreeting(userName, undefined, true);
      setTimeout(() => {
        setResponse(welcomeMessage);
        speak(welcomeMessage);
      }, 1500);
    }
  }, [isFirstTimeUser, isMuted, userName]);
  
  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      // Process the final transcript
      const assistantResponse = handleVoiceCommand(transcript);
      setResponse(assistantResponse);
      
      if (!isMuted) {
        speak(assistantResponse);
      }
      
      // Reset transcript for next interaction
      setTranscript('');
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };
  
  const speak = (text: string) => {
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2 mb-2">
        <EnhancedTooltip content={isMuted ? "Unmute voice responses" : "Mute voice responses"}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleMute}
            className="rounded-full w-9 h-9 p-0"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </EnhancedTooltip>
        
        <EnhancedTooltip content={isListening ? "Stop listening" : "Start voice assistant"}>
          <Button
            variant={isListening ? "destructive" : "default"}
            size="sm"
            onClick={toggleListening}
            className="rounded-full w-9 h-9 p-0"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </EnhancedTooltip>
      </div>
      
      {(isListening || transcript || response) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-md mt-2">
          {isListening && (
            <div className="mb-2">
              <p className="text-xs text-muted-foreground">Listening...</p>
              <p className="italic">{transcript}</p>
            </div>
          )}
          
          {response && (
            <div>
              <p className="text-xs text-muted-foreground">Assistant:</p>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
