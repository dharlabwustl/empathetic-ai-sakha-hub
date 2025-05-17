
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Mic, 
  MicOff, 
  Settings, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  FileText, 
  Brain,
  CalendarDays,
  BarChart2,
  Calculator,
  Sparkles
} from "lucide-react";
import { MoodType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface VoiceCommand {
  command: string;
  description: string;
  icon: React.ReactNode;
}

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = "",
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    availableVoices,
    isListening,
    startListening,
    stopListening,
    transcript,
    setTranscript,
    changeVoice,
    testVoice
  } = useVoiceAnnouncer({ userName, language: 'en-IN' });
  
  // Available voice commands categorized
  const voiceCommands: Record<string, VoiceCommand[]> = {
    navigation: [
      { command: "Show study plan", description: "View your personalized study plan", icon: <CalendarDays size={16} /> },
      { command: "Open concept cards", description: "Browse concept cards library", icon: <BookOpen size={16} /> },
      { command: "Go to flashcards", description: "Practice with flashcards", icon: <FileText size={16} /> },
      { command: "Open formula lab", description: "Practice with interactive formulas", icon: <Calculator size={16} /> }
    ],
    mood: [
      { command: "I'm feeling motivated", description: "Update mood to motivated", icon: <Sparkles size={16} /> },
      { command: "I'm feeling tired", description: "Update mood to tired", icon: <Brain size={16} /> },
      { command: "I'm feeling anxious", description: "Update mood to anxious", icon: <Brain size={16} /> }
    ],
    study: [
      { command: "What should I study today?", description: "Get personalized study recommendations", icon: <BookOpen size={16} /> },
      { command: "Track my progress", description: "View your learning analytics", icon: <BarChart2 size={16} /> },
      { command: "Help me with physics", description: "Get subject-specific assistance", icon: <Brain size={16} /> }
    ]
  };
  
  // Handle a voice command from the user
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      speakMessage("Taking you to the dashboard home");
      navigate('/dashboard/student');
      return;
    }
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      speakMessage("Opening your study plan");
      navigate('/dashboard/student/study-plan');
      return;
    }
    
    if (lowerCommand.includes('concept') || lowerCommand.includes('cards')) {
      speakMessage("Opening the concept cards section");
      navigate('/dashboard/student/concepts');
      return;
    }
    
    if (lowerCommand.includes('flashcard')) {
      speakMessage("Taking you to flashcards");
      navigate('/dashboard/student/flashcards');
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('lab')) {
      speakMessage("Opening the formula lab");
      navigate('/dashboard/student/formula-lab');
      return;
    }
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('analytics')) {
      speakMessage("Here are your learning analytics");
      navigate('/dashboard/student/analytics');
      return;
    }
    
    // Mood commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood')) {
      const moodMapping: Record<string, MoodType> = {
        'happy': MoodType.HAPPY,
        'motivated': MoodType.MOTIVATED,
        'focused': MoodType.FOCUSED,
        'calm': MoodType.CALM,
        'tired': MoodType.TIRED,
        'confused': MoodType.CONFUSED,
        'anxious': MoodType.ANXIOUS,
        'stressed': MoodType.STRESSED,
        'overwhelmed': MoodType.OVERWHELMED,
        'sad': MoodType.SAD,
      };
      
      for (const [keyword, mood] of Object.entries(moodMapping)) {
        if (lowerCommand.includes(keyword)) {
          if (onMoodChange) {
            onMoodChange(mood);
            speakMessage(`Your mood has been updated to ${keyword}. I'll adjust your experience accordingly.`);
            
            toast({
              title: "Mood Updated",
              description: `Your mood has been set to ${keyword}`,
            });
            return;
          }
        }
      }
    }
    
    // Study assistance
    if (lowerCommand.includes('what should i study') || lowerCommand.includes('study recommendation')) {
      speakMessage("Based on your progress, I recommend focusing on mechanics in Physics, organic chemistry, and human physiology for your NEET preparation today.");
      return;
    }
    
    if (lowerCommand.includes('help me with') || lowerCommand.includes('explain')) {
      // Extract the subject
      const subjects = ['physics', 'chemistry', 'biology', 'mathematics', 'english'];
      const foundSubject = subjects.find(subject => lowerCommand.includes(subject));
      
      if (foundSubject) {
        speakMessage(`I'll help you with ${foundSubject}. Opening the AI tutor for personalized assistance.`);
        navigate('/dashboard/student/ai-tutor');
        return;
      }
    }
    
    // Default response for unrecognized commands
    speakMessage("I'm not sure how to help with that request. Try asking about your study plan, concept cards, or updating your mood.");
  };
  
  // Listen for transcript changes
  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript]);
  
  // Handler for when a suggested command is clicked
  const handleSuggestedCommand = (command: string) => {
    setTranscript(command);
    handleVoiceCommand(command);
  };
  
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full size-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg p-0"
          aria-label="Voice Assistant"
        >
          {isListening ? (
            <MicOff className="h-5 w-5 text-white animate-pulse" />
          ) : (
            <Mic className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>
      
      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Dashboard Voice Assistant
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="assistant">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="space-y-4 py-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isListening ? (
                      <span className="flex items-center text-sm text-green-600">
                        <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                        Listening...
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {userName ? `Hi ${userName}, how can I help you?` : "How can I help you?"}
                      </span>
                    )}
                  </div>
                  
                  {currentMood && (
                    <div className="px-2 py-1 bg-muted rounded text-xs">
                      Current mood: {currentMood.toString().toLowerCase()}
                    </div>
                  )}
                </div>
                
                {transcript && (
                  <div className="bg-background rounded p-3 mb-4 shadow-sm">
                    <p className="text-sm font-medium mb-1">You said:</p>
                    <p className="italic">{transcript}</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? "destructive" : "default"}
                    className="flex-1"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Start Listening
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    className="flex-1"
                  >
                    {voiceSettings.muted ? (
                      <>
                        <VolumeX className="h-4 w-4 mr-2" />
                        Unmute
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 mr-2" />
                        Mute
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Command suggestions */}
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Navigation</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {voiceCommands.navigation.map((cmd, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-auto py-1.5 text-left text-xs"
                          onClick={() => handleSuggestedCommand(cmd.command)}
                        >
                          <span className="mr-1.5">{cmd.icon}</span>
                          "{cmd.command}"
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Mood Tracking</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {voiceCommands.mood.map((cmd, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-auto py-1.5 text-left text-xs"
                          onClick={() => handleSuggestedCommand(cmd.command)}
                        >
                          <span className="mr-1.5">{cmd.icon}</span>
                          "{cmd.command}"
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Study Help</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {voiceCommands.study.map((cmd, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-auto py-1.5 text-left text-xs"
                          onClick={() => handleSuggestedCommand(cmd.command)}
                        >
                          <span className="mr-1.5">{cmd.icon}</span>
                          "{cmd.command}"
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-enabled">Enable Voice Assistant</Label>
                    <Switch 
                      id="voice-enabled" 
                      checked={voiceSettings.enabled}
                      onCheckedChange={(checked) => updateVoiceSettings({ enabled: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-greet">Automatic Welcome Greeting</Label>
                    <Switch 
                      id="auto-greet" 
                      checked={voiceSettings.autoGreet}
                      onCheckedChange={(checked) => updateVoiceSettings({ autoGreet: checked })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-volume">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                  <Slider 
                    id="voice-volume"
                    min={0} 
                    max={1} 
                    step={0.1} 
                    value={[voiceSettings.volume]}
                    onValueChange={(value) => updateVoiceSettings({ volume: value[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-rate">Speaking Rate: {Math.round(voiceSettings.rate * 100)}%</Label>
                  <Slider 
                    id="voice-rate"
                    min={0.5} 
                    max={1.5} 
                    step={0.1} 
                    value={[voiceSettings.rate]}
                    onValueChange={(value) => updateVoiceSettings({ rate: value[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-pitch">Pitch: {Math.round(voiceSettings.pitch * 100)}%</Label>
                  <Slider 
                    id="voice-pitch"
                    min={0.8} 
                    max={1.5} 
                    step={0.1} 
                    value={[voiceSettings.pitch]}
                    onValueChange={(value) => updateVoiceSettings({ pitch: value[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Voice Selection</Label>
                    <Button variant="ghost" size="sm" onClick={testVoice}>Test Voice</Button>
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                    {availableVoices.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-2">Loading available voices...</p>
                    ) : (
                      availableVoices.map((voice, index) => (
                        <div 
                          key={`${voice.name}-${index}`} 
                          className={`flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer ${
                            voiceSettings.voice && voiceSettings.voice.name === voice.name ? "bg-muted" : ""
                          }`}
                          onClick={() => changeVoice(voice)}
                        >
                          <div>
                            <p className="font-medium text-sm">{voice.name}</p>
                            <p className="text-xs text-muted-foreground">{voice.lang}</p>
                          </div>
                          {voiceSettings.voice && voiceSettings.voice.name === voice.name && (
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardVoiceAssistant;
