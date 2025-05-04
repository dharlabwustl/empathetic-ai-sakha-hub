
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_VOICE_SETTINGS, VoiceSettings, LANGUAGE_OPTIONS } from '@/components/dashboard/student/voice/voiceUtils';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

const VoiceSettingsTab = () => {
  const {
    voiceSettings,
    updateVoiceSettings,
    testVoice,
    isVoiceSupported,
    supportedLanguages
  } = useVoiceAnnouncer();
  
  const [localSettings, setLocalSettings] = useState<VoiceSettings>(voiceSettings);
  const [testingSample, setTestingSample] = useState(false);
  
  // Handle changes and save
  const handleChange = <K extends keyof VoiceSettings>(key: K, value: VoiceSettings[K]) => {
    setLocalSettings(prev => {
      const updated = { ...prev, [key]: value };
      updateVoiceSettings(updated);
      return updated;
    });
  };
  
  // Handle test voice button click
  const handleTestVoice = () => {
    setTestingSample(true);
    testVoice();
    setTimeout(() => setTestingSample(false), 3000);
  };

  // Get language name from code
  const getLanguageName = (code: string) => {
    const language = LANGUAGE_OPTIONS.find(lang => lang.value === code);
    return language ? language.label : code;
  };
  
  if (!isVoiceSupported) {
    return (
      <div className="py-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>Configure how PREPZR speaks to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="text-amber-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Voice Not Supported</h3>
              <p className="text-muted-foreground">
                Your browser doesn't support the speech synthesis feature needed for the PREPZR Voice Announcer.
                Try using a modern browser like Chrome, Edge, or Safari.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>Configure how PREPZR speaks to you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable/Disable Voice */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice-enabled" className="text-base">Voice Assistant</Label>
              <p className="text-sm text-muted-foreground">Enable or disable the PREPZR voice assistant</p>
            </div>
            <Switch 
              id="voice-enabled"
              checked={localSettings.enabled}
              onCheckedChange={(checked) => handleChange('enabled', checked)}
            />
          </div>
          
          {/* Language Selection */}
          <div className="space-y-2">
            <Label htmlFor="voice-language">Language</Label>
            <Select 
              value={localSettings.language} 
              onValueChange={(value) => handleChange('language', value as SupportedLanguage)}
            >
              <SelectTrigger id="voice-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {localSettings.language === 'hi-IN' && (
              <p className="text-xs text-muted-foreground mt-1">
                हिंदी भाषा चुनी गई है। आवाज़ सहायक अब हिंदी में बात करेगा।
              </p>
            )}
          </div>
          
          {/* Volume Control */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="voice-volume" className="mb-2 block">Volume</Label>
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                </svg>
                <Slider
                  id="voice-volume"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[localSettings.volume]}
                  onValueChange={(values) => handleChange('volume', values[0])}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </div>
            </div>
            
            {/* Speed Control */}
            <div>
              <Label htmlFor="voice-speed" className="mb-2 block">Speech Rate</Label>
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <Slider
                  id="voice-speed"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[localSettings.rate]}
                  onValueChange={(values) => handleChange('rate', values[0])}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
            </div>
            
            {/* Pitch Control */}
            <div>
              <Label htmlFor="voice-pitch" className="mb-2 block">Voice Pitch</Label>
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <Slider
                  id="voice-pitch"
                  min={0.8}
                  max={2}
                  step={0.1}
                  value={[localSettings.pitch]}
                  onValueChange={(values) => handleChange('pitch', values[0])}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <polyline points="4 7 10 7 10 1" />
                  <polyline points="20 17 14 17 14 23" />
                  <line x1="14" y1="17" x2="21" y2="10" />
                  <line x1="3" y1="14" x2="10" y2="7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Current settings summary */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md text-sm">
            <p>Current voice: <strong>{getLanguageName(localSettings.language)}</strong></p>
            <p>Volume: <strong>{Math.round(localSettings.volume * 100)}%</strong></p>
            <p>Speech rate: <strong>{localSettings.rate.toFixed(1)}x</strong></p>
            <p>Pitch: <strong>{localSettings.pitch.toFixed(1)}</strong></p>
          </div>
          
          {/* Test Voice Button */}
          <Button 
            onClick={handleTestVoice} 
            className="w-full"
            disabled={testingSample}
          >
            {testingSample ? "Playing voice sample..." : "Test Voice"}
          </Button>
          
          {/* Language-specific note */}
          {localSettings.language === 'hi-IN' && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
              <p className="font-medium mb-1">हिंदी भाषा टिप्पणी:</p>
              <p>हिंदी भाषा सहायता आपके ब्राउज़र पर निर्भर करती है। अगर आपको हिंदी आवाज़ नहीं सुनाई देती, तो कृपया अपने ब्राउज़र को अपडेट करें।</p>
              <p className="mt-2 text-xs text-muted-foreground">(Note: Hindi language support depends on your browser. If you don't hear Hindi voice, please update your browser.)</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettingsTab;
