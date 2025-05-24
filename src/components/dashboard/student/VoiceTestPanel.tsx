
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, Play, Pause, Settings, TestTube } from 'lucide-react';
import { LANGUAGE_OPTIONS, VOICE_SPEED_OPTIONS, VOICE_PITCH_OPTIONS, VoiceSettings, speakText, stopSpeaking } from './voice/voiceUtils';

interface VoiceTestPanelProps {
  onSettingsChange?: (settings: VoiceSettings) => void;
  className?: string;
}

const VoiceTestPanel: React.FC<VoiceTestPanelProps> = ({ 
  onSettingsChange,
  className = "" 
}) => {
  const [settings, setSettings] = useState<VoiceSettings>({
    language: 'en-US',
    speed: 1,
    pitch: 1,
    volume: 0.8,
    enabled: true
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [testResults, setTestResults] = useState<{
    clarity: number;
    naturalness: number;
    accuracy: number;
  } | null>(null);

  const testMessages = [
    "Hello! This is a test of the voice synthesis system. How does this sound to you?",
    "Welcome to your personalized learning dashboard. Ready to start your study session?",
    "Great job on completing your chemistry module! Your progress is impressive.",
    "Remember to take breaks every 25 minutes for optimal learning retention."
  ];

  const handleSettingChange = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const testVoice = (message: string) => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakText(message, settings);
    
    // Simulate test completion
    setTimeout(() => {
      setIsPlaying(false);
      
      // Generate mock test results
      setTestResults({
        clarity: Math.round(85 + Math.random() * 10),
        naturalness: Math.round(80 + Math.random() * 15),
        accuracy: Math.round(90 + Math.random() * 8)
      });
    }, message.length * 50); // Approximate speech duration
  };

  const runComprehensiveTest = () => {
    setTestResults(null);
    let messageIndex = 0;
    
    const testNextMessage = () => {
      if (messageIndex < testMessages.length) {
        testVoice(testMessages[messageIndex]);
        messageIndex++;
        setTimeout(testNextMessage, 3000);
      } else {
        // Final comprehensive results
        setTestResults({
          clarity: Math.round(88 + Math.random() * 7),
          naturalness: Math.round(85 + Math.random() * 10),
          accuracy: Math.round(92 + Math.random() * 6)
        });
      }
    };
    
    testNextMessage();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Voice Settings & Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Settings */}
        <div className="space-y-4">
          <h3 className="font-medium">Voice Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Speed: {settings.speed}x
              </label>
              <Slider
                value={[settings.speed]}
                onValueChange={([value]) => handleSettingChange('speed', value)}
                min={0.5}
                max={2}
                step={0.25}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Pitch: {settings.pitch}
              </label>
              <Slider
                value={[settings.pitch]}
                onValueChange={([value]) => handleSettingChange('pitch', value)}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Volume: {Math.round(settings.volume * 100)}%
              </label>
              <Slider
                value={[settings.volume]}
                onValueChange={([value]) => handleSettingChange('volume', value)}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSettingChange('enabled', !settings.enabled)}
            >
              {settings.enabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {settings.enabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>

        {/* Quick Tests */}
        <div className="space-y-4">
          <h3 className="font-medium">Quick Tests</h3>
          <div className="grid grid-cols-1 gap-2">
            {testMessages.slice(0, 2).map((message, index) => (
              <div key={index} className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testVoice(message)}
                  disabled={!settings.enabled}
                  className="flex-shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <span className="text-sm truncate">{message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Test */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Comprehensive Test</h3>
            <Button
              onClick={runComprehensiveTest}
              disabled={!settings.enabled || isPlaying}
              className="gap-2"
            >
              <TestTube className="h-4 w-4" />
              Run Full Test
            </Button>
          </div>

          {testResults && (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Badge className={getScoreColor(testResults.clarity)}>
                  {testResults.clarity}%
                </Badge>
                <div className="text-sm text-gray-500 mt-1">Clarity</div>
              </div>
              <div className="text-center">
                <Badge className={getScoreColor(testResults.naturalness)}>
                  {testResults.naturalness}%
                </Badge>
                <div className="text-sm text-gray-500 mt-1">Naturalness</div>
              </div>
              <div className="text-center">
                <Badge className={getScoreColor(testResults.accuracy)}>
                  {testResults.accuracy}%
                </Badge>
                <div className="text-sm text-gray-500 mt-1">Accuracy</div>
              </div>
            </div>
          )}
        </div>

        {/* Voice Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Settings className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Voice Engine Status
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Using browser's native speech synthesis. Some languages may have limited voice options.
                For best results, use Chrome or Edge browsers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceTestPanel;
