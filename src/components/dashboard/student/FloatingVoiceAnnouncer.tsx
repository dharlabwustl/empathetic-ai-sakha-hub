
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mic, MicOff, Volume2, VolumeX, X, Settings, Info } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { useMediaQuery } from '@/hooks/use-media-query';
import { fixPrepzrPronunciation } from './mood-tracking/moodUtils';

interface FloatingVoiceAnnouncerProps {
  userName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  userName,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onMoodChange
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [confirmedMood, setConfirmedMood] = useState<MoodType | undefined>(undefined);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const welcomeMessagePlayed = useRef<boolean>(false);
  
  const recognizedStudyCommands = [
    "create a study plan",
    "show my study plan",
    "schedule a study session",
    "set a reminder",
    "start a pomodoro timer",
    "take a practice test",
    "explain a concept",
    "help me understand",
    "what topics should I study",
    "find resources on",
    "summarize chapter",
    "quiz me on",
    "show me flashcards"
  ];

  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    supportedLanguages
  } = useVoiceAnnouncer({ 
    userName, 
    isFirstTimeUser: false 
  });
  
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  }, [externalOnClose]);
  
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState && !welcomeMessagePlayed.current) {
      setTimeout(() => {
        const greeting = fixPrepzrPronunciation(`Welcome to PREPZR Voice Assistant! How can I help you with your studies today?`);
        speakMessage(greeting);
        welcomeMessagePlayed.current = true;
      }, 500);
    }
  };
  
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleVolumeChange = (value: number[]) => {
    updateVoiceSettings({ volume: value[0] });
  };
  
  const handleRateChange = (value: number[]) => {
    updateVoiceSettings({ rate: value[0] });
  };
  
  const handlePitchChange = (value: number[]) => {
    updateVoiceSettings({ pitch: value[0] });
  };

  const handleListenClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      
      // Provide voice feedback that we're listening
      speakMessage("I'm listening. How can I help?");
    }
  };
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    // Process the transcript to find commands
    const lowerCommand = command.toLowerCase();
    console.log("Processing voice command:", lowerCommand);
    
    // Check for navigation commands
    if (lowerCommand.includes("go to dashboard") || lowerCommand.includes("show dashboard")) {
      speakMessage("Navigating to dashboard.");
      window.location.href = "/dashboard/student";
      return;
    }
    
    if (lowerCommand.includes("go to study plan") || lowerCommand.includes("show study plan")) {
      speakMessage("Opening your study plan.");
      window.location.href = "/dashboard/student/study-plan";
      return;
    }
    
    if (lowerCommand.includes("go to practice") || lowerCommand.includes("practice exam")) {
      speakMessage("Opening practice exams.");
      window.location.href = "/dashboard/student/practice-exam";
      return;
    }
    
    // Check for mood-related commands and update mood if found
    const moodMapping = {
      "happy": MoodType.HAPPY,
      "good": MoodType.HAPPY,
      "motivated": MoodType.MOTIVATED,
      "focused": MoodType.FOCUSED,
      "tired": MoodType.TIRED,
      "exhausted": MoodType.TIRED,
      "stressed": MoodType.STRESSED,
      "confused": MoodType.CONFUSED,
      "anxious": MoodType.ANXIOUS,
      "nervous": MoodType.ANXIOUS,
      "sad": MoodType.SAD,
      "depressed": MoodType.SAD,
      "neutral": MoodType.NEUTRAL,
      "okay": MoodType.NEUTRAL,
      "fine": MoodType.NEUTRAL,
      "alright": MoodType.NEUTRAL,
      "so so": MoodType.NEUTRAL,
      "overwhelmed": MoodType.STRESSED,
      "swamped": MoodType.STRESSED,
      "curious": MoodType.FOCUSED
    };
    
    // Check for mood indicators in the command
    if (lowerCommand.includes("i feel") || lowerCommand.includes("i am feeling") || 
        lowerCommand.includes("feeling") || lowerCommand.includes("i'm feeling")) {
      
      // Extract potential mood from command
      for (const [moodWord, moodType] of Object.entries(moodMapping)) {
        if (lowerCommand.includes(moodWord)) {
          // Confirm the detected mood
          const detectedMood = moodType;
          setConfirmedMood(detectedMood);
          
          // Update the mood through the callback
          if (onMoodChange) {
            onMoodChange(detectedMood);
            speakMessage(`I've updated your mood to ${moodWord}. Would you like me to suggest a study approach based on this?`);
          } else {
            speakMessage(`I detected that you're feeling ${moodWord}. I can help adjust your study plan accordingly.`);
          }
          return;
        }
      }
    }
    
    // Look for study-related commands
    for (const studyCommand of recognizedStudyCommands) {
      if (lowerCommand.includes(studyCommand)) {
        speakMessage(`I can help you ${studyCommand}. What subject are you working on?`);
        return;
      }
    }
    
    // Handle general inquiries about PREPZR
    if (lowerCommand.includes("what is prepzr") || lowerCommand.includes("what does prepzr do")) {
      speakMessage(fixPrepzrPronunciation(
        "PREPZR is your personalized AI-powered study assistant that helps you prepare for exams with adaptive learning plans, practice tests, and concept explanations tailored to your learning style."
      ));
      return;
    }
    
    // Handle help command
    if (lowerCommand.includes("help") || lowerCommand.includes("what can you do")) {
      speakMessage(
        "I can help you navigate the app, create study plans, track your mood, provide exam tips, and answer questions about your studies. Try saying 'show my study plan' or 'I'm feeling tired' to see what I can do."
      );
      return;
    }
    
    // Fallback for unrecognized commands - never say "I don't understand"
    speakMessage(
      "I'd like to help with that. Could you try phrasing your request differently? For example, you can ask me to help with your study plan or explain a concept."
    );
  };

  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <Button
          onClick={toggleOpen}
          className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 p-0 shadow-lg flex items-center justify-center"
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}

      {/* Voice Assistant Dialog */}
      {isOpen && (
        <div className={`fixed ${isMinimized ? 'bottom-4 right-4 w-auto h-12' : 'bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-80 h-auto'} z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-200`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              {isSpeaking ? (
                <Volume2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              ) : (
                <Volume2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
              <span className="font-medium text-sm">
                {isMinimized ? "Voice Assistant" : fixPrepzrPronunciation("PREPZR Voice Assistant")}
              </span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-8 w-8">
                {isMinimized ? <Mic /> : <MicOff />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Minimized content */}
          {isMinimized ? (
            <div className="p-2 flex items-center">
              <Button variant="ghost" size="icon" onClick={handleListenClick} className="h-8 w-8 mr-2">
                {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              </Button>
              <span className="text-sm truncate">
                {isListening ? "Listening..." : "Click to speak"}
              </span>
            </div>
          ) : (
            <>
              {/* Main content */}
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {transcript ? (
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-1">You said:</p>
                      <p className="text-gray-800 dark:text-gray-200">{transcript}</p>
                    </div>
                  ) : (
                    <p>Try saying "I'm feeling tired" or "Show my study plan"</p>
                  )}
                </div>
                
                {/* Voice control buttons */}
                <div className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleListenClick}
                          variant={isListening ? "destructive" : "default"}
                          className="rounded-full h-14 w-14 p-0"
                        >
                          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isListening ? "Stop listening" : "Start listening"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {/* Settings panel */}
                {showSettings && (
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-medium text-sm mb-3">Voice Assistant Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-enabled">Voice enabled</Label>
                        <Switch
                          id="voice-enabled"
                          checked={voiceSettings.enabled}
                          onCheckedChange={toggleVoiceEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-muted">Mute</Label>
                        <Switch
                          id="voice-muted"
                          checked={voiceSettings.muted}
                          onCheckedChange={toggleMute}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-volume">Volume</Label>
                          <span className="text-xs text-gray-500">
                            {Math.round(voiceSettings.volume * 100)}%
                          </span>
                        </div>
                        <Slider
                          id="voice-volume"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[voiceSettings.volume]}
                          onValueChange={handleVolumeChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-rate">Speed</Label>
                          <span className="text-xs text-gray-500">
                            {voiceSettings.rate.toFixed(1)}x
                          </span>
                        </div>
                        <Slider
                          id="voice-rate"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.rate]}
                          onValueChange={handleRateChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-pitch">Pitch</Label>
                          <span className="text-xs text-gray-500">
                            {voiceSettings.pitch.toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          id="voice-pitch"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.pitch]}
                          onValueChange={handlePitchChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-language">Language</Label>
                        <Select
                          value={voiceSettings.language}
                          onValueChange={(value) => updateVoiceSettings({ language: value })}
                        >
                          <SelectTrigger id="voice-language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportedLanguages.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button onClick={testVoice} variant="outline" size="sm" className="w-full">
                        Test Voice
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Help section */}
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Info className="h-3 w-3" />
                    <span>Try asking about your study plan or mood tracking</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingVoiceAnnouncer;
