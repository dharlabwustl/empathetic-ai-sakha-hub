
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UnifiedVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  language?: string;
  context?: string;
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
  
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    };
  }, []);

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
    speech.lang = language;
    speech.volume = volume / 100;
    speech.rate = 0.85 + (speed / 100);
    speech.pitch = 0.75 + (pitch / 100) * 0.5;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support voice commands",
        variant: "destructive"
      });
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase().trim();
        setTranscript(result);
        handleVoiceCommand(result);
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
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register')) {
      navigate('/signup');
      speakMessage('Taking you to the sign up page.');
    } else if (command.includes('login') || command.includes('log in')) {
      navigate('/login');
      speakMessage('Taking you to the login page.');
    } else if (command.includes('dashboard') || command.includes('home dashboard')) {
      navigate('/dashboard/student');
      speakMessage('Opening your dashboard.');
    } else if (command.includes('concepts') || command.includes('concept cards')) {
      navigate('/dashboard/student/concepts');
      speakMessage('Opening concept cards for your study.');
    } else if (command.includes('flashcards') || command.includes('flash cards')) {
      navigate('/dashboard/student/flashcards');
      speakMessage('Opening flashcards for quick revision.');
    } else if (command.includes('practice exam') || command.includes('exam')) {
      navigate('/dashboard/student/practice-exam');
      speakMessage('Opening practice exams to test your knowledge.');
    } else if (command.includes('today') || command.includes('study plan') || command.includes('todays plan')) {
      navigate('/dashboard/student/today');
      speakMessage('Opening your personalized study plan for today.');
    } else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment')) {
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your exam readiness analysis.');
    } else if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = getContextualHelp();
      speakMessage(helpMessage);
    } else if (command.includes('features') || command.includes('what is prepzr')) {
      const featuresMessage = `PREP-zer is India's first emotionally intelligent exam preparation platform. We provide AI-powered personalized study plans, adaptive concept cards, interactive flashcards, practice exams, and emotional support for competitive exams like JEE, NEET, UPSC, and CAT.`;
      speakMessage(featuresMessage);
    } else if (command.includes('mute') || command.includes('stop talking')) {
      setIsMuted(true);
      speakMessage('Voice assistant muted.');
    } else {
      const contextResponse = getContextualResponse(command);
      speakMessage(contextResponse);
    }
  };

  const getContextualHelp = () => {
    if (location.pathname === '/') {
      return `I can help you navigate PREP-zer. Try saying: Sign up, Login, Demo, Analyze readiness, or ask me about our features.`;
    } else if (location.pathname.includes('/dashboard')) {
      return `I can help you with your dashboard. Say things like: Open concepts, Show flashcards, Start practice exam, Today's plan, or ask about any study feature.`;
    }
    return `I'm here to help you with PREP-zer. Ask me about features, navigation, or study assistance.`;
  };

  const getContextualResponse = (command: string) => {
    const responses = [
      "I didn't catch that. Try saying 'Help' to hear what I can do for you.",
      "Could you repeat that? You can ask about features, navigation, or study assistance.",
      "I'm not sure about that command. Say 'Help' for available options."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Sakha AI Voice Assistant</DialogTitle>
          <DialogDescription>
            PREPZR's intelligent voice companion for seamless study support
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Voice Controls */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Microphone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "secondary"}
                  className="w-full"
                >
                  {isListening ? (
                    <><MicOff className="mr-2 h-4 w-4" /> Stop</>
                  ) : (
                    <><Mic className="mr-2 h-4 w-4" /> Listen</>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Speaker</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={toggleMute}
                  variant="outline"
                  className="w-full"
                >
                  {isMuted ? (
                    <><VolumeX className="mr-2 h-4 w-4" /> Unmute</>
                  ) : (
                    <><Volume2 className="mr-2 h-4 w-4" /> Mute</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm"><strong>You said:</strong> {transcript}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Volume</Label>
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={1}
                  value={[volume]}
                  onValueChange={(values) => setVolume(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Speed</Label>
                  <span className="text-sm text-muted-foreground">{speed}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={1}
                  value={[speed]}
                  onValueChange={(values) => setSpeed(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Pitch</Label>
                  <span className="text-sm text-muted-foreground">{pitch}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={1}
                  value={[pitch]}
                  onValueChange={(values) => setPitch(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Voice Preference</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={voicePreference === "female"}
                      onCheckedChange={() => setVoicePreference("female")}
                    />
                    <Label>Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={voicePreference === "male"}
                      onCheckedChange={() => setVoicePreference("male")}
                    />
                    <Label>Male</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Voice Commands Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Try Saying:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>"Open concepts" or "Show flashcards"</li>
                <li>"Start practice exam" or "Today's plan"</li>
                <li>"Sign up" or "Login"</li>
                <li>"What is PREPZR?" or "Help"</li>
                <li>"Analyze my readiness"</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedVoiceAssistant;
