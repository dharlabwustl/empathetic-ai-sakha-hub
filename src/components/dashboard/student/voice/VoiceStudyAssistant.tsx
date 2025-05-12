
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { getMoodVoiceCommands, getMoodStudyRecommendation } from '@/components/dashboard/student/mood-tracking/moodUtils';
import { toast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface VoiceStudyAssistantProps {
  userName?: string;
  onMoodCommand?: (mood: string) => void;
  onStudyPlanCommand?: () => void;
  onTaskCommand?: (action: string, task?: string) => void;
}

const VoiceStudyAssistant: React.FC<VoiceStudyAssistantProps> = ({
  userName,
  onMoodCommand,
  onStudyPlanCommand,
  onTaskCommand
}) => {
  const [expanded, setExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
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
    testVoice,
    voiceInitialized
  } = useVoiceAnnouncer({ 
    userName,
    initialSettings: {
      // Default settings with correct PREPZR pronunciation
      enabled: true,
      muted: false,
      volume: 1,
      rate: 1,
      pitch: 1,
      voice: '',
      language: 'en-US'
    }
  });
  
  // Initialize suggestions
  useEffect(() => {
    // Combine different types of voice commands
    const moodCommands = getMoodVoiceCommands();
    const studyCommands = [
      "Show my study plan",
      "Open formula lab",
      "What should I study today?",
      "How much time do I have for physics?",
      "Create new flashcard",
      "Navigate to concepts section",
      "Go to dashboard",
      "Take me to practice exams",
      "Open flashcards"
    ];
    
    const taskCommands = [
      "Mark task as complete",
      "Add new task",
      "What are my pending tasks?",
      "Remind me to review chemistry at 5pm",
    ];
    
    // Randomize and limit suggestions
    const allCommands = [...moodCommands, ...studyCommands, ...taskCommands];
    const shuffled = allCommands.sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 6));
  }, []);
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('navigate') || lowerCommand.includes('open')) {
      handleNavigationCommand(lowerCommand);
      return;
    }
    
    // Mood related commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood') || lowerCommand.includes('set mood') || lowerCommand.includes('log mood')) {
      handleMoodCommand(lowerCommand);
      return;
    }
    
    // Study plan related commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule') || lowerCommand.includes('timetable')) {
      if (onStudyPlanCommand) {
        speakMessage("Opening your study plan now");
        onStudyPlanCommand();
      }
      return;
    }
    
    // Task related commands
    if (lowerCommand.includes('task') || lowerCommand.includes('complete') || lowerCommand.includes('add')) {
      handleTaskCommand(lowerCommand);
      return;
    }
    
    // Formula lab related commands
    if (lowerCommand.includes('formula') || lowerCommand.includes('lab')) {
      speakMessage("Opening the formula lab. You can practice with interactive formulas here.");
      navigateTo('/dashboard/student/formula-practice-lab');
      return;
    }
    
    // Exam practice commands
    if (lowerCommand.includes('practice exam') || lowerCommand.includes('take exam') || lowerCommand.includes('test')) {
      speakMessage("Opening practice exams section. You can select mock tests here.");
      navigateTo('/dashboard/student/practice-exam');
      return;
    }
    
    // Concept related commands
    if (lowerCommand.includes('concept') || lowerCommand.includes('learn')) {
      speakMessage("Opening concepts section. You can explore study materials here.");
      navigateTo('/dashboard/student/concepts');
      return;
    }
    
    // Flashcard related commands
    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card') || lowerCommand.includes('cards')) {
      speakMessage("Opening flashcards section. You can practice with interactive flashcards.");
      navigateTo('/dashboard/student/flashcards');
      return;
    }
    
    // Help command
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I'm your PREPZR voice assistant. I can help you navigate the platform, log your mood, open different sections like concepts, flashcards, formula lab, and practice exams. You can also ask me about your study plan or tasks.");
      return;
    }
    
    // If no command recognized, provide a helpful response instead of "I don't understand"
    speakMessage("I can help you navigate PREPZR. Try saying 'open concepts', 'show my study plan', or 'log my mood'. What would you like to do?");
  };
  
  const handleNavigationCommand = (command: string) => {
    // Extract the destination
    let destination = '';
    
    if (command.includes('dashboard')) {
      destination = '/dashboard/student';
      speakMessage("Taking you to the dashboard");
    } else if (command.includes('concept')) {
      destination = '/dashboard/student/concepts';
      speakMessage("Opening concepts section");
    } else if (command.includes('flashcard')) {
      destination = '/dashboard/student/flashcards';
      speakMessage("Opening flashcards section");
    } else if (command.includes('formula') || command.includes('lab')) {
      destination = '/dashboard/student/formula-practice-lab';
      speakMessage("Opening formula lab");
    } else if (command.includes('exam') || command.includes('practice') || command.includes('test')) {
      destination = '/dashboard/student/practice-exam';
      speakMessage("Opening practice exams");
    } else if (command.includes('profile')) {
      destination = '/dashboard/student/profile';
      speakMessage("Opening your profile");
    } else if (command.includes('study plan')) {
      if (onStudyPlanCommand) {
        onStudyPlanCommand();
        speakMessage("Opening your study plan");
        return;
      }
    } else {
      // If destination not recognized, provide guidance
      speakMessage("I can help you navigate to different sections like dashboard, concepts, flashcards, formula lab, or practice exams. Where would you like to go?");
      return;
    }
    
    if (destination) {
      navigateTo(destination);
    }
  };
  
  const navigateTo = (path: string) => {
    window.location.href = path;
  };
  
  const handleMoodCommand = (command: string) => {
    // Extract mood from command if present
    const moodKeywords = [
      { words: ['happy', 'glad', 'great', 'joyful', 'cheerful'], mood: MoodType.HAPPY },
      { words: ['tired', 'exhausted', 'sleepy', 'fatigued'], mood: MoodType.TIRED },
      { words: ['stressed', 'overwhelmed', 'pressured'], mood: MoodType.STRESSED },
      { words: ['motivated', 'determined', 'inspired', 'driven'], mood: MoodType.MOTIVATED },
      { words: ['confused', 'unsure', 'uncertain', 'perplexed'], mood: MoodType.CONFUSED },
      { words: ['anxious', 'nervous', 'worried', 'uneasy'], mood: MoodType.ANXIOUS },
      { words: ['focused', 'concentrated', 'attentive'], mood: MoodType.FOCUSED },
      { words: ['neutral', 'normal', 'regular'], mood: MoodType.NEUTRAL },
      { words: ['okay', 'ok', 'alright', 'fine'], mood: MoodType.OKAY },
      { words: ['overwhelmed', 'swamped', 'overloaded'], mood: MoodType.OVERWHELMED },
      { words: ['curious', 'interested', 'inquisitive'], mood: MoodType.CURIOUS },
      { words: ['sad', 'unhappy', 'down', 'depressed', 'blue'], mood: MoodType.SAD },
    ];
    
    // Check if any mood keywords are in the command
    for (const { words, mood } of moodKeywords) {
      if (words.some(word => command.includes(word))) {
        if (onMoodCommand) {
          const recommendation = getMoodStudyRecommendation(mood);
          speakMessage(`I'll log that you're feeling ${mood.toLowerCase()}. ${recommendation}`);
          onMoodCommand(mood);
          return;
        }
      }
    }
    
    // If asking about mood but not specifying
    if (onMoodCommand) {
      speakMessage("Would you like to log how you're feeling? You can say things like 'I'm feeling tired' or 'I'm motivated today'.");
    }
  };
  
  const handleTaskCommand = (command: string) => {
    if (!onTaskCommand) return;
    
    if (command.includes('complete') || command.includes('done') || command.includes('finished')) {
      // Extract task name if present
      const taskMatch = command.match(/(?:complete|done|finished|mark)\s+(?:the\s+)?(?:task\s+)?(.+?)(?:\s+as\s+done|\s+as\s+complete|$)/i);
      const taskName = taskMatch ? taskMatch[1] : undefined;
      
      speakMessage(taskName 
        ? `Marking task "${taskName}" as complete` 
        : "Which task would you like to mark as complete?");
        
      onTaskCommand('complete', taskName);
      return;
    }
    
    if (command.includes('add') || command.includes('new task') || command.includes('create task')) {
      // Extract task details if present
      const taskMatch = command.match(/(?:add|create|new)\s+(?:a\s+)?(?:task\s+)?(?:to\s+)?(.*?)(?:\s+for|$)/i);
      const taskName = taskMatch ? taskMatch[1] : undefined;
      
      speakMessage(taskName 
        ? `Adding new task: "${taskName}"` 
        : "What task would you like to add?");
        
      onTaskCommand('add', taskName);
      return;
    }
    
    if (command.includes('pending') || command.includes('remaining') || command.includes('what task')) {
      speakMessage("Let me check your pending tasks.");
      onTaskCommand('list');
      return;
    }
  };
  
  const handleTrySuggestion = (suggestion: string) => {
    speakMessage(suggestion);
    processVoiceCommand(suggestion);
    
    toast({
      title: "Voice command executed",
      description: suggestion,
    });
  };
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>Voice Assistant</span>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-sm">
                <p className="font-semibold">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left"
                    onClick={() => handleTrySuggestion(suggestion)}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full"
            >
              <Mic className="h-4 w-4 mr-2" />
              Use Voice Commands
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceStudyAssistant;
