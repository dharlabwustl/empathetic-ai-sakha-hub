
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Settings, X, Mic, MicOff, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HomePageVoiceAssistantProps {
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({
  language = 'en-US',
  onNavigationCommand
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voiceType, setVoiceType] = useState('female');
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start listening logic here
      console.log('Starting voice recognition...');
    } else {
      // Stop listening logic here
      console.log('Stopping voice recognition...');
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = selectedLanguage;
      speech.volume = volume / 100;
      speech.rate = 0.85 + (speed / 100);
      speech.pitch = 0.75 + (pitch / 100) * 0.5;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => {
        if (voiceType === "female") {
          return voice.name.toLowerCase().includes("female") || 
                !voice.name.toLowerCase().includes("male");
        } else {
          return voice.name.toLowerCase().includes("male");
        }
      });
      
      if (preferredVoices.length > 0) {
        speech.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl"
            onClick={() => setShowSettings(true)}
          >
            <Volume2 className="h-6 w-6 mr-2" />
            <span className="font-medium">Voice Assistant</span>
          </Button>
        </motion.div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Voice Assistant Settings</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    onClick={handleToggleListening}
                    className="w-full"
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isListening ? 'Stop' : 'Listen'}
                  </Button>
                  
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    onClick={handleToggleMute}
                    className="w-full"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    {isMuted ? 'Unmute' : 'Mute'}
                  </Button>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Voice Type */}
                <div className="space-y-2">
                  <Label>Voice Type</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={voiceType === "female"}
                        onCheckedChange={() => setVoiceType("female")}
                      />
                      <Label>Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={voiceType === "male"}
                        onCheckedChange={() => setVoiceType("male")}
                      />
                      <Label>Male</Label>
                    </div>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Volume</Label>
                    <span className="text-sm text-muted-foreground">{volume}%</span>
                  </div>
                  <Slider 
                    value={[volume]}
                    onValueChange={(values) => setVolume(values[0])}
                    max={100}
                    step={1}
                  />
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Speaking Speed</Label>
                    <span className="text-sm text-muted-foreground">{speed}%</span>
                  </div>
                  <Slider 
                    value={[speed]}
                    onValueChange={(values) => setSpeed(values[0])}
                    max={100}
                    step={1}
                  />
                </div>

                {/* Pitch Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Voice Pitch</Label>
                    <span className="text-sm text-muted-foreground">{pitch}%</span>
                  </div>
                  <Slider 
                    value={[pitch]}
                    onValueChange={(values) => setPitch(values[0])}
                    max={100}
                    step={1}
                  />
                </div>

                {/* Test Voice */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => speakMessage("Hello! I'm Sakha AI, your voice assistant for PREP-zer. How can I help you today?")}
                >
                  Test Voice
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default HomePageVoiceAssistant;
