
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface SpeechRecognitionButtonProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  position = 'homepage',
  onCommand,
  className = ''
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last];
        
        if (result.isFinal) {
          const command = result[0].transcript.trim();
          if (onCommand) {
            onCommand(command);
          }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getPositionClasses = () => {
    return position === 'homepage' 
      ? 'fixed bottom-24 right-6 z-50' 
      : 'fixed bottom-24 right-6 z-50';
  };

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleListening}
          className={`rounded-full w-12 h-12 shadow-lg border-2 border-white dark:border-gray-800 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
          }`}
          size="sm"
        >
          {isListening ? (
            <MicOff className="h-5 w-5 text-white" />
          ) : (
            <Mic className="h-5 w-5 text-white" />
          )}
        </Button>
      </motion.div>

      {/* Settings Panel */}
      <Drawer open={showSettings} onOpenChange={setShowSettings}>
        <DrawerContent className="max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Speech Recognition Settings</DrawerTitle>
            <DrawerDescription>
              Configure your speech recognition and voice feedback preferences.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 space-y-6">
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
                      <><MicOff className="mr-2 h-4 w-4" /> Stop Listening</>
                    ) : (
                      <><Mic className="mr-2 h-4 w-4" /> Start Listening</>
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
                    onClick={() => setIsMuted(!isMuted)}
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
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Voice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="voice-volume">Volume</Label>
                    <span className="text-sm text-muted-foreground">{volume}%</span>
                  </div>
                  <Slider 
                    id="voice-volume"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[volume]}
                    onValueChange={(values) => setVolume(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="voice-speed">Speaking Speed</Label>
                    <span className="text-sm text-muted-foreground">{speed}%</span>
                  </div>
                  <Slider 
                    id="voice-speed"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[speed]}
                    onValueChange={(values) => setSpeed(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Voice Preference</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="voice-male"
                        checked={voicePreference === "male"}
                        onCheckedChange={() => setVoicePreference("male")}
                      />
                      <Label htmlFor="voice-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="voice-female"
                        checked={voicePreference === "female"}
                        onCheckedChange={() => setVoicePreference("female")}
                      />
                      <Label htmlFor="voice-female">Female</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SpeechRecognitionButton;
