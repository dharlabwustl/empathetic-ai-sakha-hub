
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Mic, MicOff, Volume2, VolumeX, Bot, Settings, X } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface HomePageVoiceIconProps {
  language?: string;
  isFirstTimeUser?: boolean;
}

const HomePageVoiceIcon: React.FC<HomePageVoiceIconProps> = ({
  language = "en-US",
  isFirstTimeUser = false
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    updateSettings,
    availableVoices
  } = useVoiceAnnouncer({ 
    userName: "Visitor",
    initialSettings: {
      enabled: true,
      muted: false,
      language: language,
      pitch: 1.0,
      rate: 0.9,
      volume: 0.8
    }
  });
  
  // Auto-greet on page load
  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const greeting = getEnhancedGreeting(isFirstTimeUser);
        speakMessage(greeting);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceSettings.enabled, voiceSettings.muted, speakMessage, isFirstTimeUser]);
  
  const getEnhancedGreeting = (isFirstTime: boolean) => {
    const correctPronunciation = "PREP ZAR"; // This will help with pronunciation
    
    if (isFirstTime) {
      return `Welcome to ${correctPronunciation}! I'm Sakha AI, your intelligent exam preparation companion. Congratulations on taking the first step towards exam success! 

${correctPronunciation} is a comprehensive AI-powered platform designed to revolutionize how you prepare for competitive exams. We offer personalized study plans, adaptive learning, 24/7 AI tutoring, and smart analytics to maximize your performance.

Our key features include: personalized daily study plans that adapt to your pace, concept cards with detailed explanations, smart flashcards with spaced repetition, practice exams with detailed analytics, an academic advisor for guidance, and formula practice with memory techniques.

Take a moment to explore our platform. Would you like me to guide you through our exam readiness analyzer or help you sign up to unlock the full potential of AI-powered exam preparation?`;
    } else {
      return `Welcome back to ${correctPronunciation}! I'm Sakha AI, ready to help you excel in your exam preparation. 

${correctPronunciation} combines cutting-edge AI technology with proven learning methodologies to give you the competitive edge. Our platform features personalized study plans, intelligent concept learning, adaptive flashcards, comprehensive practice exams, and real-time progress tracking.

Explore our exam readiness analyzer to assess your current preparation level, or sign up to access our full suite of AI-powered study tools. I'm here to assist you every step of the way towards exam success!`;
    }
  };
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      speakMessage(`Hello! Welcome to PREP ZAR. I'm Sakha AI, your intelligent exam preparation assistant. How can I help you succeed today?`);
      return;
    }
    
    if (lowerCommand.includes('features') || lowerCommand.includes('what can you do')) {
      speakMessage(`PREP ZAR offers amazing features: personalized study plans that adapt to your learning style, concept cards with detailed explanations, smart flashcards using spaced repetition, practice exams with analytics, 24/7 AI tutoring, and academic advisor guidance. Would you like to explore any specific feature?`);
      return;
    }
    
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness')) {
      speakMessage(`Our exam readiness analyzer evaluates your preparation level across all subjects using AI algorithms. It provides a comprehensive score and identifies areas for improvement. Would you like to try it now?`);
      window.dispatchEvent(new Event('open-exam-analyzer'));
      return;
    }
    
    if (lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
      speakMessage(`Excellent choice! Signing up unlocks personalized study plans, progress tracking, unlimited practice tests, and 24/7 AI tutoring. Let me direct you to our registration page.`);
      window.location.href = '/auth/signup';
      return;
    }
    
    speakMessage(`I'm Sakha AI, your exam preparation assistant. I can help you explore PREP ZAR's features, analyze your exam readiness, or guide you through our AI-powered study tools. What would you like to know?`);
  };
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  if (!isVoiceSupported) {
    return null;
  }

  const usBasedVoices = availableVoices.filter(voice => 
    voice.lang.includes('en-US') || 
    voice.name.toLowerCase().includes('us') ||
    voice.name.toLowerCase().includes('american') ||
    voice.name.toLowerCase().includes('united states')
  );
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Settings Panel */}
      {showSettings && (
        <Card className="absolute bottom-16 right-0 w-80 mb-2 shadow-lg border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm">Voice Settings</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-2 block">Voice Selection</label>
              <Select 
                value={voiceSettings.voice?.name || ''} 
                onValueChange={(value) => {
                  const selectedVoice = usBasedVoices.find(v => v.name === value);
                  if (selectedVoice) {
                    updateSettings({ voice: selectedVoice });
                  }
                }}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {usBasedVoices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name} className="text-xs">
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-2 block">Speech Rate</label>
              <Slider
                value={[voiceSettings.rate]}
                onValueChange={([value]) => updateSettings({ rate: value })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{voiceSettings.rate.toFixed(1)}x</div>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-2 block">Pitch</label>
              <Slider
                value={[voiceSettings.pitch]}
                onValueChange={([value]) => updateSettings({ pitch: value })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{voiceSettings.pitch.toFixed(1)}</div>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-2 block">Volume</label>
              <Slider
                value={[voiceSettings.volume]}
                onValueChange={([value]) => updateSettings({ volume: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{Math.round(voiceSettings.volume * 100)}%</div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Voice Icon */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="bg-white border-purple-200 hover:bg-purple-50"
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Sakha AI</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className={isListening ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                  className="border-purple-200"
                >
                  {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              {isSpeaking && (
                <Badge variant="outline" className="animate-pulse">
                  Speaking...
                </Badge>
              )}
            </div>
            
            {transcript && (
              <div className="mt-2 p-2 bg-purple-100 rounded text-xs">
                <strong>You:</strong> {transcript}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePageVoiceIcon;
