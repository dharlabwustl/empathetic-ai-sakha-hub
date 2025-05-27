
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Settings, X, Volume2, VolumeX, Brain, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface EnhancedHomePageAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const EnhancedHomePageAssistant: React.FC<EnhancedHomePageAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const recognitionRef = useRef<any>(null);
  const hasSpokenGreetingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
  }, [language]);

  // Initial greeting - only once per session with session storage check
  useEffect(() => {
    const hasGreetedThisSession = sessionStorage.getItem('voice_assistant_greeted');
    
    if (hasInitializedRef.current || hasSpokenGreetingRef.current || hasGreetedThisSession) {
      return;
    }
    
    const speakGreeting = () => {
      if (!isVoiceEnabled || isMuted || hasSpokenGreetingRef.current) return;
      
      const greeting = `Welcome to PREPZR! I'm Sakha AI, your intelligent study companion. I'm here to help you navigate your learning journey. You can ask me to take you to different sections like dashboard, concepts, flashcards, or practice exams.`;
      
      speakWithFemaleVoice(
        greeting,
        { volume, rate: 0.95, pitch: 1.1 },
        () => {
          setIsSpeaking(true);
          hasSpokenGreetingRef.current = true;
          sessionStorage.setItem('voice_assistant_greeted', 'true');
          console.log('🔊 Home Voice Assistant: Started speaking initial greeting');
        },
        () => {
          setIsSpeaking(false);
          console.log('🔇 Home Voice Assistant: Finished speaking');
        }
      );
    };

    const timer = setTimeout(() => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        speakGreeting();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVoiceEnabled, isMuted, volume]);

  const processVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('dashboard')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
        speakWithFemaleVoice("Taking you to the dashboard", { volume });
      }
    } else if (command.includes('concept')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
        speakWithFemaleVoice("Opening concepts section", { volume });
      }
    } else if (command.includes('flashcard')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
        speakWithFemaleVoice("Opening flashcards section", { volume });
      }
    } else if (command.includes('practice') || command.includes('exam')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
        speakWithFemaleVoice("Opening practice exams", { volume });
      }
    } else {
      speakWithFemaleVoice(`I heard you say: ${transcript}. Try saying "go to dashboard" or "open concepts"`, { volume });
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  };

  const testVoice = () => {
    speakWithFemaleVoice(
      `Hello ${userName}, this is your PREPZR voice assistant test. I'm working perfectly!`,
      { volume },
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setShowPanel(!showPanel)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:shadow-xl relative overflow-hidden group"
        >
          {/* Enhanced vibration/wave effect when speaking */}
          {isSpeaking && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.1, 0.4]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.3, 0.05, 0.3]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0.03, 0.2]
                }}
                transition={{
                  duration: 1.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </>
          )}
          
          {/* Pulse animation background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <Brain className="h-6 w-6 text-white mb-1" />
            <motion.span 
              className="text-[10px] font-bold text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: isSpeaking ? [1, 1.3, 1] : [1, 1.1, 1]
              }}
              transition={{ 
                backgroundPosition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: isSpeaking ? 0.4 : 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                backgroundSize: '200% auto'
              }}
            >
              AI
            </motion.span>
          </div>

          {/* Enhanced speaking wave indicator */}
          {isSpeaking && (
            <motion.div
              className="absolute inset-0 rounded-full border-3 border-yellow-400"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.2, 1],
                borderWidth: ['3px', '1px', '3px']
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </Button>
      </motion.div>

      {/* Voice Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80"
          >
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Voice Assistant
                    <motion.span 
                      className="text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text font-extrabold"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% auto'
                      }}
                    >
                      AI
                    </motion.span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={startListening}
                    disabled={isListening}
                    className={`flex items-center gap-2 ${isListening ? 'bg-red-500' : 'bg-blue-500'}`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isListening ? 'Listening...' : 'Start Voice Command'}
                  </Button>
                </div>

                {transcript && (
                  <div className="p-2 bg-gray-100 rounded text-sm">
                    <strong>You said:</strong> {transcript}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Voice Enabled</p>
                    <p className="text-xs text-muted-foreground">
                      Toggle voice assistant on or off
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  >
                    {isVoiceEnabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mute Voice</p>
                    <p className="text-xs text-muted-foreground">
                      Mute or unmute voice responses
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Volume</p>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={testVoice}
                  className="w-full"
                >
                  Test Voice
                </Button>

                <div className="text-xs text-gray-500">
                  <p className="font-medium mb-1">Try saying:</p>
                  <ul className="space-y-1">
                    <li>• "Go to dashboard"</li>
                    <li>• "Open concepts"</li>
                    <li>• "Show flashcards"</li>
                    <li>• "Start practice exam"</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedHomePageAssistant;
