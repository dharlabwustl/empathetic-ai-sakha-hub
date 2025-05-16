
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingVoiceAssistantProps {
    isOpen?: boolean;
    onClose?: () => void;
    language?: string;
    userName?: string;
    onMoodCommand?: (mood: string) => void;
    onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
    isOpen,
    onClose,
    language = 'en-IN',
    userName,
    onMoodCommand,
    onNavigationCommand
}) => {
    const { toast } = useToast();
    const [showSettings, setShowSettings] = useState(false);
    
    const {
        voiceSettings,
        updateVoiceSettings,
        toggleVoiceEnabled,
        toggleMute,
        speakMessage,
        isVoiceSupported,
        isSpeaking,
        isListening,
        startListening,
        stopListening,
        transcript,
        testVoice
    } = useVoiceAnnouncer({
        userName,
        initialSettings: {
            language: 'en-IN', // Set to Indian English by default
            enabled: true,
            volume: 1,
            rate: 1,
            pitch: 1
        }
    });

    // Initialize with Indian female voice
    useEffect(() => {
        if (isVoiceSupported) {
            updateVoiceSettings({
                language: 'en-IN',
                enabled: true
            });
        }
    }, [isVoiceSupported, updateVoiceSettings]);

    // Process voice commands
    const handleVoiceCommand = (command: string) => {
        const lowerCommand = command.toLowerCase();
        
        // Navigation commands
        if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
            speakMessage("Opening dashboard");
            onNavigationCommand && onNavigationCommand('/dashboard/student');
        }
        else if (lowerCommand.includes('show concepts') || lowerCommand.includes('open concepts')) {
            speakMessage("Opening concept cards");
            onNavigationCommand && onNavigationCommand('/dashboard/student/concepts');
        }
        // Mood tracking
        else if (lowerCommand.includes('i feel good') || lowerCommand.includes('feeling happy')) {
            speakMessage("Great to hear you're feeling good! I've updated your mood.");
            onMoodCommand && onMoodCommand('HAPPY');
        }
        else if (lowerCommand.includes('i feel tired') || lowerCommand.includes('feeling tired')) {
            speakMessage("I understand you're feeling tired. I'll suggest lighter tasks.");
            onMoodCommand && onMoodCommand('TIRED');
        }
        // Help command
        else if (lowerCommand.includes('what can you do') || lowerCommand.includes('help me')) {
            speakMessage("I can help you navigate the app, track your mood, and provide study suggestions. Try asking me to go to dashboard, concepts, or update your mood.");
        }
    };

    // Test the voice with a sample message
    const handleTestVoice = () => {
        testVoice();
    };

    if (!isVoiceSupported) {
        return null;
    }

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            <Popover open={showSettings} onOpenChange={setShowSettings}>
                <PopoverContent className="w-80" side="top">
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Voice Assistant Settings</h3>
                        
                        <div className="flex items-center justify-between">
                            <Label htmlFor="voice-enabled">Voice Enabled</Label>
                            <Switch 
                                id="voice-enabled" 
                                checked={voiceSettings.enabled} 
                                onCheckedChange={(checked) => updateVoiceSettings({ enabled: checked })}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <Label htmlFor="voice-muted">Mute</Label>
                            <Switch 
                                id="voice-muted" 
                                checked={voiceSettings.muted} 
                                onCheckedChange={(checked) => updateVoiceSettings({ muted: checked })}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="voice-volume">Volume</Label>
                            <Slider 
                                id="voice-volume"
                                min={0}
                                max={1}
                                step={0.1}
                                value={[voiceSettings.volume]}
                                onValueChange={([value]) => updateVoiceSettings({ volume: value })}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="voice-rate">Speech Rate</Label>
                            <Slider 
                                id="voice-rate"
                                min={0.5}
                                max={2}
                                step={0.1}
                                value={[voiceSettings.rate]}
                                onValueChange={([value]) => updateVoiceSettings({ rate: value })}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="voice-pitch">Pitch</Label>
                            <Slider 
                                id="voice-pitch"
                                min={0.5}
                                max={2}
                                step={0.1}
                                value={[voiceSettings.pitch]}
                                onValueChange={([value]) => updateVoiceSettings({ pitch: value })}
                            />
                        </div>
                        
                        <Button onClick={handleTestVoice} className="w-full">
                            Test Voice
                        </Button>
                    </div>
                </PopoverContent>
                
                <PopoverTrigger asChild>
                    <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl border-2 border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-900"
                    >
                        <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </Button>
                </PopoverTrigger>
            </Popover>
            
            {transcript && (
                <Card className="mb-4 max-w-xs animate-in slide-in-from-bottom-2">
                    <CardContent className="p-3">
                        <p className="text-sm font-medium">You said:</p>
                        <p className="text-xs text-muted-foreground">{transcript}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FloatingVoiceAssistant;
