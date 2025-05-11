
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Maximize, Minimize, Clock, Brain, Check } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, getMoodEmoji } from '../mood-tracking/moodUtils';

interface Task {
  title: string;
  due: string;
  completed?: boolean;
}

interface FloatingVoiceAnnouncerProps {
  userName?: string;
  examGoal?: string;
  pendingTasks?: Task[];
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  userName = 'Student',
  examGoal = 'NEET Exam',
  pendingTasks = []
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  
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
    transcript
  } = useVoiceAnnouncer({
    userName: userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: 'en-IN',
      pitch: 1.1,
      rate: 0.95
    }
  });

  // Load mood from localStorage
  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    setCurrentMood(savedMood);
  }, []);

  // Announce pending tasks when expanded
  useEffect(() => {
    if (expanded && pendingTasks.length > 0 && voiceSettings.enabled && !voiceSettings.muted) {
      const uncompletedTasks = pendingTasks.filter(task => !task.completed);
      if (uncompletedTasks.length > 0) {
        const taskMessage = `You have ${uncompletedTasks.length} pending tasks. The most important one is: ${uncompletedTasks[0].title}, due ${uncompletedTasks[0].due}.`;
        speakMessage(taskMessage);
      }
    }
  }, [expanded, pendingTasks, voiceSettings, speakMessage]);

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const command = transcript.toLowerCase();
      
      // Process commands
      if (command.includes('log mood') || command.includes('update mood')) {
        speakMessage(`Opening mood logging dialog`);
        // Code to open mood dialog would go here
      } else if (command.includes('study plan') || command.includes('show plan')) {
        speakMessage(`Opening your study plan`);
        // Code to navigate to study plan would go here
      } else if (command.includes('pending tasks') || command.includes('my tasks')) {
        const taskCount = pendingTasks.filter(t => !t.completed).length;
        speakMessage(`You have ${taskCount} pending tasks to complete.`);
      } else if (command.includes('daily progress') || command.includes('how am i doing')) {
        speakMessage(`You're making good progress today. You've completed 3 out of 5 scheduled topics.`);
      } else if (command.includes('mute') || command.includes('be quiet')) {
        toggleMute(true);
        speakMessage('Voice assistant muted');
      } else if (command.includes('unmute') || command.includes('speak')) {
        toggleMute(false);
        speakMessage('Voice assistant activated');
      } else if (command.includes('hello') || command.includes('hi')) {
        speakMessage(`Hello ${userName}! How can I help you with your studies today?`);
      }
    }
  }, [transcript, speakMessage, toggleMute, pendingTasks, userName]);

  // Get greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      // Indicate that the assistant is listening
      speakMessage('I\'m listening. How can I help you?');
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // When expanding, announce a greeting
      const greeting = `${getTimeBasedGreeting()}, ${userName}. ${currentMood ? `I see you're feeling ${getCurrentMoodFromLocalStorage()?.toString().toLowerCase() || 'okay'} today.` : ''} How can I help with your ${examGoal} preparation?`;
      speakMessage(greeting);
    }
  };

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <>
      <div className={`fixed z-50 ${expanded ? 'bottom-4 right-4 w-80' : 'bottom-4 right-4'} transition-all duration-300`}>
        {expanded ? (
          <Card className="p-4 shadow-lg border border-blue-200 bg-white dark:bg-gray-900 dark:border-blue-900">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium flex items-center gap-1">
                {isSpeaking ? <Volume2 className="h-4 w-4 text-blue-500 animate-pulse" /> : <Volume2 className="h-4 w-4" />}
                <span>Prepzr Voice Assistant</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleMute()}>
                  {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleExpand}>
                  <Minimize className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isListening && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md mb-3 min-h-[40px] flex items-center">
                <span className="text-sm">{transcript || "Listening..."}</span>
              </div>
            )}
            
            <div className="space-y-3">
              {/* Status Section */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Ready to assist with your {examGoal} preparation</span>
              </div>
              
              {/* Mood Section */}
              {currentMood && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="text-lg">{getMoodEmoji(currentMood)}</div>
                  <span>You're feeling {currentMood.toString().toLowerCase()} today</span>
                </div>
              )}
              
              {/* Tasks Section */}
              {pendingTasks && pendingTasks.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Upcoming Tasks</span>
                  </div>
                  <ul className="text-xs space-y-1.5">
                    {pendingTasks.slice(0, 3).map((task, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          {task.completed ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm"></div>
                          )}
                          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                            {task.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Voice Command Suggestions */}
              <div>
                <div className="text-sm font-medium mb-1 flex items-center gap-1">
                  <Brain className="h-3.5 w-3.5" />
                  <span>Try saying:</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>"Show my study plan"</p>
                  <p>"What are my pending tasks?"</p>
                  <p>"Update my mood"</p>
                </div>
              </div>
              
              {/* Microphone Button */}
              <div className="flex justify-center pt-1">
                <Button 
                  variant={isListening ? "destructive" : "default"} 
                  className="w-full"
                  onClick={handleMicToggle}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Click to Speak
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button 
            variant="outline" 
            className={`rounded-full h-12 w-12 flex items-center justify-center shadow-lg border-blue-200 dark:border-blue-900 ${isSpeaking ? 'animate-pulse bg-blue-50' : 'bg-white'}`}
            onClick={handleExpand}
          >
            {isSpeaking ? (
              <Volume2 className="h-5 w-5 text-blue-600" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>
      
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
            <DialogDescription>
              Customize your Prepzr voice assistant settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label>Enable voice assistant</label>
              <input 
                type="checkbox" 
                checked={voiceSettings.enabled}
                onChange={() => toggleVoiceEnabled()}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label>Mute voice</label>
              <input 
                type="checkbox" 
                checked={voiceSettings.muted}
                onChange={() => toggleMute()}
              />
            </div>
            
            <div className="space-y-1">
              <label>Voice speed</label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={voiceSettings.rate}
                onChange={(e) => updateVoiceSettings({ rate: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div className="space-y-1">
              <label>Voice pitch</label>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.1"
                value={voiceSettings.pitch}
                onChange={(e) => updateVoiceSettings({ pitch: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div>
              <label>Language</label>
              <select 
                value={voiceSettings.language}
                onChange={(e) => updateVoiceSettings({ language: e.target.value })}
                className="w-full mt-1 border rounded-md p-2"
              >
                <option value="en-US">English (US)</option>
                <option value="en-IN">English (India)</option>
                <option value="en-GB">English (UK)</option>
                <option value="hi-IN">Hindi (India)</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => testVoice()}>
              Test Voice
            </Button>
            <Button onClick={() => setShowSettings(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingVoiceAnnouncer;
