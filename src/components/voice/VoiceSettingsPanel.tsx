
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  Languages,
  User,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceSettings } from '@/types/voice';

interface VoiceSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onSettingsChange: (settings: Partial<VoiceSettings>) => void;
  availableVoices: SpeechSynthesisVoice[];
  userName?: string;
}

const VoiceSettingsPanel: React.FC<VoiceSettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  availableVoices,
  userName = 'Student'
}) => {
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const handleTestVoice = () => {
    if ('speechSynthesis' in window && !isTestingVoice) {
      setIsTestingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        `Hello ${userName}! I'm your AI study assistant. This is how I sound with the current settings.`
      );
      
      if (settings.voice) {
        utterance.voice = settings.voice;
      }
      utterance.volume = settings.volume;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      
      utterance.onend = () => setIsTestingVoice(false);
      utterance.onerror = () => setIsTestingVoice(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const femaleVoices = availableVoices.filter(voice => 
    voice.name.toLowerCase().includes('female') ||
    voice.name.toLowerCase().includes('zira') ||
    voice.name.toLowerCase().includes('samantha') ||
    (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
  );

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'Hindi (India)' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Voice Assistant Settings
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Control */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Voice Control</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      <span>Voice Assistant</span>
                    </div>
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={(enabled) => onSettingsChange({ enabled })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      <span>Speech Recognition</span>
                    </div>
                    <Switch
                      checked={!settings.muted}
                      onCheckedChange={(unmuted) => onSettingsChange({ muted: !unmuted })}
                    />
                  </div>
                </div>

                {/* Voice Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Voice Settings</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Volume: {Math.round(settings.volume * 100)}%</label>
                      <Slider
                        value={[settings.volume]}
                        onValueChange={([volume]) => onSettingsChange({ volume })}
                        max={1}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Speed: {settings.rate}x</label>
                      <Slider
                        value={[settings.rate]}
                        onValueChange={([rate]) => onSettingsChange({ rate })}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Pitch: {settings.pitch}</label>
                      <Slider
                        value={[settings.pitch]}
                        onValueChange={([pitch]) => onSettingsChange({ pitch })}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Voice Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Voice Selection</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {femaleVoices.slice(0, 6).map((voice, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          settings.voice?.name === voice.name
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => onSettingsChange({ voice })}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{voice.name}</p>
                            <p className="text-sm text-gray-600">{voice.lang}</p>
                          </div>
                          {settings.voice?.name === voice.name && (
                            <Badge variant="default">Selected</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Language</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang) => (
                      <div
                        key={lang.code}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          settings.language === lang.code
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => onSettingsChange({ language: lang.code })}
                      >
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          <span className="text-sm">{lang.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test Voice */}
                <div className="pt-4 border-t">
                  <Button
                    onClick={handleTestVoice}
                    disabled={!settings.enabled || isTestingVoice}
                    className="w-full"
                  >
                    {isTestingVoice ? 'Testing Voice...' : 'Test Voice'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceSettingsPanel;
