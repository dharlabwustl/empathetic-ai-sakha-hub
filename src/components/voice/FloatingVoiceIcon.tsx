
import React, { useState } from 'react';
import { Volume2, Settings, Mic, Speaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUnifiedVoice } from '@/components/dashboard/student/voice/UnifiedVoiceManager';

interface FloatingVoiceIconProps {
  userName?: string;
}

const FloatingVoiceIcon: React.FC<FloatingVoiceIconProps> = ({ userName }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    isSpeaking, 
    isEnabled, 
    voiceSettings, 
    updateVoiceSettings, 
    speakMessage,
    stopSpeaking
  } = useUnifiedVoice();

  const testVoice = () => {
    const testMessage = `Hello ${userName || 'Student'}! This is Sakha AI, your voice assistant. I'm here to help you with your studies and guide you through your learning journey.`;
    speakMessage(testMessage, 'high');
  };

  const handleVoiceTypeChange = (value: string) => {
    updateVoiceSettings({ voiceType: value as 'female' | 'male' | 'auto' });
  };

  const handleLanguageChange = (value: string) => {
    updateVoiceSettings({ language: value });
  };

  return (
    <>
      {/* Floating Voice Icon - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Sheet open={showSettings} onOpenChange={setShowSettings}>
                <SheetTrigger asChild>
                  <Button
                    className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    size="icon"
                  >
                    <Volume2 className="h-6 w-6 text-white" />
                    <span className={`absolute top-0 right-0 h-3 w-3 rounded-full ${
                      isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    } ${isEnabled ? '' : 'bg-gray-500'}`}></span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Voice Assistant Settings
                    </SheetTitle>
                    <SheetDescription>
                      Customize your Sakha AI voice assistant experience
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    {/* Voice Status */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Voice Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-enabled">Voice Assistant</Label>
                          <Switch
                            id="voice-enabled"
                            checked={isEnabled}
                            onCheckedChange={(checked) => updateVoiceSettings({ enabled: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-muted">Mute Voice</Label>
                          <Switch
                            id="voice-muted"
                            checked={voiceSettings.muted}
                            onCheckedChange={(checked) => updateVoiceSettings({ muted: checked })}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`h-2 w-2 rounded-full ${
                            isSpeaking ? 'bg-red-500 animate-pulse' : 
                            isEnabled ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                          <span>{isSpeaking ? 'Speaking...' : isEnabled ? 'Ready' : 'Disabled'}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Voice Settings */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Voice Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Announcer Type</Label>
                          <Select value={voiceSettings.voiceType} onValueChange={handleVoiceTypeChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Female Voice</SelectItem>
                              <SelectItem value="male">Male Voice</SelectItem>
                              <SelectItem value="auto">Auto Select</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select value={voiceSettings.language} onValueChange={handleLanguageChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="en-IN">English (India)</SelectItem>
                              <SelectItem value="en-GB">English (UK)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Speech Rate: {voiceSettings.rate.toFixed(1)}x</Label>
                          <Slider
                            value={[voiceSettings.rate]}
                            onValueChange={([value]) => updateVoiceSettings({ rate: value })}
                            min={0.5}
                            max={2}
                            step={0.1}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
                          <Slider
                            value={[voiceSettings.pitch]}
                            onValueChange={([value]) => updateVoiceSettings({ pitch: value })}
                            min={0.5}
                            max={2}
                            step={0.1}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                          <Slider
                            value={[voiceSettings.volume]}
                            onValueChange={([value]) => updateVoiceSettings({ volume: value })}
                            min={0}
                            max={1}
                            step={0.1}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Voice Controls */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Voice Controls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          onClick={testVoice} 
                          disabled={!isEnabled || voiceSettings.muted}
                          className="w-full"
                          variant="outline"
                        >
                          <Speaker className="h-4 w-4 mr-2" />
                          Test Voice
                        </Button>
                        <Button 
                          onClick={stopSpeaking}
                          disabled={!isSpeaking}
                          className="w-full"
                          variant="outline"
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Stop Speaking
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Sakha AI Voice Assistant Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default FloatingVoiceIcon;
