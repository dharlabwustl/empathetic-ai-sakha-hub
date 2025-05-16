
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface FloatingVoiceAssistantProps {
  userName?: string;
  currentMood?: string;
  pronouncePrepzr?: boolean;
  onMoodCommand?: (mood: string) => void;
  onNavigationCommand?: (route: string) => void;
  onSubjectCommand?: (subject: string) => void;
  currentPage?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  userName,
  currentMood,
  pronouncePrepzr = false,
  onMoodCommand,
  onNavigationCommand,
  onSubjectCommand,
  currentPage
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  
  // Speech recognition reference
  const recognitionRef = React.useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    // @ts-ignore - webkitSpeechRecognition may not be in types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Default to Indian English
      
      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setShowTranscript(true);
        
        // Process the command
        processCommand(result);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
    }
    
    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    };
  }, []);

  // Process voice commands
  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    console.log('Processing voice command:', lowerCommand);
    
    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('open') || lowerCommand.includes('navigate to')) {
      // Extract destination
      let destination = '';
      
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) destination = '/dashboard/student';
      else if (lowerCommand.includes('concepts')) destination = '/dashboard/student/concepts';
      else if (lowerCommand.includes('flashcards')) destination = '/dashboard/student/flashcards';
      else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) destination = '/dashboard/student/practice-exam';
      else if (lowerCommand.includes('analytics')) destination = '/dashboard/student/analytics';
      else if (lowerCommand.includes('feel good')) destination = '/dashboard/student/feel-good-corner';
      else if (lowerCommand.includes('academic') || lowerCommand.includes('advisor')) destination = '/dashboard/student/academic-advisor';
      else if (lowerCommand.includes('today') || lowerCommand.includes('plan')) destination = '/dashboard/student/today';
      
      if (destination && onNavigationCommand) {
        onNavigationCommand(destination);
        return;
      }
    }
    
    // Mood commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood') || lowerCommand.includes('i am')) {
      // Extract mood
      let mood = '';
      
      if (lowerCommand.includes('happy')) mood = 'HAPPY';
      else if (lowerCommand.includes('motivated')) mood = 'MOTIVATED';
      else if (lowerCommand.includes('focused')) mood = 'FOCUSED';
      else if (lowerCommand.includes('tired')) mood = 'TIRED';
      else if (lowerCommand.includes('stressed')) mood = 'STRESSED';
      else if (lowerCommand.includes('anxious')) mood = 'ANXIOUS';
      else if (lowerCommand.includes('overwhelmed')) mood = 'OVERWHELMED';
      else if (lowerCommand.includes('confused')) mood = 'CONFUSED';
      else if (lowerCommand.includes('curious')) mood = 'CURIOUS';
      else if (lowerCommand.includes('calm')) mood = 'CALM';
      else if (lowerCommand.includes('neutral')) mood = 'NEUTRAL';
      
      if (mood && onMoodCommand) {
        onMoodCommand(mood);
        return;
      }
    }
    
    // Subject assistance commands
    if (lowerCommand.includes('help with') || lowerCommand.includes('about') || lowerCommand.includes('explain') || 
        lowerCommand.includes('physics') || lowerCommand.includes('chemistry') || lowerCommand.includes('biology') || 
        lowerCommand.includes('zoology') || lowerCommand.includes('botany')) {
      
      let subject = '';
      
      if (lowerCommand.includes('physics')) subject = 'physics';
      else if (lowerCommand.includes('chemistry')) subject = 'chemistry';
      else if (lowerCommand.includes('biology')) subject = 'biology';
      else if (lowerCommand.includes('zoology')) subject = 'zoology';
      else if (lowerCommand.includes('botany')) subject = 'botany';
      
      if (subject && onSubjectCommand) {
        onSubjectCommand(subject);
        return;
      }
    }
    
    // Mute/Unmute commands
    if (lowerCommand.includes('mute') || lowerCommand.includes('stop talking') || lowerCommand.includes('be quiet')) {
      toggleMute(true);
      return;
    }
    
    if (lowerCommand.includes('unmute') || lowerCommand.includes('start talking') || lowerCommand.includes('speak again')) {
      toggleMute(false);
      return;
    }
    
    // Help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakResponse("I can help you navigate the platform, check your mood, provide subject guidance, and assist with your studies. Try commands like 'go to flashcards', 'I'm feeling motivated', or 'help with physics'.");
      return;
    }
    
    // If a page context is available, try to provide contextual help
    if (currentPage) {
      speakResponse(`I heard you say "${command}". On this ${currentPage} page, you can ask for help with specific subjects, navigation to other sections, or update your mood.`);
      return;
    }
    
    // Default response
    speakResponse(`I heard you say "${command}". You can ask me for help with navigation, subjects like physics or biology, or update your mood.`);
  }, [onNavigationCommand, onMoodCommand, onSubjectCommand, currentPage]);

  // Start listening function
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Stop listening function
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      toast({
        title: "Listening",
        description: "How can I assist you with your studies?",
      });
    }
  };

  // Toggle mute state
  const toggleMute = (forceMute?: boolean) => {
    if (forceMute !== undefined) {
      setIsMuted(forceMute);
    } else {
      setIsMuted(!isMuted);
    }
    
    toast({
      title: forceMute === undefined ? (isMuted ? "Voice Unmuted" : "Voice Muted") : (forceMute ? "Voice Muted" : "Voice Unmuted"),
      description: forceMute === undefined ? (isMuted ? "Voice assistant will now speak responses" : "Voice assistant will not speak responses") : (forceMute ? "Voice assistant will not speak responses" : "Voice assistant will now speak responses"),
    });
  };

  // Speak response
  const speakResponse = (text: string) => {
    if (isMuted) return;
    
    const utterance = new SpeechSynthesisUtterance();
    
    // Fix "PREPZR" pronunciation if needed
    let processedText = text;
    if (pronouncePrepzr) {
      processedText = text.replace(/PREPZR/gi, 'Prep-zer');
    }
    
    utterance.text = processedText;
    
    // Set language to Indian English
    utterance.lang = 'en-IN';
    
    // Try to use an Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang === 'en-IN' || voice.name.includes('Indian')
    );
    
    const femaleVoice = voices.find(voice => 
      (voice.lang === 'en-IN' || voice.lang === 'en-US' || voice.lang === 'en-GB') && 
      (voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Veena'))
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    
    // Also display as toast for accessibility
    toast({
      title: "PREPZR Assistant",
      description: processedText,
      duration: 5000,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Transcript display */}
      {showTranscript && transcript && (
        <Card className="max-w-xs md:max-w-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">
                {isListening ? "Listening..." : "I heard:"}
              </span>
              {isListening && (
                <span className="flex items-center">
                  <span className="animate-pulse mr-1 h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="animate-pulse delay-75 mr-1 h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="animate-pulse delay-150 h-2 w-2 bg-green-500 rounded-full"></span>
                </span>
              )}
            </div>
            <p className="text-sm font-medium">{transcript}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Control buttons */}
      <div className="flex gap-2">
        {/* Mute/Unmute button */}
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-md ${isMuted ? 'bg-gray-300' : 'bg-blue-100'}`}
          onClick={() => toggleMute()}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6 text-gray-600" />
          ) : (
            <Volume2 className="h-6 w-6 text-blue-600" />
          )}
        </Button>
        
        {/* Voice assistant button */}
        <Button
          variant="default"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-xl ${
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
  );
};

export default FloatingVoiceAssistant;
