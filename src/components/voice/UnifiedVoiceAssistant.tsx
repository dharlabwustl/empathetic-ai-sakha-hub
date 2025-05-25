
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface UnifiedVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  language?: string;
  context?: 'homepage' | 'dashboard' | 'learning';
  onNavigationCommand?: (route: string) => void;
  handsFreeMode?: boolean;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  isOpen,
  onClose,
  userName = 'Student',
  language: voiceLang = 'en-US',
  context = 'homepage',
  onNavigationCommand,
  handsFreeMode = false
}) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const continuousListeningRef = useRef<boolean>(handsFreeMode);

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      
      // Auto-restart if in hands-free mode and not muted
      if (continuousListeningRef.current && !isMuted && isOpen) {
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (continuousListeningRef.current && !isMuted && isOpen) {
        setTimeout(() => {
          startListening();
        }, 2000);
      }
    };
    
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const result = event.results[last];
      
      if (result.isFinal) {
        const finalTranscript = result[0].transcript.trim();
        const finalConfidence = result[0].confidence;
        
        setTranscript(finalTranscript);
        setConfidence(finalConfidence);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript);
        }
      }
    };
    
    recognitionRef.current = recognition;
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    };
  }, [language, isMuted, isOpen]);

  // Start hands-free listening when component mounts
  useEffect(() => {
    if (handsFreeMode && isOpen && !isMuted) {
      setTimeout(() => {
        startListening();
      }, 1000);
    }
  }, [handsFreeMode, isOpen, isMuted]);

  const startListening = () => {
    if (isMuted || !recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  };

  const stopListening = () => {
    continuousListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      continuousListeningRef.current = true;
      startListening();
    }
  };

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    // Try to find a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes(language === 'hi' ? 'hi' : 'en'))
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('डैशबोर्ड')) {
      speakMessage(language === 'hi' ? 'डैशबोर्ड खोल रहा हूं' : 'Opening dashboard');
      navigate('/dashboard/student');
    } else if (lowerCommand.includes('today') || lowerCommand.includes('plan') || lowerCommand.includes('आज') || lowerCommand.includes('योजना')) {
      speakMessage(language === 'hi' ? 'आज की योजना दिखा रहा हूं' : 'Showing today\'s plan');
      navigate('/dashboard/student/today');
    } else if (lowerCommand.includes('concept') || lowerCommand.includes('अवधारणा')) {
      speakMessage(language === 'hi' ? 'अवधारणा कार्ड खोल रहा हूं' : 'Opening concept cards');
      navigate('/dashboard/student/concepts');
    } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('फ्लैशकार्ड')) {
      speakMessage(language === 'hi' ? 'फ्लैशकार्ड खोल रहा हूं' : 'Opening flashcards');
      navigate('/dashboard/student/flashcards');
    } else if (lowerCommand.includes('exam') || lowerCommand.includes('test') || lowerCommand.includes('परीक्षा')) {
      speakMessage(language === 'hi' ? 'अभ्यास परीक्षा खोल रहा हूं' : 'Opening practice exam');
      navigate('/dashboard/student/practice-exam');
    } else if (lowerCommand.includes('advisor') || lowerCommand.includes('सलाहकार')) {
      speakMessage(language === 'hi' ? 'शैक्षणिक सलाहकार खोल रहा हूं' : 'Opening academic advisor');
      navigate('/dashboard/student/academic-advisor');
    } else if (lowerCommand.includes('feel good') || lowerCommand.includes('break') || lowerCommand.includes('फील गुड')) {
      speakMessage(language === 'hi' ? 'फील गुड कॉर्नर खोल रहा हूं' : 'Opening feel good corner');
      navigate('/dashboard/student/feel-good-corner');
    } else {
      // Default helpful response
      const helpMessage = language === 'hi' 
        ? 'मैं आपकी मदद करने के लिए यहां हूं। आप मुझसे डैशबोर्ड, आज की योजना, या अन्य फीचर्स के बारे में पूछ सकते हैं।'
        : 'I\'m here to help you. You can ask me about dashboard, today\'s plan, or other features.';
      speakMessage(helpMessage);
    }
    
    setIsProcessing(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      stopListening();
    } else if (handsFreeMode) {
      continuousListeningRef.current = true;
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {language === 'hi' ? 'सखा AI सहायक' : 'Sakha AI Assistant'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Status indicators */}
            <div className="flex items-center justify-center gap-4">
              <Badge variant={isListening ? "default" : "secondary"}>
                {isListening ? (language === 'hi' ? 'सुन रहा हूं' : 'Listening') : (language === 'hi' ? 'बंद' : 'Stopped')}
              </Badge>
              {handsFreeMode && (
                <Badge variant="outline">
                  {language === 'hi' ? 'हैंड्स-फ्री मोड' : 'Hands-free Mode'}
                </Badge>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={toggleListening}
                className="flex items-center gap-2"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? (language === 'hi' ? 'रोकें' : 'Stop') : (language === 'hi' ? 'सुनें' : 'Listen')}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className="flex items-center gap-2"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isMuted ? (language === 'hi' ? 'अनम्यूट' : 'Unmute') : (language === 'hi' ? 'म्यूट' : 'Mute')}
              </Button>
            </div>

            {/* Transcript display */}
            {transcript && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">
                  {language === 'hi' ? 'आपने कहा:' : 'You said:'}
                </p>
                <p className="text-sm">{transcript}</p>
                {confidence > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'hi' ? 'विश्वसनीयता:' : 'Confidence:'} {Math.round(confidence * 100)}%
                  </p>
                )}
              </div>
            )}

            {/* Processing indicator */}
            {isProcessing && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'प्रोसेसिंग...' : 'Processing...'}
                </p>
              </div>
            )}

            {/* Quick commands */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {language === 'hi' ? 'कमांड का उदाहरण:' : 'Example commands:'}
              </p>
              <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                <p>• "{language === 'hi' ? 'डैशबोर्ड दिखाओ' : 'Show dashboard'}"</p>
                <p>• "{language === 'hi' ? 'आज की योजना खोलो' : 'Open today\'s plan'}"</p>
                <p>• "{language === 'hi' ? 'अवधारणा कार्ड देखो' : 'Show concept cards'}"</p>
                <p>• "{language === 'hi' ? 'अभ्यास परीक्षा शुरू करो' : 'Start practice exam'}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnifiedVoiceAssistant;
