
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mic, MicOff, Volume2, VolumeX, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import { useLocation, useNavigate } from 'react-router-dom';

interface HomePageFloatingVoiceAssistantProps {
  userName?: string;
}

const HomePageFloatingVoiceAssistant: React.FC<HomePageFloatingVoiceAssistantProps> = ({
  userName = 'Student'
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    updateSettings,
    toggleMute,
    toggleEnabled
  } = useVoiceAssistant({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      rate: 0.9,
      pitch: 1.1,
      volume: 0.8,
      language: 'en-US'
    }
  });

  // Enhanced greeting based on page
  const getContextualGreeting = () => {
    const timeGreeting = new Date().getHours() < 12 ? 'Good morning' : 
                        new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';
    
    if (location.pathname === '/') {
      return `${timeGreeting}! Welcome to PREPZR, the world's first emotionally intelligent exam preparation platform. I'm Sakha AI, your adaptive learning companion. I can help you navigate our features or answer questions. Try saying "Sign up", "Take demo", or "Learn more about features".`;
    } else if (location.pathname.includes('/signup')) {
      return `${timeGreeting}! Welcome to PREPZR signup. I'm here to assist you through the registration process. You can use voice commands to navigate or ask me questions anytime.`;
    } else if (location.pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREPZR. I can help you access your dashboard or try our demo features.`;
    }
    
    return `${timeGreeting}! I'm Sakha AI, your PREPZR voice assistant. How can I help you today?`;
  };

  // Handle voice commands
  useEffect(() => {
    if (transcript) {
      const command = transcript.toLowerCase();
      
      if (command.includes('sign up') || command.includes('signup')) {
        navigate('/signup');
        speakText('Taking you to the signup page.');
      } else if (command.includes('login') || command.includes('log in')) {
        navigate('/login');
        speakText('Opening the login page.');
      } else if (command.includes('demo') || command.includes('try demo')) {
        navigate('/login');
        speakText('Opening demo access for you.');
      } else if (command.includes('home') || command.includes('go home')) {
        navigate('/');
        speakText('Going to home page.');
      } else if (command.includes('features') || command.includes('what can prepzr do')) {
        speakText('PREPZR offers personalized study plans, emotional AI support, adaptive learning paths, concept cards, flashcards, practice exams, and academic advisory features.');
      } else if (command.includes('help') || command.includes('what can you do')) {
        speakText('I can help you navigate PREPZR, explain features, or assist with voice commands like "Sign up", "Login", "Demo", or "Features".');
      }
    }
  }, [transcript]);

  // Initial greeting
  useEffect(() => {
    if (!hasGreeted && settings.enabled && !settings.muted) {
      const timer = setTimeout(() => {
        speakText(getContextualGreeting());
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [settings.enabled, settings.muted, hasGreeted, location.pathname]);

  // Filter voices for better quality
  const getFilteredVoices = () => {
    const englishVoices = availableVoices.filter(voice => 
      voice.lang.includes('en') && 
      !voice.name.toLowerCase().includes('novelty') &&
      !voice.name.toLowerCase().includes('bad')
    );
    
    // Prefer US English voices for better PREPZR pronunciation
    const usVoices = englishVoices.filter(voice => voice.lang.includes('en-US'));
    return usVoices.length > 0 ? usVoices : englishVoices;
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : isSpeaking
                ? 'bg-blue-500 hover:bg-blue-600 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
          >
            {settings.muted ? (
              <VolumeX className="h-6 w-6 text-white" />
            ) : isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
          
          {/* Status indicator */}
          <div className="absolute -top-2 -right-2">
            <Badge variant={settings.enabled ? 'default' : 'secondary'} className="text-xs px-1 py-0">
              {settings.enabled ? 'ON' : 'OFF'}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-80 shadow-xl border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Voice Assistant Settings
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowSettings(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Voice Assistant</span>
                  <Switch 
                    checked={settings.enabled} 
                    onCheckedChange={toggleEnabled}
                  />
                </div>

                {/* Mute/Unmute */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Audio Output</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMute}
                    className="flex items-center gap-2"
                  >
                    {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    {settings.muted ? 'Muted' : 'Active'}
                  </Button>
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice Type</label>
                  <Select 
                    value={settings.voice?.name || ''} 
                    onValueChange={(value) => {
                      const voice = availableVoices.find(v => v.name === value);
                      if (voice) updateSettings({ voice });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilteredVoices().map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Speech Speed</label>
                  <Slider
                    value={[settings.rate]}
                    onValueChange={([value]) => updateSettings({ rate: value })}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 text-center">{settings.rate.toFixed(1)}x</div>
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volume</label>
                  <Slider
                    value={[settings.volume]}
                    onValueChange={([value]) => updateSettings({ volume: value })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 text-center">{Math.round(settings.volume * 100)}%</div>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 border-t space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    disabled={!settings.enabled || settings.muted}
                    className="w-full"
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                  </Button>
                  
                  {transcript && (
                    <div className="text-xs p-2 bg-gray-100 rounded">
                      <strong>Last command:</strong> {transcript}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePageFloatingVoiceAssistant;
