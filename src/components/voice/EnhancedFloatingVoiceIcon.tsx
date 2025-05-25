
import React, { useState } from 'react';
import { Mic, Settings, Volume2, VolumeX, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { useUnifiedVoice } from '@/components/dashboard/student/voice/UnifiedVoiceManager';

interface AssistantType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  voiceType: 'female' | 'male';
  personality: string;
}

const assistantTypes: AssistantType[] = [
  {
    id: 'sakha-mentor',
    name: 'Sakha Mentor',
    icon: Bot,
    description: 'Your friendly AI study companion',
    voiceType: 'female',
    personality: 'encouraging'
  },
  {
    id: 'study-coach',
    name: 'Study Coach',
    icon: User,
    description: 'Professional academic advisor',
    voiceType: 'male',
    personality: 'professional'
  },
  {
    id: 'learning-buddy',
    name: 'Learning Buddy',
    icon: Bot,
    description: 'Casual and supportive guide',
    voiceType: 'female',
    personality: 'casual'
  }
];

interface EnhancedFloatingVoiceIconProps {
  userName?: string;
}

const EnhancedFloatingVoiceIcon: React.FC<EnhancedFloatingVoiceIconProps> = ({ userName }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState('sakha-mentor');
  const [smartIntervention, setSmartIntervention] = useState(true);
  const [contextAwareness, setContextAwareness] = useState(true);
  
  const { 
    isSpeaking, 
    isEnabled, 
    voiceSettings, 
    updateVoiceSettings, 
    speakMessage,
    stopSpeaking
  } = useUnifiedVoice();

  const currentAssistant = assistantTypes.find(a => a.id === selectedAssistant) || assistantTypes[0];

  const handleAssistantChange = (assistantId: string) => {
    setSelectedAssistant(assistantId);
    const assistant = assistantTypes.find(a => a.id === assistantId);
    if (assistant) {
      updateVoiceSettings({ voiceType: assistant.voiceType });
      localStorage.setItem('selectedAssistant', assistantId);
      
      // Announce the change
      speakMessage(`I'm now your ${assistant.name}! ${assistant.description}. How can I help you today?`, 'high');
    }
  };

  const testAssistant = () => {
    const messages = {
      'sakha-mentor': `Hi ${userName}! I'm Sakha, your AI mentor. I'm here to make your study journey engaging and successful!`,
      'study-coach': `Hello ${userName}. I'm your Study Coach, ready to help you achieve your academic goals with structured guidance.`,
      'learning-buddy': `Hey ${userName}! I'm your Learning Buddy, here to make studying fun and stress-free!`
    };
    
    speakMessage(messages[selectedAssistant as keyof typeof messages] || messages['sakha-mentor'], 'high');
  };

  const getAssistantStatus = () => {
    if (isSpeaking) return { text: 'Speaking...', color: 'bg-red-500' };
    if (isEnabled) return { text: 'Ready', color: 'bg-green-500' };
    return { text: 'Offline', color: 'bg-gray-500' };
  };

  const status = getAssistantStatus();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetTrigger asChild>
          <Button
            className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
            size="icon"
          >
            <div className="relative">
              <currentAssistant.icon className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
              <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full ${status.color} ${isSpeaking ? 'animate-pulse' : ''}`}>
                <div className="h-full w-full rounded-full bg-white/30"></div>
              </div>
            </div>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-96 max-w-[90vw]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Voice Assistant Settings
            </SheetTitle>
            <SheetDescription>
              Customize your AI study companion experience
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            {/* Assistant Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  Current Assistant
                  <Badge variant={isEnabled ? "default" : "secondary"}>
                    {status.text}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <currentAssistant.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{currentAssistant.name}</p>
                    <p className="text-sm text-muted-foreground">{currentAssistant.description}</p>
                  </div>
                </div>
                
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
              </CardContent>
            </Card>

            {/* Assistant Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Choose Your Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assistantTypes.map((assistant) => (
                  <div
                    key={assistant.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAssistant === assistant.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => handleAssistantChange(assistant.id)}
                  >
                    <div className="flex items-center gap-3">
                      <assistant.icon className={`h-6 w-6 ${
                        selectedAssistant === assistant.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{assistant.name}</p>
                        <p className="text-xs text-muted-foreground">{assistant.description}</p>
                      </div>
                      {selectedAssistant === assistant.id && (
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Smart Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Smart Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smart-intervention">Smart Intervention</Label>
                    <p className="text-xs text-muted-foreground">Speak at the right moment</p>
                  </div>
                  <Switch
                    id="smart-intervention"
                    checked={smartIntervention}
                    onCheckedChange={setSmartIntervention}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="context-awareness">Context Awareness</Label>
                    <p className="text-xs text-muted-foreground">Understand your current activity</p>
                  </div>
                  <Switch
                    id="context-awareness"
                    checked={contextAwareness}
                    onCheckedChange={setContextAwareness}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Voice Controls */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Voice Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label>Voice Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
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

                <div className="flex gap-2">
                  <Button 
                    onClick={testAssistant} 
                    disabled={!isEnabled || voiceSettings.muted}
                    className="flex-1"
                    variant="outline"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Test Voice
                  </Button>
                  <Button 
                    onClick={stopSpeaking}
                    disabled={!isSpeaking}
                    variant="outline"
                  >
                    <VolumeX className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EnhancedFloatingVoiceIcon;
