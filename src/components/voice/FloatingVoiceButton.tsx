
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mic, MicOff, Settings, Volume2, VolumeX, Headphones } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand
}) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('PREPZR AI processing command:', lowerCommand);

    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      const route = '/dashboard/student';
      navigate(route);
      if (onNavigationCommand) onNavigationCommand(route);
      speakMessage('Navigating to your dashboard');
      return;
    }

    if (lowerCommand.includes('concepts') || lowerCommand.includes('learn')) {
      const route = '/dashboard/student/concepts';
      navigate(route);
      if (onNavigationCommand) onNavigationCommand(route);
      speakMessage('Opening concepts section');
      return;
    }

    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
      const route = '/dashboard/student/flashcards';
      navigate(route);
      if (onNavigationCommand) onNavigationCommand(route);
      speakMessage('Opening flashcards');
      return;
    }

    if (lowerCommand.includes('practice exam') || lowerCommand.includes('test')) {
      const route = '/dashboard/student/practice-exam';
      navigate(route);
      if (onNavigationCommand) onNavigationCommand(route);
      speakMessage('Opening practice exams');
      return;
    }

    if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
      const route = '/dashboard/student/profile';
      navigate(route);
      if (onNavigationCommand) onNavigationCommand(route);
      speakMessage('Opening profile settings');
      return;
    }

    // Study assistance
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage(`Hi ${userName}! I'm your PREPZR AI assistant. I can help you navigate to concepts, flashcards, practice exams, check your progress, provide study tips, and much more. Just tell me what you need!`);
      return;
    }

    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      speakMessage(`${userName}, you're making excellent progress! You've completed 68% of your Physics concepts and your practice scores are improving. Keep up the great work!`);
      return;
    }

    // Default response
    speakMessage(`I heard: "${command}". I'm your PREPZR AI assistant. How can I help you with your studies today?`);
  };

  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    isVoiceSupported,
    isListening,
    startListening,
    stopListening,
    speakMessage,
    testVoice,
    availableVoices
  } = useVoiceAnnouncer({
    userName,
    autoStart: false,
    onCommand: handleVoiceCommand
  });

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      speakMessage(`Hi ${userName}! I'm your PREPZR AI assistant. I'm listening - how can I help you today?`);
    }
  };

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <>
      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full w-10 h-10 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                PREPZR AI Voice Settings
              </DialogTitle>
              <DialogDescription>
                Customize your voice assistant experience
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Voice Control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-enabled">Voice Assistant</Label>
                  <Switch
                    id="voice-enabled"
                    checked={voiceSettings.enabled}
                    onCheckedChange={toggleVoiceEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-muted">Mute Audio</Label>
                  <Switch
                    id="voice-muted"
                    checked={voiceSettings.muted}
                    onCheckedChange={toggleMute}
                  />
                </div>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <Label>Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                <Slider
                  value={[voiceSettings.volume]}
                  onValueChange={([value]) => updateVoiceSettings({ volume: value })}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Speech Rate */}
              <div className="space-y-2">
                <Label>Speech Rate: {voiceSettings.rate}x</Label>
                <Slider
                  value={[voiceSettings.rate]}
                  onValueChange={([value]) => updateVoiceSettings({ rate: value })}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Voice Selection */}
              {availableVoices.length > 0 && (
                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Select
                    value={voiceSettings.voice?.name || ''}
                    onValueChange={(value) => {
                      const selectedVoice = availableVoices.find(v => v.name === value);
                      updateVoiceSettings({ voice: selectedVoice || null });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices
                        .filter(voice => voice.lang.includes('en'))
                        .map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Test Voice */}
              <Button 
                onClick={testVoice} 
                variant="outline" 
                className="w-full"
                disabled={voiceSettings.muted}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Test PREPZR AI Voice
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={handleVoiceToggle}
          variant={isListening ? "default" : "outline"}
          size="lg"
          className={`rounded-full w-16 h-16 shadow-lg transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={!voiceSettings.enabled}
        >
          {voiceSettings.enabled ? (
            isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )
          ) : (
            <VolumeX className="h-6 w-6" />
          )}
          <span className="sr-only">
            {isListening ? 'Stop PREPZR AI' : 'Start PREPZR AI'}
          </span>
        </Button>
      </div>
    </>
  );
};

export default FloatingVoiceButton;
