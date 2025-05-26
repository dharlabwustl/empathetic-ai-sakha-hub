
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Volume2, Mic, Languages, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceAssistantSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
  availableVoices: SpeechSynthesisVoice[];
}

const VoiceAssistantSettings: React.FC<VoiceAssistantSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  availableVoices
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleVolumeChange = (value: number[]) => {
    handleSettingChange('volume', value[0]);
  };

  const handleRateChange = (value: number[]) => {
    handleSettingChange('rate', value[0]);
  };

  const handlePitchChange = (value: number[]) => {
    handleSettingChange('pitch', value[0]);
  };

  const testVoice = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Hello! This is a test of your voice settings for prep, zer AI assistant.");
      
      if (localSettings.voice) {
        utterance.voice = localSettings.voice;
      }
      utterance.volume = localSettings.volume || 0.8;
      utterance.rate = localSettings.rate || 1.0;
      utterance.pitch = localSettings.pitch || 1.0;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">Voice Assistant Settings</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    ×
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customize your PREPZR AI voice experience
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Enable/Disable Voice Assistant */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Voice Assistant</span>
                  </div>
                  <Switch
                    checked={localSettings.enabled}
                    onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
                  />
                </div>

                {/* Mute/Unmute */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Voice Responses</span>
                  </div>
                  <Switch
                    checked={!localSettings.muted}
                    onCheckedChange={(checked) => handleSettingChange('muted', !checked)}
                  />
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Volume</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((localSettings.volume || 0.8) * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[localSettings.volume || 0.8]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Speech Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Speech Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {localSettings.rate || 1.0}x
                    </span>
                  </div>
                  <Slider
                    value={[localSettings.rate || 1.0]}
                    onValueChange={handleRateChange}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Pitch Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Pitch</span>
                    <span className="text-sm text-muted-foreground">
                      {localSettings.pitch || 1.0}
                    </span>
                  </div>
                  <Slider
                    value={[localSettings.pitch || 1.0]}
                    onValueChange={handlePitchChange}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">Voice</span>
                  </div>
                  <Select
                    value={localSettings.voice?.name || ""}
                    onValueChange={(voiceName) => {
                      const selectedVoice = availableVoices.find(v => v.name === voiceName);
                      handleSettingChange('voice', selectedVoice);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <span className="font-medium text-sm">Recognition Language</span>
                  <Select
                    value={localSettings.language || "en-US"}
                    onValueChange={(language) => handleSettingChange('language', language)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-IN">English (India)</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Auto-restart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Auto-restart Listening</span>
                  </div>
                  <Switch
                    checked={localSettings.autoRestart}
                    onCheckedChange={(checked) => handleSettingChange('autoRestart', checked)}
                  />
                </div>

                {/* Test Voice Button */}
                <Button 
                  onClick={testVoice}
                  className="w-full"
                  variant="outline"
                >
                  Test Voice Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistantSettings;
