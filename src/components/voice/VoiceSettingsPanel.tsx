
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Play, 
  User,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  voice: string;
  autoGreeting: boolean;
  contextAware: boolean;
}

interface VoiceSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onSettingsChange: (settings: VoiceSettings) => void;
  onTestVoice: () => void;
}

const VoiceSettingsPanel: React.FC<VoiceSettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onTestVoice
}) => {
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const handleTestVoice = async () => {
    setIsTestingVoice(true);
    await onTestVoice();
    setTimeout(() => setIsTestingVoice(false), 2000);
  };

  const updateSetting = (key: keyof VoiceSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const availableVoices = [
    { id: 'aria', name: 'Aria (Female)', type: 'female' },
    { id: 'sarah', name: 'Sarah (Female)', type: 'female' },
    { id: 'charlotte', name: 'Charlotte (Female)', type: 'female' },
    { id: 'alice', name: 'Alice (Female)', type: 'female' },
    { id: 'matilda', name: 'Matilda (Female)', type: 'female' },
    { id: 'lily', name: 'Lily (Female)', type: 'female' }
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
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b">
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                Voice Assistant Settings
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Voice Assistant Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Voice Assistant</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Turn on Sakha AI voice assistance
                  </p>
                </div>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(checked) => updateSetting('enabled', checked)}
                />
              </div>

              {settings.enabled && (
                <>
                  {/* Voice Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <h4 className="font-medium">Voice Selection</h4>
                    </div>
                    <Select
                      value={settings.voice}
                      onValueChange={(value) => updateSetting('voice', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVoices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center gap-2">
                              {voice.name}
                              <Badge variant="outline" className="text-xs">
                                {voice.type}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <h4 className="font-medium">Language</h4>
                    </div>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => updateSetting('language', value)}
                    >
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

                  {/* Volume Control */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {settings.volume > 0 ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                      <h4 className="font-medium">Volume</h4>
                      <span className="text-sm text-gray-600 ml-auto">
                        {Math.round(settings.volume * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([value]) => updateSetting('volume', value)}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Speaking Rate */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Speaking Rate</h4>
                      <span className="text-sm text-gray-600 ml-auto">
                        {settings.rate}x
                      </span>
                    </div>
                    <Slider
                      value={[settings.rate]}
                      onValueChange={([value]) => updateSetting('rate', value)}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Advanced Options</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Auto Greeting</p>
                        <p className="text-xs text-gray-600">
                          Automatically greet when entering pages
                        </p>
                      </div>
                      <Switch
                        checked={settings.autoGreeting}
                        onCheckedChange={(checked) => updateSetting('autoGreeting', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Context Aware</p>
                        <p className="text-xs text-gray-600">
                          Provide context-specific assistance
                        </p>
                      </div>
                      <Switch
                        checked={settings.contextAware}
                        onCheckedChange={(checked) => updateSetting('contextAware', checked)}
                      />
                    </div>
                  </div>

                  {/* Test Voice Button */}
                  <Button
                    onClick={handleTestVoice}
                    disabled={isTestingVoice}
                    className="w-full"
                    variant="outline"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isTestingVoice ? 'Testing Voice...' : 'Test Voice'}
                  </Button>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceSettingsPanel;
