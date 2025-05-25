
import React, { useState } from 'react';
import { Volume2, Mic, MicOff, Settings, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from 'framer-motion';
import { useUnifiedVoiceAssistant } from '@/hooks/useUnifiedVoiceAssistant';
import { useLanguage } from '@/contexts/LanguageContext';

interface UniversalVoiceAssistantProps {
  userName?: string;
}

const UniversalVoiceAssistant: React.FC<UniversalVoiceAssistantProps> = ({
  userName = 'Student'
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    isListening,
    isSpeaking,
    transcript,
    settings,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    updateSettings
  } = useUnifiedVoiceAssistant(userName);

  const handleLanguageChange = (newLang: 'en' | 'hi') => {
    setLanguage(newLang);
    const message = newLang === 'hi' 
      ? 'हिंदी में बदल गया है।' 
      : 'Language changed to English.';
    speakText(message);
  };

  const handleVoiceChange = (voiceName: string) => {
    const selectedVoice = availableVoices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
      updateSettings({ voice: selectedVoice });
    }
  };

  const testVoice = () => {
    const message = language === 'hi' 
      ? 'नमस्ते! मैं साक्षा AI हूं।' 
      : 'Hello! I am Sakha AI.';
    speakText(message);
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <div className="flex flex-col items-end gap-2">
          {/* Settings Button */}
          <Popover open={showSettings} onOpenChange={setShowSettings}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/90 border-purple-200 hover:bg-purple-50"
              >
                <Settings className="h-4 w-4 text-purple-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Voice Assistant Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Language Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language / भाषा</label>
                    <div className="flex gap-2">
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('en')}
                        className="flex-1"
                      >
                        English
                      </Button>
                      <Button
                        variant={language === 'hi' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('hi')}
                        className="flex-1"
                      >
                        हिंदी
                      </Button>
                    </div>
                  </div>

                  {/* Voice Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Voice</label>
                    <Select
                      value={settings.voice?.name || ''}
                      onValueChange={handleVoiceChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVoices
                          .filter(voice => 
                            language === 'hi' 
                              ? voice.lang.includes('hi') 
                              : voice.lang.includes('en')
                          )
                          .map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                              {voice.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Hands-free Mode */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Hands-free Mode</label>
                    <Switch
                      checked={settings.handsFree}
                      onCheckedChange={(checked) => 
                        updateSettings({ handsFree: checked })
                      }
                    />
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Volume</label>
                    <Slider
                      value={[settings.volume * 100]}
                      onValueChange={(value) => 
                        updateSettings({ volume: value[0] / 100 })
                      }
                      max={100}
                      step={1}
                    />
                  </div>

                  {/* Speech Rate */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Speech Rate</label>
                    <Slider
                      value={[settings.rate * 100]}
                      onValueChange={(value) => 
                        updateSettings({ rate: value[0] / 100 })
                      }
                      min={50}
                      max={200}
                      step={10}
                    />
                  </div>

                  {/* Test Voice Button */}
                  <Button onClick={testVoice} className="w-full" size="sm">
                    Test Voice
                  </Button>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Main Voice Button */}
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`h-14 w-14 rounded-full text-white shadow-lg hover:shadow-xl border-0 relative overflow-hidden group ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700'
            }`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            {isListening ? (
              <MicOff className="h-6 w-6 relative z-10" />
            ) : (
              <Volume2 className="h-6 w-6 relative z-10" />
            )}
            
            {/* Status Indicator */}
            <motion.div
              className={`absolute top-1 right-1 h-3 w-3 rounded-full ${
                isListening ? 'bg-red-400' : isSpeaking ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Ripple effect when listening */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </AnimatePresence>
          </Button>
          
          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
          </motion.div>
        </div>
      </motion.div>

      {/* Transcript Display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            className="fixed bottom-32 right-6 max-w-sm z-40"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <Card className="bg-white/95 backdrop-blur border-purple-200">
              <CardContent className="p-3">
                <p className="text-sm">
                  <span className="font-medium text-purple-600">You said:</span><br />
                  {transcript}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversalVoiceAssistant;
