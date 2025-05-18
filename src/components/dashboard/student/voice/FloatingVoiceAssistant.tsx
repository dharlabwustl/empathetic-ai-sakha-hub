
import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Settings, X, Sparkles, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAssistantProps {
  userName?: string;
  onClose?: () => void;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  userName = "Student",
  onClose,
  onMoodChange,
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("voice");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [voicePitch, setVoicePitch] = useState(50);
  const [voiceRate, setVoiceRate] = useState(50);
  const [autoResponse, setAutoResponse] = useState(true);
  const [transcript, setTranscript] = useState("");
  
  const toggleAssistant = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: "Voice Assistant Ready",
        description: "Ask a question or say a command",
      });
    }
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate starting speech recognition
      toast({
        title: "Listening...",
        description: "Say something like 'Show me my progress'",
      });
      // Simulate receiving transcript after delay
      setTimeout(() => {
        setTranscript("Show me my exam readiness score");
        // And then stop listening
        setIsListening(false);
        // Simulate response
        setTimeout(() => {
          toast({
            title: "Voice Response",
            description: "Your exam readiness score is 72%. Would you like to see details?",
          });
        }, 1000);
      }, 2000);
    } else {
      setTranscript("");
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "Assistant will now speak responses" : "Assistant will be silent",
    });
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVoiceVolume(value[0]);
  };
  
  const handlePitchChange = (value: number[]) => {
    setVoicePitch(value[0]);
  };
  
  const handleRateChange = (value: number[]) => {
    setVoiceRate(value[0]);
  };
  
  const toggleAutoResponse = () => {
    setAutoResponse(!autoResponse);
  };
  
  const handleTestVoice = () => {
    toast({
      title: "Voice Test",
      description: `Hello ${userName}, I'm your study assistant. How can I help you today?`,
    });
  };
  
  const handleQuickCommands = (command: string) => {
    setTranscript(command);
    // Simulate processing
    toast({
      title: "Processing Command",
      description: `"${command}"`,
    });
    
    // Simulate response after a delay
    setTimeout(() => {
      toast({
        title: "Voice Response",
        description: getResponseForCommand(command),
      });
    }, 1000);
  };
  
  const getResponseForCommand = (command: string): string => {
    if (command.toLowerCase().includes("exam") || command.toLowerCase().includes("score")) {
      return "Your exam readiness is at 72%. Focus on improving your organic chemistry scores.";
    } else if (command.toLowerCase().includes("progress")) {
      return "You've completed 65% of your study plan. Great work!";
    } else if (command.toLowerCase().includes("concept")) {
      return "You have 3 concepts scheduled for today: Thermodynamics, Organic Chemistry, and Cell Biology.";
    } else if (command.toLowerCase().includes("time") || command.toLowerCase().includes("long")) {
      return "You have 45 days left until your scheduled exam date.";
    }
    return "I'm not sure how to help with that. Try asking about your exam readiness or study progress.";
  };

  // Button to toggle the assistant
  if (!isExpanded) {
    return (
      <Button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 flex items-center justify-center"
      >
        <Mic size={20} className="text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 shadow-xl border-2 border-purple-200 dark:border-purple-900">
      <CardHeader className="p-3 pb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Sparkles size={18} className="mr-2 text-purple-500" />
            Voice Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleAssistant} className="h-8 w-8">
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-3 mt-1">
          <TabsTrigger value="voice">Assistant</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="voice" className="p-3 pt-2">
          <div className="space-y-3">
            <div className="flex justify-center gap-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="sm"
                onClick={toggleListening}
                className="flex-1"
              >
                {isListening ? <MicOff size={16} className="mr-2" /> : <Mic size={16} className="mr-2" />}
                {isListening ? "Stop" : "Start"} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className="w-10 flex justify-center"
              >
                <Volume2 size={16} className={isMuted ? "text-muted-foreground" : ""} />
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-sm">
                <p className="text-sm font-semibold">You said:</p>
                <p className="italic">"{transcript}"</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Quick commands:</p>
              <div className="grid grid-cols-2 gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs justify-start h-auto py-1"
                  onClick={() => handleQuickCommands("What's my exam readiness score?")}
                >
                  Exam readiness
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs justify-start h-auto py-1"
                  onClick={() => handleQuickCommands("Show my progress")}
                >
                  My progress
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs justify-start h-auto py-1"
                  onClick={() => handleQuickCommands("What concepts should I study?")}
                >
                  Study concepts
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs justify-start h-auto py-1"
                  onClick={() => handleQuickCommands("How long until my exam?")}
                >
                  Exam countdown
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="p-3 pt-2">
          <div className="space-y-3 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="volume">Voice Volume</Label>
                <span className="text-xs text-muted-foreground">{voiceVolume}%</span>
              </div>
              <Slider id="volume" value={[voiceVolume]} onValueChange={handleVolumeChange} max={100} step={1} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="pitch">Voice Pitch</Label>
                <span className="text-xs text-muted-foreground">{voicePitch}%</span>
              </div>
              <Slider id="pitch" value={[voicePitch]} onValueChange={handlePitchChange} max={100} step={1} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="rate">Speech Rate</Label>
                <span className="text-xs text-muted-foreground">{voiceRate}%</span>
              </div>
              <Slider id="rate" value={[voiceRate]} onValueChange={handleRateChange} max={100} step={1} />
            </div>
            
            <div className="flex items-center justify-between py-1">
              <Label htmlFor="auto-response" className="cursor-pointer">Auto-response</Label>
              <Switch 
                id="auto-response" 
                checked={autoResponse}
                onCheckedChange={toggleAutoResponse}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestVoice}
              className="w-full mt-2"
            >
              Test Voice
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="p-3 pt-1 text-xs text-muted-foreground border-t flex items-center">
        <Info size={12} className="mr-1" />
        <span>Say "Help" for voice command assistance</span>
      </CardFooter>
    </Card>
  );
};

export default FloatingVoiceAssistant;
